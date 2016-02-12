# deferred-ap
A Deferred extension for any Promises/A+ compliant promise library.


## Soap Box

Deferreds are somewhat stigmatized by the JavaScript Borg Collective as an
anti-pattern. For a good discussion on the matter, see:

[https://github.com/petkaantonov/bluebird/wiki/Promise-anti-patterns#the-deferred-anti-pattern](https://github.com/petkaantonov/bluebird/wiki/Promise-anti-patterns#the-deferred-anti-pattern)

While there are some specific cases where Deferreds are necessary it is
important to understand that they should be used judiciously. Make sure you
think carefully about your design if you discover that you "need" to use
Deferreds. You may very well be correct, but you could also be creating code
that other JS developers may find difficult to understand and contribute to
(whether proprietary or open source).


## Installation

```
npm install deferred-ap
```

## Usage

### Creating Instances

```js
var Deferred = require('deferred-ap');

var deferred = new Deferred();
```

When creating new Deferred instances in this manner, the constructor will
default to the Promise constructor defined in the global namespace. This works
nicely if you're in an environment that, for instance, supports ES6 Promises
natively. However you can run into issues if you're environment does not support
Promises out of the box.


### Custom Promise Constructors

`deferred-ap` allows you to override the default Promise constructor that it
uses internally. This enables you to override the native ES6 Promise constructor
or define a Promise constructor in the first place.

```js
var Deferred = require('deferred-ap');
var Promise = require('bluebird').Promise;

var deferred = new Deferred(Promise);  // Uses the bluebird constructor.
```

You can also set a specific Promise constructor as the default internal
constructor.

```js
var Deferred = require('deferred-ap');
var Promise = require('bluebird').Promise;

Deferred.configure(Promise);

var deferred = new Deferred();  // Uses the bluebird constructor.
```

### Resolution/Rejection

Deferred instances can be easily resolved or rejected.

Resolving:

```js
var Deferred = require('deferred-ap');

var deferred = new Deferred();

deferred.resolve('foo');
```

Rejecting:
```js
var Deferred = require('deferred-ap');

var deferred = new Deferred();

deferred.reject(new Error('bar'));
```

The functions `.resolve()` and `.reject()` function in exactly the same way as
their counterparts in:

```js
var promise = new Promise(function(resolve, reject) {
   ...
});
```


### Determining State

`deferred-ap` allows you to check on the state of a particular instance. This
can be moderately useful for dealing with Promise constructors like the native
ES6 constructor that doesn't inherently allow state checks. The functionality is
intended merely as a convenience and not as a replacement for semantic state
checks in custom Promise implementations. Possible states are `pending`,
`resolved`, and `rejected`. States returned as strings enables using `switch`
statements around the state of the Deferred instance.

```js
var Deferred = require('deferred-ap');

var deferred = new Deferred();

deferred.state;  // 'pending'

deferred.resolve(null);

deferred.state;  // 'resolved'
```
