(function () {
'use strict';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
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
}();

var promise = createCommonjsModule(function (module, exports) {
  (function (global) {

    //
    // Check for native Promise and it has correct interface
    //

    var NativePromise = global['Promise'];
    var nativePromiseSupported = NativePromise &&
    // Some of these methods are missing from
    // Firefox/Chrome experimental implementations
    'resolve' in NativePromise && 'reject' in NativePromise && 'all' in NativePromise && 'race' in NativePromise &&
    // Older version of the spec had a resolver object
    // as the arg rather than a function
    function () {
      var resolve;
      new NativePromise(function (r) {
        resolve = r;
      });
      return typeof resolve === 'function';
    }();

    //
    // export if necessary
    //

    if ('object' !== 'undefined' && exports) {
      // node.js
      exports.Promise = nativePromiseSupported ? NativePromise : Promise;
      exports.Polyfill = Promise;
    } else {
      // AMD
      if (typeof undefined == 'function' && undefined.amd) {
        undefined(function () {
          return nativePromiseSupported ? NativePromise : Promise;
        });
      } else {
        // in browser add to global
        if (!nativePromiseSupported) global['Promise'] = Promise;
      }
    }

    //
    // Polyfill
    //

    var PENDING = 'pending';
    var SEALED = 'sealed';
    var FULFILLED = 'fulfilled';
    var REJECTED = 'rejected';
    var NOOP = function NOOP() {};

    function isArray(value) {
      return Object.prototype.toString.call(value) === '[object Array]';
    }

    // async calls
    var asyncSetTimer = typeof setImmediate !== 'undefined' ? setImmediate : setTimeout;
    var asyncQueue = [];
    var asyncTimer;

    function asyncFlush() {
      // run promise callbacks
      for (var i = 0; i < asyncQueue.length; i++) {
        asyncQueue[i][0](asyncQueue[i][1]);
      } // reset async asyncQueue
      asyncQueue = [];
      asyncTimer = false;
    }

    function asyncCall(callback, arg) {
      asyncQueue.push([callback, arg]);

      if (!asyncTimer) {
        asyncTimer = true;
        asyncSetTimer(asyncFlush, 0);
      }
    }

    function invokeResolver(resolver, promise) {
      function resolvePromise(value) {
        resolve(promise, value);
      }

      function rejectPromise(reason) {
        reject(promise, reason);
      }

      try {
        resolver(resolvePromise, rejectPromise);
      } catch (e) {
        rejectPromise(e);
      }
    }

    function invokeCallback(subscriber) {
      var owner = subscriber.owner;
      var settled = owner.state_;
      var value = owner.data_;
      var callback = subscriber[settled];
      var promise = subscriber.then;

      if (typeof callback === 'function') {
        settled = FULFILLED;
        try {
          value = callback(value);
        } catch (e) {
          reject(promise, e);
        }
      }

      if (!handleThenable(promise, value)) {
        if (settled === FULFILLED) resolve(promise, value);

        if (settled === REJECTED) reject(promise, value);
      }
    }

    function handleThenable(promise, value) {
      var resolved;

      try {
        if (promise === value) throw new TypeError('A promises callback cannot return that same promise.');

        if (value && (typeof value === 'function' || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object')) {
          var then = value.then; // then should be retrived only once

          if (typeof then === 'function') {
            then.call(value, function (val) {
              if (!resolved) {
                resolved = true;

                if (value !== val) resolve(promise, val);else fulfill(promise, val);
              }
            }, function (reason) {
              if (!resolved) {
                resolved = true;

                reject(promise, reason);
              }
            });

            return true;
          }
        }
      } catch (e) {
        if (!resolved) reject(promise, e);

        return true;
      }

      return false;
    }

    function resolve(promise, value) {
      if (promise === value || !handleThenable(promise, value)) fulfill(promise, value);
    }

    function fulfill(promise, value) {
      if (promise.state_ === PENDING) {
        promise.state_ = SEALED;
        promise.data_ = value;

        asyncCall(publishFulfillment, promise);
      }
    }

    function reject(promise, reason) {
      if (promise.state_ === PENDING) {
        promise.state_ = SEALED;
        promise.data_ = reason;

        asyncCall(publishRejection, promise);
      }
    }

    function publish(promise) {
      var callbacks = promise.then_;
      promise.then_ = undefined;

      for (var i = 0; i < callbacks.length; i++) {
        invokeCallback(callbacks[i]);
      }
    }

    function publishFulfillment(promise) {
      promise.state_ = FULFILLED;
      publish(promise);
    }

    function publishRejection(promise) {
      promise.state_ = REJECTED;
      publish(promise);
    }

    /**
    * @class
    */
    function Promise(resolver) {
      if (typeof resolver !== 'function') throw new TypeError('Promise constructor takes a function argument');

      if (this instanceof Promise === false) throw new TypeError('Failed to construct \'Promise\': Please use the \'new\' operator, this object constructor cannot be called as a function.');

      this.then_ = [];

      invokeResolver(resolver, this);
    }

    Promise.prototype = {
      constructor: Promise,

      state_: PENDING,
      then_: null,
      data_: undefined,

      then: function then(onFulfillment, onRejection) {
        var subscriber = {
          owner: this,
          then: new this.constructor(NOOP),
          fulfilled: onFulfillment,
          rejected: onRejection
        };

        if (this.state_ === FULFILLED || this.state_ === REJECTED) {
          // already resolved, call callback async
          asyncCall(invokeCallback, subscriber);
        } else {
          // subscribe
          this.then_.push(subscriber);
        }

        return subscriber.then;
      },

      'catch': function _catch(onRejection) {
        return this.then(null, onRejection);
      }
    };

    Promise.all = function (promises) {
      var Class = this;

      if (!isArray(promises)) throw new TypeError('You must pass an array to Promise.all().');

      return new Class(function (resolve, reject) {
        var results = [];
        var remaining = 0;

        function resolver(index) {
          remaining++;
          return function (value) {
            results[index] = value;
            if (! --remaining) resolve(results);
          };
        }

        for (var i = 0, promise; i < promises.length; i++) {
          promise = promises[i];

          if (promise && typeof promise.then === 'function') promise.then(resolver(i), reject);else results[i] = promise;
        }

        if (!remaining) resolve(results);
      });
    };

    Promise.race = function (promises) {
      var Class = this;

      if (!isArray(promises)) throw new TypeError('You must pass an array to Promise.race().');

      return new Class(function (resolve, reject) {
        for (var i = 0, promise; i < promises.length; i++) {
          promise = promises[i];

          if (promise && typeof promise.then === 'function') promise.then(resolve, reject);else resolve(promise);
        }
      });
    };

    Promise.resolve = function (value) {
      var Class = this;

      if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.constructor === Class) return value;

      return new Class(function (resolve) {
        resolve(value);
      });
    };

    Promise.reject = function (reason) {
      var Class = this;

      return new Class(function (resolve, reject) {
        reject(reason);
      });
    };
  })(typeof window != 'undefined' ? window : typeof commonjsGlobal != 'undefined' ? commonjsGlobal : typeof self != 'undefined' ? self : commonjsGlobal);
});

var Promise$1 = promise.Promise;

function request(url, data, type) {
	var data = data || {};
	var url = url || '';
	var type = type || 'post';
	if (!url && typeof url != 'string') {
		console.log('传入的url有问题');
		return;
	}
	if (url.charAt(0) != '/') {
		url = '/' + url;
	}
	var param = {
		type: type,
		url: proxypath + url,
		data: data
	};
	return new Promise$1(function (resolve, reject) {
		GB.ajax2(param).done(function (result) {
			resolve(result);
		}).fail(function (data) {
			reject(data);
		});
	});
}

var _post = function _post(url, data) {
	return request(url, data, 'post');
};
var _get = function _get(url, data) {
	return request(url, data, 'get');
};

var query = function () {
	function query(prefix) {
		classCallCheck(this, query);

		if (!prefix || typeof prefix != 'string') throw new Error('prefix is undefine');
		if (prefix.charAt(prefix.length - 1) != '/') prefix += '/';
		this.prefix = prefix;
		//过滤器，默认直接将结果传递，如果需要单独处理需自己实现
		this.queryFilter = function (res) {
			return res;
		};
		this.exceptFilter = function (res) {
			return Promise$1.reject(res);
		};
	}

	createClass(query, [{
		key: 'get',
		value: function get$$1(method, data) {
			return _get(this.prefix + method, data).then(this.queryFilter).catch(this.exceptFilter);
		}
	}, {
		key: 'post',
		value: function post(method, data) {
			return _post(this.prefix + method, data).then(this.queryFilter).catch(this.exceptFilter);
		}
	}]);
	return query;
}();

/**
 * Created by wanglin on 2017/7/24.
 */
//用户注册
var register = function register(data) {
    return _post("/user/register", data);
};
// 用户登录
var login = function login(data) {
    return _post("/user/login", data);
};

//查询中奖者名单


//查询当前轮次


// 比分投票

// 晋级球队投票


// 获取比赛列表


// 获取小组赛球队列表

var vue = new Vue({
    el: '#app',
    data: {
        status: 1,
        telephone: '',
        password: '',
        yzm: '',
        rtelephone: '',
        rpassword: '',
        ragainpassword: '',
        ryzm: '',
        logincount: 0, //登录出现三次错误,需要输入验证码
        yzmimg: ''
    },
    mounted: function mounted() {
        this.yzmimg = proxypath + '/getVerificationCode';
    },

    methods: {
        changestatus: function changestatus(index) {
            this.status = index;
            this.changeYzm();
        },
        changeYzm: function changeYzm() {
            this.yzmimg = proxypath + '/getVerificationCode?random=' + Math.random();
        },
        login: function login$$1() {
            var _this = this;

            // 登录操作

            // 验证
            if (!GB.valid.checkTelephone(this.telephone)) {
                return false;
            }
            if (!GB.valid.checkPassword(this.password)) {
                return false;
            }
            if (this.logincount > 2) {
                //次数大于2 需要输入验证码

                if (!GB.valid.checkYzm(this.yzm)) {
                    return false;
                }
            }
            var data = {
                phone: this.telephone,
                password: this.password,
                verificationCode: this.yzm
            };
            login(data).then(function (res) {
                if (res.status == 0) {
                    // 登录成功
                    GB.cookie.addCookie('telephone', data.phone);
                    // 调到主页面
                    location.href = htmlbasePath + '/index.html';
                } else {
                    _this.logincount++;
                    if (res.msg) {
                        GB.utils.htoast(res.msg);
                    }
                }
            });
        },
        register: function register$$1() {
            //注册操作

            // 验证
            if (!GB.valid.checkTelephone(this.rtelephone)) {
                return false;
            }
            if (!GB.valid.checkPassword(this.rpassword)) {
                return false;
            }
            if (this.rpassword != this.ragainpassword) {
                GB.utils.htoast('两次输入的密码不一致');
                return;
            }
            if (!GB.valid.checkYzm(this.ryzm)) {
                return false;
            }
            var data = {
                phone: this.rtelephone,
                password: this.rpassword,
                verificationCode: this.ryzm
            };
            register(data).then(function (res) {
                if (res.status == 0) {
                    // 注册成功
                    GB.cookie.addCookie('telephone', data.phone);
                    // 调到主页面
                    location.href = htmlbasePath + '/index.html';
                } else {
                    if (res.msg) {
                        GB.utils.htoast(res.msg);
                    }
                }
            });
        }
    }
});

}());
