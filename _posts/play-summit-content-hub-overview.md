---
title: 'Create a Play! Summit Content Hub instance'
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
  - Enable all of the following:
    - Content
    - Project
    - Print
    - Media
    - Product
    - FreeModelling
    - Content Publishing

      ![licenses](../assets/blog/play-summit-content-hub/licenses.png)

Once the instance is created and ready, you can log in and connect it with your Sitecore instance or other headless channels.


## Content Hub customizations

We have introduced several custom entities and taxonomies. Many of these are interconnected through relational fields. There are also some configuration changes that one need to consider when making changes to meet their needs.

### Pages from the top navigation

- **Home page**: This is your landing page once you log in. Along with a search box there are two search components that displays four pieces of content from Speakers and Sessions entities. We have added custom CSS specifically for the home page and modified the background image.

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

- Products page

    ![Products page](../assets/blog/play-summit-content-hub/products-page.png)

  - Additional field were added to the "Main" section of the product entity
    - ProductToAudience
  - Additional field added to the "Commercial" field section
    - Gtin8
    - Gtin12

- Content
  - One new Content Type was created
    - Advertisements

        ![Content page](../assets/blog/play-summit-content-hub/content-page.png)

- Assets
  - "Triggers Vision" setting enabled for all "Asset type" Taxonomy values (Triggers AI image analysis)
  - Configuration updates made to add additional fields to "M.Asset" entities

    ![Assets](../assets/blog/play-summit-content-hub/assets.png)

    - "Audience" field (relation to "M.CMP.Audience" format)
    - "ActivityType" field (relation to "Demo.ActivityType" format)
  - Configuration updates display additional fields on "M.Asset" entities (Added under the "Summit" section heading).
    - Access Group - example of an asset setting that can be used grant/deny access to assets (for example, a role or user can be granted/denied access to assets based on this field value)
    - These fields were automatically added to the "M.Asset" entity when relation fields were added to the custom entities listed below. In many scenarios you would choose to hide these relation fields but we are displaying them on Assets since it is an easy way for a user to see if the asset is in use by any of the custom entities listed below:
      - Sponsors
      - Venues
      - Rooms
      - Vendor
      - Sessions
      - Speakers

- Project
  - One sample project added named "Product Launch Template"
  - One configuration change made to allow Product entities to be added to the project via the "Paste from clipboard" option
  - In order to support the Project functionality, the "Projects" setting has been enabled for the following entities:
    - M.Asset
    - M.Content
    - Demo.Session

      ![Project page](../assets/blog/play-summit-content-hub/project.png)

- Print
  - 4 print templates created that references custom entities to pull dynamic content
  - 3 publications created (from the templates)

    ![print templates](../assets/blog/play-summit-content-hub/print.png)

  - There were configuration updates needed to support the use of custom entities with print templates
    - New relation fields were added to the "M.Chili.Publication" entity in order to connect to the following entities:
      - M.Content (field name: ChiliPublicationToContent)
      - Demo.Session (field name: ChiliPublicationToSession)
      - Demo.Speaker (field name: ChiliPublicationToSpeaker)
      - Demo.Sponsor (field name: ChiliPublicationToSponsor)
      - Demo.Vendor (field name: ChiliPublicationToVendor)
      - Demo.SpeakerType (field name: ChiliPublicationToSpeakerType)
  - In order to allow specific images to be used in print templates, asset images needed to be tagged with a specific setting.
    - There were 4 additional values added to the Option list named "ChiliType"
      - ChiliType.SpeakerImage
      - ChiliType.BackgroundImage
      - ChiliType.SessionImage
      - ChiliType.AdvertisementImage
    - Specific assets were then tagged with one of the ChiliType values listed above (if they are not tagged with a ChiliType value then the image does not display in the print template)
  - Connection details added to connect to a development version of Chili publish (same connection details as the Fruitful demo template)
    - Connection settings added to "Manage -> Settings -> Chili -> ChiliConfiguration"

      ![Chili Configuration](../assets/blog/play-summit-content-hub/chili%20configuration.png)

  - Additional fonts added so they are available in Chili publish templates (Manage -> Settings -> Chili -> FontsConfiguration)

