var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,a)=>(a=n==null?{}:e(i(n)),s(r||!n||!n.__esModule?t(a,`default`,{value:n,enumerable:!0}):a,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var l=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.portal`),r=Symbol.for(`react.fragment`),i=Symbol.for(`react.strict_mode`),a=Symbol.for(`react.profiler`),o=Symbol.for(`react.consumer`),s=Symbol.for(`react.context`),c=Symbol.for(`react.forward_ref`),l=Symbol.for(`react.suspense`),u=Symbol.for(`react.memo`),d=Symbol.for(`react.lazy`),f=Symbol.for(`react.activity`),p=Symbol.iterator;function m(e){return typeof e!=`object`||!e?null:(e=p&&e[p]||e[`@@iterator`],typeof e==`function`?e:null)}var h={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},g=Object.assign,_={};function v(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}v.prototype.isReactComponent={},v.prototype.setState=function(e,t){if(typeof e!=`object`&&typeof e!=`function`&&e!=null)throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);this.updater.enqueueSetState(this,e,t,`setState`)},v.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,`forceUpdate`)};function y(){}y.prototype=v.prototype;function b(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}var x=b.prototype=new y;x.constructor=b,g(x,v.prototype),x.isPureReactComponent=!0;var S=Array.isArray;function C(){}var w={H:null,A:null,T:null,S:null},ee=Object.prototype.hasOwnProperty;function T(e,n,r){var i=r.ref;return{$$typeof:t,type:e,key:n,ref:i===void 0?null:i,props:r}}function E(e,t){return T(e.type,t,e.props)}function D(e){return typeof e==`object`&&!!e&&e.$$typeof===t}function O(e){var t={"=":`=0`,":":`=2`};return`$`+e.replace(/[=:]/g,function(e){return t[e]})}var k=/\/+/g;function A(e,t){return typeof e==`object`&&e&&e.key!=null?O(``+e.key):t.toString(36)}function j(e){switch(e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason;default:switch(typeof e.status==`string`?e.then(C,C):(e.status=`pending`,e.then(function(t){e.status===`pending`&&(e.status=`fulfilled`,e.value=t)},function(t){e.status===`pending`&&(e.status=`rejected`,e.reason=t)})),e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason}}throw e}function te(e,r,i,a,o){var s=typeof e;(s===`undefined`||s===`boolean`)&&(e=null);var c=!1;if(e===null)c=!0;else switch(s){case`bigint`:case`string`:case`number`:c=!0;break;case`object`:switch(e.$$typeof){case t:case n:c=!0;break;case d:return c=e._init,te(c(e._payload),r,i,a,o)}}if(c)return o=o(e),c=a===``?`.`+A(e,0):a,S(o)?(i=``,c!=null&&(i=c.replace(k,`$&/`)+`/`),te(o,r,i,``,function(e){return e})):o!=null&&(D(o)&&(o=E(o,i+(o.key==null||e&&e.key===o.key?``:(``+o.key).replace(k,`$&/`)+`/`)+c)),r.push(o)),1;c=0;var l=a===``?`.`:a+`:`;if(S(e))for(var u=0;u<e.length;u++)a=e[u],s=l+A(a,u),c+=te(a,r,i,s,o);else if(u=m(e),typeof u==`function`)for(e=u.call(e),u=0;!(a=e.next()).done;)a=a.value,s=l+A(a,u++),c+=te(a,r,i,s,o);else if(s===`object`){if(typeof e.then==`function`)return te(j(e),r,i,a,o);throw r=String(e),Error(`Objects are not valid as a React child (found: `+(r===`[object Object]`?`object with keys {`+Object.keys(e).join(`, `)+`}`:r)+`). If you meant to render a collection of children, use an array instead.`)}return c}function M(e,t,n){if(e==null)return e;var r=[],i=0;return te(e,r,``,``,function(e){return t.call(n,e,i++)}),r}function ne(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t)},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var N=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},P={map:M,forEach:function(e,t,n){M(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return M(e,function(){t++}),t},toArray:function(e){return M(e,function(e){return e})||[]},only:function(e){if(!D(e))throw Error(`React.Children.only expected to receive a single React element child.`);return e}};e.Activity=f,e.Children=P,e.Component=v,e.Fragment=r,e.Profiler=a,e.PureComponent=b,e.StrictMode=i,e.Suspense=l,e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=w,e.__COMPILER_RUNTIME={__proto__:null,c:function(e){return w.H.useMemoCache(e)}},e.cache=function(e){return function(){return e.apply(null,arguments)}},e.cacheSignal=function(){return null},e.cloneElement=function(e,t,n){if(e==null)throw Error(`The argument must be a React element, but you passed `+e+`.`);var r=g({},e.props),i=e.key;if(t!=null)for(a in t.key!==void 0&&(i=``+t.key),t)!ee.call(t,a)||a===`key`||a===`__self`||a===`__source`||a===`ref`&&t.ref===void 0||(r[a]=t[a]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var o=Array(a),s=0;s<a;s++)o[s]=arguments[s+2];r.children=o}return T(e.type,i,r)},e.createContext=function(e){return e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:o,_context:e},e},e.createElement=function(e,t,n){var r,i={},a=null;if(t!=null)for(r in t.key!==void 0&&(a=``+t.key),t)ee.call(t,r)&&r!==`key`&&r!==`__self`&&r!==`__source`&&(i[r]=t[r]);var o=arguments.length-2;if(o===1)i.children=n;else if(1<o){for(var s=Array(o),c=0;c<o;c++)s[c]=arguments[c+2];i.children=s}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)i[r]===void 0&&(i[r]=o[r]);return T(e,a,i)},e.createRef=function(){return{current:null}},e.forwardRef=function(e){return{$$typeof:c,render:e}},e.isValidElement=D,e.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:ne}},e.memo=function(e,t){return{$$typeof:u,type:e,compare:t===void 0?null:t}},e.startTransition=function(e){var t=w.T,n={};w.T=n;try{var r=e(),i=w.S;i!==null&&i(n,r),typeof r==`object`&&r&&typeof r.then==`function`&&r.then(C,N)}catch(e){N(e)}finally{t!==null&&n.types!==null&&(t.types=n.types),w.T=t}},e.unstable_useCacheRefresh=function(){return w.H.useCacheRefresh()},e.use=function(e){return w.H.use(e)},e.useActionState=function(e,t,n){return w.H.useActionState(e,t,n)},e.useCallback=function(e,t){return w.H.useCallback(e,t)},e.useContext=function(e){return w.H.useContext(e)},e.useDebugValue=function(){},e.useDeferredValue=function(e,t){return w.H.useDeferredValue(e,t)},e.useEffect=function(e,t){return w.H.useEffect(e,t)},e.useEffectEvent=function(e){return w.H.useEffectEvent(e)},e.useId=function(){return w.H.useId()},e.useImperativeHandle=function(e,t,n){return w.H.useImperativeHandle(e,t,n)},e.useInsertionEffect=function(e,t){return w.H.useInsertionEffect(e,t)},e.useLayoutEffect=function(e,t){return w.H.useLayoutEffect(e,t)},e.useMemo=function(e,t){return w.H.useMemo(e,t)},e.useOptimistic=function(e,t){return w.H.useOptimistic(e,t)},e.useReducer=function(e,t,n){return w.H.useReducer(e,t,n)},e.useRef=function(e){return w.H.useRef(e)},e.useState=function(e){return w.H.useState(e)},e.useSyncExternalStore=function(e,t,n){return w.H.useSyncExternalStore(e,t,n)},e.useTransition=function(){return w.H.useTransition()},e.version=`19.2.7`})),u=o(((e,t)=>{t.exports=l()})),d=o((e=>{function t(e,t){var n=e.length;e.push(t);a:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<i(a,t))e[r]=t,e[n]=a,n=r;else break a}}function n(e){return e.length===0?null:e[0]}function r(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;a:for(var r=0,a=e.length,o=a>>>1;r<o;){var s=2*(r+1)-1,c=e[s],l=s+1,u=e[l];if(0>i(c,n))l<a&&0>i(u,c)?(e[r]=u,e[l]=n,r=l):(e[r]=c,e[s]=n,r=s);else if(l<a&&0>i(u,n))e[r]=u,e[l]=n,r=l;else break a}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return n===0?e.id-t.id:n}if(e.unstable_now=void 0,typeof performance==`object`&&typeof performance.now==`function`){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var c=[],l=[],u=1,d=null,f=3,p=!1,m=!1,h=!1,g=!1,_=typeof setTimeout==`function`?setTimeout:null,v=typeof clearTimeout==`function`?clearTimeout:null,y=typeof setImmediate<`u`?setImmediate:null;function b(e){for(var i=n(l);i!==null;){if(i.callback===null)r(l);else if(i.startTime<=e)r(l),i.sortIndex=i.expirationTime,t(c,i);else break;i=n(l)}}function x(e){if(h=!1,b(e),!m)if(n(c)!==null)m=!0,S||(S=!0,D());else{var t=n(l);t!==null&&A(x,t.startTime-e)}}var S=!1,C=-1,w=5,ee=-1;function T(){return g?!0:!(e.unstable_now()-ee<w)}function E(){if(g=!1,S){var t=e.unstable_now();ee=t;var i=!0;try{a:{m=!1,h&&(h=!1,v(C),C=-1),p=!0;var a=f;try{b:{for(b(t),d=n(c);d!==null&&!(d.expirationTime>t&&T());){var o=d.callback;if(typeof o==`function`){d.callback=null,f=d.priorityLevel;var s=o(d.expirationTime<=t);if(t=e.unstable_now(),typeof s==`function`){d.callback=s,b(t),i=!0;break b}d===n(c)&&r(c),b(t)}else r(c);d=n(c)}if(d!==null)i=!0;else{var u=n(l);u!==null&&A(x,u.startTime-t),i=!1}}break a}finally{d=null,f=a,p=!1}i=void 0}}finally{i?D():S=!1}}}var D;if(typeof y==`function`)D=function(){y(E)};else if(typeof MessageChannel<`u`){var O=new MessageChannel,k=O.port2;O.port1.onmessage=E,D=function(){k.postMessage(null)}}else D=function(){_(E,0)};function A(t,n){C=_(function(){t(e.unstable_now())},n)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_forceFrameRate=function(e){0>e||125<e?console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`):w=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_next=function(e){switch(f){case 1:case 2:case 3:var t=3;break;default:t=f}var n=f;f=t;try{return e()}finally{f=n}},e.unstable_requestPaint=function(){g=!0},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=f;f=e;try{return t()}finally{f=n}},e.unstable_scheduleCallback=function(r,i,a){var o=e.unstable_now();switch(typeof a==`object`&&a?(a=a.delay,a=typeof a==`number`&&0<a?o+a:o):a=o,r){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=a+s,r={id:u++,callback:i,priorityLevel:r,startTime:a,expirationTime:s,sortIndex:-1},a>o?(r.sortIndex=a,t(l,r),n(c)===null&&r===n(l)&&(h?(v(C),C=-1):h=!0,A(x,a-o))):(r.sortIndex=s,t(c,r),m||p||(m=!0,S||(S=!0,D()))),r},e.unstable_shouldYield=T,e.unstable_wrapCallback=function(e){var t=f;return function(){var n=f;f=t;try{return e.apply(this,arguments)}finally{f=n}}}})),f=o(((e,t)=>{t.exports=d()})),p=o((e=>{var t=u();function n(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function r(){}var i={d:{f:r,r:function(){throw Error(n(522))},D:r,C:r,L:r,m:r,X:r,S:r,M:r},p:0,findDOMNode:null},a=Symbol.for(`react.portal`);function o(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:a,key:r==null?null:``+r,children:e,containerInfo:t,implementation:n}}var s=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function c(e,t){if(e===`font`)return``;if(typeof t==`string`)return t===`use-credentials`?t:``}e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=i,e.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(n(299));return o(e,t,null,r)},e.flushSync=function(e){var t=s.T,n=i.p;try{if(s.T=null,i.p=2,e)return e()}finally{s.T=t,i.p=n,i.d.f()}},e.preconnect=function(e,t){typeof e==`string`&&(t?(t=t.crossOrigin,t=typeof t==`string`?t===`use-credentials`?t:``:void 0):t=null,i.d.C(e,t))},e.prefetchDNS=function(e){typeof e==`string`&&i.d.D(e)},e.preinit=function(e,t){if(typeof e==`string`&&t&&typeof t.as==`string`){var n=t.as,r=c(n,t.crossOrigin),a=typeof t.integrity==`string`?t.integrity:void 0,o=typeof t.fetchPriority==`string`?t.fetchPriority:void 0;n===`style`?i.d.S(e,typeof t.precedence==`string`?t.precedence:void 0,{crossOrigin:r,integrity:a,fetchPriority:o}):n===`script`&&i.d.X(e,{crossOrigin:r,integrity:a,fetchPriority:o,nonce:typeof t.nonce==`string`?t.nonce:void 0})}},e.preinitModule=function(e,t){if(typeof e==`string`)if(typeof t==`object`&&t){if(t.as==null||t.as===`script`){var n=c(t.as,t.crossOrigin);i.d.M(e,{crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0})}}else t??i.d.M(e)},e.preload=function(e,t){if(typeof e==`string`&&typeof t==`object`&&t&&typeof t.as==`string`){var n=t.as,r=c(n,t.crossOrigin);i.d.L(e,n,{crossOrigin:r,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,type:typeof t.type==`string`?t.type:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy==`string`?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet==`string`?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes==`string`?t.imageSizes:void 0,media:typeof t.media==`string`?t.media:void 0})}},e.preloadModule=function(e,t){if(typeof e==`string`)if(t){var n=c(t.as,t.crossOrigin);i.d.m(e,{as:typeof t.as==`string`&&t.as!==`script`?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0})}else i.d.m(e)},e.requestFormReset=function(e){i.d.r(e)},e.unstable_batchedUpdates=function(e,t){return e(t)},e.useFormState=function(e,t,n){return s.H.useFormState(e,t,n)},e.useFormStatus=function(){return s.H.useHostTransitionStatus()},e.version=`19.2.7`})),m=o(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=p()})),h=o((e=>{var t=f(),n=u(),r=m();function i(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function a(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function o(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function s(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function c(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function l(e){if(o(e)!==e)throw Error(i(188))}function d(e){var t=e.alternate;if(!t){if(t=o(e),t===null)throw Error(i(188));return t===e?e:null}for(var n=e,r=t;;){var a=n.return;if(a===null)break;var s=a.alternate;if(s===null){if(r=a.return,r!==null){n=r;continue}break}if(a.child===s.child){for(s=a.child;s;){if(s===n)return l(a),e;if(s===r)return l(a),t;s=s.sibling}throw Error(i(188))}if(n.return!==r.return)n=a,r=s;else{for(var c=!1,u=a.child;u;){if(u===n){c=!0,n=a,r=s;break}if(u===r){c=!0,r=a,n=s;break}u=u.sibling}if(!c){for(u=s.child;u;){if(u===n){c=!0,n=s,r=a;break}if(u===r){c=!0,r=s,n=a;break}u=u.sibling}if(!c)throw Error(i(189))}}if(n.alternate!==r)throw Error(i(190))}if(n.tag!==3)throw Error(i(188));return n.stateNode.current===n?e:t}function p(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=p(e),t!==null)return t;e=e.sibling}return null}var h=Object.assign,g=Symbol.for(`react.element`),_=Symbol.for(`react.transitional.element`),v=Symbol.for(`react.portal`),y=Symbol.for(`react.fragment`),b=Symbol.for(`react.strict_mode`),x=Symbol.for(`react.profiler`),S=Symbol.for(`react.consumer`),C=Symbol.for(`react.context`),w=Symbol.for(`react.forward_ref`),ee=Symbol.for(`react.suspense`),T=Symbol.for(`react.suspense_list`),E=Symbol.for(`react.memo`),D=Symbol.for(`react.lazy`),O=Symbol.for(`react.activity`),k=Symbol.for(`react.memo_cache_sentinel`),A=Symbol.iterator;function j(e){return typeof e!=`object`||!e?null:(e=A&&e[A]||e[`@@iterator`],typeof e==`function`?e:null)}var te=Symbol.for(`react.client.reference`);function M(e){if(e==null)return null;if(typeof e==`function`)return e.$$typeof===te?null:e.displayName||e.name||null;if(typeof e==`string`)return e;switch(e){case y:return`Fragment`;case x:return`Profiler`;case b:return`StrictMode`;case ee:return`Suspense`;case T:return`SuspenseList`;case O:return`Activity`}if(typeof e==`object`)switch(e.$$typeof){case v:return`Portal`;case C:return e.displayName||`Context`;case S:return(e._context.displayName||`Context`)+`.Consumer`;case w:var t=e.render;return e=e.displayName,e||=(e=t.displayName||t.name||``,e===``?`ForwardRef`:`ForwardRef(`+e+`)`),e;case E:return t=e.displayName||null,t===null?M(e.type)||`Memo`:t;case D:t=e._payload,e=e._init;try{return M(e(t))}catch{}}return null}var ne=Array.isArray,N=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,P=r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,F={pending:!1,data:null,method:null,action:null},re=[],I=-1;function L(e){return{current:e}}function R(e){0>I||(e.current=re[I],re[I]=null,I--)}function z(e,t){I++,re[I]=e.current,e.current=t}var ie=L(null),ae=L(null),B=L(null),V=L(null);function H(e,t){switch(z(B,t),z(ae,e),z(ie,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Vd(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Vd(t),e=Hd(t,e);else switch(e){case`svg`:e=1;break;case`math`:e=2;break;default:e=0}}R(ie),z(ie,e)}function oe(){R(ie),R(ae),R(B)}function se(e){e.memoizedState!==null&&z(V,e);var t=ie.current,n=Hd(t,e.type);t!==n&&(z(ae,e),z(ie,n))}function ce(e){ae.current===e&&(R(ie),R(ae)),V.current===e&&(R(V),Qf._currentValue=F)}var le,ue;function de(e){if(le===void 0)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);le=t&&t[1]||``,ue=-1<e.stack.indexOf(`
    at`)?` (<anonymous>)`:-1<e.stack.indexOf(`@`)?`@unknown:0:0`:``}return`
`+le+e+ue}var fe=!1;function pe(e,t){if(!e||fe)return``;fe=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var n=function(){throw Error()};if(Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect==`object`&&Reflect.construct){try{Reflect.construct(n,[])}catch(e){var r=e}Reflect.construct(e,[],n)}else{try{n.call()}catch(e){r=e}e.call(n.prototype)}}else{try{throw Error()}catch(e){r=e}(n=e())&&typeof n.catch==`function`&&n.catch(function(){})}}catch(e){if(e&&r&&typeof e.stack==`string`)return[e.stack,r.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName=`DetermineComponentFrameRoot`;var i=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,`name`);i&&i.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:`DetermineComponentFrameRoot`});var a=r.DetermineComponentFrameRoot(),o=a[0],s=a[1];if(o&&s){var c=o.split(`
`),l=s.split(`
`);for(i=r=0;r<c.length&&!c[r].includes(`DetermineComponentFrameRoot`);)r++;for(;i<l.length&&!l[i].includes(`DetermineComponentFrameRoot`);)i++;if(r===c.length||i===l.length)for(r=c.length-1,i=l.length-1;1<=r&&0<=i&&c[r]!==l[i];)i--;for(;1<=r&&0<=i;r--,i--)if(c[r]!==l[i]){if(r!==1||i!==1)do if(r--,i--,0>i||c[r]!==l[i]){var u=`
`+c[r].replace(` at new `,` at `);return e.displayName&&u.includes(`<anonymous>`)&&(u=u.replace(`<anonymous>`,e.displayName)),u}while(1<=r&&0<=i);break}}}finally{fe=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:``)?de(n):``}function me(e,t){switch(e.tag){case 26:case 27:case 5:return de(e.type);case 16:return de(`Lazy`);case 13:return e.child!==t&&t!==null?de(`Suspense Fallback`):de(`Suspense`);case 19:return de(`SuspenseList`);case 0:case 15:return pe(e.type,!1);case 11:return pe(e.type.render,!1);case 1:return pe(e.type,!0);case 31:return de(`Activity`);default:return``}}function he(e){try{var t=``,n=null;do t+=me(e,n),n=e,e=e.return;while(e);return t}catch(e){return`
Error generating stack: `+e.message+`
`+e.stack}}var ge=Object.prototype.hasOwnProperty,_e=t.unstable_scheduleCallback,ve=t.unstable_cancelCallback,ye=t.unstable_shouldYield,be=t.unstable_requestPaint,U=t.unstable_now,xe=t.unstable_getCurrentPriorityLevel,Se=t.unstable_ImmediatePriority,Ce=t.unstable_UserBlockingPriority,we=t.unstable_NormalPriority,Te=t.unstable_LowPriority,Ee=t.unstable_IdlePriority,De=t.log,Oe=t.unstable_setDisableYieldValue,ke=null,Ae=null;function je(e){if(typeof De==`function`&&Oe(e),Ae&&typeof Ae.setStrictMode==`function`)try{Ae.setStrictMode(ke,e)}catch{}}var Me=Math.clz32?Math.clz32:Fe,Ne=Math.log,Pe=Math.LN2;function Fe(e){return e>>>=0,e===0?32:31-(Ne(e)/Pe|0)|0}var Ie=256,Le=262144,Re=4194304;function ze(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Be(e,t,n){var r=e.pendingLanes;if(r===0)return 0;var i=0,a=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var s=r&134217727;return s===0?(s=r&~a,s===0?o===0?n||(n=r&~e,n!==0&&(i=ze(n))):i=ze(o):i=ze(s)):(r=s&~a,r===0?(o&=s,o===0?n||(n=s&~e,n!==0&&(i=ze(n))):i=ze(o)):i=ze(r)),i===0?0:t!==0&&t!==i&&(t&a)===0&&(a=i&-i,n=t&-t,a>=n||a===32&&n&4194048)?t:i}function Ve(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function He(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Ue(){var e=Re;return Re<<=1,!(Re&62914560)&&(Re=4194304),e}function We(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Ge(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function Ke(e,t,n,r,i,a){var o=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var s=e.entanglements,c=e.expirationTimes,l=e.hiddenUpdates;for(n=o&~n;0<n;){var u=31-Me(n),d=1<<u;s[u]=0,c[u]=-1;var f=l[u];if(f!==null)for(l[u]=null,u=0;u<f.length;u++){var p=f[u];p!==null&&(p.lane&=-536870913)}n&=~d}r!==0&&qe(e,r,0),a!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=a&~(o&~t))}function qe(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-Me(t);e.entangledLanes|=t,e.entanglements[r]=e.entanglements[r]|1073741824|n&261930}function Je(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Me(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}function Ye(e,t){var n=t&-t;return n=n&42?1:Xe(n),(n&(e.suspendedLanes|t))===0?n:0}function Xe(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Ze(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function Qe(){var e=P.p;return e===0?(e=window.event,e===void 0?32:mp(e.type)):e}function $e(e,t){var n=P.p;try{return P.p=e,t()}finally{P.p=n}}var et=Math.random().toString(36).slice(2),tt=`__reactFiber$`+et,nt=`__reactProps$`+et,rt=`__reactContainer$`+et,it=`__reactEvents$`+et,at=`__reactListeners$`+et,ot=`__reactHandles$`+et,st=`__reactResources$`+et,ct=`__reactMarker$`+et;function lt(e){delete e[tt],delete e[nt],delete e[it],delete e[at],delete e[ot]}function ut(e){var t=e[tt];if(t)return t;for(var n=e.parentNode;n;){if(t=n[rt]||n[tt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=df(e);e!==null;){if(n=e[tt])return n;e=df(e)}return t}e=n,n=e.parentNode}return null}function dt(e){if(e=e[tt]||e[rt]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function ft(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(i(33))}function pt(e){var t=e[st];return t||=e[st]={hoistableStyles:new Map,hoistableScripts:new Map},t}function mt(e){e[ct]=!0}var ht=new Set,gt={};function _t(e,t){vt(e,t),vt(e+`Capture`,t)}function vt(e,t){for(gt[e]=t,e=0;e<t.length;e++)ht.add(t[e])}var yt=RegExp(`^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`),bt={},xt={};function St(e){return ge.call(xt,e)?!0:ge.call(bt,e)?!1:yt.test(e)?xt[e]=!0:(bt[e]=!0,!1)}function Ct(e,t,n){if(St(t))if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:e.removeAttribute(t);return;case`boolean`:var r=t.toLowerCase().slice(0,5);if(r!==`data-`&&r!==`aria-`){e.removeAttribute(t);return}}e.setAttribute(t,``+n)}}function wt(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(t);return}e.setAttribute(t,``+n)}}function Tt(e,t,n,r){if(r===null)e.removeAttribute(n);else{switch(typeof r){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(n);return}e.setAttributeNS(t,n,``+r)}}function Et(e){switch(typeof e){case`bigint`:case`boolean`:case`number`:case`string`:case`undefined`:return e;case`object`:return e;default:return``}}function Dt(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()===`input`&&(t===`checkbox`||t===`radio`)}function Ot(e,t,n){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&r!==void 0&&typeof r.get==`function`&&typeof r.set==`function`){var i=r.get,a=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){n=``+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(e){n=``+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function kt(e){if(!e._valueTracker){var t=Dt(e)?`checked`:`value`;e._valueTracker=Ot(e,t,``+e[t])}}function At(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r=``;return e&&(r=Dt(e)?e.checked?`true`:`false`:e.value),e=r,e===n?!1:(t.setValue(e),!0)}function jt(e){if(e||=typeof document<`u`?document:void 0,e===void 0)return null;try{return e.activeElement||e.body}catch{return e.body}}var Mt=/[\n"\\]/g;function Nt(e){return e.replace(Mt,function(e){return`\\`+e.charCodeAt(0).toString(16)+` `})}function Pt(e,t,n,r,i,a,o,s){e.name=``,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`?e.type=o:e.removeAttribute(`type`),t==null?o!==`submit`&&o!==`reset`||e.removeAttribute(`value`):o===`number`?(t===0&&e.value===``||e.value!=t)&&(e.value=``+Et(t)):e.value!==``+Et(t)&&(e.value=``+Et(t)),t==null?n==null?r!=null&&e.removeAttribute(`value`):It(e,o,Et(n)):It(e,o,Et(t)),i==null&&a!=null&&(e.defaultChecked=!!a),i!=null&&(e.checked=i&&typeof i!=`function`&&typeof i!=`symbol`),s!=null&&typeof s!=`function`&&typeof s!=`symbol`&&typeof s!=`boolean`?e.name=``+Et(s):e.removeAttribute(`name`)}function Ft(e,t,n,r,i,a,o,s){if(a!=null&&typeof a!=`function`&&typeof a!=`symbol`&&typeof a!=`boolean`&&(e.type=a),t!=null||n!=null){if(!(a!==`submit`&&a!==`reset`||t!=null)){kt(e);return}n=n==null?``:``+Et(n),t=t==null?n:``+Et(t),s||t===e.value||(e.value=t),e.defaultValue=t}r??=i,r=typeof r!=`function`&&typeof r!=`symbol`&&!!r,e.checked=s?e.checked:!!r,e.defaultChecked=!!r,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`&&(e.name=o),kt(e)}function It(e,t,n){t===`number`&&jt(e.ownerDocument)===e||e.defaultValue===``+n||(e.defaultValue=``+n)}function Lt(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t[`$`+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty(`$`+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=``+Et(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function Rt(e,t,n){if(t!=null&&(t=``+Et(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n==null?``:``+Et(n)}function zt(e,t,n,r){if(t==null){if(r!=null){if(n!=null)throw Error(i(92));if(ne(r)){if(1<r.length)throw Error(i(93));r=r[0]}n=r}n??=``,t=n}n=Et(t),e.defaultValue=n,r=e.textContent,r===n&&r!==``&&r!==null&&(e.value=r),kt(e)}function Bt(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Vt=new Set(`animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(` `));function Ht(e,t,n){var r=t.indexOf(`--`)===0;n==null||typeof n==`boolean`||n===``?r?e.setProperty(t,``):t===`float`?e.cssFloat=``:e[t]=``:r?e.setProperty(t,n):typeof n!=`number`||n===0||Vt.has(t)?t===`float`?e.cssFloat=n:e[t]=(``+n).trim():e[t]=n+`px`}function Ut(e,t,n){if(t!=null&&typeof t!=`object`)throw Error(i(62));if(e=e.style,n!=null){for(var r in n)!n.hasOwnProperty(r)||t!=null&&t.hasOwnProperty(r)||(r.indexOf(`--`)===0?e.setProperty(r,``):r===`float`?e.cssFloat=``:e[r]=``);for(var a in t)r=t[a],t.hasOwnProperty(a)&&n[a]!==r&&Ht(e,a,r)}else for(var o in t)t.hasOwnProperty(o)&&Ht(e,o,t[o])}function Wt(e){if(e.indexOf(`-`)===-1)return!1;switch(e){case`annotation-xml`:case`color-profile`:case`font-face`:case`font-face-src`:case`font-face-uri`:case`font-face-format`:case`font-face-name`:case`missing-glyph`:return!1;default:return!0}}var Gt=new Map([[`acceptCharset`,`accept-charset`],[`htmlFor`,`for`],[`httpEquiv`,`http-equiv`],[`crossOrigin`,`crossorigin`],[`accentHeight`,`accent-height`],[`alignmentBaseline`,`alignment-baseline`],[`arabicForm`,`arabic-form`],[`baselineShift`,`baseline-shift`],[`capHeight`,`cap-height`],[`clipPath`,`clip-path`],[`clipRule`,`clip-rule`],[`colorInterpolation`,`color-interpolation`],[`colorInterpolationFilters`,`color-interpolation-filters`],[`colorProfile`,`color-profile`],[`colorRendering`,`color-rendering`],[`dominantBaseline`,`dominant-baseline`],[`enableBackground`,`enable-background`],[`fillOpacity`,`fill-opacity`],[`fillRule`,`fill-rule`],[`floodColor`,`flood-color`],[`floodOpacity`,`flood-opacity`],[`fontFamily`,`font-family`],[`fontSize`,`font-size`],[`fontSizeAdjust`,`font-size-adjust`],[`fontStretch`,`font-stretch`],[`fontStyle`,`font-style`],[`fontVariant`,`font-variant`],[`fontWeight`,`font-weight`],[`glyphName`,`glyph-name`],[`glyphOrientationHorizontal`,`glyph-orientation-horizontal`],[`glyphOrientationVertical`,`glyph-orientation-vertical`],[`horizAdvX`,`horiz-adv-x`],[`horizOriginX`,`horiz-origin-x`],[`imageRendering`,`image-rendering`],[`letterSpacing`,`letter-spacing`],[`lightingColor`,`lighting-color`],[`markerEnd`,`marker-end`],[`markerMid`,`marker-mid`],[`markerStart`,`marker-start`],[`overlinePosition`,`overline-position`],[`overlineThickness`,`overline-thickness`],[`paintOrder`,`paint-order`],[`panose-1`,`panose-1`],[`pointerEvents`,`pointer-events`],[`renderingIntent`,`rendering-intent`],[`shapeRendering`,`shape-rendering`],[`stopColor`,`stop-color`],[`stopOpacity`,`stop-opacity`],[`strikethroughPosition`,`strikethrough-position`],[`strikethroughThickness`,`strikethrough-thickness`],[`strokeDasharray`,`stroke-dasharray`],[`strokeDashoffset`,`stroke-dashoffset`],[`strokeLinecap`,`stroke-linecap`],[`strokeLinejoin`,`stroke-linejoin`],[`strokeMiterlimit`,`stroke-miterlimit`],[`strokeOpacity`,`stroke-opacity`],[`strokeWidth`,`stroke-width`],[`textAnchor`,`text-anchor`],[`textDecoration`,`text-decoration`],[`textRendering`,`text-rendering`],[`transformOrigin`,`transform-origin`],[`underlinePosition`,`underline-position`],[`underlineThickness`,`underline-thickness`],[`unicodeBidi`,`unicode-bidi`],[`unicodeRange`,`unicode-range`],[`unitsPerEm`,`units-per-em`],[`vAlphabetic`,`v-alphabetic`],[`vHanging`,`v-hanging`],[`vIdeographic`,`v-ideographic`],[`vMathematical`,`v-mathematical`],[`vectorEffect`,`vector-effect`],[`vertAdvY`,`vert-adv-y`],[`vertOriginX`,`vert-origin-x`],[`vertOriginY`,`vert-origin-y`],[`wordSpacing`,`word-spacing`],[`writingMode`,`writing-mode`],[`xmlnsXlink`,`xmlns:xlink`],[`xHeight`,`x-height`]]),Kt=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function qt(e){return Kt.test(``+e)?`javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`:e}function Jt(){}var Yt=null;function Xt(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Zt=null,Qt=null;function $t(e){var t=dt(e);if(t&&(e=t.stateNode)){var n=e[nt]||null;a:switch(e=t.stateNode,t.type){case`input`:if(Pt(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type===`radio`&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll(`input[name="`+Nt(``+t)+`"][type="radio"]`),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=r[nt]||null;if(!a)throw Error(i(90));Pt(r,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<n.length;t++)r=n[t],r.form===e.form&&At(r)}break a;case`textarea`:Rt(e,n.value,n.defaultValue);break a;case`select`:t=n.value,t!=null&&Lt(e,!!n.multiple,t,!1)}}}var en=!1;function tn(e,t,n){if(en)return e(t,n);en=!0;try{return e(t)}finally{if(en=!1,(Zt!==null||Qt!==null)&&(vu(),Zt&&(t=Zt,e=Qt,Qt=Zt=null,$t(t),e)))for(t=0;t<e.length;t++)$t(e[t])}}function nn(e,t){var n=e.stateNode;if(n===null)return null;var r=n[nt]||null;if(r===null)return null;n=r[t];a:switch(t){case`onClick`:case`onClickCapture`:case`onDoubleClick`:case`onDoubleClickCapture`:case`onMouseDown`:case`onMouseDownCapture`:case`onMouseMove`:case`onMouseMoveCapture`:case`onMouseUp`:case`onMouseUpCapture`:case`onMouseEnter`:(r=!r.disabled)||(e=e.type,r=!(e===`button`||e===`input`||e===`select`||e===`textarea`)),e=!r;break a;default:e=!1}if(e)return null;if(n&&typeof n!=`function`)throw Error(i(231,t,typeof n));return n}var rn=!(typeof window>`u`||window.document===void 0||window.document.createElement===void 0),an=!1;if(rn)try{var on={};Object.defineProperty(on,"passive",{get:function(){an=!0}}),window.addEventListener(`test`,on,on),window.removeEventListener(`test`,on,on)}catch{an=!1}var sn=null,cn=null,ln=null;function un(){if(ln)return ln;var e,t=cn,n=t.length,r,i=`value`in sn?sn.value:sn.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return ln=i.slice(e,1<r?1-r:void 0)}function dn(e){var t=e.keyCode;return`charCode`in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function fn(){return!0}function pn(){return!1}function mn(e){function t(t,n,r,i,a){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented==null?!1===i.returnValue:i.defaultPrevented)?fn:pn,this.isPropagationStopped=pn,this}return h(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!=`unknown`&&(e.returnValue=!1),this.isDefaultPrevented=fn)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!=`unknown`&&(e.cancelBubble=!0),this.isPropagationStopped=fn)},persist:function(){},isPersistent:fn}),t}var hn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},gn=mn(hn),_n=h({},hn,{view:0,detail:0}),vn=mn(_n),yn,bn,xn,Sn=h({},_n,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Nn,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return`movementX`in e?e.movementX:(e!==xn&&(xn&&e.type===`mousemove`?(yn=e.screenX-xn.screenX,bn=e.screenY-xn.screenY):bn=yn=0,xn=e),yn)},movementY:function(e){return`movementY`in e?e.movementY:bn}}),Cn=mn(Sn),wn=mn(h({},Sn,{dataTransfer:0})),Tn=mn(h({},_n,{relatedTarget:0})),En=mn(h({},hn,{animationName:0,elapsedTime:0,pseudoElement:0})),Dn=mn(h({},hn,{clipboardData:function(e){return`clipboardData`in e?e.clipboardData:window.clipboardData}})),On=mn(h({},hn,{data:0})),kn={Esc:`Escape`,Spacebar:` `,Left:`ArrowLeft`,Up:`ArrowUp`,Right:`ArrowRight`,Down:`ArrowDown`,Del:`Delete`,Win:`OS`,Menu:`ContextMenu`,Apps:`ContextMenu`,Scroll:`ScrollLock`,MozPrintableKey:`Unidentified`},An={8:`Backspace`,9:`Tab`,12:`Clear`,13:`Enter`,16:`Shift`,17:`Control`,18:`Alt`,19:`Pause`,20:`CapsLock`,27:`Escape`,32:` `,33:`PageUp`,34:`PageDown`,35:`End`,36:`Home`,37:`ArrowLeft`,38:`ArrowUp`,39:`ArrowRight`,40:`ArrowDown`,45:`Insert`,46:`Delete`,112:`F1`,113:`F2`,114:`F3`,115:`F4`,116:`F5`,117:`F6`,118:`F7`,119:`F8`,120:`F9`,121:`F10`,122:`F11`,123:`F12`,144:`NumLock`,145:`ScrollLock`,224:`Meta`},jn={Alt:`altKey`,Control:`ctrlKey`,Meta:`metaKey`,Shift:`shiftKey`};function Mn(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=jn[e])?!!t[e]:!1}function Nn(){return Mn}var Pn=mn(h({},_n,{key:function(e){if(e.key){var t=kn[e.key]||e.key;if(t!==`Unidentified`)return t}return e.type===`keypress`?(e=dn(e),e===13?`Enter`:String.fromCharCode(e)):e.type===`keydown`||e.type===`keyup`?An[e.keyCode]||`Unidentified`:``},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Nn,charCode:function(e){return e.type===`keypress`?dn(e):0},keyCode:function(e){return e.type===`keydown`||e.type===`keyup`?e.keyCode:0},which:function(e){return e.type===`keypress`?dn(e):e.type===`keydown`||e.type===`keyup`?e.keyCode:0}})),Fn=mn(h({},Sn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),W=mn(h({},_n,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Nn})),In=mn(h({},hn,{propertyName:0,elapsedTime:0,pseudoElement:0})),Ln=mn(h({},Sn,{deltaX:function(e){return`deltaX`in e?e.deltaX:`wheelDeltaX`in e?-e.wheelDeltaX:0},deltaY:function(e){return`deltaY`in e?e.deltaY:`wheelDeltaY`in e?-e.wheelDeltaY:`wheelDelta`in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),Rn=mn(h({},hn,{newState:0,oldState:0})),zn=[9,13,27,32],Bn=rn&&`CompositionEvent`in window,Vn=null;rn&&`documentMode`in document&&(Vn=document.documentMode);var Hn=rn&&`TextEvent`in window&&!Vn,Un=rn&&(!Bn||Vn&&8<Vn&&11>=Vn),Wn=` `,Gn=!1;function G(e,t){switch(e){case`keyup`:return zn.indexOf(t.keyCode)!==-1;case`keydown`:return t.keyCode!==229;case`keypress`:case`mousedown`:case`focusout`:return!0;default:return!1}}function Kn(e){return e=e.detail,typeof e==`object`&&`data`in e?e.data:null}var qn=!1;function Jn(e,t){switch(e){case`compositionend`:return Kn(t);case`keypress`:return t.which===32?(Gn=!0,Wn):null;case`textInput`:return e=t.data,e===Wn&&Gn?null:e;default:return null}}function Yn(e,t){if(qn)return e===`compositionend`||!Bn&&G(e,t)?(e=un(),ln=cn=sn=null,qn=!1,e):null;switch(e){case`paste`:return null;case`keypress`:if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case`compositionend`:return Un&&t.locale!==`ko`?null:t.data;default:return null}}var Xn={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Zn(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t===`input`?!!Xn[e.type]:t===`textarea`}function Qn(e,t,n,r){Zt?Qt?Qt.push(r):Qt=[r]:Zt=r,t=Td(t,`onChange`),0<t.length&&(n=new gn(`onChange`,`change`,null,n,r),e.push({event:n,listeners:t}))}var $n=null,er=null;function tr(e){vd(e,0)}function nr(e){if(At(ft(e)))return e}function rr(e,t){if(e===`change`)return t}var ir=!1;if(rn){var ar;if(rn){var or=`oninput`in document;if(!or){var sr=document.createElement(`div`);sr.setAttribute(`oninput`,`return;`),or=typeof sr.oninput==`function`}ar=or}else ar=!1;ir=ar&&(!document.documentMode||9<document.documentMode)}function cr(){$n&&($n.detachEvent(`onpropertychange`,lr),er=$n=null)}function lr(e){if(e.propertyName===`value`&&nr(er)){var t=[];Qn(t,er,e,Xt(e)),tn(tr,t)}}function ur(e,t,n){e===`focusin`?(cr(),$n=t,er=n,$n.attachEvent(`onpropertychange`,lr)):e===`focusout`&&cr()}function dr(e){if(e===`selectionchange`||e===`keyup`||e===`keydown`)return nr(er)}function fr(e,t){if(e===`click`)return nr(t)}function pr(e,t){if(e===`input`||e===`change`)return nr(t)}function mr(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var hr=typeof Object.is==`function`?Object.is:mr;function gr(e,t){if(hr(e,t))return!0;if(typeof e!=`object`||!e||typeof t!=`object`||!t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!ge.call(t,i)||!hr(e[i],t[i]))return!1}return!0}function _r(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function vr(e,t){var n=_r(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}a:{for(;n;){if(n.nextSibling){n=n.nextSibling;break a}n=n.parentNode}n=void 0}n=_r(n)}}function yr(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?yr(e,t.parentNode):`contains`in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function br(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=jt(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href==`string`}catch{n=!1}if(n)e=t.contentWindow;else break;t=jt(e.document)}return t}function xr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t===`input`&&(e.type===`text`||e.type===`search`||e.type===`tel`||e.type===`url`||e.type===`password`)||t===`textarea`||e.contentEditable===`true`)}var Sr=rn&&`documentMode`in document&&11>=document.documentMode,Cr=null,wr=null,Tr=null,Er=!1;function Dr(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Er||Cr==null||Cr!==jt(r)||(r=Cr,`selectionStart`in r&&xr(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Tr&&gr(Tr,r)||(Tr=r,r=Td(wr,`onSelect`),0<r.length&&(t=new gn(`onSelect`,`select`,null,t,n),e.push({event:t,listeners:r}),t.target=Cr)))}function Or(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n[`Webkit`+e]=`webkit`+t,n[`Moz`+e]=`moz`+t,n}var kr={animationend:Or(`Animation`,`AnimationEnd`),animationiteration:Or(`Animation`,`AnimationIteration`),animationstart:Or(`Animation`,`AnimationStart`),transitionrun:Or(`Transition`,`TransitionRun`),transitionstart:Or(`Transition`,`TransitionStart`),transitioncancel:Or(`Transition`,`TransitionCancel`),transitionend:Or(`Transition`,`TransitionEnd`)},Ar={},jr={};rn&&(jr=document.createElement(`div`).style,`AnimationEvent`in window||(delete kr.animationend.animation,delete kr.animationiteration.animation,delete kr.animationstart.animation),`TransitionEvent`in window||delete kr.transitionend.transition);function Mr(e){if(Ar[e])return Ar[e];if(!kr[e])return e;var t=kr[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in jr)return Ar[e]=t[n];return e}var Nr=Mr(`animationend`),Pr=Mr(`animationiteration`),Fr=Mr(`animationstart`),Ir=Mr(`transitionrun`),Lr=Mr(`transitionstart`),Rr=Mr(`transitioncancel`),zr=Mr(`transitionend`),Br=new Map,Vr=`abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);Vr.push(`scrollEnd`);function Hr(e,t){Br.set(e,t),_t(t,[e])}var Ur=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},Wr=[],Gr=0,Kr=0;function qr(){for(var e=Gr,t=Kr=Gr=0;t<e;){var n=Wr[t];Wr[t++]=null;var r=Wr[t];Wr[t++]=null;var i=Wr[t];Wr[t++]=null;var a=Wr[t];if(Wr[t++]=null,r!==null&&i!==null){var o=r.pending;o===null?i.next=i:(i.next=o.next,o.next=i),r.pending=i}a!==0&&Zr(n,i,a)}}function Jr(e,t,n,r){Wr[Gr++]=e,Wr[Gr++]=t,Wr[Gr++]=n,Wr[Gr++]=r,Kr|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function Yr(e,t,n,r){return Jr(e,t,n,r),K(e)}function Xr(e,t){return Jr(e,null,null,t),K(e)}function Zr(e,t,n){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n);for(var i=!1,a=e.return;a!==null;)a.childLanes|=n,r=a.alternate,r!==null&&(r.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(i=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,i&&t!==null&&(i=31-Me(n),e=a.hiddenUpdates,r=e[i],r===null?e[i]=[t]:r.push(t),t.lane=n|536870912),a):null}function K(e){if(50<lu)throw lu=0,uu=null,Error(i(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var Qr={};function $r(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ei(e,t,n,r){return new $r(e,t,n,r)}function ti(e){return e=e.prototype,!(!e||!e.isReactComponent)}function ni(e,t){var n=e.alternate;return n===null?(n=ei(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&65011712,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function ri(e,t){e.flags&=65011714;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function ii(e,t,n,r,a,o){var s=0;if(r=e,typeof e==`function`)ti(e)&&(s=1);else if(typeof e==`string`)s=Uf(e,n,ie.current)?26:e===`html`||e===`head`||e===`body`?27:5;else a:switch(e){case O:return e=ei(31,n,t,a),e.elementType=O,e.lanes=o,e;case y:return ai(n.children,a,o,t);case b:s=8,a|=24;break;case x:return e=ei(12,n,t,a|2),e.elementType=x,e.lanes=o,e;case ee:return e=ei(13,n,t,a),e.elementType=ee,e.lanes=o,e;case T:return e=ei(19,n,t,a),e.elementType=T,e.lanes=o,e;default:if(typeof e==`object`&&e)switch(e.$$typeof){case C:s=10;break a;case S:s=9;break a;case w:s=11;break a;case E:s=14;break a;case D:s=16,r=null;break a}s=29,n=Error(i(130,e===null?`null`:typeof e,``)),r=null}return t=ei(s,n,t,a),t.elementType=e,t.type=r,t.lanes=o,t}function ai(e,t,n,r){return e=ei(7,e,r,t),e.lanes=n,e}function q(e,t,n){return e=ei(6,e,null,t),e.lanes=n,e}function oi(e){var t=ei(18,null,null,0);return t.stateNode=e,t}function si(e,t,n){return t=ei(4,e.children===null?[]:e.children,e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var ci=new WeakMap;function li(e,t){if(typeof e==`object`&&e){var n=ci.get(e);return n===void 0?(t={value:e,source:t,stack:he(t)},ci.set(e,t),t):n}return{value:e,source:t,stack:he(t)}}var ui=[],di=0,fi=null,pi=0,mi=[],hi=0,gi=null,_i=1,vi=``;function yi(e,t){ui[di++]=pi,ui[di++]=fi,fi=e,pi=t}function bi(e,t,n){mi[hi++]=_i,mi[hi++]=vi,mi[hi++]=gi,gi=e;var r=_i;e=vi;var i=32-Me(r)-1;r&=~(1<<i),n+=1;var a=32-Me(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,_i=1<<32-Me(t)+i|n<<i|r,vi=a+e}else _i=1<<a|n<<i|r,vi=e}function xi(e){e.return!==null&&(yi(e,1),bi(e,1,0))}function Si(e){for(;e===fi;)fi=ui[--di],ui[di]=null,pi=ui[--di],ui[di]=null;for(;e===gi;)gi=mi[--hi],mi[hi]=null,vi=mi[--hi],mi[hi]=null,_i=mi[--hi],mi[hi]=null}function Ci(e,t){mi[hi++]=_i,mi[hi++]=vi,mi[hi++]=gi,_i=t.id,vi=t.overflow,gi=e}var wi=null,Ti=null,J=!1,Ei=null,Di=!1,Oi=Error(i(519));function ki(e){throw Fi(li(Error(i(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?`text`:`HTML`,``)),e)),Oi}function Ai(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[tt]=e,t[nt]=r,n){case`dialog`:$(`cancel`,t),$(`close`,t);break;case`iframe`:case`object`:case`embed`:$(`load`,t);break;case`video`:case`audio`:for(n=0;n<gd.length;n++)$(gd[n],t);break;case`source`:$(`error`,t);break;case`img`:case`image`:case`link`:$(`error`,t),$(`load`,t);break;case`details`:$(`toggle`,t);break;case`input`:$(`invalid`,t),Ft(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case`select`:$(`invalid`,t);break;case`textarea`:$(`invalid`,t),zt(t,r.value,r.defaultValue,r.children)}n=r.children,typeof n!=`string`&&typeof n!=`number`&&typeof n!=`bigint`||t.textContent===``+n||!0===r.suppressHydrationWarning||jd(t.textContent,n)?(r.popover!=null&&($(`beforetoggle`,t),$(`toggle`,t)),r.onScroll!=null&&$(`scroll`,t),r.onScrollEnd!=null&&$(`scrollend`,t),r.onClick!=null&&(t.onclick=Jt),t=!0):t=!1,t||ki(e,!0)}function ji(e){for(wi=e.return;wi;)switch(wi.tag){case 5:case 31:case 13:Di=!1;return;case 27:case 3:Di=!0;return;default:wi=wi.return}}function Mi(e){if(e!==wi)return!1;if(!J)return ji(e),J=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=!(n!==`form`&&n!==`button`)||Ud(e.type,e.memoizedProps)),n=!n),n&&Ti&&ki(e),ji(e),t===13){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));Ti=uf(e)}else if(t===31){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));Ti=uf(e)}else t===27?(t=Ti,Zd(e.type)?(e=lf,lf=null,Ti=e):Ti=t):Ti=wi?cf(e.stateNode.nextSibling):null;return!0}function Ni(){Ti=wi=null,J=!1}function Pi(){var e=Ei;return e!==null&&(Yl===null?Yl=e:Yl.push.apply(Yl,e),Ei=null),e}function Fi(e){Ei===null?Ei=[e]:Ei.push(e)}var Ii=L(null),Li=null,Ri=null;function zi(e,t,n){z(Ii,t._currentValue),t._currentValue=n}function Bi(e){e._currentValue=Ii.current,R(Ii)}function Vi(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)===t?r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t):(e.childLanes|=t,r!==null&&(r.childLanes|=t)),e===n)break;e=e.return}}function Hi(e,t,n,r){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var o=a.dependencies;if(o!==null){var s=a.child;o=o.firstContext;a:for(;o!==null;){var c=o;o=a;for(var l=0;l<t.length;l++)if(c.context===t[l]){o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),Vi(o.return,n,e),r||(s=null);break a}o=c.next}}else if(a.tag===18){if(s=a.return,s===null)throw Error(i(341));s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),Vi(s,n,e),s=null}else s=a.child;if(s!==null)s.return=a;else for(s=a;s!==null;){if(s===e){s=null;break}if(a=s.sibling,a!==null){a.return=s.return,s=a;break}s=s.return}a=s}}function Ui(e,t,n,r){e=null;for(var a=t,o=!1;a!==null;){if(!o){if(a.flags&524288)o=!0;else if(a.flags&262144)break}if(a.tag===10){var s=a.alternate;if(s===null)throw Error(i(387));if(s=s.memoizedProps,s!==null){var c=a.type;hr(a.pendingProps.value,s.value)||(e===null?e=[c]:e.push(c))}}else if(a===V.current){if(s=a.alternate,s===null)throw Error(i(387));s.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(e===null?e=[Qf]:e.push(Qf))}a=a.return}e!==null&&Hi(t,e,n,r),t.flags|=262144}function Wi(e){for(e=e.firstContext;e!==null;){if(!hr(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Gi(e){Li=e,Ri=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Ki(e){return Ji(Li,e)}function qi(e,t){return Li===null&&Gi(e),Ji(e,t)}function Ji(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},Ri===null){if(e===null)throw Error(i(308));Ri=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Ri=Ri.next=t;return n}var Yi=typeof AbortController<`u`?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},Xi=t.unstable_scheduleCallback,Zi=t.unstable_NormalPriority,Qi={$$typeof:C,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function $i(){return{controller:new Yi,data:new Map,refCount:0}}function ea(e){e.refCount--,e.refCount===0&&Xi(Zi,function(){e.controller.abort()})}var ta=null,na=0,ra=0,ia=null;function aa(e,t){if(ta===null){var n=ta=[];na=0,ra=ud(),ia={status:`pending`,value:void 0,then:function(e){n.push(e)}}}return na++,t.then(oa,oa),t}function oa(){if(--na===0&&ta!==null){ia!==null&&(ia.status=`fulfilled`);var e=ta;ta=null,ra=0,ia=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function sa(e,t){var n=[],r={status:`pending`,value:null,reason:null,then:function(e){n.push(e)}};return e.then(function(){r.status=`fulfilled`,r.value=t;for(var e=0;e<n.length;e++)(0,n[e])(t)},function(e){for(r.status=`rejected`,r.reason=e,e=0;e<n.length;e++)(0,n[e])(void 0)}),r}var ca=N.S;N.S=function(e,t){Ql=U(),typeof t==`object`&&t&&typeof t.then==`function`&&aa(e,t),ca!==null&&ca(e,t)};var la=L(null);function ua(){var e=la.current;return e===null?Fl.pooledCache:e}function da(e,t){t===null?z(la,la.current):z(la,t.pool)}function fa(){var e=ua();return e===null?null:{parent:Qi._currentValue,pool:e}}var pa=Error(i(460)),ma=Error(i(474)),ha=Error(i(542)),ga={then:function(){}};function _a(e){return e=e.status,e===`fulfilled`||e===`rejected`}function va(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(Jt,Jt),t=n),t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,Sa(e),e;default:if(typeof t.status==`string`)t.then(Jt,Jt);else{if(e=Fl,e!==null&&100<e.shellSuspendCounter)throw Error(i(482));e=t,e.status=`pending`,e.then(function(e){if(t.status===`pending`){var n=t;n.status=`fulfilled`,n.value=e}},function(e){if(t.status===`pending`){var n=t;n.status=`rejected`,n.reason=e}})}switch(t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,Sa(e),e}throw ba=t,pa}}function ya(e){try{var t=e._init;return t(e._payload)}catch(e){throw typeof e==`object`&&e&&typeof e.then==`function`?(ba=e,pa):e}}var ba=null;function xa(){if(ba===null)throw Error(i(459));var e=ba;return ba=null,e}function Sa(e){if(e===pa||e===ha)throw Error(i(483))}var Ca=null,wa=0;function Ta(e){var t=wa;return wa+=1,Ca===null&&(Ca=[]),va(Ca,e,t)}function Ea(e,t){t=t.props.ref,e.ref=t===void 0?null:t}function Da(e,t){throw t.$$typeof===g?Error(i(525)):(e=Object.prototype.toString.call(t),Error(i(31,e===`[object Object]`?`object with keys {`+Object.keys(t).join(`, `)+`}`:e)))}function Oa(e){function t(t,n){if(e){var r=t.deletions;r===null?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;r!==null;)t(n,r),r=r.sibling;return null}function r(e){for(var t=new Map;e!==null;)e.key===null?t.set(e.index,e):t.set(e.key,e),e=e.sibling;return t}function a(e,t){return e=ni(e,t),e.index=0,e.sibling=null,e}function o(t,n,r){return t.index=r,e?(r=t.alternate,r===null?(t.flags|=67108866,n):(r=r.index,r<n?(t.flags|=67108866,n):r)):(t.flags|=1048576,n)}function s(t){return e&&t.alternate===null&&(t.flags|=67108866),t}function c(e,t,n,r){return t===null||t.tag!==6?(t=q(n,e.mode,r),t.return=e,t):(t=a(t,n),t.return=e,t)}function l(e,t,n,r){var i=n.type;return i===y?d(e,t,n.props.children,r,n.key):t!==null&&(t.elementType===i||typeof i==`object`&&i&&i.$$typeof===D&&ya(i)===t.type)?(t=a(t,n.props),Ea(t,n),t.return=e,t):(t=ii(n.type,n.key,n.props,null,e.mode,r),Ea(t,n),t.return=e,t)}function u(e,t,n,r){return t===null||t.tag!==4||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?(t=si(n,e.mode,r),t.return=e,t):(t=a(t,n.children||[]),t.return=e,t)}function d(e,t,n,r,i){return t===null||t.tag!==7?(t=ai(n,e.mode,r,i),t.return=e,t):(t=a(t,n),t.return=e,t)}function f(e,t,n){if(typeof t==`string`&&t!==``||typeof t==`number`||typeof t==`bigint`)return t=q(``+t,e.mode,n),t.return=e,t;if(typeof t==`object`&&t){switch(t.$$typeof){case _:return n=ii(t.type,t.key,t.props,null,e.mode,n),Ea(n,t),n.return=e,n;case v:return t=si(t,e.mode,n),t.return=e,t;case D:return t=ya(t),f(e,t,n)}if(ne(t)||j(t))return t=ai(t,e.mode,n,null),t.return=e,t;if(typeof t.then==`function`)return f(e,Ta(t),n);if(t.$$typeof===C)return f(e,qi(e,t),n);Da(e,t)}return null}function p(e,t,n,r){var i=t===null?null:t.key;if(typeof n==`string`&&n!==``||typeof n==`number`||typeof n==`bigint`)return i===null?c(e,t,``+n,r):null;if(typeof n==`object`&&n){switch(n.$$typeof){case _:return n.key===i?l(e,t,n,r):null;case v:return n.key===i?u(e,t,n,r):null;case D:return n=ya(n),p(e,t,n,r)}if(ne(n)||j(n))return i===null?d(e,t,n,r,null):null;if(typeof n.then==`function`)return p(e,t,Ta(n),r);if(n.$$typeof===C)return p(e,t,qi(e,n),r);Da(e,n)}return null}function m(e,t,n,r,i){if(typeof r==`string`&&r!==``||typeof r==`number`||typeof r==`bigint`)return e=e.get(n)||null,c(t,e,``+r,i);if(typeof r==`object`&&r){switch(r.$$typeof){case _:return e=e.get(r.key===null?n:r.key)||null,l(t,e,r,i);case v:return e=e.get(r.key===null?n:r.key)||null,u(t,e,r,i);case D:return r=ya(r),m(e,t,n,r,i)}if(ne(r)||j(r))return e=e.get(n)||null,d(t,e,r,i,null);if(typeof r.then==`function`)return m(e,t,n,Ta(r),i);if(r.$$typeof===C)return m(e,t,n,qi(t,r),i);Da(t,r)}return null}function h(i,a,s,c){for(var l=null,u=null,d=a,h=a=0,g=null;d!==null&&h<s.length;h++){d.index>h?(g=d,d=null):g=d.sibling;var _=p(i,d,s[h],c);if(_===null){d===null&&(d=g);break}e&&d&&_.alternate===null&&t(i,d),a=o(_,a,h),u===null?l=_:u.sibling=_,u=_,d=g}if(h===s.length)return n(i,d),J&&yi(i,h),l;if(d===null){for(;h<s.length;h++)d=f(i,s[h],c),d!==null&&(a=o(d,a,h),u===null?l=d:u.sibling=d,u=d);return J&&yi(i,h),l}for(d=r(d);h<s.length;h++)g=m(d,i,h,s[h],c),g!==null&&(e&&g.alternate!==null&&d.delete(g.key===null?h:g.key),a=o(g,a,h),u===null?l=g:u.sibling=g,u=g);return e&&d.forEach(function(e){return t(i,e)}),J&&yi(i,h),l}function g(a,s,c,l){if(c==null)throw Error(i(151));for(var u=null,d=null,h=s,g=s=0,_=null,v=c.next();h!==null&&!v.done;g++,v=c.next()){h.index>g?(_=h,h=null):_=h.sibling;var y=p(a,h,v.value,l);if(y===null){h===null&&(h=_);break}e&&h&&y.alternate===null&&t(a,h),s=o(y,s,g),d===null?u=y:d.sibling=y,d=y,h=_}if(v.done)return n(a,h),J&&yi(a,g),u;if(h===null){for(;!v.done;g++,v=c.next())v=f(a,v.value,l),v!==null&&(s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return J&&yi(a,g),u}for(h=r(h);!v.done;g++,v=c.next())v=m(h,a,g,v.value,l),v!==null&&(e&&v.alternate!==null&&h.delete(v.key===null?g:v.key),s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return e&&h.forEach(function(e){return t(a,e)}),J&&yi(a,g),u}function b(e,r,o,c){if(typeof o==`object`&&o&&o.type===y&&o.key===null&&(o=o.props.children),typeof o==`object`&&o){switch(o.$$typeof){case _:a:{for(var l=o.key;r!==null;){if(r.key===l){if(l=o.type,l===y){if(r.tag===7){n(e,r.sibling),c=a(r,o.props.children),c.return=e,e=c;break a}}else if(r.elementType===l||typeof l==`object`&&l&&l.$$typeof===D&&ya(l)===r.type){n(e,r.sibling),c=a(r,o.props),Ea(c,o),c.return=e,e=c;break a}n(e,r);break}else t(e,r);r=r.sibling}o.type===y?(c=ai(o.props.children,e.mode,c,o.key),c.return=e,e=c):(c=ii(o.type,o.key,o.props,null,e.mode,c),Ea(c,o),c.return=e,e=c)}return s(e);case v:a:{for(l=o.key;r!==null;){if(r.key===l)if(r.tag===4&&r.stateNode.containerInfo===o.containerInfo&&r.stateNode.implementation===o.implementation){n(e,r.sibling),c=a(r,o.children||[]),c.return=e,e=c;break a}else{n(e,r);break}else t(e,r);r=r.sibling}c=si(o,e.mode,c),c.return=e,e=c}return s(e);case D:return o=ya(o),b(e,r,o,c)}if(ne(o))return h(e,r,o,c);if(j(o)){if(l=j(o),typeof l!=`function`)throw Error(i(150));return o=l.call(o),g(e,r,o,c)}if(typeof o.then==`function`)return b(e,r,Ta(o),c);if(o.$$typeof===C)return b(e,r,qi(e,o),c);Da(e,o)}return typeof o==`string`&&o!==``||typeof o==`number`||typeof o==`bigint`?(o=``+o,r!==null&&r.tag===6?(n(e,r.sibling),c=a(r,o),c.return=e,e=c):(n(e,r),c=q(o,e.mode,c),c.return=e,e=c),s(e)):n(e,r)}return function(e,t,n,r){try{wa=0;var i=b(e,t,n,r);return Ca=null,i}catch(t){if(t===pa||t===ha)throw t;var a=ei(29,t,null,e.mode);return a.lanes=r,a.return=e,a}}}var ka=Oa(!0),Aa=Oa(!1),ja=!1;function Ma(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Na(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Pa(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Fa(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,X&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,t=K(e),Zr(e,null,n),t}return Jr(e,r,t,n),K(e)}function Ia(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,n&4194048)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Je(e,n)}}function La(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,callbacks:r.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var Ra=!1;function za(){if(Ra){var e=ia;if(e!==null)throw e}}function Ba(e,t,n,r){Ra=!1;var i=e.updateQueue;ja=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var c=s,l=c.next;c.next=null,o===null?a=l:o.next=l,o=c;var u=e.alternate;u!==null&&(u=u.updateQueue,s=u.lastBaseUpdate,s!==o&&(s===null?u.firstBaseUpdate=l:s.next=l,u.lastBaseUpdate=c))}if(a!==null){var d=i.baseState;o=0,u=l=c=null,s=a;do{var f=s.lane&-536870913,p=f!==s.lane;if(p?(Q&f)===f:(r&f)===f){f!==0&&f===ra&&(Ra=!0),u!==null&&(u=u.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});a:{var m=e,g=s;f=t;var _=n;switch(g.tag){case 1:if(m=g.payload,typeof m==`function`){d=m.call(_,d,f);break a}d=m;break a;case 3:m.flags=m.flags&-65537|128;case 0:if(m=g.payload,f=typeof m==`function`?m.call(_,d,f):m,f==null)break a;d=h({},d,f);break a;case 2:ja=!0}}f=s.callback,f!==null&&(e.flags|=64,p&&(e.flags|=8192),p=i.callbacks,p===null?i.callbacks=[f]:p.push(f))}else p={lane:f,tag:s.tag,payload:s.payload,callback:s.callback,next:null},u===null?(l=u=p,c=d):u=u.next=p,o|=f;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;p=s,s=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(1);u===null&&(c=d),i.baseState=c,i.firstBaseUpdate=l,i.lastBaseUpdate=u,a===null&&(i.shared.lanes=0),Ul|=o,e.lanes=o,e.memoizedState=d}}function Va(e,t){if(typeof e!=`function`)throw Error(i(191,e));e.call(t)}function Ha(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)Va(n[e],t)}var Ua=L(null),Wa=L(0);function Ga(e,t){e=Vl,z(Wa,e),z(Ua,t),Vl=e|t.baseLanes}function Ka(){z(Wa,Vl),z(Ua,Ua.current)}function qa(){Vl=Wa.current,R(Ua),R(Wa)}var Ja=L(null),Ya=null;function Xa(e){var t=e.alternate;z(to,to.current&1),z(Ja,e),Ya===null&&(t===null||Ua.current!==null||t.memoizedState!==null)&&(Ya=e)}function Za(e){z(to,to.current),z(Ja,e),Ya===null&&(Ya=e)}function Qa(e){e.tag===22?(z(to,to.current),z(Ja,e),Ya===null&&(Ya=e)):$a(e)}function $a(){z(to,to.current),z(Ja,Ja.current)}function eo(e){R(Ja),Ya===e&&(Ya=null),R(to)}var to=L(0);function no(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||af(n)||of(n)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder===`forwards`||t.memoizedProps.revealOrder===`backwards`||t.memoizedProps.revealOrder===`unstable_legacy-backwards`||t.memoizedProps.revealOrder===`together`)){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var ro=0,Y=null,io=null,ao=null,oo=!1,so=!1,co=!1,lo=0,uo=0,fo=null,po=0;function mo(){throw Error(i(321))}function ho(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!hr(e[n],t[n]))return!1;return!0}function go(e,t,n,r,i,a){return ro=a,Y=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,N.H=e===null||e.memoizedState===null?Ns:Ps,co=!1,a=n(r,i),co=!1,so&&(a=vo(t,n,r,i)),_o(e),a}function _o(e){N.H=Ms;var t=io!==null&&io.next!==null;if(ro=0,ao=io=Y=null,oo=!1,uo=0,fo=null,t)throw Error(i(300));e===null||Zs||(e=e.dependencies,e!==null&&Wi(e)&&(Zs=!0))}function vo(e,t,n,r){Y=e;var a=0;do{if(so&&(fo=null),uo=0,so=!1,25<=a)throw Error(i(301));if(a+=1,ao=io=null,e.updateQueue!=null){var o=e.updateQueue;o.lastEffect=null,o.events=null,o.stores=null,o.memoCache!=null&&(o.memoCache.index=0)}N.H=Fs,o=t(n,r)}while(so);return o}function yo(){var e=N.H,t=e.useState()[0];return t=typeof t.then==`function`?Eo(t):t,e=e.useState()[0],(io===null?null:io.memoizedState)!==e&&(Y.flags|=1024),t}function bo(){var e=lo!==0;return lo=0,e}function xo(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function So(e){if(oo){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}oo=!1}ro=0,ao=io=Y=null,so=!1,uo=lo=0,fo=null}function Co(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ao===null?Y.memoizedState=ao=e:ao=ao.next=e,ao}function wo(){if(io===null){var e=Y.alternate;e=e===null?null:e.memoizedState}else e=io.next;var t=ao===null?Y.memoizedState:ao.next;if(t!==null)ao=t,io=e;else{if(e===null)throw Y.alternate===null?Error(i(467)):Error(i(310));io=e,e={memoizedState:io.memoizedState,baseState:io.baseState,baseQueue:io.baseQueue,queue:io.queue,next:null},ao===null?Y.memoizedState=ao=e:ao=ao.next=e}return ao}function To(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Eo(e){var t=uo;return uo+=1,fo===null&&(fo=[]),e=va(fo,e,t),t=Y,(ao===null?t.memoizedState:ao.next)===null&&(t=t.alternate,N.H=t===null||t.memoizedState===null?Ns:Ps),e}function Do(e){if(typeof e==`object`&&e){if(typeof e.then==`function`)return Eo(e);if(e.$$typeof===C)return Ki(e)}throw Error(i(438,String(e)))}function Oo(e){var t=null,n=Y.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var r=Y.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(t??={data:[],index:0},n===null&&(n=To(),Y.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=k;return t.index++,n}function ko(e,t){return typeof t==`function`?t(e):t}function Ao(e){return jo(wo(),io,e)}function jo(e,t,n){var r=e.queue;if(r===null)throw Error(i(311));r.lastRenderedReducer=n;var a=e.baseQueue,o=r.pending;if(o!==null){if(a!==null){var s=a.next;a.next=o.next,o.next=s}t.baseQueue=a=o,r.pending=null}if(o=e.baseState,a===null)e.memoizedState=o;else{t=a.next;var c=s=null,l=null,u=t,d=!1;do{var f=u.lane&-536870913;if(f===u.lane?(ro&f)===f:(Q&f)===f){var p=u.revertLane;if(p===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),f===ra&&(d=!0);else if((ro&p)===p){u=u.next,p===ra&&(d=!0);continue}else f={lane:0,revertLane:u.revertLane,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=f,s=o):l=l.next=f,Y.lanes|=p,Ul|=p;f=u.action,co&&n(o,f),o=u.hasEagerState?u.eagerState:n(o,f)}else p={lane:f,revertLane:u.revertLane,gesture:u.gesture,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=p,s=o):l=l.next=p,Y.lanes|=f,Ul|=f;u=u.next}while(u!==null&&u!==t);if(l===null?s=o:l.next=c,!hr(o,e.memoizedState)&&(Zs=!0,d&&(n=ia,n!==null)))throw n;e.memoizedState=o,e.baseState=s,e.baseQueue=l,r.lastRenderedState=o}return a===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function Mo(e){var t=wo(),n=t.queue;if(n===null)throw Error(i(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,o=t.memoizedState;if(a!==null){n.pending=null;var s=a=a.next;do o=e(o,s.action),s=s.next;while(s!==a);hr(o,t.memoizedState)||(Zs=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function No(e,t,n){var r=Y,a=wo(),o=J;if(o){if(n===void 0)throw Error(i(407));n=n()}else n=t();var s=!hr((io||a).memoizedState,n);if(s&&(a.memoizedState=n,Zs=!0),a=a.queue,is(Io.bind(null,r,a,e),[e]),a.getSnapshot!==t||s||ao!==null&&ao.memoizedState.tag&1){if(r.flags|=2048,$o(9,{destroy:void 0},Fo.bind(null,r,a,n,t),null),Fl===null)throw Error(i(349));o||ro&127||Po(r,t,n)}return n}function Po(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=Y.updateQueue,t===null?(t=To(),Y.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Fo(e,t,n,r){t.value=n,t.getSnapshot=r,Lo(t)&&Ro(e)}function Io(e,t,n){return n(function(){Lo(t)&&Ro(e)})}function Lo(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!hr(e,n)}catch{return!0}}function Ro(e){var t=Xr(e,2);t!==null&&pu(t,e,2)}function zo(e){var t=Co();if(typeof e==`function`){var n=e;if(e=n(),co){je(!0);try{n()}finally{je(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ko,lastRenderedState:e},t}function Bo(e,t,n,r){return e.baseState=n,jo(e,io,typeof r==`function`?r:ko)}function Vo(e,t,n,r,a){if(ks(e))throw Error(i(485));if(e=t.action,e!==null){var o={payload:a,action:e,next:null,isTransition:!0,status:`pending`,value:null,reason:null,listeners:[],then:function(e){o.listeners.push(e)}};N.T===null?o.isTransition=!1:n(!0),r(o),n=t.pending,n===null?(o.next=t.pending=o,Ho(t,o)):(o.next=n.next,t.pending=n.next=o)}}function Ho(e,t){var n=t.action,r=t.payload,i=e.state;if(t.isTransition){var a=N.T,o={};N.T=o;try{var s=n(i,r),c=N.S;c!==null&&c(o,s),Uo(e,t,s)}catch(n){Go(e,t,n)}finally{a!==null&&o.types!==null&&(a.types=o.types),N.T=a}}else try{a=n(i,r),Uo(e,t,a)}catch(n){Go(e,t,n)}}function Uo(e,t,n){typeof n==`object`&&n&&typeof n.then==`function`?n.then(function(n){Wo(e,t,n)},function(n){return Go(e,t,n)}):Wo(e,t,n)}function Wo(e,t,n){t.status=`fulfilled`,t.value=n,Ko(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,Ho(e,n)))}function Go(e,t,n){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do t.status=`rejected`,t.reason=n,Ko(t),t=t.next;while(t!==r)}e.action=null}function Ko(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function qo(e,t){return t}function Jo(e,t){if(J){var n=Fl.formState;if(n!==null){a:{var r=Y;if(J){if(Ti){b:{for(var i=Ti,a=Di;i.nodeType!==8;){if(!a){i=null;break b}if(i=cf(i.nextSibling),i===null){i=null;break b}}a=i.data,i=a===`F!`||a===`F`?i:null}if(i){Ti=cf(i.nextSibling),r=i.data===`F!`;break a}}ki(r)}r=!1}r&&(t=n[0])}}return n=Co(),n.memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:qo,lastRenderedState:t},n.queue=r,n=Es.bind(null,Y,r),r.dispatch=n,r=zo(!1),a=Os.bind(null,Y,!1,r.queue),r=Co(),i={state:t,dispatch:null,action:e,pending:null},r.queue=i,n=Vo.bind(null,Y,i,a,n),i.dispatch=n,r.memoizedState=e,[t,n,!1]}function Yo(e){return Xo(wo(),io,e)}function Xo(e,t,n){if(t=jo(e,t,qo)[0],e=Ao(ko)[0],typeof t==`object`&&t&&typeof t.then==`function`)try{var r=Eo(t)}catch(e){throw e===pa?ha:e}else r=t;t=wo();var i=t.queue,a=i.dispatch;return n!==t.memoizedState&&(Y.flags|=2048,$o(9,{destroy:void 0},Zo.bind(null,i,n),null)),[r,a,e]}function Zo(e,t){e.action=t}function Qo(e){var t=wo(),n=io;if(n!==null)return Xo(t,n,e);wo(),t=t.memoizedState,n=wo();var r=n.queue.dispatch;return n.memoizedState=e,[t,r,!1]}function $o(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},t=Y.updateQueue,t===null&&(t=To(),Y.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function es(){return wo().memoizedState}function ts(e,t,n,r){var i=Co();Y.flags|=e,i.memoizedState=$o(1|t,{destroy:void 0},n,r===void 0?null:r)}function ns(e,t,n,r){var i=wo();r=r===void 0?null:r;var a=i.memoizedState.inst;io!==null&&r!==null&&ho(r,io.memoizedState.deps)?i.memoizedState=$o(t,a,n,r):(Y.flags|=e,i.memoizedState=$o(1|t,a,n,r))}function rs(e,t){ts(8390656,8,e,t)}function is(e,t){ns(2048,8,e,t)}function as(e){Y.flags|=4;var t=Y.updateQueue;if(t===null)t=To(),Y.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function os(e){var t=wo().memoizedState;return as({ref:t,nextImpl:e}),function(){if(X&2)throw Error(i(440));return t.impl.apply(void 0,arguments)}}function ss(e,t){return ns(4,2,e,t)}function cs(e,t){return ns(4,4,e,t)}function ls(e,t){if(typeof t==`function`){e=e();var n=t(e);return function(){typeof n==`function`?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function us(e,t,n){n=n==null?null:n.concat([e]),ns(4,4,ls.bind(null,t,e),n)}function ds(){}function fs(e,t){var n=wo();t=t===void 0?null:t;var r=n.memoizedState;return t!==null&&ho(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function ps(e,t){var n=wo();t=t===void 0?null:t;var r=n.memoizedState;if(t!==null&&ho(t,r[1]))return r[0];if(r=e(),co){je(!0);try{e()}finally{je(!1)}}return n.memoizedState=[r,t],r}function ms(e,t,n){return n===void 0||ro&1073741824&&!(Q&261930)?e.memoizedState=t:(e.memoizedState=n,e=fu(),Y.lanes|=e,Ul|=e,n)}function hs(e,t,n,r){return hr(n,t)?n:Ua.current===null?!(ro&42)||ro&1073741824&&!(Q&261930)?(Zs=!0,e.memoizedState=n):(e=fu(),Y.lanes|=e,Ul|=e,t):(e=ms(e,n,r),hr(e,t)||(Zs=!0),e)}function gs(e,t,n,r,i){var a=P.p;P.p=a!==0&&8>a?a:8;var o=N.T,s={};N.T=s,Os(e,!1,t,n);try{var c=i(),l=N.S;l!==null&&l(s,c),typeof c==`object`&&c&&typeof c.then==`function`?Ds(e,t,sa(c,r),du(e)):Ds(e,t,r,du(e))}catch(n){Ds(e,t,{then:function(){},status:`rejected`,reason:n},du())}finally{P.p=a,o!==null&&s.types!==null&&(o.types=s.types),N.T=o}}function _s(){}function vs(e,t,n,r){if(e.tag!==5)throw Error(i(476));var a=ys(e).queue;gs(e,a,t,F,n===null?_s:function(){return bs(e),n(r)})}function ys(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:F,baseState:F,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ko,lastRenderedState:F},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ko,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function bs(e){var t=ys(e);t.next===null&&(t=e.alternate.memoizedState),Ds(e,t.next.queue,{},du())}function xs(){return Ki(Qf)}function Ss(){return wo().memoizedState}function Cs(){return wo().memoizedState}function ws(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=du();e=Pa(n);var r=Fa(t,e,n);r!==null&&(pu(r,t,n),Ia(r,t,n)),t={cache:$i()},e.payload=t;return}t=t.return}}function Ts(e,t,n){var r=du();n={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},ks(e)?As(t,n):(n=Yr(e,t,n,r),n!==null&&(pu(n,e,r),js(n,t,r)))}function Es(e,t,n){Ds(e,t,n,du())}function Ds(e,t,n,r){var i={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(ks(e))As(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(i.hasEagerState=!0,i.eagerState=s,hr(s,o))return Jr(e,t,i,0),Fl===null&&qr(),!1}catch{}if(n=Yr(e,t,i,r),n!==null)return pu(n,e,r),js(n,t,r),!0}return!1}function Os(e,t,n,r){if(r={lane:2,revertLane:ud(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},ks(e)){if(t)throw Error(i(479))}else t=Yr(e,n,r,2),t!==null&&pu(t,e,2)}function ks(e){var t=e.alternate;return e===Y||t!==null&&t===Y}function As(e,t){so=oo=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function js(e,t,n){if(n&4194048){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Je(e,n)}}var Ms={readContext:Ki,use:Do,useCallback:mo,useContext:mo,useEffect:mo,useImperativeHandle:mo,useLayoutEffect:mo,useInsertionEffect:mo,useMemo:mo,useReducer:mo,useRef:mo,useState:mo,useDebugValue:mo,useDeferredValue:mo,useTransition:mo,useSyncExternalStore:mo,useId:mo,useHostTransitionStatus:mo,useFormState:mo,useActionState:mo,useOptimistic:mo,useMemoCache:mo,useCacheRefresh:mo};Ms.useEffectEvent=mo;var Ns={readContext:Ki,use:Do,useCallback:function(e,t){return Co().memoizedState=[e,t===void 0?null:t],e},useContext:Ki,useEffect:rs,useImperativeHandle:function(e,t,n){n=n==null?null:n.concat([e]),ts(4194308,4,ls.bind(null,t,e),n)},useLayoutEffect:function(e,t){return ts(4194308,4,e,t)},useInsertionEffect:function(e,t){ts(4,2,e,t)},useMemo:function(e,t){var n=Co();t=t===void 0?null:t;var r=e();if(co){je(!0);try{e()}finally{je(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=Co();if(n!==void 0){var i=n(t);if(co){je(!0);try{n(t)}finally{je(!1)}}}else i=t;return r.memoizedState=r.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},r.queue=e,e=e.dispatch=Ts.bind(null,Y,e),[r.memoizedState,e]},useRef:function(e){var t=Co();return e={current:e},t.memoizedState=e},useState:function(e){e=zo(e);var t=e.queue,n=Es.bind(null,Y,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:ds,useDeferredValue:function(e,t){return ms(Co(),e,t)},useTransition:function(){var e=zo(!1);return e=gs.bind(null,Y,e.queue,!0,!1),Co().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=Y,a=Co();if(J){if(n===void 0)throw Error(i(407));n=n()}else{if(n=t(),Fl===null)throw Error(i(349));Q&127||Po(r,t,n)}a.memoizedState=n;var o={value:n,getSnapshot:t};return a.queue=o,rs(Io.bind(null,r,o,e),[e]),r.flags|=2048,$o(9,{destroy:void 0},Fo.bind(null,r,o,n,t),null),n},useId:function(){var e=Co(),t=Fl.identifierPrefix;if(J){var n=vi,r=_i;n=(r&~(1<<32-Me(r)-1)).toString(32)+n,t=`_`+t+`R_`+n,n=lo++,0<n&&(t+=`H`+n.toString(32)),t+=`_`}else n=po++,t=`_`+t+`r_`+n.toString(32)+`_`;return e.memoizedState=t},useHostTransitionStatus:xs,useFormState:Jo,useActionState:Jo,useOptimistic:function(e){var t=Co();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=Os.bind(null,Y,!0,n),n.dispatch=t,[e,t]},useMemoCache:Oo,useCacheRefresh:function(){return Co().memoizedState=ws.bind(null,Y)},useEffectEvent:function(e){var t=Co(),n={impl:e};return t.memoizedState=n,function(){if(X&2)throw Error(i(440));return n.impl.apply(void 0,arguments)}}},Ps={readContext:Ki,use:Do,useCallback:fs,useContext:Ki,useEffect:is,useImperativeHandle:us,useInsertionEffect:ss,useLayoutEffect:cs,useMemo:ps,useReducer:Ao,useRef:es,useState:function(){return Ao(ko)},useDebugValue:ds,useDeferredValue:function(e,t){return hs(wo(),io.memoizedState,e,t)},useTransition:function(){var e=Ao(ko)[0],t=wo().memoizedState;return[typeof e==`boolean`?e:Eo(e),t]},useSyncExternalStore:No,useId:Ss,useHostTransitionStatus:xs,useFormState:Yo,useActionState:Yo,useOptimistic:function(e,t){return Bo(wo(),io,e,t)},useMemoCache:Oo,useCacheRefresh:Cs};Ps.useEffectEvent=os;var Fs={readContext:Ki,use:Do,useCallback:fs,useContext:Ki,useEffect:is,useImperativeHandle:us,useInsertionEffect:ss,useLayoutEffect:cs,useMemo:ps,useReducer:Mo,useRef:es,useState:function(){return Mo(ko)},useDebugValue:ds,useDeferredValue:function(e,t){var n=wo();return io===null?ms(n,e,t):hs(n,io.memoizedState,e,t)},useTransition:function(){var e=Mo(ko)[0],t=wo().memoizedState;return[typeof e==`boolean`?e:Eo(e),t]},useSyncExternalStore:No,useId:Ss,useHostTransitionStatus:xs,useFormState:Qo,useActionState:Qo,useOptimistic:function(e,t){var n=wo();return io===null?(n.baseState=e,[e,n.queue.dispatch]):Bo(n,io,e,t)},useMemoCache:Oo,useCacheRefresh:Cs};Fs.useEffectEvent=os;function Is(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:h({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Ls={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=du(),i=Pa(r);i.payload=t,n!=null&&(i.callback=n),t=Fa(e,i,r),t!==null&&(pu(t,e,r),Ia(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=du(),i=Pa(r);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=Fa(e,i,r),t!==null&&(pu(t,e,r),Ia(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=du(),r=Pa(n);r.tag=2,t!=null&&(r.callback=t),t=Fa(e,r,n),t!==null&&(pu(t,e,n),Ia(t,e,n))}};function Rs(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate==`function`?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!gr(n,r)||!gr(i,a):!0}function zs(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps==`function`&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps==`function`&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Ls.enqueueReplaceState(t,t.state,null)}function Bs(e,t){var n=t;if(`ref`in t)for(var r in n={},t)r!==`ref`&&(n[r]=t[r]);if(e=e.defaultProps)for(var i in n===t&&(n=h({},n)),e)n[i]===void 0&&(n[i]=e[i]);return n}function Vs(e){Ur(e)}function Hs(e){console.error(e)}function Us(e){Ur(e)}function Ws(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(e){setTimeout(function(){throw e})}}function Gs(e,t,n){try{var r=e.onCaughtError;r(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(e){setTimeout(function(){throw e})}}function Ks(e,t,n){return n=Pa(n),n.tag=3,n.payload={element:null},n.callback=function(){Ws(e,t)},n}function qs(e){return e=Pa(e),e.tag=3,e}function Js(e,t,n,r){var i=n.type.getDerivedStateFromError;if(typeof i==`function`){var a=r.value;e.payload=function(){return i(a)},e.callback=function(){Gs(t,n,r)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch==`function`&&(e.callback=function(){Gs(t,n,r),typeof i!=`function`&&(tu===null?tu=new Set([this]):tu.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:e===null?``:e})})}function Ys(e,t,n,r,a){if(n.flags|=32768,typeof r==`object`&&r&&typeof r.then==`function`){if(t=n.alternate,t!==null&&Ui(t,n,a,!0),n=Ja.current,n!==null){switch(n.tag){case 31:case 13:return Ya===null?Tu():n.alternate===null&&Hl===0&&(Hl=3),n.flags&=-257,n.flags|=65536,n.lanes=a,r===ga?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([r]):t.add(r),Wu(e,r,a)),!1;case 22:return n.flags|=65536,r===ga?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([r]):n.add(r)),Wu(e,r,a)),!1}throw Error(i(435,n.tag))}return Wu(e,r,a),Tu(),!1}if(J)return t=Ja.current,t===null?(r!==Oi&&(t=Error(i(423),{cause:r}),Fi(li(t,n))),e=e.current.alternate,e.flags|=65536,a&=-a,e.lanes|=a,r=li(r,n),a=Ks(e.stateNode,r,a),La(e,a),Hl!==4&&(Hl=2)):(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=a,r!==Oi&&(e=Error(i(422),{cause:r}),Fi(li(e,n)))),!1;var o=Error(i(520),{cause:r});if(o=li(o,n),Jl===null?Jl=[o]:Jl.push(o),Hl!==4&&(Hl=2),t===null)return!0;r=li(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=a&-a,n.lanes|=e,e=Ks(n.stateNode,r,e),La(n,e),!1;case 1:if(t=n.type,o=n.stateNode,!(n.flags&128)&&(typeof t.getDerivedStateFromError==`function`||o!==null&&typeof o.componentDidCatch==`function`&&(tu===null||!tu.has(o))))return n.flags|=65536,a&=-a,n.lanes|=a,a=qs(a),Js(a,e,n,r),La(n,a),!1}n=n.return}while(n!==null);return!1}var Xs=Error(i(461)),Zs=!1;function Qs(e,t,n,r){t.child=e===null?Aa(t,null,n,r):ka(t,e.child,n,r)}function $s(e,t,n,r,i){n=n.render;var a=t.ref;if(`ref`in r){var o={};for(var s in r)s!==`ref`&&(o[s]=r[s])}else o=r;return Gi(t),r=go(e,t,n,o,a,i),s=bo(),e!==null&&!Zs?(xo(e,t,i),Cc(e,t,i)):(J&&s&&xi(t),t.flags|=1,Qs(e,t,r,i),t.child)}function ec(e,t,n,r,i){if(e===null){var a=n.type;return typeof a==`function`&&!ti(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,tc(e,t,a,r,i)):(e=ii(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!wc(e,i)){var o=a.memoizedProps;if(n=n.compare,n=n===null?gr:n,n(o,r)&&e.ref===t.ref)return Cc(e,t,i)}return t.flags|=1,e=ni(a,r),e.ref=t.ref,e.return=t,t.child=e}function tc(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(gr(a,r)&&e.ref===t.ref)if(Zs=!1,t.pendingProps=r=a,wc(e,i))e.flags&131072&&(Zs=!0);else return t.lanes=e.lanes,Cc(e,t,i)}return lc(e,t,n,r,i)}function nc(e,t,n,r){var i=r.children,a=e===null?null:e.memoizedState;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode===`hidden`){if(t.flags&128){if(a=a===null?n:a.baseLanes|n,e!==null){for(r=t.child=e.child,i=0;r!==null;)i=i|r.lanes|r.childLanes,r=r.sibling;r=i&~a}else r=0,t.child=null;return ic(e,t,a,n,r)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&da(t,a===null?null:a.cachePool),a===null?Ka():Ga(t,a),Qa(t);else return r=t.lanes=536870912,ic(e,t,a===null?n:a.baseLanes|n,n,r)}else a===null?(e!==null&&da(t,null),Ka(),$a(t)):(da(t,a.cachePool),Ga(t,a),$a(t),t.memoizedState=null);return Qs(e,t,i,n),t.child}function rc(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function ic(e,t,n,r,i){var a=ua();return a=a===null?null:{parent:Qi._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&da(t,null),Ka(),Qa(t),e!==null&&Ui(e,t,r,!0),t.childLanes=i,null}function ac(e,t){return t=vc({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function oc(e,t,n){return ka(t,e.child,null,n),e=ac(t,t.pendingProps),e.flags|=2,eo(t),t.memoizedState=null,e}function sc(e,t,n){var r=t.pendingProps,a=(t.flags&128)!=0;if(t.flags&=-129,e===null){if(J){if(r.mode===`hidden`)return e=ac(t,r),t.lanes=536870912,rc(null,e);if(Za(t),(e=Ti)?(e=rf(e,Di),e=e!==null&&e.data===`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:gi===null?null:{id:_i,overflow:vi},retryLane:536870912,hydrationErrors:null},n=oi(e),n.return=t,t.child=n,wi=t,Ti=null)):e=null,e===null)throw ki(t);return t.lanes=536870912,null}return ac(t,r)}var o=e.memoizedState;if(o!==null){var s=o.dehydrated;if(Za(t),a)if(t.flags&256)t.flags&=-257,t=oc(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(i(558));else if(Zs||Ui(e,t,n,!1),a=(n&e.childLanes)!==0,Zs||a){if(r=Fl,r!==null&&(s=Ye(r,n),s!==0&&s!==o.retryLane))throw o.retryLane=s,Xr(e,s),pu(r,e,s),Xs;Tu(),t=oc(e,t,n)}else e=o.treeContext,Ti=cf(s.nextSibling),wi=t,J=!0,Ei=null,Di=!1,e!==null&&Ci(t,e),t=ac(t,r),t.flags|=4096;return t}return e=ni(e.child,{mode:r.mode,children:r.children}),e.ref=t.ref,t.child=e,e.return=t,e}function cc(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!=`function`&&typeof n!=`object`)throw Error(i(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function lc(e,t,n,r,i){return Gi(t),n=go(e,t,n,r,void 0,i),r=bo(),e!==null&&!Zs?(xo(e,t,i),Cc(e,t,i)):(J&&r&&xi(t),t.flags|=1,Qs(e,t,n,i),t.child)}function uc(e,t,n,r,i,a){return Gi(t),t.updateQueue=null,n=vo(t,r,n,i),_o(e),r=bo(),e!==null&&!Zs?(xo(e,t,a),Cc(e,t,a)):(J&&r&&xi(t),t.flags|=1,Qs(e,t,n,a),t.child)}function dc(e,t,n,r,i){if(Gi(t),t.stateNode===null){var a=Qr,o=n.contextType;typeof o==`object`&&o&&(a=Ki(o)),a=new n(r,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=Ls,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=r,a.state=t.memoizedState,a.refs={},Ma(t),o=n.contextType,a.context=typeof o==`object`&&o?Ki(o):Qr,a.state=t.memoizedState,o=n.getDerivedStateFromProps,typeof o==`function`&&(Is(t,n,o,r),a.state=t.memoizedState),typeof n.getDerivedStateFromProps==`function`||typeof a.getSnapshotBeforeUpdate==`function`||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(o=a.state,typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount(),o!==a.state&&Ls.enqueueReplaceState(a,a.state,null),Ba(t,r,a,i),za(),a.state=t.memoizedState),typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!0}else if(e===null){a=t.stateNode;var s=t.memoizedProps,c=Bs(n,s);a.props=c;var l=a.context,u=n.contextType;o=Qr,typeof u==`object`&&u&&(o=Ki(u));var d=n.getDerivedStateFromProps;u=typeof d==`function`||typeof a.getSnapshotBeforeUpdate==`function`,s=t.pendingProps!==s,u||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(s||l!==o)&&zs(t,a,r,o),ja=!1;var f=t.memoizedState;a.state=f,Ba(t,r,a,i),za(),l=t.memoizedState,s||f!==l||ja?(typeof d==`function`&&(Is(t,n,d,r),l=t.memoizedState),(c=ja||Rs(t,n,c,r,f,l,o))?(u||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount==`function`&&(t.flags|=4194308)):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=o,r=c):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,Na(e,t),o=t.memoizedProps,u=Bs(n,o),a.props=u,d=t.pendingProps,f=a.context,l=n.contextType,c=Qr,typeof l==`object`&&l&&(c=Ki(l)),s=n.getDerivedStateFromProps,(l=typeof s==`function`||typeof a.getSnapshotBeforeUpdate==`function`)||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(o!==d||f!==c)&&zs(t,a,r,c),ja=!1,f=t.memoizedState,a.state=f,Ba(t,r,a,i),za();var p=t.memoizedState;o!==d||f!==p||ja||e!==null&&e.dependencies!==null&&Wi(e.dependencies)?(typeof s==`function`&&(Is(t,n,s,r),p=t.memoizedState),(u=ja||Rs(t,n,u,r,f,p,c)||e!==null&&e.dependencies!==null&&Wi(e.dependencies))?(l||typeof a.UNSAFE_componentWillUpdate!=`function`&&typeof a.componentWillUpdate!=`function`||(typeof a.componentWillUpdate==`function`&&a.componentWillUpdate(r,p,c),typeof a.UNSAFE_componentWillUpdate==`function`&&a.UNSAFE_componentWillUpdate(r,p,c)),typeof a.componentDidUpdate==`function`&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate==`function`&&(t.flags|=1024)):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=p),a.props=r,a.state=p,a.context=c,r=u):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return a=r,cc(e,t),r=(t.flags&128)!=0,a||r?(a=t.stateNode,n=r&&typeof n.getDerivedStateFromError!=`function`?null:a.render(),t.flags|=1,e!==null&&r?(t.child=ka(t,e.child,null,i),t.child=ka(t,null,n,i)):Qs(e,t,n,i),t.memoizedState=a.state,e=t.child):e=Cc(e,t,i),e}function fc(e,t,n,r){return Ni(),t.flags|=256,Qs(e,t,n,r),t.child}var pc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function mc(e){return{baseLanes:e,cachePool:fa()}}function hc(e,t,n){return e=e===null?0:e.childLanes&~n,t&&(e|=Kl),e}function gc(e,t,n){var r=t.pendingProps,a=!1,o=(t.flags&128)!=0,s;if((s=o)||(s=e!==null&&e.memoizedState===null?!1:(to.current&2)!=0),s&&(a=!0,t.flags&=-129),s=(t.flags&32)!=0,t.flags&=-33,e===null){if(J){if(a?Xa(t):$a(t),(e=Ti)?(e=rf(e,Di),e=e!==null&&e.data!==`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:gi===null?null:{id:_i,overflow:vi},retryLane:536870912,hydrationErrors:null},n=oi(e),n.return=t,t.child=n,wi=t,Ti=null)):e=null,e===null)throw ki(t);return of(e)?t.lanes=32:t.lanes=536870912,null}var c=r.children;return r=r.fallback,a?($a(t),a=t.mode,c=vc({mode:`hidden`,children:c},a),r=ai(r,a,n,null),c.return=t,r.return=t,c.sibling=r,t.child=c,r=t.child,r.memoizedState=mc(n),r.childLanes=hc(e,s,n),t.memoizedState=pc,rc(null,r)):(Xa(t),_c(t,c))}var l=e.memoizedState;if(l!==null&&(c=l.dehydrated,c!==null)){if(o)t.flags&256?(Xa(t),t.flags&=-257,t=yc(e,t,n)):t.memoizedState===null?($a(t),c=r.fallback,a=t.mode,r=vc({mode:`visible`,children:r.children},a),c=ai(c,a,n,null),c.flags|=2,r.return=t,c.return=t,r.sibling=c,t.child=r,ka(t,e.child,null,n),r=t.child,r.memoizedState=mc(n),r.childLanes=hc(e,s,n),t.memoizedState=pc,t=rc(null,r)):($a(t),t.child=e.child,t.flags|=128,t=null);else if(Xa(t),of(c)){if(s=c.nextSibling&&c.nextSibling.dataset,s)var u=s.dgst;s=u,r=Error(i(419)),r.stack=``,r.digest=s,Fi({value:r,source:null,stack:null}),t=yc(e,t,n)}else if(Zs||Ui(e,t,n,!1),s=(n&e.childLanes)!==0,Zs||s){if(s=Fl,s!==null&&(r=Ye(s,n),r!==0&&r!==l.retryLane))throw l.retryLane=r,Xr(e,r),pu(s,e,r),Xs;af(c)||Tu(),t=yc(e,t,n)}else af(c)?(t.flags|=192,t.child=e.child,t=null):(e=l.treeContext,Ti=cf(c.nextSibling),wi=t,J=!0,Ei=null,Di=!1,e!==null&&Ci(t,e),t=_c(t,r.children),t.flags|=4096);return t}return a?($a(t),c=r.fallback,a=t.mode,l=e.child,u=l.sibling,r=ni(l,{mode:`hidden`,children:r.children}),r.subtreeFlags=l.subtreeFlags&65011712,u===null?(c=ai(c,a,n,null),c.flags|=2):c=ni(u,c),c.return=t,r.return=t,r.sibling=c,t.child=r,rc(null,r),r=t.child,c=e.child.memoizedState,c===null?c=mc(n):(a=c.cachePool,a===null?a=fa():(l=Qi._currentValue,a=a.parent===l?a:{parent:l,pool:l}),c={baseLanes:c.baseLanes|n,cachePool:a}),r.memoizedState=c,r.childLanes=hc(e,s,n),t.memoizedState=pc,rc(e.child,r)):(Xa(t),n=e.child,e=n.sibling,n=ni(n,{mode:`visible`,children:r.children}),n.return=t,n.sibling=null,e!==null&&(s=t.deletions,s===null?(t.deletions=[e],t.flags|=16):s.push(e)),t.child=n,t.memoizedState=null,n)}function _c(e,t){return t=vc({mode:`visible`,children:t},e.mode),t.return=e,e.child=t}function vc(e,t){return e=ei(22,e,null,t),e.lanes=0,e}function yc(e,t,n){return ka(t,e.child,null,n),e=_c(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function bc(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Vi(e.return,t,n)}function xc(e,t,n,r,i,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i,treeForkCount:a}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i,o.treeForkCount=a)}function Sc(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;r=r.children;var o=to.current,s=(o&2)!=0;if(s?(o=o&1|2,t.flags|=128):o&=1,z(to,o),Qs(e,t,r,n),r=J?pi:0,!s&&e!==null&&e.flags&128)a:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&bc(e,n,t);else if(e.tag===19)bc(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break a;for(;e.sibling===null;){if(e.return===null||e.return===t)break a;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case`forwards`:for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&no(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),xc(t,!1,i,n,a,r);break;case`backwards`:case`unstable_legacy-backwards`:for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&no(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}xc(t,!0,n,null,a,r);break;case`together`:xc(t,!1,null,null,void 0,r);break;default:t.memoizedState=null}return t.child}function Cc(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Ul|=t.lanes,(n&t.childLanes)===0)if(e!==null){if(Ui(e,t,n,!1),(n&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(i(153));if(t.child!==null){for(e=t.child,n=ni(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=ni(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function wc(e,t){return(e.lanes&t)===0?(e=e.dependencies,!!(e!==null&&Wi(e))):!0}function Tc(e,t,n){switch(t.tag){case 3:H(t,t.stateNode.containerInfo),zi(t,Qi,e.memoizedState.cache),Ni();break;case 27:case 5:se(t);break;case 4:H(t,t.stateNode.containerInfo);break;case 10:zi(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,Za(t),null;break;case 13:var r=t.memoizedState;if(r!==null)return r.dehydrated===null?(n&t.child.childLanes)===0?(Xa(t),e=Cc(e,t,n),e===null?null:e.sibling):gc(e,t,n):(Xa(t),t.flags|=128,null);Xa(t);break;case 19:var i=(e.flags&128)!=0;if(r=(n&t.childLanes)!==0,r||=(Ui(e,t,n,!1),(n&t.childLanes)!==0),i){if(r)return Sc(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),z(to,to.current),r)break;return null;case 22:return t.lanes=0,nc(e,t,n,t.pendingProps);case 24:zi(t,Qi,e.memoizedState.cache)}return Cc(e,t,n)}function Ec(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps)Zs=!0;else{if(!wc(e,n)&&!(t.flags&128))return Zs=!1,Tc(e,t,n);Zs=!!(e.flags&131072)}else Zs=!1,J&&t.flags&1048576&&bi(t,pi,t.index);switch(t.lanes=0,t.tag){case 16:a:{var r=t.pendingProps;if(e=ya(t.elementType),t.type=e,typeof e==`function`)ti(e)?(r=Bs(e,r),t.tag=1,t=dc(null,t,e,r,n)):(t.tag=0,t=lc(null,t,e,r,n));else{if(e!=null){var a=e.$$typeof;if(a===w){t.tag=11,t=$s(null,t,e,r,n);break a}else if(a===E){t.tag=14,t=ec(null,t,e,r,n);break a}}throw t=M(e)||e,Error(i(306,t,``))}}return t;case 0:return lc(e,t,t.type,t.pendingProps,n);case 1:return r=t.type,a=Bs(r,t.pendingProps),dc(e,t,r,a,n);case 3:a:{if(H(t,t.stateNode.containerInfo),e===null)throw Error(i(387));r=t.pendingProps;var o=t.memoizedState;a=o.element,Na(e,t),Ba(t,r,null,n);var s=t.memoizedState;if(r=s.cache,zi(t,Qi,r),r!==o.cache&&Hi(t,[Qi],n,!0),za(),r=s.element,o.isDehydrated)if(o={element:r,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){t=fc(e,t,r,n);break a}else if(r!==a){a=li(Error(i(424)),t),Fi(a),t=fc(e,t,r,n);break a}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName===`HTML`?e.ownerDocument.body:e}for(Ti=cf(e.firstChild),wi=t,J=!0,Ei=null,Di=!0,n=Aa(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(Ni(),r===a){t=Cc(e,t,n);break a}Qs(e,t,r,n)}t=t.child}return t;case 26:return cc(e,t),e===null?(n=kf(t.type,null,t.pendingProps,null))?t.memoizedState=n:J||(n=t.type,e=t.pendingProps,r=Bd(B.current).createElement(n),r[tt]=t,r[nt]=e,Pd(r,n,e),mt(r),t.stateNode=r):t.memoizedState=kf(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return se(t),e===null&&J&&(r=t.stateNode=ff(t.type,t.pendingProps,B.current),wi=t,Di=!0,a=Ti,Zd(t.type)?(lf=a,Ti=cf(r.firstChild)):Ti=a),Qs(e,t,t.pendingProps.children,n),cc(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&J&&((a=r=Ti)&&(r=tf(r,t.type,t.pendingProps,Di),r===null?a=!1:(t.stateNode=r,wi=t,Ti=cf(r.firstChild),Di=!1,a=!0)),a||ki(t)),se(t),a=t.type,o=t.pendingProps,s=e===null?null:e.memoizedProps,r=o.children,Ud(a,o)?r=null:s!==null&&Ud(a,s)&&(t.flags|=32),t.memoizedState!==null&&(a=go(e,t,yo,null,null,n),Qf._currentValue=a),cc(e,t),Qs(e,t,r,n),t.child;case 6:return e===null&&J&&((e=n=Ti)&&(n=nf(n,t.pendingProps,Di),n===null?e=!1:(t.stateNode=n,wi=t,Ti=null,e=!0)),e||ki(t)),null;case 13:return gc(e,t,n);case 4:return H(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=ka(t,null,r,n):Qs(e,t,r,n),t.child;case 11:return $s(e,t,t.type,t.pendingProps,n);case 7:return Qs(e,t,t.pendingProps,n),t.child;case 8:return Qs(e,t,t.pendingProps.children,n),t.child;case 12:return Qs(e,t,t.pendingProps.children,n),t.child;case 10:return r=t.pendingProps,zi(t,t.type,r.value),Qs(e,t,r.children,n),t.child;case 9:return a=t.type._context,r=t.pendingProps.children,Gi(t),a=Ki(a),r=r(a),t.flags|=1,Qs(e,t,r,n),t.child;case 14:return ec(e,t,t.type,t.pendingProps,n);case 15:return tc(e,t,t.type,t.pendingProps,n);case 19:return Sc(e,t,n);case 31:return sc(e,t,n);case 22:return nc(e,t,n,t.pendingProps);case 24:return Gi(t),r=Ki(Qi),e===null?(a=ua(),a===null&&(a=Fl,o=$i(),a.pooledCache=o,o.refCount++,o!==null&&(a.pooledCacheLanes|=n),a=o),t.memoizedState={parent:r,cache:a},Ma(t),zi(t,Qi,a)):((e.lanes&n)!==0&&(Na(e,t),Ba(t,null,null,n),za()),a=e.memoizedState,o=t.memoizedState,a.parent===r?(r=o.cache,zi(t,Qi,r),r!==a.cache&&Hi(t,[Qi],n,!0)):(a={parent:r,cache:r},t.memoizedState=a,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=a),zi(t,Qi,r))),Qs(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(i(156,t.tag))}function Dc(e){e.flags|=4}function Oc(e,t,n,r,i){if((t=(e.mode&32)!=0)&&(t=!1),t){if(e.flags|=16777216,(i&335544128)===i)if(e.stateNode.complete)e.flags|=8192;else if(Su())e.flags|=8192;else throw ba=ga,ma}else e.flags&=-16777217}function kc(e,t){if(t.type!==`stylesheet`||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!Wf(t))if(Su())e.flags|=8192;else throw ba=ga,ma}function Ac(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag===22?536870912:Ue(),e.lanes|=t,ql|=t)}function jc(e,t){if(!J)switch(e.tailMode){case`hidden`:t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case`collapsed`:n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function Mc(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&65011712,r|=i.flags&65011712,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Nc(e,t,n){var r=t.pendingProps;switch(Si(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Mc(t),null;case 1:return Mc(t),null;case 3:return n=t.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),Bi(Qi),oe(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(Mi(t)?Dc(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Pi())),Mc(t),null;case 26:var a=t.type,o=t.memoizedState;return e===null?(Dc(t),o===null?(Mc(t),Oc(t,a,null,r,n)):(Mc(t),kc(t,o))):o?o===e.memoizedState?(Mc(t),t.flags&=-16777217):(Dc(t),Mc(t),kc(t,o)):(e=e.memoizedProps,e!==r&&Dc(t),Mc(t),Oc(t,a,e,r,n)),null;case 27:if(ce(t),n=B.current,a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&Dc(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return Mc(t),null}e=ie.current,Mi(t)?Ai(t,e):(e=ff(a,r,n),t.stateNode=e,Dc(t))}return Mc(t),null;case 5:if(ce(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&Dc(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return Mc(t),null}if(o=ie.current,Mi(t))Ai(t,o);else{var s=Bd(B.current);switch(o){case 1:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case 2:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;default:switch(a){case`svg`:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case`math`:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;case`script`:o=s.createElement(`div`),o.innerHTML=`<script><\/script>`,o=o.removeChild(o.firstChild);break;case`select`:o=typeof r.is==`string`?s.createElement(`select`,{is:r.is}):s.createElement(`select`),r.multiple?o.multiple=!0:r.size&&(o.size=r.size);break;default:o=typeof r.is==`string`?s.createElement(a,{is:r.is}):s.createElement(a)}}o[tt]=t,o[nt]=r;a:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)o.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break a;for(;s.sibling===null;){if(s.return===null||s.return===t)break a;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=o;a:switch(Pd(o,a,r),a){case`button`:case`input`:case`select`:case`textarea`:r=!!r.autoFocus;break a;case`img`:r=!0;break a;default:r=!1}r&&Dc(t)}}return Mc(t),Oc(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==r&&Dc(t);else{if(typeof r!=`string`&&t.stateNode===null)throw Error(i(166));if(e=B.current,Mi(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,a=wi,a!==null)switch(a.tag){case 27:case 5:r=a.memoizedProps}e[tt]=t,e=!!(e.nodeValue===n||r!==null&&!0===r.suppressHydrationWarning||jd(e.nodeValue,n)),e||ki(t,!0)}else e=Bd(e).createTextNode(r),e[tt]=t,t.stateNode=e}return Mc(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(r=Mi(t),n!==null){if(e===null){if(!r)throw Error(i(318));if(e=t.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(557));e[tt]=t}else Ni(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Mc(t),e=!1}else n=Pi(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(eo(t),t):(eo(t),null);if(t.flags&128)throw Error(i(558))}return Mc(t),null;case 13:if(r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(a=Mi(t),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(i(318));if(a=t.memoizedState,a=a===null?null:a.dehydrated,!a)throw Error(i(317));a[tt]=t}else Ni(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Mc(t),a=!1}else a=Pi(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return t.flags&256?(eo(t),t):(eo(t),null)}return eo(t),t.flags&128?(t.lanes=n,t):(n=r!==null,e=e!==null&&e.memoizedState!==null,n&&(r=t.child,a=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(a=r.alternate.memoizedState.cachePool.pool),o=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(o=r.memoizedState.cachePool.pool),o!==a&&(r.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),Ac(t,t.updateQueue),Mc(t),null);case 4:return oe(),e===null&&xd(t.stateNode.containerInfo),Mc(t),null;case 10:return Bi(t.type),Mc(t),null;case 19:if(R(to),r=t.memoizedState,r===null)return Mc(t),null;if(a=(t.flags&128)!=0,o=r.rendering,o===null)if(a)jc(r,!1);else{if(Hl!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=no(e),o!==null){for(t.flags|=128,jc(r,!1),e=o.updateQueue,t.updateQueue=e,Ac(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)ri(n,e),n=n.sibling;return z(to,to.current&1|2),J&&yi(t,r.treeForkCount),t.child}e=e.sibling}r.tail!==null&&U()>$l&&(t.flags|=128,a=!0,jc(r,!1),t.lanes=4194304)}else{if(!a)if(e=no(o),e!==null){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,Ac(t,e),jc(r,!0),r.tail===null&&r.tailMode===`hidden`&&!o.alternate&&!J)return Mc(t),null}else 2*U()-r.renderingStartTime>$l&&n!==536870912&&(t.flags|=128,a=!0,jc(r,!1),t.lanes=4194304);r.isBackwards?(o.sibling=t.child,t.child=o):(e=r.last,e===null?t.child=o:e.sibling=o,r.last=o)}return r.tail===null?(Mc(t),null):(e=r.tail,r.rendering=e,r.tail=e.sibling,r.renderingStartTime=U(),e.sibling=null,n=to.current,z(to,a?n&1|2:n&1),J&&yi(t,r.treeForkCount),e);case 22:case 23:return eo(t),qa(),r=t.memoizedState!==null,e===null?r&&(t.flags|=8192):e.memoizedState!==null!==r&&(t.flags|=8192),r?n&536870912&&!(t.flags&128)&&(Mc(t),t.subtreeFlags&6&&(t.flags|=8192)):Mc(t),n=t.updateQueue,n!==null&&Ac(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),r=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),e!==null&&R(la),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),Bi(Qi),Mc(t),null;case 25:return null;case 30:return null}throw Error(i(156,t.tag))}function Pc(e,t){switch(Si(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Bi(Qi),oe(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return ce(t),null;case 31:if(t.memoizedState!==null){if(eo(t),t.alternate===null)throw Error(i(340));Ni()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(eo(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(i(340));Ni()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return R(to),null;case 4:return oe(),null;case 10:return Bi(t.type),null;case 22:case 23:return eo(t),qa(),e!==null&&R(la),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Bi(Qi),null;case 25:return null;default:return null}}function Fc(e,t){switch(Si(t),t.tag){case 3:Bi(Qi),oe();break;case 26:case 27:case 5:ce(t);break;case 4:oe();break;case 31:t.memoizedState!==null&&eo(t);break;case 13:eo(t);break;case 19:R(to);break;case 10:Bi(t.type);break;case 22:case 23:eo(t),qa(),e!==null&&R(la);break;case 24:Bi(Qi)}}function Ic(e,t){try{var n=t.updateQueue,r=n===null?null:n.lastEffect;if(r!==null){var i=r.next;n=i;do{if((n.tag&e)===e){r=void 0;var a=n.create,o=n.inst;r=a(),o.destroy=r}n=n.next}while(n!==i)}}catch(e){Uu(t,t.return,e)}}function Lc(e,t,n){try{var r=t.updateQueue,i=r===null?null:r.lastEffect;if(i!==null){var a=i.next;r=a;do{if((r.tag&e)===e){var o=r.inst,s=o.destroy;if(s!==void 0){o.destroy=void 0,i=t;var c=n,l=s;try{l()}catch(e){Uu(i,c,e)}}}r=r.next}while(r!==a)}}catch(e){Uu(t,t.return,e)}}function Rc(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{Ha(t,n)}catch(t){Uu(e,e.return,t)}}}function zc(e,t,n){n.props=Bs(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(n){Uu(e,t,n)}}function Bc(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:r=e.stateNode;break;default:r=e.stateNode}typeof n==`function`?e.refCleanup=n(r):n.current=r}}catch(n){Uu(e,t,n)}}function Vc(e,t){var n=e.ref,r=e.refCleanup;if(n!==null)if(typeof r==`function`)try{r()}catch(n){Uu(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n==`function`)try{n(null)}catch(n){Uu(e,t,n)}else n.current=null}function Hc(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{a:switch(t){case`button`:case`input`:case`select`:case`textarea`:n.autoFocus&&r.focus();break a;case`img`:n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(t){Uu(e,e.return,t)}}function Uc(e,t,n){try{var r=e.stateNode;Fd(r,e.type,n,t),r[nt]=t}catch(t){Uu(e,e.return,t)}}function Wc(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Zd(e.type)||e.tag===4}function Gc(e){a:for(;;){for(;e.sibling===null;){if(e.return===null||Wc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Zd(e.type)||e.flags&2||e.child===null||e.tag===4)continue a;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Kc(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n).insertBefore(e,t):(t=n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n,t.appendChild(e),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Jt));else if(r!==4&&(r===27&&Zd(e.type)&&(n=e.stateNode,t=null),e=e.child,e!==null))for(Kc(e,t,n),e=e.sibling;e!==null;)Kc(e,t,n),e=e.sibling}function qc(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(r===27&&Zd(e.type)&&(n=e.stateNode),e=e.child,e!==null))for(qc(e,t,n),e=e.sibling;e!==null;)qc(e,t,n),e=e.sibling}function Jc(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);Pd(t,r,n),t[tt]=e,t[nt]=n}catch(t){Uu(e,e.return,t)}}var Yc=!1,Xc=!1,Zc=!1,Qc=typeof WeakSet==`function`?WeakSet:Set,$c=null;function el(e,t){if(e=e.containerInfo,Rd=sp,e=br(e),xr(e)){if(`selectionStart`in e)var n={start:e.selectionStart,end:e.selectionEnd};else a:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var a=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break a}var s=0,c=-1,l=-1,u=0,d=0,f=e,p=null;b:for(;;){for(var m;f!==n||a!==0&&f.nodeType!==3||(c=s+a),f!==o||r!==0&&f.nodeType!==3||(l=s+r),f.nodeType===3&&(s+=f.nodeValue.length),(m=f.firstChild)!==null;)p=f,f=m;for(;;){if(f===e)break b;if(p===n&&++u===a&&(c=s),p===o&&++d===r&&(l=s),(m=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=m}n=c===-1||l===-1?null:{start:c,end:l}}else n=null}n||={start:0,end:0}}else n=null;for(zd={focusedElem:e,selectionRange:n},sp=!1,$c=t;$c!==null;)if(t=$c,e=t.child,t.subtreeFlags&1028&&e!==null)e.return=t,$c=e;else for(;$c!==null;){switch(t=$c,o=t.alternate,e=t.flags,t.tag){case 0:if(e&4&&(e=t.updateQueue,e=e===null?null:e.events,e!==null))for(n=0;n<e.length;n++)a=e[n],a.ref.impl=a.nextImpl;break;case 11:case 15:break;case 1:if(e&1024&&o!==null){e=void 0,n=t,a=o.memoizedProps,o=o.memoizedState,r=n.stateNode;try{var h=Bs(n.type,a);e=r.getSnapshotBeforeUpdate(h,o),r.__reactInternalSnapshotBeforeUpdate=e}catch(e){Uu(n,n.return,e)}}break;case 3:if(e&1024){if(e=t.stateNode.containerInfo,n=e.nodeType,n===9)ef(e);else if(n===1)switch(e.nodeName){case`HEAD`:case`HTML`:case`BODY`:ef(e);break;default:e.textContent=``}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(e&1024)throw Error(i(163))}if(e=t.sibling,e!==null){e.return=t.return,$c=e;break}$c=t.return}}function tl(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:gl(e,n),r&4&&Ic(5,n);break;case 1:if(gl(e,n),r&4)if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(e){Uu(n,n.return,e)}else{var i=Bs(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(e){Uu(n,n.return,e)}}r&64&&Rc(n),r&512&&Bc(n,n.return);break;case 3:if(gl(e,n),r&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{Ha(e,t)}catch(e){Uu(n,n.return,e)}}break;case 27:t===null&&r&4&&Jc(n);case 26:case 5:gl(e,n),t===null&&r&4&&Hc(n),r&512&&Bc(n,n.return);break;case 12:gl(e,n);break;case 31:gl(e,n),r&4&&sl(e,n);break;case 13:gl(e,n),r&4&&cl(e,n),r&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=qu.bind(null,n),sf(e,n))));break;case 22:if(r=n.memoizedState!==null||Yc,!r){t=t!==null&&t.memoizedState!==null||Xc,i=Yc;var a=Xc;Yc=r,(Xc=t)&&!a?vl(e,n,(n.subtreeFlags&8772)!=0):gl(e,n),Yc=i,Xc=a}break;case 30:break;default:gl(e,n)}}function nl(e){var t=e.alternate;t!==null&&(e.alternate=null,nl(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&lt(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var rl=null,il=!1;function al(e,t,n){for(n=n.child;n!==null;)ol(e,t,n),n=n.sibling}function ol(e,t,n){if(Ae&&typeof Ae.onCommitFiberUnmount==`function`)try{Ae.onCommitFiberUnmount(ke,n)}catch{}switch(n.tag){case 26:Xc||Vc(n,t),al(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:Xc||Vc(n,t);var r=rl,i=il;Zd(n.type)&&(rl=n.stateNode,il=!1),al(e,t,n),pf(n.stateNode),rl=r,il=i;break;case 5:Xc||Vc(n,t);case 6:if(r=rl,i=il,rl=null,al(e,t,n),rl=r,il=i,rl!==null)if(il)try{(rl.nodeType===9?rl.body:rl.nodeName===`HTML`?rl.ownerDocument.body:rl).removeChild(n.stateNode)}catch(e){Uu(n,t,e)}else try{rl.removeChild(n.stateNode)}catch(e){Uu(n,t,e)}break;case 18:rl!==null&&(il?(e=rl,Qd(e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,n.stateNode),Np(e)):Qd(rl,n.stateNode));break;case 4:r=rl,i=il,rl=n.stateNode.containerInfo,il=!0,al(e,t,n),rl=r,il=i;break;case 0:case 11:case 14:case 15:Lc(2,n,t),Xc||Lc(4,n,t),al(e,t,n);break;case 1:Xc||(Vc(n,t),r=n.stateNode,typeof r.componentWillUnmount==`function`&&zc(n,t,r)),al(e,t,n);break;case 21:al(e,t,n);break;case 22:Xc=(r=Xc)||n.memoizedState!==null,al(e,t,n),Xc=r;break;default:al(e,t,n)}}function sl(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Np(e)}catch(e){Uu(t,t.return,e)}}}function cl(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Np(e)}catch(e){Uu(t,t.return,e)}}function ll(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new Qc),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new Qc),t;default:throw Error(i(435,e.tag))}}function ul(e,t){var n=ll(e);t.forEach(function(t){if(!n.has(t)){n.add(t);var r=Ju.bind(null,e,t);t.then(r,r)}})}function dl(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var a=n[r],o=e,s=t,c=s;a:for(;c!==null;){switch(c.tag){case 27:if(Zd(c.type)){rl=c.stateNode,il=!1;break a}break;case 5:rl=c.stateNode,il=!1;break a;case 3:case 4:rl=c.stateNode.containerInfo,il=!0;break a}c=c.return}if(rl===null)throw Error(i(160));ol(o,s,a),rl=null,il=!1,o=a.alternate,o!==null&&(o.return=null),a.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)pl(t,e),t=t.sibling}var fl=null;function pl(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:dl(t,e),ml(e),r&4&&(Lc(3,e,e.return),Ic(3,e),Lc(5,e,e.return));break;case 1:dl(t,e),ml(e),r&512&&(Xc||n===null||Vc(n,n.return)),r&64&&Yc&&(e=e.updateQueue,e!==null&&(r=e.callbacks,r!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?r:n.concat(r))));break;case 26:var a=fl;if(dl(t,e),ml(e),r&512&&(Xc||n===null||Vc(n,n.return)),r&4){var o=n===null?null:n.memoizedState;if(r=e.memoizedState,n===null)if(r===null)if(e.stateNode===null){a:{r=e.type,n=e.memoizedProps,a=a.ownerDocument||a;b:switch(r){case`title`:o=a.getElementsByTagName(`title`)[0],(!o||o[ct]||o[tt]||o.namespaceURI===`http://www.w3.org/2000/svg`||o.hasAttribute(`itemprop`))&&(o=a.createElement(r),a.head.insertBefore(o,a.querySelector(`head > title`))),Pd(o,r,n),o[tt]=e,mt(o),r=o;break a;case`link`:var s=Vf(`link`,`href`,a).get(r+(n.href||``));if(s){for(var c=0;c<s.length;c++)if(o=s[c],o.getAttribute(`href`)===(n.href==null||n.href===``?null:n.href)&&o.getAttribute(`rel`)===(n.rel==null?null:n.rel)&&o.getAttribute(`title`)===(n.title==null?null:n.title)&&o.getAttribute(`crossorigin`)===(n.crossOrigin==null?null:n.crossOrigin)){s.splice(c,1);break b}}o=a.createElement(r),Pd(o,r,n),a.head.appendChild(o);break;case`meta`:if(s=Vf(`meta`,`content`,a).get(r+(n.content||``))){for(c=0;c<s.length;c++)if(o=s[c],o.getAttribute(`content`)===(n.content==null?null:``+n.content)&&o.getAttribute(`name`)===(n.name==null?null:n.name)&&o.getAttribute(`property`)===(n.property==null?null:n.property)&&o.getAttribute(`http-equiv`)===(n.httpEquiv==null?null:n.httpEquiv)&&o.getAttribute(`charset`)===(n.charSet==null?null:n.charSet)){s.splice(c,1);break b}}o=a.createElement(r),Pd(o,r,n),a.head.appendChild(o);break;default:throw Error(i(468,r))}o[tt]=e,mt(o),r=o}e.stateNode=r}else Hf(a,e.type,e.stateNode);else e.stateNode=If(a,r,e.memoizedProps);else o===r?r===null&&e.stateNode!==null&&Uc(e,e.memoizedProps,n.memoizedProps):(o===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):o.count--,r===null?Hf(a,e.type,e.stateNode):If(a,r,e.memoizedProps))}break;case 27:dl(t,e),ml(e),r&512&&(Xc||n===null||Vc(n,n.return)),n!==null&&r&4&&Uc(e,e.memoizedProps,n.memoizedProps);break;case 5:if(dl(t,e),ml(e),r&512&&(Xc||n===null||Vc(n,n.return)),e.flags&32){a=e.stateNode;try{Bt(a,``)}catch(t){Uu(e,e.return,t)}}r&4&&e.stateNode!=null&&(a=e.memoizedProps,Uc(e,a,n===null?a:n.memoizedProps)),r&1024&&(Zc=!0);break;case 6:if(dl(t,e),ml(e),r&4){if(e.stateNode===null)throw Error(i(162));r=e.memoizedProps,n=e.stateNode;try{n.nodeValue=r}catch(t){Uu(e,e.return,t)}}break;case 3:if(Bf=null,a=fl,fl=gf(t.containerInfo),dl(t,e),fl=a,ml(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Np(t.containerInfo)}catch(t){Uu(e,e.return,t)}Zc&&(Zc=!1,hl(e));break;case 4:r=fl,fl=gf(e.stateNode.containerInfo),dl(t,e),ml(e),fl=r;break;case 12:dl(t,e),ml(e);break;case 31:dl(t,e),ml(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,ul(e,r)));break;case 13:dl(t,e),ml(e),e.child.flags&8192&&e.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(Zl=U()),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,ul(e,r)));break;case 22:a=e.memoizedState!==null;var l=n!==null&&n.memoizedState!==null,u=Yc,d=Xc;if(Yc=u||a,Xc=d||l,dl(t,e),Xc=d,Yc=u,ml(e),r&8192)a:for(t=e.stateNode,t._visibility=a?t._visibility&-2:t._visibility|1,a&&(n===null||l||Yc||Xc||_l(e)),n=null,t=e;;){if(t.tag===5||t.tag===26){if(n===null){l=n=t;try{if(o=l.stateNode,a)s=o.style,typeof s.setProperty==`function`?s.setProperty(`display`,`none`,`important`):s.display=`none`;else{c=l.stateNode;var f=l.memoizedProps.style,p=f!=null&&f.hasOwnProperty(`display`)?f.display:null;c.style.display=p==null||typeof p==`boolean`?``:(``+p).trim()}}catch(e){Uu(l,l.return,e)}}}else if(t.tag===6){if(n===null){l=t;try{l.stateNode.nodeValue=a?``:l.memoizedProps}catch(e){Uu(l,l.return,e)}}}else if(t.tag===18){if(n===null){l=t;try{var m=l.stateNode;a?$d(m,!0):$d(l.stateNode,!1)}catch(e){Uu(l,l.return,e)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break a;for(;t.sibling===null;){if(t.return===null||t.return===e)break a;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}r&4&&(r=e.updateQueue,r!==null&&(n=r.retryQueue,n!==null&&(r.retryQueue=null,ul(e,n))));break;case 19:dl(t,e),ml(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,ul(e,r)));break;case 30:break;case 21:break;default:dl(t,e),ml(e)}}function ml(e){var t=e.flags;if(t&2){try{for(var n,r=e.return;r!==null;){if(Wc(r)){n=r;break}r=r.return}if(n==null)throw Error(i(160));switch(n.tag){case 27:var a=n.stateNode;qc(e,Gc(e),a);break;case 5:var o=n.stateNode;n.flags&32&&(Bt(o,``),n.flags&=-33),qc(e,Gc(e),o);break;case 3:case 4:var s=n.stateNode.containerInfo;Kc(e,Gc(e),s);break;default:throw Error(i(161))}}catch(t){Uu(e,e.return,t)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function hl(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;hl(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function gl(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)tl(e,t.alternate,t),t=t.sibling}function _l(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:Lc(4,t,t.return),_l(t);break;case 1:Vc(t,t.return);var n=t.stateNode;typeof n.componentWillUnmount==`function`&&zc(t,t.return,n),_l(t);break;case 27:pf(t.stateNode);case 26:case 5:Vc(t,t.return),_l(t);break;case 22:t.memoizedState===null&&_l(t);break;case 30:_l(t);break;default:_l(t)}e=e.sibling}}function vl(e,t,n){for(n&&=(t.subtreeFlags&8772)!=0,t=t.child;t!==null;){var r=t.alternate,i=e,a=t,o=a.flags;switch(a.tag){case 0:case 11:case 15:vl(i,a,n),Ic(4,a);break;case 1:if(vl(i,a,n),r=a,i=r.stateNode,typeof i.componentDidMount==`function`)try{i.componentDidMount()}catch(e){Uu(r,r.return,e)}if(r=a,i=r.updateQueue,i!==null){var s=r.stateNode;try{var c=i.shared.hiddenCallbacks;if(c!==null)for(i.shared.hiddenCallbacks=null,i=0;i<c.length;i++)Va(c[i],s)}catch(e){Uu(r,r.return,e)}}n&&o&64&&Rc(a),Bc(a,a.return);break;case 27:Jc(a);case 26:case 5:vl(i,a,n),n&&r===null&&o&4&&Hc(a),Bc(a,a.return);break;case 12:vl(i,a,n);break;case 31:vl(i,a,n),n&&o&4&&sl(i,a);break;case 13:vl(i,a,n),n&&o&4&&cl(i,a);break;case 22:a.memoizedState===null&&vl(i,a,n),Bc(a,a.return);break;case 30:break;default:vl(i,a,n)}t=t.sibling}}function yl(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&ea(n))}function bl(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&ea(e))}function xl(e,t,n,r){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Sl(e,t,n,r),t=t.sibling}function Sl(e,t,n,r){var i=t.flags;switch(t.tag){case 0:case 11:case 15:xl(e,t,n,r),i&2048&&Ic(9,t);break;case 1:xl(e,t,n,r);break;case 3:xl(e,t,n,r),i&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&ea(e)));break;case 12:if(i&2048){xl(e,t,n,r),e=t.stateNode;try{var a=t.memoizedProps,o=a.id,s=a.onPostCommit;typeof s==`function`&&s(o,t.alternate===null?`mount`:`update`,e.passiveEffectDuration,-0)}catch(e){Uu(t,t.return,e)}}else xl(e,t,n,r);break;case 31:xl(e,t,n,r);break;case 13:xl(e,t,n,r);break;case 23:break;case 22:a=t.stateNode,o=t.alternate,t.memoizedState===null?a._visibility&2?xl(e,t,n,r):(a._visibility|=2,Cl(e,t,n,r,(t.subtreeFlags&10256)!=0||!1)):a._visibility&2?xl(e,t,n,r):wl(e,t),i&2048&&yl(o,t);break;case 24:xl(e,t,n,r),i&2048&&bl(t.alternate,t);break;default:xl(e,t,n,r)}}function Cl(e,t,n,r,i){for(i&&=(t.subtreeFlags&10256)!=0||!1,t=t.child;t!==null;){var a=e,o=t,s=n,c=r,l=o.flags;switch(o.tag){case 0:case 11:case 15:Cl(a,o,s,c,i),Ic(8,o);break;case 23:break;case 22:var u=o.stateNode;o.memoizedState===null?(u._visibility|=2,Cl(a,o,s,c,i)):u._visibility&2?Cl(a,o,s,c,i):wl(a,o),i&&l&2048&&yl(o.alternate,o);break;case 24:Cl(a,o,s,c,i),i&&l&2048&&bl(o.alternate,o);break;default:Cl(a,o,s,c,i)}t=t.sibling}}function wl(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,r=t,i=r.flags;switch(r.tag){case 22:wl(n,r),i&2048&&yl(r.alternate,r);break;case 24:wl(n,r),i&2048&&bl(r.alternate,r);break;default:wl(n,r)}t=t.sibling}}var Tl=8192;function El(e,t,n){if(e.subtreeFlags&Tl)for(e=e.child;e!==null;)Dl(e,t,n),e=e.sibling}function Dl(e,t,n){switch(e.tag){case 26:El(e,t,n),e.flags&Tl&&e.memoizedState!==null&&Gf(n,fl,e.memoizedState,e.memoizedProps);break;case 5:El(e,t,n);break;case 3:case 4:var r=fl;fl=gf(e.stateNode.containerInfo),El(e,t,n),fl=r;break;case 22:e.memoizedState===null&&(r=e.alternate,r!==null&&r.memoizedState!==null?(r=Tl,Tl=16777216,El(e,t,n),Tl=r):El(e,t,n));break;default:El(e,t,n)}}function Ol(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function kl(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];$c=r,Ml(r,e)}Ol(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Al(e),e=e.sibling}function Al(e){switch(e.tag){case 0:case 11:case 15:kl(e),e.flags&2048&&Lc(9,e,e.return);break;case 3:kl(e);break;case 12:kl(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,jl(e)):kl(e);break;default:kl(e)}}function jl(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];$c=r,Ml(r,e)}Ol(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Lc(8,t,t.return),jl(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,jl(t));break;default:jl(t)}e=e.sibling}}function Ml(e,t){for(;$c!==null;){var n=$c;switch(n.tag){case 0:case 11:case 15:Lc(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var r=n.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:ea(n.memoizedState.cache)}if(r=n.child,r!==null)r.return=n,$c=r;else a:for(n=e;$c!==null;){r=$c;var i=r.sibling,a=r.return;if(nl(r),r===n){$c=null;break a}if(i!==null){i.return=a,$c=i;break a}$c=a}}}var Nl={getCacheForType:function(e){var t=Ki(Qi),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return Ki(Qi).controller.signal}},Pl=typeof WeakMap==`function`?WeakMap:Map,X=0,Fl=null,Z=null,Q=0,Il=0,Ll=null,Rl=!1,zl=!1,Bl=!1,Vl=0,Hl=0,Ul=0,Wl=0,Gl=0,Kl=0,ql=0,Jl=null,Yl=null,Xl=!1,Zl=0,Ql=0,$l=1/0,eu=null,tu=null,nu=0,ru=null,iu=null,au=0,ou=0,su=null,cu=null,lu=0,uu=null;function du(){return X&2&&Q!==0?Q&-Q:N.T===null?Qe():ud()}function fu(){if(Kl===0)if(!(Q&536870912)||J){var e=Le;Le<<=1,!(Le&3932160)&&(Le=262144),Kl=e}else Kl=536870912;return e=Ja.current,e!==null&&(e.flags|=32),Kl}function pu(e,t,n){(e===Fl&&(Il===2||Il===9)||e.cancelPendingCommit!==null)&&(bu(e,0),_u(e,Q,Kl,!1)),Ge(e,n),(!(X&2)||e!==Fl)&&(e===Fl&&(!(X&2)&&(Wl|=n),Hl===4&&_u(e,Q,Kl,!1)),nd(e))}function mu(e,t,n){if(X&6)throw Error(i(327));var r=!n&&(t&127)==0&&(t&e.expiredLanes)===0||Ve(e,t),a=r?Ou(e,t):Eu(e,t,!0),o=r;do{if(a===0){zl&&!r&&_u(e,t,0,!1);break}else{if(n=e.current.alternate,o&&!gu(n)){a=Eu(e,t,!1),o=!1;continue}if(a===2){if(o=t,e.errorRecoveryDisabledLanes&o)var s=0;else s=e.pendingLanes&-536870913,s=s===0?s&536870912?536870912:0:s;if(s!==0){t=s;a:{var c=e;a=Jl;var l=c.current.memoizedState.isDehydrated;if(l&&(bu(c,s).flags|=256),s=Eu(c,s,!1),s!==2){if(Bl&&!l){c.errorRecoveryDisabledLanes|=o,Wl|=o,a=4;break a}o=Yl,Yl=a,o!==null&&(Yl===null?Yl=o:Yl.push.apply(Yl,o))}a=s}if(o=!1,a!==2)continue}}if(a===1){bu(e,0),_u(e,t,0,!0);break}a:{switch(r=e,o=a,o){case 0:case 1:throw Error(i(345));case 4:if((t&4194048)!==t)break;case 6:_u(r,t,Kl,!Rl);break a;case 2:Yl=null;break;case 3:case 5:break;default:throw Error(i(329))}if((t&62914560)===t&&(a=Zl+300-U(),10<a)){if(_u(r,t,Kl,!Rl),Be(r,0,!0)!==0)break a;au=t,r.timeoutHandle=Kd(hu.bind(null,r,n,Yl,eu,Xl,t,Kl,Wl,ql,Rl,o,`Throttled`,-0,0),a);break a}hu(r,n,Yl,eu,Xl,t,Kl,Wl,ql,Rl,o,null,-0,0)}}break}while(1);nd(e)}function hu(e,t,n,r,i,a,o,s,c,l,u,d,f,p){if(e.timeoutHandle=-1,d=t.subtreeFlags,d&8192||(d&16785408)==16785408){d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Jt},Dl(t,a,d);var m=(a&62914560)===a?Zl-U():(a&4194048)===a?Ql-U():0;if(m=qf(d,m),m!==null){au=a,e.cancelPendingCommit=m(Fu.bind(null,e,t,a,n,r,i,o,s,c,u,d,null,f,p)),_u(e,a,o,!l);return}}Fu(e,t,a,n,r,i,o,s,c)}function gu(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!hr(a(),i))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function _u(e,t,n,r){t&=~Gl,t&=~Wl,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var i=t;0<i;){var a=31-Me(i),o=1<<a;r[a]=-1,i&=~o}n!==0&&qe(e,n,t)}function vu(){return X&6?!0:(rd(0,!1),!1)}function yu(){if(Z!==null){if(Il===0)var e=Z.return;else e=Z,Ri=Li=null,So(e),Ca=null,wa=0,e=Z;for(;e!==null;)Fc(e.alternate,e),e=e.return;Z=null}}function bu(e,t){var n=e.timeoutHandle;n!==-1&&(e.timeoutHandle=-1,qd(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),au=0,yu(),Fl=e,Z=n=ni(e.current,null),Q=t,Il=0,Ll=null,Rl=!1,zl=Ve(e,t),Bl=!1,ql=Kl=Gl=Wl=Ul=Hl=0,Yl=Jl=null,Xl=!1,t&8&&(t|=t&32);var r=e.entangledLanes;if(r!==0)for(e=e.entanglements,r&=t;0<r;){var i=31-Me(r),a=1<<i;t|=e[i],r&=~a}return Vl=t,qr(),n}function xu(e,t){Y=null,N.H=Ms,t===pa||t===ha?(t=xa(),Il=3):t===ma?(t=xa(),Il=4):Il=t===Xs?8:typeof t==`object`&&t&&typeof t.then==`function`?6:1,Ll=t,Z===null&&(Hl=1,Ws(e,li(t,e.current)))}function Su(){var e=Ja.current;return e===null?!0:(Q&4194048)===Q?Ya===null:(Q&62914560)===Q||Q&536870912?e===Ya:!1}function Cu(){var e=N.H;return N.H=Ms,e===null?Ms:e}function wu(){var e=N.A;return N.A=Nl,e}function Tu(){Hl=4,Rl||(Q&4194048)!==Q&&Ja.current!==null||(zl=!0),!(Ul&134217727)&&!(Wl&134217727)||Fl===null||_u(Fl,Q,Kl,!1)}function Eu(e,t,n){var r=X;X|=2;var i=Cu(),a=wu();(Fl!==e||Q!==t)&&(eu=null,bu(e,t)),t=!1;var o=Hl;a:do try{if(Il!==0&&Z!==null){var s=Z,c=Ll;switch(Il){case 8:yu(),o=6;break a;case 3:case 2:case 9:case 6:Ja.current===null&&(t=!0);var l=Il;if(Il=0,Ll=null,Mu(e,s,c,l),n&&zl){o=0;break a}break;default:l=Il,Il=0,Ll=null,Mu(e,s,c,l)}}Du(),o=Hl;break}catch(t){xu(e,t)}while(1);return t&&e.shellSuspendCounter++,Ri=Li=null,X=r,N.H=i,N.A=a,Z===null&&(Fl=null,Q=0,qr()),o}function Du(){for(;Z!==null;)Au(Z)}function Ou(e,t){var n=X;X|=2;var r=Cu(),a=wu();Fl!==e||Q!==t?(eu=null,$l=U()+500,bu(e,t)):zl=Ve(e,t);a:do try{if(Il!==0&&Z!==null){t=Z;var o=Ll;b:switch(Il){case 1:Il=0,Ll=null,Mu(e,t,o,1);break;case 2:case 9:if(_a(o)){Il=0,Ll=null,ju(t);break}t=function(){Il!==2&&Il!==9||Fl!==e||(Il=7),nd(e)},o.then(t,t);break a;case 3:Il=7;break a;case 4:Il=5;break a;case 7:_a(o)?(Il=0,Ll=null,ju(t)):(Il=0,Ll=null,Mu(e,t,o,7));break;case 5:var s=null;switch(Z.tag){case 26:s=Z.memoizedState;case 5:case 27:var c=Z;if(s?Wf(s):c.stateNode.complete){Il=0,Ll=null;var l=c.sibling;if(l!==null)Z=l;else{var u=c.return;u===null?Z=null:(Z=u,Nu(u))}break b}}Il=0,Ll=null,Mu(e,t,o,5);break;case 6:Il=0,Ll=null,Mu(e,t,o,6);break;case 8:yu(),Hl=6;break a;default:throw Error(i(462))}}ku();break}catch(t){xu(e,t)}while(1);return Ri=Li=null,N.H=r,N.A=a,X=n,Z===null?(Fl=null,Q=0,qr(),Hl):0}function ku(){for(;Z!==null&&!ye();)Au(Z)}function Au(e){var t=Ec(e.alternate,e,Vl);e.memoizedProps=e.pendingProps,t===null?Nu(e):Z=t}function ju(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=uc(n,t,t.pendingProps,t.type,void 0,Q);break;case 11:t=uc(n,t,t.pendingProps,t.type.render,t.ref,Q);break;case 5:So(t);default:Fc(n,t),t=Z=ri(t,Vl),t=Ec(n,t,Vl)}e.memoizedProps=e.pendingProps,t===null?Nu(e):Z=t}function Mu(e,t,n,r){Ri=Li=null,So(t),Ca=null,wa=0;var i=t.return;try{if(Ys(e,i,t,n,Q)){Hl=1,Ws(e,li(n,e.current)),Z=null;return}}catch(t){if(i!==null)throw Z=i,t;Hl=1,Ws(e,li(n,e.current)),Z=null;return}t.flags&32768?(J||r===1?e=!0:zl||Q&536870912?e=!1:(Rl=e=!0,(r===2||r===9||r===3||r===6)&&(r=Ja.current,r!==null&&r.tag===13&&(r.flags|=16384))),Pu(t,e)):Nu(t)}function Nu(e){var t=e;do{if(t.flags&32768){Pu(t,Rl);return}e=t.return;var n=Nc(t.alternate,t,Vl);if(n!==null){Z=n;return}if(t=t.sibling,t!==null){Z=t;return}Z=t=e}while(t!==null);Hl===0&&(Hl=5)}function Pu(e,t){do{var n=Pc(e.alternate,e);if(n!==null){n.flags&=32767,Z=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){Z=e;return}Z=e=n}while(e!==null);Hl=6,Z=null}function Fu(e,t,n,r,a,o,s,c,l){e.cancelPendingCommit=null;do Bu();while(nu!==0);if(X&6)throw Error(i(327));if(t!==null){if(t===e.current)throw Error(i(177));if(o=t.lanes|t.childLanes,o|=Kr,Ke(e,n,o,s,c,l),e===Fl&&(Z=Fl=null,Q=0),iu=t,ru=e,au=n,ou=o,su=a,cu=r,t.subtreeFlags&10256||t.flags&10256?(e.callbackNode=null,e.callbackPriority=0,Yu(we,function(){return Vu(),null})):(e.callbackNode=null,e.callbackPriority=0),r=(t.flags&13878)!=0,t.subtreeFlags&13878||r){r=N.T,N.T=null,a=P.p,P.p=2,s=X,X|=4;try{el(e,t,n)}finally{X=s,P.p=a,N.T=r}}nu=1,Iu(),Lu(),Ru()}}function Iu(){if(nu===1){nu=0;var e=ru,t=iu,n=(t.flags&13878)!=0;if(t.subtreeFlags&13878||n){n=N.T,N.T=null;var r=P.p;P.p=2;var i=X;X|=4;try{pl(t,e);var a=zd,o=br(e.containerInfo),s=a.focusedElem,c=a.selectionRange;if(o!==s&&s&&s.ownerDocument&&yr(s.ownerDocument.documentElement,s)){if(c!==null&&xr(s)){var l=c.start,u=c.end;if(u===void 0&&(u=l),`selectionStart`in s)s.selectionStart=l,s.selectionEnd=Math.min(u,s.value.length);else{var d=s.ownerDocument||document,f=d&&d.defaultView||window;if(f.getSelection){var p=f.getSelection(),m=s.textContent.length,h=Math.min(c.start,m),g=c.end===void 0?h:Math.min(c.end,m);!p.extend&&h>g&&(o=g,g=h,h=o);var _=vr(s,h),v=vr(s,g);if(_&&v&&(p.rangeCount!==1||p.anchorNode!==_.node||p.anchorOffset!==_.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var y=d.createRange();y.setStart(_.node,_.offset),p.removeAllRanges(),h>g?(p.addRange(y),p.extend(v.node,v.offset)):(y.setEnd(v.node,v.offset),p.addRange(y))}}}}for(d=[],p=s;p=p.parentNode;)p.nodeType===1&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof s.focus==`function`&&s.focus(),s=0;s<d.length;s++){var b=d[s];b.element.scrollLeft=b.left,b.element.scrollTop=b.top}}sp=!!Rd,zd=Rd=null}finally{X=i,P.p=r,N.T=n}}e.current=t,nu=2}}function Lu(){if(nu===2){nu=0;var e=ru,t=iu,n=(t.flags&8772)!=0;if(t.subtreeFlags&8772||n){n=N.T,N.T=null;var r=P.p;P.p=2;var i=X;X|=4;try{tl(e,t.alternate,t)}finally{X=i,P.p=r,N.T=n}}nu=3}}function Ru(){if(nu===4||nu===3){nu=0,be();var e=ru,t=iu,n=au,r=cu;t.subtreeFlags&10256||t.flags&10256?nu=5:(nu=0,iu=ru=null,zu(e,e.pendingLanes));var i=e.pendingLanes;if(i===0&&(tu=null),Ze(n),t=t.stateNode,Ae&&typeof Ae.onCommitFiberRoot==`function`)try{Ae.onCommitFiberRoot(ke,t,void 0,(t.current.flags&128)==128)}catch{}if(r!==null){t=N.T,i=P.p,P.p=2,N.T=null;try{for(var a=e.onRecoverableError,o=0;o<r.length;o++){var s=r[o];a(s.value,{componentStack:s.stack})}}finally{N.T=t,P.p=i}}au&3&&Bu(),nd(e),i=e.pendingLanes,n&261930&&i&42?e===uu?lu++:(lu=0,uu=e):lu=0,rd(0,!1)}}function zu(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,ea(t)))}function Bu(){return Iu(),Lu(),Ru(),Vu()}function Vu(){if(nu!==5)return!1;var e=ru,t=ou;ou=0;var n=Ze(au),r=N.T,a=P.p;try{P.p=32>n?32:n,N.T=null,n=su,su=null;var o=ru,s=au;if(nu=0,iu=ru=null,au=0,X&6)throw Error(i(331));var c=X;if(X|=4,Al(o.current),Sl(o,o.current,s,n),X=c,rd(0,!1),Ae&&typeof Ae.onPostCommitFiberRoot==`function`)try{Ae.onPostCommitFiberRoot(ke,o)}catch{}return!0}finally{P.p=a,N.T=r,zu(e,t)}}function Hu(e,t,n){t=li(n,t),t=Ks(e.stateNode,t,2),e=Fa(e,t,2),e!==null&&(Ge(e,2),nd(e))}function Uu(e,t,n){if(e.tag===3)Hu(e,e,n);else for(;t!==null;){if(t.tag===3){Hu(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError==`function`||typeof r.componentDidCatch==`function`&&(tu===null||!tu.has(r))){e=li(n,e),n=qs(2),r=Fa(t,n,2),r!==null&&(Js(n,r,t,e),Ge(r,2),nd(r));break}}t=t.return}}function Wu(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Pl;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(Bl=!0,i.add(n),e=Gu.bind(null,e,t,n),t.then(e,e))}function Gu(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,Fl===e&&(Q&n)===n&&(Hl===4||Hl===3&&(Q&62914560)===Q&&300>U()-Zl?!(X&2)&&bu(e,0):Gl|=n,ql===Q&&(ql=0)),nd(e)}function Ku(e,t){t===0&&(t=Ue()),e=Xr(e,t),e!==null&&(Ge(e,t),nd(e))}function qu(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Ku(e,n)}function Ju(e,t){var n=0;switch(e.tag){case 31:case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(i(314))}r!==null&&r.delete(t),Ku(e,n)}function Yu(e,t){return _e(e,t)}var Xu=null,Zu=null,Qu=!1,$u=!1,ed=!1,td=0;function nd(e){e!==Zu&&e.next===null&&(Zu===null?Xu=Zu=e:Zu=Zu.next=e),$u=!0,Qu||(Qu=!0,ld())}function rd(e,t){if(!ed&&$u){ed=!0;do for(var n=!1,r=Xu;r!==null;){if(!t)if(e!==0){var i=r.pendingLanes;if(i===0)var a=0;else{var o=r.suspendedLanes,s=r.pingedLanes;a=(1<<31-Me(42|e)+1)-1,a&=i&~(o&~s),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,cd(r,a))}else a=Q,a=Be(r,r===Fl?a:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),!(a&3)||Ve(r,a)||(n=!0,cd(r,a));r=r.next}while(n);ed=!1}}function id(){ad()}function ad(){$u=Qu=!1;var e=0;td!==0&&Gd()&&(e=td);for(var t=U(),n=null,r=Xu;r!==null;){var i=r.next,a=od(r,t);a===0?(r.next=null,n===null?Xu=i:n.next=i,i===null&&(Zu=n)):(n=r,(e!==0||a&3)&&($u=!0)),r=i}nu!==0&&nu!==5||rd(e,!1),td!==0&&(td=0)}function od(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var o=31-Me(a),s=1<<o,c=i[o];c===-1?((s&n)===0||(s&r)!==0)&&(i[o]=He(s,t)):c<=t&&(e.expiredLanes|=s),a&=~s}if(t=Fl,n=Q,n=Be(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,n===0||e===t&&(Il===2||Il===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&ve(r),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||Ve(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(r!==null&&ve(r),Ze(n)){case 2:case 8:n=Ce;break;case 32:n=we;break;case 268435456:n=Ee;break;default:n=we}return r=sd.bind(null,e),n=_e(n,r),e.callbackPriority=t,e.callbackNode=n,t}return r!==null&&r!==null&&ve(r),e.callbackPriority=2,e.callbackNode=null,2}function sd(e,t){if(nu!==0&&nu!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(Bu()&&e.callbackNode!==n)return null;var r=Q;return r=Be(e,e===Fl?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(mu(e,r,t),od(e,U()),e.callbackNode!=null&&e.callbackNode===n?sd.bind(null,e):null)}function cd(e,t){if(Bu())return null;mu(e,t,!0)}function ld(){Yd(function(){X&6?_e(Se,id):ad()})}function ud(){if(td===0){var e=ra;e===0&&(e=Ie,Ie<<=1,!(Ie&261888)&&(Ie=256)),td=e}return td}function dd(e){return e==null||typeof e==`symbol`||typeof e==`boolean`?null:typeof e==`function`?e:qt(``+e)}function fd(e,t){var n=t.ownerDocument.createElement(`input`);return n.name=t.name,n.value=t.value,e.id&&n.setAttribute(`form`,e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}function pd(e,t,n,r,i){if(t===`submit`&&n&&n.stateNode===i){var a=dd((i[nt]||null).action),o=r.submitter;o&&(t=(t=o[nt]||null)?dd(t.formAction):o.getAttribute(`formAction`),t!==null&&(a=t,o=null));var s=new gn(`action`,`action`,null,r,i);e.push({event:s,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(td!==0){var e=o?fd(i,o):new FormData(i);vs(n,{pending:!0,data:e,method:i.method,action:a},null,e)}}else typeof a==`function`&&(s.preventDefault(),e=o?fd(i,o):new FormData(i),vs(n,{pending:!0,data:e,method:i.method,action:a},a,e))},currentTarget:i}]})}}for(var md=0;md<Vr.length;md++){var hd=Vr[md];Hr(hd.toLowerCase(),`on`+(hd[0].toUpperCase()+hd.slice(1)))}Hr(Nr,`onAnimationEnd`),Hr(Pr,`onAnimationIteration`),Hr(Fr,`onAnimationStart`),Hr(`dblclick`,`onDoubleClick`),Hr(`focusin`,`onFocus`),Hr(`focusout`,`onBlur`),Hr(Ir,`onTransitionRun`),Hr(Lr,`onTransitionStart`),Hr(Rr,`onTransitionCancel`),Hr(zr,`onTransitionEnd`),vt(`onMouseEnter`,[`mouseout`,`mouseover`]),vt(`onMouseLeave`,[`mouseout`,`mouseover`]),vt(`onPointerEnter`,[`pointerout`,`pointerover`]),vt(`onPointerLeave`,[`pointerout`,`pointerover`]),_t(`onChange`,`change click focusin focusout input keydown keyup selectionchange`.split(` `)),_t(`onSelect`,`focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)),_t(`onBeforeInput`,[`compositionend`,`keypress`,`textInput`,`paste`]),_t(`onCompositionEnd`,`compositionend focusout keydown keypress keyup mousedown`.split(` `)),_t(`onCompositionStart`,`compositionstart focusout keydown keypress keyup mousedown`.split(` `)),_t(`onCompositionUpdate`,`compositionupdate focusout keydown keypress keyup mousedown`.split(` `));var gd=`abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `),_d=new Set(`beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(gd));function vd(e,t){t=(t&4)!=0;for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;a:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,l=s.currentTarget;if(s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){Ur(e)}i.currentTarget=null,a=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,l=s.currentTarget,s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){Ur(e)}i.currentTarget=null,a=c}}}}function $(e,t){var n=t[it];n===void 0&&(n=t[it]=new Set);var r=e+`__bubble`;n.has(r)||(Sd(t,e,2,!1),n.add(r))}function yd(e,t,n){var r=0;t&&(r|=4),Sd(n,e,r,t)}var bd=`_reactListening`+Math.random().toString(36).slice(2);function xd(e){if(!e[bd]){e[bd]=!0,ht.forEach(function(t){t!==`selectionchange`&&(_d.has(t)||yd(t,!1,e),yd(t,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[bd]||(t[bd]=!0,yd(`selectionchange`,!1,t))}}function Sd(e,t,n,r){switch(mp(t)){case 2:var i=cp;break;case 8:i=lp;break;default:i=up}n=i.bind(null,t,n,e),i=void 0,!an||t!==`touchstart`&&t!==`touchmove`&&t!==`wheel`||(i=!0),r?i===void 0?e.addEventListener(t,n,!0):e.addEventListener(t,n,{capture:!0,passive:i}):i===void 0?e.addEventListener(t,n,!1):e.addEventListener(t,n,{passive:i})}function Cd(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)a:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var c=r.stateNode.containerInfo;if(c===i)break;if(s===4)for(s=r.return;s!==null;){var l=s.tag;if((l===3||l===4)&&s.stateNode.containerInfo===i)return;s=s.return}for(;c!==null;){if(s=ut(c),s===null)return;if(l=s.tag,l===5||l===6||l===26||l===27){r=a=s;continue a}c=c.parentNode}}r=r.return}tn(function(){var r=a,i=Xt(n),s=[];a:{var c=Br.get(e);if(c!==void 0){var l=gn,u=e;switch(e){case`keypress`:if(dn(n)===0)break a;case`keydown`:case`keyup`:l=Pn;break;case`focusin`:u=`focus`,l=Tn;break;case`focusout`:u=`blur`,l=Tn;break;case`beforeblur`:case`afterblur`:l=Tn;break;case`click`:if(n.button===2)break a;case`auxclick`:case`dblclick`:case`mousedown`:case`mousemove`:case`mouseup`:case`mouseout`:case`mouseover`:case`contextmenu`:l=Cn;break;case`drag`:case`dragend`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`dragstart`:case`drop`:l=wn;break;case`touchcancel`:case`touchend`:case`touchmove`:case`touchstart`:l=W;break;case Nr:case Pr:case Fr:l=En;break;case zr:l=In;break;case`scroll`:case`scrollend`:l=vn;break;case`wheel`:l=Ln;break;case`copy`:case`cut`:case`paste`:l=Dn;break;case`gotpointercapture`:case`lostpointercapture`:case`pointercancel`:case`pointerdown`:case`pointermove`:case`pointerout`:case`pointerover`:case`pointerup`:l=Fn;break;case`toggle`:case`beforetoggle`:l=Rn}var d=(t&4)!=0,f=!d&&(e===`scroll`||e===`scrollend`),p=d?c===null?null:c+`Capture`:c;d=[];for(var m=r,h;m!==null;){var g=m;if(h=g.stateNode,g=g.tag,g!==5&&g!==26&&g!==27||h===null||p===null||(g=nn(m,p),g!=null&&d.push(wd(m,g,h))),f)break;m=m.return}0<d.length&&(c=new l(c,u,null,n,i),s.push({event:c,listeners:d}))}}if(!(t&7)){a:{if(c=e===`mouseover`||e===`pointerover`,l=e===`mouseout`||e===`pointerout`,c&&n!==Yt&&(u=n.relatedTarget||n.fromElement)&&(ut(u)||u[rt]))break a;if((l||c)&&(c=i.window===i?i:(c=i.ownerDocument)?c.defaultView||c.parentWindow:window,l?(u=n.relatedTarget||n.toElement,l=r,u=u?ut(u):null,u!==null&&(f=o(u),d=u.tag,u!==f||d!==5&&d!==27&&d!==6)&&(u=null)):(l=null,u=r),l!==u)){if(d=Cn,g=`onMouseLeave`,p=`onMouseEnter`,m=`mouse`,(e===`pointerout`||e===`pointerover`)&&(d=Fn,g=`onPointerLeave`,p=`onPointerEnter`,m=`pointer`),f=l==null?c:ft(l),h=u==null?c:ft(u),c=new d(g,m+`leave`,l,n,i),c.target=f,c.relatedTarget=h,g=null,ut(i)===r&&(d=new d(p,m+`enter`,u,n,i),d.target=h,d.relatedTarget=f,g=d),f=g,l&&u)b:{for(d=Ed,p=l,m=u,h=0,g=p;g;g=d(g))h++;g=0;for(var _=m;_;_=d(_))g++;for(;0<h-g;)p=d(p),h--;for(;0<g-h;)m=d(m),g--;for(;h--;){if(p===m||m!==null&&p===m.alternate){d=p;break b}p=d(p),m=d(m)}d=null}else d=null;l!==null&&Dd(s,c,l,d,!1),u!==null&&f!==null&&Dd(s,f,u,d,!0)}}a:{if(c=r?ft(r):window,l=c.nodeName&&c.nodeName.toLowerCase(),l===`select`||l===`input`&&c.type===`file`)var v=rr;else if(Zn(c))if(ir)v=pr;else{v=dr;var y=ur}else l=c.nodeName,!l||l.toLowerCase()!==`input`||c.type!==`checkbox`&&c.type!==`radio`?r&&Wt(r.elementType)&&(v=rr):v=fr;if(v&&=v(e,r)){Qn(s,v,n,i);break a}y&&y(e,c,r),e===`focusout`&&r&&c.type===`number`&&r.memoizedProps.value!=null&&It(c,`number`,c.value)}switch(y=r?ft(r):window,e){case`focusin`:(Zn(y)||y.contentEditable===`true`)&&(Cr=y,wr=r,Tr=null);break;case`focusout`:Tr=wr=Cr=null;break;case`mousedown`:Er=!0;break;case`contextmenu`:case`mouseup`:case`dragend`:Er=!1,Dr(s,n,i);break;case`selectionchange`:if(Sr)break;case`keydown`:case`keyup`:Dr(s,n,i)}var b;if(Bn)b:{switch(e){case`compositionstart`:var x=`onCompositionStart`;break b;case`compositionend`:x=`onCompositionEnd`;break b;case`compositionupdate`:x=`onCompositionUpdate`;break b}x=void 0}else qn?G(e,n)&&(x=`onCompositionEnd`):e===`keydown`&&n.keyCode===229&&(x=`onCompositionStart`);x&&(Un&&n.locale!==`ko`&&(qn||x!==`onCompositionStart`?x===`onCompositionEnd`&&qn&&(b=un()):(sn=i,cn=`value`in sn?sn.value:sn.textContent,qn=!0)),y=Td(r,x),0<y.length&&(x=new On(x,e,null,n,i),s.push({event:x,listeners:y}),b?x.data=b:(b=Kn(n),b!==null&&(x.data=b)))),(b=Hn?Jn(e,n):Yn(e,n))&&(x=Td(r,`onBeforeInput`),0<x.length&&(y=new On(`onBeforeInput`,`beforeinput`,null,n,i),s.push({event:y,listeners:x}),y.data=b)),pd(s,e,r,n,i)}vd(s,t)})}function wd(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Td(e,t){for(var n=t+`Capture`,r=[];e!==null;){var i=e,a=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||a===null||(i=nn(e,n),i!=null&&r.unshift(wd(e,i,a)),i=nn(e,t),i!=null&&r.push(wd(e,i,a))),e.tag===3)return r;e=e.return}return[]}function Ed(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Dd(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,l=s.stateNode;if(s=s.tag,c!==null&&c===r)break;s!==5&&s!==26&&s!==27||l===null||(c=l,i?(l=nn(n,a),l!=null&&o.unshift(wd(n,l,c))):i||(l=nn(n,a),l!=null&&o.push(wd(n,l,c)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var Od=/\r\n?/g,kd=/\u0000|\uFFFD/g;function Ad(e){return(typeof e==`string`?e:``+e).replace(Od,`
`).replace(kd,``)}function jd(e,t){return t=Ad(t),Ad(e)===t}function Md(e,t,n,r,a,o){switch(n){case`children`:typeof r==`string`?t===`body`||t===`textarea`&&r===``||Bt(e,r):(typeof r==`number`||typeof r==`bigint`)&&t!==`body`&&Bt(e,``+r);break;case`className`:wt(e,`class`,r);break;case`tabIndex`:wt(e,`tabindex`,r);break;case`dir`:case`role`:case`viewBox`:case`width`:case`height`:wt(e,n,r);break;case`style`:Ut(e,r,o);break;case`data`:if(t!==`object`){wt(e,`data`,r);break}case`src`:case`href`:if(r===``&&(t!==`a`||n!==`href`)){e.removeAttribute(n);break}if(r==null||typeof r==`function`||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=qt(``+r),e.setAttribute(n,r);break;case`action`:case`formAction`:if(typeof r==`function`){e.setAttribute(n,`javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`);break}else typeof o==`function`&&(n===`formAction`?(t!==`input`&&Md(e,t,`name`,a.name,a,null),Md(e,t,`formEncType`,a.formEncType,a,null),Md(e,t,`formMethod`,a.formMethod,a,null),Md(e,t,`formTarget`,a.formTarget,a,null)):(Md(e,t,`encType`,a.encType,a,null),Md(e,t,`method`,a.method,a,null),Md(e,t,`target`,a.target,a,null)));if(r==null||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=qt(``+r),e.setAttribute(n,r);break;case`onClick`:r!=null&&(e.onclick=Jt);break;case`onScroll`:r!=null&&$(`scroll`,e);break;case`onScrollEnd`:r!=null&&$(`scrollend`,e);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));e.innerHTML=n}}break;case`multiple`:e.multiple=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`muted`:e.muted=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`defaultValue`:case`defaultChecked`:case`innerHTML`:case`ref`:break;case`autoFocus`:break;case`xlinkHref`:if(r==null||typeof r==`function`||typeof r==`boolean`||typeof r==`symbol`){e.removeAttribute(`xlink:href`);break}n=qt(``+r),e.setAttributeNS(`http://www.w3.org/1999/xlink`,`xlink:href`,n);break;case`contentEditable`:case`spellCheck`:case`draggable`:case`value`:case`autoReverse`:case`externalResourcesRequired`:case`focusable`:case`preserveAlpha`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``+r):e.removeAttribute(n);break;case`inert`:case`allowFullScreen`:case`async`:case`autoPlay`:case`controls`:case`default`:case`defer`:case`disabled`:case`disablePictureInPicture`:case`disableRemotePlayback`:case`formNoValidate`:case`hidden`:case`loop`:case`noModule`:case`noValidate`:case`open`:case`playsInline`:case`readOnly`:case`required`:case`reversed`:case`scoped`:case`seamless`:case`itemScope`:r&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``):e.removeAttribute(n);break;case`capture`:case`download`:!0===r?e.setAttribute(n,``):!1!==r&&r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`cols`:case`rows`:case`size`:case`span`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case`rowSpan`:case`start`:r==null||typeof r==`function`||typeof r==`symbol`||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case`popover`:$(`beforetoggle`,e),$(`toggle`,e),Ct(e,`popover`,r);break;case`xlinkActuate`:Tt(e,`http://www.w3.org/1999/xlink`,`xlink:actuate`,r);break;case`xlinkArcrole`:Tt(e,`http://www.w3.org/1999/xlink`,`xlink:arcrole`,r);break;case`xlinkRole`:Tt(e,`http://www.w3.org/1999/xlink`,`xlink:role`,r);break;case`xlinkShow`:Tt(e,`http://www.w3.org/1999/xlink`,`xlink:show`,r);break;case`xlinkTitle`:Tt(e,`http://www.w3.org/1999/xlink`,`xlink:title`,r);break;case`xlinkType`:Tt(e,`http://www.w3.org/1999/xlink`,`xlink:type`,r);break;case`xmlBase`:Tt(e,`http://www.w3.org/XML/1998/namespace`,`xml:base`,r);break;case`xmlLang`:Tt(e,`http://www.w3.org/XML/1998/namespace`,`xml:lang`,r);break;case`xmlSpace`:Tt(e,`http://www.w3.org/XML/1998/namespace`,`xml:space`,r);break;case`is`:Ct(e,`is`,r);break;case`innerText`:case`textContent`:break;default:(!(2<n.length)||n[0]!==`o`&&n[0]!==`O`||n[1]!==`n`&&n[1]!==`N`)&&(n=Gt.get(n)||n,Ct(e,n,r))}}function Nd(e,t,n,r,a,o){switch(n){case`style`:Ut(e,r,o);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));e.innerHTML=n}}break;case`children`:typeof r==`string`?Bt(e,r):(typeof r==`number`||typeof r==`bigint`)&&Bt(e,``+r);break;case`onScroll`:r!=null&&$(`scroll`,e);break;case`onScrollEnd`:r!=null&&$(`scrollend`,e);break;case`onClick`:r!=null&&(e.onclick=Jt);break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`innerHTML`:case`ref`:break;case`innerText`:case`textContent`:break;default:if(!gt.hasOwnProperty(n))a:{if(n[0]===`o`&&n[1]===`n`&&(a=n.endsWith(`Capture`),t=n.slice(2,a?n.length-7:void 0),o=e[nt]||null,o=o==null?null:o[n],typeof o==`function`&&e.removeEventListener(t,o,a),typeof r==`function`)){typeof o!=`function`&&o!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,r,a);break a}n in e?e[n]=r:!0===r?e.setAttribute(n,``):Ct(e,n,r)}}}function Pd(e,t,n){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`img`:$(`error`,e),$(`load`,e);var r=!1,a=!1,o;for(o in n)if(n.hasOwnProperty(o)){var s=n[o];if(s!=null)switch(o){case`src`:r=!0;break;case`srcSet`:a=!0;break;case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:Md(e,t,o,s,n,null)}}a&&Md(e,t,`srcSet`,n.srcSet,n,null),r&&Md(e,t,`src`,n.src,n,null);return;case`input`:$(`invalid`,e);var c=o=s=a=null,l=null,u=null;for(r in n)if(n.hasOwnProperty(r)){var d=n[r];if(d!=null)switch(r){case`name`:a=d;break;case`type`:s=d;break;case`checked`:l=d;break;case`defaultChecked`:u=d;break;case`value`:o=d;break;case`defaultValue`:c=d;break;case`children`:case`dangerouslySetInnerHTML`:if(d!=null)throw Error(i(137,t));break;default:Md(e,t,r,d,n,null)}}Ft(e,o,c,l,u,s,a,!1);return;case`select`:for(a in $(`invalid`,e),r=s=o=null,n)if(n.hasOwnProperty(a)&&(c=n[a],c!=null))switch(a){case`value`:o=c;break;case`defaultValue`:s=c;break;case`multiple`:r=c;default:Md(e,t,a,c,n,null)}t=o,n=s,e.multiple=!!r,t==null?n!=null&&Lt(e,!!r,n,!0):Lt(e,!!r,t,!1);return;case`textarea`:for(s in $(`invalid`,e),o=a=r=null,n)if(n.hasOwnProperty(s)&&(c=n[s],c!=null))switch(s){case`value`:r=c;break;case`defaultValue`:a=c;break;case`children`:o=c;break;case`dangerouslySetInnerHTML`:if(c!=null)throw Error(i(91));break;default:Md(e,t,s,c,n,null)}zt(e,r,a,o);return;case`option`:for(l in n)if(n.hasOwnProperty(l)&&(r=n[l],r!=null))switch(l){case`selected`:e.selected=r&&typeof r!=`function`&&typeof r!=`symbol`;break;default:Md(e,t,l,r,n,null)}return;case`dialog`:$(`beforetoggle`,e),$(`toggle`,e),$(`cancel`,e),$(`close`,e);break;case`iframe`:case`object`:$(`load`,e);break;case`video`:case`audio`:for(r=0;r<gd.length;r++)$(gd[r],e);break;case`image`:$(`error`,e),$(`load`,e);break;case`details`:$(`toggle`,e);break;case`embed`:case`source`:case`link`:$(`error`,e),$(`load`,e);case`area`:case`base`:case`br`:case`col`:case`hr`:case`keygen`:case`meta`:case`param`:case`track`:case`wbr`:case`menuitem`:for(u in n)if(n.hasOwnProperty(u)&&(r=n[u],r!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:Md(e,t,u,r,n,null)}return;default:if(Wt(t)){for(d in n)n.hasOwnProperty(d)&&(r=n[d],r!==void 0&&Nd(e,t,d,r,n,void 0));return}}for(c in n)n.hasOwnProperty(c)&&(r=n[c],r!=null&&Md(e,t,c,r,n,null))}function Fd(e,t,n,r){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`input`:var a=null,o=null,s=null,c=null,l=null,u=null,d=null;for(m in n){var f=n[m];if(n.hasOwnProperty(m)&&f!=null)switch(m){case`checked`:break;case`value`:break;case`defaultValue`:l=f;default:r.hasOwnProperty(m)||Md(e,t,m,null,r,f)}}for(var p in r){var m=r[p];if(f=n[p],r.hasOwnProperty(p)&&(m!=null||f!=null))switch(p){case`type`:o=m;break;case`name`:a=m;break;case`checked`:u=m;break;case`defaultChecked`:d=m;break;case`value`:s=m;break;case`defaultValue`:c=m;break;case`children`:case`dangerouslySetInnerHTML`:if(m!=null)throw Error(i(137,t));break;default:m!==f&&Md(e,t,p,m,r,f)}}Pt(e,s,c,l,u,d,o,a);return;case`select`:for(o in m=s=c=p=null,n)if(l=n[o],n.hasOwnProperty(o)&&l!=null)switch(o){case`value`:break;case`multiple`:m=l;default:r.hasOwnProperty(o)||Md(e,t,o,null,r,l)}for(a in r)if(o=r[a],l=n[a],r.hasOwnProperty(a)&&(o!=null||l!=null))switch(a){case`value`:p=o;break;case`defaultValue`:c=o;break;case`multiple`:s=o;default:o!==l&&Md(e,t,a,o,r,l)}t=c,n=s,r=m,p==null?!!r!=!!n&&(t==null?Lt(e,!!n,n?[]:``,!1):Lt(e,!!n,t,!0)):Lt(e,!!n,p,!1);return;case`textarea`:for(c in m=p=null,n)if(a=n[c],n.hasOwnProperty(c)&&a!=null&&!r.hasOwnProperty(c))switch(c){case`value`:break;case`children`:break;default:Md(e,t,c,null,r,a)}for(s in r)if(a=r[s],o=n[s],r.hasOwnProperty(s)&&(a!=null||o!=null))switch(s){case`value`:p=a;break;case`defaultValue`:m=a;break;case`children`:break;case`dangerouslySetInnerHTML`:if(a!=null)throw Error(i(91));break;default:a!==o&&Md(e,t,s,a,r,o)}Rt(e,p,m);return;case`option`:for(var h in n)if(p=n[h],n.hasOwnProperty(h)&&p!=null&&!r.hasOwnProperty(h))switch(h){case`selected`:e.selected=!1;break;default:Md(e,t,h,null,r,p)}for(l in r)if(p=r[l],m=n[l],r.hasOwnProperty(l)&&p!==m&&(p!=null||m!=null))switch(l){case`selected`:e.selected=p&&typeof p!=`function`&&typeof p!=`symbol`;break;default:Md(e,t,l,p,r,m)}return;case`img`:case`link`:case`area`:case`base`:case`br`:case`col`:case`embed`:case`hr`:case`keygen`:case`meta`:case`param`:case`source`:case`track`:case`wbr`:case`menuitem`:for(var g in n)p=n[g],n.hasOwnProperty(g)&&p!=null&&!r.hasOwnProperty(g)&&Md(e,t,g,null,r,p);for(u in r)if(p=r[u],m=n[u],r.hasOwnProperty(u)&&p!==m&&(p!=null||m!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:if(p!=null)throw Error(i(137,t));break;default:Md(e,t,u,p,r,m)}return;default:if(Wt(t)){for(var _ in n)p=n[_],n.hasOwnProperty(_)&&p!==void 0&&!r.hasOwnProperty(_)&&Nd(e,t,_,void 0,r,p);for(d in r)p=r[d],m=n[d],!r.hasOwnProperty(d)||p===m||p===void 0&&m===void 0||Nd(e,t,d,p,r,m);return}}for(var v in n)p=n[v],n.hasOwnProperty(v)&&p!=null&&!r.hasOwnProperty(v)&&Md(e,t,v,null,r,p);for(f in r)p=r[f],m=n[f],!r.hasOwnProperty(f)||p===m||p==null&&m==null||Md(e,t,f,p,r,m)}function Id(e){switch(e){case`css`:case`script`:case`font`:case`img`:case`image`:case`input`:case`link`:return!0;default:return!1}}function Ld(){if(typeof performance.getEntriesByType==`function`){for(var e=0,t=0,n=performance.getEntriesByType(`resource`),r=0;r<n.length;r++){var i=n[r],a=i.transferSize,o=i.initiatorType,s=i.duration;if(a&&s&&Id(o)){for(o=0,s=i.responseEnd,r+=1;r<n.length;r++){var c=n[r],l=c.startTime;if(l>s)break;var u=c.transferSize,d=c.initiatorType;u&&Id(d)&&(c=c.responseEnd,o+=u*(c<s?1:(s-l)/(c-l)))}if(--r,t+=8*(a+o)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e==`number`)?e:5}var Rd=null,zd=null;function Bd(e){return e.nodeType===9?e:e.ownerDocument}function Vd(e){switch(e){case`http://www.w3.org/2000/svg`:return 1;case`http://www.w3.org/1998/Math/MathML`:return 2;default:return 0}}function Hd(e,t){if(e===0)switch(t){case`svg`:return 1;case`math`:return 2;default:return 0}return e===1&&t===`foreignObject`?0:e}function Ud(e,t){return e===`textarea`||e===`noscript`||typeof t.children==`string`||typeof t.children==`number`||typeof t.children==`bigint`||typeof t.dangerouslySetInnerHTML==`object`&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Wd=null;function Gd(){var e=window.event;return e&&e.type===`popstate`?e===Wd?!1:(Wd=e,!0):(Wd=null,!1)}var Kd=typeof setTimeout==`function`?setTimeout:void 0,qd=typeof clearTimeout==`function`?clearTimeout:void 0,Jd=typeof Promise==`function`?Promise:void 0,Yd=typeof queueMicrotask==`function`?queueMicrotask:Jd===void 0?Kd:function(e){return Jd.resolve(null).then(e).catch(Xd)};function Xd(e){setTimeout(function(){throw e})}function Zd(e){return e===`head`}function Qd(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8)if(n=i.data,n===`/$`||n===`/&`){if(r===0){e.removeChild(i),Np(t);return}r--}else if(n===`$`||n===`$?`||n===`$~`||n===`$!`||n===`&`)r++;else if(n===`html`)pf(e.ownerDocument.documentElement);else if(n===`head`){n=e.ownerDocument.head,pf(n);for(var a=n.firstChild;a;){var o=a.nextSibling,s=a.nodeName;a[ct]||s===`SCRIPT`||s===`STYLE`||s===`LINK`&&a.rel.toLowerCase()===`stylesheet`||n.removeChild(a),a=o}}else n===`body`&&pf(e.ownerDocument.body);n=i}while(n);Np(t)}function $d(e,t){var n=e;e=0;do{var r=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display=`none`):(n.style.display=n._stashedDisplay||``,n.getAttribute(`style`)===``&&n.removeAttribute(`style`)):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=``):n.nodeValue=n._stashedText||``),r&&r.nodeType===8)if(n=r.data,n===`/$`){if(e===0)break;e--}else n!==`$`&&n!==`$?`&&n!==`$~`&&n!==`$!`||e++;n=r}while(n)}function ef(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case`HTML`:case`HEAD`:case`BODY`:ef(n),lt(n);continue;case`SCRIPT`:case`STYLE`:continue;case`LINK`:if(n.rel.toLowerCase()===`stylesheet`)continue}e.removeChild(n)}}function tf(e,t,n,r){for(;e.nodeType===1;){var i=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&(e.nodeName!==`INPUT`||e.type!==`hidden`))break}else if(!r)if(t===`input`&&e.type===`hidden`){var a=i.name==null?null:``+i.name;if(i.type===`hidden`&&e.getAttribute(`name`)===a)return e}else return e;else if(!e[ct])switch(t){case`meta`:if(!e.hasAttribute(`itemprop`))break;return e;case`link`:if(a=e.getAttribute(`rel`),a===`stylesheet`&&e.hasAttribute(`data-precedence`)||a!==i.rel||e.getAttribute(`href`)!==(i.href==null||i.href===``?null:i.href)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute(`title`)!==(i.title==null?null:i.title))break;return e;case`style`:if(e.hasAttribute(`data-precedence`))break;return e;case`script`:if(a=e.getAttribute(`src`),(a!==(i.src==null?null:i.src)||e.getAttribute(`type`)!==(i.type==null?null:i.type)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin))&&a&&e.hasAttribute(`async`)&&!e.hasAttribute(`itemprop`))break;return e;default:return e}if(e=cf(e.nextSibling),e===null)break}return null}function nf(e,t,n){if(t===``)return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!n||(e=cf(e.nextSibling),e===null))return null;return e}function rf(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!t||(e=cf(e.nextSibling),e===null))return null;return e}function af(e){return e.data===`$?`||e.data===`$~`}function of(e){return e.data===`$!`||e.data===`$?`&&e.ownerDocument.readyState!==`loading`}function sf(e,t){var n=e.ownerDocument;if(e.data===`$~`)e._reactRetry=t;else if(e.data!==`$?`||n.readyState!==`loading`)t();else{var r=function(){t(),n.removeEventListener(`DOMContentLoaded`,r)};n.addEventListener(`DOMContentLoaded`,r),e._reactRetry=r}}function cf(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t===`$`||t===`$!`||t===`$?`||t===`$~`||t===`&`||t===`F!`||t===`F`)break;if(t===`/$`||t===`/&`)return null}}return e}var lf=null;function uf(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`/$`||n===`/&`){if(t===0)return cf(e.nextSibling);t--}else n!==`$`&&n!==`$!`&&n!==`$?`&&n!==`$~`&&n!==`&`||t++}e=e.nextSibling}return null}function df(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`$`||n===`$!`||n===`$?`||n===`$~`||n===`&`){if(t===0)return e;t--}else n!==`/$`&&n!==`/&`||t++}e=e.previousSibling}return null}function ff(e,t,n){switch(t=Bd(n),e){case`html`:if(e=t.documentElement,!e)throw Error(i(452));return e;case`head`:if(e=t.head,!e)throw Error(i(453));return e;case`body`:if(e=t.body,!e)throw Error(i(454));return e;default:throw Error(i(451))}}function pf(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);lt(e)}var mf=new Map,hf=new Set;function gf(e){return typeof e.getRootNode==`function`?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var _f=P.d;P.d={f:vf,r:yf,D:Sf,C:Cf,L:wf,m:Tf,X:Df,S:Ef,M:Of};function vf(){var e=_f.f(),t=vu();return e||t}function yf(e){var t=dt(e);t!==null&&t.tag===5&&t.type===`form`?bs(t):_f.r(e)}var bf=typeof document>`u`?null:document;function xf(e,t,n){var r=bf;if(r&&typeof t==`string`&&t){var i=Nt(t);i=`link[rel="`+e+`"][href="`+i+`"]`,typeof n==`string`&&(i+=`[crossorigin="`+n+`"]`),hf.has(i)||(hf.add(i),e={rel:e,crossOrigin:n,href:t},r.querySelector(i)===null&&(t=r.createElement(`link`),Pd(t,`link`,e),mt(t),r.head.appendChild(t)))}}function Sf(e){_f.D(e),xf(`dns-prefetch`,e,null)}function Cf(e,t){_f.C(e,t),xf(`preconnect`,e,t)}function wf(e,t,n){_f.L(e,t,n);var r=bf;if(r&&e&&t){var i=`link[rel="preload"][as="`+Nt(t)+`"]`;t===`image`&&n&&n.imageSrcSet?(i+=`[imagesrcset="`+Nt(n.imageSrcSet)+`"]`,typeof n.imageSizes==`string`&&(i+=`[imagesizes="`+Nt(n.imageSizes)+`"]`)):i+=`[href="`+Nt(e)+`"]`;var a=i;switch(t){case`style`:a=Af(e);break;case`script`:a=Pf(e)}mf.has(a)||(e=h({rel:`preload`,href:t===`image`&&n&&n.imageSrcSet?void 0:e,as:t},n),mf.set(a,e),r.querySelector(i)!==null||t===`style`&&r.querySelector(jf(a))||t===`script`&&r.querySelector(Ff(a))||(t=r.createElement(`link`),Pd(t,`link`,e),mt(t),r.head.appendChild(t)))}}function Tf(e,t){_f.m(e,t);var n=bf;if(n&&e){var r=t&&typeof t.as==`string`?t.as:`script`,i=`link[rel="modulepreload"][as="`+Nt(r)+`"][href="`+Nt(e)+`"]`,a=i;switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:a=Pf(e)}if(!mf.has(a)&&(e=h({rel:`modulepreload`,href:e},t),mf.set(a,e),n.querySelector(i)===null)){switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:if(n.querySelector(Ff(a)))return}r=n.createElement(`link`),Pd(r,`link`,e),mt(r),n.head.appendChild(r)}}}function Ef(e,t,n){_f.S(e,t,n);var r=bf;if(r&&e){var i=pt(r).hoistableStyles,a=Af(e);t||=`default`;var o=i.get(a);if(!o){var s={loading:0,preload:null};if(o=r.querySelector(jf(a)))s.loading=5;else{e=h({rel:`stylesheet`,href:e,"data-precedence":t},n),(n=mf.get(a))&&Rf(e,n);var c=o=r.createElement(`link`);mt(c),Pd(c,`link`,e),c._p=new Promise(function(e,t){c.onload=e,c.onerror=t}),c.addEventListener(`load`,function(){s.loading|=1}),c.addEventListener(`error`,function(){s.loading|=2}),s.loading|=4,Lf(o,t,r)}o={type:`stylesheet`,instance:o,count:1,state:s},i.set(a,o)}}}function Df(e,t){_f.X(e,t);var n=bf;if(n&&e){var r=pt(n).hoistableScripts,i=Pf(e),a=r.get(i);a||(a=n.querySelector(Ff(i)),a||(e=h({src:e,async:!0},t),(t=mf.get(i))&&zf(e,t),a=n.createElement(`script`),mt(a),Pd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Of(e,t){_f.M(e,t);var n=bf;if(n&&e){var r=pt(n).hoistableScripts,i=Pf(e),a=r.get(i);a||(a=n.querySelector(Ff(i)),a||(e=h({src:e,async:!0,type:`module`},t),(t=mf.get(i))&&zf(e,t),a=n.createElement(`script`),mt(a),Pd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function kf(e,t,n,r){var a=(a=B.current)?gf(a):null;if(!a)throw Error(i(446));switch(e){case`meta`:case`title`:return null;case`style`:return typeof n.precedence==`string`&&typeof n.href==`string`?(t=Af(n.href),n=pt(a).hoistableStyles,r=n.get(t),r||(r={type:`style`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};case`link`:if(n.rel===`stylesheet`&&typeof n.href==`string`&&typeof n.precedence==`string`){e=Af(n.href);var o=pt(a).hoistableStyles,s=o.get(e);if(s||(a=a.ownerDocument||a,s={type:`stylesheet`,instance:null,count:0,state:{loading:0,preload:null}},o.set(e,s),(o=a.querySelector(jf(e)))&&!o._p&&(s.instance=o,s.state.loading=5),mf.has(e)||(n={rel:`preload`,as:`style`,href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},mf.set(e,n),o||Nf(a,e,n,s.state))),t&&r===null)throw Error(i(528,``));return s}if(t&&r!==null)throw Error(i(529,``));return null;case`script`:return t=n.async,n=n.src,typeof n==`string`&&t&&typeof t!=`function`&&typeof t!=`symbol`?(t=Pf(n),n=pt(a).hoistableScripts,r=n.get(t),r||(r={type:`script`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};default:throw Error(i(444,e))}}function Af(e){return`href="`+Nt(e)+`"`}function jf(e){return`link[rel="stylesheet"][`+e+`]`}function Mf(e){return h({},e,{"data-precedence":e.precedence,precedence:null})}function Nf(e,t,n,r){e.querySelector(`link[rel="preload"][as="style"][`+t+`]`)?r.loading=1:(t=e.createElement(`link`),r.preload=t,t.addEventListener(`load`,function(){return r.loading|=1}),t.addEventListener(`error`,function(){return r.loading|=2}),Pd(t,`link`,n),mt(t),e.head.appendChild(t))}function Pf(e){return`[src="`+Nt(e)+`"]`}function Ff(e){return`script[async]`+e}function If(e,t,n){if(t.count++,t.instance===null)switch(t.type){case`style`:var r=e.querySelector(`style[data-href~="`+Nt(n.href)+`"]`);if(r)return t.instance=r,mt(r),r;var a=h({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement(`style`),mt(r),Pd(r,`style`,a),Lf(r,n.precedence,e),t.instance=r;case`stylesheet`:a=Af(n.href);var o=e.querySelector(jf(a));if(o)return t.state.loading|=4,t.instance=o,mt(o),o;r=Mf(n),(a=mf.get(a))&&Rf(r,a),o=(e.ownerDocument||e).createElement(`link`),mt(o);var s=o;return s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),Pd(o,`link`,r),t.state.loading|=4,Lf(o,n.precedence,e),t.instance=o;case`script`:return o=Pf(n.src),(a=e.querySelector(Ff(o)))?(t.instance=a,mt(a),a):(r=n,(a=mf.get(o))&&(r=h({},n),zf(r,a)),e=e.ownerDocument||e,a=e.createElement(`script`),mt(a),Pd(a,`link`,r),e.head.appendChild(a),t.instance=a);case`void`:return null;default:throw Error(i(443,t.type))}else t.type===`stylesheet`&&!(t.state.loading&4)&&(r=t.instance,t.state.loading|=4,Lf(r,n.precedence,e));return t.instance}function Lf(e,t,n){for(var r=n.querySelectorAll(`link[rel="stylesheet"][data-precedence],style[data-precedence]`),i=r.length?r[r.length-1]:null,a=i,o=0;o<r.length;o++){var s=r[o];if(s.dataset.precedence===t)a=s;else if(a!==i)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function Rf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.title??=t.title}function zf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.integrity??=t.integrity}var Bf=null;function Vf(e,t,n){if(Bf===null){var r=new Map,i=Bf=new Map;i.set(n,r)}else i=Bf,r=i.get(n),r||(r=new Map,i.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),i=0;i<n.length;i++){var a=n[i];if(!(a[ct]||a[tt]||e===`link`&&a.getAttribute(`rel`)===`stylesheet`)&&a.namespaceURI!==`http://www.w3.org/2000/svg`){var o=a.getAttribute(t)||``;o=e+o;var s=r.get(o);s?s.push(a):r.set(o,[a])}}return r}function Hf(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t===`title`?e.querySelector(`head > title`):null)}function Uf(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case`meta`:case`title`:return!0;case`style`:if(typeof t.precedence!=`string`||typeof t.href!=`string`||t.href===``)break;return!0;case`link`:if(typeof t.rel!=`string`||typeof t.href!=`string`||t.href===``||t.onLoad||t.onError)break;switch(t.rel){case`stylesheet`:return e=t.disabled,typeof t.precedence==`string`&&e==null;default:return!0}case`script`:if(t.async&&typeof t.async!=`function`&&typeof t.async!=`symbol`&&!t.onLoad&&!t.onError&&t.src&&typeof t.src==`string`)return!0}return!1}function Wf(e){return!(e.type===`stylesheet`&&!(e.state.loading&3))}function Gf(e,t,n,r){if(n.type===`stylesheet`&&(typeof r.media!=`string`||!1!==matchMedia(r.media).matches)&&!(n.state.loading&4)){if(n.instance===null){var i=Af(r.href),a=t.querySelector(jf(i));if(a){t=a._p,typeof t==`object`&&t&&typeof t.then==`function`&&(e.count++,e=Jf.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,mt(a);return}a=t.ownerDocument||t,r=Mf(r),(i=mf.get(i))&&Rf(r,i),a=a.createElement(`link`),mt(a);var o=a;o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),Pd(a,`link`,r),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&!(n.state.loading&3)&&(e.count++,n=Jf.bind(e),t.addEventListener(`load`,n),t.addEventListener(`error`,n))}}var Kf=0;function qf(e,t){return e.stylesheets&&e.count===0&&Xf(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var r=setTimeout(function(){if(e.stylesheets&&Xf(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4+t);0<e.imgBytes&&Kf===0&&(Kf=62500*Ld());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Xf(e,e.stylesheets),e.unsuspend)){var t=e.unsuspend;e.unsuspend=null,t()}},(e.imgBytes>Kf?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(i)}}:null}function Jf(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Xf(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Yf=null;function Xf(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Yf=new Map,t.forEach(Zf,e),Yf=null,Jf.call(e))}function Zf(e,t){if(!(t.state.loading&4)){var n=Yf.get(e);if(n)var r=n.get(null);else{n=new Map,Yf.set(e,n);for(var i=e.querySelectorAll(`link[data-precedence],style[data-precedence]`),a=0;a<i.length;a++){var o=i[a];(o.nodeName===`LINK`||o.getAttribute(`media`)!==`not all`)&&(n.set(o.dataset.precedence,o),r=o)}r&&n.set(null,r)}i=t.instance,o=i.getAttribute(`data-precedence`),a=n.get(o)||r,a===r&&n.set(null,i),n.set(o,i),this.count++,r=Jf.bind(this),i.addEventListener(`load`,r),i.addEventListener(`error`,r),a?a.parentNode.insertBefore(i,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var Qf={$$typeof:C,Provider:null,Consumer:null,_currentValue:F,_currentValue2:F,_threadCount:0};function $f(e,t,n,r,i,a,o,s,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=We(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=We(0),this.hiddenUpdates=We(null),this.identifierPrefix=r,this.onUncaughtError=i,this.onCaughtError=a,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.incompleteTransitions=new Map}function ep(e,t,n,r,i,a,o,s,c,l,u,d){return e=new $f(e,t,n,o,c,l,u,d,s),t=1,!0===a&&(t|=24),a=ei(3,null,null,t),e.current=a,a.stateNode=e,t=$i(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:r,isDehydrated:n,cache:t},Ma(a),e}function tp(e){return e?(e=Qr,e):Qr}function np(e,t,n,r,i,a){i=tp(i),r.context===null?r.context=i:r.pendingContext=i,r=Pa(t),r.payload={element:n},a=a===void 0?null:a,a!==null&&(r.callback=a),n=Fa(e,r,t),n!==null&&(pu(n,e,t),Ia(n,e,t))}function rp(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function ip(e,t){rp(e,t),(e=e.alternate)&&rp(e,t)}function ap(e){if(e.tag===13||e.tag===31){var t=Xr(e,67108864);t!==null&&pu(t,e,67108864),ip(e,67108864)}}function op(e){if(e.tag===13||e.tag===31){var t=du();t=Xe(t);var n=Xr(e,t);n!==null&&pu(n,e,t),ip(e,t)}}var sp=!0;function cp(e,t,n,r){var i=N.T;N.T=null;var a=P.p;try{P.p=2,up(e,t,n,r)}finally{P.p=a,N.T=i}}function lp(e,t,n,r){var i=N.T;N.T=null;var a=P.p;try{P.p=8,up(e,t,n,r)}finally{P.p=a,N.T=i}}function up(e,t,n,r){if(sp){var i=dp(r);if(i===null)Cd(e,t,r,fp,n),Cp(e,r);else if(Tp(i,e,t,n,r))r.stopPropagation();else if(Cp(e,r),t&4&&-1<Sp.indexOf(e)){for(;i!==null;){var a=dt(i);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var o=ze(a.pendingLanes);if(o!==0){var s=a;for(s.pendingLanes|=2,s.entangledLanes|=2;o;){var c=1<<31-Me(o);s.entanglements[1]|=c,o&=~c}nd(a),!(X&6)&&($l=U()+500,rd(0,!1))}}break;case 31:case 13:s=Xr(a,2),s!==null&&pu(s,a,2),vu(),ip(a,2)}if(a=dp(r),a===null&&Cd(e,t,r,fp,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else Cd(e,t,r,null,n)}}function dp(e){return e=Xt(e),pp(e)}var fp=null;function pp(e){if(fp=null,e=ut(e),e!==null){var t=o(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=s(t),e!==null)return e;e=null}else if(n===31){if(e=c(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return fp=e,null}function mp(e){switch(e){case`beforetoggle`:case`cancel`:case`click`:case`close`:case`contextmenu`:case`copy`:case`cut`:case`auxclick`:case`dblclick`:case`dragend`:case`dragstart`:case`drop`:case`focusin`:case`focusout`:case`input`:case`invalid`:case`keydown`:case`keypress`:case`keyup`:case`mousedown`:case`mouseup`:case`paste`:case`pause`:case`play`:case`pointercancel`:case`pointerdown`:case`pointerup`:case`ratechange`:case`reset`:case`resize`:case`seeked`:case`submit`:case`toggle`:case`touchcancel`:case`touchend`:case`touchstart`:case`volumechange`:case`change`:case`selectionchange`:case`textInput`:case`compositionstart`:case`compositionend`:case`compositionupdate`:case`beforeblur`:case`afterblur`:case`beforeinput`:case`blur`:case`fullscreenchange`:case`focus`:case`hashchange`:case`popstate`:case`select`:case`selectstart`:return 2;case`drag`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`mousemove`:case`mouseout`:case`mouseover`:case`pointermove`:case`pointerout`:case`pointerover`:case`scroll`:case`touchmove`:case`wheel`:case`mouseenter`:case`mouseleave`:case`pointerenter`:case`pointerleave`:return 8;case`message`:switch(xe()){case Se:return 2;case Ce:return 8;case we:case Te:return 32;case Ee:return 268435456;default:return 32}default:return 32}}var hp=!1,gp=null,_p=null,vp=null,yp=new Map,bp=new Map,xp=[],Sp=`mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(` `);function Cp(e,t){switch(e){case`focusin`:case`focusout`:gp=null;break;case`dragenter`:case`dragleave`:_p=null;break;case`mouseover`:case`mouseout`:vp=null;break;case`pointerover`:case`pointerout`:yp.delete(t.pointerId);break;case`gotpointercapture`:case`lostpointercapture`:bp.delete(t.pointerId)}}function wp(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=dt(t),t!==null&&ap(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Tp(e,t,n,r,i){switch(t){case`focusin`:return gp=wp(gp,e,t,n,r,i),!0;case`dragenter`:return _p=wp(_p,e,t,n,r,i),!0;case`mouseover`:return vp=wp(vp,e,t,n,r,i),!0;case`pointerover`:var a=i.pointerId;return yp.set(a,wp(yp.get(a)||null,e,t,n,r,i)),!0;case`gotpointercapture`:return a=i.pointerId,bp.set(a,wp(bp.get(a)||null,e,t,n,r,i)),!0}return!1}function Ep(e){var t=ut(e.target);if(t!==null){var n=o(t);if(n!==null){if(t=n.tag,t===13){if(t=s(n),t!==null){e.blockedOn=t,$e(e.priority,function(){op(n)});return}}else if(t===31){if(t=c(n),t!==null){e.blockedOn=t,$e(e.priority,function(){op(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Dp(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=dp(e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Yt=r,n.target.dispatchEvent(r),Yt=null}else return t=dt(n),t!==null&&ap(t),e.blockedOn=n,!1;t.shift()}return!0}function Op(e,t,n){Dp(e)&&n.delete(t)}function kp(){hp=!1,gp!==null&&Dp(gp)&&(gp=null),_p!==null&&Dp(_p)&&(_p=null),vp!==null&&Dp(vp)&&(vp=null),yp.forEach(Op),bp.forEach(Op)}function Ap(e,n){e.blockedOn===n&&(e.blockedOn=null,hp||(hp=!0,t.unstable_scheduleCallback(t.unstable_NormalPriority,kp)))}var jp=null;function Mp(e){jp!==e&&(jp=e,t.unstable_scheduleCallback(t.unstable_NormalPriority,function(){jp===e&&(jp=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],i=e[t+2];if(typeof r!=`function`){if(pp(r||n)===null)continue;break}var a=dt(n);a!==null&&(e.splice(t,3),t-=3,vs(a,{pending:!0,data:i,method:n.method,action:r},r,i))}}))}function Np(e){function t(t){return Ap(t,e)}gp!==null&&Ap(gp,e),_p!==null&&Ap(_p,e),vp!==null&&Ap(vp,e),yp.forEach(t),bp.forEach(t);for(var n=0;n<xp.length;n++){var r=xp[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<xp.length&&(n=xp[0],n.blockedOn===null);)Ep(n),n.blockedOn===null&&xp.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(r=0;r<n.length;r+=3){var i=n[r],a=n[r+1],o=i[nt]||null;if(typeof a==`function`)o||Mp(n);else if(o){var s=null;if(a&&a.hasAttribute(`formAction`)){if(i=a,o=a[nt]||null)s=o.formAction;else if(pp(i)!==null)continue}else s=o.action;typeof s==`function`?n[r+1]=s:(n.splice(r,3),r-=3),Mp(n)}}}function Pp(){function e(e){e.canIntercept&&e.info===`react-transition`&&e.intercept({handler:function(){return new Promise(function(e){return i=e})},focusReset:`manual`,scroll:`manual`})}function t(){i!==null&&(i(),i=null),r||setTimeout(n,20)}function n(){if(!r&&!navigation.transition){var e=navigation.currentEntry;e&&e.url!=null&&navigation.navigate(e.url,{state:e.getState(),info:`react-transition`,history:`replace`})}}if(typeof navigation==`object`){var r=!1,i=null;return navigation.addEventListener(`navigate`,e),navigation.addEventListener(`navigatesuccess`,t),navigation.addEventListener(`navigateerror`,t),setTimeout(n,100),function(){r=!0,navigation.removeEventListener(`navigate`,e),navigation.removeEventListener(`navigatesuccess`,t),navigation.removeEventListener(`navigateerror`,t),i!==null&&(i(),i=null)}}}function Fp(e){this._internalRoot=e}Ip.prototype.render=Fp.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(i(409));var n=t.current;np(n,du(),e,t,null,null)},Ip.prototype.unmount=Fp.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;np(e.current,2,null,e,null,null),vu(),t[rt]=null}};function Ip(e){this._internalRoot=e}Ip.prototype.unstable_scheduleHydration=function(e){if(e){var t=Qe();e={blockedOn:null,target:e,priority:t};for(var n=0;n<xp.length&&t!==0&&t<xp[n].priority;n++);xp.splice(n,0,e),n===0&&Ep(e)}};var Lp=n.version;if(Lp!==`19.2.7`)throw Error(i(527,Lp,`19.2.7`));P.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render==`function`?Error(i(188)):(e=Object.keys(e).join(`,`),Error(i(268,e)));return e=d(t),e=e===null?null:p(e),e=e===null?null:e.stateNode,e};var Rp={bundleType:0,version:`19.2.7`,rendererPackageName:`react-dom`,currentDispatcherRef:N,reconcilerVersion:`19.2.7`};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`){var zp=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!zp.isDisabled&&zp.supportsFiber)try{ke=zp.inject(Rp),Ae=zp}catch{}}e.createRoot=function(e,t){if(!a(e))throw Error(i(299));var n=!1,r=``,o=Vs,s=Hs,c=Us;return t!=null&&(!0===t.unstable_strictMode&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onUncaughtError!==void 0&&(o=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(c=t.onRecoverableError)),t=ep(e,1,!1,null,null,n,r,null,o,s,c,Pp),e[rt]=t.current,xd(e),new Fp(t)}})),g=o(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=h()})),_=c(u(),1),v=g(),y=`modulepreload`,b=function(e){return`/`+e},x={},S=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}r=o(t.map(t=>{if(t=b(t,n),t in x)return;x[t]=!0;let r=t.endsWith(`.css`),i=r?`[rel="stylesheet"]`:``;if(n)for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${t}"]${i}`))return;let o=document.createElement(`link`);if(o.rel=r?`stylesheet`:y,r||(o.as=`script`),o.crossOrigin=``,o.href=t,a&&o.setAttribute(`nonce`,a),document.head.appendChild(o),r)return new Promise((e,n)=>{o.addEventListener(`load`,e),o.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},C=`popstate`;function w(e){return typeof e==`object`&&!!e&&`pathname`in e&&`search`in e&&`hash`in e&&`state`in e&&`key`in e}function ee(e={}){function t(e,t){let n=t.state?.masked,{pathname:r,search:i,hash:a}=n||e.location;return k(``,{pathname:r,search:i,hash:a},t.state&&t.state.usr||null,t.state&&t.state.key||`default`,n?{pathname:e.location.pathname,search:e.location.search,hash:e.location.hash}:void 0)}function n(e,t){return typeof t==`string`?t:A(t)}return te(t,n,null,e)}function T(e,t){if(e===!1||e==null)throw Error(t)}function E(e,t){if(!e){typeof console<`u`&&console.warn(t);try{throw Error(t)}catch{}}}function D(){return Math.random().toString(36).substring(2,10)}function O(e,t){return{usr:e.state,key:e.key,idx:t,masked:e.mask?{pathname:e.pathname,search:e.search,hash:e.hash}:void 0}}function k(e,t,n=null,r,i){return{pathname:typeof e==`string`?e:e.pathname,search:``,hash:``,...typeof t==`string`?j(t):t,state:n,key:t&&t.key||r||D(),mask:i}}function A({pathname:e=`/`,search:t=``,hash:n=``}){return t&&t!==`?`&&(e+=t.charAt(0)===`?`?t:`?`+t),n&&n!==`#`&&(e+=n.charAt(0)===`#`?n:`#`+n),e}function j(e){let t={};if(e){let n=e.indexOf(`#`);n>=0&&(t.hash=e.substring(n),e=e.substring(0,n));let r=e.indexOf(`?`);r>=0&&(t.search=e.substring(r),e=e.substring(0,r)),e&&(t.pathname=e)}return t}function te(e,t,n,r={}){let{window:i=document.defaultView,v5Compat:a=!1}=r,o=i.history,s=`POP`,c=null,l=u();l??(l=0,o.replaceState({...o.state,idx:l},``));function u(){return(o.state||{idx:null}).idx}function d(){s=`POP`;let e=u(),t=e==null?null:e-l;l=e,c&&c({action:s,location:h.location,delta:t})}function f(e,t){s=`PUSH`;let r=w(e)?e:k(h.location,e,t);n&&n(r,e),l=u()+1;let d=O(r,l),f=h.createHref(r.mask||r);try{o.pushState(d,``,f)}catch(e){if(e instanceof DOMException&&e.name===`DataCloneError`)throw e;i.location.assign(f)}a&&c&&c({action:s,location:h.location,delta:1})}function p(e,t){s=`REPLACE`;let r=w(e)?e:k(h.location,e,t);n&&n(r,e),l=u();let i=O(r,l),d=h.createHref(r.mask||r);o.replaceState(i,``,d),a&&c&&c({action:s,location:h.location,delta:0})}function m(e){return M(i,e)}let h={get action(){return s},get location(){return e(i,o)},listen(e){if(c)throw Error(`A history only accepts one active listener`);return i.addEventListener(C,d),c=e,()=>{i.removeEventListener(C,d),c=null}},createHref(e){return t(i,e)},createURL:m,encodeLocation(e){let t=m(e);return{pathname:t.pathname,search:t.search,hash:t.hash}},push:f,replace:p,go(e){return o.go(e)}};return h}function M(e,t,n=!1){let r=`http://localhost`;e&&(r=e.location.origin===`null`?e.location.href:e.location.origin),T(r,`No window.location.(origin|href) available to create URL`);let i=typeof t==`string`?t:A(t);return i=i.replace(/ $/,`%20`),!n&&i.startsWith(`//`)&&(i=r+i),new URL(i,r)}function ne(e,t,n=`/`){return N(e,t,n,!1)}function N(e,t,n,r,i){let a=fe((typeof t==`string`?j(t):t).pathname||`/`,n);if(a==null)return null;let o=i??F(e),s=null,c=de(a);for(let e=0;s==null&&e<o.length;++e)s=ce(o[e],c,r);return s}function P(e,t){let{route:n,pathname:r,params:i}=e;return{id:n.id,pathname:r,params:i,data:t[n.id],loaderData:t[n.id],handle:n.handle}}function F(e){let t=re(e);return L(t),t}function re(e,t=[],n=[],r=``,i=!1){let a=(e,a,o=i,s)=>{let c={relativePath:s===void 0?e.path||``:s,caseSensitive:e.caseSensitive===!0,childrenIndex:a,route:e};if(c.relativePath.startsWith(`/`)){if(!c.relativePath.startsWith(r)&&o)return;T(c.relativePath.startsWith(r),`Absolute route path "${c.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),c.relativePath=c.relativePath.slice(r.length)}let l=U([r,c.relativePath]),u=n.concat(c);e.children&&e.children.length>0&&(T(e.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${l}".`),re(e.children,t,u,l,o)),!(e.path==null&&!e.index)&&t.push({path:l,score:oe(l,e.index),routesMeta:u})};return e.forEach((e,t)=>{if(e.path===``||!e.path?.includes(`?`))a(e,t);else for(let n of I(e.path))a(e,t,!0,n)}),t}function I(e){let t=e.split(`/`);if(t.length===0)return[];let[n,...r]=t,i=n.endsWith(`?`),a=n.replace(/\?$/,``);if(r.length===0)return i?[a,``]:[a];let o=I(r.join(`/`)),s=[];return s.push(...o.map(e=>e===``?a:[a,e].join(`/`))),i&&s.push(...o),s.map(t=>e.startsWith(`/`)&&t===``?`/`:t)}function L(e){e.sort((e,t)=>e.score===t.score?se(e.routesMeta.map(e=>e.childrenIndex),t.routesMeta.map(e=>e.childrenIndex)):t.score-e.score)}var R=/^:[\w-]+$/,z=3,ie=2,ae=1,B=10,V=-2,H=e=>e===`*`;function oe(e,t){let n=e.split(`/`),r=n.length;return n.some(H)&&(r+=V),t&&(r+=ie),n.filter(e=>!H(e)).reduce((e,t)=>e+(R.test(t)?z:t===``?ae:B),r)}function se(e,t){return e.length===t.length&&e.slice(0,-1).every((e,n)=>e===t[n])?e[e.length-1]-t[t.length-1]:0}function ce(e,t,n=!1){let{routesMeta:r}=e,i={},a=`/`,o=[];for(let e=0;e<r.length;++e){let s=r[e],c=e===r.length-1,l=a===`/`?t:t.slice(a.length)||`/`,u=le({path:s.relativePath,caseSensitive:s.caseSensitive,end:c},l),d=s.route;if(!u&&c&&n&&!r[r.length-1].route.index&&(u=le({path:s.relativePath,caseSensitive:s.caseSensitive,end:!1},l)),!u)return null;Object.assign(i,u.params),o.push({params:i,pathname:U([a,u.pathname]),pathnameBase:Se(U([a,u.pathnameBase])),route:d}),u.pathnameBase!==`/`&&(a=U([a,u.pathnameBase]))}return o}function le(e,t){typeof e==`string`&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=ue(e.path,e.caseSensitive,e.end),i=t.match(n);if(!i)return null;let a=i[0],o=a.replace(/(.)\/+$/,`$1`),s=i.slice(1);return{params:r.reduce((e,{paramName:t,isOptional:n},r)=>{if(t===`*`){let e=s[r]||``;o=a.slice(0,a.length-e.length).replace(/(.)\/+$/,`$1`)}let i=s[r];return n&&!i?e[t]=void 0:e[t]=(i||``).replace(/%2F/g,`/`),e},{}),pathname:a,pathnameBase:o,pattern:e}}function ue(e,t=!1,n=!0){E(e===`*`||!e.endsWith(`*`)||e.endsWith(`/*`),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,`/*`)}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,`/*`)}".`);let r=[],i=`^`+e.replace(/\/*\*?$/,``).replace(/^\/*/,`/`).replace(/[\\.*+^${}|()[\]]/g,`\\$&`).replace(/\/:([\w-]+)(\?)?/g,(e,t,n,i,a)=>{if(r.push({paramName:t,isOptional:n!=null}),n){let t=a.charAt(i+e.length);return t&&t!==`/`?`/([^\\/]*)`:`(?:/([^\\/]*))?`}return`/([^\\/]+)`}).replace(/\/([\w-]+)\?(\/|$)/g,`(/$1)?$2`);return e.endsWith(`*`)?(r.push({paramName:`*`}),i+=e===`*`||e===`/*`?`(.*)$`:`(?:\\/(.+)|\\/*)$`):n?i+=`\\/*$`:e!==``&&e!==`/`&&(i+=`(?:(?=\\/|$))`),[new RegExp(i,t?void 0:`i`),r]}function de(e){try{return e.split(`/`).map(e=>decodeURIComponent(e).replace(/\//g,`%2F`)).join(`/`)}catch(t){return E(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function fe(e,t){if(t===`/`)return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith(`/`)?t.length-1:t.length,r=e.charAt(n);return r&&r!==`/`?null:e.slice(n)||`/`}var pe=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;function me(e,t=`/`){let{pathname:n,search:r=``,hash:i=``}=typeof e==`string`?j(e):e,a;return n?(n=be(n),a=n.startsWith(`/`)?he(n.substring(1),`/`):he(n,t)):a=t,{pathname:a,search:Ce(r),hash:we(i)}}function he(e,t){let n=xe(t).split(`/`);return e.split(`/`).forEach(e=>{e===`..`?n.length>1&&n.pop():e!==`.`&&n.push(e)}),n.length>1?n.join(`/`):`/`}function ge(e,t,n,r){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function _e(e){return e.filter((e,t)=>t===0||e.route.path&&e.route.path.length>0)}function ve(e){let t=_e(e);return t.map((e,n)=>n===t.length-1?e.pathname:e.pathnameBase)}function ye(e,t,n,r=!1){let i;typeof e==`string`?i=j(e):(i={...e},T(!i.pathname||!i.pathname.includes(`?`),ge(`?`,`pathname`,`search`,i)),T(!i.pathname||!i.pathname.includes(`#`),ge(`#`,`pathname`,`hash`,i)),T(!i.search||!i.search.includes(`#`),ge(`#`,`search`,`hash`,i)));let a=e===``||i.pathname===``,o=a?`/`:i.pathname,s;if(o==null)s=n;else{let e=t.length-1;if(!r&&o.startsWith(`..`)){let t=o.split(`/`);for(;t[0]===`..`;)t.shift(),--e;i.pathname=t.join(`/`)}s=e>=0?t[e]:`/`}let c=me(i,s),l=o&&o!==`/`&&o.endsWith(`/`),u=(a||o===`.`)&&n.endsWith(`/`);return!c.pathname.endsWith(`/`)&&(l||u)&&(c.pathname+=`/`),c}var be=e=>e.replace(/\/\/+/g,`/`),U=e=>be(e.join(`/`)),xe=e=>e.replace(/\/+$/,``),Se=e=>xe(e).replace(/^\/*/,`/`),Ce=e=>!e||e===`?`?``:e.startsWith(`?`)?e:`?`+e,we=e=>!e||e===`#`?``:e.startsWith(`#`)?e:`#`+e,Te=class{constructor(e,t,n,r=!1){this.status=e,this.statusText=t||``,this.internal=r,n instanceof Error?(this.data=n.toString(),this.error=n):this.data=n}};function Ee(e){return e!=null&&typeof e.status==`number`&&typeof e.statusText==`string`&&typeof e.internal==`boolean`&&`data`in e}function De(e){return U(e.map(e=>e.route.path).filter(Boolean))||`/`}var Oe=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0;function ke(e,t){let n=e;if(typeof n!=`string`||!pe.test(n))return{absoluteURL:void 0,isExternal:!1,to:n};let r=n,i=!1;if(Oe)try{let e=new URL(window.location.href),r=n.startsWith(`//`)?new URL(e.protocol+n):new URL(n),a=fe(r.pathname,t);r.origin===e.origin&&a!=null?n=a+r.search+r.hash:i=!0}catch{E(!1,`<Link to="${n}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:r,isExternal:i,to:n}}Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);var Ae=[`POST`,`PUT`,`PATCH`,`DELETE`];new Set(Ae);var je=[`GET`,...Ae];new Set(je);var Me=_.createContext(null);Me.displayName=`DataRouter`;var Ne=_.createContext(null);Ne.displayName=`DataRouterState`;var Pe=_.createContext(!1);function Fe(){return _.useContext(Pe)}var Ie=_.createContext({isTransitioning:!1});Ie.displayName=`ViewTransition`;var Le=_.createContext(new Map);Le.displayName=`Fetchers`;var Re=_.createContext(null);Re.displayName=`Await`;var ze=_.createContext(null);ze.displayName=`Navigation`;var Be=_.createContext(null);Be.displayName=`Location`;var Ve=_.createContext({outlet:null,matches:[],isDataRoute:!1});Ve.displayName=`Route`;var He=_.createContext(null);He.displayName=`RouteError`;var Ue=`REACT_ROUTER_ERROR`,We=`REDIRECT`,Ge=`ROUTE_ERROR_RESPONSE`;function Ke(e){if(e.startsWith(`${Ue}:${We}:{`))try{let t=JSON.parse(e.slice(28));if(typeof t==`object`&&t&&typeof t.status==`number`&&typeof t.statusText==`string`&&typeof t.location==`string`&&typeof t.reloadDocument==`boolean`&&typeof t.replace==`boolean`)return t}catch{}}function qe(e){if(e.startsWith(`${Ue}:${Ge}:{`))try{let t=JSON.parse(e.slice(40));if(typeof t==`object`&&t&&typeof t.status==`number`&&typeof t.statusText==`string`)return new Te(t.status,t.statusText,t.data)}catch{}}function Je(e,{relative:t}={}){T(Ye(),`useHref() may be used only in the context of a <Router> component.`);let{basename:n,navigator:r}=_.useContext(ze),{hash:i,pathname:a,search:o}=tt(e,{relative:t}),s=a;return n!==`/`&&(s=a===`/`?n:U([n,a])),r.createHref({pathname:s,search:o,hash:i})}function Ye(){return _.useContext(Be)!=null}function Xe(){return T(Ye(),`useLocation() may be used only in the context of a <Router> component.`),_.useContext(Be).location}var Ze=`You should call navigate() in a React.useEffect(), not when your component is first rendered.`;function Qe(e){_.useContext(ze).static||_.useLayoutEffect(e)}function $e(){let{isDataRoute:e}=_.useContext(Ve);return e?bt():et()}function et(){T(Ye(),`useNavigate() may be used only in the context of a <Router> component.`);let e=_.useContext(Me),{basename:t,navigator:n}=_.useContext(ze),{matches:r}=_.useContext(Ve),{pathname:i}=Xe(),a=JSON.stringify(ve(r)),o=_.useRef(!1);return Qe(()=>{o.current=!0}),_.useCallback((r,s={})=>{if(E(o.current,Ze),!o.current)return;if(typeof r==`number`){n.go(r);return}let c=ye(r,JSON.parse(a),i,s.relative===`path`);e==null&&t!==`/`&&(c.pathname=c.pathname===`/`?t:U([t,c.pathname])),(s.replace?n.replace:n.push)(c,s.state,s)},[t,n,a,i,e])}_.createContext(null);function tt(e,{relative:t}={}){let{matches:n}=_.useContext(Ve),{pathname:r}=Xe(),i=JSON.stringify(ve(n));return _.useMemo(()=>ye(e,JSON.parse(i),r,t===`path`),[e,i,r,t])}function nt(e,t){return rt(e,t)}function rt(e,t,n){T(Ye(),`useRoutes() may be used only in the context of a <Router> component.`);let{navigator:r}=_.useContext(ze),{matches:i}=_.useContext(Ve),a=i[i.length-1],o=a?a.params:{},s=a?a.pathname:`/`,c=a?a.pathnameBase:`/`,l=a&&a.route;{let e=l&&l.path||``;St(s,!l||e.endsWith(`*`)||e.endsWith(`*?`),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${s}" (under <Route path="${e}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${e}"> to <Route path="${e===`/`?`*`:`${e}/*`}">.`)}let u=Xe(),d;if(t){let e=typeof t==`string`?j(t):t;T(c===`/`||e.pathname?.startsWith(c),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${c}" but pathname "${e.pathname}" was given in the \`location\` prop.`),d=e}else d=u;let f=d.pathname||`/`,p=f;if(c!==`/`){let e=c.replace(/^\//,``).split(`/`);p=`/`+f.replace(/^\//,``).split(`/`).slice(e.length).join(`/`)}let m=n&&n.state.matches.length?n.state.matches.map(e=>Object.assign(e,{route:n.manifest[e.route.id]||e.route})):ne(e,{pathname:p});E(l||m!=null,`No routes matched location "${d.pathname}${d.search}${d.hash}" `),E(m==null||m[m.length-1].route.element!==void 0||m[m.length-1].route.Component!==void 0||m[m.length-1].route.lazy!==void 0,`Matched leaf route at location "${d.pathname}${d.search}${d.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let h=ut(m&&m.map(e=>Object.assign({},e,{params:Object.assign({},o,e.params),pathname:U([c,r.encodeLocation?r.encodeLocation(e.pathname.replace(/%/g,`%25`).replace(/\?/g,`%3F`).replace(/#/g,`%23`)).pathname:e.pathname]),pathnameBase:e.pathnameBase===`/`?c:U([c,r.encodeLocation?r.encodeLocation(e.pathnameBase.replace(/%/g,`%25`).replace(/\?/g,`%3F`).replace(/#/g,`%23`)).pathname:e.pathnameBase])})),i,n);return t&&h?_.createElement(Be.Provider,{value:{location:{pathname:`/`,search:``,hash:``,state:null,key:`default`,mask:void 0,...d},navigationType:`POP`}},h):h}function it(){let e=yt(),t=Ee(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,r=`rgba(200,200,200, 0.5)`,i={padding:`0.5rem`,backgroundColor:r},a={padding:`2px 4px`,backgroundColor:r},o=null;return console.error(`Error handled by React Router default ErrorBoundary:`,e),o=_.createElement(_.Fragment,null,_.createElement(`p`,null,`💿 Hey developer 👋`),_.createElement(`p`,null,`You can provide a way better UX than this when your app throws errors by providing your own `,_.createElement(`code`,{style:a},`ErrorBoundary`),` or`,` `,_.createElement(`code`,{style:a},`errorElement`),` prop on your route.`)),_.createElement(_.Fragment,null,_.createElement(`h2`,null,`Unexpected Application Error!`),_.createElement(`h3`,{style:{fontStyle:`italic`}},t),n?_.createElement(`pre`,{style:i},n):null,o)}var at=_.createElement(it,null),ot=class extends _.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!==`idle`&&e.revalidation===`idle`?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error===void 0?t.error:e.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){this.props.onError?this.props.onError(e,t):console.error(`React Router caught the following error during render`,e)}render(){let e=this.state.error;if(this.context&&typeof e==`object`&&e&&`digest`in e&&typeof e.digest==`string`){let t=qe(e.digest);t&&(e=t)}let t=e===void 0?this.props.children:_.createElement(Ve.Provider,{value:this.props.routeContext},_.createElement(He.Provider,{value:e,children:this.props.component}));return this.context?_.createElement(ct,{error:e},t):t}};ot.contextType=Pe;var st=new WeakMap;function ct({children:e,error:t}){let{basename:n}=_.useContext(ze);if(typeof t==`object`&&t&&`digest`in t&&typeof t.digest==`string`){let e=Ke(t.digest);if(e){let r=st.get(t);if(r)throw r;let i=ke(e.location,n);if(Oe&&!st.get(t))if(i.isExternal||e.reloadDocument)window.location.href=i.absoluteURL||i.to;else{let n=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(i.to,{replace:e.replace}));throw st.set(t,n),n}return _.createElement(`meta`,{httpEquiv:`refresh`,content:`0;url=${i.absoluteURL||i.to}`})}}return e}function lt({routeContext:e,match:t,children:n}){let r=_.useContext(Me);return r&&r.static&&r.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(r.staticContext._deepestRenderedBoundaryId=t.route.id),_.createElement(Ve.Provider,{value:e},n)}function ut(e,t=[],n){let r=n?.state;if(e==null){if(!r)return null;if(r.errors)e=r.matches;else if(t.length===0&&!r.initialized&&r.matches.length>0)e=r.matches;else return null}let i=e,a=r?.errors;if(a!=null){let e=i.findIndex(e=>e.route.id&&a?.[e.route.id]!==void 0);T(e>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(a).join(`,`)}`),i=i.slice(0,Math.min(i.length,e+1))}let o=!1,s=-1;if(n&&r){o=r.renderFallback;for(let e=0;e<i.length;e++){let t=i[e];if((t.route.HydrateFallback||t.route.hydrateFallbackElement)&&(s=e),t.route.id){let{loaderData:e,errors:a}=r,c=t.route.loader&&!e.hasOwnProperty(t.route.id)&&(!a||a[t.route.id]===void 0);if(t.route.lazy||c){n.isStatic&&(o=!0),i=s>=0?i.slice(0,s+1):[i[0]];break}}}}let c=n?.onError,l=r&&c?(e,t)=>{c(e,{location:r.location,params:r.matches?.[0]?.params??{},pattern:De(r.matches),errorInfo:t})}:void 0;return i.reduceRight((e,n,c)=>{let u,d=!1,f=null,p=null;r&&(u=a&&n.route.id?a[n.route.id]:void 0,f=n.route.errorElement||at,o&&(s<0&&c===0?(St(`route-fallback`,!1,"No `HydrateFallback` element provided to render during initial hydration"),d=!0,p=null):s===c&&(d=!0,p=n.route.hydrateFallbackElement||null)));let m=t.concat(i.slice(0,c+1)),h=()=>{let t;return t=u?f:d?p:n.route.Component?_.createElement(n.route.Component,null):n.route.element?n.route.element:e,_.createElement(lt,{match:n,routeContext:{outlet:e,matches:m,isDataRoute:r!=null},children:t})};return r&&(n.route.ErrorBoundary||n.route.errorElement||c===0)?_.createElement(ot,{location:r.location,revalidation:r.revalidation,component:f,error:u,children:h(),routeContext:{outlet:null,matches:m,isDataRoute:!0},onError:l}):h()},null)}function dt(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function ft(e){let t=_.useContext(Me);return T(t,dt(e)),t}function pt(e){let t=_.useContext(Ne);return T(t,dt(e)),t}function mt(e){let t=_.useContext(Ve);return T(t,dt(e)),t}function ht(e){let t=mt(e),n=t.matches[t.matches.length-1];return T(n.route.id,`${e} can only be used on routes that contain a unique "id"`),n.route.id}function gt(){return ht(`useRouteId`)}function _t(){let e=pt(`useNavigation`);return _.useMemo(()=>{let{matches:t,historyAction:n,...r}=e.navigation;return r},[e.navigation])}function vt(){let{matches:e,loaderData:t}=pt(`useMatches`);return _.useMemo(()=>e.map(e=>P(e,t)),[e,t])}function yt(){let e=_.useContext(He),t=pt(`useRouteError`),n=ht(`useRouteError`);return e===void 0?t.errors?.[n]:e}function bt(){let{router:e}=ft(`useNavigate`),t=ht(`useNavigate`),n=_.useRef(!1);return Qe(()=>{n.current=!0}),_.useCallback(async(r,i={})=>{E(n.current,Ze),n.current&&(typeof r==`number`?await e.navigate(r):await e.navigate(r,{fromRouteId:t,...i}))},[e,t])}var xt={};function St(e,t,n){!t&&!xt[e]&&(xt[e]=!0,E(!1,n))}_.memo(Ct);function Ct({routes:e,manifest:t,future:n,state:r,isStatic:i,onError:a}){return rt(e,void 0,{manifest:t,state:r,isStatic:i,onError:a,future:n})}function wt(e){T(!1,`A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.`)}function Tt({basename:e=`/`,children:t=null,location:n,navigationType:r=`POP`,navigator:i,static:a=!1,useTransitions:o}){T(!Ye(),`You cannot render a <Router> inside another <Router>. You should never have more than one in your app.`);let s=e.replace(/^\/*/,`/`),c=_.useMemo(()=>({basename:s,navigator:i,static:a,useTransitions:o,future:{}}),[s,i,a,o]);typeof n==`string`&&(n=j(n));let{pathname:l=`/`,search:u=``,hash:d=``,state:f=null,key:p=`default`,mask:m}=n,h=_.useMemo(()=>{let e=fe(l,s);return e==null?null:{location:{pathname:e,search:u,hash:d,state:f,key:p,mask:m},navigationType:r}},[s,l,u,d,f,p,r,m]);return E(h!=null,`<Router basename="${s}"> is not able to match the URL "${l}${u}${d}" because it does not start with the basename, so the <Router> won't render anything.`),h==null?null:_.createElement(ze.Provider,{value:c},_.createElement(Be.Provider,{children:t,value:h}))}function Et({children:e,location:t}){return nt(Dt(e),t)}_.Component;function Dt(e,t=[]){let n=[];return _.Children.forEach(e,(e,r)=>{if(!_.isValidElement(e))return;let i=[...t,r];if(e.type===_.Fragment){n.push.apply(n,Dt(e.props.children,i));return}T(e.type===wt,`[${typeof e.type==`string`?e.type:e.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),T(!e.props.index||!e.props.children,`An index route cannot have child routes.`);let a={id:e.props.id||i.join(`-`),caseSensitive:e.props.caseSensitive,element:e.props.element,Component:e.props.Component,index:e.props.index,path:e.props.path,middleware:e.props.middleware,loader:e.props.loader,action:e.props.action,hydrateFallbackElement:e.props.hydrateFallbackElement,HydrateFallback:e.props.HydrateFallback,errorElement:e.props.errorElement,ErrorBoundary:e.props.ErrorBoundary,hasErrorBoundary:e.props.hasErrorBoundary===!0||e.props.ErrorBoundary!=null||e.props.errorElement!=null,shouldRevalidate:e.props.shouldRevalidate,handle:e.props.handle,lazy:e.props.lazy};e.props.children&&(a.children=Dt(e.props.children,i)),n.push(a)}),n}var Ot=`get`,kt=`application/x-www-form-urlencoded`;function At(e){return typeof HTMLElement<`u`&&e instanceof HTMLElement}function jt(e){return At(e)&&e.tagName.toLowerCase()===`button`}function Mt(e){return At(e)&&e.tagName.toLowerCase()===`form`}function Nt(e){return At(e)&&e.tagName.toLowerCase()===`input`}function Pt(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function Ft(e,t){return e.button===0&&(!t||t===`_self`)&&!Pt(e)}var It=null;function Lt(){if(It===null)try{new FormData(document.createElement(`form`),0),It=!1}catch{It=!0}return It}var Rt=new Set([`application/x-www-form-urlencoded`,`multipart/form-data`,`text/plain`]);function zt(e){return e!=null&&!Rt.has(e)?(E(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${kt}"`),null):e}function Bt(e,t){let n,r,i,a,o;if(Mt(e)){let o=e.getAttribute(`action`);r=o?fe(o,t):null,n=e.getAttribute(`method`)||Ot,i=zt(e.getAttribute(`enctype`))||kt,a=new FormData(e)}else if(jt(e)||Nt(e)&&(e.type===`submit`||e.type===`image`)){let o=e.form;if(o==null)throw Error(`Cannot submit a <button> or <input type="submit"> without a <form>`);let s=e.getAttribute(`formaction`)||o.getAttribute(`action`);if(r=s?fe(s,t):null,n=e.getAttribute(`formmethod`)||o.getAttribute(`method`)||Ot,i=zt(e.getAttribute(`formenctype`))||zt(o.getAttribute(`enctype`))||kt,a=new FormData(o,e),!Lt()){let{name:t,type:n,value:r}=e;if(n===`image`){let e=t?`${t}.`:``;a.append(`${e}x`,`0`),a.append(`${e}y`,`0`)}else t&&a.append(t,r)}}else if(At(e))throw Error(`Cannot submit element that is not <form>, <button>, or <input type="submit|image">`);else n=Ot,r=null,i=kt,o=e;return a&&i===`text/plain`&&(o=a,a=void 0),{action:r,method:n.toLowerCase(),encType:i,formData:a,body:o}}Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);var Vt={"&":`\\u0026`,">":`\\u003e`,"<":`\\u003c`,"\u2028":`\\u2028`,"\u2029":`\\u2029`},Ht=/[&><\u2028\u2029]/g;function Ut(e){return e.replace(Ht,e=>Vt[e])}function Wt(e,t){if(e===!1||e==null)throw Error(t)}function Gt(e,t,n,r){let i=typeof e==`string`?new URL(e,typeof window>`u`?`server://singlefetch/`:window.location.origin):e;return n?i.pathname.endsWith(`/`)?i.pathname=`${i.pathname}_.${r}`:i.pathname=`${i.pathname}.${r}`:i.pathname===`/`?i.pathname=`_root.${r}`:t&&fe(i.pathname,t)===`/`?i.pathname=`${xe(t)}/_root.${r}`:i.pathname=`${xe(i.pathname)}.${r}`,i}async function Kt(e,t){if(e.id in t)return t[e.id];try{let n=await S(()=>import(e.module),[]);return t[e.id]=n,n}catch(t){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(t),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function qt(e){return e!=null&&typeof e.page==`string`}function Jt(e){return e==null?!1:e.href==null?e.rel===`preload`&&typeof e.imageSrcSet==`string`&&typeof e.imageSizes==`string`:typeof e.rel==`string`&&typeof e.href==`string`}async function Yt(e,t,n){return en((await Promise.all(e.map(async e=>{let r=t.routes[e.route.id];if(r){let e=await Kt(r,n);return e.links?e.links():[]}return[]}))).flat(1).filter(Jt).filter(e=>e.rel===`stylesheet`||e.rel===`preload`).map(e=>e.rel===`stylesheet`?{...e,rel:`prefetch`,as:`style`}:{...e,rel:`prefetch`}))}function Xt(e,t,n,r,i,a){let o=(e,t)=>n[t]?e.route.id!==n[t].route.id:!0,s=(e,t)=>n[t].pathname!==e.pathname||n[t].route.path?.endsWith(`*`)&&n[t].params[`*`]!==e.params[`*`];return a===`assets`?t.filter((e,t)=>o(e,t)||s(e,t)):a===`data`?t.filter((t,a)=>{let c=r.routes[t.route.id];if(!c||!c.hasLoader)return!1;if(o(t,a)||s(t,a))return!0;if(t.route.shouldRevalidate){let r=t.route.shouldRevalidate({currentUrl:new URL(i.pathname+i.search+i.hash,window.origin),currentParams:n[0]?.params||{},nextUrl:new URL(e,window.origin),nextParams:t.params,defaultShouldRevalidate:!0});if(typeof r==`boolean`)return r}return!0}):[]}function Zt(e,t,{includeHydrateFallback:n}={}){return Qt(e.map(e=>{let r=t.routes[e.route.id];if(!r)return[];let i=[r.module];return r.clientActionModule&&(i=i.concat(r.clientActionModule)),r.clientLoaderModule&&(i=i.concat(r.clientLoaderModule)),n&&r.hydrateFallbackModule&&(i=i.concat(r.hydrateFallbackModule)),r.imports&&(i=i.concat(r.imports)),i}).flat(1))}function Qt(e){return[...new Set(e)]}function $t(e){let t={},n=Object.keys(e).sort();for(let r of n)t[r]=e[r];return t}function en(e,t){let n=new Set,r=new Set(t);return e.reduce((e,i)=>{if(t&&!qt(i)&&i.as===`script`&&i.href&&r.has(i.href))return e;let a=JSON.stringify($t(i));return n.has(a)||(n.add(a),e.push({key:a,link:i})),e},[])}function tn(){let e=_.useContext(Me);return Wt(e,`You must render this element inside a <DataRouterContext.Provider> element`),e}function nn(){let e=_.useContext(Ne);return Wt(e,`You must render this element inside a <DataRouterStateContext.Provider> element`),e}var rn=_.createContext(void 0);rn.displayName=`FrameworkContext`;function an(){let e=_.useContext(rn);return Wt(e,`You must render this element inside a <HydratedRouter> element`),e}function on(e,t){let n=_.useContext(rn),[r,i]=_.useState(!1),[a,o]=_.useState(!1),{onFocus:s,onBlur:c,onMouseEnter:l,onMouseLeave:u,onTouchStart:d}=t,f=_.useRef(null);_.useEffect(()=>{if(e===`render`&&o(!0),e===`viewport`){let e=new IntersectionObserver(e=>{e.forEach(e=>{o(e.isIntersecting)})},{threshold:.5});return f.current&&e.observe(f.current),()=>{e.disconnect()}}},[e]),_.useEffect(()=>{if(r){let e=setTimeout(()=>{o(!0)},100);return()=>{clearTimeout(e)}}},[r]);let p=()=>{i(!0)},m=()=>{i(!1),o(!1)};return n?e===`intent`?[a,f,{onFocus:sn(s,p),onBlur:sn(c,m),onMouseEnter:sn(l,p),onMouseLeave:sn(u,m),onTouchStart:sn(d,p)}]:[a,f,{}]:[!1,f,{}]}function sn(e,t){return n=>{e&&e(n),n.defaultPrevented||t(n)}}function cn({page:e,...t}){let n=Fe(),{router:r}=tn(),i=_.useMemo(()=>ne(r.routes,e,r.basename),[r.routes,e,r.basename]);return i?n?_.createElement(un,{page:e,matches:i,...t}):_.createElement(dn,{page:e,matches:i,...t}):null}function ln(e){let{manifest:t,routeModules:n}=an(),[r,i]=_.useState([]);return _.useEffect(()=>{let r=!1;return Yt(e,t,n).then(e=>{r||i(e)}),()=>{r=!0}},[e,t,n]),r}function un({page:e,matches:t,...n}){let r=Xe(),{future:i}=an(),{basename:a}=tn(),o=_.useMemo(()=>{if(e===r.pathname+r.search+r.hash)return[];let n=Gt(e,a,i.v8_trailingSlashAwareDataRequests,`rsc`),o=!1,s=[];for(let e of t)typeof e.route.shouldRevalidate==`function`?o=!0:s.push(e.route.id);return o&&s.length>0&&n.searchParams.set(`_routes`,s.join(`,`)),[n.pathname+n.search]},[a,i.v8_trailingSlashAwareDataRequests,e,r,t]);return _.createElement(_.Fragment,null,o.map(e=>_.createElement(`link`,{key:e,rel:`prefetch`,as:`fetch`,href:e,...n})))}function dn({page:e,matches:t,...n}){let r=Xe(),{future:i,manifest:a,routeModules:o}=an(),{basename:s}=tn(),{loaderData:c,matches:l}=nn(),u=_.useMemo(()=>Xt(e,t,l,a,r,`data`),[e,t,l,a,r]),d=_.useMemo(()=>Xt(e,t,l,a,r,`assets`),[e,t,l,a,r]),f=_.useMemo(()=>{if(e===r.pathname+r.search+r.hash)return[];let n=new Set,l=!1;if(t.forEach(e=>{let t=a.routes[e.route.id];!t||!t.hasLoader||(!u.some(t=>t.route.id===e.route.id)&&e.route.id in c&&o[e.route.id]?.shouldRevalidate||t.hasClientLoader?l=!0:n.add(e.route.id))}),n.size===0)return[];let d=Gt(e,s,i.v8_trailingSlashAwareDataRequests,`data`);return l&&n.size>0&&d.searchParams.set(`_routes`,t.filter(e=>n.has(e.route.id)).map(e=>e.route.id).join(`,`)),[d.pathname+d.search]},[s,i.v8_trailingSlashAwareDataRequests,c,r,a,u,t,e,o]),p=_.useMemo(()=>Zt(d,a),[d,a]),m=ln(d);return _.createElement(_.Fragment,null,f.map(e=>_.createElement(`link`,{key:e,rel:`prefetch`,as:`fetch`,href:e,...n})),p.map(e=>_.createElement(`link`,{key:e,rel:`modulepreload`,href:e,...n})),m.map(({key:e,link:t})=>_.createElement(`link`,{key:e,nonce:n.nonce,...t,crossOrigin:t.crossOrigin??n.crossOrigin})))}function fn(...e){return t=>{e.forEach(e=>{typeof e==`function`?e(t):e!=null&&(e.current=t)})}}_.Component;var pn=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0;try{pn&&(window.__reactRouterVersion=`7.17.0`)}catch{}function mn({basename:e,children:t,useTransitions:n,window:r}){let i=_.useRef();i.current??=ee({window:r,v5Compat:!0});let a=i.current,[o,s]=_.useState({action:a.action,location:a.location}),c=_.useCallback(e=>{n===!1?s(e):_.startTransition(()=>s(e))},[n]);return _.useLayoutEffect(()=>a.listen(c),[a,c]),_.createElement(Tt,{basename:e,children:t,location:o.location,navigationType:o.action,navigator:a,useTransitions:n})}function hn({basename:e,children:t,history:n,useTransitions:r}){let[i,a]=_.useState({action:n.action,location:n.location}),o=_.useCallback(e=>{r===!1?a(e):_.startTransition(()=>a(e))},[r]);return _.useLayoutEffect(()=>n.listen(o),[n,o]),_.createElement(Tt,{basename:e,children:t,location:i.location,navigationType:i.action,navigator:n,useTransitions:r})}hn.displayName=`unstable_HistoryRouter`;var gn=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,_n=_.forwardRef(function({onClick:e,discover:t=`render`,prefetch:n=`none`,relative:r,reloadDocument:i,replace:a,mask:o,state:s,target:c,to:l,preventScrollReset:u,viewTransition:d,defaultShouldRevalidate:f,...p},m){let{basename:h,navigator:g,useTransitions:v}=_.useContext(ze),y=typeof l==`string`&&gn.test(l),b=ke(l,h);l=b.to;let x=Je(l,{relative:r}),S=Xe(),C=null;if(o){let e=ye(o,[],S.mask?S.mask.pathname:`/`,!0);h!==`/`&&(e.pathname=e.pathname===`/`?h:U([h,e.pathname])),C=g.createHref(e)}let[w,ee,T]=on(n,p),E=wn(l,{replace:a,mask:o,state:s,target:c,preventScrollReset:u,relative:r,viewTransition:d,defaultShouldRevalidate:f,useTransitions:v});function D(t){e&&e(t),t.defaultPrevented||E(t)}let O=!(b.isExternal||i),k=_.createElement(`a`,{...p,...T,href:(O?C:void 0)||b.absoluteURL||x,onClick:O?D:e,ref:fn(m,ee),target:c,"data-discover":!y&&t===`render`?`true`:void 0});return w&&!y?_.createElement(_.Fragment,null,k,_.createElement(cn,{page:x})):k});_n.displayName=`Link`;var vn=_.forwardRef(function({"aria-current":e=`page`,caseSensitive:t=!1,className:n=``,end:r=!1,style:i,to:a,viewTransition:o,children:s,...c},l){let u=tt(a,{relative:c.relative}),d=Xe(),f=_.useContext(Ne),{navigator:p,basename:m}=_.useContext(ze),h=f!=null&&Pn(u)&&o===!0,g=p.encodeLocation?p.encodeLocation(u).pathname:u.pathname,v=d.pathname,y=f&&f.navigation&&f.navigation.location?f.navigation.location.pathname:null;t||(v=v.toLowerCase(),y=y?y.toLowerCase():null,g=g.toLowerCase()),y&&m&&(y=fe(y,m)||y);let b=g!==`/`&&g.endsWith(`/`)?g.length-1:g.length,x=v===g||!r&&v.startsWith(g)&&v.charAt(b)===`/`,S=y!=null&&(y===g||!r&&y.startsWith(g)&&y.charAt(g.length)===`/`),C={isActive:x,isPending:S,isTransitioning:h},w=x?e:void 0,ee;ee=typeof n==`function`?n(C):[n,x?`active`:null,S?`pending`:null,h?`transitioning`:null].filter(Boolean).join(` `);let T=typeof i==`function`?i(C):i;return _.createElement(_n,{...c,"aria-current":w,className:ee,ref:l,style:T,to:a,viewTransition:o},typeof s==`function`?s(C):s)});vn.displayName=`NavLink`;var yn=_.forwardRef(({discover:e=`render`,fetcherKey:t,navigate:n,reloadDocument:r,replace:i,state:a,method:o=Ot,action:s,onSubmit:c,relative:l,preventScrollReset:u,viewTransition:d,defaultShouldRevalidate:f,...p},m)=>{let{useTransitions:h}=_.useContext(ze),g=Dn(),v=On(s,{relative:l}),y=o.toLowerCase()===`get`?`get`:`post`,b=typeof s==`string`&&gn.test(s);return _.createElement(`form`,{ref:m,method:y,action:v,onSubmit:r?c:e=>{if(c&&c(e),e.defaultPrevented)return;e.preventDefault();let r=e.nativeEvent.submitter,s=r?.getAttribute(`formmethod`)||o,p=()=>g(r||e.currentTarget,{fetcherKey:t,method:s,navigate:n,replace:i,state:a,relative:l,preventScrollReset:u,viewTransition:d,defaultShouldRevalidate:f});h&&n!==!1?_.startTransition(()=>p()):p()},...p,"data-discover":!b&&e===`render`?`true`:void 0})});yn.displayName=`Form`;function bn({getKey:e,storageKey:t,...n}){let r=_.useContext(rn),{basename:i}=_.useContext(ze),a=Xe(),o=vt();Mn({getKey:e,storageKey:t});let s=_.useMemo(()=>{if(!r||!e)return null;let t=jn(a,o,i,e);return t===a.key?null:t},[]);if(!r||r.isSpaMode)return null;let c=((e,t)=>{if(!window.history.state||!window.history.state.key){let e=Math.random().toString(32).slice(2);window.history.replaceState({key:e},``)}try{let n=JSON.parse(sessionStorage.getItem(e)||`{}`)[t||window.history.state.key];typeof n==`number`&&window.scrollTo(0,n)}catch(t){console.error(t),sessionStorage.removeItem(e)}}).toString();return _.createElement(`script`,{...n,suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${c})(${Ut(JSON.stringify(t||kn))}, ${Ut(JSON.stringify(s))})`}})}bn.displayName=`ScrollRestoration`;function xn(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Sn(e){let t=_.useContext(Me);return T(t,xn(e)),t}function Cn(e){let t=_.useContext(Ne);return T(t,xn(e)),t}function wn(e,{target:t,replace:n,mask:r,state:i,preventScrollReset:a,relative:o,viewTransition:s,defaultShouldRevalidate:c,useTransitions:l}={}){let u=$e(),d=Xe(),f=tt(e,{relative:o});return _.useCallback(p=>{if(Ft(p,t)){p.preventDefault();let t=n===void 0?A(d)===A(f):n,m=()=>u(e,{replace:t,mask:r,state:i,preventScrollReset:a,relative:o,viewTransition:s,defaultShouldRevalidate:c});l?_.startTransition(()=>m()):m()}},[d,u,f,n,r,i,t,e,a,o,s,c,l])}var Tn=0,En=()=>`__${String(++Tn)}__`;function Dn(){let{router:e}=Sn(`useSubmit`),{basename:t}=_.useContext(ze),n=gt(),r=e.fetch,i=e.navigate;return _.useCallback(async(e,a={})=>{let{action:o,method:s,encType:c,formData:l,body:u}=Bt(e,t);a.navigate===!1?await r(a.fetcherKey||En(),n,a.action||o,{defaultShouldRevalidate:a.defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:l,body:u,formMethod:a.method||s,formEncType:a.encType||c,flushSync:a.flushSync}):await i(a.action||o,{defaultShouldRevalidate:a.defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:l,body:u,formMethod:a.method||s,formEncType:a.encType||c,replace:a.replace,state:a.state,fromRouteId:n,flushSync:a.flushSync,viewTransition:a.viewTransition})},[r,i,t,n])}function On(e,{relative:t}={}){let{basename:n}=_.useContext(ze),r=_.useContext(Ve);T(r,`useFormAction must be used inside a RouteContext`);let[i]=r.matches.slice(-1),a={...tt(e||`.`,{relative:t})},o=Xe();if(e==null){a.search=o.search;let e=new URLSearchParams(a.search),t=e.getAll(`index`);if(t.some(e=>e===``)){e.delete(`index`),t.filter(e=>e).forEach(t=>e.append(`index`,t));let n=e.toString();a.search=n?`?${n}`:``}}return(!e||e===`.`)&&i.route.index&&(a.search=a.search?a.search.replace(/^\?/,`?index&`):`?index`),n!==`/`&&(a.pathname=a.pathname===`/`?n:U([n,a.pathname])),A(a)}var kn=`react-router-scroll-positions`,An={};function jn(e,t,n,r){let i=null;return r&&(i=r(n===`/`?e:{...e,pathname:fe(e.pathname,n)||e.pathname},t)),i??=e.key,i}function Mn({getKey:e,storageKey:t}={}){let{router:n}=Sn(`useScrollRestoration`),{restoreScrollPosition:r,preventScrollReset:i}=Cn(`useScrollRestoration`),{basename:a}=_.useContext(ze),o=Xe(),s=vt(),c=_t();_.useEffect(()=>(window.history.scrollRestoration=`manual`,()=>{window.history.scrollRestoration=`auto`}),[]),Nn(_.useCallback(()=>{if(c.state===`idle`){let t=jn(o,s,a,e);An[t]=window.scrollY}try{sessionStorage.setItem(t||kn,JSON.stringify(An))}catch(e){E(!1,`Failed to save scroll positions in sessionStorage, <ScrollRestoration /> will not work properly (${e}).`)}window.history.scrollRestoration=`auto`},[c.state,e,a,o,s,t])),typeof document<`u`&&(_.useLayoutEffect(()=>{try{let e=sessionStorage.getItem(t||kn);e&&(An=JSON.parse(e))}catch{}},[t]),_.useLayoutEffect(()=>{let t=n?.enableScrollRestoration(An,()=>window.scrollY,e?(t,n)=>jn(t,n,a,e):void 0);return()=>t&&t()},[n,a,e]),_.useLayoutEffect(()=>{if(r!==!1){if(typeof r==`number`){window.scrollTo(0,r);return}try{if(o.hash){let e=document.getElementById(decodeURIComponent(o.hash.slice(1)));if(e){e.scrollIntoView();return}}}catch{E(!1,`"${o.hash.slice(1)}" is not a decodable element ID. The view will not scroll to it.`)}i!==!0&&window.scrollTo(0,0)}},[o,r,i]))}function Nn(e,t){let{capture:n}=t||{};_.useEffect(()=>{let t=n==null?void 0:{capture:n};return window.addEventListener(`pagehide`,e,t),()=>{window.removeEventListener(`pagehide`,e,t)}},[e,n])}function Pn(e,{relative:t}={}){let n=_.useContext(Ie);T(n!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:r}=Sn(`useViewTransitionState`),i=tt(e,{relative:t});if(!n.isTransitioning)return!1;let a=fe(n.currentLocation.pathname,r)||n.currentLocation.pathname,o=fe(n.nextLocation.pathname,r)||n.nextLocation.pathname;return le(i.pathname,o)!=null||le(i.pathname,a)!=null}var Fn=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.fragment`);function r(e,n,r){var i=null;if(r!==void 0&&(i=``+r),n.key!==void 0&&(i=``+n.key),`key`in n)for(var a in r={},n)a!==`key`&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:i,ref:n===void 0?null:n,props:r}}e.Fragment=n,e.jsx=r,e.jsxs=r})),W=o(((e,t)=>{t.exports=Fn()}))(),In=(0,_.createContext)({theme:`dark`,toggle:()=>{}});function Ln({children:e}){let[t,n]=(0,_.useState)(()=>localStorage.getItem(`grimoire-theme`)===`light`?`light`:`dark`);return(0,_.useEffect)(()=>{document.documentElement.setAttribute(`data-theme`,t),localStorage.setItem(`grimoire-theme`,t)},[t]),(0,W.jsx)(In.Provider,{value:{theme:t,toggle:()=>n(e=>e===`dark`?`light`:`dark`)},children:e})}var Rn=()=>(0,_.useContext)(In),zn=(0,_.createContext)(null),Bn=0;function Vn({children:e}){let[t,n]=(0,_.useState)([]),[r,i]=(0,_.useState)([]),a=(0,_.useCallback)((e,t={})=>{let r={id:`n-${++Bn}-${Date.now()}`,type:t.type??`info`,title:e,message:t.message,timestamp:Date.now(),read:!1};n(e=>[r,...e].slice(0,50)),i(e=>[r,...e]),setTimeout(()=>{i(e=>e.filter(e=>e.id!==r.id))},5e3),t.browser!==!1&&document.hidden&&`Notification`in window&&(Notification.permission===`granted`?new Notification(e,{body:t.message,icon:`/favicon.ico`}):Notification.permission==="default"&&Notification.requestPermission())},[]),o=(0,_.useCallback)(()=>{n(e=>e.map(e=>({...e,read:!0})))},[]),s=(0,_.useCallback)(e=>{n(t=>t.filter(t=>t.id!==e)),i(t=>t.filter(t=>t.id!==e))},[]),c=(0,_.useCallback)(()=>{n([]),i([])},[]),l=t.filter(e=>!e.read).length;return(0,W.jsxs)(zn.Provider,{value:{notifications:t,unreadCount:l,notify:a,markAllRead:o,dismiss:s,clearAll:c},children:[e,(0,W.jsx)(`div`,{className:`toast-container`,children:r.map(e=>(0,W.jsxs)(`div`,{className:`toast toast-${e.type}`,children:[(0,W.jsxs)(`div`,{className:`toast-icon`,children:[e.type===`success`&&`✓`,e.type===`error`&&`✕`,e.type===`warning`&&`⚠`,e.type===`info`&&`ℹ`]}),(0,W.jsxs)(`div`,{className:`toast-body`,children:[(0,W.jsx)(`div`,{className:`toast-title`,children:e.title}),e.message&&(0,W.jsx)(`div`,{className:`toast-msg`,children:e.message})]}),(0,W.jsx)(`button`,{className:`toast-close`,onClick:()=>s(e.id),children:`✕`})]},e.id))})]})}var Hn=()=>(0,_.useContext)(zn);function Un({open:e,onClose:t}){let{theme:n,toggle:r}=Rn(),{notify:i}=Hn();return e?(0,W.jsx)(`div`,{className:`modal-overlay`,onClick:t,children:(0,W.jsxs)(`div`,{className:`modal`,onClick:e=>e.stopPropagation(),children:[(0,W.jsxs)(`div`,{className:`modal-header`,children:[(0,W.jsx)(`h2`,{children:`Settings`}),(0,W.jsx)(`button`,{className:`modal-close`,onClick:t,children:`✕`})]}),(0,W.jsxs)(`div`,{className:`modal-body`,children:[(0,W.jsxs)(`div`,{className:`setting-group`,children:[(0,W.jsx)(`h3`,{children:`Appearance`}),(0,W.jsxs)(`div`,{className:`setting-row`,children:[(0,W.jsxs)(`div`,{className:`setting-info`,children:[(0,W.jsx)(`div`,{className:`setting-label`,children:`Theme`}),(0,W.jsx)(`div`,{className:`setting-desc`,children:`Switch between dark and light mode`})]}),(0,W.jsx)(`button`,{className:`theme-toggle ${n}`,onClick:r,"aria-label":`Toggle theme`,children:(0,W.jsxs)(`span`,{className:`theme-toggle-track`,children:[(0,W.jsx)(`span`,{className:`theme-toggle-icon`,children:n===`dark`?`🌙`:`☀️`}),(0,W.jsx)(`span`,{className:`theme-toggle-thumb`})]})})]})]}),(0,W.jsxs)(`div`,{className:`setting-group`,children:[(0,W.jsx)(`h3`,{children:`Notifications`}),(0,W.jsxs)(`div`,{className:`setting-row`,children:[(0,W.jsxs)(`div`,{className:`setting-info`,children:[(0,W.jsx)(`div`,{className:`setting-label`,children:`Browser Notifications`}),(0,W.jsx)(`div`,{className:`setting-desc`,children:`Receive alerts even when the app is in the background`})]}),(0,W.jsx)(`button`,{className:`btn btn-secondary btn-sm`,onClick:()=>{`Notification`in window&&Notification.requestPermission().then(e=>{i(e===`granted`?`Notifications enabled!`:`Notifications blocked`,{type:e===`granted`?`success`:`warning`})})},children:typeof Notification<`u`&&Notification.permission===`granted`?`Enabled`:`Enable`})]}),(0,W.jsxs)(`div`,{className:`setting-row`,children:[(0,W.jsxs)(`div`,{className:`setting-info`,children:[(0,W.jsx)(`div`,{className:`setting-label`,children:`Test Notification`}),(0,W.jsx)(`div`,{className:`setting-desc`,children:`Send a test toast to verify notifications work`})]}),(0,W.jsx)(`button`,{className:`btn btn-secondary btn-sm`,onClick:()=>i(`Test notification`,{type:`success`,message:`Notifications are working!`,browser:!0}),children:`Test`})]})]}),(0,W.jsxs)(`div`,{className:`setting-group`,children:[(0,W.jsx)(`h3`,{children:`About`}),(0,W.jsx)(`div`,{className:`setting-row`,children:(0,W.jsxs)(`div`,{className:`setting-info`,children:[(0,W.jsx)(`div`,{className:`setting-label`,children:`GRIMOIRE`}),(0,W.jsx)(`div`,{className:`setting-desc`,children:`Unified Product Data Toolkit — v1.0.0`})]})})]})]})]})}):null}function Wn(e){if(/^https?:\/\//i.test(e)||!e.startsWith(`/api`)&&!e.startsWith(`/health`))return e;let t=window.__GRIMOIRE_API_BASE__?.replace(/\/$/,``);if(t)return`${t}${e}`;let{hostname:n,port:r,protocol:i}=window.location,a=new Set([`5173`,`7788`]);return i.startsWith(`http`)&&(n===`127.0.0.1`||n===`localhost`)&&a.has(r)?e:`http://127.0.0.1:7788${e}`}function Gn(e){return new Promise(t=>window.setTimeout(t,e))}async function G(e,t){let n;try{n=await fetch(Wn(e),t)}catch(r){await Gn(1200);try{n=await fetch(Wn(e),t)}catch{throw r}}if(!n.ok){let e=n.statusText;try{let t=await n.json();e=typeof t.detail==`string`?t.detail:JSON.stringify(t.detail??t)}catch{e=await n.text().catch(()=>n.statusText)}throw Error(e)}return n.json()}async function Kn(e,t){return window.__grimoire?.pickFolder?await window.__grimoire.pickFolder(e)||``:(await G(`/api/local/select-folder`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({title:e,initial_path:t})})).path||``}function qn(e){if(!e)return`Idle`;let t=Number(e.summary?.progress_percent??0);return e.status===`running`&&t?`Running ${t}%`:e.status}function Jn(e,t){let[n,r]=(0,_.useState)(e);return(0,_.useEffect)(()=>r(e),[e]),(0,_.useEffect)(()=>{if(!n||![`pending`,`running`].includes(n.status))return;let e=!1,i=window.setInterval(async()=>{try{let a=await G(`/api/jobs/${n.id}`);if(e)return;r(a),[`completed`,`failed`].includes(a.status)&&(window.clearInterval(i),t?.(a))}catch{window.clearInterval(i)}},1200);return()=>{e=!0,window.clearInterval(i)}},[n?.id,n?.status]),n}var Yn={Critical:0,High:1,Medium:2,Low:3},Xn={Critical:`solid-crit`,High:`solid-high`,Medium:`solid-med`,Low:`solid-low`},Zn={"To Do":`out-open`,"In Progress":`out-prog`,Done:`out-res`,Completed:`out-closed`},Qn=[`Overview`,`Summary Tracker`,`Action Tracker`,`Brand Scorecard`,`SKU Missing Detail`,`Validation Errors`,`Run Summary`],$n=[`ACTIVE`,`Upcoming`,`Limited`,`Non-Active`,`Discontinued`,`N/A`,`Unknown`,`Others`,`NON-ACR`],er=[`ACTIVE`,`Upcoming`,`Limited`,`N/A`,`Unknown`,`Others`,`NON-ACR`],tr=[`Critical`,`High`,`Medium`,`Low`],nr=new Set([`Total`,`# Missing`,`Active`,`Upcoming`,`Limited`,`Non-Active`,`Discontinued`,`Blanks`,`N/A`,`Unknown`,`Non-ACR`,`Others`,`Source Row`]);async function rr(e,t){let n=await fetch(Wn(e),t);if(!n.ok){let e=n.statusText;try{let t=await n.json();e=typeof t.detail==`string`?t.detail:JSON.stringify(t.detail??t)}catch{e=await n.text().catch(()=>n.statusText)}throw Error(e)}return n.json()}function ir(e){return e==null?``:String(e)}function ar(e,t,n=0){let r=Number(e?.[t]??n);return Number.isFinite(r)?r:n}function or(e,t,n=``){let r=e?.[t];return typeof r==`string`?r:n}function sr(e){return/missing required column|no dqc audit fields|master data header|upload the original master data/i.test(e)}function cr(e){return[`Description (250+ words)`,`EU Responsible person`,`UK Responsible person`].includes(e)?`Critical`:[`CPNP Number`,`UK SCPN NUMBER`,`Manufacturer name`,`Ingredient list`].includes(e)?`High`:[`BAR CODE`,`Net Weight (g)`,`Gross weight (g)`,`PAO (Months)`,`Shelf Life (Months)`,`SUPPLY PRICE`].includes(e)?`Medium`:`Low`}function lr(e,t){return t&&t[e===`Overview`?`Missing Data Overview`:e]||null}function ur(e,t){if(!t||!t.rows)return[];if(e!==`SKU Missing Detail`)return t.rows;let n=new Map;for(let e of t.rows){let t=[e.Brand||``,e.SKU||``,e[`Product Name`]||``,e.Status||``,e[`Source Row`]||``].join(`|`),r=n.get(t)||{Brand:e.Brand||``,SKU:e.SKU||``,"Product Name":e[`Product Name`]||``,Status:e.Status||``,"Missing Fields":[],Priority:e.Priority||cr(ir(e[`Missing Field`])),"Source Row":e[`Source Row`]||``};e[`Missing Field`]&&r[`Missing Fields`].push(ir(e[`Missing Field`])),Yn[e.Priority]<Yn[r.Priority]&&(r.Priority=e.Priority),n.set(t,r)}return Array.from(n.values()).map(e=>({...e,"Missing Fields":e[`Missing Fields`].join(`; `)}))}function dr(e,t){return!t||!t.headers?[]:e===`SKU Missing Detail`?[`Brand`,`SKU`,`Product Name`,`Status`,`Missing Fields`,`Priority`,`Source Row`]:t.headers.filter(e=>e&&!String(e).startsWith(`Column `))}var fr=[{section:`DATA_MAINTENANCE`},{id:`dqc`,label:`Data Quality Control`,icon:`shield`},{id:`master`,label:`Master Data`,icon:`db`},{id:`steward`,label:`Data Steward`,icon:`user`},{id:`rules`,label:`Rule Profiles`,icon:`list`},{id:`history`,label:`Audit History`,icon:`clock`},{id:`reports`,label:`Reports`,icon:`report`},{id:`config`,label:`Configuration`,icon:`gear`},{section:`IMAGE_EDIT`},{id:`imageedit`,label:`Image Edit`,icon:`image`}],pr={dqc:`Data Quality Control`,master:`Master Data`,steward:`Data Steward`,rules:`Rule Profiles`,history:`Audit History`,reports:`Reports`,config:`Configuration`};function mr(e){if(!e)return``;try{return new Date(e).toLocaleString()}catch{return e}}function hr(e){e&&window.open(Wn(`/api/jobs/${encodeURIComponent(e)}/download`),`_blank`)}function gr(e){let[t,n]=(0,_.useState)([]),[r,i]=(0,_.useState)(!1),[a,o]=(0,_.useState)(``),s=(0,_.useCallback)(async()=>{i(!0),o(``);try{let e=await rr(`/api/data-quality-control/history?limit=100`);n(Array.isArray(e)?e:[])}catch(t){let n=t instanceof Error?t.message:String(t);o(n),e(`Could not load audit history: ${n}`)}finally{i(!1)}},[e]);return(0,_.useEffect)(()=>{s()},[s]),(0,_.useEffect)(()=>(window.addEventListener(`aio:reports:refresh`,s),()=>window.removeEventListener(`aio:reports:refresh`,s)),[s]),{runs:t,loading:r,error:a,refresh:s}}function _r({label:e,value:t,sub:n,tone:r,filename:i}){return(0,W.jsxs)(`div`,{className:`aio-card aio-metric`,children:[(0,W.jsx)(`div`,{className:`aio-metric-label`,children:e}),(0,W.jsx)(`div`,{className:`aio-metric-value ${r||``} ${i?`filename`:``}`,title:typeof t==`string`?t:void 0,children:t}),(0,W.jsx)(`div`,{className:`aio-muted`,children:n})]})}function vr(){let{notify:e}=Hn(),[t,n]=(0,_.useState)({loaded:!1}),[r,i]=(0,_.useState)(``),[a,o]=(0,_.useState)(null),[s,c]=(0,_.useState)(!1),[l,u]=(0,_.useState)(!1),[d,f]=(0,_.useState)(!1),[p,m]=(0,_.useState)(!1),h=(0,_.useRef)(null),g=(0,_.useRef)(null),[v,y]=(0,_.useState)(``),[b,x]=(0,_.useState)(``);(0,_.useEffect)(()=>{rr(`/api/master-data/state`).then(e=>{n(e),e.selected_brand&&(i(e.selected_brand),rr(`/api/master-data/select-brand`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({brand:e.selected_brand})}).then(e=>o(e.product_count)).catch(()=>{})),e.dqc_file&&y(e.dqc_file),e.master_file&&x(e.master_file)}).catch(()=>{})},[]);async function S(){let t=h.current?.files?.[0],r=g.current?.files?.[0];if(!t||!r){e(`Please select both files`,{type:`warning`});return}c(!0);try{let a=new FormData;a.append(`dqc_file`,t),a.append(`master_file`,r);let s=await rr(`/api/master-data/upload`,{method:`POST`,body:a});n({loaded:!0,brands:s.brands,master_brands:s.master_brands,dqc_file:s.dqc_file,master_file:s.master_file,selected_brand:null}),y(s.dqc_file),x(s.master_file),i(``),o(null),e(`Files uploaded — ${s.brands.length} brands found in DQC report`,{type:`success`})}catch(t){e(`Upload failed`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{c(!1)}}async function C(t){if(i(t),!t){o(null);return}try{o((await rr(`/api/master-data/select-brand`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({brand:t})})).product_count)}catch(t){e(`Could not select brand`,{type:`error`,message:t instanceof Error?t.message:String(t)})}}async function w(){if(!r){e(`Select a brand first`,{type:`warning`});return}u(!0);try{let t=await fetch(Wn(`/api/master-data/generate`),{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({brand:r})});if(!t.ok)throw Error(await t.text());let n=await t.blob(),i=URL.createObjectURL(n),a=document.createElement(`a`);a.href=i,a.download=`${r}_Missing_Data.xlsx`,a.click(),URL.revokeObjectURL(i),e(`${r}_Missing_Data.xlsx downloaded`,{type:`success`}),m(!0)}catch(t){e(`Generation failed`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{u(!1)}}async function ee(){f(!0);try{let t=await fetch(Wn(`/api/master-data/generate-status`),{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({brand:r})});if(!t.ok)throw Error(await t.text());let n=await t.blob(),i=URL.createObjectURL(n),a=document.createElement(`a`);a.href=i,a.download=`${r}_Missing_Data_Status.xlsx`,a.click(),URL.revokeObjectURL(i),e(`${r}_Missing_Data_Status.xlsx downloaded`,{type:`success`})}catch(t){e(`Status file generation failed`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{f(!1),m(!1)}}let T=t.brands??[];return(0,W.jsxs)(`div`,{className:`aio-fade`,children:[(0,W.jsxs)(`div`,{className:`aio-stat-grid`,children:[(0,W.jsx)(_r,{label:`DQC Report`,value:v||`—`,sub:t.loaded?`uploaded`:`not uploaded`,filename:!0}),(0,W.jsx)(_r,{label:`Master Data`,value:b||`—`,sub:t.loaded?`uploaded`:`not uploaded`,filename:!0}),(0,W.jsx)(_r,{label:`Brands (DQC)`,value:T.length||`—`,sub:`from DQC report`}),(0,W.jsx)(_r,{label:`Products`,value:a??`—`,sub:r?`in ${r}`:`select a brand`,tone:a?`green`:void 0})]}),(0,W.jsxs)(`section`,{className:`aio-card aio-pad`,children:[(0,W.jsx)(`h3`,{children:`Upload Files`}),(0,W.jsx)(`p`,{className:`aio-muted`,children:`Upload the DQC report (downloaded from Data Quality Control tab) and the Master Data Excel file.`}),(0,W.jsxs)(`div`,{className:`aio-form-grid`,children:[(0,W.jsxs)(`label`,{children:[`DQC Report (.xlsx)`,(0,W.jsx)(`input`,{ref:h,type:`file`,accept:`.xlsx,.xls`,className:`aio-input`})]}),(0,W.jsxs)(`label`,{children:[`Master Data (.xlsx)`,(0,W.jsx)(`input`,{ref:g,type:`file`,accept:`.xlsx,.xls`,className:`aio-input`})]})]}),(0,W.jsx)(`div`,{className:`aio-actions-row`,style:{marginTop:12},children:(0,W.jsx)(`button`,{className:`btn btn-primary btn-sm`,onClick:S,disabled:s,children:s?`Uploading...`:`Upload & Read Files`})})]}),t.loaded&&(0,W.jsxs)(`section`,{className:`aio-card aio-pad`,children:[(0,W.jsx)(`h3`,{children:`Generate Missing Data`}),(0,W.jsx)(`div`,{className:`aio-form-grid`,children:(0,W.jsxs)(`label`,{children:[`Select Brand`,(0,W.jsxs)(`select`,{className:`aio-input`,value:r,onChange:e=>C(e.target.value),children:[(0,W.jsx)(`option`,{value:``,children:`— choose brand —`}),T.map(e=>(0,W.jsx)(`option`,{value:e,children:e},e))]})]})}),r&&a!==null&&(0,W.jsxs)(`p`,{className:`aio-muted`,style:{marginTop:8},children:[a,` products found for `,(0,W.jsx)(`strong`,{children:r})]}),(0,W.jsx)(`div`,{className:`aio-actions-row`,style:{marginTop:12},children:(0,W.jsx)(`button`,{className:`btn btn-primary btn-sm`,onClick:w,disabled:!r||l,children:l?`Generating...`:`Generate ${r||`Brand`}_Missing_Data.xlsx`})})]}),p&&(0,W.jsxs)(Tr,{title:`Generate Status File?`,onClose:()=>m(!1),children:[(0,W.jsxs)(`p`,{children:[`Would you also like to generate `,(0,W.jsxs)(`strong`,{children:[r,`_Missing_Data_Status.xlsx`]}),`?`]}),(0,W.jsxs)(`p`,{className:`aio-muted`,children:[`This file lists all `,a,` products with their status from the master data.`]}),(0,W.jsxs)(`div`,{className:`aio-modal-actions`,children:[(0,W.jsx)(`button`,{className:`btn btn-secondary`,onClick:()=>m(!1),children:`No, Skip`}),(0,W.jsx)(`button`,{className:`btn btn-primary`,disabled:d,onClick:ee,children:d?`Generating...`:`Yes, Generate`})]})]})]})}function yr(){return(0,W.jsxs)(`section`,{className:`aio-card aio-pad`,children:[(0,W.jsx)(`h3`,{children:`Action Ownership`}),(0,W.jsx)(`p`,{className:`aio-muted`,children:`Action Tracker rows are generated from the current DQC report. Ownership workflow is empty until real assignments are created.`}),(0,W.jsx)(`div`,{className:`aio-table-wrap`,children:(0,W.jsxs)(`table`,{className:`aio-table`,children:[(0,W.jsx)(`thead`,{children:(0,W.jsxs)(`tr`,{children:[(0,W.jsx)(`th`,{children:`Brand`}),(0,W.jsx)(`th`,{children:`Field`}),(0,W.jsx)(`th`,{children:`Priority`}),(0,W.jsx)(`th`,{children:`Status`}),(0,W.jsx)(`th`,{children:`Owner`})]})}),(0,W.jsx)(`tbody`,{children:(0,W.jsx)(`tr`,{children:(0,W.jsx)(`td`,{colSpan:5,className:`aio-empty`,children:`No stewardship assignments have been created yet.`})})})]})})]})}function br(){let{notify:e}=Hn(),[t,n]=(0,_.useState)(null),[r,i]=(0,_.useState)(``),[a,o]=(0,_.useState)(!1),[s,c]=(0,_.useState)(``),[l,u]=(0,_.useState)(``),[d,f]=(0,_.useState)(!1),p=(0,_.useCallback)(()=>{rr(`/api/data-quality-control/rule-profile`).then(n).catch(e=>i(e instanceof Error?e.message:String(e)))},[]);(0,_.useEffect)(()=>{p()},[p]);function m(){c((t?.included_statuses||[]).join(`
`)),u(JSON.stringify(t?.priority_fields||{},null,2)),o(!0)}(0,_.useEffect)(()=>(window.addEventListener(`aio:rules:edit`,m),()=>window.removeEventListener(`aio:rules:edit`,m)));async function h(){f(!0);try{n(await rr(`/api/data-quality-control/rule-profile`,{method:`PUT`,headers:{"Content-Type":`application/json`},body:JSON.stringify({included_statuses:s.split(/\r?\n|,/).map(e=>e.trim()).filter(Boolean),priority_fields:JSON.parse(l||`{}`)})})),o(!1),e(`Rule profile saved`,{type:`success`})}catch(t){e(`Could not save rule profile`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{f(!1)}}let g=Object.entries(t?.priority_fields||{});return(0,W.jsxs)(`div`,{className:`aio-rules-grid`,children:[(0,W.jsxs)(`section`,{className:`aio-card aio-pad`,children:[(0,W.jsx)(`h3`,{children:`Active Rule Profile`}),r&&(0,W.jsx)(`div`,{className:`aio-error`,children:r}),(0,W.jsx)(`p`,{className:`aio-muted`,children:`The backend rule profile controls included statuses and priority scoring for every new DQC run.`}),(0,W.jsx)(`h4`,{children:`Included Statuses`}),(0,W.jsxs)(`div`,{className:`aio-chip-row`,children:[(t?.included_statuses||[]).map(e=>(0,W.jsx)(`span`,{className:`aio-chip`,children:e||`Blank`},e||`Blank`)),!t&&(0,W.jsx)(`span`,{className:`aio-muted`,children:`Loading...`})]})]}),(0,W.jsxs)(`section`,{className:`aio-card`,children:[(0,W.jsxs)(`div`,{className:`aio-card-head`,children:[(0,W.jsx)(`strong`,{children:`Priority Fields`}),(0,W.jsx)(`button`,{className:`btn btn-secondary btn-sm`,onClick:m,children:`Edit`})]}),(0,W.jsxs)(`table`,{className:`aio-table`,children:[(0,W.jsx)(`thead`,{children:(0,W.jsxs)(`tr`,{children:[(0,W.jsx)(`th`,{children:`Priority`}),(0,W.jsx)(`th`,{children:`Fields`}),(0,W.jsx)(`th`,{children:`Count`})]})}),(0,W.jsxs)(`tbody`,{children:[g.map(([e,t])=>(0,W.jsxs)(`tr`,{children:[(0,W.jsx)(`td`,{children:(0,W.jsx)(`span`,{className:`aio-priority ${e.toLowerCase()}`,children:e})}),(0,W.jsx)(`td`,{children:t.join(`, `)}),(0,W.jsx)(`td`,{className:`num`,children:t.length})]},e)),!g.length&&(0,W.jsx)(`tr`,{children:(0,W.jsx)(`td`,{colSpan:3,className:`aio-empty`,children:`No rule profile loaded.`})})]})]})]}),a&&(0,W.jsxs)(Tr,{title:`Edit Rule Profile`,onClose:()=>o(!1),wide:!0,children:[(0,W.jsxs)(`label`,{className:`aio-block-label`,children:[`Included Statuses`,(0,W.jsx)(`textarea`,{className:`aio-input aio-textarea`,value:s,onChange:e=>c(e.target.value)})]}),(0,W.jsxs)(`label`,{className:`aio-block-label`,children:[`Priority Fields JSON`,(0,W.jsx)(`textarea`,{className:`aio-input aio-textarea code`,value:l,onChange:e=>u(e.target.value)})]}),(0,W.jsxs)(`div`,{className:`aio-modal-actions`,children:[(0,W.jsx)(`button`,{className:`btn btn-secondary`,onClick:()=>o(!1),children:`Cancel`}),(0,W.jsx)(`button`,{className:`btn btn-primary`,disabled:d,onClick:h,children:d?`Saving...`:`Save Rule Profile`})]})]})]})}function xr(){let{notify:e}=Hn(),{runs:t,loading:n,error:r,refresh:i}=gr((0,_.useCallback)(t=>e(t,{type:`error`}),[e])),a=t[0]||null,o=Number(a?.action_count||0)+Number(a?.validation_error_count||0);return(0,W.jsxs)(`div`,{className:`aio-fade`,children:[(0,W.jsxs)(`div`,{className:`aio-stat-grid`,children:[(0,W.jsx)(_r,{label:`Latest Brands`,value:a?a.brand_count??0:`-`,sub:`latest completed run`,tone:`green`}),(0,W.jsx)(_r,{label:`Included Rows`,value:a?a.included_rows??0:`-`,sub:`selected status rows`}),(0,W.jsx)(_r,{label:`Open Issues`,value:a?o:`-`,sub:`actions + validations`,tone:`red`}),(0,W.jsx)(_r,{label:`History`,value:t.length,sub:`stored audit runs`})]}),(0,W.jsxs)(`section`,{className:`aio-card aio-pad`,children:[(0,W.jsxs)(`div`,{className:`aio-card-title-row`,children:[(0,W.jsx)(`h3`,{children:`Audit Timeline`}),(0,W.jsxs)(`button`,{className:`btn btn-secondary btn-sm`,onClick:i,disabled:n,children:[(0,W.jsx)(zr,{name:`refresh`,size:15}),` Refresh`]})]}),r&&(0,W.jsx)(`div`,{className:`aio-error`,children:r}),(0,W.jsxs)(`div`,{className:`aio-timeline`,children:[t.map(e=>(0,W.jsxs)(`div`,{className:`aio-timeline-item`,children:[(0,W.jsx)(`span`,{className:`aio-dot`}),(0,W.jsxs)(`div`,{className:`aio-timeline-body`,children:[(0,W.jsx)(`div`,{className:`aio-muted`,children:mr(e.created_at)}),(0,W.jsx)(`strong`,{children:e.source_path?e.source_path.split(/[\\/]/).pop():`Data Quality Control Run`}),(0,W.jsxs)(`div`,{className:`aio-run-meta`,children:[(0,W.jsxs)(`span`,{children:[e.brand_count??0,` brands`]}),(0,W.jsxs)(`span`,{children:[e.included_rows??0,`/`,e.total_rows??0,` rows`]}),(0,W.jsxs)(`span`,{children:[e.action_count??0,` actions`]}),(0,W.jsxs)(`span`,{children:[e.validation_error_count??0,` validations`]}),(0,W.jsx)(`span`,{className:`aio-chip green`,children:`Completed`}),(0,W.jsxs)(`button`,{className:`btn btn-success btn-sm`,disabled:!e.job_id,onClick:()=>hr(e.job_id),children:[(0,W.jsx)(kr,{size:14}),` Report`]})]})]})]},e.id)),!t.length&&(0,W.jsx)(`div`,{className:`aio-empty`,children:n?`Loading audit history...`:`No audit history yet. Run DQC to create the first record.`})]})]})]})}function Sr(){let{notify:e}=Hn(),{runs:t,loading:n,error:r,refresh:i}=gr((0,_.useCallback)(t=>e(t,{type:`error`}),[e]));return(0,W.jsxs)(`section`,{className:`aio-card`,children:[(0,W.jsxs)(`div`,{className:`aio-card-head`,children:[(0,W.jsx)(`strong`,{children:`Generated Reports`}),(0,W.jsxs)(`button`,{className:`btn btn-secondary btn-sm`,onClick:i,disabled:n,children:[(0,W.jsx)(zr,{name:`refresh`,size:15}),` Refresh`]})]}),r&&(0,W.jsx)(`div`,{className:`aio-error in-card`,children:r}),(0,W.jsxs)(`table`,{className:`aio-table`,children:[(0,W.jsx)(`thead`,{children:(0,W.jsxs)(`tr`,{children:[(0,W.jsx)(`th`,{children:`File`}),(0,W.jsx)(`th`,{children:`Generated`}),(0,W.jsx)(`th`,{children:`Rows`}),(0,W.jsx)(`th`,{children:`Issues`}),(0,W.jsx)(`th`,{})]})}),(0,W.jsxs)(`tbody`,{children:[t.map(e=>{let t=e.output_path?e.output_path.split(/[\\/]/).pop():`report.xlsx`,n=Number(e.action_count||0)+Number(e.validation_error_count||0);return(0,W.jsxs)(`tr`,{children:[(0,W.jsx)(`td`,{children:(0,W.jsx)(`strong`,{children:t})}),(0,W.jsx)(`td`,{children:mr(e.created_at)}),(0,W.jsxs)(`td`,{className:`num`,children:[e.included_rows??0,`/`,e.total_rows??0]}),(0,W.jsx)(`td`,{className:`num`,children:n}),(0,W.jsx)(`td`,{children:(0,W.jsxs)(`button`,{className:`btn btn-success btn-sm`,disabled:!e.job_id,onClick:()=>hr(e.job_id),children:[(0,W.jsx)(kr,{size:14}),` Download`]})})]},e.id)}),!t.length&&(0,W.jsx)(`tr`,{children:(0,W.jsx)(`td`,{colSpan:5,className:`aio-empty`,children:n?`Loading reports...`:`No generated reports yet.`})})]})]})]})}function Cr(){let{notify:e}=Hn(),[t,n]=(0,_.useState)(`General`),[r,i]=(0,_.useState)({autoAudit:!1,email:!1,weekly:!1,lockDrafts:!1}),[a,o]=(0,_.useState)({crit:95,high:85,med:70}),[s,c]=(0,_.useState)(`Weekly`);(0,_.useEffect)(()=>{let t=()=>e(`Configuration saved locally`,{type:`success`});return window.addEventListener(`aio:config:save`,t),()=>window.removeEventListener(`aio:config:save`,t)},[e]);function l(e){i(t=>({...t,[e]:!t[e]}))}function u({stateKey:e}){return(0,W.jsx)(`button`,{className:`aio-switch${r[e]?` on`:``}`,onClick:()=>l(e)})}return(0,W.jsxs)(`div`,{className:`aio-config-grid`,children:[(0,W.jsx)(`div`,{className:`aio-card aio-config-nav`,children:[`General`,`Thresholds`,`Connections`,`Notifications`].map(e=>(0,W.jsxs)(`button`,{className:t===e?`active`:``,onClick:()=>n(e),children:[(0,W.jsx)(zr,{name:e===`General`?`gear`:e===`Thresholds`?`shield`:e===`Connections`?`db`:`report`,size:17}),` `,e]},e))}),(0,W.jsxs)(`section`,{className:`aio-card aio-pad`,children:[t===`General`&&(0,W.jsxs)(W.Fragment,{children:[(0,W.jsx)(`h3`,{children:`General`}),(0,W.jsx)(wr,{name:`Auto-run audit`,desc:`Reserved for scheduled local runs`,children:(0,W.jsx)(u,{stateKey:`autoAudit`})}),(0,W.jsx)(wr,{name:`Audit frequency`,desc:`Used when scheduling is enabled`,children:(0,W.jsx)(`div`,{className:`aio-segmented`,children:[`Daily`,`Weekly`,`Monthly`].map(e=>(0,W.jsx)(`button`,{className:s===e?`active`:``,onClick:()=>c(e),children:e},e))})}),(0,W.jsx)(wr,{name:`Lock draft records from audit`,desc:`Exclude incomplete drafts from scoring`,children:(0,W.jsx)(u,{stateKey:`lockDrafts`})})]}),t===`Thresholds`&&(0,W.jsxs)(W.Fragment,{children:[(0,W.jsx)(`h3`,{children:`Score Thresholds`}),[[`crit`,`Critical fields`],[`high`,`High-priority fields`],[`med`,`Medium fields`]].map(([e,t])=>(0,W.jsx)(wr,{name:t,desc:`Completion threshold`,children:(0,W.jsxs)(`div`,{className:`aio-number-wrap`,children:[(0,W.jsx)(`input`,{className:`aio-input`,type:`number`,value:a[e],onChange:t=>o(n=>({...n,[e]:Math.min(100,Number(t.target.value)||0)}))}),(0,W.jsx)(`span`,{children:`%`})]})},e)),(0,W.jsx)(`button`,{className:`btn btn-primary btn-sm`,onClick:()=>e(`Thresholds saved locally`,{type:`success`}),children:`Save Thresholds`})]}),t===`Connections`&&(0,W.jsxs)(W.Fragment,{children:[(0,W.jsx)(`h3`,{children:`Data Connections`}),(0,W.jsx)(`p`,{className:`aio-muted`,children:`This local build reads uploaded Excel/CSV files directly. External connectors are not enabled.`})]}),t===`Notifications`&&(0,W.jsxs)(W.Fragment,{children:[(0,W.jsx)(`h3`,{children:`Notifications`}),(0,W.jsx)(wr,{name:`Email digest`,desc:`Reserved for future local notification setup`,children:(0,W.jsx)(u,{stateKey:`email`})}),(0,W.jsx)(wr,{name:`Weekly scorecard`,desc:`Reserved for future local notification setup`,children:(0,W.jsx)(u,{stateKey:`weekly`})})]})]})]})}function wr({name:e,desc:t,children:n}){return(0,W.jsxs)(`div`,{className:`aio-setting-row`,children:[(0,W.jsxs)(`div`,{children:[(0,W.jsx)(`strong`,{children:e}),(0,W.jsx)(`div`,{className:`aio-muted`,children:t})]}),n]})}function Tr({title:e,onClose:t,children:n,wide:r}){return(0,W.jsx)(`div`,{className:`aio-modal-backdrop`,children:(0,W.jsxs)(`div`,{className:`aio-modal${r?` wide`:``}`,children:[(0,W.jsxs)(`div`,{className:`aio-modal-head`,children:[(0,W.jsx)(`strong`,{children:e}),(0,W.jsx)(`button`,{className:`aio-icon-btn`,onClick:t,children:(0,W.jsx)(zr,{name:`x`,size:16})})]}),n]})})}function Er(){let{notify:e}=Hn(),[t,n]=(0,_.useState)(`dqc`),[r,i]=(0,_.useState)(!1);function a(){n(`dqc`),window.setTimeout(()=>{window.dispatchEvent(new CustomEvent(`aio:dqc:open-upload`))},0)}function o(t){if(t===`imageedit`){e(`Use the main GRIMOIRE Image Edit tab for the full image workflow.`,{type:`info`});return}n(t)}let s={dqc:(0,W.jsxs)(W.Fragment,{children:[(0,W.jsxs)(`button`,{className:`btn btn-secondary`,onClick:a,children:[(0,W.jsx)(kr,{size:15}),` Upload Master Data`]}),(0,W.jsxs)(`button`,{className:`btn btn-primary`,onClick:a,children:[(0,W.jsx)(Or,{size:15}),` Run Audit`]})]}),master:(0,W.jsxs)(W.Fragment,{children:[(0,W.jsxs)(`button`,{className:`btn btn-secondary`,onClick:a,children:[(0,W.jsx)(kr,{size:15}),` Import Master Data`]}),(0,W.jsx)(`button`,{className:`btn btn-primary`,onClick:()=>window.dispatchEvent(new CustomEvent(`aio:master:new-record`)),children:`+ New Record`})]}),steward:(0,W.jsxs)(`button`,{className:`btn btn-primary`,disabled:!0,children:[(0,W.jsx)(zr,{name:`refresh`,size:15}),` Auto-Assign`]}),rules:(0,W.jsx)(`button`,{className:`btn btn-primary`,onClick:()=>window.dispatchEvent(new CustomEvent(`aio:rules:edit`)),children:`Edit Rule Profile`}),history:(0,W.jsxs)(`button`,{className:`btn btn-primary`,onClick:a,children:[(0,W.jsx)(Or,{size:15}),` Run Audit`]}),reports:(0,W.jsxs)(`button`,{className:`btn btn-primary`,onClick:()=>window.dispatchEvent(new CustomEvent(`aio:reports:refresh`)),children:[(0,W.jsx)(zr,{name:`refresh`,size:15}),` Refresh Reports`]}),config:(0,W.jsxs)(`button`,{className:`btn btn-primary`,onClick:()=>window.dispatchEvent(new CustomEvent(`aio:config:save`)),children:[(0,W.jsx)(Lr,{size:14}),` Save Changes`]})},c={dqc:(0,W.jsx)(Gr,{}),master:(0,W.jsx)(vr,{}),steward:(0,W.jsx)(yr,{}),rules:(0,W.jsx)(br,{}),history:(0,W.jsx)(xr,{}),reports:(0,W.jsx)(Sr,{}),config:(0,W.jsx)(Cr,{})};return(0,W.jsxs)(`div`,{className:`aio-embed${r?` collapsed`:``}`,children:[(0,W.jsxs)(`aside`,{className:`aio-sidebar`,children:[(0,W.jsxs)(`div`,{className:`aio-sidebar-top`,children:[(0,W.jsx)(`span`,{className:`aio-brand-mark`,children:(0,W.jsx)(zr,{name:`grid`,size:15})}),(0,W.jsx)(`span`,{className:`aio-brand-name`,children:`UNIFICATION AIO`}),(0,W.jsx)(`button`,{className:`aio-collapse`,onClick:()=>i(e=>!e),title:`Toggle sidebar`,children:(0,W.jsx)(zr,{name:`menu`,size:18})})]}),(0,W.jsx)(`nav`,{className:`aio-nav`,children:fr.map((e,n)=>`section`in e?(0,W.jsx)(`div`,{className:`aio-nav-section`,children:e.section},`${e.section}-${n}`):(0,W.jsxs)(`button`,{className:`aio-nav-item${t===e.id?` active`:``}`,onClick:()=>o(e.id),title:e.label,children:[(0,W.jsx)(zr,{name:e.icon,size:18}),(0,W.jsx)(`span`,{children:e.label})]},e.id))}),(0,W.jsx)(`div`,{className:`aio-side-foot`,children:(0,W.jsxs)(`button`,{className:`aio-account`,children:[(0,W.jsx)(`span`,{className:`aio-avatar`,children:(0,W.jsx)(zr,{name:`user`,size:16})}),(0,W.jsx)(`span`,{children:`Data Admin`}),(0,W.jsx)(Rr,{size:14})]})})]}),(0,W.jsxs)(`div`,{className:`aio-main`,children:[(0,W.jsxs)(`header`,{className:`aio-topbar`,children:[(0,W.jsx)(`h2`,{children:pr[t]}),(0,W.jsx)(`div`,{className:`aio-topbar-actions`,children:s[t]})]}),(0,W.jsx)(`main`,{className:`aio-content`,children:c[t]})]}),(0,W.jsx)(`style`,{children:`
        .aio-embed {
          --aio-red: var(--accent);
          --aio-ink: var(--text-primary);
          --aio-secondary: var(--text-secondary);
          --aio-muted: var(--text-muted);
          --aio-line: var(--border);
          --aio-line-strong: var(--border-light);
          --aio-soft: var(--accent-soft);
          --aio-card: var(--bg-card);
          --aio-card-hover: var(--bg-card-hover);
          --aio-input: var(--bg-input);
          --aio-green: var(--green);
          display: grid;
          grid-template-columns: 260px 1fr;
          min-height: calc(100vh - var(--topbar-height, 56px));
          margin: -24px -28px;
          background: var(--bg-base);
          color: var(--aio-ink);
        }
        .aio-sidebar {
          display: flex;
          flex-direction: column;
          min-height: inherit;
          background: var(--bg-sidebar);
          border-right: 1px solid var(--aio-line);
        }
        .aio-sidebar-top {
          height: 64px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 16px;
          border-bottom: 1px solid var(--aio-line);
        }
        .aio-brand-mark {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: linear-gradient(135deg, var(--accent), #c05621);
          color: #fff;
        }
        .aio-brand-name {
          font-weight: 800;
          font-size: 13.5px;
          flex: 1;
        }
        .aio-collapse,
        .aio-icon-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border: 0;
          border-radius: 8px;
          background: transparent;
          color: var(--aio-secondary);
          cursor: pointer;
        }
        .aio-collapse:hover,
        .aio-icon-btn:hover {
          background: var(--aio-soft);
          color: var(--aio-ink);
        }
        .aio-nav {
          padding: 16px 12px;
          flex: 1;
          overflow-y: auto;
        }
        .aio-nav-section {
          margin: 14px 10px 8px;
          color: var(--aio-red);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: .7px;
        }
        .aio-nav-item {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          border: 0;
          border-radius: 8px;
          background: transparent;
          color: var(--aio-secondary);
          padding: 10px 12px;
          cursor: pointer;
          font: inherit;
          font-size: 14px;
          text-align: left;
        }
        .aio-nav-item:hover {
          background: var(--aio-soft);
        }
        .aio-nav-item.active {
          background: var(--aio-soft);
          color: var(--aio-red);
          font-weight: 700;
        }
        .aio-side-foot {
          border-top: 1px solid var(--aio-line);
          padding: 12px;
        }
        .aio-account {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          border: 0;
          background: transparent;
          padding: 9px;
          color: var(--aio-secondary);
          font-weight: 700;
          cursor: pointer;
        }
        .aio-avatar {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--aio-input);
          color: var(--aio-secondary);
        }
        .aio-account span:nth-child(2) {
          flex: 1;
          text-align: left;
        }
        .aio-main {
          min-width: 0;
          display: flex;
          flex-direction: column;
        }
        .aio-topbar {
          height: 64px;
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 0 28px;
          background: var(--bg-topbar);
          border-bottom: 1px solid var(--aio-line);
        }
        .aio-topbar h2 {
          margin: 0;
          font-size: 22px;
          font-weight: 800;
        }
        .aio-topbar-actions {
          margin-left: auto;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .aio-content {
          padding: 24px 28px 40px;
          min-width: 0;
        }
        .aio-card {
          background: var(--aio-card);
          border: 1px solid var(--aio-line);
          border-radius: 12px;
          box-shadow: var(--shadow);
        }
        .aio-pad {
          padding: 20px;
        }
        .aio-card h3,
        .aio-card h4 {
          margin: 0 0 10px;
        }
        .aio-muted {
          color: var(--aio-muted);
          font-size: 13px;
          line-height: 1.5;
        }
        .aio-stat-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 18px;
        }
        .aio-metric-label {
          color: var(--aio-muted);
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: .5px;
          margin-bottom: 10px;
        }
        .aio-metric-value {
          font-size: 26px;
          font-weight: 800;
          min-height: 32px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .aio-metric-value.filename {
          font-size: 13px;
          font-weight: 600;
          line-height: 1.4;
          min-height: 32px;
          display: flex;
          align-items: center;
        }
        .aio-metric-value.green { color: var(--green); }
        .aio-metric-value.red { color: var(--aio-red); }
        .aio-actions-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 16px;
        }
        .aio-table-wrap {
          overflow: auto;
          border: 1px solid var(--aio-line);
          border-radius: 8px;
          margin-top: 16px;
        }
        .aio-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
        }
        .aio-table th,
        .aio-table td {
          padding: 12px 14px;
          border-bottom: 1px solid var(--aio-line);
          text-align: left;
        }
        .aio-table th {
          color: var(--aio-muted);
          background: var(--aio-input);
          font-size: 11.5px;
          text-transform: uppercase;
          letter-spacing: .35px;
        }
        .aio-table .num {
          text-align: right;
          font-variant-numeric: tabular-nums;
        }
        .aio-empty {
          text-align: center;
          color: var(--aio-muted);
          padding: 36px !important;
        }
        .aio-card-head,
        .aio-card-title-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 16px 18px;
          border-bottom: 1px solid var(--aio-line);
        }
        .aio-card-title-row {
          padding: 0 0 16px;
          border-bottom: 0;
        }
        .aio-rules-grid,
        .aio-config-grid {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 18px;
          align-items: start;
        }
        .aio-chip-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .aio-chip,
        .aio-priority {
          display: inline-flex;
          align-items: center;
          border-radius: 999px;
          padding: 3px 9px;
          font-size: 12px;
          font-weight: 700;
          background: var(--aio-input);
          border: 1px solid var(--aio-line);
          color: var(--aio-secondary);
        }
        .aio-chip.green {
          background: rgba(74, 222, 128, 0.1);
          border-color: rgba(74, 222, 128, 0.35);
          color: var(--green);
        }
        .aio-priority.critical { background: rgba(239, 68, 68, 0.12); color: var(--red); border-color: rgba(239, 68, 68, 0.35); }
        .aio-priority.high { background: rgba(249, 115, 22, 0.12); color: #f97316; border-color: rgba(249, 115, 22, 0.35); }
        .aio-priority.medium { background: rgba(250, 204, 21, 0.12); color: var(--yellow); border-color: rgba(250, 204, 21, 0.35); }
        .aio-priority.low { background: rgba(96, 165, 250, 0.12); color: var(--blue); border-color: rgba(96, 165, 250, 0.35); }
        .aio-error {
          margin: 10px 0;
          padding: 10px 12px;
          border: 1px solid rgba(239, 68, 68, 0.25);
          border-radius: 8px;
          background: rgba(239, 68, 68, 0.1);
          color: var(--red);
          font-size: 13px;
        }
        .aio-error.in-card {
          margin: 14px;
        }
        .aio-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 60;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--overlay);
          padding: 24px;
        }
        .aio-modal {
          width: min(620px, 100%);
          max-height: calc(100vh - 48px);
          overflow: auto;
          background: var(--bg-modal);
          border: 1px solid var(--aio-line);
          border-radius: 12px;
          box-shadow: var(--shadow-lg);
          padding: 18px;
        }
        .aio-modal.wide {
          width: min(760px, 100%);
        }
        .aio-modal-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }
        .aio-form-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }
        .aio-form-grid label,
        .aio-block-label {
          display: grid;
          gap: 6px;
          color: var(--aio-secondary);
          font-size: 12.5px;
          font-weight: 700;
        }
        .span-2 {
          grid-column: span 2;
        }
        .aio-input {
          width: 100%;
          border: 1px solid var(--aio-line);
          border-radius: 8px;
          background: var(--aio-input);
          color: var(--aio-ink);
          padding: 9px 11px;
          font: inherit;
          font-size: 13px;
        }
        .aio-textarea {
          min-height: 120px;
          resize: vertical;
        }
        .aio-textarea.code {
          min-height: 210px;
          font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
        }
        .aio-modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 16px;
        }
        .aio-timeline {
          display: grid;
          gap: 16px;
        }
        .aio-timeline-item {
          display: grid;
          grid-template-columns: 16px 1fr;
          gap: 12px;
        }
        .aio-dot {
          width: 10px;
          height: 10px;
          margin-top: 5px;
          border-radius: 999px;
          background: var(--green);
          box-shadow: 0 0 0 4px rgba(74, 222, 128, 0.12);
        }
        .aio-run-meta {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
          margin-top: 9px;
          color: var(--aio-secondary);
          font-size: 13px;
        }
        .aio-config-nav {
          padding: 8px;
        }
        .aio-config-nav button {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          border: 0;
          border-radius: 8px;
          background: transparent;
          padding: 11px 12px;
          font: inherit;
          text-align: left;
          color: var(--aio-secondary);
          cursor: pointer;
        }
        .aio-config-nav button.active {
          background: var(--aio-soft);
          color: var(--aio-red);
          font-weight: 800;
        }
        .aio-setting-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          border-top: 1px solid var(--aio-line);
          padding: 16px 0;
        }
        .aio-switch {
          width: 42px;
          height: 24px;
          border: 0;
          border-radius: 999px;
          background: var(--aio-input);
          border: 1px solid var(--aio-line);
          position: relative;
          cursor: pointer;
        }
        .aio-switch::after {
          content: "";
          position: absolute;
          top: 3px;
          left: 3px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--text-primary);
          transition: transform .15s;
        }
        .aio-switch.on {
          background: var(--aio-red);
        }
        .aio-switch.on::after {
          transform: translateX(18px);
        }
        .aio-segmented {
          display: inline-flex;
          border: 1px solid var(--aio-line);
          border-radius: 8px;
          overflow: hidden;
        }
        .aio-segmented button {
          border: 0;
          border-right: 1px solid var(--aio-line);
          padding: 7px 10px;
          background: var(--aio-card);
          color: var(--aio-secondary);
          cursor: pointer;
        }
        .aio-segmented button:last-child {
          border-right: 0;
        }
        .aio-segmented button.active {
          background: var(--aio-red);
          color: #fff;
          font-weight: 800;
        }
        .aio-number-wrap {
          display: flex;
          align-items: center;
          gap: 6px;
          width: 110px;
        }
        .aio-number-wrap .aio-input {
          text-align: right;
        }
        .aio-embed.collapsed {
          grid-template-columns: 72px 1fr;
        }
        .aio-embed.collapsed .aio-brand-name,
        .aio-embed.collapsed .aio-nav-section,
        .aio-embed.collapsed .aio-nav-item span,
        .aio-embed.collapsed .aio-account span,
        .aio-embed.collapsed .aio-account > svg {
          display: none;
        }
        .aio-embed.collapsed .aio-sidebar-top {
          justify-content: center;
          padding: 0 8px;
        }
        .aio-embed.collapsed .aio-brand-mark {
          display: none;
        }
        .aio-embed.collapsed .aio-nav-item {
          justify-content: center;
          padding: 12px;
        }
        .aio-embed.collapsed .aio-account {
          justify-content: center;
        }
        @media (max-width: 1100px) {
          .aio-stat-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .aio-rules-grid,
          .aio-config-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 760px) {
          .aio-embed,
          .aio-embed.collapsed {
            grid-template-columns: 1fr;
          }
          .aio-sidebar {
            min-height: auto;
          }
          .aio-nav {
            display: flex;
            overflow-x: auto;
            gap: 6px;
            padding: 10px;
          }
          .aio-nav-section,
          .aio-side-foot {
            display: none;
          }
          .aio-nav-item {
            width: auto;
            white-space: nowrap;
          }
          .aio-topbar {
            height: auto;
            min-height: 64px;
            align-items: flex-start;
            flex-direction: column;
            padding: 16px;
          }
          .aio-topbar-actions {
            margin-left: 0;
            flex-wrap: wrap;
          }
          .aio-content {
            padding: 16px;
          }
          .aio-stat-grid,
          .aio-form-grid {
            grid-template-columns: 1fr;
          }
          .span-2 {
            grid-column: span 1;
          }
        }
      `})]})}function Dr(e,t,n){let r=e=>`"`+String(e??``).replace(/"/g,`""`)+`"`,i=t.map(r).join(`,`),a=n.map(e=>t.map(t=>r(e[t])).join(`,`)).join(`
`),o=new Blob([i+`
`+a],{type:`text/csv;charset=utf-8;`}),s=URL.createObjectURL(o),c=document.createElement(`a`);c.href=s,c.download=e,document.body.appendChild(c),c.click(),c.remove(),URL.revokeObjectURL(s)}function Or({size:e=15}){return(0,W.jsxs)(`svg`,{width:e,height:e,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,W.jsx)(`circle`,{cx:`12`,cy:`12`,r:`10`}),(0,W.jsx)(`polygon`,{points:`10 8 16 12 10 16 10 8`,fill:`currentColor`,stroke:`none`})]})}function kr({size:e=15}){return(0,W.jsxs)(`svg`,{width:e,height:e,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,W.jsx)(`path`,{d:`M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4`}),(0,W.jsx)(`polyline`,{points:`7 10 12 15 17 10`}),(0,W.jsx)(`line`,{x1:`12`,y1:`15`,x2:`12`,y2:`3`})]})}function Ar({size:e=13}){return(0,W.jsxs)(`svg`,{width:e,height:e,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,W.jsx)(`circle`,{cx:`12`,cy:`12`,r:`10`}),(0,W.jsx)(`line`,{x1:`12`,y1:`16`,x2:`12`,y2:`12`}),(0,W.jsx)(`line`,{x1:`12`,y1:`8`,x2:`12.01`,y2:`8`})]})}function jr({size:e=16}){return(0,W.jsxs)(`svg`,{width:e,height:e,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,W.jsx)(`rect`,{x:`3`,y:`4`,width:`18`,height:`18`,rx:`2`,ry:`2`}),(0,W.jsx)(`line`,{x1:`16`,y1:`2`,x2:`16`,y2:`6`}),(0,W.jsx)(`line`,{x1:`8`,y1:`2`,x2:`8`,y2:`6`}),(0,W.jsx)(`line`,{x1:`3`,y1:`10`,x2:`21`,y2:`10`})]})}function Mr({size:e=20}){return(0,W.jsxs)(`svg`,{width:e,height:e,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,W.jsx)(`path`,{d:`M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z`}),(0,W.jsx)(`polyline`,{points:`14 2 14 8 20 8`})]})}function Nr({size:e=15}){return(0,W.jsx)(`svg`,{width:e,height:e,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2.4,strokeLinecap:`round`,strokeLinejoin:`round`,children:(0,W.jsx)(`polyline`,{points:`15 18 9 12 15 6`})})}function Pr({size:e=15}){return(0,W.jsx)(`svg`,{width:e,height:e,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2.4,strokeLinecap:`round`,strokeLinejoin:`round`,children:(0,W.jsx)(`polyline`,{points:`9 18 15 12 9 6`})})}function Fr({size:e=13}){return(0,W.jsx)(`svg`,{width:e,height:e,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2.4,strokeLinecap:`round`,strokeLinejoin:`round`,children:(0,W.jsx)(`polyline`,{points:`18 15 12 9 6 15`})})}function Ir({size:e=13}){return(0,W.jsxs)(`svg`,{width:e,height:e,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,W.jsx)(`line`,{x1:`12`,y1:`5`,x2:`12`,y2:`19`}),(0,W.jsx)(`polyline`,{points:`19 12 12 19 5 12`})]})}function Lr({size:e=13}){return(0,W.jsx)(`svg`,{width:e,height:e,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:3,strokeLinecap:`round`,strokeLinejoin:`round`,children:(0,W.jsx)(`polyline`,{points:`20 6 9 17 4 12`})})}function Rr({size:e=14}){return(0,W.jsx)(`svg`,{width:e,height:e,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2.4,strokeLinecap:`round`,strokeLinejoin:`round`,children:(0,W.jsx)(`polyline`,{points:`6 9 12 15 18 9`})})}function zr({name:e,size:t=18}){let n={width:t,height:t,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`},r={grid:(0,W.jsxs)(W.Fragment,{children:[(0,W.jsx)(`rect`,{x:`3`,y:`3`,width:`7`,height:`7`,rx:`1.5`}),(0,W.jsx)(`rect`,{x:`14`,y:`3`,width:`7`,height:`7`,rx:`1.5`}),(0,W.jsx)(`rect`,{x:`3`,y:`14`,width:`7`,height:`7`,rx:`1.5`}),(0,W.jsx)(`rect`,{x:`14`,y:`14`,width:`7`,height:`7`,rx:`1.5`})]}),menu:(0,W.jsxs)(W.Fragment,{children:[(0,W.jsx)(`line`,{x1:`4`,y1:`7`,x2:`20`,y2:`7`}),(0,W.jsx)(`line`,{x1:`4`,y1:`12`,x2:`20`,y2:`12`}),(0,W.jsx)(`line`,{x1:`4`,y1:`17`,x2:`20`,y2:`17`})]}),shield:(0,W.jsx)(`path`,{d:`M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z`}),db:(0,W.jsxs)(W.Fragment,{children:[(0,W.jsx)(`ellipse`,{cx:`12`,cy:`5`,rx:`8`,ry:`3`}),(0,W.jsx)(`path`,{d:`M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5`}),(0,W.jsx)(`path`,{d:`M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6`})]}),user:(0,W.jsxs)(W.Fragment,{children:[(0,W.jsx)(`circle`,{cx:`12`,cy:`8`,r:`4`}),(0,W.jsx)(`path`,{d:`M4 21c1.8-4 4.4-6 8-6s6.2 2 8 6`})]}),list:(0,W.jsxs)(W.Fragment,{children:[(0,W.jsx)(`line`,{x1:`9`,y1:`6`,x2:`20`,y2:`6`}),(0,W.jsx)(`line`,{x1:`9`,y1:`12`,x2:`20`,y2:`12`}),(0,W.jsx)(`line`,{x1:`9`,y1:`18`,x2:`20`,y2:`18`}),(0,W.jsx)(`circle`,{cx:`4`,cy:`6`,r:`1`}),(0,W.jsx)(`circle`,{cx:`4`,cy:`12`,r:`1`}),(0,W.jsx)(`circle`,{cx:`4`,cy:`18`,r:`1`})]}),clock:(0,W.jsxs)(W.Fragment,{children:[(0,W.jsx)(`circle`,{cx:`12`,cy:`12`,r:`9`}),(0,W.jsx)(`polyline`,{points:`12 7 12 12 16 14`})]}),report:(0,W.jsxs)(W.Fragment,{children:[(0,W.jsx)(`path`,{d:`M6 3h9l3 3v15H6z`}),(0,W.jsx)(`path`,{d:`M14 3v4h4`}),(0,W.jsx)(`line`,{x1:`9`,y1:`13`,x2:`15`,y2:`13`}),(0,W.jsx)(`line`,{x1:`9`,y1:`17`,x2:`15`,y2:`17`})]}),gear:(0,W.jsxs)(W.Fragment,{children:[(0,W.jsx)(`circle`,{cx:`12`,cy:`12`,r:`3`}),(0,W.jsx)(`path`,{d:`M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1-2.1 2.1-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V20h-3v-.2a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1-2.1-2.1.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H4v-3h.2a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1 2.1-2.1.1.1a1.6 1.6 0 0 0 1.8.3 1.6 1.6 0 0 0 1-1.5V4h3v.2a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1 2.1 2.1-.1.1a1.6 1.6 0 0 0-.3 1.8 1.6 1.6 0 0 0 1.5 1h.2v3h-.2a1.6 1.6 0 0 0-1.5 1Z`})]}),image:(0,W.jsxs)(W.Fragment,{children:[(0,W.jsx)(`rect`,{x:`3`,y:`5`,width:`18`,height:`14`,rx:`2`}),(0,W.jsx)(`circle`,{cx:`8`,cy:`10`,r:`2`}),(0,W.jsx)(`path`,{d:`M21 16l-5-5L5 19`})]}),refresh:(0,W.jsxs)(W.Fragment,{children:[(0,W.jsx)(`polyline`,{points:`20 6 20 12 14 12`}),(0,W.jsx)(`polyline`,{points:`4 18 4 12 10 12`}),(0,W.jsx)(`path`,{d:`M6.5 8a7 7 0 0 1 11.7-2L20 8`}),(0,W.jsx)(`path`,{d:`M17.5 16a7 7 0 0 1-11.7 2L4 16`})]}),x:(0,W.jsxs)(W.Fragment,{children:[(0,W.jsx)(`line`,{x1:`18`,y1:`6`,x2:`6`,y2:`18`}),(0,W.jsx)(`line`,{x1:`6`,y1:`6`,x2:`18`,y2:`18`})]})};return(0,W.jsx)(`svg`,{...n,children:r[e]})}function Br({value:e}){return(0,W.jsx)(`span`,{className:`dqc-badge ${Xn[e]||`out-closed`}`,children:e})}function Vr({value:e}){return(0,W.jsx)(`span`,{className:`dqc-badge ${Zn[e]||`out-open`}`,children:e})}function Hr(e,t){let n=t[e];return e===`Priority`&&n||e===`Severity`&&n?(0,W.jsx)(Br,{value:ir(n)}):e===`Status`&&n&&Zn[ir(n)]?(0,W.jsx)(Vr,{value:ir(n)}):e===`Missing Fields`&&n?(0,W.jsx)(`span`,{style:{display:`flex`,gap:5,flexWrap:`wrap`},children:String(n).split(`; `).map(e=>(0,W.jsx)(`span`,{className:`dqc-badge out-open`,style:{fontSize:10.5},children:e},e))}):ir(n)}function Ur(e,t){let n=ir(t);return e===`Brand`||e===`SKU`||e===`Field`?`dqc-cell-bold`:n.startsWith(`missing:`)?`dqc-cell-missing`:n===`NO missing`?`dqc-cell-ok`:n===`-`?`dqc-cell-muted`:nr.has(e)?`dqc-cell-num`:``}function Wr({label:e,children:t}){return(0,W.jsxs)(`div`,{className:`dqc-stat-card`,children:[(0,W.jsxs)(`div`,{className:`dqc-stat-head`,children:[e,` `,(0,W.jsx)(Ar,{size:13})]}),t]})}function Gr(){let{notify:e}=Hn(),[t,n]=(0,_.useState)(!1),[r,i]=(0,_.useState)(null),[a,o]=(0,_.useState)(null),s=(0,_.useRef)(null),[c,l]=(0,_.useState)(null),[u,d]=(0,_.useState)(`Overview`),[f,p]=(0,_.useState)({col:`Brand`,dir:`asc`}),[m,h]=(0,_.useState)(1),[g,v]=(0,_.useState)(10),[y,b]=(0,_.useState)(()=>Object.fromEntries($n.map(e=>[e,er.includes(e)]))),[x,S]=(0,_.useState)(()=>Object.fromEntries(tr.map(e=>[e,!0]))),C=Object.entries(y).filter(([,e])=>e).map(([e])=>e);(0,_.useEffect)(()=>{if(!r||![`pending`,`running`].includes(r.status))return;let t=!1,n=window.setInterval(async()=>{try{let a=await rr(`/api/jobs/${r.id}`);if(t)return;if(i(a),a.status===`completed`)window.clearInterval(n),e(`Data QC report ready`,{type:`success`}),w(a.id);else if(a.status===`failed`){window.clearInterval(n),o(a.error??`Job failed`);let t=a.error??`Job failed`;e(sr(t)?`Replace the uploaded file`:`Data QC job failed`,{type:sr(t)?`warning`:`error`,message:a.error??void 0})}}catch{window.clearInterval(n)}},1200);return()=>{t=!0,window.clearInterval(n)}},[r?.id,r?.status]);let w=(0,_.useCallback)(async e=>{try{l((await rr(`/api/jobs/${e}/report-data`)).sheets),d(`Overview`),h(1)}catch(e){o(e instanceof Error?e.message:String(e))}},[]);async function ee(t){if(!C.length){o(`Select at least one STATUS before running DQC.`);return}n(!0),o(null),i(null),l(null);try{let n=new FormData;n.append(`file`,t),n.append(`chunk_size`,`5000`),n.append(`max_workers`,`0`),n.append(`keep_detail_rows`,`true`),n.append(`selected_statuses`,JSON.stringify(C)),e(`Running DQC for ${t.name}`,{type:`info`}),i(await rr(`/api/data-quality-control/jobs`,{method:`POST`,body:n}))}catch(t){let n=t instanceof Error?t.message:String(t);o(n),e(sr(n)?`Replace the uploaded file`:`Failed to start audit`,{type:sr(n)?`warning`:`error`,message:n})}finally{n(!1),s.current&&(s.current.value=``)}}function T(){r?.id&&window.open(Wn(`/api/jobs/${encodeURIComponent(r.id)}/download`),`_blank`)}let E=lr(u,c),D=(0,_.useMemo)(()=>ur(u,E),[u,E]),O=(0,_.useMemo)(()=>dr(u,E),[u,E]),k=(0,_.useMemo)(()=>D.filter(e=>{let t=e.Priority||e.Severity||cr(ir(e.Field??e[`Missing Field`]));return!(t&&x[t]===!1)}),[D,x]),A=(0,_.useMemo)(()=>[...k].sort((e,t)=>{let n=f.col===`Priority`||f.col===`Severity`,r=n?Yn[ir(e[f.col])]??99:ir(e[f.col]).toLowerCase(),i=n?Yn[ir(t[f.col])]??99:ir(t[f.col]).toLowerCase(),a=f.dir===`asc`?1:-1;return r<i?-1*a:r>i?1*a:0}),[k,f]),j=A.length,te=Math.max(1,Math.ceil(j/g)),M=Math.min(m,te),ne=(M-1)*g,N=A.slice(ne,ne+g);(0,_.useEffect)(()=>{h(1)},[u,g,x,f.col,f.dir,c]),(0,_.useEffect)(()=>{p({col:u===`Action Tracker`?`Priority`:u===`Validation Errors`?`Severity`:`Brand`,dir:`asc`})},[u]);let P=r?.status===`pending`||r?.status===`running`,F=r?.summary??null,re=Math.max(0,Math.min(100,r?.status===`completed`?100:ar(F,`progress_percent`,P?3:0))),I=or(F,`progress_phase`,r?.status??`idle`),L=or(F,`progress_message`,P?`Audit is running`:r?.status===`completed`?`Audit complete`:`Ready`),R=ar(F,`worker_count`,0);function z(e){b(t=>({...t,[e]:!t[e]}))}function ie(e){S(t=>({...t,[e]:!t[e]}))}function ae(e){p(t=>({col:e,dir:t.col===e&&t.dir===`asc`?`desc`:`asc`}))}return(0,_.useEffect)(()=>{let e=()=>s.current?.click();return window.addEventListener(`aio:dqc:open-upload`,e),()=>window.removeEventListener(`aio:dqc:open-upload`,e)},[]),(0,W.jsxs)(`div`,{className:`view tool-view dqc-view`,children:[(0,W.jsxs)(`div`,{className:`view-header`,children:[(0,W.jsx)(`h1`,{children:`Data Quality Control`}),(0,W.jsxs)(`div`,{className:`view-header-actions`,children:[(0,W.jsx)(`button`,{className:`btn btn-secondary`,onClick:()=>s.current?.click(),children:`Upload Master Data`}),(0,W.jsx)(`button`,{className:`btn btn-primary`,onClick:()=>s.current?.click(),disabled:t||P,children:`Run Audit`})]})]}),(0,W.jsx)(`input`,{ref:s,type:`file`,accept:`.xlsx,.xlsm,.csv`,hidden:!0,onChange:e=>{let t=e.target.files?.[0];t&&ee(t)}}),(0,W.jsxs)(`section`,{className:`tool-card dqc-run-panel`,children:[(0,W.jsxs)(`div`,{className:`dqc-run-panel-left`,children:[(0,W.jsx)(`div`,{className:`dqc-section-title`,children:`Data Quality Control`}),(0,W.jsx)(`div`,{className:`dqc-sub`,children:r?`Job ${r.id} | ${r.status}`:`Upload master data and run DQC with the selected STATUS filter.`}),a&&(0,W.jsx)(`div`,{className:`dqc-error`,children:a})]}),(0,W.jsxs)(`button`,{className:`btn btn-primary`,onClick:()=>s.current?.click(),disabled:t||P,children:[(0,W.jsx)(Or,{size:15}),` `,t||P?`Running...`:`Run DQC Audit`]}),(0,W.jsxs)(`button`,{className:`btn btn-success`,disabled:!r||r.status!==`completed`,onClick:T,children:[(0,W.jsx)(kr,{size:15}),` Download Report`]})]}),r&&(0,W.jsxs)(`section`,{className:`tool-card dqc-progress-panel dqc-progress-${r.status}`,children:[(0,W.jsxs)(`div`,{className:`dqc-progress-head`,children:[(0,W.jsxs)(`div`,{children:[(0,W.jsx)(`div`,{className:`dqc-section-title`,children:`Audit Progress`}),(0,W.jsxs)(`div`,{className:`dqc-sub`,children:[L,R?` | workers: ${R}`:``]})]}),(0,W.jsxs)(`strong`,{children:[Math.round(re),`%`]})]}),(0,W.jsx)(`div`,{className:`dqc-progress-track`,"aria-label":`Data QC audit progress`,children:(0,W.jsx)(`div`,{className:`dqc-progress-fill`,style:{width:`${re}%`}})}),(0,W.jsxs)(`div`,{className:`dqc-progress-meta`,children:[(0,W.jsx)(`span`,{children:I.replace(/_/g,` `)}),(0,W.jsx)(`span`,{children:r.original_filename??or(F,`current_file`,``)})]})]}),(0,W.jsxs)(`div`,{className:`dqc-stat-grid`,children:[(0,W.jsxs)(Wr,{label:`Brands Audited`,children:[(0,W.jsx)(`div`,{className:`dqc-stat-val green`,children:F?String(F.brand_count??0):`-`}),(0,W.jsx)(`div`,{className:`dqc-stat-sub`,children:`from current run`})]}),(0,W.jsxs)(Wr,{label:`Critical Actions`,children:[(0,W.jsx)(`div`,{className:`dqc-stat-val red`,children:F?String(F.critical_actions??0):`-`}),(0,W.jsx)(`div`,{className:`dqc-stat-sub`,children:`priority rows`})]}),(0,W.jsxs)(Wr,{label:`Validation Errors`,children:[(0,W.jsx)(`div`,{className:`dqc-stat-val red`,children:F?String(F.validation_error_count??0):`-`}),(0,W.jsx)(`div`,{className:`dqc-stat-sub`,children:`rule violations`})]}),(0,W.jsxs)(Wr,{label:`Included Rows`,children:[(0,W.jsxs)(`div`,{className:`dqc-stat-date`,children:[(0,W.jsx)(jr,{size:16}),` `,F?`${F.included_rows}/${F.total_rows}`:`-`]}),(0,W.jsx)(`div`,{className:`dqc-stat-sub`,children:`selected status / total rows`})]})]}),(0,W.jsxs)(`div`,{className:`dqc-grid`,children:[(0,W.jsxs)(`div`,{className:`tool-card dqc-table-card`,children:[(0,W.jsx)(`div`,{className:`dqc-tabs`,children:Qn.map(e=>(0,W.jsx)(`button`,{className:`dqc-tab${u===e?` active`:``}`,onClick:()=>d(e),children:e},e))}),(0,W.jsx)(`div`,{style:{overflowX:`auto`},children:(0,W.jsxs)(`table`,{className:`dqc-tbl`,children:[(0,W.jsx)(`thead`,{children:(0,W.jsx)(`tr`,{children:(O.length?O:[`NO DATA`]).map(e=>(0,W.jsx)(`th`,{className:`dqc-sortable`,onClick:()=>O.length>0&&ae(e),children:(0,W.jsxs)(`span`,{className:`dqc-th-in`,style:{color:f.col===e?`var(--red, #ef4444)`:void 0},children:[e,O.length>0&&(f.col===e&&f.dir===`asc`?(0,W.jsx)(Fr,{size:13}):(0,W.jsx)(Ir,{size:13}))]})},e))})}),(0,W.jsxs)(`tbody`,{children:[N.map((e,t)=>(0,W.jsx)(`tr`,{children:O.map(t=>(0,W.jsx)(`td`,{className:Ur(t,e[t]),children:Hr(t,e)},t))},t)),N.length===0&&(0,W.jsx)(`tr`,{children:(0,W.jsx)(`td`,{colSpan:Math.max(O.length,1),style:{textAlign:`center`,color:`var(--text-muted)`,padding:40},children:t||P?`Audit is running...`:`No live DQC data loaded. Run an audit to populate this tab.`})})]})]})}),(0,W.jsxs)(`div`,{className:`dqc-pager`,children:[(0,W.jsx)(`div`,{className:`dqc-pager-info`,children:j===0?`No entries`:`Showing ${ne+1} to ${Math.min(ne+g,j)} of ${j} entries`}),(0,W.jsxs)(`div`,{className:`dqc-pg-nums`,children:[(0,W.jsx)(`button`,{className:`dqc-pg dqc-pg-arrow`,disabled:M===1,onClick:()=>h(e=>Math.max(1,e-1)),children:(0,W.jsx)(Nr,{size:15})}),(0,W.jsx)(`button`,{className:`dqc-pg dqc-pg-active`,children:M}),(0,W.jsx)(`button`,{className:`dqc-pg dqc-pg-arrow`,disabled:M===te,onClick:()=>h(e=>Math.min(te,e+1)),children:(0,W.jsx)(Pr,{size:15})})]}),(0,W.jsxs)(`div`,{className:`dqc-select-wrap`,children:[(0,W.jsx)(`select`,{value:g,onChange:e=>v(+e.target.value),children:[10,25,50,100].map(e=>(0,W.jsxs)(`option`,{value:e,children:[e,` / page`]},e))}),(0,W.jsx)(`span`,{className:`dqc-chev`,children:(0,W.jsx)(Rr,{size:14})})]})]})]}),(0,W.jsxs)(`aside`,{className:`tool-card dqc-filter-panel`,children:[(0,W.jsx)(`div`,{className:`dqc-rules-h`,children:`Run Filters`}),(0,W.jsx)(`div`,{className:`dqc-subhead`,children:`Master Data STATUS`}),$n.map(e=>(0,W.jsxs)(`label`,{className:`dqc-chk${y[e]?` on`:``}`,onClick:()=>z(e),children:[(0,W.jsx)(`span`,{className:`dqc-box`,children:(0,W.jsx)(Lr,{size:13})}),e]},e)),(0,W.jsx)(`div`,{className:`dqc-subhead`,children:`Priority Filter`}),tr.map(e=>(0,W.jsxs)(`label`,{className:`dqc-chk${x[e]?` on`:``}`,onClick:()=>ie(e),children:[(0,W.jsx)(`span`,{className:`dqc-box`,children:(0,W.jsx)(Lr,{size:13})}),e]},e)),(0,W.jsx)(`div`,{className:`dqc-filter-note`,children:`Included statuses are sent to the backend before Excel parsing and missing-data counting.`})]})]}),(0,W.jsxs)(`section`,{className:`tool-card dqc-download-section`,children:[(0,W.jsx)(`div`,{className:`dqc-rules-h`,style:{marginBottom:14},children:`Download Current View`}),(0,W.jsxs)(`div`,{className:`dqc-dl-row`,children:[(0,W.jsx)(`div`,{className:`dqc-file-ico`,children:(0,W.jsx)(Mr,{size:20})}),(0,W.jsxs)(`div`,{style:{flex:1,minWidth:0},children:[(0,W.jsxs)(`div`,{style:{fontWeight:600,fontSize:13.5},children:[u.replace(/ /g,`_`),`_`,j,`_rows.csv`]}),(0,W.jsxs)(`div`,{style:{fontSize:12.5,color:`var(--text-muted)`},children:[j,` filtered entries from the current report sheet`]})]}),(0,W.jsxs)(`button`,{className:`btn btn-success btn-sm`,disabled:!O.length,onClick:()=>{Dr(`${u.replace(/ /g,`_`)}_export.csv`,O,A),e(`Exported ${j} rows to CSV`,{type:`success`})},children:[(0,W.jsx)(kr,{size:15}),` Download`]})]})]}),(0,W.jsx)(`style`,{children:`
        .dqc-view {
          --dqc-red: var(--red);
          --dqc-green: var(--green);
          --dqc-yellow: var(--yellow);
          --dqc-blue: var(--blue);
          --dqc-orange: #f97316;
          --bg-card: var(--aio-card);
          --bg-input: var(--aio-input);
          --bg-primary: var(--bg-base);
          --text-primary: var(--aio-ink);
          --text-secondary: var(--aio-secondary);
          --text-muted: var(--aio-muted);
          --border: var(--aio-line);
          --accent: var(--aio-red);
          --accent-soft: var(--aio-soft);
          background: transparent;
          color: var(--text-primary);
          min-height: auto;
          margin: 0;
          padding: 0;
        }
        .dqc-view .view-header {
          display: none;
        }
        .dqc-view .view-header h1 {
          color: var(--text-primary);
          font-size: 22px;
          font-weight: 800;
        }
        .dqc-view .btn {
          border-radius: 8px;
          font-size: 13px;
          font-weight: 700;
          box-shadow: none;
        }
        .dqc-view .btn-primary {
          background: var(--accent);
          color: #fff;
        }
        .dqc-view .btn-primary:hover:not(:disabled) {
          background: var(--accent-hover);
        }
        .dqc-view .btn-secondary {
          background: var(--bg-card);
          border: 1px solid var(--border);
          color: var(--text-primary);
        }
        .dqc-view .tool-card,
        .dqc-view .dqc-stat-card {
          background: var(--bg-card) !important;
          border: 1px solid var(--border) !important;
          border-radius: 12px !important;
          box-shadow: var(--shadow);
        }

        /* Run panel */
        .dqc-run-panel {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
          padding: 18px 20px;
        }
        .dqc-run-panel-left {
          flex: 1;
          min-width: 0;
        }
        .dqc-section-title {
          font-size: 15px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 4px;
        }
        .dqc-sub {
          font-size: 12.5px;
          color: var(--text-muted);
        }
        .dqc-error {
          margin-top: 8px;
          padding: 8px 12px;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: var(--radius-sm, 6px);
          color: var(--dqc-red);
          font-size: 12.5px;
        }
        .dqc-progress-panel {
          display: grid;
          gap: 10px;
          margin-bottom: 16px;
          padding: 16px 20px;
        }
        .dqc-progress-head,
        .dqc-progress-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .dqc-progress-head strong {
          color: var(--accent);
          font-size: 18px;
          font-variant-numeric: tabular-nums;
          white-space: nowrap;
        }
        .dqc-progress-track {
          height: 10px;
          overflow: hidden;
          border-radius: 999px;
          background: var(--bg-input);
          border: 1px solid var(--border);
        }
        .dqc-progress-fill {
          height: 100%;
          min-width: 3px;
          border-radius: inherit;
          background: linear-gradient(90deg, var(--accent), var(--dqc-orange));
          transition: width 0.35s ease;
        }
        .dqc-progress-meta {
          color: var(--text-muted);
          font-size: 11.5px;
          text-transform: capitalize;
        }
        .dqc-progress-completed .dqc-progress-fill {
          background: var(--dqc-green);
        }
        .dqc-progress-failed .dqc-progress-fill {
          background: var(--dqc-red);
        }

        /* Stat cards */
        .dqc-stat-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 16px;
        }
        .dqc-stat-card {
          background: var(--bg-card, #1e1e2e);
          border: 1px solid var(--border, #2a2a3a);
          border-radius: var(--radius, 8px);
          padding: 16px 18px;
        }
        .dqc-stat-head {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-muted);
          margin-bottom: 8px;
        }
        .dqc-stat-head svg {
          opacity: 0.5;
        }
        .dqc-stat-val {
          font-size: 26px;
          font-weight: 700;
          line-height: 1.2;
        }
        .dqc-stat-val.green { color: var(--green, #4ade80); }
        .dqc-stat-val.red { color: var(--red, #ef4444); }
        .dqc-stat-date {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 18px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .dqc-stat-sub {
          font-size: 11.5px;
          color: var(--text-muted);
          margin-top: 4px;
        }

        /* Content grid */
        .dqc-grid {
          display: grid;
          grid-template-columns: 1fr 260px;
          gap: 16px;
          align-items: start;
          margin-bottom: 16px;
        }

        /* Tabs */
        .dqc-tabs {
          display: flex;
          gap: 0;
          border-bottom: 1px solid var(--border, #2a2a3a);
          padding: 0 16px;
          overflow-x: auto;
        }
        .dqc-tab {
          border: 0;
          background: transparent;
          color: var(--text-muted);
          padding: 10px 14px;
          cursor: pointer;
          font: inherit;
          font-size: 12px;
          font-weight: 500;
          white-space: nowrap;
          border-bottom: 2px solid transparent;
          transition: all 0.15s;
          margin-bottom: -1px;
        }
        .dqc-tab:hover {
          color: var(--text-primary);
        }
        .dqc-tab.active {
          color: var(--accent, #ef4444);
          border-bottom-color: var(--accent, #ef4444);
          font-weight: 600;
        }

        /* Table card */
        .dqc-table-card {
          min-width: 0;
          overflow: hidden;
          padding: 0 !important;
        }

        /* Table */
        .dqc-tbl {
          width: 100%;
          border-collapse: collapse;
          font-size: 12.5px;
        }
        .dqc-tbl thead {
          background: var(--bg-input, #1a1a2a);
        }
        .dqc-tbl th {
          padding: 10px 14px;
          text-align: left;
          font-weight: 600;
          font-size: 11.5px;
          color: var(--text-secondary);
          white-space: nowrap;
          border-bottom: 1px solid var(--border, #2a2a3a);
        }
        .dqc-tbl td {
          padding: 9px 14px;
          border-bottom: 1px solid var(--border-subtle, rgba(255,255,255,0.04));
          color: var(--text-secondary);
          vertical-align: middle;
        }
        .dqc-tbl tbody tr:hover {
          background: rgba(255,255,255,0.02);
        }
        .dqc-sortable {
          cursor: pointer;
          user-select: none;
        }
        .dqc-th-in {
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        /* Cell classes */
        .dqc-cell-bold { font-weight: 600; color: var(--text-primary); }
        .dqc-cell-missing { color: var(--dqc-red); font-weight: 500; }
        .dqc-cell-ok { color: var(--dqc-green); font-weight: 500; }
        .dqc-cell-muted { color: var(--text-muted); }
        .dqc-cell-num { font-variant-numeric: tabular-nums; text-align: right; }

        /* Badges */
        .dqc-badge {
          display: inline-flex;
          align-items: center;
          padding: 2px 9px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 600;
          white-space: nowrap;
        }
        .dqc-badge.solid-crit {
          background: rgba(239,68,68,0.15);
          color: #ef4444;
        }
        .dqc-badge.solid-high {
          background: rgba(249,115,22,0.15);
          color: #f97316;
        }
        .dqc-badge.solid-med {
          background: rgba(250,204,21,0.15);
          color: #facc15;
        }
        .dqc-badge.solid-low {
          background: rgba(96,165,250,0.15);
          color: #60a5fa;
        }
        .dqc-badge.out-open {
          background: rgba(255,255,255,0.06);
          color: var(--text-secondary);
          border: 1px solid var(--border, #2a2a3a);
        }
        .dqc-badge.out-prog {
          background: rgba(96,165,250,0.12);
          color: #60a5fa;
        }
        .dqc-badge.out-res {
          background: rgba(74,222,128,0.12);
          color: #4ade80;
        }
        .dqc-badge.out-closed {
          background: rgba(255,255,255,0.06);
          color: var(--text-muted);
        }

        /* Pagination */
        .dqc-pager {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 16px;
          border-top: 1px solid var(--border, #2a2a3a);
          font-size: 12.5px;
        }
        .dqc-pager-info {
          color: var(--text-muted);
        }
        .dqc-pg-nums {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .dqc-pg {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 32px;
          height: 32px;
          border: 1px solid var(--border, #2a2a3a);
          border-radius: var(--radius-sm, 6px);
          background: transparent;
          color: var(--text-secondary);
          cursor: pointer;
          font: inherit;
          font-size: 12.5px;
          transition: all 0.15s;
        }
        .dqc-pg:hover:not(:disabled) {
          background: rgba(255,255,255,0.04);
          color: var(--text-primary);
        }
        .dqc-pg:disabled {
          opacity: 0.35;
          cursor: default;
        }
        .dqc-pg-active {
          background: var(--accent, #ef4444) !important;
          color: white !important;
          border-color: var(--accent, #ef4444) !important;
          font-weight: 600;
        }
        .dqc-select-wrap {
          position: relative;
          width: 110px;
        }
        .dqc-select-wrap select {
          width: 100%;
          appearance: none;
          background: var(--bg-input, #1a1a2a);
          color: var(--text-primary);
          border: 1px solid var(--border, #2a2a3a);
          border-radius: var(--radius-sm, 6px);
          padding: 6px 30px 6px 10px;
          font: inherit;
          font-size: 12.5px;
          outline: none;
          cursor: pointer;
        }
        .dqc-chev {
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          color: var(--text-muted);
        }

        /* Filter panel */
        .dqc-filter-panel {
          position: sticky;
          top: calc(var(--topbar-height, 56px) + 24px);
          padding: 18px 16px;
        }
        .dqc-rules-h {
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          color: var(--text-primary);
          margin-bottom: 14px;
        }
        .dqc-subhead {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-muted);
          margin-bottom: 8px;
          margin-top: 16px;
        }
        .dqc-subhead:first-of-type {
          margin-top: 0;
        }
        .dqc-chk {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 5px 0;
          font-size: 12.5px;
          color: var(--text-secondary);
          cursor: pointer;
          user-select: none;
        }
        .dqc-box {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 18px;
          height: 18px;
          border-radius: 4px;
          border: 1.5px solid var(--border, #2a2a3a);
          background: transparent;
          color: transparent;
          transition: all 0.15s;
          flex-shrink: 0;
        }
        .dqc-chk.on .dqc-box {
          background: var(--accent, #ef4444);
          border-color: var(--accent, #ef4444);
          color: white;
        }
        .dqc-filter-note {
          margin-top: 16px;
          font-size: 12.5px;
          color: var(--text-muted);
          line-height: 1.5;
        }

        /* Download section */
        .dqc-download-section {
          padding: 18px 20px;
        }
        .dqc-dl-row {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .dqc-file-ico {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-sm, 6px);
          background: rgba(255,255,255,0.04);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          flex-shrink: 0;
        }

        /* Btn variants */
        .btn-success {
          background: var(--green, #4ade80);
          color: #000;
        }
        .btn-success:hover:not(:disabled) {
          background: color-mix(in srgb, var(--green, #4ade80), white 10%);
        }
        .btn-success:disabled {
          opacity: 0.4;
          cursor: default;
        }

        .dqc-view .dqc-run-panel {
          margin-bottom: 18px;
        }
        .dqc-view .dqc-section-title,
        .dqc-view .dqc-rules-h {
          color: var(--text-primary);
        }
        .dqc-view .dqc-sub,
        .dqc-view .dqc-stat-head,
        .dqc-view .dqc-stat-sub,
        .dqc-view .dqc-filter-note,
        .dqc-view .dqc-pager-info {
          color: var(--text-muted);
        }
        .dqc-view .dqc-tabs,
        .dqc-view .dqc-pager {
          border-color: var(--border);
        }
        .dqc-view .dqc-tab {
          color: var(--text-muted);
        }
        .dqc-view .dqc-tab.active {
          color: var(--accent);
          border-bottom-color: var(--accent);
        }
        .dqc-view .dqc-tbl thead {
          background: var(--bg-input);
        }
        .dqc-view .dqc-tbl th {
          color: var(--text-muted);
          border-bottom-color: var(--border);
        }
        .dqc-view .dqc-tbl td {
          color: var(--text-secondary);
          border-bottom-color: var(--border);
        }
        .dqc-view .dqc-tbl tbody tr:hover {
          background: var(--accent-soft);
        }
        .dqc-view .dqc-cell-bold {
          color: var(--text-primary);
        }
        .dqc-view .dqc-badge.out-open,
        .dqc-view .dqc-badge.out-closed {
          background: var(--bg-input);
          border-color: var(--border);
          color: var(--text-secondary);
        }
        .dqc-view .dqc-pg {
          background: var(--bg-input);
          border-color: var(--border);
          color: var(--text-secondary);
        }
        .dqc-view .dqc-pg-active {
          background: var(--accent-soft) !important;
          border-color: var(--accent) !important;
          color: var(--accent) !important;
        }
        .dqc-view .dqc-select-wrap select {
          background: var(--bg-input);
          border-color: var(--border);
          color: var(--text-primary);
        }
        .dqc-view .dqc-chk {
          color: var(--text-secondary);
        }
        .dqc-view .dqc-box {
          border-color: var(--border-light);
        }
        .dqc-view .dqc-chk.on .dqc-box {
          background: var(--accent);
          border-color: var(--accent);
        }
        .dqc-view .btn-success {
          background: rgba(74, 222, 128, 0.08);
          border: 1px solid rgba(74, 222, 128, 0.35);
          color: var(--green);
        }
        .dqc-view .btn-success:hover:not(:disabled) {
          background: rgba(74, 222, 128, 0.14);
        }

        /* Responsive */
        @media (max-width: 1100px) {
          .dqc-grid {
            grid-template-columns: 1fr;
          }
          .dqc-stat-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .dqc-filter-panel {
            position: static;
          }
        }
        @media (max-width: 760px) {
          .dqc-stat-grid {
            grid-template-columns: 1fr;
          }
          .dqc-run-panel {
            flex-direction: column;
            align-items: stretch;
          }
          .dqc-dl-row {
            flex-direction: column;
            align-items: stretch;
            gap: 8px;
          }
        }
      `})]})}var Kr=[{label:`Custom`,w:0,h:0},{label:`Marketplace Square 800`,w:800,h:800},{label:`Marketplace Square 1000`,w:1e3,h:1e3},{label:`Marketplace Square 1200`,w:1200,h:1200},{label:`Marketplace Square 1500`,w:1500,h:1500},{label:`Amazon Main 2000`,w:2e3,h:2e3},{label:`Shopify 2048`,w:2048,h:2048},{label:`Web Banner 1920x1080`,w:1920,h:1080},{label:`Print A4 2480x3508`,w:2480,h:3508}],qr=[`1. Read source`,`2. Crop`,`3. AI upscale`,`4. Fit to dimension`,`5. Margin/DPI`,`6. Rename/export`],Jr={ai_expand:`AI Expand uses a generative model and may produce unexpected results on complex backgrounds.`,blur_cover:`Blur cover works best on images with a single dominant subject.`,edge_extend:`Edge extension may create visible artifacts on images with complex borders.`},Yr={ai_canvas_expand:`AI Canvas Expand requires a compatible GPU and may be slow on large batches.`},Xr=`grimoire-image-edit-custom-dimension-presets`,Zr=12,K={inputFolder:``,outputFolder:``,includeSubfolders:!0,preserveStructure:!0,outputMode:`zip`,preset:`Custom`,width:1e3,height:1e3,lockAspect:!0,fitMode:`contain`,marginMode:`default`,marginUnit:`px`,marginL:0,marginT:0,marginR:0,marginB:0,marginBeforeFit:!1,dpi:72,layoutPreset:`manual`,canvasBg:`white`,autoComposeStyle:`centered`,aiExpandPrompt:``,upscaleMode:`none`,standardUpscale:`pillow_lanczos`,clarityEnhance:`auto`,esrganModel:`realesrgan-x4plus`,esrganScale:4,esrganCpuFallback:!1,removeWhiteSpace:!1,autoProductFill:!1,fillRatio:.85,safePadding:!1,requireWhiteBg:!1,rejectPeopleHands:!1,removeSoftShadow:!1,removeBgRembg:!1,bgRemovalMode:`border_white`,maxWorkers:4,outputFormat:`jpg`,quality:92,maxFileSize:0,namingRule:`keep_original`,customTemplate:`{name}_{index}`},Qr=0;function $r(e,t){return{id:++Qr,timestamp:new Date().toLocaleTimeString(`en-GB`,{hour12:!1}),level:e,message:t}}function ei(e){switch(e){case`SUCCESS`:return`var(--green)`;case`WARN`:return`var(--yellow)`;case`ERROR`:return`var(--red)`;default:return`var(--blue)`}}function ti(e,t){switch(e){case`keep_original`:return`photo_001.jpg`;case`sequential`:return`001.jpg, 002.jpg, ...`;case`ean_prefix`:return`4006381_001.jpg`;case`custom_template`:return t.replace(`{name}`,`photo`).replace(`{index}`,`001`).replace(`{ean}`,`4006381`).replace(`{w}`,`1000`).replace(`{h}`,`1000`)+`.jpg`;default:return``}}function ni(e){return e===`local`?`local_folder`:`zip`}function ri(){try{let e=window.localStorage.getItem(Xr);if(!e)return[];let t=JSON.parse(e);return Array.isArray(t)?t.map(e=>({label:String(e?.label||``).trim(),w:Number(e?.w),h:Number(e?.h)})).filter(e=>e.label&&Number.isFinite(e.w)&&Number.isFinite(e.h)&&e.w>0&&e.h>0):[]}catch{return[]}}function ii(e){window.localStorage.setItem(Xr,JSON.stringify(e))}function ai(e,t){switch(e){case`keep_original`:return`{original_stem}`;case`sequential`:return`{index:03d}`;case`ean_prefix`:return`{ean}_{index:03d}`;case`custom_template`:return t||`{name}_{index}`;default:return`{original_stem}`}}function q({label:e,children:t,inline:n}){return(0,W.jsxs)(`label`,{className:`tool-field ${n?`ie-field-inline`:``}`,children:[(0,W.jsx)(`span`,{children:e}),t]})}function oi({value:e,options:t,onChange:n}){return(0,W.jsx)(`div`,{className:`segmented`,children:t.map(t=>(0,W.jsx)(`button`,{className:e===t.value?`active`:``,onClick:()=>n(t.value),children:t.label},t.value))})}function si({value:e,min:t,max:n,onChange:r}){return(0,W.jsxs)(`div`,{className:`ie-stepper`,children:[(0,W.jsx)(`button`,{className:`btn btn-secondary btn-sm`,onClick:()=>r(Math.max(t,e-1)),disabled:e<=t,children:`-`}),(0,W.jsx)(`span`,{className:`ie-stepper-value`,children:e}),(0,W.jsx)(`button`,{className:`btn btn-secondary btn-sm`,onClick:()=>r(Math.min(n,e+1)),disabled:e>=n,children:`+`})]})}function ci(){let{notify:e}=Hn(),[t,n]=(0,_.useState)(K.inputFolder),[r,i]=(0,_.useState)(K.outputFolder),[a,o]=(0,_.useState)([]),[s,c]=(0,_.useState)(K.includeSubfolders),[l,u]=(0,_.useState)(K.preserveStructure),[d,f]=(0,_.useState)(K.outputMode),[p,m]=(0,_.useState)(K.preset),[h,g]=(0,_.useState)(K.width),[v,y]=(0,_.useState)(K.height),[b,x]=(0,_.useState)(K.lockAspect),[S,C]=(0,_.useState)(K.fitMode),[w,ee]=(0,_.useState)(K.marginMode),[T,E]=(0,_.useState)(K.marginUnit),[D,O]=(0,_.useState)(K.marginL),[k,A]=(0,_.useState)(K.marginT),[j,te]=(0,_.useState)(K.marginR),[M,ne]=(0,_.useState)(K.marginB),[N,P]=(0,_.useState)(K.marginBeforeFit),[F,re]=(0,_.useState)(K.dpi),[I,L]=(0,_.useState)(K.layoutPreset),[R,z]=(0,_.useState)(K.canvasBg),[ie,ae]=(0,_.useState)(K.autoComposeStyle),[B,V]=(0,_.useState)(K.aiExpandPrompt),[H,oe]=(0,_.useState)(K.upscaleMode),[se,ce]=(0,_.useState)(K.standardUpscale),[le,ue]=(0,_.useState)(K.clarityEnhance),[de,fe]=(0,_.useState)(K.esrganModel),[pe,me]=(0,_.useState)(K.esrganScale),[he,ge]=(0,_.useState)(K.esrganCpuFallback),[_e,ve]=(0,_.useState)(K.removeWhiteSpace),[ye,be]=(0,_.useState)(K.autoProductFill),[U,xe]=(0,_.useState)(K.fillRatio),[Se,Ce]=(0,_.useState)(K.safePadding),[we,Te]=(0,_.useState)(K.requireWhiteBg),[Ee,De]=(0,_.useState)(K.rejectPeopleHands),[Oe,ke]=(0,_.useState)(K.removeSoftShadow),[Ae,je]=(0,_.useState)(K.removeBgRembg),[Me,Ne]=(0,_.useState)(K.bgRemovalMode),[Pe,Fe]=(0,_.useState)(K.maxWorkers),[Ie,Le]=(0,_.useState)(K.outputFormat),[Re,ze]=(0,_.useState)(K.quality),[Be,Ve]=(0,_.useState)(K.maxFileSize),[He,Ue]=(0,_.useState)(K.namingRule),[We,Ge]=(0,_.useState)(K.customTemplate),[Ke,qe]=(0,_.useState)(()=>ri()),[Je,Ye]=(0,_.useState)(!1),[Xe,Ze]=(0,_.useState)(null),[Qe,$e]=(0,_.useState)([]),[et,tt]=(0,_.useState)([]),[nt,rt]=(0,_.useState)(null),[it,at]=(0,_.useState)([]),ot=(0,_.useRef)(null),st=(0,_.useRef)(null),ct=[...Kr,...Ke],lt=et.find(e=>e.id===nt)||et[0]||null,ut=Ke.some(e=>e.label===p),dt=Jn(Xe,t=>{if(ft(t.status===`completed`?`SUCCESS`:`ERROR`,t.status===`completed`?`Processing complete`:`Job failed: ${t.error||`unknown error`}`),t.status===`completed`){let e={id:`job-${t.id}`,kind:`job`,label:t.original_filename||`Job ${t.id.slice(0,8)}`,jobId:t.id,outputPath:t.output_path,createdAt:new Date().toLocaleTimeString(`en-GB`,{hour12:!1})};tt(t=>{let n=[e,...t.filter(t=>t.id!==e.id)];return n.slice(Zr).forEach(e=>{e.url&&URL.revokeObjectURL(e.url)}),n.slice(0,Zr)}),rt(e.id)}e(t.status===`completed`?`Image edit output ready`:`Image edit failed`,{type:t.status===`completed`?`success`:`error`,message:t.error||t.output_path||void 0})}),ft=(0,_.useCallback)((e,t)=>{at(n=>[...n,$r(e,t)].slice(-500))},[]);(0,_.useEffect)(()=>{ot.current&&(ot.current.scrollTop=ot.current.scrollHeight)},[it]);function pt(e){m(e);let t=ct.find(t=>t.label===e);t&&t.w>0&&(g(t.w),y(t.h))}function mt(){let t=window.prompt(`Preset name`,p===`Custom`?`${h} x ${v}`:p)?.trim();if(!t)return;if(Kr.some(e=>e.label===t)){e(`Use a different preset name`,{type:`warning`,message:`Built-in presets cannot be overwritten.`});return}let n=[{label:t,w:h,h:v},...Ke.filter(e=>e.label!==t)];qe(n),ii(n),m(t),ft(`SUCCESS`,`Saved preset: ${t}`),e(`Custom preset saved`,{type:`success`,message:`${t} (${h} x ${v})`})}function ht(){let t=p,n=Ke.filter(e=>e.label!==t);qe(n),ii(n),m(`Custom`),ft(`INFO`,`Deleted preset: ${t}`),e(`Custom preset deleted`,{type:`info`})}function gt(e){g(e),b&&v>0&&y(e),m(`Custom`)}function _t(e){y(e),b&&h>0&&g(e),m(`Custom`)}function vt(e){if(!e)return;let t=Array.from(e);o(e=>[...e,...t]),n(``),ft(`INFO`,`Added ${t.length} file(s)`)}async function yt(){let e=await Kn(`Select image input folder`,t);e&&(n(e),o([]),$e([]),c(!0),u(!0),ft(`INFO`,`Selected input folder: ${e}`))}function bt(e){$e(t=>t.filter(t=>t.id!==e))}function xt(){let e=w===`custom`?Math.max(D,k,j,M):0,t=Se?8:0,n=Math.round(U*100),r=Ae||Me===`rembg`||Me===`sam2`;return{width:h,height:v,fit_mode:S,layout_preset:I,canvas_background_mode:R,auto_compose_style:I===`auto_compose`?ie:`balanced`,ai_canvas_expand_enabled:I===`ai_canvas_expand`||R===`ai_expand`,ai_canvas_expand_provider:`comfyui`,ai_canvas_expand_prompt:I===`ai_canvas_expand`||R===`ai_expand`?B||`clean commercial product photo background, consistent lighting`:``,margin:e,margin_mode:T===`%`?`percent`:`pixels`,dpi:F,upscale_mode:H,standard_upscale_method:se,clarity_enhance:le,upscale_model:de,upscale_scale:pe,upscale_cpu_fallback:he,crop_to_content:_e,remove_white_space_around_product:_e,auto_product_fill:ye,fill_ratio:ye?U:.88,safe_padding:t,product_fill_enabled:ye,product_fill_ratio:n,product_safe_padding:t,normalize_product_size:ye,product_target_occupancy:ye?U:.88,require_white_bg:we,require_white_background:we,reject_people_hands:Ee,reject_human_parts:Ee,remove_shadow:Oe,remove_background:r,background_removal_mode:r?Me:`border_white`,manual_transform_enabled:I===`canva_manual`,max_workers:Pe,output_format:Ie,output_quality:Re,max_file_size_mb:Be>0?Be:0,naming_rule:ai(He,We),include_subfolders:s,preserve_folder_structure:l,output_mode:ni(d)}}function St(){n(K.inputFolder),i(K.outputFolder),o([]),c(K.includeSubfolders),u(K.preserveStructure),f(K.outputMode),m(K.preset),g(K.width),y(K.height),x(K.lockAspect),C(K.fitMode),ee(K.marginMode),E(K.marginUnit),O(K.marginL),A(K.marginT),te(K.marginR),ne(K.marginB),P(K.marginBeforeFit),re(K.dpi),L(K.layoutPreset),z(K.canvasBg),ae(K.autoComposeStyle),V(K.aiExpandPrompt),oe(K.upscaleMode),ce(K.standardUpscale),ue(K.clarityEnhance),fe(K.esrganModel),me(K.esrganScale),ge(K.esrganCpuFallback),ve(K.removeWhiteSpace),be(K.autoProductFill),xe(K.fillRatio),Ce(K.safePadding),Te(K.requireWhiteBg),De(K.rejectPeopleHands),ke(K.removeSoftShadow),je(K.removeBgRembg),Ne(K.bgRemovalMode),Fe(K.maxWorkers),Le(K.outputFormat),ze(K.quality),Ve(K.maxFileSize),Ue(K.namingRule),Ge(K.customTemplate),$e([]),ft(`INFO`,`All settings reset to defaults`)}async function Ct(){let t=a[0];if(!t){e(`Add at least one image to preview`,{type:`warning`});return}ft(`INFO`,`Previewing: ${t.name}`),Ye(!0);try{let e=new FormData;e.append(`file`,t);let n=xt();for(let[t,r]of Object.entries(n))r!==void 0&&e.append(t,String(r));let r=await fetch(Wn(`/api/image-edit/preview`),{method:`POST`,body:e}).then(e=>{if(!e.ok)throw Error(e.statusText);return e.blob()}),i=URL.createObjectURL(r),a={id:`preview-${Date.now()}`,kind:`preview`,label:t.name,url:i,createdAt:new Date().toLocaleTimeString(`en-GB`,{hour12:!1})};tt(e=>{let t=[a,...e];return t.slice(Zr).forEach(e=>{e.url&&URL.revokeObjectURL(e.url)}),t.slice(0,Zr)}),rt(a.id),ft(`SUCCESS`,`Preview generated`)}catch(t){ft(`ERROR`,`Preview failed: ${t instanceof Error?t.message:String(t)}`),e(`Preview failed`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{Ye(!1)}}async function wt(){let n=xt();Ye(!0),ft(`INFO`,`Starting processing job...`);try{let i;if(a.length>0){let e=new FormData;a.forEach(t=>e.append(`files`,t));for(let[t,r]of Object.entries(n))r!==void 0&&e.append(t,String(r));i=await G(`/api/image-edit/jobs`,{method:`POST`,body:e})}else if(t)i=await G(`/api/image-edit/folder-jobs`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({input_folder_path:t,output_folder_path:r||null,output_mode:ni(d),...n})});else throw Error(`Choose files or an input folder first.`);Ze(i);let o=a.map((e,t)=>({id:`${i.id}-${t}`,file:e,name:e.name,thumbnail:e.type.startsWith(`image/`)?URL.createObjectURL(e):void 0,dimensions:``,progress:0,status:`pending`}));o.length>0&&$e(o),o.length===0&&t&&$e([{id:`${i.id}-folder`,name:t,dimensions:s?`Scanning subfolders`:`Scanning folder`,progress:0,status:`pending`}]),ft(`SUCCESS`,`Job started: ${i.id}`),e(`Image edit job started`,{type:`info`,message:i.id})}catch(t){ft(`ERROR`,`Failed to start: ${t instanceof Error?t.message:String(t)}`),e(`Image edit job failed to start`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{Ye(!1)}}let Tt=a.length,Et=a.length===0&&t.length>0,Dt=Et?`Folder selected${s?` (including subfolders)`:``}`:`${Tt} file${Tt===1?``:`s`} selected`,Ot=a.length>0||t.length>0,kt=I===`ai_canvas_expand`||R===`ai_expand`,At=Jr[R]||Yr[I]||``;return(0,_.useEffect)(()=>{let e=dt?.summary,t=Array.isArray(e?.items)?e.items:[];!dt||t.length===0||$e(t.map((e,t)=>{let n=e,r=String(n.item_id||`${dt.id}-${t+1}`),i=String(n.status||dt.status),a=Math.max(0,Math.min(100,Number(n.progress_percent??(i===`completed`?100:0)))),o=n.width?Number(n.width):null,s=n.height?Number(n.height):null,c=`${i}-${String(n.finished_at_ms||n.progress_percent||a)}`;return{id:r,name:String(n.output_filename||n.original_filename||n.relative_path||`image-${t+1}`),thumbnail:Wn(`/api/jobs/${encodeURIComponent(dt.id)}/items/${encodeURIComponent(r)}/thumbnail?kind=auto&v=${encodeURIComponent(c)}`),dimensions:o&&s?`${o} x ${s}`:``,progress:a,status:i===`completed`?`completed`:i===`failed`||i===`skipped`?`failed`:i===`running`||dt.status===`running`?`running`:`pending`,elapsed:n.elapsed_seconds?`${Math.round(Number(n.elapsed_seconds))}s`:void 0,eta:n.eta_seconds?`${Math.round(Number(n.eta_seconds))}s`:void 0}}))},[dt?.id,dt?.status,dt?.summary]),(0,W.jsxs)(`div`,{className:`view tool-view ie-root`,children:[(0,W.jsxs)(`div`,{className:`view-header`,children:[(0,W.jsx)(`h1`,{children:`Image Edit`}),(0,W.jsx)(`div`,{className:`view-header-actions`,children:(0,W.jsxs)(`span`,{className:`status-online`,children:[(0,W.jsx)(`span`,{className:`dot`}),qn(dt)||`Ready`]})})]}),(0,W.jsxs)(`div`,{className:`ie-columns`,children:[(0,W.jsxs)(`section`,{className:`tool-card ie-left`,children:[(0,W.jsx)(`h2`,{children:`Input`}),(0,W.jsx)(q,{label:`Input folder`,children:(0,W.jsxs)(`div`,{className:`path-picker`,children:[(0,W.jsx)(`input`,{value:t,onChange:e=>n(e.target.value),placeholder:`Path to image folder`}),(0,W.jsx)(`button`,{className:`btn btn-secondary btn-sm`,onClick:yt,children:`Browse`})]})}),(0,W.jsx)(q,{label:`Output folder`,children:(0,W.jsxs)(`div`,{className:`path-picker`,children:[(0,W.jsx)(`input`,{value:r,onChange:e=>i(e.target.value),placeholder:`Optional output path`}),(0,W.jsx)(`button`,{className:`btn btn-secondary btn-sm`,onClick:async()=>i(await Kn(`Select image output folder`,r)),children:`Browse`})]})}),(0,W.jsx)(`input`,{ref:st,type:`file`,multiple:!0,accept:`.jpg,.jpeg,.png,.webp,.tif,.tiff,.bmp,.avif,.zip`,style:{display:`none`},onChange:e=>vt(e.target.files)}),(0,W.jsxs)(`button`,{className:`btn btn-secondary ie-add-btn`,onClick:()=>st.current?.click(),children:[(0,W.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,width:`16`,height:`16`,children:[(0,W.jsx)(`line`,{x1:`12`,y1:`5`,x2:`12`,y2:`19`}),(0,W.jsx)(`line`,{x1:`5`,y1:`12`,x2:`19`,y2:`12`})]}),`Add`]}),(0,W.jsxs)(`div`,{className:`ie-source-card`,children:[(0,W.jsx)(`strong`,{children:`Source`}),(0,W.jsx)(`span`,{children:Dt}),a.length>0&&(0,W.jsxs)(`div`,{className:`ie-file-list`,children:[a.slice(0,8).map((e,t)=>(0,W.jsxs)(`div`,{className:`ie-file-tag`,children:[(0,W.jsx)(`span`,{title:e.name,children:e.name}),(0,W.jsx)(`button`,{onClick:()=>o(e=>e.filter((e,n)=>n!==t)),children:`x`})]},`${e.name}-${t}`)),a.length>8&&(0,W.jsxs)(`span`,{className:`muted`,children:[`+`,a.length-8,` more`]})]}),Et&&(0,W.jsx)(`div`,{className:`ie-file-list`,children:(0,W.jsxs)(`div`,{className:`ie-file-tag`,children:[(0,W.jsx)(`span`,{title:t,children:t}),(0,W.jsx)(`button`,{onClick:()=>n(``),children:`x`})]})})]}),(0,W.jsxs)(`label`,{className:`check-row`,children:[(0,W.jsx)(`input`,{type:`checkbox`,checked:s,onChange:e=>c(e.target.checked)}),`Include subfolders`]}),(0,W.jsxs)(`label`,{className:`check-row`,children:[(0,W.jsx)(`input`,{type:`checkbox`,checked:l,onChange:e=>u(e.target.checked)}),`Preserve folder structure`]}),(0,W.jsx)(q,{label:`Output mode`,children:(0,W.jsx)(oi,{value:d,options:[{label:`Local`,value:`local`},{label:`ZIP`,value:`zip`}],onChange:f})})]}),(0,W.jsxs)(`section`,{className:`tool-card ie-middle`,children:[(0,W.jsx)(`h2`,{children:`Processing`}),(0,W.jsx)(`div`,{className:`ie-pipeline`,children:qr.map((e,t)=>(0,W.jsx)(`span`,{className:`ie-pipeline-step`,children:e},t))}),(0,W.jsxs)(`div`,{className:`ie-scroll-area`,children:[(0,W.jsx)(q,{label:`Dimension Preset`,children:(0,W.jsxs)(`div`,{className:`ie-preset-row`,children:[(0,W.jsx)(`select`,{value:p,onChange:e=>pt(e.target.value),children:ct.map(e=>(0,W.jsx)(`option`,{value:e.label,children:e.label},e.label))}),(0,W.jsx)(`button`,{className:`btn btn-secondary btn-sm`,onClick:mt,children:`Save`}),ut&&(0,W.jsx)(`button`,{className:`btn btn-secondary btn-sm`,onClick:ht,children:`Delete`})]})}),(0,W.jsxs)(`div`,{className:`ie-dim-row`,children:[(0,W.jsx)(q,{label:`Width`,children:(0,W.jsx)(`input`,{type:`number`,min:1,value:h,onChange:e=>gt(Number(e.target.value))})}),(0,W.jsx)(`button`,{className:`btn btn-sm ie-lock-btn ${b?`active`:``}`,title:b?`Unlock aspect ratio`:`Lock aspect ratio`,onClick:()=>x(!b),children:(0,W.jsx)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,width:`16`,height:`16`,children:b?(0,W.jsxs)(W.Fragment,{children:[(0,W.jsx)(`rect`,{x:`3`,y:`11`,width:`18`,height:`11`,rx:`2`}),(0,W.jsx)(`path`,{d:`M7 11V7a5 5 0 0110 0v4`})]}):(0,W.jsxs)(W.Fragment,{children:[(0,W.jsx)(`rect`,{x:`3`,y:`11`,width:`18`,height:`11`,rx:`2`}),(0,W.jsx)(`path`,{d:`M7 11V7a5 5 0 019.9-1`})]})})}),(0,W.jsx)(q,{label:`Height`,children:(0,W.jsx)(`input`,{type:`number`,min:1,value:v,onChange:e=>_t(Number(e.target.value))})})]}),(0,W.jsx)(q,{label:`Fit Mode`,children:(0,W.jsx)(oi,{value:S,options:[{label:`Contain`,value:`contain`},{label:`Cover`,value:`cover`},{label:`Stretch`,value:`stretch`}],onChange:C})}),(0,W.jsx)(`div`,{className:`ie-section-label`,children:`Margins`}),(0,W.jsxs)(`div`,{className:`tool-row`,children:[(0,W.jsx)(q,{label:`Mode`,children:(0,W.jsxs)(`select`,{value:w,onChange:e=>ee(e.target.value),children:[(0,W.jsx)(`option`,{value:`default`,children:`Default`}),(0,W.jsx)(`option`,{value:`custom`,children:`Custom`})]})}),(0,W.jsx)(q,{label:`Unit`,children:(0,W.jsx)(oi,{value:T,options:[{label:`px`,value:`px`},{label:`%`,value:`%`}],onChange:E})})]}),w===`custom`&&(0,W.jsxs)(`div`,{className:`ie-margin-grid`,children:[(0,W.jsx)(q,{label:`L`,children:(0,W.jsx)(`input`,{type:`number`,min:0,value:D,onChange:e=>O(Number(e.target.value))})}),(0,W.jsx)(q,{label:`T`,children:(0,W.jsx)(`input`,{type:`number`,min:0,value:k,onChange:e=>A(Number(e.target.value))})}),(0,W.jsx)(q,{label:`R`,children:(0,W.jsx)(`input`,{type:`number`,min:0,value:j,onChange:e=>te(Number(e.target.value))})}),(0,W.jsx)(q,{label:`B`,children:(0,W.jsx)(`input`,{type:`number`,min:0,value:M,onChange:e=>ne(Number(e.target.value))})})]}),(0,W.jsxs)(`label`,{className:`check-row`,children:[(0,W.jsx)(`input`,{type:`checkbox`,checked:N,onChange:e=>P(e.target.checked)}),`Apply margin before fit`]}),(0,W.jsx)(q,{label:`DPI`,children:(0,W.jsx)(`input`,{type:`number`,min:1,max:1200,value:F,onChange:e=>re(Number(e.target.value))})}),(0,W.jsx)(q,{label:`Layout Preset`,children:(0,W.jsxs)(`select`,{value:I,onChange:e=>L(e.target.value),children:[(0,W.jsx)(`option`,{value:`manual`,children:`Manual`}),(0,W.jsx)(`option`,{value:`canva_fill`,children:`Canva Fill`}),(0,W.jsx)(`option`,{value:`object_aware_canvas`,children:`Object-aware canvas`}),(0,W.jsx)(`option`,{value:`canva_manual`,children:`Canva Manual`}),(0,W.jsx)(`option`,{value:`auto_compose`,children:`Auto Compose`}),(0,W.jsx)(`option`,{value:`ai_canvas_expand`,children:`AI Canvas Expand`})]})}),(0,W.jsx)(q,{label:`Canvas Background`,children:(0,W.jsxs)(`select`,{value:R,onChange:e=>z(e.target.value),children:[(0,W.jsx)(`option`,{value:`white`,children:`White`}),(0,W.jsx)(`option`,{value:`smart`,children:`Smart Auto`}),(0,W.jsx)(`option`,{value:`edge_extend`,children:`Extend edges`}),(0,W.jsx)(`option`,{value:`blur_cover`,children:`Blur cover`}),(0,W.jsx)(`option`,{value:`ai_expand`,children:`AI Expand`})]})}),At&&(0,W.jsx)(`div`,{className:`ie-warning`,children:At}),I===`auto_compose`&&(0,W.jsx)(q,{label:`Auto Compose Style`,children:(0,W.jsxs)(`select`,{value:ie,onChange:e=>ae(e.target.value),children:[(0,W.jsx)(`option`,{value:`centered`,children:`Centered`}),(0,W.jsx)(`option`,{value:`rule_of_thirds`,children:`Rule of Thirds`}),(0,W.jsx)(`option`,{value:`product_hero`,children:`Product Hero`}),(0,W.jsx)(`option`,{value:`lifestyle`,children:`Lifestyle`})]})}),kt&&(0,W.jsx)(q,{label:`AI Expand Prompt`,children:(0,W.jsx)(`input`,{value:B,onChange:e=>V(e.target.value),placeholder:`Describe desired background...`})}),(0,W.jsx)(`div`,{className:`ie-section-label`,children:`AI Upscale`}),(0,W.jsx)(q,{label:`Upscale Engine`,children:(0,W.jsxs)(`select`,{value:H,onChange:e=>oe(e.target.value),children:[(0,W.jsx)(`option`,{value:`none`,children:`None`}),(0,W.jsx)(`option`,{value:`real_esrgan_ncnn`,children:`Real-ESRGAN (NCNN)`})]})}),H===`none`?(0,W.jsxs)(W.Fragment,{children:[(0,W.jsx)(q,{label:`Standard Upscale`,children:(0,W.jsxs)(`select`,{value:se,onChange:e=>ce(e.target.value),children:[(0,W.jsx)(`option`,{value:`pillow_lanczos`,children:`Pillow Lanczos`}),(0,W.jsx)(`option`,{value:`pillow_bicubic`,children:`Pillow Bicubic`}),(0,W.jsx)(`option`,{value:`opencv_lanczos4`,children:`OpenCV Lanczos4`}),(0,W.jsx)(`option`,{value:`opencv_cubic`,children:`OpenCV Cubic`})]})}),(0,W.jsx)(q,{label:`Clarity Enhance`,children:(0,W.jsxs)(`select`,{value:le,onChange:e=>ue(e.target.value),children:[(0,W.jsx)(`option`,{value:`auto`,children:`Auto`}),(0,W.jsx)(`option`,{value:`none`,children:`None`}),(0,W.jsx)(`option`,{value:`light`,children:`Light`}),(0,W.jsx)(`option`,{value:`medium`,children:`Medium`}),(0,W.jsx)(`option`,{value:`strong`,children:`Strong`})]})})]}):(0,W.jsxs)(W.Fragment,{children:[(0,W.jsx)(q,{label:`Model`,children:(0,W.jsxs)(`select`,{value:de,onChange:e=>fe(e.target.value),children:[(0,W.jsx)(`option`,{value:`realesrgan-x4plus`,children:`realesrgan-x4plus`}),(0,W.jsx)(`option`,{value:`realesrgan-x4plus-anime`,children:`realesrgan-x4plus-anime`}),(0,W.jsx)(`option`,{value:`realesr-animevideov3`,children:`realesr-animevideov3`})]})}),(0,W.jsx)(q,{label:`Scale`,children:(0,W.jsx)(oi,{value:String(pe),options:[{label:`2x`,value:`2`},{label:`3x`,value:`3`},{label:`4x`,value:`4`}],onChange:e=>me(Number(e))})}),(0,W.jsxs)(`label`,{className:`check-row`,children:[(0,W.jsx)(`input`,{type:`checkbox`,checked:he,onChange:e=>ge(e.target.checked)}),`CPU Fallback`]})]}),(0,W.jsx)(`div`,{className:`ie-section-label`,children:`Image Filters`}),(0,W.jsxs)(`div`,{className:`ie-filter-grid`,children:[(0,W.jsxs)(`label`,{className:`check-row`,children:[(0,W.jsx)(`input`,{type:`checkbox`,checked:_e,onChange:e=>ve(e.target.checked)}),`Remove white space`]}),(0,W.jsxs)(`label`,{className:`check-row`,children:[(0,W.jsx)(`input`,{type:`checkbox`,checked:ye,onChange:e=>be(e.target.checked)}),`Auto product fill`]}),ye&&(0,W.jsx)(q,{label:`Fill ratio: ${Math.round(U*100)}%`,children:(0,W.jsx)(`input`,{type:`range`,min:.3,max:1,step:.01,value:U,onChange:e=>xe(Number(e.target.value)),className:`ie-slider`})}),(0,W.jsxs)(`label`,{className:`check-row`,children:[(0,W.jsx)(`input`,{type:`checkbox`,checked:Se,onChange:e=>Ce(e.target.checked)}),`Safe padding`]}),(0,W.jsxs)(`label`,{className:`check-row`,children:[(0,W.jsx)(`input`,{type:`checkbox`,checked:we,onChange:e=>Te(e.target.checked)}),`Require white background`]}),(0,W.jsxs)(`label`,{className:`check-row`,children:[(0,W.jsx)(`input`,{type:`checkbox`,checked:Ee,onChange:e=>De(e.target.checked)}),`Reject people/hands`]}),(0,W.jsxs)(`label`,{className:`check-row`,children:[(0,W.jsx)(`input`,{type:`checkbox`,checked:Oe,onChange:e=>ke(e.target.checked)}),`Remove soft shadow`]}),(0,W.jsxs)(`label`,{className:`check-row`,children:[(0,W.jsx)(`input`,{type:`checkbox`,checked:Ae,onChange:e=>je(e.target.checked)}),`Remove background (rembg)`]}),Ae&&(0,W.jsx)(q,{label:`BG Mode`,children:(0,W.jsxs)(`select`,{value:Me,onChange:e=>Ne(e.target.value),children:[(0,W.jsx)(`option`,{value:`border_white`,children:`Border white`}),(0,W.jsx)(`option`,{value:`rembg`,children:`rembg`}),(0,W.jsx)(`option`,{value:`sam2`,children:`SAM2`})]})})]}),(0,W.jsx)(q,{label:`Max Workers`,children:(0,W.jsx)(si,{value:Pe,min:1,max:16,onChange:Fe})}),(0,W.jsx)(`div`,{className:`ie-section-label`,children:`Output`}),(0,W.jsxs)(`div`,{className:`tool-row`,children:[(0,W.jsx)(q,{label:`Format`,children:(0,W.jsxs)(`select`,{value:Ie,onChange:e=>Le(e.target.value),children:[(0,W.jsx)(`option`,{value:`jpg`,children:`JPG`}),(0,W.jsx)(`option`,{value:`png`,children:`PNG`}),(0,W.jsx)(`option`,{value:`webp`,children:`WEBP`}),(0,W.jsx)(`option`,{value:`tiff`,children:`TIFF`})]})}),(0,W.jsx)(q,{label:`Quality`,children:(0,W.jsx)(`input`,{type:`number`,min:1,max:100,value:Re,onChange:e=>ze(Number(e.target.value))})})]}),(0,W.jsx)(q,{label:`Max File Size (MB)`,children:(0,W.jsx)(`input`,{type:`number`,min:0,step:.1,value:Be,onChange:e=>Ve(Number(e.target.value)),placeholder:`0 = no limit`})}),(0,W.jsx)(`div`,{className:`ie-section-label`,children:`Naming`}),(0,W.jsx)(q,{label:`Naming Rule`,children:(0,W.jsxs)(`select`,{value:He,onChange:e=>Ue(e.target.value),children:[(0,W.jsx)(`option`,{value:`keep_original`,children:`Keep original`}),(0,W.jsx)(`option`,{value:`sequential`,children:`Sequential`}),(0,W.jsx)(`option`,{value:`ean_prefix`,children:`EAN prefix`}),(0,W.jsx)(`option`,{value:`custom_template`,children:`Custom template`})]})}),He===`custom_template`&&(0,W.jsx)(q,{label:`Template`,children:(0,W.jsx)(`input`,{value:We,onChange:e=>Ge(e.target.value),placeholder:`{name}_{index}`})}),(0,W.jsxs)(`div`,{className:`ie-naming-preview`,children:[`Preview: `,(0,W.jsx)(`code`,{children:ti(He,We)})]})]}),(0,W.jsxs)(`div`,{className:`ie-footer`,children:[(0,W.jsx)(`button`,{className:`btn btn-secondary`,onClick:St,children:`Reset`}),(0,W.jsx)(`button`,{className:`btn btn-secondary`,onClick:Ct,disabled:Je||a.length===0,children:`Preview (First 1)`}),(0,W.jsx)(`button`,{className:`btn btn-primary`,onClick:wt,disabled:Je||!Ot,children:`Start Processing`})]})]}),(0,W.jsxs)(`section`,{className:`tool-card ie-right`,children:[(0,W.jsxs)(`div`,{className:`ie-queue-header`,children:[(0,W.jsx)(`h2`,{children:`Job Queue`}),(0,W.jsx)(`span`,{className:`ie-queue-count`,children:Qe.length})]}),(0,W.jsxs)(`div`,{className:`ie-queue-list`,children:[Qe.length===0&&(0,W.jsx)(`div`,{className:`empty-box`,children:`No jobs queued yet.`}),Qe.map((e,t)=>(0,W.jsxs)(`div`,{className:`ie-queue-item ie-q-${e.status}`,children:[(0,W.jsx)(`div`,{className:`ie-q-thumb`,children:e.thumbnail?(0,W.jsx)(`img`,{src:e.thumbnail,alt:``}):(0,W.jsx)(`div`,{className:`ie-q-thumb-placeholder`})}),(0,W.jsxs)(`div`,{className:`ie-q-info`,children:[(0,W.jsxs)(`div`,{className:`ie-q-name`,children:[(0,W.jsx)(`span`,{className:`ie-q-index`,children:t+1}),(0,W.jsx)(`span`,{title:e.name,children:e.name})]}),e.dimensions&&(0,W.jsx)(`span`,{className:`ie-q-dims`,children:e.dimensions}),(0,W.jsx)(`div`,{className:`ie-q-progress-bar`,children:(0,W.jsx)(`div`,{className:`ie-q-progress-fill`,style:{width:`${e.progress}%`}})}),(0,W.jsxs)(`div`,{className:`ie-q-meta`,children:[(0,W.jsxs)(`span`,{children:[e.progress,`%`]}),e.elapsed&&(0,W.jsx)(`span`,{children:e.elapsed}),e.eta&&(0,W.jsxs)(`span`,{children:[`ETA: `,e.eta]})]})]}),(0,W.jsx)(`button`,{className:`ie-q-remove`,title:`Remove`,onClick:()=>bt(e.id),children:`x`})]},e.id))]}),(0,W.jsxs)(`div`,{className:`ie-output-header`,children:[(0,W.jsx)(`h2`,{children:`Outputs`}),(0,W.jsx)(`span`,{className:`ie-queue-count`,children:et.length})]}),(0,W.jsxs)(`div`,{className:`ie-output-list`,children:[et.length===0&&(0,W.jsx)(`div`,{className:`empty-box`,children:`No outputs yet.`}),et.map(e=>(0,W.jsxs)(`button`,{className:`ie-output-item ${lt?.id===e.id?`active`:``}`,onClick:()=>rt(e.id),children:[(0,W.jsx)(`span`,{children:e.kind===`preview`?`Preview`:`Job`}),(0,W.jsx)(`strong`,{title:e.outputPath||e.label,children:e.label}),(0,W.jsx)(`em`,{children:e.createdAt})]},e.id))]}),(0,W.jsx)(`div`,{className:`ie-preview-frame`,children:lt?.url?(0,W.jsx)(`img`,{src:lt.url,alt:`Preview output`}):lt?.kind===`job`?(0,W.jsx)(`div`,{className:`empty-box`,children:`Job output is ready to download.`}):(0,W.jsx)(`div`,{className:`empty-box`,children:`Output preview will appear here.`})}),lt?.kind===`job`&&lt.jobId&&(0,W.jsxs)(`a`,{className:`btn btn-primary ie-download-btn`,href:Wn(`/api/jobs/${encodeURIComponent(lt.jobId)}/download`),target:`_blank`,rel:`noreferrer`,children:[(0,W.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,width:`16`,height:`16`,children:[(0,W.jsx)(`path`,{d:`M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4`}),(0,W.jsx)(`polyline`,{points:`7 10 12 15 17 10`}),(0,W.jsx)(`line`,{x1:`12`,y1:`15`,x2:`12`,y2:`3`})]}),`Download`]})]})]}),(0,W.jsxs)(`div`,{className:`ie-console`,children:[(0,W.jsxs)(`div`,{className:`ie-console-header`,children:[(0,W.jsxs)(`div`,{className:`ie-console-title`,children:[(0,W.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,width:`16`,height:`16`,children:[(0,W.jsx)(`polyline`,{points:`4 17 10 11 4 5`}),(0,W.jsx)(`line`,{x1:`12`,y1:`19`,x2:`20`,y2:`19`})]}),`Console`]}),(0,W.jsx)(`button`,{className:`btn btn-secondary btn-sm`,onClick:()=>at([]),children:`Clear`})]}),(0,W.jsxs)(`div`,{className:`ie-console-body`,ref:ot,children:[it.length===0&&(0,W.jsx)(`div`,{className:`empty-box`,style:{padding:`12px`},children:`No log entries yet.`}),it.map(e=>(0,W.jsxs)(`div`,{className:`ie-log-entry`,children:[(0,W.jsx)(`span`,{className:`ie-log-time`,children:e.timestamp}),(0,W.jsx)(`span`,{className:`ie-log-level`,style:{color:ei(e.level)},children:e.level}),(0,W.jsx)(`span`,{className:`ie-log-msg`,children:e.message})]},e.id))]})]})]})}function li(e){return e<1024?`${e} B`:e<1024*1024?`${(e/1024).toFixed(1)} KB`:`${(e/1024/1024).toFixed(2)} MB`}function ui(e){return Wn(`/api/images-check/file?path=${encodeURIComponent(e)}`)}function di(e){return Wn(`/api/images-check/thumb?path=${encodeURIComponent(e)}`)}function fi(e){let t=e.replace(/\\/g,`/`),n=t.lastIndexOf(`/`);return n>=0?t.slice(0,n):`.`}function pi(e){if(e===`.`)return`Root folder`;let t=e.split(`/`).filter(Boolean);return t[t.length-1]||e}function mi(){let{notify:e}=Hn(),[t,n]=(0,_.useState)(``),[r,i]=(0,_.useState)(``),[a,o]=(0,_.useState)([]),[s,c]=(0,_.useState)(new Set),[l,u]=(0,_.useState)(!1),[d,f]=(0,_.useState)(``),[p,m]=(0,_.useState)(`slideshow`),[h,g]=(0,_.useState)(null),v=(0,_.useMemo)(()=>{let e=d.trim().toLowerCase();return e?a.filter(t=>`${t.name} ${t.relativePath} ${t.extension}`.toLowerCase().includes(e)):a},[a,d]),y=(0,_.useMemo)(()=>{let e=new Map;for(let t of v){let n=fi(t.relativePath),r=e.get(n);r?r.push(t):e.set(n,[t])}return Array.from(e.entries()).map(([e,t])=>({folder:e,label:pi(e),images:t}))},[v]),b=a.length-s.size;async function x(){let e=await Kn(`Select folder to check images`,t);e&&(n(e),await S(e))}async function S(r=t){if(!r){e(`Choose a folder first`,{type:`warning`});return}u(!0);try{let t=await G(`/api/images-check/scan`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({folder:r})});i(t.root),n(t.root),o(t.images),c(new Set),localStorage.setItem(`grimoire-images-check-root`,t.root),e(`Images scan complete`,{type:`success`,message:`${t.count} image files found across ${new Set(t.images.map(e=>fi(e.relativePath))).size} folder(s)`})}catch(t){e(`Images scan failed`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{u(!1)}}function C(e){c(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n})}async function w(){if(!r||s.size===0)return;let t=a.filter(e=>s.has(e.id));if(window.confirm(`Delete ${t.length} image file(s) permanently? This cannot be undone.`)){u(!0);try{let n=await G(`/api/images-check/delete`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({root:r,paths:t.map(e=>e.path)})});c(new Set),e(`Images deleted`,{type:n.errors.length?`warning`:`success`,message:`${n.deletedCount} deleted, ${n.errors.length} errors`}),await S(r)}catch(t){e(`Delete failed`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{u(!1)}}}function ee(){if(r){if(window.__grimoire?.revealInExplorer){window.__grimoire.revealInExplorer(r);return}G(`/api/local/reveal`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({path:r})})}}function T(e,t){let n=s.has(e.id),r=fi(e.relativePath);return(0,W.jsxs)(`article`,{className:`ic-tile ${t}${n?` delete`:``}`,onMouseEnter:t=>{let n=t.currentTarget.getBoundingClientRect();g({image:e,x:n.right,y:n.top})},onMouseLeave:()=>g(null),children:[(0,W.jsxs)(`button`,{className:`ic-img-btn`,onClick:()=>C(e.id),title:n?`Restore image`:`Mark for deletion`,children:[(0,W.jsx)(`img`,{src:di(e.path),alt:e.name,loading:`lazy`,decoding:`async`}),(0,W.jsx)(`span`,{className:`ic-info`,children:`i`}),t===`slideshow`&&(0,W.jsx)(`span`,{className:`ic-mark`,children:n?`Delete`:`Keep`})]}),(0,W.jsxs)(`div`,{className:`ic-card-meta`,children:[(0,W.jsx)(`strong`,{children:e.name}),(0,W.jsx)(`span`,{children:r}),(0,W.jsxs)(`span`,{children:[e.width,`x`,e.height,` - `,li(e.sizeBytes)]})]}),t===`gallery`&&(0,W.jsxs)(`div`,{className:`ic-card-actions`,children:[(0,W.jsx)(`button`,{className:n?``:`active keep`,onClick:()=>n&&C(e.id),children:`Keep`}),(0,W.jsx)(`button`,{className:n?`active delete`:``,onClick:()=>!n&&C(e.id),children:`Delete`})]})]},e.id)}return(0,W.jsxs)(`div`,{className:`view images-check-view`,children:[(0,W.jsxs)(`section`,{className:`ic-shell`,children:[(0,W.jsxs)(`div`,{className:`ic-head`,children:[(0,W.jsx)(`button`,{className:`ic-close`,title:`Images Check`,children:`x`}),(0,W.jsxs)(`div`,{children:[(0,W.jsx)(`h1`,{children:`IMAGES CHECK`}),(0,W.jsx)(`p`,{children:`Scan every image inside a folder tree, keep the good files, and permanently delete rejected files.`})]}),(0,W.jsxs)(`div`,{className:`ic-mode`,children:[(0,W.jsx)(`button`,{className:p===`slideshow`?`active`:``,onClick:()=>m(`slideshow`),children:`Slideshow`}),(0,W.jsx)(`button`,{className:p===`gallery`?`active`:``,onClick:()=>m(`gallery`),children:`Gallery`})]})]}),(0,W.jsxs)(`div`,{className:`ic-toolbar`,children:[(0,W.jsxs)(`div`,{className:`path-picker ic-path`,children:[(0,W.jsx)(`input`,{value:t,onChange:e=>n(e.target.value),placeholder:`Select folder with images`}),(0,W.jsx)(`button`,{className:`btn btn-secondary`,onClick:x,disabled:l,children:`Choose folder`}),(0,W.jsx)(`button`,{className:`btn btn-primary`,onClick:()=>S(),disabled:l||!t,children:l?`Scanning...`:`Scan all`})]}),(0,W.jsx)(`input`,{className:`inline-search ic-filter`,value:d,onChange:e=>f(e.target.value),placeholder:`Filter image name, folder, or path`})]}),(0,W.jsxs)(`div`,{className:`ic-summary`,children:[(0,W.jsxs)(`div`,{children:[(0,W.jsx)(`span`,{children:`Total`}),(0,W.jsx)(`strong`,{children:a.length})]}),(0,W.jsxs)(`div`,{children:[(0,W.jsx)(`span`,{children:`Folders`}),(0,W.jsx)(`strong`,{children:y.length})]}),(0,W.jsxs)(`div`,{children:[(0,W.jsx)(`span`,{children:`Keep`}),(0,W.jsx)(`strong`,{children:b})]}),(0,W.jsxs)(`div`,{children:[(0,W.jsx)(`span`,{children:`Delete`}),(0,W.jsx)(`strong`,{className:`danger`,children:s.size})]}),(0,W.jsx)(`button`,{className:`btn btn-secondary`,onClick:ee,disabled:!r,children:`Open folder`}),(0,W.jsx)(`button`,{className:`btn btn-danger`,onClick:w,disabled:l||s.size===0,children:`Save deletion`})]}),p===`slideshow`?(0,W.jsxs)(`div`,{className:`ic-folder-stack slideshow`,children:[y.length===0&&(0,W.jsxs)(`button`,{className:`ic-upload-card`,onClick:x,disabled:l,children:[(0,W.jsx)(`span`,{children:`+`}),(0,W.jsx)(`strong`,{children:`Choose a folder to scan every image inside it`})]}),y.map((e,t)=>(0,W.jsxs)(`section`,{className:`ic-folder-section`,children:[(0,W.jsxs)(`div`,{className:`ic-folder-head`,children:[(0,W.jsxs)(`div`,{children:[(0,W.jsx)(`strong`,{children:e.label}),(0,W.jsx)(`span`,{children:e.folder})]}),(0,W.jsxs)(`em`,{children:[e.images.length,` images`]})]}),(0,W.jsxs)(`div`,{className:`ic-grid slideshow`,children:[t===0&&(0,W.jsxs)(`button`,{className:`ic-upload-card`,onClick:x,disabled:l,children:[(0,W.jsx)(`span`,{children:`+`}),(0,W.jsx)(`strong`,{children:`Choose another folder or rescan current output`})]}),e.images.map(e=>T(e,`slideshow`))]})]},e.folder))]}):(0,W.jsx)(`div`,{className:`ic-gallery-groups`,children:y.map(e=>(0,W.jsxs)(`section`,{className:`ic-gallery-folder`,children:[(0,W.jsxs)(`div`,{className:`ic-folder-head`,children:[(0,W.jsxs)(`div`,{children:[(0,W.jsx)(`strong`,{children:e.label}),(0,W.jsx)(`span`,{children:e.folder})]}),(0,W.jsxs)(`em`,{children:[e.images.length,` images / `,e.images.filter(e=>s.has(e.id)).length,` delete`]})]}),(0,W.jsx)(`div`,{className:`ic-gallery-strip`,children:e.images.map(e=>T(e,`gallery`))})]},e.folder))}),a.length===0&&(0,W.jsx)(`div`,{className:`ic-empty`,children:`No scan yet. Choose a folder to inspect every image across all subfolders.`})]}),h&&(0,W.jsxs)(`div`,{className:`ic-hover`,style:{left:Math.min(h.x+18,window.innerWidth-360),top:Math.min(h.y+18,window.innerHeight-430)},children:[(0,W.jsx)(`img`,{src:ui(h.image.path),alt:h.image.name}),(0,W.jsxs)(`div`,{className:`ic-hover-meta`,children:[(0,W.jsx)(`strong`,{children:h.image.name}),(0,W.jsxs)(`span`,{children:[h.image.width,` x `,h.image.height]}),(0,W.jsx)(`span`,{children:li(h.image.sizeBytes)}),(0,W.jsxs)(`span`,{children:[`Folder: `,fi(h.image.relativePath)]}),(0,W.jsx)(`span`,{children:h.image.relativePath})]})]})]})}var hi=240,gi=8,_i=[],vi=0;function yi(){if(vi>=gi)return;let e=_i.shift();e&&(vi+=1,e())}function bi(e){return new Promise((t,n)=>{_i.push(()=>{e().then(t).catch(n).finally(()=>{vi=Math.max(0,vi-1),yi()})}),yi()})}function xi(e){return e<1024?`${e} B`:e<1024*1024?`${(e/1024).toFixed(1)} KB`:`${(e/1024/1024).toFixed(2)} MB`}function Si(e){return Wn(`/api/packshot-browser/thumb?path=${encodeURIComponent(e)}`)}function Ci(e){return Wn(`/api/packshot-browser/shell-thumb?path=${encodeURIComponent(e)}`)}function wi(e){return Wn(`/api/packshot-browser/online-thumb?path=${encodeURIComponent(e)}`)}function Ti(e){return e.oneDriveState===`cloud-only`}async function J(e,t){for(let n of e)try{let e=await fetch(n,{signal:t});if(!e.ok)continue;let r=await e.blob();if(!r.type.startsWith(`image/`)&&r.size<512)continue;return URL.createObjectURL(r)}catch{if(t.aborted)return null}return null}function Ei({image:e,selected:t,onToggle:n,onHover:r,onLeave:i}){let a=(0,_.useRef)(null),[o,s]=(0,_.useState)(!1),[c,l]=(0,_.useState)(null),[u,d]=(0,_.useState)(!1);return(0,_.useEffect)(()=>{let e=a.current;if(!e)return;let t=new IntersectionObserver(e=>{e.some(e=>e.isIntersecting)&&(s(!0),t.disconnect())},{rootMargin:`700px 0px`});return t.observe(e),()=>t.disconnect()},[]),(0,_.useEffect)(()=>{if(!o||c||u)return;let t=new AbortController,n=Ti(e)?[Ci(e.path),wi(e.path)]:[Si(e.path)];return bi(()=>J(n,t.signal)).then(e=>{!t.signal.aborted&&e&&l(e),!t.signal.aborted&&!e&&d(!0)}).catch(()=>{t.signal.aborted||d(!0)}),()=>{t.abort()}},[o,e.path,e.oneDriveState,c,u]),(0,_.useEffect)(()=>()=>{c&&URL.revokeObjectURL(c)},[c]),(0,W.jsxs)(`button`,{ref:a,className:`pb-thumb-btn`,onClick:n,onMouseEnter:r,onMouseLeave:i,title:t?`Unselect image`:`Select image`,children:[c?(0,W.jsx)(`img`,{src:c,alt:e.name,decoding:`async`}):(0,W.jsxs)(`div`,{className:`pb-thumb-placeholder${u?` failed`:``}`,children:[(0,W.jsx)(`span`,{children:e.extension.replace(`.`,``).toUpperCase()}),(0,W.jsx)(`strong`,{children:u?`No thumbnail`:`Loading`})]}),(0,W.jsx)(`span`,{className:`pb-check`,children:t?`Selected`:`Select`}),(0,W.jsx)(`span`,{className:`pb-cloud ${e.oneDriveState}`,children:Ti(e)?`Cloud`:`Local`})]})}function Di(){let{notify:e}=Hn(),[t,n]=(0,_.useState)(``),[r,i]=(0,_.useState)(``),[a,o]=(0,_.useState)([]),[s,c]=(0,_.useState)(`.`),[l,u]=(0,_.useState)([]),[d,f]=(0,_.useState)(``),[p,m]=(0,_.useState)(0),[h,g]=(0,_.useState)(!1),[v,y]=(0,_.useState)(new Set),[b,x]=(0,_.useState)(``),[S,C]=(0,_.useState)(!0),[w,ee]=(0,_.useState)(!1),[T,E]=(0,_.useState)(!1),[D,O]=(0,_.useState)(!1),[k,A]=(0,_.useState)(null),[j,te]=(0,_.useState)({}),[M,ne]=(0,_.useState)(null),N=(0,_.useMemo)(()=>a.find(e=>e.path===s)??null,[a,s]),P=a.find(e=>e.path===`.`)?.count??0;async function F(){let e=await Kn(`Select packshot source folder`,t);e&&(n(e),await I(e))}async function re(){let e=await Kn(`Select output folder`,b||r);e&&x(e)}async function I(r=t){if(!r){e(`Choose a source folder first`,{type:`warning`});return}E(!0),ne(null);try{let t=await G(`/api/packshot-browser/scan`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({folder:r})});i(t.root),n(t.root),o(t.folders||[]),y(new Set),c(`.`),f(``),u([]),m(0),g(!1),localStorage.setItem(`grimoire-packshot-browser-root`,t.root),e(`Packshot index ready`,{type:`success`,message:`${t.count} image(s), ${(t.folders||[]).length} folder(s)`}),await L({rootPath:t.root,folderPath:`.`,nextQuery:``,offset:0,append:!1})}catch(t){e(`Packshot scan failed`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{E(!1)}}async function L(t){let n=t?.rootPath??r;if(!n)return;let i=t?.folderPath??s,a=t?.nextQuery??d,o=t?.offset??(t?.append?l.length:0),c=t?.append??!1;O(!0);try{let e=await G(`/api/packshot-browser/images`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({root:n,folder:i,query:a,offset:o,limit:hi})});u(t=>c?[...t,...e.images]:e.images),m(e.total),g(e.hasMore)}catch(t){e(`Image list failed`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{O(!1)}}(0,_.useEffect)(()=>{if(!r)return;let e=window.setTimeout(()=>{L({offset:0,append:!1})},220);return()=>window.clearTimeout(e)},[r,s,d]);async function R(){if(!r||!b||v.size===0){e(`Select images and an output folder first`,{type:`warning`});return}E(!0);try{let t=await G(`/api/packshot-browser/copy`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({root:r,destination:b,paths:Array.from(v),preserve_folder_structure:S,group_by_ean:w})});ne(t),e(`Copy complete`,{type:t.errorCount?`warning`:`success`,message:`${t.copiedCount} copied, ${t.errorCount} error(s)`})}catch(t){e(`Copy failed`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{E(!1)}}function z(e){y(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n})}function ie(){y(e=>{let t=l.map(e=>e.path),n=t.length>0&&t.every(t=>e.has(t)),r=new Set(e);return n?t.forEach(e=>r.delete(e)):t.forEach(e=>r.add(e)),r})}function ae(e){if(window.__grimoire?.revealInExplorer){window.__grimoire.revealInExplorer(e);return}G(`/api/local/reveal`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({path:e})})}(0,_.useEffect)(()=>{if(!k||j[k.image.path]||Ti(k.image))return;let e=!1;return G(`/api/packshot-browser/meta?path=${encodeURIComponent(k.image.path)}`).then(t=>{e||te(e=>({...e,[k.image.path]:t}))}).catch(()=>void 0),()=>{e=!0}},[k?.image.path,j]);function B(e){let t=v.has(e.path);return(0,W.jsxs)(`article`,{className:`pb-card${t?` selected`:``}`,children:[(0,W.jsx)(Ei,{image:e,selected:t,onToggle:()=>z(e.path),onHover:t=>{let n=t.currentTarget.getBoundingClientRect();A({image:e,x:n.right,y:n.top})},onLeave:()=>A(null)}),(0,W.jsxs)(`div`,{className:`pb-card-meta`,children:[(0,W.jsx)(`strong`,{title:e.name,children:e.name}),(0,W.jsx)(`span`,{title:e.relativePath,children:e.relativePath}),(0,W.jsxs)(`em`,{children:[e.extension.replace(`.`,``).toUpperCase(),` - `,xi(e.sizeBytes)]})]})]},e.path)}let V=k?j[k.image.path]:null;return(0,W.jsxs)(`div`,{className:`view packshot-browser-view`,children:[(0,W.jsxs)(`section`,{className:`pb-shell`,children:[(0,W.jsxs)(`div`,{className:`pb-header`,children:[(0,W.jsxs)(`div`,{children:[(0,W.jsx)(`span`,{className:`pb-kicker`,children:`Packshot Browser`}),(0,W.jsx)(`h1`,{children:`Folder-first image browsing for large libraries`})]}),(0,W.jsxs)(`div`,{className:`pb-header-actions`,children:[(0,W.jsx)(`button`,{className:`btn btn-secondary`,disabled:!r,onClick:()=>ae(r),children:`Open source`}),(0,W.jsx)(`button`,{className:`btn btn-secondary`,disabled:!M?.report,onClick:()=>M&&ae(M.report),children:`Open report`})]})]}),(0,W.jsxs)(`div`,{className:`pb-toolbar`,children:[(0,W.jsxs)(`div`,{className:`path-picker pb-path`,children:[(0,W.jsx)(`input`,{value:t,onChange:e=>n(e.target.value),placeholder:`Select source folder with packshots`}),(0,W.jsx)(`button`,{className:`btn btn-secondary`,onClick:F,disabled:T,children:`Choose`}),(0,W.jsx)(`button`,{className:`btn btn-primary`,onClick:()=>I(),disabled:T||!t,children:T?`Indexing...`:`Scan`})]}),(0,W.jsx)(`input`,{className:`inline-search pb-search`,value:d,onChange:e=>f(e.target.value),placeholder:`Search within selected folder by EAN, file name, folder, keyword...`})]}),(0,W.jsxs)(`div`,{className:`pb-stats`,children:[(0,W.jsxs)(`div`,{children:[(0,W.jsx)(`span`,{children:`Total indexed`}),(0,W.jsx)(`strong`,{children:P})]}),(0,W.jsxs)(`div`,{children:[(0,W.jsx)(`span`,{children:`Folders`}),(0,W.jsx)(`strong`,{children:a.length})]}),(0,W.jsxs)(`div`,{children:[(0,W.jsx)(`span`,{children:`Current result`}),(0,W.jsx)(`strong`,{children:p})]}),(0,W.jsxs)(`div`,{children:[(0,W.jsx)(`span`,{children:`Loaded`}),(0,W.jsx)(`strong`,{children:l.length})]}),(0,W.jsxs)(`div`,{children:[(0,W.jsx)(`span`,{children:`Selected`}),(0,W.jsx)(`strong`,{children:v.size})]}),(0,W.jsxs)(`div`,{children:[(0,W.jsx)(`span`,{children:`Cloud in folder`}),(0,W.jsx)(`strong`,{children:N?.cloudCount??0})]})]}),(0,W.jsxs)(`div`,{className:`pb-layout`,children:[(0,W.jsx)(`aside`,{className:`pb-folders`,children:a.map(e=>(0,W.jsxs)(`button`,{className:`pb-folder${s===e.path?` active`:``}`,style:{paddingLeft:Math.min(18+e.depth*14,62)},onClick:()=>{c(e.path),u([]),m(0),g(!1)},children:[(0,W.jsx)(`strong`,{title:e.path,children:e.label}),(0,W.jsx)(`small`,{title:e.path,children:e.path}),(0,W.jsx)(`span`,{children:e.count})]},e.path))}),(0,W.jsxs)(`main`,{className:`pb-main`,children:[(0,W.jsxs)(`div`,{className:`pb-main-head`,children:[(0,W.jsxs)(`div`,{children:[(0,W.jsx)(`h2`,{children:N?.label??`Choose a folder`}),(0,W.jsxs)(`span`,{children:[p,` match(es), `,l.length,` loaded in this page stream`]})]}),(0,W.jsxs)(`div`,{className:`pb-main-actions`,children:[(0,W.jsx)(`button`,{className:`btn btn-secondary`,onClick:ie,disabled:l.length===0,children:`Select loaded`}),(0,W.jsx)(`button`,{className:`btn btn-secondary`,onClick:()=>y(new Set),disabled:v.size===0,children:`Clear`})]})]}),(0,W.jsxs)(`div`,{className:`pb-grid`,children:[l.map(B),r&&h&&(0,W.jsxs)(`button`,{className:`pb-load-more`,onClick:()=>L({offset:l.length,append:!0}),disabled:D,children:[(0,W.jsx)(`strong`,{children:D?`Loading...`:`Load more thumbnails`}),(0,W.jsxs)(`span`,{children:[l.length,` of `,p,` loaded`]})]}),r&&D&&l.length===0&&(0,W.jsxs)(`div`,{className:`pb-empty`,children:[(0,W.jsx)(`strong`,{children:`Loading folder images`}),(0,W.jsx)(`span`,{children:`Thumbnails will appear progressively with limited parallel loading.`})]}),!r&&(0,W.jsxs)(`button`,{className:`pb-empty`,onClick:F,disabled:T,children:[(0,W.jsx)(`strong`,{children:`Choose a source folder`}),(0,W.jsx)(`span`,{children:`Index a synced OneDrive folder or a local packshot batch.`})]}),r&&!D&&l.length===0&&(0,W.jsxs)(`div`,{className:`pb-empty`,children:[(0,W.jsx)(`strong`,{children:`No images in this view`}),(0,W.jsx)(`span`,{children:`Choose another folder or change the search keyword.`})]})]})]})]}),(0,W.jsxs)(`div`,{className:`pb-copybar`,children:[(0,W.jsxs)(`div`,{className:`path-picker pb-output`,children:[(0,W.jsx)(`input`,{value:b,onChange:e=>x(e.target.value),placeholder:`Select output folder for copied images`}),(0,W.jsx)(`button`,{className:`btn btn-secondary`,onClick:re,disabled:T,children:`Output`})]}),(0,W.jsxs)(`label`,{className:`pb-toggle`,children:[(0,W.jsx)(`input`,{type:`checkbox`,checked:S,onChange:e=>C(e.target.checked),disabled:w}),(0,W.jsx)(`span`,{}),` Preserve folders`]}),(0,W.jsxs)(`label`,{className:`pb-toggle`,children:[(0,W.jsx)(`input`,{type:`checkbox`,checked:w,onChange:e=>ee(e.target.checked)}),(0,W.jsx)(`span`,{}),` Group by EAN`]}),(0,W.jsx)(`button`,{className:`btn btn-primary`,onClick:R,disabled:T||v.size===0||!b,children:`Copy selected`})]}),M&&(0,W.jsxs)(`div`,{className:`pb-result`,children:[(0,W.jsxs)(`strong`,{children:[M.copiedCount,` copied`]}),(0,W.jsxs)(`span`,{children:[M.errorCount,` error(s)`]}),(0,W.jsx)(`span`,{children:M.destination})]})]}),k&&(0,W.jsxs)(`div`,{className:`pb-hover`,style:{left:Math.max(12,Math.min(k.x+18,window.innerWidth-430)),top:Math.max(12,Math.min(k.y+18,window.innerHeight-560))},children:[(0,W.jsx)(Ei,{image:k.image,selected:v.has(k.image.path),onToggle:()=>z(k.image.path),onHover:()=>void 0,onLeave:()=>void 0}),(0,W.jsxs)(`div`,{className:`pb-hover-meta`,children:[(0,W.jsx)(`strong`,{title:k.image.name,children:k.image.name}),(0,W.jsx)(`span`,{children:k.image.relativePath}),(0,W.jsxs)(`span`,{children:[Ti(k.image)?`Dimensions skipped`:(V?.width||0)>0?`${V?.width} x ${V?.height}`:`Dimensions loading`,` - `,xi(V?.sizeBytes??k.image.sizeBytes)]}),(0,W.jsxs)(`span`,{children:[`OneDrive: `,V?.oneDriveState??k.image.oneDriveState]}),(0,W.jsxs)(`span`,{children:[`EAN: `,k.image.eans.length?k.image.eans.join(`, `):`Not detected`]})]})]}),(0,W.jsx)(`style`,{children:`
        .packshot-browser-view { min-height: 100%; }
        .pb-shell { display: grid; gap: 18px; }
        .pb-header {
          display: flex; justify-content: space-between; gap: 16px; align-items: flex-end;
          padding: 22px; border: 1px solid var(--border); border-radius: 8px; background: var(--bg-card);
        }
        .pb-kicker { color: var(--accent); font-size: 12px; font-weight: 800; text-transform: uppercase; }
        .pb-header h1 { margin: 6px 0 0; color: var(--text-primary); font-size: 24px; }
        .pb-header-actions, .pb-main-actions { display: flex; gap: 10px; flex-wrap: wrap; }
        .pb-toolbar { display: grid; grid-template-columns: minmax(0, 1.5fr) minmax(260px, 0.75fr); gap: 12px; }
        .pb-path, .pb-output { min-width: 0; }
        .pb-search { width: 100%; }
        .pb-stats { display: grid; grid-template-columns: repeat(6, 1fr); gap: 12px; }
        .pb-stats div {
          display: grid; gap: 6px; padding: 14px; border: 1px solid var(--border);
          border-radius: 8px; background: var(--bg-card);
        }
        .pb-stats span { color: var(--text-muted); font-size: 12px; }
        .pb-stats strong { color: var(--text-primary); font-size: 22px; }
        .pb-layout { display: grid; grid-template-columns: 300px minmax(0, 1fr); gap: 16px; min-height: 560px; }
        .pb-folders {
          display: grid; align-content: start; gap: 8px; max-height: calc(100vh - 330px);
          padding: 10px; overflow: auto; border: 1px solid var(--border); border-radius: 8px; background: var(--bg-card);
        }
        .pb-folder {
          position: relative; display: grid; gap: 4px; width: 100%; padding: 12px 48px 12px 12px;
          border: 1px solid transparent; border-radius: 8px; background: var(--bg-input);
          color: var(--text-primary); text-align: left; cursor: pointer;
        }
        .pb-folder:hover, .pb-folder.active { border-color: var(--accent); }
        .pb-folder strong, .pb-folder small { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .pb-folder strong { font-size: 13px; }
        .pb-folder small { color: var(--text-muted); font-size: 11px; }
        .pb-folder span {
          position: absolute; top: 12px; right: 12px; color: var(--accent); font-size: 12px; font-weight: 800;
        }
        .pb-main {
          min-width: 0; border: 1px solid var(--border); border-radius: 8px;
          background: var(--bg-card); overflow: hidden;
        }
        .pb-main-head {
          display: flex; align-items: center; justify-content: space-between; gap: 12px;
          padding: 16px 18px; border-bottom: 1px solid var(--border);
        }
        .pb-main-head h2 { margin: 0; color: var(--text-primary); font-size: 18px; }
        .pb-main-head span { color: var(--text-muted); font-size: 13px; }
        .pb-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(172px, 1fr)); gap: 14px;
          max-height: calc(100vh - 390px); min-height: 460px; padding: 16px; overflow: auto;
          content-visibility: auto;
        }
        .pb-card {
          border: 1px solid var(--border); border-radius: 8px; background: var(--bg-input);
          overflow: hidden; contain: layout paint style;
        }
        .pb-card.selected { border-color: var(--accent); box-shadow: 0 0 0 2px rgba(249, 115, 22, 0.18); }
        .pb-thumb-btn {
          position: relative; display: block; width: 100%; padding: 0; border: 0;
          background: transparent; cursor: pointer;
        }
        .pb-thumb-btn img {
          display: block; width: 100%; aspect-ratio: 4 / 3; object-fit: contain; background: var(--bg-card);
        }
        .pb-thumb-placeholder {
          display: grid; place-items: center; align-content: center; gap: 8px; width: 100%; aspect-ratio: 4 / 3;
          background: linear-gradient(135deg, rgba(15,118,110,.12), rgba(37,99,235,.12)), var(--bg-card);
          color: var(--text-primary);
        }
        .pb-thumb-placeholder.failed { background: rgba(217, 119, 6, 0.12); }
        .pb-thumb-placeholder span {
          display: inline-flex; align-items: center; justify-content: center; min-width: 52px; height: 32px;
          border: 1px solid var(--border); border-radius: 8px; color: var(--text-secondary); font-size: 12px; font-weight: 800;
        }
        .pb-thumb-placeholder strong { font-size: 13px; }
        .pb-check, .pb-cloud {
          position: absolute; padding: 4px 8px; border-radius: 999px; color: white;
          font-size: 11px; font-weight: 800; background: rgba(0,0,0,.68);
        }
        .pb-check { left: 8px; top: 8px; }
        .pb-cloud { right: 8px; top: 8px; }
        .pb-cloud.cloud-only { background: rgba(217,119,6,.9); }
        .pb-cloud.local { background: rgba(5,150,105,.9); }
        .pb-card-meta { display: grid; gap: 5px; padding: 11px; }
        .pb-card-meta strong, .pb-card-meta span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .pb-card-meta strong { color: var(--text-primary); font-size: 13px; }
        .pb-card-meta span, .pb-card-meta em { color: var(--text-muted); font-size: 12px; font-style: normal; }
        .pb-empty, .pb-load-more {
          display: grid; place-items: center; align-content: center; gap: 8px; min-height: 190px;
          padding: 24px; border: 1px dashed var(--border); border-radius: 8px;
          background: var(--bg-input); color: var(--text-primary); text-align: center;
        }
        .pb-empty span, .pb-load-more span { color: var(--text-muted); }
        .pb-copybar {
          display: grid; grid-template-columns: minmax(0, 1fr) auto auto auto; align-items: center; gap: 12px;
          padding: 14px; border: 1px solid var(--border); border-radius: 8px; background: var(--bg-card);
        }
        .pb-toggle {
          display: flex; align-items: center; gap: 8px; color: var(--text-primary);
          font-size: 13px; font-weight: 700; white-space: nowrap;
        }
        .pb-toggle input { width: 16px; height: 16px; accent-color: var(--accent); }
        .pb-toggle span { display: none; }
        .pb-result {
          display: flex; gap: 12px; align-items: center; padding: 12px 14px; border: 1px solid var(--border);
          border-radius: 8px; background: var(--bg-card); color: var(--text-primary); font-size: 13px;
        }
        .pb-result span:last-child { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .pb-hover {
          position: fixed; z-index: 1200; width: 410px; pointer-events: none; overflow: hidden;
          border: 1px solid var(--border); border-radius: 8px; background: var(--bg-card);
          box-shadow: 0 24px 60px rgba(0,0,0,.35);
        }
        .pb-hover .pb-thumb-btn { cursor: default; }
        .pb-hover .pb-thumb-btn img, .pb-hover .pb-thumb-placeholder { aspect-ratio: 16 / 11; max-height: 360px; }
        .pb-hover .pb-check { display: none; }
        .pb-hover-meta { display: grid; gap: 6px; padding: 12px; }
        .pb-hover-meta strong, .pb-hover-meta span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .pb-hover-meta strong { color: var(--text-primary); }
        .pb-hover-meta span { color: var(--text-muted); font-size: 12px; }
        @media (max-width: 1100px) {
          .pb-toolbar, .pb-layout, .pb-copybar { grid-template-columns: 1fr; }
          .pb-stats { grid-template-columns: repeat(2, 1fr); }
          .pb-folders { max-height: 260px; }
        }
      `})]})}function Oi(e,...t){if(!e)return!0;let n=e.toLowerCase();return t.some(e=>(e||``).toLowerCase().includes(n))}function ki(){let{notify:e}=Hn(),[t,n]=(0,_.useState)(`sorter`),[r,i]=(0,_.useState)(``),[a,o]=(0,_.useState)(!1),[s,c]=(0,_.useState)(!1),[l,u]=(0,_.useState)(``),[d,f]=(0,_.useState)(null),[p,m]=(0,_.useState)(`Ready`),[h,g]=(0,_.useState)(`Choose a folder to begin.`),[v,y]=(0,_.useState)(!1),[b,x]=(0,_.useState)(null),S=(0,_.useRef)(!1),C=(0,_.useRef)(``),w=(0,_.useCallback)(e=>{S.current=!0,C.current=e},[]),ee=(0,_.useCallback)(()=>{S.current=!1,C.current=``,x(null)},[]);(0,_.useEffect)(()=>{function e(e){if(!S.current||!C.current)return;let t=e.clientX+388>window.innerWidth?e.clientX-388:e.clientX+16,n=e.clientY+388>window.innerHeight?Math.max(0,e.clientY-388):e.clientY+16;x({src:C.current,x:t,y:n})}return document.addEventListener(`mousemove`,e),()=>document.removeEventListener(`mousemove`,e)},[]);async function T(){if(!r){e(`Choose a folder first`,{type:`warning`});return}o(!0),m(`Scanning`),g(`Analyzing folder contents for EAN barcodes.`);try{let t=await G(`/api/ean-sorter/scan`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({folder:r})});f(t),i(t.folder||r),localStorage.setItem(`grimoire-ean-sorter-root`,t.folder||r),m(`Scan complete`),g(`${t.items} item(s), ${t.products} product EAN group(s), ${t.notFound} not found.`),e(`Scan complete`,{type:`success`,message:`${t.products} products, ${t.files} files`})}catch(t){m(`Error`),g(t instanceof Error?t.message:String(t)),e(`Scan failed`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{o(!1)}}async function E(){if(!r){e(`Choose a folder first`,{type:`warning`});return}o(!0),m(`Sorting`),g(`Moving files into product folders and generating report.`);try{let t=await G(`/api/ean-sorter/sort`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({folder:r,deleteEmpty:s})});f(t),i(t.folder||r),localStorage.setItem(`grimoire-ean-sorter-root`,t.folder||r),m(`Sort complete`),g(`${t.moved??0} item(s) moved into ${t.products} EAN folder(s).`),e(`Sort complete`,{type:`success`,message:`${t.moved??0} files moved`})}catch(t){m(`Error`),g(t instanceof Error?t.message:String(t)),e(`Sort failed`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{o(!1)}}async function D(){if(r){o(!0);try{let t=await G(`/api/ean-sorter/report`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({folder:r})});f(e=>e?{...e,reportRows:t.reportRows}:t),e(`Report loaded`,{type:`success`})}catch(t){e(`Failed to load report`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{o(!1)}}}async function O(){try{await G(`/api/ean-sorter/report/open`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({folder:r})})}catch(t){e(`Failed to open report`,{type:`error`,message:t instanceof Error?t.message:String(t)})}}async function k(){try{await G(`/api/ean-sorter/report/export`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({folder:r})}),e(`Report exported`,{type:`success`})}catch(t){e(`Export failed`,{type:`error`,message:t instanceof Error?t.message:String(t)})}}async function A(){if(r)if(window.__grimoire?.revealInExplorer)window.__grimoire.revealInExplorer(r);else try{await G(`/api/local/reveal`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({path:r})})}catch{}}let j=[`Active`,`Upcoming`,`Limited`,`Blanks`,`N/A`,`Unknown`,`Non-ACR`,`Others`],[te,M]=(0,_.useState)(new Set),[ne,N]=(0,_.useState)(!1),[P,F]=(0,_.useState)([]),[re,I]=(0,_.useState)(new Set),[L,R]=(0,_.useState)(``),[z,ie]=(0,_.useState)(!1),[ae,B]=(0,_.useState)(!1),V=(0,_.useRef)(null),[H,oe]=(0,_.useState)(null),[se,ce]=(0,_.useState)(!1),[le,ue]=(0,_.useState)(``),[de,fe]=(0,_.useState)(``),[pe,me]=(0,_.useState)(new Set),[he,ge]=(0,_.useState)(``),[_e,ve]=(0,_.useState)(!1),[ye,be]=(0,_.useState)(!1),[U,xe]=(0,_.useState)(!1),[Se,Ce]=(0,_.useState)(new Set),[we,Te]=(0,_.useState)(!1),[Ee,De]=(0,_.useState)(!1),[Oe,ke]=(0,_.useState)(null),[Ae,je]=(0,_.useState)(null),Me=(0,_.useMemo)(()=>{let e={};for(let t of H?.no_barcode??[]){let n=t.status?.trim()||`Blanks`;e[n]=(e[n]||0)+1}return e},[H?.no_barcode]),Ne=(0,_.useMemo)(()=>H?H.no_barcode.filter(e=>Se.has(e.status?.trim()||`Blanks`)):[],[Se,H]);async function Pe(){if(!window.__grimoire?.pickFile){V.current?.click();return}let e=await window.__grimoire.pickFile(`Select status file`,`Excel workbooks (*.xlsx;*.xls)|*.xlsx;*.xls|All files (*.*)|*.*`);e&&(ue(e),fe(``),V.current&&(V.current.value=``))}async function Fe(){let t=V.current?.files?.[0];if(!t&&!le){e(`Select a status file`,{type:`warning`});return}ce(!0),oe(null),De(!1),ke(null),je(null),me(new Set),Ce(new Set),xe(!1),Te(!1);try{let n=le?await G(`/api/ean-sorter/categorize/read-status-file-path`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({path:le})}):await(async()=>{let e=new FormData;return e.append(`file`,t),G(`/api/ean-sorter/categorize/read-status-file`,{method:`POST`,body:e})})();oe(n),Ce(new Set(n.no_barcode.map(e=>e.status?.trim()||`Blanks`))),e(`Read ${n.total} products for ${n.brand}`,{type:`success`}),n.no_barcode_count>0&&ve(!0),Object.keys(n.duplicates).length>0&&be(!0)}catch(t){e(`Failed to read status file`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{ce(!1)}}function Ie(e){me(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n})}function Le(e){Ce(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n})}async function Re(){let e=await Kn(`Select destination for status folders`);e&&ge(e)}async function ze(){if(!H||pe.size===0||!he){e(`Select statuses and a destination folder`,{type:`warning`});return}ce(!0);try{let t=await G(`/api/ean-sorter/categorize/create-status-folders-job`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({destination:he,products:H.products,statuses:[...pe],brand:H.brand,use_name_for_no_barcode:U,no_barcode_statuses:[...Se],per_product_for_duplicates:we})});je(t),e(`Status folder job started`,{type:`info`,message:t.id})}catch(t){e(`Failed to create folders`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{ce(!1)}}(0,_.useEffect)(()=>{if(!Ae||![`pending`,`running`].includes(Ae.status))return;let t=!1,n=window.setInterval(async()=>{try{let r=await G(`/api/jobs/${Ae.id}`);if(t)return;if(je(r),r.status===`completed`){window.clearInterval(n);let t=r.summary||{},i=Number(t.created_count||0),a=Number(t.skipped_count||0);De(!0),ke({count:i,skipped_count:a}),ce(!1),e(`Created ${i} folder(s)`,{type:`success`,message:a>0?`${a} product(s) skipped (no barcode)`:void 0})}else r.status===`failed`&&(window.clearInterval(n),ce(!1),e(`Failed to create folders`,{type:`error`,message:r.error||`Status folder job failed`}))}catch(t){window.clearInterval(n),ce(!1),e(`Could not check folder job`,{type:`error`,message:t instanceof Error?t.message:String(t)})}},1e3);return()=>{t=!0,window.clearInterval(n)}},[Ae?.id,Ae?.status]);function Be(e){M(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n})}function Ve(){te.size===j.length?M(new Set):M(new Set(j))}async function He(){if(!(!r||te.size===0)){B(!0);try{await G(`/api/ean-sorter/categorize/create-folders`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({folder:r,categories:[...te]})}),N(!0),e(`Category folders created`,{type:`success`,message:`${te.size} folder(s) created`}),await Ue()}catch(t){e(`Failed to create folders`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{B(!1)}}}async function Ue(){if(r){B(!0);try{F((await G(`/api/ean-sorter/categorize/uncategorized`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({folder:r})})).items),I(new Set)}catch(t){e(`Failed to load uncategorized items`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{B(!1)}}}function We(e){I(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n})}function Ge(){re.size===Ze.length?I(new Set):I(new Set(Ze.map(e=>e.path)))}function Ke(t){if(re.size===0){e(`Select images to move first`,{type:`warning`});return}R(t),ie(!0)}async function qe(){if(!(!r||!L||re.size===0)){ie(!1),B(!0);try{let t=await G(`/api/ean-sorter/categorize/move`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({folder:r,category:L,paths:[...re]})});e(`Moved ${t.moved} item(s) to ${L}`,{type:`success`}),t.errors.length>0&&e(`${t.errors.length} error(s)`,{type:`warning`,message:t.errors.slice(0,3).join(`; `)}),await Ue()}catch(t){e(`Move failed`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{B(!1),R(``)}}}let Je=(d?.rows??[]).filter(e=>Oi(l,e.name,e.ean,e.type,e.kind,e.oldFolder)),Ye=(d?.gallery??[]).filter(e=>Oi(l,e.name,e.ean)),Xe=(d?.reportRows??[]).filter(e=>Oi(l,e.numbering,e.ean,e.name,e.type,e.oldFolder,e.newFolder)),Ze=P.filter(e=>Oi(l,e.name,e.type,e.oldFolder)),Qe={items:d?.items??0,files:d?.files??0,folders:d?.folders??0,products:d?.products??0,notFound:d?.notFound??0};return(0,W.jsxs)(`div`,{className:`view tool-view sor-shell`,children:[(0,W.jsxs)(`aside`,{className:`sor-sidebar`,children:[(0,W.jsxs)(`div`,{className:`sor-brand`,children:[(0,W.jsx)(`div`,{className:`sor-brand-mark`,children:`E`}),(0,W.jsx)(`span`,{children:`EAN SORTER`})]}),(0,W.jsx)(`nav`,{className:`sor-nav`,children:[{key:`sorter`,label:`Sorter`,icon:`/icons/ean-sorter-sort.png`},{key:`gallery`,label:`Gallery`,icon:`/icons/ean-sorter-gallery.png`},{key:`report`,label:`Report`,icon:`/icons/ean-sorter-report.png`},{key:`categorize`,label:`Categorize`,icon:`/icons/ean-sorter-categorize.png`}].map(e=>(0,W.jsxs)(`button`,{className:`sor-nav-item${t===e.key?` active`:``}`,onClick:()=>{n(e.key),e.key===`categorize`&&r&&P.length===0&&ne&&Ue()},children:[(0,W.jsx)(`img`,{src:e.icon,alt:``,className:`sor-nav-icon`}),e.label]},e.key))}),(0,W.jsx)(`div`,{className:`sor-sidebar-spacer`}),(0,W.jsx)(`button`,{className:`sor-guide-btn`,onClick:()=>y(!0),children:`Guide`}),(0,W.jsxs)(`div`,{className:`sor-mini-card`,children:[(0,W.jsx)(`span`,{children:`Selected folder`}),(0,W.jsx)(`strong`,{title:r||`None`,children:r||`None`})]})]}),(0,W.jsxs)(`div`,{className:`sor-content`,children:[(0,W.jsxs)(`header`,{className:`sor-topbar`,children:[(0,W.jsxs)(`div`,{className:`sor-search`,children:[(0,W.jsx)(`span`,{children:`Search`}),(0,W.jsx)(`input`,{type:`text`,placeholder:`Search EAN or image name`,value:l,onChange:e=>u(e.target.value)})]}),(0,W.jsx)(`button`,{className:`sor-btn-compact`,onClick:async()=>{let e=await Kn(`Select folder to scan`,r);e&&i(e)},children:`Choose folder`}),(0,W.jsx)(`button`,{className:`sor-btn-icon`,onClick:A,children:`Open`}),(0,W.jsxs)(`div`,{className:`sor-profile`,children:[(0,W.jsx)(`div`,{className:`sor-avatar`,children:`EAN`}),(0,W.jsx)(`span`,{children:`Local desktop`})]})]}),t===`sorter`&&(0,W.jsxs)(`div`,{className:`sor-view-content`,children:[(0,W.jsxs)(`section`,{className:`sor-hero`,children:[(0,W.jsxs)(`div`,{className:`sor-hero-main`,children:[(0,W.jsx)(`div`,{className:`sor-chips`,children:[`EAN-8`,`EAN-13`,`Excel report`,`Folder sort`].map(e=>(0,W.jsx)(`span`,{className:`sor-chip`,children:e},e))}),(0,W.jsxs)(`div`,{children:[(0,W.jsx)(`p`,{className:`sor-eyebrow`,children:`Product Data Cleaner`}),(0,W.jsx)(`h1`,{className:`sor-headline`,children:`Sort files by product barcode`})]}),(0,W.jsxs)(`div`,{className:`sor-hero-actions`,children:[(0,W.jsx)(`button`,{className:`sor-btn-primary`,onClick:T,disabled:a||!r,children:`Scan`}),(0,W.jsx)(`button`,{className:`sor-btn-secondary`,onClick:E,disabled:a||!r,children:`Sort and report`}),(0,W.jsxs)(`label`,{className:`sor-toggle`,children:[(0,W.jsx)(`input`,{type:`checkbox`,checked:s,onChange:e=>c(e.target.checked)}),(0,W.jsx)(`span`,{}),`Delete empty folders`]})]})]}),(0,W.jsxs)(`aside`,{className:`sor-action-card`,children:[(0,W.jsx)(`span`,{className:`sor-card-label`,children:`Status`}),(0,W.jsx)(`strong`,{children:p}),(0,W.jsx)(`p`,{children:h}),(0,W.jsx)(`button`,{className:`sor-btn-gold`,onClick:()=>n(`report`),children:`Show report`})]})]}),(0,W.jsx)(`section`,{className:`sor-stats`,children:[[`Items`,Qe.items],[`Files`,Qe.files],[`Folders`,Qe.folders],[`Products`,Qe.products],[`Not found`,Qe.notFound]].map(([e,t])=>(0,W.jsxs)(`article`,{className:`sor-stat`,children:[(0,W.jsx)(`span`,{children:e}),(0,W.jsx)(`strong`,{children:t})]},e))}),(0,W.jsxs)(`section`,{className:`sor-workspace`,children:[(0,W.jsxs)(`div`,{className:`sor-panel sor-results-panel`,children:[(0,W.jsxs)(`div`,{className:`sor-panel-head`,children:[(0,W.jsx)(`h2`,{children:`Scan Results`}),(0,W.jsxs)(`span`,{className:`sor-count`,children:[Je.length,` rows`]})]}),(0,W.jsx)(`div`,{className:`sor-table-wrap`,children:(0,W.jsxs)(`table`,{className:`sor-tbl`,children:[(0,W.jsx)(`thead`,{children:(0,W.jsxs)(`tr`,{children:[(0,W.jsx)(`th`,{children:`Preview`}),(0,W.jsx)(`th`,{children:`Name`}),(0,W.jsx)(`th`,{children:`EAN`}),(0,W.jsx)(`th`,{children:`Type`}),(0,W.jsx)(`th`,{children:`Old Folder`})]})}),(0,W.jsxs)(`tbody`,{children:[Je.map((e,t)=>(0,W.jsxs)(`tr`,{children:[(0,W.jsx)(`td`,{children:e.thumbnail?(0,W.jsx)(`img`,{className:`sor-thumb`,src:e.thumbnail,alt:``,loading:`lazy`,onMouseEnter:()=>w(e.thumbnail),onMouseLeave:ee}):(0,W.jsx)(`div`,{className:`sor-thumb sor-thumb-placeholder`,children:`No image`})}),(0,W.jsx)(`td`,{children:e.name}),(0,W.jsx)(`td`,{children:(0,W.jsx)(`span`,{className:`sor-tag${e.ean===`not found`?` missing`:``}`,children:e.ean})}),(0,W.jsx)(`td`,{children:e.type||e.kind||``}),(0,W.jsx)(`td`,{className:`sor-path-cell`,title:e.oldFolder,children:e.oldFolder||``})]},`${e.path??e.name}-${t}`)),Je.length===0&&(0,W.jsx)(`tr`,{children:(0,W.jsx)(`td`,{colSpan:5,className:`sor-empty`,children:a?`Scanning...`:`No scan yet.`})})]})]})})]}),(0,W.jsxs)(`div`,{className:`sor-panel sor-products-panel`,children:[(0,W.jsxs)(`div`,{className:`sor-panel-head`,children:[(0,W.jsx)(`h2`,{children:`Products`}),(0,W.jsx)(`span`,{className:`sor-count`,children:d?.productRows?.length??0})]}),(0,W.jsxs)(`div`,{className:`sor-product-list`,children:[(d?.productRows??[]).map(e=>(0,W.jsxs)(`div`,{className:`sor-product-row`,children:[(0,W.jsx)(`strong`,{children:e.ean}),(0,W.jsxs)(`span`,{children:[e.count,` item`,e.count===1?``:`s`]})]},e.ean)),(!d?.productRows||d.productRows.length===0)&&(0,W.jsx)(`div`,{className:`sor-empty-box`,children:`No EAN groups yet.`})]})]})]})]}),t===`gallery`&&(0,W.jsx)(`div`,{className:`sor-view-content`,children:(0,W.jsxs)(`div`,{className:`sor-panel`,children:[(0,W.jsxs)(`div`,{className:`sor-panel-head`,children:[(0,W.jsx)(`h2`,{children:`Gallery`}),(0,W.jsxs)(`span`,{className:`sor-count`,children:[Ye.length,` images`]})]}),(0,W.jsxs)(`div`,{className:`sor-gallery-grid`,children:[Ye.map((e,t)=>(0,W.jsxs)(`article`,{className:`sor-gallery-card`,children:[(0,W.jsx)(`img`,{src:e.thumbnail,alt:e.name,loading:`lazy`}),(0,W.jsxs)(`div`,{children:[(0,W.jsx)(`strong`,{title:e.name,children:e.name}),(0,W.jsx)(`span`,{children:e.ean})]})]},`${e.ean}-${e.name}-${t}`)),Ye.length===0&&(0,W.jsx)(`div`,{className:`sor-empty-box`,style:{gridColumn:`1 / -1`},children:d?`No matching images.`:`Scan a folder to load images.`})]})]})}),t===`report`&&(0,W.jsx)(`div`,{className:`sor-view-content`,children:(0,W.jsxs)(`div`,{className:`sor-panel sor-report-panel`,children:[(0,W.jsxs)(`div`,{className:`sor-panel-head`,children:[(0,W.jsx)(`h2`,{children:`Report Output`}),(0,W.jsxs)(`div`,{className:`sor-panel-actions`,children:[(0,W.jsx)(`button`,{className:`sor-btn-compact`,onClick:D,disabled:a||!r,children:`Load report`}),(0,W.jsx)(`button`,{className:`sor-btn-compact`,onClick:k,disabled:!r,children:`Export report`}),(0,W.jsx)(`button`,{className:`sor-btn-compact`,onClick:O,disabled:!r,children:`Open in Excel`})]})]}),(0,W.jsx)(`div`,{className:`sor-table-wrap sor-report-wrap`,children:(0,W.jsxs)(`table`,{className:`sor-tbl`,children:[(0,W.jsx)(`thead`,{children:(0,W.jsxs)(`tr`,{children:[(0,W.jsx)(`th`,{children:`Numbering`}),(0,W.jsx)(`th`,{children:`EAN`}),(0,W.jsx)(`th`,{children:`Name`}),(0,W.jsx)(`th`,{children:`Type`}),(0,W.jsx)(`th`,{children:`Old Folder`}),(0,W.jsx)(`th`,{children:`New Folder`})]})}),(0,W.jsxs)(`tbody`,{children:[Xe.map((e,t)=>(0,W.jsxs)(`tr`,{children:[(0,W.jsx)(`td`,{children:e.numbering}),(0,W.jsx)(`td`,{children:e.ean}),(0,W.jsx)(`td`,{children:e.name}),(0,W.jsx)(`td`,{children:e.type||``}),(0,W.jsx)(`td`,{className:`sor-path-cell`,title:e.oldFolder,children:e.oldFolder||``}),(0,W.jsx)(`td`,{className:`sor-path-cell`,title:e.newFolder,children:e.newFolder||``})]},`${e.ean}-${e.name}-${t}`)),Xe.length===0&&(0,W.jsx)(`tr`,{children:(0,W.jsx)(`td`,{colSpan:6,className:`sor-empty`,children:d?.reportRows?`No rows match your search.`:`Run Sort and report, or load an existing report.`})})]})]})})]})}),t===`categorize`&&(0,W.jsx)(`div`,{className:`sor-view-content`,children:ne?(0,W.jsxs)(`div`,{className:`sor-cat-workspace`,children:[(0,W.jsxs)(`div`,{className:`sor-panel`,children:[(0,W.jsxs)(`div`,{className:`sor-panel-head`,children:[(0,W.jsx)(`h2`,{children:`Uncategorized Images`}),(0,W.jsxs)(`div`,{className:`sor-panel-actions`,children:[(0,W.jsxs)(`span`,{className:`sor-count`,children:[re.size,` of`,` `,Ze.length,` selected`]}),(0,W.jsx)(`button`,{className:`sor-btn-compact`,onClick:Ue,disabled:ae||!r,children:`Refresh`}),(0,W.jsx)(`button`,{className:`sor-btn-compact`,onClick:()=>{N(!1),F([]),I(new Set)},children:`Back to setup`})]})]}),(0,W.jsx)(`div`,{className:`sor-table-wrap`,style:{maxHeight:340},children:(0,W.jsxs)(`table`,{className:`sor-tbl`,children:[(0,W.jsx)(`thead`,{children:(0,W.jsxs)(`tr`,{children:[(0,W.jsx)(`th`,{style:{width:40},children:(0,W.jsx)(`input`,{type:`checkbox`,checked:Ze.length>0&&re.size===Ze.length,onChange:Ge})}),(0,W.jsx)(`th`,{children:`Preview`}),(0,W.jsx)(`th`,{children:`Name`}),(0,W.jsx)(`th`,{children:`Type`}),(0,W.jsx)(`th`,{children:`Current Folder`})]})}),(0,W.jsxs)(`tbody`,{children:[Ze.map((e,t)=>(0,W.jsxs)(`tr`,{className:re.has(e.path)?`sor-row-selected`:``,children:[(0,W.jsx)(`td`,{children:(0,W.jsx)(`input`,{type:`checkbox`,checked:re.has(e.path),onChange:()=>We(e.path)})}),(0,W.jsx)(`td`,{children:e.thumbnail?(0,W.jsx)(`img`,{className:`sor-thumb`,src:e.thumbnail,alt:``,loading:`lazy`,onMouseEnter:()=>w(e.thumbnail),onMouseLeave:ee}):(0,W.jsx)(`div`,{className:`sor-thumb sor-thumb-placeholder`,children:`No image`})}),(0,W.jsx)(`td`,{children:e.name}),(0,W.jsx)(`td`,{children:e.type}),(0,W.jsx)(`td`,{className:`sor-path-cell`,title:e.oldFolder,children:e.oldFolder})]},`${e.path}-${t}`)),Ze.length===0&&(0,W.jsx)(`tr`,{children:(0,W.jsx)(`td`,{colSpan:5,className:`sor-empty`,children:ae?`Loading...`:P.length===0?`No uncategorized items found.`:`No items match your search.`})})]})]})})]}),(0,W.jsxs)(`div`,{className:`sor-panel sor-cat-move-panel`,children:[(0,W.jsx)(`div`,{className:`sor-panel-head`,children:(0,W.jsx)(`h2`,{children:`Move to Category`})}),(0,W.jsx)(`div`,{className:`sor-cat-move-grid`,children:[...te].sort().map(e=>(0,W.jsxs)(`button`,{className:`sor-cat-move-btn`,disabled:ae||re.size===0,onClick:()=>Ke(e),children:[(0,W.jsx)(`span`,{className:`sor-cat-move-icon`,children:`📁`}),(0,W.jsx)(`span`,{children:e})]},e))})]})]}):(0,W.jsxs)(`div`,{className:`sor-cat-setup`,children:[(0,W.jsxs)(`div`,{className:`sor-panel`,children:[(0,W.jsxs)(`div`,{className:`sor-panel-head`,children:[(0,W.jsx)(`h2`,{children:`Create Category Folders`}),(0,W.jsxs)(`span`,{className:`sor-count`,children:[te.size,` selected`]})]}),(0,W.jsxs)(`div`,{className:`sor-cat-body`,children:[(0,W.jsx)(`p`,{className:`sor-cat-desc`,children:`Select which category folders to create inside your working directory. These folders will be used to organize uncategorized images (items with no EAN detected).`}),(0,W.jsx)(`div`,{className:`sor-cat-select-all`,children:(0,W.jsxs)(`label`,{className:`sor-cat-check`,children:[(0,W.jsx)(`input`,{type:`checkbox`,checked:te.size===j.length,onChange:Ve}),(0,W.jsx)(`span`,{children:`Select All`})]})}),(0,W.jsx)(`div`,{className:`sor-cat-grid`,children:j.map(e=>(0,W.jsxs)(`label`,{className:`sor-cat-option${te.has(e)?` selected`:``}`,children:[(0,W.jsx)(`input`,{type:`checkbox`,checked:te.has(e),onChange:()=>Be(e)}),(0,W.jsx)(`span`,{className:`sor-cat-name`,children:e})]},e))}),(0,W.jsx)(`div`,{className:`sor-cat-actions`,children:(0,W.jsx)(`button`,{className:`sor-btn-primary`,onClick:He,disabled:ae||!r||te.size===0,children:ae?`Creating...`:`Create Folders`})})]})]}),(0,W.jsxs)(`div`,{className:`sor-panel`,style:{marginTop:16},children:[(0,W.jsx)(`div`,{className:`sor-panel-head`,children:(0,W.jsx)(`h2`,{children:`Create Folders from Status File`})}),(0,W.jsxs)(`div`,{className:`sor-cat-body`,children:[(0,W.jsxs)(`p`,{className:`sor-cat-desc`,children:[`Upload a `,(0,W.jsx)(`strong`,{children:`[Brand]_Missing_Data_Status.xlsx`}),` file to create product folders organized by status, with EAN barcodes as subfolder names.`]}),(0,W.jsxs)(`div`,{className:`sor-status-file-row`,children:[(0,W.jsx)(`input`,{ref:V,type:`file`,accept:`.xlsx,.xls`,className:`sor-hidden-file`,onChange:e=>{let t=e.currentTarget.files?.[0];t&&(ue(``),fe(t.name))}}),(0,W.jsx)(`button`,{className:`sor-btn-secondary`,onClick:Pe,disabled:se,children:`Choose File`}),(0,W.jsx)(`span`,{className:`sor-status-file-name`,children:le||de||`No file chosen`}),(0,W.jsx)(`button`,{className:`sor-btn-primary`,onClick:Fe,disabled:se,children:se?`Reading...`:`Read File`})]}),H&&(0,W.jsxs)(W.Fragment,{children:[(0,W.jsxs)(`div`,{className:`sor-cat-desc`,style:{marginBottom:8,padding:`8px 12px`,background:`var(--sor-card-bg, #1e1e2e)`,borderRadius:6},children:[(0,W.jsx)(`strong`,{children:H.brand}),` — `,H.total,` products`,Object.entries(H.statuses).map(([e,t])=>(0,W.jsxs)(`span`,{style:{marginLeft:12,opacity:.8},children:[e,`: `,t]},e))]}),(0,W.jsx)(`p`,{className:`sor-cat-desc`,style:{marginBottom:6},children:`Select which status folders to create:`}),(0,W.jsx)(`div`,{className:`sor-cat-grid`,children:Object.entries(H.statuses).map(([e,t])=>(0,W.jsxs)(`label`,{className:`sor-cat-option${pe.has(e)?` selected`:``}`,children:[(0,W.jsx)(`input`,{type:`checkbox`,checked:pe.has(e),onChange:()=>Ie(e)}),(0,W.jsxs)(`span`,{className:`sor-cat-name`,children:[e,` (`,t,`)`]})]},e))}),(0,W.jsxs)(`div`,{style:{display:`flex`,gap:10,alignItems:`center`,marginTop:12},children:[(0,W.jsx)(`button`,{className:`sor-btn-secondary`,onClick:Re,children:he?`Change Destination`:`Choose Destination`}),he&&(0,W.jsx)(`span`,{className:`sor-cat-desc`,style:{fontSize:12},children:he})]}),(0,W.jsx)(`div`,{className:`sor-cat-actions`,style:{marginTop:12},children:(0,W.jsx)(`button`,{className:`sor-btn-primary`,onClick:ze,disabled:se||pe.size===0||!he,children:se?`Creating...`:`Create Status Folders`})}),Ae&&[`pending`,`running`].includes(Ae.status)&&(0,W.jsxs)(`div`,{className:`sor-cat-desc`,style:{marginTop:10,padding:`8px 12px`,background:`var(--sor-card-bg, #1e1e2e)`,borderRadius:6},children:[`Creating folders... `,Number(Ae.summary?.progress_percent||0),`%`,Ae.summary?.current_file?` - ${String(Ae.summary.current_file)}`:``]}),Ee&&Oe&&(0,W.jsxs)(`div`,{className:`sor-cat-desc`,style:{marginTop:10,padding:`8px 12px`,background:`var(--sor-success-bg, #1a3a2a)`,borderRadius:6,color:`var(--sor-success, #4ade80)`},children:[`Created `,Oe.count,` folder(s).`,Oe.skipped_count>0&&` Skipped ${Oe.skipped_count} product(s) without barcode.`]})]})]})]})]})})]}),z&&(0,W.jsx)(`div`,{className:`sor-modal`,onClick:e=>{e.target===e.currentTarget&&ie(!1)},children:(0,W.jsxs)(`div`,{className:`sor-modal-card`,children:[(0,W.jsxs)(`div`,{className:`sor-panel-head`,children:[(0,W.jsx)(`h2`,{children:`Confirm Move`}),(0,W.jsx)(`button`,{className:`sor-btn-icon`,onClick:()=>ie(!1),children:`Close`})]}),(0,W.jsxs)(`div`,{className:`sor-guide-copy`,children:[(0,W.jsxs)(`p`,{children:[`Move `,(0,W.jsx)(`strong`,{children:re.size}),` selected item(s) to the `,(0,W.jsx)(`strong`,{children:L}),` folder?`]}),(0,W.jsxs)(`p`,{style:{fontSize:13,opacity:.7},children:[`Files will be moved from their current location into`,` `,(0,W.jsxs)(`strong`,{children:[r,`\\`,L]})]}),(0,W.jsxs)(`div`,{style:{display:`flex`,gap:10,marginTop:12},children:[(0,W.jsx)(`button`,{className:`sor-btn-primary`,onClick:qe,children:`Move`}),(0,W.jsx)(`button`,{className:`sor-btn-secondary`,onClick:()=>ie(!1),children:`Cancel`})]})]})]})}),_e&&H&&(0,W.jsx)(`div`,{className:`sor-modal`,onClick:e=>{e.target===e.currentTarget&&ve(!1)},children:(0,W.jsxs)(`div`,{className:`sor-modal-card`,children:[(0,W.jsxs)(`div`,{className:`sor-panel-head`,children:[(0,W.jsx)(`h2`,{children:`Products Without Barcode`}),(0,W.jsx)(`button`,{className:`sor-btn-icon`,onClick:()=>ve(!1),children:`Close`})]}),(0,W.jsxs)(`div`,{className:`sor-guide-copy`,children:[(0,W.jsxs)(`p`,{children:[(0,W.jsx)(`strong`,{children:H.no_barcode_count}),` product(s) do not have a barcode (EAN):`]}),(0,W.jsx)(`p`,{style:{fontSize:12,opacity:.75,marginTop:8},children:`Select which status values should keep using product-name folders.`}),(0,W.jsx)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:8,marginTop:10},children:Object.entries(Me).map(([e,t])=>(0,W.jsxs)(`label`,{className:`sor-cat-option${Se.has(e)?` selected`:``}`,style:{width:`auto`,minWidth:132,padding:`8px 10px`},children:[(0,W.jsx)(`input`,{type:`checkbox`,checked:Se.has(e),onChange:()=>Le(e)}),(0,W.jsxs)(`span`,{className:`sor-cat-name`,children:[e,` (`,t,`)`]})]},e))}),(0,W.jsx)(`div`,{className:`sor-table-wrap`,style:{maxHeight:200,marginTop:8},children:(0,W.jsxs)(`table`,{className:`sor-tbl`,children:[(0,W.jsx)(`thead`,{children:(0,W.jsxs)(`tr`,{children:[(0,W.jsx)(`th`,{children:`Code`}),(0,W.jsx)(`th`,{children:`Product Name`}),(0,W.jsx)(`th`,{children:`Status`})]})}),(0,W.jsxs)(`tbody`,{children:[Ne.map((e,t)=>(0,W.jsxs)(`tr`,{children:[(0,W.jsx)(`td`,{children:e.code}),(0,W.jsx)(`td`,{children:e.name}),(0,W.jsx)(`td`,{children:e.status})]},t)),Ne.length===0&&(0,W.jsx)(`tr`,{children:(0,W.jsx)(`td`,{colSpan:3,style:{textAlign:`center`,opacity:.7},children:`No status selected.`})})]})]})}),(0,W.jsxs)(`p`,{style:{marginTop:12},children:[`Use product names for `,(0,W.jsx)(`strong`,{children:Ne.length}),` selected product(s)?`]}),(0,W.jsxs)(`p`,{style:{fontSize:12,opacity:.7},children:[`Format: `,(0,W.jsxs)(`strong`,{children:[H.brand,`_Product Name_Status`]})]}),(0,W.jsxs)(`div`,{style:{display:`flex`,gap:10,marginTop:12},children:[(0,W.jsx)(`button`,{className:`sor-btn-primary`,disabled:Se.size===0,onClick:()=>{xe(!0),ve(!1)},children:`Yes, Use Product Name`}),(0,W.jsx)(`button`,{className:`sor-btn-secondary`,onClick:()=>{xe(!1),Ce(new Set),ve(!1)},children:`No, Skip These`})]})]})]})}),ye&&H&&(0,W.jsx)(`div`,{className:`sor-modal`,onClick:e=>{e.target===e.currentTarget&&be(!1)},children:(0,W.jsxs)(`div`,{className:`sor-modal-card`,children:[(0,W.jsxs)(`div`,{className:`sor-panel-head`,children:[(0,W.jsx)(`h2`,{children:`Duplicate Barcodes Found`}),(0,W.jsx)(`button`,{className:`sor-btn-icon`,onClick:()=>be(!1),children:`Close`})]}),(0,W.jsxs)(`div`,{className:`sor-guide-copy`,children:[(0,W.jsx)(`p`,{children:`The following barcodes are shared by multiple products:`}),(0,W.jsx)(`div`,{className:`sor-table-wrap`,style:{maxHeight:200,marginTop:8},children:(0,W.jsxs)(`table`,{className:`sor-tbl`,children:[(0,W.jsx)(`thead`,{children:(0,W.jsxs)(`tr`,{children:[(0,W.jsx)(`th`,{children:`Barcode`}),(0,W.jsx)(`th`,{children:`Count`}),(0,W.jsx)(`th`,{children:`Products`})]})}),(0,W.jsx)(`tbody`,{children:Object.entries(H.duplicates).map(([e,t])=>(0,W.jsxs)(`tr`,{children:[(0,W.jsx)(`td`,{children:e}),(0,W.jsx)(`td`,{children:t}),(0,W.jsx)(`td`,{children:H.duplicate_products.filter(t=>t.barcode===e).map(e=>e.name).join(`; `)})]},e))})]})}),(0,W.jsx)(`p`,{style:{marginTop:12},children:`Do you want to create one subfolder per product for these, or keep one shared folder per barcode?`}),(0,W.jsxs)(`div`,{style:{display:`flex`,gap:10,marginTop:12},children:[(0,W.jsx)(`button`,{className:`sor-btn-primary`,onClick:()=>{Te(!0),be(!1)},children:`One Folder Per Product`}),(0,W.jsx)(`button`,{className:`sor-btn-secondary`,onClick:()=>{Te(!1),be(!1)},children:`Keep Shared Folder`})]})]})]})}),b&&(0,W.jsx)(`div`,{className:`sor-img-preview`,style:{left:b.x,top:b.y},children:(0,W.jsx)(`img`,{src:b.src,alt:``})}),v&&(0,W.jsx)(`div`,{className:`sor-modal`,onClick:e=>{e.target===e.currentTarget&&y(!1)},children:(0,W.jsxs)(`div`,{className:`sor-modal-card`,children:[(0,W.jsxs)(`div`,{className:`sor-panel-head`,children:[(0,W.jsx)(`h2`,{children:`Guide`}),(0,W.jsx)(`button`,{className:`sor-btn-icon`,onClick:()=>y(!1),children:`Close`})]}),(0,W.jsxs)(`div`,{className:`sor-guide-copy`,children:[(0,W.jsx)(`p`,{children:`1. Click Choose folder and select the product image folder.`}),(0,W.jsx)(`p`,{children:`2. Click Scan to preview every detected item, EAN group, and image thumbnail.`}),(0,W.jsx)(`p`,{children:`3. Use the search bar to filter by EAN or image name.`}),(0,W.jsx)(`p`,{children:`4. Open Gallery to review all images inside the selected folder.`}),(0,W.jsx)(`p`,{children:`5. Click Sort and report to create one folder per EAN and write EAN_report.xlsx.`}),(0,W.jsx)(`p`,{children:`6. Open Report to preview, export, or open the Excel report on this computer.`})]})]})}),(0,W.jsx)(`style`,{children:`
        /* ── Shell layout ── */
        .sor-shell {
          display: grid !important;
          grid-template-columns: 210px 1fr;
          min-height: calc(100vh - var(--topbar-height, 56px) - 48px);
          padding: 0 !important;
          gap: 0;
        }

        /* ── Sidebar ── */
        .sor-sidebar {
          display: flex;
          flex-direction: column;
          padding: 34px 28px;
          background: var(--bg-sidebar);
          border-right: 1px solid var(--border);
        }
        .sor-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 17px;
          font-weight: 800;
          color: var(--text-primary);
        }
        .sor-brand-mark {
          display: grid;
          place-items: center;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: #f5f7fb;
          color: #121820;
          font-size: 18px;
          font-weight: 800;
          flex-shrink: 0;
        }
        .sor-nav {
          display: grid;
          gap: 14px;
          margin-top: 54px;
        }
        .sor-nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 11px 6px;
          border-radius: 8px;
          background: transparent;
          border: 0;
          color: var(--text-secondary);
          text-align: left;
          cursor: pointer;
          font: inherit;
          font-size: 14px;
          font-weight: 500;
        }
        .sor-nav-dot {
          width: 8px;
          height: 8px;
          border: 1px solid currentColor;
          border-radius: 2px;
          flex-shrink: 0;
        }
        .sor-nav-item.active {
          color: var(--accent);
        }
        .sor-nav-item.active::before {
          content: "";
          width: 4px;
          height: 24px;
          margin-left: -28px;
          border-radius: 999px;
          background: var(--accent);
        }
        .sor-sidebar-spacer {
          flex: 1;
        }
        .sor-guide-btn {
          min-height: 44px;
          margin-bottom: 14px;
          font-weight: 800;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--bg-card);
          color: var(--text-primary);
          cursor: pointer;
          font: inherit;
          font-size: 14px;
        }
        .sor-mini-card {
          display: grid;
          gap: 10px;
          min-height: 94px;
          padding: 18px;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--bg-card);
        }
        .sor-mini-card span {
          color: var(--text-muted);
          font-size: 13px;
        }
        .sor-mini-card strong {
          overflow: hidden;
          color: var(--text-primary);
          font-size: 13px;
          font-weight: 600;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        /* ── Main content ── */
        .sor-content {
          padding: 24px 30px 34px 36px;
          overflow: auto;
        }
        .sor-view-content {
          margin-top: 28px;
        }

        /* ── Topbar ── */
        .sor-topbar {
          display: grid;
          grid-template-columns: minmax(320px, 1fr) 150px 80px auto;
          align-items: center;
          gap: 14px;
        }
        .sor-search {
          display: flex;
          align-items: center;
          gap: 12px;
          height: 44px;
          padding: 0 18px;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--bg-input);
        }
        .sor-search span {
          color: var(--text-secondary);
          font-size: 13px;
          font-weight: 800;
          flex-shrink: 0;
        }
        .sor-search input {
          width: 100%;
          border: 0;
          outline: 0;
          background: transparent;
          color: var(--text-primary);
          font: inherit;
          font-size: 14px;
        }
        .sor-search input::placeholder {
          color: var(--text-muted);
        }
        .sor-btn-compact {
          min-height: 44px;
          padding: 0 16px;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--bg-card);
          color: var(--text-primary);
          font: inherit;
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
          white-space: nowrap;
        }
        .sor-btn-compact:hover:not(:disabled) {
          background: var(--bg-card-hover);
        }
        .sor-btn-compact:disabled {
          opacity: 0.4;
          cursor: default;
        }
        .sor-btn-icon {
          min-width: 44px;
          height: 44px;
          padding: 0 14px;
          border: 0;
          border-radius: 8px;
          background: var(--bg-input);
          color: var(--text-primary);
          font: inherit;
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
        }
        .sor-profile {
          justify-self: end;
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--text-primary);
          font-size: 14px;
        }
        .sor-avatar {
          display: grid;
          place-items: center;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f09834, #b62731);
          font-size: 12px;
          font-weight: 800;
          color: white;
        }

        /* ── Hero ── */
        .sor-hero {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 290px;
          gap: 18px;
        }
        .sor-hero-main {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 310px;
          padding: 26px;
          overflow: hidden;
          border-radius: 8px;
          background:
            linear-gradient(90deg, rgba(8, 15, 24, 0.22), rgba(8, 15, 24, 0.76)),
            radial-gradient(circle at 28% 38%, rgba(255, 121, 43, 0.65), transparent 28%),
            radial-gradient(circle at 72% 24%, rgba(192, 29, 48, 0.72), transparent 32%),
            linear-gradient(140deg, #253546 0%, #13202f 45%, #070d13 100%);
          box-shadow: var(--shadow-lg);
        }
        .sor-hero-main::after {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.045) 1px, transparent 1px);
          background-size: 42px 42px;
          mask-image: linear-gradient(90deg, black, transparent);
          pointer-events: none;
        }
        .sor-chips {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .sor-chip {
          padding: 8px 18px;
          border-radius: 999px;
          background: rgba(8, 10, 18, 0.45);
          color: #fff;
          font-size: 13px;
        }
        .sor-eyebrow {
          margin: 0 0 10px;
          color: var(--accent);
          font-weight: 700;
          font-size: 14px;
        }
        .sor-headline {
          max-width: 620px;
          margin: 0;
          font-size: 54px;
          line-height: 1.02;
          color: var(--text-primary);
          font-weight: 800;
        }
        .sor-hero-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .sor-btn-primary {
          min-height: 46px;
          padding: 0 24px;
          border: 0;
          border-radius: 8px;
          background: linear-gradient(135deg, #ff7836, #bb2639);
          color: white;
          font: inherit;
          font-weight: 800;
          cursor: pointer;
        }
        .sor-btn-primary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .sor-btn-secondary {
          min-height: 46px;
          padding: 0 24px;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--bg-card);
          color: var(--text-primary);
          font: inherit;
          font-weight: 800;
          cursor: pointer;
        }
        .sor-btn-secondary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Toggle */
        .sor-toggle {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--text-primary);
          font-size: 14px;
          cursor: pointer;
          user-select: none;
        }
        .sor-toggle input { display: none; }
        .sor-toggle > span {
          position: relative;
          width: 42px;
          height: 24px;
          border-radius: 999px;
          background: var(--border-light);
          flex-shrink: 0;
        }
        .sor-toggle > span::after {
          content: "";
          position: absolute;
          top: 4px;
          left: 4px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #fff;
          transition: transform 0.2s ease;
        }
        .sor-toggle input:checked + span {
          background: var(--accent);
        }
        .sor-toggle input:checked + span::after {
          transform: translateX(18px);
        }

        /* Action card (status) */
        .sor-action-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 310px;
          padding: 28px;
          border: 1px solid var(--border);
          border-radius: 8px;
          background:
            radial-gradient(circle at 80% 24%, rgba(218, 35, 45, 0.9), transparent 34%),
            linear-gradient(140deg, #8b6729, #931f30 58%, #101823);
        }
        .sor-card-label {
          color: rgba(255, 255, 255, 0.7);
          font-size: 13px;
        }
        .sor-action-card strong {
          display: block;
          margin-top: 12px;
          font-size: 30px;
          color: white;
        }
        .sor-action-card p {
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.5;
          font-size: 14px;
          margin: 0;
        }
        .sor-btn-gold {
          width: 100%;
          min-height: 46px;
          padding: 0 24px;
          border: 0;
          border-radius: 8px;
          background: linear-gradient(135deg, #d99b2f, #af6425);
          color: white;
          font: inherit;
          font-weight: 800;
          cursor: pointer;
        }

        /* ── Stats ── */
        .sor-stats {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 14px;
          margin-top: 26px;
        }
        .sor-stat {
          display: grid;
          gap: 8px;
          padding: 18px;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--bg-card);
        }
        .sor-stat span {
          color: var(--text-muted);
          font-size: 13px;
        }
        .sor-stat strong {
          font-size: 30px;
          color: var(--text-primary);
        }

        /* ── Workspace ── */
        .sor-workspace {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 310px;
          gap: 18px;
          margin-top: 22px;
        }

        /* ── Panel ── */
        .sor-panel {
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--bg-card);
          overflow: hidden;
        }
        .sor-panel-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 18px 20px;
          flex-wrap: wrap;
        }
        .sor-panel-head h2 {
          margin: 0;
          font-size: 18px;
          color: var(--text-primary);
        }
        .sor-panel-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .sor-count {
          color: var(--text-muted);
          font-size: 13px;
        }

        /* ── Table ── */
        .sor-table-wrap {
          max-height: 420px;
          overflow: auto;
        }
        .sor-report-wrap {
          max-height: calc(100vh - 200px);
        }
        .sor-tbl {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
        }
        .sor-tbl th,
        .sor-tbl td {
          padding: 12px 20px;
          border-top: 1px solid var(--border);
          text-align: left;
          vertical-align: middle;
        }
        .sor-tbl th {
          position: sticky;
          top: 0;
          z-index: 1;
          background: var(--bg-input);
          color: var(--text-secondary);
          font-weight: 700;
        }
        .sor-tbl td {
          color: var(--text-primary);
        }
        .sor-tbl tbody tr:hover {
          background: var(--bg-card-hover);
        }
        .sor-empty {
          color: var(--text-muted);
          text-align: center;
          padding: 40px 20px !important;
        }
        .sor-empty-box {
          color: var(--text-muted);
          text-align: center;
          padding: 40px;
        }
        .sor-path-cell {
          max-width: 260px;
          overflow: hidden;
          color: var(--text-secondary);
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        /* Thumbnails */
        .sor-thumb {
          display: block;
          width: 74px;
          height: 54px;
          border: 1px solid var(--border);
          border-radius: 8px;
          object-fit: cover;
          background: var(--bg-input);
          cursor: zoom-in;
        }
        .sor-thumb-placeholder {
          display: grid;
          place-items: center;
          color: var(--text-muted);
          font-size: 11px;
          cursor: default;
        }

        /* Tags */
        .sor-tag {
          display: inline-flex;
          min-width: 84px;
          justify-content: center;
          padding: 5px 9px;
          border-radius: 999px;
          background: rgba(73, 209, 125, 0.13);
          color: var(--green);
          font-weight: 800;
        }
        .sor-tag.missing {
          background: rgba(255, 107, 44, 0.14);
          color: var(--accent);
        }

        /* Products */
        .sor-product-list {
          display: grid;
          gap: 10px;
          max-height: 420px;
          padding: 0 18px 18px;
          overflow: auto;
        }
        .sor-product-row {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          padding: 12px 14px;
          border-radius: 8px;
          background: var(--bg-input);
          font-size: 13px;
          color: var(--text-primary);
        }
        .sor-product-row span {
          color: var(--text-muted);
        }

        /* ── Gallery ── */
        .sor-gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
          gap: 16px;
          max-height: calc(100vh - 200px);
          padding: 0 20px 20px;
          overflow: auto;
        }
        .sor-gallery-card {
          overflow: hidden;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--bg-input);
          transition: border-color 0.15s, transform 0.15s;
        }
        .sor-gallery-card:hover {
          border-color: var(--accent);
          transform: translateY(-2px);
        }
        .sor-gallery-card img {
          display: block;
          width: 100%;
          aspect-ratio: 4 / 3;
          object-fit: cover;
          background: var(--bg-input);
        }
        .sor-gallery-card div {
          display: grid;
          gap: 6px;
          padding: 12px;
        }
        .sor-gallery-card strong {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 13px;
          color: var(--text-primary);
        }
        .sor-gallery-card span {
          color: var(--green);
          font-size: 12px;
          font-weight: 800;
        }

        /* ── Hover preview ── */
        .sor-img-preview {
          position: fixed;
          z-index: 100;
          pointer-events: none;
          padding: 6px;
          border: 1px solid var(--border);
          border-radius: 12px;
          background: var(--bg-card);
          box-shadow: var(--shadow-lg);
        }
        .sor-img-preview img {
          display: block;
          max-width: 360px;
          max-height: 360px;
          border-radius: 8px;
          object-fit: contain;
          background: var(--bg-input);
        }

        /* ── Guide modal ── */
        .sor-modal {
          position: fixed;
          inset: 0;
          z-index: 10;
          display: grid;
          place-items: center;
          padding: 24px;
          background: rgba(0, 0, 0, 0.56);
        }
        .sor-modal-card {
          width: min(620px, 100%);
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--bg-modal);
          box-shadow: var(--shadow-lg);
        }
        .sor-guide-copy {
          display: grid;
          gap: 10px;
          padding: 0 20px 24px;
          color: var(--text-primary);
        }
        .sor-guide-copy p {
          margin: 0;
          line-height: 1.5;
          font-size: 14px;
        }

        /* ── Nav icons ── */
        .sor-nav-icon {
          width: 22px;
          height: 22px;
          object-fit: contain;
          flex-shrink: 0;
          opacity: 0.7;
          filter: grayscale(1);
          transition: opacity 0.15s, filter 0.15s;
        }
        .sor-nav-item.active .sor-nav-icon {
          opacity: 1;
          filter: none;
        }
        .sor-nav-item:hover .sor-nav-icon {
          opacity: 1;
        }

        /* ── Categorize view ── */
        .sor-cat-body {
          padding: 0 20px 24px;
        }
        .sor-cat-desc {
          margin: 0 0 18px;
          color: var(--text-secondary);
          font-size: 14px;
          line-height: 1.6;
        }
        .sor-cat-select-all {
          margin-bottom: 14px;
        }
        .sor-cat-check {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          color: var(--text-primary);
          font-size: 13px;
          font-weight: 700;
          user-select: none;
        }
        .sor-cat-check input {
          width: 16px;
          height: 16px;
          accent-color: var(--accent);
          cursor: pointer;
        }
        .sor-cat-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
        }
        .sor-cat-option {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 16px;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--bg-input);
          cursor: pointer;
          user-select: none;
          transition: border-color 0.15s, background 0.15s;
        }
        .sor-cat-option:hover {
          border-color: var(--accent);
        }
        .sor-cat-option.selected {
          border-color: var(--accent);
          background: rgba(249, 115, 22, 0.08);
        }
        .sor-cat-option input {
          width: 16px;
          height: 16px;
          accent-color: var(--accent);
          cursor: pointer;
        }
        .sor-cat-name {
          color: var(--text-primary);
          font-size: 14px;
          font-weight: 600;
        }
        .sor-cat-actions {
          margin-top: 20px;
          display: flex;
          gap: 10px;
        }

        .sor-status-file-row {
          display: grid;
          grid-template-columns: auto minmax(0, 1fr) auto;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }
        .sor-hidden-file {
          display: none;
        }
        .sor-status-file-name {
          min-width: 0;
          overflow: hidden;
          color: var(--text-secondary);
          font-size: 13px;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .sor-cat-workspace {
          display: grid;
          gap: 18px;
        }

        .sor-row-selected {
          background: rgba(249, 115, 22, 0.06) !important;
        }

        .sor-cat-move-panel {
          min-height: 0;
        }
        .sor-cat-move-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          padding: 0 20px 20px;
        }
        .sor-cat-move-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 18px 12px;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--bg-input);
          color: var(--text-primary);
          font: inherit;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: border-color 0.15s, background 0.15s, transform 0.15s;
        }
        .sor-cat-move-btn:hover:not(:disabled) {
          border-color: var(--accent);
          background: rgba(249, 115, 22, 0.08);
          transform: translateY(-1px);
        }
        .sor-cat-move-btn:disabled {
          opacity: 0.35;
          cursor: default;
        }
        .sor-cat-move-icon {
          font-size: 24px;
        }

        /* ── Light mode overrides ── */
        [data-theme="light"] .sor-hero-main {
          background:
            linear-gradient(90deg, rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0.76)),
            radial-gradient(circle at 28% 38%, rgba(255, 121, 43, 0.45), transparent 28%),
            radial-gradient(circle at 72% 24%, rgba(192, 29, 48, 0.42), transparent 32%),
            linear-gradient(140deg, #fef3e2 0%, #fde8d8 45%, #fceade 100%);
        }
        [data-theme="light"] .sor-hero-main::after {
          background-image:
            linear-gradient(rgba(0, 0, 0, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 0, 0, 0.04) 1px, transparent 1px);
        }
        [data-theme="light"] .sor-action-card {
          background:
            radial-gradient(circle at 80% 24%, rgba(218, 35, 45, 0.7), transparent 34%),
            linear-gradient(140deg, #e8a84c, #c03040 58%, #f5e6d0);
        }
        [data-theme="light"] .sor-chip {
          background: rgba(0, 0, 0, 0.08);
          color: var(--text-primary);
        }
        [data-theme="light"] .sor-brand-mark {
          background: var(--bg-input);
          color: var(--text-primary);
        }
        [data-theme="light"] .sor-tag {
          background: rgba(22, 163, 74, 0.1);
        }
        [data-theme="light"] .sor-tag.missing {
          background: rgba(255, 107, 44, 0.1);
        }

        /* ── Responsive ── */
        @media (max-width: 1120px) {
          .sor-shell {
            grid-template-columns: 176px 1fr !important;
          }
          .sor-topbar,
          .sor-hero,
          .sor-workspace {
            grid-template-columns: 1fr;
          }
          .sor-profile {
            justify-self: start;
          }
          .sor-headline {
            font-size: 44px;
          }
          .sor-action-card {
            min-height: 180px;
          }
        }
        @media (max-width: 860px) {
          .sor-shell {
            grid-template-columns: 1fr !important;
          }
          .sor-sidebar {
            display: none;
          }
          .sor-stats {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `})]})}var Ai=[{key:`unsorted`,title:`Unsorted`,fixed:!0,imageIds:[]},{key:`packshot`,title:`Packshot`,imageIds:[]},{key:`lifestyle-human`,title:`Lifestyle/Human`,imageIds:[]},{key:`lifestyle-normal`,title:`Lifestyle/Normal`,imageIds:[]},{key:`artwork`,title:`Artwork`,imageIds:[]},{key:`duplicate`,title:`Duplicate`,fixed:!0,imageIds:[]}],ji=[`Packshot`,`Human`,`Normal Lifestyle`,`Artwork`],Mi=[{key:`packshot`,label:`PACK SHOT`},{key:`human`,label:`HUMAN`},{key:`normal_lifestyle`,label:`NORMAL LIFESTYLE`},{key:`artwork`,label:`ARTWORK`},{key:`video`,label:`VIDEO`}],Ni={packshot:[],human:[],normal_lifestyle:[],artwork:[],video:[]},Pi={packshot:`PACK SHOT`,human:`HUMAN`,normal_lifestyle:`NORMAL LIFESTYLE`,artwork:`ARTWORK`,video:`VIDEO`};function Fi(e){if(!/^\d{13}$/.test(e))return!1;let t=0;for(let n=0;n<12;n++)t+=Number(e[n])*(n%2==0?1:3);return(10-t%10)%10===Number(e[12])}function Ii(e){return e<1024?`${e} B`:e<1048576?`${(e/1024).toFixed(1)} KB`:`${(e/1048576).toFixed(2)} MB`}function Li(e,t){return Wn(`/api/ean-renamer/images/${encodeURIComponent(e)}/thumbnail?folderPath=${encodeURIComponent(t)}`)}function Ri(e){return e===`lifestyle-human`?`lifestyle_human`:e===`lifestyle-normal`?`lifestyle_normal`:e}function zi(e=[],t=!1){return{id:`dup-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,imageIds:e,first:t}}function Bi(e){return e===`per-category`?`per_category`:e}function Vi(e){return e===`in-folder`?`rename`:`copy`}function Hi(e){return e.outputPath||e.outputRelativePath||e.newName||``}function Ui(){let{notify:e}=Hn(),[t,n]=(0,_.useState)(``),[r,i]=(0,_.useState)(``),[a,o]=(0,_.useState)(``),[s,c]=(0,_.useState)(``),[l,u]=(0,_.useState)(!1),[d,f]=(0,_.useState)([]),[p,m]=(0,_.useState)(Ai.map(e=>({...e,imageIds:[]}))),[h,g]=(0,_.useState)({...Ni}),[v,y]=(0,_.useState)({...Pi}),[b,x]=(0,_.useState)(new Set),[S,C]=(0,_.useState)({}),[w,ee]=(0,_.useState)({}),[T,E]=(0,_.useState)({}),[D,O]=(0,_.useState)(!1),[k,A]=(0,_.useState)(!1),[j,te]=(0,_.useState)(!0),[M,ne]=(0,_.useState)(220),[N,P]=(0,_.useState)(null),[F,re]=(0,_.useState)({outputMode:`copy`,namingMode:`per-category`}),[I,L]=(0,_.useState)([]),[R,z]=(0,_.useState)(``),[ie,ae]=(0,_.useState)(!1),[B,V]=(0,_.useState)([]),[H,oe]=(0,_.useState)(null),[se,ce]=(0,_.useState)(null),le=(0,_.useRef)(null),ue=(0,_.useRef)(null),de=(0,_.useMemo)(()=>{let e=new Map;return d.forEach(t=>e.set(t.id,t)),e},[d]),fe=Fi(a.trim()||r),pe=d.length,me=b.size,he=Object.values(h).reduce((e,t)=>e+t.reduce((e,t)=>e+t.imageIds.length,0),0);async function ge(){try{let e=await G(`/api/ean-renamer/folder/pick`,{method:`POST`});e.folderPath&&await _e(e.folderPath)}catch(t){e(`Failed to pick folder`,{type:`error`,message:t instanceof Error?t.message:String(t)})}}async function _e(t){try{let r=await G(`/api/ean-renamer/folder/open`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({folderPath:t})});n(r.folderPath),i(r.ean||``),f(r.images),x(new Set),L([]),z(``),g({...Ni}),ee({}),E({}),m(e=>e.map(e=>e.key===`unsorted`?{...e,imageIds:r.images.map(e=>e.id)}:{...e,imageIds:[]})),e(`Folder loaded`,{type:`success`,message:`${r.images.length} images found`})}catch(t){e(`Failed to load folder`,{type:`error`,message:t instanceof Error?t.message:String(t)})}}async function ve(){t&&await _e(t)}function ye(){t&&window.__grimoire?.revealInExplorer&&window.__grimoire.revealInExplorer(t)}async function be(n){try{let e=await G(`/api/ean-renamer/folder/pick-output`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({category:n,initialPath:S[n]||t})});e.folderPath&&C(t=>({...t,[n]:e.folderPath}))}catch(t){e(`Failed to pick output folder`,{type:`error`,message:t instanceof Error?t.message:String(t)})}}function U(e){x(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n})}function xe(e,t){let n=b.has(t)?Array.from(b):[t];V(n),P(null),e.dataTransfer.effectAllowed=`move`,e.dataTransfer.setData(`text/plain`,n.join(`,`));let r=document.createElement(`div`);r.className=`ren-drag-ghost`,r.textContent=`${n.length} image${n.length>1?`s`:``}`,document.body.appendChild(r),e.dataTransfer.setDragImage(r,30,16),requestAnimationFrame(()=>r.remove())}function Se(e,t){e.preventDefault(),e.dataTransfer.dropEffect=`move`,oe(t),ce(null)}function Ce(){oe(null),ce(null)}function we(e,t){e.preventDefault(),oe(null),ce(null),t!==`duplicate`&&B.length!==0&&(m(e=>{let n=e.map(e=>({...e,imageIds:e.imageIds.filter(e=>!B.includes(e))})),r=n.find(e=>e.key===t);return r&&r.key!==`duplicate`&&(r.imageIds=[...r.imageIds,...B]),n}),g(e=>{let t={...e};return Mi.forEach(({key:n})=>{t[n]=e[n].map(e=>({...e,imageIds:e.imageIds.filter(e=>!B.includes(e))})).filter(e=>e.imageIds.length>0)}),t}),V([]))}function Te(e,t){e.preventDefault(),e.stopPropagation(),e.dataTransfer.dropEffect=`move`,oe(`duplicate`),ce(t)}function Ee(e,t){e.preventDefault(),e.stopPropagation(),oe(null),ce(null),B.length!==0&&(m(e=>e.map(e=>({...e,imageIds:e.imageIds.filter(e=>!B.includes(e))}))),g(e=>{let n={...e};return Mi.forEach(({key:t})=>{n[t]=e[t].map(e=>({...e,imageIds:e.imageIds.filter(e=>!B.includes(e))})).filter(e=>e.imageIds.length>0)}),n[t]=[...n[t],zi([...B],!1)],n}),V([]))}function De(e){g(t=>({...t,[e]:[...t[e],zi([],!1)]}))}function Oe(e,t){g(n=>({...n,[e]:n[e].map(e=>e.id===t?{...e,first:!e.first}:e)}))}function ke(e,t){let n=h[e].find(e=>e.id===t)?.imageIds||[];g(n=>({...n,[e]:n[e].filter(e=>e.id!==t)})),n.length>0&&m(e=>e.map(e=>e.key===`unsorted`?{...e,imageIds:[...e.imageIds,...n]}:e))}function Ae(){V([]),oe(null),ce(null),P(null)}function je(e,t){P({image:t,x:e.clientX,y:e.clientY})}function Me(){let t=prompt(`Category name:`);if(!t?.trim())return;let n=t.toLowerCase().replace(/\s+/g,`-`).replace(/[^a-z0-9-]/g,``);if(p.some(e=>e.key===n)){e(`Column already exists`,{type:`warning`});return}m(e=>[...e,{key:n,title:t.trim(),imageIds:[]}])}function Ne(e){let t=p.find(t=>t.key===e);if(!t||t.fixed)return;let n=prompt(`New name:`,t.title);n?.trim()&&m(t=>t.map(t=>t.key===e?{...t,title:n.trim()}:t))}function Pe(e){let t=p.find(t=>t.key===e);!t||t.fixed||m(n=>{let r=t.imageIds;return n.filter(t=>t.key!==e).map(e=>e.key===`unsorted`?{...e,imageIds:[...e.imageIds,...r]}:e)})}function Fe(e){E(t=>{let n={...t,[e]:!t[e]};return n[e]||ee(t=>{let n={...t};return delete n[e],n}),n})}function Ie(e,t){ee(n=>{let r=new Set(n[e]||[]);return r.has(t)?r.delete(t):r.add(t),{...n,[e]:r}})}function Le(e,t){return w[e]?.has(t)??!1}let Re=(0,_.useCallback)(()=>{let e={},n={},r=[],i=[],o=[],c=[],u={packshot:`packshot`,human:`lifestyle-human`,normal_lifestyle:`lifestyle-normal`,artwork:`artwork`,video:`video`};p.forEach(t=>{if(t.key===`unsorted`||t.key===`duplicate`)return;let n=Ri(t.key);e[n]=t.title,i.push(n),t.imageIds.forEach(e=>r.push({id:e,category:n,categoryName:t.title}))}),Mi.forEach(({key:t})=>{let n=u[t],a=Ri(n),o=p.find(e=>e.key===n)?.title||t.replace(/_/g,` `);e[a]||(e[a]=o,i.push(a)),h[t].forEach(e=>{e.imageIds.forEach(e=>r.push({id:e,category:a,categoryName:o}))})}),Object.entries(w).forEach(([,e])=>{e.forEach(e=>o.push(e))}),Mi.forEach(({key:e})=>{h[e].forEach(e=>{e.imageIds.length!==0&&(c.push({ids:[...e.imageIds],first:e.first}),e.first&&e.imageIds.forEach(e=>{o.includes(e)||o.push(e)}))})});let d={Packshot:`packshot`,Human:`lifestyle_human`,"Normal Lifestyle":`lifestyle_normal`,Artwork:`artwork`};return Object.entries(S).forEach(([e,t])=>{n[d[e]||e]=t}),{folderPath:t,outputFolderPaths:n,customEan:a.trim()||void 0,productName:s.trim()||void 0,productNameContinuous:l,namingMode:Bi(F.namingMode),outputCategories:e,outputMode:Vi(F.outputMode),categoryOrder:i,assignments:r,priorityIds:o.length>0?o:void 0,duplicateGroups:c}},[t,p,h,v,S,a,s,l,F,w,T]);async function ze(){if(t){ae(!0);try{L((await G(`/api/ean-renamer/batch/preview`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(Re())})).items),A(!0)}catch(t){e(`Preview failed`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{ae(!1)}}}async function Be(){if(t){ae(!0);try{let n=await G(`/api/ean-renamer/batch/apply`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(Re())}),r=Object.values(S).filter(Boolean);F.outputMode===`in-folder`&&r.push(t),r.length>0&&localStorage.setItem(`grimoire-ean-renamer-output-roots`,JSON.stringify(Array.from(new Set(r)))),L(n.items),n.logPath&&z(n.logPath);let i=n.renamed??n.items.length,a=n.skipped??n.skippedCount??0,o=Array.isArray(n.conflicts)?n.conflicts.length:n.conflicts??0;e(`Rename complete`,{type:o>0?`warning`:`success`,message:`${i} processed, ${a} skipped, ${o} conflicts`})}catch(t){e(`Rename failed`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{ae(!1)}}}async function Ve(){if(!(!R||!t)){ae(!0);try{await G(`/api/ean-renamer/rename/undo`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({folderPath:t,logPath:R})}),e(`Undo complete`,{type:`success`}),z(``),await _e(t)}catch(t){e(`Undo failed`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{ae(!1)}}}function He(e){e.preventDefault();let t=e.clientY,n=M;function r(e){ne(Math.max(80,Math.min(500,n-(e.clientY-t))))}function i(){document.removeEventListener(`mousemove`,r),document.removeEventListener(`mouseup`,i)}document.addEventListener(`mousemove`,r),document.addEventListener(`mouseup`,i)}(0,_.useEffect)(()=>{if(!D)return;function e(e){ue.current&&!ue.current.contains(e.target)&&O(!1)}return document.addEventListener(`mousedown`,e),()=>document.removeEventListener(`mousedown`,e)},[D]);let Ue=(0,_.useMemo)(()=>{let e=0,t=0,n=0;return I.forEach(r=>{(r.status||`rename`)===`rename`?e++:r.status===`skip`?t++:n++}),{renamed:e,skipped:t,conflicts:n}},[I]);function We(e,n){let r=de.get(e);if(!r)return null;let i=b.has(e),a=B.includes(e),o=n&&T[n],s=n?Le(n,e):!1;return(0,W.jsxs)(`div`,{className:`ren-card ${i?`ren-card-selected`:``} ${a?`ren-card-dragging`:``} ${s?`ren-card-priority`:``}`,draggable:!0,onMouseEnter:e=>je(e,r),onMouseMove:e=>je(e,r),onMouseLeave:()=>P(null),onDragStart:t=>xe(t,e),onDragEnd:Ae,children:[(0,W.jsx)(`input`,{type:`checkbox`,className:`ren-card-check`,checked:i,onChange:()=>U(e)}),(0,W.jsx)(`div`,{className:`ren-card-thumb`,children:(0,W.jsx)(`img`,{src:Li(e,t),alt:r.name,loading:`lazy`})}),(0,W.jsxs)(`div`,{className:`ren-card-meta`,children:[(0,W.jsx)(`span`,{className:`ren-card-name`,title:r.name,children:r.name}),(0,W.jsxs)(`span`,{className:`ren-card-info`,children:[r.width,`×`,r.height,` · `,Ii(r.sizeBytes)]}),(0,W.jsxs)(`div`,{className:`ren-card-chips`,children:[(0,W.jsx)(`span`,{className:`ren-chip`,children:r.extension.toUpperCase()}),I.some(t=>t.id===e&&(t.status||`rename`)===`rename`)&&(0,W.jsx)(`span`,{className:`ren-chip ren-chip-renamed`,children:`renamed`})]})]}),o&&(0,W.jsx)(`button`,{className:`ren-priority-btn ${s?`ren-priority-active`:``}`,title:s?`Remove first-image priority`:`Label as first image`,onClick:t=>{t.stopPropagation(),n&&Ie(n,e)},children:`★`}),(0,W.jsx)(`span`,{className:`ren-card-grip`,title:`Drag`,children:`☰`})]},e)}return(0,W.jsxs)(`div`,{className:`ren-root`,children:[(0,W.jsx)(`style`,{children:Wi}),(0,W.jsx)(`div`,{className:`ren-topbar`,children:(0,W.jsxs)(`div`,{className:`ren-topbar-row`,children:[(0,W.jsxs)(`div`,{className:`ren-folder-group`,children:[(0,W.jsx)(`input`,{className:`ren-path-input`,readOnly:!0,value:t,placeholder:`No folder selected`}),(0,W.jsx)(`button`,{className:`btn btn-primary btn-sm`,onClick:ge,children:`Pick Folder`}),(0,W.jsx)(`button`,{className:`btn btn-secondary btn-sm`,onClick:ye,disabled:!t,children:`Open`}),(0,W.jsx)(`button`,{className:`btn btn-secondary btn-sm`,onClick:ve,disabled:!t,children:`Refresh`})]}),(0,W.jsxs)(`div`,{className:`ren-stat-group`,children:[(0,W.jsxs)(`label`,{className:`ren-stat`,children:[(0,W.jsx)(`span`,{children:`EAN`}),(0,W.jsx)(`input`,{className:`ren-stat-input`,readOnly:!0,value:r,placeholder:`--`})]}),(0,W.jsx)(`span`,{className:`ren-ean-badge ${fe?`valid`:`warn`}`,children:fe?`✓`:`⚠`}),(0,W.jsxs)(`label`,{className:`ren-stat`,children:[(0,W.jsx)(`span`,{children:`Custom EAN`}),(0,W.jsx)(`input`,{className:`ren-stat-input`,value:a,onChange:e=>o(e.target.value),placeholder:`Override`})]}),(0,W.jsxs)(`div`,{className:`ren-stat ren-product-stat`,children:[(0,W.jsx)(`span`,{children:`Product Name`}),(0,W.jsx)(`input`,{className:`ren-stat-input ren-product-input`,value:s,onChange:e=>c(e.target.value),placeholder:`Output name`}),(0,W.jsxs)(`label`,{className:`ren-product-continuous`,title:`Use EAN_ProductName_1, EAN_ProductName_2 naming`,children:[(0,W.jsx)(`input`,{type:`checkbox`,checked:l,onChange:e=>u(e.target.checked),disabled:!s.trim()}),(0,W.jsx)(`span`,{children:`EAN_ProductName`})]})]}),(0,W.jsxs)(`div`,{className:`ren-stat`,children:[(0,W.jsx)(`span`,{children:`Total`}),(0,W.jsx)(`strong`,{children:pe})]}),(0,W.jsxs)(`div`,{className:`ren-stat`,children:[(0,W.jsx)(`span`,{children:`Selected`}),(0,W.jsx)(`strong`,{children:me})]})]}),(0,W.jsxs)(`div`,{className:`ren-settings-wrap`,ref:ue,children:[(0,W.jsx)(`button`,{className:`btn btn-secondary btn-sm ren-gear`,onClick:()=>O(e=>!e),title:`Settings`,children:`⚙`}),D&&(0,W.jsxs)(`div`,{className:`ren-settings-popover`,children:[(0,W.jsx)(`h4`,{children:`Settings`}),(0,W.jsxs)(`label`,{className:`ren-setting-row`,children:[(0,W.jsx)(`span`,{children:`Action`}),(0,W.jsxs)(`select`,{value:F.outputMode,onChange:e=>re(t=>({...t,outputMode:e.target.value})),children:[(0,W.jsx)(`option`,{value:`copy`,children:`Copy`}),(0,W.jsx)(`option`,{value:`in-folder`,children:`In-folder rename`})]})]}),(0,W.jsxs)(`label`,{className:`ren-setting-row`,children:[(0,W.jsx)(`span`,{children:`Naming mode`}),(0,W.jsxs)(`select`,{value:F.namingMode,onChange:e=>re(t=>({...t,namingMode:e.target.value})),children:[(0,W.jsx)(`option`,{value:`per-category`,children:`Per category`}),(0,W.jsx)(`option`,{value:`continuous`,children:`Continuous`}),(0,W.jsx)(`option`,{value:`prefixed`,children:`Prefixed`})]})]}),(0,W.jsxs)(`label`,{className:`ren-setting-row`,children:[(0,W.jsx)(`span`,{children:`Dark mode`}),(0,W.jsx)(`input`,{type:`checkbox`,checked:!0,disabled:!0})]})]})]})]})}),(0,W.jsxs)(`div`,{className:`ren-output-bar`,children:[(0,W.jsxs)(`span`,{className:`ren-output-label`,children:[(0,W.jsxs)(`svg`,{width:`14`,height:`14`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,children:[(0,W.jsx)(`path`,{d:`M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4`}),(0,W.jsx)(`polyline`,{points:`17 8 12 3 7 8`}),(0,W.jsx)(`line`,{x1:`12`,y1:`3`,x2:`12`,y2:`15`})]}),`Output`]}),(0,W.jsx)(`div`,{className:`ren-output-fields`,children:ji.map(e=>(0,W.jsxs)(`div`,{className:`ren-output-field`,onClick:()=>be(e),children:[(0,W.jsx)(`span`,{className:`ren-output-cat`,children:e}),(0,W.jsx)(`span`,{className:`ren-output-path`,children:S[e]||`Set output`}),S[e]&&(0,W.jsx)(`button`,{className:`ren-output-clear`,onClick:t=>{t.stopPropagation(),C(t=>{let n={...t};return delete n[e],n})},children:`×`})]},e))}),(0,W.jsx)(`button`,{className:`btn btn-secondary btn-sm`,onClick:()=>C({}),disabled:Object.keys(S).length===0,children:`Clear all`})]}),(0,W.jsxs)(`div`,{className:`ren-board`,children:[p.map(e=>(0,W.jsxs)(`div`,{className:`ren-column ${H===e.key?`ren-column-drop`:``}`,onDragOver:t=>Se(t,e.key),onDragLeave:Ce,onDrop:t=>we(t,e.key),children:[(0,W.jsxs)(`div`,{className:`ren-col-header`,children:[(0,W.jsx)(`span`,{className:`ren-col-title`,onDoubleClick:()=>!e.fixed&&Ne(e.key),title:e.fixed?e.title:`Double-click to rename`,children:e.title}),(0,W.jsx)(`span`,{className:`ren-col-count`,children:e.key===`duplicate`?he:e.imageIds.length}),!e.fixed&&(0,W.jsxs)(`label`,{className:`ren-priority-toggle`,title:`Select which images get numbered as #1`,children:[(0,W.jsx)(`input`,{type:`checkbox`,checked:!!T[e.key],onChange:()=>Fe(e.key)}),(0,W.jsx)(`span`,{children:`1st`})]}),!e.fixed&&(0,W.jsx)(`button`,{className:`ren-col-menu`,onClick:()=>Pe(e.key),title:`Remove column`,children:`×`})]}),e.key===`duplicate`?(0,W.jsx)(`div`,{className:`ren-col-body ren-duplicate-body`,children:Mi.map(({key:e,label:t})=>(0,W.jsxs)(`div`,{className:`ren-duplicate-section ${se===e?`ren-duplicate-drop`:``}`,onDragOver:t=>Te(t,e),onDragLeave:Ce,onDrop:t=>Ee(t,e),children:[(0,W.jsxs)(`div`,{className:`ren-duplicate-header`,children:[(0,W.jsx)(`input`,{className:`ren-duplicate-type`,value:v[e],placeholder:t,onChange:t=>y(n=>({...n,[e]:t.target.value}))}),(0,W.jsx)(`button`,{className:`ren-duplicate-add`,onClick:()=>De(e),title:`Add another duplicate group`,children:`+ Group`})]}),(0,W.jsxs)(`div`,{className:`ren-duplicate-images`,children:[h[e].map((t,n)=>{let r=`dup-${e}-${t.id}`;return(0,W.jsxs)(`div`,{className:`ren-duplicate-group`,onDragOver:t=>Te(t,e),onDrop:n=>{n.preventDefault(),n.stopPropagation(),oe(null),ce(null),B.length!==0&&(m(e=>e.map(e=>({...e,imageIds:e.imageIds.filter(e=>!B.includes(e))}))),g(n=>{let r={...n};return Mi.forEach(({key:e})=>{r[e]=n[e].map(e=>({...e,imageIds:e.imageIds.filter(e=>!B.includes(e))}))}),r[e]=r[e].map(e=>e.id===t.id?{...e,imageIds:[...e.imageIds,...B]}:e),r}),V([]))},children:[(0,W.jsxs)(`div`,{className:`ren-duplicate-group-head`,children:[(0,W.jsxs)(`span`,{children:[`Group `,n+1]}),(0,W.jsxs)(`label`,{className:`ren-priority-toggle`,title:`This duplicate group should get the first available number`,children:[(0,W.jsx)(`input`,{type:`checkbox`,checked:t.first,onChange:()=>Oe(e,t.id)}),(0,W.jsx)(`span`,{children:`1st`})]}),(0,W.jsx)(`button`,{className:`ren-duplicate-remove`,onClick:()=>ke(e,t.id),title:`Remove this duplicate group`,children:`×`})]}),t.imageIds.map(e=>We(e,r)),t.imageIds.length===0&&(0,W.jsx)(`div`,{className:`ren-duplicate-empty`,children:`Drop group images here`})]},t.id)}),h[e].length===0&&(0,W.jsx)(`div`,{className:`ren-duplicate-empty`,children:`Drop images here`})]})]},e))}):(0,W.jsxs)(`div`,{className:`ren-col-body`,children:[e.imageIds.map(t=>We(t,e.key)),e.imageIds.length===0&&(0,W.jsx)(`div`,{className:`ren-col-empty`,children:`Drop images here`})]})]},e.key)),(0,W.jsx)(`button`,{className:`ren-add-col`,onClick:Me,title:`Add category`,children:`+`})]}),N&&(0,W.jsxs)(`div`,{className:`ren-hover-preview`,style:{left:Math.max(12,Math.min(N.x+18,window.innerWidth-340)),top:Math.max(12,Math.min(N.y+18,window.innerHeight-430))},children:[(0,W.jsx)(`div`,{className:`ren-hover-image-wrap`,children:(0,W.jsx)(`img`,{src:Li(N.image.id,t),alt:N.image.name})}),(0,W.jsx)(`div`,{className:`ren-hover-name`,title:N.image.name,children:N.image.name}),(0,W.jsxs)(`div`,{className:`ren-hover-meta`,children:[N.image.width,`×`,N.image.height,` · `,Ii(N.image.sizeBytes),` · `,N.image.extension.toUpperCase()]})]}),(0,W.jsxs)(`div`,{className:`ren-footer`,children:[j&&(0,W.jsxs)(W.Fragment,{children:[(0,W.jsx)(`div`,{className:`ren-resize-handle`,ref:le,onMouseDown:He}),(0,W.jsxs)(`div`,{className:`ren-preview-panel`,style:{height:M},children:[(0,W.jsx)(`div`,{className:`ren-preview-table-wrap`,children:(0,W.jsxs)(`table`,{className:`ren-preview-table`,children:[(0,W.jsx)(`thead`,{children:(0,W.jsxs)(`tr`,{children:[(0,W.jsx)(`th`,{children:`Current Name`}),(0,W.jsx)(`th`,{}),(0,W.jsx)(`th`,{children:`Output Path`})]})}),(0,W.jsxs)(`tbody`,{children:[I.slice(0,50).map((e,t)=>(0,W.jsxs)(`tr`,{className:`ren-plan-${e.status||`rename`}`,children:[(0,W.jsx)(`td`,{children:e.oldName}),(0,W.jsx)(`td`,{className:`ren-arrow`,children:`→`}),(0,W.jsx)(`td`,{children:Hi(e)})]},t)),I.length===0&&(0,W.jsx)(`tr`,{children:(0,W.jsx)(`td`,{colSpan:3,className:`ren-table-empty`,children:`Click Preview to generate rename plan`})})]})]})}),(0,W.jsxs)(`div`,{className:`ren-summary-card`,children:[(0,W.jsxs)(`div`,{className:`ren-summary-item ren-summary-green`,children:[(0,W.jsx)(`strong`,{children:Ue.renamed}),(0,W.jsx)(`span`,{children:`To rename`})]}),(0,W.jsxs)(`div`,{className:`ren-summary-item`,children:[(0,W.jsx)(`strong`,{children:Ue.skipped}),(0,W.jsx)(`span`,{children:`Skipped`})]}),(0,W.jsxs)(`div`,{className:`ren-summary-item ${Ue.conflicts>0?`ren-summary-amber`:``}`,children:[(0,W.jsx)(`strong`,{children:Ue.conflicts}),(0,W.jsx)(`span`,{children:`Conflicts`})]})]})]})]}),(0,W.jsxs)(`div`,{className:`ren-actions`,children:[(0,W.jsx)(`button`,{className:`btn btn-secondary btn-sm`,onClick:()=>te(e=>!e),children:j?`Hide Preview`:`Show Preview`}),(0,W.jsxs)(`div`,{className:`ren-actions-right`,children:[(0,W.jsx)(`button`,{className:`btn btn-secondary`,onClick:ze,disabled:ie||!t,children:`Preview`}),(0,W.jsx)(`button`,{className:`btn btn-primary`,onClick:Be,disabled:ie||!t,children:F.outputMode===`copy`?`Copy`:`Rename`}),(0,W.jsx)(`button`,{className:`btn btn-secondary`,onClick:Ve,disabled:ie||!R,children:`Undo`})]})]})]}),k&&(0,W.jsx)(`div`,{className:`ren-modal-overlay`,onClick:()=>A(!1),children:(0,W.jsxs)(`div`,{className:`ren-modal`,onClick:e=>e.stopPropagation(),children:[(0,W.jsxs)(`div`,{className:`ren-modal-header`,children:[(0,W.jsx)(`h3`,{children:`Rename Preview`}),(0,W.jsx)(`button`,{className:`ren-modal-close`,onClick:()=>A(!1),children:`×`})]}),(0,W.jsx)(`div`,{className:`ren-modal-body`,children:(0,W.jsxs)(`table`,{className:`ren-preview-table ren-preview-table-full`,children:[(0,W.jsx)(`thead`,{children:(0,W.jsxs)(`tr`,{children:[(0,W.jsx)(`th`,{children:`#`}),(0,W.jsx)(`th`,{children:`Category`}),(0,W.jsx)(`th`,{children:`Current Name`}),(0,W.jsx)(`th`,{}),(0,W.jsx)(`th`,{children:`Output Path`}),(0,W.jsx)(`th`,{children:`Status`})]})}),(0,W.jsx)(`tbody`,{children:I.map((e,t)=>(0,W.jsxs)(`tr`,{className:`ren-plan-${e.status||`rename`}`,children:[(0,W.jsx)(`td`,{children:t+1}),(0,W.jsx)(`td`,{children:e.category}),(0,W.jsx)(`td`,{children:e.oldName}),(0,W.jsx)(`td`,{className:`ren-arrow`,children:`→`}),(0,W.jsx)(`td`,{children:Hi(e)}),(0,W.jsx)(`td`,{children:(0,W.jsx)(`span`,{className:`ren-status-badge ren-status-${e.status||`rename`}`,children:e.status||`rename`})})]},t))})]})}),(0,W.jsxs)(`div`,{className:`ren-modal-footer`,children:[(0,W.jsx)(`button`,{className:`btn btn-secondary`,onClick:()=>A(!1),children:`Close`}),(0,W.jsx)(`button`,{className:`btn btn-primary`,onClick:()=>{A(!1),Be()},children:`Apply`})]})]})})]})}var Wi=`
/* ── Root ── */
.ren-root {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  font-size: 13px;
  color: var(--text-primary);
}

/* ── Top bar ── */
.ren-topbar {
  padding: 10px 16px;
  background: var(--bg-card);
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}

.ren-topbar-row {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.ren-folder-group {
  display: flex;
  align-items: center;
  gap: 6px;
}

.ren-path-input {
  width: 280px;
  height: 32px;
  background: var(--bg-input);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 0 10px;
  color: var(--text-secondary);
  font-size: 12px;
  font-family: inherit;
  outline: none;
}

.ren-stat-group {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
}

.ren-stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 11px;
  color: var(--text-secondary);
}

.ren-stat strong {
  font-size: 14px;
  color: var(--text-primary);
}

.ren-stat-input {
  height: 28px;
  width: 120px;
  background: var(--bg-input);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 0 8px;
  color: var(--text-primary);
  font-size: 12px;
  font-family: inherit;
  outline: none;
}

.ren-stat-input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 2px var(--accent-soft);
}

.ren-product-stat {
  min-width: 160px;
  gap: 3px;
}

.ren-product-input {
  width: 160px;
}

.ren-product-continuous {
  display: flex;
  align-items: center;
  gap: 4px;
  height: 14px;
  color: var(--text-muted);
  font-size: 10px;
  line-height: 1;
  white-space: nowrap;
}

.ren-product-continuous input {
  width: 11px;
  height: 11px;
  margin: 0;
  accent-color: var(--accent);
}

.ren-product-continuous input:disabled + span {
  opacity: 0.55;
}

.ren-ean-badge {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  flex-shrink: 0;
}

.ren-ean-badge.valid {
  background: rgba(74, 222, 128, 0.15);
  color: var(--green);
}

.ren-ean-badge.warn {
  background: rgba(250, 204, 21, 0.15);
  color: var(--yellow);
}

/* ── Settings ── */
.ren-settings-wrap {
  position: relative;
}

.ren-gear {
  font-size: 16px;
  line-height: 1;
}

.ren-settings-popover {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 6px;
  width: 240px;
  background: var(--bg-modal);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 14px;
  box-shadow: var(--shadow-lg);
  z-index: 30;
}

.ren-settings-popover h4 {
  font-size: 13px;
  margin-bottom: 10px;
  color: var(--text-primary);
}

.ren-setting-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 8px;
  font-size: 12px;
  color: var(--text-secondary);
}

.ren-setting-row select {
  height: 28px;
  background: var(--bg-input);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  font-family: inherit;
  font-size: 12px;
  padding: 0 6px;
  outline: none;
}

.ren-setting-row select:focus {
  border-color: var(--accent);
}

/* ── Output bar ── */
.ren-output-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}

.ren-output-label {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary);
  white-space: nowrap;
}

.ren-output-fields {
  display: flex;
  gap: 6px;
  flex: 1;
  overflow-x: auto;
}

.ren-output-field {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 150px;
  flex: 1;
  padding: 6px 10px;
  background: var(--bg-input);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  cursor: pointer;
  position: relative;
  transition: border-color 0.15s;
}

.ren-output-field:hover {
  border-color: var(--accent);
}

.ren-output-cat {
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-muted);
}

.ren-output-path {
  font-size: 11px;
  color: var(--text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
}

.ren-output-clear {
  position: absolute;
  top: 4px;
  right: 6px;
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  font-size: 14px;
  line-height: 1;
  padding: 0;
}

.ren-output-clear:hover {
  color: var(--red);
}

/* ── Kanban board ── */
.ren-board {
  flex: 1;
  display: flex;
  gap: 10px;
  padding: 12px 16px;
  overflow-x: auto;
  overflow-y: hidden;
  min-height: 0;
}

.ren-column {
  min-width: 220px;
  width: 220px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background: var(--bg-primary);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  transition: border-color 0.15s, box-shadow 0.15s;
}

.ren-column-drop {
  border-color: var(--accent);
  box-shadow: 0 0 0 2px var(--accent-soft);
}

.ren-col-header {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 12px;
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}

.ren-col-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: default;
}

.ren-col-count {
  font-size: 11px;
  font-weight: 600;
  background: var(--bg-card);
  color: var(--text-secondary);
  padding: 1px 7px;
  border-radius: 10px;
}

.ren-col-menu {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
  padding: 0 2px;
  opacity: 0;
  transition: opacity 0.15s;
}

.ren-col-header:hover .ren-col-menu {
  opacity: 1;
}

.ren-col-menu:hover {
  color: var(--red);
}

.ren-priority-toggle {
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 10px;
  font-weight: 600;
  color: var(--text-muted);
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
}

.ren-priority-toggle input {
  width: 12px;
  height: 12px;
  margin: 0;
  cursor: pointer;
  accent-color: var(--amber, #f59e0b);
}

.ren-priority-toggle input:checked + span {
  color: var(--amber, #f59e0b);
}

.ren-priority-btn {
  background: none;
  border: none;
  font-size: 14px;
  cursor: pointer;
  color: var(--border-light);
  padding: 0 2px;
  line-height: 1;
  transition: color 0.15s;
  flex-shrink: 0;
}

.ren-priority-btn:hover {
  color: var(--amber, #f59e0b);
}

.ren-priority-active {
  color: var(--amber, #f59e0b) !important;
}

.ren-card-priority {
  border-color: var(--amber, #f59e0b);
  box-shadow: 0 0 0 1px rgba(245, 158, 11, 0.25);
}

.ren-col-body {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.ren-col-empty {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  font-size: 12px;
  min-height: 60px;
}

/* ── Card ── */
.ren-duplicate-body {
  gap: 10px;
}

.ren-duplicate-section {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 8px;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.02);
  transition: border-color 0.15s, box-shadow 0.15s;
}

.ren-duplicate-drop {
  border-color: var(--accent);
  box-shadow: 0 0 0 2px var(--accent-soft);
}

.ren-duplicate-header {
  display: flex;
  align-items: center;
  gap: 6px;
}

.ren-duplicate-header .ren-priority-toggle {
  flex-shrink: 0;
}

.ren-duplicate-add {
  height: 30px;
  padding: 0 10px;
  border: 1px solid var(--border-light);
  border-radius: 6px;
  background: var(--bg-input);
  color: var(--text-primary);
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
}

.ren-duplicate-add:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.ren-duplicate-type {
  height: 30px;
  width: 100%;
  background: var(--bg-input);
  border: 1px solid var(--border-light);
  border-radius: 6px;
  color: var(--text-primary);
  font-size: 12px;
  font-weight: 700;
  text-align: center;
  outline: none;
}

.ren-duplicate-type:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 2px var(--accent-soft);
}

.ren-duplicate-images {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-height: 34px;
}

.ren-duplicate-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 6px;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: rgba(0, 0, 0, 0.08);
}

.ren-duplicate-group-head {
  display: flex;
  align-items: center;
  gap: 6px;
  min-height: 24px;
  color: var(--text-secondary);
  font-size: 11px;
  font-weight: 700;
}

.ren-duplicate-group-head > span:first-child {
  flex: 1;
}

.ren-duplicate-remove {
  width: 22px;
  height: 22px;
  border: 1px solid var(--border);
  border-radius: 5px;
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  line-height: 1;
}

.ren-duplicate-remove:hover {
  color: var(--red);
  border-color: var(--red);
}

.ren-duplicate-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 34px;
  border: 1px dashed var(--border);
  border-radius: 6px;
  color: var(--text-muted);
  font-size: 11px;
}

.ren-card {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 8px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  cursor: grab;
  transition: border-color 0.15s, opacity 0.15s, box-shadow 0.15s;
}

.ren-card:hover {
  background: var(--bg-card-hover);
}

.ren-hover-preview {
  position: fixed;
  z-index: 1000;
  width: 320px;
  pointer-events: none;
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: 10px;
  box-shadow: var(--shadow-lg);
  padding: 8px;
  animation: renHoverIn 0.12s ease;
}

.ren-hover-image-wrap {
  width: 100%;
  height: 360px;
  border-radius: 8px;
  overflow: hidden;
  background: var(--bg-input);
  border: 1px solid var(--border);
}

.ren-hover-image-wrap img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.ren-hover-name {
  margin-top: 8px;
  color: var(--text-primary);
  font-size: 13px;
  font-weight: 700;
  line-height: 1.35;
  overflow-wrap: anywhere;
}

.ren-hover-meta {
  margin-top: 4px;
  color: var(--text-muted);
  font-size: 11px;
}

@keyframes renHoverIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}

.ren-card-selected {
  border-color: var(--accent);
  box-shadow: 0 0 0 1px var(--accent-soft);
}

.ren-card-dragging {
  opacity: 0.4;
}

.ren-card-check {
  margin-top: 2px;
  flex-shrink: 0;
  accent-color: var(--accent);
}

.ren-card-thumb {
  width: 64px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 4px;
  overflow: hidden;
  background: var(--bg-input);
}

.ren-card-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ren-card-meta {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.ren-card-name {
  font-size: 12px;
  font-weight: 500;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ren-card-info {
  font-size: 10px;
  color: var(--text-muted);
}

.ren-card-chips {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  margin-top: 2px;
}

.ren-chip {
  font-size: 9px;
  font-weight: 600;
  padding: 1px 5px;
  border-radius: 3px;
  background: var(--bg-input);
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.ren-chip-renamed {
  background: rgba(74, 222, 128, 0.15);
  color: var(--green);
}

.ren-card-grip {
  color: var(--text-muted);
  font-size: 12px;
  flex-shrink: 0;
  cursor: grab;
  opacity: 0;
  transition: opacity 0.15s;
}

.ren-card:hover .ren-card-grip {
  opacity: 1;
}

.ren-add-col {
  min-width: 44px;
  width: 44px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-card);
  border: 1px dashed var(--border-light);
  border-radius: var(--radius);
  color: var(--text-muted);
  font-size: 22px;
  cursor: pointer;
  transition: border-color 0.15s, color 0.15s;
}

.ren-add-col:hover {
  border-color: var(--accent);
  color: var(--accent);
}

/* ── Drag ghost ── */
.ren-drag-ghost {
  position: fixed;
  top: -100px;
  left: -100px;
  padding: 4px 12px;
  background: var(--accent);
  color: white;
  font-size: 12px;
  font-weight: 600;
  border-radius: 4px;
  pointer-events: none;
  z-index: 9999;
}

/* ── Footer ── */
.ren-footer {
  flex-shrink: 0;
  border-top: 1px solid var(--border);
  background: var(--bg-card);
}

.ren-resize-handle {
  height: 5px;
  cursor: ns-resize;
  background: transparent;
  position: relative;
}

.ren-resize-handle::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 32px;
  height: 3px;
  border-radius: 2px;
  background: var(--border-light);
  transition: background 0.15s;
}

.ren-resize-handle:hover::after {
  background: var(--accent);
}

.ren-preview-panel {
  display: flex;
  gap: 12px;
  padding: 0 16px 8px;
  overflow: hidden;
}

.ren-preview-table-wrap {
  flex: 1;
  overflow: auto;
}

.ren-preview-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.ren-preview-table th {
  text-align: left;
  padding: 6px 8px;
  font-weight: 600;
  color: var(--text-secondary);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  background: var(--bg-card);
}

.ren-preview-table td {
  padding: 4px 8px;
  color: var(--text-primary);
  border-bottom: 1px solid var(--border);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px;
}

.ren-arrow {
  text-align: center;
  color: var(--text-muted);
  width: 30px;
}

.ren-table-empty {
  text-align: center;
  color: var(--text-muted);
  padding: 20px 8px !important;
}

.ren-plan-rename td { color: var(--text-primary); }
.ren-plan-conflict td { color: var(--red); }
.ren-plan-skip td { color: var(--text-muted); }

.ren-summary-card {
  width: 160px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 0;
}

.ren-summary-item {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.ren-summary-item strong {
  font-size: 18px;
  color: var(--text-primary);
}

.ren-summary-item span {
  font-size: 11px;
  color: var(--text-secondary);
}

.ren-summary-green strong {
  color: var(--green);
}

.ren-summary-amber strong {
  color: var(--yellow);
}

.ren-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  border-top: 1px solid var(--border);
}

.ren-actions-right {
  display: flex;
  gap: 8px;
}

/* ── Preview modal ── */
.ren-modal-overlay {
  position: fixed;
  inset: 0;
  background: var(--overlay);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.ren-modal {
  background: var(--bg-modal);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  width: 90vw;
  max-width: 900px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-lg);
}

.ren-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border);
}

.ren-modal-header h3 {
  font-size: 15px;
  font-weight: 600;
}

.ren-modal-close {
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 20px;
  cursor: pointer;
  padding: 0;
}

.ren-modal-close:hover {
  color: var(--text-primary);
}

.ren-modal-body {
  flex: 1;
  overflow: auto;
  padding: 0;
}

.ren-preview-table-full {
  font-size: 12px;
}

.ren-preview-table-full th,
.ren-preview-table-full td {
  padding: 8px 12px;
}

.ren-status-badge {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 4px;
}

.ren-status-rename {
  background: rgba(74, 222, 128, 0.15);
  color: var(--green);
}

.ren-status-conflict {
  background: rgba(239, 68, 68, 0.15);
  color: var(--red);
}

.ren-status-skip {
  background: var(--bg-input);
  color: var(--text-muted);
}

.ren-modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 14px 20px;
  border-top: 1px solid var(--border);
}
`,Gi=[{code:`auto`,name:`Auto detect`,marker:`AU`},{code:`en`,name:`English`,marker:`EN`},{code:`vi`,name:`Vietnamese`,marker:`VI`},{code:`zh`,name:`Chinese`,marker:`ZH`},{code:`ja`,name:`Japanese`,marker:`JA`},{code:`ko`,name:`Korean`,marker:`KO`}],Ki=[{code:`vi`,name:`Vietnamese`,marker:`VI`},{code:`en`,name:`English`,marker:`EN`},{code:`fr`,name:`French`,marker:`FR`},{code:`de`,name:`German`,marker:`DE`},{code:`it`,name:`Italian`,marker:`IT`},{code:`zh`,name:`Chinese`,marker:`ZH`},{code:`ja`,name:`Japanese`,marker:`JA`},{code:`ko`,name:`Korean`,marker:`KO`},{code:`pl`,name:`Polish`,marker:`PL`},{code:`es`,name:`Spanish`,marker:`ES`}],qi=`.pdf, .docx, .pptx, .xlsx, .html, .srt, .txt, .json, .xml, .md, .epub`;function Ji(e){return e?e<1024*1024?`${(e/1024).toFixed(1)} KB`:`${(e/1024/1024).toFixed(2)} MB`:`local file`}function Yi(e){return Ki.find(t=>t.code===e)?.name??e}function Xi(e){return`tr-lang-marker marker-${e.replace(/[^a-z]/gi,``).toLowerCase()}`}function Zi(e,t){return e?.summary.translations[t]?.progress??0}function Qi(e){return/\.(xlsx|docx|pptx|pdf)$/i.test(e)}function $i(e){let t=e?.outputs.filter(e=>e.engine===`linguaharu`)??[];return t.length?t[t.length-1]:null}function ea(e){let t=e?.engineRuns??[];return t.length?t[t.length-1]:null}function ta(e){let t=ea(e);return t?t.status===`completed`?{percent:100,desc:`Completed`}:t.progress?{percent:Math.max(0,Math.min(100,t.progress.percent||Math.round((t.progress.value||0)*100))),desc:t.progress.desc||t.status}:{percent:e?.status===`running`?3:0,desc:t.status}:null}function na(){let{notify:e}=Hn(),t=(0,_.useRef)(null),[n,r]=(0,_.useState)(null),[i,a]=(0,_.useState)(Ki),[o,s]=(0,_.useState)([]),[c,l]=(0,_.useState)(null),[u,d]=(0,_.useState)(0),[f,p]=(0,_.useState)(null),[m,h]=(0,_.useState)(`auto`),[g,v]=(0,_.useState)([`vi`]),[y,b]=(0,_.useState)(`auto`),[x,S]=(0,_.useState)(`draft_copy`),[C,w]=(0,_.useState)(`qwen2.5:3b`),[ee,T]=(0,_.useState)(4),[E,D]=(0,_.useState)(6),[O,k]=(0,_.useState)(``),[A,j]=(0,_.useState)(`vi`),[te,M]=(0,_.useState)(null),[ne,N]=(0,_.useState)(null),[P,F]=(0,_.useState)(!1),[re,I]=(0,_.useState)(``),[L,R]=(0,_.useState)(!1),[z,ie]=(0,_.useState)(``),[ae,B]=(0,_.useState)(!0);(0,_.useEffect)(()=>{se(),le(),ce()},[]),(0,_.useEffect)(()=>{if(!c||![`queued`,`running`].includes(c.status))return;let t=window.setInterval(async()=>{try{let n=await G(`/api/translation/jobs/${c.id}`);if(l(n),![`queued`,`running`].includes(n.status)){window.clearInterval(t),await le();let r=$i(n);r&&ye(n.id,r.path),e(n.status===`completed`?`LinguaHaru output ready`:`LinguaHaru failed`,{type:n.status===`completed`?`success`:`error`,message:n.error??void 0})}}catch{window.clearInterval(t)}},1e3);return()=>window.clearInterval(t)},[c?.id,c?.status]);let V=(0,_.useMemo)(()=>c?.segments.length?c.segments.find(e=>e.id===te)??c.segments[0]:null,[c,te]),H=(0,_.useMemo)(()=>{if(!c)return[];let e=re.trim().toLowerCase();return e?c.segments.filter(t=>`${t.origin} ${t.source} ${t.translations[A]??``}`.toLowerCase().includes(e)):c.segments},[A,c,re]);function oe(e){return i.find(t=>t.code===e)?.name??Yi(e)}async function se(){try{let e=await G(`/api/translation/status`);r(e),e.linguaHaruLanguages?.length&&a(e.linguaHaruLanguages.map(e=>({code:e.code,name:e.name,marker:e.code.slice(0,2).toUpperCase()})))}catch{r(null)}}async function ce(){try{let e=await G(`/api/translation/languages`);e.length&&a(e.map(e=>({code:e.code,name:e.name,marker:e.code.slice(0,2).toUpperCase()})))}catch{a(Ki)}}async function le(){try{let e=await G(`/api/translation/jobs`);s(e),!c&&e.length&&(l(e[0]),k(e[0].outputDir??``),j(e[0].targetLanguages[0]??`vi`),M(e[0].segments[0]?.id??null))}catch{s([])}}function ue(e){let t=e?.[0];t&&(p({name:t.name,sizeBytes:t.size,file:t}),l(null),N(null),d(1))}async function de(){if(window.__grimoire?.pickFile){let e=await window.__grimoire.pickFile(`Select document to translate`,`Documents (*.pdf;*.docx;*.pptx;*.xlsx;*.html;*.srt;*.txt;*.json;*.xml;*.md;*.epub)|*.pdf;*.docx;*.pptx;*.xlsx;*.html;*.srt;*.txt;*.json;*.xml;*.md;*.epub|All files (*.*)|*.*`);if(!e)return;p({name:e.split(/[\\/]/).pop()||e,sizeBytes:0,path:e}),k(e.replace(/[\\/][^\\/]+$/,``)),l(null),N(null),d(1);return}t.current?.click()}async function fe(){if(!f){e(`Choose a file first`,{type:`warning`});return}if(!g.length){e(`Choose at least one target language`,{type:`warning`});return}R(!0);try{let t;if(f.path)t=await G(`/api/translation/jobs/from-path`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({source_path:f.path,source_language:m,target_languages:g,profile:y,preserve_layout:!0,use_glossary:!0,prefer_local_model:x===`ollama`,output_dir:O||void 0})});else{let e=new FormData;e.set(`file`,f.file),e.set(`source_language`,m),e.set(`target_languages`,JSON.stringify(g)),e.set(`profile`,y),e.set(`preserve_layout`,`true`),e.set(`use_glossary`,`true`),e.set(`prefer_local_model`,String(x===`ollama`)),O&&e.set(`output_dir`,O),t=await G(`/api/translation/jobs/upload`,{method:`POST`,body:e})}l(t),k(t.outputDir??O),N(null),j(t.targetLanguages[0]??`vi`),M(t.segments[0]?.id??null),d(3),await le(),e(`Translation workspace created`,{type:`success`,message:`${t.segments.length} segment(s) extracted`})}catch(t){let n=t instanceof Error?t.message:String(t);e(`Could not create translation workspace`,{type:`error`,message:n===`Failed to fetch`?`Backend did not answer this request. Restart GRIMOIRE or try a smaller file; engine status can still be cached from an earlier request.`:n})}finally{R(!1)}}function pe(e,t){l(n=>n&&{...n,segments:n.segments.map(n=>n.id===e?{...n,translations:{...n.translations,[A]:t}}:n)})}async function me(t,n=!1){if(!c)return;let r=c.segments.find(e=>e.id===t);if(r)try{l(await G(`/api/translation/jobs/${c.id}/segments/${t}`,{method:`PATCH`,headers:{"Content-Type":`application/json`},body:JSON.stringify({target_language:A,translation:r.translations[A]??``,status:n?`confirmed`:r.status[A]??`draft`})})),e(n?`Segment confirmed`:`Segment saved`,{type:`success`})}catch(t){e(`Could not save segment`,{type:`error`,message:t instanceof Error?t.message:String(t)})}}async function he(){if(!(!c||!V||!z.trim()))try{l(await G(`/api/translation/jobs/${c.id}/segments/${V.id}/comments`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({author:`You`,body:z.trim()})})),ie(``)}catch(t){e(`Could not add comment`,{type:`error`,message:t instanceof Error?t.message:String(t)})}}async function ge(){if(c){R(!0);try{l(await G(`/api/translation/jobs/${c.id}/pretranslate`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({target_languages:[A],provider:x,ollama_model:C})})),e(`Draft generated`,{type:`success`,message:`${oe(A)} is ready for review`})}catch(t){e(`Pre-translation failed`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{R(!1)}}}async function _e(){if(c){if(!Qi(c.sourceName)){e(`Native output is not available for this file`,{type:`warning`,message:`LinguaHaru native runner supports .xlsx, .docx, .pptx, and .pdf.`});return}R(!0);try{let t=await G(`/api/translation/jobs/${c.id}/run-linguaharu`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({target_language:A,output_dir:O||c.outputDir||void 0,source_language:c.sourceLanguage===`auto`?`en`:c.sourceLanguage,model:x===`ollama`?`(Ollama) ${C}`:`(Ollama) qwen2.5:3b`,thread_count:ee,ollama_num_ctx:4096,ollama_num_predict:2048,retry_seconds:300,timeout_seconds:Math.max(1,E)*3600,excel_mode_2:c.sourceName.toLowerCase().endsWith(`.xlsx`),excel_bilingual_mode:!1,word_bilingual_mode:!1,pdf_bilingual_mode:!1})});l(t),k(t.outputDir??O),e(`LinguaHaru run queued`,{type:`success`,message:`Native document output is being saved to the output directory.`})}catch(t){e(`Could not start LinguaHaru`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{R(!1)}}}async function ve(){let e=await Kn(`Select translation output folder`,O);e&&k(e)}async function ye(t=c?.id,n=$i(c)?.path){if(t){F(!0);try{N(await G(`/api/translation/jobs/${t}/native-preview${n?`?path=${encodeURIComponent(n)}`:``}`))}catch(t){e(`Could not load preview`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{F(!1)}}}function be(t){if(window.__grimoire?.revealInExplorer){window.__grimoire.revealInExplorer(t);return}e(`Saved output`,{type:`success`,message:t})}function U(e){v(t=>{let n=t.includes(e)?t.filter(t=>t!==e):[...t,e];return!n.includes(A)&&n[0]&&j(n[0]),n})}let xe=ta(c);return(0,W.jsxs)(`div`,{className:`view tool-view translation-view`,children:[(0,W.jsxs)(`section`,{className:`tr-workspace`,children:[(0,W.jsxs)(`header`,{className:`tr-appbar`,children:[(0,W.jsxs)(`div`,{children:[(0,W.jsx)(`strong`,{children:`GRIMOIRE Translation`}),(0,W.jsx)(`span`,{children:c?c.sourceName:`Create an editable translation workspace`})]}),(0,W.jsxs)(`div`,{className:`tr-actions`,children:[(0,W.jsx)(`button`,{onClick:()=>B(e=>!e),children:`Engine status`}),(0,W.jsx)(`button`,{onClick:()=>d(4),children:`Document list`})]})]}),(0,W.jsx)(`nav`,{className:`tr-stepper`,children:[`Upload file`,`Source`,`Targets`,`Editor`,`Documents`].map((e,t)=>(0,W.jsxs)(`button`,{className:t===u?`active`:t<u?`done`:``,onClick:()=>d(t),children:[(0,W.jsx)(`span`,{children:t<u?`OK`:t+1}),e]},e))}),ae&&(0,W.jsxs)(`section`,{className:`tr-status`,children:[(0,W.jsxs)(`div`,{children:[(0,W.jsx)(`strong`,{children:n?`${n.providers.filter(e=>e.ready).length} provider(s) ready`:`Backend status unavailable`}),(0,W.jsx)(`span`,{children:n?.externalInstallRoot??`Restart backend if status does not appear.`})]}),(0,W.jsx)(`div`,{className:`tr-engine-grid`,children:n?.engines.map(e=>(0,W.jsx)(`span`,{className:e.available?`ready`:``,children:e.name},e.id))})]}),u===0&&(0,W.jsxs)(`main`,{className:`tr-upload-grid`,children:[(0,W.jsxs)(`section`,{className:`tr-dropzone`,onDragOver:e=>e.preventDefault(),onDrop:e=>{e.preventDefault(),ue(e.dataTransfer.files)},children:[(0,W.jsx)(`input`,{ref:t,type:`file`,hidden:!0,accept:qi,onChange:e=>ue(e.currentTarget.files)}),(0,W.jsx)(`div`,{className:`tr-upload-icon`,children:`UP`}),(0,W.jsx)(`h2`,{children:`Drag and drop a document`}),(0,W.jsxs)(`p`,{children:[`Supported: `,n?.supportedFormats.join(`, `)??qi]}),(0,W.jsx)(`button`,{onClick:de,children:`Browse files`})]}),(0,W.jsxs)(`aside`,{className:`tr-side-card`,children:[(0,W.jsx)(`h3`,{children:`Selected file`}),f?(0,W.jsxs)(`div`,{className:`tr-file-line`,children:[(0,W.jsx)(`strong`,{children:f.name}),(0,W.jsx)(`span`,{children:Ji(f.sizeBytes)}),f.path&&(0,W.jsx)(`small`,{children:f.path})]}):(0,W.jsx)(`p`,{children:`No file selected yet.`}),(0,W.jsx)(`button`,{className:`tr-primary`,disabled:!f,onClick:()=>d(1),children:`Continue`})]})]}),u===1&&(0,W.jsxs)(`main`,{className:`tr-panel`,children:[(0,W.jsx)(ra,{file:f,job:c}),(0,W.jsx)(`h2`,{children:`Set source language`}),(0,W.jsx)(`div`,{className:`tr-language-grid`,children:[Gi[0],...i].map(e=>(0,W.jsxs)(`button`,{className:m===e.code?`selected`:``,onClick:()=>h(e.code),children:[(0,W.jsx)(`span`,{className:Xi(e.code),children:e.marker}),e.name]},e.code))}),(0,W.jsx)(sa,{back:()=>d(0),next:()=>d(2)})]}),u===2&&(0,W.jsxs)(`main`,{className:`tr-panel`,children:[(0,W.jsx)(ra,{file:f,job:c}),(0,W.jsxs)(`div`,{className:`tr-two-col`,children:[(0,W.jsxs)(`section`,{children:[(0,W.jsx)(`h2`,{children:`Set target languages`}),(0,W.jsx)(`div`,{className:`tr-language-grid compact`,children:i.map(e=>(0,W.jsxs)(`button`,{className:g.includes(e.code)?`selected`:``,onClick:()=>U(e.code),children:[(0,W.jsx)(`span`,{className:Xi(e.code),children:e.marker}),e.name]},e.code))})]}),(0,W.jsxs)(`section`,{className:`tr-side-card inline`,children:[(0,W.jsx)(`h3`,{children:`Pre-translation`}),(0,W.jsxs)(`label`,{children:[`Profile`,(0,W.jsxs)(`select`,{value:y,onChange:e=>b(e.target.value),children:[(0,W.jsx)(`option`,{value:`auto`,children:`Auto`}),(0,W.jsx)(`option`,{value:`office`,children:`Office / markup`}),(0,W.jsx)(`option`,{value:`pdf_academic`,children:`PDF academic`}),(0,W.jsx)(`option`,{value:`subtitle`,children:`Subtitle`}),(0,W.jsx)(`option`,{value:`json`,children:`JSON`}),(0,W.jsx)(`option`,{value:`local_draft`,children:`Local draft`})]})]}),(0,W.jsxs)(`label`,{children:[`Vendor`,(0,W.jsxs)(`select`,{value:x,onChange:e=>S(e.target.value),children:[(0,W.jsx)(`option`,{value:`draft_copy`,children:`Draft copy`}),(0,W.jsx)(`option`,{value:`ollama`,children:`Ollama`})]})]}),x===`ollama`&&(0,W.jsxs)(`label`,{children:[`Ollama model`,(0,W.jsx)(`input`,{value:C,onChange:e=>w(e.target.value)})]}),(0,W.jsxs)(`label`,{children:[`Thread count`,(0,W.jsx)(`input`,{type:`number`,min:1,max:8,value:ee,onChange:e=>T(Number(e.target.value)||1)})]}),(0,W.jsxs)(`label`,{children:[`Session timeout (hours)`,(0,W.jsx)(`input`,{type:`number`,min:1,max:12,value:E,onChange:e=>D(Number(e.target.value)||1)})]}),(0,W.jsxs)(`label`,{children:[`Output directory`,(0,W.jsxs)(`div`,{className:`tr-folder-row`,children:[(0,W.jsx)(`input`,{value:O,onChange:e=>k(e.target.value),placeholder:`Default translation output folder`}),(0,W.jsx)(`button`,{type:`button`,onClick:ve,children:`Browse`})]})]}),(0,W.jsx)(`button`,{className:`tr-primary`,disabled:L||!f,onClick:fe,children:L?`Creating...`:`Create workspace`})]})]})]}),u===3&&(0,W.jsx)(`main`,{className:`tr-editor-layout`,children:c?(0,W.jsxs)(W.Fragment,{children:[(0,W.jsxs)(`aside`,{className:`tr-doc-sidebar`,children:[(0,W.jsx)(ra,{file:f,job:c}),(0,W.jsxs)(`label`,{children:[`Target`,(0,W.jsx)(`select`,{value:A,onChange:e=>j(e.target.value),children:c.targetLanguages.map(e=>(0,W.jsx)(`option`,{value:e,children:oe(e)},e))})]}),(0,W.jsx)(`button`,{onClick:ge,disabled:L,children:L?`Working...`:`Pre-translate empty`}),(0,W.jsxs)(`label`,{children:[`Output directory`,(0,W.jsxs)(`div`,{className:`tr-folder-row vertical`,children:[(0,W.jsx)(`input`,{value:O,onChange:e=>k(e.target.value),placeholder:c.outputDir??`Default output folder`}),(0,W.jsx)(`button`,{type:`button`,onClick:ve,children:`Browse folder`})]})]}),(0,W.jsx)(`button`,{className:`tr-primary`,onClick:_e,disabled:L||[`queued`,`running`].includes(c.status),children:[`queued`,`running`].includes(c.status)?`Saving native output...`:`Save native output`}),xe&&(0,W.jsxs)(`div`,{className:`tr-live-progress`,children:[(0,W.jsxs)(`div`,{children:[(0,W.jsxs)(`strong`,{children:[xe.percent,`%`]}),(0,W.jsx)(`span`,{children:xe.desc})]}),(0,W.jsx)(ca,{value:xe.percent})]}),c.error&&(0,W.jsx)(`div`,{className:`tr-error-box`,children:c.error}),c.engineRuns?.[0]&&(0,W.jsxs)(`div`,{className:`tr-run-status`,children:[(0,W.jsx)(`strong`,{children:`Last native run`}),(0,W.jsxs)(`span`,{children:[c.engineRuns[0].status,` / `,c.engineRuns[0].model]})]}),c.outputs.length>0&&(0,W.jsxs)(`div`,{className:`tr-output-list`,children:[(0,W.jsx)(`strong`,{children:`Outputs`}),c.outputs.map(e=>(0,W.jsxs)(`div`,{className:`tr-output-item`,children:[(0,W.jsxs)(`span`,{children:[e.engine===`linguaharu`?`Native`:`Review`,` `,e.format.toUpperCase(),` - `,oe(e.targetLanguage)]}),(0,W.jsx)(`small`,{children:e.path}),(0,W.jsxs)(`div`,{children:[(0,W.jsx)(`button`,{onClick:()=>void ye(c.id,e.path),children:`Preview`}),(0,W.jsx)(`button`,{onClick:()=>be(e.path),children:`Show in folder`})]})]},`${e.path}-${e.createdAt}`))]}),(0,W.jsx)(`div`,{className:`tr-plan`,children:c.plan.map(e=>(0,W.jsx)(`span`,{children:e},e))})]}),(0,W.jsxs)(`section`,{className:`tr-editor-main`,children:[(0,W.jsxs)(`div`,{className:`tr-editor-top`,children:[(0,W.jsx)(ca,{value:Zi(c,A)}),(0,W.jsx)(`input`,{value:re,onChange:e=>I(e.target.value),placeholder:`Search source or translation`})]}),(0,W.jsxs)(`section`,{className:`tr-preview-panel`,children:[(0,W.jsxs)(`header`,{children:[(0,W.jsxs)(`div`,{children:[(0,W.jsx)(`strong`,{children:`Native preview`}),(0,W.jsx)(`span`,{children:ne?.outputPath?ne.outputPath:`Run native output, then preview the saved file side by side.`})]}),(0,W.jsx)(`button`,{onClick:()=>void ye(),disabled:P||!$i(c),children:P?`Loading...`:`Refresh preview`})]}),ne?(0,W.jsx)(ia,{preview:ne}):(0,W.jsx)(`p`,{className:`tr-preview-empty`,children:`No native output preview yet.`})]}),(0,W.jsx)(`div`,{className:`tr-segment-list`,children:H.map(e=>(0,W.jsxs)(`article`,{className:V?.id===e.id?`tr-segment selected`:`tr-segment`,onClick:()=>M(e.id),children:[(0,W.jsx)(`div`,{className:`tr-segment-index`,children:e.index}),(0,W.jsxs)(`div`,{children:[(0,W.jsx)(`strong`,{children:e.origin}),(0,W.jsx)(`p`,{children:e.source})]}),(0,W.jsxs)(`div`,{className:`tr-translation-cell`,children:[(0,W.jsx)(`textarea`,{value:e.translations[A]??``,placeholder:`Type translation here`,onChange:t=>pe(e.id,t.target.value)}),(0,W.jsxs)(`div`,{children:[(0,W.jsx)(`span`,{className:e.status[A]===`confirmed`?`confirmed`:`draft`,children:e.status[A]??`draft`}),(0,W.jsx)(`button`,{onClick:t=>{t.stopPropagation(),me(e.id)},children:`Save`}),(0,W.jsx)(`button`,{onClick:t=>{t.stopPropagation(),me(e.id,!0)},children:`Confirm`})]})]})]},e.id))})]}),(0,W.jsxs)(`aside`,{className:`tr-comment-panel`,children:[(0,W.jsx)(`h3`,{children:`Comments & activities`}),V?(0,W.jsxs)(W.Fragment,{children:[(0,W.jsx)(`strong`,{children:V.origin}),(0,W.jsx)(`p`,{children:V.comments.length?``:`No comments yet.`}),V.comments.map(e=>(0,W.jsxs)(`div`,{className:`tr-comment`,children:[(0,W.jsx)(`strong`,{children:e.author}),(0,W.jsx)(`span`,{children:new Date(e.createdAt).toLocaleString()}),(0,W.jsx)(`p`,{children:e.body})]},e.id)),(0,W.jsxs)(`div`,{className:`tr-comment-input`,children:[(0,W.jsx)(`input`,{value:z,onChange:e=>ie(e.target.value),placeholder:`Add a comment...`}),(0,W.jsx)(`button`,{onClick:he,children:`Send`})]})]}):(0,W.jsx)(`p`,{children:`Select a segment to review comments.`})]})]}):(0,W.jsxs)(`section`,{className:`tr-empty-state`,children:[(0,W.jsx)(`h2`,{children:`No workspace yet`}),(0,W.jsx)(`p`,{children:`Create a workspace from an uploaded or local file to edit real extracted segments.`}),(0,W.jsx)(`button`,{onClick:()=>d(0),children:`Start upload`})]})}),u===4&&(0,W.jsxs)(`main`,{className:`tr-document-stage`,children:[(0,W.jsxs)(`header`,{className:`tr-doc-head`,children:[(0,W.jsxs)(`div`,{children:[(0,W.jsx)(`span`,{children:`Documents`}),(0,W.jsx)(`h1`,{children:c?.sourceName??`Translation jobs`})]}),(0,W.jsx)(`button`,{onClick:()=>d(0),children:`New document`})]}),c&&(0,W.jsxs)(`section`,{className:`tr-doc-stats`,children:[(0,W.jsx)(la,{label:`Segments`,value:c.summary.segments}),(0,W.jsx)(la,{label:`Words`,value:c.summary.words}),(0,W.jsx)(la,{label:`Characters`,value:c.summary.characters}),(0,W.jsx)(la,{label:`Outputs`,value:c.outputs.length})]}),(0,W.jsx)(`section`,{className:`tr-doc-table-card`,children:(0,W.jsxs)(`table`,{children:[(0,W.jsx)(`thead`,{children:(0,W.jsxs)(`tr`,{children:[(0,W.jsx)(`th`,{children:`Document`}),(0,W.jsx)(`th`,{children:`Profile`}),(0,W.jsx)(`th`,{children:`Languages`}),(0,W.jsx)(`th`,{children:`Progress`}),(0,W.jsx)(`th`,{children:`Updated`}),(0,W.jsx)(`th`,{})]})}),(0,W.jsx)(`tbody`,{children:o.map(e=>(0,W.jsxs)(`tr`,{children:[(0,W.jsx)(`td`,{children:e.sourceName}),(0,W.jsx)(`td`,{children:e.profile}),(0,W.jsx)(`td`,{children:e.targetLanguages.map(oe).join(`, `)}),(0,W.jsx)(`td`,{children:(0,W.jsx)(ca,{value:Zi(e,e.targetLanguages[0]??`vi`)})}),(0,W.jsx)(`td`,{children:new Date(e.updatedAt).toLocaleString()}),(0,W.jsx)(`td`,{children:e.outputs.find(e=>e.engine===`linguaharu`)?(0,W.jsx)(`button`,{onClick:()=>be(e.outputs.find(e=>e.engine===`linguaharu`).path),children:`Show saved file`}):(0,W.jsx)(`button`,{onClick:()=>{l(e),j(e.targetLanguages[0]??`vi`),M(e.segments[0]?.id??null),d(3)},children:`Open`})})]},e.id))})]})})]})]}),(0,W.jsx)(`style`,{children:`
        .translation-view {
          --tr-bg: #f7f9fc;
          --tr-surface: #fff;
          --tr-soft: #f1f5f9;
          --tr-border: #dce4ef;
          --tr-text: #172033;
          --tr-muted: #64748b;
          --tr-blue: #2875dd;
          --tr-green: #088265;
          --tr-yellow: #eab94b;
          --tr-danger: #c2413b;
          color: var(--tr-text);
        }
        [data-theme="dark"] .translation-view {
          --tr-bg: #0f172a;
          --tr-surface: #111827;
          --tr-soft: #1f2937;
          --tr-border: #334155;
          --tr-text: #e5e7eb;
          --tr-muted: #9ca3af;
          --tr-blue: #60a5fa;
          --tr-green: #34d399;
          --tr-yellow: #fbbf24;
          --tr-danger: #f87171;
        }
        .tr-workspace { min-height: calc(100vh - 124px); background: var(--tr-bg); border: 1px solid var(--tr-border); border-radius: 14px; overflow: hidden; }
        .tr-appbar { display: flex; justify-content: space-between; align-items: center; gap: 16px; padding: 22px 28px; background: var(--tr-surface); border-bottom: 1px solid var(--tr-border); }
        .tr-appbar strong { display: block; font-size: 22px; }
        .tr-appbar span, .tr-status span, .tr-side-card p, .tr-file-line span, .tr-file-line small { color: var(--tr-muted); }
        .tr-actions, .tr-engine-grid, .tr-comment-input, .tr-editor-top { display: flex; align-items: center; gap: 10px; }
        button, input, select, textarea { font: inherit; }
        button { border: 1px solid var(--tr-border); background: var(--tr-surface); color: var(--tr-text); border-radius: 8px; padding: 10px 14px; font-weight: 800; cursor: pointer; }
        button:disabled { opacity: .55; cursor: not-allowed; }
        input, select, textarea { border: 1px solid var(--tr-border); background: var(--tr-surface); color: var(--tr-text); border-radius: 8px; padding: 10px 12px; }
        textarea { min-height: 86px; resize: vertical; width: 100%; }
        .tr-primary, .tr-dropzone button { background: var(--tr-blue); color: #fff; border-color: var(--tr-blue); }
        .tr-stepper { display: flex; justify-content: center; gap: 18px; padding: 28px; }
        .tr-stepper button { min-width: 140px; color: var(--tr-muted); }
        .tr-stepper span { display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 50%; background: var(--tr-soft); margin-right: 8px; }
        .tr-stepper .active, .tr-stepper .done { color: var(--tr-text); border-color: var(--tr-blue); }
        .tr-stepper .active span, .tr-stepper .done span { background: var(--tr-blue); color: #fff; }
        .tr-status, .tr-panel, .tr-side-card, .tr-dropzone, .tr-doc-sidebar, .tr-editor-main, .tr-comment-panel, .tr-doc-stats, .tr-doc-table-card, .tr-empty-state { background: var(--tr-surface); border: 1px solid var(--tr-border); border-radius: 12px; }
        .tr-status { max-width: 1100px; margin: 0 auto 24px; padding: 14px 18px; display: flex; justify-content: space-between; gap: 18px; }
        .tr-engine-grid span { padding: 7px 10px; border-radius: 999px; background: var(--tr-soft); color: var(--tr-muted); font-weight: 800; }
        .tr-engine-grid .ready { color: var(--tr-green); }
        .tr-upload-grid, .tr-two-col { display: grid; grid-template-columns: minmax(420px, 1fr) 340px; gap: 24px; max-width: 1080px; margin: 0 auto; padding: 18px 28px 54px; }
        .tr-dropzone { min-height: 330px; display: grid; place-items: center; text-align: center; padding: 36px; border-style: dashed; }
        .tr-upload-icon { display: grid; place-items: center; width: 54px; height: 54px; border-radius: 50%; background: var(--tr-soft); color: var(--tr-blue); font-weight: 900; }
        .tr-side-card { padding: 22px; display: grid; align-content: start; gap: 14px; }
        .tr-side-card.inline label { display: grid; gap: 7px; }
        .tr-folder-row { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 8px; }
        .tr-folder-row.vertical { grid-template-columns: 1fr; }
        .tr-folder-row input { min-width: 0; }
        .tr-file-line { display: grid; gap: 6px; padding: 14px; background: var(--tr-soft); border-radius: 8px; overflow-wrap: anywhere; }
        .tr-panel { max-width: 1100px; margin: 0 auto 54px; padding: 28px; }
        .tr-doc-strip { display: flex; align-items: center; gap: 12px; padding: 14px; background: var(--tr-soft); border-radius: 10px; margin-bottom: 24px; }
        .tr-doc-strip strong { flex: 1; overflow-wrap: anywhere; }
        .tr-source-pill { padding: 5px 9px; border-radius: 6px; background: color-mix(in srgb, var(--tr-blue) 12%, transparent); color: var(--tr-blue); font-weight: 800; }
        .tr-language-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: 12px; }
        .tr-language-grid.compact { grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); }
        .tr-language-grid button { display: flex; align-items: center; gap: 10px; text-align: left; }
        .tr-language-grid .selected { border-color: var(--tr-blue); box-shadow: 0 0 0 3px color-mix(in srgb, var(--tr-blue) 18%, transparent); }
        .tr-lang-marker { display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 50%; color: #fff; background: var(--tr-blue); font-size: 11px; font-weight: 900; }
        .marker-de { background: linear-gradient(#111 0 33%, #dd0000 33% 66%, #ffce00 66%); color: #fff; }
        .marker-fr { background: linear-gradient(90deg, #002395 0 33%, #fff 33% 66%, #ed2939 66%); color: #111; }
        .marker-it { background: linear-gradient(90deg, #008c45 0 33%, #fff 33% 66%, #cd212a 66%); color: #111; }
        .marker-vi { background: #d51d2a; }
        .marker-en { background: #294f9d; }
        .marker-zh { background: #de2910; }
        .marker-ja, .marker-ko, .marker-pl { background: var(--tr-surface); color: var(--tr-text); border: 1px solid var(--tr-border); }
        .marker-es { background: linear-gradient(#aa151b 0 25%, #f1bf00 25% 75%, #aa151b 75%); color: #111; }
        .tr-editor-layout { display: grid; grid-template-columns: 280px minmax(520px, 1fr) 320px; gap: 20px; padding: 18px 24px 44px; }
        .tr-doc-sidebar, .tr-comment-panel { padding: 18px; align-self: start; display: grid; gap: 12px; }
        .tr-doc-sidebar label { display: grid; gap: 7px; }
        .tr-error-box, .tr-run-status, .tr-output-list { border: 1px solid var(--tr-border); border-radius: 8px; padding: 10px; background: var(--tr-soft); }
        .tr-error-box { color: var(--tr-danger); white-space: pre-wrap; overflow-wrap: anywhere; max-height: 180px; overflow: auto; }
        .tr-run-status, .tr-output-list { display: grid; gap: 8px; color: var(--tr-muted); }
        .tr-run-status strong, .tr-output-list strong { color: var(--tr-text); }
        .tr-output-item { display: grid; gap: 7px; padding: 10px; border-radius: 8px; background: var(--tr-surface); border: 1px solid var(--tr-border); }
        .tr-output-item span { color: var(--tr-text); font-weight: 800; }
        .tr-output-item small { overflow-wrap: anywhere; }
        .tr-output-item div { display: flex; gap: 8px; flex-wrap: wrap; }
        .tr-plan { display: grid; gap: 8px; margin-top: 8px; }
        .tr-plan span, .tr-comment { background: var(--tr-soft); border-radius: 8px; padding: 10px; color: var(--tr-muted); }
        .tr-editor-main { overflow: hidden; }
        .tr-editor-top { justify-content: space-between; padding: 14px; border-bottom: 1px solid var(--tr-border); }
        .tr-editor-top input { min-width: 260px; }
        .tr-preview-panel { border-bottom: 1px solid var(--tr-border); padding: 14px; display: grid; gap: 12px; }
        .tr-preview-panel header { display: flex; justify-content: space-between; gap: 12px; align-items: center; }
        .tr-preview-panel header strong { display: block; }
        .tr-preview-panel header span, .tr-preview-empty { color: var(--tr-muted); overflow-wrap: anywhere; }
        .tr-native-preview { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 14px; min-height: 420px; }
        .tr-workbook-pane, .tr-pdf-pane { min-width: 0; border: 1px solid var(--tr-border); border-radius: 10px; background: var(--tr-surface); overflow: hidden; }
        .tr-workbook-pane header, .tr-pdf-pane > strong { display: flex; justify-content: space-between; gap: 10px; padding: 10px 12px; background: var(--tr-soft); color: var(--tr-text); }
        .tr-workbook-pane header span { color: var(--tr-muted); font-size: 12px; }
        .tr-sheet-scroll { max-height: 520px; overflow: auto; }
        .tr-sheet { border-collapse: collapse; width: max-content; min-width: 100%; font-size: 12px; }
        .tr-sheet th, .tr-sheet td { border: 1px solid var(--tr-border); padding: 6px 8px; min-width: 86px; max-width: 240px; height: 28px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .tr-sheet th { position: sticky; top: 0; background: var(--tr-soft); color: var(--tr-muted); z-index: 1; }
        .tr-sheet tbody th { left: 0; position: sticky; min-width: 44px; z-index: 1; }
        .tr-sheet td { background: var(--tr-surface); color: var(--tr-text); }
        .tr-pdf-pane { display: grid; grid-template-rows: auto minmax(520px, 70vh); }
        .tr-pdf-pane iframe { width: 100%; height: 100%; border: 0; background: #fff; }
        .tr-preview-grid { display: grid; grid-template-columns: 1fr 1fr; border: 1px solid var(--tr-border); border-radius: 10px; overflow: hidden; }
        .tr-preview-head { padding: 10px 12px; background: var(--tr-soft); color: var(--tr-muted); font-weight: 900; }
        .tr-preview-row { display: contents; }
        .tr-preview-row > div { min-width: 0; padding: 12px; border-top: 1px solid var(--tr-border); line-height: 1.45; }
        .tr-preview-row > div:nth-child(odd) { border-right: 1px solid var(--tr-border); }
        .tr-preview-row small { color: var(--tr-muted); display: block; margin-bottom: 6px; }
        .tr-preview-row p { margin: 0; overflow-wrap: anywhere; }
        .tr-progress { display: flex; align-items: center; gap: 10px; min-width: 180px; }
        .tr-progress i { display: block; flex: 1; height: 8px; background: var(--tr-yellow); border-radius: 999px; overflow: hidden; }
        .tr-progress b { display: block; height: 100%; background: var(--tr-green); }
        .tr-live-progress { display: grid; gap: 8px; border: 1px solid var(--tr-border); border-radius: 8px; padding: 10px; background: var(--tr-soft); }
        .tr-live-progress > div { display: flex; justify-content: space-between; gap: 10px; align-items: center; color: var(--tr-muted); }
        .tr-live-progress strong { color: var(--tr-text); }
        .tr-segment-list { max-height: 68vh; overflow: auto; }
        .tr-segment { display: grid; grid-template-columns: 44px minmax(180px, .9fr) minmax(240px, 1fr); gap: 14px; padding: 16px; border-bottom: 1px solid var(--tr-border); cursor: pointer; }
        .tr-segment.selected { box-shadow: inset 4px 0 0 var(--tr-blue); }
        .tr-segment-index { color: var(--tr-muted); font-size: 12px; }
        .tr-segment p { margin: 8px 0 0; line-height: 1.45; }
        .tr-translation-cell > div { display: flex; align-items: center; justify-content: flex-end; gap: 8px; margin-top: 8px; }
        .tr-translation-cell span { padding: 4px 8px; border-radius: 999px; font-size: 12px; font-weight: 800; background: var(--tr-soft); color: var(--tr-muted); }
        .tr-translation-cell .confirmed { color: var(--tr-green); }
        .tr-comment-panel { border-width: 3px; border-color: color-mix(in srgb, var(--tr-blue) 55%, var(--tr-border)); }
        .tr-comment span { display: block; color: var(--tr-muted); font-size: 12px; }
        .tr-comment-input input { flex: 1; min-width: 0; }
        .tr-document-stage { padding: 28px; }
        .tr-doc-head { display: flex; justify-content: space-between; align-items: end; margin-bottom: 20px; }
        .tr-doc-head h1 { margin: 4px 0 0; }
        .tr-doc-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; padding: 20px; margin-bottom: 20px; }
        .tr-stat span { color: var(--tr-muted); display: block; margin-bottom: 6px; }
        .tr-stat strong { font-size: 22px; }
        .tr-doc-table-card { overflow: auto; }
        table { width: 100%; border-collapse: collapse; }
        th, td { text-align: left; padding: 14px; border-bottom: 1px solid var(--tr-border); }
        th { color: var(--tr-muted); }
        .tr-empty-state { max-width: 620px; margin: 36px auto; padding: 32px; text-align: center; }
        .tr-footer-nav { display: flex; justify-content: space-between; margin-top: 28px; }
        @media (max-width: 1180px) {
          .tr-upload-grid, .tr-two-col, .tr-editor-layout { grid-template-columns: 1fr; }
          .tr-status { margin-left: 18px; margin-right: 18px; flex-direction: column; }
        }
        @media (max-width: 760px) {
          .tr-appbar, .tr-doc-head { align-items: stretch; flex-direction: column; }
          .tr-stepper { overflow-x: auto; justify-content: flex-start; }
          .tr-segment { grid-template-columns: 1fr; }
          .tr-doc-stats { grid-template-columns: 1fr 1fr; }
          .tr-editor-top { align-items: stretch; flex-direction: column; }
          .tr-editor-top input { min-width: 0; width: 100%; }
          .tr-preview-grid { grid-template-columns: 1fr; }
          .tr-native-preview { grid-template-columns: 1fr; }
          .tr-preview-head:nth-child(2) { display: none; }
          .tr-preview-row > div:nth-child(odd) { border-right: 0; background: var(--tr-soft); }
        }
      `})]})}function ra({file:e,job:t}){let n=t?.sourceName??e?.name??`No document`,r=t?Ji(t.sourceSizeBytes):e?Ji(e.sizeBytes):``;return(0,W.jsxs)(`div`,{className:`tr-doc-strip`,children:[(0,W.jsx)(`span`,{className:`tr-source-pill`,children:n.split(`.`).pop()?.toUpperCase()??`DOC`}),(0,W.jsx)(`strong`,{children:n}),(0,W.jsx)(`span`,{children:r})]})}function ia({preview:e}){if(e.type===`xlsx`)return(0,W.jsxs)(`div`,{className:`tr-native-preview`,children:[(0,W.jsx)(aa,{title:`Original workbook`,workbook:e.sourceWorkbook}),(0,W.jsx)(aa,{title:`Translated workbook`,workbook:e.outputWorkbook??void 0})]});if(e.type===`pdf`)return(0,W.jsxs)(`div`,{className:`tr-native-preview pdf`,children:[(0,W.jsxs)(`div`,{className:`tr-pdf-pane`,children:[(0,W.jsx)(`strong`,{children:`Original PDF`}),e.sourceUrl?(0,W.jsx)(`iframe`,{title:`Original PDF`,src:Wn(e.sourceUrl)}):(0,W.jsx)(`p`,{children:`No source PDF.`})]}),(0,W.jsxs)(`div`,{className:`tr-pdf-pane`,children:[(0,W.jsx)(`strong`,{children:`Translated PDF`}),e.outputUrl?(0,W.jsx)(`iframe`,{title:`Translated PDF`,src:Wn(e.outputUrl)}):(0,W.jsx)(`p`,{children:`No translated PDF yet.`})]})]});let t=Math.max(e.sourceBlocks?.length??0,e.outputBlocks?.length??0);return(0,W.jsxs)(`div`,{className:`tr-preview-grid`,children:[(0,W.jsx)(`div`,{className:`tr-preview-head`,children:`Original`}),(0,W.jsx)(`div`,{className:`tr-preview-head`,children:`Translated output`}),Array.from({length:Math.min(t,24)},(t,n)=>(0,W.jsxs)(`div`,{className:`tr-preview-row`,children:[(0,W.jsxs)(`div`,{children:[(0,W.jsx)(`small`,{children:e.sourceBlocks?.[n]?.origin??`Block ${n+1}`}),(0,W.jsx)(`p`,{children:e.sourceBlocks?.[n]?.source||`No text`})]}),(0,W.jsxs)(`div`,{children:[(0,W.jsx)(`small`,{children:e.outputBlocks?.[n]?.origin??`Block ${n+1}`}),(0,W.jsx)(`p`,{children:e.outputBlocks?.[n]?.source||`No translated text found`})]})]},n))]})}function aa({title:e,workbook:t}){let n=t?.sheets[0];return(0,W.jsxs)(`div`,{className:`tr-workbook-pane`,children:[(0,W.jsxs)(`header`,{children:[(0,W.jsx)(`strong`,{children:e}),(0,W.jsx)(`span`,{children:n?`${n.name} / ${n.rowCount} rows x ${n.columnCount} cols`:`No workbook preview`})]}),n?(0,W.jsx)(`div`,{className:`tr-sheet-scroll`,children:(0,W.jsxs)(`table`,{className:`tr-sheet`,children:[(0,W.jsx)(`thead`,{children:(0,W.jsxs)(`tr`,{children:[(0,W.jsx)(`th`,{}),Array.from({length:Math.max(...n.rows.map(e=>e.length),0)},(e,t)=>(0,W.jsx)(`th`,{children:oa(t+1)},t))]})}),(0,W.jsx)(`tbody`,{children:n.rows.map((e,t)=>(0,W.jsxs)(`tr`,{children:[(0,W.jsx)(`th`,{children:t+1}),e.map((e,t)=>(0,W.jsx)(`td`,{children:e},t))]},t))})]})}):(0,W.jsx)(`p`,{className:`tr-preview-empty`,children:`No translated workbook yet.`})]})}function oa(e){let t=``,n=e;for(;n>0;){let e=(n-1)%26;t=String.fromCharCode(65+e)+t,n=Math.floor((n-1)/26)}return t}function sa({back:e,next:t}){return(0,W.jsxs)(`div`,{className:`tr-footer-nav`,children:[(0,W.jsx)(`button`,{onClick:e,children:`Back`}),(0,W.jsx)(`button`,{className:`tr-primary`,onClick:t,children:`Continue`})]})}function ca({value:e}){return(0,W.jsxs)(`span`,{className:`tr-progress`,children:[(0,W.jsx)(`i`,{children:(0,W.jsx)(`b`,{style:{width:`${Math.max(0,Math.min(100,e))}%`}})}),(0,W.jsxs)(`strong`,{children:[e,`%`]})]})}function la({label:e,value:t}){return(0,W.jsxs)(`div`,{className:`tr-stat`,children:[(0,W.jsx)(`span`,{children:e}),(0,W.jsx)(`strong`,{children:t.toLocaleString()})]})}function ua(){return(0,W.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,W.jsx)(`rect`,{x:`3`,y:`3`,width:`7`,height:`7`,rx:`1`}),(0,W.jsx)(`rect`,{x:`14`,y:`3`,width:`7`,height:`7`,rx:`1`}),(0,W.jsx)(`rect`,{x:`3`,y:`14`,width:`7`,height:`7`,rx:`1`}),(0,W.jsx)(`rect`,{x:`14`,y:`14`,width:`7`,height:`7`,rx:`1`})]})}function da(){return(0,W.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,W.jsx)(`path`,{d:`M9 11l3 3L22 4`}),(0,W.jsx)(`path`,{d:`M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11`})]})}function fa(){return(0,W.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,W.jsx)(`rect`,{x:`3`,y:`3`,width:`18`,height:`18`,rx:`2`}),(0,W.jsx)(`circle`,{cx:`8.5`,cy:`8.5`,r:`1.5`}),(0,W.jsx)(`path`,{d:`M21 15l-5-5L5 21`})]})}function pa(){return(0,W.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,W.jsx)(`rect`,{x:`3`,y:`4`,width:`18`,height:`16`,rx:`2`}),(0,W.jsx)(`path`,{d:`M7 15l3-3 2 2 3-4 2 3`}),(0,W.jsx)(`circle`,{cx:`8`,cy:`8`,r:`1`}),(0,W.jsx)(`path`,{d:`M17 7l3 3`}),(0,W.jsx)(`path`,{d:`M20 7l-3 3`})]})}function ma(){return(0,W.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,W.jsx)(`rect`,{x:`3`,y:`4`,width:`18`,height:`16`,rx:`2`}),(0,W.jsx)(`path`,{d:`M7 8h10`}),(0,W.jsx)(`path`,{d:`M7 12h4`}),(0,W.jsx)(`path`,{d:`M14 12l3 3`}),(0,W.jsx)(`path`,{d:`M17 12l-3 3`}),(0,W.jsx)(`circle`,{cx:`9`,cy:`16`,r:`1`})]})}function ha(){return(0,W.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,W.jsx)(`rect`,{x:`2`,y:`4`,width:`2`,height:`16`}),(0,W.jsx)(`rect`,{x:`6`,y:`4`,width:`1.5`,height:`16`}),(0,W.jsx)(`rect`,{x:`10`,y:`4`,width:`2.5`,height:`16`}),(0,W.jsx)(`rect`,{x:`14`,y:`4`,width:`1`,height:`16`}),(0,W.jsx)(`rect`,{x:`17`,y:`4`,width:`2`,height:`16`}),(0,W.jsx)(`rect`,{x:`21`,y:`4`,width:`1`,height:`16`})]})}function ga(){return(0,W.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,W.jsx)(`path`,{d:`M17 3a2.83 2.83 0 114 4L7.5 20.5 2 22l1.5-5.5z`}),(0,W.jsx)(`path`,{d:`M15 5l4 4`})]})}function _a(){return(0,W.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,W.jsx)(`path`,{d:`M4 5h9`}),(0,W.jsx)(`path`,{d:`M9 3v2`}),(0,W.jsx)(`path`,{d:`M11 5c-.8 4-3.1 6.8-6 8`}),(0,W.jsx)(`path`,{d:`M6.5 8c1 2 2.5 3.6 4.5 5`}),(0,W.jsx)(`path`,{d:`M13 19l4-9 4 9`}),(0,W.jsx)(`path`,{d:`M14.4 16h5.2`})]})}function va(){return(0,W.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,W.jsx)(`circle`,{cx:`12`,cy:`8`,r:`4`}),(0,W.jsx)(`path`,{d:`M5 21a7 7 0 0114 0`}),(0,W.jsx)(`path`,{d:`M18 3l1 2 2 1-2 1-1 2-1-2-2-1 2-1z`})]})}function ya(){return(0,W.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,W.jsx)(`path`,{d:`M4 19.5A2.5 2.5 0 016.5 17H20`}),(0,W.jsx)(`path`,{d:`M4 4.5A2.5 2.5 0 016.5 2H20v20H6.5A2.5 2.5 0 014 19.5z`}),(0,W.jsx)(`path`,{d:`M8 7h8`}),(0,W.jsx)(`path`,{d:`M8 11h6`}),(0,W.jsx)(`path`,{d:`M8 15h5`})]})}function ba(){return(0,W.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,W.jsx)(`circle`,{cx:`12`,cy:`12`,r:`3`}),(0,W.jsx)(`path`,{d:`M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z`})]})}function xa(){return(0,W.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,W.jsx)(`circle`,{cx:`11`,cy:`11`,r:`8`}),(0,W.jsx)(`path`,{d:`M21 21l-4.35-4.35`})]})}function Sa(){return(0,W.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,W.jsx)(`path`,{d:`M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9`}),(0,W.jsx)(`path`,{d:`M13.73 21a2 2 0 01-3.46 0`})]})}function Ca(){return(0,W.jsx)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:(0,W.jsx)(`path`,{d:`M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z`})})}function wa(){return(0,W.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,W.jsx)(`path`,{d:`M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4`}),(0,W.jsx)(`polyline`,{points:`17 8 12 3 7 8`}),(0,W.jsx)(`line`,{x1:`12`,y1:`3`,x2:`12`,y2:`15`})]})}function Ta(){return(0,W.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,W.jsx)(`line`,{x1:`5`,y1:`12`,x2:`19`,y2:`12`}),(0,W.jsx)(`polyline`,{points:`12 5 19 12 12 19`})]})}function Ea(){return(0,W.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,W.jsx)(`line`,{x1:`3`,y1:`12`,x2:`21`,y2:`12`}),(0,W.jsx)(`line`,{x1:`3`,y1:`6`,x2:`21`,y2:`6`}),(0,W.jsx)(`line`,{x1:`3`,y1:`18`,x2:`21`,y2:`18`})]})}function Da(){return(0,W.jsx)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:(0,W.jsx)(`polyline`,{points:`9 18 15 12 9 6`})})}function Oa(){return(0,W.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,W.jsx)(`circle`,{cx:`12`,cy:`12`,r:`5`}),(0,W.jsx)(`line`,{x1:`12`,y1:`1`,x2:`12`,y2:`3`}),(0,W.jsx)(`line`,{x1:`12`,y1:`21`,x2:`12`,y2:`23`}),(0,W.jsx)(`line`,{x1:`4.22`,y1:`4.22`,x2:`5.64`,y2:`5.64`}),(0,W.jsx)(`line`,{x1:`18.36`,y1:`18.36`,x2:`19.78`,y2:`19.78`}),(0,W.jsx)(`line`,{x1:`1`,y1:`12`,x2:`3`,y2:`12`}),(0,W.jsx)(`line`,{x1:`21`,y1:`12`,x2:`23`,y2:`12`}),(0,W.jsx)(`line`,{x1:`4.22`,y1:`19.78`,x2:`5.64`,y2:`18.36`}),(0,W.jsx)(`line`,{x1:`18.36`,y1:`5.64`,x2:`19.78`,y2:`4.22`})]})}function ka(){return(0,W.jsx)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:(0,W.jsx)(`path`,{d:`M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z`})})}function Aa(){return(0,W.jsx)(`img`,{src:`/icons/logo.png`,alt:`GRIMOIRE`,style:{width:28,height:28,borderRadius:6,objectFit:`contain`}})}var ja={"/":`1`,"/data-qc":`2`,"/image-edit":`3`,"/images-check":`4`,"/packshot-browser":`5`,"/ean-sorter":`6`,"/ean-renamer":`7`,"/translation":`8`,"/guide":`9`,"/credits":`0`},Ma=[{to:`/`,label:`Dashboard`,icon:ua,img:null,mono:!1},{to:`/data-qc`,label:`Data QC`,icon:da,img:`/icons/data-qc.png`,mono:!1},{to:`/image-edit`,label:`Image Edit`,icon:fa,img:`/icons/image-edit.png`,mono:!1},{to:`/images-check`,label:`Images Check`,icon:pa,img:null,mono:!1},{to:`/packshot-browser`,label:`Packshot Browser`,icon:ma,img:`/icons/ean-sorter-gallery.png`,mono:!1},{to:`/ean-sorter`,label:`EAN Sorter`,icon:ha,img:`/icons/ean-sorter.png`,mono:!0},{to:`/ean-renamer`,label:`EAN Renamer`,icon:ga,img:`/icons/ean-renamer.png`,mono:!1},{to:`/translation`,label:`Translation`,icon:_a,img:`/icons/translation.svg`,mono:!1},{to:`/guide`,label:`Guide`,icon:ya,img:null,mono:!1},{to:`/credits`,label:`Credits`,icon:va,img:null,mono:!1}];function Na({collapsed:e,onToggle:t,onOpenSettings:n}){return(0,W.jsxs)(`nav`,{className:`sidebar ${e?`collapsed`:``}`,children:[(0,W.jsxs)(`div`,{className:`sidebar-brand`,children:[(0,W.jsx)(Aa,{}),!e&&(0,W.jsx)(`span`,{className:`sidebar-brand-text`,children:`GRIMOIRE`})]}),(0,W.jsxs)(`div`,{className:`sidebar-nav`,children:[!e&&(0,W.jsx)(`div`,{className:`sidebar-section-label`,children:`Main`}),Ma.map(t=>(0,W.jsxs)(vn,{to:t.to,end:t.to===`/`,className:({isActive:e})=>`sidebar-link ${e?`active`:``}`,title:e?t.label:void 0,children:[t.img?(0,W.jsx)(`img`,{src:t.img,alt:``,className:`sidebar-link-img${t.mono?` icon-mono`:``}`}):(0,W.jsx)(t.icon,{}),!e&&(0,W.jsx)(`span`,{className:`sidebar-link-text`,children:t.label}),!e&&ja[t.to]&&(0,W.jsxs)(`kbd`,{className:`sidebar-kbd`,children:[`Ctrl+`,ja[t.to]]})]},t.to))]}),(0,W.jsxs)(`div`,{className:`sidebar-bottom`,children:[(0,W.jsxs)(`button`,{className:`sidebar-link sidebar-link-btn`,onClick:n,title:e?`Settings`:void 0,children:[(0,W.jsx)(ba,{}),!e&&(0,W.jsx)(`span`,{className:`sidebar-link-text`,children:`Settings`})]}),(0,W.jsxs)(`button`,{className:`sidebar-link sidebar-link-btn`,onClick:t,title:e?`Expand sidebar`:`Collapse sidebar`,children:[(0,W.jsx)(Ea,{}),!e&&(0,W.jsx)(`span`,{className:`sidebar-link-text`,children:`Collapse`})]})]})]})}var Pa={"/":`Dashboard`,"/data-qc":`Data Quality Control`,"/image-edit":`Image Edit`,"/images-check":`Images Check`,"/packshot-browser":`Packshot Browser`,"/ean-sorter":`EAN Sorter`,"/ean-renamer":`EAN Renamer`,"/translation":`Translation`,"/guide":`Guide`,"/credits":`Credits`};function Fa(){let e=Xe(),t=Pa[e.pathname]??`Page`;return(0,W.jsxs)(`div`,{className:`breadcrumb`,children:[e.pathname!==`/`&&(0,W.jsxs)(W.Fragment,{children:[(0,W.jsx)(vn,{to:`/`,className:`breadcrumb-link`,children:`Dashboard`}),(0,W.jsx)(Da,{})]}),(0,W.jsx)(`span`,{className:`breadcrumb-current`,children:t})]})}function Ia({open:e,onClose:t}){let{notifications:n,markAllRead:r,dismiss:i,clearAll:a}=Hn(),o=(0,_.useRef)(null);if((0,_.useEffect)(()=>{if(!e)return;let n=e=>{o.current&&!o.current.contains(e.target)&&t()};return document.addEventListener(`mousedown`,n),()=>document.removeEventListener(`mousedown`,n)},[e,t]),!e)return null;let s=e=>{let t=Math.floor((Date.now()-e)/1e3);return t<60?`just now`:t<3600?`${Math.floor(t/60)}m ago`:t<86400?`${Math.floor(t/3600)}h ago`:`${Math.floor(t/86400)}d ago`};return(0,W.jsxs)(`div`,{className:`notif-panel`,ref:o,children:[(0,W.jsxs)(`div`,{className:`notif-panel-header`,children:[(0,W.jsx)(`h3`,{children:`Notifications`}),(0,W.jsxs)(`div`,{className:`notif-panel-actions`,children:[(0,W.jsx)(`button`,{onClick:r,children:`Mark all read`}),(0,W.jsx)(`button`,{onClick:a,children:`Clear`})]})]}),(0,W.jsx)(`div`,{className:`notif-panel-body`,children:n.length===0?(0,W.jsx)(`div`,{className:`notif-empty`,children:`No notifications yet`}):n.map(e=>(0,W.jsxs)(`div`,{className:`notif-item ${e.read?``:`unread`} notif-${e.type}`,children:[(0,W.jsx)(`div`,{className:`notif-dot`}),(0,W.jsxs)(`div`,{className:`notif-content`,children:[(0,W.jsx)(`div`,{className:`notif-title`,children:e.title}),e.message&&(0,W.jsx)(`div`,{className:`notif-msg`,children:e.message}),(0,W.jsx)(`div`,{className:`notif-time`,children:s(e.timestamp)})]}),(0,W.jsx)(`button`,{className:`notif-dismiss`,onClick:()=>i(e.id),children:`âœ•`})]},e.id))})]})}var La=`2026.06.22.3`,Ra=[{to:`/`,title:`Dashboard`,desc:`Overview, releases, quick actions`,keywords:[`home`,`dashboard`,`main`,`release`]},{to:`/data-qc`,title:`Data QC`,desc:`Audit master data and generate reports`,keywords:[`data`,`qc`,`audit`,`master`,`report`,`quality`]},{to:`/image-edit`,title:`Image Edit`,desc:`Batch resize, canvas, upscale, export`,keywords:[`image`,`edit`,`upscale`,`resize`,`background`,`canvas`]},{to:`/images-check`,title:`Images Check`,desc:`Scan folders and delete rejected images`,keywords:[`images`,`check`,`delete`,`clean`,`review`,`gallery`,`slideshow`]},{to:`/packshot-browser`,title:`Packshot Browser`,desc:`Browse synced packshot folders, hover preview, select, copy, and export reports`,keywords:[`packshot`,`browser`,`finder`,`preview`,`hover`,`onedrive`,`copy`,`ean`]},{to:`/ean-sorter`,title:`EAN Sorter`,desc:`Scan EANs and sort files into folders`,keywords:[`ean`,`sort`,`sorter`,`barcode`,`folder`,`status`]},{to:`/ean-renamer`,title:`EAN Renamer`,desc:`Rename or copy product images by EAN`,keywords:[`ean`,`rename`,`renamer`,`copy`,`packshot`,`product name`]},{to:`/translation`,title:`Translation`,desc:`Plan document translation workflows and check translation engines`,keywords:[`translation`,`translate`,`docutranslate`,`pdf`,`docx`,`xlsx`,`subtitle`,`json`,`glossary`]},{to:`/guide`,title:`Guide`,desc:`When to use each tab and how to handle common cases`,keywords:[`guide`,`help`,`how`,`workflow`,`tab`,`case`,`huong dan`]},{to:`/credits`,title:`Credits`,desc:`MDX team credits`,keywords:[`credits`,`team`,`about`]}],za=[`Run Preview before any in-folder rename so conflicts are visible before files move.`,`Images Check scans every subfolder, so point it at the highest product folder you trust.`,`Packshot Browser scans filenames first, then loads previews on demand so synced OneDrive folders stay responsive.`,`Translation keeps GPL repos as references by default and uses DocuTranslate as the cleaner core integration path.`,`Use EAN_ProductName in EAN Renamer only when the product name should control continuous numbering.`,`EAN Sorter writes EAN_report.xlsx in the scanned folder after sorting.`,`Use Copy mode first when testing a new naming rule.`,`The top search can jump to tools or reveal files in recent output folders.`];function Ba(e,t){let n=t.trim().toLowerCase();return n?`${e.title} ${e.desc} ${e.keywords.join(` `)}`.toLowerCase().includes(n):!1}function Va(){let e=new Set,t=t=>{if(t)try{let n=JSON.parse(t);Array.isArray(n)?n.forEach(t=>typeof t==`string`&&e.add(t)):n&&typeof n==`object`?Object.values(n).forEach(t=>typeof t==`string`&&e.add(t)):typeof n==`string`&&e.add(n)}catch{e.add(t)}};return t(localStorage.getItem(`grimoire-ean-renamer-output-roots`)),t(localStorage.getItem(`grimoire-ean-sorter-root`)),t(localStorage.getItem(`grimoire-images-check-root`)),t(localStorage.getItem(`grimoire-packshot-browser-root`)),Array.from(e)}function Ha(e){return e<1024?`${e} B`:e<1024*1024?`${(e/1024).toFixed(1)} KB`:`${(e/1024/1024).toFixed(2)} MB`}function Ua(){let e=$e(),{notify:t}=Hn(),[n,r]=(0,_.useState)(``),[i,a]=(0,_.useState)([]),[o,s]=(0,_.useState)(!1),c=(0,_.useMemo)(()=>Ra.filter(e=>Ba(e,n)).slice(0,6),[n]);(0,_.useEffect)(()=>{let e=n.trim();if(e.length<2){a([]);return}let t=Va();if(t.length===0){a([]);return}let r=window.setTimeout(async()=>{try{a((await G(`/api/search/files`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({query:e,roots:t,extensions:[`.jpg`,`.jpeg`,`.png`,`.webp`,`.tif`,`.tiff`,`.bmp`,`.avif`],limit:40})})).results||[])}catch{a([])}},250);return()=>window.clearTimeout(r)},[n]);let l=e=>{window.__grimoire?.revealInExplorer?window.__grimoire.revealInExplorer(e):G(`/api/local/reveal`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({path:e})}),t(`Opening output location`,{type:`info`}),s(!1)},u=o&&n.trim().length>0;return(0,W.jsxs)(`div`,{className:`topbar-search command-search`,children:[(0,W.jsx)(xa,{}),(0,W.jsx)(`input`,{type:`text`,value:n,onChange:e=>r(e.target.value),onFocus:()=>s(!0),onKeyDown:t=>{t.key===`Enter`&&c[0]&&(e(c[0].to),s(!1)),t.key===`Escape`&&s(!1)},placeholder:`Search features, tools, output files...`}),u&&(0,W.jsxs)(`div`,{className:`command-results`,onMouseDown:e=>e.preventDefault(),children:[c.length>0&&(0,W.jsx)(`div`,{className:`command-label`,children:`Tools`}),c.map(t=>(0,W.jsxs)(`button`,{className:`command-row`,onClick:()=>{e(t.to),s(!1)},children:[(0,W.jsx)(`strong`,{children:t.title}),(0,W.jsx)(`span`,{children:t.desc}),(0,W.jsx)(`em`,{children:t.keywords.slice(0,5).join(` · `)})]},t.to)),i.length>0&&(0,W.jsx)(`div`,{className:`command-label`,children:`Output files`}),i.map(e=>(0,W.jsxs)(`button`,{className:`command-row file`,onClick:()=>l(e.path),children:[(0,W.jsx)(`strong`,{children:e.name}),(0,W.jsx)(`span`,{children:e.relativePath}),(0,W.jsxs)(`em`,{children:[e.width&&e.height?`${e.width}x${e.height} · `:``,Ha(e.sizeBytes)]})]},e.path)),c.length===0&&i.length===0&&(0,W.jsx)(`div`,{className:`command-empty`,children:`No matching tool or recent output file.`})]})]})}function Wa({collapsed:e}){let{theme:t,toggle:n}=Rn(),{unreadCount:r}=Hn(),[i,a]=(0,_.useState)(null),[o,s]=(0,_.useState)(!1);return(0,_.useEffect)(()=>{let e=()=>fetch(Wn(`/health`)).then(e=>e.ok&&a(!0)).catch(()=>a(!1));e();let t=setInterval(e,3e4);return()=>clearInterval(t)},[]),(0,W.jsxs)(`header`,{className:`topbar`,style:{left:e?`var(--sidebar-collapsed)`:`var(--sidebar-width)`},children:[(0,W.jsx)(Fa,{}),(0,W.jsx)(Ua,{}),(0,W.jsx)(`div`,{className:`topbar-spacer`}),(0,W.jsxs)(`div`,{className:`topbar-actions`,children:[i!==null&&(0,W.jsxs)(`span`,{className:`status-online ${i?``:`offline`}`,children:[(0,W.jsx)(`span`,{className:`dot`}),i?`Online`:`Offline`]}),(0,W.jsx)(`button`,{className:`topbar-btn`,onClick:n,title:`Switch to ${t===`dark`?`light`:`dark`} mode`,children:t===`dark`?(0,W.jsx)(Oa,{}):(0,W.jsx)(ka,{})}),(0,W.jsxs)(`div`,{style:{position:`relative`},children:[(0,W.jsxs)(`button`,{className:`topbar-btn`,onClick:()=>s(!o),children:[(0,W.jsx)(Sa,{}),r>0&&(0,W.jsx)(`span`,{className:`badge`,children:r>9?`9+`:r})]}),(0,W.jsx)(Ia,{open:o,onClose:()=>s(!1)})]}),(0,W.jsxs)(`div`,{className:`topbar-user`,children:[(0,W.jsx)(`img`,{src:`/icons/tray.png`,alt:``,className:`topbar-avatar-img`}),(0,W.jsx)(`span`,{className:`topbar-username`,children:`GRIMOIRE`})]})]})]})}var Ga=[{to:`/data-qc`,title:`Data Quality Control`,desc:`Audit master data, validate fields, generate quality reports`,icon:da,img:`/icons/data-qc.png`,mono:!1,gradient:`linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)`},{to:`/image-edit`,title:`Image Edit`,desc:`AI background removal, upscaling, batch canvas editing`,icon:fa,img:`/icons/image-edit.png`,mono:!1,gradient:`linear-gradient(135deg, #0891b2 0%, #0e7490 100%)`},{to:`/packshot-browser`,title:`Packshot Browser`,desc:`Browse synced packshot folders, hover preview images, select files, and copy them to output`,icon:ma,img:`/icons/ean-sorter-gallery.png`,mono:!1,gradient:`linear-gradient(135deg, #0f766e 0%, #2563eb 100%)`},{to:`/ean-sorter`,title:`EAN Sorter`,desc:`Scan folders for EAN barcodes, sort files into organized structure`,icon:ha,img:`/icons/ean-sorter.png`,mono:!0,gradient:`linear-gradient(135deg, #059669 0%, #047857 100%)`},{to:`/ean-renamer`,title:`EAN Renamer`,desc:`Batch rename product images by EAN with drag-and-drop`,icon:ga,img:`/icons/ean-renamer.png`,mono:!1,gradient:`linear-gradient(135deg, #d97706 0%, #b45309 100%)`},{to:`/translation`,title:`Translation`,desc:`Plan document translation workflows across Office, PDF, subtitles, JSON, and local models`,icon:_a,img:`/icons/translation.svg`,mono:!1,gradient:`linear-gradient(135deg, #14b8a6 0%, #2563eb 58%, #7c3aed 100%)`}],Ka=[{to:`/ean-sorter`,title:`Scan Folder`,desc:`Quick-scan a folder for EAN barcodes`,icon:Ca,bg:`#059669`},{to:`/image-edit`,title:`Batch Process`,desc:`Upload images for bulk editing`,icon:wa,bg:`#0891b2`},{to:`/data-qc`,title:`Run Audit`,desc:`Start a data quality check`,icon:da,bg:`#4f46e5`},{to:`/translation`,title:`Plan Translation`,desc:`Choose the right document translation engine`,icon:_a,bg:`#2563eb`}],qa=[{img:`/icons/banner-data-qc.jpg`,to:`/data-qc`,title:`Data Quality Control`,desc:`Audit master data, validate fields, generate missing data reports and quality checks across brands.`,btn:`Open Data QC`},{img:`/icons/banner-image-edit.jpg`,to:`/image-edit`,title:`Image Edit`,desc:`AI-powered background removal, smart upscaling, batch canvas editing for product images.`,btn:`Open Image Edit`},{img:`/icons/banner-ean-sorter.jpg`,to:`/ean-sorter`,title:`EAN Sorter`,desc:`Scan folders for EAN barcodes, sort files into organized structure, and categorize by product status.`,btn:`Open EAN Sorter`},{img:`/icons/banner-ean-renamer.jpg`,to:`/ean-renamer`,title:`EAN Renamer`,desc:`Batch rename product images by EAN with drag-and-drop, multiple naming modes and category support.`,btn:`Open EAN Renamer`},{img:`/icons/translation.svg`,to:`/translation`,title:`Translation`,desc:`Plan internal document translation using DocuTranslate as the core, local models as draft engines, and formatting-aware QA.`,btn:`Open Translation`}],Ja=[{version:`2026.06.22.3`,date:`2026-06-22`,title:`Packshot folder and thumbnail hotfix`,type:`Packshot Browser`,changes:[`Selecting a parent folder now shows images from its child folders, matching the folder counts in the sidebar.`,`Cloud-only OneDrive thumbnails now use Windows Explorer cached bitmaps more reliably without downloading original files.`,`The large-folder workflow keeps progressive thumbnail loading while fixing empty parent-folder views.`]},{version:`2026.06.22.2`,date:`2026-06-22`,title:`Guide details and banner readability`,type:`Guide + Interface`,changes:[`Expanded the Guide tab in English with detailed purpose, key features, step-by-step usage, common cases, and notes for each tool tab.`,`Updated USER_GUIDE.txt so the external guide matches the in-app English documentation.`,`Improved dashboard banner text contrast with a dedicated readable overlay treatment across dark and light themes.`]},{version:`2026.06.22.1`,date:`2026-06-22`,title:`English in-app guide`,type:`Guide`,changes:[`Added a Guide tab to the sidebar and command search.`,`Documented when to use each GRIMOIRE tab, safe workflow habits, and common support steps.`,`Refreshed the desktop build with the new guide route and updated build version.`]},{version:`2026.06.22.1`,date:`2026-06-22`,title:`Large-folder Packshot Browser`,type:`Packshot Browser`,changes:[`Packshot Browser now indexes folder metadata first instead of sending every image to the UI at once.`,`The left panel prioritizes the real folder tree with image counts; the gallery loads only the selected folder.`,`Thumbnails load progressively with a limited queue so very large OneDrive and local folders stay responsive.`]},{version:`2026.06.22.0`,date:`2026-06-22`,title:`Persistent Image Edit presets and output history`,type:`Image Edit`,changes:[`Custom Image Edit dimension presets can now be saved and reused after reopening the app.`,`Preview and completed job outputs now stay visible in the Outputs panel instead of replacing the previous result.`,`Local folder output now writes each Image Edit folder job into a timestamped run folder to avoid overwriting older output.`]},{version:`2026.06.19.0`,date:`2026-06-19`,title:`Packshot Browser tab`,type:`Packshot Browser`,changes:[`Added a dedicated Packshot Browser tab for scanning synced folders without requiring Excel input.`,`Images can be searched by EAN, folder, filename, and product keywords with hover previews and detailed file metadata.`,`Selected images can be copied to an output folder with folder preservation or EAN grouping plus a CSV report.`]},{version:`2026.06.18.2`,date:`2026-06-18`,title:`Faster Images Check browsing`,type:`Images Check`,changes:[`Image tiles now load cached thumbnails instead of full-size product images.`,`Hover previews no longer rerender continuously while the cursor moves.`,`Folder sections use browser render containment to keep large scans smoother.`]},{version:`2026.06.18.1`,date:`2026-06-18`,title:`Folder-aware Images Check gallery`,type:`Images Check + Interface`,changes:[`Images Check now groups scanned images by source folder and subfolder so review decisions stay tied to the exact file location.`,`Gallery view now uses horizontal folder lanes with per-image Keep and Delete actions.`,`Command start screen typography is more compact and removes the duplicated GRIMOIRE title effect.`]},{version:`2026.06.18.0`,date:`2026-06-18`,title:`Images Check, quick search, and fullscreen fit`,type:`Interface + Desktop`,changes:[`Added Images Check with recursive folder scanning, slideshow/gallery review modes, image hover details, and confirmed permanent deletion.`,`Startup fallback now opens a GRIMOIRE command search screen with build information and rotating app tips.`,`Top search can jump to tools and reveal matching output files from EAN Sorter, EAN Renamer, and Images Check.`,`Desktop window sizing now uses the full screen work area when maximized.`]},{version:`2026.06.16.8`,date:`2026-06-16`,title:`DPI-aware window sizing and scroll safety`,type:`Desktop + Interface`,changes:[`Desktop window now clamps itself to the active screen work area for 125% and 150% display scaling.`,`Main app content now scrolls inside the viewport so tool panels and actions are not clipped.`,`Topbar spacing becomes more compact on narrow or scaled screens.`]},{version:`2026.06.16.7`,date:`2026-06-16`,title:`Status folder jobs, master data cache, and image output structure`,type:`EAN Sorter + Data QC + Image Edit`,changes:[`EAN Sorter status folder creation now runs as a background job with progress polling.`,`Master Data reads are cached by file timestamp and size to reduce repeated Excel parsing.`,`Image Edit no longer creates one output folder per root-level image filename EAN.`]},{version:`2026.06.16.6`,date:`2026-06-16`,title:`Duplicate group numbering and backend stability`,type:`EAN Renamer + Desktop`,changes:[`Duplicate column now supports multiple groups per category.`,`Prefixed naming keeps JPG/PNG variants in the same duplicate group on the same number.`,`Desktop host now monitors the backend and refreshes the API port after automatic restart.`]},{version:`2026.06.16.5`,date:`2026-06-16`,title:`Credits tab`,type:`Interface`,changes:[`Added a dedicated Credits tab in the main sidebar.`,`Credits page lists MDX Team ownership and contributor roles.`,`Keyboard navigation now supports Ctrl+6 for Credits.`]},{version:`2026.06.16.4`,date:`2026-06-16`,title:`Master Data tab & Status folder creation`,type:`Data QC + EAN Sorter`,changes:[`New Master Data tab: upload DQC report + master data, select brand, generate Missing_Data and Status files.`,`EAN Sorter Categorize: upload status file to create product folders organized by status with EAN subfolders.`,`Prefixed naming now uses full category names (Pack_shot, Human, etc.) with per-category numbering.`]},{version:`2026.06.16.2`,date:`2026-06-16`,title:`EAN Renamer output isolation`,type:`EAN Renamer`,changes:[`Lifestyle/Human and Lifestyle/Normal copy outputs now create an EAN subfolder.`,`Packshot and Artwork continue to output into category/EAN folders.`,`Desktop startup now avoids reusing old backend processes.`]},{version:`2026.06.16.1`,date:`2026-06-16`,title:`Prefixed naming and duplicate first-shot handling`,type:`EAN Renamer`,changes:[`Prefixed mode supports duplicate JPG/PNG variants sharing the same first-shot number.`,`Product Name only uses EAN_ProductName naming when the checkbox is enabled.`,`Custom EAN works with both Prefixed and EAN_ProductName naming flows.`]},{version:`2026.06.16.0`,date:`2026-06-16`,title:`Portability and support scripts`,type:`System`,changes:[`Removed machine-specific path assumptions from desktop and startup scripts.`,`Added setup, repair, and diagnostic scripts for testers on other Windows machines.`,`Added installation, user, and SOP documentation files.`]},{version:`2026.06.15`,date:`2026-06-15`,title:`Unified GRIMOIRE desktop toolkit`,type:`Platform`,changes:[`Integrated Data QC, Image Edit, EAN Sorter, and EAN Renamer into one desktop shell.`,`Added WebView2 desktop wrapper with local backend bridge.`,`Added initial dashboard, navigation, and shared UI structure.`]}];function Ya(){let e=$e(),{notify:t}=Hn(),[n,r]=(0,_.useState)(()=>Math.floor(Math.random()*qa.length)),i=(0,_.useRef)(null),a=(0,_.useCallback)(()=>{i.current&&clearInterval(i.current),i.current=setInterval(()=>{r(e=>(e+1)%qa.length)},6e3)},[]);(0,_.useEffect)(()=>(t(`Welcome to GRIMOIRE`,{type:`info`,message:`All systems operational`,browser:!1}),a(),()=>{i.current&&clearInterval(i.current)}),[]);let o=e=>{r(e),a()},s=qa[n],c=Ja[0];return(0,W.jsxs)(`div`,{className:`view`,children:[(0,W.jsxs)(`div`,{className:`hero changelog-hero`,children:[(0,W.jsxs)(`div`,{className:`hero-visual changelog-visual`,style:{position:`relative`,overflow:`hidden`},children:[qa.map((e,t)=>(0,W.jsx)(`div`,{style:{position:`absolute`,inset:0,backgroundImage:`url(${e.img})`,backgroundSize:`cover`,backgroundPosition:`center`,opacity:+(t===n),transition:`opacity 0.8s ease`}},e.to)),(0,W.jsx)(`div`,{style:{position:`absolute`,inset:0,background:`linear-gradient(135deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 60%, rgba(0,0,0,0.3) 100%)`}}),(0,W.jsxs)(`div`,{className:`hero-content dashboard-banner-copy`,style:{position:`relative`,zIndex:2},children:[(0,W.jsx)(`h1`,{children:s.title}),(0,W.jsx)(`p`,{children:s.desc}),(0,W.jsxs)(`button`,{className:`hero-btn`,style:{marginTop:14},onClick:()=>e(s.to),children:[s.btn,` `,(0,W.jsx)(Ta,{})]}),(0,W.jsx)(`div`,{style:{display:`flex`,gap:8,marginTop:16},children:qa.map((e,t)=>(0,W.jsx)(`button`,{onClick:()=>o(t),style:{width:t===n?28:10,height:10,borderRadius:5,border:`none`,background:t===n?`#fff`:`rgba(255,255,255,0.4)`,cursor:`pointer`,transition:`all 0.3s ease`,padding:0}},t))})]})]}),(0,W.jsxs)(`div`,{className:`hero-info changelog-summary`,children:[(0,W.jsx)(`h3`,{children:`Latest Update`}),(0,W.jsx)(`span`,{className:`changelog-type`,style:{marginBottom:6,display:`inline-block`},children:c.type}),(0,W.jsx)(`h4`,{style:{margin:`4px 0 8px`,fontSize:`1rem`},children:c.title}),(0,W.jsx)(`ul`,{style:{margin:0,paddingLeft:18,fontSize:`0.85rem`,opacity:.85,lineHeight:1.6},children:c.changes.map(e=>(0,W.jsx)(`li`,{children:e},e))}),(0,W.jsxs)(`div`,{style:{fontSize:`0.78rem`,opacity:.5,marginTop:10},children:[`v`,c.version,` · `,c.date]})]})]}),(0,W.jsx)(`div`,{className:`section-header`,children:(0,W.jsx)(`h2`,{children:`Features`})}),(0,W.jsx)(`div`,{className:`card-grid`,children:Ga.map(e=>(0,W.jsxs)(vn,{to:e.to,className:`feature-card`,children:[(0,W.jsx)(`div`,{className:`feature-card-cover`,children:(0,W.jsx)(`div`,{className:`feature-card-gradient`,style:{background:e.gradient},children:(0,W.jsx)(`img`,{src:e.img,alt:e.title,className:`feature-card-icon-img${e.mono?` icon-mono`:``}`})})}),(0,W.jsxs)(`div`,{className:`feature-card-body`,children:[(0,W.jsx)(`h3`,{children:e.title}),(0,W.jsx)(`p`,{children:e.desc}),(0,W.jsxs)(`div`,{className:`feature-card-status`,children:[(0,W.jsx)(`span`,{className:`dot`}),`Ready`]})]})]},e.to))}),(0,W.jsx)(`div`,{className:`section-header`,children:(0,W.jsx)(`h2`,{children:`Quick Actions`})}),(0,W.jsx)(`div`,{className:`quick-actions`,children:Ka.map(e=>(0,W.jsxs)(vn,{to:e.to,className:`quick-action`,children:[(0,W.jsx)(`div`,{className:`quick-action-icon`,style:{background:e.bg},children:(0,W.jsx)(e.icon,{})}),(0,W.jsxs)(`div`,{className:`quick-action-text`,children:[(0,W.jsx)(`h4`,{children:e.title}),(0,W.jsx)(`p`,{children:e.desc})]})]},e.title))}),(0,W.jsx)(`div`,{className:`section-header`,children:(0,W.jsx)(`h2`,{children:`Release Notes`})}),(0,W.jsx)(`div`,{className:`changelog-list`,children:Ja.map(e=>(0,W.jsxs)(`article`,{className:`changelog-entry`,children:[(0,W.jsxs)(`div`,{className:`changelog-entry-head`,children:[(0,W.jsxs)(`div`,{children:[(0,W.jsx)(`span`,{className:`changelog-type`,children:e.type}),(0,W.jsx)(`h3`,{children:e.title})]}),(0,W.jsxs)(`div`,{className:`changelog-meta`,children:[(0,W.jsx)(`strong`,{children:e.version}),(0,W.jsx)(`span`,{children:e.date})]})]}),(0,W.jsx)(`ul`,{children:e.changes.map(e=>(0,W.jsx)(`li`,{children:e},e))})]},e.version))})]})}var Xa=[[`Data QC`,`Audit master data files, find missing data, rule issues, duplicates, and export review reports.`],[`Image Edit`,`Batch process product images: resize, canvas, background cleanup, upscale, naming, and export.`],[`Images Check`,`Review image folders visually, mark bad images, and delete only after confirmation.`],[`Packshot Browser`,`Search synced packshot folders by EAN, filename, folder, or keyword, then copy selected files.`],[`EAN Sorter`,`Scan images for barcodes or EANs and sort files into EAN/status folders.`],[`EAN Renamer`,`Copy or rename product images by EAN, category, product name, duplicate groups, and naming mode.`],[`Translation`,`Plan document translation workflows, check engine readiness, and choose the right pipeline for each file type.`]],Za=[{title:`Data QC`,purpose:`Use Data QC when the source is a master data Excel or CSV file and the goal is to find data quality issues before the file moves to the next workflow.`,features:[`Upload or select master data files.`,`Audit required fields, missing values, invalid formats, duplicates, and configured rule checks.`,`Generate Excel reports for review, correction, and team handoff.`,`Use rule profile settings when the validation scope needs to match the current business rules.`],steps:[`Open Data QC.`,`Select the master data file.`,`Choose audit options if the tab exposes them for the current workflow.`,`Run the audit and wait for the job to finish.`,`Review the summary and exported report.`,`Fix the source data, then run the audit again if needed.`],cases:[`Use it before sending master data to operations, marketplace upload, or another system.`,`Use it when product records are rejected because fields are missing or inconsistent.`,`Use it when a team needs a report showing what must be corrected.`],notes:[`If the file cannot be read, check sheet names, header rows, merged cells, and whether the file is actually an exported report instead of the original master data.`,`Keep the original input file separate from the generated report.`]},{title:`Image Edit`,purpose:`Use Image Edit when images need batch processing for marketplace or catalog output.`,features:[`Add individual image files or process an input folder.`,`Use built-in dimension presets or save custom dimension presets for later sessions.`,`Control width, height, aspect lock, fit mode, margins, DPI, canvas background, and layout preset.`,`Use image filters such as whitespace removal, product fill, safe padding, white background checks, shadow removal, and background removal.`,`Use standard upscale or Real-ESRGAN when local AI tools are available.`,`Choose output format, quality, max file size, naming rule, and local or ZIP output.`,`Keep recent previews and completed job outputs in the Outputs panel instead of replacing the previous result.`],steps:[`Open Image Edit.`,`Choose files with Add, or select an input folder.`,`Pick a dimension preset or enter Width and Height manually.`,`Click Save next to Dimension Preset if this size should be reused later.`,`Choose layout, canvas, upscale, filter, output, and naming settings.`,`Run Preview (First 1) to validate the output on one image.`,`Adjust settings if needed, then click Start Processing.`,`Use the Outputs panel to switch between recent previews and completed jobs, then download the selected job.`],cases:[`Use it to make all product images 1000 x 1000, 1500 x 1500, Amazon main image size, or a saved customer-specific preset.`,`Use it when images have too much whitespace around the product.`,`Use it when the same input batch must be exported as JPG, PNG, WEBP, or TIFF with consistent naming.`,`Use local folder output when the processed files should remain directly accessible in a folder; each run creates a separate timestamped output folder.`],notes:[`Large images and AI upscale can take more RAM and processing time.`,`Always preview before a large batch when changing canvas, background, or upscale settings.`,`Do not put the output folder inside the input folder.`]},{title:`Images Check`,purpose:`Use Images Check when the task is visual review and cleanup of a folder tree.`,features:[`Scan every supported image in a selected folder.`,`Review images in slideshow or gallery mode.`,`Filter by image name, folder, or path.`,`Mark images for deletion without deleting immediately.`,`Save deletion only after confirming the selected rejected files.`],steps:[`Open Images Check.`,`Choose the folder that contains the images to review.`,`Click Scan all.`,`Use slideshow mode for focused review or gallery mode for faster comparison.`,`Mark bad images for deletion.`,`Check the Delete count, then click Save deletion when ready.`],cases:[`Use it when a packshot folder contains blurry, duplicated, wrong, or irrelevant images.`,`Use it before Image Edit if the batch should be cleaned first.`,`Use it after Image Edit if the output folder needs manual visual QA.`],notes:[`Deletion is permanent after confirmation.`,`If you only need to find and copy good packshots, Packshot Browser is usually safer than deleting files.`]},{title:`Packshot Browser`,purpose:`Use Packshot Browser when the task is finding, previewing, selecting, and copying existing packshot files.`,features:[`Index local or synced folder structures without requiring an Excel file.`,`Browse the real folder tree first, then load only the selected folder gallery.`,`Search inside the selected folder by EAN, filename, folder, extension, and product keywords.`,`Load images page by page so very large libraries stay responsive.`,`Load thumbnails progressively through a limited queue instead of requesting everything at once.`,`Hover thumbnails for larger preview and file metadata.`,`Select files and copy them to an output folder.`,`Export a CSV report of copied or selected files.`,`Handle OneDrive cloud-only files carefully by using cached or SharePoint online thumbnails when possible.`],steps:[`Open Packshot Browser.`,`Choose the source packshot folder.`,`Click Scan to build the folder index.`,`Choose the folder to inspect from the left panel.`,`Use search inside the selected folder if needed.`,`Click Load more thumbnails when the folder has more results.`,`Hover a thumbnail to inspect it.`,`Select the files to collect.`,`Choose an output folder.`,`Click Copy selected and review the generated report.`],cases:[`Use it when someone asks for all packshots for one EAN or product group.`,`Use it to collect images from a OneDrive-synced library without accidentally downloading every file.`,`Use it when the source folder must stay unchanged.`],notes:[`Cloud-only OneDrive files may show placeholders if Windows has no cached thumbnail and SharePoint online preview is unavailable.`,`Copy selected may trigger OneDrive to download the original selected files.`,`Keep output outside the source folder.`]},{title:`EAN Sorter`,purpose:`Use EAN Sorter when files need to be grouped by detected barcode or EAN.`,features:[`Scan image folders for barcode or EAN information.`,`Preview detected results before applying sort actions.`,`Group files by detected EAN or status.`,`Create reports that help review successful, missing, or uncertain detections.`,`Use the built-in Guide button in the tab for sorter-specific details.`],steps:[`Open EAN Sorter.`,`Choose the source folder.`,`Run the scan.`,`Review detected EANs, missing values, and uncertain items.`,`Apply the sort/copy workflow only after reviewing the preview.`,`Open the generated report if the team needs verification evidence.`],cases:[`Use it when images arrive unsorted and folder names must be based on EAN.`,`Use it when barcode visibility is good enough for detection.`,`Use it to separate detected and undetected files for manual follow-up.`],notes:[`Blurry, cropped, tiny, rotated, or partially hidden barcodes can reduce detection accuracy.`,`Review results before applying folder changes.`]},{title:`EAN Renamer`,purpose:`Use EAN Renamer when selected images need structured category folders and predictable filenames.`,features:[`Scan a source folder and place images into workflow columns.`,`Classify images into Packshot, Human, Normal Lifestyle, Artwork, and Duplicate groups.`,`Use folder-derived EANs or a Custom EAN.`,`Choose Copy mode or in-folder Rename mode.`,`Choose naming modes: per-category, continuous, prefixed, or EAN_ProductName behavior.`,`Set output folders per category.`,`Preview output names and conflicts before applying.`,`Undo recent operations when log data is available.`],steps:[`Open EAN Renamer.`,`Pick the source folder.`,`Drag images into the correct category columns.`,`Set output folders if using Copy mode.`,`Choose output mode and naming mode in settings.`,`Enter Custom EAN or Product Name only when the current workflow requires it.`,`Use 1st markers when specific images should become the first image in a category.`,`Click Preview and review every output path and status.`,`Apply Copy or Rename only after the preview is correct.`],cases:[`Use Copy mode when testing a new naming rule or protecting original files.`,`Use in-folder Rename only when the source folder is trusted and backed up.`,`Use Duplicate groups when multiple files represent the same shot, such as JPG and PNG versions.`,`Use Product Name naming only when filenames must include a specific product name.`],notes:[`Filename conflicts must be fixed before apply.`,`Undo depends on the operation log and may not work if files are manually moved or deleted after applying.`,`Preview is the most important step in this tab.`]},{title:`Translation`,purpose:`Use Translation when files need to be translated while keeping structure, terminology, and file-type rules under control.`,features:[`Check readiness for DocuTranslate, Ollama/local models, MinerU, and configured API providers.`,`Create a file-type plan for Office documents, academic PDFs, subtitles, JSON, or local draft translation.`,`Use DocuTranslate as the recommended core pipeline and keep GPL-3.0 projects as internal references unless intentionally isolated.`,`Plan glossary-first translation and structure QA before enabling full execution.`],steps:[`Open Translation.`,`Enter or choose the source file or source folder.`,`Choose the output folder if the translated files should be written to a specific location.`,`Select source language, target language, profile, and layout/glossary options.`,`Click Create Plan to see the exact pipeline for the current file type.`,`Install or configure the missing provider shown in Engine Readiness before enabling Run Translation.`],cases:[`Use PDF Academic for papers, manuals, tables, formulas, and code-heavy PDFs.`,`Use Office / Markup for DOCX, XLSX, PPTX, HTML, or XML where formatting matters.`,`Use Subtitle for SRT or ASS files so timestamps stay unchanged.`,`Use JSON when only selected values should be translated while keys and IDs remain untouched.`],notes:[`PDF-to-Markdown workflows are good for readable translation, but strict visual PDF fidelity needs a later layout-preserving exporter.`,`For internal use, GPL-3.0 references are acceptable, but keep a license map if the tool may ever be distributed outside the company.`]},{title:`Settings, Repair, and Diagnostics`,purpose:`Use the Settings and support scripts when the app behavior, theme, backend, or environment needs adjustment.`,features:[`Settings controls app-level preferences exposed by the current build.`,`REPAIR_GRIMOIRE.bat is the first recovery step for broken dependencies or startup issues.`,`DIAGNOSE_GRIMOIRE.bat creates diagnostic output for support.`,`START_DESKTOP.bat starts the desktop experience; START_GRIMOIRE.bat can be used for browser/dev mode.`],steps:[`If a tab behaves unexpectedly, close and reopen the app first.`,`Run REPAIR_GRIMOIRE.bat if the backend or dependencies fail.`,`Run DIAGNOSE_GRIMOIRE.bat if repair does not solve the issue.`,`Send the diagnostics folder to support with a short description of the workflow that failed.`],cases:[`Use repair after moving the project folder, updating dependencies, or seeing backend startup errors.`,`Use diagnostics when a bug needs to be reproduced or escalated.`],notes:[`Do not delete backend storage or logs unless support asks for it.`,`Keep source files and output folders separate during troubleshooting.`]}];function Qa(){return(0,W.jsxs)(`div`,{className:`view guide-view`,children:[(0,W.jsx)(`section`,{className:`guide-hero`,children:(0,W.jsxs)(`div`,{children:[(0,W.jsx)(`div`,{className:`credits-kicker`,children:`Guide`}),(0,W.jsx)(`h1`,{children:`GRIMOIRE User Guide`}),(0,W.jsx)(`p`,{children:`Use this guide to choose the right tab, understand each feature, follow safe workflows, and handle common product data or image cases.`})]})}),(0,W.jsxs)(`section`,{className:`guide-panel guide-overview`,children:[(0,W.jsx)(`h2`,{children:`Quick Tab Selection`}),(0,W.jsx)(`div`,{className:`guide-list`,children:Xa.map(([e,t])=>(0,W.jsxs)(`article`,{className:`guide-item`,children:[(0,W.jsx)(`strong`,{children:e}),(0,W.jsx)(`p`,{children:t})]},e))})]}),(0,W.jsx)(`div`,{className:`guide-tab-stack`,children:Za.map(e=>(0,W.jsxs)(`section`,{className:`guide-tab-panel`,children:[(0,W.jsxs)(`div`,{className:`guide-tab-head`,children:[(0,W.jsx)(`h2`,{children:e.title}),(0,W.jsx)(`p`,{children:e.purpose})]}),(0,W.jsxs)(`div`,{className:`guide-columns`,children:[(0,W.jsxs)(`div`,{children:[(0,W.jsx)(`h3`,{children:`Key Features`}),(0,W.jsx)(`ul`,{children:e.features.map(e=>(0,W.jsx)(`li`,{children:e},e))})]}),(0,W.jsxs)(`div`,{children:[(0,W.jsx)(`h3`,{children:`How To Use`}),(0,W.jsx)(`ol`,{children:e.steps.map(e=>(0,W.jsx)(`li`,{children:e},e))})]}),(0,W.jsxs)(`div`,{children:[(0,W.jsx)(`h3`,{children:`Common Cases`}),(0,W.jsx)(`ul`,{children:e.cases.map(e=>(0,W.jsx)(`li`,{children:e},e))})]}),(0,W.jsxs)(`div`,{children:[(0,W.jsx)(`h3`,{children:`Notes`}),(0,W.jsx)(`ul`,{children:e.notes.map(e=>(0,W.jsx)(`li`,{children:e},e))})]})]})]},e.title))})]})}var $a=[{role:`Building & Planning`,name:`Damien`},{role:`Idea & Planning`,name:`Tomasz`},{role:`Tester`,name:`Tyson`}];function eo(){return(0,W.jsx)(`div`,{className:`view credits-view`,children:(0,W.jsxs)(`section`,{className:`credits-panel`,"aria-label":`GRIMOIRE credits`,children:[(0,W.jsx)(`div`,{className:`credits-kicker`,children:`Credits`}),(0,W.jsx)(`h1`,{children:`MDX Team`}),(0,W.jsx)(`p`,{className:`credits-owner`,children:`Credits belong to MDX Team.`}),(0,W.jsx)(`div`,{className:`credits-list`,children:$a.map(e=>(0,W.jsxs)(`div`,{className:`credit-row`,children:[(0,W.jsx)(`span`,{className:`credit-role`,children:e.role}),(0,W.jsx)(`strong`,{className:`credit-name`,children:e.name})]},e.role))})]})})}function to(){let e=$e(),[t,n]=(0,_.useState)(``),[r,i]=(0,_.useState)(()=>Math.floor(Math.random()*za.length)),a=(0,_.useMemo)(()=>t.trim()?Ra.filter(e=>Ba(e,t)):[],[t]);return(0,_.useEffect)(()=>{let e=window.setInterval(()=>{i(e=>(e+1)%za.length)},6500);return()=>window.clearInterval(e)},[]),(0,W.jsxs)(`div`,{className:`command-home`,children:[(0,W.jsx)(`div`,{className:`command-stars`,"aria-hidden":`true`,children:`✦`}),(0,W.jsx)(`div`,{className:`command-brand`,children:(0,W.jsx)(`span`,{children:`GRIMOIRE`})}),(0,W.jsxs)(`div`,{className:`command-box`,children:[(0,W.jsx)(`input`,{autoFocus:!0,value:t,onChange:e=>n(e.target.value),onKeyDown:t=>{t.key===`Enter`&&a[0]&&e(a[0].to)},placeholder:`Type a tool, workflow, EAN, image, audit...`}),(0,W.jsxs)(`div`,{className:`command-build`,children:[(0,W.jsx)(`strong`,{children:`Build`}),(0,W.jsx)(`span`,{children:La})]})]}),t.trim()&&(0,W.jsx)(`div`,{className:`command-home-results`,children:a.length?a.map(t=>(0,W.jsxs)(`button`,{onClick:()=>e(t.to),children:[(0,W.jsx)(`strong`,{children:t.title}),(0,W.jsx)(`span`,{children:t.desc}),(0,W.jsx)(`em`,{children:t.keywords.join(` · `)})]},t.to)):(0,W.jsx)(`div`,{className:`command-home-empty`,children:`No tab matches that keyword.`})}),(0,W.jsxs)(`div`,{className:`command-tip`,children:[(0,W.jsx)(`strong`,{children:`Tip`}),(0,W.jsx)(`span`,{children:za[r]})]})]})}function no(){let e=$e(),[t,n]=(0,_.useState)(()=>localStorage.getItem(`grimoire-sidebar`)===`collapsed`),[r,i]=(0,_.useState)(!1);return(0,_.useEffect)(()=>{localStorage.setItem(`grimoire-sidebar`,t?`collapsed`:`expanded`)},[t]),(0,_.useEffect)(()=>{let t=t=>{if(t.ctrlKey&&!t.shiftKey&&!t.altKey){let n=Object.entries(ja).find(([,e])=>e===t.key)?.[0];n&&(t.preventDefault(),e(n))}};return window.addEventListener(`keydown`,t),()=>window.removeEventListener(`keydown`,t)},[e]),(0,W.jsxs)(`div`,{className:`app-layout ${t?`sidebar-collapsed`:``}`,children:[(0,W.jsx)(Na,{collapsed:t,onToggle:()=>n(!t),onOpenSettings:()=>i(!0)}),(0,W.jsx)(Wa,{collapsed:t}),(0,W.jsx)(`main`,{className:`main-content`,children:(0,W.jsxs)(Et,{children:[(0,W.jsx)(wt,{path:`/`,element:(0,W.jsx)(Ya,{})}),(0,W.jsx)(wt,{path:`/data-qc`,element:(0,W.jsx)(Er,{})}),(0,W.jsx)(wt,{path:`/image-edit`,element:(0,W.jsx)(ci,{})}),(0,W.jsx)(wt,{path:`/images-check`,element:(0,W.jsx)(mi,{})}),(0,W.jsx)(wt,{path:`/packshot-browser`,element:(0,W.jsx)(Di,{})}),(0,W.jsx)(wt,{path:`/ean-sorter`,element:(0,W.jsx)(ki,{})}),(0,W.jsx)(wt,{path:`/ean-renamer`,element:(0,W.jsx)(Ui,{})}),(0,W.jsx)(wt,{path:`/translation`,element:(0,W.jsx)(na,{})}),(0,W.jsx)(wt,{path:`/guide`,element:(0,W.jsx)(Qa,{})}),(0,W.jsx)(wt,{path:`/credits`,element:(0,W.jsx)(eo,{})}),(0,W.jsx)(wt,{path:`*`,element:(0,W.jsx)(to,{})})]})}),(0,W.jsx)(Un,{open:r,onClose:()=>i(!1)})]})}function ro(){return(0,W.jsx)(Ln,{children:(0,W.jsx)(Vn,{children:(0,W.jsx)(mn,{children:(0,W.jsx)(no,{})})})})}(0,v.createRoot)(document.getElementById(`root`)).render((0,W.jsx)(_.StrictMode,{children:(0,W.jsx)(ro,{})}));