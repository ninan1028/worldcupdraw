!function(){"use strict";function t(t,n,e){var n=n||{},t=t||"",e=e||"post";if(!t&&"string"!=typeof t)return void console.log("传入的url有问题");"/"!=t.charAt(0)&&(t="/"+t);var o={type:e,url:proxypath+t,data:n};return new u(function(t,n){GB.ajax2(o).done(function(n){t(n)}).fail(function(t){n(t)})})}var n="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},o=function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")},r=function(){function t(t,n){for(var e=0;e<n.length;e++){var o=n[e];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(n,e,o){return e&&t(n.prototype,e),o&&t(n,o),n}}(),i=function(t,n){return n={exports:{}},t(n,n.exports),n.exports}(function(t,o){!function(t){function n(t){return"[object Array]"===Object.prototype.toString.call(t)}function r(){for(var t=0;t<k.length;t++)k[t][0](k[t][1]);k=[],v=!1}function i(t,n){k.push([t,n]),v||(v=!0,x(r,0))}function u(t,n){function e(t){f(n,t)}function o(t){l(n,t)}try{t(e,o)}catch(t){o(t)}}function c(t){var n=t.owner,e=n.state_,o=n.data_,r=t[e],i=t.then;if("function"==typeof r){e=_;try{o=r(o)}catch(t){l(i,t)}}a(i,o)||(e===_&&f(i,o),e===P&&l(i,o))}function a(t,n){var o;try{if(t===n)throw new TypeError("A promises callback cannot return that same promise.");if(n&&("function"==typeof n||"object"===(void 0===n?"undefined":e(n)))){var r=n.then;if("function"==typeof r)return r.call(n,function(e){o||(o=!0,n!==e?f(t,e):s(t,e))},function(n){o||(o=!0,l(t,n))}),!0}}catch(n){return o||l(t,n),!0}return!1}function f(t,n){t!==n&&a(t,n)||s(t,n)}function s(t,n){t.state_===g&&(t.state_=b,t.data_=n,i(p,t))}function l(t,n){t.state_===g&&(t.state_=b,t.data_=n,i(d,t))}function h(t){var n=t.then_;t.then_=void 0;for(var e=0;e<n.length;e++)c(n[e])}function p(t){t.state_=_,h(t)}function d(t){t.state_=P,h(t)}function y(t){if("function"!=typeof t)throw new TypeError("Promise constructor takes a function argument");if(this instanceof y==!1)throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");this.then_=[],u(t,this)}var m=t.Promise,w=m&&"resolve"in m&&"reject"in m&&"all"in m&&"race"in m&&function(){var t;return new m(function(n){t=n}),"function"==typeof t}();o?(o.Promise=w?m:y,o.Polyfill=y):w||(t.Promise=y);var v,g="pending",b="sealed",_="fulfilled",P="rejected",j=function(){},x="undefined"!=typeof setImmediate?setImmediate:setTimeout,k=[];y.prototype={constructor:y,state_:g,then_:null,data_:void 0,then:function(t,n){var e={owner:this,then:new this.constructor(j),fulfilled:t,rejected:n};return this.state_===_||this.state_===P?i(c,e):this.then_.push(e),e.then},catch:function(t){return this.then(null,t)}},y.all=function(t){var e=this;if(!n(t))throw new TypeError("You must pass an array to Promise.all().");return new e(function(n,e){for(var o,r=[],i=0,u=0;u<t.length;u++)o=t[u],o&&"function"==typeof o.then?o.then(function(t){return i++,function(e){r[t]=e,--i||n(r)}}(u),e):r[u]=o;i||n(r)})},y.race=function(t){var e=this;if(!n(t))throw new TypeError("You must pass an array to Promise.race().");return new e(function(n,e){for(var o,r=0;r<t.length;r++)o=t[r],o&&"function"==typeof o.then?o.then(n,e):n(o)})},y.resolve=function(t){var n=this;return t&&"object"===(void 0===t?"undefined":e(t))&&t.constructor===n?t:new n(function(n){n(t)})},y.reject=function(t){return new this(function(n,e){e(t)})}}("undefined"!=typeof window?window:void 0!==n?n:"undefined"!=typeof self?self:n)}),u=i.Promise,c=function(n,e){return t(n,e,"post")},a=function(n,e){return t(n,e,"get")},f=function(){function t(n){if(o(this,t),!n||"string"!=typeof n)throw new Error("prefix is undefine");"/"!=n.charAt(n.length-1)&&(n+="/"),this.prefix=n,this.queryFilter=function(t){return t},this.exceptFilter=function(t){return u.reject(t)}}return r(t,[{key:"get",value:function(t,n){return a(this.prefix+t,n).then(this.queryFilter).catch(this.exceptFilter)}},{key:"post",value:function(t,n){return c(this.prefix+t,n).then(this.queryFilter).catch(this.exceptFilter)}}]),t}(),s=function(){return!!GB.cookie.getCookie("telephone")},l=new f("/activity"),h=function(){return l.post("rounds/getCurrentRounds")};new Vue({el:"#app",data:{code:0,link:{1:"/pages/cupdraw/game16.html",2:"/pages/cupdraw/game8.html",3:"/pages/cupdraw/game4.html",4:"/pages/cupdraw/game2.html",5:"/pages/cupdraw/game1.html"}},mounted:function(){var t=this;if(!s())return void(location.href=htmlbasePath+"/pages/cupdraw/login.html");h().then(function(n){0==n.status?t.code=n.data.code||0:n.msg&&GB.utils.htoast(msg)})},methods:{linkdetail:function(t){t==this.code&&(location.href=htmlbasePath+this.link[t])}}})}();