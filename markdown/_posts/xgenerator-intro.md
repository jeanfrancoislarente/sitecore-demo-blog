---
title: 'An Introduction to Experience Generator (xGenerator)'
excerpt: "How does the demo team generate realistic looking analytics data? This post will serve as an introduction to Experience Generator (xGenerator)."
date: '2021-02-05T20:00:00.322Z'
author: 'scottmulligan'
primaryTopic: 'Marketing'
repositories:
  - 'Sitecore.Demo.Platform'
  - 'xgenerator'
featuredOrder:
---

One of the most important value propositions of Sitecore is the ability to collect analytics data for the purpose of real time personalization and deep analytics reporting. But how can you generate realistic analytics data for testing, demos, or other purposes?

The Sitecore demo team is the maintainer of an open source tool named **Experience Generator (xGenerator)**. While we were not the original creators of xGenerator, we quickly identified the importance of this tool (both for our needs and the community). We ensure xGenerator is upgraded and usable with each new Sitecore release. And of course, being the demo team, we made xGenerator container ready (thank you @adoprog).

## What Does It Do?

It does stuff. You know, analytics stuff.

OK, more specifically xGenerator will generate analytics data by making page requests to a Sitecore website, JSS app, whatever you're running on Sitecore.

But in the end, it is supposed to produce fancy looking charts like this! Oops, don't look at the "Bounce rate" in the top right... we need to look into that one.

![picture 3](/assets/blog/xgenerator-intro/xgenerator5.png)  

There is definitely more to it but you get the idea.

Don't forget to review the 360 degree view of a customer in xProfile. Hello Mr. Olaf Cormier from Cairo (*pst, he's not real*).

![picture 4](/assets/blog/xgenerator-intro/xgenerator7.png)  

And our personal favorite - do ***NOT*** foget to open up Path Analyzer. This is a differentiator to help visualize and improve the customer journey. *Don't forget to update the default date filters to see more visits.*

![picture 5](/assets/blog/xgenerator-intro/xgenerator6.png)  

## How Do I Use It?

xGenerator is more than a single tool. It is actually made up of a series of three applications.

- **Experience Generator (xGenerator)** - Create realistic analytics data for Experience Analytics, MV Tests, Path Analyzer, etc.
- **Profile Experience Generator (xProfileGenerator)** - Create deep analytics for individual visitors to show robust data in xProfile.
- **EXM Experience Generator (ExmGenerator)** - Create analytics data for EXM messages.

![picture 1](/assets/blog/xgenerator-intro/xgenerator1.png)  

### Experience Generator (xGenerator)

Let's start with the main xGenerator app. There are tons of tabs to review (in order to really control the analytics) but much of the configuration can be done in the main "Overview" tab. 

![picture 2](/assets/blog/xgenerator-intro/xgenerator2.png)  

- How many unique visitors do you want?
- How many total visits (including return visits) do you want?
- How many average page views per visit?
- What is the average time viewed per page? 
- Which sites do you want to hit and at what distribution?
- Which languages do you want to hit and at what distribution?
- How many visitors are anonymous vs. identified? (*Very useful if your Sitecore instance does not enable indexing of anonymous contacts*)
- What is the date range for analytics data to be generated?

That's a lot of configuration options. And that's just the first tab!

When your configuration is set, go ahead and click the "**Start**" button to begin the data generation process.

> **!Pro-tip** - Out-of-the-box, Sitecore contains eight Outcomes but all of them default to zero Engagement Value points. Find them under the "*/sitecore/system/Marketing Control Panel/Outcomes*" item and add "Points" to some of the Outcomes in order to trigger Enagagment Value when running xGenerator. It makes the Experience Analytics charts look *much* better! Alternatively, you can set up some page level goals to trigger Enagagment Value.

### Profile Experience Generator (xProfileGenerator)

This is a hidden gem. *xProfileGenerator* allows you to define an incredibly deep and meaninful customer journey. 

Create your visitor and their contact details... first name, last name, email, etc.

![picture 6](/assets/blog/xgenerator-intro/xgenerator3.png)  

Then you can go a level deeper and build out the customer journey.

