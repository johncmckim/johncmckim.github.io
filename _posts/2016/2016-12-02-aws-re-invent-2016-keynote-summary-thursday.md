---
layout: blog
category: blog
title: "AWS re:Invent 2016 — Thursday’s Keynote"
subtitle: A Summary of the Thursday Keynote by Werner Vogels
poster_img: static/medium/4800-1*6_v7P0Iac_zChhG0lsz5ow.jpeg
description: >
    The Keynote by Andy Jassy yesterday was packed with updates and announcements.
    I was most excited by the new Amazon AI and IoT services. But the most notable
    omission from yesterday was updates to the Lambda platform itself...
---

# AWS re:Invent 2016 — Thursday’s Keynote

A Summary of the Thursday Keynote by Werner Vogels

![](/static/medium/4800-1*6_v7P0Iac_zChhG0lsz5ow.jpeg)

The Keynote by [Andy Jassy yesterday](https://read.acloud.guru/aws-re-invent-2016-keynote-summary-39d254447747) was packed with updates and announcements. I was most excited by the new Amazon AI and IoT services.

But the most notable omission from yesterday was updates to the Lambda platform itself. So I had great expectations for the announcements today.

[Werner Vogels](https://medium.com/@Werner) did not disappoint. We saw a range of great announcements for developers on AWS.

![[Werner Vogels](https://medium.com/@Werner) did not disappoint.](/static/medium/4800-1*JK9SjBVJVhac2lFhwsSaFg.png)*[Werner Vogels](https://medium.com/@Werner) did not disappoint.*

## Server Operations

Managing and operating servers is still a problem many people face. AWS announced a couple of interesting updates to assist with this problem.

[**OpsWorks and Chef](https://aws.amazon.com/opsworks/)** — Fully managed Chef Server

* Manage your AWS environments with OpsWorks + Chef

Availability: Now

[**Ec2 Systems Manager](https://aws.amazon.com/about-aws/whats-new/2016/12/aws-config-now-integrates-with-amazon-ec2-systems-manager-to-provide-continuous-monitoring-and-governance-of-software-on-your-ec2-instances-and-on-premises-systems/) **— Automate OS management on Ec2

* Understand system configuration

* Automatically manage operating systems

Availability: Now

## Development tools

AWS continues to improve their sweet of tools for developers. The addition of CodeBuild completes Dev / Build / Test / Deploy pipeline services by AWS.

[**CodeBuild](https://aws.amazon.com/blogs/aws/aws-codebuild-fully-managed-build-service/)** — Managed build service

* Pay by the minute for builds

* Build using docker containers

* Run unit tests

* Integrates with CodePipeline

* Get started — [https://aws.amazon.com/codebuild/](https://aws.amazon.com/codebuild/)

Availability: Now

## Monitoring Operations

Monitoring applications is critical for any software deployed to AWS. AWS is encouraging users to develop distributed systems with Lambda. But until now, monitoring distributed systems remained a difficult problem. Two new services by AWS helps fill this gap.

[**Amazon X-Ray** ](https://aws.amazon.com/blogs/aws/aws-x-ray-see-inside-of-your-distributed-application/)— Insight into Application and Service Execution

* Track executions across multiple AWS Services

* Debug distributed applications

* Visualise the performance of your components through graphs

Availability: Preview

[**AWS Personal Health Dashboard** ](https://aws.amazon.com/blogs/aws/new-aws-personal-health-dashboard-status-you-can-relate-to/)— Heath dashboard of the AWS services you use

* Get notified when there are operational issues with AWS services

* Automatically respond to AWS system events through lambda

Availability: Now

## Security

Amazon often tells customers Security is the first thing you need to think about. The addition of Amazon Sheild will help developers improve their security posture on AWS.

[**Amazon Shield](https://aws.amazon.com/blogs/aws/aws-shield-protect-your-applications-from-ddos-attacks/)** — DDoS protection

* Protect agains various types of DDoS attacks Volumetric, State-exhaustion by default

* Combine with WAF to protect against Application Layer

* Pay for Shield Advanced to protect against sophisticated attacks

* Shield Advanced allows you to work with AWS DDoS protection team for advanced support

Availability: Now

## Mobile Services

Yesterday we say a focus on intelligent services with Amazon AI. Today we saw a continuation of that with Amazon Pinpoint.

[**Amazon Pinpoint** ](https://aws.amazon.com/blogs/aws/amazon-pinpoint-hit-your-targets-with-aws/)— Targeted notifications for Mobile Users

* Understand user behaviour

* Target and notify users

* Track and monitor engagement

* Get started — [https://aws.amazon.com/pinpoint/](https://aws.amazon.com/pinpoint/)

Availability: Now

## Big Data and Compute

AWS excels at developing solutions for undifferentiated heavy lifting. Extract Transform Load (ETL) and Batch processing can be difficult to develop. But the implementation of your ETL and Batch processing solution is not what gives you a competitive advantage. Amazon Glue and AWS Batch will allow developers to focus on creating big data and compute jobs that provide value.

**Amazon Glue **— Fully-managed data catalog and ETL service

* Integrates with S3, RDS, Redshift & any JDBC database

* Build transformations jobs through a console

* Schedule and run transformation jobs

* Trigger ETL jobs on changes

* Get started — [https://aws.amazon.com/glue/](https://aws.amazon.com/glue/)

Availability: Coming Soon

[**AWS Batch](https://aws.amazon.com/blogs/aws/aws-batch-run-batch-computing-jobs-on-aws/)** — Managed Batch Compute service

* Run batch jobs on the spot market

* Automatically scale compute up and down based on jobs

* Able to specify priority jobs

Availability: Preview

## Container Management

The Amazon Elastic Container Service (ECS) is the container management solution. Today we saw a great initiative with an open source project that will fill some of the gaps in ECS.

[**Blox](https://aws.amazon.com/blogs/aws/blox-new-open-source-scheduler-for-amazon-ec2-container-service/)** — Container management and orchestration

* A group of open source projects

* [Cluster state service](https://github.com/blox/blox/tree/dev/cluster-state-service)

* [Daemon scheduler](https://github.com/blox/blox/tree/dev/daemon-scheduler)

* Netflix will be a contributor using experience from titus

* Get started — [https://blox.github.io/](https://blox.github.io/)

Availability: Some now, more projects to come

## Serverless

It’s no secret that I am a big fan of Serverless. [I was hoping](https://read.acloud.guru/my-aws-re-invent-2016-wishlist-cc6e00126789) AWS would continue to invest in and improve AWS Lambda.

[**C# Runtime on AWS Lambda** ](https://aws.amazon.com/about-aws/whats-new/2016/12/aws-lambda-supports-c-sharp/)— a new runtime for C#

* Using .NET Core 1.0

* Upload the compiled DLL’s to AWS Lambda

Availability: Now

[**Lambda@Edge** ](https://aws.amazon.com/blogs/aws/coming-soon-lambda-at-the-edge/)— Execute Lambda functions at CloudFront Edge locations

* Add request processing logic to CloudFront

* Cannot call external web services

* Cannot call AWS services

* Must complete in 50ms and use less than 128Mb of Memory

Availability: Preview

[**AWS Step Functions](https://aws.amazon.com/blogs/aws/new-aws-step-functions-build-distributed-applications-using-visual-workflows/)** — Coordinate components of a distributed application

* A fully managed state machine for lambda functions

* Visualise application workflows

* Sequential steps, Parallel steps, Branching steps

Availability: Now

## What’s Next

There was a clear focus on Serverless by AWS at today’s keynote. I’m heading to the Serverless mini-conference today and hope to see more Serverless announcements.

If you’re at AWS Re:Invent come and say hi at the re:Play party tonight. If you want to read more on Serverless don’t forget to follow me on [Twitter](https://twitter.com/johncmckim) or Medium.

Thanks to Daniel Parker for the photos