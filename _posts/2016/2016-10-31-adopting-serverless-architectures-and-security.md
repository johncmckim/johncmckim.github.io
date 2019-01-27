---
layout: blog
category: blog
title: "Adopting Serverless — Architectures and Security"
subtitle: The best practices for serverless architectures are still developing
poster_img: https://cdn-images-1.medium.com/max/6000/1*qwoALm-b6mmgPC-NG9nf2g.jpeg
description: >
    In my last article, I wrote about how going serverless may affect your People and DevOps.
    In this article, I want to explore how Serverless affect application Architecture and Security...
---

# Adopting Serverless — Architectures and Security

The best practices for serverless architectures are still developing

![“Servers — Not my problem” ([http://startupstockphotos.com/](http://startupstockphotos.com/))](https://cdn-images-1.medium.com/max/6000/1*qwoALm-b6mmgPC-NG9nf2g.jpeg)*“Servers — Not my problem” ([http://startupstockphotos.com/](http://startupstockphotos.com/))*

In my last article, I wrote about how going serverless may affect your [People and DevOps](https://read.acloud.guru/adopting-serverless-people-and-devops-336e3ab89e96). In this article, I want to explore how Serverless affect application Architecture and Security.

## Architectures

The best practices for Serverless Architectures are still developing. Some of the questions you will face when building a Serverless system are:

* How do you avoid becoming coupled to a providers service? Is lock-in actually a problem?

* How do we define boundaries for a Serverless system?

* How do we enable inter-service communication?

* What are the best practices for service discovery?

* How do you ensure consistency in a distributed system?

* How do we build cross-cloud systems that leverage the best services of each provider?

These issues are not unique to Serverless. Microservices based on more traditional platforms also face these issues. But, the existing solutions for these issues may not be suitable in a Serverless world.

### Vendor Lock-in

Vendor lock-in a common concern for many people looking at serverless. While it may not be as serious an issue as some people believe, it is a potential issue. Vendor lock-in can occur when a system is tightly coupled to the platform(s) it runs on.

Coupling the internals of a service to a platform may not be an issue. Services should be able to change internal implementations without affecting other services. Vendor lock-in may be more of an issue if the boundary of a service is a vendor platform. But, we are yet to see if this is a problem and how it manifests.

### Boundaries and Inter-Service communication

Selecting boundaries for Microservices is hard. In fact, it is so hard, that there is a good case for [building a Monolith first](http://martinfowler.com/bliki/MonolithFirst.html). But a monolith may not be practical once your system and team grows to a certain size. You may need to break your system up into Microservices to ensure you can continue to innovate and scale.

Implementing a system with Microservices requires selecting boundaries for those services. Selecting boundaries is a domain specific issue. But, defining boundaries and facilitating inter-service communication is a common issue.

A HTTP API is a common approach to boundaries for Microservices. An API provides a stable interface between services. The interface not vendor specific avoiding issues with vendor lock-in. But, to use an API, the client needs to understand the contact the API exposes. This creates a level of coupling between systems.

Messaging systems like Queues, Streams and Pub/Sub Events are another method of facilitating communication. Messaging systems allow you to decouple your services. The service(s) consuming messages does not need be aware of producers. Consumers just need to understand the format of the message. The coupling is no longer between producers and consumers. The coupling is now between services and the messaging systems they rely on. So, the downside is that if you use a managed platform you will have some level of vendor lock-in.

### Service discovery

Service discovery is a core part of a Microservice architecture. In traditional Microservice systems, service tracks what services exist and their location. This allows clients to find the services they need to communicate with.

So what does Service Discovery look like in a Serverless system? There isn’t a definitive answer for this. Serverless systems need to discover service interfaces like SNS events and API Gateway endpoints. You can do this dynamically using the AWS SDK or statically using DNS or CloudFormation.

But there is more to consider. How do you configure this? How do you limit access to certain services? Right now you need to solve these issues yourself. But in the future, tools should help solve some of these issues.

### Distributed Computing

Serverless systems are distributed by design. Distributed computing is difficult.

Data is distributed across many stores, leaving you with hard choices. The [CAP theorem](https://en.wikipedia.org/wiki/CAP_theorem) states that for a distributed system you cannot provide the following simultaneously:

* Consistency — reads receive the most recent write or error

* Availability — every request receives a response

* Partition tolerance — the system operates even in the event of a network failure

On top of this, function calls occur across the network instead of in process. The reliability you are accustomed to no longer exists.

If you are already building Microservices, these problems will be familiar. But if not, you will have to learn how to handle these issues. You will need to learn about distributed transactions and consistency checks.

I was recently told to print the [fallacies of distributed computing](https://en.wikipedia.org/wiki/Fallacies_of_distributed_computing) and stick it to a wall, it’s good advice. Prepare for failure and you won’t be surprised when failures occur.

### Multi-Cloud Architectures

Multi-Cloud architectures are not common. The only server based Multi-Cloud architecture I am aware of [Auth0](https://auth0.com/). [Auth0](https://auth0.com/) operates across [AWS, Azure and GCP](https://auth0.com/availability-trust). Designing a server based cross cloud architecture has many challenges and [risks](https://status.auth0.com/incidents/vbfz8x03tf04).

There are two distinct reasons for adopting a Multi-Cloud Architecture. The first is to leverage the best services from each provider. The second is to improve availability and for redundancy.

[A Cloud Guru](http://acloud.guru) is built with a front end based Multi-Cloud architecture. We use a combination of [Netlify](https://www.netlify.com), [Firebase](https://www.firebase.com/), [AWS](https://aws.amazon.com/), [Auth0](https://auth0.com/) + more. Auth services, like [Auth0](https://auth0.com/), [enable this](http://www.benrady.com/2016/08/the-real-revolution-of-serverless-is-auth-not-microservices.html) by generating temporary credentials (JWTs). These credentials can authorise users across different cloud services. The web client uses Firebase and AWS as a backend. This allows us to use the best parts of each provider instead of using a single provider.

While Multi-Cloud architectures are possible, it is not easy right now. There are few people with deep knowledge of different cloud providers. Adopting a Multi-Cloud architecture will require time for learning. Operating and developing a Multi-Cloud architecture is also difficult. Developers will need to use many tools and frameworks. To develop a Multi-Cloud system, you must solve these issues.

## Security

Security should be a consideration for anyone adopting a new technology. With all cloud systems security is a shared responsibility. Your provider is responsible for the underlying infrastructure and services. You are responsible for ensuring you use the services in a secure manner.

### Responsibility and Transparency

Serverless systems put more responsibility for security on the provider. For example, AWS is responsible for patching the machine your Lambda functions execute on. We now need to trust that the provider is patching our machines. Better yet, we need providers to be transparent about the mechanisms they use to secure the cloud.

### Controls

Cloud services have different security controls. You should understand these controls before deciding to use a service. Does the service provide the right security controls that will allow you to protect your data?

Let’s look at API Gateway as an example. API Gateway provides *public* HTTP endpoints backed by Lambda functions. If you need an internal endpoint, you can beg AWS to implement private endpoints. But if they do not provide it, you might need to consider alternate options.

### Consistency

Cross-cloud Serverless systems add another layer of complexity. Imagine we have a system that uses Auth0 for authentication and stores user data on AWS and Firebase. To protect this data we may need to create Auth0 rules, Firebase rules and AWS IAM roles and policies. These rules need to be consistent in purpose across those three services. It is possible to do this, but it is not an easy task.

## Should I still go Serverless?

These considerations should not deter you from going Serverless. Solutions to the architectural issues faced by Serverless developers will emerge. Furthermore, your cloud provider will likely be better at securing infrastructure than you are. But you need to understand and consider these issues before choosing Serverless.

## What’s Next?

Most components in a Serverless system are outsourced to providers. My next article will look at the issues relating to outsourcing components.

If you want to read more on Serverless follow me on Medium or [Twitter](https://twitter.com/johncmckim).

![](https://cdn-images-1.medium.com/max/2000/1*4SAJI2W8hInwwRCn7R8a6A.png)

### A Cloud Guru

The mission of A Cloud Guru is to engage individuals in a journey to level-up their cloud computing skills by delivering the world’s leading educational content designed to evolve both mindsets and careers.
> # “Let no man in the world live in delusion. Without a Guru, none can cross over to the other shore.“ — Guru Nanak

Our [courses](https://acloud.guru/courses) are delivered by industry experts with a shared passion for cloud computing. We strive to serve our growing community of cloud gurus, who generously contribute their insights in our [forums](https://acloud.guru/forums/home), workshops, meet-ups, and [conferences](https://acloud.guru/serverless).

*Keep up with the A Cloud Guru crew [@acloudguru](https://twitter.com/acloudguru).*
