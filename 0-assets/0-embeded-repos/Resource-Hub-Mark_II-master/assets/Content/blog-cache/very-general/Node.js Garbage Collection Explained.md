# Node.js Garbage Collection Explained | @RisingStack

> Learn how Node.js garbage collection and memory management works in practice. Code-level explanation and garbage collection examples inside.

In this article, you are going to learn how Node.js garbage collection works, what happens in the background when you write code and how memory is freed up for you.

![Ancient garbage collector in action](https://blog-assets.risingstack.com/2016/11/ancient-garbage-collector-in-action.jpg)

> With **Node.js at Scale** we are creating a collection of articles focusing on the needs of companies with bigger Node.js installations, and developers who already learned the basics of Node.

**Click to see all chapters of Node.js at Scale:**

Memory Management in Node.js Applications
-----------------------------------------

Every application needs memory to work properly. Memory management provides ways to dynamically allocate memory chunks for programs when they request it, and free them when they are no longer needed - so that they can be reused.

Application-level memory management can be manual or automatic. The automatic memory management usually involves a garbage collector.

The following code snippet shows how memory can be allocated in `C`, using manual memory management:

    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>
    
    int main() {
    
       char name[20];
       char *description;
    
       strcpy(name, "RisingStack");
    
       
       description = malloc( 30 * sizeof(char) );
    	
       if( description == NULL ) {
          fprintf(stderr, "Error - unable to allocate required memory\n");
       } else {
          strcpy( description, "Trace by RisingStack is an APM.");
       }
       
       printf("Company name = %s\n", name );
       printf("Description: %s\n", description );
    
       
       free(description);
    }
    

In **manual memory management**, it is the responsibility of the developer to free up the unused memory portions. Managing your memory this way can introduce several major bugs to your applications:

*   **Memory leaks** when the used memory space is never freed up.
*   **Wild/dangling pointers** appear when an object is deleted, but the pointer is reused. Serious security issues can be introduced when other data structures are overwritten or sensitive information is read.

**Luckily for you, Node.js comes with a garbage collector, and you don't need to manually manage memory allocation.**

The Concept of the Garbage Collector
------------------------------------

Garbage collection is a way of managing application memory automatically. The job of the garbage collector _(GC)_ is to reclaim memory occupied by unused objects _(garbage)_. It was first used in LISP in 1959, invented by John McCarthy.

The way how the GC knows that objects are no longer in use is that no other object has references to them.

**Memory before the garbage collection**

The following diagram shows how the memory can look like if you have objects with references to each other, and with some objects that have no reference to any objects. These are the objects that can be collected by a garbage collector run.

![Memory state before Node.js garbage collection](https://blog-assets.risingstack.com/2016/11/memory-state-before-node-js-garbage-collection.png)

**Memory after the garbage collection**

Once the garbage collector is run, the objects that are unreachable gets deleted, and the memory space is freed up.

![Memory state after Node.js garbage collection](https://blog-assets.risingstack.com/2016/11/memory-state-after-node-js-garbage-collection.png)

The Advantages of Using a Garbage Collector
-------------------------------------------

*   it prevents **wild/dangling pointers** bugs,
*   it won't try to free up space that was already freed up,
*   it will **protect** you **from** some types of **memory leaks**.

Of course, using a garbage collector doesn't solve all of your problems, and it’s not a silver bullet for memory management. Let's take a look at things that you should keep in mind!

#### Things to Keep in Mind When Using a Garbage Collector

*   **performance impact** - in order to decide what can be freed up, the GC consumes computing power
*   **unpredictable stalls** - modern GC implementations try to avoid "stop-the-world" collections

Node.js Garbage Collection & Memory Management in Practice
----------------------------------------------------------

The easiest way of learning is by doing - so I am going to show you what happens in the memory with different code snippets.

The Stack
---------

The stack contains local variables and pointers to objects on the heap or pointers defining the control flow of the application.

In the following example, both `a` and `b` will be placed on the stack.

    function add (a, b) {
      return a + b
    }
    
    add(4, 5)
    

> **Need help with enterprise-grade Node.js Development?**  
> [Hire a Node.js development team from RisingStack!](https://risingstack.com/nodejs-development-consulting-services)

The Heap
--------

The heap is dedicated to store reference type objects, like strings or objects.

The `Car` object created in the following snippet is placed on the heap.

    function Car (opts) {
      this.name = opts.name
    }
    
    const LightningMcQueen = new Car({name: 'Lightning McQueen'})
    

After this, the memory would look something like this:

![Node.js Garbage Collection First Step - Object Placed in the Memory Heap](https://blog-assets.risingstack.com/2016/11/node-js-garbage-collection-first-step-object-placed-in-memory-heap.png)

Let's add more cars, and see how our memory would look like!

    function Car (opts) {
      this.name = opts.name
    }
    
    const LightningMcQueen = new Car({name: 'Lightning McQueen'})
    const SallyCarrera = new Car({name: 'Sally Carrera'})
    const Mater = new Car({name: 'Mater'})
    

![Node.js Garbage Collection Second Step - More elements added to the heap](https://blog-assets.risingstack.com/2016/11/node-js-garbage-collection-second-step-more-elements-added-to-the-heap.png)

If the GC would run now, nothing could be freed up, as the root has a reference to every object.

Let's make it a little bit more interesting, and add some parts to our cars!

    function Engine (power) {
      this.power = power
    }
    
    function Car (opts) {
      this.name = opts.name
      this.engine = new Engine(opts.power)
    }
    
    let LightningMcQueen = new Car({name: 'Lightning McQueen', power: 900})
    let SallyCarrera = new Car({name: 'Sally Carrera', power: 500})
    let Mater = new Car({name: 'Mater', power: 100})
    

![Node.js Garbage Collection - Assigning values to the objects in the heap](https://blog-assets.risingstack.com/2016/11/node-js-garbage-collection-assigning-values-to-the-objects-in-heap.png)

What would happen, if we no longer use `Mater`, but redefine it and assign some other value, like `Mater = undefined`?

![Node.js Garbage Collection - Redefining values](https://blog-assets.risingstack.com/2016/11/node-js-garbage-collection-redefining-values.png)

As a result, the original `Mater` object cannot be reached from the root object, so on the next garbage collector run it will be freed up:

![Node.js Garbage Collection - Freeing up the unreachable object](https://blog-assets.risingstack.com/2016/11/node-js-garbage-collection-freeing-up-unreachable-object.png)

Now as we understand the basics of what's the expected behaviour of the garbage collector, let's take a look on how it is implemented in V8!

Garbage Collection Methods
--------------------------

In one of our previous articles we dealt with [how the Node.js garbage collection methods work](https://blog.risingstack.com/finding-a-memory-leak-in-node-js/), so I strongly recommend reading that article.

Here are the most important things you’ll learn there:

#### New Space and Old Space

The heap has two main segments, the New Space and the Old Space. The New Space is where new allocations are happening; it is fast to collect garbage here and has a size of ~1-8MBs. Objects living in the New Space are called Young Generation.

The Old Space where the objects that survived the collector in the New Space are promoted into - they are called the Old Generation. Allocation in the Old Space is fast, however collection is expensive so it is infrequently performed .

#### Young Generation

Usually, ~20% of the Young Generation survives into the Old Generation. Collection in the Old Space will only commence once it is getting exhausted. To do so the V8 engine uses two different collection algorithms.

#### Scavenge and Mark-Sweep collection

Scavenge collection is fast and runs on the Young Generation, however the slower Mark-Sweep collection runs on the Old Generation.

A Real-Life Example - The Meteor Case-Study
-------------------------------------------

In 2013, the creators of Meteor announced their findings about a memory leak they ran into. The problematic code snippet was the following:

    var theThing = null
    var replaceThing = function () {
      var originalThing = theThing
      var unused = function () {
        if (originalThing)
          console.log("hi")
      }
      theThing = {
        longStr: new Array(1000000).join('*'),
        someMethod: function () {
          console.log(someMessage)
        }
      };
    };
    setInterval(replaceThing, 1000)
    

> Well, the typical way that closures are implemented is that every function object has a link to a dictionary-style object representing its lexical scope. If both functions defined inside `replaceThing` actually used `originalThing`, it would be important that they both get the same object, even if `originalThing` gets assigned to over and over, so both functions share the same lexical environment. Now, Chrome's V8 JavaScript engine is apparently smart enough to keep variables out of the lexical environment if they aren't used by any closures - from the [Meteor blog](http://info.meteor.com/blog/an-interesting-kind-of-javascript-memory-leak).

#### Further reading:

*   [Finding a memory leak in Node.js](https://blog.risingstack.com/finding-a-memory-leak-in-node-js/)
*   [JavaScript Garbage Collection Improvements - Orinoco](https://blog.risingstack.com/javascript-garbage-collection-orinoco/)
*   [memorymanagement.org](http://www.memorymanagement.org/)

Next up
-------

In the next chapter of the Node.js at Scale tutorial series we will take a deep dive into [writing native Node.js module](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/writing-native-node-js-modules/).

In the meantime, let us know in the comments sections if you have any questions!


[Source](https://blog.risingstack.com/node-js-at-scale-node-js-garbage-collection/)