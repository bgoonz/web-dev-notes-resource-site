# Understanding the Node.js Event Loop | @RisingStack

> This article helps you to understand how the Node.js event loop works, and how you can leverage it to build fast applications.

This article helps you to understand how the Node.js event loop works, and how you can leverage it to build fast applications. We’ll also discuss the most common problems you might encounter, and the solutions for them.

> With **Node.js at Scale** we are creating a collection of articles focusing on the needs of companies with bigger Node.js installations, and developers who already learned the basics of Node.

**Click to see all chapters of Node.js at Scale:**

The problem
-----------

Most of the backends behind websites don’t need to do complicated computations. Our programs spend most of their time waiting for the disk to read & write , or waiting for the wire to transmit our message and send back the answer.

IO operations can be orders of magnitude slower than data processing. Take this for example: SSD-s can have a read speed of 200-730 MB/s - at least a high-end one. Reading just one kilobyte of data would take 1.4 microseconds, but during this time a CPU clocked at 2GHz could have performed 28 000 of instruction-processing cycles.

For network communications it can be even worse, just try and ping google.com

    $ ping google.com
    64 bytes from 172.217.16.174: icmp_seq=0 ttl=52 time=33.017 ms
    64 bytes from 172.217.16.174: icmp_seq=1 ttl=52 time=83.376 ms
    64 bytes from 172.217.16.174: icmp_seq=2 ttl=52 time=26.552 ms
    64 bytes from 172.217.16.174: icmp_seq=3 ttl=52 time=40.153 ms
    64 bytes from 172.217.16.174: icmp_seq=4 ttl=52 time=37.291 ms
    64 bytes from 172.217.16.174: icmp_seq=5 ttl=52 time=58.692 ms
    64 bytes from 172.217.16.174: icmp_seq=6 ttl=52 time=45.245 ms
    64 bytes from 172.217.16.174: icmp_seq=7 ttl=52 time=27.846 ms
    

The average latency is about 44 milliseconds. Just while waiting for a packet to make a round-trip on the wire, the previously mentioned processor can perform 88 millions of cycles.

The solution
------------

Most operational systems provide some kind of an Asynchronous IO interface, which allows you to start processing data that does not require the result of the communication, meanwhile the communication still goes on..

This can be achieved in several ways. Nowadays it is mostly done by leveraging the possibilities of multithreading at the cost of extra software complexity. For example reading a file in Java or Python is a blocking operation. Your program cannot do anything else while it is waiting for the network / disk communication to finish. All you can do - at least in Java - is to fire up a different thread then notify your main thread when the operation has finished.

It is tedious, complicated, but gets the job done. But what about Node? Well, we are surely facing some problems as Node.js - or more like V8 - is single-threaded. Our code can only run in one thread.

