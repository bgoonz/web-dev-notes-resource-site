# How the module system, CommonJS & require works | @RisingStack

> Learn how the Node.js module system & CommonJS works and what does `require` do under the hood.

In the third chapter of **Node.js at Scale** you are about to learn how the Node.js module system & CommonJS works and what does `require` do under the hood.

> With **Node.js at Scale** we are creating a collection of articles focusing on the needs of companies with bigger Node.js installations, and developers who already learned the basics of Node.

**Click to see all chapters of Node.js at Scale:**

CommonJS to the rescue
----------------------

The JavaScript language didn’t have a native way of organizing code before the ES2015 standard. Node.js filled this gap with the [**CommonJS**](http://requirejs.org/docs/commonjs.html) module format. In this article we will learn about how the Node.js module system works, how you can organize your modules and what does the new ES standard means for the future of Node.js.

What is the module system?
--------------------------

Modules are the fundamental building blocks of the code structure. The module system allows you to organize your code, hide information and only expose the public interface of a component using `module.exports`. Every time you use the `require` call, you are loading another module.

The simplest example can be the following using CommonJS:


    function add (a, b) {
      return a + b
    }

    module.exports = add


To use the `add` module we have just created, we have to require it.


    const add = require('./add')

    console.log(add(4, 5))



Under the hood, `add.js` is wrapped by Node.js this way:

    (function (exports, require, module, __filename, __dirname) {
      function add (a, b) {
        return a + b
      }

      module.exports = add
    })


This is why you can access the global-like variables like **require** and **module**. It also ensures that your variables are scoped to your module rather than the global object.

How does `require` work?
------------------------

The module loading mechanism in Node.js is caching the modules on the first `require` call. It means that every time you use `require('awesome-module')` you will get the same instance of `awesome-module`, which ensures that the modules are singleton-like and have the same state across your application.

You can load native modules and path references from your file system or installed modules. If the identifier passed to the `require` function is not a native module or a file reference (beginning with `/`, `../`, `./` or similar), then Node.js will look for installed modules. It will walk your file system looking for the referenced module in the `node_modules` folder. It starts from the parent directory of your current module and then moves to the parent directory until it finds the right module or until the root of the file system is reached.

### Require under the hood - `module.js`

The module dealing with module loading in the Node core is called `module.js`, and can be found in [lib/module.js](https://github.com/nodejs/node/blob/master/lib/module.js) in the Node.js repository.

The most important functions to check here are the `_load` and `_compile` functions.

### Module.\_load

This function checks whether the module is in the cache already - if so, it returns the exports object.

If the module is native, it calls the `NativeModule.require()` with the filename and returns the result.

Otherwise, it creates a new module for the file and saves it to the cache. Then it loads the file contents before returning its exports object.

### Module.\_compile

The compile function runs the file contents in the correct scope or sandbox, as well as exposes helper variables like `require`, `module` or `exports` to the file.

![How require works in Node.js](https://blog-assets.risingstack.com/2016/Okt/module-system/node-js-at-scale-how-require-works.png)
_How Require Works - From [James N. Snell](https://hackernoon.com/node-js-tc-39-and-modules-a1118aecf95e#.z1plueqbn)_

How to organize the code?
-------------------------

In our applications, we need to find the right balance of cohesion and coupling when creating modules. The desirable scenario is to achieve **high cohesion and loose coupling** of the modules.

A module must be focused only on a single part of the functionality to have high cohesion. Loose coupling means that the modules should not have a global or shared state. They should only communicate by passing parameters, and they are easily replaceable without touching your broader codebase.

We usually export **named functions** or **constants** in the following way:

    'use strict'

    const CONNECTION_LIMIT = 0

    function connect () {  }

    module.exports = {
      CONNECTION_LIMIT,
      connect
    }


What’s in your node\_modules?
-----------------------------

The `node_modules` folder is the place where Node.js looks for modules. **npm v2** and **npm v3** install your dependencies differently. You can find out what version of npm you are using by executing:

    npm --version


### npm v2

npm 2 installs all dependencies in a nested way, where your primary package dependencies are in their `node_modules` folder.

### npm v3

npm3 attempts to flatten these secondary dependencies and install them in the root `node_modules` folder. This means that you can’t tell by looking at your `node_modules` which packages are your explicit or implicit dependencies. It is also possible that the installation order changes your folder structure because npm 3 is non-deterministic in this manner.

You can make sure that your node\_modules directory is always the same by installing packages only from a `package.json`. In this case, it installs your dependencies in alphabetical order, which also means that you will get the same folder tree. This is important because the modules are cached using their path as the lookup key. Each package can have its own child `node_modules` folder, which might result in multiple instances of the same package and of the same module.

How to handle your modules?
---------------------------

There are two main ways for wiring modules. One of them is using hard coded dependencies, explicitly loading one module into another using a `require` call. The other method is to use a dependency injection pattern, where we pass the components as a parameter or we have a global container _(known as IoC, or Inversion of Control container)_, which centralizes the management of the modules.

We can allow Node.js to manage the modules life cycle by using hard coded module loading. It organizes your packages in an intuitive way, which makes understanding and debugging easy.

Dependency Injection is rarely used in a Node.js environment, although it is a useful concept. The DI pattern can result in an improved decoupling of the modules. Instead of explicitly defining dependencies for a module, they are received from the outside. Therefore they can be easily replaced with modules having the same interfaces.

Let’s see an example for DI modules using the factory pattern:

    class Car {
      constructor (options) {
        this.engine = options.engine
      }

      start () {
        this.engine.start()
      }
    }

    function create (options) {
      return new Car(options)
    }

    module.exports = create


The ES2015 module system
------------------------

As we saw above, the CommonJS module system uses a runtime evaluation of the modules, wrapping them into a function before the execution. The ES2015 modules don’t need to be wrapped since the `import`/`export` bindings are created before evaluating the module. This incompatibility is the reason that currently there are no JavaScript runtime supporting the ES modules. There was a lot of discussion about the topic and a [proposal](https://github.com/nodejs/node-eps/blob/master/002-es6-modules.md) is in `DRAFT` state, so hopefully we will have support for it in future Node versions.

To read an in-depth explanation of the biggest differences between CommonJS and the ESM, read the [following article](https://hackernoon.com/node-js-tc-39-and-modules-a1118aecf95e#.z1plueqbn) by James M Snell.

Next up
-------

I hope this article contained valuable information about the module system and how `require` works. If you have any questions or insights on the topic, please share them in the comments. In the next chapter of the Node.js at Scale series, we are going to take a deep dive and learn about the [event loop](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/node-js-at-scale-understanding-node-js-event-loop/).


[Source](https://blog.risingstack.com/node-js-at-scale-module-system-commonjs-require/)
