---
layout: blog
category: blog
title: "Express to AWS Lambda: Part 1"
description: >
  TODO DESCRIPTION
---

# Express to AWS Lambda: Part 1

Getting Started

**UPDATE:** Serverless 1.0 was released earlier this year. There are a lot of improvements in v1.x. I suggest you go and [read the docs](https://serverless.com/framework/) for the most up to date information.

[AWS Lambda](https://aws.amazon.com/lambda/) and other compute services ([Google Cloud Functions](https://cloud.google.com/functions/docs/), [Azure Functions](https://azure.microsoft.com/en-us/services/functions/), ect), are playing an increasingly more important role in Application Architecture. The potential cost savings and potential to eliminate infrastructure management are the two main reasons why developers should be utilising compute services.

When I first looked at AWS Lambda it was very unclear to me how to structure and deploy a Lambda based application. Fortunately for me, someone else has solved those problems while I was working on other things. The [Serverless Framework](https://github.com/serverless/serverless) provides a project structure and tools to deploy a Lambda based project.

To learn more about Serverless and AWS Lambda, I decided to compare it to a framework I am already familiar with, Express.

### Example Express App

I started with a very basic Express app. I wanted to learn how to receive input through a web request and return JSON.

    **var** express **=** require('express');
    **var** foo = require('./foo');
    
    **var** app **=** express();
    
    app.get('/foo/:id', **function** (req, res) {
      **var** id **=** req.params.id;
    
      foo
        .get(id)
        .then(**function**(foo) {
          res.status(200).send(foo);
        })
        .**catch**(**function** (err) {
          res.status(500).send();
        });
    });
    
    app.listen(5000, **function** () {
      console.log('Listening on port 5000');
    });

### Getting Started with Serverless

Before you get started with Serverless, you will need to sign up for an [AWS Account](http://aws.amazon.com/), [create IAM credentials](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html) and store those credentials as a [profile on your machine](http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html).

Once you have done this, you need to install the Serverless command line tool using npm:

    npm install serverless -g

After installing the tool we’re ready to create a project. The [create command](http://docs.serverless.com/docs/commands-overview) will ask you a number of questions and initialise your project.

I used the -c argument to stop Serverless from deploying the CloudFormation template to AWS. If you want to deploy the project to AWS later you’ll need to run the [resources deploy](http://docs.serverless.com/docs/resources-deploy) command later.

![serverless project create -c](https://cdn-images-1.medium.com/max/4776/1*iALKLWekWMsdppfk3r96tg.png)*serverless project create -c*

Once this is command has finished you will have a project with the following structure:

    s-project.json
    s-resources-cf.json
    admin.env
    _meta
      |__resources
         |__s-resources-cf-dev-useast1.json
      |__variables
         |__s-variables-common.json
         |__s-variables-dev.json
         |__s-variables-dev-useast1.json

At this stage our project just contains metadata about the project and a CloudFormation template.

The next step is to create a function. There are a few architectural choices you can make here, Monolithic, Microservices and Nanoservices. You can read more about this in the [Serverless Documentation](http://docs.serverless.com/docs/application-architectures). Each option has benefits and you can mix all three styles into one Application. I have chosen to use Nanoservices for this example.

The create function will ask you to choose a runtime and if you want to create an [AWS API Gateway Endpoint](https://aws.amazon.com/api-gateway/), Event or Just the Function. For our example, we need to create an endpoint.

![serverless function create](https://cdn-images-1.medium.com/max/3372/1*-bqpjVGnXtMj7vCKkzBedg.png)*serverless function create*

This will add the following files to your project.

    foo
      |__get
         |__event.json
         |__handler.js
         |__s-function.json

### Example Serverless function

This brings us to implementing our GET method. The code that is executed by Lambda when a request is made to our endpoint is contained in **handler.js**.

This file contains a function with three parameters:

* *event* — contains event data (request params)

* *context* — contains runtime information

* *callback* — used to return information to the caller (response data)

This function is called when a request is made to our API Gateway endpoint. The implementation of our handler is very similar to the implementation of the get method in the Express app.

    **var** foo = require('../lib/foo');

    *//Lambda Handler*
    module.exports.handler **=** **function**(event, context, cb) {

    ** var** id **=** event.id;
    
      foo
        .get(id)
        .then(**function**(foo) {
          cb(null, foo); //Successful response
        })
        .**catch**(**function** (err) {
          cb(err); //Error response
        });
    };

There are two key differences:

* The *id* parameter is retrieved from the *event* object instead of using *req.params.*

* The response is returned through a callback.

The final step is to update the **s-function.json**. This file defines our API Gateway endpoint. We need to include the *id* parameter in the request path and include it in the *event* object.

    "name": "get",
    ...
    "endpoints": [{
      "path": "foo/{id}", // Include id param in path
      "method": "GET",
      ...
      "requestTemplates": {
        "application/json": {
          "id": "$input.params('id')" // Add id to the event object
        }
      }
      ...
    }]
    ...

### Testing our Function

To test the function locally we need to simulate API Gateway. A plugin called [Serverless Offline](https://github.com/dherault/serverless-offline) starts a web server that simulates API Gateway. Follow the instructions on [Github](https://github.com/dherault/serverless-offline) to install the plugin.

![Serverless Offline console](https://cdn-images-1.medium.com/max/2228/1*Hg_NaC7K0uCAVTQx1jUIAQ.png)*Serverless Offline console*

![Response in the Browser](https://cdn-images-1.medium.com/max/2072/1*o6DQHmytc8dfEaI9t_uxQw.png)*Response in the Browser*

### What’s next?

The point of this exercise was to convert an Express app to Serverless. While we’ve successfully done that for a basic Express app, we’re a long way from converting a real world app to Serverless.

We haven’t covered:

* [Receiving POST requests with a body — Part 2](https://medium.com/@johncmckim/express-to-aws-lambda-part-2-f5183389a3ec)

* [Setting headers on our responses — Part 3](https://medium.com/@johncmckim/express-to-aws-lambda-part-3-eca9a442f9ff)

* [Authenticating requests — Part 4](https://medium.com/@johncmckim/express-to-aws-lambda-part-4-22257f71385f)

* [Worker instances or background tasks — Part 5](https://medium.com/@johncmckim/express-to-aws-lambda-part-5-dcde1532279c)

I will cover those issues in future posts. If you want to explore this example more in the mean time, please check out the repo on [Github](https://github.com/johncmckim/express-to-aws-lambda/tree/1-basic).

*Myself and the team at [A Cloud Guru](https://acloud.guru/) are building a Serverless training system. If you need to get AWS certified or build Alexa skills sign up and start learning today.*
