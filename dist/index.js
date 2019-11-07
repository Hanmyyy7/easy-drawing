!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("react")):"function"==typeof define&&define.amd?define(["react"],e):"object"==typeof exports?exports["easy-drawing"]=e(require("react")):t["easy-drawing"]=e(t.react)}(this,function(t){return function(t){var e={};function s(i){if(e[i])return e[i].exports;var a=e[i]={i:i,l:!1,exports:{}};return t[i].call(a.exports,a,a.exports,s),a.l=!0,a.exports}return s.m=t,s.c=e,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)s.d(i,a,function(e){return t[e]}.bind(null,a));return i},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=14)}([function(t,e){t.exports=function(t,e,s){return e in t?Object.defineProperty(t,e,{value:s,enumerable:!0,configurable:!0,writable:!0}):t[e]=s,t}},function(e,s){e.exports=t},function(t,e,s){"use strict";t.exports=s(5)},function(t,e,s){t.exports=s(10)},function(t,e,s){"use strict";function i(){if(!(this instanceof i))return new i;this.queue=[],this.cache=null}i.prototype.matrix=function(t){return 1===t[0]&&0===t[1]&&0===t[2]&&1===t[3]&&0===t[4]&&0===t[5]?this:(this.cache=null,this.queue.push(t),this)},i.prototype.translate=function(t,e){return 0===t&&0===e||(this.cache=null,this.queue.push([1,0,0,1,t,e])),this},i.prototype.scale=function(t,e){return 1===t&&1===e||(this.cache=null,this.queue.push([t,0,0,e,0,0])),this},i.prototype.rotate=function(t,e,s){var i,a,h;return 0!==t&&(this.translate(e,s),i=t*Math.PI/180,a=Math.cos(i),h=Math.sin(i),this.queue.push([a,h,-h,a,0,0]),this.cache=null,this.translate(-e,-s)),this},i.prototype.skewX=function(t){return 0!==t&&(this.cache=null,this.queue.push([1,0,Math.tan(t*Math.PI/180),1,0,0])),this},i.prototype.skewY=function(t){return 0!==t&&(this.cache=null,this.queue.push([1,Math.tan(t*Math.PI/180),0,1,0,0])),this},i.prototype.toArray=function(){if(this.cache)return this.cache;if(!this.queue.length)return this.cache=[1,0,0,1,0,0],this.cache;if(this.cache=this.queue[0],1===this.queue.length)return this.cache;for(var t=1;t<this.queue.length;t++)this.cache=(e=this.cache,s=this.queue[t],[e[0]*s[0]+e[2]*s[1],e[1]*s[0]+e[3]*s[1],e[0]*s[2]+e[2]*s[3],e[1]*s[2]+e[3]*s[3],e[0]*s[4]+e[2]*s[5]+e[4],e[1]*s[4]+e[3]*s[5]+e[5]]);var e,s;return this.cache},i.prototype.calc=function(t,e,s){var i;return this.queue.length?(this.cache||(this.cache=this.toArray()),[t*(i=this.cache)[0]+e*i[2]+(s?0:i[4]),t*i[1]+e*i[3]+(s?0:i[5])]):[t,e]},t.exports=i},function(t,e,s){"use strict";var i=s(6),a=s(7),h=s(4),n=s(8),r=s(9);function o(t){if(!(this instanceof o))return new o(t);var e=i(t);this.segments=e.segments,this.err=e.err,this.__stack=[]}o.prototype.__matrix=function(t){var e,s=this;t.queue.length&&this.iterate(function(i,a,h,n){var o,c,l,u;switch(i[0]){case"v":c=0===(o=t.calc(0,i[1],!0))[0]?["v",o[1]]:["l",o[0],o[1]];break;case"V":c=(o=t.calc(h,i[1],!1))[0]===t.calc(h,n,!1)[0]?["V",o[1]]:["L",o[0],o[1]];break;case"h":c=0===(o=t.calc(i[1],0,!0))[1]?["h",o[0]]:["l",o[0],o[1]];break;case"H":c=(o=t.calc(i[1],n,!1))[1]===t.calc(h,n,!1)[1]?["H",o[0]]:["L",o[0],o[1]];break;case"a":case"A":var p=t.toArray(),d=r(i[1],i[2],i[3]).transform(p);if(p[0]*p[3]-p[1]*p[2]<0&&(i[5]=i[5]?"0":"1"),o=t.calc(i[6],i[7],"a"===i[0]),"A"===i[0]&&i[6]===h&&i[7]===n||"a"===i[0]&&0===i[6]&&0===i[7]){c=["a"===i[0]?"l":"L",o[0],o[1]];break}c=d.isDegenerate()?["a"===i[0]?"l":"L",o[0],o[1]]:[i[0],d.rx,d.ry,d.ax,i[4],i[5],o[0],o[1]];break;case"m":u=a>0,c=["m",(o=t.calc(i[1],i[2],u))[0],o[1]];break;default:for(c=[l=i[0]],u=l.toLowerCase()===l,e=1;e<i.length;e+=2)o=t.calc(i[e],i[e+1],u),c.push(o[0],o[1])}s.segments[a]=c},!0)},o.prototype.__evaluateStack=function(){var t,e;if(this.__stack.length){if(1===this.__stack.length)return this.__matrix(this.__stack[0]),void(this.__stack=[]);for(t=h(),e=this.__stack.length;--e>=0;)t.matrix(this.__stack[e].toArray());this.__matrix(t),this.__stack=[]}},o.prototype.toString=function(){var t,e,s=[];this.__evaluateStack();for(var i=0;i<this.segments.length;i++)e=this.segments[i][0],t=i>0&&"m"!==e&&"M"!==e&&e===this.segments[i-1][0],s=s.concat(t?this.segments[i].slice(1):this.segments[i]);return s.join(" ").replace(/ ?([achlmqrstvz]) ?/gi,"$1").replace(/ \-/g,"-").replace(/zm/g,"z m")},o.prototype.translate=function(t,e){return this.__stack.push(h().translate(t,e||0)),this},o.prototype.scale=function(t,e){return this.__stack.push(h().scale(t,e||0===e?e:t)),this},o.prototype.rotate=function(t,e,s){return this.__stack.push(h().rotate(t,e||0,s||0)),this},o.prototype.skewX=function(t){return this.__stack.push(h().skewX(t)),this},o.prototype.skewY=function(t){return this.__stack.push(h().skewY(t)),this},o.prototype.matrix=function(t){return this.__stack.push(h().matrix(t)),this},o.prototype.transform=function(t){return t.trim()?(this.__stack.push(a(t)),this):this},o.prototype.round=function(t){var e,s=0,i=0,a=0,h=0;return t=t||0,this.__evaluateStack(),this.segments.forEach(function(n){var r=n[0].toLowerCase()===n[0];switch(n[0]){case"H":case"h":return r&&(n[1]+=a),a=n[1]-n[1].toFixed(t),void(n[1]=+n[1].toFixed(t));case"V":case"v":return r&&(n[1]+=h),h=n[1]-n[1].toFixed(t),void(n[1]=+n[1].toFixed(t));case"Z":case"z":return a=s,void(h=i);case"M":case"m":return r&&(n[1]+=a,n[2]+=h),a=n[1]-n[1].toFixed(t),h=n[2]-n[2].toFixed(t),s=a,i=h,n[1]=+n[1].toFixed(t),void(n[2]=+n[2].toFixed(t));case"A":case"a":return r&&(n[6]+=a,n[7]+=h),a=n[6]-n[6].toFixed(t),h=n[7]-n[7].toFixed(t),n[1]=+n[1].toFixed(t),n[2]=+n[2].toFixed(t),n[3]=+n[3].toFixed(t+2),n[6]=+n[6].toFixed(t),void(n[7]=+n[7].toFixed(t));default:return e=n.length,r&&(n[e-2]+=a,n[e-1]+=h),a=n[e-2]-n[e-2].toFixed(t),h=n[e-1]-n[e-1].toFixed(t),void n.forEach(function(e,s){s&&(n[s]=+n[s].toFixed(t))})}}),this},o.prototype.iterate=function(t,e){var s,i,a,h=this.segments,n={},r=!1,o=0,c=0,l=0,u=0;if(e||this.__evaluateStack(),h.forEach(function(e,s){var i=t(e,s,o,c);Array.isArray(i)&&(n[s]=i,r=!0);var a=e[0]===e[0].toLowerCase();switch(e[0]){case"m":case"M":return o=e[1]+(a?o:0),c=e[2]+(a?c:0),l=o,void(u=c);case"h":case"H":return void(o=e[1]+(a?o:0));case"v":case"V":return void(c=e[1]+(a?c:0));case"z":case"Z":return o=l,void(c=u);default:o=e[e.length-2]+(a?o:0),c=e[e.length-1]+(a?c:0)}}),!r)return this;for(a=[],s=0;s<h.length;s++)if(void 0!==n[s])for(i=0;i<n[s].length;i++)a.push(n[s][i]);else a.push(h[s]);return this.segments=a,this},o.prototype.abs=function(){return this.iterate(function(t,e,s,i){var a,h=t[0],n=h.toUpperCase();if(h!==n)switch(t[0]=n,h){case"v":return void(t[1]+=i);case"a":return t[6]+=s,void(t[7]+=i);default:for(a=1;a<t.length;a++)t[a]+=a%2?s:i}},!0),this},o.prototype.rel=function(){return this.iterate(function(t,e,s,i){var a,h=t[0],n=h.toLowerCase();if(h!==n&&(0!==e||"M"!==h))switch(t[0]=n,h){case"V":return void(t[1]-=i);case"A":return t[6]-=s,void(t[7]-=i);default:for(a=1;a<t.length;a++)t[a]-=a%2?s:i}},!0),this},o.prototype.unarc=function(){return this.iterate(function(t,e,s,i){var a,h,r,o=[],c=t[0];return"A"!==c&&"a"!==c?null:("a"===c?(h=s+t[6],r=i+t[7]):(h=t[6],r=t[7]),0===(a=n(s,i,h,r,t[4],t[5],t[1],t[2],t[3])).length?[["a"===t[0]?"l":"L",t[6],t[7]]]:(a.forEach(function(t){o.push(["C",t[2],t[3],t[4],t[5],t[6],t[7]])}),o))}),this},o.prototype.unshort=function(){var t,e,s,i,a,h=this.segments;return this.iterate(function(n,r,o,c){var l,u=n[0],p=u.toUpperCase();r&&("T"===p?(l="t"===u,"Q"===(s=h[r-1])[0]?(t=s[1]-o,e=s[2]-c):"q"===s[0]?(t=s[1]-s[3],e=s[2]-s[4]):(t=0,e=0),i=-t,a=-e,l||(i+=o,a+=c),h[r]=[l?"q":"Q",i,a,n[1],n[2]]):"S"===p&&(l="s"===u,"C"===(s=h[r-1])[0]?(t=s[3]-o,e=s[4]-c):"c"===s[0]?(t=s[3]-s[5],e=s[4]-s[6]):(t=0,e=0),i=-t,a=-e,l||(i+=o,a+=c),h[r]=[l?"c":"C",i,a,n[1],n[2],n[3],n[4]]))}),this},t.exports=o},function(t,e,s){"use strict";var i={a:7,c:6,h:1,l:2,m:2,r:4,q:4,s:4,t:2,v:1,z:0},a=[5760,6158,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8239,8287,12288,65279];function h(t){return t>=48&&t<=57}function n(t){this.index=0,this.path=t,this.max=t.length,this.result=[],this.param=0,this.err="",this.segmentStart=0,this.data=[]}function r(t){for(;t.index<t.max&&(10===(e=t.path.charCodeAt(t.index))||13===e||8232===e||8233===e||32===e||9===e||11===e||12===e||160===e||e>=5760&&a.indexOf(e)>=0);)t.index++;var e}function o(t){var e,s=t.index,i=s,a=t.max,n=!1,r=!1,o=!1,c=!1;if(i>=a)t.err="SvgPath: missed param (at pos "+i+")";else if(43!==(e=t.path.charCodeAt(i))&&45!==e||(e=++i<a?t.path.charCodeAt(i):0),h(e)||46===e){if(46!==e){if(n=48===e,e=++i<a?t.path.charCodeAt(i):0,n&&i<a&&e&&h(e))return void(t.err="SvgPath: numbers started with `0` such as `09` are ilegal (at pos "+s+")");for(;i<a&&h(t.path.charCodeAt(i));)i++,r=!0;e=i<a?t.path.charCodeAt(i):0}if(46===e){for(c=!0,i++;h(t.path.charCodeAt(i));)i++,o=!0;e=i<a?t.path.charCodeAt(i):0}if(101===e||69===e){if(c&&!r&&!o)return void(t.err="SvgPath: invalid float exponent (at pos "+i+")");if(43!==(e=++i<a?t.path.charCodeAt(i):0)&&45!==e||i++,!(i<a&&h(t.path.charCodeAt(i))))return void(t.err="SvgPath: invalid float exponent (at pos "+i+")");for(;i<a&&h(t.path.charCodeAt(i));)i++}t.index=i,t.param=parseFloat(t.path.slice(s,i))+0}else t.err="SvgPath: param should start with 0..9 or `.` (at pos "+i+")"}function c(t){var e,s;s=(e=t.path[t.segmentStart]).toLowerCase();var a=t.data;if("m"===s&&a.length>2&&(t.result.push([e,a[0],a[1]]),a=a.slice(2),s="l",e="m"===e?"l":"L"),"r"===s)t.result.push([e].concat(a));else for(;a.length>=i[s]&&(t.result.push([e].concat(a.splice(0,i[s]))),i[s]););}function l(t){var e,s,a,h=t.max;if(t.segmentStart=t.index,function(t){switch(32|t){case 109:case 122:case 108:case 104:case 118:case 99:case 115:case 113:case 116:case 97:case 114:return!0}return!1}(t.path.charCodeAt(t.index)))if(s=i[t.path[t.index].toLowerCase()],t.index++,r(t),t.data=[],s){for(e=!1;;){for(a=s;a>0;a--){if(o(t),t.err.length)return;t.data.push(t.param),r(t),e=!1,t.index<h&&44===t.path.charCodeAt(t.index)&&(t.index++,r(t),e=!0)}if(!e){if(t.index>=t.max)break;if(!((n=t.path.charCodeAt(t.index))>=48&&n<=57||43===n||45===n||46===n))break}}var n;c(t)}else c(t);else t.err="SvgPath: bad command "+t.path[t.index]+" (at pos "+t.index+")"}t.exports=function(t){var e=new n(t),s=e.max;for(r(e);e.index<s&&!e.err.length;)l(e);return e.err.length?e.result=[]:e.result.length&&("mM".indexOf(e.result[0][0])<0?(e.err="SvgPath: string should start with `M` or `m`",e.result=[]):e.result[0][0]="M"),{err:e.err,segments:e.result}}},function(t,e,s){"use strict";var i=s(4),a={matrix:!0,scale:!0,rotate:!0,translate:!0,skewX:!0,skewY:!0},h=/\s*(matrix|translate|scale|rotate|skewX|skewY)\s*\(\s*(.+?)\s*\)[\s,]*/,n=/[\s,]+/;t.exports=function(t){var e,s,r=new i;return t.split(h).forEach(function(t){if(t.length)if(void 0===a[t])switch(s=t.split(n).map(function(t){return+t||0}),e){case"matrix":return void(6===s.length&&r.matrix(s));case"scale":return void(1===s.length?r.scale(s[0],s[0]):2===s.length&&r.scale(s[0],s[1]));case"rotate":return void(1===s.length?r.rotate(s[0],0,0):3===s.length&&r.rotate(s[0],s[1],s[2]));case"translate":return void(1===s.length?r.translate(s[0],0):2===s.length&&r.translate(s[0],s[1]));case"skewX":return void(1===s.length&&r.skewX(s[0]));case"skewY":return void(1===s.length&&r.skewY(s[0]))}else e=t}),r}},function(t,e,s){"use strict";var i=2*Math.PI;function a(t,e,s,i){var a=t*s+e*i;return a>1&&(a=1),a<-1&&(a=-1),(t*i-e*s<0?-1:1)*Math.acos(a)}function h(t,e){var s=4/3*Math.tan(e/4),i=Math.cos(t),a=Math.sin(t),h=Math.cos(t+e),n=Math.sin(t+e);return[i,a,i-a*s,a+i*s,h+n*s,n-h*s,h,n]}t.exports=function(t,e,s,n,r,o,c,l,u){var p=Math.sin(u*i/360),d=Math.cos(u*i/360),x=d*(t-s)/2+p*(e-n)/2,f=-p*(t-s)/2+d*(e-n)/2;if(0===x&&0===f)return[];if(0===c||0===l)return[];c=Math.abs(c),l=Math.abs(l);var m=x*x/(c*c)+f*f/(l*l);m>1&&(c*=Math.sqrt(m),l*=Math.sqrt(m));var v=function(t,e,s,h,n,r,o,c,l,u){var p=u*(t-s)/2+l*(e-h)/2,d=-l*(t-s)/2+u*(e-h)/2,x=o*o,f=c*c,m=p*p,v=d*d,g=x*f-x*v-f*m;g<0&&(g=0),g/=x*v+f*m;var y=(g=Math.sqrt(g)*(n===r?-1:1))*o/c*d,w=g*-c/o*p,P=u*y-l*w+(t+s)/2,b=l*y+u*w+(e+h)/2,M=(p-y)/o,L=(d-w)/c,A=(-p-y)/o,k=(-d-w)/c,C=a(1,0,M,L),S=a(M,L,A,k);return 0===r&&S>0&&(S-=i),1===r&&S<0&&(S+=i),[P,b,C,S]}(t,e,s,n,r,o,c,l,p,d),g=[],y=v[2],w=v[3],P=Math.max(Math.ceil(Math.abs(w)/(i/4)),1);w/=P;for(var b=0;b<P;b++)g.push(h(y,w)),y+=w;return g.map(function(t){for(var e=0;e<t.length;e+=2){var s=t[e+0],i=t[e+1],a=d*(s*=c)-p*(i*=l),h=p*s+d*i;t[e+0]=a+v[0],t[e+1]=h+v[1]}return t})}},function(t,e,s){"use strict";var i=Math.PI/180;function a(t,e,s){if(!(this instanceof a))return new a(t,e,s);this.rx=t,this.ry=e,this.ax=s}a.prototype.transform=function(t){var e=Math.cos(this.ax*i),s=Math.sin(this.ax*i),a=[this.rx*(t[0]*e+t[2]*s),this.rx*(t[1]*e+t[3]*s),this.ry*(-t[0]*s+t[2]*e),this.ry*(-t[1]*s+t[3]*e)],h=a[0]*a[0]+a[2]*a[2],n=a[1]*a[1]+a[3]*a[3],r=((a[0]-a[3])*(a[0]-a[3])+(a[2]+a[1])*(a[2]+a[1]))*((a[0]+a[3])*(a[0]+a[3])+(a[2]-a[1])*(a[2]-a[1])),o=(h+n)/2;if(r<1e-10*o)return this.rx=this.ry=Math.sqrt(o),this.ax=0,this;var c=a[0]*a[1]+a[2]*a[3],l=o+(r=Math.sqrt(r))/2,u=o-r/2;return this.ax=Math.abs(c)<1e-10&&Math.abs(l-n)<1e-10?90:180*Math.atan(Math.abs(c)>Math.abs(l-n)?(l-h)/c:c/(l-n))/Math.PI,this.ax>=0?(this.rx=Math.sqrt(l),this.ry=Math.sqrt(u)):(this.ax+=90,this.rx=Math.sqrt(u),this.ry=Math.sqrt(l)),this},a.prototype.isDegenerate=function(){return this.rx<1e-10*this.ry||this.ry<1e-10*this.rx},t.exports=a},function(t,e,s){var i=s(11);function a(t){return new i(t).getBoundingBox()}t.exports=a,a.Path=i},function(t,e,s){var i=s(12),a=s(13),h=s(2);function n(t){this.d=t}t.exports=n,n.prototype={getBoundingBox:function(){var t,e;return t=new h(this.d),e=new i,t.abs().unarc().unshort().iterate(function(t,s,i,a){switch(t[0]){case"M":case"L":e.addPoint(t[1],t[2]);break;case"H":e.addX(t[1]);break;case"V":e.addY(t[1]);break;case"Q":e.addQuadraticCurve(i,a,t[1],t[2],t[3],t[4]);break;case"C":e.addBezierCurve(i,a,t[1],t[2],t[3],t[4],t[5],t[6])}}),new a(e)}}},function(t,e){function s(t,e,s,i){this.x1=Number.NaN,this.y1=Number.NaN,this.x2=Number.NaN,this.y2=Number.NaN,this.addPoint(t,e),this.addPoint(s,i)}t.exports=s,s.prototype={width:function(){return this.x2-this.x1},height:function(){return this.y2-this.y1},addPoint:function(t,e){null!=t&&((isNaN(this.x1)||isNaN(this.x2))&&(this.x1=t,this.x2=t),t<this.x1&&(this.x1=t),t>this.x2&&(this.x2=t)),null!=e&&((isNaN(this.y1)||isNaN(this.y2))&&(this.y1=e,this.y2=e),e<this.y1&&(this.y1=e),e>this.y2&&(this.y2=e))},addX:function(t){this.addPoint(t,null)},addY:function(t){this.addPoint(null,t)},addQuadraticCurve:function(t,e,s,i,a,h){var n=t+2/3*(s-t),r=e+2/3*(i-e),o=n+1/3*(a-t),c=r+1/3*(h-e);this.addBezierCurve(t,e,n,o,r,c,a,h)},addBezierCurve:function(t,e,s,i,a,h,n,r){var o,c=[t,e],l=[s,i],u=[a,h],p=[n,r];for(this.addPoint(c[0],c[1]),this.addPoint(p[0],p[1]),o=0;o<=1;o++){var d=function(t){return Math.pow(1-t,3)*c[o]+3*Math.pow(1-t,2)*t*l[o]+3*(1-t)*Math.pow(t,2)*u[o]+Math.pow(t,3)*p[o]},x=6*c[o]-12*l[o]+6*u[o],f=-3*c[o]+9*l[o]-9*u[o]+3*p[o],m=3*l[o]-3*c[o];if(0!=f){var v=Math.pow(x,2)-4*m*f;if(!(v<0)){var g=(-x+Math.sqrt(v))/(2*f);0<g&&g<1&&(0==o&&this.addX(d(g)),1==o&&this.addY(d(g)));var y=(-x-Math.sqrt(v))/(2*f);0<y&&y<1&&(0==o&&this.addX(d(y)),1==o&&this.addY(d(y)))}}else{if(0==x)continue;var w=-m/x;0<w&&w<1&&(0==o&&this.addX(d(w)),1==o&&this.addY(d(w)))}}}}},function(t,e){function s(t){this.x1=this.minX=t.x1||0,this.y1=this.minY=t.y1||0,this.x2=this.maxX=t.x2||0,this.y2=this.maxY=t.y2||0,this.width=t.width()||0,this.height=t.height()||0}t.exports=s,s.prototype={round:function(t){return t=t||0,this.x1=this.minX=+this.x1.toFixed(t),this.y1=this.minY=+this.y1.toFixed(t),this.x2=this.maxX=+this.x2.toFixed(t),this.y2=this.maxY=+this.y2.toFixed(t),this.width=+this.width.toFixed(t),this.height=+this.height.toFixed(t),this},scale:function(t){var e=this;return t=t||1,["x1","minX","y1","minY","x2","maxX","y2","maxY","width","height"].forEach(function(s){e[s]=e[s]*t}),this},toString:function(){return[this.minX,this.minY,this.width,this.height].join(" ")}}},function(t,e,s){"use strict";s.r(e);var i=s(0),a=s.n(i),h=s(1),n=s.n(h),r=function(t){var e=[],s=null,i=function(){for(var i=arguments.length,a=new Array(i),h=0;h<i;h++)a[h]=arguments[h];e=a,s||(s=requestAnimationFrame(function(){s=null,t.apply(void 0,e)}))};return i.cancel=function(){s&&(cancelAnimationFrame(s),s=null)},i};function o(t){const e=t,s=[],i=20037508.34*e[0]/180;Math.abs(e[1])>85.05112877980659&&(e[1]=85.05112877980659*Math.abs(e[1])/e[1]);let a=Math.log(Math.tan((90+e[1])*Math.PI/360))/(Math.PI/180);return a=20037508.34*a/180,s[0]=i,s[1]=a,s}const c=window.devicePixelRatio,l=2===c?1:2;function u(t,e){t?e():setTimeout(()=>{u(t,e)},0)}const p={animQueue:{},_a:!1,_id:null};function d(){Object.values(p.animQueue).forEach(function(t){t()}),p._a&&(p._id=window.requestAnimationFrame(d))}function x(t){const e=`animation_${(Math.random()*Math.random()).toString().replace(/\./g,"")}`;return p.animQueue[e]=t,p._a||(window.cancelAnimationFrame(p._id),p._id=window.requestAnimationFrame(d),p._a=!0),{stop(){delete p.animQueue[e],0===Object.keys(p.animQueue).length&&(p._a=!1)}}}var f=class extends n.a.Component{constructor(...t){super(...t),a()(this,"canvas",null)}componentDidMount(){u(this.canvas,this.initCanvas.bind(this))}initCanvas(){const t=window.getComputedStyle(this.canvas.parentNode),e=window.parseFloat(t.getPropertyValue("width")),s=window.parseFloat(t.getPropertyValue("height"));this.canvas.style.width=`${e}px`,this.canvas.style.height=`${s}px`,this.canvas.width=e*c,this.canvas.height=s*c}render(){const{style:t}=this.props;let e=t||{};return n.a.createElement("canvas",{ref:t=>this.canvas=t,style:{...e}})}};var m=class{constructor(t,e,s,i,a,h,n,r){this.points=t,this.context=e,this.fillStyle=s||"rgba(111,149,255,0.4)",this.strokeStyle=i||"rgba(111,149,255,0.4",this.name=a,this.shadowColor=h,this.click=n,this.over=r,this.reover=0}createMapPath(){Array.isArray(this.points)&&(this.context.beginPath(),this.points.forEach((t,e)=>{0===e?this.context.moveTo(t[0],t[1]):this.context.lineTo(t[0],t[1])}),this.context.closePath())}drawMap(t,e){this.context.save(),this.createMapPath(),this.context.fillStyle=t||this.fillStyle,this.context.strokeStyle=e||this.strokeStyle,this.shadowColor&&(this.context.shadowColor=this.shadowColor,this.context.shadowBlur=10),this.context.fill(),this.context.stroke(),this.drawName(),this.context.restore()}drawName(){if(Array.isArray(this.points)&&this.name&&this.name.text&&!1!==this.name.show){let t=null,e=null,s=null,i=null,a=(this.points.map(a=>{let h=a[0],n=a[1];return s=null===s?h:Math.max(s,h),t=null===t?h:Math.min(t,h),i=null===i?n:Math.max(i,n),e=null===e?n:Math.min(e,n),{x:h,y:n}}),{x:(s+t)/2,y:(i+e)/2});const h=this.name.fontSize||"12px",n=parseFloat(h);let r=0;for(let t=0;t<h.length;t+=1)if(0!==t&&"."!==h[t]&&!/^\d+$/.test(h[t])){r=t;break}this.context.font=`${n*Math.sqrt(Math.pow(c,2))}${h.slice(r)} Arial`,this.context.textAlign="center",this.context.textBaseline="middle",this.context.fillStyle=this.name.color||"#fff",this.context.fillText(this.name.text,a.x,a.y)}}clearMap(){this.createMapPath(),this.context.save(),this.context.clip(),this.context.clearRect(-this.context.canvas.width/2,-this.context.canvas.height/2,this.context.canvas.width,this.context.canvas.height),this.context.restore()}};const v=1.7,g=(v-1)/2+1;var y=class{constructor(t,e,s,i,h,n,r){a()(this,"animate",function(t){this.tempRadius1>this.radius*v?this.tempRadius1=this.radius:this.tempRadius1+=this.step,this.tempRadius2>this.radius*v?this.tempRadius2=this.radius:this.tempRadius2+=this.step,this.tempRadius3>this.radius*v?this.tempRadius3=this.radius:this.tempRadius3+=this.step,this.drawAnimate(t)}),a()(this,"start",function(t){this.timer=x(this.animate.bind(this,t))}),a()(this,"stop",function(){this.timer&&this.timer.stop()}),this.x=e,this.y=s,this.radius=i,this.step=i/150,this.color=h||"yellow",this.context=t,this.tempRadius1=this.radius,this.tempRadius2=this.radius*g,this.tempRadius3=this.radius*v,this.animationID=null,this.click=n,this.over=r,this.reover=0,this.GENAME="scatter"}normalized(t,e,s,i,a){return(a-i)*(t-e)/(s-e)+i}createPath(){this.context.beginPath(),this.context.arc(this.x,this.y,this.radius,0,2*Math.PI)}strokePath(t){this.context.save(),this.context.strokeStyle=t||this.color,this.context.stroke(),this.context.restore()}fillPath(t){this.context.save(),this.context.fillStyle=t||this.color,this.context.fill(),this.context.restore()}strokeFlashCirclePath(t,e){this.context.save(),this.context.beginPath();let s=1-this.normalized(t,this.radius,this.radius*v,0,1);this.context.globalAlpha=s<0?.05:s,this.context.arc(this.x,this.y,t,0,2*Math.PI),this.strokePath(e),this.context.restore()}drawAnimate(t){this.context.save(),this.context.save(),this.context.beginPath(),this.context.arc(this.x,this.y,2*this.radius,0,2*Math.PI),this.context.clip(),this.context.clearRect(-this.context.canvas.width/2,-this.context.canvas.height/2,this.context.canvas.width,this.context.canvas.height),this.context.restore(),this.createPath(),this.fillPath(t),this.strokeFlashCirclePath(this.tempRadius1,t),this.strokeFlashCirclePath(this.tempRadius2,t),this.strokeFlashCirclePath(this.tempRadius3,t),this.context.restore()}},w=s(2),P=s.n(w),b=s(3),M=s.n(b);var L=class{constructor({path:t,context:e,center:s,point:i,ratio:a,color:h,mouseClick:n,mouseOver:r}){this.svg=window.document.createElementNS("http://www.w3.org/2000/svg","path"),this.context=e,this.center=s,this.point=[...i],this.spoint=[...i],this.ratio=a,this.path="",this.rotate=0,this.scale=1,this.color=h||"yellow",this.draw="fill",this.realPath="",this.reover=0,"string"==typeof t&&(this.path=t),"object"==typeof t&&(t.hasOwnProperty("rotate")&&(this.rotate=t.rotate),t.hasOwnProperty("d")&&(this.path=t.d),t.hasOwnProperty("scale")&&(this.scale=t.scale),t.hasOwnProperty("color")&&(this.color=t.color),t.hasOwnProperty("draw")&&(this.draw=t.draw)),this.click=n,this.over=r,this.GENAME="symbol"}initPath(){if("string"!=typeof this.path||0===this.path.length)throw new Error("d must not be empty");const t=P()(this.path);this.realPath=t.rotate(this.rotate).scale(this.scale).rel().toString()}convertPoint(t){const e=o(t||this.point);this.spoint=[(e[0]-this.center[0])*this.ratio,(this.center[1]-e[1])*this.ratio]}reWritePath(){let t=0;for(let e=0;e<this.realPath.length;e+=1){if("m"!==this.realPath[0].toLowerCase())throw new Error("path should begin with M");if(0!==e&&/^[A-Za-z]*$/.test(this.realPath[e])){t=e;break}}const e=this.realPath.slice(1,t);for(let s=0;s<e.length;s+=1)if(0!==s&&"."!==e[s]&&!/^\d+$/.test(e[s])){t=s;break}const s=window.parseFloat(e.slice(0,t)),i=window.parseFloat(e.slice(t));try{const t=M()(this.realPath),a=(t.minX+t.maxX)/2-s,h=(t.maxY+t.minY)/2-i,n=this.spoint[0]-a,r=this.spoint[1]-h;this.realPath=this.realPath.replace(e,`${n} ${r}`)}catch{const t=this.spoint[0],s=this.spoint[1];this.realPath=this.realPath.replace(e,`${t} ${s}`)}}createPath(t){this.svg.setAttributeNS(null,"d",t||this.realPath);const e=this.svg.getTotalLength(),s=e/100;this.context.beginPath();for(let t=0;t<=e;t+=s){const e=parseFloat(this.svg.getPointAtLength(t).x),s=parseFloat(this.svg.getPointAtLength(t).y);0===t&&this.context.moveTo(e,s),0!==t&&this.context.lineTo(e,s)}this.context.closePath()}fillPath(t){this.context.fillStyle=t||this.color,this.context.fill()}strokePath(t){this.context.strokeStyle=t||this.color,this.context.stroke()}cleanPath(){this.context.clip(),this.context.clearRect(-this.context.canvas.width/2,-this.context.canvas.height/2,this.context.canvas.width,this.context.canvas.height)}prepareAction(t){this.initPath(),Array.isArray(this.center)?(t&&this.convertPoint(t),!t&&this.convertPoint()):this.spoint=t||this.spoint,this.reWritePath(),this.createPath()}fill({color:t,point:e}){this.prepareAction(e),this.fillPath(t)}stroke({color:t,point:e}){this.prepareAction(e),this.strokePath(t)}render({color:t,point:e}={}){"function"==typeof this[this.draw]&&this[this.draw]({color:t,point:e})}clean(){this.context.save();const t=M()(this.realPath),e=t.minX-7*this.context.lineWidth,s=t.minY-7*this.context.lineWidth;this.context.beginPath(),this.context.rect(e,s,t.height+14*this.context.lineWidth,t.width+14*this.context.lineWidth),this.cleanPath(),this.context.restore()}};var A=class{constructor(t,e,s,i,a,h){let{src:n="",width:r=50,height:o=50,offsetX:c=.5,offsetY:l=.5}=i;this.x=e,this.y=s,this.context=t,this.src=n,"string"==typeof r&&-1!==r.indexOf("%")&&(r=parseFloat(r)/100*t.canvas.width),this.width=r,"string"==typeof o&&-1!==o.indexOf("%")&&(o=parseFloat(o)/100*t.canvas.height),this.height=o,this.offsetX=c,this.offsetY=l,this.click=a,this.over=h,this.reover=0,this.GENAME="img"}createPath(){this.context.beginPath(),this.context.rect(this.x-this.offsetX*this.width,this.y-this.height*this.offsetY,this.width,this.height)}render(){return this.image=new Image(this.width,this.height),this.image.src=this.src,new Promise(t=>{this.image.onload=()=>{this.context.drawImage(this.image,this.x-this.offsetX*this.width,this.y-this.height*this.offsetY,this.width,this.height),t()}})}};var k=class{constructor(t){this.points=[...t.points],this.symbol=t.symbol,this.color=t.color||"yellow",this.width=t.width||2,this.animation=t.animation||"alternate",this.speed=Math.abs(t.speed),this.delay=t.delay||0,this.context=t.context,this.scontext=t.scontext,this.svg=window.document.createElementNS("http://www.w3.org/2000/svg","path"),this.path="",this.pathLength=0,this.spanLength=0,this.symPathLength=0,this.symSpanLength=0,this.step=0,this.symStep=0,this.animationID,this.clip,this.symbolInstance}getSpeed(t){return 1e3/Math.sqrt(t,2)+1}initSvgPath(){this.points.forEach((t,e)=>{0===e&&(this.path=`M${t.join(" ")}`),0!==e&&(this.path=`${this.path}L${t.join(" ")}`)})}initAnimate(){this.svg.setAttributeNS(null,"d",this.path),this.pathLength=this.svg.getTotalLength(),isNaN(this.speed)||!this.speed?this.spanLength=this.pathLength/100:this.spanLength=this.pathLength/this.getSpeed(this.speed)}initSymbolAnimate(t){const e=Math.abs(t);this.svg.setAttributeNS(null,"d",this.path),this.symPathLength=this.svg.getTotalLength(),isNaN(e)||!this.speed?this.symSpanLength=this.symPathLength/100:this.symSpanLength=this.symPathLength/this.getSpeed(e)}initStaticPath(){this.context.beginPath(),this.points.forEach((t,e)=>{0===e&&this.context.moveTo(...t),0!==e&&this.context.lineTo(...t)})}stroke(){this.context.save(),this.context.strokeStyle=this.color,this.context.lineCap="round",this.context.lineJoin="round",this.context.lineWidth=this.width,this.context.stroke(),this.context.restore()}alternate(){this.initSvgPath(),new Promise(t=>{this.timeoutID=setTimeout(t,this.delay)}).then(()=>{this.initAnimate(),this.animationID=x(this.alternateA.bind(this))}),this.runSymbol()}alternateA(){this.step>=this.pathLength&&(this.step=0,this.clip=!this.clip),this.step+=this.spanLength;let t=this.step;const e=parseFloat(this.svg.getPointAtLength(t).x),s=parseFloat(this.svg.getPointAtLength(t).y);t-=this.spanLength;const i=parseFloat(this.svg.getPointAtLength(t).x),a=parseFloat(this.svg.getPointAtLength(t).y);this.clip?(this.context.beginPath(),this.context.save(),this.context.arc(e,s,this.spanLength,0,2*Math.PI),this.context.clip(),this.context.clearRect(-this.context.canvas.width/2,-this.context.canvas.height/2,this.context.canvas.width,this.context.canvas.height),this.context.restore()):(this.context.beginPath(),this.context.moveTo(i,a),this.context.lineTo(e,s),this.context.save(),this.context.strokeStyle=this.color,this.context.lineWidth=this.width,this.context.stroke(),this.context.restore())}symbolA(){this.symStep>=this.symPathLength&&(this.symStep=0),this.symStep+=this.symSpanLength;let t=this.symStep;const e=parseFloat(this.svg.getPointAtLength(t).x),s=parseFloat(this.svg.getPointAtLength(t).y);this.symbolInstance&&(this.symbolInstance.clean(),this.symbolInstance.render({point:[e,s]}))}normal(){this.initStaticPath(),this.stroke(),this.initSvgPath(),this.runSymbol()}runSymbol(){this.symbol&&"object"==typeof this.symbol&&"string"==typeof this.symbol.d&&("number"==typeof this.symbol.delay?new Promise(t=>{this.stimeoutID=setTimeout(t,this.symbol.delay)}).then(()=>{this.symbolStart()}):this.symbolStart())}symbolStart(){this.symbolInstance=new L({path:this.symbol,context:this.scontext,point:this.points[0],color:this.color}),this.symbolInstance.render(),this.initSymbolAnimate(this.symbol.speed),this.symbolAID=x(this.symbolA.bind(this))}stop(){this.animationID&&this.animationID.stop(),this.symbolAID&&this.symbolAID.stop(),this.timeoutID&&window.clearTimeout(this.timeoutID),this.stimeoutID&&window.clearTimeout(this.stimeoutID)}};var C=class{constructor(t,e,s,i,a,h,n){this.x=e,this.y=s,this.radius=i,this.color=a||"yellow",this.context=t,this.click=h,this.over=n,this.reover=0,this.GENAME="circle"}createPath(){this.context.beginPath(),this.context.arc(this.x,this.y,this.radius,0,2*Math.PI)}createLPath(){this.context.beginPath(),this.context.arc(this.x,this.y,1.5*this.radius,0,2*Math.PI)}createCleanPath(){this.context.beginPath(),this.context.arc(this.x,this.y,2*this.radius,0,2*Math.PI)}fillSPath(t){this.context.save(),this.context.fillStyle=t||this.color,this.context.fill(),this.context.restore()}fillLPath(t){this.context.save(),this.context.globalAlpha=.4,this.context.fillStyle=t||this.color,this.context.fill(),this.context.restore()}fill(t){this.createLPath(),this.fillLPath(t),this.createPath(),this.fillSPath(t)}clear(){this.createCleanPath(),this.context.save(),this.context.clip(),this.context.clearRect(-this.context.canvas.width/2,-this.context.canvas.height/2,this.context.canvas.width,this.context.canvas.height),this.context.restore()}};var S=class{constructor(t,e,s,i,a,h,n,r){this.text=t||"",this.size=h||"12px",this.x=s,this.y=i,this.color=a||"#fff",this.context=e,this.align=n||"center",this.vertical=r||"middle",this.reover=0,this.GENAME="text"}fillText(){this.context.save();const t=this.size,e=parseFloat(t);let s=0;for(let e=0;e<t.length;e+=1)if(0!==e&&"."!==t[e]&&!/^\d+$/.test(t[e])){s=e;break}this.context.font=`${e*Math.sqrt(Math.pow(c,2))}${t.slice(s)} Arial`,this.context.fillStyle=this.color,this.context.textAlign=this.align,this.context.textBaseline=this.vertical,this.context.fillText(this.text,this.x,this.y),this.context.restore()}clearText(){this.context.save();const t=this.text.length,e=this.context.measureText(this.text).width,s=Math.ceil(e/t);this.context.rect(this.x-Math.ceil(e/2),this.y-s,1.5*e,1.5*s),this.context.clip(),this.context.clearRect(-this.context.canvas.width/2,-this.context.canvas.height/2,this.context.canvas.width,this.context.canvas.height),this.context.restore()}};e.default=class extends n.a.Component{constructor(...t){super(...t),a()(this,"canvas",null),a()(this,"scatterCanvas",null),a()(this,"pathsCanvas",null),a()(this,"pathsymbolCanvas",null),a()(this,"maxLng",null),a()(this,"minLng",null),a()(this,"maxLat",null),a()(this,"minLat",null),a()(this,"centerPoint",null),a()(this,"ratio",null),a()(this,"areaList",[]),a()(this,"scatterList",[]),a()(this,"pathsList",[]),a()(this,"textList",[]),a()(this,"initBounds",()=>{let t=this.props.areas;if(Array.isArray(t)&&t.length>0){this.maxLng=null,this.minLng=null,this.maxLat=null,this.minLat=null;for(let e=0;e<t.length;e+=1)Array.isArray(t[e].polygon)&&(t[e].polygon=t[e].polygon.map(t=>{let e=t;const s=e[0],i=e[1];return null===this.maxLng?this.maxLng=s:this.maxLng=Math.max(this.maxLng,s),null===this.minLng?this.minLng=s:this.minLng=Math.min(this.minLng,s),null===this.maxLat?this.maxLat=i:this.maxLat=Math.max(this.maxLat,i),null===this.minLat?this.minLat=i:this.minLat=Math.min(this.minLat,i),e}))}}),a()(this,"mapRender",()=>{this.areaList=[],this.scatterList.forEach(t=>{"function"==typeof t.stop&&t.stop()}),this.pathsList.forEach(t=>{"function"==typeof t.stop&&t.stop()}),this.textList.forEach(t=>{"function"==typeof t.clearText&&t.clearText()}),this.scatterList=[],this.pathsList=[],this.initBounds(),this.initCenter(),this.initAreas(),this.renderAreas(),this.initScatters(),this.initPaths(),this.initTexts()}),a()(this,"initCenter",()=>{const t=this.props.areas,e=this.props.size;if(Array.isArray(t)&&null!==this.maxLng&&null!==this.maxLat&&null!==this.minLng&&null!==this.minLat){const t=this.canvas.canvas;let s=o([this.minLng,this.minLat]),i=o([this.maxLng,this.maxLat]),a=[(i[0]+s[0])/2,(i[1]+s[1])/2],h=Math.min(t.width,t.height),n=Math["cover"===e?"min":"max"](i[1]-s[1],i[0]-s[0]),r=Math.sqrt(Math.pow(h,2)+Math.pow(h,2))/Math.sqrt(Math.pow(n,2)+Math.pow(n,2));this.ratio=r,this.centerPoint=a}}),a()(this,"initAreas",()=>{const t=this.props.areas;if(!Array.isArray(t))return;const e=this.canvas.canvas.getContext("2d");e.translate(e.canvas.width/2,e.canvas.height/2);for(let s=0;s<t.length;s+=1){const i=t[s];if(Array.isArray(i.polygon)){let t=[...i.polygon];t=t.map(t=>{let e=o(t);return[(e[0]-this.centerPoint[0])*this.ratio,(this.centerPoint[1]-e[1])*this.ratio]}),this.areaList.push(new m(t,e,i.fillStyle,i.strokeStyle,i.name,i.shadowColor,i.mouseClick,i.mouseOver))}}}),a()(this,"renderAreas",()=>{this.areaList.forEach(t=>{t.drawMap()})}),a()(this,"initScatters",()=>{let t=this.props.scatters;if(Array.isArray(t)){const e=this.scatterCanvas.canvas.getContext("2d");e.translate(e.canvas.width/2,e.canvas.height/2),t.forEach(async t=>{let s=o(t.point),i=(s[0]-this.centerPoint[0])*this.ratio,a=(this.centerPoint[1]-s[1])*this.ratio;if(t.pointAtCanvas&&t.pointAtCanvas({x:(i+e.canvas.width/2)/c,y:(a+e.canvas.height/2)/c}),!t.hidden)if(t.path){const s=new L({path:t.path,context:e,center:this.centerPoint,point:t.point,ratio:this.ratio,color:t.color,mouseClick:t.mouseClick,mouseOver:t.mouseOver});s.render(),this.scatterList.push(s)}else if(t.img){const s=new A(e,i,a,t.img,t.mouseClick,t.mouseOver);await s.render(),this.scatterList.push(s)}else{let s;const h="number"==typeof t.size?t.size/l:10;"static"===t.mode?(s=new C(e,i,a,h,t.color,t.mouseClick,t.mouseOver)).fill():(s=new y(e,i,a,h,t.color,t.mouseClick,t.mouseOver)).start(),this.scatterList.push(s)}})}}),a()(this,"initPaths",()=>{let t=this.props.paths;if(Array.isArray(t)){const e=this.pathsCanvas.canvas.getContext("2d");e.translate(e.canvas.width/2,e.canvas.height/2);const s=this.pathsymbolCanvas.canvas.getContext("2d");s.translate(s.canvas.width/2,s.canvas.height/2),t.forEach(t=>{const i=t.points;if(!Array.isArray(i)||i.length<2)return void console.error("there should be at least two sets of points in path");const a=i.map(t=>{const e=o(t);return[(e[0]-this.centerPoint[0])*this.ratio,(this.centerPoint[1]-e[1])*this.ratio]}),h=new k({points:a,symbol:t.symbol,width:t.width,animation:t.animation,color:t.color,speed:t.speed,delay:t.delay,context:e,scontext:s});"function"==typeof h[t.animation||"alternate"]&&h[t.animation||"alternate"](),this.pathsList.push(h)})}}),a()(this,"initTexts",()=>{let t=this.props.texts;if(Array.isArray(t)){const e=this.textCanvas.canvas.getContext("2d");e.translate(e.canvas.width/2,e.canvas.height/2),t.forEach(t=>{let s=o(t.point),i=(s[0]-this.centerPoint[0])*this.ratio,a=(this.centerPoint[1]-s[1])*this.ratio;if("string"==typeof t.text){const s=new S(t.text,e,i,a,t.color,t.size,t.align,t.vertical);s.fillText(),this.textList.push(s)}})}}),a()(this,"mapClick",t=>{const e=t.target.getBoundingClientRect(),s=t.clientX,i=t.clientY,a=(s-e.left)*c,h=(i-e.top)*c,n=this.areaList;for(let t=0;t<n.length;t+=1){const e=n[t];e.createMapPath(),e.context.isPointInPath(a,h)&&"function"==typeof e.click&&e.click({x:a/c,y:h/c,screenX:s,screenY:i})}const r=this.scatterList;for(let t=0;t<r.length;t+=1){const e=r[t];e.createPath(),e.context.isPointInPath(a,h)&&"function"==typeof e.click&&e.click({x:a/c,y:h/c,screenX:s,screenY:i})}}),a()(this,"overFun",(t,e,s,i)=>{const a=this.areaList;for(let h=0;h<a.length;h+=1){const n=a[h];"object"==typeof n.over&&(n.createMapPath(),n.context.isPointInPath(t,e)?(n.clearMap(),n.drawMap(n.over.fillStyle),n.reover=1,this.runIn(n,{x:t/c,y:e/c,screenX:s,screenY:i})):1===n.reover&&(n.clearMap(),n.drawMap(),this.runOut(n),n.reover=0))}const h=this.scatterList;for(let a=0;a<h.length;a+=1){const n=h[a];"object"==typeof n.over&&(n.createPath(),n.context.isPointInPath(t,e)?("symbol"===n.GENAME&&(n.clean(),n.render({color:n.over.color})),"scatter"===n.GENAME&&(n.stop(),n.start(n.over.color)),"circle"===n.GENAME&&(n.clear(),n.fill(n.over.color)),n.reover=1,this.runIn(n,{x:t/c,y:e/c,screenX:s,screenY:i})):1===n.reover&&("symbol"===n.GENAME&&(n.clean(),n.render()),"scatter"===n.GENAME&&(n.stop(),n.start()),"circle"===n.GENAME&&(n.clear(),n.fill()),n.reover=0,this.runOut(n)))}}),a()(this,"mapOver",()=>{const t=r(this.overFun.bind(this));return e=>{const s=e.target.getBoundingClientRect(),i=e.clientX,a=e.clientY,h=(i-s.left)*c,n=(a-s.top)*c;t(h,n,i,a)}}),a()(this,"runIn",(t,e)=>{"function"==typeof t.over.moveIn&&t.over.moveIn(e)}),a()(this,"runOut",t=>{"function"==typeof t.over.moveOut&&t.over.moveOut()})}componentDidMount(){u(this.canvas.canvas&&this.scatterCanvas.canvas&&this.pathsCanvas.canvas&&this.pathsymbolCanvas.canvas&&this.textCanvas.canvas,this.mapRender.bind(this))}componentWillReceiveProps(){setTimeout(()=>{this.canvas.initCanvas(),this.scatterCanvas.initCanvas(),this.pathsCanvas.initCanvas(),this.pathsymbolCanvas.initCanvas(),this.textCanvas.initCanvas(),this.mapRender()},0)}componentWillUnmount(){this.areaList=[],this.scatterList.forEach(t=>{"function"==typeof t.stop&&t.stop()}),this.pathsList.forEach(t=>{"function"==typeof t.stop&&t.stop()}),this.scatterList=[],this.pathsList=[]}render(){const{zIndex:{scatters:t=3,areas:e=1,paths:s=2}={}}=this.props;return n.a.createElement("div",{onMouseMove:this.mapOver(),onClick:this.mapClick,id:"ge-canvas",style:{position:"relative",width:"100%",height:"100%"}},n.a.createElement(f,{ref:t=>this.pathsCanvas=t,style:{position:"absolute",top:0,left:0,zIndex:s}}),n.a.createElement(f,{ref:t=>this.canvas=t,style:{position:"absolute",top:0,left:0,zIndex:e}}),n.a.createElement(f,{ref:t=>this.scatterCanvas=t,style:{position:"absolute",top:0,left:0,zIndex:t}}),n.a.createElement(f,{ref:t=>this.pathsymbolCanvas=t,style:{position:"absolute",top:0,left:0,zIndex:4}}),n.a.createElement(f,{ref:t=>this.textCanvas=t,style:{position:"absolute",top:0,left:0,zIndex:10}}))}}}])});