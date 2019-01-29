---
layout: blog
category: blog
title: "My AWS re:Invent 2016 Serverless Wishlist"
subtitle: The announcements I’m hoping to unwrap
poster_img: static/medium/17664-1*3npkg_MuveHoIhOXFz4mjg.jpeg
description: >
    AWS re:Invent is just around the corner. AWS re:Invent is the global conference for Amazon Web Services.
    I am lucky enough this year to be going with the A Cloud Guru team.
    I am excited as this will be the first time I have attended...
---

# My AWS re:Invent 2016 Serverless Wishlist

The announcements I’m hoping to unwrap

![](/static/medium/17664-1*3npkg_MuveHoIhOXFz4mjg.jpeg)

AWS re:Invent is just around the corner. AWS re:Invent is the global conference for Amazon Web Services. I am lucky enough this year to be going with the [A Cloud Guru](https://acloud.guru) team. I am excited as this will be the first time I have attended.

I am looking forward to meeting people that I have connected with in the Serverless community. The people I talk to about Serverless on GitHub, forums or in Slack live right across the globe. AWS re:Invent will be a great opportunity to meet people face to face.

AWS uses re:Invent to announce new services and major updates to their platform. Those of us building Serverless systems have been waiting for particular updates. I wanted to share some of the platform updates I would like to see at AWS re:Invent.

**UPDATE: **AWS has added added some of these features before I was able to publish this article. I’m going to leave the article as it was originally written and add updates for features that are released.

### Lambda Environment Variables

Every developer using Lambda that I speak to wants environment variable support in Lambda. Separating config from code is a core tenant of [12 factor apps](https://12factor.net/config). This separation is usually achieved through environment variables.

The work around for this is to create a .env file during build and load it with a library ([node](https://www.npmjs.com/package/dotenv), [python](https://github.com/theskumar/python-dotenv)). But doing this means we are bundling config (including secrets) with our code.

Lambda creates the environment our code runs in. As a result, the solution can only come from Lambda itself. That is why support for environment variables is at the top of my AWS re:Invent wish list.

**UPDATE:** AWS released this feature before re:Invent on 18-Nov. Please see [the docs](http://docs.aws.amazon.com/lambda/latest/dg/env_variables.html) for more information.

### Simple Notification Service (SNS) Subscription in CloudFormation

If you’re building a Serverless system, chances are you’re using CloudFormation. Infrastructure as Code is an important part of developing Serverless systems on AWS.

SNS is a Pub/Sub system that integrates with AWS Lambda. Developers can subscribe Lambda functions to an SNS topic. The function is invoked for each message published on the SNS topic. This allows developers to create decoupled event driven systems.

But there’s a catch. AWS CloudFormation, does not support subscribing to an SNS topic independently of creating that topic. This means the service that creates the SNS topic must know about all the subscriptions.

There is a work around for this problem using a [custom CloudFormation resource](https://gist.github.com/martinssipenko/4d7b48a3d6a6751e7464). But, this is such a common scenario it should be supported out of the box. While it is only a small change, it is an important change if you’re building a Serverless system. This is why it is high on my re:Invent wish list.

**Update:** AWS released this feature before re:Invent on 17-Nov. Please see [the docs](http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sns-subscription.html) for more information.

### Simple Queue Service (SQS) Lambda Events

AWS has three messaging services, SNS, Kinesis Streams and SQS. SQS is a fully managed message queue service. SQS was the first service launched by Amazon Web Services. But unfortunately, it wasn’t one of the first services they integrated with Lambda.

Lambda currently supports events from SNS and Kinesis Streams. These messaging systems help developers decouple their systems. But both of these services will drop messages on failures. SQS is different as it supports dead letter queues. This is useful for situations where you want to avoid lost messages.

While it is possible to build a system that will [poll SQS using Lambda](http://theburningmonk.com/2016/09/aws-lambda-use-recursive-function-to-process-sqs-messages-part-2/), it is not easy. Which is why support for SQS events in Lambda is high on my re:Invent wish list.

**UPDATE:** We didn’t see direct SQS support. But, Tim Wagner announced Dead Letter Queues for Lambda events. This fills a gap that for users that want greater reliability.

### API Gateway Custom Domain Improvements

API Gateway Custom Domains could be used to develop nice deployment and service discovery solutions.

API Gateway allows you to map an Endpoint to a path on a Custom Domain. This allows your clients to easily discover your services. Rather than pointing at https://*api_id*.execute-api.*region*.amazonaws.com/*stage_name*, the client can use https://my.domain.com/service_name. This also allows you to replace the Endpoint behind that path without disrupting the client. To do this right now requires manual configuration or scripts that use the AWS CLI.

CloudFormation support for Custom Domains is on my wish list for AWS re:Invent. This should include support for provisioning certificates through Amazon Certificate Manager (ACM).

[Ben Kehoe](https://medium.com/@ben11kehoe) spoke about his [ideas for Red/Back deployments](https://youtu.be/rsh6eKc1tVM?t=27m35s) at ServerlessConf. While it is not high on my list now, the ability to perform incremental rollouts would be a great addition.

### New Language and Runtime Support on Lambda

Lambda currently only supports three languages and four runtimes. Adding support for more languages will help bring more developers into the ecosystem. It will also allow developers to choose languages best suited for the task they are trying to solve.

I have a few runtimes on my wish list for AWS re:Invent. As a former .NET developer I would love to see support for C# on the .NET Core runtime. I would also like to see an updated NodeJS runtime as Node 6.9.0 is now the current LTS version of Node. I am also interested in learning Golang and would like to see native support of Golang on Lambda. Other languages that I would like to see but would not use include Swift, Ruby and PHP.

More generally I would like to see more regular runtime updates to Lambda. I do not want to wait for AWS re:Invent each year to get updated versions of language runtimes.

**UPDATE:** [Werner Vogels](https://medium.com/@Werner) announced C# on Lambda at his Re:Invent Keynote. I would have like to have seen more language support. But, C# is a great addition.

### Offline Development

The inability to easily run AWS services in an offline development environment is a pain point for Serverless developers. There are various community built solutions for this. But each has shortcomings.

The biggest issue that affects all the solutions is creating a wholistic solution. Serverless developers create systems that receive and trigger events from many sources. There is no offline solution that allows us to simulate, Lambda, Api Gateway, S3, SNS, SQS and Kinesis all at the same time.

The ability to develop against AWS services locally is on my AWS re:Invent wish list. It would significantly improve the experience of developing Serverless systems.

### Other Items

There are a few other items on my list that I would like to see.

I would like to see a promise of regular updates to CloudFormation. Infrastructure as code is a key aspect of Serverless development. Waiting for CloudFormation to add support for new features holds us back.

I would like to see docker container support on AWS Lambda. The ability to define a container and entry point would give developers great flexibility. This would allow developers to pre-install binaries and libraries into the environment.

At ServerlessConf in May this year, Tim Wagner teased the New York audience with the promise of a Framework called Flourish. Since then it has been radio silence on what Flourish might be. I would like to know what it is purely to satisfy my curiosity.

**UPDATE:** Flourish has been renamed to the Serverless Application Model. It was released before re:Invent on the 18-Nov. You can read more on the [blog post](https://aws.amazon.com/blogs/compute/introducing-simplified-serverless-application-deplyoment-and-management/) announcing the feature.

## What’s Next

Look out for the A Cloud Guru team at re:Invent. If you’re building something or are interested in Serverless come and say hello to our team.

A number of the lecturers will be in attendance including [Ryan Kroonenburg](https://twitter.com/KroonenburgRyan), [Adrian Cantrill](https://twitter.com/adriancantrill), [Nick Triantafillou](https://twitter.com/xelfer) and [Mike G Chambers](https://twitter.com/mikegchambers). AWS re:Invent is a great opportunity to meet our lecturers in person.

If you want to meet me at re:Invent send me a tweet [@johncmckim](https://twitter.com/johncmckim). If you want to read more on Serverless don’t forget to follow me on Medium.

![](/static/medium/2000-1*4SAJI2W8hInwwRCn7R8a6A.png)

### A Cloud Guru

The mission of A Cloud Guru is to engage individuals in a journey to level-up their cloud computing skills by delivering the world’s leading educational content designed to evolve both mindsets and careers.
> # “Let no man in the world live in delusion. Without a Guru, none can cross over to the other shore.“ — Guru Nanak

Our [courses](https://acloud.guru/courses) are delivered by industry experts with a shared passion for cloud computing. We strive to serve our growing community of cloud gurus, who generously contribute their insights in our [forums](https://acloud.guru/forums/home), workshops, meet-ups, and [conferences](https://acloud.guru/serverless).

*Keep up with the A Cloud Guru crew [@acloudguru](https://twitter.com/acloudguru).*