_EDIT: This is not entirely true. Both Java and Python have async interfaces, but using them is definitely more difficult than in Node.js. Thanks to [Shahar](https://disqus.com/by/keidi19/) and [Dirk Harrington](https://twitter.com/dirkjharrington) for pointing this out._

You might have heard that in a browser, setting `setTimeout(someFunction, 0)` can sometimes fix things magically. But why does setting a timeout to 0, deferring execution by 0 milliseconds fix anything? Isn’t it the same as simply calling `someFunction` immediately? Not really.

First of all, let's take a look at the call stack, or simply, “stack”. I am going to make things simple, as we only need to understand the very basics of the call stack. In case you are familiar how it works, feel free to [jump to the next section](#event-loop).

Stack
-----

Whenever you call a functions return address, parameters and local variables will be pushed to the stack. If you call another function from the currently running function, its contents will be pushed on top in the same manner as the previous one - with its return address.

_For the sake of simplicity I will say that 'a function is pushed' to the top of the stack from now on, even though it is not exactly correct._

Let's take a look!

     1 function main () {
     2   const hypotenuse = getLengthOfHypotenuse(3, 4)
     3   console.log(hypotenuse)
     4 }
     5
     6 function getLengthOfHypotenuse(a, b) {
     7   const squareA = square(a)
     8   const squareB = square(b)
     9   const sumOfSquares = squareA + squareB
    10   return Math.sqrt(sumOfSquares)
    11 }
    12
    13 function square(number) {
    14   return number * number
    15 }
    16 
    17 main()
    

`main` is called first:

![The main function](https://blog-assets.risingstack.com/2016/10/the-main-function.png)

then main calls getLengthOfHypotenuse with 3 and 4 as arguments

![The getLengthOfHypotenuse function](https://blog-assets.risingstack.com/2016/10/The-getLengthOfHypotenuse-function.png)

afterwards square is with the value of `a`

![The square(a) function](https://blog-assets.risingstack.com/2016/10/The-square-a--function-1.png)

when square returns, it is popped from the stack, and its return value is assigned to `squareA`. squareA is added to the stack frame of `getLengthOfHypotenuse`

![Variable a](https://blog-assets.risingstack.com/2016/10/variable_a.png)

same goes for the next call to square

![The square(b) function](https://blog-assets.risingstack.com/2016/11/The-square-b-function-1-1.png)

![Variable b](https://blog-assets.risingstack.com/2016/10/variable_b.png)

in the next line the expression `squareA + squareB` is evaluated

![sumOfSquares](https://blog-assets.risingstack.com/2016/10/sumOfSqaures.png)

then Math.sqrt is called with sumOfSquares

![Math.sqrt](https://blog-assets.risingstack.com/2016/10/Math.sqrt.png)

now all is left for `getLengthOfHypotenuse` is to return the final value of its calculation

![The return function](https://blog-assets.risingstack.com/2016/10/The-return-function.png)

the returned value gets assigned to `hypotenuse` in `main`

![hypotenuse](https://blog-assets.risingstack.com/2016/10/hypotenuse.png)

the value of `hypotenuse` is logged to console

![The console log](https://blog-assets.risingstack.com/2016/10/console-log.png)

finally, `main` returns without any value, gets popped from the stack leaving it empty

![Finally](https://blog-assets.risingstack.com/2016/10/finally.png)

_SIDE NOTE: You saw that local variables are popped from the stack when the functions execution finishes. It happens only when you work with simple values such as numbers, strings and booleans. Values of objects, arrays and such are stored in the heap and your variable is merely a pointer to them. If you pass on this variable, you will only pass the said pointer, making these values mutable in different stack frames. When the function is popped from the stack, only the pointer to the Object gets popped with leaving the actual value in the heap. The garbage collector is the guy who takes care of freeing up space once the objects outlived their usefulness._

Enter Node.js Event Loop
------------------------

![The Node.js Event Loop - cat version](https://blog-assets.risingstack.com/2017/01/cat-node-js-event-loop-.gif)

No, not this loop. :)

So what happens when we call something like `setTimeout`, `http.get`, `process.nextTick`, or `fs.readFile`? Neither of these things can be found in V8's code, but they are available in the Chrome WebApi and the C++ API in case of Node.js. To understand this, we will have to understand the order of execution a little bit better.

Let's take a look at a more common Node.js application - a server listening on `localhost:3000/`. Upon getting a request, the server will call `wttr.in/<city>` to get the weather, print some kind messages to the console, and it forwards responses to the caller after recieving them.

    'use strict'
    const express = require('express')
    const superagent = require('superagent')
    const app = express()
    
    app.get('/', sendWeatherOfRandomCity)
    
    function sendWeatherOfRandomCity (request, response) {
      getWeatherOfRandomCity(request, response)
      sayHi()
    }
    
    const CITIES = [
      'london',
      'newyork',
      'paris',
      'budapest',
      'warsaw',
      'rome',
      'madrid',
      'moscow',
      'beijing',
      'capetown',
    ]
    
    function getWeatherOfRandomCity (request, response) {
      const city = CITIES[Math.floor(Math.random() * CITIES.length)]
      superagent.get(`wttr.in/${city}`)
        .end((err, res) => {
          if (err) {
            console.log('O snap')
            return response.status(500).send('There was an error getting the weather, try looking out the window')
          }
          const responseText = res.text
          response.send(responseText)
          console.log('Got the weather')
        })
    
      console.log('Fetching the weather, please be patient')
    }
    
    function sayHi () {
      console.log('Hi')
    }
    
    app.listen(3000)
    

What will be printed out aside from getting the weather when a request is sent to `localhost:3000`?

If you have some experience with Node, you shouldn't be surprised that even though `console.log('Fetching the weather, please be patient')` is called after `console.log('Got the weather')` in the code, the former will print first resulting in:

    Fetching the weather, please be patient
    Hi
    Got the weather
    

What happened? Even though V8 is single-threaded, the underlying C++ API of Node isn't. It means that whenever we call something that is a non-blocking operation, Node will call some code that will run concurrently with our javascript code under the hood. Once this hiding thread receives the value it awaits for or throws an error, the provided callback will be called with the necessary parameters.

_SIDE NOTE: The ‘some code’ we mentioned is actually part of [libuv](https://github.com/libuv/libuv). libuv is the open source library that handles the thread-pool, doing signaling and all other magic that is needed to make the asynchronous tasks work. It was originally developed for Node.js but a [lot of other projects](https://github.com/libuv/libuv/wiki/Projects-that-use-libuv) use of it by now._

> **Need help with enterprise-grade Node.js Development?**
> 
> [Hire the Node.js experts of RisingStack](https://risingstack.com/nodejs-development-consulting-services)!

To peek under the hood, we need to introduce two new concepts: the event loop and the task queue.

### Task queue

Javascript is a single-threaded, event-driven language. This means that we can attach listeners to events, and when a said event fires, the listener executes the callback we provided.

Whenever you call `setTimeout`, `http.get` or `fs.readFile`, Node.js sends these operations to a different thread allowing V8 to keep executing our code. Node also calls the callback when the counter has run down or the IO / http operation has finished.

These callbacks can enqueue other tasks and those functions can enqueue others and so on. This way you can read a file while processing a request in your server, and then make an http call based on the read contents without blocking other requests from being handled.

However, we only have one main thread and one call-stack, so in case there is another request being served when the said file is read, its callback will need to wait for the stack to become empty. The limbo where callbacks are waiting for their turn to be executed is called the task queue (or event queue, or message queue). Callbacks are being called in an infinite loop whenever the main thread has finished its previous task, hence the name 'event loop'.

In our previous example it would look something like this:

1.  express registers a handler for the 'request' event that will be called when request arrives to '/'
2.  skips the functions and starts listening on port 3000
3.  the stack is empty, waiting for 'request' event to fire
4.  upon incoming request, the long awaited event fires, express calls the provided handler `sendWeatherOfRandomCity`
5.  `sendWeatherOfRandomCity` is pushed to the stack
6.  `getWeatherOfRandomCity` is called and pushed to the stack
7.  `Math.floor` and `Math.random` are called, pushed to the stack and popped, a from `cities` is assigned to `city`
8.  `superagent.get` is called with `'wttr.in/${city}'`, the handler is set for the `end` event.
9.  the http request to `http://wttr.in/${city}` is send to a background thread, and the execution continues
10.  `'Fetching the weather, please be patient'` is logged to the console, `getWeatherOfRandomCity` returns
11.  `sayHi` is called, `'Hi'` is printed to the console
12.  `sendWeatherOfRandomCity` returns, gets popped from the stack leaving it empty
13.  waiting for `http://wttr.in/${city}` to send it's response
14.  once the response has arrived, the `end` event is fired.
15.  the `anonymous handler` we passed to `.end()` is called, gets pushed to the stack with all variables in its closure, meaning it can see and modify the values of `express, superagent, app, CITIES, request, response, city` and all the functions we have defined
16.  `response.send()` gets called either with `200` or `500` statusCode, but again it is sent to a background thread, so the response stream is not blocking our execution, `anonymous handler` is popped from the stack.

So now we can understand why the [previously mentioned](#timeout-hack) `setTimeout` hack works. Even though we set the counter to zero, it defers the execution until the current stack and the task queue is empty, allowing the browser to redraw the UI, or Node to serve other requests.

### Microtasks and Macrotasks

If this wasn't enough, we actually have more then one task queue. One for microtasks and another for macrotasks.

examples of microtasks:

*   `process.nextTick`
*   `promises`
*   `Object.observe`

examples of macrotasks:

*   `setTimeout`
*   `setInterval`
*   `setImmediate`
*   `I/O`

Let's take a look at the following code:

    console.log('script start')
    
    const interval = setInterval(() => {
      console.log('setInterval')
    }, 0)
    
    setTimeout(() => {
      console.log('setTimeout 1')
      Promise.resolve().then(() => {
        console.log('promise 3')
      }).then(() => {
        console.log('promise 4')
      }).then(() => {
        setTimeout(() => {
          console.log('setTimeout 2')
          Promise.resolve().then(() => {
            console.log('promise 5')
          }).then(() => {
            console.log('promise 6')
          }).then(() => {
            clearInterval(interval)
          })
        }, 0)
      })
    }, 0)
    
    Promise.resolve().then(() => {
      console.log('promise 1')
    }).then(() => {
      console.log('promise 2')
    })
    

this will log to the console:

    script start
    promise1
    promise2
    setInterval
    setTimeout1
    promise3
    promise4
    setInterval
    setTimeout2
    setInterval
    promise5
    promise6
    

According to the [WHATVG](https://html.spec.whatwg.org/multipage/webappapis.html#task-queue) specification, exactly one (macro)task should get processed from the macrotask queue in one cycle of the event loop. After said macrotask has finished, all of the available microtasks will be processed within the same cycle. While these microtasks are being processed, they can queue more microtasks, which will all be run one by one, until the microtask queue is exhausted.

This diagram tries to make the picture a bit clearer:

![The Node.js Event Loop](https://blog-assets.risingstack.com/2016/10/the-Node-js-event-loop.png)

In our case:

**Cycle 1:**

1.  \`setInterval\` is scheduled as task
2.  \`setTimeout 1\` is scheduled as task
3.  in \`Promise.resolve 1\` both \`then\`s are scheduled as microtasks
4.  the stack is empty, microtasks are run

Task queue: `setInterval`, `setTimeout 1`

**Cycle 2:**

5.  the microtask queue is empty, \`setInteval\`'s handler can be run, another \`setInterval\` is scheduled as a task, right behind \`setTimeout 1\`

Task queue: `setTimeout 1`, `setInterval`

**Cycle 3:**

6.  the microtask queue is empty, \`setTimeout 1\`'s handler can be run, \`promise 3\` and \`promise 4\` are scheduled as microtasks,
7.  handlers of \`promise 3\` and \`promise 4\` are run \`setTimeout 2\` is scheduled as task

Task queue: `setInterval`, `setTimeout 2`

**Cycle 4:**

8.  the microtask queue is empty, \`setInteval\`'s handler can be run, another \`setInterval\` is scheduled as a task, right behind \`setTimeout\`

Task queue: `setTimeout 2`, `setInteval`

9.  \`setTimeout 2\`'s handler run, \`promise 5\` and \`promise 6\` are scheduled as microtasks

Now handlers of `promise 5` and `promise 6` should be run clearing our interval, but for some strange reason `setInterval` is run again. However, if you run this code in Chrome, you will get the expected behavior.

We can fix this in Node too with process.nextTick and some mind-boggling callback hell.

    console.log('script start')
    
    const interval = setInterval(() => {
      console.log('setInterval')
    }, 0)
    
    setTimeout(() => {
      console.log('setTimeout 1')
      process.nextTick(() => {
        console.log('nextTick 3')
        process.nextTick(() => {
          console.log('nextTick 4')
          setTimeout(() => {
            console.log('setTimeout 2')
            process.nextTick(() => {
              console.log('nextTick 5')
              process.nextTick(() => {
                console.log('nextTick 6')
                clearInterval(interval)
              })
            })
          }, 0)
        })
      })
    })
    
    process.nextTick(() => {
      console.log('nextTick 1')
      process.nextTick(() => {
        console.log('nextTick 2')
      })
    })
    

This is the exact same logic as our beloved promises use, only a little bit more hideous. At least it gets the job done the way we expected.

### Tame the async beast!

As we saw, we need to manage and pay attention to both task queues, and to the event loop when we write an app in Node.js - in case we wish to leverage all its power, and if we want to keep our long running tasks from blocking the main thread.

The event loop might be a slippery concept to grasp at first, but once you get the hang of it, you won't be able to imagine that there is life without it. The continuation passing style that can lead to a callback hell might look ugly, but we have Promises, and soon we will have async-await in our hands... and while we are (a)waiting, you can simulate async-await using [co](https://github.com/tj/co) and/or [koa](http://koajs.com/).

**One last parting advice:**

Knowing how Node.js and V8 handles long running executions, you can start using it for your own good. You might have heard before that you should send your long running loops to the task queue. You can do it by hand or make use of [async.js](http://caolan.github.io/async/).

Happy coding!

If you have any questions or thoughts, share them in the comments, I’ll be there! The next part of the Node.js at Scale series is discussing the [Garbage Collection in Node.js](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/node-js-at-scale-node-js-garbage-collection/), I recommend to check it out!


[Source](https://blog.risingstack.com/node-js-at-scale-understanding-node-js-event-loop/)