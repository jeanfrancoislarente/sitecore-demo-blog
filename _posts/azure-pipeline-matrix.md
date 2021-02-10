---
title: 'Parallel Multi-OS Builds Using Azure Pipelines Matrix Strategy'
excerpt: "The Sitecore demo team builds Linux, Windows Server 2019 (ltsc2019), and two semi-annual releases (2004 and 20H2 at the moment). This post shows how we achieve this feat without adding additional build time!"
date: '2021-02-09T16:00:00.322Z'
author: 'jeanfrancoislarente'
primaryTopic: 'DevOps'
repositories:
  - 'Sitecore.Demo.Platform'
  - 'Sitecore.Demo.Base'
  - 'docker-images'
  - 'Sitecore.Demo.Headless'
featuredOrder:
---

We build container images on different OS versions. We support the latest Windows Server LTSC (ltsc2019) as well as two semi-annual versions (currently 2004 and 20H2). We also build certain Sitecore roles on Linux!

In a semi-related post ['Walkthrough: Add Parallel Build Power to your Azure Pipelines with Virtual Machine Scale Sets'](/posts/azure-vmss-agents) I provided the (very detailed) steps required to set up Azure Pipeline agent pools backed by virtual machine scale sets on different OS versions, including Linux.

This post assumes that you have Azure Pipelines agent pools with different OS versions (not necessarily running on VMSS though).

## The Matrix Strategy

Initially we set out by building the images consecutively, that meant that for every OS we wanted to build, we had to wait for the previous one to complete. If you've waited for a 30 minute build to complete only to find out that the 3rd stage failed, I feel your pain.

When you're done with this post, take a look at the [Azure Pipelines yaml schema reference](https://docs.microsoft.com/en-us/azure/devops/pipelines/yaml-schema?view=azure-devops&tabs=schema%2Cparameter-schema), in particular the **[Matrix Strategy](https://docs.microsoft.com/en-us/azure/devops/pipelines/yaml-schema?view=azure-devops&tabs=schema%2Cparameter-schema#strategies)**. You can use this strategy for a lot more than what I'm writing about today!

The idea, run the same pipeline job steps against different OS versions, at the SAME time!

The syntax for this is pretty simple (and powerful). You define a job (*Build_Platform* in our case) and you want to run that job, with different variables, in parallel. That's it, really.

You can see in the following snippet that we labeled 3 keys: `windows2004`, `ltsc2019`, `20H2`.

Under those keys, we declared 3 variables which are specific to the key:

- **poolName**: name of the agent pool that will run the job.
- **osVersion**: variable which specified which base container OS (*windowsservercore*) we're building on.
- **nanoserverVersion**: specifies which version of nanoserver we're using.

In my previous [VMSS post](/posts/azure-vmss-agents) I mentioned that you should try to name your agent pools using a specific naming convention, this is where it becomes important as it makes it much easier to trace things around when debugging.

```yaml
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

The other important portion of the snippet is the fact that we're now able to specify the pool `name` with `$(poolName)` variable which we set in the matrix.

That's one of the variables we defined in the matrix above. That means that this job will run *concurrently* [(depending on your Azure Parallel job licensing)](https://docs.microsoft.com/en-us/azure/devops/pipelines/licensing/concurrent-jobs?view=azure-devops&tabs=self-hosted)

## Conclusion

That's it, really. There's no magic. Well, it feels like magic! You can run the same job steps, with different values, against different agent pools in parallel!

You can find examples of how we're using the matrix strategy across many of our repositories:

- [Sitecore.Demo.Platform](https://github.com/Sitecore/Sitecore.Demo.Platform/blob/main/docker/build-and-push-images.yml)
- [docker-images](https://github.com/Sitecore/docker-images/blob/master/build-images.yml)
- [Sitecore.Demo.Base](https://github.com/Sitecore/Sitecore.Demo.Base/blob/main/docker/build-base-images.yml)
- [Sitecore.Demo.Headless](https://github.com/Sitecore/Sitecore.Demo.Headless/blob/main/docker/build-and-push-images.yml)
