---
title: 'Walkthrough: Add Parallel Build Power to your Azure Pipelines with Virtual Machine Scale Sets'
excerpt: "We've discovered the beauty of Virtual Machine Scale Sets (VMSS) in Azure. This is a step-by-step guide on how you can create scale sets for different Windows or Linux versions and configure Azure pipeline agent pools to use them - it's built in!"
date: '2021-02-09T16:00:00.322Z'
author: 'jeanfrancoislarente'
primaryTopic: 'DevOps'
repositories:
  - 'Sitecore.Demo.Platform'
featuredOrder:
---

There are two agent options when building with Azure Pipelines: **Microsoft hosted** and **self-hosted**. This post focuses on how we configured self-hosted Azure virtual machine scale sets (VMSS) to solve our build server capacity limitations AND add support for multiple OS versions.

The detailed documentation for setting this up is on [docs.microsoft.com](https://docs.microsoft.com/en-us/azure/devops/pipelines/agents/scale-set-agents?view=azure-devops), so once you've read how we do it, you can refer to the original docs for additional details and customizing it for your needs.

## TL;DR

If you know your way around Azure, the az cli and all of that good DevOps stuff, you may be able to get through this by going directly to **[my gist](https://gist.github.com/jeanfrancoislarente/251c8b61db6b538d3cb04efcca8a9564)** entry.

## The Problem

We had two problems to solve, actually. We needed to add *burst* capacity to our build agents and we needed to support multiple OS versions, including Linux and Windows' semi-annual versions.

The first problem is simple. Like any other team, our cycles vary and sometimes we need additional build capacity and other times we're coding and don't need the servers running.

The second challenge is a side-effect of the containerization (that's a word, right?) of the demo. Sitecore chose to provide support for Windows ltsc2019 as well as two SAC releases (at the time of this post, this is 2004 and 20H2). The demo team also decided to leverage the Linux OS for various roles. In case you're keeping count, this is 4 different operating systems to support.

Now, *technically* we could build 2004 and ltsc2019 images on a newer Windows host OS (e.g. Windows 20H2) using Hyper-V isolation mode ([more on isolation modes](https://docs.microsoft.com/en-us/virtualization/windowscontainers/manage-containers/hyperv-container)). However, we found technical instabilities and decreased performance when building using Hyper-V, so we chose to work in *process isolation* mode. The downfall, you need to run Docker builds on the matching host OS version. That is, you need to build a Windows 20H2 image on a Windows 20H2 host OS and a Windows 2004 image on a 2004 host, and... Ok, I'll stop.

Let's get down to the brass tax and go through the process. In this post we'll be:

- Creating an Azure VM.
- Customizing the VM with a script.
- Creating an image from the VM.
- Creating a VMSS from the Image.
- Adding an Azure Pipelines agent pool.

## The VMs

> Before we get started. This is our manual process, I understand that you can further automate this with packer, terraform, etc. We just haven't made it there yet. In reality, once I configure the images for an OS, it doesn't require changing very often. By all means, if you read this and add additional automation, please share it!

VMSS stands for *Virtual Machine Scale Set*, so it's probably obvious that we need a virtual machine. A VMSS uses a VM image to create replicas in a set. Read more about VMSS on the [Microsoft site](https://docs.microsoft.com/en-us/azure/virtual-machine-scale-sets/overview)... but not yet, keep reading!

### Creating an Azure VM

#### Setting up some variables

To create a starting VM, you still need to base it on an image. You can get a list of all images using `az vm image list`, but that will return an incredibly long list of images. Here are a few examples that will be helpful:

- Windows Server 2004

  `az vm image list -p MicrosoftWindowsServer -f windowsserver -s datacenter-core-2004 --all`

- Windows Server 20H2

  `az vm image list -p MicrosoftWindowsServer -f windowsserver -s datacenter-core-20H2 --all`

- Windows Server 2019 (ltsc2019)

  `az vm image list -p MicrosoftWindowsServer -f windowsserver -s 2019-datacenter-core --all`

- Linux

  `az vm image list -p Canonical`

The sample output from above:

```json
  [
      {
      "offer": "WindowsServer",
      "publisher": "MicrosoftWindowsServer",
      "sku": "datacenter-core-2004-with-containers-smalldisk-g2",
      "urn": "MicrosoftWindowsServer:WindowsServer:datacenter-core-2004-with-containers-smalldisk-g2:19041.450.2008080726",
      "version": "19041.450.2008080726"
    },
    {
      "offer": "WindowsServer",
      "publisher": "MicrosoftWindowsServer",
      "sku": "datacenter-core-2004-with-containers-smalldisk-g2",
      "urn": "MicrosoftWindowsServer:WindowsServer:datacenter-core-2004-with-containers-smalldisk-g2:19041.508.2009070256",
      "version": "19041.508.2009070256"
    },
    {
      "offer": "WindowsServer",
      "publisher": "MicrosoftWindowsServer",
      "sku": "datacenter-core-2004-with-containers-smalldisk-g2",
      "urn": "MicrosoftWindowsServer:WindowsServer:datacenter-core-2004-with-containers-smalldisk-g2:19041.572.2010091946",
      "version": "19041.572.2010091946"
    }
  ]
```

Take note of the `urn` from the output. The command lists all available versions for the SKU you specified, but a nice trick here is that you can replace the last portion (after the `:`) with `latest`. As an example:

  `$urn = "MicrosoftWindowsServer:WindowsServer:datacenter-core-2004-with-containers-smalldisk-g2:latest"`

Let's set up a couple of variables now, I use two resource groups to keep things clean, but you don't have to (you do need to create the resource groups first, as this isn't covered in this post).

- **imageResourceGroup**: this is where we store all VM images
- **agentResourceGroup**: this is where the vmss (Azure DevOps agent scale sets) are created
- **vmName**: should be set to a short name to identify, for example, the version. This will be used to create other resource names

```powershell
  $imageResourceGroup = "DevOps-Images"
  $agentResourceGroup = "DevOps-Agents"
  $vmName = "ltsc2019"
```

#### Creating the VM

Windows:

```powershell
  az vm create -g $imageResourceGroup -n "$vmName-vm" --image $urn --os-disk-size-gb 500 --admin-username myadmin --admin-password ChooseY0urP@ssword! --size Standard_D16s_v3
```

Linux:

```powershell
  az vm create -g $imageResourceGroup -n "$vmName-vm" --image $urn --os-disk-size-gb 500 --generate-ssh-keys --size Standard_D8s_v3
```

*Note that I leave the defaults for SSH keys set up, that means it will automatically use the keys I already have generated in my `~/.ssh` folders. You can read more about how to specify the ssh keys on the [Microsoft docs site](https://docs.microsoft.com/en-us/cli/azure/vm?view=azure-cli-latest#az_vm_create) in particular the `--ssh-dest-key-path`, `--ssh-key-name` and `ssh-key-values` options.*

### Customizing the VM

This is where you add tools and settings to the base VM (which will become an image used by the VMSS to spin up build agents). It looks daunting, but really it's just a few lines of PowerShell. Note here you can run any sort of commands like `choco install`, etc.)

#### Customization Script

- Expanding the OS Disk to its maximum partition size
- Creating a new user `AzDevOps` and adding to Local Administrators' group
- Installing docker-compose
- Adding C:\Program Files\dotnet to the PATH
  - The dotnet version required is actually installed by the build pipeline, but adding it to the PATH here helped resolve an issue.
- Install the az cli (used by our build pipelines)
- Restart the Computer (to complete the installation)

`vm-script.ps1` is pasted below, but also available **[here](https://gist.github.com/jeanfrancoislarente/251c8b61db6b538d3cb04efcca8a9564#file-vm-script-ps1)**. The bash version (for Linux VMs) is **[here](https://gist.github.com/jeanfrancoislarente/251c8b61db6b538d3cb04efcca8a9564#file-vm-script-sh)**.

```powershell
# - Expand the disk to maximum partition size
# - Create a new user (`AzDevOps`) and add to Administrator's group
# - Install docker-compose
# - Add "C:\Program Files\dotnet" to PATH. The installation of the dotnet core framework is handled in the pipeline
# - Install az cli
# - Restart the Computer

# Increase drive space to max allocated
$MaxSize = (Get-PartitionSupportedSize -DriveLetter c).sizeMax
Resize-Partition -DriveLetter c -Size $MaxSize

# Create new 'AzDevOps' user and add to Local Administrators group
$password = ConvertTo-SecureString "ChooseY0urP@ssword!" -AsPlainText -Force
New-LocalUser "AzDevOps" -Password $password -FullName "Azure DevOps Agent User" -Description "Azure DevOps Agent User"
Add-LocalGroupMember -Group "Administrators" -Member "AzDevOps"

# Install Docker-Compose
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
Invoke-WebRequest "https://github.com/docker/compose/releases/download/1.27.4/docker-compose-Windows-x86_64.exe" -UseBasicParsing -OutFile $Env:ProgramFiles\Docker\docker-compose.exe

# Add dotnet core folder to path (dotnet core gets installed via pipelines)
$newPath = $env:PATH +=  "C:\Program Files\dotnet"
Set-ItemProperty -Path 'Registry::HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\Session Manager\Environment' -Name PATH -Value $newPath

# Install az cli
$ProgressPreference = "SilentlyContinue"
Invoke-WebRequest -Uri https://aka.ms/installazurecliwindows -OutFile .\AzureCLI.msi; Start-Process msiexec.exe -Wait -ArgumentList '/I AzureCLI.msi /quiet'; rm .\AzureCLI.msi
$ProgressPreference = "Continue"

# Restart computer once completed to ensure all changes take effect
Restart-Computer -Force
```

#### Running the script remotely

It's great to have this script, but what I learned is that you can execute it remotely using the `az vm run-command` command!

- Windows:

```powershell
  az vm run-command invoke  --command-id RunPowerShellScript --name "$vmName-vm" -g $imageResourceGroup --scripts @vm-script.ps1
```

- Linux

```bash
  az vm run-command invoke  --command-id RunShellScript --name "$vmName-vm" -g $imageResourceGroup --scripts @vm-script.sh
```

### Creating an Image from the VM

#### Preparing

In this part of the instructions, we're going to sysprep and generalize the VM before we finally create an image from it.

For limitations beyond my comprehension, you need to perform the sysprep directly on the VM.

For Windows, RDP into the machine (you can look it up on the portal OR use the fancy one-liner to get the ip address).

```powershell
  az vm show -d -g $imageResourceGroup -n "$vmName-vm"  --query publicIps -o tsv
```

One remotely connected to the VM, execute:

```powershell
  C:\Windows\System32\sysprep\sysprep.exe /generalize /oobe /shutdown
```

For Linux, you can ssh and run:

```bash
  sudo apt-get update -y
  sudo apt-get upgrade -y
  sudo waagent -deprovision+user -force --verbose
```

*Wait for the machine to be in "Stopped" state in the portal before proceeding to the next step*. This is kind of true. It seems like the Linux flavor of the instructions don't quite work that way... So I just wait about 5 minutes and stop it manually. Like I said, there are likely much better ways of doing this.

#### Creating the Image

What we've all been waiting for, right?

1. De-allocate and Generalize VM

   ```powershell
   az vm deallocate --resource-group $imageResourceGroup --name "$vmName-vm"
   az vm generalize --resource-group $imageResourceGroup --name "$vmName-vm"
   ```

1. Get the ID for the VM

   ```powershell
   $vmId = ((az vm show -g $imageResourceGroup -n "$vmName-vm") |ConvertFrom-Json).id
   ```

1. Create image from VM

   ```powershell
   az image create  --resource-group $imageResourceGroup --name "$vmName-image" --source $vmId --hyper-v-gen v2

   #Get the Id

   $imgId = ((az image show --resource-group $imageResourceGroup --name "$vmName-image") |ConvertFrom-Json).id
   ```

### Creating a VMSS from the Image

Ok, so THIS is probably what we've been waiting for. To sum up what we've done so far we have:

- created a VM
- customized it by running a script against it
- generalized, stopped and de-allocated it
- created an image and retrieved its id (`$imgId`)

The naming convention I use for our team's scale sets is simply a prefix of `vmss-` followed by the `$vmName`. For Windows 2004, my `$vmName` would be 2004 and the result would be `vmss-2004`.

```powershell
  $scaleSetName = "vmss-${vmName}"
```

Ok, before we create the VMSS, here's *another note*! We have some networking gurus at Sitecore and they've already set me up with the properly configured vNet, subnet and any other net I need. You can use the defaults without providing networking details and the `az vmss create` command will create the networking components for you, and this works fine for wiring everything up to Azure DevOps, as we're doing now! For production use, you may need to create the networking components separately but just know that specifying the networking at vmss create time is straightforward.

When creating the scale set, you're passing (yet another) admin username/password. You can use the same one as you did earlier, but the primary admin user created earlier got wiped (on purpose) during the generalize step (but the AzDevOps user we created did not - but you can't reuse that user here).

```powershell
az vmss create --resource-group $agentResourceGroup --name $scaleSetName --image $imgId --admin-username myAdminUser --admin-password ChooseY0urP@ssword! --instance-count 1 --disable-overprovision --upgrade-policy-mode manual --load-balancer '""' --vm-sku Standard_D16s_v3
```

As always, the full reference to `az vmss create` can be found on [Microsoft's doc site](https://docs.microsoft.com/en-us/cli/azure/vmss?view=azure-cli-latest#az_vmss_create).

That's it! If all went well (and you followed along carefully) you have a VMSS in Azure (you can browse to it via the portal).

Next step, the Azure Pipelines agent pool.

## Adding an Azure Pipelines agent pool

Well, you can't be surprised we're here - I just said this was next!

Spoiler alert, I didn't script this because it's SO easy to do via the Azure DevOps portal. So, head over there now and check out the following screenshots!

1. Go the the Agent Pools settings of your Azure DevOps instance (Project Settings -> Agent Pools) and click on **Add Pool**.

  ![picture 1](/assets/blog/azure-vmss-agents/agent-pools.png)

1. Select **Azure virtual machine scale set** as the Pool type

  ![picture 2](/assets/blog/azure-vmss-agents/add-agent-pool.png)

1. Configure Settings

In the Add agent pool dialog, you can set the following settings (I'll shared our settings as an example):

- **Azure Subscription** (well, that one I'm not sharing, but pick the subscription you used to create the VMSS earlier).
- **Virtual machine scale set**, the drop down will be populated from your selection above. Again, select the VMSS you created.
- **Name**. Here I use another useful convention and it will become very clear why it's important in a future blog post about the Azure Pipelines matrix build strategy. For now, know that the convention I use is `docker-OSName-agents` e.g. `docker-20H2-agents`.
- **Pool options** - I leave the first two checkboxes empty as I don't want to tear them down after every use and I don't need to run interactive tests.
- **Maximum number of virtual machines in the scale set**. I set this high. Not because I have an unlimited budget, but because it's more costly to have a team of developers waiting on build servers than it is to spin up agents (that will tear down in ~ 4hrs).
- **Number of agents to keep on standby**. My number is zero here. When the team isn't working, we don't need to pay for build agents. So, once all of the agents are idle for a given amount of time, they automatically get destroyed and money is saved.
- **Delay in minutes before deleting excess idle agents**. This is a fine balance between benefiting from warm build agents (and Docker cache) during busy times and being as fiscally responsible as possible. I selected 240 minutes, which is a reasonable 4hrs.

![picture 3](/assets/blog/azure-vmss-agents/agent-pool-details.png)

## Conclusion

What's the beauty here? Did you have to install the Azure Pipelines agent during the process? You didn't! Do you now have unlimited, custom build power at your fingertips? You do!

Azure Pipelines and Azure virtual machine scale sets work together to *automatically* spin up a build agent inside the VMSS, deploy the pipeline agent software and start processing builds! When builds aren't running and your idle settings are met, the instance(s) are deleted!

In an upcoming post I will provide some details about how we maximize the efficiency of our parallel builds by taking advantage of the Azure Pipeline **matrix strategy** which, as described on the [Microsoft site](https://docs.microsoft.com/en-us/azure/devops/pipelines/yaml-schema?view=azure-devops&tabs=schema%2Cparameter-schema#strategies) *generates copies of a job, each with different input*.

## Sneak peek

![picture 4](/assets/blog/azure-vmss-agents/current-agent-pools.png)

![picture 5](/assets/blog/azure-vmss-agents/matrix-strategy.png)

```yaml
- stage: Docker_Windows
    dependsOn: Build_Solution
    displayName: "Build Windows Images"
    jobs:
      - job: Build_Platform
        strategy:
          matrix:
            windows2004:
              poolName: "docker-2004-agents"
              osVersion: "2004"
              nanoserverVersion: "2004"
            ltsc2019:
              poolName: "docker-ltsc2019-agents"
              osVersion: "ltsc2019"
              nanoserverVersion: "1809"
            20H2:
              poolName: "docker-20H2-agents"
              osVersion: "20H2"
              nanoserverVersion: "20H2"
        displayName: "Build Windows Docker Images"
        pool:
          name: $(poolName)
```
