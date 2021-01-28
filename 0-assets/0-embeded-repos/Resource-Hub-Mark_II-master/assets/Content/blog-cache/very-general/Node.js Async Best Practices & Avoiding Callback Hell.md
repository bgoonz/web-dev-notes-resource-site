# Node.js Async Best Practices & Avoiding Callback Hell | @RisingStack

> In this post, we cover what tools and techniques you have at your disposal when handling Node.js asynchronous operations: async.js…

In this post, we cover what tools and techniques you have at your disposal when handling Node.js asynchronous operations: async.js, promises, and async functions.

After reading this article, you’ll know how to use the latest async tools at your disposal provided by Node.js!

> Node.js at Scale is a collection of articles focusing on the needs of companies with bigger Node.js installations and advanced Node developers. Chapters:
> 
> .
> 
> **Using npm:**
> 
> \* [npm Tricks and Best Practices](https://blog.risingstack.com/nodejs-at-scale-npm-best-practices/)
> 
> \* [SemVer and Module Publishing](https://blog.risingstack.com/nodejs-at-scale-npm-publish-tutorial/)
> 
> \* [Understanding the Module System, CommonJS and require](https://blog.risingstack.com/node-js-at-scale-module-system-commonjs-require/)
> 
> .
> 
> **Node.js Internals Deep Dive:**
> 
> \* [The Node.js Event Loop](https://blog.risingstack.com/node-js-at-scale-understanding-node-js-event-loop/)
> 
> \* [Node.js Garbage Collection Explained](https://blog.risingstack.com/node-js-at-scale-node-js-garbage-collection/)
> 
> \* [Writing Native Node.js Modules](https://blog.risingstack.com/writing-native-node-js-modules/)
> 
> .
> 
> **Building with Node.js:**
> 
> \* [Advanced Node.js Project Structuring](https://blog.risingstack.com/node-js-project-structure-tutorial-node-js-at-scale/)
> 
> \* [JavaScript Clean Coding Best Practices](https://blog.risingstack.com/javascript-clean-coding-best-practices-node-js-at-scale/)
> 
> \* Node.js Async Best Practices _\[ this article \]_
> 
> \* [Event sourcing with Examples](https://blog.risingstack.com/event-sourcing-with-examples-node-js-at-scale/)
> 
> \* [CQRS (Command Query Responsibility Segregation) Explained](https://blog.risingstack.com/cqrs-explained-node-js-at-scale/)
> 
> .
> 
> **Testing + Node:**
> 
> \* [Node.js Testing and Getting TDD Right](https://blog.risingstack.com/getting-node-js-testing-and-tdd-right-node-js-at-scale/)
> 
> \* [Node.js End-to-End Testing with Nightwatch.js](https://blog.risingstack.com/end-to-end-testing-with-nightwatch-js-node-js-at-scale/)
> 
> .
> 
> **Node.js in Production:**
> 
> \* [The Definitive Guide for Monitoring Node.js Applications](https://blog.risingstack.com/monitoring-nodejs-applications-nodejs-at-scale/)
> 
> \* [How to Debug Node.js with the Best Tools Available](https://blog.risingstack.com/how-to-debug-nodej-js-with-the-best-tools-available/)
> 
> \* [Node.js Post-Mortem Diagnostics & Debugging](https://blog.risingstack.com/post-mortem-diagnostics-debugging-node-js-at-scale/)
> 
> .
> 
> **Node.js + Microservices:**
> 
> \* [Distributed Tracing](https://blog.risingstack.com/distributed-tracing-opentracing-node-js/)
> 
> \* [API Gateways](https://blog.risingstack.com/building-an-api-gateway-using-nodejs/)

Previously we have gathered a strong knowledge about [asynchronous programming in JavaScript](https://blog.risingstack.com/node-hero-async-programming-in-node-js/) and understood how the [Node.js event loop](https://blog.risingstack.com/node-js-at-scale-understanding-node-js-event-loop/) works.

If you have not read these articles, I highly recommend them as introductions!

Node.js itself is single-threaded, but some tasks can run in parallel thanks to its asynchronous nature.

But what does running in parallel mean in practice?

Since we program a single-threaded VM, it is essential that we do not block execution by waiting for I/O, but handle operations concurrently with the help of Node.js’s event-driven APIs.

Let’s take a look at some fundamental patterns, and learn how we can write resource-efficient, non-blocking code, with the built-in solutions of Node.js.

Let’s take a look at these simple async operations. They do nothing special, just fire a timer and call a function once the timer finished.

function fastFunction (done) {  
  setTimeout(function () {  
    done()  
  }, 100)  
}function slowFunction (done) {  
  setTimeout(function () {  
    done()  
  }, 300)  
}

Seems easy, right?

Our higher-order functions can be executed sequentially or in parallel with the basic “pattern” by nesting callbacks — but using this method can lead to an untameable callback-hell.

function runSequentially (callback) {  
  fastFunction((err, data) => {  
    if (err) return callback(err)  
    console.log(data)   _// results of a_

      slowFunction((err, data) => {  
      if (err) return callback(err)  
      console.log(data) _// results of b_

        _// here you can continue running more tasks_  
    })  
  })  
}

[Never use the nested callback approach for handling asynchronous #nodejs operations!” via @RisingStack](https://twitter.com/share?text=Never%20use%20the%20nested%20callback%20approach%20for%20handling%20asynchronous%20%23nodejs%20operations!%22%20via%20%40RisingStack;url=https://blog.risingstack.com/node-js-async-best-practices-avoiding-callback-hell-node-js-at-scale/)

> To become an efficient Node.js developer, you have to avoid the constantly growing indentation level, produce clean and readable code and be able to handle complex flows.

Let me show you some of the tools we can use to organize our code in a nice and maintainable way!

There have been native promises in javascript since 2014, receiving an important boost in performance in Node.js 8. We will make use of them in our functions to make them non-blocking — without the traditional callbacks. The following example will call the modified version of both our previous functions in such a manner:

function fastFunction () {  
  return new Promise((resolve, reject) => {  
    setTimeout(function () {  
      console.log('Fast function done')  
      resolve()  
    }, 100)  
  })  
}function slowFunction () {  
  return new Promise((resolve, reject) => {  
    setTimeout(function () {  
      console.log('Slow function done')  
      resolve()  
    }, 300)  
  })  
}function asyncRunner () {  
    return Promise.all(\[slowFunction(), fastFunction()\])  
}

Please note that `Promise.all` will fail as soon as any of the promises inside it fails.

The previous functions have been modified slightly to return promises. Our new function, asyncRunner, will also return a promise, that will resolve when all the contained functions resolve, and this also means that wherever we call our asyncRunner, we’ll be able to use the .then and .catch methods to deal with the possible outcomes:

asyncRunner()  
  .then((\[ slowResult, fastResult \]) => {  
    console.log('All operations resolved successfully')  
  })  
  .catch((error) => {  
    console.error('There has been an error:', error)  
  })

Since node@12.9.0, there is a method called `promise.allSettled`, that we can use to get the result of all the passed in promises regardless of rejections. Much like Promise.all, this function expects an array of promises, and returns an array of objects that has a status of “fulfilled” or “rejected”, and either the resolved value or the error that occurred.

function failingFunction() {  
  return new Promise((resolve, reject) => {  
    reject(new Error('This operation will surely fail!'))  
  })  
}function asyncMixedRunner () {  
    return Promise.allSettled(\[slowFunction(), failingFunction()\])  
}asyncMixedRunner()  
    .then((\[slowResult, failedResult\]) => {  
        console.log(slowResult, failedResult)  
    })

In previous node versions, where `.allSettled` is not available, we can implement our own version in just a few lines:

function homebrewAllSettled(promises) {  
  return Promise.all(promises.map((promise) => {  
    return promise  
      .then((value) => {  
        return { status: 'fulfilled', value }  
      })  
      .catch((error) => {  
        return { status: 'rejected', error }  
      })  
  }))  
}

To make sure your tasks run in a specific order — maybe successive functions need the return value of previous ones, or depend on the run of previous functions less directly — which is basically the same as `[_.flow](https://lodash.com/docs/#flow)` for functions that return a Promise. As long as it's missing from everyone's favorite utility library, you can easily create a chain from an array of your async functions:

function serial(asyncFunctions) {  
    return asyncFunctions.reduce(function(functionChain, nextFunction) {  
        return functionChain.then(  
            (previousResult) => nextFunction(previousResult)  
        );  
    }, Promise.resolve());  
}serial(\[parameterValidation, dbQuery, serviceCall \])  
   .then((result) => console.log(\`Operation result: ${result}\`))  
   .catch((error) => console.log(\`There has been an error: ${error}\`))

In case of a failure, this will skip all the remaining promises, and go straight to the error handling branch. You can tweak it some more in case you need the result of all of the promises regardless if they resolved or rejected.

function serial(asyncFunctions) {  
    return asyncFunctions.map(function(functionChain, nextFunction) {  
        return functionChain  
            .then((previousResult) => nextFunction(previousResult))  
            .then(result => ({ status: 'fulfilled', result }))  
            .catch(error => ({ status: 'rejected', error }));  
    }, Promise.resolve());  
}

Node also provides a handy utility function called “promisify”, that you can use to convert any old function expecting a callback that you just have to use into one that returns a promise. All you need to do is import it in your project:

const promisify = require('util').promisify;  
function slowCallbackFunction (done) {  
  setTimeout(function () {  
    done()  
  }, 300)  
}  
const slowPromise = promisify(slowCallbackFunction);slowPromise()  
  .then(() => {  
    console.log('Slow function resolved')  
  })  
  .catch((error) => {  
    console.error('There has been an error:', error)  
  })

It’s actually not that hard to implement a promisify function of our own, to learn more about how it works. We can even handle additional arguments that our wrapped functions might need!

function homebrewPromisify(originalFunction, originalArgs = \[\]) {  
  return new Promise((resolve, reject) => {  
    originalFunction(...originalArgs, (error, result) => {  
      if (error) return reject(error)  
      return resolve(result)  
    })  
  })  
}

We just wrap the original callback-based function in a promise, and then reject or resolve based on the result of the operation.

Easy as that!

For better support of callback based code — legacy code, ~50% of the npm modules — Node also includes a `callbackify` function, essentially the opposite of `promisify`, which takes an async function that returns a promise, and returns a function that expects a callback as its single argument.

const callbackify = require('util').callbackify  
const callbackSlow = callbackify(slowFunction)callbackSlow((error, result) => {  
  if (error) return console.log('Callback function received an error')  
  return console.log('Callback resolved without errors')  
})

We can use another javascript feature since node@7.6 to achieve the same thing: the async and await keywords. They allow you to structure your code in a way that is almost synchronous looking, saving us the `.then` chaining as well as callbacks:

const promisify = require('util').promisify;async function asyncRunner () {  
    try {  
      const slowResult = await promisify(slowFunction)()  
      const fastResult = await promisify(fastFunction)()  
      console.log('all done')  
      return \[  
        slowResult,  
        fastResult  
      \]  
    } catch (error) {  
      console.error(error)  
    }  
}

This is the same async runner we’ve created before, but it does not require us to wrap our code in `.then` calls to gain access to the results. For handling errors, we have the option to use try & catch blocks, as presented above, or use the same `.catch` calls that we've seen previously with promises. This is possible because async-await is an abstraction on top of promises - async functions always return a promise, even if you don't explicitly declare them to do so.

The await keyword can only be used inside functions that have the async tag. This also means that we cannot currently utilize it in the global scope.

Since Node 10, we also have access to the `promise.finally` method, which allows us to run code regardless of whether the promise resolve or rejected. It can be used to run tasks that we had to call in both the `.then` and `.catch` paths previously, saving us some code duplication.

As we have just learned several tools and tricks to handle async, it is time to do some practice with fundamental control flows to make our code more efficient and clean.

Let’s take an example and write a route `handler` for our web app, where the request can be resolved after 3 steps: `validateParams`, `dbQuery` and `serviceCall`.

If you’d like to write them without any helper, you’d most probably end up with something like this. Not so nice, right?

_// validateParams, dbQuery, serviceCall are higher-order functions_  
_// DONT_  
function handler (done) {  
  validateParams((err) => {  
    if (err) return done(err)  
    dbQuery((err, dbResults) => {  
      if (err) return done(err)  
      serviceCall((err, serviceResults) => {  
        done(err, { dbResults, serviceResults })  
      })  
    })  
  })  
}

Instead of the callback-hell, we can use promises to refactor our code, as we have already learned:

_// validateParams, dbQuery, serviceCall are higher-order functions_  
function handler () {  
  return validateParams()  
    .then(dbQuery)  
    .then(serviceCall)  
    .then((result) => {  
      console.log(result)  
      return result  
    })  
    .catch(console.log.bind(console))  
}

Let’s take it a step further! Rewrite it to use the async and await keywords:

_// validateParams, dbQuery, serviceCall are thunks_  
async function handler () {  
  try {  
    await validateParams()  
    const dbResults = await dbQuery()  
    const serviceResults = await serviceCall()  
    return { dbResults, serviceResults }  
  } catch (error) {  
    console.log(error)  
  }  
}

It feels like a “synchronous” code but still doing async operations one after each other.

Essentially, a new callback is injected into the functions, and this is how async knows when a function is finished.

Fortunately, Node.js eliminates the complexities of writing thread-safe code. You just have to stick to these rules to keep things smooth:

As a rule of thumb, prefer async, because using a non-blocking approach gives superior performance over the synchronous scenario, and the async — await keywords gives you more flexibility in structuring your code. Luckily, most libraries now have promise based APIs, so compatibility is rarely an issue, and can be solved with util.promisify should the need arise.

If you have any questions or suggestions for the article, please let me know in the comments!

In case you’re looking for help with [Node.js consulting or development](https://risingstack.com/nodejs-development-consulting-services), feel free to reach out to us! Our team of experienced engineers is ready to speed up your development process, or [educate your team on JavaScript, Node, React, Microservices and Kubernetes](https://risingstack.com/trainings).

In the next part of the Node.js at Scale series, we take a look at [Event Sourcing with Examples](https://blog.risingstack.com/event-sourcing-with-examples-node-js-at-scale/).

_This article was originally written by Tamas Hodi, and was released on 2017, January 17. The revised second edition was authored by Janos Kubisch and Tamas Hodi and it was released on 2020 February 10._


[Source](https://medium.com/the-node-js-collection/node-js-async-best-practices-avoiding-callback-hell-risingstack-cae115b85572)