---
layout: blog
category: blog
title: "Serverless Event Sourcing at Nordstrom"
subtitle: "Building a unified event stream on AWS"
poster_img: https://cdn-images-1.medium.com/max/7936/1*91yAq3Bwa-l7Gi6V9TfgzA.png
description: >
    Leading up to Serverlessconf Austin this year we held the inaugural Serverless Architecture competition.
    The competition was launched to encourage people to share their Serverless Architectures.
---

# Serverless Event Sourcing at Nordstrom
## Building a unified event stream on AWS

![](https://cdn-images-1.medium.com/max/7936/1*91yAq3Bwa-l7Gi6V9TfgzA.png)

Leading up to [Serverlessconf Austin](http://austin.serverlessconf.io/) this year we held the inaugural [Serverless Architecture competition](http://competition-austin.serverlessconf.io). The competition was launched to encourage people to share their Serverless Architectures.

Hello Retail by the team at Nordstrom is a well [deserving winner](https://read.acloud.guru/announcing-the-winners-of-the-inaugural-serverlessconf-architecture-competition-1dce2db6da3) of the competition.

## What is Hello Retail?

Hello Retail is a proof-of-concept Serverless architecture for a retail store. The team at Nordstrom built the project to experiment with Serverless Event Sourcing.

Nordstrom is an early adopter of Serverless architectures. The team has built Serverless microservices for a number of production systems. The use cases for Serverless include API backends and stream processing.

Microservices allowed Nordstrom to create smaller, cohesive services. When these microservices need to interact, services call the API of another service. But this approach creates code and operational dependencies between microservices.

Code dependencies created by calling other services creates complexity. The caller has to know which dependent services to call and how to call them. This becomes complex to manage in code as the number of dependencies grows.

Operational dependencies between services can affect performance and availability of the application. Services that are dependent on an API depend on the performance that API. Increased latencies or failures in one service will impact other services.

The solution to these problems is to reverse these dependencies by using events. Creating services that produce and consume events allows you to decouple them.

Event Sourcing is a well understood solution to this problem. But applying this solution to a completely Serverless application is new.

## The Concept

The team at Nordstrom built Hello Retail with one scenario in mind: a merchant adding a product to their store.

When a product is added to the store, two things need to occur. A photographer needs to take a photo of the product. After this, customers should see the new product with the new photo in the product catalog.

The Hello Retail project solves this problem with events. The three major events in this scenario are:

* Register Photographer

* New Product

* New Photo

Various microservices in the system produce and consume these events. A central Event Log stream connects these producers and consumers together.

## Implementing Hello Retail

The best way to understand a system that uses Event sourcing is to follow the flow of events. Hello Retail has two main event flows: photographer registration and product creation.

### Photographer Registration

Hello Retail requires a database of photographers. But, the system does not have a traditional Create Photographer API. Instead, the front-end creates a Register Photographer event.

To create the event, the front-end calls an API endpoint that triggers a function. This function writes the new event to the central event stream.

A second function is listening for the Register Photographer event. This function uses the event data to write a new photographer into the database.

![](https://cdn-images-1.medium.com/max/2000/1*6IKHJi456QfAqfM3xI1_3Q.png)

### Product Creation

The product creation process takes this architecture a step further. This process spans multiple microservices and events.

As before, instead of a Create Product API call, to create a new product, the font-end raises a New Product event. When a New Product event is written to the event stream two functions are triggered.

The Product Service writes product information to the products and categories databases. This allows customers to view the new product in the product catalog.

The Photograph Management Service assigns a photographer to take a photo of the new product. It is important to note here that the Product Service did not make a direct call to the Photograph Management service to initiate this process.

So without a direct call, how does the Product Service know when a photo of the new product has been taken?

When the photo of the new product has been taken, the Photograph Management service creates a New Photo event. The event triggers a function in the Product Service which updates the database with the new photo.

![](https://cdn-images-1.medium.com/max/3044/1*HJWwwhooFLY2-_UVo7fLRw.gif)

## Challenges

This architecture has many benefits as previously discussed. But there are also a number of challenges that must be overcome.

### Failure Handling

Hello Retail uses a Kinesis stream as the central Event Log. The consumers of the stream process events in batches from the end of the stream.

If there is an error with the consumer, the failed batch will remain at the end of the stream. The consumer will retry processing the batch until it is fixed or the events expire (configurable up to 7 days).

In an active system, events will continue to be added to the stream while the consumer is not processing events. This creates a backlog of unprocessed events called a log jam.

![An example of a log jam](https://cdn-images-1.medium.com/max/2456/1*p1hu_dk4q64bSIbnKPVIdg.png)*An example of a log jam*

Poison pill data is a common cause of log jams. These are malformed or unexpected events on the stream. These events need to be removed from the stream and stored for manual processing.

Even with careful handling of events, sometimes log jams occur. When the consumer is fixed the unprocessed events will be processed automatically. But what happens when there is a logic error in the consumer?

### Replay and Log persistence

In a system using Event Sourcing there are two sets of data, the Application State and the Event Log. Unlike a traditional system, it is the Event Log, not the Application state, that is the critical data to manage.

A system that is employing Event Sourcing should be able to rebuild the entire Application State from the Event Log at any time. Version control and an accounting ledger are examples of systems that use Event Sourcing.

So what happens when there is a logic error in a consumer? After the logic error is fixed, old events can be replayed through the consumer. The fixed consumer can then rectify the application state.

Hello Retail does not maintain a historical log of events. As a result, events cannot be replayed through consumers. This architecture needs a mechanism to persist events and replay events.

### Eventual Consistency

All events in Hello Retail are processed asynchronously. This introduces eventual consistency into all reads in the system.

Eventual consistency can be challenging to handle correctly. Systems with eventual consistency requires a user experience that reflects this characteristic.

### Securing Events

A central Event Log presents interesting security challenges. A central Event Log will include events that contain private information. In a production system, Microservices may only be authorised to access a subset of events or event data.

A system to protect events and event data will be required to take this proof-of-concept to production. Nordstrom is investigating a system to encrypt data on the stream. Controlling the ability to decrypt data will allow Nordstrom to control which services can access events.

## Wrapping up

This project solves a common problem teams encounter when adopting microservices. It is a great starting point for Event Sourcing in a Serverless architecture.

The team at Nordstrom needs to solve three problems before this is production ready.

* Improvements to handling of poison pill data — a system to catch and store bad events in the stream

* Stream persistence and replay

* Securing sensitive data in events

I am confident the great team at Nordstrom will be able to develop solutions to these problems.

I want to thank the team at Nordstrom for creating Hello Retail and sharing it with the community. It is a great example of applying a well understood architectural pattern to a Serverless project.

## What’s Next

If you are interested in diving deeper into this project you can view the code on [Github](https://github.com/Nordstrom/hello-retail/) or take the [Hello Retail workshop](https://github.com/Nordstrom/hello-retail-workshop).

I also recommend watching [this presentation](https://www.youtube.com/watch?v=STKCRSUsyP0) by [Martin W. Fowler](https://twitter.com/martinfowler) if you are unfamiliar with Event Sourcing.

The Nordstrom serverless team is hiring talented developers with a passion for learning and trying new things. If you’re interested, drop them a line at [serverless@nordstrom.com](mailto:serverless@nordstrom.com) and let them know what you think of Hello, Retail!

If you want to read more on Serverless don’t forget to follow me [@johncmckim](https://twitter.com/johncmckim) on Twitter or Medium.
