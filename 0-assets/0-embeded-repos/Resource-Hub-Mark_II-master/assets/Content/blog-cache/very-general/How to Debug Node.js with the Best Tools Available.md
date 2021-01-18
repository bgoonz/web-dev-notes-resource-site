# How to Debug Node.js with the Best Tools Available

> Let's take a look at the available options & tools to debug Node.js - the pino & debug modules, the built-in debugger, the v8 inspector & Visual Studio Code

**Debugging - the process of finding and fixing defects in software - can be a challenging task to do in all languages. Node.js is no exception.**

Luckily, the tooling for finding these issues improved a lot in the past period. Let's take a look at what options you have to find and fix bugs in your Node.js applications!

We will dive into two different aspects of debugging Node.js applications - the first one will be **logging, so you can keep an eye on production systems**, and have events from there. After logging, we will take a look at how you can **debug your applications in development environments**.

**Click to see all chapters of Node.js at Scale:**


Logging in Node.js
------------------

Logging takes place in the execution of your application **to provide an audit trail that can be used to understand the activity of the system and to diagnose problems** to find and fix bugs.

For logging purposes, you have lots of options when building Node.js applications. Some npm modules are shipped with built in logging that can be turned on when needed using the **[debug](https://www.npmjs.com/package/debug)** module. For your own applications, you have to pick a logger too! We will take a look at **[pino](https://www.npmjs.com/package/pino)**.

**Before jumping into logging libraries, let's take a look what requirements they have to fulfil:**

*   **timestamps** - it is crucial to know which event happened when,
*   **formatting** - log lines must be easily understandable by humans, and straightforward to parse for applications,
*   **log destination** - it should be always the standard output/error, applications should not concern themselves with log routing,
*   **log levels** - log events have different severity levels, in most cases, you won't be interested in debug or info level events.

The `debug` module of Node.js
-----------------------------

> _Recommendation: use for modules published on npm_

Let's see how it makes your life easier! Imagine that you have a Node.js module that sends serves requests, as well as send out some.


    const debugHttpIncoming = require('debug')('http:incoming')
    const debugHttpOutgoing = require('debug')('http:outgoing')

    let outgoingRequest = {
      url: 'https://risingstack.com'
    }


    debugHttpOutgoing('sending request to %s', outgoingRequest.url)

    let incomingRequest = {
      body: '{"status": "ok"}'
    }


    debugHttpOutgoing('got JSON body %s', incomingRequest.body)


Once you have it, start your application this way:

    DEBUG=http:incoming,http:outgoing node index.js


The output will be something like this:

![Output of Node.js Debugging](https://blog-assets.risingstack.com/2017/04/output-of-nodejs-debugging.png)

Also, the debug module supports wildcards with the `*` character. To get the same result we got previously, we simply could start our application with `DEBUG=http:* node index.js`.

**What's really nice about the debug module is that a lot of modules _(like Express or Koa)_ on npm are shipped with it - as of the time of writing this article more than 14.000 modules.**

The `pino` logger module
------------------------

> _Recommendation: use for your applications when performance is key_

![Pino logger module](https://blog-assets.risingstack.com/2017/04/pino.png)

**Pino is an extremely fast Node.js logger, inspired by [bunyan](https://www.npmjs.com/package/bunyan).** In many cases, **pino is over 6x faster than alternatives** like bunyan or winston:

    benchWinston*10000:     2226.117ms
    benchBunyan*10000:      1355.229ms
    benchDebug*10000:       445.291ms
    benchLogLevel*10000:    322.181ms
    benchBole*10000:        291.727ms
    benchPino*10000:        269.109ms
    benchPinoExtreme*10000: 102.239ms


Getting started with pino is straightforward:

    const pino = require('pino')()

    pino.info('hello pino')
    pino.info('the answer is %d', 42)
    pino.error(new Error('an error'))


The above snippet produces the following log lines:

    {"pid":28325,"hostname":"Gergelys-MacBook-Pro.local","level":30,"time":1492858757722,"msg":"hello pino","v":1}
    {"pid":28325,"hostname":"Gergelys-MacBook-Pro.local","level":30,"time":1492858757724,"msg":"the answer is 42","v":1}
    {"pid":28325,"hostname":"Gergelys-MacBook-Pro.local","level":50,"time":1492858757725,"msg":"an error","type":"Error","stack":"Error: an error\n    at Object.<anonymous> (/Users/gergelyke/Development/risingstack/node-js-at-scale-debugging/pino.js:5:12)\n    at Module._compile (module.js:570:32)\n    at Object.Module._extensions..js (module.js:579:10)\n    at Module.load (module.js:487:32)\n    at tryModuleLoad (module.js:446:12)\n    at Function.Module._load (module.js:438:3)\n    at Module.runMain (module.js:604:10)\n    at run (bootstrap_node.js:394:7)\n    at startup (bootstrap_node.js:149:9)\n    at bootstrap_node.js:509:3","v":1}


The Built-in Node.js Debugger module
------------------------------------

**Node.js ships with an out-of-process debugging utility, accessible via a TCP-based protocol and built-in debugging client.** You can start it using the following command:

    $ node debug index.js


This debugging agent is a not a fully featured debugging agent - you won't have a fancy user interface, however, simple inspections are possible.

You can add breakpoints to your code by adding the `debugger` statement into your codebase:

    const express = require('express')
    const app = express()

    app.get('/', (req, res) => {
      debugger
      res.send('ok')
    })


This way the execution of your script will be paused at that line, then you can start using the commands exposed by the debugging agent:

*   **cont** or **c** - continue execution,
*   **next** or **n** - step next,
*   **step** or **s** - step in,
*   **out** or **o** - step out,
*   **repl** - to evaluate script's context.



V8 Inspector Integration for Node.js
------------------------------------

**The V8 inspector integration allows attaching Chrome DevTools to Node.js instances for debugging by using the Chrome Debugging Protocol.**

V8 Inspector can be enabled by passing the `--inspect` flag when starting a Node.js application:

    $ node --inspect index.js


In most cases, it makes sense to stop the execution of the application at the very first line of your codebase and continue the execution from that. This way you won't miss any command execution.

    $ node --inspect-brk index.js




_I recommend watching this video in full-screen mode to get every detail!_

How to Debug Node.js with Visual Studio Code
--------------------------------------------

**Most modern IDEs have some support for debugging applications - so does VS Code. It has built-in debugging support for Node.js.**

What you can see below, is the debugging interface of VS Code - with the context variables, watched expressions, call stack and breakpoints.

![VS Code Debugging Layout](https://blog-assets.risingstack.com/2017/04/vs-code-debugging-layout.png)
_Image credit: Visual Studio Code_

One of the most valuable features of the integrated Visual Studio Code debugger is the ability to add **conditional breakpoints**. With conditional breakpoints, the breakpoint will be hit whenever the expression evaluates to true.



If you need more advanced settings for VS Code, it comes with a configuration file, `.vscode/launch.json` which describes how the debugger should be launched. The default `launch.json` looks something like this:

    {
        "version": "0.2.0",
        "configurations": [
            {
                "type": "node",
                "request": "launch",
                "name": "Launch Program",
                "program": "${workspaceRoot}/index.js"
            },
            {
                "type": "node",
                "request": "attach",
                "name": "Attach to Port",
                "address": "localhost",
                "port": 5858
            }
        ]
    }


For advanced configuration settings of `launch.json` go to [https://code.visualstudio.com/docs/editor/debugging#\_launchjson-attributes](https://code.visualstudio.com/docs/editor/debugging#_launchjson-attributes).

_For more information on debugging with Visual Studio Code, visit the official site: [https://code.visualstudio.com/docs/editor/debugging](https://code.visualstudio.com/docs/editor/debugging)._

Next Up
-------

If you have any questions about debugging, please let me know in the comments section.

**In the next episode of the Node.js at Scale series, we are going to talk about [Node.js Post-Mortem Diagnostics & Debugging](https://blog.risingstack.com/post-mortem-diagnostics-debugging-node-js-at-scale/).**


[Source](https://blog.risingstack.com/how-to-debug-nodej-js-with-the-best-tools-available/)
