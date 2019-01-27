---
layout: blog
category: blog
title: "Express to AWS Lambda: Part 2"
subtitle: Request Templates
description: >
  In Part 1 of this series we looked at how to get started with AWS Lambda by 
  converting a simple Express App to Serverless....
---

# Express to AWS Lambda: Part 2

Request Templates

**UPDATE:** Serverless 1.0 was released earlier this year. There are a lot of improvements in v1.x. I suggest you go and [read the docs](https://serverless.com/framework/) for the most up to date information.

In [Part 1](https://medium.com/@johncmckim/express-to-aws-lambda-part-1-a057096abe34) of this series we looked at how to get started with AWS Lambda by converting a simple Express App to [Serverless](https://github.com/serverless/serverless). That Express App had one GET endpoint. The web consists of more than GET requests, so the next step is to accept POST requests and read the body of the request.

### Example Express App

I’ve added a new endpoint to our Express App. This endpoint accepts POST requests with a JSON body. The JSON message has one property, *name*.

    app.post('/foo', function (req, res) {
      var name = req.body.name;

      fooService
        .post(name)
        .then(function(foo) {
          res.status(200).send(foo);
        })
        .catch(function (err) {
          res.status(500).send();
        });
    });

### Request Templates in Serverless

AWS Lambda is a compute service. By itself, it cannot process HTTP requests. In [Part 1](https://medium.com/@johncmckim/express-to-aws-lambda-part-1-a057096abe34), when we created our function, we chose to create an Endpoint for the function. This endpoint is an [AWS API Gateway](https://aws.amazon.com/api-gateway/) resource and method. Understanding this is important as much of what we are about to look at relates to [API Gateway](https://aws.amazon.com/api-gateway/) rather than [Lambda](https://aws.amazon.com/lambda/).

[API Gateway](https://aws.amazon.com/api-gateway/) allows you to create HTTP Endpoints as a service. The Gateway accepts requests and passes those requests to a back-end for processing. A feature of this service is the ability to map HTTP Requests into different formats for your back-end to process. A Request Template in [Serverless](https://github.com/serverless/serverless) allows you to configure this mapping.

To demonstrate Request Templates and an alternative Serverless Architecture, I have updated the example to the [Microservices Architecture](http://docs.serverless.com/docs/application-architectures). With this architecture we use one Lambda function per resource. As a result, I’ve updated the folder structure as below.

    foo
      |__event.json
      |__handler.js
      |__s-function.json

To process POST requests, we need to add a new endpoint to our **s-function.json** configuration file.

    {
     "name": "foo",
     "handler": "handler.**crudFoo**",
     ...
     "endpoints": [{
       "path": "foo",
       **"method": "POST",**
       "requestTemplates": {
         "application/json": {
           **"http_method": "$context.httpMethod"**,
           **"body": "$input.json('$')"**
         }
       },
       ...
     }]
     ...
     }
    }

The *requestTemplates* property is where we map properties from the HTTP Request to the *event* object. The example above accepts requests with a Content-Type of *application/json*. For those requests, the HTTP Method is mapped to *event.http_method*, and the HTTP JSON Body is deserialised and mapped to *event.body*.

We then update our **handler.js** code to handle GET and POST requests as below.

    function get(event, context, cb) {
      fooService
       .get(**event.id**)
      ...
    }

    function post(event, context, cb) {
      fooService
        .post(**event.body.name**)
      ...
    }

    module.exports.**crudFoo** = function(event, context, cb) {
      switch(**event.http_method**) {
        case 'GET’:
          get(event, context, cb);
          break;
        case 'POST’:
          post(event, context, cb);
          break;
        default:
          cb(’Not implemented’);
      }
    };

### Configuration Templates and Variables in Serverless

If we continued to add request templates as we have done above, our configuration would quickly grow out of control. To manage this the Serverless Framework created [Templates and Variables](http://docs.serverless.com/docs/templates-variables).

To use templates we need a new file, **s-templates.json**, located in the root of our project. In this file, we can define Templates that can be re-used through Variables in our other configuration files.

This configuration template provides us with a generic API Gateway Request Template.

    {
     "**apiGatewayRequestTemplate**": {
       "application/json": {
         "http_method" : "$context.httpMethod",
         "id": "$input.params('id')",
         "body": "$input.json('$')"
       }
     }
    }

This allows us to re-use the same Request Template for our GET and POST Methods. To use this template, we need to reference the template by name in our **s-function.json** configuraiton file.

    {
     "name": "foo",
     "handler": "handler.crudFoo",
     ...
     "endpoints": [{
       "path": "foo/{id}",
       "method": "GET",
       "requestTemplates": "**$${apiGatewayRequestTemplate}"**,
       ...
     },{
       "path": "foo",
       "method": "POST",
       "requestTemplates": "**$${apiGatewayRequestTemplate}"**,
       ...
     }]
     ...
     }
    }

This greatly reduces boilerplate and duplication.

Serverless also provides a way to create Stage and Region specific variables to use in configuration files. Uses for this could include specifying different DynamoDB Table names for prod / dev and us-east-1 / eu-west-1. Please see [the docs](http://docs.serverless.com/docs/templates-variables#section-variables) for more details.

### Testing our HTTP Methods

Since our project is getting larger I decided to automate testing our HTTP Methods. To do this I used [API Easy](https://github.com/vowsjs/api-easy) and [Vowsjs](http://vowsjs.org/). I simplified version of my test suite is below.

    suite
      .post(‘/foo’, { name: fooName })
        .expect(200)
      .next()
      .get(’/foo/:id’) 
        .expect(200)

To run the tests I start the Express App and Serverless app before running the test suite.

![Express console during testing](https://cdn-images-1.medium.com/max/2088/1*DKZkMgHBzrQKfc856G_Fgw.png)*Express console during testing*

![Serverless console during testing](https://cdn-images-1.medium.com/max/2112/1*-vXH_WaRrq7X2_mwYkdgZw.png)*Serverless console during testing*

![Test results](https://cdn-images-1.medium.com/max/2716/1*PucbkjLvmqm8T7ukWKmUIQ.png)*Test results*

All of the tests passed confirming that the Serverless app responds in the same way as our Express App.

### What’s next?

We’re closer to converting a real world app to [Serverless](https://github.com/serverless/serverless). We can now accept different HTTP Methods and a HTTP Body. However, there is still more to explore.

We haven’t covered:

* [Setting headers on our responses — Part 3](https://medium.com/@johncmckim/express-to-aws-lambda-part-3-eca9a442f9ff)

* [Authenticating requests — Part 4](https://medium.com/@johncmckim/express-to-aws-lambda-part-4-22257f71385f)

* [Worker instances or background tasks — Part 5](https://medium.com/@johncmckim/express-to-aws-lambda-part-5-dcde1532279c)

I will cover those issues in future posts. If you want to explore this example more in the mean time, please check out the repo on [Github](https://github.com/johncmckim/express-to-aws-lambda/tree/2-request-templates).
