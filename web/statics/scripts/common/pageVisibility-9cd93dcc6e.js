var pageVisibility=function(){var i,t=function(i,t){return""!==i?i+t.slice(0,1).toUpperCase()+t.slice(1):t},n=function(){var n=!1;return"number"==typeof window.screenX&&["webkit","moz","ms","o",""].forEach(function(e){0==n&&void 0!=document[t(e,"hidden")]&&(i=e,n=!0)}),n}(),e=function(){if(n)return document[t(i,"hidden")]},o=function(){if(n)return document[t(i,"visibilityState")]};return{hidden:e(),visibilityState:o(),visibilitychange:function(t,c){if(c=!1,n&&"function"==typeof t)return document.addEventListener(i+"visibilitychange",function(i){this.hidden=e(),this.visibilityState=o(),t.call(this,i)}.bind(this),c)}}}();