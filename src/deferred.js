/**
 * @license
 * Copyright (C) 2015 Steven Berry (http://www.sberry.me/deferred-ap)
 * Licensed: MIT (http://opensource.org/licenses/mit-license.php)
 *
 * Steven Berry
 * www.sberry.me
 * steven@sberry.me
 */
(function(root, factory) {
	if (typeof module === 'object' && module && typeof module.exports === 'object') {
		module.exports = factory.call(root, require('promises-ap'));
	}
	else if (typeof define === 'function' && define.amd) {
		define(['promises-ap'], function() {
			return factory.apply(root, arguments);
		});
	}
	else if (typeof root === 'object' && root && typeof root.document === 'object') {
		root.Deferred = factory.call(root, root.Promise);
	}
})(this, function(Promise) {
	/**
	 *
	 * @returns {Deferred}
	 * @constructor
	 */
	function Deferred() {
		var that;

		if (!(this instanceof Deferred)) {
			return new Deferred();
		}

		that = this;

		that.promise = new Promise(function(resolve, reject) {
			that.resolve = resolve;
			that.reject = reject;
		});
	}

	Deferred.prototype = {
		/**
		 *
		 * @returns {string}
		 */
		state: function Deferred$state() {
			var promise;

			promise = this.promise;

			if (promise.isFulfilled()) {
				return 'resolved';
			}
			else if (promise.isRejected()) {
				return 'rejected';
			}

			return 'pending';
		}
	};


	return Deferred;
});
