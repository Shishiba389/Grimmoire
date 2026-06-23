var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,a)=>(a=n==null?{}:e(i(n)),s(r||!n||!n.__esModule?t(a,`default`,{value:n,enumerable:!0}):a,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var l=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.portal`),r=Symbol.for(`react.fragment`),i=Symbol.for(`react.strict_mode`),a=Symbol.for(`react.profiler`),o=Symbol.for(`react.consumer`),s=Symbol.for(`react.context`),c=Symbol.for(`react.forward_ref`),l=Symbol.for(`react.suspense`),u=Symbol.for(`react.memo`),d=Symbol.for(`react.lazy`),f=Symbol.for(`react.activity`),p=Symbol.iterator;function m(e){return typeof e!=`object`||!e?null:(e=p&&e[p]||e[`@@iterator`],typeof e==`function`?e:null)}var h={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},g=Object.assign,_={};function v(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}v.prototype.isReactComponent={},v.prototype.setState=function(e,t){if(typeof e!=`object`&&typeof e!=`function`&&e!=null)throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);this.updater.enqueueSetState(this,e,t,`setState`)},v.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,`forceUpdate`)};function y(){}y.prototype=v.prototype;function b(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}var x=b.prototype=new y;x.constructor=b,g(x,v.prototype),x.isPureReactComponent=!0;var S=Array.isArray;function C(){}var w={H:null,A:null,T:null,S:null},ee=Object.prototype.hasOwnProperty;function T(e,n,r){var i=r.ref;return{$$typeof:t,type:e,key:n,ref:i===void 0?null:i,props:r}}function E(e,t){return T(e.type,t,e.props)}function D(e){return typeof e==`object`&&!!e&&e.$$typeof===t}function te(e){var t={"=":`=0`,":":`=2`};return`$`+e.replace(/[=:]/g,function(e){return t[e]})}var O=/\/+/g;function ne(e,t){return typeof e==`object`&&e&&e.key!=null?te(``+e.key):t.toString(36)}function k(e){switch(e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason;default:switch(typeof e.status==`string`?e.then(C,C):(e.status=`pending`,e.then(function(t){e.status===`pending`&&(e.status=`fulfilled`,e.value=t)},function(t){e.status===`pending`&&(e.status=`rejected`,e.reason=t)})),e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason}}throw e}function re(e,r,i,a,o){var s=typeof e;(s===`undefined`||s===`boolean`)&&(e=null);var c=!1;if(e===null)c=!0;else switch(s){case`bigint`:case`string`:case`number`:c=!0;break;case`object`:switch(e.$$typeof){case t:case n:c=!0;break;case d:return c=e._init,re(c(e._payload),r,i,a,o)}}if(c)return o=o(e),c=a===``?`.`+ne(e,0):a,S(o)?(i=``,c!=null&&(i=c.replace(O,`$&/`)+`/`),re(o,r,i,``,function(e){return e})):o!=null&&(D(o)&&(o=E(o,i+(o.key==null||e&&e.key===o.key?``:(``+o.key).replace(O,`$&/`)+`/`)+c)),r.push(o)),1;c=0;var l=a===``?`.`:a+`:`;if(S(e))for(var u=0;u<e.length;u++)a=e[u],s=l+ne(a,u),c+=re(a,r,i,s,o);else if(u=m(e),typeof u==`function`)for(e=u.call(e),u=0;!(a=e.next()).done;)a=a.value,s=l+ne(a,u++),c+=re(a,r,i,s,o);else if(s===`object`){if(typeof e.then==`function`)return re(k(e),r,i,a,o);throw r=String(e),Error(`Objects are not valid as a React child (found: `+(r===`[object Object]`?`object with keys {`+Object.keys(e).join(`, `)+`}`:r)+`). If you meant to render a collection of children, use an array instead.`)}return c}function ie(e,t,n){if(e==null)return e;var r=[],i=0;return re(e,r,``,``,function(e){return t.call(n,e,i++)}),r}function ae(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t)},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var A=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},j={map:ie,forEach:function(e,t,n){ie(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return ie(e,function(){t++}),t},toArray:function(e){return ie(e,function(e){return e})||[]},only:function(e){if(!D(e))throw Error(`React.Children.only expected to receive a single React element child.`);return e}};e.Activity=f,e.Children=j,e.Component=v,e.Fragment=r,e.Profiler=a,e.PureComponent=b,e.StrictMode=i,e.Suspense=l,e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=w,e.__COMPILER_RUNTIME={__proto__:null,c:function(e){return w.H.useMemoCache(e)}},e.cache=function(e){return function(){return e.apply(null,arguments)}},e.cacheSignal=function(){return null},e.cloneElement=function(e,t,n){if(e==null)throw Error(`The argument must be a React element, but you passed `+e+`.`);var r=g({},e.props),i=e.key;if(t!=null)for(a in t.key!==void 0&&(i=``+t.key),t)!ee.call(t,a)||a===`key`||a===`__self`||a===`__source`||a===`ref`&&t.ref===void 0||(r[a]=t[a]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var o=Array(a),s=0;s<a;s++)o[s]=arguments[s+2];r.children=o}return T(e.type,i,r)},e.createContext=function(e){return e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:o,_context:e},e},e.createElement=function(e,t,n){var r,i={},a=null;if(t!=null)for(r in t.key!==void 0&&(a=``+t.key),t)ee.call(t,r)&&r!==`key`&&r!==`__self`&&r!==`__source`&&(i[r]=t[r]);var o=arguments.length-2;if(o===1)i.children=n;else if(1<o){for(var s=Array(o),c=0;c<o;c++)s[c]=arguments[c+2];i.children=s}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)i[r]===void 0&&(i[r]=o[r]);return T(e,a,i)},e.createRef=function(){return{current:null}},e.forwardRef=function(e){return{$$typeof:c,render:e}},e.isValidElement=D,e.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:ae}},e.memo=function(e,t){return{$$typeof:u,type:e,compare:t===void 0?null:t}},e.startTransition=function(e){var t=w.T,n={};w.T=n;try{var r=e(),i=w.S;i!==null&&i(n,r),typeof r==`object`&&r&&typeof r.then==`function`&&r.then(C,A)}catch(e){A(e)}finally{t!==null&&n.types!==null&&(t.types=n.types),w.T=t}},e.unstable_useCacheRefresh=function(){return w.H.useCacheRefresh()},e.use=function(e){return w.H.use(e)},e.useActionState=function(e,t,n){return w.H.useActionState(e,t,n)},e.useCallback=function(e,t){return w.H.useCallback(e,t)},e.useContext=function(e){return w.H.useContext(e)},e.useDebugValue=function(){},e.useDeferredValue=function(e,t){return w.H.useDeferredValue(e,t)},e.useEffect=function(e,t){return w.H.useEffect(e,t)},e.useEffectEvent=function(e){return w.H.useEffectEvent(e)},e.useId=function(){return w.H.useId()},e.useImperativeHandle=function(e,t,n){return w.H.useImperativeHandle(e,t,n)},e.useInsertionEffect=function(e,t){return w.H.useInsertionEffect(e,t)},e.useLayoutEffect=function(e,t){return w.H.useLayoutEffect(e,t)},e.useMemo=function(e,t){return w.H.useMemo(e,t)},e.useOptimistic=function(e,t){return w.H.useOptimistic(e,t)},e.useReducer=function(e,t,n){return w.H.useReducer(e,t,n)},e.useRef=function(e){return w.H.useRef(e)},e.useState=function(e){return w.H.useState(e)},e.useSyncExternalStore=function(e,t,n){return w.H.useSyncExternalStore(e,t,n)},e.useTransition=function(){return w.H.useTransition()},e.version=`19.2.7`})),u=o(((e,t)=>{t.exports=l()})),d=o((e=>{function t(e,t){var n=e.length;e.push(t);a:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<i(a,t))e[r]=t,e[n]=a,n=r;else break a}}function n(e){return e.length===0?null:e[0]}function r(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;a:for(var r=0,a=e.length,o=a>>>1;r<o;){var s=2*(r+1)-1,c=e[s],l=s+1,u=e[l];if(0>i(c,n))l<a&&0>i(u,c)?(e[r]=u,e[l]=n,r=l):(e[r]=c,e[s]=n,r=s);else if(l<a&&0>i(u,n))e[r]=u,e[l]=n,r=l;else break a}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return n===0?e.id-t.id:n}if(e.unstable_now=void 0,typeof performance==`object`&&typeof performance.now==`function`){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var c=[],l=[],u=1,d=null,f=3,p=!1,m=!1,h=!1,g=!1,_=typeof setTimeout==`function`?setTimeout:null,v=typeof clearTimeout==`function`?clearTimeout:null,y=typeof setImmediate<`u`?setImmediate:null;function b(e){for(var i=n(l);i!==null;){if(i.callback===null)r(l);else if(i.startTime<=e)r(l),i.sortIndex=i.expirationTime,t(c,i);else break;i=n(l)}}function x(e){if(h=!1,b(e),!m)if(n(c)!==null)m=!0,S||(S=!0,D());else{var t=n(l);t!==null&&ne(x,t.startTime-e)}}var S=!1,C=-1,w=5,ee=-1;function T(){return g?!0:!(e.unstable_now()-ee<w)}function E(){if(g=!1,S){var t=e.unstable_now();ee=t;var i=!0;try{a:{m=!1,h&&(h=!1,v(C),C=-1),p=!0;var a=f;try{b:{for(b(t),d=n(c);d!==null&&!(d.expirationTime>t&&T());){var o=d.callback;if(typeof o==`function`){d.callback=null,f=d.priorityLevel;var s=o(d.expirationTime<=t);if(t=e.unstable_now(),typeof s==`function`){d.callback=s,b(t),i=!0;break b}d===n(c)&&r(c),b(t)}else r(c);d=n(c)}if(d!==null)i=!0;else{var u=n(l);u!==null&&ne(x,u.startTime-t),i=!1}}break a}finally{d=null,f=a,p=!1}i=void 0}}finally{i?D():S=!1}}}var D;if(typeof y==`function`)D=function(){y(E)};else if(typeof MessageChannel<`u`){var te=new MessageChannel,O=te.port2;te.port1.onmessage=E,D=function(){O.postMessage(null)}}else D=function(){_(E,0)};function ne(t,n){C=_(function(){t(e.unstable_now())},n)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_forceFrameRate=function(e){0>e||125<e?console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`):w=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_next=function(e){switch(f){case 1:case 2:case 3:var t=3;break;default:t=f}var n=f;f=t;try{return e()}finally{f=n}},e.unstable_requestPaint=function(){g=!0},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=f;f=e;try{return t()}finally{f=n}},e.unstable_scheduleCallback=function(r,i,a){var o=e.unstable_now();switch(typeof a==`object`&&a?(a=a.delay,a=typeof a==`number`&&0<a?o+a:o):a=o,r){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=a+s,r={id:u++,callback:i,priorityLevel:r,startTime:a,expirationTime:s,sortIndex:-1},a>o?(r.sortIndex=a,t(l,r),n(c)===null&&r===n(l)&&(h?(v(C),C=-1):h=!0,ne(x,a-o))):(r.sortIndex=s,t(c,r),m||p||(m=!0,S||(S=!0,D()))),r},e.unstable_shouldYield=T,e.unstable_wrapCallback=function(e){var t=f;return function(){var n=f;f=t;try{return e.apply(this,arguments)}finally{f=n}}}})),f=o(((e,t)=>{t.exports=d()})),p=o((e=>{var t=u();function n(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function r(){}var i={d:{f:r,r:function(){throw Error(n(522))},D:r,C:r,L:r,m:r,X:r,S:r,M:r},p:0,findDOMNode:null},a=Symbol.for(`react.portal`);function o(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:a,key:r==null?null:``+r,children:e,containerInfo:t,implementation:n}}var s=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function c(e,t){if(e===`font`)return``;if(typeof t==`string`)return t===`use-credentials`?t:``}e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=i,e.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(n(299));return o(e,t,null,r)},e.flushSync=function(e){var t=s.T,n=i.p;try{if(s.T=null,i.p=2,e)return e()}finally{s.T=t,i.p=n,i.d.f()}},e.preconnect=function(e,t){typeof e==`string`&&(t?(t=t.crossOrigin,t=typeof t==`string`?t===`use-credentials`?t:``:void 0):t=null,i.d.C(e,t))},e.prefetchDNS=function(e){typeof e==`string`&&i.d.D(e)},e.preinit=function(e,t){if(typeof e==`string`&&t&&typeof t.as==`string`){var n=t.as,r=c(n,t.crossOrigin),a=typeof t.integrity==`string`?t.integrity:void 0,o=typeof t.fetchPriority==`string`?t.fetchPriority:void 0;n===`style`?i.d.S(e,typeof t.precedence==`string`?t.precedence:void 0,{crossOrigin:r,integrity:a,fetchPriority:o}):n===`script`&&i.d.X(e,{crossOrigin:r,integrity:a,fetchPriority:o,nonce:typeof t.nonce==`string`?t.nonce:void 0})}},e.preinitModule=function(e,t){if(typeof e==`string`)if(typeof t==`object`&&t){if(t.as==null||t.as===`script`){var n=c(t.as,t.crossOrigin);i.d.M(e,{crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0})}}else t??i.d.M(e)},e.preload=function(e,t){if(typeof e==`string`&&typeof t==`object`&&t&&typeof t.as==`string`){var n=t.as,r=c(n,t.crossOrigin);i.d.L(e,n,{crossOrigin:r,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,type:typeof t.type==`string`?t.type:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy==`string`?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet==`string`?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes==`string`?t.imageSizes:void 0,media:typeof t.media==`string`?t.media:void 0})}},e.preloadModule=function(e,t){if(typeof e==`string`)if(t){var n=c(t.as,t.crossOrigin);i.d.m(e,{as:typeof t.as==`string`&&t.as!==`script`?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0})}else i.d.m(e)},e.requestFormReset=function(e){i.d.r(e)},e.unstable_batchedUpdates=function(e,t){return e(t)},e.useFormState=function(e,t,n){return s.H.useFormState(e,t,n)},e.useFormStatus=function(){return s.H.useHostTransitionStatus()},e.version=`19.2.7`})),m=o(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=p()})),h=o((e=>{var t=f(),n=u(),r=m();function i(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function a(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function o(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function s(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function c(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function l(e){if(o(e)!==e)throw Error(i(188))}function d(e){var t=e.alternate;if(!t){if(t=o(e),t===null)throw Error(i(188));return t===e?e:null}for(var n=e,r=t;;){var a=n.return;if(a===null)break;var s=a.alternate;if(s===null){if(r=a.return,r!==null){n=r;continue}break}if(a.child===s.child){for(s=a.child;s;){if(s===n)return l(a),e;if(s===r)return l(a),t;s=s.sibling}throw Error(i(188))}if(n.return!==r.return)n=a,r=s;else{for(var c=!1,u=a.child;u;){if(u===n){c=!0,n=a,r=s;break}if(u===r){c=!0,r=a,n=s;break}u=u.sibling}if(!c){for(u=s.child;u;){if(u===n){c=!0,n=s,r=a;break}if(u===r){c=!0,r=s,n=a;break}u=u.sibling}if(!c)throw Error(i(189))}}if(n.alternate!==r)throw Error(i(190))}if(n.tag!==3)throw Error(i(188));return n.stateNode.current===n?e:t}function p(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=p(e),t!==null)return t;e=e.sibling}return null}var h=Object.assign,g=Symbol.for(`react.element`),_=Symbol.for(`react.transitional.element`),v=Symbol.for(`react.portal`),y=Symbol.for(`react.fragment`),b=Symbol.for(`react.strict_mode`),x=Symbol.for(`react.profiler`),S=Symbol.for(`react.consumer`),C=Symbol.for(`react.context`),w=Symbol.for(`react.forward_ref`),ee=Symbol.for(`react.suspense`),T=Symbol.for(`react.suspense_list`),E=Symbol.for(`react.memo`),D=Symbol.for(`react.lazy`),te=Symbol.for(`react.activity`),O=Symbol.for(`react.memo_cache_sentinel`),ne=Symbol.iterator;function k(e){return typeof e!=`object`||!e?null:(e=ne&&e[ne]||e[`@@iterator`],typeof e==`function`?e:null)}var re=Symbol.for(`react.client.reference`);function ie(e){if(e==null)return null;if(typeof e==`function`)return e.$$typeof===re?null:e.displayName||e.name||null;if(typeof e==`string`)return e;switch(e){case y:return`Fragment`;case x:return`Profiler`;case b:return`StrictMode`;case ee:return`Suspense`;case T:return`SuspenseList`;case te:return`Activity`}if(typeof e==`object`)switch(e.$$typeof){case v:return`Portal`;case C:return e.displayName||`Context`;case S:return(e._context.displayName||`Context`)+`.Consumer`;case w:var t=e.render;return e=e.displayName,e||=(e=t.displayName||t.name||``,e===``?`ForwardRef`:`ForwardRef(`+e+`)`),e;case E:return t=e.displayName||null,t===null?ie(e.type)||`Memo`:t;case D:t=e._payload,e=e._init;try{return ie(e(t))}catch{}}return null}var ae=Array.isArray,A=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,j=r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,M={pending:!1,data:null,method:null,action:null},oe=[],se=-1;function ce(e){return{current:e}}function N(e){0>se||(e.current=oe[se],oe[se]=null,se--)}function P(e,t){se++,oe[se]=e.current,e.current=t}var F=ce(null),le=ce(null),I=ce(null),ue=ce(null);function L(e,t){switch(P(I,t),P(le,e),P(F,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Vd(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Vd(t),e=Hd(t,e);else switch(e){case`svg`:e=1;break;case`math`:e=2;break;default:e=0}}N(F),P(F,e)}function de(){N(F),N(le),N(I)}function fe(e){e.memoizedState!==null&&P(ue,e);var t=F.current,n=Hd(t,e.type);t!==n&&(P(le,e),P(F,n))}function pe(e){le.current===e&&(N(F),N(le)),ue.current===e&&(N(ue),Qf._currentValue=M)}var me,he;function R(e){if(me===void 0)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);me=t&&t[1]||``,he=-1<e.stack.indexOf(`
    at`)?` (<anonymous>)`:-1<e.stack.indexOf(`@`)?`@unknown:0:0`:``}return`
`+me+e+he}var ge=!1;function _e(e,t){if(!e||ge)return``;ge=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var n=function(){throw Error()};if(Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect==`object`&&Reflect.construct){try{Reflect.construct(n,[])}catch(e){var r=e}Reflect.construct(e,[],n)}else{try{n.call()}catch(e){r=e}e.call(n.prototype)}}else{try{throw Error()}catch(e){r=e}(n=e())&&typeof n.catch==`function`&&n.catch(function(){})}}catch(e){if(e&&r&&typeof e.stack==`string`)return[e.stack,r.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName=`DetermineComponentFrameRoot`;var i=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,`name`);i&&i.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:`DetermineComponentFrameRoot`});var a=r.DetermineComponentFrameRoot(),o=a[0],s=a[1];if(o&&s){var c=o.split(`
`),l=s.split(`
`);for(i=r=0;r<c.length&&!c[r].includes(`DetermineComponentFrameRoot`);)r++;for(;i<l.length&&!l[i].includes(`DetermineComponentFrameRoot`);)i++;if(r===c.length||i===l.length)for(r=c.length-1,i=l.length-1;1<=r&&0<=i&&c[r]!==l[i];)i--;for(;1<=r&&0<=i;r--,i--)if(c[r]!==l[i]){if(r!==1||i!==1)do if(r--,i--,0>i||c[r]!==l[i]){var u=`
`+c[r].replace(` at new `,` at `);return e.displayName&&u.includes(`<anonymous>`)&&(u=u.replace(`<anonymous>`,e.displayName)),u}while(1<=r&&0<=i);break}}}finally{ge=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:``)?R(n):``}function ve(e,t){switch(e.tag){case 26:case 27:case 5:return R(e.type);case 16:return R(`Lazy`);case 13:return e.child!==t&&t!==null?R(`Suspense Fallback`):R(`Suspense`);case 19:return R(`SuspenseList`);case 0:case 15:return _e(e.type,!1);case 11:return _e(e.type.render,!1);case 1:return _e(e.type,!0);case 31:return R(`Activity`);default:return``}}function ye(e){try{var t=``,n=null;do t+=ve(e,n),n=e,e=e.return;while(e);return t}catch(e){return`
Error generating stack: `+e.message+`
`+e.stack}}var be=Object.prototype.hasOwnProperty,xe=t.unstable_scheduleCallback,Se=t.unstable_cancelCallback,Ce=t.unstable_shouldYield,we=t.unstable_requestPaint,z=t.unstable_now,Te=t.unstable_getCurrentPriorityLevel,Ee=t.unstable_ImmediatePriority,De=t.unstable_UserBlockingPriority,Oe=t.unstable_NormalPriority,ke=t.unstable_LowPriority,Ae=t.unstable_IdlePriority,je=t.log,Me=t.unstable_setDisableYieldValue,Ne=null,B=null;function Pe(e){if(typeof je==`function`&&Me(e),B&&typeof B.setStrictMode==`function`)try{B.setStrictMode(Ne,e)}catch{}}var Fe=Math.clz32?Math.clz32:Re,Ie=Math.log,Le=Math.LN2;function Re(e){return e>>>=0,e===0?32:31-(Ie(e)/Le|0)|0}var ze=256,Be=262144,Ve=4194304;function He(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Ue(e,t,n){var r=e.pendingLanes;if(r===0)return 0;var i=0,a=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var s=r&134217727;return s===0?(s=r&~a,s===0?o===0?n||(n=r&~e,n!==0&&(i=He(n))):i=He(o):i=He(s)):(r=s&~a,r===0?(o&=s,o===0?n||(n=s&~e,n!==0&&(i=He(n))):i=He(o)):i=He(r)),i===0?0:t!==0&&t!==i&&(t&a)===0&&(a=i&-i,n=t&-t,a>=n||a===32&&n&4194048)?t:i}function We(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function Ge(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Ke(){var e=Ve;return Ve<<=1,!(Ve&62914560)&&(Ve=4194304),e}function qe(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Je(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function Ye(e,t,n,r,i,a){var o=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var s=e.entanglements,c=e.expirationTimes,l=e.hiddenUpdates;for(n=o&~n;0<n;){var u=31-Fe(n),d=1<<u;s[u]=0,c[u]=-1;var f=l[u];if(f!==null)for(l[u]=null,u=0;u<f.length;u++){var p=f[u];p!==null&&(p.lane&=-536870913)}n&=~d}r!==0&&Xe(e,r,0),a!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=a&~(o&~t))}function Xe(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-Fe(t);e.entangledLanes|=t,e.entanglements[r]=e.entanglements[r]|1073741824|n&261930}function Ze(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Fe(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}function Qe(e,t){var n=t&-t;return n=n&42?1:$e(n),(n&(e.suspendedLanes|t))===0?n:0}function $e(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function et(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function tt(){var e=j.p;return e===0?(e=window.event,e===void 0?32:mp(e.type)):e}function nt(e,t){var n=j.p;try{return j.p=e,t()}finally{j.p=n}}var rt=Math.random().toString(36).slice(2),it=`__reactFiber$`+rt,at=`__reactProps$`+rt,ot=`__reactContainer$`+rt,st=`__reactEvents$`+rt,ct=`__reactListeners$`+rt,lt=`__reactHandles$`+rt,ut=`__reactResources$`+rt,dt=`__reactMarker$`+rt;function ft(e){delete e[it],delete e[at],delete e[st],delete e[ct],delete e[lt]}function pt(e){var t=e[it];if(t)return t;for(var n=e.parentNode;n;){if(t=n[ot]||n[it]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=df(e);e!==null;){if(n=e[it])return n;e=df(e)}return t}e=n,n=e.parentNode}return null}function mt(e){if(e=e[it]||e[ot]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function ht(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(i(33))}function gt(e){var t=e[ut];return t||=e[ut]={hoistableStyles:new Map,hoistableScripts:new Map},t}function _t(e){e[dt]=!0}var vt=new Set,yt={};function bt(e,t){xt(e,t),xt(e+`Capture`,t)}function xt(e,t){for(yt[e]=t,e=0;e<t.length;e++)vt.add(t[e])}var St=RegExp(`^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`),Ct={},wt={};function Tt(e){return be.call(wt,e)?!0:be.call(Ct,e)?!1:St.test(e)?wt[e]=!0:(Ct[e]=!0,!1)}function Et(e,t,n){if(Tt(t))if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:e.removeAttribute(t);return;case`boolean`:var r=t.toLowerCase().slice(0,5);if(r!==`data-`&&r!==`aria-`){e.removeAttribute(t);return}}e.setAttribute(t,``+n)}}function Dt(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(t);return}e.setAttribute(t,``+n)}}function Ot(e,t,n,r){if(r===null)e.removeAttribute(n);else{switch(typeof r){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(n);return}e.setAttributeNS(t,n,``+r)}}function kt(e){switch(typeof e){case`bigint`:case`boolean`:case`number`:case`string`:case`undefined`:return e;case`object`:return e;default:return``}}function At(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()===`input`&&(t===`checkbox`||t===`radio`)}function jt(e,t,n){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&r!==void 0&&typeof r.get==`function`&&typeof r.set==`function`){var i=r.get,a=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){n=``+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(e){n=``+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Mt(e){if(!e._valueTracker){var t=At(e)?`checked`:`value`;e._valueTracker=jt(e,t,``+e[t])}}function Nt(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r=``;return e&&(r=At(e)?e.checked?`true`:`false`:e.value),e=r,e===n?!1:(t.setValue(e),!0)}function Pt(e){if(e||=typeof document<`u`?document:void 0,e===void 0)return null;try{return e.activeElement||e.body}catch{return e.body}}var Ft=/[\n"\\]/g;function It(e){return e.replace(Ft,function(e){return`\\`+e.charCodeAt(0).toString(16)+` `})}function Lt(e,t,n,r,i,a,o,s){e.name=``,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`?e.type=o:e.removeAttribute(`type`),t==null?o!==`submit`&&o!==`reset`||e.removeAttribute(`value`):o===`number`?(t===0&&e.value===``||e.value!=t)&&(e.value=``+kt(t)):e.value!==``+kt(t)&&(e.value=``+kt(t)),t==null?n==null?r!=null&&e.removeAttribute(`value`):zt(e,o,kt(n)):zt(e,o,kt(t)),i==null&&a!=null&&(e.defaultChecked=!!a),i!=null&&(e.checked=i&&typeof i!=`function`&&typeof i!=`symbol`),s!=null&&typeof s!=`function`&&typeof s!=`symbol`&&typeof s!=`boolean`?e.name=``+kt(s):e.removeAttribute(`name`)}function Rt(e,t,n,r,i,a,o,s){if(a!=null&&typeof a!=`function`&&typeof a!=`symbol`&&typeof a!=`boolean`&&(e.type=a),t!=null||n!=null){if(!(a!==`submit`&&a!==`reset`||t!=null)){Mt(e);return}n=n==null?``:``+kt(n),t=t==null?n:``+kt(t),s||t===e.value||(e.value=t),e.defaultValue=t}r??=i,r=typeof r!=`function`&&typeof r!=`symbol`&&!!r,e.checked=s?e.checked:!!r,e.defaultChecked=!!r,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`&&(e.name=o),Mt(e)}function zt(e,t,n){t===`number`&&Pt(e.ownerDocument)===e||e.defaultValue===``+n||(e.defaultValue=``+n)}function Bt(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t[`$`+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty(`$`+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=``+kt(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function Vt(e,t,n){if(t!=null&&(t=``+kt(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n==null?``:``+kt(n)}function Ht(e,t,n,r){if(t==null){if(r!=null){if(n!=null)throw Error(i(92));if(ae(r)){if(1<r.length)throw Error(i(93));r=r[0]}n=r}n??=``,t=n}n=kt(t),e.defaultValue=n,r=e.textContent,r===n&&r!==``&&r!==null&&(e.value=r),Mt(e)}function Ut(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Wt=new Set(`animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(` `));function Gt(e,t,n){var r=t.indexOf(`--`)===0;n==null||typeof n==`boolean`||n===``?r?e.setProperty(t,``):t===`float`?e.cssFloat=``:e[t]=``:r?e.setProperty(t,n):typeof n!=`number`||n===0||Wt.has(t)?t===`float`?e.cssFloat=n:e[t]=(``+n).trim():e[t]=n+`px`}function Kt(e,t,n){if(t!=null&&typeof t!=`object`)throw Error(i(62));if(e=e.style,n!=null){for(var r in n)!n.hasOwnProperty(r)||t!=null&&t.hasOwnProperty(r)||(r.indexOf(`--`)===0?e.setProperty(r,``):r===`float`?e.cssFloat=``:e[r]=``);for(var a in t)r=t[a],t.hasOwnProperty(a)&&n[a]!==r&&Gt(e,a,r)}else for(var o in t)t.hasOwnProperty(o)&&Gt(e,o,t[o])}function qt(e){if(e.indexOf(`-`)===-1)return!1;switch(e){case`annotation-xml`:case`color-profile`:case`font-face`:case`font-face-src`:case`font-face-uri`:case`font-face-format`:case`font-face-name`:case`missing-glyph`:return!1;default:return!0}}var Jt=new Map([[`acceptCharset`,`accept-charset`],[`htmlFor`,`for`],[`httpEquiv`,`http-equiv`],[`crossOrigin`,`crossorigin`],[`accentHeight`,`accent-height`],[`alignmentBaseline`,`alignment-baseline`],[`arabicForm`,`arabic-form`],[`baselineShift`,`baseline-shift`],[`capHeight`,`cap-height`],[`clipPath`,`clip-path`],[`clipRule`,`clip-rule`],[`colorInterpolation`,`color-interpolation`],[`colorInterpolationFilters`,`color-interpolation-filters`],[`colorProfile`,`color-profile`],[`colorRendering`,`color-rendering`],[`dominantBaseline`,`dominant-baseline`],[`enableBackground`,`enable-background`],[`fillOpacity`,`fill-opacity`],[`fillRule`,`fill-rule`],[`floodColor`,`flood-color`],[`floodOpacity`,`flood-opacity`],[`fontFamily`,`font-family`],[`fontSize`,`font-size`],[`fontSizeAdjust`,`font-size-adjust`],[`fontStretch`,`font-stretch`],[`fontStyle`,`font-style`],[`fontVariant`,`font-variant`],[`fontWeight`,`font-weight`],[`glyphName`,`glyph-name`],[`glyphOrientationHorizontal`,`glyph-orientation-horizontal`],[`glyphOrientationVertical`,`glyph-orientation-vertical`],[`horizAdvX`,`horiz-adv-x`],[`horizOriginX`,`horiz-origin-x`],[`imageRendering`,`image-rendering`],[`letterSpacing`,`letter-spacing`],[`lightingColor`,`lighting-color`],[`markerEnd`,`marker-end`],[`markerMid`,`marker-mid`],[`markerStart`,`marker-start`],[`overlinePosition`,`overline-position`],[`overlineThickness`,`overline-thickness`],[`paintOrder`,`paint-order`],[`panose-1`,`panose-1`],[`pointerEvents`,`pointer-events`],[`renderingIntent`,`rendering-intent`],[`shapeRendering`,`shape-rendering`],[`stopColor`,`stop-color`],[`stopOpacity`,`stop-opacity`],[`strikethroughPosition`,`strikethrough-position`],[`strikethroughThickness`,`strikethrough-thickness`],[`strokeDasharray`,`stroke-dasharray`],[`strokeDashoffset`,`stroke-dashoffset`],[`strokeLinecap`,`stroke-linecap`],[`strokeLinejoin`,`stroke-linejoin`],[`strokeMiterlimit`,`stroke-miterlimit`],[`strokeOpacity`,`stroke-opacity`],[`strokeWidth`,`stroke-width`],[`textAnchor`,`text-anchor`],[`textDecoration`,`text-decoration`],[`textRendering`,`text-rendering`],[`transformOrigin`,`transform-origin`],[`underlinePosition`,`underline-position`],[`underlineThickness`,`underline-thickness`],[`unicodeBidi`,`unicode-bidi`],[`unicodeRange`,`unicode-range`],[`unitsPerEm`,`units-per-em`],[`vAlphabetic`,`v-alphabetic`],[`vHanging`,`v-hanging`],[`vIdeographic`,`v-ideographic`],[`vMathematical`,`v-mathematical`],[`vectorEffect`,`vector-effect`],[`vertAdvY`,`vert-adv-y`],[`vertOriginX`,`vert-origin-x`],[`vertOriginY`,`vert-origin-y`],[`wordSpacing`,`word-spacing`],[`writingMode`,`writing-mode`],[`xmlnsXlink`,`xmlns:xlink`],[`xHeight`,`x-height`]]),Yt=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Xt(e){return Yt.test(``+e)?`javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`:e}function Zt(){}var Qt=null;function $t(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var en=null,tn=null;function nn(e){var t=mt(e);if(t&&(e=t.stateNode)){var n=e[at]||null;a:switch(e=t.stateNode,t.type){case`input`:if(Lt(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type===`radio`&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll(`input[name="`+It(``+t)+`"][type="radio"]`),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=r[at]||null;if(!a)throw Error(i(90));Lt(r,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<n.length;t++)r=n[t],r.form===e.form&&Nt(r)}break a;case`textarea`:Vt(e,n.value,n.defaultValue);break a;case`select`:t=n.value,t!=null&&Bt(e,!!n.multiple,t,!1)}}}var rn=!1;function an(e,t,n){if(rn)return e(t,n);rn=!0;try{return e(t)}finally{if(rn=!1,(en!==null||tn!==null)&&(yu(),en&&(t=en,e=tn,tn=en=null,nn(t),e)))for(t=0;t<e.length;t++)nn(e[t])}}function on(e,t){var n=e.stateNode;if(n===null)return null;var r=n[at]||null;if(r===null)return null;n=r[t];a:switch(t){case`onClick`:case`onClickCapture`:case`onDoubleClick`:case`onDoubleClickCapture`:case`onMouseDown`:case`onMouseDownCapture`:case`onMouseMove`:case`onMouseMoveCapture`:case`onMouseUp`:case`onMouseUpCapture`:case`onMouseEnter`:(r=!r.disabled)||(e=e.type,r=!(e===`button`||e===`input`||e===`select`||e===`textarea`)),e=!r;break a;default:e=!1}if(e)return null;if(n&&typeof n!=`function`)throw Error(i(231,t,typeof n));return n}var sn=!(typeof window>`u`||window.document===void 0||window.document.createElement===void 0),cn=!1;if(sn)try{var ln={};Object.defineProperty(ln,"passive",{get:function(){cn=!0}}),window.addEventListener(`test`,ln,ln),window.removeEventListener(`test`,ln,ln)}catch{cn=!1}var un=null,dn=null,fn=null;function pn(){if(fn)return fn;var e,t=dn,n=t.length,r,i=`value`in un?un.value:un.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return fn=i.slice(e,1<r?1-r:void 0)}function mn(e){var t=e.keyCode;return`charCode`in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function hn(){return!0}function gn(){return!1}function _n(e){function t(t,n,r,i,a){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented==null?!1===i.returnValue:i.defaultPrevented)?hn:gn,this.isPropagationStopped=gn,this}return h(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!=`unknown`&&(e.returnValue=!1),this.isDefaultPrevented=hn)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!=`unknown`&&(e.cancelBubble=!0),this.isPropagationStopped=hn)},persist:function(){},isPersistent:hn}),t}var vn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},yn=_n(vn),bn=h({},vn,{view:0,detail:0}),xn=_n(bn),Sn,Cn,wn,Tn=h({},bn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:In,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return`movementX`in e?e.movementX:(e!==wn&&(wn&&e.type===`mousemove`?(Sn=e.screenX-wn.screenX,Cn=e.screenY-wn.screenY):Cn=Sn=0,wn=e),Sn)},movementY:function(e){return`movementY`in e?e.movementY:Cn}}),En=_n(Tn),Dn=_n(h({},Tn,{dataTransfer:0})),On=_n(h({},bn,{relatedTarget:0})),kn=_n(h({},vn,{animationName:0,elapsedTime:0,pseudoElement:0})),An=_n(h({},vn,{clipboardData:function(e){return`clipboardData`in e?e.clipboardData:window.clipboardData}})),jn=_n(h({},vn,{data:0})),Mn={Esc:`Escape`,Spacebar:` `,Left:`ArrowLeft`,Up:`ArrowUp`,Right:`ArrowRight`,Down:`ArrowDown`,Del:`Delete`,Win:`OS`,Menu:`ContextMenu`,Apps:`ContextMenu`,Scroll:`ScrollLock`,MozPrintableKey:`Unidentified`},Nn={8:`Backspace`,9:`Tab`,12:`Clear`,13:`Enter`,16:`Shift`,17:`Control`,18:`Alt`,19:`Pause`,20:`CapsLock`,27:`Escape`,32:` `,33:`PageUp`,34:`PageDown`,35:`End`,36:`Home`,37:`ArrowLeft`,38:`ArrowUp`,39:`ArrowRight`,40:`ArrowDown`,45:`Insert`,46:`Delete`,112:`F1`,113:`F2`,114:`F3`,115:`F4`,116:`F5`,117:`F6`,118:`F7`,119:`F8`,120:`F9`,121:`F10`,122:`F11`,123:`F12`,144:`NumLock`,145:`ScrollLock`,224:`Meta`},Pn={Alt:`altKey`,Control:`ctrlKey`,Meta:`metaKey`,Shift:`shiftKey`};function Fn(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Pn[e])?!!t[e]:!1}function In(){return Fn}var Ln=_n(h({},bn,{key:function(e){if(e.key){var t=Mn[e.key]||e.key;if(t!==`Unidentified`)return t}return e.type===`keypress`?(e=mn(e),e===13?`Enter`:String.fromCharCode(e)):e.type===`keydown`||e.type===`keyup`?Nn[e.keyCode]||`Unidentified`:``},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:In,charCode:function(e){return e.type===`keypress`?mn(e):0},keyCode:function(e){return e.type===`keydown`||e.type===`keyup`?e.keyCode:0},which:function(e){return e.type===`keypress`?mn(e):e.type===`keydown`||e.type===`keyup`?e.keyCode:0}})),Rn=_n(h({},Tn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),V=_n(h({},bn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:In})),zn=_n(h({},vn,{propertyName:0,elapsedTime:0,pseudoElement:0})),Bn=_n(h({},Tn,{deltaX:function(e){return`deltaX`in e?e.deltaX:`wheelDeltaX`in e?-e.wheelDeltaX:0},deltaY:function(e){return`deltaY`in e?e.deltaY:`wheelDeltaY`in e?-e.wheelDeltaY:`wheelDelta`in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),Vn=_n(h({},vn,{newState:0,oldState:0})),Hn=[9,13,27,32],Un=sn&&`CompositionEvent`in window,Wn=null;sn&&`documentMode`in document&&(Wn=document.documentMode);var Gn=sn&&`TextEvent`in window&&!Wn,Kn=sn&&(!Un||Wn&&8<Wn&&11>=Wn),qn=` `,Jn=!1;function H(e,t){switch(e){case`keyup`:return Hn.indexOf(t.keyCode)!==-1;case`keydown`:return t.keyCode!==229;case`keypress`:case`mousedown`:case`focusout`:return!0;default:return!1}}function Yn(e){return e=e.detail,typeof e==`object`&&`data`in e?e.data:null}var Xn=!1;function Zn(e,t){switch(e){case`compositionend`:return Yn(t);case`keypress`:return t.which===32?(Jn=!0,qn):null;case`textInput`:return e=t.data,e===qn&&Jn?null:e;default:return null}}function Qn(e,t){if(Xn)return e===`compositionend`||!Un&&H(e,t)?(e=pn(),fn=dn=un=null,Xn=!1,e):null;switch(e){case`paste`:return null;case`keypress`:if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case`compositionend`:return Kn&&t.locale!==`ko`?null:t.data;default:return null}}var $n={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function er(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t===`input`?!!$n[e.type]:t===`textarea`}function tr(e,t,n,r){en?tn?tn.push(r):tn=[r]:en=r,t=Td(t,`onChange`),0<t.length&&(n=new yn(`onChange`,`change`,null,n,r),e.push({event:n,listeners:t}))}var nr=null,rr=null;function ir(e){vd(e,0)}function ar(e){if(Nt(ht(e)))return e}function or(e,t){if(e===`change`)return t}var sr=!1;if(sn){var cr;if(sn){var lr=`oninput`in document;if(!lr){var ur=document.createElement(`div`);ur.setAttribute(`oninput`,`return;`),lr=typeof ur.oninput==`function`}cr=lr}else cr=!1;sr=cr&&(!document.documentMode||9<document.documentMode)}function dr(){nr&&(nr.detachEvent(`onpropertychange`,fr),rr=nr=null)}function fr(e){if(e.propertyName===`value`&&ar(rr)){var t=[];tr(t,rr,e,$t(e)),an(ir,t)}}function pr(e,t,n){e===`focusin`?(dr(),nr=t,rr=n,nr.attachEvent(`onpropertychange`,fr)):e===`focusout`&&dr()}function mr(e){if(e===`selectionchange`||e===`keyup`||e===`keydown`)return ar(rr)}function hr(e,t){if(e===`click`)return ar(t)}function gr(e,t){if(e===`input`||e===`change`)return ar(t)}function _r(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var vr=typeof Object.is==`function`?Object.is:_r;function yr(e,t){if(vr(e,t))return!0;if(typeof e!=`object`||!e||typeof t!=`object`||!t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!be.call(t,i)||!vr(e[i],t[i]))return!1}return!0}function br(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function xr(e,t){var n=br(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}a:{for(;n;){if(n.nextSibling){n=n.nextSibling;break a}n=n.parentNode}n=void 0}n=br(n)}}function Sr(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Sr(e,t.parentNode):`contains`in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Cr(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Pt(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href==`string`}catch{n=!1}if(n)e=t.contentWindow;else break;t=Pt(e.document)}return t}function wr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t===`input`&&(e.type===`text`||e.type===`search`||e.type===`tel`||e.type===`url`||e.type===`password`)||t===`textarea`||e.contentEditable===`true`)}var Tr=sn&&`documentMode`in document&&11>=document.documentMode,Er=null,Dr=null,Or=null,kr=!1;function Ar(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;kr||Er==null||Er!==Pt(r)||(r=Er,`selectionStart`in r&&wr(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Or&&yr(Or,r)||(Or=r,r=Td(Dr,`onSelect`),0<r.length&&(t=new yn(`onSelect`,`select`,null,t,n),e.push({event:t,listeners:r}),t.target=Er)))}function jr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n[`Webkit`+e]=`webkit`+t,n[`Moz`+e]=`moz`+t,n}var Mr={animationend:jr(`Animation`,`AnimationEnd`),animationiteration:jr(`Animation`,`AnimationIteration`),animationstart:jr(`Animation`,`AnimationStart`),transitionrun:jr(`Transition`,`TransitionRun`),transitionstart:jr(`Transition`,`TransitionStart`),transitioncancel:jr(`Transition`,`TransitionCancel`),transitionend:jr(`Transition`,`TransitionEnd`)},Nr={},Pr={};sn&&(Pr=document.createElement(`div`).style,`AnimationEvent`in window||(delete Mr.animationend.animation,delete Mr.animationiteration.animation,delete Mr.animationstart.animation),`TransitionEvent`in window||delete Mr.transitionend.transition);function Fr(e){if(Nr[e])return Nr[e];if(!Mr[e])return e;var t=Mr[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Pr)return Nr[e]=t[n];return e}var Ir=Fr(`animationend`),Lr=Fr(`animationiteration`),Rr=Fr(`animationstart`),zr=Fr(`transitionrun`),Br=Fr(`transitionstart`),Vr=Fr(`transitioncancel`),Hr=Fr(`transitionend`),Ur=new Map,Wr=`abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);Wr.push(`scrollEnd`);function Gr(e,t){Ur.set(e,t),bt(t,[e])}var Kr=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},qr=[],Jr=0,Yr=0;function Xr(){for(var e=Jr,t=Yr=Jr=0;t<e;){var n=qr[t];qr[t++]=null;var r=qr[t];qr[t++]=null;var i=qr[t];qr[t++]=null;var a=qr[t];if(qr[t++]=null,r!==null&&i!==null){var o=r.pending;o===null?i.next=i:(i.next=o.next,o.next=i),r.pending=i}a!==0&&ei(n,i,a)}}function Zr(e,t,n,r){qr[Jr++]=e,qr[Jr++]=t,qr[Jr++]=n,qr[Jr++]=r,Yr|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function Qr(e,t,n,r){return Zr(e,t,n,r),U(e)}function $r(e,t){return Zr(e,null,null,t),U(e)}function ei(e,t,n){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n);for(var i=!1,a=e.return;a!==null;)a.childLanes|=n,r=a.alternate,r!==null&&(r.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(i=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,i&&t!==null&&(i=31-Fe(n),e=a.hiddenUpdates,r=e[i],r===null?e[i]=[t]:r.push(t),t.lane=n|536870912),a):null}function U(e){if(50<uu)throw uu=0,du=null,Error(i(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var ti={};function ni(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ri(e,t,n,r){return new ni(e,t,n,r)}function ii(e){return e=e.prototype,!(!e||!e.isReactComponent)}function ai(e,t){var n=e.alternate;return n===null?(n=ri(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&65011712,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function oi(e,t){e.flags&=65011714;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function si(e,t,n,r,a,o){var s=0;if(r=e,typeof e==`function`)ii(e)&&(s=1);else if(typeof e==`string`)s=Uf(e,n,F.current)?26:e===`html`||e===`head`||e===`body`?27:5;else a:switch(e){case te:return e=ri(31,n,t,a),e.elementType=te,e.lanes=o,e;case y:return ci(n.children,a,o,t);case b:s=8,a|=24;break;case x:return e=ri(12,n,t,a|2),e.elementType=x,e.lanes=o,e;case ee:return e=ri(13,n,t,a),e.elementType=ee,e.lanes=o,e;case T:return e=ri(19,n,t,a),e.elementType=T,e.lanes=o,e;default:if(typeof e==`object`&&e)switch(e.$$typeof){case C:s=10;break a;case S:s=9;break a;case w:s=11;break a;case E:s=14;break a;case D:s=16,r=null;break a}s=29,n=Error(i(130,e===null?`null`:typeof e,``)),r=null}return t=ri(s,n,t,a),t.elementType=e,t.type=r,t.lanes=o,t}function ci(e,t,n,r){return e=ri(7,e,r,t),e.lanes=n,e}function W(e,t,n){return e=ri(6,e,null,t),e.lanes=n,e}function li(e){var t=ri(18,null,null,0);return t.stateNode=e,t}function ui(e,t,n){return t=ri(4,e.children===null?[]:e.children,e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var di=new WeakMap;function fi(e,t){if(typeof e==`object`&&e){var n=di.get(e);return n===void 0?(t={value:e,source:t,stack:ye(t)},di.set(e,t),t):n}return{value:e,source:t,stack:ye(t)}}var pi=[],mi=0,hi=null,gi=0,_i=[],vi=0,yi=null,bi=1,xi=``;function Si(e,t){pi[mi++]=gi,pi[mi++]=hi,hi=e,gi=t}function Ci(e,t,n){_i[vi++]=bi,_i[vi++]=xi,_i[vi++]=yi,yi=e;var r=bi;e=xi;var i=32-Fe(r)-1;r&=~(1<<i),n+=1;var a=32-Fe(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,bi=1<<32-Fe(t)+i|n<<i|r,xi=a+e}else bi=1<<a|n<<i|r,xi=e}function wi(e){e.return!==null&&(Si(e,1),Ci(e,1,0))}function Ti(e){for(;e===hi;)hi=pi[--mi],pi[mi]=null,gi=pi[--mi],pi[mi]=null;for(;e===yi;)yi=_i[--vi],_i[vi]=null,xi=_i[--vi],_i[vi]=null,bi=_i[--vi],_i[vi]=null}function Ei(e,t){_i[vi++]=bi,_i[vi++]=xi,_i[vi++]=yi,bi=t.id,xi=t.overflow,yi=e}var Di=null,G=null,K=!1,Oi=null,ki=!1,Ai=Error(i(519));function ji(e){throw Li(fi(Error(i(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?`text`:`HTML`,``)),e)),Ai}function Mi(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[it]=e,t[at]=r,n){case`dialog`:$(`cancel`,t),$(`close`,t);break;case`iframe`:case`object`:case`embed`:$(`load`,t);break;case`video`:case`audio`:for(n=0;n<gd.length;n++)$(gd[n],t);break;case`source`:$(`error`,t);break;case`img`:case`image`:case`link`:$(`error`,t),$(`load`,t);break;case`details`:$(`toggle`,t);break;case`input`:$(`invalid`,t),Rt(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case`select`:$(`invalid`,t);break;case`textarea`:$(`invalid`,t),Ht(t,r.value,r.defaultValue,r.children)}n=r.children,typeof n!=`string`&&typeof n!=`number`&&typeof n!=`bigint`||t.textContent===``+n||!0===r.suppressHydrationWarning||jd(t.textContent,n)?(r.popover!=null&&($(`beforetoggle`,t),$(`toggle`,t)),r.onScroll!=null&&$(`scroll`,t),r.onScrollEnd!=null&&$(`scrollend`,t),r.onClick!=null&&(t.onclick=Zt),t=!0):t=!1,t||ji(e,!0)}function Ni(e){for(Di=e.return;Di;)switch(Di.tag){case 5:case 31:case 13:ki=!1;return;case 27:case 3:ki=!0;return;default:Di=Di.return}}function Pi(e){if(e!==Di)return!1;if(!K)return Ni(e),K=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=!(n!==`form`&&n!==`button`)||Ud(e.type,e.memoizedProps)),n=!n),n&&G&&ji(e),Ni(e),t===13){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));G=uf(e)}else if(t===31){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));G=uf(e)}else t===27?(t=G,Zd(e.type)?(e=lf,lf=null,G=e):G=t):G=Di?cf(e.stateNode.nextSibling):null;return!0}function Fi(){G=Di=null,K=!1}function Ii(){var e=Oi;return e!==null&&(Xl===null?Xl=e:Xl.push.apply(Xl,e),Oi=null),e}function Li(e){Oi===null?Oi=[e]:Oi.push(e)}var Ri=ce(null),zi=null,Bi=null;function Vi(e,t,n){P(Ri,t._currentValue),t._currentValue=n}function Hi(e){e._currentValue=Ri.current,N(Ri)}function Ui(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)===t?r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t):(e.childLanes|=t,r!==null&&(r.childLanes|=t)),e===n)break;e=e.return}}function Wi(e,t,n,r){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var o=a.dependencies;if(o!==null){var s=a.child;o=o.firstContext;a:for(;o!==null;){var c=o;o=a;for(var l=0;l<t.length;l++)if(c.context===t[l]){o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),Ui(o.return,n,e),r||(s=null);break a}o=c.next}}else if(a.tag===18){if(s=a.return,s===null)throw Error(i(341));s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),Ui(s,n,e),s=null}else s=a.child;if(s!==null)s.return=a;else for(s=a;s!==null;){if(s===e){s=null;break}if(a=s.sibling,a!==null){a.return=s.return,s=a;break}s=s.return}a=s}}function Gi(e,t,n,r){e=null;for(var a=t,o=!1;a!==null;){if(!o){if(a.flags&524288)o=!0;else if(a.flags&262144)break}if(a.tag===10){var s=a.alternate;if(s===null)throw Error(i(387));if(s=s.memoizedProps,s!==null){var c=a.type;vr(a.pendingProps.value,s.value)||(e===null?e=[c]:e.push(c))}}else if(a===ue.current){if(s=a.alternate,s===null)throw Error(i(387));s.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(e===null?e=[Qf]:e.push(Qf))}a=a.return}e!==null&&Wi(t,e,n,r),t.flags|=262144}function Ki(e){for(e=e.firstContext;e!==null;){if(!vr(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function qi(e){zi=e,Bi=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Ji(e){return Xi(zi,e)}function Yi(e,t){return zi===null&&qi(e),Xi(e,t)}function Xi(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},Bi===null){if(e===null)throw Error(i(308));Bi=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Bi=Bi.next=t;return n}var Zi=typeof AbortController<`u`?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},Qi=t.unstable_scheduleCallback,$i=t.unstable_NormalPriority,ea={$$typeof:C,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function ta(){return{controller:new Zi,data:new Map,refCount:0}}function na(e){e.refCount--,e.refCount===0&&Qi($i,function(){e.controller.abort()})}var ra=null,ia=0,aa=0,oa=null;function sa(e,t){if(ra===null){var n=ra=[];ia=0,aa=ud(),oa={status:`pending`,value:void 0,then:function(e){n.push(e)}}}return ia++,t.then(ca,ca),t}function ca(){if(--ia===0&&ra!==null){oa!==null&&(oa.status=`fulfilled`);var e=ra;ra=null,aa=0,oa=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function la(e,t){var n=[],r={status:`pending`,value:null,reason:null,then:function(e){n.push(e)}};return e.then(function(){r.status=`fulfilled`,r.value=t;for(var e=0;e<n.length;e++)(0,n[e])(t)},function(e){for(r.status=`rejected`,r.reason=e,e=0;e<n.length;e++)(0,n[e])(void 0)}),r}var ua=A.S;A.S=function(e,t){$l=z(),typeof t==`object`&&t&&typeof t.then==`function`&&sa(e,t),ua!==null&&ua(e,t)};var da=ce(null);function fa(){var e=da.current;return e===null?Ll.pooledCache:e}function pa(e,t){t===null?P(da,da.current):P(da,t.pool)}function ma(){var e=fa();return e===null?null:{parent:ea._currentValue,pool:e}}var ha=Error(i(460)),ga=Error(i(474)),_a=Error(i(542)),va={then:function(){}};function ya(e){return e=e.status,e===`fulfilled`||e===`rejected`}function ba(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(Zt,Zt),t=n),t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,wa(e),e;default:if(typeof t.status==`string`)t.then(Zt,Zt);else{if(e=Ll,e!==null&&100<e.shellSuspendCounter)throw Error(i(482));e=t,e.status=`pending`,e.then(function(e){if(t.status===`pending`){var n=t;n.status=`fulfilled`,n.value=e}},function(e){if(t.status===`pending`){var n=t;n.status=`rejected`,n.reason=e}})}switch(t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,wa(e),e}throw Sa=t,ha}}function xa(e){try{var t=e._init;return t(e._payload)}catch(e){throw typeof e==`object`&&e&&typeof e.then==`function`?(Sa=e,ha):e}}var Sa=null;function Ca(){if(Sa===null)throw Error(i(459));var e=Sa;return Sa=null,e}function wa(e){if(e===ha||e===_a)throw Error(i(483))}var Ta=null,Ea=0;function Da(e){var t=Ea;return Ea+=1,Ta===null&&(Ta=[]),ba(Ta,e,t)}function Oa(e,t){t=t.props.ref,e.ref=t===void 0?null:t}function ka(e,t){throw t.$$typeof===g?Error(i(525)):(e=Object.prototype.toString.call(t),Error(i(31,e===`[object Object]`?`object with keys {`+Object.keys(t).join(`, `)+`}`:e)))}function Aa(e){function t(t,n){if(e){var r=t.deletions;r===null?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;r!==null;)t(n,r),r=r.sibling;return null}function r(e){for(var t=new Map;e!==null;)e.key===null?t.set(e.index,e):t.set(e.key,e),e=e.sibling;return t}function a(e,t){return e=ai(e,t),e.index=0,e.sibling=null,e}function o(t,n,r){return t.index=r,e?(r=t.alternate,r===null?(t.flags|=67108866,n):(r=r.index,r<n?(t.flags|=67108866,n):r)):(t.flags|=1048576,n)}function s(t){return e&&t.alternate===null&&(t.flags|=67108866),t}function c(e,t,n,r){return t===null||t.tag!==6?(t=W(n,e.mode,r),t.return=e,t):(t=a(t,n),t.return=e,t)}function l(e,t,n,r){var i=n.type;return i===y?d(e,t,n.props.children,r,n.key):t!==null&&(t.elementType===i||typeof i==`object`&&i&&i.$$typeof===D&&xa(i)===t.type)?(t=a(t,n.props),Oa(t,n),t.return=e,t):(t=si(n.type,n.key,n.props,null,e.mode,r),Oa(t,n),t.return=e,t)}function u(e,t,n,r){return t===null||t.tag!==4||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?(t=ui(n,e.mode,r),t.return=e,t):(t=a(t,n.children||[]),t.return=e,t)}function d(e,t,n,r,i){return t===null||t.tag!==7?(t=ci(n,e.mode,r,i),t.return=e,t):(t=a(t,n),t.return=e,t)}function f(e,t,n){if(typeof t==`string`&&t!==``||typeof t==`number`||typeof t==`bigint`)return t=W(``+t,e.mode,n),t.return=e,t;if(typeof t==`object`&&t){switch(t.$$typeof){case _:return n=si(t.type,t.key,t.props,null,e.mode,n),Oa(n,t),n.return=e,n;case v:return t=ui(t,e.mode,n),t.return=e,t;case D:return t=xa(t),f(e,t,n)}if(ae(t)||k(t))return t=ci(t,e.mode,n,null),t.return=e,t;if(typeof t.then==`function`)return f(e,Da(t),n);if(t.$$typeof===C)return f(e,Yi(e,t),n);ka(e,t)}return null}function p(e,t,n,r){var i=t===null?null:t.key;if(typeof n==`string`&&n!==``||typeof n==`number`||typeof n==`bigint`)return i===null?c(e,t,``+n,r):null;if(typeof n==`object`&&n){switch(n.$$typeof){case _:return n.key===i?l(e,t,n,r):null;case v:return n.key===i?u(e,t,n,r):null;case D:return n=xa(n),p(e,t,n,r)}if(ae(n)||k(n))return i===null?d(e,t,n,r,null):null;if(typeof n.then==`function`)return p(e,t,Da(n),r);if(n.$$typeof===C)return p(e,t,Yi(e,n),r);ka(e,n)}return null}function m(e,t,n,r,i){if(typeof r==`string`&&r!==``||typeof r==`number`||typeof r==`bigint`)return e=e.get(n)||null,c(t,e,``+r,i);if(typeof r==`object`&&r){switch(r.$$typeof){case _:return e=e.get(r.key===null?n:r.key)||null,l(t,e,r,i);case v:return e=e.get(r.key===null?n:r.key)||null,u(t,e,r,i);case D:return r=xa(r),m(e,t,n,r,i)}if(ae(r)||k(r))return e=e.get(n)||null,d(t,e,r,i,null);if(typeof r.then==`function`)return m(e,t,n,Da(r),i);if(r.$$typeof===C)return m(e,t,n,Yi(t,r),i);ka(t,r)}return null}function h(i,a,s,c){for(var l=null,u=null,d=a,h=a=0,g=null;d!==null&&h<s.length;h++){d.index>h?(g=d,d=null):g=d.sibling;var _=p(i,d,s[h],c);if(_===null){d===null&&(d=g);break}e&&d&&_.alternate===null&&t(i,d),a=o(_,a,h),u===null?l=_:u.sibling=_,u=_,d=g}if(h===s.length)return n(i,d),K&&Si(i,h),l;if(d===null){for(;h<s.length;h++)d=f(i,s[h],c),d!==null&&(a=o(d,a,h),u===null?l=d:u.sibling=d,u=d);return K&&Si(i,h),l}for(d=r(d);h<s.length;h++)g=m(d,i,h,s[h],c),g!==null&&(e&&g.alternate!==null&&d.delete(g.key===null?h:g.key),a=o(g,a,h),u===null?l=g:u.sibling=g,u=g);return e&&d.forEach(function(e){return t(i,e)}),K&&Si(i,h),l}function g(a,s,c,l){if(c==null)throw Error(i(151));for(var u=null,d=null,h=s,g=s=0,_=null,v=c.next();h!==null&&!v.done;g++,v=c.next()){h.index>g?(_=h,h=null):_=h.sibling;var y=p(a,h,v.value,l);if(y===null){h===null&&(h=_);break}e&&h&&y.alternate===null&&t(a,h),s=o(y,s,g),d===null?u=y:d.sibling=y,d=y,h=_}if(v.done)return n(a,h),K&&Si(a,g),u;if(h===null){for(;!v.done;g++,v=c.next())v=f(a,v.value,l),v!==null&&(s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return K&&Si(a,g),u}for(h=r(h);!v.done;g++,v=c.next())v=m(h,a,g,v.value,l),v!==null&&(e&&v.alternate!==null&&h.delete(v.key===null?g:v.key),s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return e&&h.forEach(function(e){return t(a,e)}),K&&Si(a,g),u}function b(e,r,o,c){if(typeof o==`object`&&o&&o.type===y&&o.key===null&&(o=o.props.children),typeof o==`object`&&o){switch(o.$$typeof){case _:a:{for(var l=o.key;r!==null;){if(r.key===l){if(l=o.type,l===y){if(r.tag===7){n(e,r.sibling),c=a(r,o.props.children),c.return=e,e=c;break a}}else if(r.elementType===l||typeof l==`object`&&l&&l.$$typeof===D&&xa(l)===r.type){n(e,r.sibling),c=a(r,o.props),Oa(c,o),c.return=e,e=c;break a}n(e,r);break}else t(e,r);r=r.sibling}o.type===y?(c=ci(o.props.children,e.mode,c,o.key),c.return=e,e=c):(c=si(o.type,o.key,o.props,null,e.mode,c),Oa(c,o),c.return=e,e=c)}return s(e);case v:a:{for(l=o.key;r!==null;){if(r.key===l)if(r.tag===4&&r.stateNode.containerInfo===o.containerInfo&&r.stateNode.implementation===o.implementation){n(e,r.sibling),c=a(r,o.children||[]),c.return=e,e=c;break a}else{n(e,r);break}else t(e,r);r=r.sibling}c=ui(o,e.mode,c),c.return=e,e=c}return s(e);case D:return o=xa(o),b(e,r,o,c)}if(ae(o))return h(e,r,o,c);if(k(o)){if(l=k(o),typeof l!=`function`)throw Error(i(150));return o=l.call(o),g(e,r,o,c)}if(typeof o.then==`function`)return b(e,r,Da(o),c);if(o.$$typeof===C)return b(e,r,Yi(e,o),c);ka(e,o)}return typeof o==`string`&&o!==``||typeof o==`number`||typeof o==`bigint`?(o=``+o,r!==null&&r.tag===6?(n(e,r.sibling),c=a(r,o),c.return=e,e=c):(n(e,r),c=W(o,e.mode,c),c.return=e,e=c),s(e)):n(e,r)}return function(e,t,n,r){try{Ea=0;var i=b(e,t,n,r);return Ta=null,i}catch(t){if(t===ha||t===_a)throw t;var a=ri(29,t,null,e.mode);return a.lanes=r,a.return=e,a}}}var ja=Aa(!0),Ma=Aa(!1),Na=!1;function Pa(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Fa(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Ia(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function La(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,J&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,t=U(e),ei(e,null,n),t}return Zr(e,r,t,n),U(e)}function Ra(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,n&4194048)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Ze(e,n)}}function za(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,callbacks:r.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var Ba=!1;function Va(){if(Ba){var e=oa;if(e!==null)throw e}}function Ha(e,t,n,r){Ba=!1;var i=e.updateQueue;Na=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var c=s,l=c.next;c.next=null,o===null?a=l:o.next=l,o=c;var u=e.alternate;u!==null&&(u=u.updateQueue,s=u.lastBaseUpdate,s!==o&&(s===null?u.firstBaseUpdate=l:s.next=l,u.lastBaseUpdate=c))}if(a!==null){var d=i.baseState;o=0,u=l=c=null,s=a;do{var f=s.lane&-536870913,p=f!==s.lane;if(p?(X&f)===f:(r&f)===f){f!==0&&f===aa&&(Ba=!0),u!==null&&(u=u.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});a:{var m=e,g=s;f=t;var _=n;switch(g.tag){case 1:if(m=g.payload,typeof m==`function`){d=m.call(_,d,f);break a}d=m;break a;case 3:m.flags=m.flags&-65537|128;case 0:if(m=g.payload,f=typeof m==`function`?m.call(_,d,f):m,f==null)break a;d=h({},d,f);break a;case 2:Na=!0}}f=s.callback,f!==null&&(e.flags|=64,p&&(e.flags|=8192),p=i.callbacks,p===null?i.callbacks=[f]:p.push(f))}else p={lane:f,tag:s.tag,payload:s.payload,callback:s.callback,next:null},u===null?(l=u=p,c=d):u=u.next=p,o|=f;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;p=s,s=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(1);u===null&&(c=d),i.baseState=c,i.firstBaseUpdate=l,i.lastBaseUpdate=u,a===null&&(i.shared.lanes=0),Wl|=o,e.lanes=o,e.memoizedState=d}}function Ua(e,t){if(typeof e!=`function`)throw Error(i(191,e));e.call(t)}function Wa(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)Ua(n[e],t)}var Ga=ce(null),Ka=ce(0);function qa(e,t){e=Hl,P(Ka,e),P(Ga,t),Hl=e|t.baseLanes}function Ja(){P(Ka,Hl),P(Ga,Ga.current)}function Ya(){Hl=Ka.current,N(Ga),N(Ka)}var Xa=ce(null),Za=null;function Qa(e){var t=e.alternate;P(ro,ro.current&1),P(Xa,e),Za===null&&(t===null||Ga.current!==null||t.memoizedState!==null)&&(Za=e)}function $a(e){P(ro,ro.current),P(Xa,e),Za===null&&(Za=e)}function eo(e){e.tag===22?(P(ro,ro.current),P(Xa,e),Za===null&&(Za=e)):to(e)}function to(){P(ro,ro.current),P(Xa,Xa.current)}function no(e){N(Xa),Za===e&&(Za=null),N(ro)}var ro=ce(0);function io(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||af(n)||of(n)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder===`forwards`||t.memoizedProps.revealOrder===`backwards`||t.memoizedProps.revealOrder===`unstable_legacy-backwards`||t.memoizedProps.revealOrder===`together`)){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var ao=0,q=null,oo=null,so=null,co=!1,lo=!1,uo=!1,fo=0,po=0,mo=null,ho=0;function go(){throw Error(i(321))}function _o(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!vr(e[n],t[n]))return!1;return!0}function vo(e,t,n,r,i,a){return ao=a,q=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,A.H=e===null||e.memoizedState===null?Fs:Is,uo=!1,a=n(r,i),uo=!1,lo&&(a=bo(t,n,r,i)),yo(e),a}function yo(e){A.H=Ps;var t=oo!==null&&oo.next!==null;if(ao=0,so=oo=q=null,co=!1,po=0,mo=null,t)throw Error(i(300));e===null||$s||(e=e.dependencies,e!==null&&Ki(e)&&($s=!0))}function bo(e,t,n,r){q=e;var a=0;do{if(lo&&(mo=null),po=0,lo=!1,25<=a)throw Error(i(301));if(a+=1,so=oo=null,e.updateQueue!=null){var o=e.updateQueue;o.lastEffect=null,o.events=null,o.stores=null,o.memoCache!=null&&(o.memoCache.index=0)}A.H=Ls,o=t(n,r)}while(lo);return o}function xo(){var e=A.H,t=e.useState()[0];return t=typeof t.then==`function`?Oo(t):t,e=e.useState()[0],(oo===null?null:oo.memoizedState)!==e&&(q.flags|=1024),t}function So(){var e=fo!==0;return fo=0,e}function Co(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function wo(e){if(co){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}co=!1}ao=0,so=oo=q=null,lo=!1,po=fo=0,mo=null}function To(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return so===null?q.memoizedState=so=e:so=so.next=e,so}function Eo(){if(oo===null){var e=q.alternate;e=e===null?null:e.memoizedState}else e=oo.next;var t=so===null?q.memoizedState:so.next;if(t!==null)so=t,oo=e;else{if(e===null)throw q.alternate===null?Error(i(467)):Error(i(310));oo=e,e={memoizedState:oo.memoizedState,baseState:oo.baseState,baseQueue:oo.baseQueue,queue:oo.queue,next:null},so===null?q.memoizedState=so=e:so=so.next=e}return so}function Do(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Oo(e){var t=po;return po+=1,mo===null&&(mo=[]),e=ba(mo,e,t),t=q,(so===null?t.memoizedState:so.next)===null&&(t=t.alternate,A.H=t===null||t.memoizedState===null?Fs:Is),e}function ko(e){if(typeof e==`object`&&e){if(typeof e.then==`function`)return Oo(e);if(e.$$typeof===C)return Ji(e)}throw Error(i(438,String(e)))}function Ao(e){var t=null,n=q.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var r=q.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(t??={data:[],index:0},n===null&&(n=Do(),q.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=O;return t.index++,n}function jo(e,t){return typeof t==`function`?t(e):t}function Mo(e){return No(Eo(),oo,e)}function No(e,t,n){var r=e.queue;if(r===null)throw Error(i(311));r.lastRenderedReducer=n;var a=e.baseQueue,o=r.pending;if(o!==null){if(a!==null){var s=a.next;a.next=o.next,o.next=s}t.baseQueue=a=o,r.pending=null}if(o=e.baseState,a===null)e.memoizedState=o;else{t=a.next;var c=s=null,l=null,u=t,d=!1;do{var f=u.lane&-536870913;if(f===u.lane?(ao&f)===f:(X&f)===f){var p=u.revertLane;if(p===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),f===aa&&(d=!0);else if((ao&p)===p){u=u.next,p===aa&&(d=!0);continue}else f={lane:0,revertLane:u.revertLane,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=f,s=o):l=l.next=f,q.lanes|=p,Wl|=p;f=u.action,uo&&n(o,f),o=u.hasEagerState?u.eagerState:n(o,f)}else p={lane:f,revertLane:u.revertLane,gesture:u.gesture,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=p,s=o):l=l.next=p,q.lanes|=f,Wl|=f;u=u.next}while(u!==null&&u!==t);if(l===null?s=o:l.next=c,!vr(o,e.memoizedState)&&($s=!0,d&&(n=oa,n!==null)))throw n;e.memoizedState=o,e.baseState=s,e.baseQueue=l,r.lastRenderedState=o}return a===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function Po(e){var t=Eo(),n=t.queue;if(n===null)throw Error(i(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,o=t.memoizedState;if(a!==null){n.pending=null;var s=a=a.next;do o=e(o,s.action),s=s.next;while(s!==a);vr(o,t.memoizedState)||($s=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function Fo(e,t,n){var r=q,a=Eo(),o=K;if(o){if(n===void 0)throw Error(i(407));n=n()}else n=t();var s=!vr((oo||a).memoizedState,n);if(s&&(a.memoizedState=n,$s=!0),a=a.queue,os(Ro.bind(null,r,a,e),[e]),a.getSnapshot!==t||s||so!==null&&so.memoizedState.tag&1){if(r.flags|=2048,ts(9,{destroy:void 0},Lo.bind(null,r,a,n,t),null),Ll===null)throw Error(i(349));o||ao&127||Io(r,t,n)}return n}function Io(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=q.updateQueue,t===null?(t=Do(),q.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Lo(e,t,n,r){t.value=n,t.getSnapshot=r,zo(t)&&Bo(e)}function Ro(e,t,n){return n(function(){zo(t)&&Bo(e)})}function zo(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!vr(e,n)}catch{return!0}}function Bo(e){var t=$r(e,2);t!==null&&mu(t,e,2)}function Vo(e){var t=To();if(typeof e==`function`){var n=e;if(e=n(),uo){Pe(!0);try{n()}finally{Pe(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:jo,lastRenderedState:e},t}function Ho(e,t,n,r){return e.baseState=n,No(e,oo,typeof r==`function`?r:jo)}function Uo(e,t,n,r,a){if(js(e))throw Error(i(485));if(e=t.action,e!==null){var o={payload:a,action:e,next:null,isTransition:!0,status:`pending`,value:null,reason:null,listeners:[],then:function(e){o.listeners.push(e)}};A.T===null?o.isTransition=!1:n(!0),r(o),n=t.pending,n===null?(o.next=t.pending=o,Wo(t,o)):(o.next=n.next,t.pending=n.next=o)}}function Wo(e,t){var n=t.action,r=t.payload,i=e.state;if(t.isTransition){var a=A.T,o={};A.T=o;try{var s=n(i,r),c=A.S;c!==null&&c(o,s),Go(e,t,s)}catch(n){qo(e,t,n)}finally{a!==null&&o.types!==null&&(a.types=o.types),A.T=a}}else try{a=n(i,r),Go(e,t,a)}catch(n){qo(e,t,n)}}function Go(e,t,n){typeof n==`object`&&n&&typeof n.then==`function`?n.then(function(n){Ko(e,t,n)},function(n){return qo(e,t,n)}):Ko(e,t,n)}function Ko(e,t,n){t.status=`fulfilled`,t.value=n,Jo(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,Wo(e,n)))}function qo(e,t,n){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do t.status=`rejected`,t.reason=n,Jo(t),t=t.next;while(t!==r)}e.action=null}function Jo(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Yo(e,t){return t}function Xo(e,t){if(K){var n=Ll.formState;if(n!==null){a:{var r=q;if(K){if(G){b:{for(var i=G,a=ki;i.nodeType!==8;){if(!a){i=null;break b}if(i=cf(i.nextSibling),i===null){i=null;break b}}a=i.data,i=a===`F!`||a===`F`?i:null}if(i){G=cf(i.nextSibling),r=i.data===`F!`;break a}}ji(r)}r=!1}r&&(t=n[0])}}return n=To(),n.memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Yo,lastRenderedState:t},n.queue=r,n=Os.bind(null,q,r),r.dispatch=n,r=Vo(!1),a=As.bind(null,q,!1,r.queue),r=To(),i={state:t,dispatch:null,action:e,pending:null},r.queue=i,n=Uo.bind(null,q,i,a,n),i.dispatch=n,r.memoizedState=e,[t,n,!1]}function Zo(e){return Qo(Eo(),oo,e)}function Qo(e,t,n){if(t=No(e,t,Yo)[0],e=Mo(jo)[0],typeof t==`object`&&t&&typeof t.then==`function`)try{var r=Oo(t)}catch(e){throw e===ha?_a:e}else r=t;t=Eo();var i=t.queue,a=i.dispatch;return n!==t.memoizedState&&(q.flags|=2048,ts(9,{destroy:void 0},$o.bind(null,i,n),null)),[r,a,e]}function $o(e,t){e.action=t}function es(e){var t=Eo(),n=oo;if(n!==null)return Qo(t,n,e);Eo(),t=t.memoizedState,n=Eo();var r=n.queue.dispatch;return n.memoizedState=e,[t,r,!1]}function ts(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},t=q.updateQueue,t===null&&(t=Do(),q.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function ns(){return Eo().memoizedState}function rs(e,t,n,r){var i=To();q.flags|=e,i.memoizedState=ts(1|t,{destroy:void 0},n,r===void 0?null:r)}function is(e,t,n,r){var i=Eo();r=r===void 0?null:r;var a=i.memoizedState.inst;oo!==null&&r!==null&&_o(r,oo.memoizedState.deps)?i.memoizedState=ts(t,a,n,r):(q.flags|=e,i.memoizedState=ts(1|t,a,n,r))}function as(e,t){rs(8390656,8,e,t)}function os(e,t){is(2048,8,e,t)}function ss(e){q.flags|=4;var t=q.updateQueue;if(t===null)t=Do(),q.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function cs(e){var t=Eo().memoizedState;return ss({ref:t,nextImpl:e}),function(){if(J&2)throw Error(i(440));return t.impl.apply(void 0,arguments)}}function ls(e,t){return is(4,2,e,t)}function us(e,t){return is(4,4,e,t)}function ds(e,t){if(typeof t==`function`){e=e();var n=t(e);return function(){typeof n==`function`?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function fs(e,t,n){n=n==null?null:n.concat([e]),is(4,4,ds.bind(null,t,e),n)}function ps(){}function ms(e,t){var n=Eo();t=t===void 0?null:t;var r=n.memoizedState;return t!==null&&_o(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function hs(e,t){var n=Eo();t=t===void 0?null:t;var r=n.memoizedState;if(t!==null&&_o(t,r[1]))return r[0];if(r=e(),uo){Pe(!0);try{e()}finally{Pe(!1)}}return n.memoizedState=[r,t],r}function gs(e,t,n){return n===void 0||ao&1073741824&&!(X&261930)?e.memoizedState=t:(e.memoizedState=n,e=pu(),q.lanes|=e,Wl|=e,n)}function _s(e,t,n,r){return vr(n,t)?n:Ga.current===null?!(ao&42)||ao&1073741824&&!(X&261930)?($s=!0,e.memoizedState=n):(e=pu(),q.lanes|=e,Wl|=e,t):(e=gs(e,n,r),vr(e,t)||($s=!0),e)}function vs(e,t,n,r,i){var a=j.p;j.p=a!==0&&8>a?a:8;var o=A.T,s={};A.T=s,As(e,!1,t,n);try{var c=i(),l=A.S;l!==null&&l(s,c),typeof c==`object`&&c&&typeof c.then==`function`?ks(e,t,la(c,r),fu(e)):ks(e,t,r,fu(e))}catch(n){ks(e,t,{then:function(){},status:`rejected`,reason:n},fu())}finally{j.p=a,o!==null&&s.types!==null&&(o.types=s.types),A.T=o}}function ys(){}function bs(e,t,n,r){if(e.tag!==5)throw Error(i(476));var a=xs(e).queue;vs(e,a,t,M,n===null?ys:function(){return Ss(e),n(r)})}function xs(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:M,baseState:M,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:jo,lastRenderedState:M},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:jo,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function Ss(e){var t=xs(e);t.next===null&&(t=e.alternate.memoizedState),ks(e,t.next.queue,{},fu())}function Cs(){return Ji(Qf)}function ws(){return Eo().memoizedState}function Ts(){return Eo().memoizedState}function Es(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=fu();e=Ia(n);var r=La(t,e,n);r!==null&&(mu(r,t,n),Ra(r,t,n)),t={cache:ta()},e.payload=t;return}t=t.return}}function Ds(e,t,n){var r=fu();n={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},js(e)?Ms(t,n):(n=Qr(e,t,n,r),n!==null&&(mu(n,e,r),Ns(n,t,r)))}function Os(e,t,n){ks(e,t,n,fu())}function ks(e,t,n,r){var i={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(js(e))Ms(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(i.hasEagerState=!0,i.eagerState=s,vr(s,o))return Zr(e,t,i,0),Ll===null&&Xr(),!1}catch{}if(n=Qr(e,t,i,r),n!==null)return mu(n,e,r),Ns(n,t,r),!0}return!1}function As(e,t,n,r){if(r={lane:2,revertLane:ud(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},js(e)){if(t)throw Error(i(479))}else t=Qr(e,n,r,2),t!==null&&mu(t,e,2)}function js(e){var t=e.alternate;return e===q||t!==null&&t===q}function Ms(e,t){lo=co=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Ns(e,t,n){if(n&4194048){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,Ze(e,n)}}var Ps={readContext:Ji,use:ko,useCallback:go,useContext:go,useEffect:go,useImperativeHandle:go,useLayoutEffect:go,useInsertionEffect:go,useMemo:go,useReducer:go,useRef:go,useState:go,useDebugValue:go,useDeferredValue:go,useTransition:go,useSyncExternalStore:go,useId:go,useHostTransitionStatus:go,useFormState:go,useActionState:go,useOptimistic:go,useMemoCache:go,useCacheRefresh:go};Ps.useEffectEvent=go;var Fs={readContext:Ji,use:ko,useCallback:function(e,t){return To().memoizedState=[e,t===void 0?null:t],e},useContext:Ji,useEffect:as,useImperativeHandle:function(e,t,n){n=n==null?null:n.concat([e]),rs(4194308,4,ds.bind(null,t,e),n)},useLayoutEffect:function(e,t){return rs(4194308,4,e,t)},useInsertionEffect:function(e,t){rs(4,2,e,t)},useMemo:function(e,t){var n=To();t=t===void 0?null:t;var r=e();if(uo){Pe(!0);try{e()}finally{Pe(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=To();if(n!==void 0){var i=n(t);if(uo){Pe(!0);try{n(t)}finally{Pe(!1)}}}else i=t;return r.memoizedState=r.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},r.queue=e,e=e.dispatch=Ds.bind(null,q,e),[r.memoizedState,e]},useRef:function(e){var t=To();return e={current:e},t.memoizedState=e},useState:function(e){e=Vo(e);var t=e.queue,n=Os.bind(null,q,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:ps,useDeferredValue:function(e,t){return gs(To(),e,t)},useTransition:function(){var e=Vo(!1);return e=vs.bind(null,q,e.queue,!0,!1),To().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=q,a=To();if(K){if(n===void 0)throw Error(i(407));n=n()}else{if(n=t(),Ll===null)throw Error(i(349));X&127||Io(r,t,n)}a.memoizedState=n;var o={value:n,getSnapshot:t};return a.queue=o,as(Ro.bind(null,r,o,e),[e]),r.flags|=2048,ts(9,{destroy:void 0},Lo.bind(null,r,o,n,t),null),n},useId:function(){var e=To(),t=Ll.identifierPrefix;if(K){var n=xi,r=bi;n=(r&~(1<<32-Fe(r)-1)).toString(32)+n,t=`_`+t+`R_`+n,n=fo++,0<n&&(t+=`H`+n.toString(32)),t+=`_`}else n=ho++,t=`_`+t+`r_`+n.toString(32)+`_`;return e.memoizedState=t},useHostTransitionStatus:Cs,useFormState:Xo,useActionState:Xo,useOptimistic:function(e){var t=To();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=As.bind(null,q,!0,n),n.dispatch=t,[e,t]},useMemoCache:Ao,useCacheRefresh:function(){return To().memoizedState=Es.bind(null,q)},useEffectEvent:function(e){var t=To(),n={impl:e};return t.memoizedState=n,function(){if(J&2)throw Error(i(440));return n.impl.apply(void 0,arguments)}}},Is={readContext:Ji,use:ko,useCallback:ms,useContext:Ji,useEffect:os,useImperativeHandle:fs,useInsertionEffect:ls,useLayoutEffect:us,useMemo:hs,useReducer:Mo,useRef:ns,useState:function(){return Mo(jo)},useDebugValue:ps,useDeferredValue:function(e,t){return _s(Eo(),oo.memoizedState,e,t)},useTransition:function(){var e=Mo(jo)[0],t=Eo().memoizedState;return[typeof e==`boolean`?e:Oo(e),t]},useSyncExternalStore:Fo,useId:ws,useHostTransitionStatus:Cs,useFormState:Zo,useActionState:Zo,useOptimistic:function(e,t){return Ho(Eo(),oo,e,t)},useMemoCache:Ao,useCacheRefresh:Ts};Is.useEffectEvent=cs;var Ls={readContext:Ji,use:ko,useCallback:ms,useContext:Ji,useEffect:os,useImperativeHandle:fs,useInsertionEffect:ls,useLayoutEffect:us,useMemo:hs,useReducer:Po,useRef:ns,useState:function(){return Po(jo)},useDebugValue:ps,useDeferredValue:function(e,t){var n=Eo();return oo===null?gs(n,e,t):_s(n,oo.memoizedState,e,t)},useTransition:function(){var e=Po(jo)[0],t=Eo().memoizedState;return[typeof e==`boolean`?e:Oo(e),t]},useSyncExternalStore:Fo,useId:ws,useHostTransitionStatus:Cs,useFormState:es,useActionState:es,useOptimistic:function(e,t){var n=Eo();return oo===null?(n.baseState=e,[e,n.queue.dispatch]):Ho(n,oo,e,t)},useMemoCache:Ao,useCacheRefresh:Ts};Ls.useEffectEvent=cs;function Rs(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:h({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var zs={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=fu(),i=Ia(r);i.payload=t,n!=null&&(i.callback=n),t=La(e,i,r),t!==null&&(mu(t,e,r),Ra(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=fu(),i=Ia(r);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=La(e,i,r),t!==null&&(mu(t,e,r),Ra(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=fu(),r=Ia(n);r.tag=2,t!=null&&(r.callback=t),t=La(e,r,n),t!==null&&(mu(t,e,n),Ra(t,e,n))}};function Bs(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate==`function`?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!yr(n,r)||!yr(i,a):!0}function Vs(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps==`function`&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps==`function`&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&zs.enqueueReplaceState(t,t.state,null)}function Hs(e,t){var n=t;if(`ref`in t)for(var r in n={},t)r!==`ref`&&(n[r]=t[r]);if(e=e.defaultProps)for(var i in n===t&&(n=h({},n)),e)n[i]===void 0&&(n[i]=e[i]);return n}function Us(e){Kr(e)}function Ws(e){console.error(e)}function Gs(e){Kr(e)}function Ks(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(e){setTimeout(function(){throw e})}}function qs(e,t,n){try{var r=e.onCaughtError;r(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(e){setTimeout(function(){throw e})}}function Js(e,t,n){return n=Ia(n),n.tag=3,n.payload={element:null},n.callback=function(){Ks(e,t)},n}function Ys(e){return e=Ia(e),e.tag=3,e}function Xs(e,t,n,r){var i=n.type.getDerivedStateFromError;if(typeof i==`function`){var a=r.value;e.payload=function(){return i(a)},e.callback=function(){qs(t,n,r)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch==`function`&&(e.callback=function(){qs(t,n,r),typeof i!=`function`&&(nu===null?nu=new Set([this]):nu.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:e===null?``:e})})}function Zs(e,t,n,r,a){if(n.flags|=32768,typeof r==`object`&&r&&typeof r.then==`function`){if(t=n.alternate,t!==null&&Gi(t,n,a,!0),n=Xa.current,n!==null){switch(n.tag){case 31:case 13:return Za===null?Eu():n.alternate===null&&Ul===0&&(Ul=3),n.flags&=-257,n.flags|=65536,n.lanes=a,r===va?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([r]):t.add(r),Wu(e,r,a)),!1;case 22:return n.flags|=65536,r===va?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([r]):n.add(r)),Wu(e,r,a)),!1}throw Error(i(435,n.tag))}return Wu(e,r,a),Eu(),!1}if(K)return t=Xa.current,t===null?(r!==Ai&&(t=Error(i(423),{cause:r}),Li(fi(t,n))),e=e.current.alternate,e.flags|=65536,a&=-a,e.lanes|=a,r=fi(r,n),a=Js(e.stateNode,r,a),za(e,a),Ul!==4&&(Ul=2)):(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=a,r!==Ai&&(e=Error(i(422),{cause:r}),Li(fi(e,n)))),!1;var o=Error(i(520),{cause:r});if(o=fi(o,n),Yl===null?Yl=[o]:Yl.push(o),Ul!==4&&(Ul=2),t===null)return!0;r=fi(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=a&-a,n.lanes|=e,e=Js(n.stateNode,r,e),za(n,e),!1;case 1:if(t=n.type,o=n.stateNode,!(n.flags&128)&&(typeof t.getDerivedStateFromError==`function`||o!==null&&typeof o.componentDidCatch==`function`&&(nu===null||!nu.has(o))))return n.flags|=65536,a&=-a,n.lanes|=a,a=Ys(a),Xs(a,e,n,r),za(n,a),!1}n=n.return}while(n!==null);return!1}var Qs=Error(i(461)),$s=!1;function ec(e,t,n,r){t.child=e===null?Ma(t,null,n,r):ja(t,e.child,n,r)}function tc(e,t,n,r,i){n=n.render;var a=t.ref;if(`ref`in r){var o={};for(var s in r)s!==`ref`&&(o[s]=r[s])}else o=r;return qi(t),r=vo(e,t,n,o,a,i),s=So(),e!==null&&!$s?(Co(e,t,i),Tc(e,t,i)):(K&&s&&wi(t),t.flags|=1,ec(e,t,r,i),t.child)}function nc(e,t,n,r,i){if(e===null){var a=n.type;return typeof a==`function`&&!ii(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,rc(e,t,a,r,i)):(e=si(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!Ec(e,i)){var o=a.memoizedProps;if(n=n.compare,n=n===null?yr:n,n(o,r)&&e.ref===t.ref)return Tc(e,t,i)}return t.flags|=1,e=ai(a,r),e.ref=t.ref,e.return=t,t.child=e}function rc(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(yr(a,r)&&e.ref===t.ref)if($s=!1,t.pendingProps=r=a,Ec(e,i))e.flags&131072&&($s=!0);else return t.lanes=e.lanes,Tc(e,t,i)}return dc(e,t,n,r,i)}function ic(e,t,n,r){var i=r.children,a=e===null?null:e.memoizedState;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode===`hidden`){if(t.flags&128){if(a=a===null?n:a.baseLanes|n,e!==null){for(r=t.child=e.child,i=0;r!==null;)i=i|r.lanes|r.childLanes,r=r.sibling;r=i&~a}else r=0,t.child=null;return oc(e,t,a,n,r)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&pa(t,a===null?null:a.cachePool),a===null?Ja():qa(t,a),eo(t);else return r=t.lanes=536870912,oc(e,t,a===null?n:a.baseLanes|n,n,r)}else a===null?(e!==null&&pa(t,null),Ja(),to(t)):(pa(t,a.cachePool),qa(t,a),to(t),t.memoizedState=null);return ec(e,t,i,n),t.child}function ac(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function oc(e,t,n,r,i){var a=fa();return a=a===null?null:{parent:ea._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&pa(t,null),Ja(),eo(t),e!==null&&Gi(e,t,r,!0),t.childLanes=i,null}function sc(e,t){return t=bc({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function cc(e,t,n){return ja(t,e.child,null,n),e=sc(t,t.pendingProps),e.flags|=2,no(t),t.memoizedState=null,e}function lc(e,t,n){var r=t.pendingProps,a=(t.flags&128)!=0;if(t.flags&=-129,e===null){if(K){if(r.mode===`hidden`)return e=sc(t,r),t.lanes=536870912,ac(null,e);if($a(t),(e=G)?(e=rf(e,ki),e=e!==null&&e.data===`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:yi===null?null:{id:bi,overflow:xi},retryLane:536870912,hydrationErrors:null},n=li(e),n.return=t,t.child=n,Di=t,G=null)):e=null,e===null)throw ji(t);return t.lanes=536870912,null}return sc(t,r)}var o=e.memoizedState;if(o!==null){var s=o.dehydrated;if($a(t),a)if(t.flags&256)t.flags&=-257,t=cc(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(i(558));else if($s||Gi(e,t,n,!1),a=(n&e.childLanes)!==0,$s||a){if(r=Ll,r!==null&&(s=Qe(r,n),s!==0&&s!==o.retryLane))throw o.retryLane=s,$r(e,s),mu(r,e,s),Qs;Eu(),t=cc(e,t,n)}else e=o.treeContext,G=cf(s.nextSibling),Di=t,K=!0,Oi=null,ki=!1,e!==null&&Ei(t,e),t=sc(t,r),t.flags|=4096;return t}return e=ai(e.child,{mode:r.mode,children:r.children}),e.ref=t.ref,t.child=e,e.return=t,e}function uc(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!=`function`&&typeof n!=`object`)throw Error(i(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function dc(e,t,n,r,i){return qi(t),n=vo(e,t,n,r,void 0,i),r=So(),e!==null&&!$s?(Co(e,t,i),Tc(e,t,i)):(K&&r&&wi(t),t.flags|=1,ec(e,t,n,i),t.child)}function fc(e,t,n,r,i,a){return qi(t),t.updateQueue=null,n=bo(t,r,n,i),yo(e),r=So(),e!==null&&!$s?(Co(e,t,a),Tc(e,t,a)):(K&&r&&wi(t),t.flags|=1,ec(e,t,n,a),t.child)}function pc(e,t,n,r,i){if(qi(t),t.stateNode===null){var a=ti,o=n.contextType;typeof o==`object`&&o&&(a=Ji(o)),a=new n(r,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=zs,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=r,a.state=t.memoizedState,a.refs={},Pa(t),o=n.contextType,a.context=typeof o==`object`&&o?Ji(o):ti,a.state=t.memoizedState,o=n.getDerivedStateFromProps,typeof o==`function`&&(Rs(t,n,o,r),a.state=t.memoizedState),typeof n.getDerivedStateFromProps==`function`||typeof a.getSnapshotBeforeUpdate==`function`||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(o=a.state,typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount(),o!==a.state&&zs.enqueueReplaceState(a,a.state,null),Ha(t,r,a,i),Va(),a.state=t.memoizedState),typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!0}else if(e===null){a=t.stateNode;var s=t.memoizedProps,c=Hs(n,s);a.props=c;var l=a.context,u=n.contextType;o=ti,typeof u==`object`&&u&&(o=Ji(u));var d=n.getDerivedStateFromProps;u=typeof d==`function`||typeof a.getSnapshotBeforeUpdate==`function`,s=t.pendingProps!==s,u||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(s||l!==o)&&Vs(t,a,r,o),Na=!1;var f=t.memoizedState;a.state=f,Ha(t,r,a,i),Va(),l=t.memoizedState,s||f!==l||Na?(typeof d==`function`&&(Rs(t,n,d,r),l=t.memoizedState),(c=Na||Bs(t,n,c,r,f,l,o))?(u||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount==`function`&&(t.flags|=4194308)):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=o,r=c):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,Fa(e,t),o=t.memoizedProps,u=Hs(n,o),a.props=u,d=t.pendingProps,f=a.context,l=n.contextType,c=ti,typeof l==`object`&&l&&(c=Ji(l)),s=n.getDerivedStateFromProps,(l=typeof s==`function`||typeof a.getSnapshotBeforeUpdate==`function`)||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(o!==d||f!==c)&&Vs(t,a,r,c),Na=!1,f=t.memoizedState,a.state=f,Ha(t,r,a,i),Va();var p=t.memoizedState;o!==d||f!==p||Na||e!==null&&e.dependencies!==null&&Ki(e.dependencies)?(typeof s==`function`&&(Rs(t,n,s,r),p=t.memoizedState),(u=Na||Bs(t,n,u,r,f,p,c)||e!==null&&e.dependencies!==null&&Ki(e.dependencies))?(l||typeof a.UNSAFE_componentWillUpdate!=`function`&&typeof a.componentWillUpdate!=`function`||(typeof a.componentWillUpdate==`function`&&a.componentWillUpdate(r,p,c),typeof a.UNSAFE_componentWillUpdate==`function`&&a.UNSAFE_componentWillUpdate(r,p,c)),typeof a.componentDidUpdate==`function`&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate==`function`&&(t.flags|=1024)):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=p),a.props=r,a.state=p,a.context=c,r=u):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return a=r,uc(e,t),r=(t.flags&128)!=0,a||r?(a=t.stateNode,n=r&&typeof n.getDerivedStateFromError!=`function`?null:a.render(),t.flags|=1,e!==null&&r?(t.child=ja(t,e.child,null,i),t.child=ja(t,null,n,i)):ec(e,t,n,i),t.memoizedState=a.state,e=t.child):e=Tc(e,t,i),e}function mc(e,t,n,r){return Fi(),t.flags|=256,ec(e,t,n,r),t.child}var hc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function gc(e){return{baseLanes:e,cachePool:ma()}}function _c(e,t,n){return e=e===null?0:e.childLanes&~n,t&&(e|=ql),e}function vc(e,t,n){var r=t.pendingProps,a=!1,o=(t.flags&128)!=0,s;if((s=o)||(s=e!==null&&e.memoizedState===null?!1:(ro.current&2)!=0),s&&(a=!0,t.flags&=-129),s=(t.flags&32)!=0,t.flags&=-33,e===null){if(K){if(a?Qa(t):to(t),(e=G)?(e=rf(e,ki),e=e!==null&&e.data!==`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:yi===null?null:{id:bi,overflow:xi},retryLane:536870912,hydrationErrors:null},n=li(e),n.return=t,t.child=n,Di=t,G=null)):e=null,e===null)throw ji(t);return of(e)?t.lanes=32:t.lanes=536870912,null}var c=r.children;return r=r.fallback,a?(to(t),a=t.mode,c=bc({mode:`hidden`,children:c},a),r=ci(r,a,n,null),c.return=t,r.return=t,c.sibling=r,t.child=c,r=t.child,r.memoizedState=gc(n),r.childLanes=_c(e,s,n),t.memoizedState=hc,ac(null,r)):(Qa(t),yc(t,c))}var l=e.memoizedState;if(l!==null&&(c=l.dehydrated,c!==null)){if(o)t.flags&256?(Qa(t),t.flags&=-257,t=xc(e,t,n)):t.memoizedState===null?(to(t),c=r.fallback,a=t.mode,r=bc({mode:`visible`,children:r.children},a),c=ci(c,a,n,null),c.flags|=2,r.return=t,c.return=t,r.sibling=c,t.child=r,ja(t,e.child,null,n),r=t.child,r.memoizedState=gc(n),r.childLanes=_c(e,s,n),t.memoizedState=hc,t=ac(null,r)):(to(t),t.child=e.child,t.flags|=128,t=null);else if(Qa(t),of(c)){if(s=c.nextSibling&&c.nextSibling.dataset,s)var u=s.dgst;s=u,r=Error(i(419)),r.stack=``,r.digest=s,Li({value:r,source:null,stack:null}),t=xc(e,t,n)}else if($s||Gi(e,t,n,!1),s=(n&e.childLanes)!==0,$s||s){if(s=Ll,s!==null&&(r=Qe(s,n),r!==0&&r!==l.retryLane))throw l.retryLane=r,$r(e,r),mu(s,e,r),Qs;af(c)||Eu(),t=xc(e,t,n)}else af(c)?(t.flags|=192,t.child=e.child,t=null):(e=l.treeContext,G=cf(c.nextSibling),Di=t,K=!0,Oi=null,ki=!1,e!==null&&Ei(t,e),t=yc(t,r.children),t.flags|=4096);return t}return a?(to(t),c=r.fallback,a=t.mode,l=e.child,u=l.sibling,r=ai(l,{mode:`hidden`,children:r.children}),r.subtreeFlags=l.subtreeFlags&65011712,u===null?(c=ci(c,a,n,null),c.flags|=2):c=ai(u,c),c.return=t,r.return=t,r.sibling=c,t.child=r,ac(null,r),r=t.child,c=e.child.memoizedState,c===null?c=gc(n):(a=c.cachePool,a===null?a=ma():(l=ea._currentValue,a=a.parent===l?a:{parent:l,pool:l}),c={baseLanes:c.baseLanes|n,cachePool:a}),r.memoizedState=c,r.childLanes=_c(e,s,n),t.memoizedState=hc,ac(e.child,r)):(Qa(t),n=e.child,e=n.sibling,n=ai(n,{mode:`visible`,children:r.children}),n.return=t,n.sibling=null,e!==null&&(s=t.deletions,s===null?(t.deletions=[e],t.flags|=16):s.push(e)),t.child=n,t.memoizedState=null,n)}function yc(e,t){return t=bc({mode:`visible`,children:t},e.mode),t.return=e,e.child=t}function bc(e,t){return e=ri(22,e,null,t),e.lanes=0,e}function xc(e,t,n){return ja(t,e.child,null,n),e=yc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Sc(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Ui(e.return,t,n)}function Cc(e,t,n,r,i,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i,treeForkCount:a}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i,o.treeForkCount=a)}function wc(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;r=r.children;var o=ro.current,s=(o&2)!=0;if(s?(o=o&1|2,t.flags|=128):o&=1,P(ro,o),ec(e,t,r,n),r=K?gi:0,!s&&e!==null&&e.flags&128)a:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Sc(e,n,t);else if(e.tag===19)Sc(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break a;for(;e.sibling===null;){if(e.return===null||e.return===t)break a;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case`forwards`:for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&io(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),Cc(t,!1,i,n,a,r);break;case`backwards`:case`unstable_legacy-backwards`:for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&io(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}Cc(t,!0,n,null,a,r);break;case`together`:Cc(t,!1,null,null,void 0,r);break;default:t.memoizedState=null}return t.child}function Tc(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Wl|=t.lanes,(n&t.childLanes)===0)if(e!==null){if(Gi(e,t,n,!1),(n&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(i(153));if(t.child!==null){for(e=t.child,n=ai(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=ai(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Ec(e,t){return(e.lanes&t)===0?(e=e.dependencies,!!(e!==null&&Ki(e))):!0}function Dc(e,t,n){switch(t.tag){case 3:L(t,t.stateNode.containerInfo),Vi(t,ea,e.memoizedState.cache),Fi();break;case 27:case 5:fe(t);break;case 4:L(t,t.stateNode.containerInfo);break;case 10:Vi(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,$a(t),null;break;case 13:var r=t.memoizedState;if(r!==null)return r.dehydrated===null?(n&t.child.childLanes)===0?(Qa(t),e=Tc(e,t,n),e===null?null:e.sibling):vc(e,t,n):(Qa(t),t.flags|=128,null);Qa(t);break;case 19:var i=(e.flags&128)!=0;if(r=(n&t.childLanes)!==0,r||=(Gi(e,t,n,!1),(n&t.childLanes)!==0),i){if(r)return wc(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),P(ro,ro.current),r)break;return null;case 22:return t.lanes=0,ic(e,t,n,t.pendingProps);case 24:Vi(t,ea,e.memoizedState.cache)}return Tc(e,t,n)}function Oc(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps)$s=!0;else{if(!Ec(e,n)&&!(t.flags&128))return $s=!1,Dc(e,t,n);$s=!!(e.flags&131072)}else $s=!1,K&&t.flags&1048576&&Ci(t,gi,t.index);switch(t.lanes=0,t.tag){case 16:a:{var r=t.pendingProps;if(e=xa(t.elementType),t.type=e,typeof e==`function`)ii(e)?(r=Hs(e,r),t.tag=1,t=pc(null,t,e,r,n)):(t.tag=0,t=dc(null,t,e,r,n));else{if(e!=null){var a=e.$$typeof;if(a===w){t.tag=11,t=tc(null,t,e,r,n);break a}else if(a===E){t.tag=14,t=nc(null,t,e,r,n);break a}}throw t=ie(e)||e,Error(i(306,t,``))}}return t;case 0:return dc(e,t,t.type,t.pendingProps,n);case 1:return r=t.type,a=Hs(r,t.pendingProps),pc(e,t,r,a,n);case 3:a:{if(L(t,t.stateNode.containerInfo),e===null)throw Error(i(387));r=t.pendingProps;var o=t.memoizedState;a=o.element,Fa(e,t),Ha(t,r,null,n);var s=t.memoizedState;if(r=s.cache,Vi(t,ea,r),r!==o.cache&&Wi(t,[ea],n,!0),Va(),r=s.element,o.isDehydrated)if(o={element:r,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){t=mc(e,t,r,n);break a}else if(r!==a){a=fi(Error(i(424)),t),Li(a),t=mc(e,t,r,n);break a}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName===`HTML`?e.ownerDocument.body:e}for(G=cf(e.firstChild),Di=t,K=!0,Oi=null,ki=!0,n=Ma(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(Fi(),r===a){t=Tc(e,t,n);break a}ec(e,t,r,n)}t=t.child}return t;case 26:return uc(e,t),e===null?(n=kf(t.type,null,t.pendingProps,null))?t.memoizedState=n:K||(n=t.type,e=t.pendingProps,r=Bd(I.current).createElement(n),r[it]=t,r[at]=e,Pd(r,n,e),_t(r),t.stateNode=r):t.memoizedState=kf(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return fe(t),e===null&&K&&(r=t.stateNode=ff(t.type,t.pendingProps,I.current),Di=t,ki=!0,a=G,Zd(t.type)?(lf=a,G=cf(r.firstChild)):G=a),ec(e,t,t.pendingProps.children,n),uc(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&K&&((a=r=G)&&(r=tf(r,t.type,t.pendingProps,ki),r===null?a=!1:(t.stateNode=r,Di=t,G=cf(r.firstChild),ki=!1,a=!0)),a||ji(t)),fe(t),a=t.type,o=t.pendingProps,s=e===null?null:e.memoizedProps,r=o.children,Ud(a,o)?r=null:s!==null&&Ud(a,s)&&(t.flags|=32),t.memoizedState!==null&&(a=vo(e,t,xo,null,null,n),Qf._currentValue=a),uc(e,t),ec(e,t,r,n),t.child;case 6:return e===null&&K&&((e=n=G)&&(n=nf(n,t.pendingProps,ki),n===null?e=!1:(t.stateNode=n,Di=t,G=null,e=!0)),e||ji(t)),null;case 13:return vc(e,t,n);case 4:return L(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=ja(t,null,r,n):ec(e,t,r,n),t.child;case 11:return tc(e,t,t.type,t.pendingProps,n);case 7:return ec(e,t,t.pendingProps,n),t.child;case 8:return ec(e,t,t.pendingProps.children,n),t.child;case 12:return ec(e,t,t.pendingProps.children,n),t.child;case 10:return r=t.pendingProps,Vi(t,t.type,r.value),ec(e,t,r.children,n),t.child;case 9:return a=t.type._context,r=t.pendingProps.children,qi(t),a=Ji(a),r=r(a),t.flags|=1,ec(e,t,r,n),t.child;case 14:return nc(e,t,t.type,t.pendingProps,n);case 15:return rc(e,t,t.type,t.pendingProps,n);case 19:return wc(e,t,n);case 31:return lc(e,t,n);case 22:return ic(e,t,n,t.pendingProps);case 24:return qi(t),r=Ji(ea),e===null?(a=fa(),a===null&&(a=Ll,o=ta(),a.pooledCache=o,o.refCount++,o!==null&&(a.pooledCacheLanes|=n),a=o),t.memoizedState={parent:r,cache:a},Pa(t),Vi(t,ea,a)):((e.lanes&n)!==0&&(Fa(e,t),Ha(t,null,null,n),Va()),a=e.memoizedState,o=t.memoizedState,a.parent===r?(r=o.cache,Vi(t,ea,r),r!==a.cache&&Wi(t,[ea],n,!0)):(a={parent:r,cache:r},t.memoizedState=a,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=a),Vi(t,ea,r))),ec(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(i(156,t.tag))}function kc(e){e.flags|=4}function Ac(e,t,n,r,i){if((t=(e.mode&32)!=0)&&(t=!1),t){if(e.flags|=16777216,(i&335544128)===i)if(e.stateNode.complete)e.flags|=8192;else if(Cu())e.flags|=8192;else throw Sa=va,ga}else e.flags&=-16777217}function jc(e,t){if(t.type!==`stylesheet`||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!Wf(t))if(Cu())e.flags|=8192;else throw Sa=va,ga}function Mc(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag===22?536870912:Ke(),e.lanes|=t,Jl|=t)}function Nc(e,t){if(!K)switch(e.tailMode){case`hidden`:t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case`collapsed`:n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function Pc(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&65011712,r|=i.flags&65011712,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Fc(e,t,n){var r=t.pendingProps;switch(Ti(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Pc(t),null;case 1:return Pc(t),null;case 3:return n=t.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),Hi(ea),de(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(Pi(t)?kc(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Ii())),Pc(t),null;case 26:var a=t.type,o=t.memoizedState;return e===null?(kc(t),o===null?(Pc(t),Ac(t,a,null,r,n)):(Pc(t),jc(t,o))):o?o===e.memoizedState?(Pc(t),t.flags&=-16777217):(kc(t),Pc(t),jc(t,o)):(e=e.memoizedProps,e!==r&&kc(t),Pc(t),Ac(t,a,e,r,n)),null;case 27:if(pe(t),n=I.current,a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&kc(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return Pc(t),null}e=F.current,Pi(t)?Mi(t,e):(e=ff(a,r,n),t.stateNode=e,kc(t))}return Pc(t),null;case 5:if(pe(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&kc(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return Pc(t),null}if(o=F.current,Pi(t))Mi(t,o);else{var s=Bd(I.current);switch(o){case 1:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case 2:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;default:switch(a){case`svg`:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case`math`:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;case`script`:o=s.createElement(`div`),o.innerHTML=`<script><\/script>`,o=o.removeChild(o.firstChild);break;case`select`:o=typeof r.is==`string`?s.createElement(`select`,{is:r.is}):s.createElement(`select`),r.multiple?o.multiple=!0:r.size&&(o.size=r.size);break;default:o=typeof r.is==`string`?s.createElement(a,{is:r.is}):s.createElement(a)}}o[it]=t,o[at]=r;a:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)o.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break a;for(;s.sibling===null;){if(s.return===null||s.return===t)break a;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=o;a:switch(Pd(o,a,r),a){case`button`:case`input`:case`select`:case`textarea`:r=!!r.autoFocus;break a;case`img`:r=!0;break a;default:r=!1}r&&kc(t)}}return Pc(t),Ac(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==r&&kc(t);else{if(typeof r!=`string`&&t.stateNode===null)throw Error(i(166));if(e=I.current,Pi(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,a=Di,a!==null)switch(a.tag){case 27:case 5:r=a.memoizedProps}e[it]=t,e=!!(e.nodeValue===n||r!==null&&!0===r.suppressHydrationWarning||jd(e.nodeValue,n)),e||ji(t,!0)}else e=Bd(e).createTextNode(r),e[it]=t,t.stateNode=e}return Pc(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(r=Pi(t),n!==null){if(e===null){if(!r)throw Error(i(318));if(e=t.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(557));e[it]=t}else Fi(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Pc(t),e=!1}else n=Ii(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(no(t),t):(no(t),null);if(t.flags&128)throw Error(i(558))}return Pc(t),null;case 13:if(r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(a=Pi(t),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(i(318));if(a=t.memoizedState,a=a===null?null:a.dehydrated,!a)throw Error(i(317));a[it]=t}else Fi(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Pc(t),a=!1}else a=Ii(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return t.flags&256?(no(t),t):(no(t),null)}return no(t),t.flags&128?(t.lanes=n,t):(n=r!==null,e=e!==null&&e.memoizedState!==null,n&&(r=t.child,a=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(a=r.alternate.memoizedState.cachePool.pool),o=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(o=r.memoizedState.cachePool.pool),o!==a&&(r.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),Mc(t,t.updateQueue),Pc(t),null);case 4:return de(),e===null&&xd(t.stateNode.containerInfo),Pc(t),null;case 10:return Hi(t.type),Pc(t),null;case 19:if(N(ro),r=t.memoizedState,r===null)return Pc(t),null;if(a=(t.flags&128)!=0,o=r.rendering,o===null)if(a)Nc(r,!1);else{if(Ul!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=io(e),o!==null){for(t.flags|=128,Nc(r,!1),e=o.updateQueue,t.updateQueue=e,Mc(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)oi(n,e),n=n.sibling;return P(ro,ro.current&1|2),K&&Si(t,r.treeForkCount),t.child}e=e.sibling}r.tail!==null&&z()>eu&&(t.flags|=128,a=!0,Nc(r,!1),t.lanes=4194304)}else{if(!a)if(e=io(o),e!==null){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,Mc(t,e),Nc(r,!0),r.tail===null&&r.tailMode===`hidden`&&!o.alternate&&!K)return Pc(t),null}else 2*z()-r.renderingStartTime>eu&&n!==536870912&&(t.flags|=128,a=!0,Nc(r,!1),t.lanes=4194304);r.isBackwards?(o.sibling=t.child,t.child=o):(e=r.last,e===null?t.child=o:e.sibling=o,r.last=o)}return r.tail===null?(Pc(t),null):(e=r.tail,r.rendering=e,r.tail=e.sibling,r.renderingStartTime=z(),e.sibling=null,n=ro.current,P(ro,a?n&1|2:n&1),K&&Si(t,r.treeForkCount),e);case 22:case 23:return no(t),Ya(),r=t.memoizedState!==null,e===null?r&&(t.flags|=8192):e.memoizedState!==null!==r&&(t.flags|=8192),r?n&536870912&&!(t.flags&128)&&(Pc(t),t.subtreeFlags&6&&(t.flags|=8192)):Pc(t),n=t.updateQueue,n!==null&&Mc(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),r=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),e!==null&&N(da),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),Hi(ea),Pc(t),null;case 25:return null;case 30:return null}throw Error(i(156,t.tag))}function Ic(e,t){switch(Ti(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Hi(ea),de(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return pe(t),null;case 31:if(t.memoizedState!==null){if(no(t),t.alternate===null)throw Error(i(340));Fi()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(no(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(i(340));Fi()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return N(ro),null;case 4:return de(),null;case 10:return Hi(t.type),null;case 22:case 23:return no(t),Ya(),e!==null&&N(da),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Hi(ea),null;case 25:return null;default:return null}}function Lc(e,t){switch(Ti(t),t.tag){case 3:Hi(ea),de();break;case 26:case 27:case 5:pe(t);break;case 4:de();break;case 31:t.memoizedState!==null&&no(t);break;case 13:no(t);break;case 19:N(ro);break;case 10:Hi(t.type);break;case 22:case 23:no(t),Ya(),e!==null&&N(da);break;case 24:Hi(ea)}}function Rc(e,t){try{var n=t.updateQueue,r=n===null?null:n.lastEffect;if(r!==null){var i=r.next;n=i;do{if((n.tag&e)===e){r=void 0;var a=n.create,o=n.inst;r=a(),o.destroy=r}n=n.next}while(n!==i)}}catch(e){Q(t,t.return,e)}}function zc(e,t,n){try{var r=t.updateQueue,i=r===null?null:r.lastEffect;if(i!==null){var a=i.next;r=a;do{if((r.tag&e)===e){var o=r.inst,s=o.destroy;if(s!==void 0){o.destroy=void 0,i=t;var c=n,l=s;try{l()}catch(e){Q(i,c,e)}}}r=r.next}while(r!==a)}}catch(e){Q(t,t.return,e)}}function Bc(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{Wa(t,n)}catch(t){Q(e,e.return,t)}}}function Vc(e,t,n){n.props=Hs(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(n){Q(e,t,n)}}function Hc(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:r=e.stateNode;break;default:r=e.stateNode}typeof n==`function`?e.refCleanup=n(r):n.current=r}}catch(n){Q(e,t,n)}}function Uc(e,t){var n=e.ref,r=e.refCleanup;if(n!==null)if(typeof r==`function`)try{r()}catch(n){Q(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n==`function`)try{n(null)}catch(n){Q(e,t,n)}else n.current=null}function Wc(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{a:switch(t){case`button`:case`input`:case`select`:case`textarea`:n.autoFocus&&r.focus();break a;case`img`:n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(t){Q(e,e.return,t)}}function Gc(e,t,n){try{var r=e.stateNode;Fd(r,e.type,n,t),r[at]=t}catch(t){Q(e,e.return,t)}}function Kc(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Zd(e.type)||e.tag===4}function qc(e){a:for(;;){for(;e.sibling===null;){if(e.return===null||Kc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Zd(e.type)||e.flags&2||e.child===null||e.tag===4)continue a;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Jc(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n).insertBefore(e,t):(t=n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n,t.appendChild(e),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Zt));else if(r!==4&&(r===27&&Zd(e.type)&&(n=e.stateNode,t=null),e=e.child,e!==null))for(Jc(e,t,n),e=e.sibling;e!==null;)Jc(e,t,n),e=e.sibling}function Yc(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(r===27&&Zd(e.type)&&(n=e.stateNode),e=e.child,e!==null))for(Yc(e,t,n),e=e.sibling;e!==null;)Yc(e,t,n),e=e.sibling}function Xc(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);Pd(t,r,n),t[it]=e,t[at]=n}catch(t){Q(e,e.return,t)}}var Zc=!1,Qc=!1,$c=!1,el=typeof WeakSet==`function`?WeakSet:Set,tl=null;function nl(e,t){if(e=e.containerInfo,Rd=sp,e=Cr(e),wr(e)){if(`selectionStart`in e)var n={start:e.selectionStart,end:e.selectionEnd};else a:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var a=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break a}var s=0,c=-1,l=-1,u=0,d=0,f=e,p=null;b:for(;;){for(var m;f!==n||a!==0&&f.nodeType!==3||(c=s+a),f!==o||r!==0&&f.nodeType!==3||(l=s+r),f.nodeType===3&&(s+=f.nodeValue.length),(m=f.firstChild)!==null;)p=f,f=m;for(;;){if(f===e)break b;if(p===n&&++u===a&&(c=s),p===o&&++d===r&&(l=s),(m=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=m}n=c===-1||l===-1?null:{start:c,end:l}}else n=null}n||={start:0,end:0}}else n=null;for(zd={focusedElem:e,selectionRange:n},sp=!1,tl=t;tl!==null;)if(t=tl,e=t.child,t.subtreeFlags&1028&&e!==null)e.return=t,tl=e;else for(;tl!==null;){switch(t=tl,o=t.alternate,e=t.flags,t.tag){case 0:if(e&4&&(e=t.updateQueue,e=e===null?null:e.events,e!==null))for(n=0;n<e.length;n++)a=e[n],a.ref.impl=a.nextImpl;break;case 11:case 15:break;case 1:if(e&1024&&o!==null){e=void 0,n=t,a=o.memoizedProps,o=o.memoizedState,r=n.stateNode;try{var h=Hs(n.type,a);e=r.getSnapshotBeforeUpdate(h,o),r.__reactInternalSnapshotBeforeUpdate=e}catch(e){Q(n,n.return,e)}}break;case 3:if(e&1024){if(e=t.stateNode.containerInfo,n=e.nodeType,n===9)ef(e);else if(n===1)switch(e.nodeName){case`HEAD`:case`HTML`:case`BODY`:ef(e);break;default:e.textContent=``}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(e&1024)throw Error(i(163))}if(e=t.sibling,e!==null){e.return=t.return,tl=e;break}tl=t.return}}function rl(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:vl(e,n),r&4&&Rc(5,n);break;case 1:if(vl(e,n),r&4)if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(e){Q(n,n.return,e)}else{var i=Hs(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(e){Q(n,n.return,e)}}r&64&&Bc(n),r&512&&Hc(n,n.return);break;case 3:if(vl(e,n),r&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{Wa(e,t)}catch(e){Q(n,n.return,e)}}break;case 27:t===null&&r&4&&Xc(n);case 26:case 5:vl(e,n),t===null&&r&4&&Wc(n),r&512&&Hc(n,n.return);break;case 12:vl(e,n);break;case 31:vl(e,n),r&4&&ll(e,n);break;case 13:vl(e,n),r&4&&ul(e,n),r&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=qu.bind(null,n),sf(e,n))));break;case 22:if(r=n.memoizedState!==null||Zc,!r){t=t!==null&&t.memoizedState!==null||Qc,i=Zc;var a=Qc;Zc=r,(Qc=t)&&!a?bl(e,n,(n.subtreeFlags&8772)!=0):vl(e,n),Zc=i,Qc=a}break;case 30:break;default:vl(e,n)}}function il(e){var t=e.alternate;t!==null&&(e.alternate=null,il(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&ft(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var al=null,ol=!1;function sl(e,t,n){for(n=n.child;n!==null;)cl(e,t,n),n=n.sibling}function cl(e,t,n){if(B&&typeof B.onCommitFiberUnmount==`function`)try{B.onCommitFiberUnmount(Ne,n)}catch{}switch(n.tag){case 26:Qc||Uc(n,t),sl(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:Qc||Uc(n,t);var r=al,i=ol;Zd(n.type)&&(al=n.stateNode,ol=!1),sl(e,t,n),pf(n.stateNode),al=r,ol=i;break;case 5:Qc||Uc(n,t);case 6:if(r=al,i=ol,al=null,sl(e,t,n),al=r,ol=i,al!==null)if(ol)try{(al.nodeType===9?al.body:al.nodeName===`HTML`?al.ownerDocument.body:al).removeChild(n.stateNode)}catch(e){Q(n,t,e)}else try{al.removeChild(n.stateNode)}catch(e){Q(n,t,e)}break;case 18:al!==null&&(ol?(e=al,Qd(e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,n.stateNode),Np(e)):Qd(al,n.stateNode));break;case 4:r=al,i=ol,al=n.stateNode.containerInfo,ol=!0,sl(e,t,n),al=r,ol=i;break;case 0:case 11:case 14:case 15:zc(2,n,t),Qc||zc(4,n,t),sl(e,t,n);break;case 1:Qc||(Uc(n,t),r=n.stateNode,typeof r.componentWillUnmount==`function`&&Vc(n,t,r)),sl(e,t,n);break;case 21:sl(e,t,n);break;case 22:Qc=(r=Qc)||n.memoizedState!==null,sl(e,t,n),Qc=r;break;default:sl(e,t,n)}}function ll(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Np(e)}catch(e){Q(t,t.return,e)}}}function ul(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Np(e)}catch(e){Q(t,t.return,e)}}function dl(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new el),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new el),t;default:throw Error(i(435,e.tag))}}function fl(e,t){var n=dl(e);t.forEach(function(t){if(!n.has(t)){n.add(t);var r=Ju.bind(null,e,t);t.then(r,r)}})}function pl(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var a=n[r],o=e,s=t,c=s;a:for(;c!==null;){switch(c.tag){case 27:if(Zd(c.type)){al=c.stateNode,ol=!1;break a}break;case 5:al=c.stateNode,ol=!1;break a;case 3:case 4:al=c.stateNode.containerInfo,ol=!0;break a}c=c.return}if(al===null)throw Error(i(160));cl(o,s,a),al=null,ol=!1,o=a.alternate,o!==null&&(o.return=null),a.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)hl(t,e),t=t.sibling}var ml=null;function hl(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:pl(t,e),gl(e),r&4&&(zc(3,e,e.return),Rc(3,e),zc(5,e,e.return));break;case 1:pl(t,e),gl(e),r&512&&(Qc||n===null||Uc(n,n.return)),r&64&&Zc&&(e=e.updateQueue,e!==null&&(r=e.callbacks,r!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?r:n.concat(r))));break;case 26:var a=ml;if(pl(t,e),gl(e),r&512&&(Qc||n===null||Uc(n,n.return)),r&4){var o=n===null?null:n.memoizedState;if(r=e.memoizedState,n===null)if(r===null)if(e.stateNode===null){a:{r=e.type,n=e.memoizedProps,a=a.ownerDocument||a;b:switch(r){case`title`:o=a.getElementsByTagName(`title`)[0],(!o||o[dt]||o[it]||o.namespaceURI===`http://www.w3.org/2000/svg`||o.hasAttribute(`itemprop`))&&(o=a.createElement(r),a.head.insertBefore(o,a.querySelector(`head > title`))),Pd(o,r,n),o[it]=e,_t(o),r=o;break a;case`link`:var s=Vf(`link`,`href`,a).get(r+(n.href||``));if(s){for(var c=0;c<s.length;c++)if(o=s[c],o.getAttribute(`href`)===(n.href==null||n.href===``?null:n.href)&&o.getAttribute(`rel`)===(n.rel==null?null:n.rel)&&o.getAttribute(`title`)===(n.title==null?null:n.title)&&o.getAttribute(`crossorigin`)===(n.crossOrigin==null?null:n.crossOrigin)){s.splice(c,1);break b}}o=a.createElement(r),Pd(o,r,n),a.head.appendChild(o);break;case`meta`:if(s=Vf(`meta`,`content`,a).get(r+(n.content||``))){for(c=0;c<s.length;c++)if(o=s[c],o.getAttribute(`content`)===(n.content==null?null:``+n.content)&&o.getAttribute(`name`)===(n.name==null?null:n.name)&&o.getAttribute(`property`)===(n.property==null?null:n.property)&&o.getAttribute(`http-equiv`)===(n.httpEquiv==null?null:n.httpEquiv)&&o.getAttribute(`charset`)===(n.charSet==null?null:n.charSet)){s.splice(c,1);break b}}o=a.createElement(r),Pd(o,r,n),a.head.appendChild(o);break;default:throw Error(i(468,r))}o[it]=e,_t(o),r=o}e.stateNode=r}else Hf(a,e.type,e.stateNode);else e.stateNode=If(a,r,e.memoizedProps);else o===r?r===null&&e.stateNode!==null&&Gc(e,e.memoizedProps,n.memoizedProps):(o===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):o.count--,r===null?Hf(a,e.type,e.stateNode):If(a,r,e.memoizedProps))}break;case 27:pl(t,e),gl(e),r&512&&(Qc||n===null||Uc(n,n.return)),n!==null&&r&4&&Gc(e,e.memoizedProps,n.memoizedProps);break;case 5:if(pl(t,e),gl(e),r&512&&(Qc||n===null||Uc(n,n.return)),e.flags&32){a=e.stateNode;try{Ut(a,``)}catch(t){Q(e,e.return,t)}}r&4&&e.stateNode!=null&&(a=e.memoizedProps,Gc(e,a,n===null?a:n.memoizedProps)),r&1024&&($c=!0);break;case 6:if(pl(t,e),gl(e),r&4){if(e.stateNode===null)throw Error(i(162));r=e.memoizedProps,n=e.stateNode;try{n.nodeValue=r}catch(t){Q(e,e.return,t)}}break;case 3:if(Bf=null,a=ml,ml=gf(t.containerInfo),pl(t,e),ml=a,gl(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Np(t.containerInfo)}catch(t){Q(e,e.return,t)}$c&&($c=!1,_l(e));break;case 4:r=ml,ml=gf(e.stateNode.containerInfo),pl(t,e),gl(e),ml=r;break;case 12:pl(t,e),gl(e);break;case 31:pl(t,e),gl(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,fl(e,r)));break;case 13:pl(t,e),gl(e),e.child.flags&8192&&e.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(Ql=z()),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,fl(e,r)));break;case 22:a=e.memoizedState!==null;var l=n!==null&&n.memoizedState!==null,u=Zc,d=Qc;if(Zc=u||a,Qc=d||l,pl(t,e),Qc=d,Zc=u,gl(e),r&8192)a:for(t=e.stateNode,t._visibility=a?t._visibility&-2:t._visibility|1,a&&(n===null||l||Zc||Qc||yl(e)),n=null,t=e;;){if(t.tag===5||t.tag===26){if(n===null){l=n=t;try{if(o=l.stateNode,a)s=o.style,typeof s.setProperty==`function`?s.setProperty(`display`,`none`,`important`):s.display=`none`;else{c=l.stateNode;var f=l.memoizedProps.style,p=f!=null&&f.hasOwnProperty(`display`)?f.display:null;c.style.display=p==null||typeof p==`boolean`?``:(``+p).trim()}}catch(e){Q(l,l.return,e)}}}else if(t.tag===6){if(n===null){l=t;try{l.stateNode.nodeValue=a?``:l.memoizedProps}catch(e){Q(l,l.return,e)}}}else if(t.tag===18){if(n===null){l=t;try{var m=l.stateNode;a?$d(m,!0):$d(l.stateNode,!1)}catch(e){Q(l,l.return,e)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break a;for(;t.sibling===null;){if(t.return===null||t.return===e)break a;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}r&4&&(r=e.updateQueue,r!==null&&(n=r.retryQueue,n!==null&&(r.retryQueue=null,fl(e,n))));break;case 19:pl(t,e),gl(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,fl(e,r)));break;case 30:break;case 21:break;default:pl(t,e),gl(e)}}function gl(e){var t=e.flags;if(t&2){try{for(var n,r=e.return;r!==null;){if(Kc(r)){n=r;break}r=r.return}if(n==null)throw Error(i(160));switch(n.tag){case 27:var a=n.stateNode;Yc(e,qc(e),a);break;case 5:var o=n.stateNode;n.flags&32&&(Ut(o,``),n.flags&=-33),Yc(e,qc(e),o);break;case 3:case 4:var s=n.stateNode.containerInfo;Jc(e,qc(e),s);break;default:throw Error(i(161))}}catch(t){Q(e,e.return,t)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function _l(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;_l(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function vl(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)rl(e,t.alternate,t),t=t.sibling}function yl(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:zc(4,t,t.return),yl(t);break;case 1:Uc(t,t.return);var n=t.stateNode;typeof n.componentWillUnmount==`function`&&Vc(t,t.return,n),yl(t);break;case 27:pf(t.stateNode);case 26:case 5:Uc(t,t.return),yl(t);break;case 22:t.memoizedState===null&&yl(t);break;case 30:yl(t);break;default:yl(t)}e=e.sibling}}function bl(e,t,n){for(n&&=(t.subtreeFlags&8772)!=0,t=t.child;t!==null;){var r=t.alternate,i=e,a=t,o=a.flags;switch(a.tag){case 0:case 11:case 15:bl(i,a,n),Rc(4,a);break;case 1:if(bl(i,a,n),r=a,i=r.stateNode,typeof i.componentDidMount==`function`)try{i.componentDidMount()}catch(e){Q(r,r.return,e)}if(r=a,i=r.updateQueue,i!==null){var s=r.stateNode;try{var c=i.shared.hiddenCallbacks;if(c!==null)for(i.shared.hiddenCallbacks=null,i=0;i<c.length;i++)Ua(c[i],s)}catch(e){Q(r,r.return,e)}}n&&o&64&&Bc(a),Hc(a,a.return);break;case 27:Xc(a);case 26:case 5:bl(i,a,n),n&&r===null&&o&4&&Wc(a),Hc(a,a.return);break;case 12:bl(i,a,n);break;case 31:bl(i,a,n),n&&o&4&&ll(i,a);break;case 13:bl(i,a,n),n&&o&4&&ul(i,a);break;case 22:a.memoizedState===null&&bl(i,a,n),Hc(a,a.return);break;case 30:break;default:bl(i,a,n)}t=t.sibling}}function xl(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&na(n))}function Sl(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&na(e))}function Cl(e,t,n,r){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)wl(e,t,n,r),t=t.sibling}function wl(e,t,n,r){var i=t.flags;switch(t.tag){case 0:case 11:case 15:Cl(e,t,n,r),i&2048&&Rc(9,t);break;case 1:Cl(e,t,n,r);break;case 3:Cl(e,t,n,r),i&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&na(e)));break;case 12:if(i&2048){Cl(e,t,n,r),e=t.stateNode;try{var a=t.memoizedProps,o=a.id,s=a.onPostCommit;typeof s==`function`&&s(o,t.alternate===null?`mount`:`update`,e.passiveEffectDuration,-0)}catch(e){Q(t,t.return,e)}}else Cl(e,t,n,r);break;case 31:Cl(e,t,n,r);break;case 13:Cl(e,t,n,r);break;case 23:break;case 22:a=t.stateNode,o=t.alternate,t.memoizedState===null?a._visibility&2?Cl(e,t,n,r):(a._visibility|=2,Tl(e,t,n,r,(t.subtreeFlags&10256)!=0||!1)):a._visibility&2?Cl(e,t,n,r):El(e,t),i&2048&&xl(o,t);break;case 24:Cl(e,t,n,r),i&2048&&Sl(t.alternate,t);break;default:Cl(e,t,n,r)}}function Tl(e,t,n,r,i){for(i&&=(t.subtreeFlags&10256)!=0||!1,t=t.child;t!==null;){var a=e,o=t,s=n,c=r,l=o.flags;switch(o.tag){case 0:case 11:case 15:Tl(a,o,s,c,i),Rc(8,o);break;case 23:break;case 22:var u=o.stateNode;o.memoizedState===null?(u._visibility|=2,Tl(a,o,s,c,i)):u._visibility&2?Tl(a,o,s,c,i):El(a,o),i&&l&2048&&xl(o.alternate,o);break;case 24:Tl(a,o,s,c,i),i&&l&2048&&Sl(o.alternate,o);break;default:Tl(a,o,s,c,i)}t=t.sibling}}function El(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,r=t,i=r.flags;switch(r.tag){case 22:El(n,r),i&2048&&xl(r.alternate,r);break;case 24:El(n,r),i&2048&&Sl(r.alternate,r);break;default:El(n,r)}t=t.sibling}}var Dl=8192;function Ol(e,t,n){if(e.subtreeFlags&Dl)for(e=e.child;e!==null;)kl(e,t,n),e=e.sibling}function kl(e,t,n){switch(e.tag){case 26:Ol(e,t,n),e.flags&Dl&&e.memoizedState!==null&&Gf(n,ml,e.memoizedState,e.memoizedProps);break;case 5:Ol(e,t,n);break;case 3:case 4:var r=ml;ml=gf(e.stateNode.containerInfo),Ol(e,t,n),ml=r;break;case 22:e.memoizedState===null&&(r=e.alternate,r!==null&&r.memoizedState!==null?(r=Dl,Dl=16777216,Ol(e,t,n),Dl=r):Ol(e,t,n));break;default:Ol(e,t,n)}}function Al(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function jl(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];tl=r,Pl(r,e)}Al(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Ml(e),e=e.sibling}function Ml(e){switch(e.tag){case 0:case 11:case 15:jl(e),e.flags&2048&&zc(9,e,e.return);break;case 3:jl(e);break;case 12:jl(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Nl(e)):jl(e);break;default:jl(e)}}function Nl(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];tl=r,Pl(r,e)}Al(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:zc(8,t,t.return),Nl(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Nl(t));break;default:Nl(t)}e=e.sibling}}function Pl(e,t){for(;tl!==null;){var n=tl;switch(n.tag){case 0:case 11:case 15:zc(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var r=n.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:na(n.memoizedState.cache)}if(r=n.child,r!==null)r.return=n,tl=r;else a:for(n=e;tl!==null;){r=tl;var i=r.sibling,a=r.return;if(il(r),r===n){tl=null;break a}if(i!==null){i.return=a,tl=i;break a}tl=a}}}var Fl={getCacheForType:function(e){var t=Ji(ea),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return Ji(ea).controller.signal}},Il=typeof WeakMap==`function`?WeakMap:Map,J=0,Ll=null,Y=null,X=0,Z=0,Rl=null,zl=!1,Bl=!1,Vl=!1,Hl=0,Ul=0,Wl=0,Gl=0,Kl=0,ql=0,Jl=0,Yl=null,Xl=null,Zl=!1,Ql=0,$l=0,eu=1/0,tu=null,nu=null,ru=0,iu=null,au=null,ou=0,su=0,cu=null,lu=null,uu=0,du=null;function fu(){return J&2&&X!==0?X&-X:A.T===null?tt():ud()}function pu(){if(ql===0)if(!(X&536870912)||K){var e=Be;Be<<=1,!(Be&3932160)&&(Be=262144),ql=e}else ql=536870912;return e=Xa.current,e!==null&&(e.flags|=32),ql}function mu(e,t,n){(e===Ll&&(Z===2||Z===9)||e.cancelPendingCommit!==null)&&(xu(e,0),vu(e,X,ql,!1)),Je(e,n),(!(J&2)||e!==Ll)&&(e===Ll&&(!(J&2)&&(Gl|=n),Ul===4&&vu(e,X,ql,!1)),nd(e))}function hu(e,t,n){if(J&6)throw Error(i(327));var r=!n&&(t&127)==0&&(t&e.expiredLanes)===0||We(e,t),a=r?ku(e,t):Du(e,t,!0),o=r;do{if(a===0){Bl&&!r&&vu(e,t,0,!1);break}else{if(n=e.current.alternate,o&&!_u(n)){a=Du(e,t,!1),o=!1;continue}if(a===2){if(o=t,e.errorRecoveryDisabledLanes&o)var s=0;else s=e.pendingLanes&-536870913,s=s===0?s&536870912?536870912:0:s;if(s!==0){t=s;a:{var c=e;a=Yl;var l=c.current.memoizedState.isDehydrated;if(l&&(xu(c,s).flags|=256),s=Du(c,s,!1),s!==2){if(Vl&&!l){c.errorRecoveryDisabledLanes|=o,Gl|=o,a=4;break a}o=Xl,Xl=a,o!==null&&(Xl===null?Xl=o:Xl.push.apply(Xl,o))}a=s}if(o=!1,a!==2)continue}}if(a===1){xu(e,0),vu(e,t,0,!0);break}a:{switch(r=e,o=a,o){case 0:case 1:throw Error(i(345));case 4:if((t&4194048)!==t)break;case 6:vu(r,t,ql,!zl);break a;case 2:Xl=null;break;case 3:case 5:break;default:throw Error(i(329))}if((t&62914560)===t&&(a=Ql+300-z(),10<a)){if(vu(r,t,ql,!zl),Ue(r,0,!0)!==0)break a;ou=t,r.timeoutHandle=Kd(gu.bind(null,r,n,Xl,tu,Zl,t,ql,Gl,Jl,zl,o,`Throttled`,-0,0),a);break a}gu(r,n,Xl,tu,Zl,t,ql,Gl,Jl,zl,o,null,-0,0)}}break}while(1);nd(e)}function gu(e,t,n,r,i,a,o,s,c,l,u,d,f,p){if(e.timeoutHandle=-1,d=t.subtreeFlags,d&8192||(d&16785408)==16785408){d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Zt},kl(t,a,d);var m=(a&62914560)===a?Ql-z():(a&4194048)===a?$l-z():0;if(m=qf(d,m),m!==null){ou=a,e.cancelPendingCommit=m(Iu.bind(null,e,t,a,n,r,i,o,s,c,u,d,null,f,p)),vu(e,a,o,!l);return}}Iu(e,t,a,n,r,i,o,s,c)}function _u(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!vr(a(),i))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function vu(e,t,n,r){t&=~Kl,t&=~Gl,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var i=t;0<i;){var a=31-Fe(i),o=1<<a;r[a]=-1,i&=~o}n!==0&&Xe(e,n,t)}function yu(){return J&6?!0:(rd(0,!1),!1)}function bu(){if(Y!==null){if(Z===0)var e=Y.return;else e=Y,Bi=zi=null,wo(e),Ta=null,Ea=0,e=Y;for(;e!==null;)Lc(e.alternate,e),e=e.return;Y=null}}function xu(e,t){var n=e.timeoutHandle;n!==-1&&(e.timeoutHandle=-1,qd(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),ou=0,bu(),Ll=e,Y=n=ai(e.current,null),X=t,Z=0,Rl=null,zl=!1,Bl=We(e,t),Vl=!1,Jl=ql=Kl=Gl=Wl=Ul=0,Xl=Yl=null,Zl=!1,t&8&&(t|=t&32);var r=e.entangledLanes;if(r!==0)for(e=e.entanglements,r&=t;0<r;){var i=31-Fe(r),a=1<<i;t|=e[i],r&=~a}return Hl=t,Xr(),n}function Su(e,t){q=null,A.H=Ps,t===ha||t===_a?(t=Ca(),Z=3):t===ga?(t=Ca(),Z=4):Z=t===Qs?8:typeof t==`object`&&t&&typeof t.then==`function`?6:1,Rl=t,Y===null&&(Ul=1,Ks(e,fi(t,e.current)))}function Cu(){var e=Xa.current;return e===null?!0:(X&4194048)===X?Za===null:(X&62914560)===X||X&536870912?e===Za:!1}function wu(){var e=A.H;return A.H=Ps,e===null?Ps:e}function Tu(){var e=A.A;return A.A=Fl,e}function Eu(){Ul=4,zl||(X&4194048)!==X&&Xa.current!==null||(Bl=!0),!(Wl&134217727)&&!(Gl&134217727)||Ll===null||vu(Ll,X,ql,!1)}function Du(e,t,n){var r=J;J|=2;var i=wu(),a=Tu();(Ll!==e||X!==t)&&(tu=null,xu(e,t)),t=!1;var o=Ul;a:do try{if(Z!==0&&Y!==null){var s=Y,c=Rl;switch(Z){case 8:bu(),o=6;break a;case 3:case 2:case 9:case 6:Xa.current===null&&(t=!0);var l=Z;if(Z=0,Rl=null,Nu(e,s,c,l),n&&Bl){o=0;break a}break;default:l=Z,Z=0,Rl=null,Nu(e,s,c,l)}}Ou(),o=Ul;break}catch(t){Su(e,t)}while(1);return t&&e.shellSuspendCounter++,Bi=zi=null,J=r,A.H=i,A.A=a,Y===null&&(Ll=null,X=0,Xr()),o}function Ou(){for(;Y!==null;)ju(Y)}function ku(e,t){var n=J;J|=2;var r=wu(),a=Tu();Ll!==e||X!==t?(tu=null,eu=z()+500,xu(e,t)):Bl=We(e,t);a:do try{if(Z!==0&&Y!==null){t=Y;var o=Rl;b:switch(Z){case 1:Z=0,Rl=null,Nu(e,t,o,1);break;case 2:case 9:if(ya(o)){Z=0,Rl=null,Mu(t);break}t=function(){Z!==2&&Z!==9||Ll!==e||(Z=7),nd(e)},o.then(t,t);break a;case 3:Z=7;break a;case 4:Z=5;break a;case 7:ya(o)?(Z=0,Rl=null,Mu(t)):(Z=0,Rl=null,Nu(e,t,o,7));break;case 5:var s=null;switch(Y.tag){case 26:s=Y.memoizedState;case 5:case 27:var c=Y;if(s?Wf(s):c.stateNode.complete){Z=0,Rl=null;var l=c.sibling;if(l!==null)Y=l;else{var u=c.return;u===null?Y=null:(Y=u,Pu(u))}break b}}Z=0,Rl=null,Nu(e,t,o,5);break;case 6:Z=0,Rl=null,Nu(e,t,o,6);break;case 8:bu(),Ul=6;break a;default:throw Error(i(462))}}Au();break}catch(t){Su(e,t)}while(1);return Bi=zi=null,A.H=r,A.A=a,J=n,Y===null?(Ll=null,X=0,Xr(),Ul):0}function Au(){for(;Y!==null&&!Ce();)ju(Y)}function ju(e){var t=Oc(e.alternate,e,Hl);e.memoizedProps=e.pendingProps,t===null?Pu(e):Y=t}function Mu(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=fc(n,t,t.pendingProps,t.type,void 0,X);break;case 11:t=fc(n,t,t.pendingProps,t.type.render,t.ref,X);break;case 5:wo(t);default:Lc(n,t),t=Y=oi(t,Hl),t=Oc(n,t,Hl)}e.memoizedProps=e.pendingProps,t===null?Pu(e):Y=t}function Nu(e,t,n,r){Bi=zi=null,wo(t),Ta=null,Ea=0;var i=t.return;try{if(Zs(e,i,t,n,X)){Ul=1,Ks(e,fi(n,e.current)),Y=null;return}}catch(t){if(i!==null)throw Y=i,t;Ul=1,Ks(e,fi(n,e.current)),Y=null;return}t.flags&32768?(K||r===1?e=!0:Bl||X&536870912?e=!1:(zl=e=!0,(r===2||r===9||r===3||r===6)&&(r=Xa.current,r!==null&&r.tag===13&&(r.flags|=16384))),Fu(t,e)):Pu(t)}function Pu(e){var t=e;do{if(t.flags&32768){Fu(t,zl);return}e=t.return;var n=Fc(t.alternate,t,Hl);if(n!==null){Y=n;return}if(t=t.sibling,t!==null){Y=t;return}Y=t=e}while(t!==null);Ul===0&&(Ul=5)}function Fu(e,t){do{var n=Ic(e.alternate,e);if(n!==null){n.flags&=32767,Y=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){Y=e;return}Y=e=n}while(e!==null);Ul=6,Y=null}function Iu(e,t,n,r,a,o,s,c,l){e.cancelPendingCommit=null;do Vu();while(ru!==0);if(J&6)throw Error(i(327));if(t!==null){if(t===e.current)throw Error(i(177));if(o=t.lanes|t.childLanes,o|=Yr,Ye(e,n,o,s,c,l),e===Ll&&(Y=Ll=null,X=0),au=t,iu=e,ou=n,su=o,cu=a,lu=r,t.subtreeFlags&10256||t.flags&10256?(e.callbackNode=null,e.callbackPriority=0,Yu(Oe,function(){return Hu(),null})):(e.callbackNode=null,e.callbackPriority=0),r=(t.flags&13878)!=0,t.subtreeFlags&13878||r){r=A.T,A.T=null,a=j.p,j.p=2,s=J,J|=4;try{nl(e,t,n)}finally{J=s,j.p=a,A.T=r}}ru=1,Lu(),Ru(),zu()}}function Lu(){if(ru===1){ru=0;var e=iu,t=au,n=(t.flags&13878)!=0;if(t.subtreeFlags&13878||n){n=A.T,A.T=null;var r=j.p;j.p=2;var i=J;J|=4;try{hl(t,e);var a=zd,o=Cr(e.containerInfo),s=a.focusedElem,c=a.selectionRange;if(o!==s&&s&&s.ownerDocument&&Sr(s.ownerDocument.documentElement,s)){if(c!==null&&wr(s)){var l=c.start,u=c.end;if(u===void 0&&(u=l),`selectionStart`in s)s.selectionStart=l,s.selectionEnd=Math.min(u,s.value.length);else{var d=s.ownerDocument||document,f=d&&d.defaultView||window;if(f.getSelection){var p=f.getSelection(),m=s.textContent.length,h=Math.min(c.start,m),g=c.end===void 0?h:Math.min(c.end,m);!p.extend&&h>g&&(o=g,g=h,h=o);var _=xr(s,h),v=xr(s,g);if(_&&v&&(p.rangeCount!==1||p.anchorNode!==_.node||p.anchorOffset!==_.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var y=d.createRange();y.setStart(_.node,_.offset),p.removeAllRanges(),h>g?(p.addRange(y),p.extend(v.node,v.offset)):(y.setEnd(v.node,v.offset),p.addRange(y))}}}}for(d=[],p=s;p=p.parentNode;)p.nodeType===1&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof s.focus==`function`&&s.focus(),s=0;s<d.length;s++){var b=d[s];b.element.scrollLeft=b.left,b.element.scrollTop=b.top}}sp=!!Rd,zd=Rd=null}finally{J=i,j.p=r,A.T=n}}e.current=t,ru=2}}function Ru(){if(ru===2){ru=0;var e=iu,t=au,n=(t.flags&8772)!=0;if(t.subtreeFlags&8772||n){n=A.T,A.T=null;var r=j.p;j.p=2;var i=J;J|=4;try{rl(e,t.alternate,t)}finally{J=i,j.p=r,A.T=n}}ru=3}}function zu(){if(ru===4||ru===3){ru=0,we();var e=iu,t=au,n=ou,r=lu;t.subtreeFlags&10256||t.flags&10256?ru=5:(ru=0,au=iu=null,Bu(e,e.pendingLanes));var i=e.pendingLanes;if(i===0&&(nu=null),et(n),t=t.stateNode,B&&typeof B.onCommitFiberRoot==`function`)try{B.onCommitFiberRoot(Ne,t,void 0,(t.current.flags&128)==128)}catch{}if(r!==null){t=A.T,i=j.p,j.p=2,A.T=null;try{for(var a=e.onRecoverableError,o=0;o<r.length;o++){var s=r[o];a(s.value,{componentStack:s.stack})}}finally{A.T=t,j.p=i}}ou&3&&Vu(),nd(e),i=e.pendingLanes,n&261930&&i&42?e===du?uu++:(uu=0,du=e):uu=0,rd(0,!1)}}function Bu(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,na(t)))}function Vu(){return Lu(),Ru(),zu(),Hu()}function Hu(){if(ru!==5)return!1;var e=iu,t=su;su=0;var n=et(ou),r=A.T,a=j.p;try{j.p=32>n?32:n,A.T=null,n=cu,cu=null;var o=iu,s=ou;if(ru=0,au=iu=null,ou=0,J&6)throw Error(i(331));var c=J;if(J|=4,Ml(o.current),wl(o,o.current,s,n),J=c,rd(0,!1),B&&typeof B.onPostCommitFiberRoot==`function`)try{B.onPostCommitFiberRoot(Ne,o)}catch{}return!0}finally{j.p=a,A.T=r,Bu(e,t)}}function Uu(e,t,n){t=fi(n,t),t=Js(e.stateNode,t,2),e=La(e,t,2),e!==null&&(Je(e,2),nd(e))}function Q(e,t,n){if(e.tag===3)Uu(e,e,n);else for(;t!==null;){if(t.tag===3){Uu(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError==`function`||typeof r.componentDidCatch==`function`&&(nu===null||!nu.has(r))){e=fi(n,e),n=Ys(2),r=La(t,n,2),r!==null&&(Xs(n,r,t,e),Je(r,2),nd(r));break}}t=t.return}}function Wu(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Il;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(Vl=!0,i.add(n),e=Gu.bind(null,e,t,n),t.then(e,e))}function Gu(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,Ll===e&&(X&n)===n&&(Ul===4||Ul===3&&(X&62914560)===X&&300>z()-Ql?!(J&2)&&xu(e,0):Kl|=n,Jl===X&&(Jl=0)),nd(e)}function Ku(e,t){t===0&&(t=Ke()),e=$r(e,t),e!==null&&(Je(e,t),nd(e))}function qu(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Ku(e,n)}function Ju(e,t){var n=0;switch(e.tag){case 31:case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(i(314))}r!==null&&r.delete(t),Ku(e,n)}function Yu(e,t){return xe(e,t)}var Xu=null,Zu=null,Qu=!1,$u=!1,ed=!1,td=0;function nd(e){e!==Zu&&e.next===null&&(Zu===null?Xu=Zu=e:Zu=Zu.next=e),$u=!0,Qu||(Qu=!0,ld())}function rd(e,t){if(!ed&&$u){ed=!0;do for(var n=!1,r=Xu;r!==null;){if(!t)if(e!==0){var i=r.pendingLanes;if(i===0)var a=0;else{var o=r.suspendedLanes,s=r.pingedLanes;a=(1<<31-Fe(42|e)+1)-1,a&=i&~(o&~s),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,cd(r,a))}else a=X,a=Ue(r,r===Ll?a:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),!(a&3)||We(r,a)||(n=!0,cd(r,a));r=r.next}while(n);ed=!1}}function id(){ad()}function ad(){$u=Qu=!1;var e=0;td!==0&&Gd()&&(e=td);for(var t=z(),n=null,r=Xu;r!==null;){var i=r.next,a=od(r,t);a===0?(r.next=null,n===null?Xu=i:n.next=i,i===null&&(Zu=n)):(n=r,(e!==0||a&3)&&($u=!0)),r=i}ru!==0&&ru!==5||rd(e,!1),td!==0&&(td=0)}function od(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var o=31-Fe(a),s=1<<o,c=i[o];c===-1?((s&n)===0||(s&r)!==0)&&(i[o]=Ge(s,t)):c<=t&&(e.expiredLanes|=s),a&=~s}if(t=Ll,n=X,n=Ue(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,n===0||e===t&&(Z===2||Z===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&Se(r),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||We(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(r!==null&&Se(r),et(n)){case 2:case 8:n=De;break;case 32:n=Oe;break;case 268435456:n=Ae;break;default:n=Oe}return r=sd.bind(null,e),n=xe(n,r),e.callbackPriority=t,e.callbackNode=n,t}return r!==null&&r!==null&&Se(r),e.callbackPriority=2,e.callbackNode=null,2}function sd(e,t){if(ru!==0&&ru!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(Vu()&&e.callbackNode!==n)return null;var r=X;return r=Ue(e,e===Ll?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(hu(e,r,t),od(e,z()),e.callbackNode!=null&&e.callbackNode===n?sd.bind(null,e):null)}function cd(e,t){if(Vu())return null;hu(e,t,!0)}function ld(){Yd(function(){J&6?xe(Ee,id):ad()})}function ud(){if(td===0){var e=aa;e===0&&(e=ze,ze<<=1,!(ze&261888)&&(ze=256)),td=e}return td}function dd(e){return e==null||typeof e==`symbol`||typeof e==`boolean`?null:typeof e==`function`?e:Xt(``+e)}function fd(e,t){var n=t.ownerDocument.createElement(`input`);return n.name=t.name,n.value=t.value,e.id&&n.setAttribute(`form`,e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}function pd(e,t,n,r,i){if(t===`submit`&&n&&n.stateNode===i){var a=dd((i[at]||null).action),o=r.submitter;o&&(t=(t=o[at]||null)?dd(t.formAction):o.getAttribute(`formAction`),t!==null&&(a=t,o=null));var s=new yn(`action`,`action`,null,r,i);e.push({event:s,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(td!==0){var e=o?fd(i,o):new FormData(i);bs(n,{pending:!0,data:e,method:i.method,action:a},null,e)}}else typeof a==`function`&&(s.preventDefault(),e=o?fd(i,o):new FormData(i),bs(n,{pending:!0,data:e,method:i.method,action:a},a,e))},currentTarget:i}]})}}for(var md=0;md<Wr.length;md++){var hd=Wr[md];Gr(hd.toLowerCase(),`on`+(hd[0].toUpperCase()+hd.slice(1)))}Gr(Ir,`onAnimationEnd`),Gr(Lr,`onAnimationIteration`),Gr(Rr,`onAnimationStart`),Gr(`dblclick`,`onDoubleClick`),Gr(`focusin`,`onFocus`),Gr(`focusout`,`onBlur`),Gr(zr,`onTransitionRun`),Gr(Br,`onTransitionStart`),Gr(Vr,`onTransitionCancel`),Gr(Hr,`onTransitionEnd`),xt(`onMouseEnter`,[`mouseout`,`mouseover`]),xt(`onMouseLeave`,[`mouseout`,`mouseover`]),xt(`onPointerEnter`,[`pointerout`,`pointerover`]),xt(`onPointerLeave`,[`pointerout`,`pointerover`]),bt(`onChange`,`change click focusin focusout input keydown keyup selectionchange`.split(` `)),bt(`onSelect`,`focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)),bt(`onBeforeInput`,[`compositionend`,`keypress`,`textInput`,`paste`]),bt(`onCompositionEnd`,`compositionend focusout keydown keypress keyup mousedown`.split(` `)),bt(`onCompositionStart`,`compositionstart focusout keydown keypress keyup mousedown`.split(` `)),bt(`onCompositionUpdate`,`compositionupdate focusout keydown keypress keyup mousedown`.split(` `));var gd=`abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `),_d=new Set(`beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(gd));function vd(e,t){t=(t&4)!=0;for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;a:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,l=s.currentTarget;if(s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){Kr(e)}i.currentTarget=null,a=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,l=s.currentTarget,s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){Kr(e)}i.currentTarget=null,a=c}}}}function $(e,t){var n=t[st];n===void 0&&(n=t[st]=new Set);var r=e+`__bubble`;n.has(r)||(Sd(t,e,2,!1),n.add(r))}function yd(e,t,n){var r=0;t&&(r|=4),Sd(n,e,r,t)}var bd=`_reactListening`+Math.random().toString(36).slice(2);function xd(e){if(!e[bd]){e[bd]=!0,vt.forEach(function(t){t!==`selectionchange`&&(_d.has(t)||yd(t,!1,e),yd(t,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[bd]||(t[bd]=!0,yd(`selectionchange`,!1,t))}}function Sd(e,t,n,r){switch(mp(t)){case 2:var i=cp;break;case 8:i=lp;break;default:i=up}n=i.bind(null,t,n,e),i=void 0,!cn||t!==`touchstart`&&t!==`touchmove`&&t!==`wheel`||(i=!0),r?i===void 0?e.addEventListener(t,n,!0):e.addEventListener(t,n,{capture:!0,passive:i}):i===void 0?e.addEventListener(t,n,!1):e.addEventListener(t,n,{passive:i})}function Cd(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)a:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var c=r.stateNode.containerInfo;if(c===i)break;if(s===4)for(s=r.return;s!==null;){var l=s.tag;if((l===3||l===4)&&s.stateNode.containerInfo===i)return;s=s.return}for(;c!==null;){if(s=pt(c),s===null)return;if(l=s.tag,l===5||l===6||l===26||l===27){r=a=s;continue a}c=c.parentNode}}r=r.return}an(function(){var r=a,i=$t(n),s=[];a:{var c=Ur.get(e);if(c!==void 0){var l=yn,u=e;switch(e){case`keypress`:if(mn(n)===0)break a;case`keydown`:case`keyup`:l=Ln;break;case`focusin`:u=`focus`,l=On;break;case`focusout`:u=`blur`,l=On;break;case`beforeblur`:case`afterblur`:l=On;break;case`click`:if(n.button===2)break a;case`auxclick`:case`dblclick`:case`mousedown`:case`mousemove`:case`mouseup`:case`mouseout`:case`mouseover`:case`contextmenu`:l=En;break;case`drag`:case`dragend`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`dragstart`:case`drop`:l=Dn;break;case`touchcancel`:case`touchend`:case`touchmove`:case`touchstart`:l=V;break;case Ir:case Lr:case Rr:l=kn;break;case Hr:l=zn;break;case`scroll`:case`scrollend`:l=xn;break;case`wheel`:l=Bn;break;case`copy`:case`cut`:case`paste`:l=An;break;case`gotpointercapture`:case`lostpointercapture`:case`pointercancel`:case`pointerdown`:case`pointermove`:case`pointerout`:case`pointerover`:case`pointerup`:l=Rn;break;case`toggle`:case`beforetoggle`:l=Vn}var d=(t&4)!=0,f=!d&&(e===`scroll`||e===`scrollend`),p=d?c===null?null:c+`Capture`:c;d=[];for(var m=r,h;m!==null;){var g=m;if(h=g.stateNode,g=g.tag,g!==5&&g!==26&&g!==27||h===null||p===null||(g=on(m,p),g!=null&&d.push(wd(m,g,h))),f)break;m=m.return}0<d.length&&(c=new l(c,u,null,n,i),s.push({event:c,listeners:d}))}}if(!(t&7)){a:{if(c=e===`mouseover`||e===`pointerover`,l=e===`mouseout`||e===`pointerout`,c&&n!==Qt&&(u=n.relatedTarget||n.fromElement)&&(pt(u)||u[ot]))break a;if((l||c)&&(c=i.window===i?i:(c=i.ownerDocument)?c.defaultView||c.parentWindow:window,l?(u=n.relatedTarget||n.toElement,l=r,u=u?pt(u):null,u!==null&&(f=o(u),d=u.tag,u!==f||d!==5&&d!==27&&d!==6)&&(u=null)):(l=null,u=r),l!==u)){if(d=En,g=`onMouseLeave`,p=`onMouseEnter`,m=`mouse`,(e===`pointerout`||e===`pointerover`)&&(d=Rn,g=`onPointerLeave`,p=`onPointerEnter`,m=`pointer`),f=l==null?c:ht(l),h=u==null?c:ht(u),c=new d(g,m+`leave`,l,n,i),c.target=f,c.relatedTarget=h,g=null,pt(i)===r&&(d=new d(p,m+`enter`,u,n,i),d.target=h,d.relatedTarget=f,g=d),f=g,l&&u)b:{for(d=Ed,p=l,m=u,h=0,g=p;g;g=d(g))h++;g=0;for(var _=m;_;_=d(_))g++;for(;0<h-g;)p=d(p),h--;for(;0<g-h;)m=d(m),g--;for(;h--;){if(p===m||m!==null&&p===m.alternate){d=p;break b}p=d(p),m=d(m)}d=null}else d=null;l!==null&&Dd(s,c,l,d,!1),u!==null&&f!==null&&Dd(s,f,u,d,!0)}}a:{if(c=r?ht(r):window,l=c.nodeName&&c.nodeName.toLowerCase(),l===`select`||l===`input`&&c.type===`file`)var v=or;else if(er(c))if(sr)v=gr;else{v=mr;var y=pr}else l=c.nodeName,!l||l.toLowerCase()!==`input`||c.type!==`checkbox`&&c.type!==`radio`?r&&qt(r.elementType)&&(v=or):v=hr;if(v&&=v(e,r)){tr(s,v,n,i);break a}y&&y(e,c,r),e===`focusout`&&r&&c.type===`number`&&r.memoizedProps.value!=null&&zt(c,`number`,c.value)}switch(y=r?ht(r):window,e){case`focusin`:(er(y)||y.contentEditable===`true`)&&(Er=y,Dr=r,Or=null);break;case`focusout`:Or=Dr=Er=null;break;case`mousedown`:kr=!0;break;case`contextmenu`:case`mouseup`:case`dragend`:kr=!1,Ar(s,n,i);break;case`selectionchange`:if(Tr)break;case`keydown`:case`keyup`:Ar(s,n,i)}var b;if(Un)b:{switch(e){case`compositionstart`:var x=`onCompositionStart`;break b;case`compositionend`:x=`onCompositionEnd`;break b;case`compositionupdate`:x=`onCompositionUpdate`;break b}x=void 0}else Xn?H(e,n)&&(x=`onCompositionEnd`):e===`keydown`&&n.keyCode===229&&(x=`onCompositionStart`);x&&(Kn&&n.locale!==`ko`&&(Xn||x!==`onCompositionStart`?x===`onCompositionEnd`&&Xn&&(b=pn()):(un=i,dn=`value`in un?un.value:un.textContent,Xn=!0)),y=Td(r,x),0<y.length&&(x=new jn(x,e,null,n,i),s.push({event:x,listeners:y}),b?x.data=b:(b=Yn(n),b!==null&&(x.data=b)))),(b=Gn?Zn(e,n):Qn(e,n))&&(x=Td(r,`onBeforeInput`),0<x.length&&(y=new jn(`onBeforeInput`,`beforeinput`,null,n,i),s.push({event:y,listeners:x}),y.data=b)),pd(s,e,r,n,i)}vd(s,t)})}function wd(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Td(e,t){for(var n=t+`Capture`,r=[];e!==null;){var i=e,a=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||a===null||(i=on(e,n),i!=null&&r.unshift(wd(e,i,a)),i=on(e,t),i!=null&&r.push(wd(e,i,a))),e.tag===3)return r;e=e.return}return[]}function Ed(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Dd(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,l=s.stateNode;if(s=s.tag,c!==null&&c===r)break;s!==5&&s!==26&&s!==27||l===null||(c=l,i?(l=on(n,a),l!=null&&o.unshift(wd(n,l,c))):i||(l=on(n,a),l!=null&&o.push(wd(n,l,c)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var Od=/\r\n?/g,kd=/\u0000|\uFFFD/g;function Ad(e){return(typeof e==`string`?e:``+e).replace(Od,`
`).replace(kd,``)}function jd(e,t){return t=Ad(t),Ad(e)===t}function Md(e,t,n,r,a,o){switch(n){case`children`:typeof r==`string`?t===`body`||t===`textarea`&&r===``||Ut(e,r):(typeof r==`number`||typeof r==`bigint`)&&t!==`body`&&Ut(e,``+r);break;case`className`:Dt(e,`class`,r);break;case`tabIndex`:Dt(e,`tabindex`,r);break;case`dir`:case`role`:case`viewBox`:case`width`:case`height`:Dt(e,n,r);break;case`style`:Kt(e,r,o);break;case`data`:if(t!==`object`){Dt(e,`data`,r);break}case`src`:case`href`:if(r===``&&(t!==`a`||n!==`href`)){e.removeAttribute(n);break}if(r==null||typeof r==`function`||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=Xt(``+r),e.setAttribute(n,r);break;case`action`:case`formAction`:if(typeof r==`function`){e.setAttribute(n,`javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`);break}else typeof o==`function`&&(n===`formAction`?(t!==`input`&&Md(e,t,`name`,a.name,a,null),Md(e,t,`formEncType`,a.formEncType,a,null),Md(e,t,`formMethod`,a.formMethod,a,null),Md(e,t,`formTarget`,a.formTarget,a,null)):(Md(e,t,`encType`,a.encType,a,null),Md(e,t,`method`,a.method,a,null),Md(e,t,`target`,a.target,a,null)));if(r==null||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=Xt(``+r),e.setAttribute(n,r);break;case`onClick`:r!=null&&(e.onclick=Zt);break;case`onScroll`:r!=null&&$(`scroll`,e);break;case`onScrollEnd`:r!=null&&$(`scrollend`,e);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));e.innerHTML=n}}break;case`multiple`:e.multiple=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`muted`:e.muted=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`defaultValue`:case`defaultChecked`:case`innerHTML`:case`ref`:break;case`autoFocus`:break;case`xlinkHref`:if(r==null||typeof r==`function`||typeof r==`boolean`||typeof r==`symbol`){e.removeAttribute(`xlink:href`);break}n=Xt(``+r),e.setAttributeNS(`http://www.w3.org/1999/xlink`,`xlink:href`,n);break;case`contentEditable`:case`spellCheck`:case`draggable`:case`value`:case`autoReverse`:case`externalResourcesRequired`:case`focusable`:case`preserveAlpha`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``+r):e.removeAttribute(n);break;case`inert`:case`allowFullScreen`:case`async`:case`autoPlay`:case`controls`:case`default`:case`defer`:case`disabled`:case`disablePictureInPicture`:case`disableRemotePlayback`:case`formNoValidate`:case`hidden`:case`loop`:case`noModule`:case`noValidate`:case`open`:case`playsInline`:case`readOnly`:case`required`:case`reversed`:case`scoped`:case`seamless`:case`itemScope`:r&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``):e.removeAttribute(n);break;case`capture`:case`download`:!0===r?e.setAttribute(n,``):!1!==r&&r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`cols`:case`rows`:case`size`:case`span`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case`rowSpan`:case`start`:r==null||typeof r==`function`||typeof r==`symbol`||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case`popover`:$(`beforetoggle`,e),$(`toggle`,e),Et(e,`popover`,r);break;case`xlinkActuate`:Ot(e,`http://www.w3.org/1999/xlink`,`xlink:actuate`,r);break;case`xlinkArcrole`:Ot(e,`http://www.w3.org/1999/xlink`,`xlink:arcrole`,r);break;case`xlinkRole`:Ot(e,`http://www.w3.org/1999/xlink`,`xlink:role`,r);break;case`xlinkShow`:Ot(e,`http://www.w3.org/1999/xlink`,`xlink:show`,r);break;case`xlinkTitle`:Ot(e,`http://www.w3.org/1999/xlink`,`xlink:title`,r);break;case`xlinkType`:Ot(e,`http://www.w3.org/1999/xlink`,`xlink:type`,r);break;case`xmlBase`:Ot(e,`http://www.w3.org/XML/1998/namespace`,`xml:base`,r);break;case`xmlLang`:Ot(e,`http://www.w3.org/XML/1998/namespace`,`xml:lang`,r);break;case`xmlSpace`:Ot(e,`http://www.w3.org/XML/1998/namespace`,`xml:space`,r);break;case`is`:Et(e,`is`,r);break;case`innerText`:case`textContent`:break;default:(!(2<n.length)||n[0]!==`o`&&n[0]!==`O`||n[1]!==`n`&&n[1]!==`N`)&&(n=Jt.get(n)||n,Et(e,n,r))}}function Nd(e,t,n,r,a,o){switch(n){case`style`:Kt(e,r,o);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));e.innerHTML=n}}break;case`children`:typeof r==`string`?Ut(e,r):(typeof r==`number`||typeof r==`bigint`)&&Ut(e,``+r);break;case`onScroll`:r!=null&&$(`scroll`,e);break;case`onScrollEnd`:r!=null&&$(`scrollend`,e);break;case`onClick`:r!=null&&(e.onclick=Zt);break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`innerHTML`:case`ref`:break;case`innerText`:case`textContent`:break;default:if(!yt.hasOwnProperty(n))a:{if(n[0]===`o`&&n[1]===`n`&&(a=n.endsWith(`Capture`),t=n.slice(2,a?n.length-7:void 0),o=e[at]||null,o=o==null?null:o[n],typeof o==`function`&&e.removeEventListener(t,o,a),typeof r==`function`)){typeof o!=`function`&&o!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,r,a);break a}n in e?e[n]=r:!0===r?e.setAttribute(n,``):Et(e,n,r)}}}function Pd(e,t,n){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`img`:$(`error`,e),$(`load`,e);var r=!1,a=!1,o;for(o in n)if(n.hasOwnProperty(o)){var s=n[o];if(s!=null)switch(o){case`src`:r=!0;break;case`srcSet`:a=!0;break;case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:Md(e,t,o,s,n,null)}}a&&Md(e,t,`srcSet`,n.srcSet,n,null),r&&Md(e,t,`src`,n.src,n,null);return;case`input`:$(`invalid`,e);var c=o=s=a=null,l=null,u=null;for(r in n)if(n.hasOwnProperty(r)){var d=n[r];if(d!=null)switch(r){case`name`:a=d;break;case`type`:s=d;break;case`checked`:l=d;break;case`defaultChecked`:u=d;break;case`value`:o=d;break;case`defaultValue`:c=d;break;case`children`:case`dangerouslySetInnerHTML`:if(d!=null)throw Error(i(137,t));break;default:Md(e,t,r,d,n,null)}}Rt(e,o,c,l,u,s,a,!1);return;case`select`:for(a in $(`invalid`,e),r=s=o=null,n)if(n.hasOwnProperty(a)&&(c=n[a],c!=null))switch(a){case`value`:o=c;break;case`defaultValue`:s=c;break;case`multiple`:r=c;default:Md(e,t,a,c,n,null)}t=o,n=s,e.multiple=!!r,t==null?n!=null&&Bt(e,!!r,n,!0):Bt(e,!!r,t,!1);return;case`textarea`:for(s in $(`invalid`,e),o=a=r=null,n)if(n.hasOwnProperty(s)&&(c=n[s],c!=null))switch(s){case`value`:r=c;break;case`defaultValue`:a=c;break;case`children`:o=c;break;case`dangerouslySetInnerHTML`:if(c!=null)throw Error(i(91));break;default:Md(e,t,s,c,n,null)}Ht(e,r,a,o);return;case`option`:for(l in n)if(n.hasOwnProperty(l)&&(r=n[l],r!=null))switch(l){case`selected`:e.selected=r&&typeof r!=`function`&&typeof r!=`symbol`;break;default:Md(e,t,l,r,n,null)}return;case`dialog`:$(`beforetoggle`,e),$(`toggle`,e),$(`cancel`,e),$(`close`,e);break;case`iframe`:case`object`:$(`load`,e);break;case`video`:case`audio`:for(r=0;r<gd.length;r++)$(gd[r],e);break;case`image`:$(`error`,e),$(`load`,e);break;case`details`:$(`toggle`,e);break;case`embed`:case`source`:case`link`:$(`error`,e),$(`load`,e);case`area`:case`base`:case`br`:case`col`:case`hr`:case`keygen`:case`meta`:case`param`:case`track`:case`wbr`:case`menuitem`:for(u in n)if(n.hasOwnProperty(u)&&(r=n[u],r!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:Md(e,t,u,r,n,null)}return;default:if(qt(t)){for(d in n)n.hasOwnProperty(d)&&(r=n[d],r!==void 0&&Nd(e,t,d,r,n,void 0));return}}for(c in n)n.hasOwnProperty(c)&&(r=n[c],r!=null&&Md(e,t,c,r,n,null))}function Fd(e,t,n,r){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`input`:var a=null,o=null,s=null,c=null,l=null,u=null,d=null;for(m in n){var f=n[m];if(n.hasOwnProperty(m)&&f!=null)switch(m){case`checked`:break;case`value`:break;case`defaultValue`:l=f;default:r.hasOwnProperty(m)||Md(e,t,m,null,r,f)}}for(var p in r){var m=r[p];if(f=n[p],r.hasOwnProperty(p)&&(m!=null||f!=null))switch(p){case`type`:o=m;break;case`name`:a=m;break;case`checked`:u=m;break;case`defaultChecked`:d=m;break;case`value`:s=m;break;case`defaultValue`:c=m;break;case`children`:case`dangerouslySetInnerHTML`:if(m!=null)throw Error(i(137,t));break;default:m!==f&&Md(e,t,p,m,r,f)}}Lt(e,s,c,l,u,d,o,a);return;case`select`:for(o in m=s=c=p=null,n)if(l=n[o],n.hasOwnProperty(o)&&l!=null)switch(o){case`value`:break;case`multiple`:m=l;default:r.hasOwnProperty(o)||Md(e,t,o,null,r,l)}for(a in r)if(o=r[a],l=n[a],r.hasOwnProperty(a)&&(o!=null||l!=null))switch(a){case`value`:p=o;break;case`defaultValue`:c=o;break;case`multiple`:s=o;default:o!==l&&Md(e,t,a,o,r,l)}t=c,n=s,r=m,p==null?!!r!=!!n&&(t==null?Bt(e,!!n,n?[]:``,!1):Bt(e,!!n,t,!0)):Bt(e,!!n,p,!1);return;case`textarea`:for(c in m=p=null,n)if(a=n[c],n.hasOwnProperty(c)&&a!=null&&!r.hasOwnProperty(c))switch(c){case`value`:break;case`children`:break;default:Md(e,t,c,null,r,a)}for(s in r)if(a=r[s],o=n[s],r.hasOwnProperty(s)&&(a!=null||o!=null))switch(s){case`value`:p=a;break;case`defaultValue`:m=a;break;case`children`:break;case`dangerouslySetInnerHTML`:if(a!=null)throw Error(i(91));break;default:a!==o&&Md(e,t,s,a,r,o)}Vt(e,p,m);return;case`option`:for(var h in n)if(p=n[h],n.hasOwnProperty(h)&&p!=null&&!r.hasOwnProperty(h))switch(h){case`selected`:e.selected=!1;break;default:Md(e,t,h,null,r,p)}for(l in r)if(p=r[l],m=n[l],r.hasOwnProperty(l)&&p!==m&&(p!=null||m!=null))switch(l){case`selected`:e.selected=p&&typeof p!=`function`&&typeof p!=`symbol`;break;default:Md(e,t,l,p,r,m)}return;case`img`:case`link`:case`area`:case`base`:case`br`:case`col`:case`embed`:case`hr`:case`keygen`:case`meta`:case`param`:case`source`:case`track`:case`wbr`:case`menuitem`:for(var g in n)p=n[g],n.hasOwnProperty(g)&&p!=null&&!r.hasOwnProperty(g)&&Md(e,t,g,null,r,p);for(u in r)if(p=r[u],m=n[u],r.hasOwnProperty(u)&&p!==m&&(p!=null||m!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:if(p!=null)throw Error(i(137,t));break;default:Md(e,t,u,p,r,m)}return;default:if(qt(t)){for(var _ in n)p=n[_],n.hasOwnProperty(_)&&p!==void 0&&!r.hasOwnProperty(_)&&Nd(e,t,_,void 0,r,p);for(d in r)p=r[d],m=n[d],!r.hasOwnProperty(d)||p===m||p===void 0&&m===void 0||Nd(e,t,d,p,r,m);return}}for(var v in n)p=n[v],n.hasOwnProperty(v)&&p!=null&&!r.hasOwnProperty(v)&&Md(e,t,v,null,r,p);for(f in r)p=r[f],m=n[f],!r.hasOwnProperty(f)||p===m||p==null&&m==null||Md(e,t,f,p,r,m)}function Id(e){switch(e){case`css`:case`script`:case`font`:case`img`:case`image`:case`input`:case`link`:return!0;default:return!1}}function Ld(){if(typeof performance.getEntriesByType==`function`){for(var e=0,t=0,n=performance.getEntriesByType(`resource`),r=0;r<n.length;r++){var i=n[r],a=i.transferSize,o=i.initiatorType,s=i.duration;if(a&&s&&Id(o)){for(o=0,s=i.responseEnd,r+=1;r<n.length;r++){var c=n[r],l=c.startTime;if(l>s)break;var u=c.transferSize,d=c.initiatorType;u&&Id(d)&&(c=c.responseEnd,o+=u*(c<s?1:(s-l)/(c-l)))}if(--r,t+=8*(a+o)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e==`number`)?e:5}var Rd=null,zd=null;function Bd(e){return e.nodeType===9?e:e.ownerDocument}function Vd(e){switch(e){case`http://www.w3.org/2000/svg`:return 1;case`http://www.w3.org/1998/Math/MathML`:return 2;default:return 0}}function Hd(e,t){if(e===0)switch(t){case`svg`:return 1;case`math`:return 2;default:return 0}return e===1&&t===`foreignObject`?0:e}function Ud(e,t){return e===`textarea`||e===`noscript`||typeof t.children==`string`||typeof t.children==`number`||typeof t.children==`bigint`||typeof t.dangerouslySetInnerHTML==`object`&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Wd=null;function Gd(){var e=window.event;return e&&e.type===`popstate`?e===Wd?!1:(Wd=e,!0):(Wd=null,!1)}var Kd=typeof setTimeout==`function`?setTimeout:void 0,qd=typeof clearTimeout==`function`?clearTimeout:void 0,Jd=typeof Promise==`function`?Promise:void 0,Yd=typeof queueMicrotask==`function`?queueMicrotask:Jd===void 0?Kd:function(e){return Jd.resolve(null).then(e).catch(Xd)};function Xd(e){setTimeout(function(){throw e})}function Zd(e){return e===`head`}function Qd(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8)if(n=i.data,n===`/$`||n===`/&`){if(r===0){e.removeChild(i),Np(t);return}r--}else if(n===`$`||n===`$?`||n===`$~`||n===`$!`||n===`&`)r++;else if(n===`html`)pf(e.ownerDocument.documentElement);else if(n===`head`){n=e.ownerDocument.head,pf(n);for(var a=n.firstChild;a;){var o=a.nextSibling,s=a.nodeName;a[dt]||s===`SCRIPT`||s===`STYLE`||s===`LINK`&&a.rel.toLowerCase()===`stylesheet`||n.removeChild(a),a=o}}else n===`body`&&pf(e.ownerDocument.body);n=i}while(n);Np(t)}function $d(e,t){var n=e;e=0;do{var r=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display=`none`):(n.style.display=n._stashedDisplay||``,n.getAttribute(`style`)===``&&n.removeAttribute(`style`)):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=``):n.nodeValue=n._stashedText||``),r&&r.nodeType===8)if(n=r.data,n===`/$`){if(e===0)break;e--}else n!==`$`&&n!==`$?`&&n!==`$~`&&n!==`$!`||e++;n=r}while(n)}function ef(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case`HTML`:case`HEAD`:case`BODY`:ef(n),ft(n);continue;case`SCRIPT`:case`STYLE`:continue;case`LINK`:if(n.rel.toLowerCase()===`stylesheet`)continue}e.removeChild(n)}}function tf(e,t,n,r){for(;e.nodeType===1;){var i=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&(e.nodeName!==`INPUT`||e.type!==`hidden`))break}else if(!r)if(t===`input`&&e.type===`hidden`){var a=i.name==null?null:``+i.name;if(i.type===`hidden`&&e.getAttribute(`name`)===a)return e}else return e;else if(!e[dt])switch(t){case`meta`:if(!e.hasAttribute(`itemprop`))break;return e;case`link`:if(a=e.getAttribute(`rel`),a===`stylesheet`&&e.hasAttribute(`data-precedence`)||a!==i.rel||e.getAttribute(`href`)!==(i.href==null||i.href===``?null:i.href)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute(`title`)!==(i.title==null?null:i.title))break;return e;case`style`:if(e.hasAttribute(`data-precedence`))break;return e;case`script`:if(a=e.getAttribute(`src`),(a!==(i.src==null?null:i.src)||e.getAttribute(`type`)!==(i.type==null?null:i.type)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin))&&a&&e.hasAttribute(`async`)&&!e.hasAttribute(`itemprop`))break;return e;default:return e}if(e=cf(e.nextSibling),e===null)break}return null}function nf(e,t,n){if(t===``)return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!n||(e=cf(e.nextSibling),e===null))return null;return e}function rf(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!t||(e=cf(e.nextSibling),e===null))return null;return e}function af(e){return e.data===`$?`||e.data===`$~`}function of(e){return e.data===`$!`||e.data===`$?`&&e.ownerDocument.readyState!==`loading`}function sf(e,t){var n=e.ownerDocument;if(e.data===`$~`)e._reactRetry=t;else if(e.data!==`$?`||n.readyState!==`loading`)t();else{var r=function(){t(),n.removeEventListener(`DOMContentLoaded`,r)};n.addEventListener(`DOMContentLoaded`,r),e._reactRetry=r}}function cf(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t===`$`||t===`$!`||t===`$?`||t===`$~`||t===`&`||t===`F!`||t===`F`)break;if(t===`/$`||t===`/&`)return null}}return e}var lf=null;function uf(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`/$`||n===`/&`){if(t===0)return cf(e.nextSibling);t--}else n!==`$`&&n!==`$!`&&n!==`$?`&&n!==`$~`&&n!==`&`||t++}e=e.nextSibling}return null}function df(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`$`||n===`$!`||n===`$?`||n===`$~`||n===`&`){if(t===0)return e;t--}else n!==`/$`&&n!==`/&`||t++}e=e.previousSibling}return null}function ff(e,t,n){switch(t=Bd(n),e){case`html`:if(e=t.documentElement,!e)throw Error(i(452));return e;case`head`:if(e=t.head,!e)throw Error(i(453));return e;case`body`:if(e=t.body,!e)throw Error(i(454));return e;default:throw Error(i(451))}}function pf(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);ft(e)}var mf=new Map,hf=new Set;function gf(e){return typeof e.getRootNode==`function`?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var _f=j.d;j.d={f:vf,r:yf,D:Sf,C:Cf,L:wf,m:Tf,X:Df,S:Ef,M:Of};function vf(){var e=_f.f(),t=yu();return e||t}function yf(e){var t=mt(e);t!==null&&t.tag===5&&t.type===`form`?Ss(t):_f.r(e)}var bf=typeof document>`u`?null:document;function xf(e,t,n){var r=bf;if(r&&typeof t==`string`&&t){var i=It(t);i=`link[rel="`+e+`"][href="`+i+`"]`,typeof n==`string`&&(i+=`[crossorigin="`+n+`"]`),hf.has(i)||(hf.add(i),e={rel:e,crossOrigin:n,href:t},r.querySelector(i)===null&&(t=r.createElement(`link`),Pd(t,`link`,e),_t(t),r.head.appendChild(t)))}}function Sf(e){_f.D(e),xf(`dns-prefetch`,e,null)}function Cf(e,t){_f.C(e,t),xf(`preconnect`,e,t)}function wf(e,t,n){_f.L(e,t,n);var r=bf;if(r&&e&&t){var i=`link[rel="preload"][as="`+It(t)+`"]`;t===`image`&&n&&n.imageSrcSet?(i+=`[imagesrcset="`+It(n.imageSrcSet)+`"]`,typeof n.imageSizes==`string`&&(i+=`[imagesizes="`+It(n.imageSizes)+`"]`)):i+=`[href="`+It(e)+`"]`;var a=i;switch(t){case`style`:a=Af(e);break;case`script`:a=Pf(e)}mf.has(a)||(e=h({rel:`preload`,href:t===`image`&&n&&n.imageSrcSet?void 0:e,as:t},n),mf.set(a,e),r.querySelector(i)!==null||t===`style`&&r.querySelector(jf(a))||t===`script`&&r.querySelector(Ff(a))||(t=r.createElement(`link`),Pd(t,`link`,e),_t(t),r.head.appendChild(t)))}}function Tf(e,t){_f.m(e,t);var n=bf;if(n&&e){var r=t&&typeof t.as==`string`?t.as:`script`,i=`link[rel="modulepreload"][as="`+It(r)+`"][href="`+It(e)+`"]`,a=i;switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:a=Pf(e)}if(!mf.has(a)&&(e=h({rel:`modulepreload`,href:e},t),mf.set(a,e),n.querySelector(i)===null)){switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:if(n.querySelector(Ff(a)))return}r=n.createElement(`link`),Pd(r,`link`,e),_t(r),n.head.appendChild(r)}}}function Ef(e,t,n){_f.S(e,t,n);var r=bf;if(r&&e){var i=gt(r).hoistableStyles,a=Af(e);t||=`default`;var o=i.get(a);if(!o){var s={loading:0,preload:null};if(o=r.querySelector(jf(a)))s.loading=5;else{e=h({rel:`stylesheet`,href:e,"data-precedence":t},n),(n=mf.get(a))&&Rf(e,n);var c=o=r.createElement(`link`);_t(c),Pd(c,`link`,e),c._p=new Promise(function(e,t){c.onload=e,c.onerror=t}),c.addEventListener(`load`,function(){s.loading|=1}),c.addEventListener(`error`,function(){s.loading|=2}),s.loading|=4,Lf(o,t,r)}o={type:`stylesheet`,instance:o,count:1,state:s},i.set(a,o)}}}function Df(e,t){_f.X(e,t);var n=bf;if(n&&e){var r=gt(n).hoistableScripts,i=Pf(e),a=r.get(i);a||(a=n.querySelector(Ff(i)),a||(e=h({src:e,async:!0},t),(t=mf.get(i))&&zf(e,t),a=n.createElement(`script`),_t(a),Pd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Of(e,t){_f.M(e,t);var n=bf;if(n&&e){var r=gt(n).hoistableScripts,i=Pf(e),a=r.get(i);a||(a=n.querySelector(Ff(i)),a||(e=h({src:e,async:!0,type:`module`},t),(t=mf.get(i))&&zf(e,t),a=n.createElement(`script`),_t(a),Pd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function kf(e,t,n,r){var a=(a=I.current)?gf(a):null;if(!a)throw Error(i(446));switch(e){case`meta`:case`title`:return null;case`style`:return typeof n.precedence==`string`&&typeof n.href==`string`?(t=Af(n.href),n=gt(a).hoistableStyles,r=n.get(t),r||(r={type:`style`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};case`link`:if(n.rel===`stylesheet`&&typeof n.href==`string`&&typeof n.precedence==`string`){e=Af(n.href);var o=gt(a).hoistableStyles,s=o.get(e);if(s||(a=a.ownerDocument||a,s={type:`stylesheet`,instance:null,count:0,state:{loading:0,preload:null}},o.set(e,s),(o=a.querySelector(jf(e)))&&!o._p&&(s.instance=o,s.state.loading=5),mf.has(e)||(n={rel:`preload`,as:`style`,href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},mf.set(e,n),o||Nf(a,e,n,s.state))),t&&r===null)throw Error(i(528,``));return s}if(t&&r!==null)throw Error(i(529,``));return null;case`script`:return t=n.async,n=n.src,typeof n==`string`&&t&&typeof t!=`function`&&typeof t!=`symbol`?(t=Pf(n),n=gt(a).hoistableScripts,r=n.get(t),r||(r={type:`script`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};default:throw Error(i(444,e))}}function Af(e){return`href="`+It(e)+`"`}function jf(e){return`link[rel="stylesheet"][`+e+`]`}function Mf(e){return h({},e,{"data-precedence":e.precedence,precedence:null})}function Nf(e,t,n,r){e.querySelector(`link[rel="preload"][as="style"][`+t+`]`)?r.loading=1:(t=e.createElement(`link`),r.preload=t,t.addEventListener(`load`,function(){return r.loading|=1}),t.addEventListener(`error`,function(){return r.loading|=2}),Pd(t,`link`,n),_t(t),e.head.appendChild(t))}function Pf(e){return`[src="`+It(e)+`"]`}function Ff(e){return`script[async]`+e}function If(e,t,n){if(t.count++,t.instance===null)switch(t.type){case`style`:var r=e.querySelector(`style[data-href~="`+It(n.href)+`"]`);if(r)return t.instance=r,_t(r),r;var a=h({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement(`style`),_t(r),Pd(r,`style`,a),Lf(r,n.precedence,e),t.instance=r;case`stylesheet`:a=Af(n.href);var o=e.querySelector(jf(a));if(o)return t.state.loading|=4,t.instance=o,_t(o),o;r=Mf(n),(a=mf.get(a))&&Rf(r,a),o=(e.ownerDocument||e).createElement(`link`),_t(o);var s=o;return s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),Pd(o,`link`,r),t.state.loading|=4,Lf(o,n.precedence,e),t.instance=o;case`script`:return o=Pf(n.src),(a=e.querySelector(Ff(o)))?(t.instance=a,_t(a),a):(r=n,(a=mf.get(o))&&(r=h({},n),zf(r,a)),e=e.ownerDocument||e,a=e.createElement(`script`),_t(a),Pd(a,`link`,r),e.head.appendChild(a),t.instance=a);case`void`:return null;default:throw Error(i(443,t.type))}else t.type===`stylesheet`&&!(t.state.loading&4)&&(r=t.instance,t.state.loading|=4,Lf(r,n.precedence,e));return t.instance}function Lf(e,t,n){for(var r=n.querySelectorAll(`link[rel="stylesheet"][data-precedence],style[data-precedence]`),i=r.length?r[r.length-1]:null,a=i,o=0;o<r.length;o++){var s=r[o];if(s.dataset.precedence===t)a=s;else if(a!==i)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function Rf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.title??=t.title}function zf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.integrity??=t.integrity}var Bf=null;function Vf(e,t,n){if(Bf===null){var r=new Map,i=Bf=new Map;i.set(n,r)}else i=Bf,r=i.get(n),r||(r=new Map,i.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),i=0;i<n.length;i++){var a=n[i];if(!(a[dt]||a[it]||e===`link`&&a.getAttribute(`rel`)===`stylesheet`)&&a.namespaceURI!==`http://www.w3.org/2000/svg`){var o=a.getAttribute(t)||``;o=e+o;var s=r.get(o);s?s.push(a):r.set(o,[a])}}return r}function Hf(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t===`title`?e.querySelector(`head > title`):null)}function Uf(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case`meta`:case`title`:return!0;case`style`:if(typeof t.precedence!=`string`||typeof t.href!=`string`||t.href===``)break;return!0;case`link`:if(typeof t.rel!=`string`||typeof t.href!=`string`||t.href===``||t.onLoad||t.onError)break;switch(t.rel){case`stylesheet`:return e=t.disabled,typeof t.precedence==`string`&&e==null;default:return!0}case`script`:if(t.async&&typeof t.async!=`function`&&typeof t.async!=`symbol`&&!t.onLoad&&!t.onError&&t.src&&typeof t.src==`string`)return!0}return!1}function Wf(e){return!(e.type===`stylesheet`&&!(e.state.loading&3))}function Gf(e,t,n,r){if(n.type===`stylesheet`&&(typeof r.media!=`string`||!1!==matchMedia(r.media).matches)&&!(n.state.loading&4)){if(n.instance===null){var i=Af(r.href),a=t.querySelector(jf(i));if(a){t=a._p,typeof t==`object`&&t&&typeof t.then==`function`&&(e.count++,e=Jf.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,_t(a);return}a=t.ownerDocument||t,r=Mf(r),(i=mf.get(i))&&Rf(r,i),a=a.createElement(`link`),_t(a);var o=a;o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),Pd(a,`link`,r),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&!(n.state.loading&3)&&(e.count++,n=Jf.bind(e),t.addEventListener(`load`,n),t.addEventListener(`error`,n))}}var Kf=0;function qf(e,t){return e.stylesheets&&e.count===0&&Xf(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var r=setTimeout(function(){if(e.stylesheets&&Xf(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4+t);0<e.imgBytes&&Kf===0&&(Kf=62500*Ld());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Xf(e,e.stylesheets),e.unsuspend)){var t=e.unsuspend;e.unsuspend=null,t()}},(e.imgBytes>Kf?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(i)}}:null}function Jf(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Xf(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Yf=null;function Xf(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Yf=new Map,t.forEach(Zf,e),Yf=null,Jf.call(e))}function Zf(e,t){if(!(t.state.loading&4)){var n=Yf.get(e);if(n)var r=n.get(null);else{n=new Map,Yf.set(e,n);for(var i=e.querySelectorAll(`link[data-precedence],style[data-precedence]`),a=0;a<i.length;a++){var o=i[a];(o.nodeName===`LINK`||o.getAttribute(`media`)!==`not all`)&&(n.set(o.dataset.precedence,o),r=o)}r&&n.set(null,r)}i=t.instance,o=i.getAttribute(`data-precedence`),a=n.get(o)||r,a===r&&n.set(null,i),n.set(o,i),this.count++,r=Jf.bind(this),i.addEventListener(`load`,r),i.addEventListener(`error`,r),a?a.parentNode.insertBefore(i,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var Qf={$$typeof:C,Provider:null,Consumer:null,_currentValue:M,_currentValue2:M,_threadCount:0};function $f(e,t,n,r,i,a,o,s,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=qe(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=qe(0),this.hiddenUpdates=qe(null),this.identifierPrefix=r,this.onUncaughtError=i,this.onCaughtError=a,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.incompleteTransitions=new Map}function ep(e,t,n,r,i,a,o,s,c,l,u,d){return e=new $f(e,t,n,o,c,l,u,d,s),t=1,!0===a&&(t|=24),a=ri(3,null,null,t),e.current=a,a.stateNode=e,t=ta(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:r,isDehydrated:n,cache:t},Pa(a),e}function tp(e){return e?(e=ti,e):ti}function np(e,t,n,r,i,a){i=tp(i),r.context===null?r.context=i:r.pendingContext=i,r=Ia(t),r.payload={element:n},a=a===void 0?null:a,a!==null&&(r.callback=a),n=La(e,r,t),n!==null&&(mu(n,e,t),Ra(n,e,t))}function rp(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function ip(e,t){rp(e,t),(e=e.alternate)&&rp(e,t)}function ap(e){if(e.tag===13||e.tag===31){var t=$r(e,67108864);t!==null&&mu(t,e,67108864),ip(e,67108864)}}function op(e){if(e.tag===13||e.tag===31){var t=fu();t=$e(t);var n=$r(e,t);n!==null&&mu(n,e,t),ip(e,t)}}var sp=!0;function cp(e,t,n,r){var i=A.T;A.T=null;var a=j.p;try{j.p=2,up(e,t,n,r)}finally{j.p=a,A.T=i}}function lp(e,t,n,r){var i=A.T;A.T=null;var a=j.p;try{j.p=8,up(e,t,n,r)}finally{j.p=a,A.T=i}}function up(e,t,n,r){if(sp){var i=dp(r);if(i===null)Cd(e,t,r,fp,n),Cp(e,r);else if(Tp(i,e,t,n,r))r.stopPropagation();else if(Cp(e,r),t&4&&-1<Sp.indexOf(e)){for(;i!==null;){var a=mt(i);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var o=He(a.pendingLanes);if(o!==0){var s=a;for(s.pendingLanes|=2,s.entangledLanes|=2;o;){var c=1<<31-Fe(o);s.entanglements[1]|=c,o&=~c}nd(a),!(J&6)&&(eu=z()+500,rd(0,!1))}}break;case 31:case 13:s=$r(a,2),s!==null&&mu(s,a,2),yu(),ip(a,2)}if(a=dp(r),a===null&&Cd(e,t,r,fp,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else Cd(e,t,r,null,n)}}function dp(e){return e=$t(e),pp(e)}var fp=null;function pp(e){if(fp=null,e=pt(e),e!==null){var t=o(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=s(t),e!==null)return e;e=null}else if(n===31){if(e=c(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return fp=e,null}function mp(e){switch(e){case`beforetoggle`:case`cancel`:case`click`:case`close`:case`contextmenu`:case`copy`:case`cut`:case`auxclick`:case`dblclick`:case`dragend`:case`dragstart`:case`drop`:case`focusin`:case`focusout`:case`input`:case`invalid`:case`keydown`:case`keypress`:case`keyup`:case`mousedown`:case`mouseup`:case`paste`:case`pause`:case`play`:case`pointercancel`:case`pointerdown`:case`pointerup`:case`ratechange`:case`reset`:case`resize`:case`seeked`:case`submit`:case`toggle`:case`touchcancel`:case`touchend`:case`touchstart`:case`volumechange`:case`change`:case`selectionchange`:case`textInput`:case`compositionstart`:case`compositionend`:case`compositionupdate`:case`beforeblur`:case`afterblur`:case`beforeinput`:case`blur`:case`fullscreenchange`:case`focus`:case`hashchange`:case`popstate`:case`select`:case`selectstart`:return 2;case`drag`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`mousemove`:case`mouseout`:case`mouseover`:case`pointermove`:case`pointerout`:case`pointerover`:case`scroll`:case`touchmove`:case`wheel`:case`mouseenter`:case`mouseleave`:case`pointerenter`:case`pointerleave`:return 8;case`message`:switch(Te()){case Ee:return 2;case De:return 8;case Oe:case ke:return 32;case Ae:return 268435456;default:return 32}default:return 32}}var hp=!1,gp=null,_p=null,vp=null,yp=new Map,bp=new Map,xp=[],Sp=`mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(` `);function Cp(e,t){switch(e){case`focusin`:case`focusout`:gp=null;break;case`dragenter`:case`dragleave`:_p=null;break;case`mouseover`:case`mouseout`:vp=null;break;case`pointerover`:case`pointerout`:yp.delete(t.pointerId);break;case`gotpointercapture`:case`lostpointercapture`:bp.delete(t.pointerId)}}function wp(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=mt(t),t!==null&&ap(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Tp(e,t,n,r,i){switch(t){case`focusin`:return gp=wp(gp,e,t,n,r,i),!0;case`dragenter`:return _p=wp(_p,e,t,n,r,i),!0;case`mouseover`:return vp=wp(vp,e,t,n,r,i),!0;case`pointerover`:var a=i.pointerId;return yp.set(a,wp(yp.get(a)||null,e,t,n,r,i)),!0;case`gotpointercapture`:return a=i.pointerId,bp.set(a,wp(bp.get(a)||null,e,t,n,r,i)),!0}return!1}function Ep(e){var t=pt(e.target);if(t!==null){var n=o(t);if(n!==null){if(t=n.tag,t===13){if(t=s(n),t!==null){e.blockedOn=t,nt(e.priority,function(){op(n)});return}}else if(t===31){if(t=c(n),t!==null){e.blockedOn=t,nt(e.priority,function(){op(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Dp(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=dp(e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Qt=r,n.target.dispatchEvent(r),Qt=null}else return t=mt(n),t!==null&&ap(t),e.blockedOn=n,!1;t.shift()}return!0}function Op(e,t,n){Dp(e)&&n.delete(t)}function kp(){hp=!1,gp!==null&&Dp(gp)&&(gp=null),_p!==null&&Dp(_p)&&(_p=null),vp!==null&&Dp(vp)&&(vp=null),yp.forEach(Op),bp.forEach(Op)}function Ap(e,n){e.blockedOn===n&&(e.blockedOn=null,hp||(hp=!0,t.unstable_scheduleCallback(t.unstable_NormalPriority,kp)))}var jp=null;function Mp(e){jp!==e&&(jp=e,t.unstable_scheduleCallback(t.unstable_NormalPriority,function(){jp===e&&(jp=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],i=e[t+2];if(typeof r!=`function`){if(pp(r||n)===null)continue;break}var a=mt(n);a!==null&&(e.splice(t,3),t-=3,bs(a,{pending:!0,data:i,method:n.method,action:r},r,i))}}))}function Np(e){function t(t){return Ap(t,e)}gp!==null&&Ap(gp,e),_p!==null&&Ap(_p,e),vp!==null&&Ap(vp,e),yp.forEach(t),bp.forEach(t);for(var n=0;n<xp.length;n++){var r=xp[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<xp.length&&(n=xp[0],n.blockedOn===null);)Ep(n),n.blockedOn===null&&xp.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(r=0;r<n.length;r+=3){var i=n[r],a=n[r+1],o=i[at]||null;if(typeof a==`function`)o||Mp(n);else if(o){var s=null;if(a&&a.hasAttribute(`formAction`)){if(i=a,o=a[at]||null)s=o.formAction;else if(pp(i)!==null)continue}else s=o.action;typeof s==`function`?n[r+1]=s:(n.splice(r,3),r-=3),Mp(n)}}}function Pp(){function e(e){e.canIntercept&&e.info===`react-transition`&&e.intercept({handler:function(){return new Promise(function(e){return i=e})},focusReset:`manual`,scroll:`manual`})}function t(){i!==null&&(i(),i=null),r||setTimeout(n,20)}function n(){if(!r&&!navigation.transition){var e=navigation.currentEntry;e&&e.url!=null&&navigation.navigate(e.url,{state:e.getState(),info:`react-transition`,history:`replace`})}}if(typeof navigation==`object`){var r=!1,i=null;return navigation.addEventListener(`navigate`,e),navigation.addEventListener(`navigatesuccess`,t),navigation.addEventListener(`navigateerror`,t),setTimeout(n,100),function(){r=!0,navigation.removeEventListener(`navigate`,e),navigation.removeEventListener(`navigatesuccess`,t),navigation.removeEventListener(`navigateerror`,t),i!==null&&(i(),i=null)}}}function Fp(e){this._internalRoot=e}Ip.prototype.render=Fp.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(i(409));var n=t.current;np(n,fu(),e,t,null,null)},Ip.prototype.unmount=Fp.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;np(e.current,2,null,e,null,null),yu(),t[ot]=null}};function Ip(e){this._internalRoot=e}Ip.prototype.unstable_scheduleHydration=function(e){if(e){var t=tt();e={blockedOn:null,target:e,priority:t};for(var n=0;n<xp.length&&t!==0&&t<xp[n].priority;n++);xp.splice(n,0,e),n===0&&Ep(e)}};var Lp=n.version;if(Lp!==`19.2.7`)throw Error(i(527,Lp,`19.2.7`));j.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render==`function`?Error(i(188)):(e=Object.keys(e).join(`,`),Error(i(268,e)));return e=d(t),e=e===null?null:p(e),e=e===null?null:e.stateNode,e};var Rp={bundleType:0,version:`19.2.7`,rendererPackageName:`react-dom`,currentDispatcherRef:A,reconcilerVersion:`19.2.7`};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`){var zp=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!zp.isDisabled&&zp.supportsFiber)try{Ne=zp.inject(Rp),B=zp}catch{}}e.createRoot=function(e,t){if(!a(e))throw Error(i(299));var n=!1,r=``,o=Us,s=Ws,c=Gs;return t!=null&&(!0===t.unstable_strictMode&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onUncaughtError!==void 0&&(o=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(c=t.onRecoverableError)),t=ep(e,1,!1,null,null,n,r,null,o,s,c,Pp),e[ot]=t.current,xd(e),new Fp(t)}})),g=o(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=h()})),_=c(u(),1),v=g(),y=`modulepreload`,b=function(e){return`/`+e},x={},S=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}r=o(t.map(t=>{if(t=b(t,n),t in x)return;x[t]=!0;let r=t.endsWith(`.css`),i=r?`[rel="stylesheet"]`:``;if(n)for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${t}"]${i}`))return;let o=document.createElement(`link`);if(o.rel=r?`stylesheet`:y,r||(o.as=`script`),o.crossOrigin=``,o.href=t,a&&o.setAttribute(`nonce`,a),document.head.appendChild(o),r)return new Promise((e,n)=>{o.addEventListener(`load`,e),o.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},C=`popstate`;function w(e){return typeof e==`object`&&!!e&&`pathname`in e&&`search`in e&&`hash`in e&&`state`in e&&`key`in e}function ee(e={}){function t(e,t){let n=t.state?.masked,{pathname:r,search:i,hash:a}=n||e.location;return O(``,{pathname:r,search:i,hash:a},t.state&&t.state.usr||null,t.state&&t.state.key||`default`,n?{pathname:e.location.pathname,search:e.location.search,hash:e.location.hash}:void 0)}function n(e,t){return typeof t==`string`?t:ne(t)}return re(t,n,null,e)}function T(e,t){if(e===!1||e==null)throw Error(t)}function E(e,t){if(!e){typeof console<`u`&&console.warn(t);try{throw Error(t)}catch{}}}function D(){return Math.random().toString(36).substring(2,10)}function te(e,t){return{usr:e.state,key:e.key,idx:t,masked:e.mask?{pathname:e.pathname,search:e.search,hash:e.hash}:void 0}}function O(e,t,n=null,r,i){return{pathname:typeof e==`string`?e:e.pathname,search:``,hash:``,...typeof t==`string`?k(t):t,state:n,key:t&&t.key||r||D(),mask:i}}function ne({pathname:e=`/`,search:t=``,hash:n=``}){return t&&t!==`?`&&(e+=t.charAt(0)===`?`?t:`?`+t),n&&n!==`#`&&(e+=n.charAt(0)===`#`?n:`#`+n),e}function k(e){let t={};if(e){let n=e.indexOf(`#`);n>=0&&(t.hash=e.substring(n),e=e.substring(0,n));let r=e.indexOf(`?`);r>=0&&(t.search=e.substring(r),e=e.substring(0,r)),e&&(t.pathname=e)}return t}function re(e,t,n,r={}){let{window:i=document.defaultView,v5Compat:a=!1}=r,o=i.history,s=`POP`,c=null,l=u();l??(l=0,o.replaceState({...o.state,idx:l},``));function u(){return(o.state||{idx:null}).idx}function d(){s=`POP`;let e=u(),t=e==null?null:e-l;l=e,c&&c({action:s,location:h.location,delta:t})}function f(e,t){s=`PUSH`;let r=w(e)?e:O(h.location,e,t);n&&n(r,e),l=u()+1;let d=te(r,l),f=h.createHref(r.mask||r);try{o.pushState(d,``,f)}catch(e){if(e instanceof DOMException&&e.name===`DataCloneError`)throw e;i.location.assign(f)}a&&c&&c({action:s,location:h.location,delta:1})}function p(e,t){s=`REPLACE`;let r=w(e)?e:O(h.location,e,t);n&&n(r,e),l=u();let i=te(r,l),d=h.createHref(r.mask||r);o.replaceState(i,``,d),a&&c&&c({action:s,location:h.location,delta:0})}function m(e){return ie(i,e)}let h={get action(){return s},get location(){return e(i,o)},listen(e){if(c)throw Error(`A history only accepts one active listener`);return i.addEventListener(C,d),c=e,()=>{i.removeEventListener(C,d),c=null}},createHref(e){return t(i,e)},createURL:m,encodeLocation(e){let t=m(e);return{pathname:t.pathname,search:t.search,hash:t.hash}},push:f,replace:p,go(e){return o.go(e)}};return h}function ie(e,t,n=!1){let r=`http://localhost`;e&&(r=e.location.origin===`null`?e.location.href:e.location.origin),T(r,`No window.location.(origin|href) available to create URL`);let i=typeof t==`string`?t:ne(t);return i=i.replace(/ $/,`%20`),!n&&i.startsWith(`//`)&&(i=r+i),new URL(i,r)}function ae(e,t,n=`/`){return A(e,t,n,!1)}function A(e,t,n,r,i){let a=ge((typeof t==`string`?k(t):t).pathname||`/`,n);if(a==null)return null;let o=i??M(e),s=null,c=R(a);for(let e=0;s==null&&e<o.length;++e)s=pe(o[e],c,r);return s}function j(e,t){let{route:n,pathname:r,params:i}=e;return{id:n.id,pathname:r,params:i,data:t[n.id],loaderData:t[n.id],handle:n.handle}}function M(e){let t=oe(e);return ce(t),t}function oe(e,t=[],n=[],r=``,i=!1){let a=(e,a,o=i,s)=>{let c={relativePath:s===void 0?e.path||``:s,caseSensitive:e.caseSensitive===!0,childrenIndex:a,route:e};if(c.relativePath.startsWith(`/`)){if(!c.relativePath.startsWith(r)&&o)return;T(c.relativePath.startsWith(r),`Absolute route path "${c.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),c.relativePath=c.relativePath.slice(r.length)}let l=z([r,c.relativePath]),u=n.concat(c);e.children&&e.children.length>0&&(T(e.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${l}".`),oe(e.children,t,u,l,o)),!(e.path==null&&!e.index)&&t.push({path:l,score:de(l,e.index),routesMeta:u})};return e.forEach((e,t)=>{if(e.path===``||!e.path?.includes(`?`))a(e,t);else for(let n of se(e.path))a(e,t,!0,n)}),t}function se(e){let t=e.split(`/`);if(t.length===0)return[];let[n,...r]=t,i=n.endsWith(`?`),a=n.replace(/\?$/,``);if(r.length===0)return i?[a,``]:[a];let o=se(r.join(`/`)),s=[];return s.push(...o.map(e=>e===``?a:[a,e].join(`/`))),i&&s.push(...o),s.map(t=>e.startsWith(`/`)&&t===``?`/`:t)}function ce(e){e.sort((e,t)=>e.score===t.score?fe(e.routesMeta.map(e=>e.childrenIndex),t.routesMeta.map(e=>e.childrenIndex)):t.score-e.score)}var N=/^:[\w-]+$/,P=3,F=2,le=1,I=10,ue=-2,L=e=>e===`*`;function de(e,t){let n=e.split(`/`),r=n.length;return n.some(L)&&(r+=ue),t&&(r+=F),n.filter(e=>!L(e)).reduce((e,t)=>e+(N.test(t)?P:t===``?le:I),r)}function fe(e,t){return e.length===t.length&&e.slice(0,-1).every((e,n)=>e===t[n])?e[e.length-1]-t[t.length-1]:0}function pe(e,t,n=!1){let{routesMeta:r}=e,i={},a=`/`,o=[];for(let e=0;e<r.length;++e){let s=r[e],c=e===r.length-1,l=a===`/`?t:t.slice(a.length)||`/`,u=me({path:s.relativePath,caseSensitive:s.caseSensitive,end:c},l),d=s.route;if(!u&&c&&n&&!r[r.length-1].route.index&&(u=me({path:s.relativePath,caseSensitive:s.caseSensitive,end:!1},l)),!u)return null;Object.assign(i,u.params),o.push({params:i,pathname:z([a,u.pathname]),pathnameBase:Ee(z([a,u.pathnameBase])),route:d}),u.pathnameBase!==`/`&&(a=z([a,u.pathnameBase]))}return o}function me(e,t){typeof e==`string`&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=he(e.path,e.caseSensitive,e.end),i=t.match(n);if(!i)return null;let a=i[0],o=a.replace(/(.)\/+$/,`$1`),s=i.slice(1);return{params:r.reduce((e,{paramName:t,isOptional:n},r)=>{if(t===`*`){let e=s[r]||``;o=a.slice(0,a.length-e.length).replace(/(.)\/+$/,`$1`)}let i=s[r];return n&&!i?e[t]=void 0:e[t]=(i||``).replace(/%2F/g,`/`),e},{}),pathname:a,pathnameBase:o,pattern:e}}function he(e,t=!1,n=!0){E(e===`*`||!e.endsWith(`*`)||e.endsWith(`/*`),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,`/*`)}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,`/*`)}".`);let r=[],i=`^`+e.replace(/\/*\*?$/,``).replace(/^\/*/,`/`).replace(/[\\.*+^${}|()[\]]/g,`\\$&`).replace(/\/:([\w-]+)(\?)?/g,(e,t,n,i,a)=>{if(r.push({paramName:t,isOptional:n!=null}),n){let t=a.charAt(i+e.length);return t&&t!==`/`?`/([^\\/]*)`:`(?:/([^\\/]*))?`}return`/([^\\/]+)`}).replace(/\/([\w-]+)\?(\/|$)/g,`(/$1)?$2`);return e.endsWith(`*`)?(r.push({paramName:`*`}),i+=e===`*`||e===`/*`?`(.*)$`:`(?:\\/(.+)|\\/*)$`):n?i+=`\\/*$`:e!==``&&e!==`/`&&(i+=`(?:(?=\\/|$))`),[new RegExp(i,t?void 0:`i`),r]}function R(e){try{return e.split(`/`).map(e=>decodeURIComponent(e).replace(/\//g,`%2F`)).join(`/`)}catch(t){return E(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function ge(e,t){if(t===`/`)return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith(`/`)?t.length-1:t.length,r=e.charAt(n);return r&&r!==`/`?null:e.slice(n)||`/`}var _e=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;function ve(e,t=`/`){let{pathname:n,search:r=``,hash:i=``}=typeof e==`string`?k(e):e,a;return n?(n=we(n),a=n.startsWith(`/`)?ye(n.substring(1),`/`):ye(n,t)):a=t,{pathname:a,search:De(r),hash:Oe(i)}}function ye(e,t){let n=Te(t).split(`/`);return e.split(`/`).forEach(e=>{e===`..`?n.length>1&&n.pop():e!==`.`&&n.push(e)}),n.length>1?n.join(`/`):`/`}function be(e,t,n,r){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function xe(e){return e.filter((e,t)=>t===0||e.route.path&&e.route.path.length>0)}function Se(e){let t=xe(e);return t.map((e,n)=>n===t.length-1?e.pathname:e.pathnameBase)}function Ce(e,t,n,r=!1){let i;typeof e==`string`?i=k(e):(i={...e},T(!i.pathname||!i.pathname.includes(`?`),be(`?`,`pathname`,`search`,i)),T(!i.pathname||!i.pathname.includes(`#`),be(`#`,`pathname`,`hash`,i)),T(!i.search||!i.search.includes(`#`),be(`#`,`search`,`hash`,i)));let a=e===``||i.pathname===``,o=a?`/`:i.pathname,s;if(o==null)s=n;else{let e=t.length-1;if(!r&&o.startsWith(`..`)){let t=o.split(`/`);for(;t[0]===`..`;)t.shift(),--e;i.pathname=t.join(`/`)}s=e>=0?t[e]:`/`}let c=ve(i,s),l=o&&o!==`/`&&o.endsWith(`/`),u=(a||o===`.`)&&n.endsWith(`/`);return!c.pathname.endsWith(`/`)&&(l||u)&&(c.pathname+=`/`),c}var we=e=>e.replace(/\/\/+/g,`/`),z=e=>we(e.join(`/`)),Te=e=>e.replace(/\/+$/,``),Ee=e=>Te(e).replace(/^\/*/,`/`),De=e=>!e||e===`?`?``:e.startsWith(`?`)?e:`?`+e,Oe=e=>!e||e===`#`?``:e.startsWith(`#`)?e:`#`+e,ke=class{constructor(e,t,n,r=!1){this.status=e,this.statusText=t||``,this.internal=r,n instanceof Error?(this.data=n.toString(),this.error=n):this.data=n}};function Ae(e){return e!=null&&typeof e.status==`number`&&typeof e.statusText==`string`&&typeof e.internal==`boolean`&&`data`in e}function je(e){return z(e.map(e=>e.route.path).filter(Boolean))||`/`}var Me=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0;function Ne(e,t){let n=e;if(typeof n!=`string`||!_e.test(n))return{absoluteURL:void 0,isExternal:!1,to:n};let r=n,i=!1;if(Me)try{let e=new URL(window.location.href),r=n.startsWith(`//`)?new URL(e.protocol+n):new URL(n),a=ge(r.pathname,t);r.origin===e.origin&&a!=null?n=a+r.search+r.hash:i=!0}catch{E(!1,`<Link to="${n}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:r,isExternal:i,to:n}}Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);var B=[`POST`,`PUT`,`PATCH`,`DELETE`];new Set(B);var Pe=[`GET`,...B];new Set(Pe);var Fe=_.createContext(null);Fe.displayName=`DataRouter`;var Ie=_.createContext(null);Ie.displayName=`DataRouterState`;var Le=_.createContext(!1);function Re(){return _.useContext(Le)}var ze=_.createContext({isTransitioning:!1});ze.displayName=`ViewTransition`;var Be=_.createContext(new Map);Be.displayName=`Fetchers`;var Ve=_.createContext(null);Ve.displayName=`Await`;var He=_.createContext(null);He.displayName=`Navigation`;var Ue=_.createContext(null);Ue.displayName=`Location`;var We=_.createContext({outlet:null,matches:[],isDataRoute:!1});We.displayName=`Route`;var Ge=_.createContext(null);Ge.displayName=`RouteError`;var Ke=`REACT_ROUTER_ERROR`,qe=`REDIRECT`,Je=`ROUTE_ERROR_RESPONSE`;function Ye(e){if(e.startsWith(`${Ke}:${qe}:{`))try{let t=JSON.parse(e.slice(28));if(typeof t==`object`&&t&&typeof t.status==`number`&&typeof t.statusText==`string`&&typeof t.location==`string`&&typeof t.reloadDocument==`boolean`&&typeof t.replace==`boolean`)return t}catch{}}function Xe(e){if(e.startsWith(`${Ke}:${Je}:{`))try{let t=JSON.parse(e.slice(40));if(typeof t==`object`&&t&&typeof t.status==`number`&&typeof t.statusText==`string`)return new ke(t.status,t.statusText,t.data)}catch{}}function Ze(e,{relative:t}={}){T(Qe(),`useHref() may be used only in the context of a <Router> component.`);let{basename:n,navigator:r}=_.useContext(He),{hash:i,pathname:a,search:o}=it(e,{relative:t}),s=a;return n!==`/`&&(s=a===`/`?n:z([n,a])),r.createHref({pathname:s,search:o,hash:i})}function Qe(){return _.useContext(Ue)!=null}function $e(){return T(Qe(),`useLocation() may be used only in the context of a <Router> component.`),_.useContext(Ue).location}var et=`You should call navigate() in a React.useEffect(), not when your component is first rendered.`;function tt(e){_.useContext(He).static||_.useLayoutEffect(e)}function nt(){let{isDataRoute:e}=_.useContext(We);return e?Ct():rt()}function rt(){T(Qe(),`useNavigate() may be used only in the context of a <Router> component.`);let e=_.useContext(Fe),{basename:t,navigator:n}=_.useContext(He),{matches:r}=_.useContext(We),{pathname:i}=$e(),a=JSON.stringify(Se(r)),o=_.useRef(!1);return tt(()=>{o.current=!0}),_.useCallback((r,s={})=>{if(E(o.current,et),!o.current)return;if(typeof r==`number`){n.go(r);return}let c=Ce(r,JSON.parse(a),i,s.relative===`path`);e==null&&t!==`/`&&(c.pathname=c.pathname===`/`?t:z([t,c.pathname])),(s.replace?n.replace:n.push)(c,s.state,s)},[t,n,a,i,e])}_.createContext(null);function it(e,{relative:t}={}){let{matches:n}=_.useContext(We),{pathname:r}=$e(),i=JSON.stringify(Se(n));return _.useMemo(()=>Ce(e,JSON.parse(i),r,t===`path`),[e,i,r,t])}function at(e,t){return ot(e,t)}function ot(e,t,n){T(Qe(),`useRoutes() may be used only in the context of a <Router> component.`);let{navigator:r}=_.useContext(He),{matches:i}=_.useContext(We),a=i[i.length-1],o=a?a.params:{},s=a?a.pathname:`/`,c=a?a.pathnameBase:`/`,l=a&&a.route;{let e=l&&l.path||``;Tt(s,!l||e.endsWith(`*`)||e.endsWith(`*?`),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${s}" (under <Route path="${e}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${e}"> to <Route path="${e===`/`?`*`:`${e}/*`}">.`)}let u=$e(),d;if(t){let e=typeof t==`string`?k(t):t;T(c===`/`||e.pathname?.startsWith(c),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${c}" but pathname "${e.pathname}" was given in the \`location\` prop.`),d=e}else d=u;let f=d.pathname||`/`,p=f;if(c!==`/`){let e=c.replace(/^\//,``).split(`/`);p=`/`+f.replace(/^\//,``).split(`/`).slice(e.length).join(`/`)}let m=n&&n.state.matches.length?n.state.matches.map(e=>Object.assign(e,{route:n.manifest[e.route.id]||e.route})):ae(e,{pathname:p});E(l||m!=null,`No routes matched location "${d.pathname}${d.search}${d.hash}" `),E(m==null||m[m.length-1].route.element!==void 0||m[m.length-1].route.Component!==void 0||m[m.length-1].route.lazy!==void 0,`Matched leaf route at location "${d.pathname}${d.search}${d.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let h=pt(m&&m.map(e=>Object.assign({},e,{params:Object.assign({},o,e.params),pathname:z([c,r.encodeLocation?r.encodeLocation(e.pathname.replace(/%/g,`%25`).replace(/\?/g,`%3F`).replace(/#/g,`%23`)).pathname:e.pathname]),pathnameBase:e.pathnameBase===`/`?c:z([c,r.encodeLocation?r.encodeLocation(e.pathnameBase.replace(/%/g,`%25`).replace(/\?/g,`%3F`).replace(/#/g,`%23`)).pathname:e.pathnameBase])})),i,n);return t&&h?_.createElement(Ue.Provider,{value:{location:{pathname:`/`,search:``,hash:``,state:null,key:`default`,mask:void 0,...d},navigationType:`POP`}},h):h}function st(){let e=St(),t=Ae(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,r=`rgba(200,200,200, 0.5)`,i={padding:`0.5rem`,backgroundColor:r},a={padding:`2px 4px`,backgroundColor:r},o=null;return console.error(`Error handled by React Router default ErrorBoundary:`,e),o=_.createElement(_.Fragment,null,_.createElement(`p`,null,`💿 Hey developer 👋`),_.createElement(`p`,null,`You can provide a way better UX than this when your app throws errors by providing your own `,_.createElement(`code`,{style:a},`ErrorBoundary`),` or`,` `,_.createElement(`code`,{style:a},`errorElement`),` prop on your route.`)),_.createElement(_.Fragment,null,_.createElement(`h2`,null,`Unexpected Application Error!`),_.createElement(`h3`,{style:{fontStyle:`italic`}},t),n?_.createElement(`pre`,{style:i},n):null,o)}var ct=_.createElement(st,null),lt=class extends _.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!==`idle`&&e.revalidation===`idle`?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error===void 0?t.error:e.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){this.props.onError?this.props.onError(e,t):console.error(`React Router caught the following error during render`,e)}render(){let e=this.state.error;if(this.context&&typeof e==`object`&&e&&`digest`in e&&typeof e.digest==`string`){let t=Xe(e.digest);t&&(e=t)}let t=e===void 0?this.props.children:_.createElement(We.Provider,{value:this.props.routeContext},_.createElement(Ge.Provider,{value:e,children:this.props.component}));return this.context?_.createElement(dt,{error:e},t):t}};lt.contextType=Le;var ut=new WeakMap;function dt({children:e,error:t}){let{basename:n}=_.useContext(He);if(typeof t==`object`&&t&&`digest`in t&&typeof t.digest==`string`){let e=Ye(t.digest);if(e){let r=ut.get(t);if(r)throw r;let i=Ne(e.location,n);if(Me&&!ut.get(t))if(i.isExternal||e.reloadDocument)window.location.href=i.absoluteURL||i.to;else{let n=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(i.to,{replace:e.replace}));throw ut.set(t,n),n}return _.createElement(`meta`,{httpEquiv:`refresh`,content:`0;url=${i.absoluteURL||i.to}`})}}return e}function ft({routeContext:e,match:t,children:n}){let r=_.useContext(Fe);return r&&r.static&&r.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(r.staticContext._deepestRenderedBoundaryId=t.route.id),_.createElement(We.Provider,{value:e},n)}function pt(e,t=[],n){let r=n?.state;if(e==null){if(!r)return null;if(r.errors)e=r.matches;else if(t.length===0&&!r.initialized&&r.matches.length>0)e=r.matches;else return null}let i=e,a=r?.errors;if(a!=null){let e=i.findIndex(e=>e.route.id&&a?.[e.route.id]!==void 0);T(e>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(a).join(`,`)}`),i=i.slice(0,Math.min(i.length,e+1))}let o=!1,s=-1;if(n&&r){o=r.renderFallback;for(let e=0;e<i.length;e++){let t=i[e];if((t.route.HydrateFallback||t.route.hydrateFallbackElement)&&(s=e),t.route.id){let{loaderData:e,errors:a}=r,c=t.route.loader&&!e.hasOwnProperty(t.route.id)&&(!a||a[t.route.id]===void 0);if(t.route.lazy||c){n.isStatic&&(o=!0),i=s>=0?i.slice(0,s+1):[i[0]];break}}}}let c=n?.onError,l=r&&c?(e,t)=>{c(e,{location:r.location,params:r.matches?.[0]?.params??{},pattern:je(r.matches),errorInfo:t})}:void 0;return i.reduceRight((e,n,c)=>{let u,d=!1,f=null,p=null;r&&(u=a&&n.route.id?a[n.route.id]:void 0,f=n.route.errorElement||ct,o&&(s<0&&c===0?(Tt(`route-fallback`,!1,"No `HydrateFallback` element provided to render during initial hydration"),d=!0,p=null):s===c&&(d=!0,p=n.route.hydrateFallbackElement||null)));let m=t.concat(i.slice(0,c+1)),h=()=>{let t;return t=u?f:d?p:n.route.Component?_.createElement(n.route.Component,null):n.route.element?n.route.element:e,_.createElement(ft,{match:n,routeContext:{outlet:e,matches:m,isDataRoute:r!=null},children:t})};return r&&(n.route.ErrorBoundary||n.route.errorElement||c===0)?_.createElement(lt,{location:r.location,revalidation:r.revalidation,component:f,error:u,children:h(),routeContext:{outlet:null,matches:m,isDataRoute:!0},onError:l}):h()},null)}function mt(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function ht(e){let t=_.useContext(Fe);return T(t,mt(e)),t}function gt(e){let t=_.useContext(Ie);return T(t,mt(e)),t}function _t(e){let t=_.useContext(We);return T(t,mt(e)),t}function vt(e){let t=_t(e),n=t.matches[t.matches.length-1];return T(n.route.id,`${e} can only be used on routes that contain a unique "id"`),n.route.id}function yt(){return vt(`useRouteId`)}function bt(){let e=gt(`useNavigation`);return _.useMemo(()=>{let{matches:t,historyAction:n,...r}=e.navigation;return r},[e.navigation])}function xt(){let{matches:e,loaderData:t}=gt(`useMatches`);return _.useMemo(()=>e.map(e=>j(e,t)),[e,t])}function St(){let e=_.useContext(Ge),t=gt(`useRouteError`),n=vt(`useRouteError`);return e===void 0?t.errors?.[n]:e}function Ct(){let{router:e}=ht(`useNavigate`),t=vt(`useNavigate`),n=_.useRef(!1);return tt(()=>{n.current=!0}),_.useCallback(async(r,i={})=>{E(n.current,et),n.current&&(typeof r==`number`?await e.navigate(r):await e.navigate(r,{fromRouteId:t,...i}))},[e,t])}var wt={};function Tt(e,t,n){!t&&!wt[e]&&(wt[e]=!0,E(!1,n))}_.memo(Et);function Et({routes:e,manifest:t,future:n,state:r,isStatic:i,onError:a}){return ot(e,void 0,{manifest:t,state:r,isStatic:i,onError:a,future:n})}function Dt(e){T(!1,`A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.`)}function Ot({basename:e=`/`,children:t=null,location:n,navigationType:r=`POP`,navigator:i,static:a=!1,useTransitions:o}){T(!Qe(),`You cannot render a <Router> inside another <Router>. You should never have more than one in your app.`);let s=e.replace(/^\/*/,`/`),c=_.useMemo(()=>({basename:s,navigator:i,static:a,useTransitions:o,future:{}}),[s,i,a,o]);typeof n==`string`&&(n=k(n));let{pathname:l=`/`,search:u=``,hash:d=``,state:f=null,key:p=`default`,mask:m}=n,h=_.useMemo(()=>{let e=ge(l,s);return e==null?null:{location:{pathname:e,search:u,hash:d,state:f,key:p,mask:m},navigationType:r}},[s,l,u,d,f,p,r,m]);return E(h!=null,`<Router basename="${s}"> is not able to match the URL "${l}${u}${d}" because it does not start with the basename, so the <Router> won't render anything.`),h==null?null:_.createElement(He.Provider,{value:c},_.createElement(Ue.Provider,{children:t,value:h}))}function kt({children:e,location:t}){return at(At(e),t)}_.Component;function At(e,t=[]){let n=[];return _.Children.forEach(e,(e,r)=>{if(!_.isValidElement(e))return;let i=[...t,r];if(e.type===_.Fragment){n.push.apply(n,At(e.props.children,i));return}T(e.type===Dt,`[${typeof e.type==`string`?e.type:e.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),T(!e.props.index||!e.props.children,`An index route cannot have child routes.`);let a={id:e.props.id||i.join(`-`),caseSensitive:e.props.caseSensitive,element:e.props.element,Component:e.props.Component,index:e.props.index,path:e.props.path,middleware:e.props.middleware,loader:e.props.loader,action:e.props.action,hydrateFallbackElement:e.props.hydrateFallbackElement,HydrateFallback:e.props.HydrateFallback,errorElement:e.props.errorElement,ErrorBoundary:e.props.ErrorBoundary,hasErrorBoundary:e.props.hasErrorBoundary===!0||e.props.ErrorBoundary!=null||e.props.errorElement!=null,shouldRevalidate:e.props.shouldRevalidate,handle:e.props.handle,lazy:e.props.lazy};e.props.children&&(a.children=At(e.props.children,i)),n.push(a)}),n}var jt=`get`,Mt=`application/x-www-form-urlencoded`;function Nt(e){return typeof HTMLElement<`u`&&e instanceof HTMLElement}function Pt(e){return Nt(e)&&e.tagName.toLowerCase()===`button`}function Ft(e){return Nt(e)&&e.tagName.toLowerCase()===`form`}function It(e){return Nt(e)&&e.tagName.toLowerCase()===`input`}function Lt(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function Rt(e,t){return e.button===0&&(!t||t===`_self`)&&!Lt(e)}var zt=null;function Bt(){if(zt===null)try{new FormData(document.createElement(`form`),0),zt=!1}catch{zt=!0}return zt}var Vt=new Set([`application/x-www-form-urlencoded`,`multipart/form-data`,`text/plain`]);function Ht(e){return e!=null&&!Vt.has(e)?(E(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Mt}"`),null):e}function Ut(e,t){let n,r,i,a,o;if(Ft(e)){let o=e.getAttribute(`action`);r=o?ge(o,t):null,n=e.getAttribute(`method`)||jt,i=Ht(e.getAttribute(`enctype`))||Mt,a=new FormData(e)}else if(Pt(e)||It(e)&&(e.type===`submit`||e.type===`image`)){let o=e.form;if(o==null)throw Error(`Cannot submit a <button> or <input type="submit"> without a <form>`);let s=e.getAttribute(`formaction`)||o.getAttribute(`action`);if(r=s?ge(s,t):null,n=e.getAttribute(`formmethod`)||o.getAttribute(`method`)||jt,i=Ht(e.getAttribute(`formenctype`))||Ht(o.getAttribute(`enctype`))||Mt,a=new FormData(o,e),!Bt()){let{name:t,type:n,value:r}=e;if(n===`image`){let e=t?`${t}.`:``;a.append(`${e}x`,`0`),a.append(`${e}y`,`0`)}else t&&a.append(t,r)}}else if(Nt(e))throw Error(`Cannot submit element that is not <form>, <button>, or <input type="submit|image">`);else n=jt,r=null,i=Mt,o=e;return a&&i===`text/plain`&&(o=a,a=void 0),{action:r,method:n.toLowerCase(),encType:i,formData:a,body:o}}Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);var Wt={"&":`\\u0026`,">":`\\u003e`,"<":`\\u003c`,"\u2028":`\\u2028`,"\u2029":`\\u2029`},Gt=/[&><\u2028\u2029]/g;function Kt(e){return e.replace(Gt,e=>Wt[e])}function qt(e,t){if(e===!1||e==null)throw Error(t)}function Jt(e,t,n,r){let i=typeof e==`string`?new URL(e,typeof window>`u`?`server://singlefetch/`:window.location.origin):e;return n?i.pathname.endsWith(`/`)?i.pathname=`${i.pathname}_.${r}`:i.pathname=`${i.pathname}.${r}`:i.pathname===`/`?i.pathname=`_root.${r}`:t&&ge(i.pathname,t)===`/`?i.pathname=`${Te(t)}/_root.${r}`:i.pathname=`${Te(i.pathname)}.${r}`,i}async function Yt(e,t){if(e.id in t)return t[e.id];try{let n=await S(()=>import(e.module),[]);return t[e.id]=n,n}catch(t){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(t),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function Xt(e){return e!=null&&typeof e.page==`string`}function Zt(e){return e==null?!1:e.href==null?e.rel===`preload`&&typeof e.imageSrcSet==`string`&&typeof e.imageSizes==`string`:typeof e.rel==`string`&&typeof e.href==`string`}async function Qt(e,t,n){return rn((await Promise.all(e.map(async e=>{let r=t.routes[e.route.id];if(r){let e=await Yt(r,n);return e.links?e.links():[]}return[]}))).flat(1).filter(Zt).filter(e=>e.rel===`stylesheet`||e.rel===`preload`).map(e=>e.rel===`stylesheet`?{...e,rel:`prefetch`,as:`style`}:{...e,rel:`prefetch`}))}function $t(e,t,n,r,i,a){let o=(e,t)=>n[t]?e.route.id!==n[t].route.id:!0,s=(e,t)=>n[t].pathname!==e.pathname||n[t].route.path?.endsWith(`*`)&&n[t].params[`*`]!==e.params[`*`];return a===`assets`?t.filter((e,t)=>o(e,t)||s(e,t)):a===`data`?t.filter((t,a)=>{let c=r.routes[t.route.id];if(!c||!c.hasLoader)return!1;if(o(t,a)||s(t,a))return!0;if(t.route.shouldRevalidate){let r=t.route.shouldRevalidate({currentUrl:new URL(i.pathname+i.search+i.hash,window.origin),currentParams:n[0]?.params||{},nextUrl:new URL(e,window.origin),nextParams:t.params,defaultShouldRevalidate:!0});if(typeof r==`boolean`)return r}return!0}):[]}function en(e,t,{includeHydrateFallback:n}={}){return tn(e.map(e=>{let r=t.routes[e.route.id];if(!r)return[];let i=[r.module];return r.clientActionModule&&(i=i.concat(r.clientActionModule)),r.clientLoaderModule&&(i=i.concat(r.clientLoaderModule)),n&&r.hydrateFallbackModule&&(i=i.concat(r.hydrateFallbackModule)),r.imports&&(i=i.concat(r.imports)),i}).flat(1))}function tn(e){return[...new Set(e)]}function nn(e){let t={},n=Object.keys(e).sort();for(let r of n)t[r]=e[r];return t}function rn(e,t){let n=new Set,r=new Set(t);return e.reduce((e,i)=>{if(t&&!Xt(i)&&i.as===`script`&&i.href&&r.has(i.href))return e;let a=JSON.stringify(nn(i));return n.has(a)||(n.add(a),e.push({key:a,link:i})),e},[])}function an(){let e=_.useContext(Fe);return qt(e,`You must render this element inside a <DataRouterContext.Provider> element`),e}function on(){let e=_.useContext(Ie);return qt(e,`You must render this element inside a <DataRouterStateContext.Provider> element`),e}var sn=_.createContext(void 0);sn.displayName=`FrameworkContext`;function cn(){let e=_.useContext(sn);return qt(e,`You must render this element inside a <HydratedRouter> element`),e}function ln(e,t){let n=_.useContext(sn),[r,i]=_.useState(!1),[a,o]=_.useState(!1),{onFocus:s,onBlur:c,onMouseEnter:l,onMouseLeave:u,onTouchStart:d}=t,f=_.useRef(null);_.useEffect(()=>{if(e===`render`&&o(!0),e===`viewport`){let e=new IntersectionObserver(e=>{e.forEach(e=>{o(e.isIntersecting)})},{threshold:.5});return f.current&&e.observe(f.current),()=>{e.disconnect()}}},[e]),_.useEffect(()=>{if(r){let e=setTimeout(()=>{o(!0)},100);return()=>{clearTimeout(e)}}},[r]);let p=()=>{i(!0)},m=()=>{i(!1),o(!1)};return n?e===`intent`?[a,f,{onFocus:un(s,p),onBlur:un(c,m),onMouseEnter:un(l,p),onMouseLeave:un(u,m),onTouchStart:un(d,p)}]:[a,f,{}]:[!1,f,{}]}function un(e,t){return n=>{e&&e(n),n.defaultPrevented||t(n)}}function dn({page:e,...t}){let n=Re(),{router:r}=an(),i=_.useMemo(()=>ae(r.routes,e,r.basename),[r.routes,e,r.basename]);return i?n?_.createElement(pn,{page:e,matches:i,...t}):_.createElement(mn,{page:e,matches:i,...t}):null}function fn(e){let{manifest:t,routeModules:n}=cn(),[r,i]=_.useState([]);return _.useEffect(()=>{let r=!1;return Qt(e,t,n).then(e=>{r||i(e)}),()=>{r=!0}},[e,t,n]),r}function pn({page:e,matches:t,...n}){let r=$e(),{future:i}=cn(),{basename:a}=an(),o=_.useMemo(()=>{if(e===r.pathname+r.search+r.hash)return[];let n=Jt(e,a,i.v8_trailingSlashAwareDataRequests,`rsc`),o=!1,s=[];for(let e of t)typeof e.route.shouldRevalidate==`function`?o=!0:s.push(e.route.id);return o&&s.length>0&&n.searchParams.set(`_routes`,s.join(`,`)),[n.pathname+n.search]},[a,i.v8_trailingSlashAwareDataRequests,e,r,t]);return _.createElement(_.Fragment,null,o.map(e=>_.createElement(`link`,{key:e,rel:`prefetch`,as:`fetch`,href:e,...n})))}function mn({page:e,matches:t,...n}){let r=$e(),{future:i,manifest:a,routeModules:o}=cn(),{basename:s}=an(),{loaderData:c,matches:l}=on(),u=_.useMemo(()=>$t(e,t,l,a,r,`data`),[e,t,l,a,r]),d=_.useMemo(()=>$t(e,t,l,a,r,`assets`),[e,t,l,a,r]),f=_.useMemo(()=>{if(e===r.pathname+r.search+r.hash)return[];let n=new Set,l=!1;if(t.forEach(e=>{let t=a.routes[e.route.id];!t||!t.hasLoader||(!u.some(t=>t.route.id===e.route.id)&&e.route.id in c&&o[e.route.id]?.shouldRevalidate||t.hasClientLoader?l=!0:n.add(e.route.id))}),n.size===0)return[];let d=Jt(e,s,i.v8_trailingSlashAwareDataRequests,`data`);return l&&n.size>0&&d.searchParams.set(`_routes`,t.filter(e=>n.has(e.route.id)).map(e=>e.route.id).join(`,`)),[d.pathname+d.search]},[s,i.v8_trailingSlashAwareDataRequests,c,r,a,u,t,e,o]),p=_.useMemo(()=>en(d,a),[d,a]),m=fn(d);return _.createElement(_.Fragment,null,f.map(e=>_.createElement(`link`,{key:e,rel:`prefetch`,as:`fetch`,href:e,...n})),p.map(e=>_.createElement(`link`,{key:e,rel:`modulepreload`,href:e,...n})),m.map(({key:e,link:t})=>_.createElement(`link`,{key:e,nonce:n.nonce,...t,crossOrigin:t.crossOrigin??n.crossOrigin})))}function hn(...e){return t=>{e.forEach(e=>{typeof e==`function`?e(t):e!=null&&(e.current=t)})}}_.Component;var gn=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0;try{gn&&(window.__reactRouterVersion=`7.17.0`)}catch{}function _n({basename:e,children:t,useTransitions:n,window:r}){let i=_.useRef();i.current??=ee({window:r,v5Compat:!0});let a=i.current,[o,s]=_.useState({action:a.action,location:a.location}),c=_.useCallback(e=>{n===!1?s(e):_.startTransition(()=>s(e))},[n]);return _.useLayoutEffect(()=>a.listen(c),[a,c]),_.createElement(Ot,{basename:e,children:t,location:o.location,navigationType:o.action,navigator:a,useTransitions:n})}function vn({basename:e,children:t,history:n,useTransitions:r}){let[i,a]=_.useState({action:n.action,location:n.location}),o=_.useCallback(e=>{r===!1?a(e):_.startTransition(()=>a(e))},[r]);return _.useLayoutEffect(()=>n.listen(o),[n,o]),_.createElement(Ot,{basename:e,children:t,location:i.location,navigationType:i.action,navigator:n,useTransitions:r})}vn.displayName=`unstable_HistoryRouter`;var yn=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,bn=_.forwardRef(function({onClick:e,discover:t=`render`,prefetch:n=`none`,relative:r,reloadDocument:i,replace:a,mask:o,state:s,target:c,to:l,preventScrollReset:u,viewTransition:d,defaultShouldRevalidate:f,...p},m){let{basename:h,navigator:g,useTransitions:v}=_.useContext(He),y=typeof l==`string`&&yn.test(l),b=Ne(l,h);l=b.to;let x=Ze(l,{relative:r}),S=$e(),C=null;if(o){let e=Ce(o,[],S.mask?S.mask.pathname:`/`,!0);h!==`/`&&(e.pathname=e.pathname===`/`?h:z([h,e.pathname])),C=g.createHref(e)}let[w,ee,T]=ln(n,p),E=Dn(l,{replace:a,mask:o,state:s,target:c,preventScrollReset:u,relative:r,viewTransition:d,defaultShouldRevalidate:f,useTransitions:v});function D(t){e&&e(t),t.defaultPrevented||E(t)}let te=!(b.isExternal||i),O=_.createElement(`a`,{...p,...T,href:(te?C:void 0)||b.absoluteURL||x,onClick:te?D:e,ref:hn(m,ee),target:c,"data-discover":!y&&t===`render`?`true`:void 0});return w&&!y?_.createElement(_.Fragment,null,O,_.createElement(dn,{page:x})):O});bn.displayName=`Link`;var xn=_.forwardRef(function({"aria-current":e=`page`,caseSensitive:t=!1,className:n=``,end:r=!1,style:i,to:a,viewTransition:o,children:s,...c},l){let u=it(a,{relative:c.relative}),d=$e(),f=_.useContext(Ie),{navigator:p,basename:m}=_.useContext(He),h=f!=null&&Ln(u)&&o===!0,g=p.encodeLocation?p.encodeLocation(u).pathname:u.pathname,v=d.pathname,y=f&&f.navigation&&f.navigation.location?f.navigation.location.pathname:null;t||(v=v.toLowerCase(),y=y?y.toLowerCase():null,g=g.toLowerCase()),y&&m&&(y=ge(y,m)||y);let b=g!==`/`&&g.endsWith(`/`)?g.length-1:g.length,x=v===g||!r&&v.startsWith(g)&&v.charAt(b)===`/`,S=y!=null&&(y===g||!r&&y.startsWith(g)&&y.charAt(g.length)===`/`),C={isActive:x,isPending:S,isTransitioning:h},w=x?e:void 0,ee;ee=typeof n==`function`?n(C):[n,x?`active`:null,S?`pending`:null,h?`transitioning`:null].filter(Boolean).join(` `);let T=typeof i==`function`?i(C):i;return _.createElement(bn,{...c,"aria-current":w,className:ee,ref:l,style:T,to:a,viewTransition:o},typeof s==`function`?s(C):s)});xn.displayName=`NavLink`;var Sn=_.forwardRef(({discover:e=`render`,fetcherKey:t,navigate:n,reloadDocument:r,replace:i,state:a,method:o=jt,action:s,onSubmit:c,relative:l,preventScrollReset:u,viewTransition:d,defaultShouldRevalidate:f,...p},m)=>{let{useTransitions:h}=_.useContext(He),g=An(),v=jn(s,{relative:l}),y=o.toLowerCase()===`get`?`get`:`post`,b=typeof s==`string`&&yn.test(s);return _.createElement(`form`,{ref:m,method:y,action:v,onSubmit:r?c:e=>{if(c&&c(e),e.defaultPrevented)return;e.preventDefault();let r=e.nativeEvent.submitter,s=r?.getAttribute(`formmethod`)||o,p=()=>g(r||e.currentTarget,{fetcherKey:t,method:s,navigate:n,replace:i,state:a,relative:l,preventScrollReset:u,viewTransition:d,defaultShouldRevalidate:f});h&&n!==!1?_.startTransition(()=>p()):p()},...p,"data-discover":!b&&e===`render`?`true`:void 0})});Sn.displayName=`Form`;function Cn({getKey:e,storageKey:t,...n}){let r=_.useContext(sn),{basename:i}=_.useContext(He),a=$e(),o=xt();Fn({getKey:e,storageKey:t});let s=_.useMemo(()=>{if(!r||!e)return null;let t=Pn(a,o,i,e);return t===a.key?null:t},[]);if(!r||r.isSpaMode)return null;let c=((e,t)=>{if(!window.history.state||!window.history.state.key){let e=Math.random().toString(32).slice(2);window.history.replaceState({key:e},``)}try{let n=JSON.parse(sessionStorage.getItem(e)||`{}`)[t||window.history.state.key];typeof n==`number`&&window.scrollTo(0,n)}catch(t){console.error(t),sessionStorage.removeItem(e)}}).toString();return _.createElement(`script`,{...n,suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${c})(${Kt(JSON.stringify(t||Mn))}, ${Kt(JSON.stringify(s))})`}})}Cn.displayName=`ScrollRestoration`;function wn(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Tn(e){let t=_.useContext(Fe);return T(t,wn(e)),t}function En(e){let t=_.useContext(Ie);return T(t,wn(e)),t}function Dn(e,{target:t,replace:n,mask:r,state:i,preventScrollReset:a,relative:o,viewTransition:s,defaultShouldRevalidate:c,useTransitions:l}={}){let u=nt(),d=$e(),f=it(e,{relative:o});return _.useCallback(p=>{if(Rt(p,t)){p.preventDefault();let t=n===void 0?ne(d)===ne(f):n,m=()=>u(e,{replace:t,mask:r,state:i,preventScrollReset:a,relative:o,viewTransition:s,defaultShouldRevalidate:c});l?_.startTransition(()=>m()):m()}},[d,u,f,n,r,i,t,e,a,o,s,c,l])}var On=0,kn=()=>`__${String(++On)}__`;function An(){let{router:e}=Tn(`useSubmit`),{basename:t}=_.useContext(He),n=yt(),r=e.fetch,i=e.navigate;return _.useCallback(async(e,a={})=>{let{action:o,method:s,encType:c,formData:l,body:u}=Ut(e,t);a.navigate===!1?await r(a.fetcherKey||kn(),n,a.action||o,{defaultShouldRevalidate:a.defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:l,body:u,formMethod:a.method||s,formEncType:a.encType||c,flushSync:a.flushSync}):await i(a.action||o,{defaultShouldRevalidate:a.defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:l,body:u,formMethod:a.method||s,formEncType:a.encType||c,replace:a.replace,state:a.state,fromRouteId:n,flushSync:a.flushSync,viewTransition:a.viewTransition})},[r,i,t,n])}function jn(e,{relative:t}={}){let{basename:n}=_.useContext(He),r=_.useContext(We);T(r,`useFormAction must be used inside a RouteContext`);let[i]=r.matches.slice(-1),a={...it(e||`.`,{relative:t})},o=$e();if(e==null){a.search=o.search;let e=new URLSearchParams(a.search),t=e.getAll(`index`);if(t.some(e=>e===``)){e.delete(`index`),t.filter(e=>e).forEach(t=>e.append(`index`,t));let n=e.toString();a.search=n?`?${n}`:``}}return(!e||e===`.`)&&i.route.index&&(a.search=a.search?a.search.replace(/^\?/,`?index&`):`?index`),n!==`/`&&(a.pathname=a.pathname===`/`?n:z([n,a.pathname])),ne(a)}var Mn=`react-router-scroll-positions`,Nn={};function Pn(e,t,n,r){let i=null;return r&&(i=r(n===`/`?e:{...e,pathname:ge(e.pathname,n)||e.pathname},t)),i??=e.key,i}function Fn({getKey:e,storageKey:t}={}){let{router:n}=Tn(`useScrollRestoration`),{restoreScrollPosition:r,preventScrollReset:i}=En(`useScrollRestoration`),{basename:a}=_.useContext(He),o=$e(),s=xt(),c=bt();_.useEffect(()=>(window.history.scrollRestoration=`manual`,()=>{window.history.scrollRestoration=`auto`}),[]),In(_.useCallback(()=>{if(c.state===`idle`){let t=Pn(o,s,a,e);Nn[t]=window.scrollY}try{sessionStorage.setItem(t||Mn,JSON.stringify(Nn))}catch(e){E(!1,`Failed to save scroll positions in sessionStorage, <ScrollRestoration /> will not work properly (${e}).`)}window.history.scrollRestoration=`auto`},[c.state,e,a,o,s,t])),typeof document<`u`&&(_.useLayoutEffect(()=>{try{let e=sessionStorage.getItem(t||Mn);e&&(Nn=JSON.parse(e))}catch{}},[t]),_.useLayoutEffect(()=>{let t=n?.enableScrollRestoration(Nn,()=>window.scrollY,e?(t,n)=>Pn(t,n,a,e):void 0);return()=>t&&t()},[n,a,e]),_.useLayoutEffect(()=>{if(r!==!1){if(typeof r==`number`){window.scrollTo(0,r);return}try{if(o.hash){let e=document.getElementById(decodeURIComponent(o.hash.slice(1)));if(e){e.scrollIntoView();return}}}catch{E(!1,`"${o.hash.slice(1)}" is not a decodable element ID. The view will not scroll to it.`)}i!==!0&&window.scrollTo(0,0)}},[o,r,i]))}function In(e,t){let{capture:n}=t||{};_.useEffect(()=>{let t=n==null?void 0:{capture:n};return window.addEventListener(`pagehide`,e,t),()=>{window.removeEventListener(`pagehide`,e,t)}},[e,n])}function Ln(e,{relative:t}={}){let n=_.useContext(ze);T(n!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:r}=Tn(`useViewTransitionState`),i=it(e,{relative:t});if(!n.isTransitioning)return!1;let a=ge(n.currentLocation.pathname,r)||n.currentLocation.pathname,o=ge(n.nextLocation.pathname,r)||n.nextLocation.pathname;return me(i.pathname,o)!=null||me(i.pathname,a)!=null}var Rn=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.fragment`);function r(e,n,r){var i=null;if(r!==void 0&&(i=``+r),n.key!==void 0&&(i=``+n.key),`key`in n)for(var a in r={},n)a!==`key`&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:i,ref:n===void 0?null:n,props:r}}e.Fragment=n,e.jsx=r,e.jsxs=r})),V=o(((e,t)=>{t.exports=Rn()}))(),zn=(0,_.createContext)({theme:`dark`,toggle:()=>{}});function Bn({children:e}){let[t,n]=(0,_.useState)(()=>localStorage.getItem(`grimoire-theme`)===`light`?`light`:`dark`);return(0,_.useEffect)(()=>{document.documentElement.setAttribute(`data-theme`,t),localStorage.setItem(`grimoire-theme`,t)},[t]),(0,V.jsx)(zn.Provider,{value:{theme:t,toggle:()=>n(e=>e===`dark`?`light`:`dark`)},children:e})}var Vn=()=>(0,_.useContext)(zn),Hn=(0,_.createContext)(null),Un=0;function Wn({children:e}){let[t,n]=(0,_.useState)([]),[r,i]=(0,_.useState)([]),a=(0,_.useCallback)((e,t={})=>{let r={id:`n-${++Un}-${Date.now()}`,type:t.type??`info`,title:e,message:t.message,timestamp:Date.now(),read:!1};n(e=>[r,...e].slice(0,50)),i(e=>[r,...e]),setTimeout(()=>{i(e=>e.filter(e=>e.id!==r.id))},5e3),t.browser!==!1&&document.hidden&&`Notification`in window&&(Notification.permission===`granted`?new Notification(e,{body:t.message,icon:`/favicon.ico`}):Notification.permission==="default"&&Notification.requestPermission())},[]),o=(0,_.useCallback)(()=>{n(e=>e.map(e=>({...e,read:!0})))},[]),s=(0,_.useCallback)(e=>{n(t=>t.filter(t=>t.id!==e)),i(t=>t.filter(t=>t.id!==e))},[]),c=(0,_.useCallback)(()=>{n([]),i([])},[]),l=t.filter(e=>!e.read).length;return(0,V.jsxs)(Hn.Provider,{value:{notifications:t,unreadCount:l,notify:a,markAllRead:o,dismiss:s,clearAll:c},children:[e,(0,V.jsx)(`div`,{className:`toast-container`,children:r.map(e=>(0,V.jsxs)(`div`,{className:`toast toast-${e.type}`,children:[(0,V.jsxs)(`div`,{className:`toast-icon`,children:[e.type===`success`&&`✓`,e.type===`error`&&`✕`,e.type===`warning`&&`⚠`,e.type===`info`&&`ℹ`]}),(0,V.jsxs)(`div`,{className:`toast-body`,children:[(0,V.jsx)(`div`,{className:`toast-title`,children:e.title}),e.message&&(0,V.jsx)(`div`,{className:`toast-msg`,children:e.message})]}),(0,V.jsx)(`button`,{className:`toast-close`,onClick:()=>s(e.id),children:`✕`})]},e.id))})]})}var Gn=()=>(0,_.useContext)(Hn);function Kn({open:e,onClose:t}){let{theme:n,toggle:r}=Vn(),{notify:i}=Gn();return e?(0,V.jsx)(`div`,{className:`modal-overlay`,onClick:t,children:(0,V.jsxs)(`div`,{className:`modal`,onClick:e=>e.stopPropagation(),children:[(0,V.jsxs)(`div`,{className:`modal-header`,children:[(0,V.jsx)(`h2`,{children:`Settings`}),(0,V.jsx)(`button`,{className:`modal-close`,onClick:t,children:`✕`})]}),(0,V.jsxs)(`div`,{className:`modal-body`,children:[(0,V.jsxs)(`div`,{className:`setting-group`,children:[(0,V.jsx)(`h3`,{children:`Appearance`}),(0,V.jsxs)(`div`,{className:`setting-row`,children:[(0,V.jsxs)(`div`,{className:`setting-info`,children:[(0,V.jsx)(`div`,{className:`setting-label`,children:`Theme`}),(0,V.jsx)(`div`,{className:`setting-desc`,children:`Switch between dark and light mode`})]}),(0,V.jsx)(`button`,{className:`theme-toggle ${n}`,onClick:r,"aria-label":`Toggle theme`,children:(0,V.jsxs)(`span`,{className:`theme-toggle-track`,children:[(0,V.jsx)(`span`,{className:`theme-toggle-icon`,children:n===`dark`?`🌙`:`☀️`}),(0,V.jsx)(`span`,{className:`theme-toggle-thumb`})]})})]})]}),(0,V.jsxs)(`div`,{className:`setting-group`,children:[(0,V.jsx)(`h3`,{children:`Notifications`}),(0,V.jsxs)(`div`,{className:`setting-row`,children:[(0,V.jsxs)(`div`,{className:`setting-info`,children:[(0,V.jsx)(`div`,{className:`setting-label`,children:`Browser Notifications`}),(0,V.jsx)(`div`,{className:`setting-desc`,children:`Receive alerts even when the app is in the background`})]}),(0,V.jsx)(`button`,{className:`btn btn-secondary btn-sm`,onClick:()=>{`Notification`in window&&Notification.requestPermission().then(e=>{i(e===`granted`?`Notifications enabled!`:`Notifications blocked`,{type:e===`granted`?`success`:`warning`})})},children:typeof Notification<`u`&&Notification.permission===`granted`?`Enabled`:`Enable`})]}),(0,V.jsxs)(`div`,{className:`setting-row`,children:[(0,V.jsxs)(`div`,{className:`setting-info`,children:[(0,V.jsx)(`div`,{className:`setting-label`,children:`Test Notification`}),(0,V.jsx)(`div`,{className:`setting-desc`,children:`Send a test toast to verify notifications work`})]}),(0,V.jsx)(`button`,{className:`btn btn-secondary btn-sm`,onClick:()=>i(`Test notification`,{type:`success`,message:`Notifications are working!`,browser:!0}),children:`Test`})]})]}),(0,V.jsxs)(`div`,{className:`setting-group`,children:[(0,V.jsx)(`h3`,{children:`About`}),(0,V.jsx)(`div`,{className:`setting-row`,children:(0,V.jsxs)(`div`,{className:`setting-info`,children:[(0,V.jsx)(`div`,{className:`setting-label`,children:`GRIMOIRE`}),(0,V.jsx)(`div`,{className:`setting-desc`,children:`Unified Product Data Toolkit — v1.0.0`})]})})]})]})]})}):null}function qn(e){if(/^https?:\/\//i.test(e)||!e.startsWith(`/api`)&&!e.startsWith(`/health`))return e;let t=window.__GRIMOIRE_API_BASE__?.replace(/\/$/,``);if(t)return`${t}${e}`;let{hostname:n,port:r,protocol:i}=window.location,a=new Set([`5173`,`7788`]);return i.startsWith(`http`)&&(n===`127.0.0.1`||n===`localhost`)&&a.has(r)?e:`http://127.0.0.1:7788${e}`}function Jn(e){return new Promise(t=>window.setTimeout(t,e))}async function H(e,t){let n;try{n=await fetch(qn(e),t)}catch(r){await Jn(1200);try{n=await fetch(qn(e),t)}catch{throw r}}if(!n.ok){let e=n.statusText;try{let t=await n.json();e=typeof t.detail==`string`?t.detail:JSON.stringify(t.detail??t)}catch{e=await n.text().catch(()=>n.statusText)}throw Error(e)}return n.json()}async function Yn(e,t){return window.__grimoire?.pickFolder?await window.__grimoire.pickFolder(e)||``:(await H(`/api/local/select-folder`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({title:e,initial_path:t})})).path||``}function Xn(e){if(!e)return`Idle`;let t=Number(e.summary?.progress_percent??0);return e.status===`running`&&t?`Running ${t}%`:e.status}function Zn(e,t){let[n,r]=(0,_.useState)(e);return(0,_.useEffect)(()=>r(e),[e]),(0,_.useEffect)(()=>{if(!n||![`pending`,`running`].includes(n.status))return;let e=!1,i=window.setInterval(async()=>{try{let a=await H(`/api/jobs/${n.id}`);if(e)return;r(a),[`completed`,`failed`].includes(a.status)&&(window.clearInterval(i),t?.(a))}catch{window.clearInterval(i)}},1200);return()=>{e=!0,window.clearInterval(i)}},[n?.id,n?.status]),n}var Qn={Critical:0,High:1,Medium:2,Low:3},$n={Critical:`solid-crit`,High:`solid-high`,Medium:`solid-med`,Low:`solid-low`},er={"To Do":`out-open`,"In Progress":`out-prog`,Done:`out-res`,Completed:`out-closed`},tr=[`Overview`,`Summary Tracker`,`Action Tracker`,`Brand Scorecard`,`SKU Missing Detail`,`Validation Errors`,`Run Summary`],nr=[`ACTIVE`,`Upcoming`,`Limited`,`Non-Active`,`Discontinued`,`N/A`,`Unknown`,`Others`,`NON-ACR`],rr=[`ACTIVE`,`Upcoming`,`Limited`,`N/A`,`Unknown`,`Others`,`NON-ACR`],ir=[`Critical`,`High`,`Medium`,`Low`],ar=new Set([`Total`,`# Missing`,`Active`,`Upcoming`,`Limited`,`Non-Active`,`Discontinued`,`Blanks`,`N/A`,`Unknown`,`Non-ACR`,`Others`,`Source Row`]);async function or(e,t){let n=await fetch(qn(e),t);if(!n.ok){let e=n.statusText;try{let t=await n.json();e=typeof t.detail==`string`?t.detail:JSON.stringify(t.detail??t)}catch{e=await n.text().catch(()=>n.statusText)}throw Error(e)}return n.json()}function sr(e){return e==null?``:String(e)}function cr(e,t,n=0){let r=Number(e?.[t]??n);return Number.isFinite(r)?r:n}function lr(e,t,n=``){let r=e?.[t];return typeof r==`string`?r:n}function ur(e){return/missing required column|no dqc audit fields|master data header|upload the original master data/i.test(e)}function dr(e){return[`Description (250+ words)`,`EU Responsible person`,`UK Responsible person`].includes(e)?`Critical`:[`CPNP Number`,`UK SCPN NUMBER`,`Manufacturer name`,`Ingredient list`].includes(e)?`High`:[`BAR CODE`,`Net Weight (g)`,`Gross weight (g)`,`PAO (Months)`,`Shelf Life (Months)`,`SUPPLY PRICE`].includes(e)?`Medium`:`Low`}function fr(e,t){return t&&t[e===`Overview`?`Missing Data Overview`:e]||null}function pr(e,t){if(!t||!t.rows)return[];if(e!==`SKU Missing Detail`)return t.rows;let n=new Map;for(let e of t.rows){let t=[e.Brand||``,e.SKU||``,e[`Product Name`]||``,e.Status||``,e[`Source Row`]||``].join(`|`),r=n.get(t)||{Brand:e.Brand||``,SKU:e.SKU||``,"Product Name":e[`Product Name`]||``,Status:e.Status||``,"Missing Fields":[],Priority:e.Priority||dr(sr(e[`Missing Field`])),"Source Row":e[`Source Row`]||``};e[`Missing Field`]&&r[`Missing Fields`].push(sr(e[`Missing Field`])),Qn[e.Priority]<Qn[r.Priority]&&(r.Priority=e.Priority),n.set(t,r)}return Array.from(n.values()).map(e=>({...e,"Missing Fields":e[`Missing Fields`].join(`; `)}))}function mr(e,t){return!t||!t.headers?[]:e===`SKU Missing Detail`?[`Brand`,`SKU`,`Product Name`,`Status`,`Missing Fields`,`Priority`,`Source Row`]:t.headers.filter(e=>e&&!String(e).startsWith(`Column `))}var hr=[{section:`DATA_MAINTENANCE`},{id:`dqc`,label:`Data Quality Control`,icon:`shield`},{id:`master`,label:`Master Data`,icon:`db`},{id:`steward`,label:`Data Steward`,icon:`user`},{id:`rules`,label:`Rule Profiles`,icon:`list`},{id:`history`,label:`Audit History`,icon:`clock`},{id:`reports`,label:`Reports`,icon:`report`},{id:`config`,label:`Configuration`,icon:`gear`},{section:`IMAGE_EDIT`},{id:`imageedit`,label:`Image Edit`,icon:`image`}],gr={dqc:`Data Quality Control`,master:`Master Data`,steward:`Data Steward`,rules:`Rule Profiles`,history:`Audit History`,reports:`Reports`,config:`Configuration`};function _r(e){if(!e)return``;try{return new Date(e).toLocaleString()}catch{return e}}function vr(e){e&&window.open(qn(`/api/jobs/${encodeURIComponent(e)}/download`),`_blank`)}function yr(e){let[t,n]=(0,_.useState)([]),[r,i]=(0,_.useState)(!1),[a,o]=(0,_.useState)(``),s=(0,_.useCallback)(async()=>{i(!0),o(``);try{let e=await or(`/api/data-quality-control/history?limit=100`);n(Array.isArray(e)?e:[])}catch(t){let n=t instanceof Error?t.message:String(t);o(n),e(`Could not load audit history: ${n}`)}finally{i(!1)}},[e]);return(0,_.useEffect)(()=>{s()},[s]),(0,_.useEffect)(()=>(window.addEventListener(`aio:reports:refresh`,s),()=>window.removeEventListener(`aio:reports:refresh`,s)),[s]),{runs:t,loading:r,error:a,refresh:s}}function br({label:e,value:t,sub:n,tone:r,filename:i}){return(0,V.jsxs)(`div`,{className:`aio-card aio-metric`,children:[(0,V.jsx)(`div`,{className:`aio-metric-label`,children:e}),(0,V.jsx)(`div`,{className:`aio-metric-value ${r||``} ${i?`filename`:``}`,title:typeof t==`string`?t:void 0,children:t}),(0,V.jsx)(`div`,{className:`aio-muted`,children:n})]})}function xr(){let{notify:e}=Gn(),[t,n]=(0,_.useState)({loaded:!1}),[r,i]=(0,_.useState)(``),[a,o]=(0,_.useState)(null),[s,c]=(0,_.useState)(!1),[l,u]=(0,_.useState)(!1),[d,f]=(0,_.useState)(!1),[p,m]=(0,_.useState)(!1),h=(0,_.useRef)(null),g=(0,_.useRef)(null),[v,y]=(0,_.useState)(``),[b,x]=(0,_.useState)(``);(0,_.useEffect)(()=>{or(`/api/master-data/state`).then(e=>{n(e),e.selected_brand&&(i(e.selected_brand),or(`/api/master-data/select-brand`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({brand:e.selected_brand})}).then(e=>o(e.product_count)).catch(()=>{})),e.dqc_file&&y(e.dqc_file),e.master_file&&x(e.master_file)}).catch(()=>{})},[]);async function S(){let t=h.current?.files?.[0],r=g.current?.files?.[0];if(!t||!r){e(`Please select both files`,{type:`warning`});return}c(!0);try{let a=new FormData;a.append(`dqc_file`,t),a.append(`master_file`,r);let s=await or(`/api/master-data/upload`,{method:`POST`,body:a});n({loaded:!0,brands:s.brands,master_brands:s.master_brands,dqc_file:s.dqc_file,master_file:s.master_file,selected_brand:null}),y(s.dqc_file),x(s.master_file),i(``),o(null),e(`Files uploaded — ${s.brands.length} brands found in DQC report`,{type:`success`})}catch(t){e(`Upload failed`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{c(!1)}}async function C(t){if(i(t),!t){o(null);return}try{o((await or(`/api/master-data/select-brand`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({brand:t})})).product_count)}catch(t){e(`Could not select brand`,{type:`error`,message:t instanceof Error?t.message:String(t)})}}async function w(){if(!r){e(`Select a brand first`,{type:`warning`});return}u(!0);try{let t=await fetch(qn(`/api/master-data/generate`),{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({brand:r})});if(!t.ok)throw Error(await t.text());let n=await t.blob(),i=URL.createObjectURL(n),a=document.createElement(`a`);a.href=i,a.download=`${r}_Missing_Data.xlsx`,a.click(),URL.revokeObjectURL(i),e(`${r}_Missing_Data.xlsx downloaded`,{type:`success`}),m(!0)}catch(t){e(`Generation failed`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{u(!1)}}async function ee(){f(!0);try{let t=await fetch(qn(`/api/master-data/generate-status`),{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({brand:r})});if(!t.ok)throw Error(await t.text());let n=await t.blob(),i=URL.createObjectURL(n),a=document.createElement(`a`);a.href=i,a.download=`${r}_Missing_Data_Status.xlsx`,a.click(),URL.revokeObjectURL(i),e(`${r}_Missing_Data_Status.xlsx downloaded`,{type:`success`})}catch(t){e(`Status file generation failed`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{f(!1),m(!1)}}let T=t.brands??[];return(0,V.jsxs)(`div`,{className:`aio-fade`,children:[(0,V.jsxs)(`div`,{className:`aio-stat-grid`,children:[(0,V.jsx)(br,{label:`DQC Report`,value:v||`—`,sub:t.loaded?`uploaded`:`not uploaded`,filename:!0}),(0,V.jsx)(br,{label:`Master Data`,value:b||`—`,sub:t.loaded?`uploaded`:`not uploaded`,filename:!0}),(0,V.jsx)(br,{label:`Brands (DQC)`,value:T.length||`—`,sub:`from DQC report`}),(0,V.jsx)(br,{label:`Products`,value:a??`—`,sub:r?`in ${r}`:`select a brand`,tone:a?`green`:void 0})]}),(0,V.jsxs)(`section`,{className:`aio-card aio-pad`,children:[(0,V.jsx)(`h3`,{children:`Upload Files`}),(0,V.jsx)(`p`,{className:`aio-muted`,children:`Upload the DQC report (downloaded from Data Quality Control tab) and the Master Data Excel file.`}),(0,V.jsxs)(`div`,{className:`aio-form-grid`,children:[(0,V.jsxs)(`label`,{children:[`DQC Report (.xlsx)`,(0,V.jsx)(`input`,{ref:h,type:`file`,accept:`.xlsx,.xls`,className:`aio-input`})]}),(0,V.jsxs)(`label`,{children:[`Master Data (.xlsx)`,(0,V.jsx)(`input`,{ref:g,type:`file`,accept:`.xlsx,.xls`,className:`aio-input`})]})]}),(0,V.jsx)(`div`,{className:`aio-actions-row`,style:{marginTop:12},children:(0,V.jsx)(`button`,{className:`btn btn-primary btn-sm`,onClick:S,disabled:s,children:s?`Uploading...`:`Upload & Read Files`})})]}),t.loaded&&(0,V.jsxs)(`section`,{className:`aio-card aio-pad`,children:[(0,V.jsx)(`h3`,{children:`Generate Missing Data`}),(0,V.jsx)(`div`,{className:`aio-form-grid`,children:(0,V.jsxs)(`label`,{children:[`Select Brand`,(0,V.jsxs)(`select`,{className:`aio-input`,value:r,onChange:e=>C(e.target.value),children:[(0,V.jsx)(`option`,{value:``,children:`— choose brand —`}),T.map(e=>(0,V.jsx)(`option`,{value:e,children:e},e))]})]})}),r&&a!==null&&(0,V.jsxs)(`p`,{className:`aio-muted`,style:{marginTop:8},children:[a,` products found for `,(0,V.jsx)(`strong`,{children:r})]}),(0,V.jsx)(`div`,{className:`aio-actions-row`,style:{marginTop:12},children:(0,V.jsx)(`button`,{className:`btn btn-primary btn-sm`,onClick:w,disabled:!r||l,children:l?`Generating...`:`Generate ${r||`Brand`}_Missing_Data.xlsx`})})]}),p&&(0,V.jsxs)(Or,{title:`Generate Status File?`,onClose:()=>m(!1),children:[(0,V.jsxs)(`p`,{children:[`Would you also like to generate `,(0,V.jsxs)(`strong`,{children:[r,`_Missing_Data_Status.xlsx`]}),`?`]}),(0,V.jsxs)(`p`,{className:`aio-muted`,children:[`This file lists all `,a,` products with their status from the master data.`]}),(0,V.jsxs)(`div`,{className:`aio-modal-actions`,children:[(0,V.jsx)(`button`,{className:`btn btn-secondary`,onClick:()=>m(!1),children:`No, Skip`}),(0,V.jsx)(`button`,{className:`btn btn-primary`,disabled:d,onClick:ee,children:d?`Generating...`:`Yes, Generate`})]})]})]})}function Sr(){return(0,V.jsxs)(`section`,{className:`aio-card aio-pad`,children:[(0,V.jsx)(`h3`,{children:`Action Ownership`}),(0,V.jsx)(`p`,{className:`aio-muted`,children:`Action Tracker rows are generated from the current DQC report. Ownership workflow is empty until real assignments are created.`}),(0,V.jsx)(`div`,{className:`aio-table-wrap`,children:(0,V.jsxs)(`table`,{className:`aio-table`,children:[(0,V.jsx)(`thead`,{children:(0,V.jsxs)(`tr`,{children:[(0,V.jsx)(`th`,{children:`Brand`}),(0,V.jsx)(`th`,{children:`Field`}),(0,V.jsx)(`th`,{children:`Priority`}),(0,V.jsx)(`th`,{children:`Status`}),(0,V.jsx)(`th`,{children:`Owner`})]})}),(0,V.jsx)(`tbody`,{children:(0,V.jsx)(`tr`,{children:(0,V.jsx)(`td`,{colSpan:5,className:`aio-empty`,children:`No stewardship assignments have been created yet.`})})})]})})]})}function Cr(){let{notify:e}=Gn(),[t,n]=(0,_.useState)(null),[r,i]=(0,_.useState)(``),[a,o]=(0,_.useState)(!1),[s,c]=(0,_.useState)(``),[l,u]=(0,_.useState)(``),[d,f]=(0,_.useState)(!1),p=(0,_.useCallback)(()=>{or(`/api/data-quality-control/rule-profile`).then(n).catch(e=>i(e instanceof Error?e.message:String(e)))},[]);(0,_.useEffect)(()=>{p()},[p]);function m(){c((t?.included_statuses||[]).join(`
`)),u(JSON.stringify(t?.priority_fields||{},null,2)),o(!0)}(0,_.useEffect)(()=>(window.addEventListener(`aio:rules:edit`,m),()=>window.removeEventListener(`aio:rules:edit`,m)));async function h(){f(!0);try{n(await or(`/api/data-quality-control/rule-profile`,{method:`PUT`,headers:{"Content-Type":`application/json`},body:JSON.stringify({included_statuses:s.split(/\r?\n|,/).map(e=>e.trim()).filter(Boolean),priority_fields:JSON.parse(l||`{}`)})})),o(!1),e(`Rule profile saved`,{type:`success`})}catch(t){e(`Could not save rule profile`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{f(!1)}}let g=Object.entries(t?.priority_fields||{});return(0,V.jsxs)(`div`,{className:`aio-rules-grid`,children:[(0,V.jsxs)(`section`,{className:`aio-card aio-pad`,children:[(0,V.jsx)(`h3`,{children:`Active Rule Profile`}),r&&(0,V.jsx)(`div`,{className:`aio-error`,children:r}),(0,V.jsx)(`p`,{className:`aio-muted`,children:`The backend rule profile controls included statuses and priority scoring for every new DQC run.`}),(0,V.jsx)(`h4`,{children:`Included Statuses`}),(0,V.jsxs)(`div`,{className:`aio-chip-row`,children:[(t?.included_statuses||[]).map(e=>(0,V.jsx)(`span`,{className:`aio-chip`,children:e||`Blank`},e||`Blank`)),!t&&(0,V.jsx)(`span`,{className:`aio-muted`,children:`Loading...`})]})]}),(0,V.jsxs)(`section`,{className:`aio-card`,children:[(0,V.jsxs)(`div`,{className:`aio-card-head`,children:[(0,V.jsx)(`strong`,{children:`Priority Fields`}),(0,V.jsx)(`button`,{className:`btn btn-secondary btn-sm`,onClick:m,children:`Edit`})]}),(0,V.jsxs)(`table`,{className:`aio-table`,children:[(0,V.jsx)(`thead`,{children:(0,V.jsxs)(`tr`,{children:[(0,V.jsx)(`th`,{children:`Priority`}),(0,V.jsx)(`th`,{children:`Fields`}),(0,V.jsx)(`th`,{children:`Count`})]})}),(0,V.jsxs)(`tbody`,{children:[g.map(([e,t])=>(0,V.jsxs)(`tr`,{children:[(0,V.jsx)(`td`,{children:(0,V.jsx)(`span`,{className:`aio-priority ${e.toLowerCase()}`,children:e})}),(0,V.jsx)(`td`,{children:t.join(`, `)}),(0,V.jsx)(`td`,{className:`num`,children:t.length})]},e)),!g.length&&(0,V.jsx)(`tr`,{children:(0,V.jsx)(`td`,{colSpan:3,className:`aio-empty`,children:`No rule profile loaded.`})})]})]})]}),a&&(0,V.jsxs)(Or,{title:`Edit Rule Profile`,onClose:()=>o(!1),wide:!0,children:[(0,V.jsxs)(`label`,{className:`aio-block-label`,children:[`Included Statuses`,(0,V.jsx)(`textarea`,{className:`aio-input aio-textarea`,value:s,onChange:e=>c(e.target.value)})]}),(0,V.jsxs)(`label`,{className:`aio-block-label`,children:[`Priority Fields JSON`,(0,V.jsx)(`textarea`,{className:`aio-input aio-textarea code`,value:l,onChange:e=>u(e.target.value)})]}),(0,V.jsxs)(`div`,{className:`aio-modal-actions`,children:[(0,V.jsx)(`button`,{className:`btn btn-secondary`,onClick:()=>o(!1),children:`Cancel`}),(0,V.jsx)(`button`,{className:`btn btn-primary`,disabled:d,onClick:h,children:d?`Saving...`:`Save Rule Profile`})]})]})]})}function wr(){let{notify:e}=Gn(),{runs:t,loading:n,error:r,refresh:i}=yr((0,_.useCallback)(t=>e(t,{type:`error`}),[e])),a=t[0]||null,o=Number(a?.action_count||0)+Number(a?.validation_error_count||0);return(0,V.jsxs)(`div`,{className:`aio-fade`,children:[(0,V.jsxs)(`div`,{className:`aio-stat-grid`,children:[(0,V.jsx)(br,{label:`Latest Brands`,value:a?a.brand_count??0:`-`,sub:`latest completed run`,tone:`green`}),(0,V.jsx)(br,{label:`Included Rows`,value:a?a.included_rows??0:`-`,sub:`selected status rows`}),(0,V.jsx)(br,{label:`Open Issues`,value:a?o:`-`,sub:`actions + validations`,tone:`red`}),(0,V.jsx)(br,{label:`History`,value:t.length,sub:`stored audit runs`})]}),(0,V.jsxs)(`section`,{className:`aio-card aio-pad`,children:[(0,V.jsxs)(`div`,{className:`aio-card-title-row`,children:[(0,V.jsx)(`h3`,{children:`Audit Timeline`}),(0,V.jsxs)(`button`,{className:`btn btn-secondary btn-sm`,onClick:i,disabled:n,children:[(0,V.jsx)(Hr,{name:`refresh`,size:15}),` Refresh`]})]}),r&&(0,V.jsx)(`div`,{className:`aio-error`,children:r}),(0,V.jsxs)(`div`,{className:`aio-timeline`,children:[t.map(e=>(0,V.jsxs)(`div`,{className:`aio-timeline-item`,children:[(0,V.jsx)(`span`,{className:`aio-dot`}),(0,V.jsxs)(`div`,{className:`aio-timeline-body`,children:[(0,V.jsx)(`div`,{className:`aio-muted`,children:_r(e.created_at)}),(0,V.jsx)(`strong`,{children:e.source_path?e.source_path.split(/[\\/]/).pop():`Data Quality Control Run`}),(0,V.jsxs)(`div`,{className:`aio-run-meta`,children:[(0,V.jsxs)(`span`,{children:[e.brand_count??0,` brands`]}),(0,V.jsxs)(`span`,{children:[e.included_rows??0,`/`,e.total_rows??0,` rows`]}),(0,V.jsxs)(`span`,{children:[e.action_count??0,` actions`]}),(0,V.jsxs)(`span`,{children:[e.validation_error_count??0,` validations`]}),(0,V.jsx)(`span`,{className:`aio-chip green`,children:`Completed`}),(0,V.jsxs)(`button`,{className:`btn btn-success btn-sm`,disabled:!e.job_id,onClick:()=>vr(e.job_id),children:[(0,V.jsx)(Mr,{size:14}),` Report`]})]})]})]},e.id)),!t.length&&(0,V.jsx)(`div`,{className:`aio-empty`,children:n?`Loading audit history...`:`No audit history yet. Run DQC to create the first record.`})]})]})]})}function Tr(){let{notify:e}=Gn(),{runs:t,loading:n,error:r,refresh:i}=yr((0,_.useCallback)(t=>e(t,{type:`error`}),[e]));return(0,V.jsxs)(`section`,{className:`aio-card`,children:[(0,V.jsxs)(`div`,{className:`aio-card-head`,children:[(0,V.jsx)(`strong`,{children:`Generated Reports`}),(0,V.jsxs)(`button`,{className:`btn btn-secondary btn-sm`,onClick:i,disabled:n,children:[(0,V.jsx)(Hr,{name:`refresh`,size:15}),` Refresh`]})]}),r&&(0,V.jsx)(`div`,{className:`aio-error in-card`,children:r}),(0,V.jsxs)(`table`,{className:`aio-table`,children:[(0,V.jsx)(`thead`,{children:(0,V.jsxs)(`tr`,{children:[(0,V.jsx)(`th`,{children:`File`}),(0,V.jsx)(`th`,{children:`Generated`}),(0,V.jsx)(`th`,{children:`Rows`}),(0,V.jsx)(`th`,{children:`Issues`}),(0,V.jsx)(`th`,{})]})}),(0,V.jsxs)(`tbody`,{children:[t.map(e=>{let t=e.output_path?e.output_path.split(/[\\/]/).pop():`report.xlsx`,n=Number(e.action_count||0)+Number(e.validation_error_count||0);return(0,V.jsxs)(`tr`,{children:[(0,V.jsx)(`td`,{children:(0,V.jsx)(`strong`,{children:t})}),(0,V.jsx)(`td`,{children:_r(e.created_at)}),(0,V.jsxs)(`td`,{className:`num`,children:[e.included_rows??0,`/`,e.total_rows??0]}),(0,V.jsx)(`td`,{className:`num`,children:n}),(0,V.jsx)(`td`,{children:(0,V.jsxs)(`button`,{className:`btn btn-success btn-sm`,disabled:!e.job_id,onClick:()=>vr(e.job_id),children:[(0,V.jsx)(Mr,{size:14}),` Download`]})})]},e.id)}),!t.length&&(0,V.jsx)(`tr`,{children:(0,V.jsx)(`td`,{colSpan:5,className:`aio-empty`,children:n?`Loading reports...`:`No generated reports yet.`})})]})]})]})}function Er(){let{notify:e}=Gn(),[t,n]=(0,_.useState)(`General`),[r,i]=(0,_.useState)({autoAudit:!1,email:!1,weekly:!1,lockDrafts:!1}),[a,o]=(0,_.useState)({crit:95,high:85,med:70}),[s,c]=(0,_.useState)(`Weekly`);(0,_.useEffect)(()=>{let t=()=>e(`Configuration saved locally`,{type:`success`});return window.addEventListener(`aio:config:save`,t),()=>window.removeEventListener(`aio:config:save`,t)},[e]);function l(e){i(t=>({...t,[e]:!t[e]}))}function u({stateKey:e}){return(0,V.jsx)(`button`,{className:`aio-switch${r[e]?` on`:``}`,onClick:()=>l(e)})}return(0,V.jsxs)(`div`,{className:`aio-config-grid`,children:[(0,V.jsx)(`div`,{className:`aio-card aio-config-nav`,children:[`General`,`Thresholds`,`Connections`,`Notifications`].map(e=>(0,V.jsxs)(`button`,{className:t===e?`active`:``,onClick:()=>n(e),children:[(0,V.jsx)(Hr,{name:e===`General`?`gear`:e===`Thresholds`?`shield`:e===`Connections`?`db`:`report`,size:17}),` `,e]},e))}),(0,V.jsxs)(`section`,{className:`aio-card aio-pad`,children:[t===`General`&&(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)(`h3`,{children:`General`}),(0,V.jsx)(Dr,{name:`Auto-run audit`,desc:`Reserved for scheduled local runs`,children:(0,V.jsx)(u,{stateKey:`autoAudit`})}),(0,V.jsx)(Dr,{name:`Audit frequency`,desc:`Used when scheduling is enabled`,children:(0,V.jsx)(`div`,{className:`aio-segmented`,children:[`Daily`,`Weekly`,`Monthly`].map(e=>(0,V.jsx)(`button`,{className:s===e?`active`:``,onClick:()=>c(e),children:e},e))})}),(0,V.jsx)(Dr,{name:`Lock draft records from audit`,desc:`Exclude incomplete drafts from scoring`,children:(0,V.jsx)(u,{stateKey:`lockDrafts`})})]}),t===`Thresholds`&&(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)(`h3`,{children:`Score Thresholds`}),[[`crit`,`Critical fields`],[`high`,`High-priority fields`],[`med`,`Medium fields`]].map(([e,t])=>(0,V.jsx)(Dr,{name:t,desc:`Completion threshold`,children:(0,V.jsxs)(`div`,{className:`aio-number-wrap`,children:[(0,V.jsx)(`input`,{className:`aio-input`,type:`number`,value:a[e],onChange:t=>o(n=>({...n,[e]:Math.min(100,Number(t.target.value)||0)}))}),(0,V.jsx)(`span`,{children:`%`})]})},e)),(0,V.jsx)(`button`,{className:`btn btn-primary btn-sm`,onClick:()=>e(`Thresholds saved locally`,{type:`success`}),children:`Save Thresholds`})]}),t===`Connections`&&(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)(`h3`,{children:`Data Connections`}),(0,V.jsx)(`p`,{className:`aio-muted`,children:`This local build reads uploaded Excel/CSV files directly. External connectors are not enabled.`})]}),t===`Notifications`&&(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)(`h3`,{children:`Notifications`}),(0,V.jsx)(Dr,{name:`Email digest`,desc:`Reserved for future local notification setup`,children:(0,V.jsx)(u,{stateKey:`email`})}),(0,V.jsx)(Dr,{name:`Weekly scorecard`,desc:`Reserved for future local notification setup`,children:(0,V.jsx)(u,{stateKey:`weekly`})})]})]})]})}function Dr({name:e,desc:t,children:n}){return(0,V.jsxs)(`div`,{className:`aio-setting-row`,children:[(0,V.jsxs)(`div`,{children:[(0,V.jsx)(`strong`,{children:e}),(0,V.jsx)(`div`,{className:`aio-muted`,children:t})]}),n]})}function Or({title:e,onClose:t,children:n,wide:r}){return(0,V.jsx)(`div`,{className:`aio-modal-backdrop`,children:(0,V.jsxs)(`div`,{className:`aio-modal${r?` wide`:``}`,children:[(0,V.jsxs)(`div`,{className:`aio-modal-head`,children:[(0,V.jsx)(`strong`,{children:e}),(0,V.jsx)(`button`,{className:`aio-icon-btn`,onClick:t,children:(0,V.jsx)(Hr,{name:`x`,size:16})})]}),n]})})}function kr(){let{notify:e}=Gn(),[t,n]=(0,_.useState)(`dqc`),[r,i]=(0,_.useState)(!1);function a(){n(`dqc`),window.setTimeout(()=>{window.dispatchEvent(new CustomEvent(`aio:dqc:open-upload`))},0)}function o(t){if(t===`imageedit`){e(`Use the main GRIMOIRE Image Edit tab for the full image workflow.`,{type:`info`});return}n(t)}let s={dqc:(0,V.jsxs)(V.Fragment,{children:[(0,V.jsxs)(`button`,{className:`btn btn-secondary`,onClick:a,children:[(0,V.jsx)(Mr,{size:15}),` Upload Master Data`]}),(0,V.jsxs)(`button`,{className:`btn btn-primary`,onClick:a,children:[(0,V.jsx)(jr,{size:15}),` Run Audit`]})]}),master:(0,V.jsxs)(V.Fragment,{children:[(0,V.jsxs)(`button`,{className:`btn btn-secondary`,onClick:a,children:[(0,V.jsx)(Mr,{size:15}),` Import Master Data`]}),(0,V.jsx)(`button`,{className:`btn btn-primary`,onClick:()=>window.dispatchEvent(new CustomEvent(`aio:master:new-record`)),children:`+ New Record`})]}),steward:(0,V.jsxs)(`button`,{className:`btn btn-primary`,disabled:!0,children:[(0,V.jsx)(Hr,{name:`refresh`,size:15}),` Auto-Assign`]}),rules:(0,V.jsx)(`button`,{className:`btn btn-primary`,onClick:()=>window.dispatchEvent(new CustomEvent(`aio:rules:edit`)),children:`Edit Rule Profile`}),history:(0,V.jsxs)(`button`,{className:`btn btn-primary`,onClick:a,children:[(0,V.jsx)(jr,{size:15}),` Run Audit`]}),reports:(0,V.jsxs)(`button`,{className:`btn btn-primary`,onClick:()=>window.dispatchEvent(new CustomEvent(`aio:reports:refresh`)),children:[(0,V.jsx)(Hr,{name:`refresh`,size:15}),` Refresh Reports`]}),config:(0,V.jsxs)(`button`,{className:`btn btn-primary`,onClick:()=>window.dispatchEvent(new CustomEvent(`aio:config:save`)),children:[(0,V.jsx)(Br,{size:14}),` Save Changes`]})},c={dqc:(0,V.jsx)(Jr,{}),master:(0,V.jsx)(xr,{}),steward:(0,V.jsx)(Sr,{}),rules:(0,V.jsx)(Cr,{}),history:(0,V.jsx)(wr,{}),reports:(0,V.jsx)(Tr,{}),config:(0,V.jsx)(Er,{})};return(0,V.jsxs)(`div`,{className:`aio-embed${r?` collapsed`:``}`,children:[(0,V.jsxs)(`aside`,{className:`aio-sidebar`,children:[(0,V.jsxs)(`div`,{className:`aio-sidebar-top`,children:[(0,V.jsx)(`span`,{className:`aio-brand-mark`,children:(0,V.jsx)(Hr,{name:`grid`,size:15})}),(0,V.jsx)(`span`,{className:`aio-brand-name`,children:`UNIFICATION AIO`}),(0,V.jsx)(`button`,{className:`aio-collapse`,onClick:()=>i(e=>!e),title:`Toggle sidebar`,children:(0,V.jsx)(Hr,{name:`menu`,size:18})})]}),(0,V.jsx)(`nav`,{className:`aio-nav`,children:hr.map((e,n)=>`section`in e?(0,V.jsx)(`div`,{className:`aio-nav-section`,children:e.section},`${e.section}-${n}`):(0,V.jsxs)(`button`,{className:`aio-nav-item${t===e.id?` active`:``}`,onClick:()=>o(e.id),title:e.label,children:[(0,V.jsx)(Hr,{name:e.icon,size:18}),(0,V.jsx)(`span`,{children:e.label})]},e.id))}),(0,V.jsx)(`div`,{className:`aio-side-foot`,children:(0,V.jsxs)(`button`,{className:`aio-account`,children:[(0,V.jsx)(`span`,{className:`aio-avatar`,children:(0,V.jsx)(Hr,{name:`user`,size:16})}),(0,V.jsx)(`span`,{children:`Data Admin`}),(0,V.jsx)(Vr,{size:14})]})})]}),(0,V.jsxs)(`div`,{className:`aio-main`,children:[(0,V.jsxs)(`header`,{className:`aio-topbar`,children:[(0,V.jsx)(`h2`,{children:gr[t]}),(0,V.jsx)(`div`,{className:`aio-topbar-actions`,children:s[t]})]}),(0,V.jsx)(`main`,{className:`aio-content`,children:c[t]})]}),(0,V.jsx)(`style`,{children:`
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
      `})]})}function Ar(e,t,n){let r=e=>`"`+String(e??``).replace(/"/g,`""`)+`"`,i=t.map(r).join(`,`),a=n.map(e=>t.map(t=>r(e[t])).join(`,`)).join(`
`),o=new Blob([i+`
`+a],{type:`text/csv;charset=utf-8;`}),s=URL.createObjectURL(o),c=document.createElement(`a`);c.href=s,c.download=e,document.body.appendChild(c),c.click(),c.remove(),URL.revokeObjectURL(s)}function jr({size:e=15}){return(0,V.jsxs)(`svg`,{width:e,height:e,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,V.jsx)(`circle`,{cx:`12`,cy:`12`,r:`10`}),(0,V.jsx)(`polygon`,{points:`10 8 16 12 10 16 10 8`,fill:`currentColor`,stroke:`none`})]})}function Mr({size:e=15}){return(0,V.jsxs)(`svg`,{width:e,height:e,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,V.jsx)(`path`,{d:`M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4`}),(0,V.jsx)(`polyline`,{points:`7 10 12 15 17 10`}),(0,V.jsx)(`line`,{x1:`12`,y1:`15`,x2:`12`,y2:`3`})]})}function Nr({size:e=13}){return(0,V.jsxs)(`svg`,{width:e,height:e,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,V.jsx)(`circle`,{cx:`12`,cy:`12`,r:`10`}),(0,V.jsx)(`line`,{x1:`12`,y1:`16`,x2:`12`,y2:`12`}),(0,V.jsx)(`line`,{x1:`12`,y1:`8`,x2:`12.01`,y2:`8`})]})}function Pr({size:e=16}){return(0,V.jsxs)(`svg`,{width:e,height:e,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,V.jsx)(`rect`,{x:`3`,y:`4`,width:`18`,height:`18`,rx:`2`,ry:`2`}),(0,V.jsx)(`line`,{x1:`16`,y1:`2`,x2:`16`,y2:`6`}),(0,V.jsx)(`line`,{x1:`8`,y1:`2`,x2:`8`,y2:`6`}),(0,V.jsx)(`line`,{x1:`3`,y1:`10`,x2:`21`,y2:`10`})]})}function Fr({size:e=20}){return(0,V.jsxs)(`svg`,{width:e,height:e,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,V.jsx)(`path`,{d:`M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z`}),(0,V.jsx)(`polyline`,{points:`14 2 14 8 20 8`})]})}function Ir({size:e=15}){return(0,V.jsx)(`svg`,{width:e,height:e,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2.4,strokeLinecap:`round`,strokeLinejoin:`round`,children:(0,V.jsx)(`polyline`,{points:`15 18 9 12 15 6`})})}function Lr({size:e=15}){return(0,V.jsx)(`svg`,{width:e,height:e,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2.4,strokeLinecap:`round`,strokeLinejoin:`round`,children:(0,V.jsx)(`polyline`,{points:`9 18 15 12 9 6`})})}function Rr({size:e=13}){return(0,V.jsx)(`svg`,{width:e,height:e,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2.4,strokeLinecap:`round`,strokeLinejoin:`round`,children:(0,V.jsx)(`polyline`,{points:`18 15 12 9 6 15`})})}function zr({size:e=13}){return(0,V.jsxs)(`svg`,{width:e,height:e,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,V.jsx)(`line`,{x1:`12`,y1:`5`,x2:`12`,y2:`19`}),(0,V.jsx)(`polyline`,{points:`19 12 12 19 5 12`})]})}function Br({size:e=13}){return(0,V.jsx)(`svg`,{width:e,height:e,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:3,strokeLinecap:`round`,strokeLinejoin:`round`,children:(0,V.jsx)(`polyline`,{points:`20 6 9 17 4 12`})})}function Vr({size:e=14}){return(0,V.jsx)(`svg`,{width:e,height:e,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2.4,strokeLinecap:`round`,strokeLinejoin:`round`,children:(0,V.jsx)(`polyline`,{points:`6 9 12 15 18 9`})})}function Hr({name:e,size:t=18}){let n={width:t,height:t,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`},r={grid:(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)(`rect`,{x:`3`,y:`3`,width:`7`,height:`7`,rx:`1.5`}),(0,V.jsx)(`rect`,{x:`14`,y:`3`,width:`7`,height:`7`,rx:`1.5`}),(0,V.jsx)(`rect`,{x:`3`,y:`14`,width:`7`,height:`7`,rx:`1.5`}),(0,V.jsx)(`rect`,{x:`14`,y:`14`,width:`7`,height:`7`,rx:`1.5`})]}),menu:(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)(`line`,{x1:`4`,y1:`7`,x2:`20`,y2:`7`}),(0,V.jsx)(`line`,{x1:`4`,y1:`12`,x2:`20`,y2:`12`}),(0,V.jsx)(`line`,{x1:`4`,y1:`17`,x2:`20`,y2:`17`})]}),shield:(0,V.jsx)(`path`,{d:`M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z`}),db:(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)(`ellipse`,{cx:`12`,cy:`5`,rx:`8`,ry:`3`}),(0,V.jsx)(`path`,{d:`M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5`}),(0,V.jsx)(`path`,{d:`M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6`})]}),user:(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)(`circle`,{cx:`12`,cy:`8`,r:`4`}),(0,V.jsx)(`path`,{d:`M4 21c1.8-4 4.4-6 8-6s6.2 2 8 6`})]}),list:(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)(`line`,{x1:`9`,y1:`6`,x2:`20`,y2:`6`}),(0,V.jsx)(`line`,{x1:`9`,y1:`12`,x2:`20`,y2:`12`}),(0,V.jsx)(`line`,{x1:`9`,y1:`18`,x2:`20`,y2:`18`}),(0,V.jsx)(`circle`,{cx:`4`,cy:`6`,r:`1`}),(0,V.jsx)(`circle`,{cx:`4`,cy:`12`,r:`1`}),(0,V.jsx)(`circle`,{cx:`4`,cy:`18`,r:`1`})]}),clock:(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)(`circle`,{cx:`12`,cy:`12`,r:`9`}),(0,V.jsx)(`polyline`,{points:`12 7 12 12 16 14`})]}),report:(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)(`path`,{d:`M6 3h9l3 3v15H6z`}),(0,V.jsx)(`path`,{d:`M14 3v4h4`}),(0,V.jsx)(`line`,{x1:`9`,y1:`13`,x2:`15`,y2:`13`}),(0,V.jsx)(`line`,{x1:`9`,y1:`17`,x2:`15`,y2:`17`})]}),gear:(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)(`circle`,{cx:`12`,cy:`12`,r:`3`}),(0,V.jsx)(`path`,{d:`M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1-2.1 2.1-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V20h-3v-.2a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1-2.1-2.1.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H4v-3h.2a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1 2.1-2.1.1.1a1.6 1.6 0 0 0 1.8.3 1.6 1.6 0 0 0 1-1.5V4h3v.2a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1 2.1 2.1-.1.1a1.6 1.6 0 0 0-.3 1.8 1.6 1.6 0 0 0 1.5 1h.2v3h-.2a1.6 1.6 0 0 0-1.5 1Z`})]}),image:(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)(`rect`,{x:`3`,y:`5`,width:`18`,height:`14`,rx:`2`}),(0,V.jsx)(`circle`,{cx:`8`,cy:`10`,r:`2`}),(0,V.jsx)(`path`,{d:`M21 16l-5-5L5 19`})]}),refresh:(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)(`polyline`,{points:`20 6 20 12 14 12`}),(0,V.jsx)(`polyline`,{points:`4 18 4 12 10 12`}),(0,V.jsx)(`path`,{d:`M6.5 8a7 7 0 0 1 11.7-2L20 8`}),(0,V.jsx)(`path`,{d:`M17.5 16a7 7 0 0 1-11.7 2L4 16`})]}),x:(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)(`line`,{x1:`18`,y1:`6`,x2:`6`,y2:`18`}),(0,V.jsx)(`line`,{x1:`6`,y1:`6`,x2:`18`,y2:`18`})]})};return(0,V.jsx)(`svg`,{...n,children:r[e]})}function Ur({value:e}){return(0,V.jsx)(`span`,{className:`dqc-badge ${$n[e]||`out-closed`}`,children:e})}function Wr({value:e}){return(0,V.jsx)(`span`,{className:`dqc-badge ${er[e]||`out-open`}`,children:e})}function Gr(e,t){let n=t[e];return e===`Priority`&&n||e===`Severity`&&n?(0,V.jsx)(Ur,{value:sr(n)}):e===`Status`&&n&&er[sr(n)]?(0,V.jsx)(Wr,{value:sr(n)}):e===`Missing Fields`&&n?(0,V.jsx)(`span`,{style:{display:`flex`,gap:5,flexWrap:`wrap`},children:String(n).split(`; `).map(e=>(0,V.jsx)(`span`,{className:`dqc-badge out-open`,style:{fontSize:10.5},children:e},e))}):sr(n)}function Kr(e,t){let n=sr(t);return e===`Brand`||e===`SKU`||e===`Field`?`dqc-cell-bold`:n.startsWith(`missing:`)?`dqc-cell-missing`:n===`NO missing`?`dqc-cell-ok`:n===`-`?`dqc-cell-muted`:ar.has(e)?`dqc-cell-num`:``}function qr({label:e,children:t}){return(0,V.jsxs)(`div`,{className:`dqc-stat-card`,children:[(0,V.jsxs)(`div`,{className:`dqc-stat-head`,children:[e,` `,(0,V.jsx)(Nr,{size:13})]}),t]})}function Jr(){let{notify:e}=Gn(),[t,n]=(0,_.useState)(!1),[r,i]=(0,_.useState)(null),[a,o]=(0,_.useState)(null),s=(0,_.useRef)(null),[c,l]=(0,_.useState)(null),[u,d]=(0,_.useState)(`Overview`),[f,p]=(0,_.useState)({col:`Brand`,dir:`asc`}),[m,h]=(0,_.useState)(1),[g,v]=(0,_.useState)(10),[y,b]=(0,_.useState)(()=>Object.fromEntries(nr.map(e=>[e,rr.includes(e)]))),[x,S]=(0,_.useState)(()=>Object.fromEntries(ir.map(e=>[e,!0]))),C=Object.entries(y).filter(([,e])=>e).map(([e])=>e);(0,_.useEffect)(()=>{if(!r||![`pending`,`running`].includes(r.status))return;let t=!1,n=window.setInterval(async()=>{try{let a=await or(`/api/jobs/${r.id}`);if(t)return;if(i(a),a.status===`completed`)window.clearInterval(n),e(`Data QC report ready`,{type:`success`}),w(a.id);else if(a.status===`failed`){window.clearInterval(n),o(a.error??`Job failed`);let t=a.error??`Job failed`;e(ur(t)?`Replace the uploaded file`:`Data QC job failed`,{type:ur(t)?`warning`:`error`,message:a.error??void 0})}}catch{window.clearInterval(n)}},1200);return()=>{t=!0,window.clearInterval(n)}},[r?.id,r?.status]);let w=(0,_.useCallback)(async e=>{try{l((await or(`/api/jobs/${e}/report-data`)).sheets),d(`Overview`),h(1)}catch(e){o(e instanceof Error?e.message:String(e))}},[]);async function ee(t){if(!C.length){o(`Select at least one STATUS before running DQC.`);return}n(!0),o(null),i(null),l(null);try{let n=new FormData;n.append(`file`,t),n.append(`chunk_size`,`5000`),n.append(`max_workers`,`0`),n.append(`keep_detail_rows`,`true`),n.append(`selected_statuses`,JSON.stringify(C)),e(`Running DQC for ${t.name}`,{type:`info`}),i(await or(`/api/data-quality-control/jobs`,{method:`POST`,body:n}))}catch(t){let n=t instanceof Error?t.message:String(t);o(n),e(ur(n)?`Replace the uploaded file`:`Failed to start audit`,{type:ur(n)?`warning`:`error`,message:n})}finally{n(!1),s.current&&(s.current.value=``)}}function T(){r?.id&&window.open(qn(`/api/jobs/${encodeURIComponent(r.id)}/download`),`_blank`)}let E=fr(u,c),D=(0,_.useMemo)(()=>pr(u,E),[u,E]),te=(0,_.useMemo)(()=>mr(u,E),[u,E]),O=(0,_.useMemo)(()=>D.filter(e=>{let t=e.Priority||e.Severity||dr(sr(e.Field??e[`Missing Field`]));return!(t&&x[t]===!1)}),[D,x]),ne=(0,_.useMemo)(()=>[...O].sort((e,t)=>{let n=f.col===`Priority`||f.col===`Severity`,r=n?Qn[sr(e[f.col])]??99:sr(e[f.col]).toLowerCase(),i=n?Qn[sr(t[f.col])]??99:sr(t[f.col]).toLowerCase(),a=f.dir===`asc`?1:-1;return r<i?-1*a:r>i?1*a:0}),[O,f]),k=ne.length,re=Math.max(1,Math.ceil(k/g)),ie=Math.min(m,re),ae=(ie-1)*g,A=ne.slice(ae,ae+g);(0,_.useEffect)(()=>{h(1)},[u,g,x,f.col,f.dir,c]),(0,_.useEffect)(()=>{p({col:u===`Action Tracker`?`Priority`:u===`Validation Errors`?`Severity`:`Brand`,dir:`asc`})},[u]);let j=r?.status===`pending`||r?.status===`running`,M=r?.summary??null,oe=Math.max(0,Math.min(100,r?.status===`completed`?100:cr(M,`progress_percent`,j?3:0))),se=lr(M,`progress_phase`,r?.status??`idle`),ce=lr(M,`progress_message`,j?`Audit is running`:r?.status===`completed`?`Audit complete`:`Ready`),N=cr(M,`worker_count`,0);function P(e){b(t=>({...t,[e]:!t[e]}))}function F(e){S(t=>({...t,[e]:!t[e]}))}function le(e){p(t=>({col:e,dir:t.col===e&&t.dir===`asc`?`desc`:`asc`}))}return(0,_.useEffect)(()=>{let e=()=>s.current?.click();return window.addEventListener(`aio:dqc:open-upload`,e),()=>window.removeEventListener(`aio:dqc:open-upload`,e)},[]),(0,V.jsxs)(`div`,{className:`view tool-view dqc-view`,children:[(0,V.jsxs)(`div`,{className:`view-header`,children:[(0,V.jsx)(`h1`,{children:`Data Quality Control`}),(0,V.jsxs)(`div`,{className:`view-header-actions`,children:[(0,V.jsx)(`button`,{className:`btn btn-secondary`,onClick:()=>s.current?.click(),children:`Upload Master Data`}),(0,V.jsx)(`button`,{className:`btn btn-primary`,onClick:()=>s.current?.click(),disabled:t||j,children:`Run Audit`})]})]}),(0,V.jsx)(`input`,{ref:s,type:`file`,accept:`.xlsx,.xlsm,.csv`,hidden:!0,onChange:e=>{let t=e.target.files?.[0];t&&ee(t)}}),(0,V.jsxs)(`section`,{className:`tool-card dqc-run-panel`,children:[(0,V.jsxs)(`div`,{className:`dqc-run-panel-left`,children:[(0,V.jsx)(`div`,{className:`dqc-section-title`,children:`Data Quality Control`}),(0,V.jsx)(`div`,{className:`dqc-sub`,children:r?`Job ${r.id} | ${r.status}`:`Upload master data and run DQC with the selected STATUS filter.`}),a&&(0,V.jsx)(`div`,{className:`dqc-error`,children:a})]}),(0,V.jsxs)(`button`,{className:`btn btn-primary`,onClick:()=>s.current?.click(),disabled:t||j,children:[(0,V.jsx)(jr,{size:15}),` `,t||j?`Running...`:`Run DQC Audit`]}),(0,V.jsxs)(`button`,{className:`btn btn-success`,disabled:!r||r.status!==`completed`,onClick:T,children:[(0,V.jsx)(Mr,{size:15}),` Download Report`]})]}),r&&(0,V.jsxs)(`section`,{className:`tool-card dqc-progress-panel dqc-progress-${r.status}`,children:[(0,V.jsxs)(`div`,{className:`dqc-progress-head`,children:[(0,V.jsxs)(`div`,{children:[(0,V.jsx)(`div`,{className:`dqc-section-title`,children:`Audit Progress`}),(0,V.jsxs)(`div`,{className:`dqc-sub`,children:[ce,N?` | workers: ${N}`:``]})]}),(0,V.jsxs)(`strong`,{children:[Math.round(oe),`%`]})]}),(0,V.jsx)(`div`,{className:`dqc-progress-track`,"aria-label":`Data QC audit progress`,children:(0,V.jsx)(`div`,{className:`dqc-progress-fill`,style:{width:`${oe}%`}})}),(0,V.jsxs)(`div`,{className:`dqc-progress-meta`,children:[(0,V.jsx)(`span`,{children:se.replace(/_/g,` `)}),(0,V.jsx)(`span`,{children:r.original_filename??lr(M,`current_file`,``)})]})]}),(0,V.jsxs)(`div`,{className:`dqc-stat-grid`,children:[(0,V.jsxs)(qr,{label:`Brands Audited`,children:[(0,V.jsx)(`div`,{className:`dqc-stat-val green`,children:M?String(M.brand_count??0):`-`}),(0,V.jsx)(`div`,{className:`dqc-stat-sub`,children:`from current run`})]}),(0,V.jsxs)(qr,{label:`Critical Actions`,children:[(0,V.jsx)(`div`,{className:`dqc-stat-val red`,children:M?String(M.critical_actions??0):`-`}),(0,V.jsx)(`div`,{className:`dqc-stat-sub`,children:`priority rows`})]}),(0,V.jsxs)(qr,{label:`Validation Errors`,children:[(0,V.jsx)(`div`,{className:`dqc-stat-val red`,children:M?String(M.validation_error_count??0):`-`}),(0,V.jsx)(`div`,{className:`dqc-stat-sub`,children:`rule violations`})]}),(0,V.jsxs)(qr,{label:`Included Rows`,children:[(0,V.jsxs)(`div`,{className:`dqc-stat-date`,children:[(0,V.jsx)(Pr,{size:16}),` `,M?`${M.included_rows}/${M.total_rows}`:`-`]}),(0,V.jsx)(`div`,{className:`dqc-stat-sub`,children:`selected status / total rows`})]})]}),(0,V.jsxs)(`div`,{className:`dqc-grid`,children:[(0,V.jsxs)(`div`,{className:`tool-card dqc-table-card`,children:[(0,V.jsx)(`div`,{className:`dqc-tabs`,children:tr.map(e=>(0,V.jsx)(`button`,{className:`dqc-tab${u===e?` active`:``}`,onClick:()=>d(e),children:e},e))}),(0,V.jsx)(`div`,{style:{overflowX:`auto`},children:(0,V.jsxs)(`table`,{className:`dqc-tbl`,children:[(0,V.jsx)(`thead`,{children:(0,V.jsx)(`tr`,{children:(te.length?te:[`NO DATA`]).map(e=>(0,V.jsx)(`th`,{className:`dqc-sortable`,onClick:()=>te.length>0&&le(e),children:(0,V.jsxs)(`span`,{className:`dqc-th-in`,style:{color:f.col===e?`var(--red, #ef4444)`:void 0},children:[e,te.length>0&&(f.col===e&&f.dir===`asc`?(0,V.jsx)(Rr,{size:13}):(0,V.jsx)(zr,{size:13}))]})},e))})}),(0,V.jsxs)(`tbody`,{children:[A.map((e,t)=>(0,V.jsx)(`tr`,{children:te.map(t=>(0,V.jsx)(`td`,{className:Kr(t,e[t]),children:Gr(t,e)},t))},t)),A.length===0&&(0,V.jsx)(`tr`,{children:(0,V.jsx)(`td`,{colSpan:Math.max(te.length,1),style:{textAlign:`center`,color:`var(--text-muted)`,padding:40},children:t||j?`Audit is running...`:`No live DQC data loaded. Run an audit to populate this tab.`})})]})]})}),(0,V.jsxs)(`div`,{className:`dqc-pager`,children:[(0,V.jsx)(`div`,{className:`dqc-pager-info`,children:k===0?`No entries`:`Showing ${ae+1} to ${Math.min(ae+g,k)} of ${k} entries`}),(0,V.jsxs)(`div`,{className:`dqc-pg-nums`,children:[(0,V.jsx)(`button`,{className:`dqc-pg dqc-pg-arrow`,disabled:ie===1,onClick:()=>h(e=>Math.max(1,e-1)),children:(0,V.jsx)(Ir,{size:15})}),(0,V.jsx)(`button`,{className:`dqc-pg dqc-pg-active`,children:ie}),(0,V.jsx)(`button`,{className:`dqc-pg dqc-pg-arrow`,disabled:ie===re,onClick:()=>h(e=>Math.min(re,e+1)),children:(0,V.jsx)(Lr,{size:15})})]}),(0,V.jsxs)(`div`,{className:`dqc-select-wrap`,children:[(0,V.jsx)(`select`,{value:g,onChange:e=>v(+e.target.value),children:[10,25,50,100].map(e=>(0,V.jsxs)(`option`,{value:e,children:[e,` / page`]},e))}),(0,V.jsx)(`span`,{className:`dqc-chev`,children:(0,V.jsx)(Vr,{size:14})})]})]})]}),(0,V.jsxs)(`aside`,{className:`tool-card dqc-filter-panel`,children:[(0,V.jsx)(`div`,{className:`dqc-rules-h`,children:`Run Filters`}),(0,V.jsx)(`div`,{className:`dqc-subhead`,children:`Master Data STATUS`}),nr.map(e=>(0,V.jsxs)(`label`,{className:`dqc-chk${y[e]?` on`:``}`,onClick:()=>P(e),children:[(0,V.jsx)(`span`,{className:`dqc-box`,children:(0,V.jsx)(Br,{size:13})}),e]},e)),(0,V.jsx)(`div`,{className:`dqc-subhead`,children:`Priority Filter`}),ir.map(e=>(0,V.jsxs)(`label`,{className:`dqc-chk${x[e]?` on`:``}`,onClick:()=>F(e),children:[(0,V.jsx)(`span`,{className:`dqc-box`,children:(0,V.jsx)(Br,{size:13})}),e]},e)),(0,V.jsx)(`div`,{className:`dqc-filter-note`,children:`Included statuses are sent to the backend before Excel parsing and missing-data counting.`})]})]}),(0,V.jsxs)(`section`,{className:`tool-card dqc-download-section`,children:[(0,V.jsx)(`div`,{className:`dqc-rules-h`,style:{marginBottom:14},children:`Download Current View`}),(0,V.jsxs)(`div`,{className:`dqc-dl-row`,children:[(0,V.jsx)(`div`,{className:`dqc-file-ico`,children:(0,V.jsx)(Fr,{size:20})}),(0,V.jsxs)(`div`,{style:{flex:1,minWidth:0},children:[(0,V.jsxs)(`div`,{style:{fontWeight:600,fontSize:13.5},children:[u.replace(/ /g,`_`),`_`,k,`_rows.csv`]}),(0,V.jsxs)(`div`,{style:{fontSize:12.5,color:`var(--text-muted)`},children:[k,` filtered entries from the current report sheet`]})]}),(0,V.jsxs)(`button`,{className:`btn btn-success btn-sm`,disabled:!te.length,onClick:()=>{Ar(`${u.replace(/ /g,`_`)}_export.csv`,te,ne),e(`Exported ${k} rows to CSV`,{type:`success`})},children:[(0,V.jsx)(Mr,{size:15}),` Download`]})]})]}),(0,V.jsx)(`style`,{children:`
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
      `})]})}var Yr=[{label:`Custom`,w:0,h:0},{label:`Marketplace Square 800`,w:800,h:800},{label:`Marketplace Square 1000`,w:1e3,h:1e3},{label:`Marketplace Square 1200`,w:1200,h:1200},{label:`Marketplace Square 1500`,w:1500,h:1500},{label:`Amazon Main 2000`,w:2e3,h:2e3},{label:`Shopify 2048`,w:2048,h:2048},{label:`Web Banner 1920x1080`,w:1920,h:1080},{label:`Print A4 2480x3508`,w:2480,h:3508}],Xr=[`1. Read source`,`2. Crop`,`3. AI upscale`,`4. Fit to dimension`,`5. Margin/DPI`,`6. Rename/export`],Zr={ai_expand:`AI Expand uses a generative model and may produce unexpected results on complex backgrounds.`,blur_cover:`Blur cover works best on images with a single dominant subject.`,edge_extend:`Edge extension may create visible artifacts on images with complex borders.`},Qr={ai_canvas_expand:`AI Canvas Expand requires a compatible GPU and may be slow on large batches.`},$r=`grimoire-image-edit-custom-dimension-presets`,ei=12,U={inputFolder:``,outputFolder:``,includeSubfolders:!0,preserveStructure:!0,outputMode:`zip`,preset:`Custom`,width:1e3,height:1e3,lockAspect:!0,fitMode:`contain`,marginMode:`default`,marginUnit:`px`,marginL:0,marginT:0,marginR:0,marginB:0,marginBeforeFit:!1,dpi:72,layoutPreset:`manual`,canvasBg:`white`,autoComposeStyle:`centered`,aiExpandPrompt:``,upscaleMode:`none`,standardUpscale:`pillow_lanczos`,clarityEnhance:`auto`,esrganModel:`realesrgan-x4plus`,esrganScale:4,esrganCpuFallback:!1,removeWhiteSpace:!1,autoProductFill:!1,fillRatio:.85,safePadding:!1,requireWhiteBg:!1,rejectPeopleHands:!1,removeSoftShadow:!1,removeBgRembg:!1,bgRemovalMode:`border_white`,maxWorkers:4,outputFormat:`jpg`,quality:92,maxFileSize:0,namingRule:`keep_original`,customTemplate:`{name}_{index}`},ti=0;function ni(e,t){return{id:++ti,timestamp:new Date().toLocaleTimeString(`en-GB`,{hour12:!1}),level:e,message:t}}function ri(e){switch(e){case`SUCCESS`:return`var(--green)`;case`WARN`:return`var(--yellow)`;case`ERROR`:return`var(--red)`;default:return`var(--blue)`}}function ii(e,t){switch(e){case`keep_original`:return`photo_001.jpg`;case`sequential`:return`001.jpg, 002.jpg, ...`;case`ean_prefix`:return`4006381_001.jpg`;case`custom_template`:return t.replace(`{name}`,`photo`).replace(`{index}`,`001`).replace(`{ean}`,`4006381`).replace(`{w}`,`1000`).replace(`{h}`,`1000`)+`.jpg`;default:return``}}function ai(e){return e===`local`?`local_folder`:`zip`}function oi(){try{let e=window.localStorage.getItem($r);if(!e)return[];let t=JSON.parse(e);return Array.isArray(t)?t.map(e=>({label:String(e?.label||``).trim(),w:Number(e?.w),h:Number(e?.h)})).filter(e=>e.label&&Number.isFinite(e.w)&&Number.isFinite(e.h)&&e.w>0&&e.h>0):[]}catch{return[]}}function si(e){window.localStorage.setItem($r,JSON.stringify(e))}function ci(e,t){switch(e){case`keep_original`:return`{original_stem}`;case`sequential`:return`{index:03d}`;case`ean_prefix`:return`{ean}_{index:03d}`;case`custom_template`:return t||`{name}_{index}`;default:return`{original_stem}`}}function W({label:e,children:t,inline:n}){return(0,V.jsxs)(`label`,{className:`tool-field ${n?`ie-field-inline`:``}`,children:[(0,V.jsx)(`span`,{children:e}),t]})}function li({value:e,options:t,onChange:n}){return(0,V.jsx)(`div`,{className:`segmented`,children:t.map(t=>(0,V.jsx)(`button`,{className:e===t.value?`active`:``,onClick:()=>n(t.value),children:t.label},t.value))})}function ui({value:e,min:t,max:n,onChange:r}){return(0,V.jsxs)(`div`,{className:`ie-stepper`,children:[(0,V.jsx)(`button`,{className:`btn btn-secondary btn-sm`,onClick:()=>r(Math.max(t,e-1)),disabled:e<=t,children:`-`}),(0,V.jsx)(`span`,{className:`ie-stepper-value`,children:e}),(0,V.jsx)(`button`,{className:`btn btn-secondary btn-sm`,onClick:()=>r(Math.min(n,e+1)),disabled:e>=n,children:`+`})]})}function di(){let{notify:e}=Gn(),[t,n]=(0,_.useState)(U.inputFolder),[r,i]=(0,_.useState)(U.outputFolder),[a,o]=(0,_.useState)([]),[s,c]=(0,_.useState)(U.includeSubfolders),[l,u]=(0,_.useState)(U.preserveStructure),[d,f]=(0,_.useState)(U.outputMode),[p,m]=(0,_.useState)(U.preset),[h,g]=(0,_.useState)(U.width),[v,y]=(0,_.useState)(U.height),[b,x]=(0,_.useState)(U.lockAspect),[S,C]=(0,_.useState)(U.fitMode),[w,ee]=(0,_.useState)(U.marginMode),[T,E]=(0,_.useState)(U.marginUnit),[D,te]=(0,_.useState)(U.marginL),[O,ne]=(0,_.useState)(U.marginT),[k,re]=(0,_.useState)(U.marginR),[ie,ae]=(0,_.useState)(U.marginB),[A,j]=(0,_.useState)(U.marginBeforeFit),[M,oe]=(0,_.useState)(U.dpi),[se,ce]=(0,_.useState)(U.layoutPreset),[N,P]=(0,_.useState)(U.canvasBg),[F,le]=(0,_.useState)(U.autoComposeStyle),[I,ue]=(0,_.useState)(U.aiExpandPrompt),[L,de]=(0,_.useState)(U.upscaleMode),[fe,pe]=(0,_.useState)(U.standardUpscale),[me,he]=(0,_.useState)(U.clarityEnhance),[R,ge]=(0,_.useState)(U.esrganModel),[_e,ve]=(0,_.useState)(U.esrganScale),[ye,be]=(0,_.useState)(U.esrganCpuFallback),[xe,Se]=(0,_.useState)(U.removeWhiteSpace),[Ce,we]=(0,_.useState)(U.autoProductFill),[z,Te]=(0,_.useState)(U.fillRatio),[Ee,De]=(0,_.useState)(U.safePadding),[Oe,ke]=(0,_.useState)(U.requireWhiteBg),[Ae,je]=(0,_.useState)(U.rejectPeopleHands),[Me,Ne]=(0,_.useState)(U.removeSoftShadow),[B,Pe]=(0,_.useState)(U.removeBgRembg),[Fe,Ie]=(0,_.useState)(U.bgRemovalMode),[Le,Re]=(0,_.useState)(U.maxWorkers),[ze,Be]=(0,_.useState)(U.outputFormat),[Ve,He]=(0,_.useState)(U.quality),[Ue,We]=(0,_.useState)(U.maxFileSize),[Ge,Ke]=(0,_.useState)(U.namingRule),[qe,Je]=(0,_.useState)(U.customTemplate),[Ye,Xe]=(0,_.useState)(()=>oi()),[Ze,Qe]=(0,_.useState)(!1),[$e,et]=(0,_.useState)(null),[tt,nt]=(0,_.useState)([]),[rt,it]=(0,_.useState)([]),[at,ot]=(0,_.useState)(null),[st,ct]=(0,_.useState)([]),lt=(0,_.useRef)(null),ut=(0,_.useRef)(null),dt=[...Yr,...Ye],ft=rt.find(e=>e.id===at)||rt[0]||null,pt=Ye.some(e=>e.label===p),mt=Zn($e,t=>{if(ht(t.status===`completed`?`SUCCESS`:`ERROR`,t.status===`completed`?`Processing complete`:`Job failed: ${t.error||`unknown error`}`),t.status===`completed`){let e={id:`job-${t.id}`,kind:`job`,label:t.original_filename||`Job ${t.id.slice(0,8)}`,jobId:t.id,outputPath:t.output_path,createdAt:new Date().toLocaleTimeString(`en-GB`,{hour12:!1})};it(t=>{let n=[e,...t.filter(t=>t.id!==e.id)];return n.slice(ei).forEach(e=>{e.url&&URL.revokeObjectURL(e.url)}),n.slice(0,ei)}),ot(e.id)}e(t.status===`completed`?`Image edit output ready`:`Image edit failed`,{type:t.status===`completed`?`success`:`error`,message:t.error||t.output_path||void 0})}),ht=(0,_.useCallback)((e,t)=>{ct(n=>[...n,ni(e,t)].slice(-500))},[]);(0,_.useEffect)(()=>{lt.current&&(lt.current.scrollTop=lt.current.scrollHeight)},[st]);function gt(e){m(e);let t=dt.find(t=>t.label===e);t&&t.w>0&&(g(t.w),y(t.h))}function _t(){let t=window.prompt(`Preset name`,p===`Custom`?`${h} x ${v}`:p)?.trim();if(!t)return;if(Yr.some(e=>e.label===t)){e(`Use a different preset name`,{type:`warning`,message:`Built-in presets cannot be overwritten.`});return}let n=[{label:t,w:h,h:v},...Ye.filter(e=>e.label!==t)];Xe(n),si(n),m(t),ht(`SUCCESS`,`Saved preset: ${t}`),e(`Custom preset saved`,{type:`success`,message:`${t} (${h} x ${v})`})}function vt(){let t=p,n=Ye.filter(e=>e.label!==t);Xe(n),si(n),m(`Custom`),ht(`INFO`,`Deleted preset: ${t}`),e(`Custom preset deleted`,{type:`info`})}function yt(e){g(e),b&&v>0&&y(e),m(`Custom`)}function bt(e){y(e),b&&h>0&&g(e),m(`Custom`)}function xt(e){if(!e)return;let t=Array.from(e);o(e=>[...e,...t]),n(``),ht(`INFO`,`Added ${t.length} file(s)`)}async function St(){let e=await Yn(`Select image input folder`,t);e&&(n(e),o([]),nt([]),c(!0),u(!0),ht(`INFO`,`Selected input folder: ${e}`))}function Ct(e){nt(t=>t.filter(t=>t.id!==e))}function wt(){let e=w===`custom`?Math.max(D,O,k,ie):0,t=Ee?8:0,n=Math.round(z*100),r=B||Fe===`rembg`||Fe===`sam2`;return{width:h,height:v,fit_mode:S,layout_preset:se,canvas_background_mode:N,auto_compose_style:se===`auto_compose`?F:`balanced`,ai_canvas_expand_enabled:se===`ai_canvas_expand`||N===`ai_expand`,ai_canvas_expand_provider:`comfyui`,ai_canvas_expand_prompt:se===`ai_canvas_expand`||N===`ai_expand`?I||`clean commercial product photo background, consistent lighting`:``,margin:e,margin_mode:T===`%`?`percent`:`pixels`,dpi:M,upscale_mode:L,standard_upscale_method:fe,clarity_enhance:me,upscale_model:R,upscale_scale:_e,upscale_cpu_fallback:ye,crop_to_content:xe,remove_white_space_around_product:xe,auto_product_fill:Ce,fill_ratio:Ce?z:.88,safe_padding:t,product_fill_enabled:Ce,product_fill_ratio:n,product_safe_padding:t,normalize_product_size:Ce,product_target_occupancy:Ce?z:.88,require_white_bg:Oe,require_white_background:Oe,reject_people_hands:Ae,reject_human_parts:Ae,remove_shadow:Me,remove_background:r,background_removal_mode:r?Fe:`border_white`,manual_transform_enabled:se===`canva_manual`,max_workers:Le,output_format:ze,output_quality:Ve,max_file_size_mb:Ue>0?Ue:0,naming_rule:ci(Ge,qe),include_subfolders:s,preserve_folder_structure:l,output_mode:ai(d)}}function Tt(){n(U.inputFolder),i(U.outputFolder),o([]),c(U.includeSubfolders),u(U.preserveStructure),f(U.outputMode),m(U.preset),g(U.width),y(U.height),x(U.lockAspect),C(U.fitMode),ee(U.marginMode),E(U.marginUnit),te(U.marginL),ne(U.marginT),re(U.marginR),ae(U.marginB),j(U.marginBeforeFit),oe(U.dpi),ce(U.layoutPreset),P(U.canvasBg),le(U.autoComposeStyle),ue(U.aiExpandPrompt),de(U.upscaleMode),pe(U.standardUpscale),he(U.clarityEnhance),ge(U.esrganModel),ve(U.esrganScale),be(U.esrganCpuFallback),Se(U.removeWhiteSpace),we(U.autoProductFill),Te(U.fillRatio),De(U.safePadding),ke(U.requireWhiteBg),je(U.rejectPeopleHands),Ne(U.removeSoftShadow),Pe(U.removeBgRembg),Ie(U.bgRemovalMode),Re(U.maxWorkers),Be(U.outputFormat),He(U.quality),We(U.maxFileSize),Ke(U.namingRule),Je(U.customTemplate),nt([]),ht(`INFO`,`All settings reset to defaults`)}async function Et(){let t=a[0];if(!t){e(`Add at least one image to preview`,{type:`warning`});return}ht(`INFO`,`Previewing: ${t.name}`),Qe(!0);try{let e=new FormData;e.append(`file`,t);let n=wt();for(let[t,r]of Object.entries(n))r!==void 0&&e.append(t,String(r));let r=await fetch(qn(`/api/image-edit/preview`),{method:`POST`,body:e}).then(e=>{if(!e.ok)throw Error(e.statusText);return e.blob()}),i=URL.createObjectURL(r),a={id:`preview-${Date.now()}`,kind:`preview`,label:t.name,url:i,createdAt:new Date().toLocaleTimeString(`en-GB`,{hour12:!1})};it(e=>{let t=[a,...e];return t.slice(ei).forEach(e=>{e.url&&URL.revokeObjectURL(e.url)}),t.slice(0,ei)}),ot(a.id),ht(`SUCCESS`,`Preview generated`)}catch(t){ht(`ERROR`,`Preview failed: ${t instanceof Error?t.message:String(t)}`),e(`Preview failed`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{Qe(!1)}}async function Dt(){let n=wt();Qe(!0),ht(`INFO`,`Starting processing job...`);try{let i;if(a.length>0){let e=new FormData;a.forEach(t=>e.append(`files`,t));for(let[t,r]of Object.entries(n))r!==void 0&&e.append(t,String(r));i=await H(`/api/image-edit/jobs`,{method:`POST`,body:e})}else if(t)i=await H(`/api/image-edit/folder-jobs`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({input_folder_path:t,output_folder_path:r||null,output_mode:ai(d),...n})});else throw Error(`Choose files or an input folder first.`);et(i);let o=a.map((e,t)=>({id:`${i.id}-${t}`,file:e,name:e.name,thumbnail:e.type.startsWith(`image/`)?URL.createObjectURL(e):void 0,dimensions:``,progress:0,status:`pending`}));o.length>0&&nt(o),o.length===0&&t&&nt([{id:`${i.id}-folder`,name:t,dimensions:s?`Scanning subfolders`:`Scanning folder`,progress:0,status:`pending`}]),ht(`SUCCESS`,`Job started: ${i.id}`),e(`Image edit job started`,{type:`info`,message:i.id})}catch(t){ht(`ERROR`,`Failed to start: ${t instanceof Error?t.message:String(t)}`),e(`Image edit job failed to start`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{Qe(!1)}}let Ot=a.length,kt=a.length===0&&t.length>0,At=kt?`Folder selected${s?` (including subfolders)`:``}`:`${Ot} file${Ot===1?``:`s`} selected`,jt=a.length>0||t.length>0,Mt=se===`ai_canvas_expand`||N===`ai_expand`,Nt=Zr[N]||Qr[se]||``;return(0,_.useEffect)(()=>{let e=mt?.summary,t=Array.isArray(e?.items)?e.items:[];!mt||t.length===0||nt(t.map((e,t)=>{let n=e,r=String(n.item_id||`${mt.id}-${t+1}`),i=String(n.status||mt.status),a=Math.max(0,Math.min(100,Number(n.progress_percent??(i===`completed`?100:0)))),o=n.width?Number(n.width):null,s=n.height?Number(n.height):null,c=`${i}-${String(n.finished_at_ms||n.progress_percent||a)}`;return{id:r,name:String(n.output_filename||n.original_filename||n.relative_path||`image-${t+1}`),thumbnail:qn(`/api/jobs/${encodeURIComponent(mt.id)}/items/${encodeURIComponent(r)}/thumbnail?kind=auto&v=${encodeURIComponent(c)}`),dimensions:o&&s?`${o} x ${s}`:``,progress:a,status:i===`completed`?`completed`:i===`failed`||i===`skipped`?`failed`:i===`running`||mt.status===`running`?`running`:`pending`,elapsed:n.elapsed_seconds?`${Math.round(Number(n.elapsed_seconds))}s`:void 0,eta:n.eta_seconds?`${Math.round(Number(n.eta_seconds))}s`:void 0}}))},[mt?.id,mt?.status,mt?.summary]),(0,V.jsxs)(`div`,{className:`view tool-view ie-root`,children:[(0,V.jsxs)(`div`,{className:`view-header`,children:[(0,V.jsx)(`h1`,{children:`Image Edit`}),(0,V.jsx)(`div`,{className:`view-header-actions`,children:(0,V.jsxs)(`span`,{className:`status-online`,children:[(0,V.jsx)(`span`,{className:`dot`}),Xn(mt)||`Ready`]})})]}),(0,V.jsxs)(`div`,{className:`ie-columns`,children:[(0,V.jsxs)(`section`,{className:`tool-card ie-left`,children:[(0,V.jsx)(`h2`,{children:`Input`}),(0,V.jsx)(W,{label:`Input folder`,children:(0,V.jsxs)(`div`,{className:`path-picker`,children:[(0,V.jsx)(`input`,{value:t,onChange:e=>n(e.target.value),placeholder:`Path to image folder`}),(0,V.jsx)(`button`,{className:`btn btn-secondary btn-sm`,onClick:St,children:`Browse`})]})}),(0,V.jsx)(W,{label:`Output folder`,children:(0,V.jsxs)(`div`,{className:`path-picker`,children:[(0,V.jsx)(`input`,{value:r,onChange:e=>i(e.target.value),placeholder:`Optional output path`}),(0,V.jsx)(`button`,{className:`btn btn-secondary btn-sm`,onClick:async()=>i(await Yn(`Select image output folder`,r)),children:`Browse`})]})}),(0,V.jsx)(`input`,{ref:ut,type:`file`,multiple:!0,accept:`.jpg,.jpeg,.png,.webp,.tif,.tiff,.bmp,.avif,.zip`,style:{display:`none`},onChange:e=>xt(e.target.files)}),(0,V.jsxs)(`button`,{className:`btn btn-secondary ie-add-btn`,onClick:()=>ut.current?.click(),children:[(0,V.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,width:`16`,height:`16`,children:[(0,V.jsx)(`line`,{x1:`12`,y1:`5`,x2:`12`,y2:`19`}),(0,V.jsx)(`line`,{x1:`5`,y1:`12`,x2:`19`,y2:`12`})]}),`Add`]}),(0,V.jsxs)(`div`,{className:`ie-source-card`,children:[(0,V.jsx)(`strong`,{children:`Source`}),(0,V.jsx)(`span`,{children:At}),a.length>0&&(0,V.jsxs)(`div`,{className:`ie-file-list`,children:[a.slice(0,8).map((e,t)=>(0,V.jsxs)(`div`,{className:`ie-file-tag`,children:[(0,V.jsx)(`span`,{title:e.name,children:e.name}),(0,V.jsx)(`button`,{onClick:()=>o(e=>e.filter((e,n)=>n!==t)),children:`x`})]},`${e.name}-${t}`)),a.length>8&&(0,V.jsxs)(`span`,{className:`muted`,children:[`+`,a.length-8,` more`]})]}),kt&&(0,V.jsx)(`div`,{className:`ie-file-list`,children:(0,V.jsxs)(`div`,{className:`ie-file-tag`,children:[(0,V.jsx)(`span`,{title:t,children:t}),(0,V.jsx)(`button`,{onClick:()=>n(``),children:`x`})]})})]}),(0,V.jsxs)(`label`,{className:`check-row`,children:[(0,V.jsx)(`input`,{type:`checkbox`,checked:s,onChange:e=>c(e.target.checked)}),`Include subfolders`]}),(0,V.jsxs)(`label`,{className:`check-row`,children:[(0,V.jsx)(`input`,{type:`checkbox`,checked:l,onChange:e=>u(e.target.checked)}),`Preserve folder structure`]}),(0,V.jsx)(W,{label:`Output mode`,children:(0,V.jsx)(li,{value:d,options:[{label:`Local`,value:`local`},{label:`ZIP`,value:`zip`}],onChange:f})})]}),(0,V.jsxs)(`section`,{className:`tool-card ie-middle`,children:[(0,V.jsx)(`h2`,{children:`Processing`}),(0,V.jsx)(`div`,{className:`ie-pipeline`,children:Xr.map((e,t)=>(0,V.jsx)(`span`,{className:`ie-pipeline-step`,children:e},t))}),(0,V.jsxs)(`div`,{className:`ie-scroll-area`,children:[(0,V.jsx)(W,{label:`Dimension Preset`,children:(0,V.jsxs)(`div`,{className:`ie-preset-row`,children:[(0,V.jsx)(`select`,{value:p,onChange:e=>gt(e.target.value),children:dt.map(e=>(0,V.jsx)(`option`,{value:e.label,children:e.label},e.label))}),(0,V.jsx)(`button`,{className:`btn btn-secondary btn-sm`,onClick:_t,children:`Save`}),pt&&(0,V.jsx)(`button`,{className:`btn btn-secondary btn-sm`,onClick:vt,children:`Delete`})]})}),(0,V.jsxs)(`div`,{className:`ie-dim-row`,children:[(0,V.jsx)(W,{label:`Width`,children:(0,V.jsx)(`input`,{type:`number`,min:1,value:h,onChange:e=>yt(Number(e.target.value))})}),(0,V.jsx)(`button`,{className:`btn btn-sm ie-lock-btn ${b?`active`:``}`,title:b?`Unlock aspect ratio`:`Lock aspect ratio`,onClick:()=>x(!b),children:(0,V.jsx)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,width:`16`,height:`16`,children:b?(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)(`rect`,{x:`3`,y:`11`,width:`18`,height:`11`,rx:`2`}),(0,V.jsx)(`path`,{d:`M7 11V7a5 5 0 0110 0v4`})]}):(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)(`rect`,{x:`3`,y:`11`,width:`18`,height:`11`,rx:`2`}),(0,V.jsx)(`path`,{d:`M7 11V7a5 5 0 019.9-1`})]})})}),(0,V.jsx)(W,{label:`Height`,children:(0,V.jsx)(`input`,{type:`number`,min:1,value:v,onChange:e=>bt(Number(e.target.value))})})]}),(0,V.jsx)(W,{label:`Fit Mode`,children:(0,V.jsx)(li,{value:S,options:[{label:`Contain`,value:`contain`},{label:`Cover`,value:`cover`},{label:`Stretch`,value:`stretch`}],onChange:C})}),(0,V.jsx)(`div`,{className:`ie-section-label`,children:`Margins`}),(0,V.jsxs)(`div`,{className:`tool-row`,children:[(0,V.jsx)(W,{label:`Mode`,children:(0,V.jsxs)(`select`,{value:w,onChange:e=>ee(e.target.value),children:[(0,V.jsx)(`option`,{value:`default`,children:`Default`}),(0,V.jsx)(`option`,{value:`custom`,children:`Custom`})]})}),(0,V.jsx)(W,{label:`Unit`,children:(0,V.jsx)(li,{value:T,options:[{label:`px`,value:`px`},{label:`%`,value:`%`}],onChange:E})})]}),w===`custom`&&(0,V.jsxs)(`div`,{className:`ie-margin-grid`,children:[(0,V.jsx)(W,{label:`L`,children:(0,V.jsx)(`input`,{type:`number`,min:0,value:D,onChange:e=>te(Number(e.target.value))})}),(0,V.jsx)(W,{label:`T`,children:(0,V.jsx)(`input`,{type:`number`,min:0,value:O,onChange:e=>ne(Number(e.target.value))})}),(0,V.jsx)(W,{label:`R`,children:(0,V.jsx)(`input`,{type:`number`,min:0,value:k,onChange:e=>re(Number(e.target.value))})}),(0,V.jsx)(W,{label:`B`,children:(0,V.jsx)(`input`,{type:`number`,min:0,value:ie,onChange:e=>ae(Number(e.target.value))})})]}),(0,V.jsxs)(`label`,{className:`check-row`,children:[(0,V.jsx)(`input`,{type:`checkbox`,checked:A,onChange:e=>j(e.target.checked)}),`Apply margin before fit`]}),(0,V.jsx)(W,{label:`DPI`,children:(0,V.jsx)(`input`,{type:`number`,min:1,max:1200,value:M,onChange:e=>oe(Number(e.target.value))})}),(0,V.jsx)(W,{label:`Layout Preset`,children:(0,V.jsxs)(`select`,{value:se,onChange:e=>ce(e.target.value),children:[(0,V.jsx)(`option`,{value:`manual`,children:`Manual`}),(0,V.jsx)(`option`,{value:`canva_fill`,children:`Canva Fill`}),(0,V.jsx)(`option`,{value:`object_aware_canvas`,children:`Object-aware canvas`}),(0,V.jsx)(`option`,{value:`canva_manual`,children:`Canva Manual`}),(0,V.jsx)(`option`,{value:`auto_compose`,children:`Auto Compose`}),(0,V.jsx)(`option`,{value:`ai_canvas_expand`,children:`AI Canvas Expand`})]})}),(0,V.jsx)(W,{label:`Canvas Background`,children:(0,V.jsxs)(`select`,{value:N,onChange:e=>P(e.target.value),children:[(0,V.jsx)(`option`,{value:`white`,children:`White`}),(0,V.jsx)(`option`,{value:`smart`,children:`Smart Auto`}),(0,V.jsx)(`option`,{value:`edge_extend`,children:`Extend edges`}),(0,V.jsx)(`option`,{value:`blur_cover`,children:`Blur cover`}),(0,V.jsx)(`option`,{value:`ai_expand`,children:`AI Expand`})]})}),Nt&&(0,V.jsx)(`div`,{className:`ie-warning`,children:Nt}),se===`auto_compose`&&(0,V.jsx)(W,{label:`Auto Compose Style`,children:(0,V.jsxs)(`select`,{value:F,onChange:e=>le(e.target.value),children:[(0,V.jsx)(`option`,{value:`centered`,children:`Centered`}),(0,V.jsx)(`option`,{value:`rule_of_thirds`,children:`Rule of Thirds`}),(0,V.jsx)(`option`,{value:`product_hero`,children:`Product Hero`}),(0,V.jsx)(`option`,{value:`lifestyle`,children:`Lifestyle`})]})}),Mt&&(0,V.jsx)(W,{label:`AI Expand Prompt`,children:(0,V.jsx)(`input`,{value:I,onChange:e=>ue(e.target.value),placeholder:`Describe desired background...`})}),(0,V.jsx)(`div`,{className:`ie-section-label`,children:`AI Upscale`}),(0,V.jsx)(W,{label:`Upscale Engine`,children:(0,V.jsxs)(`select`,{value:L,onChange:e=>de(e.target.value),children:[(0,V.jsx)(`option`,{value:`none`,children:`None`}),(0,V.jsx)(`option`,{value:`real_esrgan_ncnn`,children:`Real-ESRGAN (NCNN)`})]})}),L===`none`?(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)(W,{label:`Standard Upscale`,children:(0,V.jsxs)(`select`,{value:fe,onChange:e=>pe(e.target.value),children:[(0,V.jsx)(`option`,{value:`pillow_lanczos`,children:`Pillow Lanczos`}),(0,V.jsx)(`option`,{value:`pillow_bicubic`,children:`Pillow Bicubic`}),(0,V.jsx)(`option`,{value:`opencv_lanczos4`,children:`OpenCV Lanczos4`}),(0,V.jsx)(`option`,{value:`opencv_cubic`,children:`OpenCV Cubic`})]})}),(0,V.jsx)(W,{label:`Clarity Enhance`,children:(0,V.jsxs)(`select`,{value:me,onChange:e=>he(e.target.value),children:[(0,V.jsx)(`option`,{value:`auto`,children:`Auto`}),(0,V.jsx)(`option`,{value:`none`,children:`None`}),(0,V.jsx)(`option`,{value:`light`,children:`Light`}),(0,V.jsx)(`option`,{value:`medium`,children:`Medium`}),(0,V.jsx)(`option`,{value:`strong`,children:`Strong`})]})})]}):(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)(W,{label:`Model`,children:(0,V.jsxs)(`select`,{value:R,onChange:e=>ge(e.target.value),children:[(0,V.jsx)(`option`,{value:`realesrgan-x4plus`,children:`realesrgan-x4plus`}),(0,V.jsx)(`option`,{value:`realesrgan-x4plus-anime`,children:`realesrgan-x4plus-anime`}),(0,V.jsx)(`option`,{value:`realesr-animevideov3`,children:`realesr-animevideov3`})]})}),(0,V.jsx)(W,{label:`Scale`,children:(0,V.jsx)(li,{value:String(_e),options:[{label:`2x`,value:`2`},{label:`3x`,value:`3`},{label:`4x`,value:`4`}],onChange:e=>ve(Number(e))})}),(0,V.jsxs)(`label`,{className:`check-row`,children:[(0,V.jsx)(`input`,{type:`checkbox`,checked:ye,onChange:e=>be(e.target.checked)}),`CPU Fallback`]})]}),(0,V.jsx)(`div`,{className:`ie-section-label`,children:`Image Filters`}),(0,V.jsxs)(`div`,{className:`ie-filter-grid`,children:[(0,V.jsxs)(`label`,{className:`check-row`,children:[(0,V.jsx)(`input`,{type:`checkbox`,checked:xe,onChange:e=>Se(e.target.checked)}),`Remove white space`]}),(0,V.jsxs)(`label`,{className:`check-row`,children:[(0,V.jsx)(`input`,{type:`checkbox`,checked:Ce,onChange:e=>we(e.target.checked)}),`Auto product fill`]}),Ce&&(0,V.jsx)(W,{label:`Fill ratio: ${Math.round(z*100)}%`,children:(0,V.jsx)(`input`,{type:`range`,min:.3,max:1,step:.01,value:z,onChange:e=>Te(Number(e.target.value)),className:`ie-slider`})}),(0,V.jsxs)(`label`,{className:`check-row`,children:[(0,V.jsx)(`input`,{type:`checkbox`,checked:Ee,onChange:e=>De(e.target.checked)}),`Safe padding`]}),(0,V.jsxs)(`label`,{className:`check-row`,children:[(0,V.jsx)(`input`,{type:`checkbox`,checked:Oe,onChange:e=>ke(e.target.checked)}),`Require white background`]}),(0,V.jsxs)(`label`,{className:`check-row`,children:[(0,V.jsx)(`input`,{type:`checkbox`,checked:Ae,onChange:e=>je(e.target.checked)}),`Reject people/hands`]}),(0,V.jsxs)(`label`,{className:`check-row`,children:[(0,V.jsx)(`input`,{type:`checkbox`,checked:Me,onChange:e=>Ne(e.target.checked)}),`Remove soft shadow`]}),(0,V.jsxs)(`label`,{className:`check-row`,children:[(0,V.jsx)(`input`,{type:`checkbox`,checked:B,onChange:e=>Pe(e.target.checked)}),`Remove background (rembg)`]}),B&&(0,V.jsx)(W,{label:`BG Mode`,children:(0,V.jsxs)(`select`,{value:Fe,onChange:e=>Ie(e.target.value),children:[(0,V.jsx)(`option`,{value:`border_white`,children:`Border white`}),(0,V.jsx)(`option`,{value:`rembg`,children:`rembg`}),(0,V.jsx)(`option`,{value:`sam2`,children:`SAM2`})]})})]}),(0,V.jsx)(W,{label:`Max Workers`,children:(0,V.jsx)(ui,{value:Le,min:1,max:16,onChange:Re})}),(0,V.jsx)(`div`,{className:`ie-section-label`,children:`Output`}),(0,V.jsxs)(`div`,{className:`tool-row`,children:[(0,V.jsx)(W,{label:`Format`,children:(0,V.jsxs)(`select`,{value:ze,onChange:e=>Be(e.target.value),children:[(0,V.jsx)(`option`,{value:`jpg`,children:`JPG`}),(0,V.jsx)(`option`,{value:`png`,children:`PNG`}),(0,V.jsx)(`option`,{value:`webp`,children:`WEBP`}),(0,V.jsx)(`option`,{value:`tiff`,children:`TIFF`})]})}),(0,V.jsx)(W,{label:`Quality`,children:(0,V.jsx)(`input`,{type:`number`,min:1,max:100,value:Ve,onChange:e=>He(Number(e.target.value))})})]}),(0,V.jsx)(W,{label:`Max File Size (MB)`,children:(0,V.jsx)(`input`,{type:`number`,min:0,step:.1,value:Ue,onChange:e=>We(Number(e.target.value)),placeholder:`0 = no limit`})}),(0,V.jsx)(`div`,{className:`ie-section-label`,children:`Naming`}),(0,V.jsx)(W,{label:`Naming Rule`,children:(0,V.jsxs)(`select`,{value:Ge,onChange:e=>Ke(e.target.value),children:[(0,V.jsx)(`option`,{value:`keep_original`,children:`Keep original`}),(0,V.jsx)(`option`,{value:`sequential`,children:`Sequential`}),(0,V.jsx)(`option`,{value:`ean_prefix`,children:`EAN prefix`}),(0,V.jsx)(`option`,{value:`custom_template`,children:`Custom template`})]})}),Ge===`custom_template`&&(0,V.jsx)(W,{label:`Template`,children:(0,V.jsx)(`input`,{value:qe,onChange:e=>Je(e.target.value),placeholder:`{name}_{index}`})}),(0,V.jsxs)(`div`,{className:`ie-naming-preview`,children:[`Preview: `,(0,V.jsx)(`code`,{children:ii(Ge,qe)})]})]}),(0,V.jsxs)(`div`,{className:`ie-footer`,children:[(0,V.jsx)(`button`,{className:`btn btn-secondary`,onClick:Tt,children:`Reset`}),(0,V.jsx)(`button`,{className:`btn btn-secondary`,onClick:Et,disabled:Ze||a.length===0,children:`Preview (First 1)`}),(0,V.jsx)(`button`,{className:`btn btn-primary`,onClick:Dt,disabled:Ze||!jt,children:`Start Processing`})]})]}),(0,V.jsxs)(`section`,{className:`tool-card ie-right`,children:[(0,V.jsxs)(`div`,{className:`ie-queue-header`,children:[(0,V.jsx)(`h2`,{children:`Job Queue`}),(0,V.jsx)(`span`,{className:`ie-queue-count`,children:tt.length})]}),(0,V.jsxs)(`div`,{className:`ie-queue-list`,children:[tt.length===0&&(0,V.jsx)(`div`,{className:`empty-box`,children:`No jobs queued yet.`}),tt.map((e,t)=>(0,V.jsxs)(`div`,{className:`ie-queue-item ie-q-${e.status}`,children:[(0,V.jsx)(`div`,{className:`ie-q-thumb`,children:e.thumbnail?(0,V.jsx)(`img`,{src:e.thumbnail,alt:``}):(0,V.jsx)(`div`,{className:`ie-q-thumb-placeholder`})}),(0,V.jsxs)(`div`,{className:`ie-q-info`,children:[(0,V.jsxs)(`div`,{className:`ie-q-name`,children:[(0,V.jsx)(`span`,{className:`ie-q-index`,children:t+1}),(0,V.jsx)(`span`,{title:e.name,children:e.name})]}),e.dimensions&&(0,V.jsx)(`span`,{className:`ie-q-dims`,children:e.dimensions}),(0,V.jsx)(`div`,{className:`ie-q-progress-bar`,children:(0,V.jsx)(`div`,{className:`ie-q-progress-fill`,style:{width:`${e.progress}%`}})}),(0,V.jsxs)(`div`,{className:`ie-q-meta`,children:[(0,V.jsxs)(`span`,{children:[e.progress,`%`]}),e.elapsed&&(0,V.jsx)(`span`,{children:e.elapsed}),e.eta&&(0,V.jsxs)(`span`,{children:[`ETA: `,e.eta]})]})]}),(0,V.jsx)(`button`,{className:`ie-q-remove`,title:`Remove`,onClick:()=>Ct(e.id),children:`x`})]},e.id))]}),(0,V.jsxs)(`div`,{className:`ie-output-header`,children:[(0,V.jsx)(`h2`,{children:`Outputs`}),(0,V.jsx)(`span`,{className:`ie-queue-count`,children:rt.length})]}),(0,V.jsxs)(`div`,{className:`ie-output-list`,children:[rt.length===0&&(0,V.jsx)(`div`,{className:`empty-box`,children:`No outputs yet.`}),rt.map(e=>(0,V.jsxs)(`button`,{className:`ie-output-item ${ft?.id===e.id?`active`:``}`,onClick:()=>ot(e.id),children:[(0,V.jsx)(`span`,{children:e.kind===`preview`?`Preview`:`Job`}),(0,V.jsx)(`strong`,{title:e.outputPath||e.label,children:e.label}),(0,V.jsx)(`em`,{children:e.createdAt})]},e.id))]}),(0,V.jsx)(`div`,{className:`ie-preview-frame`,children:ft?.url?(0,V.jsx)(`img`,{src:ft.url,alt:`Preview output`}):ft?.kind===`job`?(0,V.jsx)(`div`,{className:`empty-box`,children:`Job output is ready to download.`}):(0,V.jsx)(`div`,{className:`empty-box`,children:`Output preview will appear here.`})}),ft?.kind===`job`&&ft.jobId&&(0,V.jsxs)(`a`,{className:`btn btn-primary ie-download-btn`,href:qn(`/api/jobs/${encodeURIComponent(ft.jobId)}/download`),target:`_blank`,rel:`noreferrer`,children:[(0,V.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,width:`16`,height:`16`,children:[(0,V.jsx)(`path`,{d:`M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4`}),(0,V.jsx)(`polyline`,{points:`7 10 12 15 17 10`}),(0,V.jsx)(`line`,{x1:`12`,y1:`15`,x2:`12`,y2:`3`})]}),`Download`]})]})]}),(0,V.jsxs)(`div`,{className:`ie-console`,children:[(0,V.jsxs)(`div`,{className:`ie-console-header`,children:[(0,V.jsxs)(`div`,{className:`ie-console-title`,children:[(0,V.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,width:`16`,height:`16`,children:[(0,V.jsx)(`polyline`,{points:`4 17 10 11 4 5`}),(0,V.jsx)(`line`,{x1:`12`,y1:`19`,x2:`20`,y2:`19`})]}),`Console`]}),(0,V.jsx)(`button`,{className:`btn btn-secondary btn-sm`,onClick:()=>ct([]),children:`Clear`})]}),(0,V.jsxs)(`div`,{className:`ie-console-body`,ref:lt,children:[st.length===0&&(0,V.jsx)(`div`,{className:`empty-box`,style:{padding:`12px`},children:`No log entries yet.`}),st.map(e=>(0,V.jsxs)(`div`,{className:`ie-log-entry`,children:[(0,V.jsx)(`span`,{className:`ie-log-time`,children:e.timestamp}),(0,V.jsx)(`span`,{className:`ie-log-level`,style:{color:ri(e.level)},children:e.level}),(0,V.jsx)(`span`,{className:`ie-log-msg`,children:e.message})]},e.id))]})]})]})}function fi(e){return e<1024?`${e} B`:e<1024*1024?`${(e/1024).toFixed(1)} KB`:`${(e/1024/1024).toFixed(2)} MB`}function pi(e){return qn(`/api/images-check/file?path=${encodeURIComponent(e)}`)}function mi(e){return qn(`/api/images-check/thumb?path=${encodeURIComponent(e)}`)}function hi(e){let t=e.replace(/\\/g,`/`),n=t.lastIndexOf(`/`);return n>=0?t.slice(0,n):`.`}function gi(e){if(e===`.`)return`Root folder`;let t=e.split(`/`).filter(Boolean);return t[t.length-1]||e}function _i(){let{notify:e}=Gn(),[t,n]=(0,_.useState)(``),[r,i]=(0,_.useState)(``),[a,o]=(0,_.useState)([]),[s,c]=(0,_.useState)(new Set),[l,u]=(0,_.useState)(!1),[d,f]=(0,_.useState)(``),[p,m]=(0,_.useState)(`slideshow`),[h,g]=(0,_.useState)(null),v=(0,_.useMemo)(()=>{let e=d.trim().toLowerCase();return e?a.filter(t=>`${t.name} ${t.relativePath} ${t.extension}`.toLowerCase().includes(e)):a},[a,d]),y=(0,_.useMemo)(()=>{let e=new Map;for(let t of v){let n=hi(t.relativePath),r=e.get(n);r?r.push(t):e.set(n,[t])}return Array.from(e.entries()).map(([e,t])=>({folder:e,label:gi(e),images:t}))},[v]),b=a.length-s.size;async function x(){let e=await Yn(`Select folder to check images`,t);e&&(n(e),await S(e))}async function S(r=t){if(!r){e(`Choose a folder first`,{type:`warning`});return}u(!0);try{let t=await H(`/api/images-check/scan`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({folder:r})});i(t.root),n(t.root),o(t.images),c(new Set),localStorage.setItem(`grimoire-images-check-root`,t.root),e(`Images scan complete`,{type:`success`,message:`${t.count} image files found across ${new Set(t.images.map(e=>hi(e.relativePath))).size} folder(s)`})}catch(t){e(`Images scan failed`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{u(!1)}}function C(e){c(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n})}async function w(){if(!r||s.size===0)return;let t=a.filter(e=>s.has(e.id));if(window.confirm(`Delete ${t.length} image file(s) permanently? This cannot be undone.`)){u(!0);try{let n=await H(`/api/images-check/delete`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({root:r,paths:t.map(e=>e.path)})});c(new Set),e(`Images deleted`,{type:n.errors.length?`warning`:`success`,message:`${n.deletedCount} deleted, ${n.errors.length} errors`}),await S(r)}catch(t){e(`Delete failed`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{u(!1)}}}function ee(){if(r){if(window.__grimoire?.revealInExplorer){window.__grimoire.revealInExplorer(r);return}H(`/api/local/reveal`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({path:r})})}}function T(e,t){let n=s.has(e.id),r=hi(e.relativePath);return(0,V.jsxs)(`article`,{className:`ic-tile ${t}${n?` delete`:``}`,onMouseEnter:t=>{let n=t.currentTarget.getBoundingClientRect();g({image:e,x:n.right,y:n.top})},onMouseLeave:()=>g(null),children:[(0,V.jsxs)(`button`,{className:`ic-img-btn`,onClick:()=>C(e.id),title:n?`Restore image`:`Mark for deletion`,children:[(0,V.jsx)(`img`,{src:mi(e.path),alt:e.name,loading:`lazy`,decoding:`async`}),(0,V.jsx)(`span`,{className:`ic-info`,children:`i`}),t===`slideshow`&&(0,V.jsx)(`span`,{className:`ic-mark`,children:n?`Delete`:`Keep`})]}),(0,V.jsxs)(`div`,{className:`ic-card-meta`,children:[(0,V.jsx)(`strong`,{children:e.name}),(0,V.jsx)(`span`,{children:r}),(0,V.jsxs)(`span`,{children:[e.width,`x`,e.height,` - `,fi(e.sizeBytes)]})]}),t===`gallery`&&(0,V.jsxs)(`div`,{className:`ic-card-actions`,children:[(0,V.jsx)(`button`,{className:n?``:`active keep`,onClick:()=>n&&C(e.id),children:`Keep`}),(0,V.jsx)(`button`,{className:n?`active delete`:``,onClick:()=>!n&&C(e.id),children:`Delete`})]})]},e.id)}return(0,V.jsxs)(`div`,{className:`view images-check-view`,children:[(0,V.jsxs)(`section`,{className:`ic-shell`,children:[(0,V.jsxs)(`div`,{className:`ic-head`,children:[(0,V.jsx)(`button`,{className:`ic-close`,title:`Images Check`,children:`x`}),(0,V.jsxs)(`div`,{children:[(0,V.jsx)(`h1`,{children:`IMAGES CHECK`}),(0,V.jsx)(`p`,{children:`Scan every image inside a folder tree, keep the good files, and permanently delete rejected files.`})]}),(0,V.jsxs)(`div`,{className:`ic-mode`,children:[(0,V.jsx)(`button`,{className:p===`slideshow`?`active`:``,onClick:()=>m(`slideshow`),children:`Slideshow`}),(0,V.jsx)(`button`,{className:p===`gallery`?`active`:``,onClick:()=>m(`gallery`),children:`Gallery`})]})]}),(0,V.jsxs)(`div`,{className:`ic-toolbar`,children:[(0,V.jsxs)(`div`,{className:`path-picker ic-path`,children:[(0,V.jsx)(`input`,{value:t,onChange:e=>n(e.target.value),placeholder:`Select folder with images`}),(0,V.jsx)(`button`,{className:`btn btn-secondary`,onClick:x,disabled:l,children:`Choose folder`}),(0,V.jsx)(`button`,{className:`btn btn-primary`,onClick:()=>S(),disabled:l||!t,children:l?`Scanning...`:`Scan all`})]}),(0,V.jsx)(`input`,{className:`inline-search ic-filter`,value:d,onChange:e=>f(e.target.value),placeholder:`Filter image name, folder, or path`})]}),(0,V.jsxs)(`div`,{className:`ic-summary`,children:[(0,V.jsxs)(`div`,{children:[(0,V.jsx)(`span`,{children:`Total`}),(0,V.jsx)(`strong`,{children:a.length})]}),(0,V.jsxs)(`div`,{children:[(0,V.jsx)(`span`,{children:`Folders`}),(0,V.jsx)(`strong`,{children:y.length})]}),(0,V.jsxs)(`div`,{children:[(0,V.jsx)(`span`,{children:`Keep`}),(0,V.jsx)(`strong`,{children:b})]}),(0,V.jsxs)(`div`,{children:[(0,V.jsx)(`span`,{children:`Delete`}),(0,V.jsx)(`strong`,{className:`danger`,children:s.size})]}),(0,V.jsx)(`button`,{className:`btn btn-secondary`,onClick:ee,disabled:!r,children:`Open folder`}),(0,V.jsx)(`button`,{className:`btn btn-danger`,onClick:w,disabled:l||s.size===0,children:`Save deletion`})]}),p===`slideshow`?(0,V.jsxs)(`div`,{className:`ic-folder-stack slideshow`,children:[y.length===0&&(0,V.jsxs)(`button`,{className:`ic-upload-card`,onClick:x,disabled:l,children:[(0,V.jsx)(`span`,{children:`+`}),(0,V.jsx)(`strong`,{children:`Choose a folder to scan every image inside it`})]}),y.map((e,t)=>(0,V.jsxs)(`section`,{className:`ic-folder-section`,children:[(0,V.jsxs)(`div`,{className:`ic-folder-head`,children:[(0,V.jsxs)(`div`,{children:[(0,V.jsx)(`strong`,{children:e.label}),(0,V.jsx)(`span`,{children:e.folder})]}),(0,V.jsxs)(`em`,{children:[e.images.length,` images`]})]}),(0,V.jsxs)(`div`,{className:`ic-grid slideshow`,children:[t===0&&(0,V.jsxs)(`button`,{className:`ic-upload-card`,onClick:x,disabled:l,children:[(0,V.jsx)(`span`,{children:`+`}),(0,V.jsx)(`strong`,{children:`Choose another folder or rescan current output`})]}),e.images.map(e=>T(e,`slideshow`))]})]},e.folder))]}):(0,V.jsx)(`div`,{className:`ic-gallery-groups`,children:y.map(e=>(0,V.jsxs)(`section`,{className:`ic-gallery-folder`,children:[(0,V.jsxs)(`div`,{className:`ic-folder-head`,children:[(0,V.jsxs)(`div`,{children:[(0,V.jsx)(`strong`,{children:e.label}),(0,V.jsx)(`span`,{children:e.folder})]}),(0,V.jsxs)(`em`,{children:[e.images.length,` images / `,e.images.filter(e=>s.has(e.id)).length,` delete`]})]}),(0,V.jsx)(`div`,{className:`ic-gallery-strip`,children:e.images.map(e=>T(e,`gallery`))})]},e.folder))}),a.length===0&&(0,V.jsx)(`div`,{className:`ic-empty`,children:`No scan yet. Choose a folder to inspect every image across all subfolders.`})]}),h&&(0,V.jsxs)(`div`,{className:`ic-hover`,style:{left:Math.min(h.x+18,window.innerWidth-360),top:Math.min(h.y+18,window.innerHeight-430)},children:[(0,V.jsx)(`img`,{src:pi(h.image.path),alt:h.image.name}),(0,V.jsxs)(`div`,{className:`ic-hover-meta`,children:[(0,V.jsx)(`strong`,{children:h.image.name}),(0,V.jsxs)(`span`,{children:[h.image.width,` x `,h.image.height]}),(0,V.jsx)(`span`,{children:fi(h.image.sizeBytes)}),(0,V.jsxs)(`span`,{children:[`Folder: `,hi(h.image.relativePath)]}),(0,V.jsx)(`span`,{children:h.image.relativePath})]})]})]})}var vi=240,yi=8,bi=[],xi=0;function Si(){if(xi>=yi)return;let e=bi.shift();e&&(xi+=1,e())}function Ci(e){return new Promise((t,n)=>{bi.push(()=>{e().then(t).catch(n).finally(()=>{xi=Math.max(0,xi-1),Si()})}),Si()})}function wi(e){return e<1024?`${e} B`:e<1024*1024?`${(e/1024).toFixed(1)} KB`:`${(e/1024/1024).toFixed(2)} MB`}function Ti(e){return qn(`/api/packshot-browser/thumb?path=${encodeURIComponent(e)}`)}function Ei(e){return qn(`/api/packshot-browser/shell-thumb?path=${encodeURIComponent(e)}`)}function Di(e){return qn(`/api/packshot-browser/online-thumb?path=${encodeURIComponent(e)}`)}function G(e){return e.oneDriveState===`cloud-only`}async function K(e,t){for(let n of e)try{let e=await fetch(n,{signal:t});if(!e.ok)continue;let r=await e.blob();if(!r.type.startsWith(`image/`)&&r.size<512)continue;return URL.createObjectURL(r)}catch{if(t.aborted)return null}return null}function Oi({image:e,selected:t,onToggle:n,onHover:r,onLeave:i}){let a=(0,_.useRef)(null),[o,s]=(0,_.useState)(!1),[c,l]=(0,_.useState)(null),[u,d]=(0,_.useState)(!1);return(0,_.useEffect)(()=>{let e=a.current;if(!e)return;let t=new IntersectionObserver(e=>{e.some(e=>e.isIntersecting)&&(s(!0),t.disconnect())},{rootMargin:`700px 0px`});return t.observe(e),()=>t.disconnect()},[]),(0,_.useEffect)(()=>{if(!o||c||u)return;let t=new AbortController,n=G(e)?[Ei(e.path),Di(e.path)]:[Ti(e.path)];return Ci(()=>K(n,t.signal)).then(e=>{!t.signal.aborted&&e&&l(e),!t.signal.aborted&&!e&&d(!0)}).catch(()=>{t.signal.aborted||d(!0)}),()=>{t.abort()}},[o,e.path,e.oneDriveState,c,u]),(0,_.useEffect)(()=>()=>{c&&URL.revokeObjectURL(c)},[c]),(0,V.jsxs)(`button`,{ref:a,className:`pb-thumb-btn`,onClick:n,onMouseEnter:r,onMouseLeave:i,title:t?`Unselect image`:`Select image`,children:[c?(0,V.jsx)(`img`,{src:c,alt:e.name,decoding:`async`}):(0,V.jsxs)(`div`,{className:`pb-thumb-placeholder${u?` failed`:``}`,children:[(0,V.jsx)(`span`,{children:e.extension.replace(`.`,``).toUpperCase()}),(0,V.jsx)(`strong`,{children:u?`No thumbnail`:`Loading`})]}),(0,V.jsx)(`span`,{className:`pb-check`,children:t?`Selected`:`Select`}),(0,V.jsx)(`span`,{className:`pb-cloud ${e.oneDriveState}`,children:G(e)?`Cloud`:`Local`})]})}function ki(){let{notify:e}=Gn(),[t,n]=(0,_.useState)(``),[r,i]=(0,_.useState)(``),[a,o]=(0,_.useState)([]),[s,c]=(0,_.useState)(`.`),[l,u]=(0,_.useState)([]),[d,f]=(0,_.useState)(``),[p,m]=(0,_.useState)(0),[h,g]=(0,_.useState)(!1),[v,y]=(0,_.useState)(new Set),[b,x]=(0,_.useState)(``),[S,C]=(0,_.useState)(!0),[w,ee]=(0,_.useState)(!1),[T,E]=(0,_.useState)(!1),[D,te]=(0,_.useState)(!1),[O,ne]=(0,_.useState)(null),[k,re]=(0,_.useState)({}),[ie,ae]=(0,_.useState)(null),A=(0,_.useMemo)(()=>a.find(e=>e.path===s)??null,[a,s]),j=a.find(e=>e.path===`.`)?.count??0;async function M(){let e=await Yn(`Select packshot source folder`,t);e&&(n(e),await se(e))}async function oe(){let e=await Yn(`Select output folder`,b||r);e&&x(e)}async function se(r=t){if(!r){e(`Choose a source folder first`,{type:`warning`});return}E(!0),ae(null);try{let t=await H(`/api/packshot-browser/scan`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({folder:r})});i(t.root),n(t.root),o(t.folders||[]),y(new Set),c(`.`),f(``),u([]),m(0),g(!1),localStorage.setItem(`grimoire-packshot-browser-root`,t.root),e(`Packshot index ready`,{type:`success`,message:`${t.count} image(s), ${(t.folders||[]).length} folder(s)`}),await ce({rootPath:t.root,folderPath:`.`,nextQuery:``,offset:0,append:!1})}catch(t){e(`Packshot scan failed`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{E(!1)}}async function ce(t){let n=t?.rootPath??r;if(!n)return;let i=t?.folderPath??s,a=t?.nextQuery??d,o=t?.offset??(t?.append?l.length:0),c=t?.append??!1;te(!0);try{let e=await H(`/api/packshot-browser/images`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({root:n,folder:i,query:a,offset:o,limit:vi})});u(t=>c?[...t,...e.images]:e.images),m(e.total),g(e.hasMore)}catch(t){e(`Image list failed`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{te(!1)}}(0,_.useEffect)(()=>{if(!r)return;let e=window.setTimeout(()=>{ce({offset:0,append:!1})},220);return()=>window.clearTimeout(e)},[r,s,d]);async function N(){if(!r||!b||v.size===0){e(`Select images and an output folder first`,{type:`warning`});return}E(!0);try{let t=await H(`/api/packshot-browser/copy`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({root:r,destination:b,paths:Array.from(v),preserve_folder_structure:S,group_by_ean:w})});ae(t),e(`Copy complete`,{type:t.errorCount?`warning`:`success`,message:`${t.copiedCount} copied, ${t.errorCount} error(s)`})}catch(t){e(`Copy failed`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{E(!1)}}function P(e){y(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n})}function F(){y(e=>{let t=l.map(e=>e.path),n=t.length>0&&t.every(t=>e.has(t)),r=new Set(e);return n?t.forEach(e=>r.delete(e)):t.forEach(e=>r.add(e)),r})}function le(e){if(window.__grimoire?.revealInExplorer){window.__grimoire.revealInExplorer(e);return}H(`/api/local/reveal`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({path:e})})}(0,_.useEffect)(()=>{if(!O||k[O.image.path]||G(O.image))return;let e=!1;return H(`/api/packshot-browser/meta?path=${encodeURIComponent(O.image.path)}`).then(t=>{e||re(e=>({...e,[O.image.path]:t}))}).catch(()=>void 0),()=>{e=!0}},[O?.image.path,k]);function I(e){let t=v.has(e.path);return(0,V.jsxs)(`article`,{className:`pb-card${t?` selected`:``}`,children:[(0,V.jsx)(Oi,{image:e,selected:t,onToggle:()=>P(e.path),onHover:t=>{let n=t.currentTarget.getBoundingClientRect();ne({image:e,x:n.right,y:n.top})},onLeave:()=>ne(null)}),(0,V.jsxs)(`div`,{className:`pb-card-meta`,children:[(0,V.jsx)(`strong`,{title:e.name,children:e.name}),(0,V.jsx)(`span`,{title:e.relativePath,children:e.relativePath}),(0,V.jsxs)(`em`,{children:[e.extension.replace(`.`,``).toUpperCase(),` - `,wi(e.sizeBytes)]})]})]},e.path)}let ue=O?k[O.image.path]:null;return(0,V.jsxs)(`div`,{className:`view packshot-browser-view`,children:[(0,V.jsxs)(`section`,{className:`pb-shell`,children:[(0,V.jsxs)(`div`,{className:`pb-header`,children:[(0,V.jsxs)(`div`,{children:[(0,V.jsx)(`span`,{className:`pb-kicker`,children:`Packshot Browser`}),(0,V.jsx)(`h1`,{children:`Folder-first image browsing for large libraries`})]}),(0,V.jsxs)(`div`,{className:`pb-header-actions`,children:[(0,V.jsx)(`button`,{className:`btn btn-secondary`,disabled:!r,onClick:()=>le(r),children:`Open source`}),(0,V.jsx)(`button`,{className:`btn btn-secondary`,disabled:!ie?.report,onClick:()=>ie&&le(ie.report),children:`Open report`})]})]}),(0,V.jsxs)(`div`,{className:`pb-toolbar`,children:[(0,V.jsxs)(`div`,{className:`path-picker pb-path`,children:[(0,V.jsx)(`input`,{value:t,onChange:e=>n(e.target.value),placeholder:`Select source folder with packshots`}),(0,V.jsx)(`button`,{className:`btn btn-secondary`,onClick:M,disabled:T,children:`Choose`}),(0,V.jsx)(`button`,{className:`btn btn-primary`,onClick:()=>se(),disabled:T||!t,children:T?`Indexing...`:`Scan`})]}),(0,V.jsx)(`input`,{className:`inline-search pb-search`,value:d,onChange:e=>f(e.target.value),placeholder:`Search within selected folder by EAN, file name, folder, keyword...`})]}),(0,V.jsxs)(`div`,{className:`pb-stats`,children:[(0,V.jsxs)(`div`,{children:[(0,V.jsx)(`span`,{children:`Total indexed`}),(0,V.jsx)(`strong`,{children:j})]}),(0,V.jsxs)(`div`,{children:[(0,V.jsx)(`span`,{children:`Folders`}),(0,V.jsx)(`strong`,{children:a.length})]}),(0,V.jsxs)(`div`,{children:[(0,V.jsx)(`span`,{children:`Current result`}),(0,V.jsx)(`strong`,{children:p})]}),(0,V.jsxs)(`div`,{children:[(0,V.jsx)(`span`,{children:`Loaded`}),(0,V.jsx)(`strong`,{children:l.length})]}),(0,V.jsxs)(`div`,{children:[(0,V.jsx)(`span`,{children:`Selected`}),(0,V.jsx)(`strong`,{children:v.size})]}),(0,V.jsxs)(`div`,{children:[(0,V.jsx)(`span`,{children:`Cloud in folder`}),(0,V.jsx)(`strong`,{children:A?.cloudCount??0})]})]}),(0,V.jsxs)(`div`,{className:`pb-layout`,children:[(0,V.jsx)(`aside`,{className:`pb-folders`,children:a.map(e=>(0,V.jsxs)(`button`,{className:`pb-folder${s===e.path?` active`:``}`,style:{paddingLeft:Math.min(18+e.depth*14,62)},onClick:()=>{c(e.path),u([]),m(0),g(!1)},children:[(0,V.jsx)(`strong`,{title:e.path,children:e.label}),(0,V.jsx)(`small`,{title:e.path,children:e.path}),(0,V.jsx)(`span`,{children:e.count})]},e.path))}),(0,V.jsxs)(`main`,{className:`pb-main`,children:[(0,V.jsxs)(`div`,{className:`pb-main-head`,children:[(0,V.jsxs)(`div`,{children:[(0,V.jsx)(`h2`,{children:A?.label??`Choose a folder`}),(0,V.jsxs)(`span`,{children:[p,` match(es), `,l.length,` loaded in this page stream`]})]}),(0,V.jsxs)(`div`,{className:`pb-main-actions`,children:[(0,V.jsx)(`button`,{className:`btn btn-secondary`,onClick:F,disabled:l.length===0,children:`Select loaded`}),(0,V.jsx)(`button`,{className:`btn btn-secondary`,onClick:()=>y(new Set),disabled:v.size===0,children:`Clear`})]})]}),(0,V.jsxs)(`div`,{className:`pb-grid`,children:[l.map(I),r&&h&&(0,V.jsxs)(`button`,{className:`pb-load-more`,onClick:()=>ce({offset:l.length,append:!0}),disabled:D,children:[(0,V.jsx)(`strong`,{children:D?`Loading...`:`Load more thumbnails`}),(0,V.jsxs)(`span`,{children:[l.length,` of `,p,` loaded`]})]}),r&&D&&l.length===0&&(0,V.jsxs)(`div`,{className:`pb-empty`,children:[(0,V.jsx)(`strong`,{children:`Loading folder images`}),(0,V.jsx)(`span`,{children:`Thumbnails will appear progressively with limited parallel loading.`})]}),!r&&(0,V.jsxs)(`button`,{className:`pb-empty`,onClick:M,disabled:T,children:[(0,V.jsx)(`strong`,{children:`Choose a source folder`}),(0,V.jsx)(`span`,{children:`Index a synced OneDrive folder or a local packshot batch.`})]}),r&&!D&&l.length===0&&(0,V.jsxs)(`div`,{className:`pb-empty`,children:[(0,V.jsx)(`strong`,{children:`No images in this view`}),(0,V.jsx)(`span`,{children:`Choose another folder or change the search keyword.`})]})]})]})]}),(0,V.jsxs)(`div`,{className:`pb-copybar`,children:[(0,V.jsxs)(`div`,{className:`path-picker pb-output`,children:[(0,V.jsx)(`input`,{value:b,onChange:e=>x(e.target.value),placeholder:`Select output folder for copied images`}),(0,V.jsx)(`button`,{className:`btn btn-secondary`,onClick:oe,disabled:T,children:`Output`})]}),(0,V.jsxs)(`label`,{className:`pb-toggle`,children:[(0,V.jsx)(`input`,{type:`checkbox`,checked:S,onChange:e=>C(e.target.checked),disabled:w}),(0,V.jsx)(`span`,{}),` Preserve folders`]}),(0,V.jsxs)(`label`,{className:`pb-toggle`,children:[(0,V.jsx)(`input`,{type:`checkbox`,checked:w,onChange:e=>ee(e.target.checked)}),(0,V.jsx)(`span`,{}),` Group by EAN`]}),(0,V.jsx)(`button`,{className:`btn btn-primary`,onClick:N,disabled:T||v.size===0||!b,children:`Copy selected`})]}),ie&&(0,V.jsxs)(`div`,{className:`pb-result`,children:[(0,V.jsxs)(`strong`,{children:[ie.copiedCount,` copied`]}),(0,V.jsxs)(`span`,{children:[ie.errorCount,` error(s)`]}),(0,V.jsx)(`span`,{children:ie.destination})]})]}),O&&(0,V.jsxs)(`div`,{className:`pb-hover`,style:{left:Math.max(12,Math.min(O.x+18,window.innerWidth-430)),top:Math.max(12,Math.min(O.y+18,window.innerHeight-560))},children:[(0,V.jsx)(Oi,{image:O.image,selected:v.has(O.image.path),onToggle:()=>P(O.image.path),onHover:()=>void 0,onLeave:()=>void 0}),(0,V.jsxs)(`div`,{className:`pb-hover-meta`,children:[(0,V.jsx)(`strong`,{title:O.image.name,children:O.image.name}),(0,V.jsx)(`span`,{children:O.image.relativePath}),(0,V.jsxs)(`span`,{children:[G(O.image)?`Dimensions skipped`:(ue?.width||0)>0?`${ue?.width} x ${ue?.height}`:`Dimensions loading`,` - `,wi(ue?.sizeBytes??O.image.sizeBytes)]}),(0,V.jsxs)(`span`,{children:[`OneDrive: `,ue?.oneDriveState??O.image.oneDriveState]}),(0,V.jsxs)(`span`,{children:[`EAN: `,O.image.eans.length?O.image.eans.join(`, `):`Not detected`]})]})]}),(0,V.jsx)(`style`,{children:`
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
      `})]})}function Ai(e,...t){if(!e)return!0;let n=e.toLowerCase();return t.some(e=>(e||``).toLowerCase().includes(n))}function ji(){let{notify:e}=Gn(),[t,n]=(0,_.useState)(`sorter`),[r,i]=(0,_.useState)(``),[a,o]=(0,_.useState)(!1),[s,c]=(0,_.useState)(!1),[l,u]=(0,_.useState)(``),[d,f]=(0,_.useState)(null),[p,m]=(0,_.useState)(`Ready`),[h,g]=(0,_.useState)(`Choose a folder to begin.`),[v,y]=(0,_.useState)(!1),[b,x]=(0,_.useState)(null),S=(0,_.useRef)(!1),C=(0,_.useRef)(``),w=(0,_.useCallback)(e=>{S.current=!0,C.current=e},[]),ee=(0,_.useCallback)(()=>{S.current=!1,C.current=``,x(null)},[]);(0,_.useEffect)(()=>{function e(e){if(!S.current||!C.current)return;let t=e.clientX+388>window.innerWidth?e.clientX-388:e.clientX+16,n=e.clientY+388>window.innerHeight?Math.max(0,e.clientY-388):e.clientY+16;x({src:C.current,x:t,y:n})}return document.addEventListener(`mousemove`,e),()=>document.removeEventListener(`mousemove`,e)},[]);async function T(){if(!r){e(`Choose a folder first`,{type:`warning`});return}o(!0),m(`Scanning`),g(`Analyzing folder contents for EAN barcodes.`);try{let t=await H(`/api/ean-sorter/scan`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({folder:r})});f(t),i(t.folder||r),localStorage.setItem(`grimoire-ean-sorter-root`,t.folder||r),m(`Scan complete`),g(`${t.items} item(s), ${t.products} product EAN group(s), ${t.notFound} not found.`),e(`Scan complete`,{type:`success`,message:`${t.products} products, ${t.files} files`})}catch(t){m(`Error`),g(t instanceof Error?t.message:String(t)),e(`Scan failed`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{o(!1)}}async function E(){if(!r){e(`Choose a folder first`,{type:`warning`});return}o(!0),m(`Sorting`),g(`Moving files into product folders and generating report.`);try{let t=await H(`/api/ean-sorter/sort`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({folder:r,deleteEmpty:s})});f(t),i(t.folder||r),localStorage.setItem(`grimoire-ean-sorter-root`,t.folder||r),m(`Sort complete`),g(`${t.moved??0} item(s) moved into ${t.products} EAN folder(s).`),e(`Sort complete`,{type:`success`,message:`${t.moved??0} files moved`})}catch(t){m(`Error`),g(t instanceof Error?t.message:String(t)),e(`Sort failed`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{o(!1)}}async function D(){if(r){o(!0);try{let t=await H(`/api/ean-sorter/report`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({folder:r})});f(e=>e?{...e,reportRows:t.reportRows}:t),e(`Report loaded`,{type:`success`})}catch(t){e(`Failed to load report`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{o(!1)}}}async function te(){try{await H(`/api/ean-sorter/report/open`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({folder:r})})}catch(t){e(`Failed to open report`,{type:`error`,message:t instanceof Error?t.message:String(t)})}}async function O(){try{await H(`/api/ean-sorter/report/export`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({folder:r})}),e(`Report exported`,{type:`success`})}catch(t){e(`Export failed`,{type:`error`,message:t instanceof Error?t.message:String(t)})}}async function ne(){if(r)if(window.__grimoire?.revealInExplorer)window.__grimoire.revealInExplorer(r);else try{await H(`/api/local/reveal`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({path:r})})}catch{}}let k=[`Active`,`Upcoming`,`Limited`,`Blanks`,`N/A`,`Unknown`,`Non-ACR`,`Others`],[re,ie]=(0,_.useState)(new Set),[ae,A]=(0,_.useState)(!1),[j,M]=(0,_.useState)([]),[oe,se]=(0,_.useState)(new Set),[ce,N]=(0,_.useState)(``),[P,F]=(0,_.useState)(!1),[le,I]=(0,_.useState)(!1),ue=(0,_.useRef)(null),[L,de]=(0,_.useState)(null),[fe,pe]=(0,_.useState)(!1),[me,he]=(0,_.useState)(``),[R,ge]=(0,_.useState)(``),[_e,ve]=(0,_.useState)(new Set),[ye,be]=(0,_.useState)(``),[xe,Se]=(0,_.useState)(!1),[Ce,we]=(0,_.useState)(!1),[z,Te]=(0,_.useState)(!1),[Ee,De]=(0,_.useState)(new Set),[Oe,ke]=(0,_.useState)(!1),[Ae,je]=(0,_.useState)(!1),[Me,Ne]=(0,_.useState)(null),[B,Pe]=(0,_.useState)(null),Fe=(0,_.useMemo)(()=>{let e={};for(let t of L?.no_barcode??[]){let n=t.status?.trim()||`Blanks`;e[n]=(e[n]||0)+1}return e},[L?.no_barcode]),Ie=(0,_.useMemo)(()=>L?L.no_barcode.filter(e=>Ee.has(e.status?.trim()||`Blanks`)):[],[Ee,L]);async function Le(){if(!window.__grimoire?.pickFile){ue.current?.click();return}let e=await window.__grimoire.pickFile(`Select status file`,`Excel workbooks (*.xlsx;*.xls)|*.xlsx;*.xls|All files (*.*)|*.*`);e&&(he(e),ge(``),ue.current&&(ue.current.value=``))}async function Re(){let t=ue.current?.files?.[0];if(!t&&!me){e(`Select a status file`,{type:`warning`});return}pe(!0),de(null),je(!1),Ne(null),Pe(null),ve(new Set),De(new Set),Te(!1),ke(!1);try{let n=me?await H(`/api/ean-sorter/categorize/read-status-file-path`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({path:me})}):await(async()=>{let e=new FormData;return e.append(`file`,t),H(`/api/ean-sorter/categorize/read-status-file`,{method:`POST`,body:e})})();de(n),De(new Set(n.no_barcode.map(e=>e.status?.trim()||`Blanks`))),e(`Read ${n.total} products for ${n.brand}`,{type:`success`}),n.no_barcode_count>0&&Se(!0),Object.keys(n.duplicates).length>0&&we(!0)}catch(t){e(`Failed to read status file`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{pe(!1)}}function ze(e){ve(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n})}function Be(e){De(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n})}async function Ve(){let e=await Yn(`Select destination for status folders`);e&&be(e)}async function He(){if(!L||_e.size===0||!ye){e(`Select statuses and a destination folder`,{type:`warning`});return}pe(!0);try{let t=await H(`/api/ean-sorter/categorize/create-status-folders-job`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({destination:ye,products:L.products,statuses:[..._e],brand:L.brand,use_name_for_no_barcode:z,no_barcode_statuses:[...Ee],per_product_for_duplicates:Oe})});Pe(t),e(`Status folder job started`,{type:`info`,message:t.id})}catch(t){e(`Failed to create folders`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{pe(!1)}}(0,_.useEffect)(()=>{if(!B||![`pending`,`running`].includes(B.status))return;let t=!1,n=window.setInterval(async()=>{try{let r=await H(`/api/jobs/${B.id}`);if(t)return;if(Pe(r),r.status===`completed`){window.clearInterval(n);let t=r.summary||{},i=Number(t.created_count||0),a=Number(t.skipped_count||0);je(!0),Ne({count:i,skipped_count:a}),pe(!1),e(`Created ${i} folder(s)`,{type:`success`,message:a>0?`${a} product(s) skipped (no barcode)`:void 0})}else r.status===`failed`&&(window.clearInterval(n),pe(!1),e(`Failed to create folders`,{type:`error`,message:r.error||`Status folder job failed`}))}catch(t){window.clearInterval(n),pe(!1),e(`Could not check folder job`,{type:`error`,message:t instanceof Error?t.message:String(t)})}},1e3);return()=>{t=!0,window.clearInterval(n)}},[B?.id,B?.status]);function Ue(e){ie(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n})}function We(){re.size===k.length?ie(new Set):ie(new Set(k))}async function Ge(){if(!(!r||re.size===0)){I(!0);try{await H(`/api/ean-sorter/categorize/create-folders`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({folder:r,categories:[...re]})}),A(!0),e(`Category folders created`,{type:`success`,message:`${re.size} folder(s) created`}),await Ke()}catch(t){e(`Failed to create folders`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{I(!1)}}}async function Ke(){if(r){I(!0);try{M((await H(`/api/ean-sorter/categorize/uncategorized`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({folder:r})})).items),se(new Set)}catch(t){e(`Failed to load uncategorized items`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{I(!1)}}}function qe(e){se(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n})}function Je(){oe.size===et.length?se(new Set):se(new Set(et.map(e=>e.path)))}function Ye(t){if(oe.size===0){e(`Select images to move first`,{type:`warning`});return}N(t),F(!0)}async function Xe(){if(!(!r||!ce||oe.size===0)){F(!1),I(!0);try{let t=await H(`/api/ean-sorter/categorize/move`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({folder:r,category:ce,paths:[...oe]})});e(`Moved ${t.moved} item(s) to ${ce}`,{type:`success`}),t.errors.length>0&&e(`${t.errors.length} error(s)`,{type:`warning`,message:t.errors.slice(0,3).join(`; `)}),await Ke()}catch(t){e(`Move failed`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{I(!1),N(``)}}}let Ze=(d?.rows??[]).filter(e=>Ai(l,e.name,e.ean,e.type,e.kind,e.oldFolder)),Qe=(d?.gallery??[]).filter(e=>Ai(l,e.name,e.ean)),$e=(d?.reportRows??[]).filter(e=>Ai(l,e.numbering,e.ean,e.name,e.type,e.oldFolder,e.newFolder)),et=j.filter(e=>Ai(l,e.name,e.type,e.oldFolder)),tt={items:d?.items??0,files:d?.files??0,folders:d?.folders??0,products:d?.products??0,notFound:d?.notFound??0};return(0,V.jsxs)(`div`,{className:`view tool-view sor-shell`,children:[(0,V.jsxs)(`aside`,{className:`sor-sidebar`,children:[(0,V.jsxs)(`div`,{className:`sor-brand`,children:[(0,V.jsx)(`div`,{className:`sor-brand-mark`,children:`E`}),(0,V.jsx)(`span`,{children:`EAN SORTER`})]}),(0,V.jsx)(`nav`,{className:`sor-nav`,children:[{key:`sorter`,label:`Sorter`,icon:`/icons/ean-sorter-sort.png`},{key:`gallery`,label:`Gallery`,icon:`/icons/ean-sorter-gallery.png`},{key:`report`,label:`Report`,icon:`/icons/ean-sorter-report.png`},{key:`categorize`,label:`Categorize`,icon:`/icons/ean-sorter-categorize.png`}].map(e=>(0,V.jsxs)(`button`,{className:`sor-nav-item${t===e.key?` active`:``}`,onClick:()=>{n(e.key),e.key===`categorize`&&r&&j.length===0&&ae&&Ke()},children:[(0,V.jsx)(`img`,{src:e.icon,alt:``,className:`sor-nav-icon`}),e.label]},e.key))}),(0,V.jsx)(`div`,{className:`sor-sidebar-spacer`}),(0,V.jsx)(`button`,{className:`sor-guide-btn`,onClick:()=>y(!0),children:`Guide`}),(0,V.jsxs)(`div`,{className:`sor-mini-card`,children:[(0,V.jsx)(`span`,{children:`Selected folder`}),(0,V.jsx)(`strong`,{title:r||`None`,children:r||`None`})]})]}),(0,V.jsxs)(`div`,{className:`sor-content`,children:[(0,V.jsxs)(`header`,{className:`sor-topbar`,children:[(0,V.jsxs)(`div`,{className:`sor-search`,children:[(0,V.jsx)(`span`,{children:`Search`}),(0,V.jsx)(`input`,{type:`text`,placeholder:`Search EAN or image name`,value:l,onChange:e=>u(e.target.value)})]}),(0,V.jsx)(`button`,{className:`sor-btn-compact`,onClick:async()=>{let e=await Yn(`Select folder to scan`,r);e&&i(e)},children:`Choose folder`}),(0,V.jsx)(`button`,{className:`sor-btn-icon`,onClick:ne,children:`Open`}),(0,V.jsxs)(`div`,{className:`sor-profile`,children:[(0,V.jsx)(`div`,{className:`sor-avatar`,children:`EAN`}),(0,V.jsx)(`span`,{children:`Local desktop`})]})]}),t===`sorter`&&(0,V.jsxs)(`div`,{className:`sor-view-content`,children:[(0,V.jsxs)(`section`,{className:`sor-hero`,children:[(0,V.jsxs)(`div`,{className:`sor-hero-main`,children:[(0,V.jsx)(`div`,{className:`sor-chips`,children:[`EAN-8`,`EAN-13`,`Excel report`,`Folder sort`].map(e=>(0,V.jsx)(`span`,{className:`sor-chip`,children:e},e))}),(0,V.jsxs)(`div`,{children:[(0,V.jsx)(`p`,{className:`sor-eyebrow`,children:`Product Data Cleaner`}),(0,V.jsx)(`h1`,{className:`sor-headline`,children:`Sort files by product barcode`})]}),(0,V.jsxs)(`div`,{className:`sor-hero-actions`,children:[(0,V.jsx)(`button`,{className:`sor-btn-primary`,onClick:T,disabled:a||!r,children:`Scan`}),(0,V.jsx)(`button`,{className:`sor-btn-secondary`,onClick:E,disabled:a||!r,children:`Sort and report`}),(0,V.jsxs)(`label`,{className:`sor-toggle`,children:[(0,V.jsx)(`input`,{type:`checkbox`,checked:s,onChange:e=>c(e.target.checked)}),(0,V.jsx)(`span`,{}),`Delete empty folders`]})]})]}),(0,V.jsxs)(`aside`,{className:`sor-action-card`,children:[(0,V.jsx)(`span`,{className:`sor-card-label`,children:`Status`}),(0,V.jsx)(`strong`,{children:p}),(0,V.jsx)(`p`,{children:h}),(0,V.jsx)(`button`,{className:`sor-btn-gold`,onClick:()=>n(`report`),children:`Show report`})]})]}),(0,V.jsx)(`section`,{className:`sor-stats`,children:[[`Items`,tt.items],[`Files`,tt.files],[`Folders`,tt.folders],[`Products`,tt.products],[`Not found`,tt.notFound]].map(([e,t])=>(0,V.jsxs)(`article`,{className:`sor-stat`,children:[(0,V.jsx)(`span`,{children:e}),(0,V.jsx)(`strong`,{children:t})]},e))}),(0,V.jsxs)(`section`,{className:`sor-workspace`,children:[(0,V.jsxs)(`div`,{className:`sor-panel sor-results-panel`,children:[(0,V.jsxs)(`div`,{className:`sor-panel-head`,children:[(0,V.jsx)(`h2`,{children:`Scan Results`}),(0,V.jsxs)(`span`,{className:`sor-count`,children:[Ze.length,` rows`]})]}),(0,V.jsx)(`div`,{className:`sor-table-wrap`,children:(0,V.jsxs)(`table`,{className:`sor-tbl`,children:[(0,V.jsx)(`thead`,{children:(0,V.jsxs)(`tr`,{children:[(0,V.jsx)(`th`,{children:`Preview`}),(0,V.jsx)(`th`,{children:`Name`}),(0,V.jsx)(`th`,{children:`EAN`}),(0,V.jsx)(`th`,{children:`Type`}),(0,V.jsx)(`th`,{children:`Old Folder`})]})}),(0,V.jsxs)(`tbody`,{children:[Ze.map((e,t)=>(0,V.jsxs)(`tr`,{children:[(0,V.jsx)(`td`,{children:e.thumbnail?(0,V.jsx)(`img`,{className:`sor-thumb`,src:e.thumbnail,alt:``,loading:`lazy`,onMouseEnter:()=>w(e.thumbnail),onMouseLeave:ee}):(0,V.jsx)(`div`,{className:`sor-thumb sor-thumb-placeholder`,children:`No image`})}),(0,V.jsx)(`td`,{children:e.name}),(0,V.jsx)(`td`,{children:(0,V.jsx)(`span`,{className:`sor-tag${e.ean===`not found`?` missing`:``}`,children:e.ean})}),(0,V.jsx)(`td`,{children:e.type||e.kind||``}),(0,V.jsx)(`td`,{className:`sor-path-cell`,title:e.oldFolder,children:e.oldFolder||``})]},`${e.path??e.name}-${t}`)),Ze.length===0&&(0,V.jsx)(`tr`,{children:(0,V.jsx)(`td`,{colSpan:5,className:`sor-empty`,children:a?`Scanning...`:`No scan yet.`})})]})]})})]}),(0,V.jsxs)(`div`,{className:`sor-panel sor-products-panel`,children:[(0,V.jsxs)(`div`,{className:`sor-panel-head`,children:[(0,V.jsx)(`h2`,{children:`Products`}),(0,V.jsx)(`span`,{className:`sor-count`,children:d?.productRows?.length??0})]}),(0,V.jsxs)(`div`,{className:`sor-product-list`,children:[(d?.productRows??[]).map(e=>(0,V.jsxs)(`div`,{className:`sor-product-row`,children:[(0,V.jsx)(`strong`,{children:e.ean}),(0,V.jsxs)(`span`,{children:[e.count,` item`,e.count===1?``:`s`]})]},e.ean)),(!d?.productRows||d.productRows.length===0)&&(0,V.jsx)(`div`,{className:`sor-empty-box`,children:`No EAN groups yet.`})]})]})]})]}),t===`gallery`&&(0,V.jsx)(`div`,{className:`sor-view-content`,children:(0,V.jsxs)(`div`,{className:`sor-panel`,children:[(0,V.jsxs)(`div`,{className:`sor-panel-head`,children:[(0,V.jsx)(`h2`,{children:`Gallery`}),(0,V.jsxs)(`span`,{className:`sor-count`,children:[Qe.length,` images`]})]}),(0,V.jsxs)(`div`,{className:`sor-gallery-grid`,children:[Qe.map((e,t)=>(0,V.jsxs)(`article`,{className:`sor-gallery-card`,children:[(0,V.jsx)(`img`,{src:e.thumbnail,alt:e.name,loading:`lazy`}),(0,V.jsxs)(`div`,{children:[(0,V.jsx)(`strong`,{title:e.name,children:e.name}),(0,V.jsx)(`span`,{children:e.ean})]})]},`${e.ean}-${e.name}-${t}`)),Qe.length===0&&(0,V.jsx)(`div`,{className:`sor-empty-box`,style:{gridColumn:`1 / -1`},children:d?`No matching images.`:`Scan a folder to load images.`})]})]})}),t===`report`&&(0,V.jsx)(`div`,{className:`sor-view-content`,children:(0,V.jsxs)(`div`,{className:`sor-panel sor-report-panel`,children:[(0,V.jsxs)(`div`,{className:`sor-panel-head`,children:[(0,V.jsx)(`h2`,{children:`Report Output`}),(0,V.jsxs)(`div`,{className:`sor-panel-actions`,children:[(0,V.jsx)(`button`,{className:`sor-btn-compact`,onClick:D,disabled:a||!r,children:`Load report`}),(0,V.jsx)(`button`,{className:`sor-btn-compact`,onClick:O,disabled:!r,children:`Export report`}),(0,V.jsx)(`button`,{className:`sor-btn-compact`,onClick:te,disabled:!r,children:`Open in Excel`})]})]}),(0,V.jsx)(`div`,{className:`sor-table-wrap sor-report-wrap`,children:(0,V.jsxs)(`table`,{className:`sor-tbl`,children:[(0,V.jsx)(`thead`,{children:(0,V.jsxs)(`tr`,{children:[(0,V.jsx)(`th`,{children:`Numbering`}),(0,V.jsx)(`th`,{children:`EAN`}),(0,V.jsx)(`th`,{children:`Name`}),(0,V.jsx)(`th`,{children:`Type`}),(0,V.jsx)(`th`,{children:`Old Folder`}),(0,V.jsx)(`th`,{children:`New Folder`})]})}),(0,V.jsxs)(`tbody`,{children:[$e.map((e,t)=>(0,V.jsxs)(`tr`,{children:[(0,V.jsx)(`td`,{children:e.numbering}),(0,V.jsx)(`td`,{children:e.ean}),(0,V.jsx)(`td`,{children:e.name}),(0,V.jsx)(`td`,{children:e.type||``}),(0,V.jsx)(`td`,{className:`sor-path-cell`,title:e.oldFolder,children:e.oldFolder||``}),(0,V.jsx)(`td`,{className:`sor-path-cell`,title:e.newFolder,children:e.newFolder||``})]},`${e.ean}-${e.name}-${t}`)),$e.length===0&&(0,V.jsx)(`tr`,{children:(0,V.jsx)(`td`,{colSpan:6,className:`sor-empty`,children:d?.reportRows?`No rows match your search.`:`Run Sort and report, or load an existing report.`})})]})]})})]})}),t===`categorize`&&(0,V.jsx)(`div`,{className:`sor-view-content`,children:ae?(0,V.jsxs)(`div`,{className:`sor-cat-workspace`,children:[(0,V.jsxs)(`div`,{className:`sor-panel`,children:[(0,V.jsxs)(`div`,{className:`sor-panel-head`,children:[(0,V.jsx)(`h2`,{children:`Uncategorized Images`}),(0,V.jsxs)(`div`,{className:`sor-panel-actions`,children:[(0,V.jsxs)(`span`,{className:`sor-count`,children:[oe.size,` of`,` `,et.length,` selected`]}),(0,V.jsx)(`button`,{className:`sor-btn-compact`,onClick:Ke,disabled:le||!r,children:`Refresh`}),(0,V.jsx)(`button`,{className:`sor-btn-compact`,onClick:()=>{A(!1),M([]),se(new Set)},children:`Back to setup`})]})]}),(0,V.jsx)(`div`,{className:`sor-table-wrap`,style:{maxHeight:340},children:(0,V.jsxs)(`table`,{className:`sor-tbl`,children:[(0,V.jsx)(`thead`,{children:(0,V.jsxs)(`tr`,{children:[(0,V.jsx)(`th`,{style:{width:40},children:(0,V.jsx)(`input`,{type:`checkbox`,checked:et.length>0&&oe.size===et.length,onChange:Je})}),(0,V.jsx)(`th`,{children:`Preview`}),(0,V.jsx)(`th`,{children:`Name`}),(0,V.jsx)(`th`,{children:`Type`}),(0,V.jsx)(`th`,{children:`Current Folder`})]})}),(0,V.jsxs)(`tbody`,{children:[et.map((e,t)=>(0,V.jsxs)(`tr`,{className:oe.has(e.path)?`sor-row-selected`:``,children:[(0,V.jsx)(`td`,{children:(0,V.jsx)(`input`,{type:`checkbox`,checked:oe.has(e.path),onChange:()=>qe(e.path)})}),(0,V.jsx)(`td`,{children:e.thumbnail?(0,V.jsx)(`img`,{className:`sor-thumb`,src:e.thumbnail,alt:``,loading:`lazy`,onMouseEnter:()=>w(e.thumbnail),onMouseLeave:ee}):(0,V.jsx)(`div`,{className:`sor-thumb sor-thumb-placeholder`,children:`No image`})}),(0,V.jsx)(`td`,{children:e.name}),(0,V.jsx)(`td`,{children:e.type}),(0,V.jsx)(`td`,{className:`sor-path-cell`,title:e.oldFolder,children:e.oldFolder})]},`${e.path}-${t}`)),et.length===0&&(0,V.jsx)(`tr`,{children:(0,V.jsx)(`td`,{colSpan:5,className:`sor-empty`,children:le?`Loading...`:j.length===0?`No uncategorized items found.`:`No items match your search.`})})]})]})})]}),(0,V.jsxs)(`div`,{className:`sor-panel sor-cat-move-panel`,children:[(0,V.jsx)(`div`,{className:`sor-panel-head`,children:(0,V.jsx)(`h2`,{children:`Move to Category`})}),(0,V.jsx)(`div`,{className:`sor-cat-move-grid`,children:[...re].sort().map(e=>(0,V.jsxs)(`button`,{className:`sor-cat-move-btn`,disabled:le||oe.size===0,onClick:()=>Ye(e),children:[(0,V.jsx)(`span`,{className:`sor-cat-move-icon`,children:`📁`}),(0,V.jsx)(`span`,{children:e})]},e))})]})]}):(0,V.jsxs)(`div`,{className:`sor-cat-setup`,children:[(0,V.jsxs)(`div`,{className:`sor-panel`,children:[(0,V.jsxs)(`div`,{className:`sor-panel-head`,children:[(0,V.jsx)(`h2`,{children:`Create Category Folders`}),(0,V.jsxs)(`span`,{className:`sor-count`,children:[re.size,` selected`]})]}),(0,V.jsxs)(`div`,{className:`sor-cat-body`,children:[(0,V.jsx)(`p`,{className:`sor-cat-desc`,children:`Select which category folders to create inside your working directory. These folders will be used to organize uncategorized images (items with no EAN detected).`}),(0,V.jsx)(`div`,{className:`sor-cat-select-all`,children:(0,V.jsxs)(`label`,{className:`sor-cat-check`,children:[(0,V.jsx)(`input`,{type:`checkbox`,checked:re.size===k.length,onChange:We}),(0,V.jsx)(`span`,{children:`Select All`})]})}),(0,V.jsx)(`div`,{className:`sor-cat-grid`,children:k.map(e=>(0,V.jsxs)(`label`,{className:`sor-cat-option${re.has(e)?` selected`:``}`,children:[(0,V.jsx)(`input`,{type:`checkbox`,checked:re.has(e),onChange:()=>Ue(e)}),(0,V.jsx)(`span`,{className:`sor-cat-name`,children:e})]},e))}),(0,V.jsx)(`div`,{className:`sor-cat-actions`,children:(0,V.jsx)(`button`,{className:`sor-btn-primary`,onClick:Ge,disabled:le||!r||re.size===0,children:le?`Creating...`:`Create Folders`})})]})]}),(0,V.jsxs)(`div`,{className:`sor-panel`,style:{marginTop:16},children:[(0,V.jsx)(`div`,{className:`sor-panel-head`,children:(0,V.jsx)(`h2`,{children:`Create Folders from Status File`})}),(0,V.jsxs)(`div`,{className:`sor-cat-body`,children:[(0,V.jsxs)(`p`,{className:`sor-cat-desc`,children:[`Upload a `,(0,V.jsx)(`strong`,{children:`[Brand]_Missing_Data_Status.xlsx`}),` file to create product folders organized by status, with EAN barcodes as subfolder names.`]}),(0,V.jsxs)(`div`,{className:`sor-status-file-row`,children:[(0,V.jsx)(`input`,{ref:ue,type:`file`,accept:`.xlsx,.xls`,className:`sor-hidden-file`,onChange:e=>{let t=e.currentTarget.files?.[0];t&&(he(``),ge(t.name))}}),(0,V.jsx)(`button`,{className:`sor-btn-secondary`,onClick:Le,disabled:fe,children:`Choose File`}),(0,V.jsx)(`span`,{className:`sor-status-file-name`,children:me||R||`No file chosen`}),(0,V.jsx)(`button`,{className:`sor-btn-primary`,onClick:Re,disabled:fe,children:fe?`Reading...`:`Read File`})]}),L&&(0,V.jsxs)(V.Fragment,{children:[(0,V.jsxs)(`div`,{className:`sor-cat-desc`,style:{marginBottom:8,padding:`8px 12px`,background:`var(--sor-card-bg, #1e1e2e)`,borderRadius:6},children:[(0,V.jsx)(`strong`,{children:L.brand}),` — `,L.total,` products`,Object.entries(L.statuses).map(([e,t])=>(0,V.jsxs)(`span`,{style:{marginLeft:12,opacity:.8},children:[e,`: `,t]},e))]}),(0,V.jsx)(`p`,{className:`sor-cat-desc`,style:{marginBottom:6},children:`Select which status folders to create:`}),(0,V.jsx)(`div`,{className:`sor-cat-grid`,children:Object.entries(L.statuses).map(([e,t])=>(0,V.jsxs)(`label`,{className:`sor-cat-option${_e.has(e)?` selected`:``}`,children:[(0,V.jsx)(`input`,{type:`checkbox`,checked:_e.has(e),onChange:()=>ze(e)}),(0,V.jsxs)(`span`,{className:`sor-cat-name`,children:[e,` (`,t,`)`]})]},e))}),(0,V.jsxs)(`div`,{style:{display:`flex`,gap:10,alignItems:`center`,marginTop:12},children:[(0,V.jsx)(`button`,{className:`sor-btn-secondary`,onClick:Ve,children:ye?`Change Destination`:`Choose Destination`}),ye&&(0,V.jsx)(`span`,{className:`sor-cat-desc`,style:{fontSize:12},children:ye})]}),(0,V.jsx)(`div`,{className:`sor-cat-actions`,style:{marginTop:12},children:(0,V.jsx)(`button`,{className:`sor-btn-primary`,onClick:He,disabled:fe||_e.size===0||!ye,children:fe?`Creating...`:`Create Status Folders`})}),B&&[`pending`,`running`].includes(B.status)&&(0,V.jsxs)(`div`,{className:`sor-cat-desc`,style:{marginTop:10,padding:`8px 12px`,background:`var(--sor-card-bg, #1e1e2e)`,borderRadius:6},children:[`Creating folders... `,Number(B.summary?.progress_percent||0),`%`,B.summary?.current_file?` - ${String(B.summary.current_file)}`:``]}),Ae&&Me&&(0,V.jsxs)(`div`,{className:`sor-cat-desc`,style:{marginTop:10,padding:`8px 12px`,background:`var(--sor-success-bg, #1a3a2a)`,borderRadius:6,color:`var(--sor-success, #4ade80)`},children:[`Created `,Me.count,` folder(s).`,Me.skipped_count>0&&` Skipped ${Me.skipped_count} product(s) without barcode.`]})]})]})]})]})})]}),P&&(0,V.jsx)(`div`,{className:`sor-modal`,onClick:e=>{e.target===e.currentTarget&&F(!1)},children:(0,V.jsxs)(`div`,{className:`sor-modal-card`,children:[(0,V.jsxs)(`div`,{className:`sor-panel-head`,children:[(0,V.jsx)(`h2`,{children:`Confirm Move`}),(0,V.jsx)(`button`,{className:`sor-btn-icon`,onClick:()=>F(!1),children:`Close`})]}),(0,V.jsxs)(`div`,{className:`sor-guide-copy`,children:[(0,V.jsxs)(`p`,{children:[`Move `,(0,V.jsx)(`strong`,{children:oe.size}),` selected item(s) to the `,(0,V.jsx)(`strong`,{children:ce}),` folder?`]}),(0,V.jsxs)(`p`,{style:{fontSize:13,opacity:.7},children:[`Files will be moved from their current location into`,` `,(0,V.jsxs)(`strong`,{children:[r,`\\`,ce]})]}),(0,V.jsxs)(`div`,{style:{display:`flex`,gap:10,marginTop:12},children:[(0,V.jsx)(`button`,{className:`sor-btn-primary`,onClick:Xe,children:`Move`}),(0,V.jsx)(`button`,{className:`sor-btn-secondary`,onClick:()=>F(!1),children:`Cancel`})]})]})]})}),xe&&L&&(0,V.jsx)(`div`,{className:`sor-modal`,onClick:e=>{e.target===e.currentTarget&&Se(!1)},children:(0,V.jsxs)(`div`,{className:`sor-modal-card`,children:[(0,V.jsxs)(`div`,{className:`sor-panel-head`,children:[(0,V.jsx)(`h2`,{children:`Products Without Barcode`}),(0,V.jsx)(`button`,{className:`sor-btn-icon`,onClick:()=>Se(!1),children:`Close`})]}),(0,V.jsxs)(`div`,{className:`sor-guide-copy`,children:[(0,V.jsxs)(`p`,{children:[(0,V.jsx)(`strong`,{children:L.no_barcode_count}),` product(s) do not have a barcode (EAN):`]}),(0,V.jsx)(`p`,{style:{fontSize:12,opacity:.75,marginTop:8},children:`Select which status values should keep using product-name folders.`}),(0,V.jsx)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:8,marginTop:10},children:Object.entries(Fe).map(([e,t])=>(0,V.jsxs)(`label`,{className:`sor-cat-option${Ee.has(e)?` selected`:``}`,style:{width:`auto`,minWidth:132,padding:`8px 10px`},children:[(0,V.jsx)(`input`,{type:`checkbox`,checked:Ee.has(e),onChange:()=>Be(e)}),(0,V.jsxs)(`span`,{className:`sor-cat-name`,children:[e,` (`,t,`)`]})]},e))}),(0,V.jsx)(`div`,{className:`sor-table-wrap`,style:{maxHeight:200,marginTop:8},children:(0,V.jsxs)(`table`,{className:`sor-tbl`,children:[(0,V.jsx)(`thead`,{children:(0,V.jsxs)(`tr`,{children:[(0,V.jsx)(`th`,{children:`Code`}),(0,V.jsx)(`th`,{children:`Product Name`}),(0,V.jsx)(`th`,{children:`Status`})]})}),(0,V.jsxs)(`tbody`,{children:[Ie.map((e,t)=>(0,V.jsxs)(`tr`,{children:[(0,V.jsx)(`td`,{children:e.code}),(0,V.jsx)(`td`,{children:e.name}),(0,V.jsx)(`td`,{children:e.status})]},t)),Ie.length===0&&(0,V.jsx)(`tr`,{children:(0,V.jsx)(`td`,{colSpan:3,style:{textAlign:`center`,opacity:.7},children:`No status selected.`})})]})]})}),(0,V.jsxs)(`p`,{style:{marginTop:12},children:[`Use product names for `,(0,V.jsx)(`strong`,{children:Ie.length}),` selected product(s)?`]}),(0,V.jsxs)(`p`,{style:{fontSize:12,opacity:.7},children:[`Format: `,(0,V.jsxs)(`strong`,{children:[L.brand,`_Product Name_Status`]})]}),(0,V.jsxs)(`div`,{style:{display:`flex`,gap:10,marginTop:12},children:[(0,V.jsx)(`button`,{className:`sor-btn-primary`,disabled:Ee.size===0,onClick:()=>{Te(!0),Se(!1)},children:`Yes, Use Product Name`}),(0,V.jsx)(`button`,{className:`sor-btn-secondary`,onClick:()=>{Te(!1),De(new Set),Se(!1)},children:`No, Skip These`})]})]})]})}),Ce&&L&&(0,V.jsx)(`div`,{className:`sor-modal`,onClick:e=>{e.target===e.currentTarget&&we(!1)},children:(0,V.jsxs)(`div`,{className:`sor-modal-card`,children:[(0,V.jsxs)(`div`,{className:`sor-panel-head`,children:[(0,V.jsx)(`h2`,{children:`Duplicate Barcodes Found`}),(0,V.jsx)(`button`,{className:`sor-btn-icon`,onClick:()=>we(!1),children:`Close`})]}),(0,V.jsxs)(`div`,{className:`sor-guide-copy`,children:[(0,V.jsx)(`p`,{children:`The following barcodes are shared by multiple products:`}),(0,V.jsx)(`div`,{className:`sor-table-wrap`,style:{maxHeight:200,marginTop:8},children:(0,V.jsxs)(`table`,{className:`sor-tbl`,children:[(0,V.jsx)(`thead`,{children:(0,V.jsxs)(`tr`,{children:[(0,V.jsx)(`th`,{children:`Barcode`}),(0,V.jsx)(`th`,{children:`Count`}),(0,V.jsx)(`th`,{children:`Products`})]})}),(0,V.jsx)(`tbody`,{children:Object.entries(L.duplicates).map(([e,t])=>(0,V.jsxs)(`tr`,{children:[(0,V.jsx)(`td`,{children:e}),(0,V.jsx)(`td`,{children:t}),(0,V.jsx)(`td`,{children:L.duplicate_products.filter(t=>t.barcode===e).map(e=>e.name).join(`; `)})]},e))})]})}),(0,V.jsx)(`p`,{style:{marginTop:12},children:`Do you want to create one subfolder per product for these, or keep one shared folder per barcode?`}),(0,V.jsxs)(`div`,{style:{display:`flex`,gap:10,marginTop:12},children:[(0,V.jsx)(`button`,{className:`sor-btn-primary`,onClick:()=>{ke(!0),we(!1)},children:`One Folder Per Product`}),(0,V.jsx)(`button`,{className:`sor-btn-secondary`,onClick:()=>{ke(!1),we(!1)},children:`Keep Shared Folder`})]})]})]})}),b&&(0,V.jsx)(`div`,{className:`sor-img-preview`,style:{left:b.x,top:b.y},children:(0,V.jsx)(`img`,{src:b.src,alt:``})}),v&&(0,V.jsx)(`div`,{className:`sor-modal`,onClick:e=>{e.target===e.currentTarget&&y(!1)},children:(0,V.jsxs)(`div`,{className:`sor-modal-card`,children:[(0,V.jsxs)(`div`,{className:`sor-panel-head`,children:[(0,V.jsx)(`h2`,{children:`Guide`}),(0,V.jsx)(`button`,{className:`sor-btn-icon`,onClick:()=>y(!1),children:`Close`})]}),(0,V.jsxs)(`div`,{className:`sor-guide-copy`,children:[(0,V.jsx)(`p`,{children:`1. Click Choose folder and select the product image folder.`}),(0,V.jsx)(`p`,{children:`2. Click Scan to preview every detected item, EAN group, and image thumbnail.`}),(0,V.jsx)(`p`,{children:`3. Use the search bar to filter by EAN or image name.`}),(0,V.jsx)(`p`,{children:`4. Open Gallery to review all images inside the selected folder.`}),(0,V.jsx)(`p`,{children:`5. Click Sort and report to create one folder per EAN and write EAN_report.xlsx.`}),(0,V.jsx)(`p`,{children:`6. Open Report to preview, export, or open the Excel report on this computer.`})]})]})}),(0,V.jsx)(`style`,{children:`
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
      `})]})}var Mi=[{key:`unsorted`,title:`Unsorted`,fixed:!0,imageIds:[]},{key:`packshot`,title:`Packshot`,imageIds:[]},{key:`lifestyle-human`,title:`Lifestyle/Human`,imageIds:[]},{key:`lifestyle-normal`,title:`Lifestyle/Normal`,imageIds:[]},{key:`artwork`,title:`Artwork`,imageIds:[]},{key:`duplicate`,title:`Duplicate`,fixed:!0,imageIds:[]}],Ni={packshot:[],"lifestyle-human":[],"lifestyle-normal":[],artwork:[]},Pi={packshot:`PACK SHOT`,"lifestyle-human":`HUMAN`,"lifestyle-normal":`NORMAL LIFESTYLE`,artwork:`ARTWORK`};function Fi(e){if(!/^\d{13}$/.test(e))return!1;let t=0;for(let n=0;n<12;n++)t+=Number(e[n])*(n%2==0?1:3);return(10-t%10)%10===Number(e[12])}function Ii(e){return e<1024?`${e} B`:e<1048576?`${(e/1024).toFixed(1)} KB`:`${(e/1048576).toFixed(2)} MB`}function Li(e,t){return qn(`/api/ean-renamer/images/${encodeURIComponent(e)}/thumbnail?folderPath=${encodeURIComponent(t)}`)}function Ri(e){return e===`lifestyle-human`?`lifestyle_human`:e===`lifestyle-normal`?`lifestyle_normal`:e}function zi(e){return e.key===`packshot`?`PACKSHOT`:e.key===`lifestyle-human`?`HUMAN`:e.key===`lifestyle-normal`?`NORMAL LIFESTYLE`:e.title}function Bi(e,t){return t[e.key]||zi(e).toUpperCase()}function Vi(e=[],t=!1){return{id:`dup-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,imageIds:e,first:t}}function Hi(e){return e===`per-category`?`per_category`:e}function Ui(e){return e===`in-folder`?`rename`:`copy`}function Wi(e){return e.outputPath||e.outputRelativePath||e.newName||``}function Gi(e){return e.match(/\b\d{8,14}\b/)?.[0]||``}function Ki(e){return e.toLowerCase().replace(/\.[a-z0-9]+$/i,``).replace(/[^a-z0-9]+/g,` `).trim()}function qi(e){let t=`${e.relativePath} ${e.name}`.toLowerCase();return t.includes(`artwork`)||t.includes(`art work`)||t.includes(`label`)?{category:`artwork`,categoryName:`Artwork`}:t.includes(`human`)||t.includes(`model`)||t.includes(`people`)||t.includes(`face`)?{category:`lifestyle_human`,categoryName:`Lifestyle/Human`}:t.includes(`lifestyle`)||t.includes(`normal`)?{category:`lifestyle_normal`,categoryName:`Lifestyle/Normal`}:{category:`packshot`,categoryName:`Packshot`}}function Ji(e,t){let n=Ki(e.source||``);return n?[t.name,t.relativePath,...t.sampleImages.map(e=>e.name),...t.sampleImages.map(e=>e.relativePath)].map(Ki).some(e=>e.includes(n)||n.includes(e)):!1}function Yi(e,t,n){return e.map(e=>{let r=Gi(`${e.name} ${e.relativePath}`),i=t.find(e=>e.ean&&r&&e.ean.includes(r))||t.find(t=>Ji(t,e))||t.find(t=>t.ean&&e.sampleImages.some(e=>Ki(e.name).includes(Ki(t.ean||``))));return i?{...e,ean:i.ean||e.ean,productName:i.productName||e.productName,matchSource:n}:e})}function Xi(){let{notify:e}=Gn(),[t,n]=(0,_.useState)(``),[r,i]=(0,_.useState)(``),[a,o]=(0,_.useState)(``),[s,c]=(0,_.useState)(``),[l,u]=(0,_.useState)(!1),[d,f]=(0,_.useState)([]),[p,m]=(0,_.useState)(Mi.map(e=>({...e,imageIds:[]}))),[h,g]=(0,_.useState)({...Ni}),[v,y]=(0,_.useState)({...Pi}),[b,x]=(0,_.useState)(new Set),[S,C]=(0,_.useState)({}),[w,ee]=(0,_.useState)({}),[T,E]=(0,_.useState)({}),[D,te]=(0,_.useState)(`single`),[O,ne]=(0,_.useState)([]),[k,re]=(0,_.useState)([]),[ie,ae]=(0,_.useState)([]),[A,j]=(0,_.useState)(!1),[M,oe]=(0,_.useState)(!1),[se,ce]=(0,_.useState)(!0),[N,P]=(0,_.useState)(220),[F,le]=(0,_.useState)(null),[I,ue]=(0,_.useState)({outputMode:`copy`,namingMode:`per-category`}),[L,de]=(0,_.useState)([]),[fe,pe]=(0,_.useState)(``),[me,he]=(0,_.useState)(!1),[R,ge]=(0,_.useState)([]),[_e,ve]=(0,_.useState)(null),[ye,be]=(0,_.useState)(null),[xe,Se]=(0,_.useState)(null),[Ce,we]=(0,_.useState)(null),[z,Te]=(0,_.useState)(null),Ee=(0,_.useRef)(null),De=(0,_.useRef)(null),Oe=(0,_.useRef)(null),ke=(0,_.useRef)(null),Ae=(0,_.useMemo)(()=>{let e=new Map;return d.forEach(t=>e.set(t.id,t)),e},[d]),je=Fi(a.trim()||r),Me=d.length,Ne=b.size,B=Object.values(h).reduce((e,t)=>e+t.reduce((e,t)=>e+t.imageIds.length,0),0),Pe=(0,_.useMemo)(()=>p.filter(e=>e.key!==`unsorted`&&e.key!==`duplicate`),[p]),Fe=O.filter(e=>e.ean.trim()).length,Ie=O.length-Fe;async function Le(){try{let e=await H(`/api/ean-renamer/folder/pick`,{method:`POST`});e.folderPath&&(D===`bulk`?await Ve(e.folderPath):await Re(e.folderPath))}catch(t){e(`Failed to pick folder`,{type:`error`,message:t instanceof Error?t.message:String(t)})}}async function Re(t){try{let r=await H(`/api/ean-renamer/folder/open`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({folderPath:t})});n(r.folderPath),i(r.ean||``),f(r.images),x(new Set),de([]),pe(``),g({...Ni}),ee({}),E({}),m(e=>e.map(e=>e.key===`unsorted`?{...e,imageIds:r.images.map(e=>e.id)}:{...e,imageIds:[]})),e(`Folder loaded`,{type:`success`,message:`${r.images.length} images found`})}catch(t){e(`Failed to load folder`,{type:`error`,message:t instanceof Error?t.message:String(t)})}}async function ze(){t&&(D===`bulk`?await Ve(t):await Re(t))}function Be(){t&&window.__grimoire?.revealInExplorer&&window.__grimoire.revealInExplorer(t)}async function Ve(t){try{let r=await H(`/api/ean-renamer/folder/bulk-scan`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({folderPath:t})});n(r.folderPath),de([]),re([]),ae([]),ne(r.folders.map(e=>{let t=Gi(`${e.name} ${e.relativePath}`);return{...e,ean:t,productName:``,matchSource:t?`folder`:`missing`}})),e(`Bulk scan complete`,{type:`success`,message:`${r.totalFolders} folders, ${r.totalImages} images`})}catch(t){e(`Bulk scan failed`,{type:`error`,message:t instanceof Error?t.message:String(t)})}}function He(e,t){ne(n=>n.map(n=>n.key===e?{...n,...t,matchSource:t.matchSource||(t.ean||t.productName?`manual`:n.matchSource)}:n))}async function Ue(t,n){if(!t)return;let r=new FormData;r.append(`file`,t);try{let t=await H(`/api/ean-renamer/bulk/import-map`,{method:`POST`,body:r});ne(e=>Yi(e,t.entries,n)),ae(t.warnings||[]),e(n===`master`?`Master data matched`:`Mapping file imported`,{type:t.entries.length?`success`:`warning`,message:`${t.entries.length} rows detected`})}catch(t){e(`Import failed`,{type:`error`,message:t instanceof Error?t.message:String(t)})}}function We(e){te(`single`),Re(e.folderPath)}async function Ge(n){try{let e=await H(`/api/ean-renamer/folder/pick-output`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({category:n,initialFolderPath:S[n]||t})});e.folderPath&&C(t=>({...t,[n]:e.folderPath}))}catch(t){e(`Failed to pick output folder`,{type:`error`,message:t instanceof Error?t.message:String(t)})}}function Ke(e){x(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n})}function qe(e,t,n){let r=[t];ge(r),ve(n||null),be({x:e.clientX,y:e.clientY}),le(null),e.dataTransfer.effectAllowed=`move`,e.dataTransfer.setData(`text/plain`,r.join(`,`));let i=document.createElement(`div`);i.className=`ren-drag-ghost`,i.textContent=`Drag over cards to group`,document.body.appendChild(i),e.dataTransfer.setDragImage(i,30,16),requestAnimationFrame(()=>i.remove())}function Je(e){R.length!==0&&be({x:e.clientX,y:e.clientY})}function Ye(e,t,n){Je(e),!(!n||!_e||n!==_e)&&ge(e=>e.includes(t)?e:[...e,t])}function Xe(e,t){e.preventDefault(),Je(e),e.dataTransfer.dropEffect=`move`,Se(t),we(null),Te(null)}function Ze(){Se(null),we(null),Te(null)}function Qe(e,t){e.preventDefault(),Se(null),we(null),Te(null),t!==`duplicate`&&R.length!==0&&(m(e=>{let n=e.map(e=>({...e,imageIds:e.imageIds.filter(e=>!R.includes(e))})),r=n.find(e=>e.key===t);return r&&r.key!==`duplicate`&&(r.imageIds=[...r.imageIds,...R]),n}),g(e=>{let t={...e};return Object.keys(e).forEach(n=>{t[n]=(e[n]||[]).map(e=>({...e,imageIds:e.imageIds.filter(e=>!R.includes(e))})).filter(e=>e.imageIds.length>0)}),t}),ge([]),ve(null),be(null))}function $e(e,t){e.preventDefault(),e.stopPropagation(),Je(e),e.dataTransfer.dropEffect=`move`,Se(`duplicate`),we(t),Te(null)}function et(e,t){e.preventDefault(),e.stopPropagation(),Se(null),we(null),Te(null),R.length!==0&&(m(e=>e.map(e=>({...e,imageIds:e.imageIds.filter(e=>!R.includes(e))}))),g(e=>{let n={...e};return Object.keys(e).forEach(t=>{n[t]=(e[t]||[]).map(e=>({...e,imageIds:e.imageIds.filter(e=>!R.includes(e))})).filter(e=>e.imageIds.length>0)}),n[t]=[...n[t]||[],Vi([...R],!1)],n}),ge([]),ve(null),be(null))}function tt(e){g(t=>({...t,[e]:[...t[e]||[],Vi([],!1)]}))}function nt(e,t){g(n=>({...n,[e]:(n[e]||[]).map(e=>e.id===t?{...e,first:!e.first}:e)}))}function rt(e,t){let n=(h[e]||[]).find(e=>e.id===t)?.imageIds||[];g(n=>({...n,[e]:(n[e]||[]).filter(e=>e.id!==t)})),n.length>0&&m(e=>e.map(e=>e.key===`unsorted`?{...e,imageIds:[...e.imageIds,...n]}:e))}function it(){ge([]),ve(null),be(null),Se(null),we(null),Te(null),le(null)}function at(e,t){R.length>0||le({image:t,x:e.clientX,y:e.clientY})}function ot(){let t=prompt(`Category name:`);if(!t?.trim())return;let n=t.toLowerCase().replace(/\s+/g,`-`).replace(/[^a-z0-9-]/g,``);if(p.some(e=>e.key===n)){e(`Column already exists`,{type:`warning`});return}m(e=>[...e,{key:n,title:t.trim(),imageIds:[]}]),g(e=>({...e,[n]:e[n]||[]})),y(e=>({...e,[n]:t.trim().toUpperCase()}))}function st(e){let t=p.find(t=>t.key===e);if(!t||t.fixed)return;let n=prompt(`New name:`,t.title);n?.trim()&&(m(t=>t.map(t=>t.key===e?{...t,title:n.trim()}:t)),y(t=>({...t,[e]:n.trim().toUpperCase()})))}function ct(e){let t=p.find(t=>t.key===e);!t||t.fixed||(m(n=>{let r=t.imageIds;return n.filter(t=>t.key!==e).map(e=>e.key===`unsorted`?{...e,imageIds:[...e.imageIds,...r]}:e)}),C(t=>{let n={...t};return delete n[Ri(e)],delete n[e],n}),g(t=>{let n=(t[e]||[]).flatMap(e=>e.imageIds),r={...t};return delete r[e],n.length>0&&m(e=>e.map(e=>e.key===`unsorted`?{...e,imageIds:[...e.imageIds,...n]}:e)),r}))}function lt(e){E(t=>{let n={...t,[e]:!t[e]};return n[e]||ee(t=>{let n={...t};return delete n[e],n}),n})}function ut(e,t){ee(n=>{let r=new Set(n[e]||[]);return r.has(t)?r.delete(t):r.add(t),{...n,[e]:r}})}function dt(e,t){return w[e]?.has(t)??!1}let ft=(0,_.useCallback)(()=>{let e={},n={},r=[],i=[],o=[],c=[];return p.forEach(t=>{if(t.key===`unsorted`||t.key===`duplicate`)return;let n=Ri(t.key);e[n]=t.title,i.push(n),t.imageIds.forEach(e=>r.push({id:e,category:n,categoryName:t.title}))}),Pe.forEach(t=>{let n=Ri(t.key),a=t.title;e[n]||(e[n]=a,i.push(n)),(h[t.key]||[]).forEach(e=>{e.imageIds.forEach(e=>r.push({id:e,category:n,categoryName:a}))})}),Object.entries(w).forEach(([,e])=>{e.forEach(e=>o.push(e))}),Pe.forEach(e=>{(h[e.key]||[]).forEach(e=>{e.imageIds.length!==0&&(c.push({ids:[...e.imageIds],first:e.first}),e.first&&e.imageIds.forEach(e=>{o.includes(e)||o.push(e)}))})}),Object.entries(S).forEach(([e,t])=>{n[e]=t}),{folderPath:t,outputFolderPaths:n,customEan:a.trim()||void 0,productName:s.trim()||void 0,productNameContinuous:l,namingMode:Hi(I.namingMode),outputCategories:e,outputMode:Ui(I.outputMode),categoryOrder:i,assignments:r,priorityIds:o.length>0?o:void 0,duplicateGroups:c}},[t,p,Pe,h,S,a,s,l,I,w]),pt=(0,_.useCallback)(()=>{let e=[],n=[`packshot`,`lifestyle_human`,`lifestyle_normal`,`artwork`],r={packshot:`Packshot`,lifestyle_human:`Lifestyle/Human`,lifestyle_normal:`Lifestyle/Normal`,artwork:`Artwork`},i={};return Object.entries(S).forEach(([e,t])=>{i[e]=t}),O.forEach(t=>{let n=t.ean.trim();n&&t.images.forEach(r=>{let i=qi(r);e.push({id:r.id,category:i.category,categoryName:i.categoryName,ean:n,productName:t.productName.trim()||void 0})})}),{folderPath:t,outputFolderPaths:i,productNameContinuous:!0,namingMode:Hi(I.namingMode===`per-category`?`continuous`:I.namingMode),outputCategories:r,outputMode:Ui(I.outputMode),categoryOrder:n,assignments:e,duplicateGroups:[]}},[O,t,S,I.namingMode,I.outputMode]);async function mt(){if(t){he(!0);try{de((await H(`/api/ean-renamer/batch/preview`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(ft())})).items),oe(!0)}catch(t){e(`Preview failed`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{he(!1)}}}async function ht(){if(t){if(Fe===0){e(`Bulk preview needs EAN data`,{type:`warning`,message:`Enter EAN values or import a mapping/master file first.`});return}he(!0);try{let e=await H(`/api/ean-renamer/batch/preview`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(pt())});re(e.items),de(e.items),oe(!0)}catch(t){e(`Bulk preview failed`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{he(!1)}}}async function gt(){if(t){if(Fe===0){e(`Bulk copy needs EAN data`,{type:`warning`,message:`Enter EAN values or import a mapping/master file first.`});return}he(!0);try{let t=await H(`/api/ean-renamer/batch/apply`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(pt())});re(t.items),de(t.items),t.logPath&&pe(t.logPath),e(`Bulk copy complete`,{type:`success`,message:`${t.items.length} images processed`})}catch(t){e(`Bulk copy failed`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{he(!1)}}}async function _t(){if(t){he(!0);try{let n=await H(`/api/ean-renamer/batch/apply`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(ft())}),r=Object.values(S).filter(Boolean);I.outputMode===`in-folder`&&r.push(t),r.length>0&&localStorage.setItem(`grimoire-ean-renamer-output-roots`,JSON.stringify(Array.from(new Set(r)))),de(n.items),n.logPath&&pe(n.logPath);let i=n.renamed??n.items.length,a=n.skipped??n.skippedCount??0,o=Array.isArray(n.conflicts)?n.conflicts.length:n.conflicts??0;e(`Rename complete`,{type:o>0?`warning`:`success`,message:`${i} processed, ${a} skipped, ${o} conflicts`})}catch(t){e(`Rename failed`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{he(!1)}}}async function vt(){if(!(!fe||!t)){he(!0);try{await H(`/api/ean-renamer/rename/undo`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({folderPath:t,logPath:fe})}),e(`Undo complete`,{type:`success`}),pe(``),await Re(t)}catch(t){e(`Undo failed`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{he(!1)}}}function yt(e){e.preventDefault();let t=e.clientY,n=N;function r(e){P(Math.max(80,Math.min(500,n-(e.clientY-t))))}function i(){document.removeEventListener(`mousemove`,r),document.removeEventListener(`mouseup`,i)}document.addEventListener(`mousemove`,r),document.addEventListener(`mouseup`,i)}(0,_.useEffect)(()=>{if(!A)return;function e(e){De.current&&!De.current.contains(e.target)&&j(!1)}return document.addEventListener(`mousedown`,e),()=>document.removeEventListener(`mousedown`,e)},[A]),(0,_.useEffect)(()=>{if(R.length===0)return;function e(e){e.key===`Escape`&&(ge([]),ve(null),be(null),Se(null),we(null),Te(null))}return document.addEventListener(`keydown`,e),()=>document.removeEventListener(`keydown`,e)},[R.length]);let bt=(0,_.useMemo)(()=>{let e=0,t=0,n=0;return L.forEach(r=>{(r.status||`rename`)===`rename`?e++:r.status===`skip`?t++:n++}),{renamed:e,skipped:t,conflicts:n}},[L]);function xt(e,n){let r=Ae.get(e);if(!r)return null;let i=b.has(e),a=R.includes(e),o=R[0]===e,s=R.length>0&&!!n&&n===_e&&!a,c=n&&T[n],l=n?dt(n,e):!1;return(0,V.jsxs)(`div`,{className:`ren-card ${i?`ren-card-selected`:``} ${a?`ren-card-grouped`:``} ${o?`ren-card-group-seed`:``} ${s?`ren-card-can-group`:``} ${l?`ren-card-priority`:``}`,draggable:!0,onMouseEnter:e=>at(e,r),onMouseMove:e=>at(e,r),onMouseLeave:()=>le(null),onDragStart:t=>qe(t,e,n),onDrag:e=>Je(e),onDragOver:e=>Je(e),onDragEnter:t=>Ye(t,e,n),onDragEnd:it,children:[(0,V.jsx)(`input`,{type:`checkbox`,className:`ren-card-check`,checked:i,onChange:()=>Ke(e)}),(0,V.jsx)(`div`,{className:`ren-card-thumb`,children:(0,V.jsx)(`img`,{src:Li(e,t),alt:r.name,loading:`lazy`})}),(0,V.jsxs)(`div`,{className:`ren-card-meta`,children:[(0,V.jsx)(`span`,{className:`ren-card-name`,title:r.name,children:r.name}),(0,V.jsxs)(`span`,{className:`ren-card-info`,children:[r.width,`×`,r.height,` · `,Ii(r.sizeBytes)]}),(0,V.jsxs)(`div`,{className:`ren-card-chips`,children:[(0,V.jsx)(`span`,{className:`ren-chip`,children:r.extension.toUpperCase()}),L.some(t=>t.id===e&&(t.status||`rename`)===`rename`)&&(0,V.jsx)(`span`,{className:`ren-chip ren-chip-renamed`,children:`renamed`}),a&&(0,V.jsx)(`span`,{className:`ren-chip ren-chip-grouped`,children:o?`drag start`:`grouped`}),s&&(0,V.jsx)(`span`,{className:`ren-chip ren-chip-can-group`,children:`add`})]})]}),c&&(0,V.jsx)(`button`,{className:`ren-priority-btn ${l?`ren-priority-active`:``}`,title:l?`Remove first-image priority`:`Label as first image`,onClick:t=>{t.stopPropagation(),n&&ut(n,e)},children:`★`}),(0,V.jsx)(`span`,{className:`ren-card-grip`,title:`Drag`,children:`☰`})]},e)}function St(){return(0,V.jsxs)(`div`,{className:`ren-bulk`,children:[(0,V.jsxs)(`div`,{className:`ren-bulk-toolbar`,children:[(0,V.jsxs)(`div`,{className:`ren-bulk-summary`,children:[(0,V.jsxs)(`div`,{children:[(0,V.jsx)(`span`,{children:`Folders`}),(0,V.jsx)(`strong`,{children:O.length})]}),(0,V.jsxs)(`div`,{children:[(0,V.jsx)(`span`,{children:`Images`}),(0,V.jsx)(`strong`,{children:O.reduce((e,t)=>e+t.imageCount,0)})]}),(0,V.jsxs)(`div`,{children:[(0,V.jsx)(`span`,{children:`Matched`}),(0,V.jsx)(`strong`,{className:`ren-ok`,children:Fe})]}),(0,V.jsxs)(`div`,{children:[(0,V.jsx)(`span`,{children:`Missing`}),(0,V.jsx)(`strong`,{className:Ie?`ren-warn`:``,children:Ie})]}),(0,V.jsxs)(`div`,{children:[(0,V.jsx)(`span`,{children:`Preview`}),(0,V.jsx)(`strong`,{children:k.length})]})]}),(0,V.jsxs)(`div`,{className:`ren-bulk-tools`,children:[(0,V.jsx)(`input`,{ref:Oe,type:`file`,hidden:!0,accept:`.txt,.csv,.tsv,.xlsx,.xls`,onChange:e=>void Ue(e.currentTarget.files?.[0],`file`)}),(0,V.jsx)(`input`,{ref:ke,type:`file`,hidden:!0,accept:`.xlsx,.xls,.csv,.txt,.tsv`,onChange:e=>void Ue(e.currentTarget.files?.[0],`master`)}),(0,V.jsx)(`button`,{className:`btn btn-secondary btn-sm`,onClick:()=>Oe.current?.click(),children:`Import EAN + Name`}),(0,V.jsx)(`button`,{className:`btn btn-secondary btn-sm`,onClick:()=>ke.current?.click(),children:`Match Master Data`}),(0,V.jsx)(`button`,{className:`btn btn-secondary btn-sm`,onClick:()=>t&&Ve(t),disabled:!t||me,children:`Rescan`})]})]}),ie.length>0&&(0,V.jsx)(`div`,{className:`ren-bulk-warning`,children:ie.join(` `)}),O.length===0?(0,V.jsxs)(`div`,{className:`ren-bulk-empty`,children:[(0,V.jsx)(`strong`,{children:`Select a root folder to start Bulk Working`}),(0,V.jsx)(`span`,{children:`The scan lists direct images and each subfolder with image counts. Video files such as MP4 are ignored.`})]}):(0,V.jsx)(`div`,{className:`ren-bulk-grid`,children:O.map(e=>{let n=!!e.ean.trim(),r=e.images.filter(e=>qi(e).category===`packshot`).length;return(0,V.jsxs)(`article`,{className:`ren-bulk-card ${n?`ready`:`missing`}`,children:[(0,V.jsxs)(`div`,{className:`ren-bulk-card-head`,children:[(0,V.jsxs)(`div`,{children:[(0,V.jsx)(`strong`,{title:e.relativePath,children:e.name}),(0,V.jsx)(`span`,{children:e.relativePath===`.`?`Root folder`:e.relativePath})]}),(0,V.jsx)(`span`,{className:`ren-bulk-status ${n?`ready`:`missing`}`,children:n?e.matchSource:`missing`})]}),(0,V.jsxs)(`div`,{className:`ren-bulk-thumbs`,children:[e.sampleImages.map(e=>(0,V.jsx)(`img`,{src:Li(e.id,t),alt:e.name,loading:`lazy`},e.id)),e.sampleImages.length===0&&(0,V.jsx)(`span`,{children:`No images`})]}),(0,V.jsxs)(`div`,{className:`ren-bulk-meta`,children:[(0,V.jsxs)(`span`,{children:[e.imageCount,` images`]}),(0,V.jsxs)(`span`,{children:[r,` packshot`]}),(0,V.jsxs)(`span`,{children:[e.imageCount-r,` classified`]})]}),(0,V.jsxs)(`label`,{className:`ren-bulk-field`,children:[(0,V.jsx)(`span`,{children:`EAN`}),(0,V.jsx)(`input`,{value:e.ean,onChange:t=>He(e.key,{ean:t.target.value,matchSource:`manual`}),placeholder:`Enter EAN`})]}),(0,V.jsxs)(`label`,{className:`ren-bulk-field`,children:[(0,V.jsx)(`span`,{children:`Product name`}),(0,V.jsx)(`input`,{value:e.productName,onChange:t=>He(e.key,{productName:t.target.value,matchSource:`manual`}),placeholder:`Optional`})]}),(0,V.jsx)(`div`,{className:`ren-bulk-card-actions`,children:(0,V.jsx)(`button`,{className:`btn btn-secondary btn-sm`,onClick:()=>We(e),children:`Open Single Mode`})})]},e.key)})})]})}return(0,V.jsxs)(`div`,{className:`ren-root`,children:[(0,V.jsx)(`style`,{children:Zi}),(0,V.jsx)(`div`,{className:`ren-topbar`,children:(0,V.jsxs)(`div`,{className:`ren-topbar-row`,children:[(0,V.jsxs)(`div`,{className:`ren-mode-switch`,children:[(0,V.jsx)(`button`,{className:D===`single`?`active`:``,onClick:()=>te(`single`),children:`Single Folder`}),(0,V.jsx)(`button`,{className:D===`bulk`?`active`:``,onClick:()=>{te(`bulk`),t&&O.length===0&&Ve(t)},children:`Bulk Working`})]}),(0,V.jsxs)(`div`,{className:`ren-folder-group`,children:[(0,V.jsx)(`input`,{className:`ren-path-input`,readOnly:!0,value:t,placeholder:`No folder selected`}),(0,V.jsx)(`button`,{className:`btn btn-primary btn-sm`,onClick:Le,children:`Pick Folder`}),(0,V.jsx)(`button`,{className:`btn btn-secondary btn-sm`,onClick:Be,disabled:!t,children:`Open`}),(0,V.jsx)(`button`,{className:`btn btn-secondary btn-sm`,onClick:ze,disabled:!t,children:`Refresh`})]}),(0,V.jsxs)(`div`,{className:`ren-stat-group`,children:[(0,V.jsxs)(`label`,{className:`ren-stat`,children:[(0,V.jsx)(`span`,{children:`EAN`}),(0,V.jsx)(`input`,{className:`ren-stat-input`,readOnly:!0,value:r,placeholder:`--`})]}),(0,V.jsx)(`span`,{className:`ren-ean-badge ${je?`valid`:`warn`}`,children:je?`✓`:`⚠`}),(0,V.jsxs)(`label`,{className:`ren-stat`,children:[(0,V.jsx)(`span`,{children:`Custom EAN`}),(0,V.jsx)(`input`,{className:`ren-stat-input`,value:a,onChange:e=>o(e.target.value),placeholder:`Override`})]}),(0,V.jsxs)(`div`,{className:`ren-stat ren-product-stat`,children:[(0,V.jsx)(`span`,{children:`Product Name`}),(0,V.jsx)(`input`,{className:`ren-stat-input ren-product-input`,value:s,onChange:e=>c(e.target.value),placeholder:`Output name`}),(0,V.jsxs)(`label`,{className:`ren-product-continuous`,title:`Use EAN_ProductName_1, EAN_ProductName_2 naming`,children:[(0,V.jsx)(`input`,{type:`checkbox`,checked:l,onChange:e=>u(e.target.checked),disabled:!s.trim()}),(0,V.jsx)(`span`,{children:`EAN_ProductName`})]})]}),(0,V.jsxs)(`div`,{className:`ren-stat`,children:[(0,V.jsx)(`span`,{children:`Total`}),(0,V.jsx)(`strong`,{children:Me})]}),(0,V.jsxs)(`div`,{className:`ren-stat`,children:[(0,V.jsx)(`span`,{children:`Selected`}),(0,V.jsx)(`strong`,{children:Ne})]})]}),(0,V.jsxs)(`div`,{className:`ren-settings-wrap`,ref:De,children:[(0,V.jsx)(`button`,{className:`btn btn-secondary btn-sm ren-gear`,onClick:()=>j(e=>!e),title:`Settings`,children:`⚙`}),A&&(0,V.jsxs)(`div`,{className:`ren-settings-popover`,children:[(0,V.jsx)(`h4`,{children:`Settings`}),(0,V.jsxs)(`label`,{className:`ren-setting-row`,children:[(0,V.jsx)(`span`,{children:`Action`}),(0,V.jsxs)(`select`,{value:I.outputMode,onChange:e=>ue(t=>({...t,outputMode:e.target.value})),children:[(0,V.jsx)(`option`,{value:`copy`,children:`Copy`}),(0,V.jsx)(`option`,{value:`in-folder`,children:`In-folder rename`})]})]}),(0,V.jsxs)(`label`,{className:`ren-setting-row`,children:[(0,V.jsx)(`span`,{children:`Naming mode`}),(0,V.jsxs)(`select`,{value:I.namingMode,onChange:e=>ue(t=>({...t,namingMode:e.target.value})),children:[(0,V.jsx)(`option`,{value:`per-category`,children:`Per category`}),(0,V.jsx)(`option`,{value:`continuous`,children:`Continuous`}),(0,V.jsx)(`option`,{value:`prefixed`,children:`Prefixed`})]})]}),(0,V.jsxs)(`label`,{className:`ren-setting-row`,children:[(0,V.jsx)(`span`,{children:`Dark mode`}),(0,V.jsx)(`input`,{type:`checkbox`,checked:!0,disabled:!0})]})]})]})]})}),(0,V.jsxs)(`div`,{className:`ren-output-bar`,children:[(0,V.jsxs)(`span`,{className:`ren-output-label`,children:[(0,V.jsxs)(`svg`,{width:`14`,height:`14`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,children:[(0,V.jsx)(`path`,{d:`M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4`}),(0,V.jsx)(`polyline`,{points:`17 8 12 3 7 8`}),(0,V.jsx)(`line`,{x1:`12`,y1:`3`,x2:`12`,y2:`15`})]}),`Output`]}),(0,V.jsx)(`div`,{className:`ren-output-fields`,children:Pe.map(e=>{let t=Ri(e.key),n=S[zi(e)]||S[e.title],r=S[t]||S[e.key]||n;return(0,V.jsxs)(`div`,{className:`ren-output-field`,onClick:()=>Ge(t),children:[(0,V.jsx)(`span`,{className:`ren-output-cat`,children:zi(e)}),(0,V.jsx)(`span`,{className:`ren-output-path`,children:r||`Set output`}),r&&(0,V.jsx)(`button`,{className:`ren-output-clear`,onClick:n=>{n.stopPropagation(),C(n=>{let r={...n};return delete r[t],delete r[e.key],delete r[e.title],delete r[zi(e)],r})},children:`×`})]},e.key)})}),(0,V.jsx)(`button`,{className:`btn btn-secondary btn-sm`,onClick:()=>C({}),disabled:Object.keys(S).length===0,children:`Clear all`})]}),D===`bulk`?St():(0,V.jsxs)(`div`,{className:`ren-board`,children:[p.map(e=>{let t=R.length>0&&_e===e.key,n=R.length>0&&xe===e.key&&e.key!==`duplicate`;return(0,V.jsxs)(`div`,{className:`ren-column ${xe===e.key?`ren-column-drop`:``} ${t?`ren-column-source`:``}`,onDragOver:t=>Xe(t,e.key),onDragLeave:Ze,onDrop:t=>Qe(t,e.key),children:[(0,V.jsxs)(`div`,{className:`ren-col-header`,children:[(0,V.jsx)(`span`,{className:`ren-col-title`,onDoubleClick:()=>!e.fixed&&st(e.key),title:e.fixed?e.title:`Double-click to rename`,children:e.title}),(0,V.jsx)(`span`,{className:`ren-col-count`,children:e.key===`duplicate`?B:e.imageIds.length}),!e.fixed&&(0,V.jsxs)(`label`,{className:`ren-priority-toggle`,title:`Select which images get numbered as #1`,children:[(0,V.jsx)(`input`,{type:`checkbox`,checked:!!T[e.key],onChange:()=>lt(e.key)}),(0,V.jsx)(`span`,{children:`1st`})]}),!e.fixed&&(0,V.jsx)(`button`,{className:`ren-col-menu`,onClick:()=>ct(e.key),title:`Remove column`,children:`×`})]}),e.key===`duplicate`?(0,V.jsx)(`div`,{className:`ren-col-body ren-duplicate-body`,children:Pe.map(e=>{let t=e.key,n=h[t]||[],r=Bi(e,v);return(0,V.jsxs)(`div`,{className:`ren-duplicate-section ${Ce===t?`ren-duplicate-drop`:``}`,onDragOver:e=>$e(e,t),onDragLeave:Ze,onDrop:e=>et(e,t),children:[Ce===t&&R.length>0&&!z&&(0,V.jsxs)(`div`,{className:`ren-drop-hint ren-duplicate-hint`,children:[`Create duplicate group with `,R.length,` image`,R.length>1?`s`:``]}),(0,V.jsxs)(`div`,{className:`ren-duplicate-header`,children:[(0,V.jsx)(`input`,{className:`ren-duplicate-type`,value:r,placeholder:r,onChange:e=>y(n=>({...n,[t]:e.target.value}))}),(0,V.jsx)(`button`,{className:`ren-duplicate-add`,onClick:()=>tt(t),title:`Add another duplicate group`,children:`+ Group`})]}),(0,V.jsxs)(`div`,{className:`ren-duplicate-images`,children:[n.map((e,n)=>{let r=`dup-${t}-${e.id}`;return(0,V.jsxs)(`div`,{className:`ren-duplicate-group ${z===e.id?`ren-duplicate-group-drop`:``}`,onDragOver:n=>{n.preventDefault(),n.stopPropagation(),Je(n),Se(`duplicate`),we(t),Te(e.id)},onDrop:n=>{n.preventDefault(),n.stopPropagation(),Se(null),we(null),Te(null),R.length!==0&&(m(e=>e.map(e=>({...e,imageIds:e.imageIds.filter(e=>!R.includes(e))}))),g(n=>{let r={...n};return Object.keys(n).forEach(e=>{r[e]=(n[e]||[]).map(e=>({...e,imageIds:e.imageIds.filter(e=>!R.includes(e))}))}),r[t]=(r[t]||[]).map(t=>t.id===e.id?{...t,imageIds:[...t.imageIds,...R]}:t),r}),ge([]),ve(null),be(null))},children:[z===e.id&&R.length>0&&(0,V.jsxs)(`div`,{className:`ren-drop-hint ren-duplicate-hint`,children:[`Add `,R.length,` image`,R.length>1?`s`:``,` to Group `,n+1]}),(0,V.jsxs)(`div`,{className:`ren-duplicate-group-head`,children:[(0,V.jsxs)(`span`,{children:[`Group `,n+1]}),(0,V.jsxs)(`label`,{className:`ren-priority-toggle`,title:`This duplicate group should get the first available number`,children:[(0,V.jsx)(`input`,{type:`checkbox`,checked:e.first,onChange:()=>nt(t,e.id)}),(0,V.jsx)(`span`,{children:`1st`})]}),(0,V.jsx)(`button`,{className:`ren-duplicate-remove`,onClick:()=>rt(t,e.id),title:`Remove this duplicate group`,children:`×`})]}),e.imageIds.map(e=>xt(e,r)),e.imageIds.length===0&&(0,V.jsx)(`div`,{className:`ren-duplicate-empty`,children:`Drop group images here`})]},e.id)}),n.length===0&&(0,V.jsx)(`div`,{className:`ren-duplicate-empty`,children:`Drop images here`})]})]},t)})}):(0,V.jsxs)(`div`,{className:`ren-col-body`,children:[t&&(0,V.jsx)(`div`,{className:`ren-source-hint`,children:`Drag over more cards to group them, then drop into another column`}),n&&(0,V.jsxs)(`div`,{className:`ren-drop-hint`,children:[`Drop `,R.length,` image`,R.length>1?`s`:``,` here`]}),e.imageIds.map(t=>xt(t,e.key)),e.imageIds.length===0&&(0,V.jsx)(`div`,{className:`ren-col-empty`,children:`Drop images here`})]})]},e.key)}),(0,V.jsx)(`button`,{className:`ren-add-col`,onClick:ot,title:`Add category`,children:`+`})]}),F&&(0,V.jsxs)(`div`,{className:`ren-hover-preview`,style:{left:Math.max(12,Math.min(F.x+18,window.innerWidth-340)),top:Math.max(12,Math.min(F.y+18,window.innerHeight-430))},children:[(0,V.jsx)(`div`,{className:`ren-hover-image-wrap`,children:(0,V.jsx)(`img`,{src:Li(F.image.id,t),alt:F.image.name})}),(0,V.jsx)(`div`,{className:`ren-hover-name`,title:F.image.name,children:F.image.name}),(0,V.jsxs)(`div`,{className:`ren-hover-meta`,children:[F.image.width,`×`,F.image.height,` · `,Ii(F.image.sizeBytes),` · `,F.image.extension.toUpperCase()]})]}),R.length>0&&ye&&(0,V.jsxs)(`div`,{className:`ren-drag-pill`,style:{left:Math.max(12,Math.min(ye.x+18,window.innerWidth-230)),top:Math.max(12,Math.min(ye.y+18,window.innerHeight-82))},children:[(0,V.jsx)(`strong`,{children:R.length}),(0,V.jsx)(`span`,{children:R.length>1?`images grouped`:`image ready`}),_e&&(0,V.jsx)(`small`,{children:`drag over cards to add`})]}),se&&(0,V.jsxs)(`div`,{className:`ren-preview-popover`,children:[(0,V.jsxs)(`div`,{className:`ren-preview-popover-head`,children:[(0,V.jsx)(`strong`,{children:`Rename Preview`}),(0,V.jsxs)(`div`,{className:`ren-preview-popover-actions`,children:[(0,V.jsx)(`button`,{className:`btn btn-secondary btn-sm`,onClick:mt,disabled:me||!t,children:`Refresh`}),(0,V.jsx)(`button`,{className:`ren-modal-close`,onClick:()=>ce(!1),children:`×`})]})]}),(0,V.jsx)(`div`,{className:`ren-resize-handle`,ref:Ee,onMouseDown:yt}),(0,V.jsxs)(`div`,{className:`ren-preview-panel`,style:{height:N},children:[(0,V.jsx)(`div`,{className:`ren-preview-table-wrap`,children:(0,V.jsxs)(`table`,{className:`ren-preview-table`,children:[(0,V.jsx)(`thead`,{children:(0,V.jsxs)(`tr`,{children:[(0,V.jsx)(`th`,{children:`Current Name`}),(0,V.jsx)(`th`,{}),(0,V.jsx)(`th`,{children:`Output Path`})]})}),(0,V.jsxs)(`tbody`,{children:[L.slice(0,50).map((e,t)=>(0,V.jsxs)(`tr`,{className:`ren-plan-${e.status||`rename`}`,children:[(0,V.jsx)(`td`,{children:e.oldName}),(0,V.jsx)(`td`,{className:`ren-arrow`,children:`→`}),(0,V.jsx)(`td`,{children:Wi(e)})]},t)),L.length===0&&(0,V.jsx)(`tr`,{children:(0,V.jsx)(`td`,{colSpan:3,className:`ren-table-empty`,children:`Click Preview to generate rename plan`})})]})]})}),(0,V.jsxs)(`div`,{className:`ren-summary-card`,children:[(0,V.jsxs)(`div`,{className:`ren-summary-item ren-summary-green`,children:[(0,V.jsx)(`strong`,{children:bt.renamed}),(0,V.jsx)(`span`,{children:`To rename`})]}),(0,V.jsxs)(`div`,{className:`ren-summary-item`,children:[(0,V.jsx)(`strong`,{children:bt.skipped}),(0,V.jsx)(`span`,{children:`Skipped`})]}),(0,V.jsxs)(`div`,{className:`ren-summary-item ${bt.conflicts>0?`ren-summary-amber`:``}`,children:[(0,V.jsx)(`strong`,{children:bt.conflicts}),(0,V.jsx)(`span`,{children:`Conflicts`})]})]})]})]}),(0,V.jsx)(`div`,{className:`ren-footer`,children:(0,V.jsxs)(`div`,{className:`ren-actions`,children:[(0,V.jsx)(`button`,{className:`btn btn-secondary btn-sm`,onClick:()=>ce(e=>!e),children:se?`Hide Preview`:`Show Preview`}),(0,V.jsxs)(`div`,{className:`ren-actions-right`,children:[(0,V.jsx)(`button`,{className:`btn btn-secondary`,onClick:D===`bulk`?ht:mt,disabled:me||!t,children:`Preview`}),(0,V.jsx)(`button`,{className:`btn btn-primary`,onClick:D===`bulk`?gt:_t,disabled:me||!t,children:I.outputMode===`copy`?`Copy`:`Rename`}),(0,V.jsx)(`button`,{className:`btn btn-secondary`,onClick:vt,disabled:me||!fe,children:`Undo`})]})]})}),M&&(0,V.jsx)(`div`,{className:`ren-modal-overlay`,onClick:()=>oe(!1),children:(0,V.jsxs)(`div`,{className:`ren-modal`,onClick:e=>e.stopPropagation(),children:[(0,V.jsxs)(`div`,{className:`ren-modal-header`,children:[(0,V.jsx)(`h3`,{children:`Rename Preview`}),(0,V.jsx)(`button`,{className:`ren-modal-close`,onClick:()=>oe(!1),children:`×`})]}),(0,V.jsx)(`div`,{className:`ren-modal-body`,children:(0,V.jsxs)(`table`,{className:`ren-preview-table ren-preview-table-full`,children:[(0,V.jsx)(`thead`,{children:(0,V.jsxs)(`tr`,{children:[(0,V.jsx)(`th`,{children:`#`}),(0,V.jsx)(`th`,{children:`Category`}),(0,V.jsx)(`th`,{children:`Current Name`}),(0,V.jsx)(`th`,{}),(0,V.jsx)(`th`,{children:`Output Path`}),(0,V.jsx)(`th`,{children:`Status`})]})}),(0,V.jsx)(`tbody`,{children:L.map((e,t)=>(0,V.jsxs)(`tr`,{className:`ren-plan-${e.status||`rename`}`,children:[(0,V.jsx)(`td`,{children:t+1}),(0,V.jsx)(`td`,{children:e.category}),(0,V.jsx)(`td`,{children:e.oldName}),(0,V.jsx)(`td`,{className:`ren-arrow`,children:`→`}),(0,V.jsx)(`td`,{children:Wi(e)}),(0,V.jsx)(`td`,{children:(0,V.jsx)(`span`,{className:`ren-status-badge ren-status-${e.status||`rename`}`,children:e.status||`rename`})})]},t))})]})}),(0,V.jsxs)(`div`,{className:`ren-modal-footer`,children:[(0,V.jsx)(`button`,{className:`btn btn-secondary`,onClick:()=>oe(!1),children:`Close`}),(0,V.jsx)(`button`,{className:`btn btn-primary`,onClick:()=>{oe(!1),D===`bulk`?gt():_t()},children:`Apply`})]})]})})]})}var Zi=`
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

.ren-mode-switch {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px;
  background: var(--bg-input);
  border: 1px solid var(--border);
  border-radius: 8px;
}

.ren-mode-switch button {
  height: 28px;
  padding: 0 10px;
  border: 1px solid transparent;
  border-radius: 6px;
  background: transparent;
  color: var(--text-secondary);
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
}

.ren-mode-switch button.active {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
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

.ren-column-source {
  border-color: rgba(56, 189, 248, 0.55);
  box-shadow: inset 0 0 0 1px rgba(56, 189, 248, 0.18);
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

.ren-source-hint,
.ren-drop-hint {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 32px;
  padding: 7px 9px;
  border-radius: 7px;
  font-size: 11px;
  font-weight: 700;
  text-align: center;
}

.ren-source-hint {
  border: 1px dashed rgba(56, 189, 248, 0.55);
  background: rgba(56, 189, 248, 0.09);
  color: #7dd3fc;
}

.ren-drop-hint {
  border: 1px solid rgba(249, 115, 22, 0.45);
  background: rgba(249, 115, 22, 0.12);
  color: var(--accent);
  box-shadow: 0 0 0 2px rgba(249, 115, 22, 0.08);
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

.ren-duplicate-hint {
  min-height: 28px;
  padding: 6px 8px;
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

.ren-duplicate-group-drop {
  border-color: var(--accent);
  box-shadow: 0 0 0 2px var(--accent-soft);
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

.ren-card-grouped {
  border-color: #38bdf8;
  background: rgba(56, 189, 248, 0.08);
  box-shadow: 0 0 0 1px rgba(56, 189, 248, 0.28);
  opacity: 1;
}

.ren-card-group-seed {
  box-shadow: inset 3px 0 0 #38bdf8, 0 0 0 1px rgba(56, 189, 248, 0.28);
}

.ren-card-can-group {
  border-style: dashed;
  border-color: rgba(56, 189, 248, 0.65);
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

.ren-chip-grouped {
  background: rgba(56, 189, 248, 0.16);
  color: #7dd3fc;
}

.ren-chip-can-group {
  background: rgba(249, 115, 22, 0.14);
  color: var(--accent);
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

.ren-bulk {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px 16px;
  overflow: auto;
  min-height: 0;
}

.ren-bulk-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px;
  background: var(--bg-primary);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  flex-shrink: 0;
}

.ren-bulk-summary {
  display: grid;
  grid-template-columns: repeat(5, minmax(70px, auto));
  gap: 10px;
}

.ren-bulk-summary div,
.ren-bulk-card-head > div,
.ren-bulk-field {
  display: flex;
  flex-direction: column;
}

.ren-bulk-summary span,
.ren-bulk-meta,
.ren-bulk-card-head span {
  color: var(--text-muted);
  font-size: 11px;
}

.ren-bulk-summary strong {
  color: var(--text-primary);
  font-size: 17px;
}

.ren-ok { color: var(--green) !important; }
.ren-warn { color: var(--yellow) !important; }

.ren-bulk-tools {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.ren-bulk-warning {
  padding: 9px 11px;
  border: 1px solid rgba(250, 204, 21, 0.35);
  border-radius: 8px;
  background: rgba(250, 204, 21, 0.08);
  color: var(--yellow);
  font-size: 12px;
  font-weight: 700;
}

.ren-bulk-empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 7px;
  min-height: 360px;
  border: 1px dashed var(--border-light);
  border-radius: var(--radius);
  color: var(--text-secondary);
}

.ren-bulk-empty strong {
  color: var(--text-primary);
}

.ren-bulk-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 12px;
  padding-bottom: 12px;
}

.ren-bulk-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px;
  background: var(--bg-primary);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}

.ren-bulk-card.ready { border-color: rgba(74, 222, 128, 0.35); }
.ren-bulk-card.missing { border-color: rgba(250, 204, 21, 0.35); }

.ren-bulk-card-head {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.ren-bulk-card-head > div {
  min-width: 0;
  gap: 3px;
}

.ren-bulk-card-head strong {
  color: var(--text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ren-bulk-status {
  align-self: flex-start;
  padding: 2px 7px;
  border-radius: 999px;
  background: var(--bg-card);
  color: var(--text-muted);
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
}

.ren-bulk-status.ready { color: var(--green); }
.ren-bulk-status.missing { color: var(--yellow); }

.ren-bulk-thumbs {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
  min-height: 54px;
}

.ren-bulk-thumbs img,
.ren-bulk-thumbs span {
  width: 100%;
  height: 54px;
  border-radius: 6px;
  border: 1px solid var(--border);
  background: var(--bg-input);
  object-fit: cover;
}

.ren-bulk-thumbs span {
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  font-size: 12px;
}

.ren-bulk-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.ren-bulk-meta span {
  padding: 2px 6px;
  border-radius: 5px;
  background: var(--bg-card);
}

.ren-bulk-field {
  gap: 4px;
  color: var(--text-secondary);
  font-size: 11px;
  font-weight: 700;
}

.ren-bulk-field input {
  height: 30px;
  background: var(--bg-input);
  border: 1px solid var(--border);
  border-radius: 7px;
  color: var(--text-primary);
  padding: 0 9px;
  font: inherit;
  outline: none;
}

.ren-bulk-field input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 2px var(--accent-soft);
}

.ren-bulk-card-actions {
  display: flex;
  justify-content: flex-end;
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

.ren-drag-pill {
  position: fixed;
  z-index: 1001;
  pointer-events: none;
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 8px;
  row-gap: 1px;
  align-items: center;
  min-width: 168px;
  padding: 9px 11px;
  border-radius: 8px;
  background: rgba(15, 23, 42, 0.94);
  border: 1px solid rgba(56, 189, 248, 0.55);
  box-shadow: var(--shadow-lg);
}

.ren-drag-pill strong {
  grid-row: span 2;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #38bdf8;
  color: #07111f;
  font-size: 14px;
  font-weight: 800;
}

.ren-drag-pill span {
  color: var(--text-primary);
  font-size: 12px;
  font-weight: 800;
  line-height: 1.1;
}

.ren-drag-pill small {
  color: var(--text-muted);
  font-size: 10px;
  line-height: 1.1;
}

/* ── Footer ── */
.ren-footer {
  flex-shrink: 0;
  border-top: 1px solid var(--border);
  background: var(--bg-card);
}

.ren-preview-popover {
  position: fixed;
  left: 248px;
  right: 28px;
  bottom: 72px;
  max-height: min(58vh, 560px);
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius);
  box-shadow: var(--shadow-lg);
  z-index: 45;
  overflow: hidden;
}

.ren-preview-popover-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 14px;
  border-bottom: 1px solid var(--border);
}

.ren-preview-popover-head strong {
  font-size: 13px;
  color: var(--text-primary);
}

.ren-preview-popover-actions {
  display: flex;
  align-items: center;
  gap: 8px;
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
  padding: 0 16px 12px;
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
`;function Qi(){return(0,V.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,V.jsx)(`rect`,{x:`3`,y:`3`,width:`7`,height:`7`,rx:`1`}),(0,V.jsx)(`rect`,{x:`14`,y:`3`,width:`7`,height:`7`,rx:`1`}),(0,V.jsx)(`rect`,{x:`3`,y:`14`,width:`7`,height:`7`,rx:`1`}),(0,V.jsx)(`rect`,{x:`14`,y:`14`,width:`7`,height:`7`,rx:`1`})]})}function $i(){return(0,V.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,V.jsx)(`path`,{d:`M9 11l3 3L22 4`}),(0,V.jsx)(`path`,{d:`M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11`})]})}function ea(){return(0,V.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,V.jsx)(`rect`,{x:`3`,y:`3`,width:`18`,height:`18`,rx:`2`}),(0,V.jsx)(`circle`,{cx:`8.5`,cy:`8.5`,r:`1.5`}),(0,V.jsx)(`path`,{d:`M21 15l-5-5L5 21`})]})}function ta(){return(0,V.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,V.jsx)(`rect`,{x:`3`,y:`4`,width:`18`,height:`16`,rx:`2`}),(0,V.jsx)(`path`,{d:`M7 15l3-3 2 2 3-4 2 3`}),(0,V.jsx)(`circle`,{cx:`8`,cy:`8`,r:`1`}),(0,V.jsx)(`path`,{d:`M17 7l3 3`}),(0,V.jsx)(`path`,{d:`M20 7l-3 3`})]})}function na(){return(0,V.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,V.jsx)(`rect`,{x:`3`,y:`4`,width:`18`,height:`16`,rx:`2`}),(0,V.jsx)(`path`,{d:`M7 8h10`}),(0,V.jsx)(`path`,{d:`M7 12h4`}),(0,V.jsx)(`path`,{d:`M14 12l3 3`}),(0,V.jsx)(`path`,{d:`M17 12l-3 3`}),(0,V.jsx)(`circle`,{cx:`9`,cy:`16`,r:`1`})]})}function ra(){return(0,V.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,V.jsx)(`rect`,{x:`2`,y:`4`,width:`2`,height:`16`}),(0,V.jsx)(`rect`,{x:`6`,y:`4`,width:`1.5`,height:`16`}),(0,V.jsx)(`rect`,{x:`10`,y:`4`,width:`2.5`,height:`16`}),(0,V.jsx)(`rect`,{x:`14`,y:`4`,width:`1`,height:`16`}),(0,V.jsx)(`rect`,{x:`17`,y:`4`,width:`2`,height:`16`}),(0,V.jsx)(`rect`,{x:`21`,y:`4`,width:`1`,height:`16`})]})}function ia(){return(0,V.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,V.jsx)(`path`,{d:`M17 3a2.83 2.83 0 114 4L7.5 20.5 2 22l1.5-5.5z`}),(0,V.jsx)(`path`,{d:`M15 5l4 4`})]})}function aa(){return(0,V.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,V.jsx)(`circle`,{cx:`12`,cy:`8`,r:`4`}),(0,V.jsx)(`path`,{d:`M5 21a7 7 0 0114 0`}),(0,V.jsx)(`path`,{d:`M18 3l1 2 2 1-2 1-1 2-1-2-2-1 2-1z`})]})}function oa(){return(0,V.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,V.jsx)(`path`,{d:`M4 19.5A2.5 2.5 0 016.5 17H20`}),(0,V.jsx)(`path`,{d:`M4 4.5A2.5 2.5 0 016.5 2H20v20H6.5A2.5 2.5 0 014 19.5z`}),(0,V.jsx)(`path`,{d:`M8 7h8`}),(0,V.jsx)(`path`,{d:`M8 11h6`}),(0,V.jsx)(`path`,{d:`M8 15h5`})]})}function sa(){return(0,V.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,V.jsx)(`circle`,{cx:`12`,cy:`12`,r:`3`}),(0,V.jsx)(`path`,{d:`M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z`})]})}function ca(){return(0,V.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,V.jsx)(`circle`,{cx:`11`,cy:`11`,r:`8`}),(0,V.jsx)(`path`,{d:`M21 21l-4.35-4.35`})]})}function la(){return(0,V.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,V.jsx)(`path`,{d:`M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9`}),(0,V.jsx)(`path`,{d:`M13.73 21a2 2 0 01-3.46 0`})]})}function ua(){return(0,V.jsx)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:(0,V.jsx)(`path`,{d:`M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z`})})}function da(){return(0,V.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,V.jsx)(`path`,{d:`M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4`}),(0,V.jsx)(`polyline`,{points:`17 8 12 3 7 8`}),(0,V.jsx)(`line`,{x1:`12`,y1:`3`,x2:`12`,y2:`15`})]})}function fa(){return(0,V.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,V.jsx)(`line`,{x1:`5`,y1:`12`,x2:`19`,y2:`12`}),(0,V.jsx)(`polyline`,{points:`12 5 19 12 12 19`})]})}function pa(){return(0,V.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,V.jsx)(`line`,{x1:`3`,y1:`12`,x2:`21`,y2:`12`}),(0,V.jsx)(`line`,{x1:`3`,y1:`6`,x2:`21`,y2:`6`}),(0,V.jsx)(`line`,{x1:`3`,y1:`18`,x2:`21`,y2:`18`})]})}function ma(){return(0,V.jsx)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:(0,V.jsx)(`polyline`,{points:`9 18 15 12 9 6`})})}function ha(){return(0,V.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,V.jsx)(`circle`,{cx:`12`,cy:`12`,r:`5`}),(0,V.jsx)(`line`,{x1:`12`,y1:`1`,x2:`12`,y2:`3`}),(0,V.jsx)(`line`,{x1:`12`,y1:`21`,x2:`12`,y2:`23`}),(0,V.jsx)(`line`,{x1:`4.22`,y1:`4.22`,x2:`5.64`,y2:`5.64`}),(0,V.jsx)(`line`,{x1:`18.36`,y1:`18.36`,x2:`19.78`,y2:`19.78`}),(0,V.jsx)(`line`,{x1:`1`,y1:`12`,x2:`3`,y2:`12`}),(0,V.jsx)(`line`,{x1:`21`,y1:`12`,x2:`23`,y2:`12`}),(0,V.jsx)(`line`,{x1:`4.22`,y1:`19.78`,x2:`5.64`,y2:`18.36`}),(0,V.jsx)(`line`,{x1:`18.36`,y1:`5.64`,x2:`19.78`,y2:`4.22`})]})}function ga(){return(0,V.jsx)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:(0,V.jsx)(`path`,{d:`M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z`})})}function _a(){return(0,V.jsx)(`img`,{src:`/icons/logo.png`,alt:`GRIMOIRE`,style:{width:28,height:28,borderRadius:6,objectFit:`contain`}})}var va={"/":`1`,"/data-qc":`2`,"/image-edit":`3`,"/images-check":`4`,"/packshot-browser":`5`,"/ean-sorter":`6`,"/ean-renamer":`7`,"/guide":`9`,"/credits":`0`},ya=[{to:`/`,label:`Dashboard`,icon:Qi,img:null,mono:!1},{to:`/data-qc`,label:`Data QC`,icon:$i,img:`/icons/data-qc.png`,mono:!1},{to:`/image-edit`,label:`Image Edit`,icon:ea,img:`/icons/image-edit.png`,mono:!1},{to:`/images-check`,label:`Images Check`,icon:ta,img:null,mono:!1},{to:`/packshot-browser`,label:`Packshot Browser`,icon:na,img:`/icons/ean-sorter-gallery.png`,mono:!1},{to:`/ean-sorter`,label:`EAN Sorter`,icon:ra,img:`/icons/ean-sorter.png`,mono:!0},{to:`/ean-renamer`,label:`EAN Renamer`,icon:ia,img:`/icons/ean-renamer.png`,mono:!1},{to:`/guide`,label:`Guide`,icon:oa,img:null,mono:!1},{to:`/credits`,label:`Credits`,icon:aa,img:null,mono:!1}];function ba({collapsed:e,onToggle:t,onOpenSettings:n}){return(0,V.jsxs)(`nav`,{className:`sidebar ${e?`collapsed`:``}`,children:[(0,V.jsxs)(`div`,{className:`sidebar-brand`,children:[(0,V.jsx)(_a,{}),!e&&(0,V.jsx)(`span`,{className:`sidebar-brand-text`,children:`GRIMOIRE`})]}),(0,V.jsxs)(`div`,{className:`sidebar-nav`,children:[!e&&(0,V.jsx)(`div`,{className:`sidebar-section-label`,children:`Main`}),ya.map(t=>(0,V.jsxs)(xn,{to:t.to,end:t.to===`/`,className:({isActive:e})=>`sidebar-link ${e?`active`:``}`,title:e?t.label:void 0,children:[t.img?(0,V.jsx)(`img`,{src:t.img,alt:``,className:`sidebar-link-img${t.mono?` icon-mono`:``}`}):(0,V.jsx)(t.icon,{}),!e&&(0,V.jsx)(`span`,{className:`sidebar-link-text`,children:t.label}),!e&&va[t.to]&&(0,V.jsxs)(`kbd`,{className:`sidebar-kbd`,children:[`Ctrl+`,va[t.to]]})]},t.to))]}),(0,V.jsxs)(`div`,{className:`sidebar-bottom`,children:[(0,V.jsxs)(`button`,{className:`sidebar-link sidebar-link-btn`,onClick:n,title:e?`Settings`:void 0,children:[(0,V.jsx)(sa,{}),!e&&(0,V.jsx)(`span`,{className:`sidebar-link-text`,children:`Settings`})]}),(0,V.jsxs)(`button`,{className:`sidebar-link sidebar-link-btn`,onClick:t,title:e?`Expand sidebar`:`Collapse sidebar`,children:[(0,V.jsx)(pa,{}),!e&&(0,V.jsx)(`span`,{className:`sidebar-link-text`,children:`Collapse`})]})]})]})}var xa={"/":`Dashboard`,"/data-qc":`Data Quality Control`,"/image-edit":`Image Edit`,"/images-check":`Images Check`,"/packshot-browser":`Packshot Browser`,"/ean-sorter":`EAN Sorter`,"/ean-renamer":`EAN Renamer`,"/guide":`Guide`,"/credits":`Credits`};function Sa(){let e=$e(),t=xa[e.pathname]??`Page`;return(0,V.jsxs)(`div`,{className:`breadcrumb`,children:[e.pathname!==`/`&&(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)(xn,{to:`/`,className:`breadcrumb-link`,children:`Dashboard`}),(0,V.jsx)(ma,{})]}),(0,V.jsx)(`span`,{className:`breadcrumb-current`,children:t})]})}function Ca({open:e,onClose:t}){let{notifications:n,markAllRead:r,dismiss:i,clearAll:a}=Gn(),o=(0,_.useRef)(null);if((0,_.useEffect)(()=>{if(!e)return;let n=e=>{o.current&&!o.current.contains(e.target)&&t()};return document.addEventListener(`mousedown`,n),()=>document.removeEventListener(`mousedown`,n)},[e,t]),!e)return null;let s=e=>{let t=Math.floor((Date.now()-e)/1e3);return t<60?`just now`:t<3600?`${Math.floor(t/60)}m ago`:t<86400?`${Math.floor(t/3600)}h ago`:`${Math.floor(t/86400)}d ago`};return(0,V.jsxs)(`div`,{className:`notif-panel`,ref:o,children:[(0,V.jsxs)(`div`,{className:`notif-panel-header`,children:[(0,V.jsx)(`h3`,{children:`Notifications`}),(0,V.jsxs)(`div`,{className:`notif-panel-actions`,children:[(0,V.jsx)(`button`,{onClick:r,children:`Mark all read`}),(0,V.jsx)(`button`,{onClick:a,children:`Clear`})]})]}),(0,V.jsx)(`div`,{className:`notif-panel-body`,children:n.length===0?(0,V.jsx)(`div`,{className:`notif-empty`,children:`No notifications yet`}):n.map(e=>(0,V.jsxs)(`div`,{className:`notif-item ${e.read?``:`unread`} notif-${e.type}`,children:[(0,V.jsx)(`div`,{className:`notif-dot`}),(0,V.jsxs)(`div`,{className:`notif-content`,children:[(0,V.jsx)(`div`,{className:`notif-title`,children:e.title}),e.message&&(0,V.jsx)(`div`,{className:`notif-msg`,children:e.message}),(0,V.jsx)(`div`,{className:`notif-time`,children:s(e.timestamp)})]}),(0,V.jsx)(`button`,{className:`notif-dismiss`,onClick:()=>i(e.id),children:`âœ•`})]},e.id))})]})}var wa=`2026.06.22.3`,Ta=[{to:`/`,title:`Dashboard`,desc:`Overview, releases, quick actions`,keywords:[`home`,`dashboard`,`main`,`release`]},{to:`/data-qc`,title:`Data QC`,desc:`Audit master data and generate reports`,keywords:[`data`,`qc`,`audit`,`master`,`report`,`quality`]},{to:`/image-edit`,title:`Image Edit`,desc:`Batch resize, canvas, upscale, export`,keywords:[`image`,`edit`,`upscale`,`resize`,`background`,`canvas`]},{to:`/images-check`,title:`Images Check`,desc:`Scan folders and delete rejected images`,keywords:[`images`,`check`,`delete`,`clean`,`review`,`gallery`,`slideshow`]},{to:`/packshot-browser`,title:`Packshot Browser`,desc:`Browse synced packshot folders, hover preview, select, copy, and export reports`,keywords:[`packshot`,`browser`,`finder`,`preview`,`hover`,`onedrive`,`copy`,`ean`]},{to:`/ean-sorter`,title:`EAN Sorter`,desc:`Scan EANs and sort files into folders`,keywords:[`ean`,`sort`,`sorter`,`barcode`,`folder`,`status`]},{to:`/ean-renamer`,title:`EAN Renamer`,desc:`Rename or copy product images by EAN`,keywords:[`ean`,`rename`,`renamer`,`copy`,`packshot`,`product name`]},{to:`/guide`,title:`Guide`,desc:`When to use each tab and how to handle common cases`,keywords:[`guide`,`help`,`how`,`workflow`,`tab`,`case`,`huong dan`]},{to:`/credits`,title:`Credits`,desc:`MDX team credits`,keywords:[`credits`,`team`,`about`]}],Ea=[`Run Preview before any in-folder rename so conflicts are visible before files move.`,`Images Check scans every subfolder, so point it at the highest product folder you trust.`,`Packshot Browser scans filenames first, then loads previews on demand so synced OneDrive folders stay responsive.`,`Use EAN_ProductName in EAN Renamer only when the product name should control continuous numbering.`,`EAN Sorter writes EAN_report.xlsx in the scanned folder after sorting.`,`Use Copy mode first when testing a new naming rule.`,`The top search can jump to tools or reveal files in recent output folders.`];function Da(e,t){let n=t.trim().toLowerCase();return n?`${e.title} ${e.desc} ${e.keywords.join(` `)}`.toLowerCase().includes(n):!1}function Oa(){let e=new Set,t=t=>{if(t)try{let n=JSON.parse(t);Array.isArray(n)?n.forEach(t=>typeof t==`string`&&e.add(t)):n&&typeof n==`object`?Object.values(n).forEach(t=>typeof t==`string`&&e.add(t)):typeof n==`string`&&e.add(n)}catch{e.add(t)}};return t(localStorage.getItem(`grimoire-ean-renamer-output-roots`)),t(localStorage.getItem(`grimoire-ean-sorter-root`)),t(localStorage.getItem(`grimoire-images-check-root`)),t(localStorage.getItem(`grimoire-packshot-browser-root`)),Array.from(e)}function ka(e){return e<1024?`${e} B`:e<1024*1024?`${(e/1024).toFixed(1)} KB`:`${(e/1024/1024).toFixed(2)} MB`}function Aa(){let e=nt(),{notify:t}=Gn(),[n,r]=(0,_.useState)(``),[i,a]=(0,_.useState)([]),[o,s]=(0,_.useState)(!1),c=(0,_.useMemo)(()=>Ta.filter(e=>Da(e,n)).slice(0,6),[n]);(0,_.useEffect)(()=>{let e=n.trim();if(e.length<2){a([]);return}let t=Oa();if(t.length===0){a([]);return}let r=window.setTimeout(async()=>{try{a((await H(`/api/search/files`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({query:e,roots:t,extensions:[`.jpg`,`.jpeg`,`.png`,`.webp`,`.tif`,`.tiff`,`.bmp`,`.avif`],limit:40})})).results||[])}catch{a([])}},250);return()=>window.clearTimeout(r)},[n]);let l=e=>{window.__grimoire?.revealInExplorer?window.__grimoire.revealInExplorer(e):H(`/api/local/reveal`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({path:e})}),t(`Opening output location`,{type:`info`}),s(!1)},u=o&&n.trim().length>0;return(0,V.jsxs)(`div`,{className:`topbar-search command-search`,children:[(0,V.jsx)(ca,{}),(0,V.jsx)(`input`,{type:`text`,value:n,onChange:e=>r(e.target.value),onFocus:()=>s(!0),onKeyDown:t=>{t.key===`Enter`&&c[0]&&(e(c[0].to),s(!1)),t.key===`Escape`&&s(!1)},placeholder:`Search features, tools, output files...`}),u&&(0,V.jsxs)(`div`,{className:`command-results`,onMouseDown:e=>e.preventDefault(),children:[c.length>0&&(0,V.jsx)(`div`,{className:`command-label`,children:`Tools`}),c.map(t=>(0,V.jsxs)(`button`,{className:`command-row`,onClick:()=>{e(t.to),s(!1)},children:[(0,V.jsx)(`strong`,{children:t.title}),(0,V.jsx)(`span`,{children:t.desc}),(0,V.jsx)(`em`,{children:t.keywords.slice(0,5).join(` · `)})]},t.to)),i.length>0&&(0,V.jsx)(`div`,{className:`command-label`,children:`Output files`}),i.map(e=>(0,V.jsxs)(`button`,{className:`command-row file`,onClick:()=>l(e.path),children:[(0,V.jsx)(`strong`,{children:e.name}),(0,V.jsx)(`span`,{children:e.relativePath}),(0,V.jsxs)(`em`,{children:[e.width&&e.height?`${e.width}x${e.height} · `:``,ka(e.sizeBytes)]})]},e.path)),c.length===0&&i.length===0&&(0,V.jsx)(`div`,{className:`command-empty`,children:`No matching tool or recent output file.`})]})]})}function ja({collapsed:e}){let{theme:t,toggle:n}=Vn(),{unreadCount:r}=Gn(),[i,a]=(0,_.useState)(null),[o,s]=(0,_.useState)(!1);return(0,_.useEffect)(()=>{let e=()=>fetch(qn(`/health`)).then(e=>e.ok&&a(!0)).catch(()=>a(!1));e();let t=setInterval(e,3e4);return()=>clearInterval(t)},[]),(0,V.jsxs)(`header`,{className:`topbar`,style:{left:e?`var(--sidebar-collapsed)`:`var(--sidebar-width)`},children:[(0,V.jsx)(Sa,{}),(0,V.jsx)(Aa,{}),(0,V.jsx)(`div`,{className:`topbar-spacer`}),(0,V.jsxs)(`div`,{className:`topbar-actions`,children:[i!==null&&(0,V.jsxs)(`span`,{className:`status-online ${i?``:`offline`}`,children:[(0,V.jsx)(`span`,{className:`dot`}),i?`Online`:`Offline`]}),(0,V.jsx)(`button`,{className:`topbar-btn`,onClick:n,title:`Switch to ${t===`dark`?`light`:`dark`} mode`,children:t===`dark`?(0,V.jsx)(ha,{}):(0,V.jsx)(ga,{})}),(0,V.jsxs)(`div`,{style:{position:`relative`},children:[(0,V.jsxs)(`button`,{className:`topbar-btn`,onClick:()=>s(!o),children:[(0,V.jsx)(la,{}),r>0&&(0,V.jsx)(`span`,{className:`badge`,children:r>9?`9+`:r})]}),(0,V.jsx)(Ca,{open:o,onClose:()=>s(!1)})]}),(0,V.jsxs)(`div`,{className:`topbar-user`,children:[(0,V.jsx)(`img`,{src:`/icons/tray.png`,alt:``,className:`topbar-avatar-img`}),(0,V.jsx)(`span`,{className:`topbar-username`,children:`GRIMOIRE`})]})]})]})}var Ma=[{to:`/data-qc`,title:`Data Quality Control`,desc:`Audit master data, validate fields, generate quality reports`,icon:$i,img:`/icons/data-qc.png`,mono:!1,gradient:`linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)`},{to:`/image-edit`,title:`Image Edit`,desc:`AI background removal, upscaling, batch canvas editing`,icon:ea,img:`/icons/image-edit.png`,mono:!1,gradient:`linear-gradient(135deg, #0891b2 0%, #0e7490 100%)`},{to:`/packshot-browser`,title:`Packshot Browser`,desc:`Browse synced packshot folders, hover preview images, select files, and copy them to output`,icon:na,img:`/icons/ean-sorter-gallery.png`,mono:!1,gradient:`linear-gradient(135deg, #0f766e 0%, #2563eb 100%)`},{to:`/ean-sorter`,title:`EAN Sorter`,desc:`Scan folders for EAN barcodes, sort files into organized structure`,icon:ra,img:`/icons/ean-sorter.png`,mono:!0,gradient:`linear-gradient(135deg, #059669 0%, #047857 100%)`},{to:`/ean-renamer`,title:`EAN Renamer`,desc:`Batch rename product images by EAN with drag-and-drop`,icon:ia,img:`/icons/ean-renamer.png`,mono:!1,gradient:`linear-gradient(135deg, #d97706 0%, #b45309 100%)`}],Na=[{to:`/ean-sorter`,title:`Scan Folder`,desc:`Quick-scan a folder for EAN barcodes`,icon:ua,bg:`#059669`},{to:`/image-edit`,title:`Batch Process`,desc:`Upload images for bulk editing`,icon:da,bg:`#0891b2`},{to:`/data-qc`,title:`Run Audit`,desc:`Start a data quality check`,icon:$i,bg:`#4f46e5`}],Pa=[{img:`/icons/banner-data-qc.jpg`,to:`/data-qc`,title:`Data Quality Control`,desc:`Audit master data, validate fields, generate missing data reports and quality checks across brands.`,btn:`Open Data QC`},{img:`/icons/banner-image-edit.jpg`,to:`/image-edit`,title:`Image Edit`,desc:`AI-powered background removal, smart upscaling, batch canvas editing for product images.`,btn:`Open Image Edit`},{img:`/icons/banner-ean-sorter.jpg`,to:`/ean-sorter`,title:`EAN Sorter`,desc:`Scan folders for EAN barcodes, sort files into organized structure, and categorize by product status.`,btn:`Open EAN Sorter`},{img:`/icons/banner-ean-renamer.jpg`,to:`/ean-renamer`,title:`EAN Renamer`,desc:`Batch rename product images by EAN with drag-and-drop, multiple naming modes and category support.`,btn:`Open EAN Renamer`}],Fa=[{version:`2026.06.23.2`,date:`2026-06-23`,title:`EAN Renamer Bulk Working phase one`,type:`EAN Renamer`,changes:[`Added a Bulk Working subview for scanning a root folder into folder work items with image counts, excluding video formats.`,`Bulk cards support manual EAN/Product Name entry plus TXT/Excel mapping or master-data matching before preview.`,`Bulk preview and copy reuse the existing EAN Renamer naming/output rules with per-folder EAN and product data.`]},{version:`2026.06.23.1`,date:`2026-06-23`,title:`EAN Renamer drag group clarity`,type:`EAN Renamer`,changes:[`Drag grouping now shows a live floating count so users know exactly how many images are being moved.`,`Cards added to the drag group use a dedicated grouped style and badges separate from checkbox selection.`,`Drop targets now explain whether the images will move to a column, create a Duplicate group, or add to an existing group.`]},{version:`2026.06.23.0`,date:`2026-06-23`,title:`EAN Renamer drag grouping and dynamic outputs`,type:`EAN Renamer`,changes:[`Dragging an image no longer moves unrelated checked images; groups are formed by dragging across cards in the same source column.`,`The rename preview panel is now a floating pop-up that can be shown or hidden without shrinking the board.`,`Added categories now automatically get matching output slots and Duplicate boxes using the same naming rules as existing columns.`]},{version:`2026.06.22.3`,date:`2026-06-22`,title:`Packshot folder and thumbnail hotfix`,type:`Packshot Browser`,changes:[`Selecting a parent folder now shows images from its child folders, matching the folder counts in the sidebar.`,`Cloud-only OneDrive thumbnails now use Windows Explorer cached bitmaps more reliably without downloading original files.`,`The large-folder workflow keeps progressive thumbnail loading while fixing empty parent-folder views.`]},{version:`2026.06.22.2`,date:`2026-06-22`,title:`Guide details and banner readability`,type:`Guide + Interface`,changes:[`Expanded the Guide tab in English with detailed purpose, key features, step-by-step usage, common cases, and notes for each tool tab.`,`Updated USER_GUIDE.txt so the external guide matches the in-app English documentation.`,`Improved dashboard banner text contrast with a dedicated readable overlay treatment across dark and light themes.`]},{version:`2026.06.22.1`,date:`2026-06-22`,title:`English in-app guide`,type:`Guide`,changes:[`Added a Guide tab to the sidebar and command search.`,`Documented when to use each GRIMOIRE tab, safe workflow habits, and common support steps.`,`Refreshed the desktop build with the new guide route and updated build version.`]},{version:`2026.06.22.1`,date:`2026-06-22`,title:`Large-folder Packshot Browser`,type:`Packshot Browser`,changes:[`Packshot Browser now indexes folder metadata first instead of sending every image to the UI at once.`,`The left panel prioritizes the real folder tree with image counts; the gallery loads only the selected folder.`,`Thumbnails load progressively with a limited queue so very large OneDrive and local folders stay responsive.`]},{version:`2026.06.22.0`,date:`2026-06-22`,title:`Persistent Image Edit presets and output history`,type:`Image Edit`,changes:[`Custom Image Edit dimension presets can now be saved and reused after reopening the app.`,`Preview and completed job outputs now stay visible in the Outputs panel instead of replacing the previous result.`,`Local folder output now writes each Image Edit folder job into a timestamped run folder to avoid overwriting older output.`]},{version:`2026.06.19.0`,date:`2026-06-19`,title:`Packshot Browser tab`,type:`Packshot Browser`,changes:[`Added a dedicated Packshot Browser tab for scanning synced folders without requiring Excel input.`,`Images can be searched by EAN, folder, filename, and product keywords with hover previews and detailed file metadata.`,`Selected images can be copied to an output folder with folder preservation or EAN grouping plus a CSV report.`]},{version:`2026.06.18.2`,date:`2026-06-18`,title:`Faster Images Check browsing`,type:`Images Check`,changes:[`Image tiles now load cached thumbnails instead of full-size product images.`,`Hover previews no longer rerender continuously while the cursor moves.`,`Folder sections use browser render containment to keep large scans smoother.`]},{version:`2026.06.18.1`,date:`2026-06-18`,title:`Folder-aware Images Check gallery`,type:`Images Check + Interface`,changes:[`Images Check now groups scanned images by source folder and subfolder so review decisions stay tied to the exact file location.`,`Gallery view now uses horizontal folder lanes with per-image Keep and Delete actions.`,`Command start screen typography is more compact and removes the duplicated GRIMOIRE title effect.`]},{version:`2026.06.18.0`,date:`2026-06-18`,title:`Images Check, quick search, and fullscreen fit`,type:`Interface + Desktop`,changes:[`Added Images Check with recursive folder scanning, slideshow/gallery review modes, image hover details, and confirmed permanent deletion.`,`Startup fallback now opens a GRIMOIRE command search screen with build information and rotating app tips.`,`Top search can jump to tools and reveal matching output files from EAN Sorter, EAN Renamer, and Images Check.`,`Desktop window sizing now uses the full screen work area when maximized.`]},{version:`2026.06.16.8`,date:`2026-06-16`,title:`DPI-aware window sizing and scroll safety`,type:`Desktop + Interface`,changes:[`Desktop window now clamps itself to the active screen work area for 125% and 150% display scaling.`,`Main app content now scrolls inside the viewport so tool panels and actions are not clipped.`,`Topbar spacing becomes more compact on narrow or scaled screens.`]},{version:`2026.06.16.7`,date:`2026-06-16`,title:`Status folder jobs, master data cache, and image output structure`,type:`EAN Sorter + Data QC + Image Edit`,changes:[`EAN Sorter status folder creation now runs as a background job with progress polling.`,`Master Data reads are cached by file timestamp and size to reduce repeated Excel parsing.`,`Image Edit no longer creates one output folder per root-level image filename EAN.`]},{version:`2026.06.16.6`,date:`2026-06-16`,title:`Duplicate group numbering and backend stability`,type:`EAN Renamer + Desktop`,changes:[`Duplicate column now supports multiple groups per category.`,`Prefixed naming keeps JPG/PNG variants in the same duplicate group on the same number.`,`Desktop host now monitors the backend and refreshes the API port after automatic restart.`]},{version:`2026.06.16.5`,date:`2026-06-16`,title:`Credits tab`,type:`Interface`,changes:[`Added a dedicated Credits tab in the main sidebar.`,`Credits page lists MDX Team ownership and contributor roles.`,`Keyboard navigation now supports Ctrl+6 for Credits.`]},{version:`2026.06.16.4`,date:`2026-06-16`,title:`Master Data tab & Status folder creation`,type:`Data QC + EAN Sorter`,changes:[`New Master Data tab: upload DQC report + master data, select brand, generate Missing_Data and Status files.`,`EAN Sorter Categorize: upload status file to create product folders organized by status with EAN subfolders.`,`Prefixed naming now uses full category names (Pack_shot, Human, etc.) with per-category numbering.`]},{version:`2026.06.16.2`,date:`2026-06-16`,title:`EAN Renamer output isolation`,type:`EAN Renamer`,changes:[`Lifestyle/Human and Lifestyle/Normal copy outputs now create an EAN subfolder.`,`Packshot and Artwork continue to output into category/EAN folders.`,`Desktop startup now avoids reusing old backend processes.`]},{version:`2026.06.16.1`,date:`2026-06-16`,title:`Prefixed naming and duplicate first-shot handling`,type:`EAN Renamer`,changes:[`Prefixed mode supports duplicate JPG/PNG variants sharing the same first-shot number.`,`Product Name only uses EAN_ProductName naming when the checkbox is enabled.`,`Custom EAN works with both Prefixed and EAN_ProductName naming flows.`]},{version:`2026.06.16.0`,date:`2026-06-16`,title:`Portability and support scripts`,type:`System`,changes:[`Removed machine-specific path assumptions from desktop and startup scripts.`,`Added setup, repair, and diagnostic scripts for testers on other Windows machines.`,`Added installation, user, and SOP documentation files.`]},{version:`2026.06.15`,date:`2026-06-15`,title:`Unified GRIMOIRE desktop toolkit`,type:`Platform`,changes:[`Integrated Data QC, Image Edit, EAN Sorter, and EAN Renamer into one desktop shell.`,`Added WebView2 desktop wrapper with local backend bridge.`,`Added initial dashboard, navigation, and shared UI structure.`]}];function Ia(){let e=nt(),{notify:t}=Gn(),[n,r]=(0,_.useState)(()=>Math.floor(Math.random()*Pa.length)),i=(0,_.useRef)(null),a=(0,_.useCallback)(()=>{i.current&&clearInterval(i.current),i.current=setInterval(()=>{r(e=>(e+1)%Pa.length)},6e3)},[]);(0,_.useEffect)(()=>(t(`Welcome to GRIMOIRE`,{type:`info`,message:`All systems operational`,browser:!1}),a(),()=>{i.current&&clearInterval(i.current)}),[]);let o=e=>{r(e),a()},s=Pa[n],c=Fa[0];return(0,V.jsxs)(`div`,{className:`view`,children:[(0,V.jsxs)(`div`,{className:`hero changelog-hero`,children:[(0,V.jsxs)(`div`,{className:`hero-visual changelog-visual`,style:{position:`relative`,overflow:`hidden`},children:[Pa.map((e,t)=>(0,V.jsx)(`div`,{style:{position:`absolute`,inset:0,backgroundImage:`url(${e.img})`,backgroundSize:`cover`,backgroundPosition:`center`,opacity:+(t===n),transition:`opacity 0.8s ease`}},e.to)),(0,V.jsx)(`div`,{style:{position:`absolute`,inset:0,background:`linear-gradient(135deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 60%, rgba(0,0,0,0.3) 100%)`}}),(0,V.jsxs)(`div`,{className:`hero-content dashboard-banner-copy`,style:{position:`relative`,zIndex:2},children:[(0,V.jsx)(`h1`,{children:s.title}),(0,V.jsx)(`p`,{children:s.desc}),(0,V.jsxs)(`button`,{className:`hero-btn`,style:{marginTop:14},onClick:()=>e(s.to),children:[s.btn,` `,(0,V.jsx)(fa,{})]}),(0,V.jsx)(`div`,{style:{display:`flex`,gap:8,marginTop:16},children:Pa.map((e,t)=>(0,V.jsx)(`button`,{onClick:()=>o(t),style:{width:t===n?28:10,height:10,borderRadius:5,border:`none`,background:t===n?`#fff`:`rgba(255,255,255,0.4)`,cursor:`pointer`,transition:`all 0.3s ease`,padding:0}},t))})]})]}),(0,V.jsxs)(`div`,{className:`hero-info changelog-summary`,children:[(0,V.jsx)(`h3`,{children:`Latest Update`}),(0,V.jsx)(`span`,{className:`changelog-type`,style:{marginBottom:6,display:`inline-block`},children:c.type}),(0,V.jsx)(`h4`,{style:{margin:`4px 0 8px`,fontSize:`1rem`},children:c.title}),(0,V.jsx)(`ul`,{style:{margin:0,paddingLeft:18,fontSize:`0.85rem`,opacity:.85,lineHeight:1.6},children:c.changes.map(e=>(0,V.jsx)(`li`,{children:e},e))}),(0,V.jsxs)(`div`,{style:{fontSize:`0.78rem`,opacity:.5,marginTop:10},children:[`v`,c.version,` · `,c.date]})]})]}),(0,V.jsx)(`div`,{className:`section-header`,children:(0,V.jsx)(`h2`,{children:`Features`})}),(0,V.jsx)(`div`,{className:`card-grid`,children:Ma.map(e=>(0,V.jsxs)(xn,{to:e.to,className:`feature-card`,children:[(0,V.jsx)(`div`,{className:`feature-card-cover`,children:(0,V.jsx)(`div`,{className:`feature-card-gradient`,style:{background:e.gradient},children:(0,V.jsx)(`img`,{src:e.img,alt:e.title,className:`feature-card-icon-img${e.mono?` icon-mono`:``}`})})}),(0,V.jsxs)(`div`,{className:`feature-card-body`,children:[(0,V.jsx)(`h3`,{children:e.title}),(0,V.jsx)(`p`,{children:e.desc}),(0,V.jsxs)(`div`,{className:`feature-card-status`,children:[(0,V.jsx)(`span`,{className:`dot`}),`Ready`]})]})]},e.to))}),(0,V.jsx)(`div`,{className:`section-header`,children:(0,V.jsx)(`h2`,{children:`Quick Actions`})}),(0,V.jsx)(`div`,{className:`quick-actions`,children:Na.map(e=>(0,V.jsxs)(xn,{to:e.to,className:`quick-action`,children:[(0,V.jsx)(`div`,{className:`quick-action-icon`,style:{background:e.bg},children:(0,V.jsx)(e.icon,{})}),(0,V.jsxs)(`div`,{className:`quick-action-text`,children:[(0,V.jsx)(`h4`,{children:e.title}),(0,V.jsx)(`p`,{children:e.desc})]})]},e.title))}),(0,V.jsx)(`div`,{className:`section-header`,children:(0,V.jsx)(`h2`,{children:`Release Notes`})}),(0,V.jsx)(`div`,{className:`changelog-list`,children:Fa.map(e=>(0,V.jsxs)(`article`,{className:`changelog-entry`,children:[(0,V.jsxs)(`div`,{className:`changelog-entry-head`,children:[(0,V.jsxs)(`div`,{children:[(0,V.jsx)(`span`,{className:`changelog-type`,children:e.type}),(0,V.jsx)(`h3`,{children:e.title})]}),(0,V.jsxs)(`div`,{className:`changelog-meta`,children:[(0,V.jsx)(`strong`,{children:e.version}),(0,V.jsx)(`span`,{children:e.date})]})]}),(0,V.jsx)(`ul`,{children:e.changes.map(e=>(0,V.jsx)(`li`,{children:e},e))})]},e.version))})]})}var La=[[`Data QC`,`Audit master data files, find missing data, rule issues, duplicates, and export review reports.`],[`Image Edit`,`Batch process product images: resize, canvas, background cleanup, upscale, naming, and export.`],[`Images Check`,`Review image folders visually, mark bad images, and delete only after confirmation.`],[`Packshot Browser`,`Search synced packshot folders by EAN, filename, folder, or keyword, then copy selected files.`],[`EAN Sorter`,`Scan images for barcodes or EANs and sort files into EAN/status folders.`],[`EAN Renamer`,`Copy or rename product images by EAN, category, product name, duplicate groups, and naming mode.`]],Ra=[{title:`Data QC`,purpose:`Use Data QC when the source is a master data Excel or CSV file and the goal is to find data quality issues before the file moves to the next workflow.`,features:[`Upload or select master data files.`,`Audit required fields, missing values, invalid formats, duplicates, and configured rule checks.`,`Generate Excel reports for review, correction, and team handoff.`,`Use rule profile settings when the validation scope needs to match the current business rules.`],steps:[`Open Data QC.`,`Select the master data file.`,`Choose audit options if the tab exposes them for the current workflow.`,`Run the audit and wait for the job to finish.`,`Review the summary and exported report.`,`Fix the source data, then run the audit again if needed.`],cases:[`Use it before sending master data to operations, marketplace upload, or another system.`,`Use it when product records are rejected because fields are missing or inconsistent.`,`Use it when a team needs a report showing what must be corrected.`],notes:[`If the file cannot be read, check sheet names, header rows, merged cells, and whether the file is actually an exported report instead of the original master data.`,`Keep the original input file separate from the generated report.`]},{title:`Image Edit`,purpose:`Use Image Edit when images need batch processing for marketplace or catalog output.`,features:[`Add individual image files or process an input folder.`,`Use built-in dimension presets or save custom dimension presets for later sessions.`,`Control width, height, aspect lock, fit mode, margins, DPI, canvas background, and layout preset.`,`Use image filters such as whitespace removal, product fill, safe padding, white background checks, shadow removal, and background removal.`,`Use standard upscale or Real-ESRGAN when local AI tools are available.`,`Choose output format, quality, max file size, naming rule, and local or ZIP output.`,`Keep recent previews and completed job outputs in the Outputs panel instead of replacing the previous result.`],steps:[`Open Image Edit.`,`Choose files with Add, or select an input folder.`,`Pick a dimension preset or enter Width and Height manually.`,`Click Save next to Dimension Preset if this size should be reused later.`,`Choose layout, canvas, upscale, filter, output, and naming settings.`,`Run Preview (First 1) to validate the output on one image.`,`Adjust settings if needed, then click Start Processing.`,`Use the Outputs panel to switch between recent previews and completed jobs, then download the selected job.`],cases:[`Use it to make all product images 1000 x 1000, 1500 x 1500, Amazon main image size, or a saved customer-specific preset.`,`Use it when images have too much whitespace around the product.`,`Use it when the same input batch must be exported as JPG, PNG, WEBP, or TIFF with consistent naming.`,`Use local folder output when the processed files should remain directly accessible in a folder; each run creates a separate timestamped output folder.`],notes:[`Large images and AI upscale can take more RAM and processing time.`,`Always preview before a large batch when changing canvas, background, or upscale settings.`,`Do not put the output folder inside the input folder.`]},{title:`Images Check`,purpose:`Use Images Check when the task is visual review and cleanup of a folder tree.`,features:[`Scan every supported image in a selected folder.`,`Review images in slideshow or gallery mode.`,`Filter by image name, folder, or path.`,`Mark images for deletion without deleting immediately.`,`Save deletion only after confirming the selected rejected files.`],steps:[`Open Images Check.`,`Choose the folder that contains the images to review.`,`Click Scan all.`,`Use slideshow mode for focused review or gallery mode for faster comparison.`,`Mark bad images for deletion.`,`Check the Delete count, then click Save deletion when ready.`],cases:[`Use it when a packshot folder contains blurry, duplicated, wrong, or irrelevant images.`,`Use it before Image Edit if the batch should be cleaned first.`,`Use it after Image Edit if the output folder needs manual visual QA.`],notes:[`Deletion is permanent after confirmation.`,`If you only need to find and copy good packshots, Packshot Browser is usually safer than deleting files.`]},{title:`Packshot Browser`,purpose:`Use Packshot Browser when the task is finding, previewing, selecting, and copying existing packshot files.`,features:[`Index local or synced folder structures without requiring an Excel file.`,`Browse the real folder tree first, then load only the selected folder gallery.`,`Search inside the selected folder by EAN, filename, folder, extension, and product keywords.`,`Load images page by page so very large libraries stay responsive.`,`Load thumbnails progressively through a limited queue instead of requesting everything at once.`,`Hover thumbnails for larger preview and file metadata.`,`Select files and copy them to an output folder.`,`Export a CSV report of copied or selected files.`,`Handle OneDrive cloud-only files carefully by using cached or SharePoint online thumbnails when possible.`],steps:[`Open Packshot Browser.`,`Choose the source packshot folder.`,`Click Scan to build the folder index.`,`Choose the folder to inspect from the left panel.`,`Use search inside the selected folder if needed.`,`Click Load more thumbnails when the folder has more results.`,`Hover a thumbnail to inspect it.`,`Select the files to collect.`,`Choose an output folder.`,`Click Copy selected and review the generated report.`],cases:[`Use it when someone asks for all packshots for one EAN or product group.`,`Use it to collect images from a OneDrive-synced library without accidentally downloading every file.`,`Use it when the source folder must stay unchanged.`],notes:[`Cloud-only OneDrive files may show placeholders if Windows has no cached thumbnail and SharePoint online preview is unavailable.`,`Copy selected may trigger OneDrive to download the original selected files.`,`Keep output outside the source folder.`]},{title:`EAN Sorter`,purpose:`Use EAN Sorter when files need to be grouped by detected barcode or EAN.`,features:[`Scan image folders for barcode or EAN information.`,`Preview detected results before applying sort actions.`,`Group files by detected EAN or status.`,`Create reports that help review successful, missing, or uncertain detections.`,`Use the built-in Guide button in the tab for sorter-specific details.`],steps:[`Open EAN Sorter.`,`Choose the source folder.`,`Run the scan.`,`Review detected EANs, missing values, and uncertain items.`,`Apply the sort/copy workflow only after reviewing the preview.`,`Open the generated report if the team needs verification evidence.`],cases:[`Use it when images arrive unsorted and folder names must be based on EAN.`,`Use it when barcode visibility is good enough for detection.`,`Use it to separate detected and undetected files for manual follow-up.`],notes:[`Blurry, cropped, tiny, rotated, or partially hidden barcodes can reduce detection accuracy.`,`Review results before applying folder changes.`]},{title:`EAN Renamer`,purpose:`Use EAN Renamer when selected images need structured category folders and predictable filenames.`,features:[`Scan a source folder and place images into workflow columns.`,`Classify images into Packshot, Human, Normal Lifestyle, Artwork, and Duplicate groups.`,`Use folder-derived EANs or a Custom EAN.`,`Choose Copy mode or in-folder Rename mode.`,`Choose naming modes: per-category, continuous, prefixed, or EAN_ProductName behavior.`,`Set output folders per category.`,`Preview output names and conflicts before applying.`,`Undo recent operations when log data is available.`],steps:[`Open EAN Renamer.`,`Pick the source folder.`,`Drag images into the correct category columns.`,`Set output folders if using Copy mode.`,`Choose output mode and naming mode in settings.`,`Enter Custom EAN or Product Name only when the current workflow requires it.`,`Use 1st markers when specific images should become the first image in a category.`,`Click Preview and review every output path and status.`,`Apply Copy or Rename only after the preview is correct.`],cases:[`Use Copy mode when testing a new naming rule or protecting original files.`,`Use in-folder Rename only when the source folder is trusted and backed up.`,`Use Duplicate groups when multiple files represent the same shot, such as JPG and PNG versions.`,`Use Product Name naming only when filenames must include a specific product name.`],notes:[`Filename conflicts must be fixed before apply.`,`Undo depends on the operation log and may not work if files are manually moved or deleted after applying.`,`Preview is the most important step in this tab.`]},{title:`Settings, Repair, and Diagnostics`,purpose:`Use the Settings and support scripts when the app behavior, theme, backend, or environment needs adjustment.`,features:[`Settings controls app-level preferences exposed by the current build.`,`REPAIR_GRIMOIRE.bat is the first recovery step for broken dependencies or startup issues.`,`DIAGNOSE_GRIMOIRE.bat creates diagnostic output for support.`,`START_DESKTOP.bat starts the desktop experience; START_GRIMOIRE.bat can be used for browser/dev mode.`],steps:[`If a tab behaves unexpectedly, close and reopen the app first.`,`Run REPAIR_GRIMOIRE.bat if the backend or dependencies fail.`,`Run DIAGNOSE_GRIMOIRE.bat if repair does not solve the issue.`,`Send the diagnostics folder to support with a short description of the workflow that failed.`],cases:[`Use repair after moving the project folder, updating dependencies, or seeing backend startup errors.`,`Use diagnostics when a bug needs to be reproduced or escalated.`],notes:[`Do not delete backend storage or logs unless support asks for it.`,`Keep source files and output folders separate during troubleshooting.`]}];function za(){return(0,V.jsxs)(`div`,{className:`view guide-view`,children:[(0,V.jsx)(`section`,{className:`guide-hero`,children:(0,V.jsxs)(`div`,{children:[(0,V.jsx)(`div`,{className:`credits-kicker`,children:`Guide`}),(0,V.jsx)(`h1`,{children:`GRIMOIRE User Guide`}),(0,V.jsx)(`p`,{children:`Use this guide to choose the right tab, understand each feature, follow safe workflows, and handle common product data or image cases.`})]})}),(0,V.jsxs)(`section`,{className:`guide-panel guide-overview`,children:[(0,V.jsx)(`h2`,{children:`Quick Tab Selection`}),(0,V.jsx)(`div`,{className:`guide-list`,children:La.map(([e,t])=>(0,V.jsxs)(`article`,{className:`guide-item`,children:[(0,V.jsx)(`strong`,{children:e}),(0,V.jsx)(`p`,{children:t})]},e))})]}),(0,V.jsx)(`div`,{className:`guide-tab-stack`,children:Ra.map(e=>(0,V.jsxs)(`section`,{className:`guide-tab-panel`,children:[(0,V.jsxs)(`div`,{className:`guide-tab-head`,children:[(0,V.jsx)(`h2`,{children:e.title}),(0,V.jsx)(`p`,{children:e.purpose})]}),(0,V.jsxs)(`div`,{className:`guide-columns`,children:[(0,V.jsxs)(`div`,{children:[(0,V.jsx)(`h3`,{children:`Key Features`}),(0,V.jsx)(`ul`,{children:e.features.map(e=>(0,V.jsx)(`li`,{children:e},e))})]}),(0,V.jsxs)(`div`,{children:[(0,V.jsx)(`h3`,{children:`How To Use`}),(0,V.jsx)(`ol`,{children:e.steps.map(e=>(0,V.jsx)(`li`,{children:e},e))})]}),(0,V.jsxs)(`div`,{children:[(0,V.jsx)(`h3`,{children:`Common Cases`}),(0,V.jsx)(`ul`,{children:e.cases.map(e=>(0,V.jsx)(`li`,{children:e},e))})]}),(0,V.jsxs)(`div`,{children:[(0,V.jsx)(`h3`,{children:`Notes`}),(0,V.jsx)(`ul`,{children:e.notes.map(e=>(0,V.jsx)(`li`,{children:e},e))})]})]})]},e.title))})]})}var Ba=[{role:`Building & Planning`,name:`Damien`},{role:`Idea & Planning`,name:`Tomasz`},{role:`Tester`,name:`Tyson`}];function Va(){return(0,V.jsx)(`div`,{className:`view credits-view`,children:(0,V.jsxs)(`section`,{className:`credits-panel`,"aria-label":`GRIMOIRE credits`,children:[(0,V.jsx)(`div`,{className:`credits-kicker`,children:`Credits`}),(0,V.jsx)(`h1`,{children:`MDX Team`}),(0,V.jsx)(`p`,{className:`credits-owner`,children:`Credits belong to MDX Team.`}),(0,V.jsx)(`div`,{className:`credits-list`,children:Ba.map(e=>(0,V.jsxs)(`div`,{className:`credit-row`,children:[(0,V.jsx)(`span`,{className:`credit-role`,children:e.role}),(0,V.jsx)(`strong`,{className:`credit-name`,children:e.name})]},e.role))})]})})}function Ha(){let e=nt(),[t,n]=(0,_.useState)(``),[r,i]=(0,_.useState)(()=>Math.floor(Math.random()*Ea.length)),a=(0,_.useMemo)(()=>t.trim()?Ta.filter(e=>Da(e,t)):[],[t]);return(0,_.useEffect)(()=>{let e=window.setInterval(()=>{i(e=>(e+1)%Ea.length)},6500);return()=>window.clearInterval(e)},[]),(0,V.jsxs)(`div`,{className:`command-home`,children:[(0,V.jsx)(`div`,{className:`command-stars`,"aria-hidden":`true`,children:`✦`}),(0,V.jsx)(`div`,{className:`command-brand`,children:(0,V.jsx)(`span`,{children:`GRIMOIRE`})}),(0,V.jsxs)(`div`,{className:`command-box`,children:[(0,V.jsx)(`input`,{autoFocus:!0,value:t,onChange:e=>n(e.target.value),onKeyDown:t=>{t.key===`Enter`&&a[0]&&e(a[0].to)},placeholder:`Type a tool, workflow, EAN, image, audit...`}),(0,V.jsxs)(`div`,{className:`command-build`,children:[(0,V.jsx)(`strong`,{children:`Build`}),(0,V.jsx)(`span`,{children:wa})]})]}),t.trim()&&(0,V.jsx)(`div`,{className:`command-home-results`,children:a.length?a.map(t=>(0,V.jsxs)(`button`,{onClick:()=>e(t.to),children:[(0,V.jsx)(`strong`,{children:t.title}),(0,V.jsx)(`span`,{children:t.desc}),(0,V.jsx)(`em`,{children:t.keywords.join(` · `)})]},t.to)):(0,V.jsx)(`div`,{className:`command-home-empty`,children:`No tab matches that keyword.`})}),(0,V.jsxs)(`div`,{className:`command-tip`,children:[(0,V.jsx)(`strong`,{children:`Tip`}),(0,V.jsx)(`span`,{children:Ea[r]})]})]})}function Ua(){let e=nt(),[t,n]=(0,_.useState)(()=>localStorage.getItem(`grimoire-sidebar`)===`collapsed`),[r,i]=(0,_.useState)(!1);return(0,_.useEffect)(()=>{localStorage.setItem(`grimoire-sidebar`,t?`collapsed`:`expanded`)},[t]),(0,_.useEffect)(()=>{let t=t=>{if(t.ctrlKey&&!t.shiftKey&&!t.altKey){let n=Object.entries(va).find(([,e])=>e===t.key)?.[0];n&&(t.preventDefault(),e(n))}};return window.addEventListener(`keydown`,t),()=>window.removeEventListener(`keydown`,t)},[e]),(0,V.jsxs)(`div`,{className:`app-layout ${t?`sidebar-collapsed`:``}`,children:[(0,V.jsx)(ba,{collapsed:t,onToggle:()=>n(!t),onOpenSettings:()=>i(!0)}),(0,V.jsx)(ja,{collapsed:t}),(0,V.jsx)(`main`,{className:`main-content`,children:(0,V.jsxs)(kt,{children:[(0,V.jsx)(Dt,{path:`/`,element:(0,V.jsx)(Ia,{})}),(0,V.jsx)(Dt,{path:`/data-qc`,element:(0,V.jsx)(kr,{})}),(0,V.jsx)(Dt,{path:`/image-edit`,element:(0,V.jsx)(di,{})}),(0,V.jsx)(Dt,{path:`/images-check`,element:(0,V.jsx)(_i,{})}),(0,V.jsx)(Dt,{path:`/packshot-browser`,element:(0,V.jsx)(ki,{})}),(0,V.jsx)(Dt,{path:`/ean-sorter`,element:(0,V.jsx)(ji,{})}),(0,V.jsx)(Dt,{path:`/ean-renamer`,element:(0,V.jsx)(Xi,{})}),(0,V.jsx)(Dt,{path:`/guide`,element:(0,V.jsx)(za,{})}),(0,V.jsx)(Dt,{path:`/credits`,element:(0,V.jsx)(Va,{})}),(0,V.jsx)(Dt,{path:`*`,element:(0,V.jsx)(Ha,{})})]})}),(0,V.jsx)(Kn,{open:r,onClose:()=>i(!1)})]})}function Wa(){return(0,V.jsx)(Bn,{children:(0,V.jsx)(Wn,{children:(0,V.jsx)(_n,{children:(0,V.jsx)(Ua,{})})})})}(0,v.createRoot)(document.getElementById(`root`)).render((0,V.jsx)(_.StrictMode,{children:(0,V.jsx)(Wa,{})}));