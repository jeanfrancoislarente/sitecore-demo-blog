---
title: 'Create a new SXA module to create content in a new site from scratch.'
excerpt: "A step by step guide with screenshots on how we create an SXA modules, that bundles up content for us which can easily be added to a site on demand."
date: '2021-02-11T20:00:00.322Z'
author: 'topazahmed'
primaryTopic: 'General'
repositories:
  - 'Sitecore.Demo.Platform'
featuredOrder:
---

Our Sitecore instances are served on a plate of SXA to have customizable, easy to use, modularized front end components. SXA is Sitecore Experience Accelerator, and once you get to know it, your Sitecore journey will change for the better. Here are the steps we use to create an SXA module so that you can import a "bucket" of items easily to any site with just five clicks once it's set up properly.

We have created a Resources section as shown below on our site that we wanted to turn into a module so that it can be installed into other sites easily. The Resources section has a bunch of different articles with different templates, media items, tags, and other related items. All these items will need to move with the module to make sure all the pages are functional on the new site. For simplicity’s sake, we have a global site that we use to store these items. That is where we store all the common templates, data, and media items so these can be shared by all the sites.

![picture 1](/assets/blog/create-sxa-module/sxa-module1.png)

## Let us start

From the Content Editor

- Go to System > Settings on the content tree
- Create a folder where we want the module to be created. In our case it was under Settings > Feature > Demo > Resources
- Right-click on settings, then select Insert > Module

  ![picture 2](/assets/blog/create-sxa-module/sxa-module-create-feature.png)

- Type in a descriptive "Module Name"
- Select the folder that was just created as the "Module Group". This is just a logical place for the module to stay.
- Choose the "System Areas" that you may need items in. These are the sections where all related items can be saved.
- Select "Site setup". Selecting "Tenant Setup" will create scaffolding for the whole tenant but we will only use this module on the site level.

  ![picture 3](/assets/blog/create-sxa-module/sxa-module-create-dialog.png)

Once the module is created

- Set a "Name". This can be the same or different than the module item name.
- Choose any other "Dependant Modules" if any.
- A checkbox to select this module by default when a new site is being created.

  ![picture 4](/assets/blog/create-sxa-module/sxa-module-dialog.png)

Next is setting up the actual items.

- Create a bucket in a logical location inside Templates > Buckets > ….
- Inside the bucket add the "Resources" parent page.
- Inside the parent page add all the individual "Resource" pages that will be installed with the module.

  ![picture 6](/assets/blog/create-sxa-module/sxa-module-buckets.png)

In our case, we have multiple buckets that have different items that need to be installed.

Now back to settings again to map the bucket with the module.

  ![picture 7](/assets/blog/create-sxa-module/sxa-module-bucket.png)

- Create a "Add Site Item" item inside the module.
- Select the parent location in the "Location" item. This is where the bucket will be inserted.
- For "Template" use the bucket created in the previous step. Which will be inside Template > Buckets > …

  ![picture 8](/assets/blog/create-sxa-module/sxa-module-create-bucket.png)

You can pick a lot of different tasks. as in, run a PowerShell script, edit or extend themes, run validation on values, or even delete items.

  ![picture 9](/assets/blog/create-sxa-module/sxa-module-bucket-insert.png)

We will run a script to make some changes to some values in an item. Keep in mind you can only select one script to run per item.
  ![picture 10](/assets/blog/create-sxa-module/sxa-module-script.png)

All the scripts are in System > Modules > PowerShell > Script libraries.

  ![picture 11](/assets/blog/create-sxa-module/sxa-module-ps.png)

Make sure to elevate access to view and edit the actual script.

  ![picture 12](/assets/blog/create-sxa-module/sxa-module-elevate.png)

## And that’s the basic idea

- Right click on a site > Scripts > Add Site Module (Three clicks)

  ![picture 13](/assets/blog/create-sxa-module/sxa-module-add.png)

- Select the newly created module and hit OK. (Click 4 & 5)

  ![picture 14](/assets/blog/create-sxa-module/sxa-module-added.png)

If everything ran properly you will see the resources page in your site.

  ![picture 15](/assets/blog/create-sxa-module/sxa-module-done.png)

## Gotchas

- Make sure all the related items, templates, media items are accessible or included in the module.
- If you use scripts test them in the PowerShell console. Then copy over the text to the item.
- If something is not coming over properly make sure all items are in the right location.
- Do not make it so that the module is dependent on another modules, if you have to then make sure those are installed beforehand.
- Break up the tasks, keep them simple.

## More information on SXA

There are a lot of resources [online](https://doc.sitecore.com/users/sxa/17/sitecore-experience-accelerator/en/introducing-sitecore-experience-accelerator.html), Sitecore [documentation](https://doc.sitecore.com/developers/sxa/17/sitecore-experience-accelerator/en/index-en.html) and [videos](https://sitecore.gallery.video/category/videos/sitecore-experience-accelerator-sxa) that can set you up on how to use SXA and get the most out of it.

## In Closing

SXA is a powerful tool that works seamlessly with Sitecore to make everyone's life easier. The most you can do with it the better. This is just a beginning and we will bring you more cool stuff in the future.

If things don't work out, remember there is always another way. just use buckets instead, which is another blog post for me or a google search for you. After all the attention span of a computer is only as long as it's power cord.
