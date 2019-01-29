---
layout: blog
category: blog
title: "Slack Webhooks with the Serverless Framework"
subtitle: Building a notifications system for my garden
poster_img: static/medium/2000-1*0rvxfaQlafsRjqw_GV9__Q.png
description: >
    I have been writing about a problem I have with my garden. I often forget to water
    my plants and I need a system to help. To help solve this problem I created a
    dashboard that allows me to track moisture levels...
---

![](/static/medium/2000-1*0rvxfaQlafsRjqw_GV9__Q.png)

# Slack Webhooks with the Serverless Framework

### Building a notifications system for my garden

I have been writing about a [problem I have with my garden](https://serverless.zone/serverless-architectures-9e23af71097a). I often forget to water my plants and I need a system to help. To help solve this problem I [created a dashboard](https://serverless.zone/graphql-with-the-serverless-framework-79924829a8ca) that allows me to track moisture levels.

A dashboard is great for viewing history and trends. But checking the dashboard to see if water levels drop is not ideal. I wanted the system to alert me when the plants required watering.

I created a Slack integration to notify myself when the plants need watering. Alternatives to Slack include text messages, emails or a Facebook Messenger bot. I chose to use Slack as I wanted to learn how to create Slack bots.

## Slack Notifications

In case you are not familiar with it, [Slack](https://slack.com/) is a messaging app for teams. Slack has a great API that allows developers to create [custom integrations](https://api.slack.com/custom-integrations). There are four main types of Slack integrations:

* [Incoming Webhooks](https://api.slack.com/incoming-webhooks) — send a message to slack

* [Slash commands](https://api.slack.com/slash-commands) — respond to commands users type into Slack

* [Bot users](https://api.slack.com/bot-users) — programmable users

* [Outgoing Webhooks](https://api.slack.com/outgoing-webhooks) — invoke HTTP a endpoint on a message

While a Bot user would be the best integration long term. I decided to start with Incoming Webhooks. They are simple to implement and a great way to get started with the API.

### Infrastructure

For the notifications system I have used three AWS services:

* IoT Hub — Internet of Things platform

* Lambda — Function as a Service (FaaS)

* Simple Notification Service (SNS) — Notifications and PubSub messaging

The AWS IoT Hub does much of the heavy lifting in this system. The IoT Hub provides device authentication, communication and integration with other AWS services.

In this system, the IoT Hub invokes a Lambda function on each moisture level reading it receives. The Lambda function checks if the level is ‘low’ and publishes an SNS message if required. SNS invokes a second Lambda function that sends an Incoming Webhook to Slack.

### Code

The first function in the notification system is the *decider*. The *decider* checks if the current moisture level is low and publishes an SNS message if it is. The message gets published to the *slack-notify-{env}* topic.

<iframe src="https://medium.com/media/a752bd1478c48dc241fb363788a1b970" frameborder=0></iframe>

The second function in the notification system is the Slack *notifier*. SNS invokes this function when a message published to the *slack-notify-{env} *topic.

The function posts the text from the SNS topic to the Slack Webhook. This sends a message to the user notifying them of the low moisture level.

<iframe src="https://medium.com/media/ae09b1a54143101dbafe4579f7434dc3" frameborder=0></iframe>

## System Design

There are alternative designs you could use for this system. With so little code in each function you may be wondering why I used two functions and not one. You could also use SQS or Kinesis instead of SNS. So why did I choose this design?

### Single Purpose Functions

It would have been simple to implement Slack Webhooks with one function. So why did I choose to use two? [Paul Johnston](https://medium.com/@PaulDJohnston) wrote a great article on [A Few Serverless “Rules of Thumb”](https://medium.com/@PaulDJohnston/a-few-serverless-rules-of-thumb-309764281921). The first rule in the article is
> Zero or One data transformations per nano-function

Or more generally each function should have a single responsibility. Separating the *decision* and *notification* makes each function responsible for only one task.

**High Cohesion and Loose Coupling
**Single purpose functions with message channels are highly cohesive and loosely coupled. Components with [high cohesion](https://en.wikipedia.org/wiki/Cohesion_%28computer_science%29) are easier to understand as they focus on a specific task. [Loosely coupled](https://en.wikipedia.org/wiki/Coupling_%28computer_programming%29) components are easier to change and maintain.

**Unit Testing**
Single purpose functions are easier to test and debug. Limiting functions to one responsibility means your tests are also focused on one responsibility. This makes it easier to write tests for expected behaviour and edge cases.

**Failures and Debugging**
Serverless systems have many points of failure. Identifying where issues are occurring is half the battle with Serverless systems. If your functions interact with many services and one of those services fails it is hard to see where the problem is. Limiting functions to a single purpose helps you identify where problems are occuring.

**Monolith First**
You could make a good argument to create a [Monolith first](http://martinfowler.com/bliki/MonolithFirst.html). If you do not understand your boundaries well it may be better to start with one function. As you learn what the boundaries in your system are, you should refactor to single purpose functions.

### Message Bus

AWS has three services that I could have used as the messaging system, SNS, Kinesis Streams and SQS. Each service has different advantages and trade offs.

**Kinesis Streams
**Kenesis streams allow developers to capture and process large volumes of streaming data. Developers are able to use Lambda functions to process the data in the stream. Lambda creates an instance of your function for each shard in the stream. The function receives streaming data in batches.

The failure mode for Kinesis is to retry each record until it succeeds or the message expires.

**Simple Queue Service (SQS)
**SQS is a message queue service that provides reliability and durability. There is no direct integration between Lambda and SQS. To make this work you need to poll SQS from Lambda. [This article](http://theburningmonk.com/2016/09/aws-lambda-use-recursive-function-to-process-sqs-messages-part-2/) has a great guide on setting this up.

The failure mode for SQS is [dead letter queues](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/SQSDeadLetterQueue.html). SQS moves messages to second dead letter queue after x attempts to process the message.

**Simple Notification Service (SNS)
**SNS is a notification and PubSub service. When used with Lambda, SNS will execute your Lambda function for every notification. This makes it a good PubSub system if you can tolerate failed messages.

The failure mode for SNS is a certain number of retries before giving up.

**Why I Chose SNS
**I chose to use SNS as the notifications are time sensitive. If the system fails, I don’t want to receive a backlog of messages when the system recovers. It also allows me to add other notifications by subscribing new functions to the same topic.

Different use cases will need different cloud services. Understanding how each cloud service works is an important part of building Serverless systems.

## Notifications in action

To test the notifications, I setup a node script to publish moisture levels to the AWS IoT hub.

![](/static/medium/2896-1*dooPhPpg1OH6ExpXc6wM1g.png)

I am happy with this as a starting point. But there is a lot more I want to do with Chat bots. I want to improve the Slack integration by adding support for incoming messages. I also want to explore NLP with [Wit](https://wit.ai/) and other platforms (Facebook Messenger).

## What’s Next

If you want a look at the code you can find it on [Github](https://github.com/garden-aid/chat-bff). Next week I will write about the AWS IoT Hub and IoT Rule Actions. To learn about more about GraphQL and the Serverless Framework try this [video course](https://acloud.guru/learn/serverless-with-graphql) that covers both in-depth.

If you want to see how I created the rest of the project, follow [Serverless Zone](https://serverless.zone/) and myself on Medium or [Twitter](https://twitter.com/johncmckim).
