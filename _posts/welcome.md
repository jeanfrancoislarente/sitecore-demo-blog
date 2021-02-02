---
title: 'Welcome to Our Humble Blog'
excerpt: "Yes, we exist. Yes, we build cool things. Here's a quick intro about what types of posts you may find contained herein!"
coverImage: '/assets/blog/welcome/lighthouse-main.png'
date: '2021-02-02T07:00:00.322Z'
author: 'jeanfrancoislarente'
ogImage:
  url: '/assets/blog/welcome/lighthouse-main.png'
repositories:
featuredOrder: 1
---

Some of you may already be familiar with our work, our GitHub repos, some of you may not. I want to briefly introduce the current team behind the Sitecore Demo assets and provide a brief overview of what kind of work we do and, what you can expect to read on the site.

## The Team

Our team members are versatile and can pretty much contribute in all areas, but there is always a natural focus area for each.

---

### Jean-François (J.F.) Larente

<img src="/assets/blog/authors/jeanfrancoislarente.png" width="140" alt="Jean-François Larente" />

**Title**: Demo Delivery Manager

**Areas of Focus**:

- Product Manager/Product Owner
- Team Manager
- DevOps dude
- Whatever else I'm asked to do

---

### Scott Mulligan

<img src="/assets/blog/authors/scottmulligan.png" width="140" alt="Scott Mulligan" />

**Title**: Senior Software Developer

**Areas of Focus**:

- xConnect
- EXM
- Connectors (DEF, CRM, SFMC, Content Hub, etc.)
- Container Newbie

---

### Jeff L'Heureux

<img src="/assets/blog/authors/jefflheureux.jpg" width="140" alt="Jeff L'Heureux" />

**Title**: Senior Software Developer

**Areas of Focus**:

- Front-end, JSS
- Search, Coveo
- Commerce

---

### Alexander Doroshenko

<img src="/assets/blog/authors/alexander.jpg" width="140" alt="Alexander Doroshenko" />

**Title**: Senior Software Developer

**Areas of Focus**:

- Kubernetes
- Azure
- SXA

---

### Topaz Ahmed

<img src="/assets/blog/authors/topazahmed.jpg" width="140" alt="Topaz Ahmed" />

**Title**: Senior Software Developer

**Areas of Focus**:

- Build features, create and fix bugs.
- SXA, EE, Forms, Configuration and many more two/three letters acronyms
- Jack of all trade, master of some.

---

## What we do

### Sales Demo

The primary reason for the existence of our team is to ensure the Sitecore Sales Organization has the demo assets it requires to showcase the depth and breadth of our product features. The Sales Engineers keep us busy with their requests which come from their experience showing the demo to current and future customers.

Internally, we follow the new Sitecore versions very closely and work on implementing the latest features, as quickly and practically as possible. The demo assets are generally available on the latest Sitecore version within a few days of the product's general availability.

### Deployment and Hosting

Our team doesn't only provide the demo assets themselves, it also works hard to provide the Sales Engineering group the easiest possible means of deploying the latest demo assets, with as little interaction as possible. Long gone are the days where a Sales Engineer needs to install Solr, SQL Server and all other prerequisites. Now, our team is pretty much hosting all demo instances for all of Sales (and anyone else at Sitecore who needs it).

Although only available internally, our team developed and manages a self-service portal where Sitecore employees can request a demo instance with just a few clicks. Within a short time, the user receives an e-mail that their instance is ready to use. The instance is optionally (and *automatically*) connected to Content Hub, Salesforce Marketing Cloud, Salesforce CRM and Sitecore AI. All of this, on various AKS clusters.

The portal and its source code are not available, but the helm charts we use to deploy the demo assets to Azure Kubernetes (AKS) are published to the **[container-deployment](/repositories/container-deployment)** GitHub repository.

![portal-landing](/assets/blog/welcome/portal-landing.png)

### Other Programs We Support

The current JSS Developer Trial is also deployed using the same backend APIs we've developed for the portal. We're also working on supporting Sitecore's training team and Microsoft's AppSource test-drive platform.

Given all of this, we'd like to think our team knows a thing or two about DevOps - you can expect some more detailed posts on those topics here!

### Open-Source Demo Assets

Keeping up with the Sales Engineering group's needs and supporting deployments keeps us incredibly busy, this means that sometimes we're a little slower at making changes that are visible publicly.

We do work hard on getting our code, assets and experience out in the community and in most cases, we've heard you're happy when we do! Keep in mind, the approach we take is based on the specific needs of often just "getting it done". That's why we stress (over and over again) that our code is not meant to be used as-is, or in any *starter site* fashion. There are many roads to a demo, and we chose one.

Feel free to check out [Our Repositories](/repositories) list to get the location and purpose of each one, how to deploy the assets and of course, how you can contribute.

## What you'll see here

- What's in the demo (Marketing features, stories, etc.)
- How-to integrate to... well, we have many
- DevOps posts (A look at our build pipelines, our developer workflow, our image layering)
- Quick tips, learnings, gotchas
- Issues we've found and ways to address or work around them (when possible)
