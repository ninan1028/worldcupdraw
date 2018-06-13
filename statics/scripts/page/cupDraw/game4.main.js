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

// 用户登录


//查询中奖者名单


//查询当前轮次


// 比分投票

// 晋级球队投票
var votePromotion = function votePromotion(data) {
    return _post("vote/votePromotion", data);
};

// 获取比赛列表
var getMatch = function getMatch(data) {
    return _post("match/getMatch", data);
};

// 获取小组赛球队列表


// 获取用户参与的人数

//var testlist=[{"id":117,"matchCode":"i","roundCode":"3","matchTime":"2018-06-28 15:00:00.0","matchAdress":"iii","teamA":33,"teamB":45,"teamAName":"德国","teamBName":"墨西哥","selectedTeam":null,"score":null,"userId":null,"createTime":1524987156000,"modifyTime":1524987156000},{"id":118,"matchCode":"j","roundCode":"3","matchTime":"2018-06-29 15:00:00.0","matchAdress":"jjj","teamA":41,"teamB":37,"teamAName":"阿根廷","teamBName":"英格兰","selectedTeam":null,"score":null,"userId":null,"createTime":1524987156000,"modifyTime":1524987156000},{"id":119,"matchCode":"k","roundCode":"3","matchTime":"2018-06-30 18:00:00.0","matchAdress":"kkk","teamA":53,"teamB":49,"teamAName":"巴西","teamBName":"意大利","selectedTeam":null,"score":null,"userId":null,"createTime":1524987156000,"modifyTime":1524987156000},{"id":120,"matchCode":"l","roundCode":"3","matchTime":"2018-07-01 15:00:00.0","matchAdress":"lll","teamA":57,"teamB":38,"teamAName":"法 国","teamBName":"巴拉圭","selectedTeam":null,"score":null,"userId":null,"createTime":1524987156000,"modifyTime":1524987156000}];
var testlist = [];
var vue = new Vue({
	el: '#app',
	data: {
		isSelected: false,
		list: [],
		teamstatus: [{}, {}, {}, {}],
		selectdata: []
	},
	mounted: function mounted() {
		var _this = this;

		var data = {
			roundCode: 3
		};
		getMatch(data).then(function (res) {
			if (res.status == 0) {
				var list = res.data.list || [];
				_this.list = _this.formatList(list);
				//this.isSelected=res.data.isSelected;
			} else {
				if (res.msg) {
					GB.utils.htoast(res.msg);
				}
			}
		});

		//this.list=this.formatList();
	},

	methods: {
		formatList: function formatList(list) {
			var list = list || testlist;
			list.forEach(function (item) {
				item.matchTime = item.matchTime.split('.')[0];
				var time = new Date(item.matchTime.replace(/-/g, '/'));
				var data = time.getMonth() + 1 + '月' + time.getDate() + '日';
				var getMinutes = time.getMinutes() ? time.getMinutes() : '00';
				var hour = time.getHours() + ':' + getMinutes;
				var newteamAImage = basePath + item.teamAImage;
				var newteamBImage = basePath + item.teamBImage;
				item.data = data;
				item.hour = hour;
				item.newteamAImage = newteamAImage;
				item.newteamBImage = newteamBImage;
			});
			return list;
		},
		tap: function tap(index, teamid) {
			var groupCode = this.list[index].matchCode;
			//对原有数据进行判断是否选中了
			var statusteamId = this.teamstatus[index].teamId;
			if (statusteamId == teamid) {
				this.$set(this.teamstatus, index, { teamId: '' });
			} else {
				this.$set(this.teamstatus, index, { teamId: teamid });
			}
			var flag = true;
			this.selectdata.forEach(function (item) {
				if (item.groupCode == groupCode) {
					//有选中的组
					if (item.teamId == teamid) {
						item.teamId = '';
					} else {
						item.teamId = teamid;
					}
					flag = false;
					return;
				}
			});
			//拼接选中的数据
			if (flag) {
				var d = {
					roundsCode: '3',
					groupCode: groupCode,
					teamId: teamid,
					matchId: this.list[index]['id']
				};
				this.selectdata.push(d);
			}
			this.selectdata = this.selectdata.filter(function (item) {
				return !!item.teamId;
			});
		},
		submit: function submit() {
			// 提交
			if (this.selectdata.length < 3) {
				GB.utils.htoast("请至少选择3支出现球队");
				return;
			}

			var arr = this.selectdata.map(function (item) {
				return item;
			});
			var data = {
				roundsCode: 3,
				jsonStr: JSON.stringify(arr)
			};
			votePromotion(data).then(function (res) {
				if (res.status == 0) {
					location.href = htmlbasePath + '/pages/cupdraw/success.html';
				} else {
					if (res.msg) {
						GB.utils.htoast(res.msg);
					}
				}
			});
		},
		goback: function goback() {
			history.go(-1);
		}
	}
});

}());
