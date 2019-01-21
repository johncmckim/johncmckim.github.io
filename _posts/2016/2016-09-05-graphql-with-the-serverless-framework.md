---
layout: blog
category: blog
title: "GraphQL with the Serverless Framework"
description: >
  TODO DESCRIPTION
---

# GraphQL with the Serverless Framework

GraphQL with the Serverless Framework

### Building a dashboard for my garden

Last week I wrote about a [problem I have with my garden](https://serverless.zone/serverless-architectures-9e23af71097a). I often forget to water my plants and I need a system to help. Part of my solution is a dashboard to track the soil moisture of my plants.

To create this dashboard, I built a web client and backend. I chose to use GraphQL for the backend as I wanted to learn about the technology. After all, the purpose of this project is to learn and have fun. I found that GraphQL + Lambda + React is a powerful technology stack. If you want to build something like this yourself, try this [video course](https://acloud.guru/learn/serverless-with-graphql) that covers GraphQL on Lambda in-depth.

## GraphQL Endpoint

In case you are not familiar with it, [GraphQL](http://graphql.org/) is a data query language created by Facebook. GraphQL allows the client to select ad-hoc data. This differentiates it from REST API’s that expose pre-set data structures. The Apollo Stack blog has a great [introduction to GraphQL](https://medium.com/apollo-stack/the-basics-of-graphql-in-5-links-9e1dc4cac055).

### Infrastructure

Selecting your infrastructure is an important step in building any Serverless system. For the GraphQL endpoint I have used three AWS services:

* API Gateway — API endpoints as a service

* Lambda — Function as a service

* DynamoDB — NoSql database as a service

API Gateway handles HTTP requests and responses. A DynamoDB table stores soil moisture levels. The Lambda function is the glue between these services. API Gateway invokes the Lambda function in response to HTTP requests. The Lambda function retrieves data from DynamoDB and returns it to the client via API Gateway.

The interesting part of this is the Lambda function so let’s take a look at the code.

### Code

If you are building a Serverless project, it won’t be long before you realise you need a great tool to help. There are [many](http://apex.run/) [options](http://gosparta.io/) [available](https://github.com/ServerlessHeroes/serverless-resources#tools--frameworks).

I have chosen to use the [Serverless Framework](https://serverless.com/). If you are not familiar with the framework and you want to build your own endpoint, check out [the docs](http://docs.serverless.com/) to get started.

To create the GraphQL endpoint I added a function and HTTP event to the Serverless Framework config, *serverless.yml*. The Serverless Framework will create my API Gateway and Lambda so all I need to worry about is the code.

<iframe src="https://medium.com/media/455b6938d70cfd96729781f48c373f1a" frameborder=0></iframe>

The code in my Lambda function needs to perform two tasks. The first is processing GraphQL queries. The second is retrieving data from DynamoDB. Luckily, there are two great libraries for doing just this:

* [graphql-js](https://www.npmjs.com/package/graphql) — JavaScript implementation for GraphQL for nodejs

* [vogels](https://www.npmjs.com/package/vogels) — DynamoDB data mapper for nodejs

**Update:** While Vogels works for me, I am told it is now unsupported. I can’t see a message saying that the project is no longer maintained. But, there are a large number of open issues that seem stale. The alternative suggested to me [Dynogels](https://github.com/clarkie/dynogels).

The first step was to create the [GraphQL schema](http://graphql.org/docs/getting-started/). The GraphQL schema describes and retrieves the data. The endpoint in this project exposes a Moisture Query. This query allows the client to retrieve the last x hours of moisture readings.

<iframe src="https://medium.com/media/978e31c0b0382f35c88b19639b18bd09" frameborder=0></iframe>

The key piece of code here is the resolve function in the MoistureQuery. This function retrieves data in response to the query. To simplify the code, logic for this has been separated into a different service.

<iframe src="https://medium.com/media/9262e91affde684aec8665fbffbc1601" frameborder=0></iframe>

The moisture service above queries the DynamoDB table. The results returned by the query are converted into a usable format. The service uses the vogels table defined below to query DynamoDB.

<iframe src="https://medium.com/media/eae6b834f13d6980d9beba47b4128107" frameborder=0></iframe>

The end result of all this work is below, a working GraphQL endpoint.

![Responses from the GraphQL endpoint](https://cdn-images-1.medium.com/max/5268/1*ONlJlgv5E1Ra-zvvzBFgCg.png)*Responses from the GraphQL endpoint*

Some of you may be wondering where the DynamoDB table is. This example uses an existing DynamoDB table. Creating the table and inserting moisture data into the table will be the topic of future post.

## React + Redux Client

[React](https://facebook.github.io/react/) is a JavaScript library for building interactive UI’s. [Redux](http://redux.js.org/) is a state container for Javascript applications. These two libraries form the core of the Web client for this project. This article is not a React or Redux tutorial, there are plenty of [other](https://facebook.github.io/react/docs/getting-started.html) [articles](http://buildwithreact.com/tutorial) [for](http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html) [that](https://thinkster.io/getting-started-with-react). This article will focus on polling a GraphQL endpoint in a React + Redux app.

### Hosting

If you are building a Serverless web application, you need a service to host your web client. I chose to use [Firebase Hosting](https://firebase.google.com/docs/hosting/). Firebase Hosting allows you to host static content and route all requests to a single page. The [command tool](https://firebase.google.com/docs/cli/) is easy to use and the documentation is great.

### Code

To retrieve soil moisture levels I need to request data from the GraphQL endpoint. Thankfully, there are already great libraries for retrieving data from GraphQL endpoints. The [Apollo Client](http://docs.apollostack.com/apollo-client/) and [React Apollo](http://docs.apollostack.com/apollo-client/react.html) help developers integrate GraphQL endpoints into React apps.

The first step was to update the entry point for the React app. I created an Apollo client and replaced the React *Provider* with the *ApolloProvider*.

<iframe src="https://medium.com/media/6dc8291b3ce732b686a43011a379f6aa" frameborder=0></iframe>

The next step was to integrate the Apollo client with the Redux store. To use the Apollo client with Redux, I added the Apollo client middleware and reducer to the store.

<iframe src="https://medium.com/media/68a42390a252644f072c58c8aa5a366a" frameborder=0></iframe>

After integrating the Apollo client with Redux, I was then able to start using GraphQL in the UI. Using the React Apollo library I am now able to send a GraphQL query to my endpoint.

<iframe src="https://medium.com/media/5b6d848d5f7ad9e63616c5fb25ba2da6" frameborder=0></iframe>

The results of the query are then mapped that to props in React components.

## Dashboard Time!

The end result of all this code is the dashboard below. The dashboard polls for data every 30 seconds. This allows the user to see moisture levels in real time.

![Moisture levels from a test device](https://cdn-images-1.medium.com/max/3952/1*hSyVk2HkAQMOY1xe47WzKw.png)*Moisture levels from a test device*

While this is only a fun project, working on it has sold me on a GraphQL + Lambda + React stack.

For me, the main advantage of GraphQL is that it puts the client close to the data. Letting the client choose what data to fetch is more efficient and flexible. Facebook has a great post on the [advantages of GraphQL](https://code.facebook.com/posts/1691455094417024/graphql-a-data-query-language/).

## What’s Next

If you want a look at the code you can find [Web Backend](https://github.com/garden-aid/web-bff) and [Web Client](https://github.com/garden-aid/web-client) on Github. I will continue to write about how I created the other pieces of this project over the coming weeks.

If you want to see how I created the rest of the project, follow [Serverless Zone](https://serverless.zone/) and myself on Medium or [Twitter](https://twitter.com/johncmckim).

*Myself and the team at [A Cloud Guru](https://acloud.guru/) are building a Serverless training system. If you need to get AWS certified or build Alexa skills sign up and start learning today.*