- DRM
  - One example DRM contract added named "Striva brand assets"

    ![DRM](../assets/blog/play-summit-content-hub/DRM.png)

- Manage (Admin)
  - Actions
    - CUS - Content completeness check, Copied from the Fruitful demo template
    - DemoAction, which is used to sync content between Content hub and Sitecore
    - Demo - Session Workflow
    - Demo - Speaker Workflow
    - Demo - Sponsor Workflow
    - Demo - Vendor Workflow
    - Demo - Room Workflow
    - Demo - Venue Workflow

      ![workflow actions](../assets/blog/play-summit-content-hub/workflow%20actions.png)

  - Triggers
    - CUS - M.PCM.Product - Product completeness creation check
      - Copied from the Fruitful demo template
    - Demo - Session Workflow
    - Demo - Speaker Workflow
    - Demo - Sponsor Workflow
    - Demo - Vendor Workflow
    - Demo - Room Workflow
    - Demo - Venue Workflow

      ![Workflow Triggers](../assets/blog/play-summit-content-hub/workflow-triggers.png)

    - DemoTrigger - for Custom entities, which are being used to trigger content sync to Sitecore when an entity is published

      ![content triggers](../assets/blog/play-summit-content-hub/content-triggers.png)

  - Scripts
    - CUS - Content completeness check
      - Copied from the Fruitful demo template
  - Settings
    - "DemoScripts -> Content Completeness Check"
      - Copied from the Fruitful demo template
    - "Publishing -> PublishingSettings"
      - Enabled Content Publishing to publish content to Edge. External apps can query and pull the data.

        ![Publish Settings](../assets/blog/play-summit-content-hub/publishsettings.png)

    - "PortalConfiguration -> Authentication"
      - "authentication_mode" set to passive to allow non-SSO users to login (and needed for CMP connector to Sitecore XM)
      - "ExpireTimeSpan" added to extend logout during demos
      - "SlidingExpiration" added to extend logout during demos
    - "PortalConfiguration -> CORSConfiguration"
      - Added external domains to allow DAM connector to work with Sitecore XM
  - State Flows
    - Custom state flows enabled for the following custom entities:
      - Summit Workflow - Room (3 states)
      - Summit Workflow - Session (3 states)
      - Summit Workflow - Speaker (3 states)
      - Summit Workflow - Sponsor (3 states)
      - Summit Workflow - Vendor (3 states)
      - Summit Workflow - Venue (3 states)
      - Demo Session Workflow (7 states)

        ![state flows](../assets/blog/play-summit-content-hub/state-flows.png)

  - Themes
    - Only one custom theme currently in use named "PlaySummit"
      - Custom colors & fonts configured
      - Custom logo/icons configured
      - Custom CSS added

        ![play summit theme](../assets/blog/play-summit-content-hub/play-theme.png)

  - Transformations - added the following:
    - Banner
    - Hero
    - Medium
    - Postcard
    - Profile
    - Small
    - web

      ![Transformations](../assets/blog/play-summit-content-hub/transformations.png)

  - Taxonomies
    - The following custom taxonomy definitions were added and are in use for creating relationships between multiple entities:
      - Demo.SpeakerType
      - Demo.Day
      - Demo.Timeslot
      - Demo.Level
      - Demo.SessionType
      - Demo.ActivityType
      - Demo.Audience
      - Demo.SessionStatus
      - Demo.AccessGroup

        ![Play! Summit taxonomies](../assets/blog/play-summit-content-hub/taxonomies.png)

    - The following were added to create the main schema for the Play! Summit:
      - Demo.Session
      - Demo.Testimonies
      - Demo.Sponsor
      - Demo.Vendor
      - Demo.Room
      - Demo.Venue
      - Demo.Speaker
