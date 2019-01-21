---
layout: blog
category: blog
title: "Serverless Framework: The Good Parts"
description: >
  TODO DESCRIPTION
---

# Serverless Framework: The Good Parts

The Serverless Framework is relatively new application framework for developing applications on AWS Lambda and API Gateway. I recently wrote a five part series about my experiences learning the Serverless Framework. After spending time learning and using Serverless, I wanted reflect on the good parts of the Serverless Framework and areas that need improving.

Application frameworks exist to provide structure and reduce the amount of time developers spend resolving general issues during development. As an application framework, the success of the Serverless Framework will depend on how well it solves the common problems developers face when developing a serverless application.

### The Best Part

The first test for any Application framework should be to compare the experience of developing with and without the framework. If it is easy to develop an application without an application framework, why use an application framework at all?

Developers can build applications on AWS Lambda and API Gateway without the Serverless Framework. However, this requires the developer to create their own project structure and write custom scripts to deploy their project. Time spent on your own custom application framework is time spent not working on your application. The best part of the Serverless Framework, is the time it saves and how easy it is to use.

### Good Parts

**Project Structure
**The Serverless Framework has a flexible project structure that is easy to understand. A project consists of a project files, meta data and functions.

    s-project.json // Project file (JSON or YAML)
    s-resources-cf.json  // CloudFormation template
    s-templates.json // Config templates and variables
    admin.env        // AWS Profiles (gitignored)
    _meta            // Metadata (gitignored)
    function1        // A function
      |__event.json
      |__handler.js
      |__s-function.json

Function folders can exist at the root of your project or in subfolders. This allows you to organise your code exactly how **you **would like it to be organised. Serverless also provides a command to create your project and functions.

    sls project create
    sls function create function1 // or subfolder/function1

The commands make it quick and easy to create a project and add functions to your project. The flexible structure and tools to build that structure are a good part of the Serverless Framework.

**Configuration
**Configuration is usually not a good part of an application framework. I have configured Java beans, Spring XML, old .NET *.config files. Each time I approached the task with a greater sense of foreboding. Moving to Express and .NET Core with light configuration options provided a much better developer experience. It was a nice surprise to find the Serverless configuration relatively easy to use.

Application frameworks have configuration files to configure external and application components. Configuration files in serverless frameworks are needed to glue many individual cloud services together. The Serverless Framework does this in a very user friendly way.

The Serverless Framework has three project configuration files and each function has a configuration file (see structure section above). The structure of these config files allow developers to quickly find the config file they need to change. The configuration options are also reasonably self-explanatory. The caveat to this is the AWS specific configurations like Request and Response mappings. To fully understand the configuration developers do need to learn about AWS and read the AWS documentation.

[Variables and Templates](http://docs.serverless.com/docs/templates-variables) in the Serverless Framework help developers avoid configuration hell. This feature allows developers to define common configurations in templates and re-use those templates via variables throughout a project. This eliminates a lot of duplicate configuration significantly reducing the boiler plate required to configure functions. Without this feature, the configuration would quickly grow to an unmanageable size.

The easy to understand configuration structure and ability to re-use configuration make configuration a good part of the Serverless Framework.

**Deployments
**The Serverless Framework allows you to define all you infrastructure as code in one project. With more traditional web app frameworks, the infrastructure is separate from the code. While containers bring infrastructure and code closer together, your containers still need to run on a cluster of hosts.

Deploying a Serverless project is a very simple process. The Serverless framework provides CLI commands to deploy the CloudFormation *resources*, API Gateway *endpoints*, AWS *events* and Lambda *functions*. These components are deployed per stage, allowing developers to easily deploy separate prod, test and dev environments.

The ability to define and easily deploy infrastructure and code from single project is a good part of the Serverless Framework.

### Areas for Improvement

As good as the Serverless Framework is, there is room for improvement. These issues are from my experiences learning the Serverless Framework. The framework is currently in a Beta (v5.5) and is being constantly updated.

**Local Testing**
To be productive, developers need short code/test development cycles. Test driven development is great for working on individual functions. However, at some point, endpoints and events need to be tested. Testing on AWS is requires resources to be deployed and then invoked. The quickest way to test endpoints and events, would be to test them locally.

There are two options for simulating API Gateway endpoints locally, [Serverless Serve](https://github.com/Nopik/serverless-serve) and [Serverless Offline](https://github.com/dherault/serverless-offline). I use Serverless Offline as I found the simulation was better. The maintainer is responsive and open to pull requests, I contributed the custom authorisation support. However, as good as the plugin is, the simulation is not perfect. My workflow involves running tests, running endpoints locally and then deploying and testing on AWS.

While testing on AWS works well, local testing helps productivity. I’m glad to see that the Serverless Framework has an [issue on GitHub](https://github.com/serverless/serverless/issues/1283) to look at improving local testing.

**Continuous Integration/Continuous Deployment**
Although I listed deployments as a good part of the Serverless Framework, the CI/CD story needs improvement. There is not a lot of documentation on automated deployments with Serverless.

A common trap is related to the project metadata. The project metadata contains CloudFormation outputs and user variables. These are used in the function configurations. However, due to the sensitive nature of these variables, the metadata is gitignored by default. As a result, a fresh clone of a Serverless project needs it’s metadata synced before it can be deployed. The [Serverless Meta Sync](https://github.com/serverless/serverless-meta-sync) plugin can help with this by storing a project’s metadata in S3. However, this is not mentioned in the Serverless docs leaving many people confused.

Deploying a Serverless project is easy, but it could be easier. Four separate commands are needed to deploy a project automatically. Each command needs to be checked if it was successful and if there’s a failure, earlier commands need to be rolled back. I would like to see is a **project deploy** command to co-ordinate resources, functions, endpoints and events.

Again, the Serverless team has an [issue on GitHub](https://github.com/serverless/serverless/issues/1251) to improve the CI/CD process. However, it isn’t clear yet what improvements are in the pipeline.

**Docs and Examples
**Developers on the [Serverless Gitter](https://gitter.im/serverless/serverless) that are new to the Serverless Framework tend to ask the same questions. I see many of the questions I had the I was learning being asked by others.

Documentation explains the *what* and *how* of a framework. There is often not a lot of room to go into detail and explain the *why*. Examples and guides have more freedom to focus in and explain important parts of a framework in detail. I would like to see more examples and guides to help developers that are new to the framework get started with Serverless.

The Serverless team has an [issue on GitHub](https://github.com/serverless/serverless/issues/1249) to add more examples. I’m looking forward to seeing those.

### What’s Next

I’m looking forward to version 1.0 of the Serverless Framework. The [issues on GitHub](https://github.com/serverless/serverless/milestones/1.0) are really promising. The framework is getting a big overhaul which will hopefully include support for [Google Cloud Functions](https://github.com/serverless/serverless/issues/1248) and [Azure Functions](https://github.com/serverless/serverless/issues/1158).

Thanks for reading, I hope you found it useful. If you want to see more articles like this, follow me on Medium or [Twitter](https://twitter.com/johncmckim).

*Myself and the team at [A Cloud Guru](https://acloud.guru/) are building a Serverless training system. If you need to get AWS certified or build Alexa skills sign up and start learning today.*