- How many individual visits did this journey contain?
- Which webpages did they view in each visit?
- Which goals did they trigger on individual page visits? (*Yes, Engagment Value!*)
- What was their incoming channel?
- What outcomes did they trigger per visit? (*Yes, Engagment Value!*)
- Where were they located?
- When did the individual visits occur in their journey?
- And finally, did they trigger a campaign per visit?

![picture 8](/assets/blog/xgenerator-intro/xgenerator4.png)  

After generating the data you can open up the journey in Experience Profile and view the awesomeness!

### EXM Experience Generator (ExmGenerator)

Ah, yes. The forgotten child that is *ExmGenerator*. Working with ExmGenerator is a bit different than the other applications (but we still love it). 

In order to work with ExmGenerator, you need to start by creating and sending an EXM email. Sounds easy... but not really.

In order to send an EXM email blast don't you need a list of contacts? Correct. The ExmGenerator application can help by running the "List Generation" tool. This will populate a new contact list available in Sitecore's List Manager tool and be usable when sending EXM emails (Of course, you can use the list for other purposes if you want). 

![picture 11](/assets/blog/xgenerator-intro/xgenerator8.png)  

The next step is to select this list of contancts and send an EXM email blast. After the dispatch is complete you can open up the ExmGenerator app and start generating some data.

![picture 10](/assets/blog/xgenerator-intro/xgenerator10.png)  

> **!Pro-tip** - If you are using the Sitecore demo team's Docker solution you should enable the SMTP container in the .ENV file. This setting will run a docker container that acts as a SMTP catch-all for all emails sent from the demo instance.
>
> Enable the SMTP container by flipping the switch in the Docker .ENV file:
> **SMTP_CONTAINERS_COUNT=***1*****

## How Do I Install It?

You can find all of the released version of xGenerator at the following location:

- [https://github.com/Sitecore/xGenerator/releases](https://github.com/Sitecore/xGenerator/releases)

With each release, you can download the corresponding *zip* package in order to install xGenerator as a standard Sitecore package. With the Sitecore 10 release we now offer the *scwdp* version for use in containers as well.

## How Does It Work?

How is this thing generating analytics data? Is it jamming stuff into the database or is it actually visiting the site? The great part about the tool is that it is actually visiting your site. Of course, making real page requests means the tool is quite a bit slower compared to other approaches but it also makes it much more versatile. You don't need to programmatically define a set of pages to visit in advance, you just run the tool against a Sitecore website/app and it will do the rest.

And since xGenerator is making real page requests, all of the analytics data is triggered just like you would expect from a real visitor. Personalization conditions will be evaluated, MV tests will be run, page goals will be triggered, and errors will be thrown if they exist (your site doesn't have any errors does it?).

## How Does The Demo Team Use xGenerator?

Realistic analytics data is a critical aspect to giving a great demo and understanding Sitecore. Therefore we decided to ensure that all demo instances managed by our team include analytics data by default.

### How do we automatically generate analytics data for new instances of the demo? 

xGenerator exposes API endpoints. We hit those endpoints when creating new demo instances, pass a JSON payload, and the analytics data is generated in exactly the same way as if you had run xGenerator from the GUI applications!

This concept of auto-generating analytics data can be used for spinning up QA instances or other testing environments. The best way to explore the API endpoints for xGenerator is to watch the network calls (using Chrome devtools or alternatives) when manually running xGenerator from the GUI interface. It will give you an example of how to create new jobs, monitor jobs, and what type of JSON payload should be passed.

## Contributions Welcome

We absolutely encourage contributions. The tool is great and works for our needs but it is far from perfect. Could the generated analytics be better? Probably, yes. Could the tool run faster? Probably, yes. Is the code completely up to date for the latest xConnect standards? Definitely not. If you have ideas, please reach out.

Long story short, this aint our day job but it's cool and we enjoy working with xGenerator. We hope you do as well.

## Help, Errors!

If for some reason you hit an error when running xGenerator, the best way to find out more information is to watch the network calls (using Chrome devtools or alternatives). You can re-run xGenerator and find a more detailed error in the network call. For example, if you forgot to publish the website... it will tell you!

## In Closing

xGenerator is a useful tool. We use it for generating realistic analytics data for demo purposes but I'm sure the Sitecore community can discover some fun and practical use cases for xGenerator.