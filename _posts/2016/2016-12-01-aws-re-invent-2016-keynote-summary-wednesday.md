---
layout: blog
category: blog
title: "AWS re:Invent 2016 — Wednesday’s Keynote"
subtitle: A Summary of the Wednesday Keynote by Andy Jassy
poster_img: static/medium/5000-1*AxWQs0IucWfpipxzjhMTCA.jpeg
description: >
    After two big days of sessions and events at AWS re:Invent, Wednesday started with the
    first of two general keynotes. There was an air of excitement for the first round of
    announcements by AWS CEO, Andy Jassy...
---

# AWS re:Invent 2016 — Wednesday’s Keynote

A Summary of the Wednesday Keynote by Andy Jassy

![](/static/medium/5000-1*AxWQs0IucWfpipxzjhMTCA.jpeg)

After two big days of sessions and events at AWS re:Invent, Wednesday started with the first of two general keynotes. There was an air of excitement for the first round of announcements by AWS CEO, Andy Jassy. We saw a wide range of announcements for infrastructure and platform services.

![](/static/medium/2000-1*mnz7jdOLLQgTvoLborKr-A.jpeg)

## Compute

AWS continued to improve their compute offerings this year with updates to their Infrastructure as a Service offerings. The new instance types and services provides tools for those who have found existing offerings do not quite fit their needs.

[**EC2 Instance types](https://aws.amazon.com/blogs/aws/ec2-instance-type-update-t2-r4-f1-elastic-gpus-i3-c5/)**— More options for compute

* [General Purpose ](https://aws.amazon.com/blogs/aws/new-t2-xlarge-and-t2-2xlarge-instances/)— t2.xlarge, t2.2xlarge more CPU and compute

* [Memory Optimised](https://aws.amazon.com/blogs/aws/new-next-generation-r4-memory-optimized-ec2-instances/) — r4

* Storage Optimised — I3

* Compute Optimised — C5

Available: Now

[**Elastic GPUs For EC2](https://aws.amazon.com/blogs/aws/in-the-work-amazon-ec2-elastic-gpus/) — **Attach GPU to EC2 Instances

* Similar to EBS you can attach GPU to instances

* Options for 1,2,4,8 GiB of GPU

Availability: Preview

[**Amazon Lightsail](https://aws.amazon.com/blogs/aws/amazon-lightsail-the-power-of-aws-the-simplicity-of-a-vps/)** —Virtual Private Servers (VPS) made easy

* Run virtual private servers without configuring a VPC

* Choose image, Select size, Pick name and go

* Simple price per month

* Move Lightsail to AWS when requirements change

* Get started — [https://amazonlightsail.com/](https://amazonlightsail.com/)

Availability: Now

[**Hardware acceleration](https://aws.amazon.com/blogs/aws/developer-preview-ec2-instances-f1-with-programmable-hardware/)** — Programmable hardware

* A new instance family — F1 instances

* Develop Field Programmable Gate Arrays (FPGA) in AWS

* Released a Hardware dev kit on [GitHub](https://github.com/aws/aws-fpga) (link doesn’t work yet?)

Availability: Preview

## Data storage and services

We saw a couple of interesting new features for data storage in AWS. You [cannot your run an access database on s3](https://acloud.guru/learn/aws-certified-solutions-architect-associate). But now you can query your S3 data with SQL.

[**Amazon Athena](https://aws.amazon.com/blogs/aws/amazon-athena-interactive-sql-queries-for-data-in-amazon-s3/)** — SQL queries for Data in S3

* Ad-hoc query against s3 without clusters

* Fully managed by AWS

* Doesn’t replace Redshift or EMR — another option

Availability: Now

[**Aurora for Postgres](https://aws.amazon.com/blogs/aws/amazon-aurora-update-postgresql-compatibility/)** — New database engine for Aurora

* High performance

* Low cost

Availability: Preview

## **Amazon AI**

The suite of Amazon AI services is an great addition to AWS. Image recognition and Natural Language Processing will allow more developers to create intelligent user experiences.

[**Amazon Rekognition](https://aws.amazon.com/blogs/aws/amazon-rekognition-image-detection-and-recognition-powered-by-deep-learning/) — **Image recognition service

* Pass image to Rekognition in Batch or Realtime

* Identifies Objects & Scenes — car, outside ect

* Identifies Faces — gender, smiling, glaces, matching

* Improve models over time

Availability: Now

[**Amazon Polly** ](https://aws.amazon.com/blogs/aws/polly-text-to-speech-in-47-voices-and-24-languages/)— Text to speech service

* Convert text to an MP3

* Fully managed, cached responses

* 47 voices, 27 languages

Availability: Now

[**Amazon Lex](https://aws.amazon.com/blogs/aws/amazon-lex-build-conversational-voice-text-interfaces/)** — What’s inside Amazon Alexa

* Automatic Speech recognition (ASR) — speech to text

* Natural Language understanding (NLU)

* Processes text or audio — suitable for voice or chat bots

* Triggers lambda to act upon requests

* Can be used for multi-step conversations

* Conversation models will improve over time

Available: Preview

## Internet of Things (IoT)

I am personally very excited for updates to the IoT offerings on AWS. Project Greengrass is exactly what I need to finish my [Serverless Garden](https://serverless.zone/serverless-architectures-9e23af71097a) project. Deploying software to devices and operating devices in an offline world are hard problems to solve. Project Greengrass will help solve this issue.

[**Greengrass](https://aws.amazon.com/blogs/aws/aws-greengrass-ubiquitous-real-world-computing/)** — Lambda compute on Devices

* Embed lambda functions in devices

* Runs locally and offline

* Cache data locally

* Manufacturers can build Greengrass into devices

* Install Greengrass runtime

* Deploy Lambda functions to devices

* Facilitates device communication

Availability: Preview

## Snowball

[**Snowball Edge](https://aws.amazon.com/blogs/aws/aws-snowball-edge-more-storage-local-endpoints-lambda-functions/)** — Hybrid Device with Storage and Compute

* 100 TB Storage

* S3 endpoint

* Greengrass (Lambda) inside — equivalent of m4.4xl inside

* Cluster Snowballs

Available: Now

[**Snowmobile](https://aws.amazon.com/blogs/aws/aws-snowmobile-move-exabytes-of-data-to-the-cloud-in-weeks/)** — Clustered Snowballs in a truck

* 100 Petabyte container

* Connect to your datacenter via fiber

* Quickly move large amounts of data

Available: Now

## What’s Next

We saw some great announcements today and we’re looking forward to more tomorrow. Andy hinted that tomorrow will be the day for Serverless announcements. I hope [Werner Vogels](https://medium.com/@Werner) might tick off some more items on my [wish list](https://read.acloud.guru/my-aws-re-invent-2016-wishlist-cc6e00126789) tomorrow.

Thanks to my colleague Daniel Parker for the photos.
