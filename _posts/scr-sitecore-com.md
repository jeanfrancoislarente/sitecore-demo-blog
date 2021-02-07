---
title: 'What''s in Sitecore''s Official Container Registry (scr.sitecore.com)?'
excerpt: "scr.sitecore.com is the official Sitecore container registry, great. Where are all of these images coming from?"
coverImage: '/assets/blog/shared/sitecore-containers.png'
date: '2021-02-04T19:00:00.322Z'
author: 'Jean-Francois-Larente'
ogImage:
  url: '/assets/blog/shared/sitecore-containers.png'
repositories:
  - 'docker-images'
  - 'container-deployment'
  - 'Sitecore.Demo.Base'
  - 'Sitecore.Demo.Platform'
  - 'Sitecore.Demo.Headless'
featuredOrder:
---

Well, first of all, you might find it weird to see a blog post about *official* Sitecore things on the demo team's blog.

In many cases, we work very closely with the product team to contribute to the same customer-facing areas. This is meant to make it easier for everyone to find what they're looking for. So, while we're sharing details about our demo *stuff*, we might as well also address some of the official *stuff* while we're at it!

This post will go over the various namespaces within the container registry, what they contain and their source repos (if applicable).

## Full Image List

The full image list can be found in one of two files:

- **[sitecore-tags.md](https://github.com/Sitecore/docker-images/blob/master/tags/sitecore-tags.md)**
- **[sitecore-tags.json](https://github.com/Sitecore/docker-images/blob/master/tags/sitecore-tags.json)**

The product team worked very hard on providing an automated list of all tags (and SHA). Every time new images are pushed to scr.sitecore.com, the  above files are automatically updated by the team contributing to the registry.

To see the latest official tags, be sure to consult these files.

## Namespaces

We can group the namespaces found in Sitecore's official registry into three: Official Sitecore, Community-driven and Demo. Here's a look at each and what they contain.

### **Official Namespaces**

To keep this post brief, I will address the official namespaces with a very wide stroke. The Dockerfile or build source code is not generally made available publicly, with the exception of *tools/sitecore-docker-tools* which was recently made available as open source on **[GitHub](https://github.com/sitecore/docker-tools)**. The following descriptions were taken from the [sitecore-tags.md](https://github.com/Sitecore/docker-images/blob/master/tags/sitecore-tags.md) file.

The official namespaces are (at the time of this post):

#### sxp

Contains all Sitecore Experience Platform (SXP) image repositories. Primary platform repositories are found at the root.

#### sxp/nonproduction

Images for SXP supporting roles intended for development and testing. No production support is provided for images labeled as nonproduction.

#### sxc

Contains all Sitecore Experience Commerce (SXC) image repositories. Primary SXC repositories are found at the root.

#### sxc/nonproduction

Images for SXC supporting roles intended for development and testing. No production support is provided for images labeled as nonproduction.

#### sxp/modules

Contains image repositories for SXP-specific modules.

#### tools

Tools to support Sitecore products. ***[docker-tools](https://github.com/sitecore/docker-tools)*** on GitHub.

### **Community Namespaces**

The community namespaces are aptly named with the community prefix. The images in the community namespaces come from the **[docker-images](/repositories/docker-images)** repository and consist of pre-built image variations which add modules to Sitecore's OOB images, generating ready-built development-grade images. It's important to note that the images in the community namespaces are NOT supported for production use and are meant for development or as examples.

Aside from being in a different namesapce, another differentiating factor of the community-based images is the presence of the word *custom* in the image name ie: `sitecore-xm1-custom-spe-cm`. This was done explicitly to make a clear distinction between what is an official image, and what comes from other contributions.

There are two community namespaces, *community* and *community/modules*:

#### community

The community namespace (scr.sitecore.com/community) contains runnable images, generally based on official Sitecore images, with the addition of  modules included with the various roles (ie: add SPE and SXA to SQL and CM).

The result is a multi-dimensional matrix of variant images. Here are a few examples of the image names which have a different combination of pre-installed modules.

- `sitecore-xp0-custom-spe-cm`
- `sitecore-xp0-custom-sxa-cm`
- `sitecore-xp0-custom-sxa-jss-cm`

As you can see, you can pick a different base image for your development project, POC or demo. I can't say it enough though, these images contain the word `custom` and are not officially supported.

The images in this namespace are built from the **[docker-images](/repositories/docker-images)** repository, you can find the various build scripts there.

#### community/modules

The asset images in the community/module namespace are those not already provided by the Sitecore product team. For example, as of 10.0.x, Sitecore provides SPE, SXA and JSS asset images in the sxp/modules namespace. Those images are therefore not in the community namespace. Instead, you'll find images such as the Publishing Service, Data Exchange Framework, Content Hub connectors, etc. which were built using a similar approach to the official images but have not gone through Sitecore quality assurance and deployment process. Again same as the community runnable images, these images have the word `custom` in their name ie: `community/modules/custom-ps-assets`.

The images in this namespace are built from the **[docker-images](/repositories/docker-images)** repository, you can find the various build scripts there.

### **Demo Namespaces**

The demo team also contributes to Sitecore's official registry by pushing its latest demo assets as they become available. The product team understands the importance of making it as easy as possible for our customers and partners to obtain live examples of Sitecore products. With that in mind, they were happy to approve the release of our assets in the official registry and provided all of the support we needed to make it happen!
Other posts on this site will cover what you get with the various Sitecore demo assets, but here I'll explain the two demo namespaces.

#### demo

Well, this is where we put our shiny stuff. Our Platform **[(Lighthouse Lifestyle)](/repositories/Sitecore.Demo.Platform)** and Headless **[(Lighthouse Fitness)](/repositories/Sitecore.Demo.Headless)** demo assets get pushed here. Each repo contains the relevant `docker-compose` and `.env` files required to help you *simply* pull down the images and spin up the demo (provided you have a valid Sitecore license, of course).

The details on how to get up and running with the demo are in the relevant repositories, but you can expect to see additional posts on this site about what you can *do* with the demo once you have it up and running.

#### demo/base

This is an odd one, but necessary.

The Lighthouse demo assets require more than just the base modules found in the [docker-images](/repositories/docker-images) repo. Our team uses the Sitecore Data Exchange Framework, DAM and CMP modules, Salesforce Marketing Cloud and Salesforce CRM connectors, xGenerator... Well, you get the picture.

Since we use these modules all the time in our demo, it made sense to split the job of installing the modules from building the base images. The **demo/base** namespace takes images built by Sitecore and the community images and layers on these additional modules, creating new base images consumed by the Lighthouse demo.

The build scripts and Dockerfiles for these images are in the **[Sitecore.Demo.Base](/repositories/Sitecore.Demo.Base)** repo and are published to scr.sitecore.com in the demo/base namespace. The tagging doesn't have the word `custom` in it, but it starts with `lighthouse` and is in the demo namespace. This a pretty clear indication that these images are *also* meant for demo purposes and not supported by Sitecore. An example tag for a base image is `lighthouse-xp0-modules-base-mssql:10.0.1-ltsc2019-1001.1.0`.
