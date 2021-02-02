---
title: 'What''s in Sitecore''s Official Container Registry (scr.sitecore.com)?'
excerpt: "scr.sitecore.com is the official Sitecore container registry, great. Where are all of these images coming from?"
coverImage: '/assets/blog/shared/sitecore-containers.png'
date: '2021-02-02T07:00:00.322Z'
author: 'jeanfrancoislarente'
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

Well, first of all, you might find it weird to see a blog post about *official* Sitecore things on the demo team's blog. In many cases, we work very closely with the product team to contribute to the same customer-facing areas. This is meant to make it easier for everyone to find what they're looking for. So, while we're sharing about our demo *stuff*, we might as well address some of the official *stuff* while we're at it!

This post will go over the various namespaces within the container registry, what they contain and their source repos (if applicable).

## The List

### (sitecore-tags.md / sitecore-tags.json)

The product team worked very hard on providing an automated list of all tags (and SHA). Every time new images are pushed to scr.sitecore.com, the **[sitecore-tags.md](https://github.com/Sitecore/docker-images/blob/master/tags/sitecore-tags.md)** and **[sitecore-tags.json](https://github.com/Sitecore/docker-images/blob/master/tags/sitecore-tags.json)** files are automatically updated by those contributing to the registry.

### Official Namespaces

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

### Community Namespaces

The community namespaces are aptly named with the community prefix. The images in the community namespaces come from the **[docker-images](/repositories/docker-images)** repository and consist of pre-built image variations which add modules to Sitecore's OOB images, generating ready-built development-grade images. It's important to note that the images in the community namespaces are NOT supported for production use and are meant for development or as examples.

Aside from being in a different namesapce, another differentiating factor of the community-based images is the presence of the word *custom* in the image name ie: `sitecore-xm1-custom-spe-cm`. This was done explicitly to make a clear distinction between what is an official image, and what comes from other contributions.

There are two community namespaces, *community* and *community/modules*:

#### community

The community namespace (scr.sitecore.com/community) contains runnable images, generally based on official Sitecore images, with the addition of  modules included with the various roles (ie: add SPE and SXA to SQL and CM).

The images in this namespace are built from the **[docker-images](/repositories/docker-images)**

#### community/modules

Module asset images not already provided by the Sitecore product team. For example, as of 10.0.x, SPE, SXA and JSS are provided by Sitecore in the official sxp/modules namespace. Those images are therefore not in the community namespace. Instead you'll find images such as the Publishing Service, Data Exchange Framework, Content Hub, etc.

