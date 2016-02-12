/**
 * @license
 * Copyright (C) 2016 Steven Berry (http://www.sberry.me/deferred-ap)
 * Licensed: MIT (http://opensource.org/licenses/mit-license.php)
 *
 * Steven Berry
 * www.sberry.me
 * steven@sberry.me
 */

(function(root, factory) {
	if (typeof module === 'object' && module && typeof module.exports === 'object') {
		module.exports = factory.call(root);
	}
	else if (typeof define === 'function' && define.amd) {
		define(function() {
			return factory.apply(root, arguments);
		});
	}
	else if (typeof root === 'object' && root && typeof root.document === 'object') {
		root.Deferred = factory.call(root);
	}
})(this, function() {
	var BasePromise = Promise;


	/**
	 * Creates a new Deferred object when can subsequently be resolved or
	 * rejected manually. The internal Promise is resolved or rejected
	 * accordingly. Deferred instances indicate the state of their underlying
	 * promise as a string which allows for integrating state checks into
	 * switch statements.
	 *
	 * @constructor
	 * @param {Function} [Promise] The promise constructor to use for
	 *     instantiation.
	 * @returns {Deferred}
	 */
	function Deferred(Promise) {
		var Constructor, _state, promise, self = this;

		Constructor = Promise || BasePromise;

		if (typeof Constructor !== 'function') {
			throw new Error('Invalid Promise constructor');
		}

		_state = 'pending';
		promise = new Constructor(function(resolve, reject) {
			self.resolve = resolve;
			self.reject = reject;
		});

		try {
			promise
				.then(function() {
					_state = 'resolved';
				})
				.catch(function() {
					_state = 'rejected';
				});
		} catch(err) {
			throw new Error('Invalid Promise constructor');
		}

		Object.defineProperty(this, 'state', {
			enumerable: true,
			get: function() {
				return _state;
			}
		});

		this.promise = promise;
	}


	/**
	 * Configures the Deferred constructor to use the indicated Promise
	 * constructor as the default when creating a new internal Promise. The
	 * inherent default is to use the Promise constructor defined in the global
	 * namespace.
	 *
	 * @param {Function} Constructor The promise constructor to use as a
	 *     default for deferred creation.
	 */
	Deferred.configure = function configure(Constructor) {
		if (typeof Constructor !== 'function') {
			throw new Error('Invalid Promise constructor');
		}

		BasePromise = Constructor;
	};


	return Deferred;
});
