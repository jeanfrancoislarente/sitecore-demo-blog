---
title: 'A guide to creating a SXA module from scratch'
excerpt: "A step by step guide to create an SXA module which can easily add content to any site on demand."
date: '2021-02-11T20:00:00.322Z'
author: 'topazahmed'
primaryTopic: 'General'
repositories:
  - 'Sitecore.Demo.Platform'
featuredOrder:
---

We use Sitecore with SXA. The Sitecore Experience Accelerator. Here are the steps we use to create an SXA module so that you can import a "bucket" of items easily to any site with just five clicks once its setup properly.

We have a created a Resources section as shown below on our site that we wanted to turn into a module so that it can be installed into other sites easily. Resources section have a bunch of different articles with different templates, media items, tags and other related items. ALl these items will need to move with the module to make sure all the pages are functional on the new site. For simplicity’s sake we have a global site which we use to store these types of shared items. That’s where we store all the common templates, data and media items so these can be shared by all the sites.

![picture 1](/assets/blog/create-sxa-module/sxa-module1.png)

## Let’s start

- From the Content Editor, Go to System > Settings on content tree
- Create a folder where we want the module to be created. In our case it was under Settings > Feature > Demo > Resources
- Right click on settings > Insert > Module

  ![picture 2](/assets/blog/create-sxa-module/sxa-module-create-feature.png)

- Create a feature
- Pick a descriptive "Module Name"
- Pick the folder that was just created as the "Module Group". This is just a logical place for the module to stay .
- "System Areas" are where the module will create a folder to save all the related items.
- Selecting "Tenant Setup" will make settings items for the whole tenant but  we will only use this module on site level.

  ![picture 3](/assets/blog/create-sxa-module/sxa-module-create-dialog.png)

- Once the module is created
  - You can set a "Name". This can be the same or different than the module item name.
  - You can select "Dependant Modules".
  - There is a checkbox to select this module by default when a new site is being created.

    ![picture 4](/assets/blog/create-sxa-module/sxa-module-dialog.png)

- Next is setting up the actual items.
- Create a bucket in a logical location inside Templates > Buckets > ….
- In the bucket add the resources parent page. Inside the parent page add all the individual pages that will be installed with the module.

  ![picture 6](/assets/blog/create-sxa-module/sxa-module-buckets.png)

- In our case we have multiple buckets that have different items that needs to be installed.

- Now back to settings again to map the bucket with the module.

  ![picture 7](/assets/blog/create-sxa-module/sxa-module-bucket.png)

- Create a "Add Site Item" item inside the module.
- Select the parent location in the "Location" item. This is where the bucket will be inserted.
- For "Template" use the bucket created in previous step. Which will be inside Template > Buckets > …

  ![picture 8](/assets/blog/create-sxa-module/sxa-module-create-bucket.png)

- You can pick a lot of different tasks.
  - Run a powershell script.
  - Edit or extend themes.
  - Run validation. and even delete items.

    ![picture 9](/assets/blog/create-sxa-module/sxa-module-bucket-insert.png)

- We will run a script to make some changes to some values in an items.
  - Keep in mind you can only select one script to run per item.
  ![picture 10](/assets/blog/create-sxa-module/sxa-module-script.png)

- The scripts are in System > Modules > Powershell > Script libraries
  - Make sure to elevate access to view and edit the actual script.
  ![picture 11](/assets/blog/create-sxa-module/sxa-module-ps.png)
  ![picture 12](/assets/blog/create-sxa-module/sxa-module-elevate.png)

## And that’s the basic idea

- Now you can right click on a site > Scripts > Add Site Module (Three clicks)
  ![picture 13](/assets/blog/create-sxa-module/sxa-module-add.png)
  ![picture 14](/assets/blog/create-sxa-module/sxa-module-added.png)
- Select the newly created module and hit OK. (Click 4 & 5)
  ![picture 15](/assets/blog/create-sxa-module/sxa-module-done.png)
- If everything ran properly you will see the resources page in your site.

## Gotchas

- Make sure all the related items, templates, media items are accessible or included in the module.
- Text the scripts, if you have any in the powershell console. Then copy over the text.
- If something is not coming over properly make sure all items are in the right location.
- Do not make the module dependent on other modules, If you need to then make sure those are installed before hand.
- Break up the tasks, Keep it simple.

## More information on SXA

There are a lot of resource [online](https://doc.sitecore.com/users/sxa/17/sitecore-experience-accelerator/en/introducing-sitecore-experience-accelerator.html), Sitecore [documentation](https://doc.sitecore.com/developers/sxa/17/sitecore-experience-accelerator/en/index-en.html) and [videos](https://sitecore.gallery.video/category/videos/sitecore-experience-accelerator-sxa) that can set you up on how to use SXA and get the most out of it.

## In Closing

SXA is a powerful tool that work seemlessly with Sitecore to make everyone's life easier. The most you can do with it the better. This is just a beginning and we will bring you more cool stuff in the future.
