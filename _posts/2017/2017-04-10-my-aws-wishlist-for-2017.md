---
layout: blog
category: blog
title: "My AWS Wishlist for 2017"
description: >
  TODO DESCRIPTION
---

# My AWS Wishlist for 2017

As a developer working on a 100% serverless application, I find myself wanting more so I can do with less

![Wish upon a star —[ from unspash](https://unsplash.com/@vincentiu?photo=ln5drpv_ImI)](https://cdn-images-1.medium.com/max/5184/1*cGuojhsF_wDNnB73PbHAxQ.jpeg)*Wish upon a star —[ from unspash](https://unsplash.com/@vincentiu?photo=ln5drpv_ImI)*

Amazon Web Services (AWS) is well known for listening to customer feedback. This has been evident in the features they have delivered for their Serverless platform.

But as a developer working on a 100% serverless application, I find myself wanting more.

<iframe src="https://medium.com/media/d4d2370eb065ca973d576ee10a8260cb" frameborder=0></iframe>

Unfortunately I can’t fit all my requests into 140 characters. So I decided to write a blog post instead.

## Lambda

### Code Storage Management

At [A Cloud Guru](https://acloud.guru/) we often hit the Lambda code storage limit (75GB). It happens often enough that I wrote a script to [prune old versions of Lambda functions](https://gist.github.com/johncmckim/e35e2861bbce8612a88953f791d0493b).

I would like to be able to increase our code storage limit through support. But, even with an increase, we would still hit that code storage limit.

So I would also like to see Lifecycle rules for Lambda versions. Lifecycle rules should remove versions after a period of time and/or number versions.

### Secure Environment Variables in CloudFormation

Lambda allows developer to set environment variables in the function configuration. Lambda encrypts environment variables using KMS and stores them in a secure location.

But, this is not supported by CloudFormation. Environment variables set via CloudFormation appear as plaintext in the template.

To avoid leaking secrets, we encrypt secrets using KMS before using them in CloudFormation. But this means we have to decrypt values in our Lambda functions using KMS.

I would like to be able to mark an environment variable as encrypted and have Lambda decrypt the value automatically.

### Simple Queue Service (SQS) Event for Lambda

AWS has three messaging services, SNS, Kinesis Streams and SQS. SQS is a managed message queue service. But, processing messages from an SQS queue with Lambda is not built into the platform.

I would like to be able to see support for SQS Message Events with Lambda. I suspect [we may see it soon](https://twitter.com/a_wallberg/status/844686060793815049).

### New Runtimes

Lambda supports four languages and five runtimes (excluding edge). Support for NodeJS, Python, C# and Java cover a large number of developers.

Adding support for more languages would help bring more developers into the ecosystem. I would like to see native support for Golang, Swift, Ruby and PHP.

I would also like to be able to BYO docker image on Lambda. This would allow developers to use their preferred language and use pre-installed binaries on Lambda.

## API Gateway

### Support for Websockets

AWS does not yet have a good solution for web applications that need Websockets. While the AWS IoT service supports Websockets, it is not suitable for web applications in many scenarios.
> **Update:** I’m wrong about this ^. It seems I was mistaken in how AWS IoT authenticates web users. But it certainly could be easier. Thanks to [Preston Tamkin](undefined) for the responses to this.

I would like to see Websockets supported in API Gateway. It should trigger functions when it receives a message. It would also need an API for sending messages to clients.

To secure messages it should support Custom Authorizers that allow or deny the user’s access to channels. Channels would allow developers to segment messages and users.

### Custom Domain in CloudFormation

API Gateway Custom domains allow you to put multiple API Gateways behind one domain. This is useful for Serverless applications that multiple backend services.

Infrastructure as Code is critical for Serverless applications. But Custom Domains are not supported by CloudFormation.

I would like to see CloudFormation support for Custom Domains. Developers should be able to specify a domain name and have a SSL certificate provisioned by [ACM](https://aws.amazon.com/certificate-manager/).

## DynamoDB

### Snapshots

A backup and restore story should be a core element of a database. But unlike other AWS services, you cannot snapshot and restore a DynamoDB table.

It is possible to backup data to S3 using Data Pipeline or a custom solution from a DynamoDB Stream. But in my opinion, a backup solution should be part of the product.

I would like to see the ability to configure automatic backups and a restore feature for DynamoDB.

### Auto Scaling

DynamoDB provides configurable performance through read and write capacity units. Developers must choose a number of capacity units based on expected usage.

DynamoDB does not automatically scale based on usage. If usages exceeds the provisioned capacity, DynamoDB will start to throttle and reject requests.

I would like to an option to automatically scale capacity as required.

### Capture Expired Stream Messages

DynamoDB streams allow developers to act upon changes to a DynamoDB table. New, updated and deleted records are put onto a stream which can trigger a Lambda function.

Data is retained in the stream for 24 hours. Under normal circumstances this is enough time to process a message. But…

<iframe src="https://medium.com/media/7f267c2980bdf4c528b9a82637297a16" frameborder=0></iframe>

Sometimes your code breaks or the stream contains a bad message. If this happens the message is lost if processor is not fixed within 24 hours.

I would like to be able to capture failed messages for manual processing. This would allow developers to more easily repair a system after a failure.

## CloudFormation

### CloudFormation types for CloudWatch Dashboards

At [A Cloud Guru](undefined) we use CloudWatch Alerts to monitor our functions. We created a [plugin for the Serverless Framework](https://github.com/ACloudGuru/serverless-plugin-aws-alerts) to create these alerts.

We also use CloudWatch dashboards to monitor our functions. But we have to create and update these dashboards ourselves.

I would like to see CloudFormation support for CloudWatch dashboards. This would allow us to automatically create and update dashboards that monitor our environment.

### CloudFormation support at Launch

Infrastructure as Code is a key part of developing Serverless applications. But too often AWS will release a feature without CloudFormation support at launch.

This limits the ability for developers to adopt and test new AWS features for Serverless applications.

I would like to see CloudFormation support for new features related to Serverless at launch.

## CodePipeline

### Build multiple branches per pipeline

CodePipeline is a continuous delivery service on AWS. You can use it to automate your software test and release process.

The Github source for CodePipeline only supports building one branch per pipeline. This is a deal breaker for teams that want run automatic tests on all their branches.

I would like to be able to have a single pipeline that is triggered by changes to any branch in a repository.

## Edge Computing

For a global application, the speed of light can be the [biggest bottleneck](https://read.acloud.guru/aws-compute-at-the-edge-62707b94fc9c). Edge based services overcome this by moving running at the edge of a network.

Developing applications that perform logic and store data at the edge is not a simple task. Creating solutions for difficult problems is something AWS excels at.

I would like to see a compute and data service that operates at the edge.

## What’s Next

This is a big list of wishes. Some of them might come true and others may not. Whatever the case, we will keep building with the great set of tools we have.

If you want to read more on Serverless don’t forget to follow me [@johncmckim](https://twitter.com/johncmckim) on Twitter or Medium.
