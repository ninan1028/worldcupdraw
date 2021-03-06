/* Zepto v1.1.6 - zepto event ajax form ie - zeptojs.com/license */
var Zepto=function(){function L(t){return null==t?String(t):j[S.call(t)]||"object"}function Z(t){return"function"==L(t)}function _(t){return null!=t&&t==t.window}function $(t){return null!=t&&t.nodeType==t.DOCUMENT_NODE}function D(t){return"object"==L(t)}function M(t){return D(t)&&!_(t)&&Object.getPrototypeOf(t)==Object.prototype}function R(t){return"number"==typeof t.length}function k(t){return s.call(t,function(t){return null!=t})}function z(t){return t.length>0?n.fn.concat.apply([],t):t}function F(t){return t.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function q(t){return t in f?f[t]:f[t]=new RegExp("(^|\\s)"+t+"(\\s|$)")}function H(t,e){return"number"!=typeof e||c[F(t)]?e:e+"px"}function I(t){var e,n;return u[t]||(e=a.createElement(t),a.body.appendChild(e),n=getComputedStyle(e,"").getPropertyValue("display"),e.parentNode.removeChild(e),"none"==n&&(n="block"),u[t]=n),u[t]}function V(t){return"children"in t?o.call(t.children):n.map(t.childNodes,function(t){return 1==t.nodeType?t:void 0})}function B(n,i,r){for(e in i)r&&(M(i[e])||A(i[e]))?(M(i[e])&&!M(n[e])&&(n[e]={}),A(i[e])&&!A(n[e])&&(n[e]=[]),B(n[e],i[e],r)):i[e]!==t&&(n[e]=i[e])}function U(t,e){return null==e?n(t):n(t).filter(e)}function J(t,e,n,i){return Z(e)?e.call(t,n,i):e}function X(t,e,n){null==n?t.removeAttribute(e):t.setAttribute(e,n)}function W(e,n){var i=e.className||"",r=i&&i.baseVal!==t;return n===t?r?i.baseVal:i:void(r?i.baseVal=n:e.className=n)}function Y(t){try{return t?"true"==t||("false"==t?!1:"null"==t?null:+t+""==t?+t:/^[\[\{]/.test(t)?n.parseJSON(t):t):t}catch(e){return t}}function G(t,e){e(t);for(var n=0,i=t.childNodes.length;i>n;n++)G(t.childNodes[n],e)}var t,e,n,i,C,N,r=[],o=r.slice,s=r.filter,a=window.document,u={},f={},c={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},l=/^\s*<(\w+|!)[^>]*>/,h=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,p=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,d=/^(?:body|html)$/i,m=/([A-Z])/g,g=["val","css","html","text","data","width","height","offset"],v=["after","prepend","before","append"],y=a.createElement("table"),x=a.createElement("tr"),b={tr:a.createElement("tbody"),tbody:y,thead:y,tfoot:y,td:x,th:x,"*":a.createElement("div")},w=/complete|loaded|interactive/,E=/^[\w-]*$/,j={},S=j.toString,T={},O=a.createElement("div"),P={tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},A=Array.isArray||function(t){return t instanceof Array};return T.matches=function(t,e){if(!e||!t||1!==t.nodeType)return!1;var n=t.webkitMatchesSelector||t.mozMatchesSelector||t.oMatchesSelector||t.matchesSelector;if(n)return n.call(t,e);var i,r=t.parentNode,o=!r;return o&&(r=O).appendChild(t),i=~T.qsa(r,e).indexOf(t),o&&O.removeChild(t),i},C=function(t){return t.replace(/-+(.)?/g,function(t,e){return e?e.toUpperCase():""})},N=function(t){return s.call(t,function(e,n){return t.indexOf(e)==n})},T.fragment=function(e,i,r){var s,u,f;return h.test(e)&&(s=n(a.createElement(RegExp.$1))),s||(e.replace&&(e=e.replace(p,"<$1></$2>")),i===t&&(i=l.test(e)&&RegExp.$1),i in b||(i="*"),f=b[i],f.innerHTML=""+e,s=n.each(o.call(f.childNodes),function(){f.removeChild(this)})),M(r)&&(u=n(s),n.each(r,function(t,e){g.indexOf(t)>-1?u[t](e):u.attr(t,e)})),s},T.Z=function(t,e){return t=t||[],t.__proto__=n.fn,t.selector=e||"",t},T.isZ=function(t){return t instanceof T.Z},T.init=function(e,i){var r;if(!e)return T.Z();if("string"==typeof e)if(e=e.trim(),"<"==e[0]&&l.test(e))r=T.fragment(e,RegExp.$1,i),e=null;else{if(i!==t)return n(i).find(e);r=T.qsa(a,e)}else{if(Z(e))return n(a).ready(e);if(T.isZ(e))return e;if(A(e))r=k(e);else if(D(e))r=[e],e=null;else if(l.test(e))r=T.fragment(e.trim(),RegExp.$1,i),e=null;else{if(i!==t)return n(i).find(e);r=T.qsa(a,e)}}return T.Z(r,e)},n=function(t,e){return T.init(t,e)},n.extend=function(t){var e,n=o.call(arguments,1);return"boolean"==typeof t&&(e=t,t=n.shift()),n.forEach(function(n){B(t,n,e)}),t},T.qsa=function(t,e){var n,i="#"==e[0],r=!i&&"."==e[0],s=i||r?e.slice(1):e,a=E.test(s);return $(t)&&a&&i?(n=t.getElementById(s))?[n]:[]:1!==t.nodeType&&9!==t.nodeType?[]:o.call(a&&!i?r?t.getElementsByClassName(s):t.getElementsByTagName(e):t.querySelectorAll(e))},n.contains=a.documentElement.contains?function(t,e){return t!==e&&t.contains(e)}:function(t,e){for(;e&&(e=e.parentNode);)if(e===t)return!0;return!1},n.type=L,n.isFunction=Z,n.isWindow=_,n.isArray=A,n.isPlainObject=M,n.isEmptyObject=function(t){var e;for(e in t)return!1;return!0},n.inArray=function(t,e,n){return r.indexOf.call(e,t,n)},n.camelCase=C,n.trim=function(t){return null==t?"":String.prototype.trim.call(t)},n.uuid=0,n.support={},n.expr={},n.map=function(t,e){var n,r,o,i=[];if(R(t))for(r=0;r<t.length;r++)n=e(t[r],r),null!=n&&i.push(n);else for(o in t)n=e(t[o],o),null!=n&&i.push(n);return z(i)},n.each=function(t,e){var n,i;if(R(t)){for(n=0;n<t.length;n++)if(e.call(t[n],n,t[n])===!1)return t}else for(i in t)if(e.call(t[i],i,t[i])===!1)return t;return t},n.grep=function(t,e){return s.call(t,e)},window.JSON&&(n.parseJSON=JSON.parse),n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(t,e){j["[object "+e+"]"]=e.toLowerCase()}),n.fn={forEach:r.forEach,reduce:r.reduce,push:r.push,sort:r.sort,indexOf:r.indexOf,concat:r.concat,map:function(t){return n(n.map(this,function(e,n){return t.call(e,n,e)}))},slice:function(){return n(o.apply(this,arguments))},ready:function(t){return w.test(a.readyState)&&a.body?t(n):a.addEventListener("DOMContentLoaded",function(){t(n)},!1),this},get:function(e){return e===t?o.call(this):this[e>=0?e:e+this.length]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){null!=this.parentNode&&this.parentNode.removeChild(this)})},each:function(t){return r.every.call(this,function(e,n){return t.call(e,n,e)!==!1}),this},filter:function(t){return Z(t)?this.not(this.not(t)):n(s.call(this,function(e){return T.matches(e,t)}))},add:function(t,e){return n(N(this.concat(n(t,e))))},is:function(t){return this.length>0&&T.matches(this[0],t)},not:function(e){var i=[];if(Z(e)&&e.call!==t)this.each(function(t){e.call(this,t)||i.push(this)});else{var r="string"==typeof e?this.filter(e):R(e)&&Z(e.item)?o.call(e):n(e);this.forEach(function(t){r.indexOf(t)<0&&i.push(t)})}return n(i)},has:function(t){return this.filter(function(){return D(t)?n.contains(this,t):n(this).find(t).size()})},eq:function(t){return-1===t?this.slice(t):this.slice(t,+t+1)},first:function(){var t=this[0];return t&&!D(t)?t:n(t)},last:function(){var t=this[this.length-1];return t&&!D(t)?t:n(t)},find:function(t){var e,i=this;return e=t?"object"==typeof t?n(t).filter(function(){var t=this;return r.some.call(i,function(e){return n.contains(e,t)})}):1==this.length?n(T.qsa(this[0],t)):this.map(function(){return T.qsa(this,t)}):n()},closest:function(t,e){var i=this[0],r=!1;for("object"==typeof t&&(r=n(t));i&&!(r?r.indexOf(i)>=0:T.matches(i,t));)i=i!==e&&!$(i)&&i.parentNode;return n(i)},parents:function(t){for(var e=[],i=this;i.length>0;)i=n.map(i,function(t){return(t=t.parentNode)&&!$(t)&&e.indexOf(t)<0?(e.push(t),t):void 0});return U(e,t)},parent:function(t){return U(N(this.pluck("parentNode")),t)},children:function(t){return U(this.map(function(){return V(this)}),t)},contents:function(){return this.map(function(){return o.call(this.childNodes)})},siblings:function(t){return U(this.map(function(t,e){return s.call(V(e.parentNode),function(t){return t!==e})}),t)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(t){return n.map(this,function(e){return e[t]})},show:function(){return this.each(function(){"none"==this.style.display&&(this.style.display=""),"none"==getComputedStyle(this,"").getPropertyValue("display")&&(this.style.display=I(this.nodeName))})},replaceWith:function(t){return this.before(t).remove()},wrap:function(t){var e=Z(t);if(this[0]&&!e)var i=n(t).get(0),r=i.parentNode||this.length>1;return this.each(function(o){n(this).wrapAll(e?t.call(this,o):r?i.cloneNode(!0):i)})},wrapAll:function(t){if(this[0]){n(this[0]).before(t=n(t));for(var e;(e=t.children()).length;)t=e.first();n(t).append(this)}return this},wrapInner:function(t){var e=Z(t);return this.each(function(i){var r=n(this),o=r.contents(),s=e?t.call(this,i):t;o.length?o.wrapAll(s):r.append(s)})},unwrap:function(){return this.parent().each(function(){n(this).replaceWith(n(this).children())}),this},clone:function(){return this.map(function(){return this.cloneNode(!0)})},hide:function(){return this.css("display","none")},toggle:function(e){return this.each(function(){var i=n(this);(e===t?"none"==i.css("display"):e)?i.show():i.hide()})},prev:function(t){return n(this.pluck("previousElementSibling")).filter(t||"*")},next:function(t){return n(this.pluck("nextElementSibling")).filter(t||"*")},html:function(t){return 0 in arguments?this.each(function(e){var i=this.innerHTML;n(this).empty().append(J(this,t,e,i))}):0 in this?this[0].innerHTML:null},text:function(t){return 0 in arguments?this.each(function(e){var n=J(this,t,e,this.textContent);this.textContent=null==n?"":""+n}):0 in this?this[0].textContent:null},attr:function(n,i){var r;return"string"!=typeof n||1 in arguments?this.each(function(t){if(1===this.nodeType)if(D(n))for(e in n)X(this,e,n[e]);else X(this,n,J(this,i,t,this.getAttribute(n)))}):this.length&&1===this[0].nodeType?!(r=this[0].getAttribute(n))&&n in this[0]?this[0][n]:r:t},removeAttr:function(t){return this.each(function(){1===this.nodeType&&t.split(" ").forEach(function(t){X(this,t)},this)})},prop:function(t,e){return t=P[t]||t,1 in arguments?this.each(function(n){this[t]=J(this,e,n,this[t])}):this[0]&&this[0][t]},data:function(e,n){var i="data-"+e.replace(m,"-$1").toLowerCase(),r=1 in arguments?this.attr(i,n):this.attr(i);return null!==r?Y(r):t},val:function(t){return 0 in arguments?this.each(function(e){this.value=J(this,t,e,this.value)}):this[0]&&(this[0].multiple?n(this[0]).find("option").filter(function(){return this.selected}).pluck("value"):this[0].value)},offset:function(t){if(t)return this.each(function(e){var i=n(this),r=J(this,t,e,i.offset()),o=i.offsetParent().offset(),s={top:r.top-o.top,left:r.left-o.left};"static"==i.css("position")&&(s.position="relative"),i.css(s)});if(!this.length)return null;var e=this[0].getBoundingClientRect();return{left:e.left+window.pageXOffset,top:e.top+window.pageYOffset,width:Math.round(e.width),height:Math.round(e.height)}},css:function(t,i){if(arguments.length<2){var r,o=this[0];if(!o)return;if(r=getComputedStyle(o,""),"string"==typeof t)return o.style[C(t)]||r.getPropertyValue(t);if(A(t)){var s={};return n.each(t,function(t,e){s[e]=o.style[C(e)]||r.getPropertyValue(e)}),s}}var a="";if("string"==L(t))i||0===i?a=F(t)+":"+H(t,i):this.each(function(){this.style.removeProperty(F(t))});else for(e in t)t[e]||0===t[e]?a+=F(e)+":"+H(e,t[e])+";":this.each(function(){this.style.removeProperty(F(e))});return this.each(function(){this.style.cssText+=";"+a})},index:function(t){return t?this.indexOf(n(t)[0]):this.parent().children().indexOf(this[0])},hasClass:function(t){return t?r.some.call(this,function(t){return this.test(W(t))},q(t)):!1},addClass:function(t){return t?this.each(function(e){if("className"in this){i=[];var r=W(this),o=J(this,t,e,r);o.split(/\s+/g).forEach(function(t){n(this).hasClass(t)||i.push(t)},this),i.length&&W(this,r+(r?" ":"")+i.join(" "))}}):this},removeClass:function(e){return this.each(function(n){if("className"in this){if(e===t)return W(this,"");i=W(this),J(this,e,n,i).split(/\s+/g).forEach(function(t){i=i.replace(q(t)," ")}),W(this,i.trim())}})},toggleClass:function(e,i){return e?this.each(function(r){var o=n(this),s=J(this,e,r,W(this));s.split(/\s+/g).forEach(function(e){(i===t?!o.hasClass(e):i)?o.addClass(e):o.removeClass(e)})}):this},scrollTop:function(e){if(this.length){var n="scrollTop"in this[0];return e===t?n?this[0].scrollTop:this[0].pageYOffset:this.each(n?function(){this.scrollTop=e}:function(){this.scrollTo(this.scrollX,e)})}},scrollLeft:function(e){if(this.length){var n="scrollLeft"in this[0];return e===t?n?this[0].scrollLeft:this[0].pageXOffset:this.each(n?function(){this.scrollLeft=e}:function(){this.scrollTo(e,this.scrollY)})}},position:function(){if(this.length){var t=this[0],e=this.offsetParent(),i=this.offset(),r=d.test(e[0].nodeName)?{top:0,left:0}:e.offset();return i.top-=parseFloat(n(t).css("margin-top"))||0,i.left-=parseFloat(n(t).css("margin-left"))||0,r.top+=parseFloat(n(e[0]).css("border-top-width"))||0,r.left+=parseFloat(n(e[0]).css("border-left-width"))||0,{top:i.top-r.top,left:i.left-r.left}}},offsetParent:function(){return this.map(function(){for(var t=this.offsetParent||a.body;t&&!d.test(t.nodeName)&&"static"==n(t).css("position");)t=t.offsetParent;return t})}},n.fn.detach=n.fn.remove,["width","height"].forEach(function(e){var i=e.replace(/./,function(t){return t[0].toUpperCase()});n.fn[e]=function(r){var o,s=this[0];return r===t?_(s)?s["inner"+i]:$(s)?s.documentElement["scroll"+i]:(o=this.offset())&&o[e]:this.each(function(t){s=n(this),s.css(e,J(this,r,t,s[e]()))})}}),v.forEach(function(t,e){var i=e%2;n.fn[t]=function(){var t,o,r=n.map(arguments,function(e){return t=L(e),"object"==t||"array"==t||null==e?e:T.fragment(e)}),s=this.length>1;return r.length<1?this:this.each(function(t,u){o=i?u:u.parentNode,u=0==e?u.nextSibling:1==e?u.firstChild:2==e?u:null;var f=n.contains(a.documentElement,o);r.forEach(function(t){if(s)t=t.cloneNode(!0);else if(!o)return n(t).remove();o.insertBefore(t,u),f&&G(t,function(t){null==t.nodeName||"SCRIPT"!==t.nodeName.toUpperCase()||t.type&&"text/javascript"!==t.type||t.src||window.eval.call(window,t.innerHTML)})})})},n.fn[i?t+"To":"insert"+(e?"Before":"After")]=function(e){return n(e)[t](this),this}}),T.Z.prototype=n.fn,T.uniq=N,T.deserializeValue=Y,n.zepto=T,n}();window.Zepto=Zepto,void 0===window.$&&(window.$=Zepto),function(t){function l(t){return t._zid||(t._zid=e++)}function h(t,e,n,i){if(e=p(e),e.ns)var r=d(e.ns);return(s[l(t)]||[]).filter(function(t){return!(!t||e.e&&t.e!=e.e||e.ns&&!r.test(t.ns)||n&&l(t.fn)!==l(n)||i&&t.sel!=i)})}function p(t){var e=(""+t).split(".");return{e:e[0],ns:e.slice(1).sort().join(" ")}}function d(t){return new RegExp("(?:^| )"+t.replace(" "," .* ?")+"(?: |$)")}function m(t,e){return t.del&&!u&&t.e in f||!!e}function g(t){return c[t]||u&&f[t]||t}function v(e,i,r,o,a,u,f){var h=l(e),d=s[h]||(s[h]=[]);i.split(/\s/).forEach(function(i){if("ready"==i)return t(document).ready(r);var s=p(i);s.fn=r,s.sel=a,s.e in c&&(r=function(e){var n=e.relatedTarget;return!n||n!==this&&!t.contains(this,n)?s.fn.apply(this,arguments):void 0}),s.del=u;var l=u||r;s.proxy=function(t){if(t=j(t),!t.isImmediatePropagationStopped()){t.data=o;var i=l.apply(e,t._args==n?[t]:[t].concat(t._args));return i===!1&&(t.preventDefault(),t.stopPropagation()),i}},s.i=d.length,d.push(s),"addEventListener"in e&&e.addEventListener(g(s.e),s.proxy,m(s,f))})}function y(t,e,n,i,r){var o=l(t);(e||"").split(/\s/).forEach(function(e){h(t,e,n,i).forEach(function(e){delete s[o][e.i],"removeEventListener"in t&&t.removeEventListener(g(e.e),e.proxy,m(e,r))})})}function j(e,i){return(i||!e.isDefaultPrevented)&&(i||(i=e),t.each(E,function(t,n){var r=i[t];e[t]=function(){return this[n]=x,r&&r.apply(i,arguments)},e[n]=b}),(i.defaultPrevented!==n?i.defaultPrevented:"returnValue"in i?i.returnValue===!1:i.getPreventDefault&&i.getPreventDefault())&&(e.isDefaultPrevented=x)),e}function S(t){var e,i={originalEvent:t};for(e in t)w.test(e)||t[e]===n||(i[e]=t[e]);return j(i,t)}var n,e=1,i=Array.prototype.slice,r=t.isFunction,o=function(t){return"string"==typeof t},s={},a={},u="onfocusin"in window,f={focus:"focusin",blur:"focusout"},c={mouseenter:"mouseover",mouseleave:"mouseout"};a.click=a.mousedown=a.mouseup=a.mousemove="MouseEvents",t.event={add:v,remove:y},t.proxy=function(e,n){var s=2 in arguments&&i.call(arguments,2);if(r(e)){var a=function(){return e.apply(n,s?s.concat(i.call(arguments)):arguments)};return a._zid=l(e),a}if(o(n))return s?(s.unshift(e[n],e),t.proxy.apply(null,s)):t.proxy(e[n],e);throw new TypeError("expected function")},t.fn.bind=function(t,e,n){return this.on(t,e,n)},t.fn.unbind=function(t,e){return this.off(t,e)},t.fn.one=function(t,e,n,i){return this.on(t,e,n,i,1)};var x=function(){return!0},b=function(){return!1},w=/^([A-Z]|returnValue$|layer[XY]$)/,E={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};t.fn.delegate=function(t,e,n){return this.on(e,t,n)},t.fn.undelegate=function(t,e,n){return this.off(e,t,n)},t.fn.live=function(e,n){return t(document.body).delegate(this.selector,e,n),this},t.fn.die=function(e,n){return t(document.body).undelegate(this.selector,e,n),this},t.fn.on=function(e,s,a,u,f){var c,l,h=this;return e&&!o(e)?(t.each(e,function(t,e){h.on(t,s,a,e,f)}),h):(o(s)||r(u)||u===!1||(u=a,a=s,s=n),(r(a)||a===!1)&&(u=a,a=n),u===!1&&(u=b),h.each(function(n,r){f&&(c=function(t){return y(r,t.type,u),u.apply(this,arguments)}),s&&(l=function(e){var n,o=t(e.target).closest(s,r).get(0);return o&&o!==r?(n=t.extend(S(e),{currentTarget:o,liveFired:r}),(c||u).apply(o,[n].concat(i.call(arguments,1)))):void 0}),v(r,e,u,a,s,l||c)}))},t.fn.off=function(e,i,s){var a=this;return e&&!o(e)?(t.each(e,function(t,e){a.off(t,i,e)}),a):(o(i)||r(s)||s===!1||(s=i,i=n),s===!1&&(s=b),a.each(function(){y(this,e,s,i)}))},t.fn.trigger=function(e,n){return e=o(e)||t.isPlainObject(e)?t.Event(e):j(e),e._args=n,this.each(function(){e.type in f&&"function"==typeof this[e.type]?this[e.type]():"dispatchEvent"in this?this.dispatchEvent(e):t(this).triggerHandler(e,n)})},t.fn.triggerHandler=function(e,n){var i,r;return this.each(function(s,a){i=S(o(e)?t.Event(e):e),i._args=n,i.target=a,t.each(h(a,e.type||e),function(t,e){return r=e.proxy(i),i.isImmediatePropagationStopped()?!1:void 0})}),r},"focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(e){t.fn[e]=function(t){return 0 in arguments?this.bind(e,t):this.trigger(e)}}),t.Event=function(t,e){o(t)||(e=t,t=e.type);var n=document.createEvent(a[t]||"Events"),i=!0;if(e)for(var r in e)"bubbles"==r?i=!!e[r]:n[r]=e[r];return n.initEvent(t,i,!0),j(n)}}(Zepto),function(t){function h(e,n,i){var r=t.Event(n);return t(e).trigger(r,i),!r.isDefaultPrevented()}function p(t,e,i,r){return t.global?h(e||n,i,r):void 0}function d(e){e.global&&0===t.active++&&p(e,null,"ajaxStart")}function m(e){e.global&&!--t.active&&p(e,null,"ajaxStop")}function g(t,e){var n=e.context;return e.beforeSend.call(n,t,e)===!1||p(e,n,"ajaxBeforeSend",[t,e])===!1?!1:void p(e,n,"ajaxSend",[t,e])}function v(t,e,n,i){var r=n.context,o="success";n.success.call(r,t,o,e),i&&i.resolveWith(r,[t,o,e]),p(n,r,"ajaxSuccess",[e,n,t]),x(o,e,n)}function y(t,e,n,i,r){var o=i.context;i.error.call(o,n,e,t),r&&r.rejectWith(o,[n,e,t]),p(i,o,"ajaxError",[n,i,t||e]),x(e,n,i)}function x(t,e,n){var i=n.context;n.complete.call(i,e,t),p(n,i,"ajaxComplete",[e,n]),m(n)}function b(){}function w(t){return t&&(t=t.split(";",2)[0]),t&&(t==f?"html":t==u?"json":s.test(t)?"script":a.test(t)&&"xml")||"text"}function E(t,e){return""==e?t:(t+"&"+e).replace(/[&?]{1,2}/,"?")}function j(e){e.processData&&e.data&&"string"!=t.type(e.data)&&(e.data=t.param(e.data,e.traditional)),!e.data||e.type&&"GET"!=e.type.toUpperCase()||(e.url=E(e.url,e.data),e.data=void 0)}function S(e,n,i,r){return t.isFunction(n)&&(r=i,i=n,n=void 0),t.isFunction(i)||(r=i,i=void 0),{url:e,data:n,success:i,dataType:r}}function C(e,n,i,r){var o,s=t.isArray(n),a=t.isPlainObject(n);t.each(n,function(n,u){o=t.type(u),r&&(n=i?r:r+"["+(a||"object"==o||"array"==o?n:"")+"]"),!r&&s?e.add(u.name,u.value):"array"==o||!i&&"object"==o?C(e,u,i,n):e.add(n,u)})}var i,r,e=0,n=window.document,o=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,s=/^(?:text|application)\/javascript/i,a=/^(?:text|application)\/xml/i,u="application/json",f="text/html",c=/^\s*$/,l=n.createElement("a");l.href=window.location.href,t.active=0,t.ajaxJSONP=function(i,r){if(!("type"in i))return t.ajax(i);var f,h,o=i.jsonpCallback,s=(t.isFunction(o)?o():o)||"jsonp"+ ++e,a=n.createElement("script"),u=window[s],c=function(e){t(a).triggerHandler("error",e||"abort")},l={abort:c};return r&&r.promise(l),t(a).on("load error",function(e,n){clearTimeout(h),t(a).off().remove(),"error"!=e.type&&f?v(f[0],l,i,r):y(null,n||"error",l,i,r),window[s]=u,f&&t.isFunction(u)&&u(f[0]),u=f=void 0}),g(l,i)===!1?(c("abort"),l):(window[s]=function(){f=arguments},a.src=i.url.replace(/\?(.+)=\?/,"?$1="+s),n.head.appendChild(a),i.timeout>0&&(h=setTimeout(function(){c("timeout")},i.timeout)),l)},t.ajaxSettings={type:"GET",beforeSend:b,success:b,error:b,complete:b,context:null,global:!0,xhr:function(){return new window.XMLHttpRequest},accepts:{script:"text/javascript, application/javascript, application/x-javascript",json:u,xml:"application/xml, text/xml",html:f,text:"text/plain"},crossDomain:!1,timeout:0,processData:!0,cache:!0},t.ajax=function(e){var a,o=t.extend({},e||{}),s=t.Deferred&&t.Deferred();for(i in t.ajaxSettings)void 0===o[i]&&(o[i]=t.ajaxSettings[i]);d(o),o.crossDomain||(a=n.createElement("a"),a.href=o.url,a.href=a.href,o.crossDomain=l.protocol+"//"+l.host!=a.protocol+"//"+a.host),o.url||(o.url=window.location.toString()),j(o);var u=o.dataType,f=/\?.+=\?/.test(o.url);if(f&&(u="jsonp"),o.cache!==!1&&(e&&e.cache===!0||"script"!=u&&"jsonp"!=u)||(o.url=E(o.url,"_="+Date.now())),"jsonp"==u)return f||(o.url=E(o.url,o.jsonp?o.jsonp+"=?":o.jsonp===!1?"":"callback=?")),t.ajaxJSONP(o,s);var C,h=o.accepts[u],p={},m=function(t,e){p[t.toLowerCase()]=[t,e]},x=/^([\w-]+:)\/\//.test(o.url)?RegExp.$1:window.location.protocol,S=o.xhr(),T=S.setRequestHeader;if(s&&s.promise(S),o.crossDomain||m("X-Requested-With","XMLHttpRequest"),m("Accept",h||"*/*"),(h=o.mimeType||h)&&(h.indexOf(",")>-1&&(h=h.split(",",2)[0]),S.overrideMimeType&&S.overrideMimeType(h)),(o.contentType||o.contentType!==!1&&o.data&&"GET"!=o.type.toUpperCase())&&m("Content-Type",o.contentType||"application/x-www-form-urlencoded"),o.headers)for(r in o.headers)m(r,o.headers[r]);if(S.setRequestHeader=m,S.onreadystatechange=function(){if(4==S.readyState){S.onreadystatechange=b,clearTimeout(C);var e,n=!1;if(S.status>=200&&S.status<300||304==S.status||0==S.status&&"file:"==x){u=u||w(o.mimeType||S.getResponseHeader("content-type")),e=S.responseText;try{"script"==u?(1,eval)(e):"xml"==u?e=S.responseXML:"json"==u&&(e=c.test(e)?null:t.parseJSON(e))}catch(i){n=i}n?y(n,"parsererror",S,o,s):v(e,S,o,s)}else y(S.statusText||null,S.status?"error":"abort",S,o,s)}},g(S,o)===!1)return S.abort(),y(null,"abort",S,o,s),S;if(o.xhrFields)for(r in o.xhrFields)S[r]=o.xhrFields[r];var N="async"in o?o.async:!0;S.open(o.type,o.url,N,o.username,o.password);for(r in p)T.apply(S,p[r]);return o.timeout>0&&(C=setTimeout(function(){S.onreadystatechange=b,S.abort(),y(null,"timeout",S,o,s)},o.timeout)),S.send(o.data?o.data:null),S},t.get=function(){return t.ajax(S.apply(null,arguments))},t.post=function(){var e=S.apply(null,arguments);return e.type="POST",t.ajax(e)},t.getJSON=function(){var e=S.apply(null,arguments);return e.dataType="json",t.ajax(e)},t.fn.load=function(e,n,i){if(!this.length)return this;var a,r=this,s=e.split(/\s/),u=S(e,n,i),f=u.success;return s.length>1&&(u.url=s[0],a=s[1]),u.success=function(e){r.html(a?t("<div>").html(e.replace(o,"")).find(a):e),f&&f.apply(r,arguments)},t.ajax(u),this};var T=encodeURIComponent;t.param=function(e,n){var i=[];return i.add=function(e,n){t.isFunction(n)&&(n=n()),null==n&&(n=""),this.push(T(e)+"="+T(n))},C(i,e,n),i.join("&").replace(/%20/g,"+")}}(Zepto),function(t){t.fn.serializeArray=function(){var e,n,i=[],r=function(t){return t.forEach?t.forEach(r):void i.push({name:e,value:t})};return this[0]&&t.each(this[0].elements,function(i,o){n=o.type,e=o.name,e&&"fieldset"!=o.nodeName.toLowerCase()&&!o.disabled&&"submit"!=n&&"reset"!=n&&"button"!=n&&"file"!=n&&("radio"!=n&&"checkbox"!=n||o.checked)&&r(t(o).val())}),i},t.fn.serialize=function(){var t=[];return this.serializeArray().forEach(function(e){t.push(encodeURIComponent(e.name)+"="+encodeURIComponent(e.value))}),t.join("&")},t.fn.submit=function(e){if(0 in arguments)this.bind("submit",e);else if(this.length){var n=t.Event("submit");this.eq(0).trigger(n),n.isDefaultPrevented()||this.get(0).submit()}return this}}(Zepto),function(t){"__proto__"in{}||t.extend(t.zepto,{Z:function(e,n){return e=e||[],t.extend(e,t.fn),e.selector=n||"",e.__Z=!0,e},isZ:function(e){return"array"===t.type(e)&&"__Z"in e}});try{getComputedStyle(void 0)}catch(e){var n=getComputedStyle;window.getComputedStyle=function(t){try{return n(t)}catch(e){return null}}}}(Zepto);
(function($){var zepto=$.zepto,oldQsa=zepto.qsa,oldMatches=zepto.matches;function visible(elem){elem=$(elem);return !!(elem.width()||elem.height())&&elem.css("display")!=="none"}var filters=$.expr[":"]={visible:function(){if(visible(this)){return this}},hidden:function(){if(!visible(this)){return this}},selected:function(){if(this.selected){return this}},checked:function(){if(this.checked){return this}},parent:function(){return this.parentNode},first:function(idx){if(idx===0){return this}},last:function(idx,nodes){if(idx===nodes.length-1){return this}},eq:function(idx,_,value){if(idx===value){return this}},contains:function(idx,_,text){if($(this).text().indexOf(text)>-1){return this}},has:function(idx,_,sel){if(zepto.qsa(this,sel).length){return this}}};var filterRe=new RegExp("(.*):(\\w+)(?:\\(([^)]+)\\))?$\\s*"),childRe=/^\s*>/,classTag="Zepto"+(+new Date());function process(sel,fn){sel=sel.replace(/=#\]/g,'="#"]');var filter,arg,match=filterRe.exec(sel);if(match&&match[2] in filters){filter=filters[match[2]],arg=match[3];sel=match[1];if(arg){var num=Number(arg);if(isNaN(num)){arg=arg.replace(/^["']|["']$/g,"")}else{arg=num}}}return fn(sel,filter,arg)}zepto.qsa=function(node,selector){return process(selector,function(sel,filter,arg){try{var taggedParent;if(!sel&&filter){sel="*"}else{if(childRe.test(sel)){taggedParent=$(node).addClass(classTag),sel="."+classTag+" "+sel}}var nodes=oldQsa(node,sel)}catch(e){console.error("error performing selector: %o",selector);throw e}finally{if(taggedParent){taggedParent.removeClass(classTag)}}return !filter?nodes:zepto.uniq($.map(nodes,function(n,i){return filter.call(n,i,nodes,arg)}))})};zepto.matches=function(node,selector){return process(selector,function(sel,filter,arg){return(!sel||oldMatches(node,sel))&&(!filter||filter.call(node,null,arg)===node)})}})(Zepto);
(function($){var touch={},touchTimeout,tapTimeout,swipeTimeout,longTapTimeout,longTapDelay=750,gesture;function swipeDirection(x1,x2,y1,y2){return Math.abs(x1-x2)>=Math.abs(y1-y2)?(x1-x2>0?"Left":"Right"):(y1-y2>0?"Up":"Down")}function longTap(){longTapTimeout=null;if(touch.last){touch.el.trigger("longTap");touch={}}}function cancelLongTap(){if(longTapTimeout){clearTimeout(longTapTimeout)}longTapTimeout=null}function cancelAll(){if(touchTimeout){clearTimeout(touchTimeout)}if(tapTimeout){clearTimeout(tapTimeout)}if(swipeTimeout){clearTimeout(swipeTimeout)}if(longTapTimeout){clearTimeout(longTapTimeout)}touchTimeout=tapTimeout=swipeTimeout=longTapTimeout=null;touch={}}function isPrimaryTouch(event){return(event.pointerType=="touch"||event.pointerType==event.MSPOINTER_TYPE_TOUCH)&&event.isPrimary}function isPointerEventType(e,type){return(e.type=="pointer"+type||e.type.toLowerCase()=="mspointer"+type)}$(document).ready(function(){var now,delta,deltaX=0,deltaY=0,firstTouch,_isPointerType;if("MSGesture" in window){gesture=new MSGesture();gesture.target=document.body}$(document).bind("MSGestureEnd",function(e){var swipeDirectionFromVelocity=e.velocityX>1?"Right":e.velocityX<-1?"Left":e.velocityY>1?"Down":e.velocityY<-1?"Up":null;if(swipeDirectionFromVelocity){touch.el.trigger("swipe");touch.el.trigger("swipe"+swipeDirectionFromVelocity)}}).on("touchstart MSPointerDown pointerdown",function(e){if((_isPointerType=isPointerEventType(e,"down"))&&!isPrimaryTouch(e)){return}firstTouch=_isPointerType?e:e.touches[0];if(e.touches&&e.touches.length===1&&touch.x2){touch.x2=undefined;touch.y2=undefined}now=Date.now();delta=now-(touch.last||now);touch.el=$("tagName" in firstTouch.target?firstTouch.target:firstTouch.target.parentNode);touchTimeout&&clearTimeout(touchTimeout);touch.x1=firstTouch.pageX;touch.y1=firstTouch.pageY;if(delta>0&&delta<=250){touch.isDoubleTap=true}touch.last=now;longTapTimeout=setTimeout(longTap,longTapDelay);if(gesture&&_isPointerType){gesture.addPointer(e.pointerId)
}}).on("touchmove MSPointerMove pointermove",function(e){if((_isPointerType=isPointerEventType(e,"move"))&&!isPrimaryTouch(e)){return}firstTouch=_isPointerType?e:e.touches[0];cancelLongTap();touch.x2=firstTouch.pageX;touch.y2=firstTouch.pageY;deltaX+=Math.abs(touch.x1-touch.x2);deltaY+=Math.abs(touch.y1-touch.y2)}).on("touchend MSPointerUp pointerup",function(e){if((_isPointerType=isPointerEventType(e,"up"))&&!isPrimaryTouch(e)){return}cancelLongTap();if((touch.x2&&Math.abs(touch.x1-touch.x2)>30)||(touch.y2&&Math.abs(touch.y1-touch.y2)>30)){swipeTimeout=setTimeout(function(){touch.el.trigger("swipe");touch.el.trigger("swipe"+(swipeDirection(touch.x1,touch.x2,touch.y1,touch.y2)));touch={}},0)}else{if("last" in touch){if(deltaX<30&&deltaY<30){tapTimeout=setTimeout(function(){var event=$.Event("tap");event.cancelTouch=cancelAll;touch.el.trigger(event);if(touch.isDoubleTap){if(touch.el){touch.el.trigger("doubleTap")}touch={}}else{touchTimeout=setTimeout(function(){touchTimeout=null;if(touch.el){touch.el.trigger("singleTap")}touch={}},250)}},0)}else{touch={}}}}deltaX=deltaY=0}).on("touchcancel MSPointerCancel pointercancel",cancelAll);$(window).on("scroll",cancelAll)});["swipe","swipeLeft","swipeRight","swipeUp","swipeDown","doubleTap","tap","singleTap","longTap"].forEach(function(eventName){$.fn[eventName]=function(callback){return this.on(eventName,callback)}})})(Zepto);

//     Zepto.js
//     (c) 2010-2016 Thomas Fuchs
//     Zepto.js may be freely distributed under the MIT license.

;(function($){
    // Create a collection of callbacks to be fired in a sequence, with configurable behaviour
    // Option flags:
    //   - once: Callbacks fired at most one time.
    //   - memory: Remember the most recent context and arguments
    //   - stopOnFalse: Cease iterating over callback list
    //   - unique: Permit adding at most one instance of the same callback
    $.Callbacks = function(options) {
        options = $.extend({}, options)

        var memory, // Last fire value (for non-forgettable lists)
            fired,  // Flag to know if list was already fired
            firing, // Flag to know if list is currently firing
            firingStart, // First callback to fire (used internally by add and fireWith)
            firingLength, // End of the loop when firing
            firingIndex, // Index of currently firing callback (modified by remove if needed)
            list = [], // Actual callback list
            stack = !options.once && [], // Stack of fire calls for repeatable lists
            fire = function(data) {
                memory = options.memory && data
                fired = true
                firingIndex = firingStart || 0
                firingStart = 0
                firingLength = list.length
                firing = true
                for ( ; list && firingIndex < firingLength ; ++firingIndex ) {
                    if (list[firingIndex].apply(data[0], data[1]) === false && options.stopOnFalse) {
                        memory = false
                        break
                    }
                }
                firing = false
                if (list) {
                    if (stack) stack.length && fire(stack.shift())
                    else if (memory) list.length = 0
                    else Callbacks.disable()
                }
            },

            Callbacks = {
                add: function() {
                    if (list) {
                        var start = list.length,
                            add = function(args) {
                                $.each(args, function(_, arg){
                                    if (typeof arg === "function") {
                                        if (!options.unique || !Callbacks.has(arg)) list.push(arg)
                                    }
                                    else if (arg && arg.length && typeof arg !== 'string') add(arg)
                                })
                            }
                        add(arguments)
                        if (firing) firingLength = list.length
                        else if (memory) {
                            firingStart = start
                            fire(memory)
                        }
                    }
                    return this
                },
                remove: function() {
                    if (list) {
                        $.each(arguments, function(_, arg){
                            var index
                            while ((index = $.inArray(arg, list, index)) > -1) {
                                list.splice(index, 1)
                                // Handle firing indexes
                                if (firing) {
                                    if (index <= firingLength) --firingLength
                                    if (index <= firingIndex) --firingIndex
                                }
                            }
                        })
                    }
                    return this
                },
                has: function(fn) {
                    return !!(list && (fn ? $.inArray(fn, list) > -1 : list.length))
                },
                empty: function() {
                    firingLength = list.length = 0
                    return this
                },
                disable: function() {
                    list = stack = memory = undefined
                    return this
                },
                disabled: function() {
                    return !list
                },
                lock: function() {
                    stack = undefined
                    if (!memory) Callbacks.disable()
                    return this
                },
                locked: function() {
                    return !stack
                },
                fireWith: function(context, args) {
                    if (list && (!fired || stack)) {
                        args = args || []
                        args = [context, args.slice ? args.slice() : args]
                        if (firing) stack.push(args)
                        else fire(args)
                    }
                    return this
                },
                fire: function() {
                    return Callbacks.fireWith(this, arguments)
                },
                fired: function() {
                    return !!fired
                }
            }

        return Callbacks
    }
})(Zepto)

//     Zepto.js
//     (c) 2010-2016 Thomas Fuchs
//     Zepto.js may be freely distributed under the MIT license.
//
//     Some code (c) 2005, 2013 jQuery Foundation, Inc. and other contributors

;(function($){
    var slice = Array.prototype.slice

    function Deferred(func) {
        var tuples = [
                // action, add listener, listener list, final state
                [ "resolve", "done", $.Callbacks({once:1, memory:1}), "resolved" ],
                [ "reject", "fail", $.Callbacks({once:1, memory:1}), "rejected" ],
                [ "notify", "progress", $.Callbacks({memory:1}) ]
            ],
            state = "pending",
            promise = {
                state: function() {
                    return state
                },
                always: function() {
                    deferred.done(arguments).fail(arguments)
                    return this
                },
                then: function(/* fnDone [, fnFailed [, fnProgress]] */) {
                    var fns = arguments
                    return Deferred(function(defer){
                        $.each(tuples, function(i, tuple){
                            var fn = $.isFunction(fns[i]) && fns[i]
                            deferred[tuple[1]](function(){
                                var returned = fn && fn.apply(this, arguments)
                                if (returned && $.isFunction(returned.promise)) {
                                    returned.promise()
                                        .done(defer.resolve)
                                        .fail(defer.reject)
                                        .progress(defer.notify)
                                } else {
                                    var context = this === promise ? defer.promise() : this,
                                        values = fn ? [returned] : arguments
                                    defer[tuple[0] + "With"](context, values)
                                }
                            })
                        })
                        fns = null
                    }).promise()
                },

                promise: function(obj) {
                    return obj != null ? $.extend( obj, promise ) : promise
                }
            },
            deferred = {}

        $.each(tuples, function(i, tuple){
            var list = tuple[2],
                stateString = tuple[3]

            promise[tuple[1]] = list.add

            if (stateString) {
                list.add(function(){
                    state = stateString
                }, tuples[i^1][2].disable, tuples[2][2].lock)
            }

            deferred[tuple[0]] = function(){
                deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments)
                return this
            }
            deferred[tuple[0] + "With"] = list.fireWith
        })

        promise.promise(deferred)
        if (func) func.call(deferred, deferred)
        return deferred
    }

    $.when = function(sub) {
        var resolveValues = slice.call(arguments),
            len = resolveValues.length,
            i = 0,
            remain = len !== 1 || (sub && $.isFunction(sub.promise)) ? len : 0,
            deferred = remain === 1 ? sub : Deferred(),
            progressValues, progressContexts, resolveContexts,
            updateFn = function(i, ctx, val){
                return function(value){
                    ctx[i] = this
                    val[i] = arguments.length > 1 ? slice.call(arguments) : value
                    if (val === progressValues) {
                        deferred.notifyWith(ctx, val)
                    } else if (!(--remain)) {
                        deferred.resolveWith(ctx, val)
                    }
                }
            }

        if (len > 1) {
            progressValues = new Array(len)
            progressContexts = new Array(len)
            resolveContexts = new Array(len)
            for ( ; i < len; ++i ) {
                if (resolveValues[i] && $.isFunction(resolveValues[i].promise)) {
                    resolveValues[i].promise()
                        .done(updateFn(i, resolveContexts, resolveValues))
                        .fail(deferred.reject)
                        .progress(updateFn(i, progressContexts, progressValues))
                } else {
                    --remain
                }
            }
        }
        if (!remain) deferred.resolveWith(resolveContexts, resolveValues)
        return deferred.promise()
    }

    $.Deferred = Deferred
})(Zepto)

/**
 * Created by wangzhenpeng on 2016/3/17.
 */
/**
 *  设置全局变量
 *  正式与测试的不同
 *  根据protocol来设定是https还是http
 **/

/***设置公共方法***/
Date.prototype.format = function(format) {
	var o = {
		"M+": this.getMonth() + 1, //month 
		"d+": this.getDate(), //day 
		"h+": this.getHours(), //hour 
		"m+": this.getMinutes(), //minute 
		"s+": this.getSeconds(), //second 
		"q+": Math.floor((this.getMonth() + 3) / 3), //quarter 
		"S": this.getMilliseconds() //millisecond 
	}

	if(/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}

	for(var k in o) {
		if(new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
}
/**
 **重写toFixed,解决精度问题
 **/
Number.prototype.toFixed = function(s) {
	var changenum;
	if(this > 0) {
		changenum = (parseInt(this * Math.pow(10, s) + 0.5) / Math.pow(10, s)).toString();
	} else {
		changenum = (parseInt(this * Math.pow(10, s) - 0.5) / Math.pow(10, s)).toString();
	}
	var index = changenum.indexOf(".");
	if(index < 0 && s > 0) {
		changenum = changenum + ".";
		for(var i = 0; i < s; i++) {
			changenum = changenum + "0";
		}
	} else {
		index = changenum.length - index;
		for(var i = 0; i < (s - index) + 1; i++) {
			changenum = changenum + "0";
		}
	}
	return changenum;
}
/***
 * js 浮点数计算 精度问题解决
 * ***/
//加法
Number.prototype.add = function(arg) {
	var r1, r2, m;
	try { r1 = this.toString().split(".")[1].length } catch(e) { r1 = 0 }
	try { r2 = arg.toString().split(".")[1].length } catch(e) { r2 = 0 }
	m = Math.pow(10, Math.max(r1, r2))
	return(this * m + arg * m) / m
}
//减法
Number.prototype.sub = function(arg) {
	return this.add(-arg);
}
//乘法
Number.prototype.mul = function(arg) {
	var m = 0,
		s1 = this.toString(),
		s2 = arg.toString();
	try { m += s1.split(".")[1].length } catch(e) {}
	try { m += s2.split(".")[1].length } catch(e) {}
	return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}

//除法
Number.prototype.div = function(arg) {
	var t1 = 0,
		t2 = 0,
		r1, r2;
	try { t1 = this.toString().split(".")[1].length } catch(e) {}
	try { t2 = arg.toString().split(".")[1].length } catch(e) {}
	r1 = Number(this.toString().replace(".", ""))
	r2 = Number(arg.toString().replace(".", ""))
	return(r1 / r2) * Math.pow(10, t2 - t1);
}
var GB = {};
GB.isLogin = true;
GB.utils = {
	temp: function(string, obj) {
		//模板替换
		return string.replace(/\$\w+\$/gi, function(matchs) {
			var returns = obj[matchs.replace(/\$/g, "")];
			return(returns + "") == "undefined" ? "" : returns;
		});
	},
	slideShowLoading: function() {
		$('.ajax_loading').show();
		setTimeout(function() {
			//请求成功,隐藏加载提示
			$('.ajax_loading').hide()
		}, 1000)
	},
	slideNoDataHtml: function($dom) {
		//没有更多数据
		$(".ajax_loading img").remove();
		//只加载一次 
		if($dom.find('.no-data').length == 0) {
			var _html = "<span class='no-data'> 没有更多数据了</span>";
			$dom.append(_html);
		}
	},
	slideNoData: function($html) {
		// 删除图片
		$(".ajax_loading img").remove();
		$(".ajax_loading .data_des").html("已全部加载完毕");

		$('.ajax_loading').show()
		setTimeout(function() {
			//请求成功,隐藏加载提示
			$('.ajax_loading').hide()
		}, 1500)
	},
	slideBottom: function(root, fn) {
		var $root = $(root);
		if(!$root[0]) {
			return;
		}
		$(window).on("scroll", function() {
			var windowheight = window.innerHeight;
			var documentheight = $(document).height();
			var scrolltop = $(window).scrollTop(); // 这里可以封装为一个方法 返回对象
			if(scrolltop >= documentheight - windowheight - 5) {
				// ajax 加载数据 根据是否有数据来进行展示
				if(fn) {
					fn();
				}
			}
		})
	},
	getUrl: function(argname) {
		var url = document.location.href;
		var arrStr = url.substring(url.indexOf("?") + 1).split("&");
		//return arrStr;
		for(var i = 0; i < arrStr.length; i++) {
			var loc = arrStr[i].indexOf(argname + "=");
			if(loc != -1) {
				return arrStr[i].replace(argname + "=", "").replace("?", "");
				break;
			}
		}
		return "";
	},
	GetRequest: function() {
		var url = location.search; //获取url中"?"符后的字串
		var theRequest = {};
		if(url.indexOf("?") != -1) {
			var str = url.substr(1);
			strs = str.split("&");
			for(var i = 0; i < strs.length; i++) {
				theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
			}
		}
		return theRequest;
	},
	clearNoNum: function(obj, num) {
		obj.value = obj.value.replace(/[^\d.]/g, ""); // 清除“数字”和“.”以外的字符
		obj.value = obj.value.replace(/^\./g, ""); // 验证第一个字符是数字而不是.
		obj.value = obj.value.replace(/\.{2,}/g, "."); // 只保留第一个. 清除多余的
		obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
		// obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');// 只能输入两个小数
		obj.value = obj.value.replace(new RegExp("^(\\-)*(\\d+)\\.(\\d{0," + num + "}).*$", "gmi"), '$1$2.$3');
	},
	getWeixinlink: function() {
		var tmpTag = 'https:' == document.location.protocol ? "https:" : "http:";
		(function() {
			var hm = document.createElement("script");
			hm.src = tmpTag + "//res.wx.qq.com/open/js/jweixin-1.0.0.js";
			var s = document.getElementsByTagName("script")[0];
			s.parentNode.insertBefore(hm, s);
		})();
	},
	//判断手机系统
	getPlatform: function() {
		var userAgent = navigator.userAgent.toLowerCase();
		if(userAgent.match(/(iphone|ipad|ipod|android|MicroMessenger)/)) {
			return userAgent.match(/(iphone|ipad|ipod|android|MicroMessenger)/)[1];
		}
		return '';
	},
	initJsBridge: function(callback) {
		if(window.android_new) {
			callback(android_new)
		} else {
			document.addEventListener(
				'WebViewJavascriptBridgeReady',
				function() {
					callback(android_new)
				},
				false
			);
		}
	},
	htoast: function(msg, bottom, time, wrap) {
		var time = time || 1500;
		var wrap = wrap || "body";
		var bottom = bottom || 'default';
		var toast = document.createElement('div');
		toast.className = 'common-toast common-toast-show'
		if(bottom != 'default'&& typeof bottom=='number') {
			toast.style.bottom = bottom + "rem";
			toast.style.top='initial';
		} else if(bottom=='top'){
			toast.className = 'common-toast common-toast-top common-transform-top'
		} else {
			toast.className = 'common-toast common-toast-middle common-toast-show';
		}
		toast.innerHTML = msg
		//document.body.appendChild(toast)
		var container = document.querySelector(wrap);
		if(container) {
			container.appendChild(toast);
		} else {
			console.log('元素没有获取到');
			return;
		}
		toast.style.display = 'block'
		var timer = setTimeout(function() {
			toast.className += ' common-toast-hide'
			// if(bottom != 'default') {
			// 	toast.style.bottom = bottom + "rem";
			// } else {
			// 	toast.className = 'common-toast common-toast-middle common-toast-hide';
			// }
			clearTimeout(timer)
			var timer2 = setTimeout(function() {
				document.body.removeChild(toast)
				clearTimeout(timer2)
			}, 200)
		}, time)
	},
	htoasttop:function(msg,time){
		var time = time || 1500;
		var wrap = wrap || "body";
		var toast = document.createElement('div');
		toast.className = 'common-toast-top';
		toast.innerHTML = msg
		var container = document.querySelector(wrap);
		if(container) {
			container.appendChild(toast);
		} else {
			console.log('元素没有获取到');
			return;
		}
		setTimeout(function(){
			toast.className += ' common-transform-top';
		},10)		
		var timer = setTimeout(function() {
			toast.className += ' common-toast-hide'
			clearTimeout(timer)
			var timer2 = setTimeout(function() {
				document.body.removeChild(toast)
				clearTimeout(timer2)
			}, 200)
		}, time)
	},
	ModalHelper: (function(bodyCls) {
		var scrollTop;
		return {
			afterOpen: function() {
				scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
				document.body.classList.add(bodyCls);
				document.body.style.top = -scrollTop + 'px';
			},
			beforeClose: function() {
				document.body.classList.remove(bodyCls);
				document.body.style.top = 0;
				$("body").scrollTop(scrollTop);
			}
		};
	})('modal-open-no-scroll'),
	countDown: function(startTime, endTime, fn, fnend, context) {
		//倒计时
		var obj = {
			day: 0,
			hour: 0,
			min: 0,
			sec: 0
		};
		var that = context || this;
		var flag = true;
		var DifferenceHour = -1;
		var DifferenceMinute = -1;
		var DifferenceSecond = -1;
		//endTime = endTime.replace(/-/g, '/');
		var Tday = new Date(endTime);
		var daysms = 24 * 60 * 60 * 1000;
		var hoursms = 60 * 60 * 1000;
		var Secondms = 60 * 1000;
		var microsecond = 1000;
		var time = new Date(startTime);

		function clock() {
			var hour = time.getHours();
			var minute = time.getMinutes();
			var second = time.getSeconds();
			var convertHour = DifferenceHour
			var convertMinute = DifferenceMinute
			var convertSecond = DifferenceSecond
			var Diffms = Tday.getTime() - time.getTime();
			if(Diffms > 0) {
				var Diffmsclone=Diffms;
				DifferenceHour = Math.floor(Diffmsclone / daysms)
				Diffmsclone -= DifferenceHour * daysms
				DifferenceMinute = Math.floor(Diffmsclone / hoursms)
				Diffmsclone -= DifferenceMinute * hoursms
				DifferenceSecond = Math.floor(Diffmsclone / Secondms)
				Diffmsclone -= DifferenceSecond * Secondms
				var dSecs = Math.floor(Diffmsclone / microsecond)
				if(DifferenceHour) {
					obj.day = DifferenceHour;
				} else {
					obj.day = "";
				}
				if(DifferenceMinute) {
					obj.hour = DifferenceMinute
				} else {
					obj.hour = "";
				}
				if(DifferenceSecond) {
					obj.min = DifferenceSecond;
				} else {
					obj.min = "";
				}
				if(dSecs) {
					obj.sec = dSecs;
				} else {
					obj.sec = "0";
				}
				if(fn) {
					// 倒计时时 执行函数					
					fn.call(that, obj);
				}
			} else {
				 //倒计时结束
               obj = "";
					if(fnend) {
						//倒计时结束回调
						fnend.call(that);
					}
			}
			time.setTime(time.getTime() + 1000);
			if(obj) {
				setTimeout(clock, 1000);
			}
		}
		clock();
	}
};

/***验证函数****/
GB.valid = {
	checkTelephone: function(telephone) {
		if(!telephone) {
			GB.utils.htoast('请输入手机号');
			return false
		}
		if(!/1[3457869]\d{9}/.test(telephone) || telephone.length != 11) {
			GB.utils.htoast('手机号格式不正确');
			return false
		}
		return true;
	},
	checkPassword:function(password){
		if(!password) {
			GB.utils.htoast('请输入密码');
			return false
		}
		if( password.length >10) {
			GB.utils.htoast('密码位数应小于10');
			return false
		}
		return true;
	},
	checkYzm:function(yzm){
		if(!yzm) {
			GB.utils.htoast('请输入验证码');
			return false
		}
		if( yzm.length >4) {
			GB.utils.htoast('验证码格式不正确');
			return false
		}
		return true;
	}
}

GB.Ajax = {
	ajax: function(param) {
		var param = param || {};
		var defaults = {
			type: 'post',
			data: {},
			url: ''
		}
		defaults = $.extend({}, defaults, param);
		return $.ajax(defaults).then(function(_data) {
			if(_data.code === "0000") {
				return _data;
			} else {
				//console.log(_data); 
				if(_data.code === '0003') {
					//踢出  未登录 
					GB.post(basePath + '/user/setstore', { telephone: '', sessionId: '' }).done(function() {
						console.log("清除session");
					});
					//被踢 登录  
					GB.utils.callCustomMethod("kickout", { msg: _data.msg });
				} else if(_data.code === '0002') {
					//暂不处理0002
				} else if(_data.msg) {
					GB.utils.singleAlert(_data, function() {
						GB.utils.alert(_data.msg);
					})
				}
				return $.Deferred().reject(_data);
			}
		}, function(err) {
			console.log(err);

		})
	},
	//不做重复弹错误信息处理
	ajax2: function(param) {
		var param = param || {};
		var defaults = {
			type: 'post',
			data: {},
			url: ''
		}
		defaults = $.extend({}, defaults, param);
		return $.ajax(defaults).then(function(_data) {
			 return _data;
		}, function(err) {
			console.log(err);
			if(err.status==401){
				//页面未登录 跳转到登录页
				GB.cookie.delCookie('telephone');
				location.href=htmlbasePath+'/pages/cupdraw/login.html';
			}

		})
	},
	post: function(url, data) {
		return GB.Ajax.ajax({ url: url, data: data, type: "post" });
	},
	get: function(url, data) {
		return GB.Ajax.ajax({ url: url, data: data, type: "get" });
	},
	post2: function(url, data) {
		return GB.Ajax.ajax2({ url: url, data: data, type: "post" });
	},
	get2: function(url, data) {
		return GB.Ajax.ajax2({ url: url, data: data, type: "get" });
	}
}

// 再次封装 方便调用
GB.post = function(url, data) {
	return GB.Ajax.post(url, data);
}
GB.get = function(url, data) {
	return GB.Ajax.get(url, data);
}
GB.ajax = function(param) {
	return GB.Ajax.ajax(param);
}
//不做重复弹错误信息处理
GB.ajax2 = function(param) {
	return GB.Ajax.ajax2(param);
}
GB.post2 = function(url, data) {
	return GB.Ajax.post2(url, data);
}
GB.get2 = function(url, data) {
	return GB.Ajax.get2(url, data);
}
/****弹窗组件*****/
/**功能组件 与ui相关*/
GB.Widget = function() {
	this.boudingBox = null; //属性：最外层容器
}
GB.Widget.prototype = {
	on: function(type, handler) {
		if(typeof this.handlers[type] == 'undefined') {
			this.handlers[type] = [];
		}
		this.handlers[type].push(handler);
		return this;
	},
	fire: function(type, data) {
		if(this.handlers[type] instanceof Array) {
			var handlers = this.handlers[type];
			for(var i = 0, len = handlers.length; i < len; i++) {
				handlers[i](data);
			}
		};
	},
	render: function(container) { //方法：渲染组件
		this.renderUI();
		this.handlers = {};
		this.syncUI(container);

		this.bindUI();

	},
	destroyInternal: function() {
		this.boudingBox.off();
		this.boudingBox.remove();
	},
	destroy: function() { //方法：销毁
		this.destructor();
		//解决弹窗 滚动穿透的问题 弹窗销毁后恢复原来的状态
		GB.utils.ModalHelper.beforeClose();
		this.boudingBox.off();
		this.boudingBox.remove();
	},
	renderUI: function() {}, //接口：添加dom节点
	bindUI: function() {}, //接口：监听事件
	syncUI: function(container) {}, //接口：初始化组件属性
	destructor: function() {} //接口：销毁前的处理函数 外部的东西
}
GB.utils.pop = function(options) {
	this.cfg = {
		width: 558,
		height: 245,
		title: '',
		content: "",
		type: 0,
		maskType:0,
		flag: '',
		loadingwidth: 50,
		loadingheight: 50,
		displeartime: 3000,
		handler4Displear: "",
		hasCloseBtn: true,
		hasMask: true,
		hasScroll: true,
		skinClassName: null,
		handler4CloseBtn: null,
		handler4CancleBtn: null,
		handler4SureBtn: null,
		eventHandler: null //事件句柄 content内容之间的事件绑定
	};
}
GB.utils.pop.prototype = $.extend({}, new GB.Widget(), {
	renderUI: function() {
		var html = '';
		switch(this.cfg.winType) {
			case 'landingalert':
				var title = this.cfg.title || '提示';
				var contenttext = this.cfg.content || "";
				var html1 = ' <div class="landingalert-wrap">' +
					'<div class="landingalert-title">' + title + '</div>' +
					'<div class="landingalert-tip-text">' + contenttext + '</div>' +
					'<button type="button" class="oppcloseBtn landingalert-close-btn">关闭</button>' +
					'</div>';
				this.cfg.content = html1;
				break;
			case 'downloadalert':
				var html2 = '<div class="downalert-wrap">' +
					'<p>您已经注册过了！</p>' +
					'<p>请立即下载</p>' +
					'<div class="downalertbutton download" id="J_downalert_down">立即下载黄金钱包APP</div>' +
					'<div class="downalert-close  oppcloseBtn" ></div>' +
					'</div>';
				this.cfg.content = html2;
				break;
			case 'landingalert2':
				var content = this.cfg.content || '';
				var buttontext = this.cfg.buttontext || "";
				var html2 = '<div class="downalert-wrap">' +
					content +
					'<div class="downalertbutton download" id="J_downalert_down">' + buttontext + '</div>' +
					'<div class="downalert-close  oppcloseBtn" ></div>' +
					'</div>';
				this.cfg.content = html2;
				break;
			case "alert":
				var title = this.cfg.title;
				html = '<div class="alert-title"><span class="dialogTitle">' + title + '</span><a class="dialogClose oppcloseBtn " title="关闭"></a></div>';
				var contenttext = this.cfg.content || "";
				this.cfg.content =
					'<div class="alert-Con">' +
					'<div class="windowText">' + contenttext + '</div>' +
					'</div>';
				break;
			case "showhtml":
				html = '';
				break;
			case "loading":
				html = "<div class='dialog_loading'><img style='width:" + this.cfg.loadingwidth / 75 + "rem;height:" + this.cfg.loadingheight / 75 + "rem;' src='" + basePath + "/statics/images/common/loadding.gif' /></div>";
				break;

			case "loadingWithOutMask":
			case "beforeLoading":
				html = "<div class='dialog_loading'><img style='width:" + this.cfg.loadingwidth / 75 + "rem;height:" + this.cfg.loadingheight / 75 + "rem;' src='" + basePath + "/statics/images/common/loadding.gif' /></div>";
				break;
			case "questiontip":
				// 问号提示弹窗
				var html = '<div class="pop-risk-waring">' + '    <div>' + '        <span class="source-title">' + this.cfg.title + '</span>' + '        <img src="' + basePath + '/statics/images/common/close.png" class="close oppcloseBtn">' + '    </div>' + '    <div class="content">' + '    ' + this.cfg.content + ' ' + '    </div>' + '</div>'
				this.cfg.content = html;
				break;
			default:
				html = '';
				break;
		}
		if(this.cfg.type == 'modal') {
			// 弹窗内有输入框 弹窗居于视窗的顶部
			this.boudingBox = $(
				'<div  id="' + this.cfg.flag + '" class="show_modal">' +
				'<div class="window_top">' + html + '</div>' +
				'<div class="show_modal_body">' + this.cfg.content + '</div>' +
				'</div>'
			)
		} else {
			this.boudingBox = $(
				'<div  id="' + this.cfg.flag + '" class="show_window">' +
				'<div class="window_top">' + html + '</div>' +
				'<div class="window_body">' + this.cfg.content + '</div>' +
				'</div>'
			)
		}
		/*处理模态*/
		if(this.cfg.hasMask) {
			var window_height = $(document).height();
			if(this.cfg.winType === "loadingWithOutMask") {
				this._mask = $('<div class="windowMask2"></div>');
			} else if(this.cfg.winType === "beforeLoading") {
				this._mask = $('<div class="windowMask3"></div>');
			} else {
				this._mask = $('<div class="windowMask"></div>');
			}

			this._mask.appendTo("body");
			var that = this;
			this._mask.on("click", function() {
				that.fire('close');
				that.destroy();
			})
			if(this.cfg.maskType!=0||this.cfg.winType === "loading" || this.cfg.winType === "loadingWithOutMask" || this.cfg.winType === "beforeLoading") {
				this._mask.css("z-index", 1000);
				this._mask.off("click");
			}

		}
	},
	bindUI: function() {
		var that = this;
		this.boudingBox.on("click", ".oppcloseBtn", function() {
			that.fire('close');
			that.destroy();
		});
		if(that.cfg.winType === "questiontip") {
			this.boudingBox.on("click", function() {
				that.destroy();
			})
		}
		if(this.boudingBox.find(".J_cancelBtn")[0]) {
			this.boudingBox.delegate(".J_cancelBtn", "click", function() {
				that.fire('cancel');
				that.destroy();
			})
		}
		if(this.boudingBox.find(".J_sureBtn")[0]) {
			this.boudingBox.delegate(".J_sureBtn", "click", function() {
				that.fire('sure');
				that.destroy();
			})
		}
		if(this.cfg.winType == 'downloadalert' || this.cfg.winType == 'landingalert2') {
			// 绑定下载事件
			$("#J_downalert_down").on("click", function() {
				if(openApp) {
					openApp();
				}
			})
		}
		if(this.cfg.handler4CloseBtn) {
			this.on('close', this.cfg.handler4CloseBtn);
		};
		if(this.cfg.handler4Displear) {
			this.on("displear", this.cfg.handler4Displear);
		}
		if(this.cfg.handler4CancleBtn) {
			this.on("cancel", this.cfg.handler4CancleBtn);
		}
		if(this.cfg.handler4SureBtn) {
			this.on("sure", this.cfg.handler4SureBtn);
		}

		if(this.cfg.eventHandler) {
			//如果弹窗内有其他的事件绑定 在此绑定
			this.cfg.eventHandler.call(this);
		}
	},
	syncUI: function(container) {
		$(container || document.body).append(this.boudingBox);
		GB.utils.ModalHelper.afterOpen(); //弹窗滚动穿透问题 在弹窗显示时,给body添加class
		if(this.cfg.skinClassName) {
			this.boudingBox.addClass(this.cfg.skinClassName);
		};
	},
	destructor: function() {
		this._mask && this._mask.remove();
	},
	loading: function(cfg, container) {
		$.extend(this.cfg, cfg, { winType: "loading" });
		this.render(container);
		return this;
	},
	loadingWithOutMask: function(cfg, container) {
		$.extend(this.cfg, cfg, { winType: "loadingWithOutMask" });
		this.render(container);
		return this;
	},
	beforeLoading: function(cfg, container) {
		$.extend(this.cfg, cfg, { winType: "beforeLoading" });
		this.render(container);
		return this;
	},
	landingalert: function(cfg, container) {
		$.extend(this.cfg, cfg, { winType: "landingalert" });
		this.render(container);
		return this;
	},
	landingalert2: function(cfg, container) {
		$.extend(this.cfg, cfg, { winType: "landingalert2" });
		this.render(container);
		return this;
	},
	downloadalert: function(cfg, container) {
		//当手机号为已注册时,弹窗提示已注册的信息 并有下载的按钮
		$.extend(this.cfg, cfg, { winType: "downloadalert" });
		this.render(container);
		return this;
	},
	showhtml: function(cfg, container) {
		$.extend(this.cfg, cfg, { winType: "showhtml" });
		this.render(container);
		return this;
	},
	questiontip: function(cfg, container) {
		$.extend(this.cfg, cfg, { winType: "questiontip" });
		this.render(container);
		return this;
	}
});
GB.utils.loading = function(option, container) {
	var options = $.extend({}, option);
	var newpop = new GB.utils.pop().loading(options, container);
	return newpop;
}
GB.utils.loadingWithOutMask = function(option, container) {
	var options = $.extend({}, option);
	var newpop = new GB.utils.pop().loadingWithOutMask(options, container);
	return newpop;
}
GB.utils.beforeLoading = function(option, container) {
	var options = $.extend({}, option);
	var newpop = new GB.utils.pop().beforeLoading(options, container);
	return newpop;
}
GB.utils.landingalert = function(content, option, container) {
	if(!content) { return; }
	var options = $.extend({}, { content: content }, option);
	var newpop = new GB.utils.pop().landingalert(options, container);
	return newpop;
}
GB.utils.landingalert2 = function(content, option, container) {
	if(!content) { return; }
	var options = $.extend({}, { content: content }, option);
	var newpop = new GB.utils.pop().landingalert2(options, container);
	return newpop;
}
GB.utils.downloadalert = function(content, option, container) {
	var options = $.extend({}, { content: content }, option);
	var newpop = new GB.utils.pop().downloadalert(options, container);
	return newpop;
}
GB.utils.showhtml = function(option, container) {
	var options = $.extend({}, option);
	var newpop = new GB.utils.pop().showhtml(options, container);
	return newpop;
}

GB.utils.questiontip = function(title, content, option, container) {
	var options = $.extend({ title: title, content: content }, option);
	var newpop = new GB.utils.pop().questiontip(options, container);
	return newpop;
}


GB.cookie={
	getCookie:function(cookieName) {
		var arg = cookieName + "=";
		var alen = arg.length;
		var clen = document.cookie.length;
		var i = 0;
		while (i < clen) {
			var j = i + alen;
			if (document.cookie.substring(i, j) == arg) {
				var endstr = document.cookie.indexOf(";", j);
				if (endstr == -1) {
					endstr = document.cookie.length;
				}
				var ret = unescape(document.cookie.substring(j, endstr));
				if (ret != "") {
					return ret;
				}
			}
			i = document.cookie.indexOf(" ", i) + 1;
			if (i == 0)
				break;
		}
		return "";
	},
	delCookie:function(cookieName){
		var exp = new Date();
		exp.setTime(exp.getTime() - 100);
		document.cookie = cookieName + "=; path=/; expires=" + exp.toGMTString();
		document.cookie = cookieName + "=; path=/; expires=" + exp.toGMTString();
	},
	addCookie:function(cookieName, cookieValue) {
		var expdate = new Date();
		var argv = arguments;
		var argc = arguments.length;
		var expires = (argc > 2 && argv[2] != 0) ? argv[2] : null;
		var path = (argc > 3) ? argv[3] : null;
		var domain = (argc > 4) ? argv[4] : null;
		var secure = (argc > 5) ? argv[5] : false;
		if (expires != null) {
			expdate.setTime(expdate.getTime() + (expires * 1000));
		}
		document.cookie = cookieName + "=" + escape(cookieValue) + ((expires == null) ? "" : ("; expires=" + expdate.toGMTString())) + ((path == null) ? ";path=/" : ("; path=" + path))
				+ ((domain == null) ? "" : ("; domain=" + domain)) + ((secure == true) ? "; secure" : "");
	}
}

