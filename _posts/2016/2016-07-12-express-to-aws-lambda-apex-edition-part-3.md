---
layout: blog
category: blog
title: "Express to AWS Lambda: Apex Edition (Part 3)"
subtitle: Authorization and Workers
description: >
  In Part 1 and Part 2 of this series we have created an AWS Lambda function 
  and API Gateway using the Apex Framework...
---

# Express to AWS Lambda: Apex Edition (Part 3)

Authorization and Workers

In [Part 1](https://serverless.zone/express-to-aws-lambda-apex-edition-part-1-bcc11102feeb#.sv6tyvfiq) and [Part 2](https://serverless.zone/express-to-aws-lambda-apex-edition-part-2-53405a867b12#.hka0mwrwj) of this series we have created an AWS Lambda function and API Gateway using the [Apex Framework](http://apex.run). Real world applications often need to protect their resources and run background tasks. As a result, the next steps for for us is to look into API Gateway [Custom Authorizers](https://aws.amazon.com/blogs/compute/introducing-custom-authorizers-in-amazon-api-gateway/) and [Lambda event sources](http://docs.aws.amazon.com/lambda/latest/dg/use-cases.html).

### Example Express App

Our Express app for this post is a Microservice that processes ‘jobs’. Our service has a single POST endpoint */jobs*. The */jobs* endpoint publishes jobs to a RabbitMQ server for processing by workers. The endpoint is protected against unauthorized access through JSON Web Tokens (JWTs).

    var rabbit = jackrabbit(process.env.RABBIT_URL);
    var exchange = rabbit.default();

    var app = express();

    app.use('/jobs', jwt({ secret: config.auth.secret }));

    app.post('/jobs', function(req, res) {
      exchange.publish(req.body.name, { key: TASK_QUEUE_KEY });
      res.status(201).send();
    });

To convert this Express app to AWS Lambda we will need to build on what we have learnt previously. Using what we have learnt in [Part 1](https://serverless.zone/express-to-aws-lambda-apex-edition-part-1-bcc11102feeb#.sv6tyvfiq), we need to create and deploy three Lambda functions, *auth*, *jobs* and *worker*. We then need to use Terraform to create an API Gateway endpoint just like we did in [Part 2](https://serverless.zone/express-to-aws-lambda-apex-edition-part-2-53405a867b12#.hka0mwrwj). The final steps are to create an API Gateway [Custom Authorizer](https://aws.amazon.com/blogs/compute/introducing-custom-authorizers-in-amazon-api-gateway/) using our *auth* function and trigger our *worker* function from our *jobs* function.

### API Gateway Custom Authorizers

API Gateway Custom Authorizers allow us to control access to our API Gateway resources. The Custom Authorizer delegates authentication to a Lambda function which returns a policy granting or denying access to API Gateway Methods. For our app, we need to create a Custom Authorizer that delegates authentication to our *auth* function.

The first step is to create our Custom Authorizer using Terraform. The *aws_api_gateway_authorizer* resource requires three parameters *name*, *rest_api_id* and *authorizer_uri*. The *authorizer_uri* is the ARN of our *auth* Lambda function.

    resource "aws_api_gateway_authorizer" "foo_authorizer" {
      name = "foo_authorizer"
      rest_api_id = "${aws_api_gateway_rest_api.foo_api.id}"
      authorizer_uri = "arn:aws:apigateway:${var.aws_region}:lambda:path/2015–03–31/functions/arn:aws:lambda:${var.aws_region}:${var.aws_account_id}:function:express-to-aws-lambda_auth/invocations"
     authorizer_credentials = "${var.gateway_invoke_lambda_role_arn}"
    }

While this will create a Custom Authorizer, it does not add the Authorizer to any API Gateway methods. Unfortunately, as of now (July 2016), the API Gateway resources in Terraform, do not support setting a Custom Authorizer on an API Gateway method. As a result, we need to manually configure the Authorizer in the AWS console.

![Custom Authorizer](https://cdn-images-1.medium.com/max/3108/1*-YTnXERF-P-JV-NzTYVjgQ.png)*Custom Authorizer*

Now that we have added a Custom Authorizer to our */jobs* endpoint, we need to configure the *auth* function to return a valid policy. The custom authorizer policy contains two properties, *principalId* and *policyDocument*. The *principalId* identifies the principal or user that made the request. The policy document is used to grant or deny access to particular endpoints.

    {
      "principalId": "xxxxxxx",
      "policyDocument": {
        "Version": "2012-10-17",
        "Statement": [
          {
            "Effect": "Allow",
            "Action": [
              "execute-api:Invoke"
            ],
            "Resource": [
              "arn:aws:execute-api:us-east-1:xxx:xxx/*/POST/jobs"
            ]
          }
        ]
      }
    }

I will leave the specific implementation of the *auth* function up to you. You can use JWT’s, OpenId or any other token based authorization framework. If you would like to dive deeper into Custom Authorizers please check out the code on [Github](https://github.com/johncmckim/express-to-aws-lambda/tree/4-authentication).

### Lambda Event Sources

The ability to invoke functions in response to events generated by other AWS services is one of the most power features of Lambda. This allows developers to build complex event driven processes in a very simple way.

To convert our Express app to Lambda, we need accept *jobs* via [API Gateway](https://aws.amazon.com/api-gateway/) and send a message to a worker to perform the job. Instead of using RabbitMQ, we will be using the [AWS Simple Notification Service](https://aws.amazon.com/sns/) (SNS) to push jobs to our worker. SNS is a scalable pub-sub service that integrates with AWS Lambda.

The first step is to create an SNS topic and subscription using Terraform.

    resource "aws_sns_topic" "jobs_worker_topic" {
      name = "jobs_worker_topic"
      display_name = "Jobs Worker"
    }

    resource "aws_sns_topic_subscription" "jobs_worker_topic_subscription" {
      topic_arn = "${aws_sns_topic.jobs_worker_topic.arn}"
      protocol = "lambda"
      endpoint = "arn:aws:lambda:${var.aws_region}:${var.aws_account_id}:function:express-to-aws-lambda_worker"
    }

Once you have applied the Terraform resources, you should see a SNS Trigger on your *worker* Lambda function.

![](https://cdn-images-1.medium.com/max/3872/1*Vlx3MB43RQ3o0UWXPrCDVg.png)

Now that our worker will respond to a SNS topic, we need to publish SNS messages from our *jobs* function.

    import AWS from 'aws-sdk'

    const sns = new AWS.SNS();

    console.log('starting function');

    export default function(event, context, cb) {
      const message = {
        name: event.body.name
      };

      const params = {
        Message: JSON.stringify(message),
        TopicArn: process.env.WORKER_SNS_TOPIC_ARN
      };

      console.log('Publishing job: ', message);

      sns.publish(params, function(err, data) {
        if (err) {
          console.log(err, err.stack); // an error occurred
          return context.fail('Unexpected Error')
        } else {
         console.log('Successfully published job: ', data);
         return context.succeed({
           job: event.body.name
         });
        }
      });
    };

Our worker is then able to process SNS events. The *event* object contains an array or *Records* that represent the SNS messages pushed to our Lambda function.

    import util from 'util';

    export default function(event, context, cb) {
      console.log(
        'Recieved lambda event:', 
        util.inspect(event, { depth: 5 })
      );

      event.Records.forEach(function(evt) {
        if(evt.EventSource !== 'aws:sns') {
          console.warn(‘Recieved non sns event: ‘, evt);
          return;
        }

        const message = JSON.parse(evt.Sns.Message);

        console.log(‘Got job: ‘, message.name);
      });
     
      return cb(null, {
        message: 'success'
      });
    }

SNS is not the only event source for Lambda functions. Other AWS services such as S3, DynamoDb and Kinesis integrate with Lambda (see [use cases](http://docs.aws.amazon.com/lambda/latest/dg/use-cases.html)). Some of these events, such as SNS, are push events. Push event sources invoke Lambda functions directly. Other event sources such as [AWS Kinesis Streams](https://aws.amazon.com/kinesis/streams/) are **Pull **event sources. Lambda must poll these event sources and invoke Lambda functions when the events occur. I suggest [reading the docs](http://docs.aws.amazon.com/lambda/latest/dg/intro-invocation-modes.html) for more information about Lambda event sources.

### What’s Next

This is the last post in this series. I hope it helped you get started with Apex and AWS Lambda. If you want to explore this example and the previous examples, please checkout the code on [Github](https://github.com/johncmckim/express-to-aws-lambda).

If you want to see more articles like this, follow [Serverless Zone](https://serverless.zone/) and myself on Medium or [Twitter](https://twitter.com/johncmckim).
