---
title: 'Sitecore.Demo.Base'
url: 'https://github.com/Sitecore/Sitecore.Demo.Base'
excerpt: 'Used to build base Docker images that are used by the other repositories/demos.'
order: 1
---

This repository contains the scripts used to build various base Docker images used in the Lighthouse Demo. It uses docker 'asset' images previously built to install modules into the CM, CD, SQL, etc. images.

The repo also currently contains helm charts for deploying the Lighthouse Demo to K8S. We will be splitting the helm charts into another repository soon.