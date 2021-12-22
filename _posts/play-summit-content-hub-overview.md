---
title: 'The Play! Summit Content Hub instance'
excerpt: "In this blog post I'll provide the details of how to create a content hun instance to run Play! Summit properly."
date: '2021-12-21T08:00:00.000Z'
author: 'topazahmed'
primaryTopic: 'Content Hub'
repositories:
  - 'Sitecore.Demo.Edge'
featuredOrder:
---

Our team has recently completed Sitecore Edge demo site to fully integrate and implement Content Hub as the CDP and DAM. In this blog post I'll provide a high level overview of the configurations done for the PLAY! Summit demo template.

## The demo

This content hub instance has to be used with the Edge demo example which is based on the [https://github.com/Sitecore/Sitecore.Demo.Edge](https://github.com/Sitecore/Sitecore.Demo.Edge) repo.

## Creating the Content hub instance

Go to [https://create.stylelabs.io/](https://create.stylelabs.io/) to create a new content hub instance. Here when you want to create a new instance to use with the Play! Summit demo, You must fulfil the following criteria:

- Basic Tab
  - Version: 4.1.3
  - Template: Play! Summit Demo Template
  - Usage: sitecoresandbox.cloud (cdn enabled)

    ![Create instance](../assets/blog/play-summit-content-hub/create-instance.png)

- License Tab
  - Make sure you enable all of the following:

      ![licenses](../assets/blog/play-summit-content-hub/licenses.png)

Once the instance is created and ready, you can log in and connect it with your Sitecore instance or other headless channels.

## Content Hub overview

We have introduced several entities and taxonomies. Many of these are interconnected through relational fields. There are also some configuration changes that one need to consider when making changes to meet their needs.

### Pages from the top navigation

- **Home page**: This is the landing page once you log in. Along with a search box there are two search components that displays four pieces of content from Speakers and Sessions entities. We have added custom CSS specifically for the home page and modified the background image.

  ![homepage](../assets/blog/play-summit-content-hub/homepage.png)

- **My work page**: The is a custom page with a modified background image that was added as a menu item, There are four similar components that includes a selection component, for the items selected from the search component.
  - The 4 search components display different types of assets/content that is scoped to the "Created by the current user"

  ![My Work Page](../assets/blog/play-summit-content-hub/myworkpage.png)

- **Summit Menu item**: The Summit menu section was created and added as a menu item with the following sub-pages added as menu items. This is where you will be able to control all of the Summit related contents.

    ![Summit Menu](../assets/blog/play-summit-content-hub/summit-menu.png)

  - **Schedule View**: This page uses a Search component to display "Demo.Session" entities in a Grid output with "Demo.Timeslot" and "Demo.Day" taxonomies as the groupings for rows/columns

      ![Schedule View](../assets/blog/play-summit-content-hub/schedule-view.png)

    - When clicking on a session in a grid, you are taken directly to a single Session page (in the next "Sessions" section)

  - **Sessions**: This page shows all the sessions in a grid view. This page has a search component to list all the sessions with relevant information. A selection component works with the search component, to make edits, update workflow or publish content. A creation component was also added to create a new session.

    ![Session Listing](../assets/blog/play-summit-content-hub/session-listing.png)

  - **Session detail page**: This page has an entity image component to display the master image for the session. We have implemented tabs to display details and other related relevant entities like assets, content and products.

    ![session detail](../assets/blog/play-summit-content-hub/session-detail.png)

  - **Create Session page**: This page shows all fields necessary to create a new session and refresh to the list page once created successfully.

    ![Create Session](../assets/blog/play-summit-content-hub/session-create.png)

  - **Mass edit page**: shows some columns that we seemed important when making mass changes to multiple sessions.

    ![Mass edit session](../assets/blog/play-summit-content-hub/session-mass-edit.png)

  - All the other pages under this menu item has similar setup. All of them have a listing page, where you can add a new entity, and a detail page where everything about the entity can be edited.

- **Products page**: This page displays all the catalogs, brands and products. Each product has a new ProductToAudience field, but the rest is out of the box.

    ![Products page](../assets/blog/play-summit-content-hub/products-page.png)

- **Content**: We created one new Content type named "Advertisements". Other than that we will use News and Social media posts for this demo.

    ![Content page](../assets/blog/play-summit-content-hub/content-page.png)

- **Assets**: All our assets have AI image analysis turned on using the "Asset type" Taxonomy. We also utilize Audience, Activity Type and Access Group fields for this demo.

    ![Assets](../assets/blog/play-summit-content-hub/assets.png)

  - These fields were automatically added to the "M.Asset" entity when relation fields were added to the custom entities listed below. In many scenarios you would choose to hide these relation fields but we are displaying them on Assets since it is an easy way for a user to see if the asset is in use by any of the custom entities listed below:
    - Sponsors
    - Venues
    - Vendor
    - Sessions
    - Speakers

- **Project**: One sample project added named "Product Launch Template". Product entities to be added to the project via the "Paste from clipboard" option. In order to support the Project functionality, this setting has been enabled for the following entities:
  - M.Asset
  - M.Content
  - Demo.Session

    ![Project page](../assets/blog/play-summit-content-hub/project.png)

- **Print**: Four print templates and three publications (created from the templates) are available.

    ![print templates](../assets/blog/play-summit-content-hub/print.png)

- **DRM**: One example DRM contract added named "Striva brand assets"

    ![DRM](../assets/blog/play-summit-content-hub/DRM.png)

- **Manage (Admin)**: Other than the custom pages, menu items there were some configuration changes. 
  - We have several Actions for Content Completeness check, Updating workflow and syncing content with Sitecore.

    ![workflow actions](../assets/blog/play-summit-content-hub/workflow%20actions.png)

  - We have created some triggers that are used to execute the actions from above.

      ![Workflow Triggers](../assets/blog/play-summit-content-hub/workflow-triggers.png)

    - When a piece of content is being published we used these triggers to sync with Sitecore when an entity is published

    ![content triggers](../assets/blog/play-summit-content-hub/content-triggers.png)

  - There is a custom theme named "PlaySummit" which is selected as the default, which we use to make this demo looks like front end of our website and other channels. We have customized colors & fonts, changed logo/icons and added CSS.

    ![play summit theme](../assets/blog/play-summit-content-hub/play-theme.png)

  - Below are the transformations we use to optimize the images being served over to web and other headless sites to reduce data transfer size and load faster.

    ![Transformations](../assets/blog/play-summit-content-hub/transformations.png)
