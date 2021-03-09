---
title: 'Sitecore 10.1 - SXA Page Branches'
excerpt: "SXA Page branches can be used to create modifiable landing pages and other page types that you want to have a flexible layout. Once you have created a page branch, editors can use them as templates to create and modify pages in both the Experience Editor and in Horizon."
date: '2021-03-09T08:00:00.000Z'
author: 'adoprog'
primaryTopic: 'Marketing'
repositories:
  - 'Sitecore.Demo.Platform'
featuredOrder:
---

One of the new features of Sitecore 10.1 is SXA Page Branches. When I first saw it - I did not pay much attention to it. Isn't it the same thing as Page Branches I thought? Are they any better?. But soon I've realized that they're actually super useful and I missed this feature for a long time.

You can find the Page Branches under **/sitecore/content/Tenant/Site/Presentation/Page Branches**

![Content Tree](/assets/blog/page-branches/tree.png)

With page branches you can:

- Create multiple page branches based on the same data template.
- Include local and site-scoped data sources.
- Control where a page branch is used by using rules.
- Use the same Sitecore tokens that you use on standard values to automate the creation of titles for your pages.

## Editable in Experience Editor (and Horizon)

Standard Sitecore Branches cannot not be properly edited using Experience Editor when used in SXA sites. You could use some tricks like moving them under the site context and back, but that was really inconvenient. SXA Page Branches are stored under the site definition and therefore inherit all off the Page Design, Theme, Variants and look exactly as they would look at your website front-end.

![Experience Editor](/assets/blog/page-branches/ee.png)

I had some issues locating the Page Branch in a Horizon Site tree, but they are indeed editable in Horizon UI

![Horizon](/assets/blog/page-branches/horizon.png)

## No longer "developer-owned"

We are now able to shift from "developer-owned" to "marketer-owned" Branches. It was never a good idea to give non-technical people control over the /templates section, but now that Templates and Branches are separate - it makes a lot of sense to give more control to the marketers instead of storing them in a version control system.

![Branch Structure](/assets/blog/page-branches/structure.png)

What I've seen in some implementations is that the users used existing pre-built page (i.e. landing one) as a source item and copied it. It has its own disadvantages. One could easily forget to clear some field values or update translated versions, the copies would quickly diverge from it's original source (a copy of a copy of a copy, etc.).

## Rules Engine to rule them all

 Now the users can simply setup the branches and also structure them, configure insert rules (options) for each of them.

![Rules](/assets/blog/page-branches/rules.png)

Use the "Rule" field on each of the Page Branch folders to define where they should appear as Insert Options.

![Rules Editor](/assets/blog/page-branches/rules-editor.png)
