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


// 获取小组赛球队列表
var getTeamsFor32 = function getTeamsFor32(data) {
    return _post("team/getTeamsFor32", data);
};

var vue = new Vue({
	el: '#app',
	data: {
		isSelected: false,
		list: [],
		basePath: basePath,
		selectstatus: [{}, {}, {}, {}, {}, {}, {}, {}], // 对球队选择的状态
		groupCode: {
			'0': 'A',
			'1': 'B',
			'2': 'C',
			'3': 'D',
			'4': 'E',
			'5': 'F',
			'6': 'G',
			'7': 'H'
		},
		param: []
	},
	mounted: function mounted() {
		var _this = this;

		this.list = [{ "A": [{ "id": 33, "idList": null, "name": "德国", "group32": "A", "sortNo32": null, "isIn16": null, "isIn8": null, "isIn4": null, "isIn2": null, "imagePath": "/assets/img/team/germany.jpg", "isSelected": 1, "createTime": 1524752931000, "modifyTime": 1525007330000 }, { "id": 34, "idList": null, "name": "哥斯达黎加", "group32": "A", "sortNo32": null, "isIn16": null, "isIn8": null, "isIn4": null, "isIn2": null, "imagePath": "/assets/img/team/costarica.jpg", "isSelected": 1, "createTime": 1524752931000, "modifyTime": 1524985333000 }, { "id": 35, "idList": null, "name": "波 兰", "group32": "A", "sortNo32": null, "isIn16": null, "isIn8": null, "isIn4": null, "isIn2": null, "imagePath": "/assets/img/team/poland.jpg", "isSelected": 0, "createTime": 1524752931000, "modifyTime": 1524752931000 }, { "id": 36, "idList": null, "name": "厄瓜多尔", "group32": "A", "sortNo32": null, "isIn16": null, "isIn8": null, "isIn4": null, "isIn2": null, "imagePath": "/assets/img/team/ecuador.jpg", "isSelected": 0, "createTime": 1524752931000, "modifyTime": 1524752931000 }] }, { "B": [{ "id": 37, "idList": null, "name": "英格兰", "group32": "B", "sortNo32": null, "isIn16": null, "isIn8": null, "isIn4": null, "isIn2": null, "imagePath": "/assets/img/team/england.jpg", "isSelected": 1, "createTime": 1524752931000, "modifyTime": 1524987156000 }, { "id": 38, "idList": null, "name": "巴拉圭", "group32": "B", "sortNo32": null, "isIn16": null, "isIn8": null, "isIn4": null, "isIn2": null, "imagePath": "/assets/img/team/paraguay.jpg", "isSelected": 1, "createTime": 1524752931000, "modifyTime": 1524987156000 }, { "id": 39, "idList": null, "name": "特立尼达和多巴哥", "group32": "B", "sortNo32": null, "isIn16": null, "isIn8": null, "isIn4": null, "isIn2": null, "imagePath": "/assets/img/team/telinida.jpg", "isSelected": 0, "createTime": 1524752931000, "modifyTime": 1524752931000 }, { "id": 40, "idList": null, "name": "瑞 典", "group32": "B", "sortNo32": null, "isIn16": null, "isIn8": null, "isIn4": null, "isIn2": null, "imagePath": "/assets/img/team/sweden.jpg", "isSelected": 0, "createTime": 1524752931000, "modifyTime": 1524985333000 }] }, { "C": [{ "id": 41, "idList": null, "name": "阿根廷", "group32": "C", "sortNo32": null, "isIn16": null, "isIn8": null, "isIn4": null, "isIn2": null, "imagePath": "/assets/img/team/argentina.jpg", "isSelected": 1, "createTime": 1524752931000, "modifyTime": 1525006039000 }, { "id": 42, "idList": null, "name": "科特迪瓦", "group32": "C", "sortNo32": null, "isIn16": null, "isIn8": null, "isIn4": null, "isIn2": null, "imagePath": "/assets/img/team/ketediwa.jpg", "isSelected": 1, "createTime": 1524752931000, "modifyTime": 1524752931000 }, { "id": 43, "idList": null, "name": "塞 黑", "group32": "C", "sortNo32": null, "isIn16": null, "isIn8": null, "isIn4": null, "isIn2": null, "imagePath": "/assets/img/team/saihei.jpg", "isSelected": 0, "createTime": 1524752931000, "modifyTime": 1524752931000 }, { "id": 44, "idList": null, "name": "荷 兰", "group32": "C", "sortNo32": null, "isIn16": null, "isIn8": null, "isIn4": null, "isIn2": null, "imagePath": "/assets/img/team/netherlands.jpg", "isSelected": 0, "createTime": 1524752931000, "modifyTime": 1524984610000 }] }, { "D": [{ "id": 45, "idList": null, "name": "墨西哥", "group32": "D", "sortNo32": null, "isIn16": null, "isIn8": null, "isIn4": null, "isIn2": null, "imagePath": "/assets/img/team/mexico.jpg", "isSelected": 1, "createTime": 1524752931000, "modifyTime": 1524987156000 }, { "id": 46, "idList": null, "name": "伊 朗", "group32": "D", "sortNo32": null, "isIn16": null, "isIn8": null, "isIn4": null, "isIn2": null, "imagePath": "/assets/img/team/iran.jpg", "isSelected": 1, "createTime": 1524752931000, "modifyTime": 1524752931000 }, { "id": 47, "idList": null, "name": "安哥拉", "group32": "D", "sortNo32": null, "isIn16": null, "isIn8": null, "isIn4": null, "isIn2": null, "imagePath": "/assets/img/team/densinigra_soil.jpg", "isSelected": 0, "createTime": 1524752931000, "modifyTime": 1524752931000 }, { "id": 48, "idList": null, "name": "葡萄牙", "group32": "D", "sortNo32": null, "isIn16": null, "isIn8": null, "isIn4": null, "isIn2": null, "imagePath": "/assets/img/team/portugal.jpg", "isSelected": 0, "createTime": 1524752931000, "modifyTime": 1524985333000 }] }, { "E": [{ "id": 49, "idList": null, "name": "意大利", "group32": "E", "sortNo32": null, "isIn16": null, "isIn8": null, "isIn4": null, "isIn2": null, "imagePath": "/assets/img/team/italy.jpg", "isSelected": 1, "createTime": 1524752931000, "modifyTime": 1524987156000 }, { "id": 50, "idList": null, "name": "加 纳", "group32": "E", "sortNo32": null, "isIn16": null, "isIn8": null, "isIn4": null, "isIn2": null, "imagePath": "/assets/img/team/ghana.jpg", "isSelected": 1, "createTime": 1524752931000, "modifyTime": 1524752931000 }, { "id": 51, "idList": null, "name": "美 国", "group32": "E", "sortNo32": null, "isIn16": null, "isIn8": null, "isIn4": null, "isIn2": null, "imagePath": "/assets/img/team/america.jpg", "isSelected": 0, "createTime": 1524752931000, "modifyTime": 1524985333000 }, { "id": 52, "idList": null, "name": "捷 克", "group32": "E", "sortNo32": null, "isIn16": null, "isIn8": null, "isIn4": null, "isIn2": null, "imagePath": "/assets/img/team/czech.jpg", "isSelected": 0, "createTime": 1524752931000, "modifyTime": 1524752931000 }] }, { "F": [{ "id": 53, "idList": null, "name": "巴西", "group32": "F", "sortNo32": null, "isIn16": null, "isIn8": null, "isIn4": null, "isIn2": null, "imagePath": "/assets/img/team/brazil.jpg", "isSelected": 1, "createTime": 1524752931000, "modifyTime": 1525007330000 }, { "id": 54, "idList": null, "name": "克罗地亚", "group32": "F", "sortNo32": null, "isIn16": null, "isIn8": null, "isIn4": null, "isIn2": null, "imagePath": "/assets/img/team/croatia.jpg", "isSelected": 0, "createTime": 1524752931000, "modifyTime": 1524984951000 }, { "id": 55, "idList": null, "name": "澳大利亚", "group32": "F", "sortNo32": null, "isIn16": null, "isIn8": null, "isIn4": null, "isIn2": null, "imagePath": "/assets/img/team/australia.jpg", "isSelected": 0, "createTime": 1524752931000, "modifyTime": 1524752931000 }, { "id": 56, "idList": null, "name": "日 本", "group32": "F", "sortNo32": null, "isIn16": null, "isIn8": null, "isIn4": null, "isIn2": null, "imagePath": "/assets/img/team/japan.jpg", "isSelected": 0, "createTime": 1524752931000, "modifyTime": 1524752931000 }] }, { "G": [{ "id": 57, "idList": null, "name": "法 国", "group32": "G", "sortNo32": null, "isIn16": null, "isIn8": null, "isIn4": null, "isIn2": null, "imagePath": "/assets/img/team/france.jpg", "isSelected": 0, "createTime": 1524752931000, "modifyTime": 1525006039000 }, { "id": 58, "idList": null, "name": "瑞 士", "group32": "G", "sortNo32": null, "isIn16": null, "isIn8": null, "isIn4": null, "isIn2": null, "imagePath": "/assets/img/team/switzerland.jpg", "isSelected": 0, "createTime": 1524752931000, "modifyTime": 1524985333000 }, { "id": 59, "idList": null, "name": "韩 国", "group32": "G", "sortNo32": null, "isIn16": null, "isIn8": null, "isIn4": null, "isIn2": null, "imagePath": "/assets/img/team/korea.jpg", "isSelected": 0, "createTime": 1524752931000, "modifyTime": 1524752931000 }, { "id": 60, "idList": null, "name": "多哥", "group32": "G", "sortNo32": null, "isIn16": null, "isIn8": null, "isIn4": null, "isIn2": null, "imagePath": "/assets/img/team/togo.jpg", "isSelected": 0, "createTime": 1524752931000, "modifyTime": 1524752931000 }] }, { "H": [{ "id": 61, "idList": null, "name": "西班牙", "group32": "H", "sortNo32": null, "isIn16": null, "isIn8": null, "isIn4": null, "isIn2": null, "imagePath": "/assets/img/team/spain.jpg", "isSelected": 0, "createTime": 1524752931000, "modifyTime": 1524985333000 }, { "id": 62, "idList": null, "name": "乌克兰", "group32": "H", "sortNo32": null, "isIn16": null, "isIn8": null, "isIn4": null, "isIn2": null, "imagePath": "/assets/img/team/ukraine.jpg", "isSelected": 0, "createTime": 1524752931000, "modifyTime": 1524985333000 }, { "id": 63, "idList": null, "name": "突尼斯", "group32": "H", "sortNo32": null, "isIn16": null, "isIn8": null, "isIn4": null, "isIn2": null, "imagePath": "/assets/img/team/tunis.jpg", "isSelected": 0, "createTime": 1524752931000, "modifyTime": 1524752931000 }, { "id": 64, "idList": null, "name": "沙 特", "group32": "H", "sortNo32": null, "isIn16": null, "isIn8": null, "isIn4": null, "isIn2": null, "imagePath": "/assets/img/team/saudi_arabia.jpg", "isSelected": 0, "createTime": 1524752931000, "modifyTime": 1524752931000 }] }];
		getTeamsFor32().then(function (res) {
			if (res.status == 0) {
				//this.isSelected = res.data.isSelected || false;
				_this.list = res.data.list || [];
			} else {
				if (res.msg) {
					GB.utils.htoast(res.msg);
				}
			}
		});
	},

	methods: {
		selectteam: function selectteam(index, groupcode, id) {
			//对球队进行选择
			// 至少选出8支球队
			if (this.selectstatus[index][id]) {
				//如果存在值 在原有值上进行处理
				var obj = $.extend({}, this.selectstatus[index]);
				if (obj[id] == 1) {
					obj[id] = 0;
				} else {
					obj[id] = 1;
				}
				this.$set(this.selectstatus, index, obj);
				return;
			} else {

				//判断一个组内最多选中二支球队
				var selectedobj = this.selectstatus[index]; // 一个组内的选择情况
				var count = 0;
				for (var key in selectedobj) {
					if (selectedobj[key]) {
						count++;
					}
				}
				if (count == 2) {
					GB.utils.htoast('一个组内最多选择两支球队');
					return;
				}
				var obj1 = $.extend({}, this.selectstatus[index]);
				obj1[id] = 1;
				//this.selectstatus[index] = obj1;
				this.$set(this.selectstatus, index, obj1);
				return;
			}
		},
		getParam: function getParam() {
			var _this2 = this;

			// 获取提交时的参数
			var arr = [];
			this.selectstatus.forEach(function (item, index) {
				var o = {};
				for (var v in item) {
					if (item[v]) {
						o = {
							roundsCode: 1,
							groupCode: _this2.groupCode[index],
							teamId: v
						};

						arr.push(o);
					}
				}
			});

			return arr;
		},
		submit: function submit() {
			//提交选择
			var json = this.getParam();
			if (json.length < 8) {
				GB.utils.htoast("请至少选择8支球队");
				return;
			}
			var param = {
				roundsCode: 1,
				jsonStr: JSON.stringify(json)
			};
			votePromotion(param).then(function (res) {
				if (res.status == 0) {
					location.href = htmlbasePath + '/pages/cupdraw/success.html';
				} else {
					if (res.msg) {
						GB.utils.htoast(res.msg);
					}
				}
			});
		},

		goback: function goback() {}
	}
});

}());

//# sourceMappingURL=game16.main.js.map

//# sourceMappingURL=game16.main.js.map
