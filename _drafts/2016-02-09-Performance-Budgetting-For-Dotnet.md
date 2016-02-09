---
layout: post
title: Performance Budgeting — .NET
date: 09 Feb 2016
author: John McKim
---
Performance is a critical feature for every web application.

> The slower your website loads and displays, the less people will use it. 
Jeff Atwood — http://blog.codinghorror.com/performance-is-a-feature/

Just like every other feature Performance needs to be maintained and improved just like any other feature in your application. Monitoring and testing for regressions of performance is just as important as monitoring and testing for regressions in any other feature of your application.


## What is a performance budget?
Performance budgeting has existed in the front-end world for a while.

> A performance budget is just what it sounds like: you set a “budget” on your page and do not allow the page to exceed that.
http://timkadlec.com/2013/01/setting-a-performance-budget/

A budget helps improve performance and prevent regressions. As you make improvements, you lower the budget and ensure that future changes do not regress. There are great profiling like http://miniprofiler.com/. However, I could not find a performance budgeting solution for .NET.

## Enter Budgerigar
Budgerigar was created to measure the performance of operations in .NET and log when the performance of the operation doesn’t meet expectations.

~~~
var budgeter = new PerformanceBudgetter();

await budgeter.RunWithBudgetAsync("some-task", 50M, async (b) => {
  ...  
}, (result) => {
      if (result.IsOver) {
          logger.Error(result.GetDetailedOutput());
      }
  });
~~~

Using Budgerigar allows the developer to filter out the noise by only logging when an operation goes over budget. This makes it easier to identify when there is a regression in performance.

To identify what is causing a regression in performance, an operation can be broken down into steps.

~~~
var result = await budgetter.RunWithBudgetAsync(
  "data-processing-task",
  500.0M,
  async (budget) => {

    // Measure how long it takes to get the data
    var data = await budget.StepAsync("get-data", async () => {
        return await provider.GetLotsOfData();
    });

    // Measure how long it takes to process the data
    return await budget.StepAsync("process-data", async () => {
        return await processor.ProcessData(data);
    });

  }, (result) => {
      if(result.IsOver) {
          logger.Error(result.GetDetailedOutput());
      }
  });
~~~

## Practical Usage
Performance Budgeting + Centralised Logging is a very powerful match. An application that uses Budgerigar can report performance regressions to a Centralised Logging solution. The logging system can then alert developers to the issue allowing them to quickly respond.

This package is available on nuget and the code is up on GitHub. If you have any questions add an issue and I’ll get back to you.
