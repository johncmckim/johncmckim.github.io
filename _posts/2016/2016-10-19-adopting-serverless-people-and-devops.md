---
layout: blog
category: blog
title: "Adopting Serverless — People and DevOps"
subtitle: The first thing you should consider when adopting serverless is your people
poster_img: https://cdn-images-1.medium.com/max/3840/1*qIFXKFyIkca-C52vK5eaig.jpeg
description: >
    Serverless Architectures are an emerging trend in cloud computing. If you have been to an AWS summit or developer day this year (2016), Serverless has been a major theme. AWS is not the only provider pushing serverless...
---

# Adopting Serverless — People and DevOps

The first thing you should consider when adopting serverless is your people

![Freedom: “Going Serverless”](https://cdn-images-1.medium.com/max/3840/1*qIFXKFyIkca-C52vK5eaig.jpeg)*Freedom: “Going Serverless”*

Serverless Architectures are an emerging trend in cloud computing. If you have been to an AWS summit or developer day this year (2016), Serverless has been a major theme. AWS is not the only provider pushing serverless. Azure, Google, IBM and WebTask are all pushing hard to develop their Serverless services.

There are great developers all around the world building Serverless systems. [A Cloud Guru](https://acloud.guru/) launched an entirely Serverless online training system in late 2015. This allowed A Cloud Guru to iterate quickly and scale easily.

But, is a Serverless Architecture right for you? What are the factors to consider before choosing to develop a Serverless system?

Over the coming weeks we will discuss the issues we think you should consider. We’ve selected these issues based on our experience at A Cloud Guru. Let’s start with People and DevOps.

## People

Software is created by people. The first thing you should consider when evaluating Serverless is your people.

### Knowledge

To build a Serverless system, developers must choose and utilise many different cloud services. Knowledge of the available services and how each service works is critical.

If you need a messaging system on AWS you can choose between SNS, SQS, Kinesis or even DynamoDB streams. Each of these services integrates with Lambda differently and handles failures differently. Understanding those differences is critical when making decisions about what services to use.

If your team is not experienced with cloud services, there are various ways to gain it. [Meetup groups](https://github.com/serverless-meetups/main) and [online forums](https://acloud.guru/forums/all/all) are great places to connect with other developers. If you need to learn about AWS, [A Cloud Guru](https://acloud.guru/) delivers great training courses online.

### **Access to Services**

Serverless systems are usually comprised of services provided by many different providers. Imagine a system with 5 different cloud providers built by a team of 4 developers. Do you have one account per developer for each service? Are developers able to share accounts for some services? Do you also need separate accounts for production and staging? The number of accounts you need to manage can multiply quickly with Serverless systems.

Managing access to these services is important. Organisations need to be able to grant and deny access to services as employees join and leave the organisation. A password manager can go a long way to solving this problem. For larger organisations, SSO systems can help. But you may need to create accounts for service providers that do not support SSO.

## DevOps

A common misconception about Serverless is that it is NoOps. Just because you do not manage the servers, does not mean there are no operational tasks. You still need to test, deploy, log and monitor your code.

### Development Process

There is a strong relationship between the development process and code quality. If developers are battling tools to produce code, they will not be writing quality code.

There are many tools available to developers for Serverless systems. [Serverless Heroes](http://serverlessheroes.com/) has a good list of [tools and frameworks](https://github.com/ServerlessHeroes/serverless-resources#tools--frameworks). When choosing a tool you should consider the following:

* How do I define my resources?

* How easy is it to deploy my environment to the cloud?

* Can I develop offline?

* What is the support and community like?

Our choice at A Cloud Guru is the [Serverless Framework](http://serverless.com). The Serverless Framework has a great team working on the tool and an engaged community.

### Deployments

If you are familiar with Microservice deployments, deploying Serverless systems will not be unfamiliar. As with any Microservice, each serverless system should be independently deployable. This requires you to architect your systems with this in mind. You will need to ensure your services own their own data and are discoverable by other services.

Serverless depend on infrastructure to provide functionality. Infratructure as code is a must for Serverless systems. Deploying a Serverless system involves provisioning resources and deploying code. Tools like the Serverless Framework can help with this. The Serverless framework will upload your code to AWS and provision resources using CloudFormation.

### Testing

Just like any piece of software, serverless systems need to be tested. Developers should be creating unit tests and integration tests for each Microservice. There is nothing new in this. Serverless systems integrate many services to provide functionality. What might be different is the number of external services your Microservice relies on.

Unit testing services that depend on external services requires mocking out those services. You may find that you need to mock a large number of services when writing unit tests.

Integration testing serverless services is vital. The aim is to ensure each service integrates with services it depends on. You need to be able to deploy the service under test and any dependent services into a test environment. You may also need test accounts for external services i.e. Auth0, Stripe ect.

Testing Serverless services can be hard but it is important to get it right.

### Logging and Monitoring

How do you monitor an application when you cannot access the servers it runs on? Furthermore, how do monitor an application where you code is executed as independent functions?

For FaaS services capturing and storing logs becomes the responsibility of the provider. AWS Lambda ships logs to CloudWatch and WebTask allows you to [stream logs](https://webtask.io/docs/api_logs) in realtime.

What these services do not provide is a way to correlate logs end-to-end. If I have a service that looks like this:

![Notifications Service from my Garden Project](https://cdn-images-1.medium.com/max/2000/1*bXkwsZ2CiNyerGZ1FOMH5g.png)*Notifications Service from my Garden Project*

To diagnose a failure, I need to correlate the execution logs for both of those Lambdas. This can be difficult (or impossible) to do manually.

Monitoring systems is not all about logging. You also need to monitor other metrics like failures, execution duration, CPU and Memory. AWS provides CloudWatch which provides basic metrics for your functions. Services like [IOPipe](https://www.iopipe.com/) aim to provide more detailed monitoring for serverless functions.

## What’s Next?

DevOps and People are not the only factors to consider when going Serverless. My next articles will look at the issues relating to Architectures, Security and Outsourcing.

If you want to read more on Serverless follow me on Medium or [Twitter](https://twitter.com/johncmckim).

![](https://cdn-images-1.medium.com/max/2000/1*4SAJI2W8hInwwRCn7R8a6A.png)

### A Cloud Guru

The mission of A Cloud Guru is to engage individuals in a journey to level-up their cloud computing skills by delivering the world’s leading educational content designed to evolve both mindsets and careers.
> # “Let no man in the world live in delusion. Without a Guru, none can cross over to the other shore.“ — Guru Nanak

Our [courses](https://acloud.guru/courses) are delivered by industry experts with a shared passion for cloud computing. We strive to serve our growing community of cloud gurus, who generously contribute their insights in our [forums](https://acloud.guru/forums/home), workshops, meet-ups, and [conferences](https://acloud.guru/serverless).

*Keep up with the A Cloud Guru crew [@acloudguru](https://twitter.com/acloudguru).*
