function gtIOS6(){var t=window.navigator.userAgent,e=t.match(/(iPad|iPhone|iPod)\s+OS\s([\d_\.]+)/);return e&&e[2]&&parseInt(e[2].replace(/_/g,"."),10)>=6}function isSupportSticky(){for(var t=["","-webkit-","-ms-","-moz-","-o-"],e="",o=0;o<t.length;o++)e+="position:"+t[o]+"sticky";var i=document.createElement("div"),n=document.body;i.style.cssText="display:none"+e,n.appendChild(i);var s=/sticky/i.test(window.getComputedStyle(i).position);return n.removeChild(i),i=null,s}function getElementTop(t){for(var e=t.offsetTop,o=t.offsetParent;null!==o;)e+=o.offsetTop,o=o.offsetParent;return e}function sticky(t){if(gtIOS6()||isSupportSticky())t.classList.add("vux-sticky");else{var e=getElementTop(t);window.addEventListener("scroll",function(){window.scrollY>=e?t.classList.add("vux-fixed"):t.classList.remove("vux-fixed")})}}