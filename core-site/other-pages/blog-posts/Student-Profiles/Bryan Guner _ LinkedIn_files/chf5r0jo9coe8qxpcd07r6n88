(function () {
  'use strict';

  var babelHelpers = {};

  babelHelpers.inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  babelHelpers.createClass = (function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();

  babelHelpers.slicedToArray = (function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  })();

  babelHelpers.get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  };

  babelHelpers.classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  /* eslint-disable @linkedin/pemberly/no-unguarded-globals */
  /* eslint-disable func-names */

  (function () {
    var CustomEvent = function CustomEvent(event, params) {
      var customEvtParams = params || {
        bubbles: false,
        cancelable: false,
        detail: undefined
      };
      var evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(event, customEvtParams.bubbles, customEvtParams.cancelable, customEvtParams.detail);
      return evt;
    };

    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      if (typeof window.CustomEvent === 'function') {
        return window.CustomEvent;
      }
      CustomEvent.prototype = window.Event.prototype;
      return CustomEvent;
    }

    // Return a NOOP for non-browser environments
    // eslint-disable-next-line func-names
    return function () {};
  })();

  /*!
   * @overview RSVP - a tiny implementation of Promises/A+.
   * @copyright Copyright (c) 2016 Yehuda Katz, Tom Dale, Stefan Penner and contributors
   * @license   Licensed under MIT license
   *            See https://raw.githubusercontent.com/tildeio/rsvp.js/master/LICENSE
   * @version   4.8.4+ff10049b
   */

  function callbacksFor(object) {
    var callbacks = object._promiseCallbacks;

    if (!callbacks) {
      callbacks = object._promiseCallbacks = {};
    }

    return callbacks;
  }

  /**
    @class EventTarget
    @for rsvp
    @public
  */
  var EventTarget = {

    /**
      `EventTarget.mixin` extends an object with EventTarget methods. For
      Example:
       ```javascript
      import EventTarget from 'rsvp';
       let object = {};
       EventTarget.mixin(object);
       object.on('finished', function(event) {
        // handle event
      });
       object.trigger('finished', { detail: value });
      ```
       `EventTarget.mixin` also works with prototypes:
       ```javascript
      import EventTarget from 'rsvp';
       let Person = function() {};
      EventTarget.mixin(Person.prototype);
       let yehuda = new Person();
      let tom = new Person();
       yehuda.on('poke', function(event) {
        console.log('Yehuda says OW');
      });
       tom.on('poke', function(event) {
        console.log('Tom says OW');
      });
       yehuda.trigger('poke');
      tom.trigger('poke');
      ```
       @method mixin
      @for rsvp
      @private
      @param {Object} object object to extend with EventTarget methods
    */
    mixin: function mixin(object) {
      object.on = this.on;
      object.off = this.off;
      object.trigger = this.trigger;
      object._promiseCallbacks = undefined;
      return object;
    },

    /**
      Registers a callback to be executed when `eventName` is triggered
       ```javascript
      object.on('event', function(eventInfo){
        // handle the event
      });
       object.trigger('event');
      ```
       @method on
      @for EventTarget
      @private
      @param {String} eventName name of the event to listen for
      @param {Function} callback function to be called when the event is triggered.
    */
    on: function on(eventName, callback) {
      if (typeof callback !== 'function') {
        throw new TypeError('Callback must be a function');
      }

      var allCallbacks = callbacksFor(this);
      var callbacks = allCallbacks[eventName];

      if (!callbacks) {
        callbacks = allCallbacks[eventName] = [];
      }

      if (callbacks.indexOf(callback) === -1) {
        callbacks.push(callback);
      }
    },

    /**
      You can use `off` to stop firing a particular callback for an event:
       ```javascript
      function doStuff() { // do stuff! }
      object.on('stuff', doStuff);
       object.trigger('stuff'); // doStuff will be called
       // Unregister ONLY the doStuff callback
      object.off('stuff', doStuff);
      object.trigger('stuff'); // doStuff will NOT be called
      ```
       If you don't pass a `callback` argument to `off`, ALL callbacks for the
      event will not be executed when the event fires. For example:
       ```javascript
      let callback1 = function(){};
      let callback2 = function(){};
       object.on('stuff', callback1);
      object.on('stuff', callback2);
       object.trigger('stuff'); // callback1 and callback2 will be executed.
       object.off('stuff');
      object.trigger('stuff'); // callback1 and callback2 will not be executed!
      ```
       @method off
      @for rsvp
      @private
      @param {String} eventName event to stop listening to
      @param {Function} [callback] optional argument. If given, only the function
      given will be removed from the event's callback queue. If no `callback`
      argument is given, all callbacks will be removed from the event's callback
      queue.
    */
    off: function off(eventName, callback) {
      var allCallbacks = callbacksFor(this);

      if (!callback) {
        allCallbacks[eventName] = [];
        return;
      }

      var callbacks = allCallbacks[eventName];
      var index = callbacks.indexOf(callback);

      if (index !== -1) {
        callbacks.splice(index, 1);
      }
    },

    /**
      Use `trigger` to fire custom events. For example:
       ```javascript
      object.on('foo', function(){
        console.log('foo event happened!');
      });
      object.trigger('foo');
      // 'foo event happened!' logged to the console
      ```
       You can also pass a value as a second argument to `trigger` that will be
      passed as an argument to all event listeners for the event:
       ```javascript
      object.on('foo', function(value){
        console.log(value.name);
      });
       object.trigger('foo', { name: 'bar' });
      // 'bar' logged to the console
      ```
       @method trigger
      @for rsvp
      @private
      @param {String} eventName name of the event to be triggered
      @param {*} [options] optional value to be passed to any event handlers for
      the given `eventName`
    */
    trigger: function trigger(eventName, options, label) {
      var allCallbacks = callbacksFor(this);

      var callbacks = allCallbacks[eventName];
      if (callbacks) {
        // Don't cache the callbacks.length since it may grow
        var callback = void 0;
        for (var i = 0; i < callbacks.length; i++) {
          callback = callbacks[i];
          callback(options, label);
        }
      }
    }
  };

  var config = {
    instrument: false
  };

  EventTarget['mixin'](config);

  function configure(name, value) {
    if (arguments.length === 2) {
      config[name] = value;
    } else {
      return config[name];
    }
  }

  var queue = [];

  function scheduleFlush() {
    setTimeout(function () {
      for (var i = 0; i < queue.length; i++) {
        var entry = queue[i];

        var payload = entry.payload;

        payload.guid = payload.key + payload.id;
        payload.childGuid = payload.key + payload.childId;
        if (payload.error) {
          payload.stack = payload.error.stack;
        }

        config['trigger'](entry.name, entry.payload);
      }
      queue.length = 0;
    }, 50);
  }

  function instrument(eventName, promise, child) {
    if (1 === queue.push({
      name: eventName,
      payload: {
        key: promise._guidKey,
        id: promise._id,
        eventName: eventName,
        detail: promise._result,
        childId: child && child._id,
        label: promise._label,
        timeStamp: Date.now(),
        error: config["instrument-with-stack"] ? new Error(promise._label) : null
      } })) {
      scheduleFlush();
    }
  }

  /**
    `Promise.resolve` returns a promise that will become resolved with the
    passed `value`. It is shorthand for the following:

    ```javascript
    import Promise from 'rsvp';

    let promise = new Promise(function(resolve, reject){
      resolve(1);
    });

    promise.then(function(value){
      // value === 1
    });
    ```

    Instead of writing the above, your code now simply becomes the following:

    ```javascript
    import Promise from 'rsvp';

    let promise = RSVP.Promise.resolve(1);

    promise.then(function(value){
      // value === 1
    });
    ```

    @method resolve
    @for Promise
    @static
    @param {*} object value that the returned promise will be resolved with
    @param {String} [label] optional string for identifying the returned promise.
    Useful for tooling.
    @return {Promise} a promise that will become fulfilled with the given
    `value`
  */
  function resolve$$1(object, label) {
    /*jshint validthis:true */
    var Constructor = this;

    if (object && typeof object === 'object' && object.constructor === Constructor) {
      return object;
    }

    var promise = new Constructor(noop, label);
    resolve$1(promise, object);
    return promise;
  }

  function withOwnPromise() {
    return new TypeError('A promises callback cannot return that same promise.');
  }

  function objectOrFunction(x) {
    var type = typeof x;
    return x !== null && (type === 'object' || type === 'function');
  }

  function noop() {}

  var PENDING = void 0;
  var FULFILLED = 1;
  var REJECTED = 2;

  var TRY_CATCH_ERROR = { error: null };

  function getThen(promise) {
    try {
      return promise.then;
    } catch (error) {
      TRY_CATCH_ERROR.error = error;
      return TRY_CATCH_ERROR;
    }
  }

  var tryCatchCallback = void 0;
  function tryCatcher() {
    try {
      var target = tryCatchCallback;
      tryCatchCallback = null;
      return target.apply(this, arguments);
    } catch (e) {
      TRY_CATCH_ERROR.error = e;
      return TRY_CATCH_ERROR;
    }
  }

  function tryCatch(fn) {
    tryCatchCallback = fn;
    return tryCatcher;
  }

  function handleForeignThenable(promise, thenable, then$$1) {
    config.async(function (promise) {
      var sealed = false;
      var result = tryCatch(then$$1).call(thenable, function (value) {
        if (sealed) {
          return;
        }
        sealed = true;
        if (thenable === value) {
          fulfill(promise, value);
        } else {
          resolve$1(promise, value);
        }
      }, function (reason) {
        if (sealed) {
          return;
        }
        sealed = true;

        reject(promise, reason);
      }, 'Settle: ' + (promise._label || ' unknown promise'));

      if (!sealed && result === TRY_CATCH_ERROR) {
        sealed = true;
        var error = TRY_CATCH_ERROR.error;
        TRY_CATCH_ERROR.error = null;
        reject(promise, error);
      }
    }, promise);
  }

  function handleOwnThenable(promise, thenable) {
    if (thenable._state === FULFILLED) {
      fulfill(promise, thenable._result);
    } else if (thenable._state === REJECTED) {
      thenable._onError = null;
      reject(promise, thenable._result);
    } else {
      subscribe(thenable, undefined, function (value) {
        if (thenable === value) {
          fulfill(promise, value);
        } else {
          resolve$1(promise, value);
        }
      }, function (reason) {
        return reject(promise, reason);
      });
    }
  }

  function handleMaybeThenable(promise, maybeThenable, then$$1) {
    var isOwnThenable = maybeThenable.constructor === promise.constructor && then$$1 === then && promise.constructor.resolve === resolve$$1;

    if (isOwnThenable) {
      handleOwnThenable(promise, maybeThenable);
    } else if (then$$1 === TRY_CATCH_ERROR) {
      var error = TRY_CATCH_ERROR.error;
      TRY_CATCH_ERROR.error = null;
      reject(promise, error);
    } else if (typeof then$$1 === 'function') {
      handleForeignThenable(promise, maybeThenable, then$$1);
    } else {
      fulfill(promise, maybeThenable);
    }
  }

  function resolve$1(promise, value) {
    if (promise === value) {
      fulfill(promise, value);
    } else if (objectOrFunction(value)) {
      handleMaybeThenable(promise, value, getThen(value));
    } else {
      fulfill(promise, value);
    }
  }

  function publishRejection(promise) {
    if (promise._onError) {
      promise._onError(promise._result);
    }

    publish(promise);
  }

  function fulfill(promise, value) {
    if (promise._state !== PENDING) {
      return;
    }

    promise._result = value;
    promise._state = FULFILLED;

    if (promise._subscribers.length === 0) {
      if (config.instrument) {
        instrument('fulfilled', promise);
      }
    } else {
      config.async(publish, promise);
    }
  }

  function reject(promise, reason) {
    if (promise._state !== PENDING) {
      return;
    }
    promise._state = REJECTED;
    promise._result = reason;
    config.async(publishRejection, promise);
  }

  function subscribe(parent, child, onFulfillment, onRejection) {
    var subscribers = parent._subscribers;
    var length = subscribers.length;

    parent._onError = null;

    subscribers[length] = child;
    subscribers[length + FULFILLED] = onFulfillment;
    subscribers[length + REJECTED] = onRejection;

    if (length === 0 && parent._state) {
      config.async(publish, parent);
    }
  }

  function publish(promise) {
    var subscribers = promise._subscribers;
    var settled = promise._state;

    if (config.instrument) {
      instrument(settled === FULFILLED ? 'fulfilled' : 'rejected', promise);
    }

    if (subscribers.length === 0) {
      return;
    }

    var child = void 0,
        callback = void 0,
        result = promise._result;

    for (var i = 0; i < subscribers.length; i += 3) {
      child = subscribers[i];
      callback = subscribers[i + settled];

      if (child) {
        invokeCallback(settled, child, callback, result);
      } else {
        callback(result);
      }
    }

    promise._subscribers.length = 0;
  }

  function invokeCallback(state, promise, callback, result) {
    var hasCallback = typeof callback === 'function';
    var value = void 0;

    if (hasCallback) {
      value = tryCatch(callback)(result);
    } else {
      value = result;
    }

    if (promise._state !== PENDING) {
      // noop
    } else if (value === promise) {
        reject(promise, withOwnPromise());
      } else if (value === TRY_CATCH_ERROR) {
        var error = TRY_CATCH_ERROR.error;
        TRY_CATCH_ERROR.error = null; // release
        reject(promise, error);
      } else if (hasCallback) {
        resolve$1(promise, value);
      } else if (state === FULFILLED) {
        fulfill(promise, value);
      } else if (state === REJECTED) {
        reject(promise, value);
      }
  }

  function initializePromise(promise, resolver) {
    var resolved = false;
    try {
      resolver(function (value) {
        if (resolved) {
          return;
        }
        resolved = true;
        resolve$1(promise, value);
      }, function (reason) {
        if (resolved) {
          return;
        }
        resolved = true;
        reject(promise, reason);
      });
    } catch (e) {
      reject(promise, e);
    }
  }

  function then(onFulfillment, onRejection, label) {
    var parent = this;
    var state = parent._state;

    if (state === FULFILLED && !onFulfillment || state === REJECTED && !onRejection) {
      config.instrument && instrument('chained', parent, parent);
      return parent;
    }

    parent._onError = null;

    var child = new parent.constructor(noop, label);
    var result = parent._result;

    config.instrument && instrument('chained', parent, child);

    if (state === PENDING) {
      subscribe(parent, child, onFulfillment, onRejection);
    } else {
      var callback = state === FULFILLED ? onFulfillment : onRejection;
      config.async(function () {
        return invokeCallback(state, child, callback, result);
      });
    }

    return child;
  }

  var Enumerator = (function () {
    function Enumerator(Constructor, input, abortOnReject, label) {
      this._instanceConstructor = Constructor;
      this.promise = new Constructor(noop, label);
      this._abortOnReject = abortOnReject;
      this._isUsingOwnPromise = Constructor === Promise;
      this._isUsingOwnResolve = Constructor.resolve === resolve$$1;

      this._init.apply(this, arguments);
    }

    Enumerator.prototype._init = function _init(Constructor, input) {
      var len = input.length || 0;
      this.length = len;
      this._remaining = len;
      this._result = new Array(len);

      this._enumerate(input);
    };

    Enumerator.prototype._enumerate = function _enumerate(input) {
      var length = this.length;
      var promise = this.promise;

      for (var i = 0; promise._state === PENDING && i < length; i++) {
        this._eachEntry(input[i], i, true);
      }
      this._checkFullfillment();
    };

    Enumerator.prototype._checkFullfillment = function _checkFullfillment() {
      if (this._remaining === 0) {
        var result = this._result;
        fulfill(this.promise, result);
        this._result = null;
      }
    };

    Enumerator.prototype._settleMaybeThenable = function _settleMaybeThenable(entry, i, firstPass) {
      var c = this._instanceConstructor;

      if (this._isUsingOwnResolve) {
        var then$$1 = getThen(entry);

        if (then$$1 === then && entry._state !== PENDING) {
          entry._onError = null;
          this._settledAt(entry._state, i, entry._result, firstPass);
        } else if (typeof then$$1 !== 'function') {
          this._settledAt(FULFILLED, i, entry, firstPass);
        } else if (this._isUsingOwnPromise) {
          var promise = new c(noop);
          handleMaybeThenable(promise, entry, then$$1);
          this._willSettleAt(promise, i, firstPass);
        } else {
          this._willSettleAt(new c(function (resolve) {
            return resolve(entry);
          }), i, firstPass);
        }
      } else {
        this._willSettleAt(c.resolve(entry), i, firstPass);
      }
    };

    Enumerator.prototype._eachEntry = function _eachEntry(entry, i, firstPass) {
      if (entry !== null && typeof entry === 'object') {
        this._settleMaybeThenable(entry, i, firstPass);
      } else {
        this._setResultAt(FULFILLED, i, entry, firstPass);
      }
    };

    Enumerator.prototype._settledAt = function _settledAt(state, i, value, firstPass) {
      var promise = this.promise;

      if (promise._state === PENDING) {
        if (this._abortOnReject && state === REJECTED) {
          reject(promise, value);
        } else {
          this._setResultAt(state, i, value, firstPass);
          this._checkFullfillment();
        }
      }
    };

    Enumerator.prototype._setResultAt = function _setResultAt(state, i, value, firstPass) {
      this._remaining--;
      this._result[i] = value;
    };

    Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i, firstPass) {
      var _this = this;

      subscribe(promise, undefined, function (value) {
        return _this._settledAt(FULFILLED, i, value, firstPass);
      }, function (reason) {
        return _this._settledAt(REJECTED, i, reason, firstPass);
      });
    };

    return Enumerator;
  })();

  function setSettledResult(state, i, value) {
    this._remaining--;
    if (state === FULFILLED) {
      this._result[i] = {
        state: 'fulfilled',
        value: value
      };
    } else {
      this._result[i] = {
        state: 'rejected',
        reason: value
      };
    }
  }

  /**
    `Promise.all` accepts an array of promises, and returns a new promise which
    is fulfilled with an array of fulfillment values for the passed promises, or
    rejected with the reason of the first passed promise to be rejected. It casts all
    elements of the passed iterable to promises as it runs this algorithm.

    Example:

    ```javascript
    import Promise, { resolve } from 'rsvp';

    let promise1 = resolve(1);
    let promise2 = resolve(2);
    let promise3 = resolve(3);
    let promises = [ promise1, promise2, promise3 ];

    Promise.all(promises).then(function(array){
      // The array here would be [ 1, 2, 3 ];
    });
    ```

    If any of the `promises` given to `RSVP.all` are rejected, the first promise
    that is rejected will be given as an argument to the returned promises's
    rejection handler. For example:

    Example:

    ```javascript
    import Promise, { resolve, reject } from 'rsvp';

    let promise1 = resolve(1);
    let promise2 = reject(new Error("2"));
    let promise3 = reject(new Error("3"));
    let promises = [ promise1, promise2, promise3 ];

    Promise.all(promises).then(function(array){
      // Code here never runs because there are rejected promises!
    }, function(error) {
      // error.message === "2"
    });
    ```

    @method all
    @for Promise
    @param {Array} entries array of promises
    @param {String} [label] optional string for labeling the promise.
    Useful for tooling.
    @return {Promise} promise that is fulfilled when all `promises` have been
    fulfilled, or rejected if any of them become rejected.
    @static
  */
  function all(entries, label) {
    if (!Array.isArray(entries)) {
      return this.reject(new TypeError("Promise.all must be called with an array"), label);
    }
    return new Enumerator(this, entries, true, /* abort on reject */label).promise;
  }

  /**
    `Promise.race` returns a new promise which is settled in the same way as the
    first passed promise to settle.

    Example:

    ```javascript
    import Promise from 'rsvp';

    let promise1 = new Promise(function(resolve, reject){
      setTimeout(function(){
        resolve('promise 1');
      }, 200);
    });

    let promise2 = new Promise(function(resolve, reject){
      setTimeout(function(){
        resolve('promise 2');
      }, 100);
    });

    Promise.race([promise1, promise2]).then(function(result){
      // result === 'promise 2' because it was resolved before promise1
      // was resolved.
    });
    ```

    `Promise.race` is deterministic in that only the state of the first
    settled promise matters. For example, even if other promises given to the
    `promises` array argument are resolved, but the first settled promise has
    become rejected before the other promises became fulfilled, the returned
    promise will become rejected:

    ```javascript
    import Promise from 'rsvp';

    let promise1 = new Promise(function(resolve, reject){
      setTimeout(function(){
        resolve('promise 1');
      }, 200);
    });

    let promise2 = new Promise(function(resolve, reject){
      setTimeout(function(){
        reject(new Error('promise 2'));
      }, 100);
    });

    Promise.race([promise1, promise2]).then(function(result){
      // Code here never runs
    }, function(reason){
      // reason.message === 'promise 2' because promise 2 became rejected before
      // promise 1 became fulfilled
    });
    ```

    An example real-world use case is implementing timeouts:

    ```javascript
    import Promise from 'rsvp';

    Promise.race([ajax('foo.json'), timeout(5000)])
    ```

    @method race
    @for Promise
    @static
    @param {Array} entries array of promises to observe
    @param {String} [label] optional string for describing the promise returned.
    Useful for tooling.
    @return {Promise} a promise which settles in the same way as the first passed
    promise to settle.
  */
  function race(entries, label) {
    /*jshint validthis:true */
    var Constructor = this;

    var promise = new Constructor(noop, label);

    if (!Array.isArray(entries)) {
      reject(promise, new TypeError('Promise.race must be called with an array'));
      return promise;
    }

    for (var i = 0; promise._state === PENDING && i < entries.length; i++) {
      subscribe(Constructor.resolve(entries[i]), undefined, function (value) {
        return resolve$1(promise, value);
      }, function (reason) {
        return reject(promise, reason);
      });
    }

    return promise;
  }

  /**
    `Promise.reject` returns a promise rejected with the passed `reason`.
    It is shorthand for the following:

    ```javascript
    import Promise from 'rsvp';

    let promise = new Promise(function(resolve, reject){
      reject(new Error('WHOOPS'));
    });

    promise.then(function(value){
      // Code here doesn't run because the promise is rejected!
    }, function(reason){
      // reason.message === 'WHOOPS'
    });
    ```

    Instead of writing the above, your code now simply becomes the following:

    ```javascript
    import Promise from 'rsvp';

    let promise = Promise.reject(new Error('WHOOPS'));

    promise.then(function(value){
      // Code here doesn't run because the promise is rejected!
    }, function(reason){
      // reason.message === 'WHOOPS'
    });
    ```

    @method reject
    @for Promise
    @static
    @param {*} reason value that the returned promise will be rejected with.
    @param {String} [label] optional string for identifying the returned promise.
    Useful for tooling.
    @return {Promise} a promise rejected with the given `reason`.
  */
  function reject$1(reason, label) {
    /*jshint validthis:true */
    var Constructor = this;
    var promise = new Constructor(noop, label);
    reject(promise, reason);
    return promise;
  }

  var guidKey = 'rsvp_' + Date.now() + '-';
  var counter = 0;

  function needsResolver() {
    throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
  }

  function needsNew() {
    throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
  }

  /**
    Promise objects represent the eventual result of an asynchronous operation. The
    primary way of interacting with a promise is through its `then` method, which
    registers callbacks to receive either a promise’s eventual value or the reason
    why the promise cannot be fulfilled.

    Terminology
    -----------

    - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
    - `thenable` is an object or function that defines a `then` method.
    - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
    - `exception` is a value that is thrown using the throw statement.
    - `reason` is a value that indicates why a promise was rejected.
    - `settled` the final resting state of a promise, fulfilled or rejected.

    A promise can be in one of three states: pending, fulfilled, or rejected.

    Promises that are fulfilled have a fulfillment value and are in the fulfilled
    state.  Promises that are rejected have a rejection reason and are in the
    rejected state.  A fulfillment value is never a thenable.

    Promises can also be said to *resolve* a value.  If this value is also a
    promise, then the original promise's settled state will match the value's
    settled state.  So a promise that *resolves* a promise that rejects will
    itself reject, and a promise that *resolves* a promise that fulfills will
    itself fulfill.


    Basic Usage:
    ------------

    ```js
    let promise = new Promise(function(resolve, reject) {
      // on success
      resolve(value);

      // on failure
      reject(reason);
    });

    promise.then(function(value) {
      // on fulfillment
    }, function(reason) {
      // on rejection
    });
    ```

    Advanced Usage:
    ---------------

    Promises shine when abstracting away asynchronous interactions such as
    `XMLHttpRequest`s.

    ```js
    function getJSON(url) {
      return new Promise(function(resolve, reject){
        let xhr = new XMLHttpRequest();

        xhr.open('GET', url);
        xhr.onreadystatechange = handler;
        xhr.responseType = 'json';
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.send();

        function handler() {
          if (this.readyState === this.DONE) {
            if (this.status === 200) {
              resolve(this.response);
            } else {
              reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
            }
          }
        };
      });
    }

    getJSON('/posts.json').then(function(json) {
      // on fulfillment
    }, function(reason) {
      // on rejection
    });
    ```

    Unlike callbacks, promises are great composable primitives.

    ```js
    Promise.all([
      getJSON('/posts'),
      getJSON('/comments')
    ]).then(function(values){
      values[0] // => postsJSON
      values[1] // => commentsJSON

      return values;
    });
    ```

    @class Promise
    @public
    @param {function} resolver
    @param {String} [label] optional string for labeling the promise.
    Useful for tooling.
    @constructor
  */

  var Promise = (function () {
    function Promise(resolver, label) {
      this._id = counter++;
      this._label = label;
      this._state = undefined;
      this._result = undefined;
      this._subscribers = [];

      config.instrument && instrument('created', this);

      if (noop !== resolver) {
        typeof resolver !== 'function' && needsResolver();
        this instanceof Promise ? initializePromise(this, resolver) : needsNew();
      }
    }

    Promise.prototype._onError = function _onError(reason) {
      var _this = this;

      config.after(function () {
        if (_this._onError) {
          config.trigger('error', reason, _this._label);
        }
      });
    };

    /**
      `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
      as the catch block of a try/catch statement.
    
      ```js
      function findAuthor(){
        throw new Error('couldn\'t find that author');
      }
    
      // synchronous
      try {
        findAuthor();
      } catch(reason) {
        // something went wrong
      }
    
      // async with promises
      findAuthor().catch(function(reason){
        // something went wrong
      });
      ```
    
      @method catch
      @param {Function} onRejection
      @param {String} [label] optional string for labeling the promise.
      Useful for tooling.
      @return {Promise}
    */

    Promise.prototype['catch'] = function _catch(onRejection, label) {
      return this.then(undefined, onRejection, label);
    };

    /**
      `finally` will be invoked regardless of the promise's fate just as native
      try/catch/finally behaves
    
      Synchronous example:
    
      ```js
      findAuthor() {
        if (Math.random() > 0.5) {
          throw new Error();
        }
        return new Author();
      }
    
      try {
        return findAuthor(); // succeed or fail
      } catch(error) {
        return findOtherAuthor();
      } finally {
        // always runs
        // doesn't affect the return value
      }
      ```
    
      Asynchronous example:
    
      ```js
      findAuthor().catch(function(reason){
        return findOtherAuthor();
      }).finally(function(){
        // author was either found, or not
      });
      ```
    
      @method finally
      @param {Function} callback
      @param {String} [label] optional string for labeling the promise.
      Useful for tooling.
      @return {Promise}
    */

    Promise.prototype['finally'] = function _finally(callback, label) {
      var promise = this;
      var constructor = promise.constructor;

      if (typeof callback === 'function') {
        return promise.then(function (value) {
          return constructor.resolve(callback()).then(function () {
            return value;
          });
        }, function (reason) {
          return constructor.resolve(callback()).then(function () {
            throw reason;
          });
        });
      }

      return promise.then(callback, callback);
    };

    return Promise;
  })();

  Promise.cast = resolve$$1; // deprecated
  Promise.all = all;
  Promise.race = race;
  Promise.resolve = resolve$$1;
  Promise.reject = reject$1;

  Promise.prototype._guidKey = guidKey;

  /**
    The primary way of interacting with a promise is through its `then` method,
    which registers callbacks to receive either a promise's eventual value or the
    reason why the promise cannot be fulfilled.

    ```js
    findUser().then(function(user){
      // user is available
    }, function(reason){
      // user is unavailable, and you are given the reason why
    });
    ```

    Chaining
    --------

    The return value of `then` is itself a promise.  This second, 'downstream'
    promise is resolved with the return value of the first promise's fulfillment
    or rejection handler, or rejected if the handler throws an exception.

    ```js
    findUser().then(function (user) {
      return user.name;
    }, function (reason) {
      return 'default name';
    }).then(function (userName) {
      // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
      // will be `'default name'`
    });

    findUser().then(function (user) {
      throw new Error('Found user, but still unhappy');
    }, function (reason) {
      throw new Error('`findUser` rejected and we\'re unhappy');
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
      // If `findUser` rejected, `reason` will be '`findUser` rejected and we\'re unhappy'.
    });
    ```
    If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.

    ```js
    findUser().then(function (user) {
      throw new PedagogicalException('Upstream error');
    }).then(function (value) {
      // never reached
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // The `PedgagocialException` is propagated all the way down to here
    });
    ```

    Assimilation
    ------------

    Sometimes the value you want to propagate to a downstream promise can only be
    retrieved asynchronously. This can be achieved by returning a promise in the
    fulfillment or rejection handler. The downstream promise will then be pending
    until the returned promise is settled. This is called *assimilation*.

    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // The user's comments are now available
    });
    ```

    If the assimliated promise rejects, then the downstream promise will also reject.

    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // If `findCommentsByAuthor` fulfills, we'll have the value here
    }, function (reason) {
      // If `findCommentsByAuthor` rejects, we'll have the reason here
    });
    ```

    Simple Example
    --------------

    Synchronous Example

    ```javascript
    let result;

    try {
      result = findResult();
      // success
    } catch(reason) {
      // failure
    }
    ```

    Errback Example

    ```js
    findResult(function(result, err){
      if (err) {
        // failure
      } else {
        // success
      }
    });
    ```

    Promise Example;

    ```javascript
    findResult().then(function(result){
      // success
    }, function(reason){
      // failure
    });
    ```

    Advanced Example
    --------------

    Synchronous Example

    ```javascript
    let author, books;

    try {
      author = findAuthor();
      books  = findBooksByAuthor(author);
      // success
    } catch(reason) {
      // failure
    }
    ```

    Errback Example

    ```js

    function foundBooks(books) {

    }

    function failure(reason) {

    }

    findAuthor(function(author, err){
      if (err) {
        failure(err);
        // failure
      } else {
        try {
          findBoooksByAuthor(author, function(books, err) {
            if (err) {
              failure(err);
            } else {
              try {
                foundBooks(books);
              } catch(reason) {
                failure(reason);
              }
            }
          });
        } catch(error) {
          failure(err);
        }
        // success
      }
    });
    ```

    Promise Example;

    ```javascript
    findAuthor().
      then(findBooksByAuthor).
      then(function(books){
        // found books
    }).catch(function(reason){
      // something went wrong
    });
    ```

    @method then
    @param {Function} onFulfillment
    @param {Function} onRejection
    @param {String} [label] optional string for labeling the promise.
    Useful for tooling.
    @return {Promise}
  */
  Promise.prototype.then = then;

  function makeObject(_, argumentNames) {
    var obj = {};
    var length = _.length;
    var args = new Array(length);

    for (var x = 0; x < length; x++) {
      args[x] = _[x];
    }

    for (var i = 0; i < argumentNames.length; i++) {
      var name = argumentNames[i];
      obj[name] = args[i + 1];
    }

    return obj;
  }

  function arrayResult(_) {
    var length = _.length;
    var args = new Array(length - 1);

    for (var i = 1; i < length; i++) {
      args[i - 1] = _[i];
    }

    return args;
  }

  function wrapThenable(_then, promise) {
    return {
      then: function then(onFulFillment, onRejection) {
        return _then.call(promise, onFulFillment, onRejection);
      }
    };
  }

  /**
    `denodeify` takes a 'node-style' function and returns a function that
    will return an `Promise`. You can use `denodeify` in Node.js or the
    browser when you'd prefer to use promises over using callbacks. For example,
    `denodeify` transforms the following:

    ```javascript
    let fs = require('fs');

    fs.readFile('myfile.txt', function(err, data){
      if (err) return handleError(err);
      handleData(data);
    });
    ```

    into:

    ```javascript
    let fs = require('fs');
    let readFile = denodeify(fs.readFile);

    readFile('myfile.txt').then(handleData, handleError);
    ```

    If the node function has multiple success parameters, then `denodeify`
    just returns the first one:

    ```javascript
    let request = denodeify(require('request'));

    request('http://example.com').then(function(res) {
      // ...
    });
    ```

    However, if you need all success parameters, setting `denodeify`'s
    second parameter to `true` causes it to return all success parameters
    as an array:

    ```javascript
    let request = denodeify(require('request'), true);

    request('http://example.com').then(function(result) {
      // result[0] -> res
      // result[1] -> body
    });
    ```

    Or if you pass it an array with names it returns the parameters as a hash:

    ```javascript
    let request = denodeify(require('request'), ['res', 'body']);

    request('http://example.com').then(function(result) {
      // result.res
      // result.body
    });
    ```

    Sometimes you need to retain the `this`:

    ```javascript
    let app = require('express')();
    let render = denodeify(app.render.bind(app));
    ```

    The denodified function inherits from the original function. It works in all
    environments, except IE 10 and below. Consequently all properties of the original
    function are available to you. However, any properties you change on the
    denodeified function won't be changed on the original function. Example:

    ```javascript
    let request = denodeify(require('request')),
        cookieJar = request.jar(); // <- Inheritance is used here

    request('http://example.com', {jar: cookieJar}).then(function(res) {
      // cookieJar.cookies holds now the cookies returned by example.com
    });
    ```

    Using `denodeify` makes it easier to compose asynchronous operations instead
    of using callbacks. For example, instead of:

    ```javascript
    let fs = require('fs');

    fs.readFile('myfile.txt', function(err, data){
      if (err) { ... } // Handle error
      fs.writeFile('myfile2.txt', data, function(err){
        if (err) { ... } // Handle error
        console.log('done')
      });
    });
    ```

    you can chain the operations together using `then` from the returned promise:

    ```javascript
    let fs = require('fs');
    let readFile = denodeify(fs.readFile);
    let writeFile = denodeify(fs.writeFile);

    readFile('myfile.txt').then(function(data){
      return writeFile('myfile2.txt', data);
    }).then(function(){
      console.log('done')
    }).catch(function(error){
      // Handle error
    });
    ```

    @method denodeify
    @public
    @static
    @for rsvp
    @param {Function} nodeFunc a 'node-style' function that takes a callback as
    its last argument. The callback expects an error to be passed as its first
    argument (if an error occurred, otherwise null), and the value from the
    operation as its second argument ('function(err, value){ }').
    @param {Boolean|Array} [options] An optional paramter that if set
    to `true` causes the promise to fulfill with the callback's success arguments
    as an array. This is useful if the node function has multiple success
    paramters. If you set this paramter to an array with names, the promise will
    fulfill with a hash with these names as keys and the success parameters as
    values.
    @return {Function} a function that wraps `nodeFunc` to return a `Promise`
  */
  function denodeify(nodeFunc, options) {
    var fn = function fn() {
      var l = arguments.length;
      var args = new Array(l + 1);
      var promiseInput = false;

      for (var i = 0; i < l; ++i) {
        var arg = arguments[i];

        if (!promiseInput) {
          // TODO: clean this up
          promiseInput = needsPromiseInput(arg);
          if (promiseInput === TRY_CATCH_ERROR) {
            var error = TRY_CATCH_ERROR.error;
            TRY_CATCH_ERROR.error = null;
            var p = new Promise(noop);
            reject(p, error);
            return p;
          } else if (promiseInput && promiseInput !== true) {
            arg = wrapThenable(promiseInput, arg);
          }
        }
        args[i] = arg;
      }

      var promise = new Promise(noop);

      args[l] = function (err, val) {
        if (err) {
          reject(promise, err);
        } else if (options === undefined) {
          resolve$1(promise, val);
        } else if (options === true) {
          resolve$1(promise, arrayResult(arguments));
        } else if (Array.isArray(options)) {
          resolve$1(promise, makeObject(arguments, options));
        } else {
          resolve$1(promise, val);
        }
      };

      if (promiseInput) {
        return handlePromiseInput(promise, args, nodeFunc, this);
      } else {
        return handleValueInput(promise, args, nodeFunc, this);
      }
    };

    fn.__proto__ = nodeFunc;

    return fn;
  }

  function handleValueInput(promise, args, nodeFunc, self) {
    var result = tryCatch(nodeFunc).apply(self, args);
    if (result === TRY_CATCH_ERROR) {
      var error = TRY_CATCH_ERROR.error;
      TRY_CATCH_ERROR.error = null;
      reject(promise, error);
    }
    return promise;
  }

  function handlePromiseInput(promise, args, nodeFunc, self) {
    return Promise.all(args).then(function (args) {
      return handleValueInput(promise, args, nodeFunc, self);
    });
  }

  function needsPromiseInput(arg) {
    if (arg !== null && typeof arg === 'object') {
      if (arg.constructor === Promise) {
        return true;
      } else {
        return getThen(arg);
      }
    } else {
      return false;
    }
  }

  /**
    This is a convenient alias for `Promise.all`.

    @method all
    @public
    @static
    @for rsvp
    @param {Array} array Array of promises.
    @param {String} [label] An optional label. This is useful
    for tooling.
  */
  function all$1(array, label) {
    return Promise.all(array, label);
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  /**
  @module rsvp
  @public
  **/

  var AllSettled = (function (_Enumerator) {
    _inherits(AllSettled, _Enumerator);

    function AllSettled(Constructor, entries, label) {
      return _possibleConstructorReturn(this, _Enumerator.call(this, Constructor, entries, false, /* don't abort on reject */label));
    }

    return AllSettled;
  })(Enumerator);

  AllSettled.prototype._setResultAt = setSettledResult;

  /**
  `RSVP.allSettled` is similar to `RSVP.all`, but instead of implementing
  a fail-fast method, it waits until all the promises have returned and
  shows you all the results. This is useful if you want to handle multiple
  promises' failure states together as a set.
   Returns a promise that is fulfilled when all the given promises have been
  settled. The return promise is fulfilled with an array of the states of
  the promises passed into the `promises` array argument.
   Each state object will either indicate fulfillment or rejection, and
  provide the corresponding value or reason. The states will take one of
  the following formats:
   ```javascript
  { state: 'fulfilled', value: value }
    or
  { state: 'rejected', reason: reason }
  ```
   Example:
   ```javascript
  let promise1 = RSVP.Promise.resolve(1);
  let promise2 = RSVP.Promise.reject(new Error('2'));
  let promise3 = RSVP.Promise.reject(new Error('3'));
  let promises = [ promise1, promise2, promise3 ];
   RSVP.allSettled(promises).then(function(array){
    // array == [
    //   { state: 'fulfilled', value: 1 },
    //   { state: 'rejected', reason: Error },
    //   { state: 'rejected', reason: Error }
    // ]
    // Note that for the second item, reason.message will be '2', and for the
    // third item, reason.message will be '3'.
  }, function(error) {
    // Not run. (This block would only be called if allSettled had failed,
    // for instance if passed an incorrect argument type.)
  });
  ```
   @method allSettled
  @public
  @static
  @for rsvp
  @param {Array} entries
  @param {String} [label] - optional string that describes the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled with an array of the settled
  states of the constituent promises.
  */

  function allSettled(entries, label) {
    if (!Array.isArray(entries)) {
      return Promise.reject(new TypeError("Promise.allSettled must be called with an array"), label);
    }

    return new AllSettled(Promise, entries, label).promise;
  }

  /**
    This is a convenient alias for `Promise.race`.

    @method race
    @public
    @static
    @for rsvp
    @param {Array} array Array of promises.
    @param {String} [label] An optional label. This is useful
    for tooling.
   */
  function race$1(array, label) {
    return Promise.race(array, label);
  }

  function _possibleConstructorReturn$1(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits$1(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var PromiseHash = (function (_Enumerator) {
    _inherits$1(PromiseHash, _Enumerator);

    function PromiseHash(Constructor, object) {
      var abortOnReject = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var label = arguments[3];
      return _possibleConstructorReturn$1(this, _Enumerator.call(this, Constructor, object, abortOnReject, label));
    }

    PromiseHash.prototype._init = function _init(Constructor, object) {
      this._result = {};
      this._enumerate(object);
    };

    PromiseHash.prototype._enumerate = function _enumerate(input) {
      var keys = Object.keys(input);

      var length = keys.length;
      var promise = this.promise;
      this._remaining = length;

      var key = void 0,
          val = void 0;
      for (var i = 0; promise._state === PENDING && i < length; i++) {
        key = keys[i];
        val = input[key];
        this._eachEntry(val, key, true);
      }

      this._checkFullfillment();
    };

    return PromiseHash;
  })(Enumerator);

  /**
    `hash` is similar to `all`, but takes an object instead of an array
    for its `promises` argument.

    Returns a promise that is fulfilled when all the given promises have been
    fulfilled, or rejected if any of them become rejected. The returned promise
    is fulfilled with a hash that has the same key names as the `promises` object
    argument. If any of the values in the object are not promises, they will
    simply be copied over to the fulfilled object.

    Example:

    ```javascript
    let promises = {
      myPromise: resolve(1),
      yourPromise: resolve(2),
      theirPromise: resolve(3),
      notAPromise: 4
    };

    hash(promises).then(function(hash){
      // hash here is an object that looks like:
      // {
      //   myPromise: 1,
      //   yourPromise: 2,
      //   theirPromise: 3,
      //   notAPromise: 4
      // }
    });
    ```

    If any of the `promises` given to `hash` are rejected, the first promise
    that is rejected will be given as the reason to the rejection handler.

    Example:

    ```javascript
    let promises = {
      myPromise: resolve(1),
      rejectedPromise: reject(new Error('rejectedPromise')),
      anotherRejectedPromise: reject(new Error('anotherRejectedPromise')),
    };

    hash(promises).then(function(hash){
      // Code here never runs because there are rejected promises!
    }, function(reason) {
      // reason.message === 'rejectedPromise'
    });
    ```

    An important note: `hash` is intended for plain JavaScript objects that
    are just a set of keys and values. `hash` will NOT preserve prototype
    chains.

    Example:

    ```javascript
    import { hash, resolve } from 'rsvp';
    function MyConstructor(){
      this.example = resolve('Example');
    }

    MyConstructor.prototype = {
      protoProperty: resolve('Proto Property')
    };

    let myObject = new MyConstructor();

    hash(myObject).then(function(hash){
      // protoProperty will not be present, instead you will just have an
      // object that looks like:
      // {
      //   example: 'Example'
      // }
      //
      // hash.hasOwnProperty('protoProperty'); // false
      // 'undefined' === typeof hash.protoProperty
    });
    ```

    @method hash
    @public
    @static
    @for rsvp
    @param {Object} object
    @param {String} [label] optional string that describes the promise.
    Useful for tooling.
    @return {Promise} promise that is fulfilled when all properties of `promises`
    have been fulfilled, or rejected if any of them become rejected.
  */
  function hash(object, label) {
    return Promise.resolve(object, label).then(function (object) {
      if (object === null || typeof object !== 'object') {
        throw new TypeError("Promise.hash must be called with an object");
      }
      return new PromiseHash(Promise, object, label).promise;
    });
  }

  function _possibleConstructorReturn$2(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits$2(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var HashSettled = (function (_PromiseHash) {
    _inherits$2(HashSettled, _PromiseHash);

    function HashSettled(Constructor, object, label) {
      return _possibleConstructorReturn$2(this, _PromiseHash.call(this, Constructor, object, false, label));
    }

    return HashSettled;
  })(PromiseHash);

  HashSettled.prototype._setResultAt = setSettledResult;

  /**
    `hashSettled` is similar to `allSettled`, but takes an object
    instead of an array for its `promises` argument.

    Unlike `all` or `hash`, which implement a fail-fast method,
    but like `allSettled`, `hashSettled` waits until all the
    constituent promises have returned and then shows you all the results
    with their states and values/reasons. This is useful if you want to
    handle multiple promises' failure states together as a set.

    Returns a promise that is fulfilled when all the given promises have been
    settled, or rejected if the passed parameters are invalid.

    The returned promise is fulfilled with a hash that has the same key names as
    the `promises` object argument. If any of the values in the object are not
    promises, they will be copied over to the fulfilled object and marked with state
    'fulfilled'.

    Example:

    ```javascript
    import { hashSettled, resolve } from 'rsvp';

    let promises = {
      myPromise: resolve(1),
      yourPromise: resolve(2),
      theirPromise: resolve(3),
      notAPromise: 4
    };

    hashSettled(promises).then(function(hash){
      // hash here is an object that looks like:
      // {
      //   myPromise: { state: 'fulfilled', value: 1 },
      //   yourPromise: { state: 'fulfilled', value: 2 },
      //   theirPromise: { state: 'fulfilled', value: 3 },
      //   notAPromise: { state: 'fulfilled', value: 4 }
      // }
    });
    ```

    If any of the `promises` given to `hash` are rejected, the state will
    be set to 'rejected' and the reason for rejection provided.

    Example:

    ```javascript
    import { hashSettled, reject, resolve } from 'rsvp';

    let promises = {
      myPromise: resolve(1),
      rejectedPromise: reject(new Error('rejection')),
      anotherRejectedPromise: reject(new Error('more rejection')),
    };

    hashSettled(promises).then(function(hash){
      // hash here is an object that looks like:
      // {
      //   myPromise:              { state: 'fulfilled', value: 1 },
      //   rejectedPromise:        { state: 'rejected', reason: Error },
      //   anotherRejectedPromise: { state: 'rejected', reason: Error },
      // }
      // Note that for rejectedPromise, reason.message == 'rejection',
      // and for anotherRejectedPromise, reason.message == 'more rejection'.
    });
    ```

    An important note: `hashSettled` is intended for plain JavaScript objects that
    are just a set of keys and values. `hashSettled` will NOT preserve prototype
    chains.

    Example:

    ```javascript
    import Promise, { hashSettled, resolve } from 'rsvp';

    function MyConstructor(){
      this.example = resolve('Example');
    }

    MyConstructor.prototype = {
      protoProperty: Promise.resolve('Proto Property')
    };

    let myObject = new MyConstructor();

    hashSettled(myObject).then(function(hash){
      // protoProperty will not be present, instead you will just have an
      // object that looks like:
      // {
      //   example: { state: 'fulfilled', value: 'Example' }
      // }
      //
      // hash.hasOwnProperty('protoProperty'); // false
      // 'undefined' === typeof hash.protoProperty
    });
    ```

    @method hashSettled
    @public
    @for rsvp
    @param {Object} object
    @param {String} [label] optional string that describes the promise.
    Useful for tooling.
    @return {Promise} promise that is fulfilled when when all properties of `promises`
    have been settled.
    @static
  */

  function hashSettled(object, label) {
    return Promise.resolve(object, label).then(function (object) {
      if (object === null || typeof object !== 'object') {
        throw new TypeError("hashSettled must be called with an object");
      }

      return new HashSettled(Promise, object, false, label).promise;
    });
  }

  /**
    `rethrow` will rethrow an error on the next turn of the JavaScript event
    loop in order to aid debugging.

    Promises A+ specifies that any exceptions that occur with a promise must be
    caught by the promises implementation and bubbled to the last handler. For
    this reason, it is recommended that you always specify a second rejection
    handler function to `then`. However, `rethrow` will throw the exception
    outside of the promise, so it bubbles up to your console if in the browser,
    or domain/cause uncaught exception in Node. `rethrow` will also throw the
    error again so the error can be handled by the promise per the spec.

    ```javascript
    import { rethrow } from 'rsvp';

    function throws(){
      throw new Error('Whoops!');
    }

    let promise = new Promise(function(resolve, reject){
      throws();
    });

    promise.catch(rethrow).then(function(){
      // Code here doesn't run because the promise became rejected due to an
      // error!
    }, function (err){
      // handle the error here
    });
    ```

    The 'Whoops' error will be thrown on the next turn of the event loop
    and you can watch for it in your console. You can also handle it using a
    rejection handler given to `.then` or `.catch` on the returned promise.

    @method rethrow
    @public
    @static
    @for rsvp
    @param {Error} reason reason the promise became rejected.
    @throws Error
    @static
  */
  function rethrow(reason) {
    setTimeout(function () {
      throw reason;
    });
    throw reason;
  }

  /**
    `defer` returns an object similar to jQuery's `$.Deferred`.
    `defer` should be used when porting over code reliant on `$.Deferred`'s
    interface. New code should use the `Promise` constructor instead.

    The object returned from `defer` is a plain object with three properties:

    * promise - an `Promise`.
    * reject - a function that causes the `promise` property on this object to
      become rejected
    * resolve - a function that causes the `promise` property on this object to
      become fulfilled.

    Example:

     ```javascript
     let deferred = defer();

     deferred.resolve("Success!");

     deferred.promise.then(function(value){
       // value here is "Success!"
     });
     ```

    @method defer
    @public
    @static
    @for rsvp
    @param {String} [label] optional string for labeling the promise.
    Useful for tooling.
    @return {Object}
   */

  function defer(label) {
    var deferred = { resolve: undefined, reject: undefined };

    deferred.promise = new Promise(function (resolve, reject) {
      deferred.resolve = resolve;
      deferred.reject = reject;
    }, label);

    return deferred;
  }

  function _possibleConstructorReturn$3(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits$3(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var MapEnumerator = (function (_Enumerator) {
    _inherits$3(MapEnumerator, _Enumerator);

    function MapEnumerator(Constructor, entries, mapFn, label) {
      return _possibleConstructorReturn$3(this, _Enumerator.call(this, Constructor, entries, true, label, mapFn));
    }

    MapEnumerator.prototype._init = function _init(Constructor, input, bool, label, mapFn) {
      var len = input.length || 0;
      this.length = len;
      this._remaining = len;
      this._result = new Array(len);
      this._mapFn = mapFn;

      this._enumerate(input);
    };

    MapEnumerator.prototype._setResultAt = function _setResultAt(state, i, value, firstPass) {
      if (firstPass) {
        var val = tryCatch(this._mapFn)(value, i);
        if (val === TRY_CATCH_ERROR) {
          this._settledAt(REJECTED, i, val.error, false);
        } else {
          this._eachEntry(val, i, false);
        }
      } else {
        this._remaining--;
        this._result[i] = value;
      }
    };

    return MapEnumerator;
  })(Enumerator);

  /**
   `map` is similar to JavaScript's native `map` method. `mapFn` is eagerly called
    meaning that as soon as any promise resolves its value will be passed to `mapFn`.
    `map` returns a promise that will become fulfilled with the result of running
    `mapFn` on the values the promises become fulfilled with.

    For example:

    ```javascript
    import { map, resolve } from 'rsvp';

    let promise1 = resolve(1);
    let promise2 = resolve(2);
    let promise3 = resolve(3);
    let promises = [ promise1, promise2, promise3 ];

    let mapFn = function(item){
      return item + 1;
    };

    map(promises, mapFn).then(function(result){
      // result is [ 2, 3, 4 ]
    });
    ```

    If any of the `promises` given to `map` are rejected, the first promise
    that is rejected will be given as an argument to the returned promise's
    rejection handler. For example:

    ```javascript
    import { map, reject, resolve } from 'rsvp';

    let promise1 = resolve(1);
    let promise2 = reject(new Error('2'));
    let promise3 = reject(new Error('3'));
    let promises = [ promise1, promise2, promise3 ];

    let mapFn = function(item){
      return item + 1;
    };

    map(promises, mapFn).then(function(array){
      // Code here never runs because there are rejected promises!
    }, function(reason) {
      // reason.message === '2'
    });
    ```

    `map` will also wait if a promise is returned from `mapFn`. For example,
    say you want to get all comments from a set of blog posts, but you need
    the blog posts first because they contain a url to those comments.

    ```javscript
    import { map } from 'rsvp';

    let mapFn = function(blogPost){
      // getComments does some ajax and returns an Promise that is fulfilled
      // with some comments data
      return getComments(blogPost.comments_url);
    };

    // getBlogPosts does some ajax and returns an Promise that is fulfilled
    // with some blog post data
    map(getBlogPosts(), mapFn).then(function(comments){
      // comments is the result of asking the server for the comments
      // of all blog posts returned from getBlogPosts()
    });
    ```

    @method map
    @public
    @static
    @for rsvp
    @param {Array} promises
    @param {Function} mapFn function to be called on each fulfilled promise.
    @param {String} [label] optional string for labeling the promise.
    Useful for tooling.
    @return {Promise} promise that is fulfilled with the result of calling
    `mapFn` on each fulfilled promise or value when they become fulfilled.
     The promise will be rejected if any of the given `promises` become rejected.
  */
  function map(promises, mapFn, label) {
    if (typeof mapFn !== 'function') {
      return Promise.reject(new TypeError("map expects a function as a second argument"), label);
    }

    return Promise.resolve(promises, label).then(function (promises) {
      if (!Array.isArray(promises)) {
        throw new TypeError("map must be called with an array");
      }
      return new MapEnumerator(Promise, promises, mapFn, label).promise;
    });
  }

  /**
    This is a convenient alias for `Promise.resolve`.

    @method resolve
    @public
    @static
    @for rsvp
    @param {*} value value that the returned promise will be resolved with
    @param {String} [label] optional string for identifying the returned promise.
    Useful for tooling.
    @return {Promise} a promise that will become fulfilled with the given
    `value`
  */
  function resolve$2(value, label) {
    return Promise.resolve(value, label);
  }

  /**
    This is a convenient alias for `Promise.reject`.

    @method reject
    @public
    @static
    @for rsvp
    @param {*} reason value that the returned promise will be rejected with.
    @param {String} [label] optional string for identifying the returned promise.
    Useful for tooling.
    @return {Promise} a promise rejected with the given `reason`.
  */
  function reject$2(reason, label) {
    return Promise.reject(reason, label);
  }

  function _possibleConstructorReturn$4(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits$4(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var EMPTY_OBJECT = {};

  var FilterEnumerator = (function (_MapEnumerator) {
    _inherits$4(FilterEnumerator, _MapEnumerator);

    function FilterEnumerator() {
      return _possibleConstructorReturn$4(this, _MapEnumerator.apply(this, arguments));
    }

    FilterEnumerator.prototype._checkFullfillment = function _checkFullfillment() {
      if (this._remaining === 0 && this._result !== null) {
        var result = this._result.filter(function (val) {
          return val !== EMPTY_OBJECT;
        });
        fulfill(this.promise, result);
        this._result = null;
      }
    };

    FilterEnumerator.prototype._setResultAt = function _setResultAt(state, i, value, firstPass) {
      if (firstPass) {
        this._result[i] = value;
        var val = tryCatch(this._mapFn)(value, i);
        if (val === TRY_CATCH_ERROR) {
          this._settledAt(REJECTED, i, val.error, false);
        } else {
          this._eachEntry(val, i, false);
        }
      } else {
        this._remaining--;
        if (!value) {
          this._result[i] = EMPTY_OBJECT;
        }
      }
    };

    return FilterEnumerator;
  })(MapEnumerator);

  /**
   `filter` is similar to JavaScript's native `filter` method.
   `filterFn` is eagerly called meaning that as soon as any promise
    resolves its value will be passed to `filterFn`. `filter` returns
    a promise that will become fulfilled with the result of running
    `filterFn` on the values the promises become fulfilled with.

    For example:

    ```javascript
    import { filter, resolve } from 'rsvp';

    let promise1 = resolve(1);
    let promise2 = resolve(2);
    let promise3 = resolve(3);

    let promises = [promise1, promise2, promise3];

    let filterFn = function(item){
      return item > 1;
    };

    filter(promises, filterFn).then(function(result){
      // result is [ 2, 3 ]
    });
    ```

    If any of the `promises` given to `filter` are rejected, the first promise
    that is rejected will be given as an argument to the returned promise's
    rejection handler. For example:

    ```javascript
    import { filter, reject, resolve } from 'rsvp';

    let promise1 = resolve(1);
    let promise2 = reject(new Error('2'));
    let promise3 = reject(new Error('3'));
    let promises = [ promise1, promise2, promise3 ];

    let filterFn = function(item){
      return item > 1;
    };

    filter(promises, filterFn).then(function(array){
      // Code here never runs because there are rejected promises!
    }, function(reason) {
      // reason.message === '2'
    });
    ```

    `filter` will also wait for any promises returned from `filterFn`.
    For instance, you may want to fetch a list of users then return a subset
    of those users based on some asynchronous operation:

    ```javascript
    import { filter, resolve } from 'rsvp';

    let alice = { name: 'alice' };
    let bob   = { name: 'bob' };
    let users = [ alice, bob ];

    let promises = users.map(function(user){
      return resolve(user);
    });

    let filterFn = function(user){
      // Here, Alice has permissions to create a blog post, but Bob does not.
      return getPrivilegesForUser(user).then(function(privs){
        return privs.can_create_blog_post === true;
      });
    };
    filter(promises, filterFn).then(function(users){
      // true, because the server told us only Alice can create a blog post.
      users.length === 1;
      // false, because Alice is the only user present in `users`
      users[0] === bob;
    });
    ```

    @method filter
    @public
    @static
    @for rsvp
    @param {Array} promises
    @param {Function} filterFn - function to be called on each resolved value to
    filter the final results.
    @param {String} [label] optional string describing the promise. Useful for
    tooling.
    @return {Promise}
  */

  function filter(promises, filterFn, label) {
    if (typeof filterFn !== 'function') {
      return Promise.reject(new TypeError("filter expects function as a second argument"), label);
    }

    return Promise.resolve(promises, label).then(function (promises) {
      if (!Array.isArray(promises)) {
        throw new TypeError("filter must be called with an array");
      }
      return new FilterEnumerator(Promise, promises, filterFn, label).promise;
    });
  }

  var len = 0;
  var vertxNext = void 0;
  function asap(callback, arg) {
    queue$1[len] = callback;
    queue$1[len + 1] = arg;
    len += 2;
    if (len === 2) {
      // If len is 1, that means that we need to schedule an async flush.
      // If additional callbacks are queued before the queue is flushed, they
      // will be processed by this flush that we are scheduling.
      scheduleFlush$1();
    }
  }

  var browserWindow = typeof window !== 'undefined' ? window : undefined;
  var browserGlobal = browserWindow || {};
  var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
  var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && ({}).toString.call(process) === '[object process]';

  // test for web worker but not in IE10
  var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

  // node
  function useNextTick() {
    var nextTick = process.nextTick;
    // node version 0.10.x displays a deprecation warning when nextTick is used recursively
    // setImmediate should be used instead instead
    var version = process.versions.node.match(/^(?:(\d+)\.)?(?:(\d+)\.)?(\*|\d+)$/);
    if (Array.isArray(version) && version[1] === '0' && version[2] === '10') {
      nextTick = setImmediate;
    }
    return function () {
      return nextTick(flush);
    };
  }

  // vertx
  function useVertxTimer() {
    if (typeof vertxNext !== 'undefined') {
      return function () {
        vertxNext(flush);
      };
    }
    return useSetTimeout();
  }

  function useMutationObserver() {
    var iterations = 0;
    var observer = new BrowserMutationObserver(flush);
    var node = document.createTextNode('');
    observer.observe(node, { characterData: true });

    return function () {
      return node.data = iterations = ++iterations % 2;
    };
  }

  // web worker
  function useMessageChannel() {
    var channel = new MessageChannel();
    channel.port1.onmessage = flush;
    return function () {
      return channel.port2.postMessage(0);
    };
  }

  function useSetTimeout() {
    return function () {
      return setTimeout(flush, 1);
    };
  }

  var queue$1 = new Array(1000);

  function flush() {
    for (var i = 0; i < len; i += 2) {
      var callback = queue$1[i];
      var arg = queue$1[i + 1];

      callback(arg);

      queue$1[i] = undefined;
      queue$1[i + 1] = undefined;
    }

    len = 0;
  }

  function attemptVertex() {
    try {
      var vertx = Function('return this')().require('vertx');
      vertxNext = vertx.runOnLoop || vertx.runOnContext;
      return useVertxTimer();
    } catch (e) {
      return useSetTimeout();
    }
  }

  var scheduleFlush$1 = void 0;
  // Decide what async method to use to triggering processing of queued callbacks:
  if (isNode) {
    scheduleFlush$1 = useNextTick();
  } else if (BrowserMutationObserver) {
    scheduleFlush$1 = useMutationObserver();
  } else if (isWorker) {
    scheduleFlush$1 = useMessageChannel();
  } else if (browserWindow === undefined && typeof require === 'function') {
    scheduleFlush$1 = attemptVertex();
  } else {
    scheduleFlush$1 = useSetTimeout();
  }

  // defaults
  config.async = asap;
  config.after = function (cb) {
    return setTimeout(cb, 0);
  };
  var cast = resolve$2;

  var async = function async(callback, arg) {
    return config.async(callback, arg);
  };

  function on() {
    config.on.apply(config, arguments);
  }

  function off() {
    config.off.apply(config, arguments);
  }

  // Set up instrumentation through `window.__PROMISE_INTRUMENTATION__`
  if (typeof window !== 'undefined' && typeof window['__PROMISE_INSTRUMENTATION__'] === 'object') {
    var callbacks = window['__PROMISE_INSTRUMENTATION__'];
    configure('instrument', true);
    for (var eventName in callbacks) {
      if (callbacks.hasOwnProperty(eventName)) {
        on(eventName, callbacks[eventName]);
      }
    }
  }

  // the default export here is for backwards compat:
  //   https://github.com/tildeio/rsvp.js/issues/434
  var rsvp = {
    asap: asap,
    cast: cast,
    Promise: Promise,
    EventTarget: EventTarget,
    all: all$1,
    allSettled: allSettled,
    race: race$1,
    hash: hash,
    hashSettled: hashSettled,
    rethrow: rethrow,
    defer: defer,
    denodeify: denodeify,
    configure: configure,
    on: on,
    off: off,
    resolve: resolve$2,
    reject: reject$2,
    map: map,
    async: async,
    filter: filter
  };

  var iconSuffix = '-icon';

  var mediumAppIcons = {
    'influencer-bug': 1,
    'influencer-bug-black': 1,
    'linkedin-bug': 1,
    'linkedin-bug-black': 1,
    jobs: 1,
    pointdrive: 1,
    'talent-insights': 1,
    'premium-bug': 1,
    'premium-bug-gold': 1,
    'premium-bug-inverse': 1
  };

  var scalingSizeMap = {
    '8dp': 'xxxsmall',
    '16dp': 'small',
    '24dp': 'large',
    '32dp': 'xlarge',
    '14dp': 'xxsmall',
    '21dp': 'xsmall',
    '28dp': 'small',
    '34dp': 'medium',
    '40dp': 'large',
    '48dp': 'xlarge',
    small: 'small',
    large: 'large'
  };

  var smallUIIcons = {
    'check-xsmall': 1,
    'lightning-bolt': 1,
    openlink: 1,
    'verified-badge': 1
  };

  function handleSize(size, iconName) {
    if (size === undefined) size = 'large';

    var availableSizes = { small: 1, large: 1 };
    return availableSizes[size] ? iconName + '-' + size : iconName + '-large';
  }

  function handleUIIcons(type, size) {
    var newIconName = type;
    // If it's a filled icon
    // briefcase-filled-icon -> briefcase-filled
    if (type.indexOf('filled') > -1) {
      if (type.indexOf('filled-icon') === -1) {
        newIconName = type.replace('-filled', '') + '-filled';
      }
      newIconName = newIconName.replace(iconSuffix, '');
    } else if (type.indexOf(iconSuffix) > -1) {
      newIconName = type.replace(iconSuffix, '');
    }
    // In old icon sprite these were incorrectly labeled as 'large' icons
    if (smallUIIcons[newIconName]) {
      return handleSize('small', newIconName);
    }
    return handleSize(size, newIconName);
  }

  function handleSocialIcons(type, color) {
    var newIconName = undefined;
    if (color) {
      // adchoices-icon -> adchoices-color
      newIconName = type.replace(iconSuffix, '-color');
    } else {
      // adchoices-icon -> adchoices-solid
      newIconName = type.replace(iconSuffix, '-solid');
    }
    return newIconName;
  }

  function handleAppIcons(type) {
    // app-ads-icon -> ads-small
    // Remove app from the front
    var newIconName = type.replace(/^app-/, '');
    // app-linkedin-bug-color-icon -> linkedin-bug-medium
    // app-linkedin-bug-black-icon -> linkedin-bug-black-medium
    var strToReplace = newIconName.indexOf('-color' + iconSuffix) > -1 ? '-color' + iconSuffix : iconSuffix;
    newIconName = newIconName.replace(strToReplace, '');
    // Certain app icons end with `-medium`
    if (mediumAppIcons[newIconName]) {
      return newIconName + '-medium';
    }
    return newIconName;
  }

  function handleNavIcons(type, size, active) {
    var newSize = size;
    // nav-discover-icon -> discover-inactive || discover-active
    // nav-small-talent-insights-icon ->  talent-insights-active  || talent-insights-inverse
    var strToReplace = type.indexOf('nav-small-') > -1 ? 'nav-small-' : 'nav-';
    if (strToReplace.indexOf('nav-small') > -1) {
      newSize = 'small';
    }
    // icon name was misspelled in previous version
    if (type === 'nav-small-sales-nagivator-inverse-icon') {
      return 'sales-navigator-inverse-small';
    }
    var newIconName = type.replace(strToReplace, '');
    // nav icons have three states: active, inactive, inverse
    // nav icons in the inverse state always have 'inverse' in their name
    if (newIconName.match(/inverse/)) {
      return handleSize(newSize, newIconName.replace(iconSuffix, ''));
    }
    if (active) {
      // nav-discover-icon -> discover-active
      newIconName = handleSize(newSize, newIconName.replace(iconSuffix, '-active'));
    } else {
      // If it's not active or inverse it's 'inactive'
      newIconName = handleSize(newSize, newIconName.replace(iconSuffix, '-inactive'));
    }
    return newIconName;
  }

  function handleScalingIcons(type, size) {
    if (type === 'premium-inverse-badge') {
      return 'premium-badge-inverse-' + scalingSizeMap[size];
    }
    return type + '-' + scalingSizeMap[size];
  }

  var socialIcons = {
    'adchoices-icon': 1,
    'amp-icon': 1,
    'aol-icon': 1,
    'aol-mail-icon': 1,
    'baidu-icon': 1,
    'bing-icon': 1,
    'business-insider-icon': 1,
    'dropbox-icon': 1,
    'facebook-icon': 1,
    'flickr-icon': 1,
    'flipboard-icon': 1,
    'forbes-icon': 1,
    'gmail-icon': 1,
    'google-icon': 1,
    'google-drive-icon': 1,
    'googleplus-icon': 1,
    'icq-icon': 1,
    'instagram-icon': 1,
    'lifehacker-icon': 1,
    'linkedin-icon': 1,
    'linkedin-premium-icon': 1,
    'onedrive-icon': 1,
    'outlook-icon': 1,
    'qq-icon': 1,
    'reddit-icon': 1,
    'sesamecredit-icon': 1,
    'skype-icon': 1,
    'slack-icon': 1,
    'slideshare-icon': 1,
    'tumblr-icon': 1,
    'twitter-icon': 1,
    'wechat-icon': 1,
    'weibo-icon': 1,
    'yahoo-icon': 1,
    'yahoo-jp-icon': 1,
    'youtube-icon': 1
  };

  var scalingIcons = {
    'linkedin-bug': 1,
    'linkedin-logo': 1,
    'premium-badge': 1,
    'premium-wordmark': 1,
    'premium-wordmark-inverse': 1,
    'premium-inverse-badge': 1
  };

  var iconCache = {};

  function getIconCategory(type) {
    if (type.indexOf('nav-') === 0) {
      return 'nav';
    }
    if (type.indexOf('app-') === 0) {
      return 'app';
    }
    if (scalingIcons[type]) {
      return 'scaling';
    }
    if (socialIcons[type]) {
      return 'social';
    }
    return 'ui';
  }

  function getNameWithProps(type, size, color, active) {
    if (size === undefined) size = 'large';

    var name = type;
    if (color) {
      name = name + '-color';
    }
    if (active) {
      name = name + '-active';
    }
    return name + '-' + size;
  }
  function convertIconName(type, size, color, active) {
    var nameWithProps = getNameWithProps(type, size, color, active);
    var cachedIconInfo = iconCache[nameWithProps];
    if (cachedIconInfo) {
      return { newType: cachedIconInfo.name, category: cachedIconInfo.category };
    }

    var category = getIconCategory(type);
    var newIconName = type;
    switch (category) {
      case 'ui':
        {
          newIconName = handleUIIcons(type, size);
          break;
        }
      case 'social':
        {
          newIconName = handleSocialIcons(type, color);
          break;
        }
      case 'app':
        {
          newIconName = handleAppIcons(type);
          break;
        }
      case 'nav':
        {
          newIconName = handleNavIcons(type, size, active);
          break;
        }
      case 'scaling':
        {
          if (size) {
            newIconName = handleScalingIcons(type, size);
          }
          break;
        }
      default:
        {
          break;
        }
    }
    iconCache[nameWithProps] = { name: newIconName, category: category };
    return { newType: newIconName, category: category };
  }

  var systemIconsNewNames = {
    'animal-large': 'bear-medium',
    'app-switcher-inactive-small': 'grid-medium',
    'archive-message-large': 'archive-medium',
    'arrows-in-small': 'minimize-small',
    'arrows-in-large': 'minimize-medium',
    'arrows-out-small': 'maximize-small',
    'arrows-out-large': 'maximize-medium',
    'at-pebble-large': 'mention-medium',
    'bell-large': 'bell-outline-medium',
    'bell-filled-large': 'bell-fill-medium',
    'bell-slash-large': 'bell-off-medium',
    'bold-large': 'text-bold-medium',
    'briefcase-large': 'job-medium',
    'briefcase-filled-large': 'job-medium',
    'brightness-large': 'brightness-outline-medium',
    'brightness-filled-large': 'brightness-fill-medium',
    'bulleted-list-large': 'text-bulleted-list-medium',
    'cancel-large': 'close-medium',
    'cancel-small': 'close-small',
    'card-plus-large': 'content-add-medium',
    'card-remove-large': 'clear-medium',
    'caret-down-filled-large': 'caret-medium',
    'caret-down-filled-small': 'caret-small',
    'checked-list-large': 'checklist-medium',
    'circle-verified-large': 'verified-medium',
    'closed-caption-large': 'closed-captions-outline-medium',
    'closed-caption-filled-large': 'closed-captions-fill-medium',
    'compass-large': 'discover-medium',
    'content-center-align-large': 'content-align-center-medium',
    'content-left-align-large': 'content-align-left-medium',
    'content-right-align-large': 'content-align-right-medium',
    'contrast-large': 'contrast-outline-medium',
    'contrast-filled-large': 'contrast-fill-medium',
    'dislike-large': 'thumbs-down-outline-medium',
    'dislike-small': 'thumbs-down-outline-small',
    'dislike-filled-large': 'thumbs-down-fill-medium',
    'dislike-filled-small': 'thumbs-down-fill-small',
    'ellipsis-horizontal-large': 'overflow-web-ios-medium',
    'ellipsis-horizontal-small': 'overflow-web-ios-small',
    'ellipsis-vertical-large': 'overflow-android-medium',
    'ellipsis-vertical-small': 'overflow-android-small',
    'emoji-face-large': 'emoji-medium',
    'enter-large': 'join-medium',
    'error-pebble-large': 'signal-error-medium',
    'error-pebble-small': 'signal-error-small',
    'exit-fullscreen-large': 'fullscreen-exit-medium',
    'eyeball-small': 'visibility-small',
    'eyeball-large': 'visibility-medium',
    'eyeball-slash-small': 'visibility-off-small',
    'eyeball-slash-large': 'visibility-off-medium',
    'fast-forward-ten-large': 'forward-ten-medium',
    'flag-small': 'report-small',
    'flag-large': 'report-medium',
    'flash-on-large': 'flash-medium',
    'food-sandwich-large': 'food-medium',
    'forward-large': 'share-linkedin-medium',
    'forward-small': 'share-linkedin-small',
    'fullscreen-large': 'fullscreen-enter-medium',
    'gear-small': 'settings-small',
    'gear-large': 'settings-medium',
    'gear-filled-large': 'settings-medium',
    'globe-small': 'globe-americas-small',
    'globe-large': 'globe-americas-medium',
    'grid-filled-large': 'grid-medium',
    'hamburger-large': 'menu-medium',
    'hd-large': 'hd-outline-medium',
    'hd-filled-large': 'hd-fill-medium',
    'home-filled-large': 'home-medium',
    'home-inactive-small': 'home-medium',
    'italic-large': 'text-italic-medium',
    'jobs-active-small': 'job-active-medium',
    'jobs-inactive-small': 'job-medium',
    'language-large': 'globe-language-medium',
    'large-play-small': 'play-large',
    'lightning-bolt-small': 'amp-small',
    'like-large': 'thumbs-up-outline-medium',
    'like-small': 'thumbs-up-outline-small',
    'like-filled-large': 'thumbs-up-fill-medium',
    'like-filled-small': 'thumbs-up-fill-small',
    'lock-large': 'locked-medium',
    'lock-small': 'locked-small',
    'linkedin-inbug-color-small': 'linkedin-bug-color-small',
    'linkedin-inbug-color-large': 'linkedin-bug-color-medium',
    'linkedin-influencer-large': 'linkedin-bug-influencer-medium',
    'linkedin-influencer-small': 'linkedin-bug-influencer-small',
    'linkedin-influencer-color-large': 'linkedin-bug-influencer-color-medium',
    'linkedin-influencer-color-small': 'linkedin-bug-influencer-color-small',
    'map-marker-small': 'location-marker-small',
    'map-marker-large': 'location-marker-medium',
    'messages-large': 'send-privately-medium',
    'messages-small': 'send-privately-small',
    'messages-filled-large': 'send-privately-medium',
    'messages-filled-small': 'send-privately-small',
    'messaging-active-small': 'messages-active-medium',
    'messaging-inactive-small': 'messages-medium',
    'microphone-large': 'microphone-outline-medium',
    'microphone-filled-large': 'microphone-fill-medium',
    'minus-small': 'subtract-small',
    'mobile-large': 'phone-medium',
    'mute-large': 'volume-mute-medium',
    'notebook-filled-large': 'notebook-medium',
    'notifications-active-small': 'bell-active-medium',
    'notifications-inactive-small': 'bell-fill-medium',
    'notify-pebble-large': 'signal-notice-medium',
    'notify-pebble-small': 'signal-notice-small',
    'numbered-list-large': 'text-numbered-list-medium',
    'paperclip-large': 'attachment-medium',
    'paperclip-small': 'attachment-small',
    'pencil-large': 'edit-medium',
    'pencil-small': 'edit-small',
    'people-filled-large': 'people-medium',
    'people-inactive-small': 'people-medium',
    'person-remove-large': 'remove-connection-medium',
    'person-remove-small': 'remove-connection-small',
    'person-tag-large': 'tag-person-medium',
    'person-tag-filled-large': 'tag-person-medium',
    'person-walking-large': 'walk-medium',
    'photo-filter-large': 'photo-filter-outline-medium',
    'photo-filter-filled-large': 'photo-filter-fill-medium',
    'plus-large': 'add-medium',
    'plus-small': 'add-small',
    'premium-app-large': 'premium-chip-medium',
    'premium-inverse-app-large': 'premium-chip-medium',
    'projects-large': 'folder-medium',
    'projects-active-small': 'folder-active-medium',
    'projects-inactive-small': 'folder-medium',
    'qr-reader-large': 'scan-qr-code-medium',
    'question-pebble-large': 'question-medium',
    'question-pebble-small': 'question-small',
    'ribbon-small': 'bookmark-outline-small',
    'ribbon-large': 'bookmark-outline-medium',
    'ribbon-filled-large': 'bookmark-fill-medium',
    'saturation-large': 'saturation-outline-medium',
    'saturation-filled-large': 'saturation-fill-medium',
    'scan-people-large': 'scan-person-medium',
    'scan-plus-large': 'scan-add-medium',
    'send-android-small': 'send-small',
    'send-android-large': 'send-medium',
    'shopping-cart-filled-large': 'shopping-cart-active-medium',
    'slideshow-large': 'slides-medium',
    'speech-bubble-large': 'comment-medium',
    'speech-bubble-small': 'comment-small',
    'speech-bubble-slash-large': 'comment-off-medium',
    'speech-bubble-slash-small': 'comment-off-small',
    'sport-ball-large': 'ball-medium',
    'star-small': 'star-outline-small',
    'star-large': 'star-outline-medium',
    'star-burst-large': 'starburst-medium',
    'star-filled-small': 'star-fill-small',
    'star-filled-large': 'star-fill-medium',
    'stickers-large': 'sticker-medium',
    'success-pebble-large': 'signal-success-medium',
    'success-pebble-small': 'signal-success-small',
    'text-center-align-large': 'text-align-center-medium',
    'text-left-align-large': 'text-align-left-medium',
    'text-right-align-large': 'text-align-right-medium',
    'topic-large': 'text-bulleted-list-medium',
    'topics-active-large': 'text-bulleted-list-active-medium',
    'to-end-large': 'skip-forward-medium',
    'to-start-large': 'skip-back-medium',
    'unarchive-message-small': 'unarchive-small',
    'unarchive-message-large': 'unarchive-medium',
    'unlock-large': 'unlocked-medium',
    'unlock-small': 'unlocked-small',
    'vignette-large': 'vignette-outline-medium',
    'vignette-filled-large': 'vignette-fill-medium',
    'volume-max-large': 'volume-high-medium',
    'volume-med-large': 'volume-mid-medium',
    'volume-min-large': 'volume-low-medium',
    'yield-pebble-large': 'signal-caution-medium',
    'yield-pebble-small': 'signal-caution-small'
  };
  function convertToMercado(newType, category) {
    if (!newType) {
      return newType;
    }
    if (category === 'ui' || category === 'nav') {
      var mercadoName = systemIconsNewNames[newType];
      if (mercadoName) {
        return mercadoName;
      }
      if (newType.indexOf('linkedin-inbug') > -1 || newType.indexOf('linkedin-premium-gold') > -1) {
        if (newType.indexOf('large') > -1) {
          return 'linkedin-bug-medium';
        }
        if (newType.indexOf('small') > -1) {
          return 'linkedin-bug-small';
        }
      }
      if (category === 'nav') {
        return newType.replace('small', 'medium');
      }
      return newType.replace('large', 'medium');
    }
    if (category === 'social') {
      var deprecatedLogos = ['linkedin-color', 'linkedin-solid', 'linkedin-premium-color', 'linkedin-premium-solid'];
      if (deprecatedLogos.indexOf(newType) > -1) {
        return 'linkedin-bug-medium';
      }
      return newType;
    }
    if (category === 'scaling') {
      if (newType.indexOf('premium') > -1) {
        return newType.replace('-inverse', '-on-dark');
      }
      return newType.replace('-inverse', '').replace('-full-color', '');
    }
    if (category === 'app') {
      if (newType.indexOf('linkedin-bug') > -1 || newType.indexOf('premium-bug') > -1) {
        var size = newType.substr(newType.lastIndexOf('-'), newType.length - 1);
        if (size !== '-xlarge') {
          return 'linkedin-bug' + size;
        }
      }
    }
    return newType;
  }

  /* eslint-disable no-undef */

  // Fastboot variable has to be defined for BPR fastboot to work correctly
  var IS_FASTBOOT = typeof FastBoot !== 'undefined';
  var ICONS_SPRITE_URL = 'artdeco-icons/static/images/icons.svg';
  var MERCADO_SPRITE_NAME = 'mercado-icons';
  var state = {
    document: IS_FASTBOOT ? null : document,
    customSpriteID: null,
    sourceEl: null,
    loadingPromise: null,
    iconCache: {},
    nextTitleId: 1,
    loadListeners: []
  };

  var NOOP = function emptyFunc() {};
  var EVT_ICONS_LOADED = 'artdeco-icons-loaded';

  // Fetch the icons URL we have stored in the DOM. Required to get the CDN URL in production.
  var getAssetUrl = function getAssetUrl(baseUrl) {
    var iconsMetaTag = state.document.getElementById(baseUrl);
    if (iconsMetaTag) {
      return iconsMetaTag.getAttribute('content');
    }
    return '';
  };

  // Most browsers allow you to interact with DOM from an XHR response's `responseXML` property.
  // IE11 does not. We get to marse the dom manually first to return the first child.
  function getResponseXml(xhr) {
    var result = xhr.responseXML;
    if (result && result.firstChild) {
      return result.firstChild;
    }
    return new DOMParser().parseFromString(xhr.responseText, 'application/xml').firstChild;
  }

  function withoutIds(el) {
    var svgEl = el;
    svgEl = el.cloneNode(true);
    svgEl.removeAttribute('id');
    return svgEl;
  }

  function getIconForSize(iconSource, size) {
    var supportedSizes = iconSource.getAttribute('data-supported-dps');
    if (!supportedSizes) {
      return iconSource.cloneNode(true);
    }
    supportedSizes = supportedSizes.split(' ');
    var numberOfSizes = supportedSizes.length;
    if (numberOfSizes === 0) {
      return iconSource;
    }
    if (numberOfSizes === 1 || size === 'small') {
      var _supportedSizes$0$split = supportedSizes[0].split('x');

      var _supportedSizes$0$split2 = babelHelpers.slicedToArray(_supportedSizes$0$split, 2);

      var smallw = _supportedSizes$0$split2[0];
      var smallh = _supportedSizes$0$split2[1];

      iconSource.setAttribute('width', smallw);
      iconSource.setAttribute('height', smallh);
    } else {
      var _supportedSizes$1$split = supportedSizes[1].split('x');

      var _supportedSizes$1$split2 = babelHelpers.slicedToArray(_supportedSizes$1$split, 2);

      var largew = _supportedSizes$1$split2[0];
      var largeh = _supportedSizes$1$split2[1];

      iconSource.setAttribute('width', largew);
      iconSource.setAttribute('height', largeh);
    }
    return iconSource.cloneNode(true);
  }

  function get(options) {
    // eslint-disable-next-line prefer-const
    var dataType = options.dataType;
    var error = options.error;
    var success = options.success;
    var url = options.url;
    var isAsync = options.isAsync;
    var isCustomSprite = options.isCustomSprite;

    var xhr = new XMLHttpRequest();
    if (!isCustomSprite) {
      url = getAssetUrl('artdeco-icons/static/images/sprite-asset') || getAssetUrl(url);
    }
    xhr.open('GET', url, isAsync);

    // Sinon doesn't correctly set `this` in `onload`, and BPR's big pipe
    // XHR implementation correctly sets `this` but not the response on XHR.
    // Mirage/Pretender implementation pass window as this,
    var realXhr = this && this !== window ? this : xhr;

    // When doing a sync request, we can't set any additional options
    if (isAsync && dataType === 'xml') {
      realXhr.responseType = 'document';
      if (realXhr.overrideMimeType) {
        realXhr.overrideMimeType('text/xml');
      }
    }

    // Sinon doesn't correctly set `this` in `onload`, and BPR's big pipe
    // XHR implementation correctly sets `this` but not the response on XHR.
    // Mirage/Pretender implementation pass window as this,
    realXhr.onload = function onLoad() {
      /**
       * If we're loading XML, makes sure the response is parsed into a document structure,
       * then invokes callback if it was provided.
       *
       * We require the xhr object and requested dataType to be explicitly passed along
       * because we can't reliably use the `this` of `onload` callbacks or the xhr
       * `responseType` property in custom XHR implementations like Big Pipe's and Sinon's.
       */
      if (realXhr.status === 200) {
        var result = dataType === 'xml' ? getResponseXml(realXhr) : realXhr.responseText;
        if (success) {
          success(result);
        }
      } else if (error) {
        error('Request for ' + url + ' failed with code ' + realXhr.status + '.');
      }
    };
    realXhr.onerror = error;
    realXhr.send();
  }

  /**
  - * Cross-browser triggerEvent for IE9+. Silent fail on IE8, if you care about that.
  - */
  function triggerEvent(target, name, detail) {
    var evt = state.document.createEvent('CustomEvent');
    evt.initCustomEvent(name, true, true, detail);
    target.dispatchEvent(evt);
  }

  /*
   * Drop the base: this is a hacky little helper
   * method to fix the mess that the usage of the <base> tag creates.
   * For reference: http://stackoverflow.com/questions/18259032/using-base-tag-on-a-page-that-contains-svg-marker-elements-fails-to-render-marke
   */
  function repairSvgRefs() {
    var baseEl = state.document && state.document.getElementsByTagName('base')[0];

    // Only run this if the base tag exists
    if (baseEl && state.sourceEl) {
      (function () {
        var baseUrl = window.location.href.replace(window.location.hash, '');

        var svgEls = {
          mask: state.sourceEl.querySelectorAll('[*|mask^=url]'),
          fill: state.sourceEl.querySelectorAll('[*|fill^=url]'),
          style: state.sourceEl.querySelectorAll('[*|style^="fill:url"],[*|style^="fill: url"]')
        };

        var styleEls = state.sourceEl.querySelectorAll('style');

        // Find any svg children that contain a url style reference
        // and append the current url to it
        Object.keys(svgEls).forEach(function (key) {
          [].slice.call(svgEls[key]).filter(function (el) {
            return el.getAttribute(key).indexOf('url(#') >= 0;
          }).forEach(function (el) {
            el.setAttribute(key, el.getAttribute(key).replace('url(#', 'url(' + baseUrl + '#'));
          });
        });

        // Do the same for any styles set in the SVG
        [].forEach.call(styleEls, function (el) {
          var urlRefRegex = /url\(#([^)]+)\)/g;

          // MS Edge disagrees with the use of innerHTML. So textContent, it is
          if (el.textContent && urlRefRegex.test(el.textContent)) {
            el.textContent = '/*<![CDATA[*/' + el.textContent.replace(urlRefRegex, function getUrlString(urlString) {
              var splitStrg = urlString.split('#');

              return '' + splitStrg[0] + baseUrl + '#' + splitStrg[1];
            }) + '/*]]>*/';
          }
        });
      })();
    }
  }

  /**
   * API for loading and accessing the icons SVG source.
   */
  var api = {
    // mostly called by tests to pass in a mock window
    init: function init(window) {
      state.document = window && window.document;
    },

    // mostly called by tests to reset between each test
    reset: function resetState() {
      state = {
        document: state.document || null,
        sourceEl: null,
        loadingPromise: null,
        iconCache: {},
        nextTitleId: 1,
        loadListeners: []
      };
    },

    /**
     * Loads the icons source.
     * @param {Function} isAsync specifies if we need to load the icons async or
     * sync. Synchronous loading is mostly useed in tests
     */
    load: function loadIcons(isAsync, customSpriteUrl, customSpriteID) {
      if (isAsync === undefined) isAsync = true;

      if (state.loadingPromise) {
        return state.loadingPromise;
      }
      if (customSpriteID) {
        state.customSpriteID = customSpriteID;
      }
      // eslint-disable-next-line func-names
      state.loadingPromise = new rsvp.Promise(function (resolve, reject) {
        if (IS_FASTBOOT) {
          // We are going to use the node implementation of the DOMParser and
          // document to render this correctly on the server side
          var fs = FastBoot.require('fs');
          var path = FastBoot.require('path');

          // Set up our server-side DOM.
          var xmldom = FastBoot.require('xmldom');

          // Fastboot.distPath stores the path to /dist of the ember app
          var contents = undefined;

          if (customSpriteUrl) {
            contents = fs.readFileSync(path.join(FastBoot.distPath, customSpriteUrl)).toString();
          } else {
            contents = fs.readFileSync(path.join(FastBoot.distPath, 'assets', ICONS_SPRITE_URL)).toString();
          }
          contents = new xmldom.DOMParser().parseFromString(contents).firstChild;
          // set the state with the appropriate data for SSR
          state.document = new xmldom.DOMImplementation().createDocument();
          state.sourceEl = contents;
          resolve(contents);
        } else {
          get({
            isAsync: isAsync,
            url: customSpriteUrl || ICONS_SPRITE_URL,
            isCustomSprite: !!customSpriteUrl,
            dataType: 'xml',
            error: reject,
            success: function success(data) {
              // when this is populated, we know that the icons are loaded
              state.sourceEl = data;

              repairSvgRefs();

              // Clear out any queued up requests for icons before telling the rest of the world we're ready
              var _state = state;
              var loadListeners = _state.loadListeners;

              if (loadListeners && loadListeners.length) {
                for (var i = 0; i < loadListeners.length; i++) {
                  loadListeners[i](state.sourceEl);
                }

                // Free that memory back up
                state.loadListeners.length = 0;
              }

              triggerEvent(state.document, EVT_ICONS_LOADED);

              resolve(data);
            }
          });
        }
      });
      return state.loadingPromise;
    },

    /**
     * Indicates if the icons source has been loaded.
     * @return {Boolean}
     */
    isLoaded: function iconsIsLoaded() {
      return !!state.sourceEl;
    },

    /**
     * Retrieves the SVG element for a specific icon.
     *
     * @param {String} type - The type of the icon (e.g. search-icon).
     * @param {Object} [options] - Additional icon options.
     * @param {String} [options.size] - Which size to retrieve for an icon w/ small and large sizes.
     * @param {Boolean} [options.color] - Whether to retrieve the color or solid version of the icon.
     * @return {Function} cb - A node-style callback that's be invoked with the icon when it's ready
     */
    getIcon: function getIcon(type) {
      var _this = this;

      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      var cb = arguments.length <= 2 || arguments[2] === undefined ? NOOP : arguments[2];
      var size = options.size;
      var color = options.color;
      var active = options.active;

      var _convertIconName = convertIconName(type, size, color, active);

      var newType = _convertIconName.newType;
      var category = _convertIconName.category;

      var returnIcon = function returnIcon(icon) {
        // eslint-disable-next-line no-unused-expressions
        icon ? cb(null, getIconForSize(icon, size)) : cb('Unable to find icon "' + newType + '"', null);
      };
      var iconSource = this.getIconFromCache(newType, category) || this.getIconFromCache(type, category) || this.getIconFromCache(this.computeMercadoName(type, options), state.customSpriteID);
      // allow for null
      // eslint-disable-next-line eqeqeq
      if (iconSource == undefined) {
        api.getSourceEl(function (allIcons) {
          iconSource = _this.findIconInSVG(allIcons, newType, type, category, options);
          returnIcon(iconSource);
        });
      } else {
        returnIcon(iconSource);
      }
    },

    findIconInSVG: function findIconInSVG(allIcons, newType, type, category, options) {
      var _this2 = this;

      var spriteVersion = undefined;
      var iconSource = undefined;
      var _state2 = state;
      var customSpriteID = _state2.customSpriteID;

      if (allIcons && allIcons.getAttribute) {
        spriteVersion = allIcons.getAttribute('id');
      }
      // If they don't provide a custom ID to look for, default to `mercado-icons`
      if (spriteVersion && (spriteVersion === customSpriteID || spriteVersion === MERCADO_SPRITE_NAME)) {
        var mercadoName = convertToMercado(newType, category);
        // Need to look within these <defs> containers so we only look for Mercado
        // icons since Artdeco icons are within the same sprite
        var mercadoDefs = ['system-icons', 'logos-bugs', 'app-icons', 'social-icons'];
        var allMercadoSvgs = mercadoDefs.reduce(function (mercadoSvgs, mercadoCategory) {
          var defs = _this2.findElementInSVGDoc(allIcons, mercadoCategory, 'defs');
          var defsChildren = defs ? defs.getElementsByTagName('svg') : [];
          return mercadoSvgs.concat([].slice.call(defsChildren));
        }, []);
        iconSource = this.findElementInNodeListById(allMercadoSvgs, mercadoName);
        if (!iconSource) {
          var computedMercadoName = this.computeMercadoName(type, options);
          iconSource = this.findElementInNodeListById(allMercadoSvgs, computedMercadoName);
        } else {
          iconSource.setAttribute('class', 'mercado-match');
        }
        iconSource = iconSource && withoutIds(iconSource);
        this.setCache(type, customSpriteID, iconSource);
      }
      if (!iconSource) {
        // grouping container for icons, has the ID of the icon category
        var defs = this.findElementInSVGDoc(allIcons, category, 'defs');
        // xmldom doesn't support querySelector so we fall back to checking child nodes individually
        if (defs && defs.querySelector) {
          iconSource = defs.querySelector('[id="'.concat(newType, '"]'));
        } else if (defs) {
          // Look for a <svg> el with the ID and return if found
          iconSource = this.findElementInNodeListById([].slice.call(defs.getElementsByTagName('svg')), newType);
        }
        iconSource = iconSource && withoutIds(iconSource);
        this.setCache(newType, category, iconSource);
      }
      return iconSource;
    },

    findElementInSVGDoc: function findElementInSVGDoc(doc, idToFind) {
      var elementType = arguments.length <= 2 || arguments[2] === undefined ? 'svg' : arguments[2];

      // XMLDocument doesn't support getElementById, so we'll fall back to using query
      // selector on an attribute if necessary.
      if (doc.getElementById) {
        return doc.getElementById(idToFind);
      }
      if (doc.querySelector) {
        return doc.querySelector('[id="' + idToFind + '"]');
      }
      return this.findElementInNodeListById([].slice.call(doc.getElementsByTagName(elementType)), idToFind);
    },

    findElementInNodeListById: function findElementInNodeListById(elementList, idToFind) {
      return elementList.find(function (elem) {
        if (elem) {
          var id = elem.getAttributeNode('id');
          if (id && id.value === idToFind) {
            return elem;
          }
        }
        return null;
      });
    },

    computeMercadoName: function computeMercadoName(type, options) {
      var mercadoComputedType = undefined;
      var color = options.color;
      var size = options.size;

      if (size) {
        mercadoComputedType = type + '-' + size;
      } else if (color === false) {
        mercadoComputedType = type + '-solid';
      } else if (color === true) {
        mercadoComputedType = type + '-color';
      }
      return mercadoComputedType;
    },

    getIconFromCache: function getIconFromCache(type, category) {
      if (type && category) {
        return state.iconCache[type + '-' + category];
      }
      return null;
    },

    setCache: function setCache(type, category, source) {
      if (type && category) {
        state.iconCache[type + '-' + category] = source;
      }
    },
    /**
     * Provides access to the source icons element.
     *
     * @param {Function} cb Callback that returns the source document when it's available
     */
    getSourceEl: function getSourceEl() {
      var cb = arguments.length <= 0 || arguments[0] === undefined ? NOOP : arguments[0];

      if (!api.isLoaded()) {
        state.loadListeners.push(cb);
      } else {
        cb(state.sourceEl);
      }
    },

    /**
     * Makes icon SVG accessible via <title> and aria-labelledby fallback.
     *
     * See: http://www.sitepoint.com/tips-accessible-svg/
     *
     * @param {Object} icon - The SVG element to add the title to.
     * @param {String} text - The text to set as the title content.
     */
    setIconTitle: function setIconTitle(icon, text) {
      var titleEl = state.document.createElementNS('http://www.w3.org/2000/svg', 'title');
      var titleId = 'li-icon-title-' + state.nextTitleId++;

      titleEl.textContent = text;
      titleEl.setAttribute('id', titleId);
      icon.insertBefore(titleEl, icon.firstChild);
      icon.setAttribute('aria-labelledby', titleId);
    },

    getState: function getState() {
      return state;
    }
  };

  // Fastboot variable has to be defined for BPR fastboot to work correctly
  var IS_FASTBOOT$1 = typeof FastBoot !== 'undefined';
  var BOOLEAN_ATTRS = ['active', 'animate'];

  var DOC = undefined;

  if (IS_FASTBOOT$1) {
    var xmldom = FastBoot.require('xmldom');
    DOC = new xmldom.DOMImplementation().createDocument();
  } else {
    DOC = document;
  }

  function toggleBooleanAttrs(iconEl, options) {
    for (var i = 0, l = BOOLEAN_ATTRS.length; i < l; i++) {
      var optionName = BOOLEAN_ATTRS[i];
      if (options[optionName]) {
        iconEl.setAttribute(optionName, 'true');
      } else {
        iconEl.removeAttribute(optionName);
      }
    }
  }

  function buildLoaderSpinner(el) {
    var type = el.getAttribute('type') || '';

    if (type && type === 'loader') {
      var loader = DOC.createElement('div');
      loader.className = 'artdeco-spinner';

      for (var i = 0; i < 12; i++) {
        var spinnerBars = DOC.createElement('span');
        spinnerBars.className = 'artdeco-spinner-bars';
        loader.appendChild(spinnerBars);
      }

      el.appendChild(loader);
    }
  }

  /**
   * API for creating and manipulating <li-icon> elements.
   *
   * Each rendered icon is wrapped in an <li-icon> with attributes describing how
   * to display the icon.
   */
  var api$1 = {
    // mostly called by tests to pass in a mock window
    init: function init(window) {
      DOC = window && window.document;
    },
    /**
     * Creates a <li-icon> element and sets its attributes.
     *
     * @method create
     * @param {Object} options The <li-icon> options.
     * @param {String} options.type The type of icon the element will contain.
     * @param {String} [options.size=large] The size of the icon (small or large)
     * @param {String} [options.a11y-text] Screen reader text for the element.
     * @param {String} [options.class] A CSS class string to set on the element.
     * @param {Boolean} [options.color=false] If an icon with a full-color version should show it.
     * @param {Boolean} [options.active=false] If an icon with active and inactive states should be active.
     * @param {Boolean} [options.animate=false] If an icon supporting animation should animate.
     * @return {Object} The element.
     */
    create: function createLiIcon(options) {
      var el = DOC.createElement('li-icon');
      api$1.setAttrs(el, options);
      return el;
    },

    /**
     * Creates an element to contain an icon's a11y text.
     *
     * @method createA11yCaption
     * @param {String} a11yText The accessibility text to include in the element.
     * @return {Object} The element with the text filled in and the `a11y-text` class applied.
     */
    createA11yCaption: function createA11yCaption(a11yText) {
      var captionEl = DOC.createElement('span');
      captionEl.setAttribute('class', 'a11y-text');
      captionEl.textContent = a11yText;
      return captionEl;
    },

    /**
     * Creates a <li-icon> element, sets its attributes, and fills in its icon.
     *
     * @method createWithIcon
     * @param {Object} options The <li-icon> options. See create()'s options param.
     * @return {Object} The element.
     */
    createWithIcon: function createWithIcon(options) {
      var el = api$1.create(options);
      api$1.setIcon(el, options.type, options.size, options.color, options.active);
      return el;
    },

    /**
     * Fills a <li-icon> with the SVG source for a specific icon.
     *
     * @method setIcon
     * @param {HTMLElement} el The element that will house the SVG icon
     * @param {String} type The type of icon
     * @param {String} [size] The size (large or small) for an icon supporting sizes.
     * @param {Boolean} [color] True for color or false for solid for a color supporting icon.
     */
    setIcon: function setIcon(el, type, size, color, active) {
      // Empty the node of all children
      while (el.firstChild) {
        el.removeChild(el.firstChild);
      }

      if (type && type === 'loader') {
        buildLoaderSpinner(el);
      } else {
        api.getIcon(type, { size: size, color: color, active: active }, function (err, iconEl) {
          if (iconEl && type !== 'loader') {
            iconEl.setAttribute('focusable', false);
            el.appendChild(iconEl);
          }
        });
      }
    },

    /**
     * Sets/resets attributes on an <li-icon> element.
     *
     * @method setAttrs
     * @param {HTMLElement} el The element to modify.
     * @param {Object} options The <li-icon> options. See create()'s options param.
     */
    setAttrs: function setAttrs(el, options) {
      var size = options.size;
      var type = options.type;
      var color = options.color;

      var classes = options['class'] || '';

      el.setAttribute('aria-hidden', 'true'); // Icons should always be hidden from screen readers.
      el.setAttribute('type', type);
      toggleBooleanAttrs(el, options);
      if (classes) {
        el.setAttribute('class', classes);
      }

      if (size) {
        el.setAttribute('size', size);
      } else {
        el.removeAttribute('size');
      }

      if (color) {
        el.setAttribute('color', color);
      } else {
        el.removeAttribute('color');
      }
    },

    /**
     * Sets or clears accessibility text for an <li-icon> element.
     * @deprecated This method of adding a11y text is ineffective and it will
     *             be removed in version 3.0 (TODO: make sure to remove).
     *
     * @method setA11yText
     * @param {HTMLElement} el The element to set/clear the text for
     * @param {String} text The text to set. Will clear flags if empty.
     */
    setA11yText: function setA11yText(el, text) {
      if (text) {
        el.removeAttribute('aria-hidden');
        el.setAttribute('role', 'img');
        el.setAttribute('aria-label', text);

        // If the aria-hidden attribute is already present, we
        // shouldn't need to do anything else.
      } else if (!el.getAttribute('aria-hidden')) {
          el.removeAttribute('aria-label');
          el.removeAttribute('role');
          el.setAttribute('aria-hidden', 'true');
        }
    }
  };

  /*! (C) Andrea Giammarchi - @WebReflection - ISC Style License */
  !(function (e, t) {
  function n() {
      var e = A.splice(0, A.length);for (Ye = 0; e.length;) e.shift().call(null, e.shift());
    }function r(e, t) {
      for (var n = 0, r = e.length; n < r; n++) T(e[n], t);
    }function o(e) {
      for (var t, n = 0, r = e.length; n < r; n++) t = e[n], V(t, le[a(t)]);
    }function l(e) {
      return function (t) {
        ke(t) && (T(t, e), ae.length && r(t.querySelectorAll(ae), e));
      };
    }function a(e) {
      var t = Ze.call(e, "is"),
          n = e.nodeName.toUpperCase(),
          r = ue.call(oe, t ? te + t.toUpperCase() : ee + n);return t && -1 < r && !i(n, t) ? -1 : r;
    }function i(e, t) {
      return -1 < ae.indexOf(e + '[is="' + t + '"]');
    }function u(e) {
      var t = e.currentTarget,
          n = e.attrChange,
          r = e.attrName,
          o = e.target,
          l = e[$] || 2,
          a = e[Q] || 3;!ot || o && o !== t || !t[Z] || "style" === r || e.prevValue === e.newValue && ("" !== e.newValue || n !== l && n !== a) || t[Z](r, n === l ? null : e.prevValue, n === a ? null : e.newValue);
    }function c(e) {
      var t = l(e);return function (e) {
        A.push(t, e.target), Ye && clearTimeout(Ye), Ye = setTimeout(n, 1);
      };
    }function s(e) {
      rt && (rt = !1, e.currentTarget.removeEventListener(Y, s)), ae.length && r((e.target || y).querySelectorAll(ae), e.detail === q ? q : _), Re && d();
    }function m(e, t) {
      var n = this;ze.call(n, e, t), O.call(n, { target: n });
    }function f(e, t, n) {
      var r = t.apply(e, n),
          l = a(r);return -1 < l && V(r, le[l]), n.pop() && ae.length && o(r.querySelectorAll(ae)), r;
    }function p(e, t) {
      Fe(e, t), I ? I.observe(e, Qe) : (nt && (e.setAttribute = m, e[U] = D(e), e[k](J, O)), e[k](W, u)), e[K] && ot && (e.created = !0, e[K](), e.created = !1);
    }function d() {
      for (var e, t = 0, n = _e.length; t < n; t++) e = _e[t], ie.contains(e) || (n--, _e.splice(t--, 1), T(e, q));
    }function h(e) {
      throw new Error("A " + e + " type is already registered");
    }function T(e, t) {
      var n,
          r,
          o = a(e);-1 < o && (S(e, le[o]), o = 0, t !== _ || e[_] ? t !== q || e[q] || (e[_] = !1, e[q] = !0, r = "disconnected", o = 1) : (e[q] = !1, e[_] = !0, r = "connected", o = 1, Re && ue.call(_e, e) < 0 && _e.push(e)), o && (n = e[t + x] || e[r + x]) && n.call(e));
    }function L() {}function M(e, t, n) {
      var r = n && n[B] || "",
          o = t.prototype,
          l = Ie(o),
          a = t.observedAttributes || pe,
          i = { prototype: l };Ue(l, K, { value: function value() {
          if (we) we = !1;else if (!this[ve]) {
            this[ve] = !0, new t(this), o[K] && o[K].call(this);var e = Ae[Ne.get(t)];(!ge || e.create.length > 1) && H(this);
          }
        } }), Ue(l, Z, { value: function value(e) {
          -1 < ue.call(a, e) && o[Z] && o[Z].apply(this, arguments);
        } }), o[G] && Ue(l, j, { value: o[G] }), o[z] && Ue(l, X, { value: o[z] }), r && (i[B] = r), e = e.toUpperCase(), Ae[e] = { constructor: t, create: r ? [r, De(e)] : [e] }, Ne.set(t, e), y[R](e.toLowerCase(), i), g(e), Oe[e].r();
    }function E(e) {
      var t = Ae[e.toUpperCase()];return t && t.constructor;
    }function v(e) {
      return "string" == typeof e ? e : e && e.is || "";
    }function H(e) {
      for (var t, n = e[Z], r = n ? e.attributes : pe, o = r.length; o--;) t = r[o], n.call(e, t.name || t.nodeName, null, t.value || t.nodeValue);
    }function g(e) {
      return e = e.toUpperCase(), e in Oe || (Oe[e] = {}, Oe[e].p = new Ce(function (t) {
        Oe[e].r = t;
      })), Oe[e].p;
    }function b() {
      He && delete e.customElements, fe(e, "customElements", { configurable: !0, value: new L() }), fe(e, "CustomElementRegistry", { configurable: !0, value: L });for (var t = w.get(/^HTML[A-Z]*[a-z]/), n = t.length; n--; (function (t) {
        var n = e[t];if (n) {
          e[t] = function (e) {
            var t, r;return e || (e = this), e[ve] || (we = !0, t = Ae[Ne.get(e.constructor)], r = ge && 1 === t.create.length, e = r ? Reflect.construct(n, pe, t.constructor) : y.createElement.apply(y, t.create), e[ve] = !0, we = !1, r || H(e)), e;
          }, e[t].prototype = n.prototype;try {
            n.prototype.constructor = e[t];
          } catch (r) {
            fe(n, ve, { value: e[t] });
          }
        }
      })(t[n]));y.createElement = function (e, t) {
        var n = v(t);return n ? $e.call(this, e, De(n)) : $e.call(this, e);
      }, Je || (tt = !0, y[R](""));
    }var y = e.document,
        C = e.Object,
        w = (function (e) {
      var t,
          n,
          r,
          o,
          l = /^[A-Z]+[a-z]/,
          a = function a(e) {
        var t,
            n = [];for (t in u) e.test(t) && n.push(t);return n;
      },
          i = function i(e, t) {
        (t = t.toLowerCase()) in u || (u[e] = (u[e] || []).concat(t), u[t] = u[t.toUpperCase()] = e);
      },
          u = (C.create || C)(null),
          c = {};for (n in e) for (o in e[n]) for (r = e[n][o], u[o] = r, t = 0; t < r.length; t++) u[r[t].toLowerCase()] = u[r[t].toUpperCase()] = o;return c.get = function (e) {
        return "string" == typeof e ? u[e] || (l.test(e) ? [] : "") : a(e);
      }, c.set = function (e, t) {
        return l.test(e) ? i(e, t) : i(t, e), c;
      }, c;
    })({ collections: { HTMLAllCollection: ["all"], HTMLCollection: ["forms"], HTMLFormControlsCollection: ["elements"], HTMLOptionsCollection: ["options"] }, elements: { Element: ["element"], HTMLAnchorElement: ["a"], HTMLAppletElement: ["applet"], HTMLAreaElement: ["area"], HTMLAttachmentElement: ["attachment"], HTMLAudioElement: ["audio"], HTMLBRElement: ["br"], HTMLBaseElement: ["base"], HTMLBodyElement: ["body"], HTMLButtonElement: ["button"], HTMLCanvasElement: ["canvas"], HTMLContentElement: ["content"], HTMLDListElement: ["dl"], HTMLDataElement: ["data"], HTMLDataListElement: ["datalist"], HTMLDetailsElement: ["details"], HTMLDialogElement: ["dialog"], HTMLDirectoryElement: ["dir"], HTMLDivElement: ["div"], HTMLDocument: ["document"], HTMLElement: ["element", "abbr", "address", "article", "aside", "b", "bdi", "bdo", "cite", "code", "command", "dd", "dfn", "dt", "em", "figcaption", "figure", "footer", "header", "i", "kbd", "mark", "nav", "noscript", "rp", "rt", "ruby", "s", "samp", "section", "small", "strong", "sub", "summary", "sup", "u", "var", "wbr"], HTMLEmbedElement: ["embed"], HTMLFieldSetElement: ["fieldset"], HTMLFontElement: ["font"], HTMLFormElement: ["form"], HTMLFrameElement: ["frame"], HTMLFrameSetElement: ["frameset"], HTMLHRElement: ["hr"], HTMLHeadElement: ["head"], HTMLHeadingElement: ["h1", "h2", "h3", "h4", "h5", "h6"], HTMLHtmlElement: ["html"], HTMLIFrameElement: ["iframe"], HTMLImageElement: ["img"], HTMLInputElement: ["input"], HTMLKeygenElement: ["keygen"], HTMLLIElement: ["li"], HTMLLabelElement: ["label"], HTMLLegendElement: ["legend"], HTMLLinkElement: ["link"], HTMLMapElement: ["map"], HTMLMarqueeElement: ["marquee"], HTMLMediaElement: ["media"], HTMLMenuElement: ["menu"], HTMLMenuItemElement: ["menuitem"], HTMLMetaElement: ["meta"], HTMLMeterElement: ["meter"], HTMLModElement: ["del", "ins"], HTMLOListElement: ["ol"], HTMLObjectElement: ["object"], HTMLOptGroupElement: ["optgroup"], HTMLOptionElement: ["option"], HTMLOutputElement: ["output"], HTMLParagraphElement: ["p"], HTMLParamElement: ["param"], HTMLPictureElement: ["picture"], HTMLPreElement: ["pre"], HTMLProgressElement: ["progress"], HTMLQuoteElement: ["blockquote", "q", "quote"], HTMLScriptElement: ["script"], HTMLSelectElement: ["select"], HTMLShadowElement: ["shadow"], HTMLSlotElement: ["slot"], HTMLSourceElement: ["source"], HTMLSpanElement: ["span"], HTMLStyleElement: ["style"], HTMLTableCaptionElement: ["caption"], HTMLTableCellElement: ["td", "th"], HTMLTableColElement: ["col", "colgroup"], HTMLTableElement: ["table"], HTMLTableRowElement: ["tr"], HTMLTableSectionElement: ["thead", "tbody", "tfoot"], HTMLTemplateElement: ["template"], HTMLTextAreaElement: ["textarea"], HTMLTimeElement: ["time"], HTMLTitleElement: ["title"], HTMLTrackElement: ["track"], HTMLUListElement: ["ul"], HTMLUnknownElement: ["unknown", "vhgroupv", "vkeygen"], HTMLVideoElement: ["video"] }, nodes: { Attr: ["node"], Audio: ["audio"], CDATASection: ["node"], CharacterData: ["node"], Comment: ["#comment"], Document: ["#document"], DocumentFragment: ["#document-fragment"], DocumentType: ["node"], HTMLDocument: ["#document"], Image: ["img"], Option: ["option"], ProcessingInstruction: ["node"], ShadowRoot: ["#shadow-root"], Text: ["#text"], XMLDocument: ["xml"] } });"object" != typeof t && (t = { type: t || "auto" });var A,
        O,
        N,
        D,
        I,
        F,
        S,
        V,
        P,
        R = "registerElement",
        U = "__" + R + (1e5 * e.Math.random() >> 0),
        k = "addEventListener",
        _ = "attached",
        x = "Callback",
        q = "detached",
        B = "extends",
        Z = "attributeChanged" + x,
        j = _ + x,
        G = "connected" + x,
        z = "disconnected" + x,
        K = "created" + x,
        X = q + x,
        $ = "ADDITION",
        Q = "REMOVAL",
        W = "DOMAttrModified",
        Y = "DOMContentLoaded",
        J = "DOMSubtreeModified",
        ee = "<",
        te = "=",
        ne = /^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+$/,
        re = ["ANNOTATION-XML", "COLOR-PROFILE", "FONT-FACE", "FONT-FACE-SRC", "FONT-FACE-URI", "FONT-FACE-FORMAT", "FONT-FACE-NAME", "MISSING-GLYPH"],
        oe = [],
        le = [],
        ae = "",
        ie = y.documentElement,
        ue = oe.indexOf || function (e) {
      for (var t = this.length; t-- && this[t] !== e;);return t;
    },
        ce = C.prototype,
        se = ce.hasOwnProperty,
        me = ce.isPrototypeOf,
        fe = C.defineProperty,
        pe = [],
        de = C.getOwnPropertyDescriptor,
        he = C.getOwnPropertyNames,
        Te = C.getPrototypeOf,
        Le = C.setPrototypeOf,
        Me = !!C.__proto__,
        ve = "__dreCEv1",
        He = e.customElements,
        ge = !/^force/.test(t.type) && !!(He && He.define && He.get && He.whenDefined),
        be = C.create || C,
        ye = e.Map || function () {
      var e,
          t = [],
          n = [];return { get: function get(e) {
          return n[ue.call(t, e)];
        }, set: function set(r, o) {
          e = ue.call(t, r), e < 0 ? n[t.push(r) - 1] = o : n[e] = o;
        } };
    },
        Ce = e.Promise || function (e) {
      function t(e) {
        for (r = !0; n.length;) n.shift()(e);
      }var n = [],
          r = !1,
          o = { "catch": function _catch() {
          return o;
        }, then: function then(e) {
          return n.push(e), r && setTimeout(t, 1), o;
        } };return e(t), o;
    },
        we = !1,
        Ae = be(null),
        Oe = be(null),
        Ne = new ye(),
        De = function De(e) {
      return e.toLowerCase();
    },
        Ie = C.create || function it(e) {
      return e ? (it.prototype = e, new it()) : this;
    },
        Fe = Le || (Me ? function (e, t) {
      return e.__proto__ = t, e;
    } : he && de ? (function () {
      function e(e, t) {
        for (var n, r = he(t), o = 0, l = r.length; o < l; o++) n = r[o], se.call(e, n) || fe(e, n, de(t, n));
      }return function (t, n) {
        do {
          e(t, n);
        } while ((n = Te(n)) && !me.call(n, t));return t;
      };
    })() : function (e, t) {
      for (var n in t) e[n] = t[n];return e;
    }),
        Se = e.MutationObserver || e.WebKitMutationObserver,
        Ve = e.HTMLAnchorElement,
        Pe = (e.HTMLElement || e.Element || e.Node).prototype,
        Re = !me.call(Pe, ie),
        Ue = Re ? function (e, t, n) {
      return e[t] = n.value, e;
    } : fe,
        ke = Re ? function (e) {
      return 1 === e.nodeType;
    } : function (e) {
      return me.call(Pe, e);
    },
        _e = Re && [],
        xe = Pe.attachShadow,
        qe = Pe.cloneNode,
        Be = Pe.dispatchEvent,
        Ze = Pe.getAttribute,
        je = Pe.hasAttribute,
        Ge = Pe.removeAttribute,
        ze = Pe.setAttribute,
        Ke = y.createElement,
        Xe = y.importNode,
        $e = Ke,
        Qe = Se && { attributes: !0, characterData: !0, attributeOldValue: !0 },
        We = Se || function (e) {
      nt = !1, ie.removeEventListener(W, We);
    },
        Ye = 0,
        Je = R in y && !/^force-all/.test(t.type),
        et = !0,
        tt = !1,
        nt = !0,
        rt = !0,
        ot = !0;if ((Se && (P = y.createElement("div"), P.innerHTML = "<div><div></div></div>", new Se(function (e, t) {
      if (e[0] && "childList" == e[0].type && !e[0].removedNodes[0].childNodes.length) {
        P = de(Pe, "innerHTML");var n = P && P.set;n && fe(Pe, "innerHTML", { set: function set(e) {
            for (; this.lastChild;) this.removeChild(this.lastChild);n.call(this, e);
          } });
      }t.disconnect(), P = null;
    }).observe(P, { childList: !0, subtree: !0 }), P.innerHTML = ""), Je || (Le || Me ? (S = function (e, t) {
      me.call(t, e) || p(e, t);
    }, V = p) : (S = function (e, t) {
      e[U] || (e[U] = C(!0), p(e, t));
    }, V = S), Re ? (nt = !1, (function () {
      var e = de(Pe, k),
          t = e.value,
          n = function n(e) {
        var t = new CustomEvent(W, { bubbles: !0 });t.attrName = e, t.prevValue = Ze.call(this, e), t.newValue = null, t[Q] = t.attrChange = 2, Ge.call(this, e), Be.call(this, t);
      },
          r = function r(e, t) {
        var n = je.call(this, e),
            r = n && Ze.call(this, e),
            o = new CustomEvent(W, { bubbles: !0 });ze.call(this, e, t), o.attrName = e, o.prevValue = n ? r : null, o.newValue = t, n ? o.MODIFICATION = o.attrChange = 1 : o[$] = o.attrChange = 0, Be.call(this, o);
      },
          o = function o(e) {
        var t,
            n = e.currentTarget,
            r = n[U],
            o = e.propertyName;r.hasOwnProperty(o) && (r = r[o], t = new CustomEvent(W, { bubbles: !0 }), t.attrName = r.name, t.prevValue = r.value || null, t.newValue = r.value = n[o] || null, null == t.prevValue ? t[$] = t.attrChange = 0 : t.MODIFICATION = t.attrChange = 1, Be.call(n, t));
      };e.value = function (e, l, a) {
        e === W && this[Z] && this.setAttribute !== r && (this[U] = { className: { name: "class", value: this.className } }, this.setAttribute = r, this.removeAttribute = n, t.call(this, "propertychange", o)), t.call(this, e, l, a);
      }, fe(Pe, k, e);
    })()) : Se || (ie[k](W, We), ie.setAttribute(U, 1), ie.removeAttribute(U), nt && (O = function (e) {
      var t,
          n,
          r,
          o = this;if (o === e.target) {
        t = o[U], o[U] = n = D(o);for (r in n) {
          if (!(r in t)) return N(0, o, r, t[r], n[r], $);if (n[r] !== t[r]) return N(1, o, r, t[r], n[r], "MODIFICATION");
        }for (r in t) if (!(r in n)) return N(2, o, r, t[r], n[r], Q);
      }
    }, N = function (e, t, n, r, o, l) {
      var a = { attrChange: e, currentTarget: t, attrName: n, prevValue: r, newValue: o };a[l] = e, u(a);
    }, D = function (e) {
      for (var t, n, r = {}, o = e.attributes, l = 0, a = o.length; l < a; l++) t = o[l], "setAttribute" !== (n = t.name) && (r[n] = t.value);return r;
    })), y[R] = function (e, t) {
      if ((n = e.toUpperCase(), et && (et = !1, Se ? (I = (function (e, t) {
        function n(e, t) {
          for (var n = 0, r = e.length; n < r; t(e[n++]));
        }return new Se(function (r) {
          for (var o, l, a, i = 0, u = r.length; i < u; i++) o = r[i], "childList" === o.type ? (n(o.addedNodes, e), n(o.removedNodes, t)) : (l = o.target, ot && l[Z] && "style" !== o.attributeName && (a = Ze.call(l, o.attributeName)) !== o.oldValue && l[Z](o.attributeName, o.oldValue, a));
        });
      })(l(_), l(q)), F = function (e) {
        return I.observe(e, { childList: !0, subtree: !0 }), e;
      }, F(y), xe && (Pe.attachShadow = function () {
        return F(xe.apply(this, arguments));
      })) : (A = [], y[k]("DOMNodeInserted", c(_)), y[k]("DOMNodeRemoved", c(q))), y[k](Y, s), y[k]("readystatechange", s), y.importNode = function (e, t) {
        switch (e.nodeType) {case 1:
            return f(y, Xe, [e, !!t]);case 11:
            for (var n = y.createDocumentFragment(), r = e.childNodes, o = r.length, l = 0; l < o; l++) n.appendChild(y.importNode(r[l], !!t));return n;default:
            return qe.call(e, !!t);}
      }, Pe.cloneNode = function (e) {
        return f(this, qe, [!!e]);
      }), tt)) return tt = !1;if ((-2 < ue.call(oe, te + n) + ue.call(oe, ee + n) && h(e), !ne.test(n) || -1 < ue.call(re, n))) throw new Error("The type " + e + " is invalid");var n,
          o,
          a = function a() {
        return u ? y.createElement(m, n) : y.createElement(m);
      },
          i = t || ce,
          u = se.call(i, B),
          m = u ? t[B].toUpperCase() : n;return u && -1 < ue.call(oe, ee + m) && h(m), o = oe.push((u ? te : ee) + n) - 1, ae = ae.concat(ae.length ? "," : "", u ? m + '[is="' + e.toLowerCase() + '"]' : m), a.prototype = le[o] = se.call(i, "prototype") ? i.prototype : Ie(Pe), ae.length && r(y.querySelectorAll(ae), _), a;
    }, y.createElement = $e = function (e, t) {
      var n = v(t),
          r = n ? Ke.call(y, e, De(n)) : Ke.call(y, e),
          o = "" + e,
          l = ue.call(oe, (n ? te : ee) + (n || o).toUpperCase()),
          a = -1 < l;return n && (r.setAttribute("is", n = n.toLowerCase()), a && (a = i(o.toUpperCase(), n))), ot = !y.createElement.innerHTMLHelper, a && V(r, le[l]), r;
    }), L.prototype = { constructor: L, define: ge ? function (e, t, n) {
        if (n) M(e, t, n);else {
          var r = e.toUpperCase();Ae[r] = { constructor: t, create: [r] }, Ne.set(t, r), He.define(e, t);
        }
      } : M, get: ge ? function (e) {
        return He.get(e) || E(e);
      } : E, whenDefined: ge ? function (e) {
        return Ce.race([He.whenDefined(e), g(e)]);
      } : g }, !He || /^force/.test(t.type))) b();else if (!t.noBuiltIn) try {
      !(function (t, n, r) {
        var o = new RegExp("^<a\\s+is=('|\")" + r + "\\1></a>$");if ((n[B] = "a", t.prototype = Ie(Ve.prototype), t.prototype.constructor = t, e.customElements.define(r, t, n), !o.test(y.createElement("a", { is: r }).outerHTML) || !o.test(new t().outerHTML))) throw n;
      })(function ut() {
        return Reflect.construct(Ve, [], ut);
      }, {}, "document-register-element-a");
    } catch (lt) {
      b();
    }if (!t.noBuiltIn) try {
      if (Ke.call(y, "a", "a").outerHTML.indexOf("is") < 0) throw {};
    } catch (at) {
      De = function (e) {
        return { is: e.toLowerCase() };
      };
    }
  })(window);

  /* eslint-disable @linkedin/pemberly/no-unguarded-globals */
  /**
   * Convenience boilerplate for getting a pointer to
   * the artdeco global object.
   *
   * @return {Object} Reference to the artdeco global
   */
  function artdecoGlobal() {
    var retVal = {};

    if (typeof window !== 'undefined') {
      if (!Object.prototype.hasOwnProperty.call(window, 'artdeco')) {
        window.artdeco = {};
      }
      retVal = window.artdeco;
    }

    return retVal;
  }

  /**
   * Utility method for registering custom elements
   * and error handling on registration
   *
   */
  function registerArtDecoElement(document, element, options) {
    // bind gracefully to global artdeco object
    var artdeco = artdecoGlobal();

    // if we don't already have an instance of `artdeco.registeredElements`, create a new empty array
    if (!artdeco.registeredElements) {
      artdeco.registeredElements = {};
    }

    // if we haven't already registered the element, register it; else, fail silently
    if (!artdeco.registeredElements[element]) {
      artdeco.registeredElements[element] = true;
      try {
        // eslint-disable-next-line no-unused-expressions
        document.registerElement && document.registerElement(element, options);
      } catch (e) {
        /* shhhh... */
      }
    }
  }

  var ATTRS_TRIGGERING_UPDATE = ['type', 'size', 'color', 'active'];

  /**
   * Definition of the <li-icon> custom element prototype.
   */
  var proto = typeof HTMLElement !== 'undefined' ? Object.create(HTMLElement.prototype) : {};

  // Lifecyle callbacks:

  /**
   * Handles DOM insertion.
   */
  proto.attachedCallback = function liIconAttached() {
    this._installA11yCaption();
  };

  /**
   * Handles instantiation.
   */
  proto.createdCallback = function liIconCreate() {
    this.update();
    this._syncA11yCaption();
    this.setAttribute('aria-hidden', 'true'); // Icons should always be hidden from screen readers.
  };

  /**
   * Handles DOM removal.
   */
  proto.detachedCallback = function liIconDetached() {
    this._removeA11yCaption();
  };

  /**
   * Handles attribute value changed.
   */
  proto.attributeChangedCallback = function liIconAttrChanged(name) {
    if (ATTRS_TRIGGERING_UPDATE.indexOf(name) > -1) {
      this.update();
    }

    if (name === 'a11y-text') {
      this._syncA11yCaption();
    }
  };

  // Methods:

  /**
   * Updates the icon inside the element.
   */
  proto.update = function liIconUpdate() {
    var type = this.getAttribute('type');
    var size = this.getAttribute('size') || 'large';
    var color = false;
    var active = false;

    if (!type) {
      return;
    }

    if (this.hasAttribute('color')) {
      color = this.getAttribute('color') !== 'false';
    }

    if (this.hasAttribute('active')) {
      active = this.getAttribute('active') !== 'false';
    }

    api$1.setIcon(this, type, size, color, active);
  };

  // A11y functionality:

  /**
   * Adds the icon's a11y caption element to the DOM immediately before the <li-icon>.
   * @private
   */
  proto._installA11yCaption = function installA11yCaption() {
    var parentNode = this.parentNode;

    var a11yCaption = this._a11yCaption;

    if (parentNode && a11yCaption && !a11yCaption.parentNode) {
      parentNode.insertBefore(a11yCaption, this);
    }
  };

  /**
   * Removes the icon's a11y caption element from the DOM.
   * @private
   */
  proto._removeA11yCaption = function removeA11yCaption() {
    var a11yCaption = this._a11yCaption;

    if (a11yCaption && a11yCaption.parentNode) {
      a11yCaption.parentNode.removeChild(a11yCaption);
    }

    this._a11yCaption = null;
  };

  /**
   * Creates or updates the icon's a11y caption element, adding it to or removing
   * it from the DOM if the icon is on the page.
   * @private
   */
  proto._syncA11yCaption = function syncA11yCaption() {
    var a11yCaption = this._a11yCaption;
    var a11yText = this.getAttribute('a11y-text');

    if (a11yText) {
      if (a11yCaption) {
        a11yCaption.textContent = a11yText;
      } else {
        this._a11yCaption = api$1.createA11yCaption(a11yText);
        this._installA11yCaption();
      }
    } else {
      this._removeA11yCaption();
    }
  };

  /**
   * Registers the li-icon custom element with the browser.
   */
  function registerLiIcon(doc) {
    registerArtDecoElement(doc, 'li-icon', { prototype: proto });
  }

  // If this is BPR, it doesn't have `HTMLElement`. Protect ourselves.
  var PROTO = typeof HTMLElement === 'function' ? HTMLElement : function emptyFunc() {};

  // Fix for Safari and IE. These browsers implement an off-spec version of the
  // `HTMLElement` constructor. The constructor is actually type `object` with a special
  // prototype property and is interpreted at runtime as a constructor.
  if (typeof HTMLElement === 'object' && typeof HTMLElement.prototype === 'object') {
    PROTO.prototype = HTMLElement.prototype;
  }

  var ATTRS_TRIGGERING_UPDATE$1 = ['type', 'size', 'color'];
  var ATTR_VALIDATIONS = {
    iconType: {
      msg: 'The linkedin-logo requires the type attribute be suffixed with either "-bug" or "-logo" corresponding to the icon type.',
      values: ['linkedin-bug', 'linkedin-logo']
    },
    iconVariant: {
      msg: 'The type attribute on linkedin-logo is prefixed with an unsupported variant. Please add a variant based on the supported icon colors.',
      values: ['', 'premium', 'brand', 'inverse']
    },
    size: {
      msg: 'The linkedin-logo requires an attribute of "size" with a value corresponding to a supported icon size. Supported sizes are 14dp, 21dp, 28dp, 34dp, 40dp and 48dp',
      values: ['14dp', '21dp', '28dp', '34dp', '40dp', '48dp']
    },
    color: {
      msg: 'The linkedin-logo expects to color attribute to be null, "dark", or "inverse"',
      values: ['dark', 'inverse']
    }
  };

  // Definition of the <linkedin-logo> custom element prototype.

  var LinkedinLogo = (function (_ComponentCore) {
    babelHelpers.inherits(LinkedinLogo, _ComponentCore);

    function LinkedinLogo() {
      babelHelpers.classCallCheck(this, LinkedinLogo);
      babelHelpers.get(Object.getPrototypeOf(LinkedinLogo.prototype), 'constructor', this).apply(this, arguments);
    }

    /**
     * Formats icon properties from the linkedin-logo attributes
     */
    babelHelpers.createClass(LinkedinLogo, [{
      key: 'attachedCallback',

      /**
       * Handles DOM insertion.
       */
      value: function attachedCallback() {
        var type = this.getAttribute('type');
        var size = this.getAttribute('size');

        // create logo elements
        this.iconEl = this.querySelector('li-icon') || _createLiIcon(type, size);
        this.lockupTextEl = this.querySelector('.logo-text') || this.createLockupTextEl(this.textContent);

        this.appendLogoEls();
        this.update();
      }

      /**
       * Handles attribute value changed.
       */
    }, {
      key: 'attributeChangedCallback',
      value: function attributeChangedCallback(name, previousValue) {
        if (ATTRS_TRIGGERING_UPDATE$1.indexOf(name) > -1) {
          if (name === 'type') {
            this.nullPropCheck('type', this.getAttribute('type'));
          }

          if (name === 'size') {
            this.nullPropCheck('size', this.getAttribute('size'));
          }

          // Always fire update if it's the color changing
          if (name === 'color') {
            this.update();
          } else if (previousValue) {
            // Otherwise, only fire the update if a previous value existed
            this.update();
          }
        }
      }

      /**
       * Updates the icon inside the element.
       */
    }, {
      key: 'update',
      value: function update() {
        var type = this.getAttribute('type');
        var size = this.getAttribute('size');
        var color = this.getAttribute('color');

        if (!type || !size) {
          return;
        }

        _setIcon(this.iconEl, type, size);
        this.setColorClassname(color);
      }

      /**
       * Applies the color class to the icon and text elements
       */
    }, {
      key: 'setColorClassname',
      value: function setColorClassname(color) {
        var _this = this;

        var colorClassnameRgx = /^(logo-lockup-)/;

        // Remove the classname if it exists
        [].some.call(this.lockupTextEl.classList, function (c) {
          if (colorClassnameRgx.test(c)) {
            _this.lockupTextEl.classList.remove(c);
          }
        });
        [].some.call(this.iconEl.classList, function (c) {
          if (colorClassnameRgx.test(c)) {
            _this.iconEl.classList.remove(c);
          }
        });

        if (color) {
          var colorClassname = 'logo-lockup-' + color;
          this.lockupTextEl.classList.add(colorClassname);
          this.iconEl.classList.add(colorClassname);
        }
      }

      /**
       * Appends the children elements to the linkedin-logo
       */
    }, {
      key: 'appendLogoEls',
      value: function appendLogoEls() {
        this.textContent = '';
        this.appendChild(this.iconEl);
        this.appendChild(this.lockupTextEl);
      }

      /**
       * Create the text element for the lockup
       */
    }, {
      key: 'createLockupTextEl',
      value: function createLockupTextEl(textContent) {
        var el = document.createElement('span');
        el.classList.add('logo-text');
        el.textContent = textContent;

        return el;
      }

      /**
       * Verify that the attribute isn't null, throw an error if it is
       */
    }, {
      key: 'nullPropCheck',
      value: function nullPropCheck(name, value) {
        if (!value) {
          // eslint-disable-next-line no-console
          console.warn('An attribute of ' + name + ' is required for the linkedin-logo custom element');
          return false;
        }
        return true;
      }

      /**
       * Verify that the attribute has the appropriate value, throw an error if it doesn't
       */
    }, {
      key: 'validateProp',
      value: function validateProp(attr, value) {
        var validateRef = ATTR_VALIDATIONS[attr];

        if (!validateRef) {
          return;
        }

        if (validateRef.values && validateRef.values.indexOf(value) === -1) {
          // eslint-disable-next-line no-console
          console.warn(validateRef.msg);
        }
      }
    }]);
    return LinkedinLogo;
  })(PROTO);

  function _formatIconProps(type) {
    if (!type) {
      return {
        iconType: 'linkedin-bug',
        iconVariant: 'brand'
      };
    }

    // Set up icon properties
    var splitType = type.split('-');
    var iconVariant = splitType.length > 1 ? splitType[0] : '';
    var iconType = splitType.length > 1 ? splitType[1] : splitType[0];

    iconType = 'linkedin-' + iconType;

    LinkedinLogo.prototype.validateProp('iconVariant', iconVariant);
    LinkedinLogo.prototype.validateProp('iconType', iconType);

    return {
      iconType: iconType,
      iconVariant: iconVariant
    };
  }

  /**
   * Private utility functions
   * */
  function _createLiIcon(type, size) {
    // Set up icon properties
    var props = _formatIconProps(type);

    return api$1.create({
      type: props.iconType,
      color: props.iconVariant,
      size: size || '14dp'
    });
  }

  /**
   * Updates attributes on the icon
   */
  function _setIcon(el, type, size) {
    // Set up icon properties
    var props = _formatIconProps(type);

    api$1.setAttrs(el, {
      type: props.iconType,
      color: props.iconVariant,
      size: size || '14dp'
    });
  }

  /**
   * Registers the linkedin-logo custom element with the browser.
   */
  function registerLinkedinLogo(doc) {
    registerArtDecoElement(doc, 'linkedin-logo', {
      prototype: LinkedinLogo.prototype
    });
  }

  /* eslint-disable @linkedin/pemberly/no-unguarded-globals */
  api.load().then(function () {
    // Register li-icon custom element.
    if (document) {
      registerLiIcon(document);
      registerLinkedinLogo(document);
    }
  })['catch'](function (error) {
    throw error;
  });
  /* eslint-enable @linkedin/pemberly/no-unguarded-globals */

}());
