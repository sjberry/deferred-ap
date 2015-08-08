# deferred-ap
A Deferred extension for any Promises/A+ compliant promise library.


## Installation
While `deferred-ap` doesn't technically have any dependencies it does require a
Promises/A+ compliant library to function correctly. Installing `deferred-ap` is
straightforward:

```
npm install deferred-ap
```

However, after this step is complete you'll need to symlink a Promises/A+
compliant promise library to the generic name `promises-ap`.

For example, if you're using `bluebird` as a Promises/A+ library, the final
symlink installation step can be performed by:

```
npm install bluebird
cd node_modules/
ln -s bluebird/ promises-ap
```

In this way `bluebird` is aliased to `promises-ap` and `deferred-ap` will load
it appropriately.
