---
layout: blog
category: blog
title: "Adopting Serverless — Outsourcing"
subtitle: The effect of outsourcing to fully managed service providers
poster_img: static/medium/6000-1*CfSUDWSeqbx9609nQkm7Fw.jpeg
description: >
    In my last article, I wrote about the Architectural and Securityissues you will
    face when going serverless. In this article, I want to explore the effect of
    outsourcing to fully managed service providers.
---

# Adopting Serverless — Outsourcing

The effect of outsourcing to fully managed service providers

![“Have you tried rebooting your Serverless” — ([http://negativespace.co](http://negativespace.co/photos/notebook-stock-photo))](/static/medium/6000-1*CfSUDWSeqbx9609nQkm7Fw.jpeg)*“Have you tried rebooting your Serverless” — ([http://negativespace.co](http://negativespace.co/photos/notebook-stock-photo))*

In my last article, I wrote about the [Architectural and Security](https://read.acloud.guru/adopting-serverless-architectures-and-security-254a0c12b54a) issues you will face when going serverless. In this article, I want to explore the effect of outsourcing to fully managed service providers.

## Outsourcing

The core concept behind Serverless is outsourcing to service providers. Outsourcing services to providers is not a new concept in IT. You may already be outsourcing your data centre management to AWS or Azure.

![Maybe not](/static/medium/2000-1*fmHAHYsIlY0ezY4AZgUESw.jpeg)*Maybe not*

Using a cloud provider is often viewed as a technical decision. But choosing to outsource at all should be a business decision. Before going outsourcing a service you should ask two questions.

1. Is this service a source of competitive advantage?

1. Does the service have a big operational impact on the business? i.e. will a failure cause a large disruption?

These questions form the basis of the [outsourcing decision matrix](https://www.mindtools.com/pages/article/newSTR_45.htm). If the answer is No and Yes respectively, you should outsource the service.

Many of the tasks required to operate an application are important but not a source of competitive advantage. This is why so many organisations are adopting the cloud.

The difference with Serverless is that you are outsourcing much more than before. In a traditional application you perform operational tasks like patching and scaling. But serverless applications use fully managed services. This changes your responsibilities, how you handle failures, your dependency on provider support and costs.

### **Responsibilities**

Cloud providers often talk about shared responsibilities. Cloud providers are responsible for operating and securing their services. You as a customer are responsible for how you use those services.

Using a fully managed service means giving up more control over your infrastructure. Your provider assumes responsibility for delivering their services in a scalable and secure way. This allows you to focus on developing your application instead of managing infrastructure. Despite this, you cannot absolve yourself of responsibility.

You are responsible for the service you provide to your customers. Your customers **do not care** about the service providers you are using. They **do not even care** about the cost, scalability or security features of your cloud provider. But, your customers **do care** about how performant, secure or cheap your service is. Importantly, your customers will hold you to account for failures even if they are not your own.

### Failures

No service is perfect. At some point your chosen service provider will have a bug or an outage. One of our providers recently had an outage prompting this tweet from our friend [Toby Hede](https://medium.com/@tobyhede).

<iframe src="https://medium.com/media/3fe756b2c227dfedc95284b73194dbe3" frameborder=0></iframe>

We had no option other than communicating the issue to our customers and waiting for our provider to resolve the issue. Our provider resolved the problem quickly and all was well. This outage highlighted the importance of choosing good service providers.

When choosing a provider you should consider failures. You need to ask three questions:

* What is the SLA of the service provider?

* Is the provider transparent about uptime? Do they have a status page?

* How does your provider respond to outages?

The answers to these questions must give you confidence that your provider will respond to failures quickly and effectively. If not, you might need to consider another provider.

### Resilience

The responsibility of delivering your service ultimately rests with you. As a result, you shouldn’t completely rely on your provider.

What would happen if your [provider shut down](https://parse.com/)? Or what if the service they provide started to degrade consistently? You might find that you have to switch provider or implement a service yourself.

If required, how easily could you switch to another provider? This is where vendor lock-in could be an issue. A system that is tightly coupled to your provider is more difficult to change. This increases your risk of service disruptions caused by a provider.

Data is a valuable asset in every organisation. You are responsible for your data and any data loss. How would you handle a situation where your provider suffered a data loss? How quickly can you get backups of your data from your provider? Can you take your own backups? You should be able to answer these questions before you store your data in the cloud.

### Support

Outsourcing to your provider means there are some problems you just cannot solve yourself. It might be as simple as a question you need answered or a critical issue with the service. When you have a problem with your provider, who ya gonna call?

![“Ghostbusters” — [wikipedia](https://en.wikipedia.org/wiki/Ghostbusters_%28franchise%29)](/static/medium/2000-1*oqGpk3iRi_LVcSjnIiJC7g.png)*“Ghostbusters” — [wikipedia](https://en.wikipedia.org/wiki/Ghostbusters_%28franchise%29)*

If you have a critical issue, will your provider respond rapidly to assist you? What level of support will they provide? A quality support service is an important aspect of a fully managed service.

### Cost

Serverless will be more cost effective for most workloads. I have heard of people running production workloads on AWS Lambda for $0. The cost benefits come from going from low levels of server utilisation to full utilisation.

Not all workloads will be cheaper on a FaaS (Function-as-a-Service) platform. Executing a FaaS function 24 hours a day, 7 days a week will cost more than running the same code on a server. However, most workloads do not fall into this category.

Other cost changes are harder to quantify. Using fully managed services can save developer time. At A Cloud Guru outsourcing allows us to do more with less people. But unfortunately it isn’t as straight forward as that.

Adopting an immature technology like Serverless does cost time too. While it is improving, the lack of a mature ecosystem around Serverless costs us time. We have to build knowledge and solutions for problems that will be solved in the future.

## Serverless at A Cloud Guru

It has been over a year since A Cloud Guru was first created. There has been rapid changes in the ecosystem since that time. This is a good time to reflect on the journey so far.

### Would we do it again?

YES! Adopting Serverless allowed [Sam Kroonenburg](https://medium.com/@samkroon) to rapidly develop the first version of A Cloud Guru. The lack of an ecosystem around Serverless (tooling, docs, community) made this a difficult process.

The ecosystem around serverless has seen the most development in the last year. There are great [frameworks](https://github.com/ServerlessHeroes/serverless-resources), [communities](https://wt-serverless-seattle.run.webtask.io/serverless-forum-signup) and even a [conference](http://serverlessconf.io/) dedicated to Serverless. We will continue to contribute by sharing our knowledge with the community.

### What’s Next?

This is the last post in [this](https://read.acloud.guru/adopting-serverless-people-and-devops-336e3ab89e96) [series](https://read.acloud.guru/adopting-serverless-architectures-and-security-254a0c12b54a). I hope you enjoyed it and consider adopting Serverless for your projects. We’d love to hear what you are doing with Serverless. Respond to this article or tweet us at [@acloudguru](https://twitter.com/acloudguru). If you want to hear more of our journey with Serverless follow this blog.

If you want to read more of my articles on Serverless, you can follow me on Medium or [Twitter](https://twitter.com/johncmckim).

![](/static/medium/2000-1*4SAJI2W8hInwwRCn7R8a6A.png)

### A Cloud Guru

The mission of A Cloud Guru is to engage individuals in a journey to level-up their cloud computing skills by delivering the world’s leading educational content designed to evolve both mindsets and careers.
> # “Let no man in the world live in delusion. Without a Guru, none can cross over to the other shore.“ — Guru Nanak

Our [courses](https://acloud.guru/courses) are delivered by industry experts with a shared passion for cloud computing. We strive to serve our growing community of cloud gurus, who generously contribute their insights in our [forums](https://acloud.guru/forums/home), workshops, meet-ups, and [conferences](https://acloud.guru/serverless).

*Keep up with the A Cloud Guru crew [@acloudguru](https://twitter.com/acloudguru).*
