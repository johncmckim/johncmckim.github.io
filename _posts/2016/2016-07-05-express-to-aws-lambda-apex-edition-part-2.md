---
layout: blog
category: blog
title: "Express to AWS Lambda: Apex Edition (Part 2)"
subtitle: Terraform
description: >
  In Part 1 of this series we looked at how to get started with AWS Lambda and the Apex Framework.
  So far we have built, deployed and tested an AWS Lambda function...
---

# Express to AWS Lambda: Apex Edition (Part 2)

Terraform

In [Part 1](https://serverless.zone/express-to-aws-lambda-apex-edition-part-1-bcc11102feeb#.sv6tyvfiq) of this series we looked at how to get started with AWS Lambda and the [Apex Framework](http://apex.run). So far we have built, deployed and tested an AWS Lambda function. To finish converting our Express app from Part 1, we need to process HTTP requests. Therefore, the next step is to create an API Gateway using [Terraform](https://www.terraform.io/).

### Example Express App

Our Express app from Part 1 had one *GET* endpoint. This endpoint accepted a single parameter *:id*.

    app.get('/foo/:id', function(req, res) {
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

### Getting Started with Terraform

[Terraform](https://www.terraform.io/) is a tool used to define infrastructure as code for various infrastructure providers. Apex has integrated Terraform into the framework through the *apex infra* command. This command wraps the *terraform plan* and *terraform apply* commands.

The infrastructure for the project is defined in the *infrastructure* directory.

    infrastructure/
    ├── modules       // common modules
      ├── api_gateway
      │ └── main.tf
      ├── iam
      │ └── main.tf 
    ├── prod         // prod stage
    │ └── main.tf

[Terraform](https://www.terraform.io/) has created a custom syntax for configuration files. The syntax is very human readable and easy to understand. [Terraform](https://www.terraform.io/) has implemented Variables and Modules to allow you to re-use parts of your configuration. While [Terraform](https://www.terraform.io/) is easy to use, the difficult part is correctly configuring the resources you require.

### API Gateway

AWS Lambda is a compute service. To process HTTP requests, we need to use another AWS service. [API Gateway](https://aws.amazon.com/api-gateway/) allows you to create HTTP endpoints as a service. The Gateway accepts requests and passes those requests to a back-end for processing. In this example, we need to configure an API Gateway resource to pass requests to Lambda and return the responses to the client.

The *resource* block is a core part of all [Terraform](https://www.terraform.io) configurations. A *resource* is a piece of infrastructure such as an EC2 instance, or in our case an API Gateway. For this example, I am going to focus on the resources needed to create an API Gateway endpoint. I suggest reading the [Terraform Docs](https://www.terraform.io/intro/getting-started/build.html), if you want to learn more about the other block types*.*

**Configuration**
The first Terraform resource we need to define is an *aws_api_gateway_rest_api. *This resource defines the API Gateway. All the other Terraform resources will be children of this resource.

    resource "aws_api_gateway_rest_api" "foo_api" {
     name        = "foo_api"
     description = “This is my api gateway”
    }

The next step is to define our API Gateway resources using a *aws_api_gateway_resource*. The terminology becomes confusing here as we now have Terraform resources and API Gateway resources. I like to think of an API Gateway resource as part of a URL e.g. */foo.*

In our example, we need to expose a GET endpoint at */foo/{id}*.

    # Resource /foo
    resource "aws_api_gateway_resource" "foo_resource {
     rest_api_id = "${aws_api_gateway_rest_api.foo_api.id}"
     parent_id = "${aws_api_gateway_rest_api.foo_api.root_resource_id}"
     path_part = "foo"
    }

    # Resource /foo/{id}
    resource "aws_api_gateway_resource" "foo_id_resource" {
     rest_api_id = "${aws_api_gateway_rest_api.foo_api.id}"
     parent_id = "${aws_api_gateway_resource.foo_resource.id}"
     path_part = "{id}"
    }

Each *aws_api_gateway_resource* references the parent resource and a path part. The *foo *resource’s parent is the *root_resource* of the API and the *{id}* resource’s parent is the *foo* resource.

Now that we have defined our API Gateway resources, we need to add a *GET* method to */foo/{id}*.

    # Method
    resource "aws_api_gateway_method" "foo_get_endpoint_method" {
     rest_api_id = "${aws_api_gateway_rest_api.foo_api.id}"
     resource_id = "${aws_api_gateway_resource.foo_id_resource.id}"
     http_method = "GET"
     authorization = "NONE"
    }

The next step is to define a back-end for our GET request. This is where we connect our Lambda function to our API Gateway.

    # Integration
    resource "aws_api_gateway_integration" "foo_get_endpoint_integration" {
     rest_api_id = "${aws_api_gateway_rest_api.foo_api.id}"
     resource_id = "${aws_api_gateway_resource.foo_id_resource.id}"
     type = "AWS"

     http_method = "${aws_api_gateway_method.foo_get_endpoint_method.http_method}"
     
     credentials = "${var.gateway_invoke_lambda_role_arn}"

     # Must be POST for invoking Lambda function
     integration_http_method = "POST"

     uri = "arn:aws:apigateway:${var.aws_region}:lambda:path/2015–03–31/functions/arn:aws:lambda:${var.aws_region}:${var.aws_account_id}:function:express-to-aws-lambda_foo/invocations"

     request_templates = { // Optional
       "application/json" = 
    "${file("${path.module}/api_gateway_request_mapping.template")}"
       }
    }

The important parts of the configuration are the *uri* and *request_template*. The *uri* points to the Amazon Resource Name (ARN) of our Lambda function. The *request_templates* property allows us to configure API Gateway request mappings. If you are new to API Gateway, I strongly suggest that you read [the docs](http://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-mapping-template-reference.html) on request mappings.

**Half Time**
This is the halfway mark for our request. We have configured the API Gateway to accept a *GET* request and pass it to our Lambda function. There was a lot to configure to get to this point. I promise the next half is easier.

The next step is to pass the response from our Lambda function back to the client. To do so, we need to define an *aws_api_gateway_integration_response *and* aws_api_gateway_method_response.*

    # Integration Response
    resource 
     "aws_api_gateway_integration_response"   
     "foo_get_endpoint_integration_response" {

     rest_api_id = "${aws_api_gateway_rest_api.foo_api.id}"
     resource_id = "${aws_api_gateway_resource.foo_id_resource.id}"
     
     http_method = "${aws_api_gateway_method.foo_get_endpoint_method.http_method}"
     
     status_code = "${aws_api_gateway_method_response.foo_get_endpoint_method200.status_code}"
     
     response_parameters_in_json = <<PARAMS
     {
       "method.response.header.X-Header": "integration.response.body.json_path"
     }
    PARAMS
    }

    # Method 200 Response
    resource
     "aws_api_gateway_method_response"
     "foo_get_endpoint_method200" {

     rest_api_id = "${aws_api_gateway_rest_api.foo_api.id}"
     resource_id = "${aws_api_gateway_resource.foo_id_resource.id}"
     
    http_method = "${aws_api_gateway_method.foo_get_endpoint_method.http_method}"

     status_code = "200"

     response_models = {
       "application/json" = "Empty" // default model
     }

     response_parameters_in_json = <<PARAMS
      {
        "method.response.header.X-Header": true
      }
    PARAMS

    }

Theses resources allow you to configure how data is mapped from the Lambda function back to the client. This configuration allows you to configure HTTP Headers and transform the Lambda results into different formats. I strongly suggest reading the [API Gateway docs](http://docs.aws.amazon.com/apigateway/latest/developerguide/request-response-data-mappings.html) for more information.

Last but not least we have to configure the deployment. 
The *aws_api_gateway_deployment* resource allows us to configure an API Gateway stage and stage variables.

    resource "aws_api_gateway_deployment" "deployment" {
     depends_on=[
       "aws_api_gateway_integration.foo_get_endpoint_integration"
     ]
     rest_api_id = "${aws_api_gateway_rest_api.foo_api.id}"
     stage_name = "${var.api_stage}"
     variables = {
       "functionAlias” = “${var.api_stage}"
     }
    }

This resource depends on other API Gateway methods. If no HTTP methods are defined, this resource will fail to deploy.

**Wrapping up**
There is a lot of configuration involved in setting up a single HTTP endpoint with Terraform. Each HTTP endpoint requires at least five Terraform resources. Furthermore, the HTTP method and integration resources cannot be separated into a module due to the *aws_api_gateway_deployment *dependencies (if it is possible let me know!). The end result is a lot of duplication due to boilerplate code. This is not a problem with the Apex framework, rather the API Gateway resources for Terraform.

### What’s Next

So far we have created a basic Apex project with an API Gateway endpoint backed by Lambda. In the next part, we’ll look at using Terraform configure Authorization for API Gateway and a Lambda worker.

If you want to see more articles like this, follow [Serverless Zone](https://serverless.zone/) and myself on Medium or [Twitter](https://twitter.com/johncmckim).
