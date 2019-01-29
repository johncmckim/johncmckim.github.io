---
layout: blog
category: blog
title: "AWS Lambda in a VPC with the Serverless Framework"
description: >
  AWS Lambda is a compute service that allows us to run code. Yet, code doesn’t exist
  in vacuum. Lambda functions need other resources to generate events and maintain state...
---

# AWS Lambda in a VPC with the Serverless Framework

AWS Lambda is a compute service that allows us to run code. Yet, code doesn’t exist in vacuum. Lambda functions need other resources to generate events and maintain state.

Some AWS resources can only exist within a Virtual Private Cloud (VPC). Resources such as ElastiCache, RDS, and Redshift are often provisioned into private subnets. So to access these resources, Lambda functions must also run inside a VPC.

So how do we configure a [Serverless Framework](http://serverless.com/) project to deploy our Lambda functions within a VPC?

### VPC Configuration

The VPC configuration for our functions depends on our version of the Serverless Framework. Version 0.5 is currently (Aug 2016) the stable version of the Serverless Framework. The VPC configuration for the recent 1.0.0-beta.1 release is different to v0.5. To make sure you are ready for the upcoming 1.0.0 release, we will look at both versions.

**Version 0.5
**To deploy a Lambda to a VPC, we need to update **s-function.json**. The **vpc** property allows us to set the Security Groups and Subnets for our Lambda function.

    {
     "name": "hello",
     "runtime": "nodejs4.3",
     "handler": "handler.hello”,
     "timeout": 3,
     "memorySize": 256,
     "endpoints": [],
     "events": [],
     "vpc": {
        "securityGroupIds": ["${lambdaExecSecurityGroup}"],
        "subnetIds": [
          "${subnetAPrivate}",
          "${subnetBPrivate}",
          "${subnetCPrivate}",
        ]
      }
    }

You need to set the **vpc** property for each function you want to run in a VPC. I suggest using Serverless templates if you need to run many functions within a VPC.

**Version 1.0.0-beta.1
**The beta version of the Serverless framework introduces a simpler yaml based configuration. If you are not familiar with it, I suggest reading [the docs](https://github.com/serverless/serverless/blob/v1.0/docs/understanding-serverless/serverless-yml.md).

As with v0.5, we need to specify the Security Groups and Subnets for our Lambda function. A new feature of the beta version is the ability to set a service wide VPC configuration.

    service: aws-infa-examples
    provider: aws
      runtime: nodejs4.3
      vpc:
        securityGroupIds:
          — ${lambdaExecSecurityGroup}
        subnetIds:
          — ${subnetAPrivate}
          — ${subnetBPrivate}
          — ${subnetCPrivate}

    functions:
      foo:                           # inherits the vpc config
        handler: src/handler.foo
      bar:                           # overwrites the vpc config
        handler: src/handler.bar
        vpc:
          securityGroupIds:
            — ${lambdaExecSecurityGroup}
          subnetIds:
            — ${subnetAPrivate}

### Points to Consider

There are two main points to consider when launching a Lambda function into a VPC.

* Lambda functions will create Elastic Network Interfaces (ENI’s) and allocate IP addresses

* Lambda functions are subject to the same Networking rules as your other resources

To allow your Lambda function to create ENI’s, you need to ensure the Lambda Execution role has the following permissions, *ec2:CreateNetworkInterface*, *ec2:DescribeNetworkInterfaces*
 and *ec2:DeleteNetworkInterface*. This allows Lambda to create and remove ENI’s within your VPC as required.

If you do not have an adequate supply of IP addresses in your subnet, your Lambda function will fail to scale. You need to use at least one subnet per Availability zone to ensure your Lambda function is scalable and highly available.

If you configure a Lambda function to run in a private subnet, it will not have access to the internet by default. You will need to configure a NAT instance or Managed NAT Gateway to provide internet access.

### What’s Next

The code for this post is available on [Github](https://github.com/serverless-examples/serverless-infrastructure). The repo is part of a new Gihub organisation for [Serverless Examples](https://github.com/serverless-examples). I am aiming to build a set of useful examples of various serverless frameworks for the community. I would love help with this, so if you would like to contribute add a response or message me on [Twitter](https://twitter.com/johncmckim).

If you want to see more articles like this, follow [Serverless Zone](https://serverless.zone/) and myself on Medium or [Twitter](https://twitter.com/johncmckim).
