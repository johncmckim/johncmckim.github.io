---
layout: blog
category: blog
title: "How to build powerful back-ends easily with Serverless"
subtitle: Building an image processor on AWS Lambda
poster_img: static/medium/5000-1*2zU4tyJnqVIS6pe1k_cDfg.png
description: >
    I started working as a Software Developer Full-time in 2012. You build it, you run
    it was a core value of our small team. But, I knew nothing about servers. I soon had
    to learn about subnets, load balancers, database clusters and more to support the code I wrote...
---

# How to build powerful back-ends easily with Serverless

Building an image processor on AWS Lambda

![Meeting [Jeff Barr](https://twitter.com/jeffbarr) at AWS re:Invent](/static/medium/5000-1*2zU4tyJnqVIS6pe1k_cDfg.png)*Meeting [Jeff Barr](https://twitter.com/jeffbarr) at AWS re:Invent*

I started working as a Software Developer Full-time in 2012. You build it, you run it was a core value of our small team. But, I knew nothing about servers. I soon had to learn about subnets, load balancers, database clusters and more to support the code I wrote. For me, building software that solves problems is fun, managing servers isn’t.

In early 2016 I attended an AWS meetup. At this meetup, [Sam Kroonenburg]() spoke about how he built [A Cloud Guru](https://acloud.guru/) with a [Serverless Architecture on AWS](https://read.acloud.guru/serverless-the-future-of-software-architecture-d4473ffed864). It blew me away. The idea of using AWS Lambda to build web apps without managing or scaling servers had me hooked.

Since then I have dedicated my spare time to learning and blogging about Serverless. Six months after that meetup Sam offered me a job and I now build Serverless systems Full-time for [A Cloud Guru](https://acloud.guru/).

Learning about Serverless has had a big impact on the way I build software. Serverless gained a lot of momentum and maturity in 2016. Perhaps you looked at it last year but didn’t try it or maybe you’ve never heard of it. Whatever the case, there has never been a better time to get started.

## What is (and isn’t) Serverless?

There is still a lot of debate on what is Serverless. Right now the answer depends on who you ask. There are two questions, what is a Serverless product and what is a Serverless architecture.

A Serverless product is fully managed with granular scaling and granular billing. Products include but are not limited to:

* **Compute:** [AWS Lambda](https://aws.amazon.com/lambda/details/), [Azure Functions](https://azure.microsoft.com) and [WebTask](http://webtask.io/).

* **Storage:** [S3](https://aws.amazon.com/s3/), [DynamoDB](https://aws.amazon.com/dynamodb/) and [Firebase](https://firebase.google.com/)

* **Authentication:** [Cognito](https://aws.amazon.com/cognito/), [Auth0](https://auth0.com/)

* **Search:** [Algolia](https://www.algolia.com/)

Note I did not include any Platform as a Service (PaaS) products like Amazon RDS, Heroku or Google App Engine. For these services, you pay per hour and scale by adding or removing underlying servers. You might not have to manage servers but you still need to think about them.

So what is a Serverless architecture? I define a Serverless Architecture as:
> An event driven system that utilises FaaS and other fully managed services for logic and persistence.

If you are still scratching your head don’t worry. This will make more sense once you see an example.

## Getting started with Serverless

The best way to learn is to practice. Let’s pretend that a client has asked me to reinvent anonymising faces on images.

Instead of blurring a face, my client wants to replace each face with an emoji. The emoji must reflect the emotion of that face.

To deliver this service I need to:

1. Allow my client to upload images

1. Detect the faces in each image

1. Determine the emotion of each face

1. Replace each face with an emoji

1. Store the edited image

Instead of building it all myself, I am going to use a Serverless architecture on AWS.

### Serverless Architectures

There are three services I need to develop this system.

* [Amazon S3](https://aws.amazon.com/documentation/s3/): scalable object based file storage

* [AWS Lambda](https://aws.amazon.com/lambda/details/): serverless compute

* [Amazon Rekognition](https://aws.amazon.com/rekognition/): image analysis

Using those services I developed the following architecture.

![A Serverless Architecture](/static/medium/2716-1*UxnCvl7QsUEQiZAu14lg-g.png)*A Serverless Architecture*

Let’s go back to the definition of a Serverless architecture.
> An event driven system that utilises FaaS and other fully managed services for logic and persistence.

The architecture I have designed fits this definition.

1. When a user uploads a file an *ObjectCreated* event is produced and a Lambda function is invoked.

1. The Lambda function calls Amazon Rekognition to detect the faces and emotion of each face in the uploaded image.

1. The Lambda function processes the image and persists the image in Amazon S3

The simplicity of this design is what makes Serverless compelling.

### What languages and tools can I use

If you want to build this system yourself, you need to create the infrastructure and code.

To develop the code you can use [Node.js](http://docs.aws.amazon.com/lambda/latest/dg/authoring-function-in-nodejs.html), [Python](http://docs.aws.amazon.com/lambda/latest/dg/python-lambda.html), [Java](http://docs.aws.amazon.com/lambda/latest/dg/java-lambda.html), or [C#](http://docs.aws.amazon.com/lambda/latest/dg/current-supported-versions.html). There is an [AWS SDK](https://aws.amazon.com/tools/) for each of these languages. If your language is missing, watch for language support to grow over 2017.

To create the infrastructure there are a few options. The first option is to use the AWS console. This is a good way to start while you are learning. But this is not recommended for production services. The other option is to develop your infrastructure as code. Two good tools for this are [CloudFormation](https://aws.amazon.com/cloudformation/) or [Terraform](https://www.terraform.io/).

To simplify your experience I recommend using a tool that helps you deploy your infrastructure and your code. The [Serverless Framework](https://serverless.com/) is the tool that I recommend using. It is an open source project with a great community of contributors (including me). Other alternatives include [Apex](http://apex.run/), [Claudia](https://claudiajs.com/), [Sparta](http://gosparta.io/) and [more](https://github.com/ServerlessHeroes/serverless-resources).

### Show me the code

You’ve seen the architecture, let’s look at some code. I’m going to use the Serverless Framework and NodeJs.

The first step is to define the infrastructure using the Serverless Framework. To do this I created a new service.

    serverless create --template aws-nodejs --path emoticon-faceswap

### Infrastructure

This creates a folder containing a configuration file named serverless.yml. The functions and infrastructure for my service is defined here.

<iframe src="https://medium.com/media/71f2fe466b875f9f7a8c870bb14e94ee" frameborder=0></iframe>

This configuration creates my faceswap Lambda function and S3 bucket. The Lambda function will be invoked when an object is created in the uploads/ folder.

### Code

Every Lambda function has a handler that serves as the entry point. I set the handler for my Lambda function to src/faceswap.handler in serverless.yml. This is a combination of the file path src/faceswap.js and the function to invoke in that file handler.

Each handler function has three parameters:

    module.exports.*handler* = (event, context, callback) => {
       ...
       
       // Use callback() and return information to the caller.  
    }

* **Event**: Data relating to the event. In this case it will contain information about the file that was created in S3

* **Context**: Lambda runtime information

* **Callback**: A normal node callback that you can use to return an error or result.

For my project the Lambda function needs to perform three tasks.

1. Getting images from the S3 event

1. Call the Rekognition API

1. Process the images and save the results.

<iframe src="https://medium.com/media/d7c123566deebfc40458e8b7aef15feb" frameborder=0></iframe>

You can view the code that calls Amazon Rekognition and processes the images on [GitHub](https://github.com/johncmckim/serverless-emoticon-faceswap).

The final step is to deploy the project and test it. To deploy the project I ran the following command.

    sls deploy --stage your_stage_name

I then uploaded images from [Pexels](https://www.pexels.com/) to S3 and checked the results.

![Photos from [Pexels](https://www.pexels.com)](/static/medium/2402-1*IPrXw-4X2I6q_PpTAKVmBA.png)*Photos from [Pexels](https://www.pexels.com)*

This was a really fun project to build. Building a project project like this is the best way to learn. It will help you understand event driven architectures and how to create Serverless systems.

## Where can I learn more?

There are lots great resources available for you to learn more about Serverless.

* **Blogs:** [Serverless Zone](https://serverless.zone/), [Serverless Framework](https://serverless.com/blog/), [A Cloud Guru Blog](https://read.acloud.guru/tagged/serverless)

* **Books:** [Serverless Architectures on AWS](http://book.acloud.guru), [AWS Lambda in Action](https://www.manning.com/books/aws-lambda-in-action)

* **Discussions:** [Serverless Forum](http://forum.serverless.com/), [Reddit](https://www.reddit.com/r/serverless/)

* **Videos:** [ServerlessConf](http://video.serverlessconf.io/) presentations, [Serverless Framework](https://www.youtube.com/channel/UCFYG383lawh9Hrs_DEKTtdg)

* **Conference:** [Austin ServerlessConf](http://austin.serverlessconf.io/)

* **Slack:** [serverless-forum](https://wt-serverless-seattle.run.webtask.io/serverless-forum-signup?webtask_no_cache=1)

* **Meetup Groups: **Check [this list](http://www.serverlessmeetups.com) or search meetup.com

* **Curated Resources:** [Awesome Serverless](https://github.com/anaibol/awesome-serverless), [Serverless Resources](https://github.com/ServerlessHeroes/serverless-resources)

I hope post has inspired you to look at Serverless. There are lots of great use cases to try. A HTTP API, Chatbot or Alexa Skill are just a few projects to try.

If you have any questions about this project or Serverless in general you can contact me on Medium or [Twitter](https://twitter.com/johncmckim). I’ll be running a workshop at [ServerlessConf Austin](http://austin.serverlessconf.io/) if you want to meet me in person.

![](/static/medium/2272-1*0hqOaABQ7XGPT-OYNgiUBg.png)

![](/static/medium/2272-1*Vgw1jkA6hgnvwzTsfMlnpg.png)

![](/static/medium/2272-1*gKBpq1ruUi0FVK2UM_I4tQ.png)
> [Hacker Noon](http://bit.ly/Hackernoon) is how hackers start their afternoons. We’re a part of the [@AMI](http://bit.ly/atAMIatAMI) family. We are now [accepting submissions](http://bit.ly/hackernoonsubmission) and happy to [discuss advertising & sponsorship](mailto:partners@amipublications.com) opportunities.
> If you enjoyed this story, we recommend reading our [latest tech stories](http://bit.ly/hackernoonlatestt) and [trending tech stories](https://hackernoon.com/trending). Until next time, don’t take the realities of the world for granted!

![](/static/medium/30000-1*35tCjoPcvq6LbB3I6Wegqw.jpeg)
