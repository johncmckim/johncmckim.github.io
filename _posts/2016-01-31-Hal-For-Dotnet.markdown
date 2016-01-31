---
layout: post
title: Halcyon — HAL for .NET
date: 31 Jan 2016
author: John McKim
---
While researching [React.js](https://facebook.github.io/react/) and [Flux](https://facebook.github.io/flux/), I read [an article on smashing magazine](http://www.smashingmagazine.com/2015/06/qualities-of-good-flux-implementations/). In this article, the author discusses their use of [Halon](https://github.com/LeanKit-Labs/halon) a JavaScript hypermedia client based on the HAL format. This line from the article caught my attention.

> Instead of having to hard-code specific links (as in the example above), halon allows us to follow links returned with resources, so the only URL we have to know is where we go to get the OPTIONS.

Hard coding specific API links is an annoying maintenance issue. So I started looking into HAL and Hypermedia APIs in general.

## What are Hypermedia APIs?
The definition of Hypermedia on Wikipedia is as follows:

> **Hypermedia**, an extension of the term hypertext, a nonlinear medium of information which includes graphics, audio, video, plain text and hyperlinks.

So then what makes a Hypermedia API? There are a lot of various Hypermedia formats that have been developed in recent years:

* [JSON-LD](http://json-ld.org/)
* [JSON-API](http://jsonapi.org/)
* [Hydra](http://www.markus-lanthaler.com/hydra/)
* [Siren](https://github.com/kevinswiber/siren)
* [HAL](http://stateless.co/hal_specification.html)

The two things all these specifications have in common are resources and links. This allows the API client to get resources from the API and navigate the API based on links included in the response.

---

## HAL in .NET
After researching various options I decided to integrate HAL into our existing API to allow me to use the Halon client in a new front-end. I had two critical requirements for integrating HAL into the existing API.

* I needed to be able to return HAL or plain JSON based on the accept header. The client should be able to chose whether or not to use HAL.
* I don’t want to significantly modify Models to return HAL formatted JSON

After searching on Nuget I found a number of existing packages and two front runners were:

* [WebApi.Hal](https://github.com/JakeGinnivan/WebApi.Hal)
* [HalJsonConverter](https://github.com/MLaritz/HalJsonConverter)

Despite these both being good packages for producing HAL. Both of these required changing my models.

***

## Enter Halcyon
Halcyon was designed with two key requirements:

* The ability to return HAL or plain JSON
* Models don’t have to be modified to to return HAL

To do this the Halcyon attaches `_links` and `_embedded` items to your model. 

This is the end result:

~~~
[HttpGet, Route("{fooId:int}/bars")]
public IHttpActionResult GetBar(int fooId) {
    // A collection of bars related to foo
    var bars = new List<object> {
        new { id = 1, fooId = fooId, type = "bar" },
        new { id = 2, fooId = fooId, type = "bar" }
    };

    // data about the bars related to foo
    var fooBarModel = new {
        fooId = fooId,
        count = bars.Count
    };

    // Return a fooBar resource with embedded bars
    return this.HAL(
        fooBarModel,
        new Link[] {
            new Link("self", "/api/foo/{fooId}/bar")
        },
        "bars",
        bars,
        new Link[] {
            new Link("self", "/api/bar/{id}")
        }
    );
}
~~~

Which turns into:

~~~
{
  "_links": {
    "self": {
      "href": "/api/foo/1/bar"
    }
  },
  "_embedded": {
    "bars": [{
      "_links": {
        "self": {
          "href": "/api/foo/1"
        }
      },
      "id": 1,
      "fooId": 1,
      "type": "bar"
    },{
      "_links": {
        "self": {
          "href": "/api/foo/2"
        }
      },
      "id": 2
      "fooId": 1,
      "type": "bar"
    }]
  }
  "fooId": 1,
  "count": "2"
}
~~~

I am happy with the result I achieved. However, there is always more room for improvement.
I would like to be able to automatically generate links from routes so they do not have to be
passed into the `HAL()` method ([issue on Github](https://github.com/visualeyes/halcyon/issues/9)).
There is also an issue for [a HAL response using attributes](https://github.com/visualeyes/halcyon/issues/6).
This is not a feature I was planning on adding originally. However, I have gotten feedback requesting this
so it is something I am considering. 

This package is available on [nuget](https://www.nuget.org/packages/Halcyon/) and the code is up on [GitHub](https://github.com/visualeyes/halcyon). If you have any questions [add an issue](https://github.com/visualeyes/halcyon/issues) and I'll get back to you.
