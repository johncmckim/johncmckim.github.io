---
layout: blog
category: blog
title: "Express to AWS Lambda: Apex Edition (Part 1)"
description: >
  TODO DESCRIPTION
---

# Express to AWS Lambda: Apex Edition (Part 1)

Getting Started

Functions as a Service (FaaS) and Serverless Architectures are catching imaginations of developers. Early adopters, like me, have been learning, exploring and creating Serverless applications. The [Serverless Framework](http://serverless.com/) has deservedly been receiving a lot of attention. However, it is not the only Framework for Serverless Applications.

Apex is a framework created by [TJ Holowaychuk]() for building, deploying and managing AWS Lambda functions. I originally learnt about AWS Lambda by converting an [Express app to Serverless](https://medium.com/@johncmckim/express-to-aws-lambda-part-1-a057096abe34). To learn more about Apex, I decided to put it to the same test, converting a basic Express app to Serverless.

### Example Express App

I started with a very basic Express app. I wanted to learn how to receive input through a web request and return JSON.

    var express = require('express');
    var foo = require('./foo');

    var app = express();

    app.get('/foo/:id', function (req, res) {
      var id = req.params.id;

      foo
        .get(id)
        .then(function(foo) {
          res.status(200).send(foo);
        })
        .catch(function (err) {
          res.status(500).send();
        });
    });

    app.listen(5000, function () {
      console.log('Listening on port 5000');
    });

### Getting Started with Apex

Before you get started with Apex, you will need to sign up for an [AWS Account](http://aws.amazon.com/), [create IAM credentials](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html) and store those credentials as a [profile on your machine](http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html).

The next step is to install Apex. If you are on Windows, you will need to [download the binary](https://github.com/apex/apex/releases). If you are on a Mac or Linux machine you can run the following in your terminal.

    curl [https://raw.githubusercontent.com/apex/apex/master/install.sh](https://raw.githubusercontent.com/apex/apex/master/install.sh) | sh

After installing the tool, we are ready to create our project. To create the project we first need to export two environment variables *AWS_PROFILE *and *AWS_REGION*. After setting those variables, we can create the project with *apex init* command.

![Create a new Apex project](https://cdn-images-1.medium.com/max/2152/1*-8mNIX5yRMlFOleFvwhpGQ.png)*Create a new Apex project*

The init command creates a basic project structure and configures the required IAM roles and policies on AWS.

**Functions**
After the *init* command has finished executing, you will have a project with the following structure.

    project.json
    functions/
    ├── hello 
    │ └── index.js

Apex has a very simple project structure. The **project.json** file contains the configuration for our project. The functions folder contains each of our lambda functions in sub folders. Each function may optionally have a **function.json** file which overrides the default in project.json. The names of the lambda functions are based on the project name and folder name i.e. *express-to-aws-lambda_hello*.

Since the the endpoint in our Express app is */foo* I updated the function name to *foo.* I then deployed the function and invoked the function to test that it works.

![apex deploy and invoke](https://cdn-images-1.medium.com/max/2904/1*jH74dgVZ41cGQMDYErSxQA.png)*apex deploy and invoke*

**Infrastructure**
Rather than implementing commands to manage infrastructure, Apex has chosen to integrate with [Terraform](https://www.terraform.io/). Each environment or stage is defined in the infrastructure directory.

    infrastructure/
    ├── prod 
    │ └── main.tf 
    ├── stage 
    │ └── main.tf

Once you have defined your [Terraform](https://www.terraform.io/) resources, you can then deploy your resources with the following commands.

    apex infra -e prod plan   // creates an execution plan
    apex infra -e prod apply  // applies the changes

For this example I needed to create a HTTP endpoint at */foo/{id}*. I used Terraform to configure IAM Roles and an API Gateway endpoint at */foo/{id}*.

![Running Terraform apply](https://cdn-images-1.medium.com/max/3572/1*8bel9oJwxmP1GVliIEzj-Q.png)*Running Terraform apply*

After deploying the API Gateway endpoint I was able to

![Calling the API Gateway endpoint](https://cdn-images-1.medium.com/max/2244/1*JnLULLOzYLhpELzB73ix-Q.png)*Calling the API Gateway endpoint*

### What’s next?

So far we have created a basic Apex project, deployed the lambda function and invoked it. In the next part, we’ll look at using Terraform to deploy the infrastructure for our Apex project.

If you want to see more articles like this, follow [Serverless Zone](https://serverless.zone/) and myself on Medium or [Twitter](https://twitter.com/johncmckim).

*Myself and the team at [A Cloud Guru](https://acloud.guru/) are building a Serverless training system. If you need to get AWS certified or build Alexa skills sign up and start learning today.*
