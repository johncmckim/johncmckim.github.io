---
layout: blog
category: blog
title: "AWS Compute is at the Edge"
subtitle: AWS is developing services that bring compute to the edge
poster_img: static/medium/6000-1*lnHCy2HcYpPB1tCDgQoVFg.jpeg
description: >
    Last week I sat in a room with thousands of other people at the AWS Re:Invent
    Keynote. We all wanted to learn of the new and updated AWS services and how each
    announcement would affect us...
---

# AWS Compute is at the Edge

AWS is developing services that bring compute to the edge

![](/static/medium/6000-1*lnHCy2HcYpPB1tCDgQoVFg.jpeg)

Last week I sat in a room with thousands of other people at the AWS Re:Invent Keynote. We all wanted to learn of the new and updated AWS services and how each announcement would affect us.

We saw a continued focus on Compute with announcements for EC2, ECS and Lambda. We also saw the addition of compute in Snowballs and on IoT devices. Developing services that bring compute to the edge is an interesting direction from AWS.

![](/static/medium/12000-1*b4KybLDNHFsD74MzM1IrAA.jpeg)

## Lambda@Edge

Lambda functions at the Edge, are functions that are deployed to CloudFront Edge Locations around the world. When I first heard of the feature I was excited about the possibilities of compute at the edge. But, once I read the details I realised Lambda@Edge is not quite what I expected.

Lambda@Edge adds three new triggers to Lambda. Your functions are executed at edge locations in response to four events:

* **Viewer Request** — on every request, before going to the origin

* **Origin request **— on a cache miss, before going to the origin

* **Viewer Response** — on every response, after going to the origin

* **Origin Response **— on a cache miss, after going to the origin

Edge functions are able to alter HTTP headers and re-write URLs. Each function is restricted to 128 MB of memory and must complete in 50ms. On top of this, the function cannot access any web services or other AWS resources.

These restrictions mean there are very limited use cases for Lambda@Edge. Access control checks, device detection, A/B testing, special handling for crawlers are some of the potential uses.

### What I hope the future is

The restrictions on Lambda@Edge limits it’s potential use cases. I had hoped for normal Lambda functions at the edge integrated with API Gateway. This would enable developers to easily deploy multi-regional architectures.

You might be thinking, why do I need that? You have a CDN and you cache content already. But not everything is cacheable. For a global application, the speed of light can be the biggest bottleneck.

[A Cloud Guru](https://acloud.guru/) has had great results from using an edge based service for our search. [Algolia](https://www.algolia.com/) provides search as a service at [edge locations across the world](https://stories.algolia.com/algolia-s-fury-road-to-a-worldwide-api-c1536c46f3a5). Each edge location stores a copy of the search index and searches are performed at the edge. The end result is blazingly fast searches for customers regardless of their location.

### Show me the Data

Maybe you’re still skeptical. How much difference can an edge location make? We use [Run Scope](https://www.runscope.com) to monitor the health of our application. It gives us the ability to run tests from different locations around the world.

The chart below is the average response times for one of our health checks. I gathered data from various regions across a 7 day period. The Lambda function behind the health check responds in 2ms on average.

![](/static/medium/2000-1*9UeECZgUunRk_Wcy5xrwqw.png)

It should be obvious that A Cloud Guru is currently hosted in a US region. With a single region architecture, some customers will wait longer for responses than others.

While you can build a multi-regional architecture now, it is hard. AWS excels at providing services for undifferentiated heavy lifting. In the future, I hope Lambda@Edge will enable us to develop a multi-regional architecture easily.

## Project Greengrass

The AWS IoT has been [generally available](https://aws.amazon.com/blogs/aws/aws-iot-now-generally-available/) for 12 months (Dec-2016). The service allows developers to easily develop secure, event driven IoT backends. I used the IoT service earlier this year (Jul-2016) to create my [Serverless Garden](https://serverless.zone/serverless-architectures-9e23af71097a).

[AWS Greengrass](https://aws.amazon.com/blogs/aws/aws-greengrass-ubiquitous-real-world-computing/) allows you to deploy Lambda functions to IoT devices. The IoT devices will be able to execute Lambda functions, process messages and store device shadows locally. Greengrass brings compute to the edge for IoT devices.

The ability to run IoT services locally allows device to act without cloud. This is important because IoT devices need to be reliable. No one wants to be locked out of the garage because the internet is down. Greengrass allows developers to reduce connectivity problems by running critical tasks locally.

The service is in preview right now — [sign up](https://pages.awscloud.com/greengrass-preview.html).

## What’s Next

Compute at the Edge is an interesting direction for AWS. I hope to see AWS continue to develop more Edge based services for customers. I will be keeping a close eye on developments in this space.

This year (2016) has been a big year of change for me. I started blogging, serverless development and working for [A Cloud Guru](https://acloud.guru). This will be the last blog post for me this year. I hope you have [found](https://blog.johncmckim.me/express-to-aws-lambda-part-1-a057096abe34) [something](https://blog.johncmckim.me/serverless-framework-the-good-parts-9d84e5a02467) I [have](https://serverless.zone/abstracting-the-back-end-with-faas-e5e80e837362) [written](https://serverless.zone/ci-cd-with-serverless-v1-0-0-beta-ccb332944c6) [this](https://serverless.zone/serverless-architectures-9e23af71097a) [year](https://read.acloud.guru/adopting-serverless-people-and-devops-336e3ab89e96) [helpful](https://read.acloud.guru/aws-re-invent-2016-keynote-summary-39d254447747).

I will be back next year with more ideas to share. If you want to read more on Serverless don’t forget to follow me [@johncmckim](https://twitter.com/johncmckim) on Twitter or Medium.

![](/static/medium/2000-1*4SAJI2W8hInwwRCn7R8a6A.png)

### A Cloud Guru

The mission of A Cloud Guru is to engage individuals in a journey to level-up their cloud computing skills by delivering the world’s leading educational content designed to evolve both mindsets and careers.
> # “Let no man in the world live in delusion. Without a Guru, none can cross over to the other shore.“ — Guru Nanak

Our [courses](https://acloud.guru/courses) are delivered by industry experts with a shared passion for cloud computing. We strive to serve our growing community of cloud gurus, who generously contribute their insights in our [forums](https://acloud.guru/forums/home), workshops, meet-ups, and [conferences](https://acloud.guru/serverless).

*Keep up with the A Cloud Guru crew [@acloudguru](https://twitter.com/acloudguru)*
