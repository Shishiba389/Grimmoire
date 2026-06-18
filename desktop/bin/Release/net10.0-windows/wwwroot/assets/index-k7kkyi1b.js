var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,a)=>(a=n==null?{}:e(i(n)),s(r||!n||!n.__esModule?t(a,`default`,{value:n,enumerable:!0}):a,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var l=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.portal`),r=Symbol.for(`react.fragment`),i=Symbol.for(`react.strict_mode`),a=Symbol.for(`react.profiler`),o=Symbol.for(`react.consumer`),s=Symbol.for(`react.context`),c=Symbol.for(`react.forward_ref`),l=Symbol.for(`react.suspense`),u=Symbol.for(`react.memo`),d=Symbol.for(`react.lazy`),f=Symbol.for(`react.activity`),p=Symbol.iterator;function m(e){return typeof e!=`object`||!e?null:(e=p&&e[p]||e[`@@iterator`],typeof e==`function`?e:null)}var h={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},g=Object.assign,_={};function v(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}v.prototype.isReactComponent={},v.prototype.setState=function(e,t){if(typeof e!=`object`&&typeof e!=`function`&&e!=null)throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);this.updater.enqueueSetState(this,e,t,`setState`)},v.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,`forceUpdate`)};function y(){}y.prototype=v.prototype;function b(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}var x=b.prototype=new y;x.constructor=b,g(x,v.prototype),x.isPureReactComponent=!0;var S=Array.isArray;function C(){}var w={H:null,A:null,T:null,S:null},ee=Object.prototype.hasOwnProperty;function T(e,n,r){var i=r.ref;return{$$typeof:t,type:e,key:n,ref:i===void 0?null:i,props:r}}function E(e,t){return T(e.type,t,e.props)}function D(e){return typeof e==`object`&&!!e&&e.$$typeof===t}function te(e){var t={"=":`=0`,":":`=2`};return`$`+e.replace(/[=:]/g,function(e){return t[e]})}var ne=/\/+/g;function re(e,t){return typeof e==`object`&&e&&e.key!=null?te(``+e.key):t.toString(36)}function O(e){switch(e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason;default:switch(typeof e.status==`string`?e.then(C,C):(e.status=`pending`,e.then(function(t){e.status===`pending`&&(e.status=`fulfilled`,e.value=t)},function(t){e.status===`pending`&&(e.status=`rejected`,e.reason=t)})),e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason}}throw e}function ie(e,r,i,a,o){var s=typeof e;(s===`undefined`||s===`boolean`)&&(e=null);var c=!1;if(e===null)c=!0;else switch(s){case`bigint`:case`string`:case`number`:c=!0;break;case`object`:switch(e.$$typeof){case t:case n:c=!0;break;case d:return c=e._init,ie(c(e._payload),r,i,a,o)}}if(c)return o=o(e),c=a===``?`.`+re(e,0):a,S(o)?(i=``,c!=null&&(i=c.replace(ne,`$&/`)+`/`),ie(o,r,i,``,function(e){return e})):o!=null&&(D(o)&&(o=E(o,i+(o.key==null||e&&e.key===o.key?``:(``+o.key).replace(ne,`$&/`)+`/`)+c)),r.push(o)),1;c=0;var l=a===``?`.`:a+`:`;if(S(e))for(var u=0;u<e.length;u++)a=e[u],s=l+re(a,u),c+=ie(a,r,i,s,o);else if(u=m(e),typeof u==`function`)for(e=u.call(e),u=0;!(a=e.next()).done;)a=a.value,s=l+re(a,u++),c+=ie(a,r,i,s,o);else if(s===`object`){if(typeof e.then==`function`)return ie(O(e),r,i,a,o);throw r=String(e),Error(`Objects are not valid as a React child (found: `+(r===`[object Object]`?`object with keys {`+Object.keys(e).join(`, `)+`}`:r)+`). If you meant to render a collection of children, use an array instead.`)}return c}function ae(e,t,n){if(e==null)return e;var r=[],i=0;return ie(e,r,``,``,function(e){return t.call(n,e,i++)}),r}function oe(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t)},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var k=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},A={map:ae,forEach:function(e,t,n){ae(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return ae(e,function(){t++}),t},toArray:function(e){return ae(e,function(e){return e})||[]},only:function(e){if(!D(e))throw Error(`React.Children.only expected to receive a single React element child.`);return e}};e.Activity=f,e.Children=A,e.Component=v,e.Fragment=r,e.Profiler=a,e.PureComponent=b,e.StrictMode=i,e.Suspense=l,e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=w,e.__COMPILER_RUNTIME={__proto__:null,c:function(e){return w.H.useMemoCache(e)}},e.cache=function(e){return function(){return e.apply(null,arguments)}},e.cacheSignal=function(){return null},e.cloneElement=function(e,t,n){if(e==null)throw Error(`The argument must be a React element, but you passed `+e+`.`);var r=g({},e.props),i=e.key;if(t!=null)for(a in t.key!==void 0&&(i=``+t.key),t)!ee.call(t,a)||a===`key`||a===`__self`||a===`__source`||a===`ref`&&t.ref===void 0||(r[a]=t[a]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var o=Array(a),s=0;s<a;s++)o[s]=arguments[s+2];r.children=o}return T(e.type,i,r)},e.createContext=function(e){return e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:o,_context:e},e},e.createElement=function(e,t,n){var r,i={},a=null;if(t!=null)for(r in t.key!==void 0&&(a=``+t.key),t)ee.call(t,r)&&r!==`key`&&r!==`__self`&&r!==`__source`&&(i[r]=t[r]);var o=arguments.length-2;if(o===1)i.children=n;else if(1<o){for(var s=Array(o),c=0;c<o;c++)s[c]=arguments[c+2];i.children=s}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)i[r]===void 0&&(i[r]=o[r]);return T(e,a,i)},e.createRef=function(){return{current:null}},e.forwardRef=function(e){return{$$typeof:c,render:e}},e.isValidElement=D,e.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:oe}},e.memo=function(e,t){return{$$typeof:u,type:e,compare:t===void 0?null:t}},e.startTransition=function(e){var t=w.T,n={};w.T=n;try{var r=e(),i=w.S;i!==null&&i(n,r),typeof r==`object`&&r&&typeof r.then==`function`&&r.then(C,k)}catch(e){k(e)}finally{t!==null&&n.types!==null&&(t.types=n.types),w.T=t}},e.unstable_useCacheRefresh=function(){return w.H.useCacheRefresh()},e.use=function(e){return w.H.use(e)},e.useActionState=function(e,t,n){return w.H.useActionState(e,t,n)},e.useCallback=function(e,t){return w.H.useCallback(e,t)},e.useContext=function(e){return w.H.useContext(e)},e.useDebugValue=function(){},e.useDeferredValue=function(e,t){return w.H.useDeferredValue(e,t)},e.useEffect=function(e,t){return w.H.useEffect(e,t)},e.useEffectEvent=function(e){return w.H.useEffectEvent(e)},e.useId=function(){return w.H.useId()},e.useImperativeHandle=function(e,t,n){return w.H.useImperativeHandle(e,t,n)},e.useInsertionEffect=function(e,t){return w.H.useInsertionEffect(e,t)},e.useLayoutEffect=function(e,t){return w.H.useLayoutEffect(e,t)},e.useMemo=function(e,t){return w.H.useMemo(e,t)},e.useOptimistic=function(e,t){return w.H.useOptimistic(e,t)},e.useReducer=function(e,t,n){return w.H.useReducer(e,t,n)},e.useRef=function(e){return w.H.useRef(e)},e.useState=function(e){return w.H.useState(e)},e.useSyncExternalStore=function(e,t,n){return w.H.useSyncExternalStore(e,t,n)},e.useTransition=function(){return w.H.useTransition()},e.version=`19.2.7`})),u=o(((e,t)=>{t.exports=l()})),d=o((e=>{function t(e,t){var n=e.length;e.push(t);a:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<i(a,t))e[r]=t,e[n]=a,n=r;else break a}}function n(e){return e.length===0?null:e[0]}function r(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;a:for(var r=0,a=e.length,o=a>>>1;r<o;){var s=2*(r+1)-1,c=e[s],l=s+1,u=e[l];if(0>i(c,n))l<a&&0>i(u,c)?(e[r]=u,e[l]=n,r=l):(e[r]=c,e[s]=n,r=s);else if(l<a&&0>i(u,n))e[r]=u,e[l]=n,r=l;else break a}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return n===0?e.id-t.id:n}if(e.unstable_now=void 0,typeof performance==`object`&&typeof performance.now==`function`){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var c=[],l=[],u=1,d=null,f=3,p=!1,m=!1,h=!1,g=!1,_=typeof setTimeout==`function`?setTimeout:null,v=typeof clearTimeout==`function`?clearTimeout:null,y=typeof setImmediate<`u`?setImmediate:null;function b(e){for(var i=n(l);i!==null;){if(i.callback===null)r(l);else if(i.startTime<=e)r(l),i.sortIndex=i.expirationTime,t(c,i);else break;i=n(l)}}function x(e){if(h=!1,b(e),!m)if(n(c)!==null)m=!0,S||(S=!0,D());else{var t=n(l);t!==null&&re(x,t.startTime-e)}}var S=!1,C=-1,w=5,ee=-1;function T(){return g?!0:!(e.unstable_now()-ee<w)}function E(){if(g=!1,S){var t=e.unstable_now();ee=t;var i=!0;try{a:{m=!1,h&&(h=!1,v(C),C=-1),p=!0;var a=f;try{b:{for(b(t),d=n(c);d!==null&&!(d.expirationTime>t&&T());){var o=d.callback;if(typeof o==`function`){d.callback=null,f=d.priorityLevel;var s=o(d.expirationTime<=t);if(t=e.unstable_now(),typeof s==`function`){d.callback=s,b(t),i=!0;break b}d===n(c)&&r(c),b(t)}else r(c);d=n(c)}if(d!==null)i=!0;else{var u=n(l);u!==null&&re(x,u.startTime-t),i=!1}}break a}finally{d=null,f=a,p=!1}i=void 0}}finally{i?D():S=!1}}}var D;if(typeof y==`function`)D=function(){y(E)};else if(typeof MessageChannel<`u`){var te=new MessageChannel,ne=te.port2;te.port1.onmessage=E,D=function(){ne.postMessage(null)}}else D=function(){_(E,0)};function re(t,n){C=_(function(){t(e.unstable_now())},n)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_forceFrameRate=function(e){0>e||125<e?console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`):w=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_next=function(e){switch(f){case 1:case 2:case 3:var t=3;break;default:t=f}var n=f;f=t;try{return e()}finally{f=n}},e.unstable_requestPaint=function(){g=!0},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=f;f=e;try{return t()}finally{f=n}},e.unstable_scheduleCallback=function(r,i,a){var o=e.unstable_now();switch(typeof a==`object`&&a?(a=a.delay,a=typeof a==`number`&&0<a?o+a:o):a=o,r){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=a+s,r={id:u++,callback:i,priorityLevel:r,startTime:a,expirationTime:s,sortIndex:-1},a>o?(r.sortIndex=a,t(l,r),n(c)===null&&r===n(l)&&(h?(v(C),C=-1):h=!0,re(x,a-o))):(r.sortIndex=s,t(c,r),m||p||(m=!0,S||(S=!0,D()))),r},e.unstable_shouldYield=T,e.unstable_wrapCallback=function(e){var t=f;return function(){var n=f;f=t;try{return e.apply(this,arguments)}finally{f=n}}}})),f=o(((e,t)=>{t.exports=d()})),p=o((e=>{var t=u();function n(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function r(){}var i={d:{f:r,r:function(){throw Error(n(522))},D:r,C:r,L:r,m:r,X:r,S:r,M:r},p:0,findDOMNode:null},a=Symbol.for(`react.portal`);function o(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:a,key:r==null?null:``+r,children:e,containerInfo:t,implementation:n}}var s=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function c(e,t){if(e===`font`)return``;if(typeof t==`string`)return t===`use-credentials`?t:``}e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=i,e.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(n(299));return o(e,t,null,r)},e.flushSync=function(e){var t=s.T,n=i.p;try{if(s.T=null,i.p=2,e)return e()}finally{s.T=t,i.p=n,i.d.f()}},e.preconnect=function(e,t){typeof e==`string`&&(t?(t=t.crossOrigin,t=typeof t==`string`?t===`use-credentials`?t:``:void 0):t=null,i.d.C(e,t))},e.prefetchDNS=function(e){typeof e==`string`&&i.d.D(e)},e.preinit=function(e,t){if(typeof e==`string`&&t&&typeof t.as==`string`){var n=t.as,r=c(n,t.crossOrigin),a=typeof t.integrity==`string`?t.integrity:void 0,o=typeof t.fetchPriority==`string`?t.fetchPriority:void 0;n===`style`?i.d.S(e,typeof t.precedence==`string`?t.precedence:void 0,{crossOrigin:r,integrity:a,fetchPriority:o}):n===`script`&&i.d.X(e,{crossOrigin:r,integrity:a,fetchPriority:o,nonce:typeof t.nonce==`string`?t.nonce:void 0})}},e.preinitModule=function(e,t){if(typeof e==`string`)if(typeof t==`object`&&t){if(t.as==null||t.as===`script`){var n=c(t.as,t.crossOrigin);i.d.M(e,{crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0})}}else t??i.d.M(e)},e.preload=function(e,t){if(typeof e==`string`&&typeof t==`object`&&t&&typeof t.as==`string`){var n=t.as,r=c(n,t.crossOrigin);i.d.L(e,n,{crossOrigin:r,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,type:typeof t.type==`string`?t.type:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy==`string`?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet==`string`?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes==`string`?t.imageSizes:void 0,media:typeof t.media==`string`?t.media:void 0})}},e.preloadModule=function(e,t){if(typeof e==`string`)if(t){var n=c(t.as,t.crossOrigin);i.d.m(e,{as:typeof t.as==`string`&&t.as!==`script`?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0})}else i.d.m(e)},e.requestFormReset=function(e){i.d.r(e)},e.unstable_batchedUpdates=function(e,t){return e(t)},e.useFormState=function(e,t,n){return s.H.useFormState(e,t,n)},e.useFormStatus=function(){return s.H.useHostTransitionStatus()},e.version=`19.2.7`})),m=o(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=p()})),h=o((e=>{var t=f(),n=u(),r=m();function i(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function a(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function o(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function s(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function c(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function l(e){if(o(e)!==e)throw Error(i(188))}function d(e){var t=e.alternate;if(!t){if(t=o(e),t===null)throw Error(i(188));return t===e?e:null}for(var n=e,r=t;;){var a=n.return;if(a===null)break;var s=a.alternate;if(s===null){if(r=a.return,r!==null){n=r;continue}break}if(a.child===s.child){for(s=a.child;s;){if(s===n)return l(a),e;if(s===r)return l(a),t;s=s.sibling}throw Error(i(188))}if(n.return!==r.return)n=a,r=s;else{for(var c=!1,u=a.child;u;){if(u===n){c=!0,n=a,r=s;break}if(u===r){c=!0,r=a,n=s;break}u=u.sibling}if(!c){for(u=s.child;u;){if(u===n){c=!0,n=s,r=a;break}if(u===r){c=!0,r=s,n=a;break}u=u.sibling}if(!c)throw Error(i(189))}}if(n.alternate!==r)throw Error(i(190))}if(n.tag!==3)throw Error(i(188));return n.stateNode.current===n?e:t}function p(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=p(e),t!==null)return t;e=e.sibling}return null}var h=Object.assign,g=Symbol.for(`react.element`),_=Symbol.for(`react.transitional.element`),v=Symbol.for(`react.portal`),y=Symbol.for(`react.fragment`),b=Symbol.for(`react.strict_mode`),x=Symbol.for(`react.profiler`),S=Symbol.for(`react.consumer`),C=Symbol.for(`react.context`),w=Symbol.for(`react.forward_ref`),ee=Symbol.for(`react.suspense`),T=Symbol.for(`react.suspense_list`),E=Symbol.for(`react.memo`),D=Symbol.for(`react.lazy`),te=Symbol.for(`react.activity`),ne=Symbol.for(`react.memo_cache_sentinel`),re=Symbol.iterator;function O(e){return typeof e!=`object`||!e?null:(e=re&&e[re]||e[`@@iterator`],typeof e==`function`?e:null)}var ie=Symbol.for(`react.client.reference`);function ae(e){if(e==null)return null;if(typeof e==`function`)return e.$$typeof===ie?null:e.displayName||e.name||null;if(typeof e==`string`)return e;switch(e){case y:return`Fragment`;case x:return`Profiler`;case b:return`StrictMode`;case ee:return`Suspense`;case T:return`SuspenseList`;case te:return`Activity`}if(typeof e==`object`)switch(e.$$typeof){case v:return`Portal`;case C:return e.displayName||`Context`;case S:return(e._context.displayName||`Context`)+`.Consumer`;case w:var t=e.render;return e=e.displayName,e||=(e=t.displayName||t.name||``,e===``?`ForwardRef`:`ForwardRef(`+e+`)`),e;case E:return t=e.displayName||null,t===null?ae(e.type)||`Memo`:t;case D:t=e._payload,e=e._init;try{return ae(e(t))}catch{}}return null}var oe=Array.isArray,k=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,A=r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,se={pending:!1,data:null,method:null,action:null},ce=[],j=-1;function le(e){return{current:e}}function M(e){0>j||(e.current=ce[j],ce[j]=null,j--)}function N(e,t){j++,ce[j]=e.current,e.current=t}var ue=le(null),de=le(null),P=le(null),fe=le(null);function F(e,t){switch(N(P,t),N(de,e),N(ue,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Vd(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Vd(t),e=Hd(t,e);else switch(e){case`svg`:e=1;break;case`math`:e=2;break;default:e=0}}M(ue),N(ue,e)}function pe(){M(ue),M(de),M(P)}function me(e){e.memoizedState!==null&&N(fe,e);var t=ue.current,n=Hd(t,e.type);t!==n&&(N(de,e),N(ue,n))}function he(e){de.current===e&&(M(ue),M(de)),fe.current===e&&(M(fe),Qf._currentValue=se)}var ge,_e;function ve(e){if(ge===void 0)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);ge=t&&t[1]||``,_e=-1<e.stack.indexOf(`
    at`)?` (<anonymous>)`:-1<e.stack.indexOf(`@`)?`@unknown:0:0`:``}return`
`+ge+e+_e}var ye=!1;function be(e,t){if(!e||ye)return``;ye=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var n=function(){throw Error()};if(Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect==`object`&&Reflect.construct){try{Reflect.construct(n,[])}catch(e){var r=e}Reflect.construct(e,[],n)}else{try{n.call()}catch(e){r=e}e.call(n.prototype)}}else{try{throw Error()}catch(e){r=e}(n=e())&&typeof n.catch==`function`&&n.catch(function(){})}}catch(e){if(e&&r&&typeof e.stack==`string`)return[e.stack,r.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName=`DetermineComponentFrameRoot`;var i=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,`name`);i&&i.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:`DetermineComponentFrameRoot`});var a=r.DetermineComponentFrameRoot(),o=a[0],s=a[1];if(o&&s){var c=o.split(`
`),l=s.split(`
`);for(i=r=0;r<c.length&&!c[r].includes(`DetermineComponentFrameRoot`);)r++;for(;i<l.length&&!l[i].includes(`DetermineComponentFrameRoot`);)i++;if(r===c.length||i===l.length)for(r=c.length-1,i=l.length-1;1<=r&&0<=i&&c[r]!==l[i];)i--;for(;1<=r&&0<=i;r--,i--)if(c[r]!==l[i]){if(r!==1||i!==1)do if(r--,i--,0>i||c[r]!==l[i]){var u=`
`+c[r].replace(` at new `,` at `);return e.displayName&&u.includes(`<anonymous>`)&&(u=u.replace(`<anonymous>`,e.displayName)),u}while(1<=r&&0<=i);break}}}finally{ye=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:``)?ve(n):``}function xe(e,t){switch(e.tag){case 26:case 27:case 5:return ve(e.type);case 16:return ve(`Lazy`);case 13:return e.child!==t&&t!==null?ve(`Suspense Fallback`):ve(`Suspense`);case 19:return ve(`SuspenseList`);case 0:case 15:return be(e.type,!1);case 11:return be(e.type.render,!1);case 1:return be(e.type,!0);case 31:return ve(`Activity`);default:return``}}function Se(e){try{var t=``,n=null;do t+=xe(e,n),n=e,e=e.return;while(e);return t}catch(e){return`
Error generating stack: `+e.message+`
`+e.stack}}var Ce=Object.prototype.hasOwnProperty,we=t.unstable_scheduleCallback,Te=t.unstable_cancelCallback,Ee=t.unstable_shouldYield,De=t.unstable_requestPaint,I=t.unstable_now,Oe=t.unstable_getCurrentPriorityLevel,ke=t.unstable_ImmediatePriority,Ae=t.unstable_UserBlockingPriority,je=t.unstable_NormalPriority,Me=t.unstable_LowPriority,Ne=t.unstable_IdlePriority,Pe=t.log,Fe=t.unstable_setDisableYieldValue,Ie=null,Le=null;function Re(e){if(typeof Pe==`function`&&Fe(e),Le&&typeof Le.setStrictMode==`function`)try{Le.setStrictMode(Ie,e)}catch{}}var L=Math.clz32?Math.clz32:Ve,ze=Math.log,Be=Math.LN2;function Ve(e){return e>>>=0,e===0?32:31-(ze(e)/Be|0)|0}var He=256,Ue=262144,We=4194304;function R(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Ge(e,t,n){var r=e.pendingLanes;if(r===0)return 0;var i=0,a=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var s=r&134217727;return s===0?(s=r&~a,s===0?o===0?n||(n=r&~e,n!==0&&(i=R(n))):i=R(o):i=R(s)):(r=s&~a,r===0?(o&=s,o===0?n||(n=s&~e,n!==0&&(i=R(n))):i=R(o)):i=R(r)),i===0?0:t!==0&&t!==i&&(t&a)===0&&(a=i&-i,n=t&-t,a>=n||a===32&&n&4194048)?t:i}function Ke(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function qe(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Je(){var e=We;return We<<=1,!(We&62914560)&&(We=4194304),e}function Ye(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Xe(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function Ze(e,t,n,r,i,a){var o=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var s=e.entanglements,c=e.expirationTimes,l=e.hiddenUpdates;for(n=o&~n;0<n;){var u=31-L(n),d=1<<u;s[u]=0,c[u]=-1;var f=l[u];if(f!==null)for(l[u]=null,u=0;u<f.length;u++){var p=f[u];p!==null&&(p.lane&=-536870913)}n&=~d}r!==0&&Qe(e,r,0),a!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=a&~(o&~t))}function Qe(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-L(t);e.entangledLanes|=t,e.entanglements[r]=e.entanglements[r]|1073741824|n&261930}function $e(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-L(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}function et(e,t){var n=t&-t;return n=n&42?1:tt(n),(n&(e.suspendedLanes|t))===0?n:0}function tt(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function nt(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function rt(){var e=A.p;return e===0?(e=window.event,e===void 0?32:mp(e.type)):e}function it(e,t){var n=A.p;try{return A.p=e,t()}finally{A.p=n}}var at=Math.random().toString(36).slice(2),ot=`__reactFiber$`+at,st=`__reactProps$`+at,ct=`__reactContainer$`+at,lt=`__reactEvents$`+at,ut=`__reactListeners$`+at,dt=`__reactHandles$`+at,ft=`__reactResources$`+at,pt=`__reactMarker$`+at;function mt(e){delete e[ot],delete e[st],delete e[lt],delete e[ut],delete e[dt]}function ht(e){var t=e[ot];if(t)return t;for(var n=e.parentNode;n;){if(t=n[ct]||n[ot]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=df(e);e!==null;){if(n=e[ot])return n;e=df(e)}return t}e=n,n=e.parentNode}return null}function gt(e){if(e=e[ot]||e[ct]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function _t(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(i(33))}function vt(e){var t=e[ft];return t||=e[ft]={hoistableStyles:new Map,hoistableScripts:new Map},t}function yt(e){e[pt]=!0}var bt=new Set,xt={};function St(e,t){Ct(e,t),Ct(e+`Capture`,t)}function Ct(e,t){for(xt[e]=t,e=0;e<t.length;e++)bt.add(t[e])}var wt=RegExp(`^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`),Tt={},Et={};function Dt(e){return Ce.call(Et,e)?!0:Ce.call(Tt,e)?!1:wt.test(e)?Et[e]=!0:(Tt[e]=!0,!1)}function Ot(e,t,n){if(Dt(t))if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:e.removeAttribute(t);return;case`boolean`:var r=t.toLowerCase().slice(0,5);if(r!==`data-`&&r!==`aria-`){e.removeAttribute(t);return}}e.setAttribute(t,``+n)}}function kt(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(t);return}e.setAttribute(t,``+n)}}function At(e,t,n,r){if(r===null)e.removeAttribute(n);else{switch(typeof r){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(n);return}e.setAttributeNS(t,n,``+r)}}function jt(e){switch(typeof e){case`bigint`:case`boolean`:case`number`:case`string`:case`undefined`:return e;case`object`:return e;default:return``}}function Mt(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()===`input`&&(t===`checkbox`||t===`radio`)}function Nt(e,t,n){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&r!==void 0&&typeof r.get==`function`&&typeof r.set==`function`){var i=r.get,a=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){n=``+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(e){n=``+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Pt(e){if(!e._valueTracker){var t=Mt(e)?`checked`:`value`;e._valueTracker=Nt(e,t,``+e[t])}}function Ft(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r=``;return e&&(r=Mt(e)?e.checked?`true`:`false`:e.value),e=r,e===n?!1:(t.setValue(e),!0)}function It(e){if(e||=typeof document<`u`?document:void 0,e===void 0)return null;try{return e.activeElement||e.body}catch{return e.body}}var Lt=/[\n"\\]/g;function Rt(e){return e.replace(Lt,function(e){return`\\`+e.charCodeAt(0).toString(16)+` `})}function zt(e,t,n,r,i,a,o,s){e.name=``,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`?e.type=o:e.removeAttribute(`type`),t==null?o!==`submit`&&o!==`reset`||e.removeAttribute(`value`):o===`number`?(t===0&&e.value===``||e.value!=t)&&(e.value=``+jt(t)):e.value!==``+jt(t)&&(e.value=``+jt(t)),t==null?n==null?r!=null&&e.removeAttribute(`value`):Vt(e,o,jt(n)):Vt(e,o,jt(t)),i==null&&a!=null&&(e.defaultChecked=!!a),i!=null&&(e.checked=i&&typeof i!=`function`&&typeof i!=`symbol`),s!=null&&typeof s!=`function`&&typeof s!=`symbol`&&typeof s!=`boolean`?e.name=``+jt(s):e.removeAttribute(`name`)}function Bt(e,t,n,r,i,a,o,s){if(a!=null&&typeof a!=`function`&&typeof a!=`symbol`&&typeof a!=`boolean`&&(e.type=a),t!=null||n!=null){if(!(a!==`submit`&&a!==`reset`||t!=null)){Pt(e);return}n=n==null?``:``+jt(n),t=t==null?n:``+jt(t),s||t===e.value||(e.value=t),e.defaultValue=t}r??=i,r=typeof r!=`function`&&typeof r!=`symbol`&&!!r,e.checked=s?e.checked:!!r,e.defaultChecked=!!r,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`&&(e.name=o),Pt(e)}function Vt(e,t,n){t===`number`&&It(e.ownerDocument)===e||e.defaultValue===``+n||(e.defaultValue=``+n)}function Ht(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t[`$`+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty(`$`+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=``+jt(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function Ut(e,t,n){if(t!=null&&(t=``+jt(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n==null?``:``+jt(n)}function Wt(e,t,n,r){if(t==null){if(r!=null){if(n!=null)throw Error(i(92));if(oe(r)){if(1<r.length)throw Error(i(93));r=r[0]}n=r}n??=``,t=n}n=jt(t),e.defaultValue=n,r=e.textContent,r===n&&r!==``&&r!==null&&(e.value=r),Pt(e)}function Gt(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Kt=new Set(`animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(` `));function qt(e,t,n){var r=t.indexOf(`--`)===0;n==null||typeof n==`boolean`||n===``?r?e.setProperty(t,``):t===`float`?e.cssFloat=``:e[t]=``:r?e.setProperty(t,n):typeof n!=`number`||n===0||Kt.has(t)?t===`float`?e.cssFloat=n:e[t]=(``+n).trim():e[t]=n+`px`}function Jt(e,t,n){if(t!=null&&typeof t!=`object`)throw Error(i(62));if(e=e.style,n!=null){for(var r in n)!n.hasOwnProperty(r)||t!=null&&t.hasOwnProperty(r)||(r.indexOf(`--`)===0?e.setProperty(r,``):r===`float`?e.cssFloat=``:e[r]=``);for(var a in t)r=t[a],t.hasOwnProperty(a)&&n[a]!==r&&qt(e,a,r)}else for(var o in t)t.hasOwnProperty(o)&&qt(e,o,t[o])}function Yt(e){if(e.indexOf(`-`)===-1)return!1;switch(e){case`annotation-xml`:case`color-profile`:case`font-face`:case`font-face-src`:case`font-face-uri`:case`font-face-format`:case`font-face-name`:case`missing-glyph`:return!1;default:return!0}}var Xt=new Map([[`acceptCharset`,`accept-charset`],[`htmlFor`,`for`],[`httpEquiv`,`http-equiv`],[`crossOrigin`,`crossorigin`],[`accentHeight`,`accent-height`],[`alignmentBaseline`,`alignment-baseline`],[`arabicForm`,`arabic-form`],[`baselineShift`,`baseline-shift`],[`capHeight`,`cap-height`],[`clipPath`,`clip-path`],[`clipRule`,`clip-rule`],[`colorInterpolation`,`color-interpolation`],[`colorInterpolationFilters`,`color-interpolation-filters`],[`colorProfile`,`color-profile`],[`colorRendering`,`color-rendering`],[`dominantBaseline`,`dominant-baseline`],[`enableBackground`,`enable-background`],[`fillOpacity`,`fill-opacity`],[`fillRule`,`fill-rule`],[`floodColor`,`flood-color`],[`floodOpacity`,`flood-opacity`],[`fontFamily`,`font-family`],[`fontSize`,`font-size`],[`fontSizeAdjust`,`font-size-adjust`],[`fontStretch`,`font-stretch`],[`fontStyle`,`font-style`],[`fontVariant`,`font-variant`],[`fontWeight`,`font-weight`],[`glyphName`,`glyph-name`],[`glyphOrientationHorizontal`,`glyph-orientation-horizontal`],[`glyphOrientationVertical`,`glyph-orientation-vertical`],[`horizAdvX`,`horiz-adv-x`],[`horizOriginX`,`horiz-origin-x`],[`imageRendering`,`image-rendering`],[`letterSpacing`,`letter-spacing`],[`lightingColor`,`lighting-color`],[`markerEnd`,`marker-end`],[`markerMid`,`marker-mid`],[`markerStart`,`marker-start`],[`overlinePosition`,`overline-position`],[`overlineThickness`,`overline-thickness`],[`paintOrder`,`paint-order`],[`panose-1`,`panose-1`],[`pointerEvents`,`pointer-events`],[`renderingIntent`,`rendering-intent`],[`shapeRendering`,`shape-rendering`],[`stopColor`,`stop-color`],[`stopOpacity`,`stop-opacity`],[`strikethroughPosition`,`strikethrough-position`],[`strikethroughThickness`,`strikethrough-thickness`],[`strokeDasharray`,`stroke-dasharray`],[`strokeDashoffset`,`stroke-dashoffset`],[`strokeLinecap`,`stroke-linecap`],[`strokeLinejoin`,`stroke-linejoin`],[`strokeMiterlimit`,`stroke-miterlimit`],[`strokeOpacity`,`stroke-opacity`],[`strokeWidth`,`stroke-width`],[`textAnchor`,`text-anchor`],[`textDecoration`,`text-decoration`],[`textRendering`,`text-rendering`],[`transformOrigin`,`transform-origin`],[`underlinePosition`,`underline-position`],[`underlineThickness`,`underline-thickness`],[`unicodeBidi`,`unicode-bidi`],[`unicodeRange`,`unicode-range`],[`unitsPerEm`,`units-per-em`],[`vAlphabetic`,`v-alphabetic`],[`vHanging`,`v-hanging`],[`vIdeographic`,`v-ideographic`],[`vMathematical`,`v-mathematical`],[`vectorEffect`,`vector-effect`],[`vertAdvY`,`vert-adv-y`],[`vertOriginX`,`vert-origin-x`],[`vertOriginY`,`vert-origin-y`],[`wordSpacing`,`word-spacing`],[`writingMode`,`writing-mode`],[`xmlnsXlink`,`xmlns:xlink`],[`xHeight`,`x-height`]]),Zt=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Qt(e){return Zt.test(``+e)?`javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`:e}function $t(){}var en=null;function tn(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var nn=null,rn=null;function an(e){var t=gt(e);if(t&&(e=t.stateNode)){var n=e[st]||null;a:switch(e=t.stateNode,t.type){case`input`:if(zt(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type===`radio`&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll(`input[name="`+Rt(``+t)+`"][type="radio"]`),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=r[st]||null;if(!a)throw Error(i(90));zt(r,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<n.length;t++)r=n[t],r.form===e.form&&Ft(r)}break a;case`textarea`:Ut(e,n.value,n.defaultValue);break a;case`select`:t=n.value,t!=null&&Ht(e,!!n.multiple,t,!1)}}}var on=!1;function sn(e,t,n){if(on)return e(t,n);on=!0;try{return e(t)}finally{if(on=!1,(nn!==null||rn!==null)&&(bu(),nn&&(t=nn,e=rn,rn=nn=null,an(t),e)))for(t=0;t<e.length;t++)an(e[t])}}function cn(e,t){var n=e.stateNode;if(n===null)return null;var r=n[st]||null;if(r===null)return null;n=r[t];a:switch(t){case`onClick`:case`onClickCapture`:case`onDoubleClick`:case`onDoubleClickCapture`:case`onMouseDown`:case`onMouseDownCapture`:case`onMouseMove`:case`onMouseMoveCapture`:case`onMouseUp`:case`onMouseUpCapture`:case`onMouseEnter`:(r=!r.disabled)||(e=e.type,r=!(e===`button`||e===`input`||e===`select`||e===`textarea`)),e=!r;break a;default:e=!1}if(e)return null;if(n&&typeof n!=`function`)throw Error(i(231,t,typeof n));return n}var ln=!(typeof window>`u`||window.document===void 0||window.document.createElement===void 0),un=!1;if(ln)try{var dn={};Object.defineProperty(dn,"passive",{get:function(){un=!0}}),window.addEventListener(`test`,dn,dn),window.removeEventListener(`test`,dn,dn)}catch{un=!1}var fn=null,pn=null,mn=null;function hn(){if(mn)return mn;var e,t=pn,n=t.length,r,i=`value`in fn?fn.value:fn.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return mn=i.slice(e,1<r?1-r:void 0)}function gn(e){var t=e.keyCode;return`charCode`in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function _n(){return!0}function vn(){return!1}function yn(e){function t(t,n,r,i,a){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented==null?!1===i.returnValue:i.defaultPrevented)?_n:vn,this.isPropagationStopped=vn,this}return h(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!=`unknown`&&(e.returnValue=!1),this.isDefaultPrevented=_n)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!=`unknown`&&(e.cancelBubble=!0),this.isPropagationStopped=_n)},persist:function(){},isPersistent:_n}),t}var bn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},xn=yn(bn),Sn=h({},bn,{view:0,detail:0}),Cn=yn(Sn),wn,Tn,En,Dn=h({},Sn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Rn,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return`movementX`in e?e.movementX:(e!==En&&(En&&e.type===`mousemove`?(wn=e.screenX-En.screenX,Tn=e.screenY-En.screenY):Tn=wn=0,En=e),wn)},movementY:function(e){return`movementY`in e?e.movementY:Tn}}),On=yn(Dn),kn=yn(h({},Dn,{dataTransfer:0})),An=yn(h({},Sn,{relatedTarget:0})),jn=yn(h({},bn,{animationName:0,elapsedTime:0,pseudoElement:0})),Mn=yn(h({},bn,{clipboardData:function(e){return`clipboardData`in e?e.clipboardData:window.clipboardData}})),Nn=yn(h({},bn,{data:0})),Pn={Esc:`Escape`,Spacebar:` `,Left:`ArrowLeft`,Up:`ArrowUp`,Right:`ArrowRight`,Down:`ArrowDown`,Del:`Delete`,Win:`OS`,Menu:`ContextMenu`,Apps:`ContextMenu`,Scroll:`ScrollLock`,MozPrintableKey:`Unidentified`},Fn={8:`Backspace`,9:`Tab`,12:`Clear`,13:`Enter`,16:`Shift`,17:`Control`,18:`Alt`,19:`Pause`,20:`CapsLock`,27:`Escape`,32:` `,33:`PageUp`,34:`PageDown`,35:`End`,36:`Home`,37:`ArrowLeft`,38:`ArrowUp`,39:`ArrowRight`,40:`ArrowDown`,45:`Insert`,46:`Delete`,112:`F1`,113:`F2`,114:`F3`,115:`F4`,116:`F5`,117:`F6`,118:`F7`,119:`F8`,120:`F9`,121:`F10`,122:`F11`,123:`F12`,144:`NumLock`,145:`ScrollLock`,224:`Meta`},In={Alt:`altKey`,Control:`ctrlKey`,Meta:`metaKey`,Shift:`shiftKey`};function Ln(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=In[e])?!!t[e]:!1}function Rn(){return Ln}var zn=yn(h({},Sn,{key:function(e){if(e.key){var t=Pn[e.key]||e.key;if(t!==`Unidentified`)return t}return e.type===`keypress`?(e=gn(e),e===13?`Enter`:String.fromCharCode(e)):e.type===`keydown`||e.type===`keyup`?Fn[e.keyCode]||`Unidentified`:``},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Rn,charCode:function(e){return e.type===`keypress`?gn(e):0},keyCode:function(e){return e.type===`keydown`||e.type===`keyup`?e.keyCode:0},which:function(e){return e.type===`keypress`?gn(e):e.type===`keydown`||e.type===`keyup`?e.keyCode:0}})),Bn=yn(h({},Dn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),z=yn(h({},Sn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Rn})),Vn=yn(h({},bn,{propertyName:0,elapsedTime:0,pseudoElement:0})),Hn=yn(h({},Dn,{deltaX:function(e){return`deltaX`in e?e.deltaX:`wheelDeltaX`in e?-e.wheelDeltaX:0},deltaY:function(e){return`deltaY`in e?e.deltaY:`wheelDeltaY`in e?-e.wheelDeltaY:`wheelDelta`in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),Un=yn(h({},bn,{newState:0,oldState:0})),Wn=[9,13,27,32],Gn=ln&&`CompositionEvent`in window,Kn=null;ln&&`documentMode`in document&&(Kn=document.documentMode);var qn=ln&&`TextEvent`in window&&!Kn,Jn=ln&&(!Gn||Kn&&8<Kn&&11>=Kn),Yn=` `,Xn=!1;function Zn(e,t){switch(e){case`keyup`:return Wn.indexOf(t.keyCode)!==-1;case`keydown`:return t.keyCode!==229;case`keypress`:case`mousedown`:case`focusout`:return!0;default:return!1}}function Qn(e){return e=e.detail,typeof e==`object`&&`data`in e?e.data:null}var $n=!1;function er(e,t){switch(e){case`compositionend`:return Qn(t);case`keypress`:return t.which===32?(Xn=!0,Yn):null;case`textInput`:return e=t.data,e===Yn&&Xn?null:e;default:return null}}function tr(e,t){if($n)return e===`compositionend`||!Gn&&Zn(e,t)?(e=hn(),mn=pn=fn=null,$n=!1,e):null;switch(e){case`paste`:return null;case`keypress`:if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case`compositionend`:return Jn&&t.locale!==`ko`?null:t.data;default:return null}}var nr={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function rr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t===`input`?!!nr[e.type]:t===`textarea`}function ir(e,t,n,r){nn?rn?rn.push(r):rn=[r]:nn=r,t=Ed(t,`onChange`),0<t.length&&(n=new xn(`onChange`,`change`,null,n,r),e.push({event:n,listeners:t}))}var ar=null,or=null;function sr(e){yd(e,0)}function cr(e){if(Ft(_t(e)))return e}function lr(e,t){if(e===`change`)return t}var ur=!1;if(ln){var dr;if(ln){var fr=`oninput`in document;if(!fr){var pr=document.createElement(`div`);pr.setAttribute(`oninput`,`return;`),fr=typeof pr.oninput==`function`}dr=fr}else dr=!1;ur=dr&&(!document.documentMode||9<document.documentMode)}function mr(){ar&&(ar.detachEvent(`onpropertychange`,hr),or=ar=null)}function hr(e){if(e.propertyName===`value`&&cr(or)){var t=[];ir(t,or,e,tn(e)),sn(sr,t)}}function gr(e,t,n){e===`focusin`?(mr(),ar=t,or=n,ar.attachEvent(`onpropertychange`,hr)):e===`focusout`&&mr()}function _r(e){if(e===`selectionchange`||e===`keyup`||e===`keydown`)return cr(or)}function vr(e,t){if(e===`click`)return cr(t)}function yr(e,t){if(e===`input`||e===`change`)return cr(t)}function br(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var xr=typeof Object.is==`function`?Object.is:br;function Sr(e,t){if(xr(e,t))return!0;if(typeof e!=`object`||!e||typeof t!=`object`||!t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!Ce.call(t,i)||!xr(e[i],t[i]))return!1}return!0}function Cr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function wr(e,t){var n=Cr(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}a:{for(;n;){if(n.nextSibling){n=n.nextSibling;break a}n=n.parentNode}n=void 0}n=Cr(n)}}function Tr(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Tr(e,t.parentNode):`contains`in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Er(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=It(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href==`string`}catch{n=!1}if(n)e=t.contentWindow;else break;t=It(e.document)}return t}function Dr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t===`input`&&(e.type===`text`||e.type===`search`||e.type===`tel`||e.type===`url`||e.type===`password`)||t===`textarea`||e.contentEditable===`true`)}var Or=ln&&`documentMode`in document&&11>=document.documentMode,kr=null,Ar=null,jr=null,Mr=!1;function Nr(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Mr||kr==null||kr!==It(r)||(r=kr,`selectionStart`in r&&Dr(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),jr&&Sr(jr,r)||(jr=r,r=Ed(Ar,`onSelect`),0<r.length&&(t=new xn(`onSelect`,`select`,null,t,n),e.push({event:t,listeners:r}),t.target=kr)))}function Pr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n[`Webkit`+e]=`webkit`+t,n[`Moz`+e]=`moz`+t,n}var Fr={animationend:Pr(`Animation`,`AnimationEnd`),animationiteration:Pr(`Animation`,`AnimationIteration`),animationstart:Pr(`Animation`,`AnimationStart`),transitionrun:Pr(`Transition`,`TransitionRun`),transitionstart:Pr(`Transition`,`TransitionStart`),transitioncancel:Pr(`Transition`,`TransitionCancel`),transitionend:Pr(`Transition`,`TransitionEnd`)},Ir={},Lr={};ln&&(Lr=document.createElement(`div`).style,`AnimationEvent`in window||(delete Fr.animationend.animation,delete Fr.animationiteration.animation,delete Fr.animationstart.animation),`TransitionEvent`in window||delete Fr.transitionend.transition);function Rr(e){if(Ir[e])return Ir[e];if(!Fr[e])return e;var t=Fr[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Lr)return Ir[e]=t[n];return e}var zr=Rr(`animationend`),Br=Rr(`animationiteration`),Vr=Rr(`animationstart`),Hr=Rr(`transitionrun`),Ur=Rr(`transitionstart`),Wr=Rr(`transitioncancel`),Gr=Rr(`transitionend`),Kr=new Map,qr=`abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);qr.push(`scrollEnd`);function Jr(e,t){Kr.set(e,t),St(t,[e])}var Yr=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},Xr=[],Zr=0,B=0;function Qr(){for(var e=Zr,t=B=Zr=0;t<e;){var n=Xr[t];Xr[t++]=null;var r=Xr[t];Xr[t++]=null;var i=Xr[t];Xr[t++]=null;var a=Xr[t];if(Xr[t++]=null,r!==null&&i!==null){var o=r.pending;o===null?i.next=i:(i.next=o.next,o.next=i),r.pending=i}a!==0&&ni(n,i,a)}}function $r(e,t,n,r){Xr[Zr++]=e,Xr[Zr++]=t,Xr[Zr++]=n,Xr[Zr++]=r,B|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function ei(e,t,n,r){return $r(e,t,n,r),ri(e)}function ti(e,t){return $r(e,null,null,t),ri(e)}function ni(e,t,n){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n);for(var i=!1,a=e.return;a!==null;)a.childLanes|=n,r=a.alternate,r!==null&&(r.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(i=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,i&&t!==null&&(i=31-L(n),e=a.hiddenUpdates,r=e[i],r===null?e[i]=[t]:r.push(t),t.lane=n|536870912),a):null}function ri(e){if(50<du)throw du=0,fu=null,Error(i(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var V={};function ii(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ai(e,t,n,r){return new ii(e,t,n,r)}function oi(e){return e=e.prototype,!(!e||!e.isReactComponent)}function si(e,t){var n=e.alternate;return n===null?(n=ai(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&65011712,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function ci(e,t){e.flags&=65011714;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function li(e,t,n,r,a,o){var s=0;if(r=e,typeof e==`function`)oi(e)&&(s=1);else if(typeof e==`string`)s=Uf(e,n,ue.current)?26:e===`html`||e===`head`||e===`body`?27:5;else a:switch(e){case te:return e=ai(31,n,t,a),e.elementType=te,e.lanes=o,e;case y:return ui(n.children,a,o,t);case b:s=8,a|=24;break;case x:return e=ai(12,n,t,a|2),e.elementType=x,e.lanes=o,e;case ee:return e=ai(13,n,t,a),e.elementType=ee,e.lanes=o,e;case T:return e=ai(19,n,t,a),e.elementType=T,e.lanes=o,e;default:if(typeof e==`object`&&e)switch(e.$$typeof){case C:s=10;break a;case S:s=9;break a;case w:s=11;break a;case E:s=14;break a;case D:s=16,r=null;break a}s=29,n=Error(i(130,e===null?`null`:typeof e,``)),r=null}return t=ai(s,n,t,a),t.elementType=e,t.type=r,t.lanes=o,t}function ui(e,t,n,r){return e=ai(7,e,r,t),e.lanes=n,e}function di(e,t,n){return e=ai(6,e,null,t),e.lanes=n,e}function fi(e){var t=ai(18,null,null,0);return t.stateNode=e,t}function pi(e,t,n){return t=ai(4,e.children===null?[]:e.children,e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var mi=new WeakMap;function hi(e,t){if(typeof e==`object`&&e){var n=mi.get(e);return n===void 0?(t={value:e,source:t,stack:Se(t)},mi.set(e,t),t):n}return{value:e,source:t,stack:Se(t)}}var gi=[],_i=0,vi=null,yi=0,bi=[],xi=0,Si=null,Ci=1,wi=``;function Ti(e,t){gi[_i++]=yi,gi[_i++]=vi,vi=e,yi=t}function Ei(e,t,n){bi[xi++]=Ci,bi[xi++]=wi,bi[xi++]=Si,Si=e;var r=Ci;e=wi;var i=32-L(r)-1;r&=~(1<<i),n+=1;var a=32-L(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,Ci=1<<32-L(t)+i|n<<i|r,wi=a+e}else Ci=1<<a|n<<i|r,wi=e}function Di(e){e.return!==null&&(Ti(e,1),Ei(e,1,0))}function Oi(e){for(;e===vi;)vi=gi[--_i],gi[_i]=null,yi=gi[--_i],gi[_i]=null;for(;e===Si;)Si=bi[--xi],bi[xi]=null,wi=bi[--xi],bi[xi]=null,Ci=bi[--xi],bi[xi]=null}function ki(e,t){bi[xi++]=Ci,bi[xi++]=wi,bi[xi++]=Si,Ci=t.id,wi=t.overflow,Si=e}var Ai=null,H=null,U=!1,ji=null,Mi=!1,Ni=Error(i(519));function Pi(e){throw Bi(hi(Error(i(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?`text`:`HTML`,``)),e)),Ni}function Fi(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[ot]=e,t[st]=r,n){case`dialog`:Q(`cancel`,t),Q(`close`,t);break;case`iframe`:case`object`:case`embed`:Q(`load`,t);break;case`video`:case`audio`:for(n=0;n<_d.length;n++)Q(_d[n],t);break;case`source`:Q(`error`,t);break;case`img`:case`image`:case`link`:Q(`error`,t),Q(`load`,t);break;case`details`:Q(`toggle`,t);break;case`input`:Q(`invalid`,t),Bt(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case`select`:Q(`invalid`,t);break;case`textarea`:Q(`invalid`,t),Wt(t,r.value,r.defaultValue,r.children)}n=r.children,typeof n!=`string`&&typeof n!=`number`&&typeof n!=`bigint`||t.textContent===``+n||!0===r.suppressHydrationWarning||Md(t.textContent,n)?(r.popover!=null&&(Q(`beforetoggle`,t),Q(`toggle`,t)),r.onScroll!=null&&Q(`scroll`,t),r.onScrollEnd!=null&&Q(`scrollend`,t),r.onClick!=null&&(t.onclick=$t),t=!0):t=!1,t||Pi(e,!0)}function Ii(e){for(Ai=e.return;Ai;)switch(Ai.tag){case 5:case 31:case 13:Mi=!1;return;case 27:case 3:Mi=!0;return;default:Ai=Ai.return}}function Li(e){if(e!==Ai)return!1;if(!U)return Ii(e),U=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=!(n!==`form`&&n!==`button`)||Ud(e.type,e.memoizedProps)),n=!n),n&&H&&Pi(e),Ii(e),t===13){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));H=uf(e)}else if(t===31){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));H=uf(e)}else t===27?(t=H,Zd(e.type)?(e=lf,lf=null,H=e):H=t):H=Ai?cf(e.stateNode.nextSibling):null;return!0}function Ri(){H=Ai=null,U=!1}function zi(){var e=ji;return e!==null&&(Zl===null?Zl=e:Zl.push.apply(Zl,e),ji=null),e}function Bi(e){ji===null?ji=[e]:ji.push(e)}var Vi=le(null),Hi=null,Ui=null;function Wi(e,t,n){N(Vi,t._currentValue),t._currentValue=n}function Gi(e){e._currentValue=Vi.current,M(Vi)}function Ki(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)===t?r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t):(e.childLanes|=t,r!==null&&(r.childLanes|=t)),e===n)break;e=e.return}}function qi(e,t,n,r){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var o=a.dependencies;if(o!==null){var s=a.child;o=o.firstContext;a:for(;o!==null;){var c=o;o=a;for(var l=0;l<t.length;l++)if(c.context===t[l]){o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),Ki(o.return,n,e),r||(s=null);break a}o=c.next}}else if(a.tag===18){if(s=a.return,s===null)throw Error(i(341));s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),Ki(s,n,e),s=null}else s=a.child;if(s!==null)s.return=a;else for(s=a;s!==null;){if(s===e){s=null;break}if(a=s.sibling,a!==null){a.return=s.return,s=a;break}s=s.return}a=s}}function Ji(e,t,n,r){e=null;for(var a=t,o=!1;a!==null;){if(!o){if(a.flags&524288)o=!0;else if(a.flags&262144)break}if(a.tag===10){var s=a.alternate;if(s===null)throw Error(i(387));if(s=s.memoizedProps,s!==null){var c=a.type;xr(a.pendingProps.value,s.value)||(e===null?e=[c]:e.push(c))}}else if(a===fe.current){if(s=a.alternate,s===null)throw Error(i(387));s.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(e===null?e=[Qf]:e.push(Qf))}a=a.return}e!==null&&qi(t,e,n,r),t.flags|=262144}function Yi(e){for(e=e.firstContext;e!==null;){if(!xr(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Xi(e){Hi=e,Ui=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Zi(e){return $i(Hi,e)}function Qi(e,t){return Hi===null&&Xi(e),$i(e,t)}function $i(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},Ui===null){if(e===null)throw Error(i(308));Ui=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Ui=Ui.next=t;return n}var ea=typeof AbortController<`u`?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},ta=t.unstable_scheduleCallback,na=t.unstable_NormalPriority,ra={$$typeof:C,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function ia(){return{controller:new ea,data:new Map,refCount:0}}function aa(e){e.refCount--,e.refCount===0&&ta(na,function(){e.controller.abort()})}var oa=null,sa=0,ca=0,la=null;function ua(e,t){if(oa===null){var n=oa=[];sa=0,ca=dd(),la={status:`pending`,value:void 0,then:function(e){n.push(e)}}}return sa++,t.then(da,da),t}function da(){if(--sa===0&&oa!==null){la!==null&&(la.status=`fulfilled`);var e=oa;oa=null,ca=0,la=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function fa(e,t){var n=[],r={status:`pending`,value:null,reason:null,then:function(e){n.push(e)}};return e.then(function(){r.status=`fulfilled`,r.value=t;for(var e=0;e<n.length;e++)(0,n[e])(t)},function(e){for(r.status=`rejected`,r.reason=e,e=0;e<n.length;e++)(0,n[e])(void 0)}),r}var pa=k.S;k.S=function(e,t){eu=I(),typeof t==`object`&&t&&typeof t.then==`function`&&ua(e,t),pa!==null&&pa(e,t)};var ma=le(null);function ha(){var e=ma.current;return e===null?q.pooledCache:e}function ga(e,t){t===null?N(ma,ma.current):N(ma,t.pool)}function _a(){var e=ha();return e===null?null:{parent:ra._currentValue,pool:e}}var va=Error(i(460)),ya=Error(i(474)),ba=Error(i(542)),xa={then:function(){}};function Sa(e){return e=e.status,e===`fulfilled`||e===`rejected`}function Ca(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then($t,$t),t=n),t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,Da(e),e;default:if(typeof t.status==`string`)t.then($t,$t);else{if(e=q,e!==null&&100<e.shellSuspendCounter)throw Error(i(482));e=t,e.status=`pending`,e.then(function(e){if(t.status===`pending`){var n=t;n.status=`fulfilled`,n.value=e}},function(e){if(t.status===`pending`){var n=t;n.status=`rejected`,n.reason=e}})}switch(t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,Da(e),e}throw Ta=t,va}}function wa(e){try{var t=e._init;return t(e._payload)}catch(e){throw typeof e==`object`&&e&&typeof e.then==`function`?(Ta=e,va):e}}var Ta=null;function Ea(){if(Ta===null)throw Error(i(459));var e=Ta;return Ta=null,e}function Da(e){if(e===va||e===ba)throw Error(i(483))}var Oa=null,ka=0;function Aa(e){var t=ka;return ka+=1,Oa===null&&(Oa=[]),Ca(Oa,e,t)}function ja(e,t){t=t.props.ref,e.ref=t===void 0?null:t}function Ma(e,t){throw t.$$typeof===g?Error(i(525)):(e=Object.prototype.toString.call(t),Error(i(31,e===`[object Object]`?`object with keys {`+Object.keys(t).join(`, `)+`}`:e)))}function Na(e){function t(t,n){if(e){var r=t.deletions;r===null?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;r!==null;)t(n,r),r=r.sibling;return null}function r(e){for(var t=new Map;e!==null;)e.key===null?t.set(e.index,e):t.set(e.key,e),e=e.sibling;return t}function a(e,t){return e=si(e,t),e.index=0,e.sibling=null,e}function o(t,n,r){return t.index=r,e?(r=t.alternate,r===null?(t.flags|=67108866,n):(r=r.index,r<n?(t.flags|=67108866,n):r)):(t.flags|=1048576,n)}function s(t){return e&&t.alternate===null&&(t.flags|=67108866),t}function c(e,t,n,r){return t===null||t.tag!==6?(t=di(n,e.mode,r),t.return=e,t):(t=a(t,n),t.return=e,t)}function l(e,t,n,r){var i=n.type;return i===y?d(e,t,n.props.children,r,n.key):t!==null&&(t.elementType===i||typeof i==`object`&&i&&i.$$typeof===D&&wa(i)===t.type)?(t=a(t,n.props),ja(t,n),t.return=e,t):(t=li(n.type,n.key,n.props,null,e.mode,r),ja(t,n),t.return=e,t)}function u(e,t,n,r){return t===null||t.tag!==4||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?(t=pi(n,e.mode,r),t.return=e,t):(t=a(t,n.children||[]),t.return=e,t)}function d(e,t,n,r,i){return t===null||t.tag!==7?(t=ui(n,e.mode,r,i),t.return=e,t):(t=a(t,n),t.return=e,t)}function f(e,t,n){if(typeof t==`string`&&t!==``||typeof t==`number`||typeof t==`bigint`)return t=di(``+t,e.mode,n),t.return=e,t;if(typeof t==`object`&&t){switch(t.$$typeof){case _:return n=li(t.type,t.key,t.props,null,e.mode,n),ja(n,t),n.return=e,n;case v:return t=pi(t,e.mode,n),t.return=e,t;case D:return t=wa(t),f(e,t,n)}if(oe(t)||O(t))return t=ui(t,e.mode,n,null),t.return=e,t;if(typeof t.then==`function`)return f(e,Aa(t),n);if(t.$$typeof===C)return f(e,Qi(e,t),n);Ma(e,t)}return null}function p(e,t,n,r){var i=t===null?null:t.key;if(typeof n==`string`&&n!==``||typeof n==`number`||typeof n==`bigint`)return i===null?c(e,t,``+n,r):null;if(typeof n==`object`&&n){switch(n.$$typeof){case _:return n.key===i?l(e,t,n,r):null;case v:return n.key===i?u(e,t,n,r):null;case D:return n=wa(n),p(e,t,n,r)}if(oe(n)||O(n))return i===null?d(e,t,n,r,null):null;if(typeof n.then==`function`)return p(e,t,Aa(n),r);if(n.$$typeof===C)return p(e,t,Qi(e,n),r);Ma(e,n)}return null}function m(e,t,n,r,i){if(typeof r==`string`&&r!==``||typeof r==`number`||typeof r==`bigint`)return e=e.get(n)||null,c(t,e,``+r,i);if(typeof r==`object`&&r){switch(r.$$typeof){case _:return e=e.get(r.key===null?n:r.key)||null,l(t,e,r,i);case v:return e=e.get(r.key===null?n:r.key)||null,u(t,e,r,i);case D:return r=wa(r),m(e,t,n,r,i)}if(oe(r)||O(r))return e=e.get(n)||null,d(t,e,r,i,null);if(typeof r.then==`function`)return m(e,t,n,Aa(r),i);if(r.$$typeof===C)return m(e,t,n,Qi(t,r),i);Ma(t,r)}return null}function h(i,a,s,c){for(var l=null,u=null,d=a,h=a=0,g=null;d!==null&&h<s.length;h++){d.index>h?(g=d,d=null):g=d.sibling;var _=p(i,d,s[h],c);if(_===null){d===null&&(d=g);break}e&&d&&_.alternate===null&&t(i,d),a=o(_,a,h),u===null?l=_:u.sibling=_,u=_,d=g}if(h===s.length)return n(i,d),U&&Ti(i,h),l;if(d===null){for(;h<s.length;h++)d=f(i,s[h],c),d!==null&&(a=o(d,a,h),u===null?l=d:u.sibling=d,u=d);return U&&Ti(i,h),l}for(d=r(d);h<s.length;h++)g=m(d,i,h,s[h],c),g!==null&&(e&&g.alternate!==null&&d.delete(g.key===null?h:g.key),a=o(g,a,h),u===null?l=g:u.sibling=g,u=g);return e&&d.forEach(function(e){return t(i,e)}),U&&Ti(i,h),l}function g(a,s,c,l){if(c==null)throw Error(i(151));for(var u=null,d=null,h=s,g=s=0,_=null,v=c.next();h!==null&&!v.done;g++,v=c.next()){h.index>g?(_=h,h=null):_=h.sibling;var y=p(a,h,v.value,l);if(y===null){h===null&&(h=_);break}e&&h&&y.alternate===null&&t(a,h),s=o(y,s,g),d===null?u=y:d.sibling=y,d=y,h=_}if(v.done)return n(a,h),U&&Ti(a,g),u;if(h===null){for(;!v.done;g++,v=c.next())v=f(a,v.value,l),v!==null&&(s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return U&&Ti(a,g),u}for(h=r(h);!v.done;g++,v=c.next())v=m(h,a,g,v.value,l),v!==null&&(e&&v.alternate!==null&&h.delete(v.key===null?g:v.key),s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return e&&h.forEach(function(e){return t(a,e)}),U&&Ti(a,g),u}function b(e,r,o,c){if(typeof o==`object`&&o&&o.type===y&&o.key===null&&(o=o.props.children),typeof o==`object`&&o){switch(o.$$typeof){case _:a:{for(var l=o.key;r!==null;){if(r.key===l){if(l=o.type,l===y){if(r.tag===7){n(e,r.sibling),c=a(r,o.props.children),c.return=e,e=c;break a}}else if(r.elementType===l||typeof l==`object`&&l&&l.$$typeof===D&&wa(l)===r.type){n(e,r.sibling),c=a(r,o.props),ja(c,o),c.return=e,e=c;break a}n(e,r);break}else t(e,r);r=r.sibling}o.type===y?(c=ui(o.props.children,e.mode,c,o.key),c.return=e,e=c):(c=li(o.type,o.key,o.props,null,e.mode,c),ja(c,o),c.return=e,e=c)}return s(e);case v:a:{for(l=o.key;r!==null;){if(r.key===l)if(r.tag===4&&r.stateNode.containerInfo===o.containerInfo&&r.stateNode.implementation===o.implementation){n(e,r.sibling),c=a(r,o.children||[]),c.return=e,e=c;break a}else{n(e,r);break}else t(e,r);r=r.sibling}c=pi(o,e.mode,c),c.return=e,e=c}return s(e);case D:return o=wa(o),b(e,r,o,c)}if(oe(o))return h(e,r,o,c);if(O(o)){if(l=O(o),typeof l!=`function`)throw Error(i(150));return o=l.call(o),g(e,r,o,c)}if(typeof o.then==`function`)return b(e,r,Aa(o),c);if(o.$$typeof===C)return b(e,r,Qi(e,o),c);Ma(e,o)}return typeof o==`string`&&o!==``||typeof o==`number`||typeof o==`bigint`?(o=``+o,r!==null&&r.tag===6?(n(e,r.sibling),c=a(r,o),c.return=e,e=c):(n(e,r),c=di(o,e.mode,c),c.return=e,e=c),s(e)):n(e,r)}return function(e,t,n,r){try{ka=0;var i=b(e,t,n,r);return Oa=null,i}catch(t){if(t===va||t===ba)throw t;var a=ai(29,t,null,e.mode);return a.lanes=r,a.return=e,a}}}var Pa=Na(!0),Fa=Na(!1),Ia=!1;function La(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Ra(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function za(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Ba(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,K&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,t=ri(e),ni(e,null,n),t}return $r(e,r,t,n),ri(e)}function Va(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,n&4194048)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,$e(e,n)}}function Ha(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,callbacks:r.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var Ua=!1;function Wa(){if(Ua){var e=la;if(e!==null)throw e}}function Ga(e,t,n,r){Ua=!1;var i=e.updateQueue;Ia=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var c=s,l=c.next;c.next=null,o===null?a=l:o.next=l,o=c;var u=e.alternate;u!==null&&(u=u.updateQueue,s=u.lastBaseUpdate,s!==o&&(s===null?u.firstBaseUpdate=l:s.next=l,u.lastBaseUpdate=c))}if(a!==null){var d=i.baseState;o=0,u=l=c=null,s=a;do{var f=s.lane&-536870913,p=f!==s.lane;if(p?(Y&f)===f:(r&f)===f){f!==0&&f===ca&&(Ua=!0),u!==null&&(u=u.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});a:{var m=e,g=s;f=t;var _=n;switch(g.tag){case 1:if(m=g.payload,typeof m==`function`){d=m.call(_,d,f);break a}d=m;break a;case 3:m.flags=m.flags&-65537|128;case 0:if(m=g.payload,f=typeof m==`function`?m.call(_,d,f):m,f==null)break a;d=h({},d,f);break a;case 2:Ia=!0}}f=s.callback,f!==null&&(e.flags|=64,p&&(e.flags|=8192),p=i.callbacks,p===null?i.callbacks=[f]:p.push(f))}else p={lane:f,tag:s.tag,payload:s.payload,callback:s.callback,next:null},u===null?(l=u=p,c=d):u=u.next=p,o|=f;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;p=s,s=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(1);u===null&&(c=d),i.baseState=c,i.firstBaseUpdate=l,i.lastBaseUpdate=u,a===null&&(i.shared.lanes=0),Gl|=o,e.lanes=o,e.memoizedState=d}}function Ka(e,t){if(typeof e!=`function`)throw Error(i(191,e));e.call(t)}function qa(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)Ka(n[e],t)}var Ja=le(null),Ya=le(0);function Xa(e,t){e=Ul,N(Ya,e),N(Ja,t),Ul=e|t.baseLanes}function Za(){N(Ya,Ul),N(Ja,Ja.current)}function Qa(){Ul=Ya.current,M(Ja),M(Ya)}var $a=le(null),eo=null;function to(e){var t=e.alternate;N(oo,oo.current&1),N($a,e),eo===null&&(t===null||Ja.current!==null||t.memoizedState!==null)&&(eo=e)}function no(e){N(oo,oo.current),N($a,e),eo===null&&(eo=e)}function ro(e){e.tag===22?(N(oo,oo.current),N($a,e),eo===null&&(eo=e)):io(e)}function io(){N(oo,oo.current),N($a,$a.current)}function ao(e){M($a),eo===e&&(eo=null),M(oo)}var oo=le(0);function so(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||af(n)||of(n)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder===`forwards`||t.memoizedProps.revealOrder===`backwards`||t.memoizedProps.revealOrder===`unstable_legacy-backwards`||t.memoizedProps.revealOrder===`together`)){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var co=0,W=null,G=null,lo=null,uo=!1,fo=!1,po=!1,mo=0,ho=0,go=null,_o=0;function vo(){throw Error(i(321))}function yo(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!xr(e[n],t[n]))return!1;return!0}function bo(e,t,n,r,i,a){return co=a,W=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,k.H=e===null||e.memoizedState===null?Ls:Rs,po=!1,a=n(r,i),po=!1,fo&&(a=So(t,n,r,i)),xo(e),a}function xo(e){k.H=Is;var t=G!==null&&G.next!==null;if(co=0,lo=G=W=null,uo=!1,ho=0,go=null,t)throw Error(i(300));e===null||tc||(e=e.dependencies,e!==null&&Yi(e)&&(tc=!0))}function So(e,t,n,r){W=e;var a=0;do{if(fo&&(go=null),ho=0,fo=!1,25<=a)throw Error(i(301));if(a+=1,lo=G=null,e.updateQueue!=null){var o=e.updateQueue;o.lastEffect=null,o.events=null,o.stores=null,o.memoCache!=null&&(o.memoCache.index=0)}k.H=zs,o=t(n,r)}while(fo);return o}function Co(){var e=k.H,t=e.useState()[0];return t=typeof t.then==`function`?Ao(t):t,e=e.useState()[0],(G===null?null:G.memoizedState)!==e&&(W.flags|=1024),t}function wo(){var e=mo!==0;return mo=0,e}function To(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function Eo(e){if(uo){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}uo=!1}co=0,lo=G=W=null,fo=!1,ho=mo=0,go=null}function Do(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return lo===null?W.memoizedState=lo=e:lo=lo.next=e,lo}function Oo(){if(G===null){var e=W.alternate;e=e===null?null:e.memoizedState}else e=G.next;var t=lo===null?W.memoizedState:lo.next;if(t!==null)lo=t,G=e;else{if(e===null)throw W.alternate===null?Error(i(467)):Error(i(310));G=e,e={memoizedState:G.memoizedState,baseState:G.baseState,baseQueue:G.baseQueue,queue:G.queue,next:null},lo===null?W.memoizedState=lo=e:lo=lo.next=e}return lo}function ko(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Ao(e){var t=ho;return ho+=1,go===null&&(go=[]),e=Ca(go,e,t),t=W,(lo===null?t.memoizedState:lo.next)===null&&(t=t.alternate,k.H=t===null||t.memoizedState===null?Ls:Rs),e}function jo(e){if(typeof e==`object`&&e){if(typeof e.then==`function`)return Ao(e);if(e.$$typeof===C)return Zi(e)}throw Error(i(438,String(e)))}function Mo(e){var t=null,n=W.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var r=W.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(t??={data:[],index:0},n===null&&(n=ko(),W.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=ne;return t.index++,n}function No(e,t){return typeof t==`function`?t(e):t}function Po(e){return Fo(Oo(),G,e)}function Fo(e,t,n){var r=e.queue;if(r===null)throw Error(i(311));r.lastRenderedReducer=n;var a=e.baseQueue,o=r.pending;if(o!==null){if(a!==null){var s=a.next;a.next=o.next,o.next=s}t.baseQueue=a=o,r.pending=null}if(o=e.baseState,a===null)e.memoizedState=o;else{t=a.next;var c=s=null,l=null,u=t,d=!1;do{var f=u.lane&-536870913;if(f===u.lane?(co&f)===f:(Y&f)===f){var p=u.revertLane;if(p===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),f===ca&&(d=!0);else if((co&p)===p){u=u.next,p===ca&&(d=!0);continue}else f={lane:0,revertLane:u.revertLane,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=f,s=o):l=l.next=f,W.lanes|=p,Gl|=p;f=u.action,po&&n(o,f),o=u.hasEagerState?u.eagerState:n(o,f)}else p={lane:f,revertLane:u.revertLane,gesture:u.gesture,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=p,s=o):l=l.next=p,W.lanes|=f,Gl|=f;u=u.next}while(u!==null&&u!==t);if(l===null?s=o:l.next=c,!xr(o,e.memoizedState)&&(tc=!0,d&&(n=la,n!==null)))throw n;e.memoizedState=o,e.baseState=s,e.baseQueue=l,r.lastRenderedState=o}return a===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function Io(e){var t=Oo(),n=t.queue;if(n===null)throw Error(i(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,o=t.memoizedState;if(a!==null){n.pending=null;var s=a=a.next;do o=e(o,s.action),s=s.next;while(s!==a);xr(o,t.memoizedState)||(tc=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function Lo(e,t,n){var r=W,a=Oo(),o=U;if(o){if(n===void 0)throw Error(i(407));n=n()}else n=t();var s=!xr((G||a).memoizedState,n);if(s&&(a.memoizedState=n,tc=!0),a=a.queue,cs(Bo.bind(null,r,a,e),[e]),a.getSnapshot!==t||s||lo!==null&&lo.memoizedState.tag&1){if(r.flags|=2048,rs(9,{destroy:void 0},zo.bind(null,r,a,n,t),null),q===null)throw Error(i(349));o||co&127||Ro(r,t,n)}return n}function Ro(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=W.updateQueue,t===null?(t=ko(),W.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function zo(e,t,n,r){t.value=n,t.getSnapshot=r,Vo(t)&&Ho(e)}function Bo(e,t,n){return n(function(){Vo(t)&&Ho(e)})}function Vo(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!xr(e,n)}catch{return!0}}function Ho(e){var t=ti(e,2);t!==null&&hu(t,e,2)}function Uo(e){var t=Do();if(typeof e==`function`){var n=e;if(e=n(),po){Re(!0);try{n()}finally{Re(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:No,lastRenderedState:e},t}function Wo(e,t,n,r){return e.baseState=n,Fo(e,G,typeof r==`function`?r:No)}function Go(e,t,n,r,a){if(Ns(e))throw Error(i(485));if(e=t.action,e!==null){var o={payload:a,action:e,next:null,isTransition:!0,status:`pending`,value:null,reason:null,listeners:[],then:function(e){o.listeners.push(e)}};k.T===null?o.isTransition=!1:n(!0),r(o),n=t.pending,n===null?(o.next=t.pending=o,Ko(t,o)):(o.next=n.next,t.pending=n.next=o)}}function Ko(e,t){var n=t.action,r=t.payload,i=e.state;if(t.isTransition){var a=k.T,o={};k.T=o;try{var s=n(i,r),c=k.S;c!==null&&c(o,s),qo(e,t,s)}catch(n){Yo(e,t,n)}finally{a!==null&&o.types!==null&&(a.types=o.types),k.T=a}}else try{a=n(i,r),qo(e,t,a)}catch(n){Yo(e,t,n)}}function qo(e,t,n){typeof n==`object`&&n&&typeof n.then==`function`?n.then(function(n){Jo(e,t,n)},function(n){return Yo(e,t,n)}):Jo(e,t,n)}function Jo(e,t,n){t.status=`fulfilled`,t.value=n,Xo(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,Ko(e,n)))}function Yo(e,t,n){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do t.status=`rejected`,t.reason=n,Xo(t),t=t.next;while(t!==r)}e.action=null}function Xo(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Zo(e,t){return t}function Qo(e,t){if(U){var n=q.formState;if(n!==null){a:{var r=W;if(U){if(H){b:{for(var i=H,a=Mi;i.nodeType!==8;){if(!a){i=null;break b}if(i=cf(i.nextSibling),i===null){i=null;break b}}a=i.data,i=a===`F!`||a===`F`?i:null}if(i){H=cf(i.nextSibling),r=i.data===`F!`;break a}}Pi(r)}r=!1}r&&(t=n[0])}}return n=Do(),n.memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Zo,lastRenderedState:t},n.queue=r,n=As.bind(null,W,r),r.dispatch=n,r=Uo(!1),a=Ms.bind(null,W,!1,r.queue),r=Do(),i={state:t,dispatch:null,action:e,pending:null},r.queue=i,n=Go.bind(null,W,i,a,n),i.dispatch=n,r.memoizedState=e,[t,n,!1]}function $o(e){return es(Oo(),G,e)}function es(e,t,n){if(t=Fo(e,t,Zo)[0],e=Po(No)[0],typeof t==`object`&&t&&typeof t.then==`function`)try{var r=Ao(t)}catch(e){throw e===va?ba:e}else r=t;t=Oo();var i=t.queue,a=i.dispatch;return n!==t.memoizedState&&(W.flags|=2048,rs(9,{destroy:void 0},ts.bind(null,i,n),null)),[r,a,e]}function ts(e,t){e.action=t}function ns(e){var t=Oo(),n=G;if(n!==null)return es(t,n,e);Oo(),t=t.memoizedState,n=Oo();var r=n.queue.dispatch;return n.memoizedState=e,[t,r,!1]}function rs(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},t=W.updateQueue,t===null&&(t=ko(),W.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function is(){return Oo().memoizedState}function as(e,t,n,r){var i=Do();W.flags|=e,i.memoizedState=rs(1|t,{destroy:void 0},n,r===void 0?null:r)}function os(e,t,n,r){var i=Oo();r=r===void 0?null:r;var a=i.memoizedState.inst;G!==null&&r!==null&&yo(r,G.memoizedState.deps)?i.memoizedState=rs(t,a,n,r):(W.flags|=e,i.memoizedState=rs(1|t,a,n,r))}function ss(e,t){as(8390656,8,e,t)}function cs(e,t){os(2048,8,e,t)}function ls(e){W.flags|=4;var t=W.updateQueue;if(t===null)t=ko(),W.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function us(e){var t=Oo().memoizedState;return ls({ref:t,nextImpl:e}),function(){if(K&2)throw Error(i(440));return t.impl.apply(void 0,arguments)}}function ds(e,t){return os(4,2,e,t)}function fs(e,t){return os(4,4,e,t)}function ps(e,t){if(typeof t==`function`){e=e();var n=t(e);return function(){typeof n==`function`?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function ms(e,t,n){n=n==null?null:n.concat([e]),os(4,4,ps.bind(null,t,e),n)}function hs(){}function gs(e,t){var n=Oo();t=t===void 0?null:t;var r=n.memoizedState;return t!==null&&yo(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function _s(e,t){var n=Oo();t=t===void 0?null:t;var r=n.memoizedState;if(t!==null&&yo(t,r[1]))return r[0];if(r=e(),po){Re(!0);try{e()}finally{Re(!1)}}return n.memoizedState=[r,t],r}function vs(e,t,n){return n===void 0||co&1073741824&&!(Y&261930)?e.memoizedState=t:(e.memoizedState=n,e=mu(),W.lanes|=e,Gl|=e,n)}function ys(e,t,n,r){return xr(n,t)?n:Ja.current===null?!(co&42)||co&1073741824&&!(Y&261930)?(tc=!0,e.memoizedState=n):(e=mu(),W.lanes|=e,Gl|=e,t):(e=vs(e,n,r),xr(e,t)||(tc=!0),e)}function bs(e,t,n,r,i){var a=A.p;A.p=a!==0&&8>a?a:8;var o=k.T,s={};k.T=s,Ms(e,!1,t,n);try{var c=i(),l=k.S;l!==null&&l(s,c),typeof c==`object`&&c&&typeof c.then==`function`?js(e,t,fa(c,r),pu(e)):js(e,t,r,pu(e))}catch(n){js(e,t,{then:function(){},status:`rejected`,reason:n},pu())}finally{A.p=a,o!==null&&s.types!==null&&(o.types=s.types),k.T=o}}function xs(){}function Ss(e,t,n,r){if(e.tag!==5)throw Error(i(476));var a=Cs(e).queue;bs(e,a,t,se,n===null?xs:function(){return ws(e),n(r)})}function Cs(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:se,baseState:se,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:No,lastRenderedState:se},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:No,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function ws(e){var t=Cs(e);t.next===null&&(t=e.alternate.memoizedState),js(e,t.next.queue,{},pu())}function Ts(){return Zi(Qf)}function Es(){return Oo().memoizedState}function Ds(){return Oo().memoizedState}function Os(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=pu();e=za(n);var r=Ba(t,e,n);r!==null&&(hu(r,t,n),Va(r,t,n)),t={cache:ia()},e.payload=t;return}t=t.return}}function ks(e,t,n){var r=pu();n={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},Ns(e)?Ps(t,n):(n=ei(e,t,n,r),n!==null&&(hu(n,e,r),Fs(n,t,r)))}function As(e,t,n){js(e,t,n,pu())}function js(e,t,n,r){var i={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(Ns(e))Ps(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(i.hasEagerState=!0,i.eagerState=s,xr(s,o))return $r(e,t,i,0),q===null&&Qr(),!1}catch{}if(n=ei(e,t,i,r),n!==null)return hu(n,e,r),Fs(n,t,r),!0}return!1}function Ms(e,t,n,r){if(r={lane:2,revertLane:dd(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},Ns(e)){if(t)throw Error(i(479))}else t=ei(e,n,r,2),t!==null&&hu(t,e,2)}function Ns(e){var t=e.alternate;return e===W||t!==null&&t===W}function Ps(e,t){fo=uo=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Fs(e,t,n){if(n&4194048){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,$e(e,n)}}var Is={readContext:Zi,use:jo,useCallback:vo,useContext:vo,useEffect:vo,useImperativeHandle:vo,useLayoutEffect:vo,useInsertionEffect:vo,useMemo:vo,useReducer:vo,useRef:vo,useState:vo,useDebugValue:vo,useDeferredValue:vo,useTransition:vo,useSyncExternalStore:vo,useId:vo,useHostTransitionStatus:vo,useFormState:vo,useActionState:vo,useOptimistic:vo,useMemoCache:vo,useCacheRefresh:vo};Is.useEffectEvent=vo;var Ls={readContext:Zi,use:jo,useCallback:function(e,t){return Do().memoizedState=[e,t===void 0?null:t],e},useContext:Zi,useEffect:ss,useImperativeHandle:function(e,t,n){n=n==null?null:n.concat([e]),as(4194308,4,ps.bind(null,t,e),n)},useLayoutEffect:function(e,t){return as(4194308,4,e,t)},useInsertionEffect:function(e,t){as(4,2,e,t)},useMemo:function(e,t){var n=Do();t=t===void 0?null:t;var r=e();if(po){Re(!0);try{e()}finally{Re(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=Do();if(n!==void 0){var i=n(t);if(po){Re(!0);try{n(t)}finally{Re(!1)}}}else i=t;return r.memoizedState=r.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},r.queue=e,e=e.dispatch=ks.bind(null,W,e),[r.memoizedState,e]},useRef:function(e){var t=Do();return e={current:e},t.memoizedState=e},useState:function(e){e=Uo(e);var t=e.queue,n=As.bind(null,W,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:hs,useDeferredValue:function(e,t){return vs(Do(),e,t)},useTransition:function(){var e=Uo(!1);return e=bs.bind(null,W,e.queue,!0,!1),Do().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=W,a=Do();if(U){if(n===void 0)throw Error(i(407));n=n()}else{if(n=t(),q===null)throw Error(i(349));Y&127||Ro(r,t,n)}a.memoizedState=n;var o={value:n,getSnapshot:t};return a.queue=o,ss(Bo.bind(null,r,o,e),[e]),r.flags|=2048,rs(9,{destroy:void 0},zo.bind(null,r,o,n,t),null),n},useId:function(){var e=Do(),t=q.identifierPrefix;if(U){var n=wi,r=Ci;n=(r&~(1<<32-L(r)-1)).toString(32)+n,t=`_`+t+`R_`+n,n=mo++,0<n&&(t+=`H`+n.toString(32)),t+=`_`}else n=_o++,t=`_`+t+`r_`+n.toString(32)+`_`;return e.memoizedState=t},useHostTransitionStatus:Ts,useFormState:Qo,useActionState:Qo,useOptimistic:function(e){var t=Do();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=Ms.bind(null,W,!0,n),n.dispatch=t,[e,t]},useMemoCache:Mo,useCacheRefresh:function(){return Do().memoizedState=Os.bind(null,W)},useEffectEvent:function(e){var t=Do(),n={impl:e};return t.memoizedState=n,function(){if(K&2)throw Error(i(440));return n.impl.apply(void 0,arguments)}}},Rs={readContext:Zi,use:jo,useCallback:gs,useContext:Zi,useEffect:cs,useImperativeHandle:ms,useInsertionEffect:ds,useLayoutEffect:fs,useMemo:_s,useReducer:Po,useRef:is,useState:function(){return Po(No)},useDebugValue:hs,useDeferredValue:function(e,t){return ys(Oo(),G.memoizedState,e,t)},useTransition:function(){var e=Po(No)[0],t=Oo().memoizedState;return[typeof e==`boolean`?e:Ao(e),t]},useSyncExternalStore:Lo,useId:Es,useHostTransitionStatus:Ts,useFormState:$o,useActionState:$o,useOptimistic:function(e,t){return Wo(Oo(),G,e,t)},useMemoCache:Mo,useCacheRefresh:Ds};Rs.useEffectEvent=us;var zs={readContext:Zi,use:jo,useCallback:gs,useContext:Zi,useEffect:cs,useImperativeHandle:ms,useInsertionEffect:ds,useLayoutEffect:fs,useMemo:_s,useReducer:Io,useRef:is,useState:function(){return Io(No)},useDebugValue:hs,useDeferredValue:function(e,t){var n=Oo();return G===null?vs(n,e,t):ys(n,G.memoizedState,e,t)},useTransition:function(){var e=Io(No)[0],t=Oo().memoizedState;return[typeof e==`boolean`?e:Ao(e),t]},useSyncExternalStore:Lo,useId:Es,useHostTransitionStatus:Ts,useFormState:ns,useActionState:ns,useOptimistic:function(e,t){var n=Oo();return G===null?(n.baseState=e,[e,n.queue.dispatch]):Wo(n,G,e,t)},useMemoCache:Mo,useCacheRefresh:Ds};zs.useEffectEvent=us;function Bs(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:h({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Vs={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=pu(),i=za(r);i.payload=t,n!=null&&(i.callback=n),t=Ba(e,i,r),t!==null&&(hu(t,e,r),Va(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=pu(),i=za(r);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=Ba(e,i,r),t!==null&&(hu(t,e,r),Va(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=pu(),r=za(n);r.tag=2,t!=null&&(r.callback=t),t=Ba(e,r,n),t!==null&&(hu(t,e,n),Va(t,e,n))}};function Hs(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate==`function`?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!Sr(n,r)||!Sr(i,a):!0}function Us(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps==`function`&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps==`function`&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Vs.enqueueReplaceState(t,t.state,null)}function Ws(e,t){var n=t;if(`ref`in t)for(var r in n={},t)r!==`ref`&&(n[r]=t[r]);if(e=e.defaultProps)for(var i in n===t&&(n=h({},n)),e)n[i]===void 0&&(n[i]=e[i]);return n}function Gs(e){Yr(e)}function Ks(e){console.error(e)}function qs(e){Yr(e)}function Js(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(e){setTimeout(function(){throw e})}}function Ys(e,t,n){try{var r=e.onCaughtError;r(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(e){setTimeout(function(){throw e})}}function Xs(e,t,n){return n=za(n),n.tag=3,n.payload={element:null},n.callback=function(){Js(e,t)},n}function Zs(e){return e=za(e),e.tag=3,e}function Qs(e,t,n,r){var i=n.type.getDerivedStateFromError;if(typeof i==`function`){var a=r.value;e.payload=function(){return i(a)},e.callback=function(){Ys(t,n,r)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch==`function`&&(e.callback=function(){Ys(t,n,r),typeof i!=`function`&&(ru===null?ru=new Set([this]):ru.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:e===null?``:e})})}function $s(e,t,n,r,a){if(n.flags|=32768,typeof r==`object`&&r&&typeof r.then==`function`){if(t=n.alternate,t!==null&&Ji(t,n,a,!0),n=$a.current,n!==null){switch(n.tag){case 31:case 13:return eo===null?Du():n.alternate===null&&Wl===0&&(Wl=3),n.flags&=-257,n.flags|=65536,n.lanes=a,r===xa?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([r]):t.add(r),Gu(e,r,a)),!1;case 22:return n.flags|=65536,r===xa?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([r]):n.add(r)),Gu(e,r,a)),!1}throw Error(i(435,n.tag))}return Gu(e,r,a),Du(),!1}if(U)return t=$a.current,t===null?(r!==Ni&&(t=Error(i(423),{cause:r}),Bi(hi(t,n))),e=e.current.alternate,e.flags|=65536,a&=-a,e.lanes|=a,r=hi(r,n),a=Xs(e.stateNode,r,a),Ha(e,a),Wl!==4&&(Wl=2)):(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=a,r!==Ni&&(e=Error(i(422),{cause:r}),Bi(hi(e,n)))),!1;var o=Error(i(520),{cause:r});if(o=hi(o,n),Xl===null?Xl=[o]:Xl.push(o),Wl!==4&&(Wl=2),t===null)return!0;r=hi(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=a&-a,n.lanes|=e,e=Xs(n.stateNode,r,e),Ha(n,e),!1;case 1:if(t=n.type,o=n.stateNode,!(n.flags&128)&&(typeof t.getDerivedStateFromError==`function`||o!==null&&typeof o.componentDidCatch==`function`&&(ru===null||!ru.has(o))))return n.flags|=65536,a&=-a,n.lanes|=a,a=Zs(a),Qs(a,e,n,r),Ha(n,a),!1}n=n.return}while(n!==null);return!1}var ec=Error(i(461)),tc=!1;function nc(e,t,n,r){t.child=e===null?Fa(t,null,n,r):Pa(t,e.child,n,r)}function rc(e,t,n,r,i){n=n.render;var a=t.ref;if(`ref`in r){var o={};for(var s in r)s!==`ref`&&(o[s]=r[s])}else o=r;return Xi(t),r=bo(e,t,n,o,a,i),s=wo(),e!==null&&!tc?(To(e,t,i),Dc(e,t,i)):(U&&s&&Di(t),t.flags|=1,nc(e,t,r,i),t.child)}function ic(e,t,n,r,i){if(e===null){var a=n.type;return typeof a==`function`&&!oi(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,ac(e,t,a,r,i)):(e=li(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!Oc(e,i)){var o=a.memoizedProps;if(n=n.compare,n=n===null?Sr:n,n(o,r)&&e.ref===t.ref)return Dc(e,t,i)}return t.flags|=1,e=si(a,r),e.ref=t.ref,e.return=t,t.child=e}function ac(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(Sr(a,r)&&e.ref===t.ref)if(tc=!1,t.pendingProps=r=a,Oc(e,i))e.flags&131072&&(tc=!0);else return t.lanes=e.lanes,Dc(e,t,i)}return pc(e,t,n,r,i)}function oc(e,t,n,r){var i=r.children,a=e===null?null:e.memoizedState;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode===`hidden`){if(t.flags&128){if(a=a===null?n:a.baseLanes|n,e!==null){for(r=t.child=e.child,i=0;r!==null;)i=i|r.lanes|r.childLanes,r=r.sibling;r=i&~a}else r=0,t.child=null;return cc(e,t,a,n,r)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&ga(t,a===null?null:a.cachePool),a===null?Za():Xa(t,a),ro(t);else return r=t.lanes=536870912,cc(e,t,a===null?n:a.baseLanes|n,n,r)}else a===null?(e!==null&&ga(t,null),Za(),io(t)):(ga(t,a.cachePool),Xa(t,a),io(t),t.memoizedState=null);return nc(e,t,i,n),t.child}function sc(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function cc(e,t,n,r,i){var a=ha();return a=a===null?null:{parent:ra._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&ga(t,null),Za(),ro(t),e!==null&&Ji(e,t,r,!0),t.childLanes=i,null}function lc(e,t){return t=Sc({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function uc(e,t,n){return Pa(t,e.child,null,n),e=lc(t,t.pendingProps),e.flags|=2,ao(t),t.memoizedState=null,e}function dc(e,t,n){var r=t.pendingProps,a=(t.flags&128)!=0;if(t.flags&=-129,e===null){if(U){if(r.mode===`hidden`)return e=lc(t,r),t.lanes=536870912,sc(null,e);if(no(t),(e=H)?(e=rf(e,Mi),e=e!==null&&e.data===`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Si===null?null:{id:Ci,overflow:wi},retryLane:536870912,hydrationErrors:null},n=fi(e),n.return=t,t.child=n,Ai=t,H=null)):e=null,e===null)throw Pi(t);return t.lanes=536870912,null}return lc(t,r)}var o=e.memoizedState;if(o!==null){var s=o.dehydrated;if(no(t),a)if(t.flags&256)t.flags&=-257,t=uc(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(i(558));else if(tc||Ji(e,t,n,!1),a=(n&e.childLanes)!==0,tc||a){if(r=q,r!==null&&(s=et(r,n),s!==0&&s!==o.retryLane))throw o.retryLane=s,ti(e,s),hu(r,e,s),ec;Du(),t=uc(e,t,n)}else e=o.treeContext,H=cf(s.nextSibling),Ai=t,U=!0,ji=null,Mi=!1,e!==null&&ki(t,e),t=lc(t,r),t.flags|=4096;return t}return e=si(e.child,{mode:r.mode,children:r.children}),e.ref=t.ref,t.child=e,e.return=t,e}function fc(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!=`function`&&typeof n!=`object`)throw Error(i(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function pc(e,t,n,r,i){return Xi(t),n=bo(e,t,n,r,void 0,i),r=wo(),e!==null&&!tc?(To(e,t,i),Dc(e,t,i)):(U&&r&&Di(t),t.flags|=1,nc(e,t,n,i),t.child)}function mc(e,t,n,r,i,a){return Xi(t),t.updateQueue=null,n=So(t,r,n,i),xo(e),r=wo(),e!==null&&!tc?(To(e,t,a),Dc(e,t,a)):(U&&r&&Di(t),t.flags|=1,nc(e,t,n,a),t.child)}function hc(e,t,n,r,i){if(Xi(t),t.stateNode===null){var a=V,o=n.contextType;typeof o==`object`&&o&&(a=Zi(o)),a=new n(r,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=Vs,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=r,a.state=t.memoizedState,a.refs={},La(t),o=n.contextType,a.context=typeof o==`object`&&o?Zi(o):V,a.state=t.memoizedState,o=n.getDerivedStateFromProps,typeof o==`function`&&(Bs(t,n,o,r),a.state=t.memoizedState),typeof n.getDerivedStateFromProps==`function`||typeof a.getSnapshotBeforeUpdate==`function`||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(o=a.state,typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount(),o!==a.state&&Vs.enqueueReplaceState(a,a.state,null),Ga(t,r,a,i),Wa(),a.state=t.memoizedState),typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!0}else if(e===null){a=t.stateNode;var s=t.memoizedProps,c=Ws(n,s);a.props=c;var l=a.context,u=n.contextType;o=V,typeof u==`object`&&u&&(o=Zi(u));var d=n.getDerivedStateFromProps;u=typeof d==`function`||typeof a.getSnapshotBeforeUpdate==`function`,s=t.pendingProps!==s,u||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(s||l!==o)&&Us(t,a,r,o),Ia=!1;var f=t.memoizedState;a.state=f,Ga(t,r,a,i),Wa(),l=t.memoizedState,s||f!==l||Ia?(typeof d==`function`&&(Bs(t,n,d,r),l=t.memoizedState),(c=Ia||Hs(t,n,c,r,f,l,o))?(u||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount==`function`&&(t.flags|=4194308)):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=o,r=c):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,Ra(e,t),o=t.memoizedProps,u=Ws(n,o),a.props=u,d=t.pendingProps,f=a.context,l=n.contextType,c=V,typeof l==`object`&&l&&(c=Zi(l)),s=n.getDerivedStateFromProps,(l=typeof s==`function`||typeof a.getSnapshotBeforeUpdate==`function`)||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(o!==d||f!==c)&&Us(t,a,r,c),Ia=!1,f=t.memoizedState,a.state=f,Ga(t,r,a,i),Wa();var p=t.memoizedState;o!==d||f!==p||Ia||e!==null&&e.dependencies!==null&&Yi(e.dependencies)?(typeof s==`function`&&(Bs(t,n,s,r),p=t.memoizedState),(u=Ia||Hs(t,n,u,r,f,p,c)||e!==null&&e.dependencies!==null&&Yi(e.dependencies))?(l||typeof a.UNSAFE_componentWillUpdate!=`function`&&typeof a.componentWillUpdate!=`function`||(typeof a.componentWillUpdate==`function`&&a.componentWillUpdate(r,p,c),typeof a.UNSAFE_componentWillUpdate==`function`&&a.UNSAFE_componentWillUpdate(r,p,c)),typeof a.componentDidUpdate==`function`&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate==`function`&&(t.flags|=1024)):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=p),a.props=r,a.state=p,a.context=c,r=u):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return a=r,fc(e,t),r=(t.flags&128)!=0,a||r?(a=t.stateNode,n=r&&typeof n.getDerivedStateFromError!=`function`?null:a.render(),t.flags|=1,e!==null&&r?(t.child=Pa(t,e.child,null,i),t.child=Pa(t,null,n,i)):nc(e,t,n,i),t.memoizedState=a.state,e=t.child):e=Dc(e,t,i),e}function gc(e,t,n,r){return Ri(),t.flags|=256,nc(e,t,n,r),t.child}var _c={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function vc(e){return{baseLanes:e,cachePool:_a()}}function yc(e,t,n){return e=e===null?0:e.childLanes&~n,t&&(e|=Jl),e}function bc(e,t,n){var r=t.pendingProps,a=!1,o=(t.flags&128)!=0,s;if((s=o)||(s=e!==null&&e.memoizedState===null?!1:(oo.current&2)!=0),s&&(a=!0,t.flags&=-129),s=(t.flags&32)!=0,t.flags&=-33,e===null){if(U){if(a?to(t):io(t),(e=H)?(e=rf(e,Mi),e=e!==null&&e.data!==`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Si===null?null:{id:Ci,overflow:wi},retryLane:536870912,hydrationErrors:null},n=fi(e),n.return=t,t.child=n,Ai=t,H=null)):e=null,e===null)throw Pi(t);return of(e)?t.lanes=32:t.lanes=536870912,null}var c=r.children;return r=r.fallback,a?(io(t),a=t.mode,c=Sc({mode:`hidden`,children:c},a),r=ui(r,a,n,null),c.return=t,r.return=t,c.sibling=r,t.child=c,r=t.child,r.memoizedState=vc(n),r.childLanes=yc(e,s,n),t.memoizedState=_c,sc(null,r)):(to(t),xc(t,c))}var l=e.memoizedState;if(l!==null&&(c=l.dehydrated,c!==null)){if(o)t.flags&256?(to(t),t.flags&=-257,t=Cc(e,t,n)):t.memoizedState===null?(io(t),c=r.fallback,a=t.mode,r=Sc({mode:`visible`,children:r.children},a),c=ui(c,a,n,null),c.flags|=2,r.return=t,c.return=t,r.sibling=c,t.child=r,Pa(t,e.child,null,n),r=t.child,r.memoizedState=vc(n),r.childLanes=yc(e,s,n),t.memoizedState=_c,t=sc(null,r)):(io(t),t.child=e.child,t.flags|=128,t=null);else if(to(t),of(c)){if(s=c.nextSibling&&c.nextSibling.dataset,s)var u=s.dgst;s=u,r=Error(i(419)),r.stack=``,r.digest=s,Bi({value:r,source:null,stack:null}),t=Cc(e,t,n)}else if(tc||Ji(e,t,n,!1),s=(n&e.childLanes)!==0,tc||s){if(s=q,s!==null&&(r=et(s,n),r!==0&&r!==l.retryLane))throw l.retryLane=r,ti(e,r),hu(s,e,r),ec;af(c)||Du(),t=Cc(e,t,n)}else af(c)?(t.flags|=192,t.child=e.child,t=null):(e=l.treeContext,H=cf(c.nextSibling),Ai=t,U=!0,ji=null,Mi=!1,e!==null&&ki(t,e),t=xc(t,r.children),t.flags|=4096);return t}return a?(io(t),c=r.fallback,a=t.mode,l=e.child,u=l.sibling,r=si(l,{mode:`hidden`,children:r.children}),r.subtreeFlags=l.subtreeFlags&65011712,u===null?(c=ui(c,a,n,null),c.flags|=2):c=si(u,c),c.return=t,r.return=t,r.sibling=c,t.child=r,sc(null,r),r=t.child,c=e.child.memoizedState,c===null?c=vc(n):(a=c.cachePool,a===null?a=_a():(l=ra._currentValue,a=a.parent===l?a:{parent:l,pool:l}),c={baseLanes:c.baseLanes|n,cachePool:a}),r.memoizedState=c,r.childLanes=yc(e,s,n),t.memoizedState=_c,sc(e.child,r)):(to(t),n=e.child,e=n.sibling,n=si(n,{mode:`visible`,children:r.children}),n.return=t,n.sibling=null,e!==null&&(s=t.deletions,s===null?(t.deletions=[e],t.flags|=16):s.push(e)),t.child=n,t.memoizedState=null,n)}function xc(e,t){return t=Sc({mode:`visible`,children:t},e.mode),t.return=e,e.child=t}function Sc(e,t){return e=ai(22,e,null,t),e.lanes=0,e}function Cc(e,t,n){return Pa(t,e.child,null,n),e=xc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function wc(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Ki(e.return,t,n)}function Tc(e,t,n,r,i,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i,treeForkCount:a}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i,o.treeForkCount=a)}function Ec(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;r=r.children;var o=oo.current,s=(o&2)!=0;if(s?(o=o&1|2,t.flags|=128):o&=1,N(oo,o),nc(e,t,r,n),r=U?yi:0,!s&&e!==null&&e.flags&128)a:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&wc(e,n,t);else if(e.tag===19)wc(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break a;for(;e.sibling===null;){if(e.return===null||e.return===t)break a;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case`forwards`:for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&so(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),Tc(t,!1,i,n,a,r);break;case`backwards`:case`unstable_legacy-backwards`:for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&so(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}Tc(t,!0,n,null,a,r);break;case`together`:Tc(t,!1,null,null,void 0,r);break;default:t.memoizedState=null}return t.child}function Dc(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Gl|=t.lanes,(n&t.childLanes)===0)if(e!==null){if(Ji(e,t,n,!1),(n&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(i(153));if(t.child!==null){for(e=t.child,n=si(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=si(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Oc(e,t){return(e.lanes&t)===0?(e=e.dependencies,!!(e!==null&&Yi(e))):!0}function kc(e,t,n){switch(t.tag){case 3:F(t,t.stateNode.containerInfo),Wi(t,ra,e.memoizedState.cache),Ri();break;case 27:case 5:me(t);break;case 4:F(t,t.stateNode.containerInfo);break;case 10:Wi(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,no(t),null;break;case 13:var r=t.memoizedState;if(r!==null)return r.dehydrated===null?(n&t.child.childLanes)===0?(to(t),e=Dc(e,t,n),e===null?null:e.sibling):bc(e,t,n):(to(t),t.flags|=128,null);to(t);break;case 19:var i=(e.flags&128)!=0;if(r=(n&t.childLanes)!==0,r||=(Ji(e,t,n,!1),(n&t.childLanes)!==0),i){if(r)return Ec(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),N(oo,oo.current),r)break;return null;case 22:return t.lanes=0,oc(e,t,n,t.pendingProps);case 24:Wi(t,ra,e.memoizedState.cache)}return Dc(e,t,n)}function Ac(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps)tc=!0;else{if(!Oc(e,n)&&!(t.flags&128))return tc=!1,kc(e,t,n);tc=!!(e.flags&131072)}else tc=!1,U&&t.flags&1048576&&Ei(t,yi,t.index);switch(t.lanes=0,t.tag){case 16:a:{var r=t.pendingProps;if(e=wa(t.elementType),t.type=e,typeof e==`function`)oi(e)?(r=Ws(e,r),t.tag=1,t=hc(null,t,e,r,n)):(t.tag=0,t=pc(null,t,e,r,n));else{if(e!=null){var a=e.$$typeof;if(a===w){t.tag=11,t=rc(null,t,e,r,n);break a}else if(a===E){t.tag=14,t=ic(null,t,e,r,n);break a}}throw t=ae(e)||e,Error(i(306,t,``))}}return t;case 0:return pc(e,t,t.type,t.pendingProps,n);case 1:return r=t.type,a=Ws(r,t.pendingProps),hc(e,t,r,a,n);case 3:a:{if(F(t,t.stateNode.containerInfo),e===null)throw Error(i(387));r=t.pendingProps;var o=t.memoizedState;a=o.element,Ra(e,t),Ga(t,r,null,n);var s=t.memoizedState;if(r=s.cache,Wi(t,ra,r),r!==o.cache&&qi(t,[ra],n,!0),Wa(),r=s.element,o.isDehydrated)if(o={element:r,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){t=gc(e,t,r,n);break a}else if(r!==a){a=hi(Error(i(424)),t),Bi(a),t=gc(e,t,r,n);break a}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName===`HTML`?e.ownerDocument.body:e}for(H=cf(e.firstChild),Ai=t,U=!0,ji=null,Mi=!0,n=Fa(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(Ri(),r===a){t=Dc(e,t,n);break a}nc(e,t,r,n)}t=t.child}return t;case 26:return fc(e,t),e===null?(n=kf(t.type,null,t.pendingProps,null))?t.memoizedState=n:U||(n=t.type,e=t.pendingProps,r=Bd(P.current).createElement(n),r[ot]=t,r[st]=e,Pd(r,n,e),yt(r),t.stateNode=r):t.memoizedState=kf(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return me(t),e===null&&U&&(r=t.stateNode=ff(t.type,t.pendingProps,P.current),Ai=t,Mi=!0,a=H,Zd(t.type)?(lf=a,H=cf(r.firstChild)):H=a),nc(e,t,t.pendingProps.children,n),fc(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&U&&((a=r=H)&&(r=tf(r,t.type,t.pendingProps,Mi),r===null?a=!1:(t.stateNode=r,Ai=t,H=cf(r.firstChild),Mi=!1,a=!0)),a||Pi(t)),me(t),a=t.type,o=t.pendingProps,s=e===null?null:e.memoizedProps,r=o.children,Ud(a,o)?r=null:s!==null&&Ud(a,s)&&(t.flags|=32),t.memoizedState!==null&&(a=bo(e,t,Co,null,null,n),Qf._currentValue=a),fc(e,t),nc(e,t,r,n),t.child;case 6:return e===null&&U&&((e=n=H)&&(n=nf(n,t.pendingProps,Mi),n===null?e=!1:(t.stateNode=n,Ai=t,H=null,e=!0)),e||Pi(t)),null;case 13:return bc(e,t,n);case 4:return F(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Pa(t,null,r,n):nc(e,t,r,n),t.child;case 11:return rc(e,t,t.type,t.pendingProps,n);case 7:return nc(e,t,t.pendingProps,n),t.child;case 8:return nc(e,t,t.pendingProps.children,n),t.child;case 12:return nc(e,t,t.pendingProps.children,n),t.child;case 10:return r=t.pendingProps,Wi(t,t.type,r.value),nc(e,t,r.children,n),t.child;case 9:return a=t.type._context,r=t.pendingProps.children,Xi(t),a=Zi(a),r=r(a),t.flags|=1,nc(e,t,r,n),t.child;case 14:return ic(e,t,t.type,t.pendingProps,n);case 15:return ac(e,t,t.type,t.pendingProps,n);case 19:return Ec(e,t,n);case 31:return dc(e,t,n);case 22:return oc(e,t,n,t.pendingProps);case 24:return Xi(t),r=Zi(ra),e===null?(a=ha(),a===null&&(a=q,o=ia(),a.pooledCache=o,o.refCount++,o!==null&&(a.pooledCacheLanes|=n),a=o),t.memoizedState={parent:r,cache:a},La(t),Wi(t,ra,a)):((e.lanes&n)!==0&&(Ra(e,t),Ga(t,null,null,n),Wa()),a=e.memoizedState,o=t.memoizedState,a.parent===r?(r=o.cache,Wi(t,ra,r),r!==a.cache&&qi(t,[ra],n,!0)):(a={parent:r,cache:r},t.memoizedState=a,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=a),Wi(t,ra,r))),nc(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(i(156,t.tag))}function jc(e){e.flags|=4}function Mc(e,t,n,r,i){if((t=(e.mode&32)!=0)&&(t=!1),t){if(e.flags|=16777216,(i&335544128)===i)if(e.stateNode.complete)e.flags|=8192;else if(wu())e.flags|=8192;else throw Ta=xa,ya}else e.flags&=-16777217}function Nc(e,t){if(t.type!==`stylesheet`||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!Wf(t))if(wu())e.flags|=8192;else throw Ta=xa,ya}function Pc(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag===22?536870912:Je(),e.lanes|=t,Yl|=t)}function Fc(e,t){if(!U)switch(e.tailMode){case`hidden`:t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case`collapsed`:n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function Ic(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&65011712,r|=i.flags&65011712,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Lc(e,t,n){var r=t.pendingProps;switch(Oi(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ic(t),null;case 1:return Ic(t),null;case 3:return n=t.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),Gi(ra),pe(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(Li(t)?jc(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,zi())),Ic(t),null;case 26:var a=t.type,o=t.memoizedState;return e===null?(jc(t),o===null?(Ic(t),Mc(t,a,null,r,n)):(Ic(t),Nc(t,o))):o?o===e.memoizedState?(Ic(t),t.flags&=-16777217):(jc(t),Ic(t),Nc(t,o)):(e=e.memoizedProps,e!==r&&jc(t),Ic(t),Mc(t,a,e,r,n)),null;case 27:if(he(t),n=P.current,a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&jc(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return Ic(t),null}e=ue.current,Li(t)?Fi(t,e):(e=ff(a,r,n),t.stateNode=e,jc(t))}return Ic(t),null;case 5:if(he(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&jc(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return Ic(t),null}if(o=ue.current,Li(t))Fi(t,o);else{var s=Bd(P.current);switch(o){case 1:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case 2:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;default:switch(a){case`svg`:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case`math`:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;case`script`:o=s.createElement(`div`),o.innerHTML=`<script><\/script>`,o=o.removeChild(o.firstChild);break;case`select`:o=typeof r.is==`string`?s.createElement(`select`,{is:r.is}):s.createElement(`select`),r.multiple?o.multiple=!0:r.size&&(o.size=r.size);break;default:o=typeof r.is==`string`?s.createElement(a,{is:r.is}):s.createElement(a)}}o[ot]=t,o[st]=r;a:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)o.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break a;for(;s.sibling===null;){if(s.return===null||s.return===t)break a;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=o;a:switch(Pd(o,a,r),a){case`button`:case`input`:case`select`:case`textarea`:r=!!r.autoFocus;break a;case`img`:r=!0;break a;default:r=!1}r&&jc(t)}}return Ic(t),Mc(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==r&&jc(t);else{if(typeof r!=`string`&&t.stateNode===null)throw Error(i(166));if(e=P.current,Li(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,a=Ai,a!==null)switch(a.tag){case 27:case 5:r=a.memoizedProps}e[ot]=t,e=!!(e.nodeValue===n||r!==null&&!0===r.suppressHydrationWarning||Md(e.nodeValue,n)),e||Pi(t,!0)}else e=Bd(e).createTextNode(r),e[ot]=t,t.stateNode=e}return Ic(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(r=Li(t),n!==null){if(e===null){if(!r)throw Error(i(318));if(e=t.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(557));e[ot]=t}else Ri(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Ic(t),e=!1}else n=zi(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(ao(t),t):(ao(t),null);if(t.flags&128)throw Error(i(558))}return Ic(t),null;case 13:if(r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(a=Li(t),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(i(318));if(a=t.memoizedState,a=a===null?null:a.dehydrated,!a)throw Error(i(317));a[ot]=t}else Ri(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Ic(t),a=!1}else a=zi(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return t.flags&256?(ao(t),t):(ao(t),null)}return ao(t),t.flags&128?(t.lanes=n,t):(n=r!==null,e=e!==null&&e.memoizedState!==null,n&&(r=t.child,a=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(a=r.alternate.memoizedState.cachePool.pool),o=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(o=r.memoizedState.cachePool.pool),o!==a&&(r.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),Pc(t,t.updateQueue),Ic(t),null);case 4:return pe(),e===null&&Sd(t.stateNode.containerInfo),Ic(t),null;case 10:return Gi(t.type),Ic(t),null;case 19:if(M(oo),r=t.memoizedState,r===null)return Ic(t),null;if(a=(t.flags&128)!=0,o=r.rendering,o===null)if(a)Fc(r,!1);else{if(Wl!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=so(e),o!==null){for(t.flags|=128,Fc(r,!1),e=o.updateQueue,t.updateQueue=e,Pc(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)ci(n,e),n=n.sibling;return N(oo,oo.current&1|2),U&&Ti(t,r.treeForkCount),t.child}e=e.sibling}r.tail!==null&&I()>tu&&(t.flags|=128,a=!0,Fc(r,!1),t.lanes=4194304)}else{if(!a)if(e=so(o),e!==null){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,Pc(t,e),Fc(r,!0),r.tail===null&&r.tailMode===`hidden`&&!o.alternate&&!U)return Ic(t),null}else 2*I()-r.renderingStartTime>tu&&n!==536870912&&(t.flags|=128,a=!0,Fc(r,!1),t.lanes=4194304);r.isBackwards?(o.sibling=t.child,t.child=o):(e=r.last,e===null?t.child=o:e.sibling=o,r.last=o)}return r.tail===null?(Ic(t),null):(e=r.tail,r.rendering=e,r.tail=e.sibling,r.renderingStartTime=I(),e.sibling=null,n=oo.current,N(oo,a?n&1|2:n&1),U&&Ti(t,r.treeForkCount),e);case 22:case 23:return ao(t),Qa(),r=t.memoizedState!==null,e===null?r&&(t.flags|=8192):e.memoizedState!==null!==r&&(t.flags|=8192),r?n&536870912&&!(t.flags&128)&&(Ic(t),t.subtreeFlags&6&&(t.flags|=8192)):Ic(t),n=t.updateQueue,n!==null&&Pc(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),r=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),e!==null&&M(ma),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),Gi(ra),Ic(t),null;case 25:return null;case 30:return null}throw Error(i(156,t.tag))}function Rc(e,t){switch(Oi(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Gi(ra),pe(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return he(t),null;case 31:if(t.memoizedState!==null){if(ao(t),t.alternate===null)throw Error(i(340));Ri()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(ao(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(i(340));Ri()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return M(oo),null;case 4:return pe(),null;case 10:return Gi(t.type),null;case 22:case 23:return ao(t),Qa(),e!==null&&M(ma),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Gi(ra),null;case 25:return null;default:return null}}function zc(e,t){switch(Oi(t),t.tag){case 3:Gi(ra),pe();break;case 26:case 27:case 5:he(t);break;case 4:pe();break;case 31:t.memoizedState!==null&&ao(t);break;case 13:ao(t);break;case 19:M(oo);break;case 10:Gi(t.type);break;case 22:case 23:ao(t),Qa(),e!==null&&M(ma);break;case 24:Gi(ra)}}function Bc(e,t){try{var n=t.updateQueue,r=n===null?null:n.lastEffect;if(r!==null){var i=r.next;n=i;do{if((n.tag&e)===e){r=void 0;var a=n.create,o=n.inst;r=a(),o.destroy=r}n=n.next}while(n!==i)}}catch(e){Z(t,t.return,e)}}function Vc(e,t,n){try{var r=t.updateQueue,i=r===null?null:r.lastEffect;if(i!==null){var a=i.next;r=a;do{if((r.tag&e)===e){var o=r.inst,s=o.destroy;if(s!==void 0){o.destroy=void 0,i=t;var c=n,l=s;try{l()}catch(e){Z(i,c,e)}}}r=r.next}while(r!==a)}}catch(e){Z(t,t.return,e)}}function Hc(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{qa(t,n)}catch(t){Z(e,e.return,t)}}}function Uc(e,t,n){n.props=Ws(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(n){Z(e,t,n)}}function Wc(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:r=e.stateNode;break;default:r=e.stateNode}typeof n==`function`?e.refCleanup=n(r):n.current=r}}catch(n){Z(e,t,n)}}function Gc(e,t){var n=e.ref,r=e.refCleanup;if(n!==null)if(typeof r==`function`)try{r()}catch(n){Z(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n==`function`)try{n(null)}catch(n){Z(e,t,n)}else n.current=null}function Kc(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{a:switch(t){case`button`:case`input`:case`select`:case`textarea`:n.autoFocus&&r.focus();break a;case`img`:n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(t){Z(e,e.return,t)}}function qc(e,t,n){try{var r=e.stateNode;Fd(r,e.type,n,t),r[st]=t}catch(t){Z(e,e.return,t)}}function Jc(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Zd(e.type)||e.tag===4}function Yc(e){a:for(;;){for(;e.sibling===null;){if(e.return===null||Jc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Zd(e.type)||e.flags&2||e.child===null||e.tag===4)continue a;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Xc(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n).insertBefore(e,t):(t=n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n,t.appendChild(e),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=$t));else if(r!==4&&(r===27&&Zd(e.type)&&(n=e.stateNode,t=null),e=e.child,e!==null))for(Xc(e,t,n),e=e.sibling;e!==null;)Xc(e,t,n),e=e.sibling}function Zc(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(r===27&&Zd(e.type)&&(n=e.stateNode),e=e.child,e!==null))for(Zc(e,t,n),e=e.sibling;e!==null;)Zc(e,t,n),e=e.sibling}function Qc(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);Pd(t,r,n),t[ot]=e,t[st]=n}catch(t){Z(e,e.return,t)}}var $c=!1,el=!1,tl=!1,nl=typeof WeakSet==`function`?WeakSet:Set,rl=null;function il(e,t){if(e=e.containerInfo,Rd=sp,e=Er(e),Dr(e)){if(`selectionStart`in e)var n={start:e.selectionStart,end:e.selectionEnd};else a:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var a=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break a}var s=0,c=-1,l=-1,u=0,d=0,f=e,p=null;b:for(;;){for(var m;f!==n||a!==0&&f.nodeType!==3||(c=s+a),f!==o||r!==0&&f.nodeType!==3||(l=s+r),f.nodeType===3&&(s+=f.nodeValue.length),(m=f.firstChild)!==null;)p=f,f=m;for(;;){if(f===e)break b;if(p===n&&++u===a&&(c=s),p===o&&++d===r&&(l=s),(m=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=m}n=c===-1||l===-1?null:{start:c,end:l}}else n=null}n||={start:0,end:0}}else n=null;for(zd={focusedElem:e,selectionRange:n},sp=!1,rl=t;rl!==null;)if(t=rl,e=t.child,t.subtreeFlags&1028&&e!==null)e.return=t,rl=e;else for(;rl!==null;){switch(t=rl,o=t.alternate,e=t.flags,t.tag){case 0:if(e&4&&(e=t.updateQueue,e=e===null?null:e.events,e!==null))for(n=0;n<e.length;n++)a=e[n],a.ref.impl=a.nextImpl;break;case 11:case 15:break;case 1:if(e&1024&&o!==null){e=void 0,n=t,a=o.memoizedProps,o=o.memoizedState,r=n.stateNode;try{var h=Ws(n.type,a);e=r.getSnapshotBeforeUpdate(h,o),r.__reactInternalSnapshotBeforeUpdate=e}catch(e){Z(n,n.return,e)}}break;case 3:if(e&1024){if(e=t.stateNode.containerInfo,n=e.nodeType,n===9)ef(e);else if(n===1)switch(e.nodeName){case`HEAD`:case`HTML`:case`BODY`:ef(e);break;default:e.textContent=``}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(e&1024)throw Error(i(163))}if(e=t.sibling,e!==null){e.return=t.return,rl=e;break}rl=t.return}}function al(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:bl(e,n),r&4&&Bc(5,n);break;case 1:if(bl(e,n),r&4)if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(e){Z(n,n.return,e)}else{var i=Ws(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(e){Z(n,n.return,e)}}r&64&&Hc(n),r&512&&Wc(n,n.return);break;case 3:if(bl(e,n),r&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{qa(e,t)}catch(e){Z(n,n.return,e)}}break;case 27:t===null&&r&4&&Qc(n);case 26:case 5:bl(e,n),t===null&&r&4&&Kc(n),r&512&&Wc(n,n.return);break;case 12:bl(e,n);break;case 31:bl(e,n),r&4&&dl(e,n);break;case 13:bl(e,n),r&4&&fl(e,n),r&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=Ju.bind(null,n),sf(e,n))));break;case 22:if(r=n.memoizedState!==null||$c,!r){t=t!==null&&t.memoizedState!==null||el,i=$c;var a=el;$c=r,(el=t)&&!a?Sl(e,n,(n.subtreeFlags&8772)!=0):bl(e,n),$c=i,el=a}break;case 30:break;default:bl(e,n)}}function ol(e){var t=e.alternate;t!==null&&(e.alternate=null,ol(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&mt(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var sl=null,cl=!1;function ll(e,t,n){for(n=n.child;n!==null;)ul(e,t,n),n=n.sibling}function ul(e,t,n){if(Le&&typeof Le.onCommitFiberUnmount==`function`)try{Le.onCommitFiberUnmount(Ie,n)}catch{}switch(n.tag){case 26:el||Gc(n,t),ll(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:el||Gc(n,t);var r=sl,i=cl;Zd(n.type)&&(sl=n.stateNode,cl=!1),ll(e,t,n),pf(n.stateNode),sl=r,cl=i;break;case 5:el||Gc(n,t);case 6:if(r=sl,i=cl,sl=null,ll(e,t,n),sl=r,cl=i,sl!==null)if(cl)try{(sl.nodeType===9?sl.body:sl.nodeName===`HTML`?sl.ownerDocument.body:sl).removeChild(n.stateNode)}catch(e){Z(n,t,e)}else try{sl.removeChild(n.stateNode)}catch(e){Z(n,t,e)}break;case 18:sl!==null&&(cl?(e=sl,Qd(e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,n.stateNode),Np(e)):Qd(sl,n.stateNode));break;case 4:r=sl,i=cl,sl=n.stateNode.containerInfo,cl=!0,ll(e,t,n),sl=r,cl=i;break;case 0:case 11:case 14:case 15:Vc(2,n,t),el||Vc(4,n,t),ll(e,t,n);break;case 1:el||(Gc(n,t),r=n.stateNode,typeof r.componentWillUnmount==`function`&&Uc(n,t,r)),ll(e,t,n);break;case 21:ll(e,t,n);break;case 22:el=(r=el)||n.memoizedState!==null,ll(e,t,n),el=r;break;default:ll(e,t,n)}}function dl(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Np(e)}catch(e){Z(t,t.return,e)}}}function fl(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Np(e)}catch(e){Z(t,t.return,e)}}function pl(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new nl),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new nl),t;default:throw Error(i(435,e.tag))}}function ml(e,t){var n=pl(e);t.forEach(function(t){if(!n.has(t)){n.add(t);var r=Yu.bind(null,e,t);t.then(r,r)}})}function hl(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var a=n[r],o=e,s=t,c=s;a:for(;c!==null;){switch(c.tag){case 27:if(Zd(c.type)){sl=c.stateNode,cl=!1;break a}break;case 5:sl=c.stateNode,cl=!1;break a;case 3:case 4:sl=c.stateNode.containerInfo,cl=!0;break a}c=c.return}if(sl===null)throw Error(i(160));ul(o,s,a),sl=null,cl=!1,o=a.alternate,o!==null&&(o.return=null),a.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)_l(t,e),t=t.sibling}var gl=null;function _l(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:hl(t,e),vl(e),r&4&&(Vc(3,e,e.return),Bc(3,e),Vc(5,e,e.return));break;case 1:hl(t,e),vl(e),r&512&&(el||n===null||Gc(n,n.return)),r&64&&$c&&(e=e.updateQueue,e!==null&&(r=e.callbacks,r!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?r:n.concat(r))));break;case 26:var a=gl;if(hl(t,e),vl(e),r&512&&(el||n===null||Gc(n,n.return)),r&4){var o=n===null?null:n.memoizedState;if(r=e.memoizedState,n===null)if(r===null)if(e.stateNode===null){a:{r=e.type,n=e.memoizedProps,a=a.ownerDocument||a;b:switch(r){case`title`:o=a.getElementsByTagName(`title`)[0],(!o||o[pt]||o[ot]||o.namespaceURI===`http://www.w3.org/2000/svg`||o.hasAttribute(`itemprop`))&&(o=a.createElement(r),a.head.insertBefore(o,a.querySelector(`head > title`))),Pd(o,r,n),o[ot]=e,yt(o),r=o;break a;case`link`:var s=Vf(`link`,`href`,a).get(r+(n.href||``));if(s){for(var c=0;c<s.length;c++)if(o=s[c],o.getAttribute(`href`)===(n.href==null||n.href===``?null:n.href)&&o.getAttribute(`rel`)===(n.rel==null?null:n.rel)&&o.getAttribute(`title`)===(n.title==null?null:n.title)&&o.getAttribute(`crossorigin`)===(n.crossOrigin==null?null:n.crossOrigin)){s.splice(c,1);break b}}o=a.createElement(r),Pd(o,r,n),a.head.appendChild(o);break;case`meta`:if(s=Vf(`meta`,`content`,a).get(r+(n.content||``))){for(c=0;c<s.length;c++)if(o=s[c],o.getAttribute(`content`)===(n.content==null?null:``+n.content)&&o.getAttribute(`name`)===(n.name==null?null:n.name)&&o.getAttribute(`property`)===(n.property==null?null:n.property)&&o.getAttribute(`http-equiv`)===(n.httpEquiv==null?null:n.httpEquiv)&&o.getAttribute(`charset`)===(n.charSet==null?null:n.charSet)){s.splice(c,1);break b}}o=a.createElement(r),Pd(o,r,n),a.head.appendChild(o);break;default:throw Error(i(468,r))}o[ot]=e,yt(o),r=o}e.stateNode=r}else Hf(a,e.type,e.stateNode);else e.stateNode=If(a,r,e.memoizedProps);else o===r?r===null&&e.stateNode!==null&&qc(e,e.memoizedProps,n.memoizedProps):(o===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):o.count--,r===null?Hf(a,e.type,e.stateNode):If(a,r,e.memoizedProps))}break;case 27:hl(t,e),vl(e),r&512&&(el||n===null||Gc(n,n.return)),n!==null&&r&4&&qc(e,e.memoizedProps,n.memoizedProps);break;case 5:if(hl(t,e),vl(e),r&512&&(el||n===null||Gc(n,n.return)),e.flags&32){a=e.stateNode;try{Gt(a,``)}catch(t){Z(e,e.return,t)}}r&4&&e.stateNode!=null&&(a=e.memoizedProps,qc(e,a,n===null?a:n.memoizedProps)),r&1024&&(tl=!0);break;case 6:if(hl(t,e),vl(e),r&4){if(e.stateNode===null)throw Error(i(162));r=e.memoizedProps,n=e.stateNode;try{n.nodeValue=r}catch(t){Z(e,e.return,t)}}break;case 3:if(Bf=null,a=gl,gl=gf(t.containerInfo),hl(t,e),gl=a,vl(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Np(t.containerInfo)}catch(t){Z(e,e.return,t)}tl&&(tl=!1,yl(e));break;case 4:r=gl,gl=gf(e.stateNode.containerInfo),hl(t,e),vl(e),gl=r;break;case 12:hl(t,e),vl(e);break;case 31:hl(t,e),vl(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,ml(e,r)));break;case 13:hl(t,e),vl(e),e.child.flags&8192&&e.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&($l=I()),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,ml(e,r)));break;case 22:a=e.memoizedState!==null;var l=n!==null&&n.memoizedState!==null,u=$c,d=el;if($c=u||a,el=d||l,hl(t,e),el=d,$c=u,vl(e),r&8192)a:for(t=e.stateNode,t._visibility=a?t._visibility&-2:t._visibility|1,a&&(n===null||l||$c||el||xl(e)),n=null,t=e;;){if(t.tag===5||t.tag===26){if(n===null){l=n=t;try{if(o=l.stateNode,a)s=o.style,typeof s.setProperty==`function`?s.setProperty(`display`,`none`,`important`):s.display=`none`;else{c=l.stateNode;var f=l.memoizedProps.style,p=f!=null&&f.hasOwnProperty(`display`)?f.display:null;c.style.display=p==null||typeof p==`boolean`?``:(``+p).trim()}}catch(e){Z(l,l.return,e)}}}else if(t.tag===6){if(n===null){l=t;try{l.stateNode.nodeValue=a?``:l.memoizedProps}catch(e){Z(l,l.return,e)}}}else if(t.tag===18){if(n===null){l=t;try{var m=l.stateNode;a?$d(m,!0):$d(l.stateNode,!1)}catch(e){Z(l,l.return,e)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break a;for(;t.sibling===null;){if(t.return===null||t.return===e)break a;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}r&4&&(r=e.updateQueue,r!==null&&(n=r.retryQueue,n!==null&&(r.retryQueue=null,ml(e,n))));break;case 19:hl(t,e),vl(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,ml(e,r)));break;case 30:break;case 21:break;default:hl(t,e),vl(e)}}function vl(e){var t=e.flags;if(t&2){try{for(var n,r=e.return;r!==null;){if(Jc(r)){n=r;break}r=r.return}if(n==null)throw Error(i(160));switch(n.tag){case 27:var a=n.stateNode;Zc(e,Yc(e),a);break;case 5:var o=n.stateNode;n.flags&32&&(Gt(o,``),n.flags&=-33),Zc(e,Yc(e),o);break;case 3:case 4:var s=n.stateNode.containerInfo;Xc(e,Yc(e),s);break;default:throw Error(i(161))}}catch(t){Z(e,e.return,t)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function yl(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;yl(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function bl(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)al(e,t.alternate,t),t=t.sibling}function xl(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:Vc(4,t,t.return),xl(t);break;case 1:Gc(t,t.return);var n=t.stateNode;typeof n.componentWillUnmount==`function`&&Uc(t,t.return,n),xl(t);break;case 27:pf(t.stateNode);case 26:case 5:Gc(t,t.return),xl(t);break;case 22:t.memoizedState===null&&xl(t);break;case 30:xl(t);break;default:xl(t)}e=e.sibling}}function Sl(e,t,n){for(n&&=(t.subtreeFlags&8772)!=0,t=t.child;t!==null;){var r=t.alternate,i=e,a=t,o=a.flags;switch(a.tag){case 0:case 11:case 15:Sl(i,a,n),Bc(4,a);break;case 1:if(Sl(i,a,n),r=a,i=r.stateNode,typeof i.componentDidMount==`function`)try{i.componentDidMount()}catch(e){Z(r,r.return,e)}if(r=a,i=r.updateQueue,i!==null){var s=r.stateNode;try{var c=i.shared.hiddenCallbacks;if(c!==null)for(i.shared.hiddenCallbacks=null,i=0;i<c.length;i++)Ka(c[i],s)}catch(e){Z(r,r.return,e)}}n&&o&64&&Hc(a),Wc(a,a.return);break;case 27:Qc(a);case 26:case 5:Sl(i,a,n),n&&r===null&&o&4&&Kc(a),Wc(a,a.return);break;case 12:Sl(i,a,n);break;case 31:Sl(i,a,n),n&&o&4&&dl(i,a);break;case 13:Sl(i,a,n),n&&o&4&&fl(i,a);break;case 22:a.memoizedState===null&&Sl(i,a,n),Wc(a,a.return);break;case 30:break;default:Sl(i,a,n)}t=t.sibling}}function Cl(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&aa(n))}function wl(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&aa(e))}function Tl(e,t,n,r){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)El(e,t,n,r),t=t.sibling}function El(e,t,n,r){var i=t.flags;switch(t.tag){case 0:case 11:case 15:Tl(e,t,n,r),i&2048&&Bc(9,t);break;case 1:Tl(e,t,n,r);break;case 3:Tl(e,t,n,r),i&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&aa(e)));break;case 12:if(i&2048){Tl(e,t,n,r),e=t.stateNode;try{var a=t.memoizedProps,o=a.id,s=a.onPostCommit;typeof s==`function`&&s(o,t.alternate===null?`mount`:`update`,e.passiveEffectDuration,-0)}catch(e){Z(t,t.return,e)}}else Tl(e,t,n,r);break;case 31:Tl(e,t,n,r);break;case 13:Tl(e,t,n,r);break;case 23:break;case 22:a=t.stateNode,o=t.alternate,t.memoizedState===null?a._visibility&2?Tl(e,t,n,r):(a._visibility|=2,Dl(e,t,n,r,(t.subtreeFlags&10256)!=0||!1)):a._visibility&2?Tl(e,t,n,r):Ol(e,t),i&2048&&Cl(o,t);break;case 24:Tl(e,t,n,r),i&2048&&wl(t.alternate,t);break;default:Tl(e,t,n,r)}}function Dl(e,t,n,r,i){for(i&&=(t.subtreeFlags&10256)!=0||!1,t=t.child;t!==null;){var a=e,o=t,s=n,c=r,l=o.flags;switch(o.tag){case 0:case 11:case 15:Dl(a,o,s,c,i),Bc(8,o);break;case 23:break;case 22:var u=o.stateNode;o.memoizedState===null?(u._visibility|=2,Dl(a,o,s,c,i)):u._visibility&2?Dl(a,o,s,c,i):Ol(a,o),i&&l&2048&&Cl(o.alternate,o);break;case 24:Dl(a,o,s,c,i),i&&l&2048&&wl(o.alternate,o);break;default:Dl(a,o,s,c,i)}t=t.sibling}}function Ol(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,r=t,i=r.flags;switch(r.tag){case 22:Ol(n,r),i&2048&&Cl(r.alternate,r);break;case 24:Ol(n,r),i&2048&&wl(r.alternate,r);break;default:Ol(n,r)}t=t.sibling}}var kl=8192;function Al(e,t,n){if(e.subtreeFlags&kl)for(e=e.child;e!==null;)jl(e,t,n),e=e.sibling}function jl(e,t,n){switch(e.tag){case 26:Al(e,t,n),e.flags&kl&&e.memoizedState!==null&&Gf(n,gl,e.memoizedState,e.memoizedProps);break;case 5:Al(e,t,n);break;case 3:case 4:var r=gl;gl=gf(e.stateNode.containerInfo),Al(e,t,n),gl=r;break;case 22:e.memoizedState===null&&(r=e.alternate,r!==null&&r.memoizedState!==null?(r=kl,kl=16777216,Al(e,t,n),kl=r):Al(e,t,n));break;default:Al(e,t,n)}}function Ml(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Nl(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];rl=r,Il(r,e)}Ml(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Pl(e),e=e.sibling}function Pl(e){switch(e.tag){case 0:case 11:case 15:Nl(e),e.flags&2048&&Vc(9,e,e.return);break;case 3:Nl(e);break;case 12:Nl(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Fl(e)):Nl(e);break;default:Nl(e)}}function Fl(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];rl=r,Il(r,e)}Ml(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Vc(8,t,t.return),Fl(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Fl(t));break;default:Fl(t)}e=e.sibling}}function Il(e,t){for(;rl!==null;){var n=rl;switch(n.tag){case 0:case 11:case 15:Vc(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var r=n.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:aa(n.memoizedState.cache)}if(r=n.child,r!==null)r.return=n,rl=r;else a:for(n=e;rl!==null;){r=rl;var i=r.sibling,a=r.return;if(ol(r),r===n){rl=null;break a}if(i!==null){i.return=a,rl=i;break a}rl=a}}}var Ll={getCacheForType:function(e){var t=Zi(ra),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return Zi(ra).controller.signal}},Rl=typeof WeakMap==`function`?WeakMap:Map,K=0,q=null,J=null,Y=0,X=0,zl=null,Bl=!1,Vl=!1,Hl=!1,Ul=0,Wl=0,Gl=0,Kl=0,ql=0,Jl=0,Yl=0,Xl=null,Zl=null,Ql=!1,$l=0,eu=0,tu=1/0,nu=null,ru=null,iu=0,au=null,ou=null,su=0,cu=0,lu=null,uu=null,du=0,fu=null;function pu(){return K&2&&Y!==0?Y&-Y:k.T===null?rt():dd()}function mu(){if(Jl===0)if(!(Y&536870912)||U){var e=Ue;Ue<<=1,!(Ue&3932160)&&(Ue=262144),Jl=e}else Jl=536870912;return e=$a.current,e!==null&&(e.flags|=32),Jl}function hu(e,t,n){(e===q&&(X===2||X===9)||e.cancelPendingCommit!==null)&&(Su(e,0),yu(e,Y,Jl,!1)),Xe(e,n),(!(K&2)||e!==q)&&(e===q&&(!(K&2)&&(Kl|=n),Wl===4&&yu(e,Y,Jl,!1)),rd(e))}function gu(e,t,n){if(K&6)throw Error(i(327));var r=!n&&(t&127)==0&&(t&e.expiredLanes)===0||Ke(e,t),a=r?Au(e,t):Ou(e,t,!0),o=r;do{if(a===0){Vl&&!r&&yu(e,t,0,!1);break}else{if(n=e.current.alternate,o&&!vu(n)){a=Ou(e,t,!1),o=!1;continue}if(a===2){if(o=t,e.errorRecoveryDisabledLanes&o)var s=0;else s=e.pendingLanes&-536870913,s=s===0?s&536870912?536870912:0:s;if(s!==0){t=s;a:{var c=e;a=Xl;var l=c.current.memoizedState.isDehydrated;if(l&&(Su(c,s).flags|=256),s=Ou(c,s,!1),s!==2){if(Hl&&!l){c.errorRecoveryDisabledLanes|=o,Kl|=o,a=4;break a}o=Zl,Zl=a,o!==null&&(Zl===null?Zl=o:Zl.push.apply(Zl,o))}a=s}if(o=!1,a!==2)continue}}if(a===1){Su(e,0),yu(e,t,0,!0);break}a:{switch(r=e,o=a,o){case 0:case 1:throw Error(i(345));case 4:if((t&4194048)!==t)break;case 6:yu(r,t,Jl,!Bl);break a;case 2:Zl=null;break;case 3:case 5:break;default:throw Error(i(329))}if((t&62914560)===t&&(a=$l+300-I(),10<a)){if(yu(r,t,Jl,!Bl),Ge(r,0,!0)!==0)break a;su=t,r.timeoutHandle=Kd(_u.bind(null,r,n,Zl,nu,Ql,t,Jl,Kl,Yl,Bl,o,`Throttled`,-0,0),a);break a}_u(r,n,Zl,nu,Ql,t,Jl,Kl,Yl,Bl,o,null,-0,0)}}break}while(1);rd(e)}function _u(e,t,n,r,i,a,o,s,c,l,u,d,f,p){if(e.timeoutHandle=-1,d=t.subtreeFlags,d&8192||(d&16785408)==16785408){d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:$t},jl(t,a,d);var m=(a&62914560)===a?$l-I():(a&4194048)===a?eu-I():0;if(m=qf(d,m),m!==null){su=a,e.cancelPendingCommit=m(Lu.bind(null,e,t,a,n,r,i,o,s,c,u,d,null,f,p)),yu(e,a,o,!l);return}}Lu(e,t,a,n,r,i,o,s,c)}function vu(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!xr(a(),i))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function yu(e,t,n,r){t&=~ql,t&=~Kl,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var i=t;0<i;){var a=31-L(i),o=1<<a;r[a]=-1,i&=~o}n!==0&&Qe(e,n,t)}function bu(){return K&6?!0:(id(0,!1),!1)}function xu(){if(J!==null){if(X===0)var e=J.return;else e=J,Ui=Hi=null,Eo(e),Oa=null,ka=0,e=J;for(;e!==null;)zc(e.alternate,e),e=e.return;J=null}}function Su(e,t){var n=e.timeoutHandle;n!==-1&&(e.timeoutHandle=-1,qd(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),su=0,xu(),q=e,J=n=si(e.current,null),Y=t,X=0,zl=null,Bl=!1,Vl=Ke(e,t),Hl=!1,Yl=Jl=ql=Kl=Gl=Wl=0,Zl=Xl=null,Ql=!1,t&8&&(t|=t&32);var r=e.entangledLanes;if(r!==0)for(e=e.entanglements,r&=t;0<r;){var i=31-L(r),a=1<<i;t|=e[i],r&=~a}return Ul=t,Qr(),n}function Cu(e,t){W=null,k.H=Is,t===va||t===ba?(t=Ea(),X=3):t===ya?(t=Ea(),X=4):X=t===ec?8:typeof t==`object`&&t&&typeof t.then==`function`?6:1,zl=t,J===null&&(Wl=1,Js(e,hi(t,e.current)))}function wu(){var e=$a.current;return e===null?!0:(Y&4194048)===Y?eo===null:(Y&62914560)===Y||Y&536870912?e===eo:!1}function Tu(){var e=k.H;return k.H=Is,e===null?Is:e}function Eu(){var e=k.A;return k.A=Ll,e}function Du(){Wl=4,Bl||(Y&4194048)!==Y&&$a.current!==null||(Vl=!0),!(Gl&134217727)&&!(Kl&134217727)||q===null||yu(q,Y,Jl,!1)}function Ou(e,t,n){var r=K;K|=2;var i=Tu(),a=Eu();(q!==e||Y!==t)&&(nu=null,Su(e,t)),t=!1;var o=Wl;a:do try{if(X!==0&&J!==null){var s=J,c=zl;switch(X){case 8:xu(),o=6;break a;case 3:case 2:case 9:case 6:$a.current===null&&(t=!0);var l=X;if(X=0,zl=null,Pu(e,s,c,l),n&&Vl){o=0;break a}break;default:l=X,X=0,zl=null,Pu(e,s,c,l)}}ku(),o=Wl;break}catch(t){Cu(e,t)}while(1);return t&&e.shellSuspendCounter++,Ui=Hi=null,K=r,k.H=i,k.A=a,J===null&&(q=null,Y=0,Qr()),o}function ku(){for(;J!==null;)Mu(J)}function Au(e,t){var n=K;K|=2;var r=Tu(),a=Eu();q!==e||Y!==t?(nu=null,tu=I()+500,Su(e,t)):Vl=Ke(e,t);a:do try{if(X!==0&&J!==null){t=J;var o=zl;b:switch(X){case 1:X=0,zl=null,Pu(e,t,o,1);break;case 2:case 9:if(Sa(o)){X=0,zl=null,Nu(t);break}t=function(){X!==2&&X!==9||q!==e||(X=7),rd(e)},o.then(t,t);break a;case 3:X=7;break a;case 4:X=5;break a;case 7:Sa(o)?(X=0,zl=null,Nu(t)):(X=0,zl=null,Pu(e,t,o,7));break;case 5:var s=null;switch(J.tag){case 26:s=J.memoizedState;case 5:case 27:var c=J;if(s?Wf(s):c.stateNode.complete){X=0,zl=null;var l=c.sibling;if(l!==null)J=l;else{var u=c.return;u===null?J=null:(J=u,Fu(u))}break b}}X=0,zl=null,Pu(e,t,o,5);break;case 6:X=0,zl=null,Pu(e,t,o,6);break;case 8:xu(),Wl=6;break a;default:throw Error(i(462))}}ju();break}catch(t){Cu(e,t)}while(1);return Ui=Hi=null,k.H=r,k.A=a,K=n,J===null?(q=null,Y=0,Qr(),Wl):0}function ju(){for(;J!==null&&!Ee();)Mu(J)}function Mu(e){var t=Ac(e.alternate,e,Ul);e.memoizedProps=e.pendingProps,t===null?Fu(e):J=t}function Nu(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=mc(n,t,t.pendingProps,t.type,void 0,Y);break;case 11:t=mc(n,t,t.pendingProps,t.type.render,t.ref,Y);break;case 5:Eo(t);default:zc(n,t),t=J=ci(t,Ul),t=Ac(n,t,Ul)}e.memoizedProps=e.pendingProps,t===null?Fu(e):J=t}function Pu(e,t,n,r){Ui=Hi=null,Eo(t),Oa=null,ka=0;var i=t.return;try{if($s(e,i,t,n,Y)){Wl=1,Js(e,hi(n,e.current)),J=null;return}}catch(t){if(i!==null)throw J=i,t;Wl=1,Js(e,hi(n,e.current)),J=null;return}t.flags&32768?(U||r===1?e=!0:Vl||Y&536870912?e=!1:(Bl=e=!0,(r===2||r===9||r===3||r===6)&&(r=$a.current,r!==null&&r.tag===13&&(r.flags|=16384))),Iu(t,e)):Fu(t)}function Fu(e){var t=e;do{if(t.flags&32768){Iu(t,Bl);return}e=t.return;var n=Lc(t.alternate,t,Ul);if(n!==null){J=n;return}if(t=t.sibling,t!==null){J=t;return}J=t=e}while(t!==null);Wl===0&&(Wl=5)}function Iu(e,t){do{var n=Rc(e.alternate,e);if(n!==null){n.flags&=32767,J=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){J=e;return}J=e=n}while(e!==null);Wl=6,J=null}function Lu(e,t,n,r,a,o,s,c,l){e.cancelPendingCommit=null;do Hu();while(iu!==0);if(K&6)throw Error(i(327));if(t!==null){if(t===e.current)throw Error(i(177));if(o=t.lanes|t.childLanes,o|=B,Ze(e,n,o,s,c,l),e===q&&(J=q=null,Y=0),ou=t,au=e,su=n,cu=o,lu=a,uu=r,t.subtreeFlags&10256||t.flags&10256?(e.callbackNode=null,e.callbackPriority=0,Xu(je,function(){return Uu(),null})):(e.callbackNode=null,e.callbackPriority=0),r=(t.flags&13878)!=0,t.subtreeFlags&13878||r){r=k.T,k.T=null,a=A.p,A.p=2,s=K,K|=4;try{il(e,t,n)}finally{K=s,A.p=a,k.T=r}}iu=1,Ru(),zu(),Bu()}}function Ru(){if(iu===1){iu=0;var e=au,t=ou,n=(t.flags&13878)!=0;if(t.subtreeFlags&13878||n){n=k.T,k.T=null;var r=A.p;A.p=2;var i=K;K|=4;try{_l(t,e);var a=zd,o=Er(e.containerInfo),s=a.focusedElem,c=a.selectionRange;if(o!==s&&s&&s.ownerDocument&&Tr(s.ownerDocument.documentElement,s)){if(c!==null&&Dr(s)){var l=c.start,u=c.end;if(u===void 0&&(u=l),`selectionStart`in s)s.selectionStart=l,s.selectionEnd=Math.min(u,s.value.length);else{var d=s.ownerDocument||document,f=d&&d.defaultView||window;if(f.getSelection){var p=f.getSelection(),m=s.textContent.length,h=Math.min(c.start,m),g=c.end===void 0?h:Math.min(c.end,m);!p.extend&&h>g&&(o=g,g=h,h=o);var _=wr(s,h),v=wr(s,g);if(_&&v&&(p.rangeCount!==1||p.anchorNode!==_.node||p.anchorOffset!==_.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var y=d.createRange();y.setStart(_.node,_.offset),p.removeAllRanges(),h>g?(p.addRange(y),p.extend(v.node,v.offset)):(y.setEnd(v.node,v.offset),p.addRange(y))}}}}for(d=[],p=s;p=p.parentNode;)p.nodeType===1&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof s.focus==`function`&&s.focus(),s=0;s<d.length;s++){var b=d[s];b.element.scrollLeft=b.left,b.element.scrollTop=b.top}}sp=!!Rd,zd=Rd=null}finally{K=i,A.p=r,k.T=n}}e.current=t,iu=2}}function zu(){if(iu===2){iu=0;var e=au,t=ou,n=(t.flags&8772)!=0;if(t.subtreeFlags&8772||n){n=k.T,k.T=null;var r=A.p;A.p=2;var i=K;K|=4;try{al(e,t.alternate,t)}finally{K=i,A.p=r,k.T=n}}iu=3}}function Bu(){if(iu===4||iu===3){iu=0,De();var e=au,t=ou,n=su,r=uu;t.subtreeFlags&10256||t.flags&10256?iu=5:(iu=0,ou=au=null,Vu(e,e.pendingLanes));var i=e.pendingLanes;if(i===0&&(ru=null),nt(n),t=t.stateNode,Le&&typeof Le.onCommitFiberRoot==`function`)try{Le.onCommitFiberRoot(Ie,t,void 0,(t.current.flags&128)==128)}catch{}if(r!==null){t=k.T,i=A.p,A.p=2,k.T=null;try{for(var a=e.onRecoverableError,o=0;o<r.length;o++){var s=r[o];a(s.value,{componentStack:s.stack})}}finally{k.T=t,A.p=i}}su&3&&Hu(),rd(e),i=e.pendingLanes,n&261930&&i&42?e===fu?du++:(du=0,fu=e):du=0,id(0,!1)}}function Vu(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,aa(t)))}function Hu(){return Ru(),zu(),Bu(),Uu()}function Uu(){if(iu!==5)return!1;var e=au,t=cu;cu=0;var n=nt(su),r=k.T,a=A.p;try{A.p=32>n?32:n,k.T=null,n=lu,lu=null;var o=au,s=su;if(iu=0,ou=au=null,su=0,K&6)throw Error(i(331));var c=K;if(K|=4,Pl(o.current),El(o,o.current,s,n),K=c,id(0,!1),Le&&typeof Le.onPostCommitFiberRoot==`function`)try{Le.onPostCommitFiberRoot(Ie,o)}catch{}return!0}finally{A.p=a,k.T=r,Vu(e,t)}}function Wu(e,t,n){t=hi(n,t),t=Xs(e.stateNode,t,2),e=Ba(e,t,2),e!==null&&(Xe(e,2),rd(e))}function Z(e,t,n){if(e.tag===3)Wu(e,e,n);else for(;t!==null;){if(t.tag===3){Wu(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError==`function`||typeof r.componentDidCatch==`function`&&(ru===null||!ru.has(r))){e=hi(n,e),n=Zs(2),r=Ba(t,n,2),r!==null&&(Qs(n,r,t,e),Xe(r,2),rd(r));break}}t=t.return}}function Gu(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Rl;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(Hl=!0,i.add(n),e=Ku.bind(null,e,t,n),t.then(e,e))}function Ku(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,q===e&&(Y&n)===n&&(Wl===4||Wl===3&&(Y&62914560)===Y&&300>I()-$l?!(K&2)&&Su(e,0):ql|=n,Yl===Y&&(Yl=0)),rd(e)}function qu(e,t){t===0&&(t=Je()),e=ti(e,t),e!==null&&(Xe(e,t),rd(e))}function Ju(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),qu(e,n)}function Yu(e,t){var n=0;switch(e.tag){case 31:case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(i(314))}r!==null&&r.delete(t),qu(e,n)}function Xu(e,t){return we(e,t)}var Zu=null,Qu=null,$u=!1,ed=!1,td=!1,nd=0;function rd(e){e!==Qu&&e.next===null&&(Qu===null?Zu=Qu=e:Qu=Qu.next=e),ed=!0,$u||($u=!0,ud())}function id(e,t){if(!td&&ed){td=!0;do for(var n=!1,r=Zu;r!==null;){if(!t)if(e!==0){var i=r.pendingLanes;if(i===0)var a=0;else{var o=r.suspendedLanes,s=r.pingedLanes;a=(1<<31-L(42|e)+1)-1,a&=i&~(o&~s),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,ld(r,a))}else a=Y,a=Ge(r,r===q?a:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),!(a&3)||Ke(r,a)||(n=!0,ld(r,a));r=r.next}while(n);td=!1}}function ad(){od()}function od(){ed=$u=!1;var e=0;nd!==0&&Gd()&&(e=nd);for(var t=I(),n=null,r=Zu;r!==null;){var i=r.next,a=sd(r,t);a===0?(r.next=null,n===null?Zu=i:n.next=i,i===null&&(Qu=n)):(n=r,(e!==0||a&3)&&(ed=!0)),r=i}iu!==0&&iu!==5||id(e,!1),nd!==0&&(nd=0)}function sd(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var o=31-L(a),s=1<<o,c=i[o];c===-1?((s&n)===0||(s&r)!==0)&&(i[o]=qe(s,t)):c<=t&&(e.expiredLanes|=s),a&=~s}if(t=q,n=Y,n=Ge(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,n===0||e===t&&(X===2||X===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&Te(r),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||Ke(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(r!==null&&Te(r),nt(n)){case 2:case 8:n=Ae;break;case 32:n=je;break;case 268435456:n=Ne;break;default:n=je}return r=cd.bind(null,e),n=we(n,r),e.callbackPriority=t,e.callbackNode=n,t}return r!==null&&r!==null&&Te(r),e.callbackPriority=2,e.callbackNode=null,2}function cd(e,t){if(iu!==0&&iu!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(Hu()&&e.callbackNode!==n)return null;var r=Y;return r=Ge(e,e===q?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(gu(e,r,t),sd(e,I()),e.callbackNode!=null&&e.callbackNode===n?cd.bind(null,e):null)}function ld(e,t){if(Hu())return null;gu(e,t,!0)}function ud(){Yd(function(){K&6?we(ke,ad):od()})}function dd(){if(nd===0){var e=ca;e===0&&(e=He,He<<=1,!(He&261888)&&(He=256)),nd=e}return nd}function fd(e){return e==null||typeof e==`symbol`||typeof e==`boolean`?null:typeof e==`function`?e:Qt(``+e)}function pd(e,t){var n=t.ownerDocument.createElement(`input`);return n.name=t.name,n.value=t.value,e.id&&n.setAttribute(`form`,e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}function md(e,t,n,r,i){if(t===`submit`&&n&&n.stateNode===i){var a=fd((i[st]||null).action),o=r.submitter;o&&(t=(t=o[st]||null)?fd(t.formAction):o.getAttribute(`formAction`),t!==null&&(a=t,o=null));var s=new xn(`action`,`action`,null,r,i);e.push({event:s,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(nd!==0){var e=o?pd(i,o):new FormData(i);Ss(n,{pending:!0,data:e,method:i.method,action:a},null,e)}}else typeof a==`function`&&(s.preventDefault(),e=o?pd(i,o):new FormData(i),Ss(n,{pending:!0,data:e,method:i.method,action:a},a,e))},currentTarget:i}]})}}for(var hd=0;hd<qr.length;hd++){var gd=qr[hd];Jr(gd.toLowerCase(),`on`+(gd[0].toUpperCase()+gd.slice(1)))}Jr(zr,`onAnimationEnd`),Jr(Br,`onAnimationIteration`),Jr(Vr,`onAnimationStart`),Jr(`dblclick`,`onDoubleClick`),Jr(`focusin`,`onFocus`),Jr(`focusout`,`onBlur`),Jr(Hr,`onTransitionRun`),Jr(Ur,`onTransitionStart`),Jr(Wr,`onTransitionCancel`),Jr(Gr,`onTransitionEnd`),Ct(`onMouseEnter`,[`mouseout`,`mouseover`]),Ct(`onMouseLeave`,[`mouseout`,`mouseover`]),Ct(`onPointerEnter`,[`pointerout`,`pointerover`]),Ct(`onPointerLeave`,[`pointerout`,`pointerover`]),St(`onChange`,`change click focusin focusout input keydown keyup selectionchange`.split(` `)),St(`onSelect`,`focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)),St(`onBeforeInput`,[`compositionend`,`keypress`,`textInput`,`paste`]),St(`onCompositionEnd`,`compositionend focusout keydown keypress keyup mousedown`.split(` `)),St(`onCompositionStart`,`compositionstart focusout keydown keypress keyup mousedown`.split(` `)),St(`onCompositionUpdate`,`compositionupdate focusout keydown keypress keyup mousedown`.split(` `));var _d=`abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `),vd=new Set(`beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(_d));function yd(e,t){t=(t&4)!=0;for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;a:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,l=s.currentTarget;if(s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){Yr(e)}i.currentTarget=null,a=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,l=s.currentTarget,s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){Yr(e)}i.currentTarget=null,a=c}}}}function Q(e,t){var n=t[lt];n===void 0&&(n=t[lt]=new Set);var r=e+`__bubble`;n.has(r)||(Cd(t,e,2,!1),n.add(r))}function bd(e,t,n){var r=0;t&&(r|=4),Cd(n,e,r,t)}var xd=`_reactListening`+Math.random().toString(36).slice(2);function Sd(e){if(!e[xd]){e[xd]=!0,bt.forEach(function(t){t!==`selectionchange`&&(vd.has(t)||bd(t,!1,e),bd(t,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[xd]||(t[xd]=!0,bd(`selectionchange`,!1,t))}}function Cd(e,t,n,r){switch(mp(t)){case 2:var i=cp;break;case 8:i=lp;break;default:i=up}n=i.bind(null,t,n,e),i=void 0,!un||t!==`touchstart`&&t!==`touchmove`&&t!==`wheel`||(i=!0),r?i===void 0?e.addEventListener(t,n,!0):e.addEventListener(t,n,{capture:!0,passive:i}):i===void 0?e.addEventListener(t,n,!1):e.addEventListener(t,n,{passive:i})}function wd(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)a:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var c=r.stateNode.containerInfo;if(c===i)break;if(s===4)for(s=r.return;s!==null;){var l=s.tag;if((l===3||l===4)&&s.stateNode.containerInfo===i)return;s=s.return}for(;c!==null;){if(s=ht(c),s===null)return;if(l=s.tag,l===5||l===6||l===26||l===27){r=a=s;continue a}c=c.parentNode}}r=r.return}sn(function(){var r=a,i=tn(n),s=[];a:{var c=Kr.get(e);if(c!==void 0){var l=xn,u=e;switch(e){case`keypress`:if(gn(n)===0)break a;case`keydown`:case`keyup`:l=zn;break;case`focusin`:u=`focus`,l=An;break;case`focusout`:u=`blur`,l=An;break;case`beforeblur`:case`afterblur`:l=An;break;case`click`:if(n.button===2)break a;case`auxclick`:case`dblclick`:case`mousedown`:case`mousemove`:case`mouseup`:case`mouseout`:case`mouseover`:case`contextmenu`:l=On;break;case`drag`:case`dragend`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`dragstart`:case`drop`:l=kn;break;case`touchcancel`:case`touchend`:case`touchmove`:case`touchstart`:l=z;break;case zr:case Br:case Vr:l=jn;break;case Gr:l=Vn;break;case`scroll`:case`scrollend`:l=Cn;break;case`wheel`:l=Hn;break;case`copy`:case`cut`:case`paste`:l=Mn;break;case`gotpointercapture`:case`lostpointercapture`:case`pointercancel`:case`pointerdown`:case`pointermove`:case`pointerout`:case`pointerover`:case`pointerup`:l=Bn;break;case`toggle`:case`beforetoggle`:l=Un}var d=(t&4)!=0,f=!d&&(e===`scroll`||e===`scrollend`),p=d?c===null?null:c+`Capture`:c;d=[];for(var m=r,h;m!==null;){var g=m;if(h=g.stateNode,g=g.tag,g!==5&&g!==26&&g!==27||h===null||p===null||(g=cn(m,p),g!=null&&d.push(Td(m,g,h))),f)break;m=m.return}0<d.length&&(c=new l(c,u,null,n,i),s.push({event:c,listeners:d}))}}if(!(t&7)){a:{if(c=e===`mouseover`||e===`pointerover`,l=e===`mouseout`||e===`pointerout`,c&&n!==en&&(u=n.relatedTarget||n.fromElement)&&(ht(u)||u[ct]))break a;if((l||c)&&(c=i.window===i?i:(c=i.ownerDocument)?c.defaultView||c.parentWindow:window,l?(u=n.relatedTarget||n.toElement,l=r,u=u?ht(u):null,u!==null&&(f=o(u),d=u.tag,u!==f||d!==5&&d!==27&&d!==6)&&(u=null)):(l=null,u=r),l!==u)){if(d=On,g=`onMouseLeave`,p=`onMouseEnter`,m=`mouse`,(e===`pointerout`||e===`pointerover`)&&(d=Bn,g=`onPointerLeave`,p=`onPointerEnter`,m=`pointer`),f=l==null?c:_t(l),h=u==null?c:_t(u),c=new d(g,m+`leave`,l,n,i),c.target=f,c.relatedTarget=h,g=null,ht(i)===r&&(d=new d(p,m+`enter`,u,n,i),d.target=h,d.relatedTarget=f,g=d),f=g,l&&u)b:{for(d=Dd,p=l,m=u,h=0,g=p;g;g=d(g))h++;g=0;for(var _=m;_;_=d(_))g++;for(;0<h-g;)p=d(p),h--;for(;0<g-h;)m=d(m),g--;for(;h--;){if(p===m||m!==null&&p===m.alternate){d=p;break b}p=d(p),m=d(m)}d=null}else d=null;l!==null&&Od(s,c,l,d,!1),u!==null&&f!==null&&Od(s,f,u,d,!0)}}a:{if(c=r?_t(r):window,l=c.nodeName&&c.nodeName.toLowerCase(),l===`select`||l===`input`&&c.type===`file`)var v=lr;else if(rr(c))if(ur)v=yr;else{v=_r;var y=gr}else l=c.nodeName,!l||l.toLowerCase()!==`input`||c.type!==`checkbox`&&c.type!==`radio`?r&&Yt(r.elementType)&&(v=lr):v=vr;if(v&&=v(e,r)){ir(s,v,n,i);break a}y&&y(e,c,r),e===`focusout`&&r&&c.type===`number`&&r.memoizedProps.value!=null&&Vt(c,`number`,c.value)}switch(y=r?_t(r):window,e){case`focusin`:(rr(y)||y.contentEditable===`true`)&&(kr=y,Ar=r,jr=null);break;case`focusout`:jr=Ar=kr=null;break;case`mousedown`:Mr=!0;break;case`contextmenu`:case`mouseup`:case`dragend`:Mr=!1,Nr(s,n,i);break;case`selectionchange`:if(Or)break;case`keydown`:case`keyup`:Nr(s,n,i)}var b;if(Gn)b:{switch(e){case`compositionstart`:var x=`onCompositionStart`;break b;case`compositionend`:x=`onCompositionEnd`;break b;case`compositionupdate`:x=`onCompositionUpdate`;break b}x=void 0}else $n?Zn(e,n)&&(x=`onCompositionEnd`):e===`keydown`&&n.keyCode===229&&(x=`onCompositionStart`);x&&(Jn&&n.locale!==`ko`&&($n||x!==`onCompositionStart`?x===`onCompositionEnd`&&$n&&(b=hn()):(fn=i,pn=`value`in fn?fn.value:fn.textContent,$n=!0)),y=Ed(r,x),0<y.length&&(x=new Nn(x,e,null,n,i),s.push({event:x,listeners:y}),b?x.data=b:(b=Qn(n),b!==null&&(x.data=b)))),(b=qn?er(e,n):tr(e,n))&&(x=Ed(r,`onBeforeInput`),0<x.length&&(y=new Nn(`onBeforeInput`,`beforeinput`,null,n,i),s.push({event:y,listeners:x}),y.data=b)),md(s,e,r,n,i)}yd(s,t)})}function Td(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Ed(e,t){for(var n=t+`Capture`,r=[];e!==null;){var i=e,a=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||a===null||(i=cn(e,n),i!=null&&r.unshift(Td(e,i,a)),i=cn(e,t),i!=null&&r.push(Td(e,i,a))),e.tag===3)return r;e=e.return}return[]}function Dd(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Od(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,l=s.stateNode;if(s=s.tag,c!==null&&c===r)break;s!==5&&s!==26&&s!==27||l===null||(c=l,i?(l=cn(n,a),l!=null&&o.unshift(Td(n,l,c))):i||(l=cn(n,a),l!=null&&o.push(Td(n,l,c)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var kd=/\r\n?/g,Ad=/\u0000|\uFFFD/g;function jd(e){return(typeof e==`string`?e:``+e).replace(kd,`
`).replace(Ad,``)}function Md(e,t){return t=jd(t),jd(e)===t}function $(e,t,n,r,a,o){switch(n){case`children`:typeof r==`string`?t===`body`||t===`textarea`&&r===``||Gt(e,r):(typeof r==`number`||typeof r==`bigint`)&&t!==`body`&&Gt(e,``+r);break;case`className`:kt(e,`class`,r);break;case`tabIndex`:kt(e,`tabindex`,r);break;case`dir`:case`role`:case`viewBox`:case`width`:case`height`:kt(e,n,r);break;case`style`:Jt(e,r,o);break;case`data`:if(t!==`object`){kt(e,`data`,r);break}case`src`:case`href`:if(r===``&&(t!==`a`||n!==`href`)){e.removeAttribute(n);break}if(r==null||typeof r==`function`||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=Qt(``+r),e.setAttribute(n,r);break;case`action`:case`formAction`:if(typeof r==`function`){e.setAttribute(n,`javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`);break}else typeof o==`function`&&(n===`formAction`?(t!==`input`&&$(e,t,`name`,a.name,a,null),$(e,t,`formEncType`,a.formEncType,a,null),$(e,t,`formMethod`,a.formMethod,a,null),$(e,t,`formTarget`,a.formTarget,a,null)):($(e,t,`encType`,a.encType,a,null),$(e,t,`method`,a.method,a,null),$(e,t,`target`,a.target,a,null)));if(r==null||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=Qt(``+r),e.setAttribute(n,r);break;case`onClick`:r!=null&&(e.onclick=$t);break;case`onScroll`:r!=null&&Q(`scroll`,e);break;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));e.innerHTML=n}}break;case`multiple`:e.multiple=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`muted`:e.muted=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`defaultValue`:case`defaultChecked`:case`innerHTML`:case`ref`:break;case`autoFocus`:break;case`xlinkHref`:if(r==null||typeof r==`function`||typeof r==`boolean`||typeof r==`symbol`){e.removeAttribute(`xlink:href`);break}n=Qt(``+r),e.setAttributeNS(`http://www.w3.org/1999/xlink`,`xlink:href`,n);break;case`contentEditable`:case`spellCheck`:case`draggable`:case`value`:case`autoReverse`:case`externalResourcesRequired`:case`focusable`:case`preserveAlpha`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``+r):e.removeAttribute(n);break;case`inert`:case`allowFullScreen`:case`async`:case`autoPlay`:case`controls`:case`default`:case`defer`:case`disabled`:case`disablePictureInPicture`:case`disableRemotePlayback`:case`formNoValidate`:case`hidden`:case`loop`:case`noModule`:case`noValidate`:case`open`:case`playsInline`:case`readOnly`:case`required`:case`reversed`:case`scoped`:case`seamless`:case`itemScope`:r&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``):e.removeAttribute(n);break;case`capture`:case`download`:!0===r?e.setAttribute(n,``):!1!==r&&r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`cols`:case`rows`:case`size`:case`span`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case`rowSpan`:case`start`:r==null||typeof r==`function`||typeof r==`symbol`||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case`popover`:Q(`beforetoggle`,e),Q(`toggle`,e),Ot(e,`popover`,r);break;case`xlinkActuate`:At(e,`http://www.w3.org/1999/xlink`,`xlink:actuate`,r);break;case`xlinkArcrole`:At(e,`http://www.w3.org/1999/xlink`,`xlink:arcrole`,r);break;case`xlinkRole`:At(e,`http://www.w3.org/1999/xlink`,`xlink:role`,r);break;case`xlinkShow`:At(e,`http://www.w3.org/1999/xlink`,`xlink:show`,r);break;case`xlinkTitle`:At(e,`http://www.w3.org/1999/xlink`,`xlink:title`,r);break;case`xlinkType`:At(e,`http://www.w3.org/1999/xlink`,`xlink:type`,r);break;case`xmlBase`:At(e,`http://www.w3.org/XML/1998/namespace`,`xml:base`,r);break;case`xmlLang`:At(e,`http://www.w3.org/XML/1998/namespace`,`xml:lang`,r);break;case`xmlSpace`:At(e,`http://www.w3.org/XML/1998/namespace`,`xml:space`,r);break;case`is`:Ot(e,`is`,r);break;case`innerText`:case`textContent`:break;default:(!(2<n.length)||n[0]!==`o`&&n[0]!==`O`||n[1]!==`n`&&n[1]!==`N`)&&(n=Xt.get(n)||n,Ot(e,n,r))}}function Nd(e,t,n,r,a,o){switch(n){case`style`:Jt(e,r,o);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));e.innerHTML=n}}break;case`children`:typeof r==`string`?Gt(e,r):(typeof r==`number`||typeof r==`bigint`)&&Gt(e,``+r);break;case`onScroll`:r!=null&&Q(`scroll`,e);break;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);break;case`onClick`:r!=null&&(e.onclick=$t);break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`innerHTML`:case`ref`:break;case`innerText`:case`textContent`:break;default:if(!xt.hasOwnProperty(n))a:{if(n[0]===`o`&&n[1]===`n`&&(a=n.endsWith(`Capture`),t=n.slice(2,a?n.length-7:void 0),o=e[st]||null,o=o==null?null:o[n],typeof o==`function`&&e.removeEventListener(t,o,a),typeof r==`function`)){typeof o!=`function`&&o!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,r,a);break a}n in e?e[n]=r:!0===r?e.setAttribute(n,``):Ot(e,n,r)}}}function Pd(e,t,n){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`img`:Q(`error`,e),Q(`load`,e);var r=!1,a=!1,o;for(o in n)if(n.hasOwnProperty(o)){var s=n[o];if(s!=null)switch(o){case`src`:r=!0;break;case`srcSet`:a=!0;break;case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:$(e,t,o,s,n,null)}}a&&$(e,t,`srcSet`,n.srcSet,n,null),r&&$(e,t,`src`,n.src,n,null);return;case`input`:Q(`invalid`,e);var c=o=s=a=null,l=null,u=null;for(r in n)if(n.hasOwnProperty(r)){var d=n[r];if(d!=null)switch(r){case`name`:a=d;break;case`type`:s=d;break;case`checked`:l=d;break;case`defaultChecked`:u=d;break;case`value`:o=d;break;case`defaultValue`:c=d;break;case`children`:case`dangerouslySetInnerHTML`:if(d!=null)throw Error(i(137,t));break;default:$(e,t,r,d,n,null)}}Bt(e,o,c,l,u,s,a,!1);return;case`select`:for(a in Q(`invalid`,e),r=s=o=null,n)if(n.hasOwnProperty(a)&&(c=n[a],c!=null))switch(a){case`value`:o=c;break;case`defaultValue`:s=c;break;case`multiple`:r=c;default:$(e,t,a,c,n,null)}t=o,n=s,e.multiple=!!r,t==null?n!=null&&Ht(e,!!r,n,!0):Ht(e,!!r,t,!1);return;case`textarea`:for(s in Q(`invalid`,e),o=a=r=null,n)if(n.hasOwnProperty(s)&&(c=n[s],c!=null))switch(s){case`value`:r=c;break;case`defaultValue`:a=c;break;case`children`:o=c;break;case`dangerouslySetInnerHTML`:if(c!=null)throw Error(i(91));break;default:$(e,t,s,c,n,null)}Wt(e,r,a,o);return;case`option`:for(l in n)if(n.hasOwnProperty(l)&&(r=n[l],r!=null))switch(l){case`selected`:e.selected=r&&typeof r!=`function`&&typeof r!=`symbol`;break;default:$(e,t,l,r,n,null)}return;case`dialog`:Q(`beforetoggle`,e),Q(`toggle`,e),Q(`cancel`,e),Q(`close`,e);break;case`iframe`:case`object`:Q(`load`,e);break;case`video`:case`audio`:for(r=0;r<_d.length;r++)Q(_d[r],e);break;case`image`:Q(`error`,e),Q(`load`,e);break;case`details`:Q(`toggle`,e);break;case`embed`:case`source`:case`link`:Q(`error`,e),Q(`load`,e);case`area`:case`base`:case`br`:case`col`:case`hr`:case`keygen`:case`meta`:case`param`:case`track`:case`wbr`:case`menuitem`:for(u in n)if(n.hasOwnProperty(u)&&(r=n[u],r!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:$(e,t,u,r,n,null)}return;default:if(Yt(t)){for(d in n)n.hasOwnProperty(d)&&(r=n[d],r!==void 0&&Nd(e,t,d,r,n,void 0));return}}for(c in n)n.hasOwnProperty(c)&&(r=n[c],r!=null&&$(e,t,c,r,n,null))}function Fd(e,t,n,r){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`input`:var a=null,o=null,s=null,c=null,l=null,u=null,d=null;for(m in n){var f=n[m];if(n.hasOwnProperty(m)&&f!=null)switch(m){case`checked`:break;case`value`:break;case`defaultValue`:l=f;default:r.hasOwnProperty(m)||$(e,t,m,null,r,f)}}for(var p in r){var m=r[p];if(f=n[p],r.hasOwnProperty(p)&&(m!=null||f!=null))switch(p){case`type`:o=m;break;case`name`:a=m;break;case`checked`:u=m;break;case`defaultChecked`:d=m;break;case`value`:s=m;break;case`defaultValue`:c=m;break;case`children`:case`dangerouslySetInnerHTML`:if(m!=null)throw Error(i(137,t));break;default:m!==f&&$(e,t,p,m,r,f)}}zt(e,s,c,l,u,d,o,a);return;case`select`:for(o in m=s=c=p=null,n)if(l=n[o],n.hasOwnProperty(o)&&l!=null)switch(o){case`value`:break;case`multiple`:m=l;default:r.hasOwnProperty(o)||$(e,t,o,null,r,l)}for(a in r)if(o=r[a],l=n[a],r.hasOwnProperty(a)&&(o!=null||l!=null))switch(a){case`value`:p=o;break;case`defaultValue`:c=o;break;case`multiple`:s=o;default:o!==l&&$(e,t,a,o,r,l)}t=c,n=s,r=m,p==null?!!r!=!!n&&(t==null?Ht(e,!!n,n?[]:``,!1):Ht(e,!!n,t,!0)):Ht(e,!!n,p,!1);return;case`textarea`:for(c in m=p=null,n)if(a=n[c],n.hasOwnProperty(c)&&a!=null&&!r.hasOwnProperty(c))switch(c){case`value`:break;case`children`:break;default:$(e,t,c,null,r,a)}for(s in r)if(a=r[s],o=n[s],r.hasOwnProperty(s)&&(a!=null||o!=null))switch(s){case`value`:p=a;break;case`defaultValue`:m=a;break;case`children`:break;case`dangerouslySetInnerHTML`:if(a!=null)throw Error(i(91));break;default:a!==o&&$(e,t,s,a,r,o)}Ut(e,p,m);return;case`option`:for(var h in n)if(p=n[h],n.hasOwnProperty(h)&&p!=null&&!r.hasOwnProperty(h))switch(h){case`selected`:e.selected=!1;break;default:$(e,t,h,null,r,p)}for(l in r)if(p=r[l],m=n[l],r.hasOwnProperty(l)&&p!==m&&(p!=null||m!=null))switch(l){case`selected`:e.selected=p&&typeof p!=`function`&&typeof p!=`symbol`;break;default:$(e,t,l,p,r,m)}return;case`img`:case`link`:case`area`:case`base`:case`br`:case`col`:case`embed`:case`hr`:case`keygen`:case`meta`:case`param`:case`source`:case`track`:case`wbr`:case`menuitem`:for(var g in n)p=n[g],n.hasOwnProperty(g)&&p!=null&&!r.hasOwnProperty(g)&&$(e,t,g,null,r,p);for(u in r)if(p=r[u],m=n[u],r.hasOwnProperty(u)&&p!==m&&(p!=null||m!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:if(p!=null)throw Error(i(137,t));break;default:$(e,t,u,p,r,m)}return;default:if(Yt(t)){for(var _ in n)p=n[_],n.hasOwnProperty(_)&&p!==void 0&&!r.hasOwnProperty(_)&&Nd(e,t,_,void 0,r,p);for(d in r)p=r[d],m=n[d],!r.hasOwnProperty(d)||p===m||p===void 0&&m===void 0||Nd(e,t,d,p,r,m);return}}for(var v in n)p=n[v],n.hasOwnProperty(v)&&p!=null&&!r.hasOwnProperty(v)&&$(e,t,v,null,r,p);for(f in r)p=r[f],m=n[f],!r.hasOwnProperty(f)||p===m||p==null&&m==null||$(e,t,f,p,r,m)}function Id(e){switch(e){case`css`:case`script`:case`font`:case`img`:case`image`:case`input`:case`link`:return!0;default:return!1}}function Ld(){if(typeof performance.getEntriesByType==`function`){for(var e=0,t=0,n=performance.getEntriesByType(`resource`),r=0;r<n.length;r++){var i=n[r],a=i.transferSize,o=i.initiatorType,s=i.duration;if(a&&s&&Id(o)){for(o=0,s=i.responseEnd,r+=1;r<n.length;r++){var c=n[r],l=c.startTime;if(l>s)break;var u=c.transferSize,d=c.initiatorType;u&&Id(d)&&(c=c.responseEnd,o+=u*(c<s?1:(s-l)/(c-l)))}if(--r,t+=8*(a+o)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e==`number`)?e:5}var Rd=null,zd=null;function Bd(e){return e.nodeType===9?e:e.ownerDocument}function Vd(e){switch(e){case`http://www.w3.org/2000/svg`:return 1;case`http://www.w3.org/1998/Math/MathML`:return 2;default:return 0}}function Hd(e,t){if(e===0)switch(t){case`svg`:return 1;case`math`:return 2;default:return 0}return e===1&&t===`foreignObject`?0:e}function Ud(e,t){return e===`textarea`||e===`noscript`||typeof t.children==`string`||typeof t.children==`number`||typeof t.children==`bigint`||typeof t.dangerouslySetInnerHTML==`object`&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Wd=null;function Gd(){var e=window.event;return e&&e.type===`popstate`?e===Wd?!1:(Wd=e,!0):(Wd=null,!1)}var Kd=typeof setTimeout==`function`?setTimeout:void 0,qd=typeof clearTimeout==`function`?clearTimeout:void 0,Jd=typeof Promise==`function`?Promise:void 0,Yd=typeof queueMicrotask==`function`?queueMicrotask:Jd===void 0?Kd:function(e){return Jd.resolve(null).then(e).catch(Xd)};function Xd(e){setTimeout(function(){throw e})}function Zd(e){return e===`head`}function Qd(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8)if(n=i.data,n===`/$`||n===`/&`){if(r===0){e.removeChild(i),Np(t);return}r--}else if(n===`$`||n===`$?`||n===`$~`||n===`$!`||n===`&`)r++;else if(n===`html`)pf(e.ownerDocument.documentElement);else if(n===`head`){n=e.ownerDocument.head,pf(n);for(var a=n.firstChild;a;){var o=a.nextSibling,s=a.nodeName;a[pt]||s===`SCRIPT`||s===`STYLE`||s===`LINK`&&a.rel.toLowerCase()===`stylesheet`||n.removeChild(a),a=o}}else n===`body`&&pf(e.ownerDocument.body);n=i}while(n);Np(t)}function $d(e,t){var n=e;e=0;do{var r=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display=`none`):(n.style.display=n._stashedDisplay||``,n.getAttribute(`style`)===``&&n.removeAttribute(`style`)):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=``):n.nodeValue=n._stashedText||``),r&&r.nodeType===8)if(n=r.data,n===`/$`){if(e===0)break;e--}else n!==`$`&&n!==`$?`&&n!==`$~`&&n!==`$!`||e++;n=r}while(n)}function ef(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case`HTML`:case`HEAD`:case`BODY`:ef(n),mt(n);continue;case`SCRIPT`:case`STYLE`:continue;case`LINK`:if(n.rel.toLowerCase()===`stylesheet`)continue}e.removeChild(n)}}function tf(e,t,n,r){for(;e.nodeType===1;){var i=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&(e.nodeName!==`INPUT`||e.type!==`hidden`))break}else if(!r)if(t===`input`&&e.type===`hidden`){var a=i.name==null?null:``+i.name;if(i.type===`hidden`&&e.getAttribute(`name`)===a)return e}else return e;else if(!e[pt])switch(t){case`meta`:if(!e.hasAttribute(`itemprop`))break;return e;case`link`:if(a=e.getAttribute(`rel`),a===`stylesheet`&&e.hasAttribute(`data-precedence`)||a!==i.rel||e.getAttribute(`href`)!==(i.href==null||i.href===``?null:i.href)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute(`title`)!==(i.title==null?null:i.title))break;return e;case`style`:if(e.hasAttribute(`data-precedence`))break;return e;case`script`:if(a=e.getAttribute(`src`),(a!==(i.src==null?null:i.src)||e.getAttribute(`type`)!==(i.type==null?null:i.type)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin))&&a&&e.hasAttribute(`async`)&&!e.hasAttribute(`itemprop`))break;return e;default:return e}if(e=cf(e.nextSibling),e===null)break}return null}function nf(e,t,n){if(t===``)return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!n||(e=cf(e.nextSibling),e===null))return null;return e}function rf(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!t||(e=cf(e.nextSibling),e===null))return null;return e}function af(e){return e.data===`$?`||e.data===`$~`}function of(e){return e.data===`$!`||e.data===`$?`&&e.ownerDocument.readyState!==`loading`}function sf(e,t){var n=e.ownerDocument;if(e.data===`$~`)e._reactRetry=t;else if(e.data!==`$?`||n.readyState!==`loading`)t();else{var r=function(){t(),n.removeEventListener(`DOMContentLoaded`,r)};n.addEventListener(`DOMContentLoaded`,r),e._reactRetry=r}}function cf(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t===`$`||t===`$!`||t===`$?`||t===`$~`||t===`&`||t===`F!`||t===`F`)break;if(t===`/$`||t===`/&`)return null}}return e}var lf=null;function uf(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`/$`||n===`/&`){if(t===0)return cf(e.nextSibling);t--}else n!==`$`&&n!==`$!`&&n!==`$?`&&n!==`$~`&&n!==`&`||t++}e=e.nextSibling}return null}function df(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`$`||n===`$!`||n===`$?`||n===`$~`||n===`&`){if(t===0)return e;t--}else n!==`/$`&&n!==`/&`||t++}e=e.previousSibling}return null}function ff(e,t,n){switch(t=Bd(n),e){case`html`:if(e=t.documentElement,!e)throw Error(i(452));return e;case`head`:if(e=t.head,!e)throw Error(i(453));return e;case`body`:if(e=t.body,!e)throw Error(i(454));return e;default:throw Error(i(451))}}function pf(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);mt(e)}var mf=new Map,hf=new Set;function gf(e){return typeof e.getRootNode==`function`?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var _f=A.d;A.d={f:vf,r:yf,D:Sf,C:Cf,L:wf,m:Tf,X:Df,S:Ef,M:Of};function vf(){var e=_f.f(),t=bu();return e||t}function yf(e){var t=gt(e);t!==null&&t.tag===5&&t.type===`form`?ws(t):_f.r(e)}var bf=typeof document>`u`?null:document;function xf(e,t,n){var r=bf;if(r&&typeof t==`string`&&t){var i=Rt(t);i=`link[rel="`+e+`"][href="`+i+`"]`,typeof n==`string`&&(i+=`[crossorigin="`+n+`"]`),hf.has(i)||(hf.add(i),e={rel:e,crossOrigin:n,href:t},r.querySelector(i)===null&&(t=r.createElement(`link`),Pd(t,`link`,e),yt(t),r.head.appendChild(t)))}}function Sf(e){_f.D(e),xf(`dns-prefetch`,e,null)}function Cf(e,t){_f.C(e,t),xf(`preconnect`,e,t)}function wf(e,t,n){_f.L(e,t,n);var r=bf;if(r&&e&&t){var i=`link[rel="preload"][as="`+Rt(t)+`"]`;t===`image`&&n&&n.imageSrcSet?(i+=`[imagesrcset="`+Rt(n.imageSrcSet)+`"]`,typeof n.imageSizes==`string`&&(i+=`[imagesizes="`+Rt(n.imageSizes)+`"]`)):i+=`[href="`+Rt(e)+`"]`;var a=i;switch(t){case`style`:a=Af(e);break;case`script`:a=Pf(e)}mf.has(a)||(e=h({rel:`preload`,href:t===`image`&&n&&n.imageSrcSet?void 0:e,as:t},n),mf.set(a,e),r.querySelector(i)!==null||t===`style`&&r.querySelector(jf(a))||t===`script`&&r.querySelector(Ff(a))||(t=r.createElement(`link`),Pd(t,`link`,e),yt(t),r.head.appendChild(t)))}}function Tf(e,t){_f.m(e,t);var n=bf;if(n&&e){var r=t&&typeof t.as==`string`?t.as:`script`,i=`link[rel="modulepreload"][as="`+Rt(r)+`"][href="`+Rt(e)+`"]`,a=i;switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:a=Pf(e)}if(!mf.has(a)&&(e=h({rel:`modulepreload`,href:e},t),mf.set(a,e),n.querySelector(i)===null)){switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:if(n.querySelector(Ff(a)))return}r=n.createElement(`link`),Pd(r,`link`,e),yt(r),n.head.appendChild(r)}}}function Ef(e,t,n){_f.S(e,t,n);var r=bf;if(r&&e){var i=vt(r).hoistableStyles,a=Af(e);t||=`default`;var o=i.get(a);if(!o){var s={loading:0,preload:null};if(o=r.querySelector(jf(a)))s.loading=5;else{e=h({rel:`stylesheet`,href:e,"data-precedence":t},n),(n=mf.get(a))&&Rf(e,n);var c=o=r.createElement(`link`);yt(c),Pd(c,`link`,e),c._p=new Promise(function(e,t){c.onload=e,c.onerror=t}),c.addEventListener(`load`,function(){s.loading|=1}),c.addEventListener(`error`,function(){s.loading|=2}),s.loading|=4,Lf(o,t,r)}o={type:`stylesheet`,instance:o,count:1,state:s},i.set(a,o)}}}function Df(e,t){_f.X(e,t);var n=bf;if(n&&e){var r=vt(n).hoistableScripts,i=Pf(e),a=r.get(i);a||(a=n.querySelector(Ff(i)),a||(e=h({src:e,async:!0},t),(t=mf.get(i))&&zf(e,t),a=n.createElement(`script`),yt(a),Pd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Of(e,t){_f.M(e,t);var n=bf;if(n&&e){var r=vt(n).hoistableScripts,i=Pf(e),a=r.get(i);a||(a=n.querySelector(Ff(i)),a||(e=h({src:e,async:!0,type:`module`},t),(t=mf.get(i))&&zf(e,t),a=n.createElement(`script`),yt(a),Pd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function kf(e,t,n,r){var a=(a=P.current)?gf(a):null;if(!a)throw Error(i(446));switch(e){case`meta`:case`title`:return null;case`style`:return typeof n.precedence==`string`&&typeof n.href==`string`?(t=Af(n.href),n=vt(a).hoistableStyles,r=n.get(t),r||(r={type:`style`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};case`link`:if(n.rel===`stylesheet`&&typeof n.href==`string`&&typeof n.precedence==`string`){e=Af(n.href);var o=vt(a).hoistableStyles,s=o.get(e);if(s||(a=a.ownerDocument||a,s={type:`stylesheet`,instance:null,count:0,state:{loading:0,preload:null}},o.set(e,s),(o=a.querySelector(jf(e)))&&!o._p&&(s.instance=o,s.state.loading=5),mf.has(e)||(n={rel:`preload`,as:`style`,href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},mf.set(e,n),o||Nf(a,e,n,s.state))),t&&r===null)throw Error(i(528,``));return s}if(t&&r!==null)throw Error(i(529,``));return null;case`script`:return t=n.async,n=n.src,typeof n==`string`&&t&&typeof t!=`function`&&typeof t!=`symbol`?(t=Pf(n),n=vt(a).hoistableScripts,r=n.get(t),r||(r={type:`script`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};default:throw Error(i(444,e))}}function Af(e){return`href="`+Rt(e)+`"`}function jf(e){return`link[rel="stylesheet"][`+e+`]`}function Mf(e){return h({},e,{"data-precedence":e.precedence,precedence:null})}function Nf(e,t,n,r){e.querySelector(`link[rel="preload"][as="style"][`+t+`]`)?r.loading=1:(t=e.createElement(`link`),r.preload=t,t.addEventListener(`load`,function(){return r.loading|=1}),t.addEventListener(`error`,function(){return r.loading|=2}),Pd(t,`link`,n),yt(t),e.head.appendChild(t))}function Pf(e){return`[src="`+Rt(e)+`"]`}function Ff(e){return`script[async]`+e}function If(e,t,n){if(t.count++,t.instance===null)switch(t.type){case`style`:var r=e.querySelector(`style[data-href~="`+Rt(n.href)+`"]`);if(r)return t.instance=r,yt(r),r;var a=h({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement(`style`),yt(r),Pd(r,`style`,a),Lf(r,n.precedence,e),t.instance=r;case`stylesheet`:a=Af(n.href);var o=e.querySelector(jf(a));if(o)return t.state.loading|=4,t.instance=o,yt(o),o;r=Mf(n),(a=mf.get(a))&&Rf(r,a),o=(e.ownerDocument||e).createElement(`link`),yt(o);var s=o;return s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),Pd(o,`link`,r),t.state.loading|=4,Lf(o,n.precedence,e),t.instance=o;case`script`:return o=Pf(n.src),(a=e.querySelector(Ff(o)))?(t.instance=a,yt(a),a):(r=n,(a=mf.get(o))&&(r=h({},n),zf(r,a)),e=e.ownerDocument||e,a=e.createElement(`script`),yt(a),Pd(a,`link`,r),e.head.appendChild(a),t.instance=a);case`void`:return null;default:throw Error(i(443,t.type))}else t.type===`stylesheet`&&!(t.state.loading&4)&&(r=t.instance,t.state.loading|=4,Lf(r,n.precedence,e));return t.instance}function Lf(e,t,n){for(var r=n.querySelectorAll(`link[rel="stylesheet"][data-precedence],style[data-precedence]`),i=r.length?r[r.length-1]:null,a=i,o=0;o<r.length;o++){var s=r[o];if(s.dataset.precedence===t)a=s;else if(a!==i)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function Rf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.title??=t.title}function zf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.integrity??=t.integrity}var Bf=null;function Vf(e,t,n){if(Bf===null){var r=new Map,i=Bf=new Map;i.set(n,r)}else i=Bf,r=i.get(n),r||(r=new Map,i.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),i=0;i<n.length;i++){var a=n[i];if(!(a[pt]||a[ot]||e===`link`&&a.getAttribute(`rel`)===`stylesheet`)&&a.namespaceURI!==`http://www.w3.org/2000/svg`){var o=a.getAttribute(t)||``;o=e+o;var s=r.get(o);s?s.push(a):r.set(o,[a])}}return r}function Hf(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t===`title`?e.querySelector(`head > title`):null)}function Uf(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case`meta`:case`title`:return!0;case`style`:if(typeof t.precedence!=`string`||typeof t.href!=`string`||t.href===``)break;return!0;case`link`:if(typeof t.rel!=`string`||typeof t.href!=`string`||t.href===``||t.onLoad||t.onError)break;switch(t.rel){case`stylesheet`:return e=t.disabled,typeof t.precedence==`string`&&e==null;default:return!0}case`script`:if(t.async&&typeof t.async!=`function`&&typeof t.async!=`symbol`&&!t.onLoad&&!t.onError&&t.src&&typeof t.src==`string`)return!0}return!1}function Wf(e){return!(e.type===`stylesheet`&&!(e.state.loading&3))}function Gf(e,t,n,r){if(n.type===`stylesheet`&&(typeof r.media!=`string`||!1!==matchMedia(r.media).matches)&&!(n.state.loading&4)){if(n.instance===null){var i=Af(r.href),a=t.querySelector(jf(i));if(a){t=a._p,typeof t==`object`&&t&&typeof t.then==`function`&&(e.count++,e=Jf.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,yt(a);return}a=t.ownerDocument||t,r=Mf(r),(i=mf.get(i))&&Rf(r,i),a=a.createElement(`link`),yt(a);var o=a;o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),Pd(a,`link`,r),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&!(n.state.loading&3)&&(e.count++,n=Jf.bind(e),t.addEventListener(`load`,n),t.addEventListener(`error`,n))}}var Kf=0;function qf(e,t){return e.stylesheets&&e.count===0&&Xf(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var r=setTimeout(function(){if(e.stylesheets&&Xf(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4+t);0<e.imgBytes&&Kf===0&&(Kf=62500*Ld());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Xf(e,e.stylesheets),e.unsuspend)){var t=e.unsuspend;e.unsuspend=null,t()}},(e.imgBytes>Kf?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(i)}}:null}function Jf(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Xf(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Yf=null;function Xf(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Yf=new Map,t.forEach(Zf,e),Yf=null,Jf.call(e))}function Zf(e,t){if(!(t.state.loading&4)){var n=Yf.get(e);if(n)var r=n.get(null);else{n=new Map,Yf.set(e,n);for(var i=e.querySelectorAll(`link[data-precedence],style[data-precedence]`),a=0;a<i.length;a++){var o=i[a];(o.nodeName===`LINK`||o.getAttribute(`media`)!==`not all`)&&(n.set(o.dataset.precedence,o),r=o)}r&&n.set(null,r)}i=t.instance,o=i.getAttribute(`data-precedence`),a=n.get(o)||r,a===r&&n.set(null,i),n.set(o,i),this.count++,r=Jf.bind(this),i.addEventListener(`load`,r),i.addEventListener(`error`,r),a?a.parentNode.insertBefore(i,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var Qf={$$typeof:C,Provider:null,Consumer:null,_currentValue:se,_currentValue2:se,_threadCount:0};function $f(e,t,n,r,i,a,o,s,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Ye(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ye(0),this.hiddenUpdates=Ye(null),this.identifierPrefix=r,this.onUncaughtError=i,this.onCaughtError=a,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.incompleteTransitions=new Map}function ep(e,t,n,r,i,a,o,s,c,l,u,d){return e=new $f(e,t,n,o,c,l,u,d,s),t=1,!0===a&&(t|=24),a=ai(3,null,null,t),e.current=a,a.stateNode=e,t=ia(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:r,isDehydrated:n,cache:t},La(a),e}function tp(e){return e?(e=V,e):V}function np(e,t,n,r,i,a){i=tp(i),r.context===null?r.context=i:r.pendingContext=i,r=za(t),r.payload={element:n},a=a===void 0?null:a,a!==null&&(r.callback=a),n=Ba(e,r,t),n!==null&&(hu(n,e,t),Va(n,e,t))}function rp(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function ip(e,t){rp(e,t),(e=e.alternate)&&rp(e,t)}function ap(e){if(e.tag===13||e.tag===31){var t=ti(e,67108864);t!==null&&hu(t,e,67108864),ip(e,67108864)}}function op(e){if(e.tag===13||e.tag===31){var t=pu();t=tt(t);var n=ti(e,t);n!==null&&hu(n,e,t),ip(e,t)}}var sp=!0;function cp(e,t,n,r){var i=k.T;k.T=null;var a=A.p;try{A.p=2,up(e,t,n,r)}finally{A.p=a,k.T=i}}function lp(e,t,n,r){var i=k.T;k.T=null;var a=A.p;try{A.p=8,up(e,t,n,r)}finally{A.p=a,k.T=i}}function up(e,t,n,r){if(sp){var i=dp(r);if(i===null)wd(e,t,r,fp,n),Cp(e,r);else if(Tp(i,e,t,n,r))r.stopPropagation();else if(Cp(e,r),t&4&&-1<Sp.indexOf(e)){for(;i!==null;){var a=gt(i);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var o=R(a.pendingLanes);if(o!==0){var s=a;for(s.pendingLanes|=2,s.entangledLanes|=2;o;){var c=1<<31-L(o);s.entanglements[1]|=c,o&=~c}rd(a),!(K&6)&&(tu=I()+500,id(0,!1))}}break;case 31:case 13:s=ti(a,2),s!==null&&hu(s,a,2),bu(),ip(a,2)}if(a=dp(r),a===null&&wd(e,t,r,fp,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else wd(e,t,r,null,n)}}function dp(e){return e=tn(e),pp(e)}var fp=null;function pp(e){if(fp=null,e=ht(e),e!==null){var t=o(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=s(t),e!==null)return e;e=null}else if(n===31){if(e=c(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return fp=e,null}function mp(e){switch(e){case`beforetoggle`:case`cancel`:case`click`:case`close`:case`contextmenu`:case`copy`:case`cut`:case`auxclick`:case`dblclick`:case`dragend`:case`dragstart`:case`drop`:case`focusin`:case`focusout`:case`input`:case`invalid`:case`keydown`:case`keypress`:case`keyup`:case`mousedown`:case`mouseup`:case`paste`:case`pause`:case`play`:case`pointercancel`:case`pointerdown`:case`pointerup`:case`ratechange`:case`reset`:case`resize`:case`seeked`:case`submit`:case`toggle`:case`touchcancel`:case`touchend`:case`touchstart`:case`volumechange`:case`change`:case`selectionchange`:case`textInput`:case`compositionstart`:case`compositionend`:case`compositionupdate`:case`beforeblur`:case`afterblur`:case`beforeinput`:case`blur`:case`fullscreenchange`:case`focus`:case`hashchange`:case`popstate`:case`select`:case`selectstart`:return 2;case`drag`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`mousemove`:case`mouseout`:case`mouseover`:case`pointermove`:case`pointerout`:case`pointerover`:case`scroll`:case`touchmove`:case`wheel`:case`mouseenter`:case`mouseleave`:case`pointerenter`:case`pointerleave`:return 8;case`message`:switch(Oe()){case ke:return 2;case Ae:return 8;case je:case Me:return 32;case Ne:return 268435456;default:return 32}default:return 32}}var hp=!1,gp=null,_p=null,vp=null,yp=new Map,bp=new Map,xp=[],Sp=`mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(` `);function Cp(e,t){switch(e){case`focusin`:case`focusout`:gp=null;break;case`dragenter`:case`dragleave`:_p=null;break;case`mouseover`:case`mouseout`:vp=null;break;case`pointerover`:case`pointerout`:yp.delete(t.pointerId);break;case`gotpointercapture`:case`lostpointercapture`:bp.delete(t.pointerId)}}function wp(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=gt(t),t!==null&&ap(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Tp(e,t,n,r,i){switch(t){case`focusin`:return gp=wp(gp,e,t,n,r,i),!0;case`dragenter`:return _p=wp(_p,e,t,n,r,i),!0;case`mouseover`:return vp=wp(vp,e,t,n,r,i),!0;case`pointerover`:var a=i.pointerId;return yp.set(a,wp(yp.get(a)||null,e,t,n,r,i)),!0;case`gotpointercapture`:return a=i.pointerId,bp.set(a,wp(bp.get(a)||null,e,t,n,r,i)),!0}return!1}function Ep(e){var t=ht(e.target);if(t!==null){var n=o(t);if(n!==null){if(t=n.tag,t===13){if(t=s(n),t!==null){e.blockedOn=t,it(e.priority,function(){op(n)});return}}else if(t===31){if(t=c(n),t!==null){e.blockedOn=t,it(e.priority,function(){op(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Dp(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=dp(e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);en=r,n.target.dispatchEvent(r),en=null}else return t=gt(n),t!==null&&ap(t),e.blockedOn=n,!1;t.shift()}return!0}function Op(e,t,n){Dp(e)&&n.delete(t)}function kp(){hp=!1,gp!==null&&Dp(gp)&&(gp=null),_p!==null&&Dp(_p)&&(_p=null),vp!==null&&Dp(vp)&&(vp=null),yp.forEach(Op),bp.forEach(Op)}function Ap(e,n){e.blockedOn===n&&(e.blockedOn=null,hp||(hp=!0,t.unstable_scheduleCallback(t.unstable_NormalPriority,kp)))}var jp=null;function Mp(e){jp!==e&&(jp=e,t.unstable_scheduleCallback(t.unstable_NormalPriority,function(){jp===e&&(jp=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],i=e[t+2];if(typeof r!=`function`){if(pp(r||n)===null)continue;break}var a=gt(n);a!==null&&(e.splice(t,3),t-=3,Ss(a,{pending:!0,data:i,method:n.method,action:r},r,i))}}))}function Np(e){function t(t){return Ap(t,e)}gp!==null&&Ap(gp,e),_p!==null&&Ap(_p,e),vp!==null&&Ap(vp,e),yp.forEach(t),bp.forEach(t);for(var n=0;n<xp.length;n++){var r=xp[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<xp.length&&(n=xp[0],n.blockedOn===null);)Ep(n),n.blockedOn===null&&xp.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(r=0;r<n.length;r+=3){var i=n[r],a=n[r+1],o=i[st]||null;if(typeof a==`function`)o||Mp(n);else if(o){var s=null;if(a&&a.hasAttribute(`formAction`)){if(i=a,o=a[st]||null)s=o.formAction;else if(pp(i)!==null)continue}else s=o.action;typeof s==`function`?n[r+1]=s:(n.splice(r,3),r-=3),Mp(n)}}}function Pp(){function e(e){e.canIntercept&&e.info===`react-transition`&&e.intercept({handler:function(){return new Promise(function(e){return i=e})},focusReset:`manual`,scroll:`manual`})}function t(){i!==null&&(i(),i=null),r||setTimeout(n,20)}function n(){if(!r&&!navigation.transition){var e=navigation.currentEntry;e&&e.url!=null&&navigation.navigate(e.url,{state:e.getState(),info:`react-transition`,history:`replace`})}}if(typeof navigation==`object`){var r=!1,i=null;return navigation.addEventListener(`navigate`,e),navigation.addEventListener(`navigatesuccess`,t),navigation.addEventListener(`navigateerror`,t),setTimeout(n,100),function(){r=!0,navigation.removeEventListener(`navigate`,e),navigation.removeEventListener(`navigatesuccess`,t),navigation.removeEventListener(`navigateerror`,t),i!==null&&(i(),i=null)}}}function Fp(e){this._internalRoot=e}Ip.prototype.render=Fp.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(i(409));var n=t.current;np(n,pu(),e,t,null,null)},Ip.prototype.unmount=Fp.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;np(e.current,2,null,e,null,null),bu(),t[ct]=null}};function Ip(e){this._internalRoot=e}Ip.prototype.unstable_scheduleHydration=function(e){if(e){var t=rt();e={blockedOn:null,target:e,priority:t};for(var n=0;n<xp.length&&t!==0&&t<xp[n].priority;n++);xp.splice(n,0,e),n===0&&Ep(e)}};var Lp=n.version;if(Lp!==`19.2.7`)throw Error(i(527,Lp,`19.2.7`));A.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render==`function`?Error(i(188)):(e=Object.keys(e).join(`,`),Error(i(268,e)));return e=d(t),e=e===null?null:p(e),e=e===null?null:e.stateNode,e};var Rp={bundleType:0,version:`19.2.7`,rendererPackageName:`react-dom`,currentDispatcherRef:k,reconcilerVersion:`19.2.7`};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`){var zp=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!zp.isDisabled&&zp.supportsFiber)try{Ie=zp.inject(Rp),Le=zp}catch{}}e.createRoot=function(e,t){if(!a(e))throw Error(i(299));var n=!1,r=``,o=Gs,s=Ks,c=qs;return t!=null&&(!0===t.unstable_strictMode&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onUncaughtError!==void 0&&(o=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(c=t.onRecoverableError)),t=ep(e,1,!1,null,null,n,r,null,o,s,c,Pp),e[ct]=t.current,Sd(e),new Fp(t)}})),g=o(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=h()})),_=c(u(),1),v=g(),y=`modulepreload`,b=function(e){return`/`+e},x={},S=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}r=o(t.map(t=>{if(t=b(t,n),t in x)return;x[t]=!0;let r=t.endsWith(`.css`),i=r?`[rel="stylesheet"]`:``;if(n)for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${t}"]${i}`))return;let o=document.createElement(`link`);if(o.rel=r?`stylesheet`:y,r||(o.as=`script`),o.crossOrigin=``,o.href=t,a&&o.setAttribute(`nonce`,a),document.head.appendChild(o),r)return new Promise((e,n)=>{o.addEventListener(`load`,e),o.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},C=`popstate`;function w(e){return typeof e==`object`&&!!e&&`pathname`in e&&`search`in e&&`hash`in e&&`state`in e&&`key`in e}function ee(e={}){function t(e,t){let n=t.state?.masked,{pathname:r,search:i,hash:a}=n||e.location;return ne(``,{pathname:r,search:i,hash:a},t.state&&t.state.usr||null,t.state&&t.state.key||`default`,n?{pathname:e.location.pathname,search:e.location.search,hash:e.location.hash}:void 0)}function n(e,t){return typeof t==`string`?t:re(t)}return ie(t,n,null,e)}function T(e,t){if(e===!1||e==null)throw Error(t)}function E(e,t){if(!e){typeof console<`u`&&console.warn(t);try{throw Error(t)}catch{}}}function D(){return Math.random().toString(36).substring(2,10)}function te(e,t){return{usr:e.state,key:e.key,idx:t,masked:e.mask?{pathname:e.pathname,search:e.search,hash:e.hash}:void 0}}function ne(e,t,n=null,r,i){return{pathname:typeof e==`string`?e:e.pathname,search:``,hash:``,...typeof t==`string`?O(t):t,state:n,key:t&&t.key||r||D(),mask:i}}function re({pathname:e=`/`,search:t=``,hash:n=``}){return t&&t!==`?`&&(e+=t.charAt(0)===`?`?t:`?`+t),n&&n!==`#`&&(e+=n.charAt(0)===`#`?n:`#`+n),e}function O(e){let t={};if(e){let n=e.indexOf(`#`);n>=0&&(t.hash=e.substring(n),e=e.substring(0,n));let r=e.indexOf(`?`);r>=0&&(t.search=e.substring(r),e=e.substring(0,r)),e&&(t.pathname=e)}return t}function ie(e,t,n,r={}){let{window:i=document.defaultView,v5Compat:a=!1}=r,o=i.history,s=`POP`,c=null,l=u();l??(l=0,o.replaceState({...o.state,idx:l},``));function u(){return(o.state||{idx:null}).idx}function d(){s=`POP`;let e=u(),t=e==null?null:e-l;l=e,c&&c({action:s,location:h.location,delta:t})}function f(e,t){s=`PUSH`;let r=w(e)?e:ne(h.location,e,t);n&&n(r,e),l=u()+1;let d=te(r,l),f=h.createHref(r.mask||r);try{o.pushState(d,``,f)}catch(e){if(e instanceof DOMException&&e.name===`DataCloneError`)throw e;i.location.assign(f)}a&&c&&c({action:s,location:h.location,delta:1})}function p(e,t){s=`REPLACE`;let r=w(e)?e:ne(h.location,e,t);n&&n(r,e),l=u();let i=te(r,l),d=h.createHref(r.mask||r);o.replaceState(i,``,d),a&&c&&c({action:s,location:h.location,delta:0})}function m(e){return ae(i,e)}let h={get action(){return s},get location(){return e(i,o)},listen(e){if(c)throw Error(`A history only accepts one active listener`);return i.addEventListener(C,d),c=e,()=>{i.removeEventListener(C,d),c=null}},createHref(e){return t(i,e)},createURL:m,encodeLocation(e){let t=m(e);return{pathname:t.pathname,search:t.search,hash:t.hash}},push:f,replace:p,go(e){return o.go(e)}};return h}function ae(e,t,n=!1){let r=`http://localhost`;e&&(r=e.location.origin===`null`?e.location.href:e.location.origin),T(r,`No window.location.(origin|href) available to create URL`);let i=typeof t==`string`?t:re(t);return i=i.replace(/ $/,`%20`),!n&&i.startsWith(`//`)&&(i=r+i),new URL(i,r)}function oe(e,t,n=`/`){return k(e,t,n,!1)}function k(e,t,n,r,i){let a=ye((typeof t==`string`?O(t):t).pathname||`/`,n);if(a==null)return null;let o=i??se(e),s=null,c=ve(a);for(let e=0;s==null&&e<o.length;++e)s=he(o[e],c,r);return s}function A(e,t){let{route:n,pathname:r,params:i}=e;return{id:n.id,pathname:r,params:i,data:t[n.id],loaderData:t[n.id],handle:n.handle}}function se(e){let t=ce(e);return le(t),t}function ce(e,t=[],n=[],r=``,i=!1){let a=(e,a,o=i,s)=>{let c={relativePath:s===void 0?e.path||``:s,caseSensitive:e.caseSensitive===!0,childrenIndex:a,route:e};if(c.relativePath.startsWith(`/`)){if(!c.relativePath.startsWith(r)&&o)return;T(c.relativePath.startsWith(r),`Absolute route path "${c.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),c.relativePath=c.relativePath.slice(r.length)}let l=I([r,c.relativePath]),u=n.concat(c);e.children&&e.children.length>0&&(T(e.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${l}".`),ce(e.children,t,u,l,o)),!(e.path==null&&!e.index)&&t.push({path:l,score:pe(l,e.index),routesMeta:u})};return e.forEach((e,t)=>{if(e.path===``||!e.path?.includes(`?`))a(e,t);else for(let n of j(e.path))a(e,t,!0,n)}),t}function j(e){let t=e.split(`/`);if(t.length===0)return[];let[n,...r]=t,i=n.endsWith(`?`),a=n.replace(/\?$/,``);if(r.length===0)return i?[a,``]:[a];let o=j(r.join(`/`)),s=[];return s.push(...o.map(e=>e===``?a:[a,e].join(`/`))),i&&s.push(...o),s.map(t=>e.startsWith(`/`)&&t===``?`/`:t)}function le(e){e.sort((e,t)=>e.score===t.score?me(e.routesMeta.map(e=>e.childrenIndex),t.routesMeta.map(e=>e.childrenIndex)):t.score-e.score)}var M=/^:[\w-]+$/,N=3,ue=2,de=1,P=10,fe=-2,F=e=>e===`*`;function pe(e,t){let n=e.split(`/`),r=n.length;return n.some(F)&&(r+=fe),t&&(r+=ue),n.filter(e=>!F(e)).reduce((e,t)=>e+(M.test(t)?N:t===``?de:P),r)}function me(e,t){return e.length===t.length&&e.slice(0,-1).every((e,n)=>e===t[n])?e[e.length-1]-t[t.length-1]:0}function he(e,t,n=!1){let{routesMeta:r}=e,i={},a=`/`,o=[];for(let e=0;e<r.length;++e){let s=r[e],c=e===r.length-1,l=a===`/`?t:t.slice(a.length)||`/`,u=ge({path:s.relativePath,caseSensitive:s.caseSensitive,end:c},l),d=s.route;if(!u&&c&&n&&!r[r.length-1].route.index&&(u=ge({path:s.relativePath,caseSensitive:s.caseSensitive,end:!1},l)),!u)return null;Object.assign(i,u.params),o.push({params:i,pathname:I([a,u.pathname]),pathnameBase:ke(I([a,u.pathnameBase])),route:d}),u.pathnameBase!==`/`&&(a=I([a,u.pathnameBase]))}return o}function ge(e,t){typeof e==`string`&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=_e(e.path,e.caseSensitive,e.end),i=t.match(n);if(!i)return null;let a=i[0],o=a.replace(/(.)\/+$/,`$1`),s=i.slice(1);return{params:r.reduce((e,{paramName:t,isOptional:n},r)=>{if(t===`*`){let e=s[r]||``;o=a.slice(0,a.length-e.length).replace(/(.)\/+$/,`$1`)}let i=s[r];return n&&!i?e[t]=void 0:e[t]=(i||``).replace(/%2F/g,`/`),e},{}),pathname:a,pathnameBase:o,pattern:e}}function _e(e,t=!1,n=!0){E(e===`*`||!e.endsWith(`*`)||e.endsWith(`/*`),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,`/*`)}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,`/*`)}".`);let r=[],i=`^`+e.replace(/\/*\*?$/,``).replace(/^\/*/,`/`).replace(/[\\.*+^${}|()[\]]/g,`\\$&`).replace(/\/:([\w-]+)(\?)?/g,(e,t,n,i,a)=>{if(r.push({paramName:t,isOptional:n!=null}),n){let t=a.charAt(i+e.length);return t&&t!==`/`?`/([^\\/]*)`:`(?:/([^\\/]*))?`}return`/([^\\/]+)`}).replace(/\/([\w-]+)\?(\/|$)/g,`(/$1)?$2`);return e.endsWith(`*`)?(r.push({paramName:`*`}),i+=e===`*`||e===`/*`?`(.*)$`:`(?:\\/(.+)|\\/*)$`):n?i+=`\\/*$`:e!==``&&e!==`/`&&(i+=`(?:(?=\\/|$))`),[new RegExp(i,t?void 0:`i`),r]}function ve(e){try{return e.split(`/`).map(e=>decodeURIComponent(e).replace(/\//g,`%2F`)).join(`/`)}catch(t){return E(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function ye(e,t){if(t===`/`)return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith(`/`)?t.length-1:t.length,r=e.charAt(n);return r&&r!==`/`?null:e.slice(n)||`/`}var be=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;function xe(e,t=`/`){let{pathname:n,search:r=``,hash:i=``}=typeof e==`string`?O(e):e,a;return n?(n=De(n),a=n.startsWith(`/`)?Se(n.substring(1),`/`):Se(n,t)):a=t,{pathname:a,search:Ae(r),hash:je(i)}}function Se(e,t){let n=Oe(t).split(`/`);return e.split(`/`).forEach(e=>{e===`..`?n.length>1&&n.pop():e!==`.`&&n.push(e)}),n.length>1?n.join(`/`):`/`}function Ce(e,t,n,r){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function we(e){return e.filter((e,t)=>t===0||e.route.path&&e.route.path.length>0)}function Te(e){let t=we(e);return t.map((e,n)=>n===t.length-1?e.pathname:e.pathnameBase)}function Ee(e,t,n,r=!1){let i;typeof e==`string`?i=O(e):(i={...e},T(!i.pathname||!i.pathname.includes(`?`),Ce(`?`,`pathname`,`search`,i)),T(!i.pathname||!i.pathname.includes(`#`),Ce(`#`,`pathname`,`hash`,i)),T(!i.search||!i.search.includes(`#`),Ce(`#`,`search`,`hash`,i)));let a=e===``||i.pathname===``,o=a?`/`:i.pathname,s;if(o==null)s=n;else{let e=t.length-1;if(!r&&o.startsWith(`..`)){let t=o.split(`/`);for(;t[0]===`..`;)t.shift(),--e;i.pathname=t.join(`/`)}s=e>=0?t[e]:`/`}let c=xe(i,s),l=o&&o!==`/`&&o.endsWith(`/`),u=(a||o===`.`)&&n.endsWith(`/`);return!c.pathname.endsWith(`/`)&&(l||u)&&(c.pathname+=`/`),c}var De=e=>e.replace(/\/\/+/g,`/`),I=e=>De(e.join(`/`)),Oe=e=>e.replace(/\/+$/,``),ke=e=>Oe(e).replace(/^\/*/,`/`),Ae=e=>!e||e===`?`?``:e.startsWith(`?`)?e:`?`+e,je=e=>!e||e===`#`?``:e.startsWith(`#`)?e:`#`+e,Me=class{constructor(e,t,n,r=!1){this.status=e,this.statusText=t||``,this.internal=r,n instanceof Error?(this.data=n.toString(),this.error=n):this.data=n}};function Ne(e){return e!=null&&typeof e.status==`number`&&typeof e.statusText==`string`&&typeof e.internal==`boolean`&&`data`in e}function Pe(e){return I(e.map(e=>e.route.path).filter(Boolean))||`/`}var Fe=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0;function Ie(e,t){let n=e;if(typeof n!=`string`||!be.test(n))return{absoluteURL:void 0,isExternal:!1,to:n};let r=n,i=!1;if(Fe)try{let e=new URL(window.location.href),r=n.startsWith(`//`)?new URL(e.protocol+n):new URL(n),a=ye(r.pathname,t);r.origin===e.origin&&a!=null?n=a+r.search+r.hash:i=!0}catch{E(!1,`<Link to="${n}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:r,isExternal:i,to:n}}Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);var Le=[`POST`,`PUT`,`PATCH`,`DELETE`];new Set(Le);var Re=[`GET`,...Le];new Set(Re);var L=_.createContext(null);L.displayName=`DataRouter`;var ze=_.createContext(null);ze.displayName=`DataRouterState`;var Be=_.createContext(!1);function Ve(){return _.useContext(Be)}var He=_.createContext({isTransitioning:!1});He.displayName=`ViewTransition`;var Ue=_.createContext(new Map);Ue.displayName=`Fetchers`;var We=_.createContext(null);We.displayName=`Await`;var R=_.createContext(null);R.displayName=`Navigation`;var Ge=_.createContext(null);Ge.displayName=`Location`;var Ke=_.createContext({outlet:null,matches:[],isDataRoute:!1});Ke.displayName=`Route`;var qe=_.createContext(null);qe.displayName=`RouteError`;var Je=`REACT_ROUTER_ERROR`,Ye=`REDIRECT`,Xe=`ROUTE_ERROR_RESPONSE`;function Ze(e){if(e.startsWith(`${Je}:${Ye}:{`))try{let t=JSON.parse(e.slice(28));if(typeof t==`object`&&t&&typeof t.status==`number`&&typeof t.statusText==`string`&&typeof t.location==`string`&&typeof t.reloadDocument==`boolean`&&typeof t.replace==`boolean`)return t}catch{}}function Qe(e){if(e.startsWith(`${Je}:${Xe}:{`))try{let t=JSON.parse(e.slice(40));if(typeof t==`object`&&t&&typeof t.status==`number`&&typeof t.statusText==`string`)return new Me(t.status,t.statusText,t.data)}catch{}}function $e(e,{relative:t}={}){T(et(),`useHref() may be used only in the context of a <Router> component.`);let{basename:n,navigator:r}=_.useContext(R),{hash:i,pathname:a,search:o}=ot(e,{relative:t}),s=a;return n!==`/`&&(s=a===`/`?n:I([n,a])),r.createHref({pathname:s,search:o,hash:i})}function et(){return _.useContext(Ge)!=null}function tt(){return T(et(),`useLocation() may be used only in the context of a <Router> component.`),_.useContext(Ge).location}var nt=`You should call navigate() in a React.useEffect(), not when your component is first rendered.`;function rt(e){_.useContext(R).static||_.useLayoutEffect(e)}function it(){let{isDataRoute:e}=_.useContext(Ke);return e?Tt():at()}function at(){T(et(),`useNavigate() may be used only in the context of a <Router> component.`);let e=_.useContext(L),{basename:t,navigator:n}=_.useContext(R),{matches:r}=_.useContext(Ke),{pathname:i}=tt(),a=JSON.stringify(Te(r)),o=_.useRef(!1);return rt(()=>{o.current=!0}),_.useCallback((r,s={})=>{if(E(o.current,nt),!o.current)return;if(typeof r==`number`){n.go(r);return}let c=Ee(r,JSON.parse(a),i,s.relative===`path`);e==null&&t!==`/`&&(c.pathname=c.pathname===`/`?t:I([t,c.pathname])),(s.replace?n.replace:n.push)(c,s.state,s)},[t,n,a,i,e])}_.createContext(null);function ot(e,{relative:t}={}){let{matches:n}=_.useContext(Ke),{pathname:r}=tt(),i=JSON.stringify(Te(n));return _.useMemo(()=>Ee(e,JSON.parse(i),r,t===`path`),[e,i,r,t])}function st(e,t){return ct(e,t)}function ct(e,t,n){T(et(),`useRoutes() may be used only in the context of a <Router> component.`);let{navigator:r}=_.useContext(R),{matches:i}=_.useContext(Ke),a=i[i.length-1],o=a?a.params:{},s=a?a.pathname:`/`,c=a?a.pathnameBase:`/`,l=a&&a.route;{let e=l&&l.path||``;Dt(s,!l||e.endsWith(`*`)||e.endsWith(`*?`),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${s}" (under <Route path="${e}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${e}"> to <Route path="${e===`/`?`*`:`${e}/*`}">.`)}let u=tt(),d;if(t){let e=typeof t==`string`?O(t):t;T(c===`/`||e.pathname?.startsWith(c),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${c}" but pathname "${e.pathname}" was given in the \`location\` prop.`),d=e}else d=u;let f=d.pathname||`/`,p=f;if(c!==`/`){let e=c.replace(/^\//,``).split(`/`);p=`/`+f.replace(/^\//,``).split(`/`).slice(e.length).join(`/`)}let m=n&&n.state.matches.length?n.state.matches.map(e=>Object.assign(e,{route:n.manifest[e.route.id]||e.route})):oe(e,{pathname:p});E(l||m!=null,`No routes matched location "${d.pathname}${d.search}${d.hash}" `),E(m==null||m[m.length-1].route.element!==void 0||m[m.length-1].route.Component!==void 0||m[m.length-1].route.lazy!==void 0,`Matched leaf route at location "${d.pathname}${d.search}${d.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let h=ht(m&&m.map(e=>Object.assign({},e,{params:Object.assign({},o,e.params),pathname:I([c,r.encodeLocation?r.encodeLocation(e.pathname.replace(/%/g,`%25`).replace(/\?/g,`%3F`).replace(/#/g,`%23`)).pathname:e.pathname]),pathnameBase:e.pathnameBase===`/`?c:I([c,r.encodeLocation?r.encodeLocation(e.pathnameBase.replace(/%/g,`%25`).replace(/\?/g,`%3F`).replace(/#/g,`%23`)).pathname:e.pathnameBase])})),i,n);return t&&h?_.createElement(Ge.Provider,{value:{location:{pathname:`/`,search:``,hash:``,state:null,key:`default`,mask:void 0,...d},navigationType:`POP`}},h):h}function lt(){let e=wt(),t=Ne(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,r=`rgba(200,200,200, 0.5)`,i={padding:`0.5rem`,backgroundColor:r},a={padding:`2px 4px`,backgroundColor:r},o=null;return console.error(`Error handled by React Router default ErrorBoundary:`,e),o=_.createElement(_.Fragment,null,_.createElement(`p`,null,`💿 Hey developer 👋`),_.createElement(`p`,null,`You can provide a way better UX than this when your app throws errors by providing your own `,_.createElement(`code`,{style:a},`ErrorBoundary`),` or`,` `,_.createElement(`code`,{style:a},`errorElement`),` prop on your route.`)),_.createElement(_.Fragment,null,_.createElement(`h2`,null,`Unexpected Application Error!`),_.createElement(`h3`,{style:{fontStyle:`italic`}},t),n?_.createElement(`pre`,{style:i},n):null,o)}var ut=_.createElement(lt,null),dt=class extends _.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!==`idle`&&e.revalidation===`idle`?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error===void 0?t.error:e.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){this.props.onError?this.props.onError(e,t):console.error(`React Router caught the following error during render`,e)}render(){let e=this.state.error;if(this.context&&typeof e==`object`&&e&&`digest`in e&&typeof e.digest==`string`){let t=Qe(e.digest);t&&(e=t)}let t=e===void 0?this.props.children:_.createElement(Ke.Provider,{value:this.props.routeContext},_.createElement(qe.Provider,{value:e,children:this.props.component}));return this.context?_.createElement(pt,{error:e},t):t}};dt.contextType=Be;var ft=new WeakMap;function pt({children:e,error:t}){let{basename:n}=_.useContext(R);if(typeof t==`object`&&t&&`digest`in t&&typeof t.digest==`string`){let e=Ze(t.digest);if(e){let r=ft.get(t);if(r)throw r;let i=Ie(e.location,n);if(Fe&&!ft.get(t))if(i.isExternal||e.reloadDocument)window.location.href=i.absoluteURL||i.to;else{let n=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(i.to,{replace:e.replace}));throw ft.set(t,n),n}return _.createElement(`meta`,{httpEquiv:`refresh`,content:`0;url=${i.absoluteURL||i.to}`})}}return e}function mt({routeContext:e,match:t,children:n}){let r=_.useContext(L);return r&&r.static&&r.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(r.staticContext._deepestRenderedBoundaryId=t.route.id),_.createElement(Ke.Provider,{value:e},n)}function ht(e,t=[],n){let r=n?.state;if(e==null){if(!r)return null;if(r.errors)e=r.matches;else if(t.length===0&&!r.initialized&&r.matches.length>0)e=r.matches;else return null}let i=e,a=r?.errors;if(a!=null){let e=i.findIndex(e=>e.route.id&&a?.[e.route.id]!==void 0);T(e>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(a).join(`,`)}`),i=i.slice(0,Math.min(i.length,e+1))}let o=!1,s=-1;if(n&&r){o=r.renderFallback;for(let e=0;e<i.length;e++){let t=i[e];if((t.route.HydrateFallback||t.route.hydrateFallbackElement)&&(s=e),t.route.id){let{loaderData:e,errors:a}=r,c=t.route.loader&&!e.hasOwnProperty(t.route.id)&&(!a||a[t.route.id]===void 0);if(t.route.lazy||c){n.isStatic&&(o=!0),i=s>=0?i.slice(0,s+1):[i[0]];break}}}}let c=n?.onError,l=r&&c?(e,t)=>{c(e,{location:r.location,params:r.matches?.[0]?.params??{},pattern:Pe(r.matches),errorInfo:t})}:void 0;return i.reduceRight((e,n,c)=>{let u,d=!1,f=null,p=null;r&&(u=a&&n.route.id?a[n.route.id]:void 0,f=n.route.errorElement||ut,o&&(s<0&&c===0?(Dt(`route-fallback`,!1,"No `HydrateFallback` element provided to render during initial hydration"),d=!0,p=null):s===c&&(d=!0,p=n.route.hydrateFallbackElement||null)));let m=t.concat(i.slice(0,c+1)),h=()=>{let t;return t=u?f:d?p:n.route.Component?_.createElement(n.route.Component,null):n.route.element?n.route.element:e,_.createElement(mt,{match:n,routeContext:{outlet:e,matches:m,isDataRoute:r!=null},children:t})};return r&&(n.route.ErrorBoundary||n.route.errorElement||c===0)?_.createElement(dt,{location:r.location,revalidation:r.revalidation,component:f,error:u,children:h(),routeContext:{outlet:null,matches:m,isDataRoute:!0},onError:l}):h()},null)}function gt(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function _t(e){let t=_.useContext(L);return T(t,gt(e)),t}function vt(e){let t=_.useContext(ze);return T(t,gt(e)),t}function yt(e){let t=_.useContext(Ke);return T(t,gt(e)),t}function bt(e){let t=yt(e),n=t.matches[t.matches.length-1];return T(n.route.id,`${e} can only be used on routes that contain a unique "id"`),n.route.id}function xt(){return bt(`useRouteId`)}function St(){let e=vt(`useNavigation`);return _.useMemo(()=>{let{matches:t,historyAction:n,...r}=e.navigation;return r},[e.navigation])}function Ct(){let{matches:e,loaderData:t}=vt(`useMatches`);return _.useMemo(()=>e.map(e=>A(e,t)),[e,t])}function wt(){let e=_.useContext(qe),t=vt(`useRouteError`),n=bt(`useRouteError`);return e===void 0?t.errors?.[n]:e}function Tt(){let{router:e}=_t(`useNavigate`),t=bt(`useNavigate`),n=_.useRef(!1);return rt(()=>{n.current=!0}),_.useCallback(async(r,i={})=>{E(n.current,nt),n.current&&(typeof r==`number`?await e.navigate(r):await e.navigate(r,{fromRouteId:t,...i}))},[e,t])}var Et={};function Dt(e,t,n){!t&&!Et[e]&&(Et[e]=!0,E(!1,n))}_.memo(Ot);function Ot({routes:e,manifest:t,future:n,state:r,isStatic:i,onError:a}){return ct(e,void 0,{manifest:t,state:r,isStatic:i,onError:a,future:n})}function kt(e){T(!1,`A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.`)}function At({basename:e=`/`,children:t=null,location:n,navigationType:r=`POP`,navigator:i,static:a=!1,useTransitions:o}){T(!et(),`You cannot render a <Router> inside another <Router>. You should never have more than one in your app.`);let s=e.replace(/^\/*/,`/`),c=_.useMemo(()=>({basename:s,navigator:i,static:a,useTransitions:o,future:{}}),[s,i,a,o]);typeof n==`string`&&(n=O(n));let{pathname:l=`/`,search:u=``,hash:d=``,state:f=null,key:p=`default`,mask:m}=n,h=_.useMemo(()=>{let e=ye(l,s);return e==null?null:{location:{pathname:e,search:u,hash:d,state:f,key:p,mask:m},navigationType:r}},[s,l,u,d,f,p,r,m]);return E(h!=null,`<Router basename="${s}"> is not able to match the URL "${l}${u}${d}" because it does not start with the basename, so the <Router> won't render anything.`),h==null?null:_.createElement(R.Provider,{value:c},_.createElement(Ge.Provider,{children:t,value:h}))}function jt({children:e,location:t}){return st(Mt(e),t)}_.Component;function Mt(e,t=[]){let n=[];return _.Children.forEach(e,(e,r)=>{if(!_.isValidElement(e))return;let i=[...t,r];if(e.type===_.Fragment){n.push.apply(n,Mt(e.props.children,i));return}T(e.type===kt,`[${typeof e.type==`string`?e.type:e.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),T(!e.props.index||!e.props.children,`An index route cannot have child routes.`);let a={id:e.props.id||i.join(`-`),caseSensitive:e.props.caseSensitive,element:e.props.element,Component:e.props.Component,index:e.props.index,path:e.props.path,middleware:e.props.middleware,loader:e.props.loader,action:e.props.action,hydrateFallbackElement:e.props.hydrateFallbackElement,HydrateFallback:e.props.HydrateFallback,errorElement:e.props.errorElement,ErrorBoundary:e.props.ErrorBoundary,hasErrorBoundary:e.props.hasErrorBoundary===!0||e.props.ErrorBoundary!=null||e.props.errorElement!=null,shouldRevalidate:e.props.shouldRevalidate,handle:e.props.handle,lazy:e.props.lazy};e.props.children&&(a.children=Mt(e.props.children,i)),n.push(a)}),n}var Nt=`get`,Pt=`application/x-www-form-urlencoded`;function Ft(e){return typeof HTMLElement<`u`&&e instanceof HTMLElement}function It(e){return Ft(e)&&e.tagName.toLowerCase()===`button`}function Lt(e){return Ft(e)&&e.tagName.toLowerCase()===`form`}function Rt(e){return Ft(e)&&e.tagName.toLowerCase()===`input`}function zt(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function Bt(e,t){return e.button===0&&(!t||t===`_self`)&&!zt(e)}var Vt=null;function Ht(){if(Vt===null)try{new FormData(document.createElement(`form`),0),Vt=!1}catch{Vt=!0}return Vt}var Ut=new Set([`application/x-www-form-urlencoded`,`multipart/form-data`,`text/plain`]);function Wt(e){return e!=null&&!Ut.has(e)?(E(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Pt}"`),null):e}function Gt(e,t){let n,r,i,a,o;if(Lt(e)){let o=e.getAttribute(`action`);r=o?ye(o,t):null,n=e.getAttribute(`method`)||Nt,i=Wt(e.getAttribute(`enctype`))||Pt,a=new FormData(e)}else if(It(e)||Rt(e)&&(e.type===`submit`||e.type===`image`)){let o=e.form;if(o==null)throw Error(`Cannot submit a <button> or <input type="submit"> without a <form>`);let s=e.getAttribute(`formaction`)||o.getAttribute(`action`);if(r=s?ye(s,t):null,n=e.getAttribute(`formmethod`)||o.getAttribute(`method`)||Nt,i=Wt(e.getAttribute(`formenctype`))||Wt(o.getAttribute(`enctype`))||Pt,a=new FormData(o,e),!Ht()){let{name:t,type:n,value:r}=e;if(n===`image`){let e=t?`${t}.`:``;a.append(`${e}x`,`0`),a.append(`${e}y`,`0`)}else t&&a.append(t,r)}}else if(Ft(e))throw Error(`Cannot submit element that is not <form>, <button>, or <input type="submit|image">`);else n=Nt,r=null,i=Pt,o=e;return a&&i===`text/plain`&&(o=a,a=void 0),{action:r,method:n.toLowerCase(),encType:i,formData:a,body:o}}Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);var Kt={"&":`\\u0026`,">":`\\u003e`,"<":`\\u003c`,"\u2028":`\\u2028`,"\u2029":`\\u2029`},qt=/[&><\u2028\u2029]/g;function Jt(e){return e.replace(qt,e=>Kt[e])}function Yt(e,t){if(e===!1||e==null)throw Error(t)}function Xt(e,t,n,r){let i=typeof e==`string`?new URL(e,typeof window>`u`?`server://singlefetch/`:window.location.origin):e;return n?i.pathname.endsWith(`/`)?i.pathname=`${i.pathname}_.${r}`:i.pathname=`${i.pathname}.${r}`:i.pathname===`/`?i.pathname=`_root.${r}`:t&&ye(i.pathname,t)===`/`?i.pathname=`${Oe(t)}/_root.${r}`:i.pathname=`${Oe(i.pathname)}.${r}`,i}async function Zt(e,t){if(e.id in t)return t[e.id];try{let n=await S(()=>import(e.module),[]);return t[e.id]=n,n}catch(t){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(t),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function Qt(e){return e!=null&&typeof e.page==`string`}function $t(e){return e==null?!1:e.href==null?e.rel===`preload`&&typeof e.imageSrcSet==`string`&&typeof e.imageSizes==`string`:typeof e.rel==`string`&&typeof e.href==`string`}async function en(e,t,n){return on((await Promise.all(e.map(async e=>{let r=t.routes[e.route.id];if(r){let e=await Zt(r,n);return e.links?e.links():[]}return[]}))).flat(1).filter($t).filter(e=>e.rel===`stylesheet`||e.rel===`preload`).map(e=>e.rel===`stylesheet`?{...e,rel:`prefetch`,as:`style`}:{...e,rel:`prefetch`}))}function tn(e,t,n,r,i,a){let o=(e,t)=>n[t]?e.route.id!==n[t].route.id:!0,s=(e,t)=>n[t].pathname!==e.pathname||n[t].route.path?.endsWith(`*`)&&n[t].params[`*`]!==e.params[`*`];return a===`assets`?t.filter((e,t)=>o(e,t)||s(e,t)):a===`data`?t.filter((t,a)=>{let c=r.routes[t.route.id];if(!c||!c.hasLoader)return!1;if(o(t,a)||s(t,a))return!0;if(t.route.shouldRevalidate){let r=t.route.shouldRevalidate({currentUrl:new URL(i.pathname+i.search+i.hash,window.origin),currentParams:n[0]?.params||{},nextUrl:new URL(e,window.origin),nextParams:t.params,defaultShouldRevalidate:!0});if(typeof r==`boolean`)return r}return!0}):[]}function nn(e,t,{includeHydrateFallback:n}={}){return rn(e.map(e=>{let r=t.routes[e.route.id];if(!r)return[];let i=[r.module];return r.clientActionModule&&(i=i.concat(r.clientActionModule)),r.clientLoaderModule&&(i=i.concat(r.clientLoaderModule)),n&&r.hydrateFallbackModule&&(i=i.concat(r.hydrateFallbackModule)),r.imports&&(i=i.concat(r.imports)),i}).flat(1))}function rn(e){return[...new Set(e)]}function an(e){let t={},n=Object.keys(e).sort();for(let r of n)t[r]=e[r];return t}function on(e,t){let n=new Set,r=new Set(t);return e.reduce((e,i)=>{if(t&&!Qt(i)&&i.as===`script`&&i.href&&r.has(i.href))return e;let a=JSON.stringify(an(i));return n.has(a)||(n.add(a),e.push({key:a,link:i})),e},[])}function sn(){let e=_.useContext(L);return Yt(e,`You must render this element inside a <DataRouterContext.Provider> element`),e}function cn(){let e=_.useContext(ze);return Yt(e,`You must render this element inside a <DataRouterStateContext.Provider> element`),e}var ln=_.createContext(void 0);ln.displayName=`FrameworkContext`;function un(){let e=_.useContext(ln);return Yt(e,`You must render this element inside a <HydratedRouter> element`),e}function dn(e,t){let n=_.useContext(ln),[r,i]=_.useState(!1),[a,o]=_.useState(!1),{onFocus:s,onBlur:c,onMouseEnter:l,onMouseLeave:u,onTouchStart:d}=t,f=_.useRef(null);_.useEffect(()=>{if(e===`render`&&o(!0),e===`viewport`){let e=new IntersectionObserver(e=>{e.forEach(e=>{o(e.isIntersecting)})},{threshold:.5});return f.current&&e.observe(f.current),()=>{e.disconnect()}}},[e]),_.useEffect(()=>{if(r){let e=setTimeout(()=>{o(!0)},100);return()=>{clearTimeout(e)}}},[r]);let p=()=>{i(!0)},m=()=>{i(!1),o(!1)};return n?e===`intent`?[a,f,{onFocus:fn(s,p),onBlur:fn(c,m),onMouseEnter:fn(l,p),onMouseLeave:fn(u,m),onTouchStart:fn(d,p)}]:[a,f,{}]:[!1,f,{}]}function fn(e,t){return n=>{e&&e(n),n.defaultPrevented||t(n)}}function pn({page:e,...t}){let n=Ve(),{router:r}=sn(),i=_.useMemo(()=>oe(r.routes,e,r.basename),[r.routes,e,r.basename]);return i?n?_.createElement(hn,{page:e,matches:i,...t}):_.createElement(gn,{page:e,matches:i,...t}):null}function mn(e){let{manifest:t,routeModules:n}=un(),[r,i]=_.useState([]);return _.useEffect(()=>{let r=!1;return en(e,t,n).then(e=>{r||i(e)}),()=>{r=!0}},[e,t,n]),r}function hn({page:e,matches:t,...n}){let r=tt(),{future:i}=un(),{basename:a}=sn(),o=_.useMemo(()=>{if(e===r.pathname+r.search+r.hash)return[];let n=Xt(e,a,i.v8_trailingSlashAwareDataRequests,`rsc`),o=!1,s=[];for(let e of t)typeof e.route.shouldRevalidate==`function`?o=!0:s.push(e.route.id);return o&&s.length>0&&n.searchParams.set(`_routes`,s.join(`,`)),[n.pathname+n.search]},[a,i.v8_trailingSlashAwareDataRequests,e,r,t]);return _.createElement(_.Fragment,null,o.map(e=>_.createElement(`link`,{key:e,rel:`prefetch`,as:`fetch`,href:e,...n})))}function gn({page:e,matches:t,...n}){let r=tt(),{future:i,manifest:a,routeModules:o}=un(),{basename:s}=sn(),{loaderData:c,matches:l}=cn(),u=_.useMemo(()=>tn(e,t,l,a,r,`data`),[e,t,l,a,r]),d=_.useMemo(()=>tn(e,t,l,a,r,`assets`),[e,t,l,a,r]),f=_.useMemo(()=>{if(e===r.pathname+r.search+r.hash)return[];let n=new Set,l=!1;if(t.forEach(e=>{let t=a.routes[e.route.id];!t||!t.hasLoader||(!u.some(t=>t.route.id===e.route.id)&&e.route.id in c&&o[e.route.id]?.shouldRevalidate||t.hasClientLoader?l=!0:n.add(e.route.id))}),n.size===0)return[];let d=Xt(e,s,i.v8_trailingSlashAwareDataRequests,`data`);return l&&n.size>0&&d.searchParams.set(`_routes`,t.filter(e=>n.has(e.route.id)).map(e=>e.route.id).join(`,`)),[d.pathname+d.search]},[s,i.v8_trailingSlashAwareDataRequests,c,r,a,u,t,e,o]),p=_.useMemo(()=>nn(d,a),[d,a]),m=mn(d);return _.createElement(_.Fragment,null,f.map(e=>_.createElement(`link`,{key:e,rel:`prefetch`,as:`fetch`,href:e,...n})),p.map(e=>_.createElement(`link`,{key:e,rel:`modulepreload`,href:e,...n})),m.map(({key:e,link:t})=>_.createElement(`link`,{key:e,nonce:n.nonce,...t,crossOrigin:t.crossOrigin??n.crossOrigin})))}function _n(...e){return t=>{e.forEach(e=>{typeof e==`function`?e(t):e!=null&&(e.current=t)})}}_.Component;var vn=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0;try{vn&&(window.__reactRouterVersion=`7.17.0`)}catch{}function yn({basename:e,children:t,useTransitions:n,window:r}){let i=_.useRef();i.current??=ee({window:r,v5Compat:!0});let a=i.current,[o,s]=_.useState({action:a.action,location:a.location}),c=_.useCallback(e=>{n===!1?s(e):_.startTransition(()=>s(e))},[n]);return _.useLayoutEffect(()=>a.listen(c),[a,c]),_.createElement(At,{basename:e,children:t,location:o.location,navigationType:o.action,navigator:a,useTransitions:n})}function bn({basename:e,children:t,history:n,useTransitions:r}){let[i,a]=_.useState({action:n.action,location:n.location}),o=_.useCallback(e=>{r===!1?a(e):_.startTransition(()=>a(e))},[r]);return _.useLayoutEffect(()=>n.listen(o),[n,o]),_.createElement(At,{basename:e,children:t,location:i.location,navigationType:i.action,navigator:n,useTransitions:r})}bn.displayName=`unstable_HistoryRouter`;var xn=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Sn=_.forwardRef(function({onClick:e,discover:t=`render`,prefetch:n=`none`,relative:r,reloadDocument:i,replace:a,mask:o,state:s,target:c,to:l,preventScrollReset:u,viewTransition:d,defaultShouldRevalidate:f,...p},m){let{basename:h,navigator:g,useTransitions:v}=_.useContext(R),y=typeof l==`string`&&xn.test(l),b=Ie(l,h);l=b.to;let x=$e(l,{relative:r}),S=tt(),C=null;if(o){let e=Ee(o,[],S.mask?S.mask.pathname:`/`,!0);h!==`/`&&(e.pathname=e.pathname===`/`?h:I([h,e.pathname])),C=g.createHref(e)}let[w,ee,T]=dn(n,p),E=kn(l,{replace:a,mask:o,state:s,target:c,preventScrollReset:u,relative:r,viewTransition:d,defaultShouldRevalidate:f,useTransitions:v});function D(t){e&&e(t),t.defaultPrevented||E(t)}let te=!(b.isExternal||i),ne=_.createElement(`a`,{...p,...T,href:(te?C:void 0)||b.absoluteURL||x,onClick:te?D:e,ref:_n(m,ee),target:c,"data-discover":!y&&t===`render`?`true`:void 0});return w&&!y?_.createElement(_.Fragment,null,ne,_.createElement(pn,{page:x})):ne});Sn.displayName=`Link`;var Cn=_.forwardRef(function({"aria-current":e=`page`,caseSensitive:t=!1,className:n=``,end:r=!1,style:i,to:a,viewTransition:o,children:s,...c},l){let u=ot(a,{relative:c.relative}),d=tt(),f=_.useContext(ze),{navigator:p,basename:m}=_.useContext(R),h=f!=null&&zn(u)&&o===!0,g=p.encodeLocation?p.encodeLocation(u).pathname:u.pathname,v=d.pathname,y=f&&f.navigation&&f.navigation.location?f.navigation.location.pathname:null;t||(v=v.toLowerCase(),y=y?y.toLowerCase():null,g=g.toLowerCase()),y&&m&&(y=ye(y,m)||y);let b=g!==`/`&&g.endsWith(`/`)?g.length-1:g.length,x=v===g||!r&&v.startsWith(g)&&v.charAt(b)===`/`,S=y!=null&&(y===g||!r&&y.startsWith(g)&&y.charAt(g.length)===`/`),C={isActive:x,isPending:S,isTransitioning:h},w=x?e:void 0,ee;ee=typeof n==`function`?n(C):[n,x?`active`:null,S?`pending`:null,h?`transitioning`:null].filter(Boolean).join(` `);let T=typeof i==`function`?i(C):i;return _.createElement(Sn,{...c,"aria-current":w,className:ee,ref:l,style:T,to:a,viewTransition:o},typeof s==`function`?s(C):s)});Cn.displayName=`NavLink`;var wn=_.forwardRef(({discover:e=`render`,fetcherKey:t,navigate:n,reloadDocument:r,replace:i,state:a,method:o=Nt,action:s,onSubmit:c,relative:l,preventScrollReset:u,viewTransition:d,defaultShouldRevalidate:f,...p},m)=>{let{useTransitions:h}=_.useContext(R),g=Mn(),v=Nn(s,{relative:l}),y=o.toLowerCase()===`get`?`get`:`post`,b=typeof s==`string`&&xn.test(s);return _.createElement(`form`,{ref:m,method:y,action:v,onSubmit:r?c:e=>{if(c&&c(e),e.defaultPrevented)return;e.preventDefault();let r=e.nativeEvent.submitter,s=r?.getAttribute(`formmethod`)||o,p=()=>g(r||e.currentTarget,{fetcherKey:t,method:s,navigate:n,replace:i,state:a,relative:l,preventScrollReset:u,viewTransition:d,defaultShouldRevalidate:f});h&&n!==!1?_.startTransition(()=>p()):p()},...p,"data-discover":!b&&e===`render`?`true`:void 0})});wn.displayName=`Form`;function Tn({getKey:e,storageKey:t,...n}){let r=_.useContext(ln),{basename:i}=_.useContext(R),a=tt(),o=Ct();Ln({getKey:e,storageKey:t});let s=_.useMemo(()=>{if(!r||!e)return null;let t=In(a,o,i,e);return t===a.key?null:t},[]);if(!r||r.isSpaMode)return null;let c=((e,t)=>{if(!window.history.state||!window.history.state.key){let e=Math.random().toString(32).slice(2);window.history.replaceState({key:e},``)}try{let n=JSON.parse(sessionStorage.getItem(e)||`{}`)[t||window.history.state.key];typeof n==`number`&&window.scrollTo(0,n)}catch(t){console.error(t),sessionStorage.removeItem(e)}}).toString();return _.createElement(`script`,{...n,suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${c})(${Jt(JSON.stringify(t||Pn))}, ${Jt(JSON.stringify(s))})`}})}Tn.displayName=`ScrollRestoration`;function En(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Dn(e){let t=_.useContext(L);return T(t,En(e)),t}function On(e){let t=_.useContext(ze);return T(t,En(e)),t}function kn(e,{target:t,replace:n,mask:r,state:i,preventScrollReset:a,relative:o,viewTransition:s,defaultShouldRevalidate:c,useTransitions:l}={}){let u=it(),d=tt(),f=ot(e,{relative:o});return _.useCallback(p=>{if(Bt(p,t)){p.preventDefault();let t=n===void 0?re(d)===re(f):n,m=()=>u(e,{replace:t,mask:r,state:i,preventScrollReset:a,relative:o,viewTransition:s,defaultShouldRevalidate:c});l?_.startTransition(()=>m()):m()}},[d,u,f,n,r,i,t,e,a,o,s,c,l])}var An=0,jn=()=>`__${String(++An)}__`;function Mn(){let{router:e}=Dn(`useSubmit`),{basename:t}=_.useContext(R),n=xt(),r=e.fetch,i=e.navigate;return _.useCallback(async(e,a={})=>{let{action:o,method:s,encType:c,formData:l,body:u}=Gt(e,t);a.navigate===!1?await r(a.fetcherKey||jn(),n,a.action||o,{defaultShouldRevalidate:a.defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:l,body:u,formMethod:a.method||s,formEncType:a.encType||c,flushSync:a.flushSync}):await i(a.action||o,{defaultShouldRevalidate:a.defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:l,body:u,formMethod:a.method||s,formEncType:a.encType||c,replace:a.replace,state:a.state,fromRouteId:n,flushSync:a.flushSync,viewTransition:a.viewTransition})},[r,i,t,n])}function Nn(e,{relative:t}={}){let{basename:n}=_.useContext(R),r=_.useContext(Ke);T(r,`useFormAction must be used inside a RouteContext`);let[i]=r.matches.slice(-1),a={...ot(e||`.`,{relative:t})},o=tt();if(e==null){a.search=o.search;let e=new URLSearchParams(a.search),t=e.getAll(`index`);if(t.some(e=>e===``)){e.delete(`index`),t.filter(e=>e).forEach(t=>e.append(`index`,t));let n=e.toString();a.search=n?`?${n}`:``}}return(!e||e===`.`)&&i.route.index&&(a.search=a.search?a.search.replace(/^\?/,`?index&`):`?index`),n!==`/`&&(a.pathname=a.pathname===`/`?n:I([n,a.pathname])),re(a)}var Pn=`react-router-scroll-positions`,Fn={};function In(e,t,n,r){let i=null;return r&&(i=r(n===`/`?e:{...e,pathname:ye(e.pathname,n)||e.pathname},t)),i??=e.key,i}function Ln({getKey:e,storageKey:t}={}){let{router:n}=Dn(`useScrollRestoration`),{restoreScrollPosition:r,preventScrollReset:i}=On(`useScrollRestoration`),{basename:a}=_.useContext(R),o=tt(),s=Ct(),c=St();_.useEffect(()=>(window.history.scrollRestoration=`manual`,()=>{window.history.scrollRestoration=`auto`}),[]),Rn(_.useCallback(()=>{if(c.state===`idle`){let t=In(o,s,a,e);Fn[t]=window.scrollY}try{sessionStorage.setItem(t||Pn,JSON.stringify(Fn))}catch(e){E(!1,`Failed to save scroll positions in sessionStorage, <ScrollRestoration /> will not work properly (${e}).`)}window.history.scrollRestoration=`auto`},[c.state,e,a,o,s,t])),typeof document<`u`&&(_.useLayoutEffect(()=>{try{let e=sessionStorage.getItem(t||Pn);e&&(Fn=JSON.parse(e))}catch{}},[t]),_.useLayoutEffect(()=>{let t=n?.enableScrollRestoration(Fn,()=>window.scrollY,e?(t,n)=>In(t,n,a,e):void 0);return()=>t&&t()},[n,a,e]),_.useLayoutEffect(()=>{if(r!==!1){if(typeof r==`number`){window.scrollTo(0,r);return}try{if(o.hash){let e=document.getElementById(decodeURIComponent(o.hash.slice(1)));if(e){e.scrollIntoView();return}}}catch{E(!1,`"${o.hash.slice(1)}" is not a decodable element ID. The view will not scroll to it.`)}i!==!0&&window.scrollTo(0,0)}},[o,r,i]))}function Rn(e,t){let{capture:n}=t||{};_.useEffect(()=>{let t=n==null?void 0:{capture:n};return window.addEventListener(`pagehide`,e,t),()=>{window.removeEventListener(`pagehide`,e,t)}},[e,n])}function zn(e,{relative:t}={}){let n=_.useContext(He);T(n!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:r}=Dn(`useViewTransitionState`),i=ot(e,{relative:t});if(!n.isTransitioning)return!1;let a=ye(n.currentLocation.pathname,r)||n.currentLocation.pathname,o=ye(n.nextLocation.pathname,r)||n.nextLocation.pathname;return ge(i.pathname,o)!=null||ge(i.pathname,a)!=null}var Bn=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.fragment`);function r(e,n,r){var i=null;if(r!==void 0&&(i=``+r),n.key!==void 0&&(i=``+n.key),`key`in n)for(var a in r={},n)a!==`key`&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:i,ref:n===void 0?null:n,props:r}}e.Fragment=n,e.jsx=r,e.jsxs=r})),z=o(((e,t)=>{t.exports=Bn()}))(),Vn=(0,_.createContext)({theme:`dark`,toggle:()=>{}});function Hn({children:e}){let[t,n]=(0,_.useState)(()=>localStorage.getItem(`grimoire-theme`)===`light`?`light`:`dark`);return(0,_.useEffect)(()=>{document.documentElement.setAttribute(`data-theme`,t),localStorage.setItem(`grimoire-theme`,t)},[t]),(0,z.jsx)(Vn.Provider,{value:{theme:t,toggle:()=>n(e=>e===`dark`?`light`:`dark`)},children:e})}var Un=()=>(0,_.useContext)(Vn),Wn=(0,_.createContext)(null),Gn=0;function Kn({children:e}){let[t,n]=(0,_.useState)([]),[r,i]=(0,_.useState)([]),a=(0,_.useCallback)((e,t={})=>{let r={id:`n-${++Gn}-${Date.now()}`,type:t.type??`info`,title:e,message:t.message,timestamp:Date.now(),read:!1};n(e=>[r,...e].slice(0,50)),i(e=>[r,...e]),setTimeout(()=>{i(e=>e.filter(e=>e.id!==r.id))},5e3),t.browser!==!1&&document.hidden&&`Notification`in window&&(Notification.permission===`granted`?new Notification(e,{body:t.message,icon:`/favicon.ico`}):Notification.permission==="default"&&Notification.requestPermission())},[]),o=(0,_.useCallback)(()=>{n(e=>e.map(e=>({...e,read:!0})))},[]),s=(0,_.useCallback)(e=>{n(t=>t.filter(t=>t.id!==e)),i(t=>t.filter(t=>t.id!==e))},[]),c=(0,_.useCallback)(()=>{n([]),i([])},[]),l=t.filter(e=>!e.read).length;return(0,z.jsxs)(Wn.Provider,{value:{notifications:t,unreadCount:l,notify:a,markAllRead:o,dismiss:s,clearAll:c},children:[e,(0,z.jsx)(`div`,{className:`toast-container`,children:r.map(e=>(0,z.jsxs)(`div`,{className:`toast toast-${e.type}`,children:[(0,z.jsxs)(`div`,{className:`toast-icon`,children:[e.type===`success`&&`✓`,e.type===`error`&&`✕`,e.type===`warning`&&`⚠`,e.type===`info`&&`ℹ`]}),(0,z.jsxs)(`div`,{className:`toast-body`,children:[(0,z.jsx)(`div`,{className:`toast-title`,children:e.title}),e.message&&(0,z.jsx)(`div`,{className:`toast-msg`,children:e.message})]}),(0,z.jsx)(`button`,{className:`toast-close`,onClick:()=>s(e.id),children:`✕`})]},e.id))})]})}var qn=()=>(0,_.useContext)(Wn);function Jn({open:e,onClose:t}){let{theme:n,toggle:r}=Un(),{notify:i}=qn();return e?(0,z.jsx)(`div`,{className:`modal-overlay`,onClick:t,children:(0,z.jsxs)(`div`,{className:`modal`,onClick:e=>e.stopPropagation(),children:[(0,z.jsxs)(`div`,{className:`modal-header`,children:[(0,z.jsx)(`h2`,{children:`Settings`}),(0,z.jsx)(`button`,{className:`modal-close`,onClick:t,children:`✕`})]}),(0,z.jsxs)(`div`,{className:`modal-body`,children:[(0,z.jsxs)(`div`,{className:`setting-group`,children:[(0,z.jsx)(`h3`,{children:`Appearance`}),(0,z.jsxs)(`div`,{className:`setting-row`,children:[(0,z.jsxs)(`div`,{className:`setting-info`,children:[(0,z.jsx)(`div`,{className:`setting-label`,children:`Theme`}),(0,z.jsx)(`div`,{className:`setting-desc`,children:`Switch between dark and light mode`})]}),(0,z.jsx)(`button`,{className:`theme-toggle ${n}`,onClick:r,"aria-label":`Toggle theme`,children:(0,z.jsxs)(`span`,{className:`theme-toggle-track`,children:[(0,z.jsx)(`span`,{className:`theme-toggle-icon`,children:n===`dark`?`🌙`:`☀️`}),(0,z.jsx)(`span`,{className:`theme-toggle-thumb`})]})})]})]}),(0,z.jsxs)(`div`,{className:`setting-group`,children:[(0,z.jsx)(`h3`,{children:`Notifications`}),(0,z.jsxs)(`div`,{className:`setting-row`,children:[(0,z.jsxs)(`div`,{className:`setting-info`,children:[(0,z.jsx)(`div`,{className:`setting-label`,children:`Browser Notifications`}),(0,z.jsx)(`div`,{className:`setting-desc`,children:`Receive alerts even when the app is in the background`})]}),(0,z.jsx)(`button`,{className:`btn btn-secondary btn-sm`,onClick:()=>{`Notification`in window&&Notification.requestPermission().then(e=>{i(e===`granted`?`Notifications enabled!`:`Notifications blocked`,{type:e===`granted`?`success`:`warning`})})},children:typeof Notification<`u`&&Notification.permission===`granted`?`Enabled`:`Enable`})]}),(0,z.jsxs)(`div`,{className:`setting-row`,children:[(0,z.jsxs)(`div`,{className:`setting-info`,children:[(0,z.jsx)(`div`,{className:`setting-label`,children:`Test Notification`}),(0,z.jsx)(`div`,{className:`setting-desc`,children:`Send a test toast to verify notifications work`})]}),(0,z.jsx)(`button`,{className:`btn btn-secondary btn-sm`,onClick:()=>i(`Test notification`,{type:`success`,message:`Notifications are working!`,browser:!0}),children:`Test`})]})]}),(0,z.jsxs)(`div`,{className:`setting-group`,children:[(0,z.jsx)(`h3`,{children:`About`}),(0,z.jsx)(`div`,{className:`setting-row`,children:(0,z.jsxs)(`div`,{className:`setting-info`,children:[(0,z.jsx)(`div`,{className:`setting-label`,children:`GRIMOIRE`}),(0,z.jsx)(`div`,{className:`setting-desc`,children:`Unified Product Data Toolkit — v1.0.0`})]})})]})]})]})}):null}function Yn(e){if(/^https?:\/\//i.test(e)||!e.startsWith(`/api`)&&!e.startsWith(`/health`))return e;let t=window.__GRIMOIRE_API_BASE__?.replace(/\/$/,``);if(t)return`${t}${e}`;let{hostname:n,port:r,protocol:i}=window.location,a=new Set([`5173`,`7788`]);return i.startsWith(`http`)&&(n===`127.0.0.1`||n===`localhost`)&&a.has(r)?e:`http://127.0.0.1:7788${e}`}async function Xn(e,t){let n=await fetch(Yn(e),t);if(!n.ok){let e=n.statusText;try{let t=await n.json();e=typeof t.detail==`string`?t.detail:JSON.stringify(t.detail??t)}catch{e=await n.text().catch(()=>n.statusText)}throw Error(e)}return n.json()}async function Zn(e,t){return window.__grimoire?.pickFolder?await window.__grimoire.pickFolder(e)||``:(await Xn(`/api/local/select-folder`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({title:e,initial_path:t})})).path||``}function Qn(e){if(!e)return`Idle`;let t=Number(e.summary?.progress_percent??0);return e.status===`running`&&t?`Running ${t}%`:e.status}function $n(e,t){let[n,r]=(0,_.useState)(e);return(0,_.useEffect)(()=>r(e),[e]),(0,_.useEffect)(()=>{if(!n||![`pending`,`running`].includes(n.status))return;let e=!1,i=window.setInterval(async()=>{try{let a=await Xn(`/api/jobs/${n.id}`);if(e)return;r(a),[`completed`,`failed`].includes(a.status)&&(window.clearInterval(i),t?.(a))}catch{window.clearInterval(i)}},1200);return()=>{e=!0,window.clearInterval(i)}},[n?.id,n?.status]),n}var er={Critical:0,High:1,Medium:2,Low:3},tr={Critical:`solid-crit`,High:`solid-high`,Medium:`solid-med`,Low:`solid-low`},nr={"To Do":`out-open`,"In Progress":`out-prog`,Done:`out-res`,Completed:`out-closed`},rr=[`Overview`,`Summary Tracker`,`Action Tracker`,`Brand Scorecard`,`SKU Missing Detail`,`Validation Errors`,`Run Summary`],ir=[`ACTIVE`,`Upcoming`,`Limited`,`Non-Active`,`Discontinued`,`N/A`,`Unknown`,`Others`,`NON-ACR`],ar=[`ACTIVE`,`Upcoming`,`Limited`,`N/A`,`Unknown`,`Others`,`NON-ACR`],or=[`Critical`,`High`,`Medium`,`Low`],sr=new Set([`Total`,`# Missing`,`Active`,`Upcoming`,`Limited`,`Non-Active`,`Discontinued`,`Blanks`,`N/A`,`Unknown`,`Non-ACR`,`Others`,`Source Row`]);async function cr(e,t){let n=await fetch(Yn(e),t);if(!n.ok){let e=n.statusText;try{let t=await n.json();e=typeof t.detail==`string`?t.detail:JSON.stringify(t.detail??t)}catch{e=await n.text().catch(()=>n.statusText)}throw Error(e)}return n.json()}function lr(e){return e==null?``:String(e)}function ur(e){return[`Description (250+ words)`,`EU Responsible person`,`UK Responsible person`].includes(e)?`Critical`:[`CPNP Number`,`UK SCPN NUMBER`,`Manufacturer name`,`Ingredient list`].includes(e)?`High`:[`BAR CODE`,`Net Weight (g)`,`Gross weight (g)`,`PAO (Months)`,`Shelf Life (Months)`,`SUPPLY PRICE`].includes(e)?`Medium`:`Low`}function dr(e,t){return t&&t[e===`Overview`?`Missing Data Overview`:e]||null}function fr(e,t){if(!t||!t.rows)return[];if(e!==`SKU Missing Detail`)return t.rows;let n=new Map;for(let e of t.rows){let t=[e.Brand||``,e.SKU||``,e[`Product Name`]||``,e.Status||``,e[`Source Row`]||``].join(`|`),r=n.get(t)||{Brand:e.Brand||``,SKU:e.SKU||``,"Product Name":e[`Product Name`]||``,Status:e.Status||``,"Missing Fields":[],Priority:e.Priority||ur(lr(e[`Missing Field`])),"Source Row":e[`Source Row`]||``};e[`Missing Field`]&&r[`Missing Fields`].push(lr(e[`Missing Field`])),er[e.Priority]<er[r.Priority]&&(r.Priority=e.Priority),n.set(t,r)}return Array.from(n.values()).map(e=>({...e,"Missing Fields":e[`Missing Fields`].join(`; `)}))}function pr(e,t){return!t||!t.headers?[]:e===`SKU Missing Detail`?[`Brand`,`SKU`,`Product Name`,`Status`,`Missing Fields`,`Priority`,`Source Row`]:t.headers.filter(e=>e&&!String(e).startsWith(`Column `))}var mr=[{section:`DATA_MAINTENANCE`},{id:`dqc`,label:`Data Quality Control`,icon:`shield`},{id:`master`,label:`Master Data`,icon:`db`},{id:`steward`,label:`Data Steward`,icon:`user`},{id:`rules`,label:`Rule Profiles`,icon:`list`},{id:`history`,label:`Audit History`,icon:`clock`},{id:`reports`,label:`Reports`,icon:`report`},{id:`config`,label:`Configuration`,icon:`gear`},{section:`IMAGE_EDIT`},{id:`imageedit`,label:`Image Edit`,icon:`image`}],hr={dqc:`Data Quality Control`,master:`Master Data`,steward:`Data Steward`,rules:`Rule Profiles`,history:`Audit History`,reports:`Reports`,config:`Configuration`};function gr(e){if(!e)return``;try{return new Date(e).toLocaleString()}catch{return e}}function _r(e){e&&window.open(Yn(`/api/jobs/${encodeURIComponent(e)}/download`),`_blank`)}function vr(e){let[t,n]=(0,_.useState)([]),[r,i]=(0,_.useState)(!1),[a,o]=(0,_.useState)(``),s=(0,_.useCallback)(async()=>{i(!0),o(``);try{let e=await cr(`/api/data-quality-control/history?limit=100`);n(Array.isArray(e)?e:[])}catch(t){let n=t instanceof Error?t.message:String(t);o(n),e(`Could not load audit history: ${n}`)}finally{i(!1)}},[e]);return(0,_.useEffect)(()=>{s()},[s]),(0,_.useEffect)(()=>(window.addEventListener(`aio:reports:refresh`,s),()=>window.removeEventListener(`aio:reports:refresh`,s)),[s]),{runs:t,loading:r,error:a,refresh:s}}function yr({label:e,value:t,sub:n,tone:r,filename:i}){return(0,z.jsxs)(`div`,{className:`aio-card aio-metric`,children:[(0,z.jsx)(`div`,{className:`aio-metric-label`,children:e}),(0,z.jsx)(`div`,{className:`aio-metric-value ${r||``} ${i?`filename`:``}`,title:typeof t==`string`?t:void 0,children:t}),(0,z.jsx)(`div`,{className:`aio-muted`,children:n})]})}function br(){let{notify:e}=qn(),[t,n]=(0,_.useState)({loaded:!1}),[r,i]=(0,_.useState)(``),[a,o]=(0,_.useState)(null),[s,c]=(0,_.useState)(!1),[l,u]=(0,_.useState)(!1),[d,f]=(0,_.useState)(!1),[p,m]=(0,_.useState)(!1),h=(0,_.useRef)(null),g=(0,_.useRef)(null),[v,y]=(0,_.useState)(``),[b,x]=(0,_.useState)(``);(0,_.useEffect)(()=>{cr(`/api/master-data/state`).then(e=>{n(e),e.selected_brand&&(i(e.selected_brand),cr(`/api/master-data/select-brand`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({brand:e.selected_brand})}).then(e=>o(e.product_count)).catch(()=>{})),e.dqc_file&&y(e.dqc_file),e.master_file&&x(e.master_file)}).catch(()=>{})},[]);async function S(){let t=h.current?.files?.[0],r=g.current?.files?.[0];if(!t||!r){e(`Please select both files`,{type:`warning`});return}c(!0);try{let a=new FormData;a.append(`dqc_file`,t),a.append(`master_file`,r);let s=await cr(`/api/master-data/upload`,{method:`POST`,body:a});n({loaded:!0,brands:s.brands,master_brands:s.master_brands,dqc_file:s.dqc_file,master_file:s.master_file,selected_brand:null}),y(s.dqc_file),x(s.master_file),i(``),o(null),e(`Files uploaded — ${s.brands.length} brands found in DQC report`,{type:`success`})}catch(t){e(`Upload failed`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{c(!1)}}async function C(t){if(i(t),!t){o(null);return}try{o((await cr(`/api/master-data/select-brand`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({brand:t})})).product_count)}catch(t){e(`Could not select brand`,{type:`error`,message:t instanceof Error?t.message:String(t)})}}async function w(){if(!r){e(`Select a brand first`,{type:`warning`});return}u(!0);try{let t=await fetch(Yn(`/api/master-data/generate`),{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({brand:r})});if(!t.ok)throw Error(await t.text());let n=await t.blob(),i=URL.createObjectURL(n),a=document.createElement(`a`);a.href=i,a.download=`${r}_Missing_Data.xlsx`,a.click(),URL.revokeObjectURL(i),e(`${r}_Missing_Data.xlsx downloaded`,{type:`success`}),m(!0)}catch(t){e(`Generation failed`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{u(!1)}}async function ee(){f(!0);try{let t=await fetch(Yn(`/api/master-data/generate-status`),{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({brand:r})});if(!t.ok)throw Error(await t.text());let n=await t.blob(),i=URL.createObjectURL(n),a=document.createElement(`a`);a.href=i,a.download=`${r}_Missing_Data_Status.xlsx`,a.click(),URL.revokeObjectURL(i),e(`${r}_Missing_Data_Status.xlsx downloaded`,{type:`success`})}catch(t){e(`Status file generation failed`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{f(!1),m(!1)}}let T=t.brands??[];return(0,z.jsxs)(`div`,{className:`aio-fade`,children:[(0,z.jsxs)(`div`,{className:`aio-stat-grid`,children:[(0,z.jsx)(yr,{label:`DQC Report`,value:v||`—`,sub:t.loaded?`uploaded`:`not uploaded`,filename:!0}),(0,z.jsx)(yr,{label:`Master Data`,value:b||`—`,sub:t.loaded?`uploaded`:`not uploaded`,filename:!0}),(0,z.jsx)(yr,{label:`Brands (DQC)`,value:T.length||`—`,sub:`from DQC report`}),(0,z.jsx)(yr,{label:`Products`,value:a??`—`,sub:r?`in ${r}`:`select a brand`,tone:a?`green`:void 0})]}),(0,z.jsxs)(`section`,{className:`aio-card aio-pad`,children:[(0,z.jsx)(`h3`,{children:`Upload Files`}),(0,z.jsx)(`p`,{className:`aio-muted`,children:`Upload the DQC report (downloaded from Data Quality Control tab) and the Master Data Excel file.`}),(0,z.jsxs)(`div`,{className:`aio-form-grid`,children:[(0,z.jsxs)(`label`,{children:[`DQC Report (.xlsx)`,(0,z.jsx)(`input`,{ref:h,type:`file`,accept:`.xlsx,.xls`,className:`aio-input`})]}),(0,z.jsxs)(`label`,{children:[`Master Data (.xlsx)`,(0,z.jsx)(`input`,{ref:g,type:`file`,accept:`.xlsx,.xls`,className:`aio-input`})]})]}),(0,z.jsx)(`div`,{className:`aio-actions-row`,style:{marginTop:12},children:(0,z.jsx)(`button`,{className:`btn btn-primary btn-sm`,onClick:S,disabled:s,children:s?`Uploading...`:`Upload & Read Files`})})]}),t.loaded&&(0,z.jsxs)(`section`,{className:`aio-card aio-pad`,children:[(0,z.jsx)(`h3`,{children:`Generate Missing Data`}),(0,z.jsx)(`div`,{className:`aio-form-grid`,children:(0,z.jsxs)(`label`,{children:[`Select Brand`,(0,z.jsxs)(`select`,{className:`aio-input`,value:r,onChange:e=>C(e.target.value),children:[(0,z.jsx)(`option`,{value:``,children:`— choose brand —`}),T.map(e=>(0,z.jsx)(`option`,{value:e,children:e},e))]})]})}),r&&a!==null&&(0,z.jsxs)(`p`,{className:`aio-muted`,style:{marginTop:8},children:[a,` products found for `,(0,z.jsx)(`strong`,{children:r})]}),(0,z.jsx)(`div`,{className:`aio-actions-row`,style:{marginTop:12},children:(0,z.jsx)(`button`,{className:`btn btn-primary btn-sm`,onClick:w,disabled:!r||l,children:l?`Generating...`:`Generate ${r||`Brand`}_Missing_Data.xlsx`})})]}),p&&(0,z.jsxs)(Dr,{title:`Generate Status File?`,onClose:()=>m(!1),children:[(0,z.jsxs)(`p`,{children:[`Would you also like to generate `,(0,z.jsxs)(`strong`,{children:[r,`_Missing_Data_Status.xlsx`]}),`?`]}),(0,z.jsxs)(`p`,{className:`aio-muted`,children:[`This file lists all `,a,` products with their status from the master data.`]}),(0,z.jsxs)(`div`,{className:`aio-modal-actions`,children:[(0,z.jsx)(`button`,{className:`btn btn-secondary`,onClick:()=>m(!1),children:`No, Skip`}),(0,z.jsx)(`button`,{className:`btn btn-primary`,disabled:d,onClick:ee,children:d?`Generating...`:`Yes, Generate`})]})]})]})}function xr(){return(0,z.jsxs)(`section`,{className:`aio-card aio-pad`,children:[(0,z.jsx)(`h3`,{children:`Action Ownership`}),(0,z.jsx)(`p`,{className:`aio-muted`,children:`Action Tracker rows are generated from the current DQC report. Ownership workflow is empty until real assignments are created.`}),(0,z.jsx)(`div`,{className:`aio-table-wrap`,children:(0,z.jsxs)(`table`,{className:`aio-table`,children:[(0,z.jsx)(`thead`,{children:(0,z.jsxs)(`tr`,{children:[(0,z.jsx)(`th`,{children:`Brand`}),(0,z.jsx)(`th`,{children:`Field`}),(0,z.jsx)(`th`,{children:`Priority`}),(0,z.jsx)(`th`,{children:`Status`}),(0,z.jsx)(`th`,{children:`Owner`})]})}),(0,z.jsx)(`tbody`,{children:(0,z.jsx)(`tr`,{children:(0,z.jsx)(`td`,{colSpan:5,className:`aio-empty`,children:`No stewardship assignments have been created yet.`})})})]})})]})}function Sr(){let{notify:e}=qn(),[t,n]=(0,_.useState)(null),[r,i]=(0,_.useState)(``),[a,o]=(0,_.useState)(!1),[s,c]=(0,_.useState)(``),[l,u]=(0,_.useState)(``),[d,f]=(0,_.useState)(!1),p=(0,_.useCallback)(()=>{cr(`/api/data-quality-control/rule-profile`).then(n).catch(e=>i(e instanceof Error?e.message:String(e)))},[]);(0,_.useEffect)(()=>{p()},[p]);function m(){c((t?.included_statuses||[]).join(`
`)),u(JSON.stringify(t?.priority_fields||{},null,2)),o(!0)}(0,_.useEffect)(()=>(window.addEventListener(`aio:rules:edit`,m),()=>window.removeEventListener(`aio:rules:edit`,m)));async function h(){f(!0);try{n(await cr(`/api/data-quality-control/rule-profile`,{method:`PUT`,headers:{"Content-Type":`application/json`},body:JSON.stringify({included_statuses:s.split(/\r?\n|,/).map(e=>e.trim()).filter(Boolean),priority_fields:JSON.parse(l||`{}`)})})),o(!1),e(`Rule profile saved`,{type:`success`})}catch(t){e(`Could not save rule profile`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{f(!1)}}let g=Object.entries(t?.priority_fields||{});return(0,z.jsxs)(`div`,{className:`aio-rules-grid`,children:[(0,z.jsxs)(`section`,{className:`aio-card aio-pad`,children:[(0,z.jsx)(`h3`,{children:`Active Rule Profile`}),r&&(0,z.jsx)(`div`,{className:`aio-error`,children:r}),(0,z.jsx)(`p`,{className:`aio-muted`,children:`The backend rule profile controls included statuses and priority scoring for every new DQC run.`}),(0,z.jsx)(`h4`,{children:`Included Statuses`}),(0,z.jsxs)(`div`,{className:`aio-chip-row`,children:[(t?.included_statuses||[]).map(e=>(0,z.jsx)(`span`,{className:`aio-chip`,children:e||`Blank`},e||`Blank`)),!t&&(0,z.jsx)(`span`,{className:`aio-muted`,children:`Loading...`})]})]}),(0,z.jsxs)(`section`,{className:`aio-card`,children:[(0,z.jsxs)(`div`,{className:`aio-card-head`,children:[(0,z.jsx)(`strong`,{children:`Priority Fields`}),(0,z.jsx)(`button`,{className:`btn btn-secondary btn-sm`,onClick:m,children:`Edit`})]}),(0,z.jsxs)(`table`,{className:`aio-table`,children:[(0,z.jsx)(`thead`,{children:(0,z.jsxs)(`tr`,{children:[(0,z.jsx)(`th`,{children:`Priority`}),(0,z.jsx)(`th`,{children:`Fields`}),(0,z.jsx)(`th`,{children:`Count`})]})}),(0,z.jsxs)(`tbody`,{children:[g.map(([e,t])=>(0,z.jsxs)(`tr`,{children:[(0,z.jsx)(`td`,{children:(0,z.jsx)(`span`,{className:`aio-priority ${e.toLowerCase()}`,children:e})}),(0,z.jsx)(`td`,{children:t.join(`, `)}),(0,z.jsx)(`td`,{className:`num`,children:t.length})]},e)),!g.length&&(0,z.jsx)(`tr`,{children:(0,z.jsx)(`td`,{colSpan:3,className:`aio-empty`,children:`No rule profile loaded.`})})]})]})]}),a&&(0,z.jsxs)(Dr,{title:`Edit Rule Profile`,onClose:()=>o(!1),wide:!0,children:[(0,z.jsxs)(`label`,{className:`aio-block-label`,children:[`Included Statuses`,(0,z.jsx)(`textarea`,{className:`aio-input aio-textarea`,value:s,onChange:e=>c(e.target.value)})]}),(0,z.jsxs)(`label`,{className:`aio-block-label`,children:[`Priority Fields JSON`,(0,z.jsx)(`textarea`,{className:`aio-input aio-textarea code`,value:l,onChange:e=>u(e.target.value)})]}),(0,z.jsxs)(`div`,{className:`aio-modal-actions`,children:[(0,z.jsx)(`button`,{className:`btn btn-secondary`,onClick:()=>o(!1),children:`Cancel`}),(0,z.jsx)(`button`,{className:`btn btn-primary`,disabled:d,onClick:h,children:d?`Saving...`:`Save Rule Profile`})]})]})]})}function Cr(){let{notify:e}=qn(),{runs:t,loading:n,error:r,refresh:i}=vr((0,_.useCallback)(t=>e(t,{type:`error`}),[e])),a=t[0]||null,o=Number(a?.action_count||0)+Number(a?.validation_error_count||0);return(0,z.jsxs)(`div`,{className:`aio-fade`,children:[(0,z.jsxs)(`div`,{className:`aio-stat-grid`,children:[(0,z.jsx)(yr,{label:`Latest Brands`,value:a?a.brand_count??0:`-`,sub:`latest completed run`,tone:`green`}),(0,z.jsx)(yr,{label:`Included Rows`,value:a?a.included_rows??0:`-`,sub:`selected status rows`}),(0,z.jsx)(yr,{label:`Open Issues`,value:a?o:`-`,sub:`actions + validations`,tone:`red`}),(0,z.jsx)(yr,{label:`History`,value:t.length,sub:`stored audit runs`})]}),(0,z.jsxs)(`section`,{className:`aio-card aio-pad`,children:[(0,z.jsxs)(`div`,{className:`aio-card-title-row`,children:[(0,z.jsx)(`h3`,{children:`Audit Timeline`}),(0,z.jsxs)(`button`,{className:`btn btn-secondary btn-sm`,onClick:i,disabled:n,children:[(0,z.jsx)(Vr,{name:`refresh`,size:15}),` Refresh`]})]}),r&&(0,z.jsx)(`div`,{className:`aio-error`,children:r}),(0,z.jsxs)(`div`,{className:`aio-timeline`,children:[t.map(e=>(0,z.jsxs)(`div`,{className:`aio-timeline-item`,children:[(0,z.jsx)(`span`,{className:`aio-dot`}),(0,z.jsxs)(`div`,{className:`aio-timeline-body`,children:[(0,z.jsx)(`div`,{className:`aio-muted`,children:gr(e.created_at)}),(0,z.jsx)(`strong`,{children:e.source_path?e.source_path.split(/[\\/]/).pop():`Data Quality Control Run`}),(0,z.jsxs)(`div`,{className:`aio-run-meta`,children:[(0,z.jsxs)(`span`,{children:[e.brand_count??0,` brands`]}),(0,z.jsxs)(`span`,{children:[e.included_rows??0,`/`,e.total_rows??0,` rows`]}),(0,z.jsxs)(`span`,{children:[e.action_count??0,` actions`]}),(0,z.jsxs)(`span`,{children:[e.validation_error_count??0,` validations`]}),(0,z.jsx)(`span`,{className:`aio-chip green`,children:`Completed`}),(0,z.jsxs)(`button`,{className:`btn btn-success btn-sm`,disabled:!e.job_id,onClick:()=>_r(e.job_id),children:[(0,z.jsx)(jr,{size:14}),` Report`]})]})]})]},e.id)),!t.length&&(0,z.jsx)(`div`,{className:`aio-empty`,children:n?`Loading audit history...`:`No audit history yet. Run DQC to create the first record.`})]})]})]})}function wr(){let{notify:e}=qn(),{runs:t,loading:n,error:r,refresh:i}=vr((0,_.useCallback)(t=>e(t,{type:`error`}),[e]));return(0,z.jsxs)(`section`,{className:`aio-card`,children:[(0,z.jsxs)(`div`,{className:`aio-card-head`,children:[(0,z.jsx)(`strong`,{children:`Generated Reports`}),(0,z.jsxs)(`button`,{className:`btn btn-secondary btn-sm`,onClick:i,disabled:n,children:[(0,z.jsx)(Vr,{name:`refresh`,size:15}),` Refresh`]})]}),r&&(0,z.jsx)(`div`,{className:`aio-error in-card`,children:r}),(0,z.jsxs)(`table`,{className:`aio-table`,children:[(0,z.jsx)(`thead`,{children:(0,z.jsxs)(`tr`,{children:[(0,z.jsx)(`th`,{children:`File`}),(0,z.jsx)(`th`,{children:`Generated`}),(0,z.jsx)(`th`,{children:`Rows`}),(0,z.jsx)(`th`,{children:`Issues`}),(0,z.jsx)(`th`,{})]})}),(0,z.jsxs)(`tbody`,{children:[t.map(e=>{let t=e.output_path?e.output_path.split(/[\\/]/).pop():`report.xlsx`,n=Number(e.action_count||0)+Number(e.validation_error_count||0);return(0,z.jsxs)(`tr`,{children:[(0,z.jsx)(`td`,{children:(0,z.jsx)(`strong`,{children:t})}),(0,z.jsx)(`td`,{children:gr(e.created_at)}),(0,z.jsxs)(`td`,{className:`num`,children:[e.included_rows??0,`/`,e.total_rows??0]}),(0,z.jsx)(`td`,{className:`num`,children:n}),(0,z.jsx)(`td`,{children:(0,z.jsxs)(`button`,{className:`btn btn-success btn-sm`,disabled:!e.job_id,onClick:()=>_r(e.job_id),children:[(0,z.jsx)(jr,{size:14}),` Download`]})})]},e.id)}),!t.length&&(0,z.jsx)(`tr`,{children:(0,z.jsx)(`td`,{colSpan:5,className:`aio-empty`,children:n?`Loading reports...`:`No generated reports yet.`})})]})]})]})}function Tr(){let{notify:e}=qn(),[t,n]=(0,_.useState)(`General`),[r,i]=(0,_.useState)({autoAudit:!1,email:!1,weekly:!1,lockDrafts:!1}),[a,o]=(0,_.useState)({crit:95,high:85,med:70}),[s,c]=(0,_.useState)(`Weekly`);(0,_.useEffect)(()=>{let t=()=>e(`Configuration saved locally`,{type:`success`});return window.addEventListener(`aio:config:save`,t),()=>window.removeEventListener(`aio:config:save`,t)},[e]);function l(e){i(t=>({...t,[e]:!t[e]}))}function u({stateKey:e}){return(0,z.jsx)(`button`,{className:`aio-switch${r[e]?` on`:``}`,onClick:()=>l(e)})}return(0,z.jsxs)(`div`,{className:`aio-config-grid`,children:[(0,z.jsx)(`div`,{className:`aio-card aio-config-nav`,children:[`General`,`Thresholds`,`Connections`,`Notifications`].map(e=>(0,z.jsxs)(`button`,{className:t===e?`active`:``,onClick:()=>n(e),children:[(0,z.jsx)(Vr,{name:e===`General`?`gear`:e===`Thresholds`?`shield`:e===`Connections`?`db`:`report`,size:17}),` `,e]},e))}),(0,z.jsxs)(`section`,{className:`aio-card aio-pad`,children:[t===`General`&&(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(`h3`,{children:`General`}),(0,z.jsx)(Er,{name:`Auto-run audit`,desc:`Reserved for scheduled local runs`,children:(0,z.jsx)(u,{stateKey:`autoAudit`})}),(0,z.jsx)(Er,{name:`Audit frequency`,desc:`Used when scheduling is enabled`,children:(0,z.jsx)(`div`,{className:`aio-segmented`,children:[`Daily`,`Weekly`,`Monthly`].map(e=>(0,z.jsx)(`button`,{className:s===e?`active`:``,onClick:()=>c(e),children:e},e))})}),(0,z.jsx)(Er,{name:`Lock draft records from audit`,desc:`Exclude incomplete drafts from scoring`,children:(0,z.jsx)(u,{stateKey:`lockDrafts`})})]}),t===`Thresholds`&&(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(`h3`,{children:`Score Thresholds`}),[[`crit`,`Critical fields`],[`high`,`High-priority fields`],[`med`,`Medium fields`]].map(([e,t])=>(0,z.jsx)(Er,{name:t,desc:`Completion threshold`,children:(0,z.jsxs)(`div`,{className:`aio-number-wrap`,children:[(0,z.jsx)(`input`,{className:`aio-input`,type:`number`,value:a[e],onChange:t=>o(n=>({...n,[e]:Math.min(100,Number(t.target.value)||0)}))}),(0,z.jsx)(`span`,{children:`%`})]})},e)),(0,z.jsx)(`button`,{className:`btn btn-primary btn-sm`,onClick:()=>e(`Thresholds saved locally`,{type:`success`}),children:`Save Thresholds`})]}),t===`Connections`&&(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(`h3`,{children:`Data Connections`}),(0,z.jsx)(`p`,{className:`aio-muted`,children:`This local build reads uploaded Excel/CSV files directly. External connectors are not enabled.`})]}),t===`Notifications`&&(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(`h3`,{children:`Notifications`}),(0,z.jsx)(Er,{name:`Email digest`,desc:`Reserved for future local notification setup`,children:(0,z.jsx)(u,{stateKey:`email`})}),(0,z.jsx)(Er,{name:`Weekly scorecard`,desc:`Reserved for future local notification setup`,children:(0,z.jsx)(u,{stateKey:`weekly`})})]})]})]})}function Er({name:e,desc:t,children:n}){return(0,z.jsxs)(`div`,{className:`aio-setting-row`,children:[(0,z.jsxs)(`div`,{children:[(0,z.jsx)(`strong`,{children:e}),(0,z.jsx)(`div`,{className:`aio-muted`,children:t})]}),n]})}function Dr({title:e,onClose:t,children:n,wide:r}){return(0,z.jsx)(`div`,{className:`aio-modal-backdrop`,children:(0,z.jsxs)(`div`,{className:`aio-modal${r?` wide`:``}`,children:[(0,z.jsxs)(`div`,{className:`aio-modal-head`,children:[(0,z.jsx)(`strong`,{children:e}),(0,z.jsx)(`button`,{className:`aio-icon-btn`,onClick:t,children:(0,z.jsx)(Vr,{name:`x`,size:16})})]}),n]})})}function Or(){let{notify:e}=qn(),[t,n]=(0,_.useState)(`dqc`),[r,i]=(0,_.useState)(!1);function a(){n(`dqc`),window.setTimeout(()=>{window.dispatchEvent(new CustomEvent(`aio:dqc:open-upload`))},0)}function o(t){if(t===`imageedit`){e(`Use the main GRIMOIRE Image Edit tab for the full image workflow.`,{type:`info`});return}n(t)}let s={dqc:(0,z.jsxs)(z.Fragment,{children:[(0,z.jsxs)(`button`,{className:`btn btn-secondary`,onClick:a,children:[(0,z.jsx)(jr,{size:15}),` Upload Master Data`]}),(0,z.jsxs)(`button`,{className:`btn btn-primary`,onClick:a,children:[(0,z.jsx)(Ar,{size:15}),` Run Audit`]})]}),master:(0,z.jsxs)(z.Fragment,{children:[(0,z.jsxs)(`button`,{className:`btn btn-secondary`,onClick:a,children:[(0,z.jsx)(jr,{size:15}),` Import Master Data`]}),(0,z.jsx)(`button`,{className:`btn btn-primary`,onClick:()=>window.dispatchEvent(new CustomEvent(`aio:master:new-record`)),children:`+ New Record`})]}),steward:(0,z.jsxs)(`button`,{className:`btn btn-primary`,disabled:!0,children:[(0,z.jsx)(Vr,{name:`refresh`,size:15}),` Auto-Assign`]}),rules:(0,z.jsx)(`button`,{className:`btn btn-primary`,onClick:()=>window.dispatchEvent(new CustomEvent(`aio:rules:edit`)),children:`Edit Rule Profile`}),history:(0,z.jsxs)(`button`,{className:`btn btn-primary`,onClick:a,children:[(0,z.jsx)(Ar,{size:15}),` Run Audit`]}),reports:(0,z.jsxs)(`button`,{className:`btn btn-primary`,onClick:()=>window.dispatchEvent(new CustomEvent(`aio:reports:refresh`)),children:[(0,z.jsx)(Vr,{name:`refresh`,size:15}),` Refresh Reports`]}),config:(0,z.jsxs)(`button`,{className:`btn btn-primary`,onClick:()=>window.dispatchEvent(new CustomEvent(`aio:config:save`)),children:[(0,z.jsx)(zr,{size:14}),` Save Changes`]})},c={dqc:(0,z.jsx)(qr,{}),master:(0,z.jsx)(br,{}),steward:(0,z.jsx)(xr,{}),rules:(0,z.jsx)(Sr,{}),history:(0,z.jsx)(Cr,{}),reports:(0,z.jsx)(wr,{}),config:(0,z.jsx)(Tr,{})};return(0,z.jsxs)(`div`,{className:`aio-embed${r?` collapsed`:``}`,children:[(0,z.jsxs)(`aside`,{className:`aio-sidebar`,children:[(0,z.jsxs)(`div`,{className:`aio-sidebar-top`,children:[(0,z.jsx)(`span`,{className:`aio-brand-mark`,children:(0,z.jsx)(Vr,{name:`grid`,size:15})}),(0,z.jsx)(`span`,{className:`aio-brand-name`,children:`UNIFICATION AIO`}),(0,z.jsx)(`button`,{className:`aio-collapse`,onClick:()=>i(e=>!e),title:`Toggle sidebar`,children:(0,z.jsx)(Vr,{name:`menu`,size:18})})]}),(0,z.jsx)(`nav`,{className:`aio-nav`,children:mr.map((e,n)=>`section`in e?(0,z.jsx)(`div`,{className:`aio-nav-section`,children:e.section},`${e.section}-${n}`):(0,z.jsxs)(`button`,{className:`aio-nav-item${t===e.id?` active`:``}`,onClick:()=>o(e.id),title:e.label,children:[(0,z.jsx)(Vr,{name:e.icon,size:18}),(0,z.jsx)(`span`,{children:e.label})]},e.id))}),(0,z.jsx)(`div`,{className:`aio-side-foot`,children:(0,z.jsxs)(`button`,{className:`aio-account`,children:[(0,z.jsx)(`span`,{className:`aio-avatar`,children:(0,z.jsx)(Vr,{name:`user`,size:16})}),(0,z.jsx)(`span`,{children:`Data Admin`}),(0,z.jsx)(Br,{size:14})]})})]}),(0,z.jsxs)(`div`,{className:`aio-main`,children:[(0,z.jsxs)(`header`,{className:`aio-topbar`,children:[(0,z.jsx)(`h2`,{children:hr[t]}),(0,z.jsx)(`div`,{className:`aio-topbar-actions`,children:s[t]})]}),(0,z.jsx)(`main`,{className:`aio-content`,children:c[t]})]}),(0,z.jsx)(`style`,{children:`
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
      `})]})}function kr(e,t,n){let r=e=>`"`+String(e??``).replace(/"/g,`""`)+`"`,i=t.map(r).join(`,`),a=n.map(e=>t.map(t=>r(e[t])).join(`,`)).join(`
`),o=new Blob([i+`
`+a],{type:`text/csv;charset=utf-8;`}),s=URL.createObjectURL(o),c=document.createElement(`a`);c.href=s,c.download=e,document.body.appendChild(c),c.click(),c.remove(),URL.revokeObjectURL(s)}function Ar({size:e=15}){return(0,z.jsxs)(`svg`,{width:e,height:e,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,z.jsx)(`circle`,{cx:`12`,cy:`12`,r:`10`}),(0,z.jsx)(`polygon`,{points:`10 8 16 12 10 16 10 8`,fill:`currentColor`,stroke:`none`})]})}function jr({size:e=15}){return(0,z.jsxs)(`svg`,{width:e,height:e,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,z.jsx)(`path`,{d:`M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4`}),(0,z.jsx)(`polyline`,{points:`7 10 12 15 17 10`}),(0,z.jsx)(`line`,{x1:`12`,y1:`15`,x2:`12`,y2:`3`})]})}function Mr({size:e=13}){return(0,z.jsxs)(`svg`,{width:e,height:e,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,z.jsx)(`circle`,{cx:`12`,cy:`12`,r:`10`}),(0,z.jsx)(`line`,{x1:`12`,y1:`16`,x2:`12`,y2:`12`}),(0,z.jsx)(`line`,{x1:`12`,y1:`8`,x2:`12.01`,y2:`8`})]})}function Nr({size:e=16}){return(0,z.jsxs)(`svg`,{width:e,height:e,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,z.jsx)(`rect`,{x:`3`,y:`4`,width:`18`,height:`18`,rx:`2`,ry:`2`}),(0,z.jsx)(`line`,{x1:`16`,y1:`2`,x2:`16`,y2:`6`}),(0,z.jsx)(`line`,{x1:`8`,y1:`2`,x2:`8`,y2:`6`}),(0,z.jsx)(`line`,{x1:`3`,y1:`10`,x2:`21`,y2:`10`})]})}function Pr({size:e=20}){return(0,z.jsxs)(`svg`,{width:e,height:e,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,z.jsx)(`path`,{d:`M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z`}),(0,z.jsx)(`polyline`,{points:`14 2 14 8 20 8`})]})}function Fr({size:e=15}){return(0,z.jsx)(`svg`,{width:e,height:e,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2.4,strokeLinecap:`round`,strokeLinejoin:`round`,children:(0,z.jsx)(`polyline`,{points:`15 18 9 12 15 6`})})}function Ir({size:e=15}){return(0,z.jsx)(`svg`,{width:e,height:e,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2.4,strokeLinecap:`round`,strokeLinejoin:`round`,children:(0,z.jsx)(`polyline`,{points:`9 18 15 12 9 6`})})}function Lr({size:e=13}){return(0,z.jsx)(`svg`,{width:e,height:e,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2.4,strokeLinecap:`round`,strokeLinejoin:`round`,children:(0,z.jsx)(`polyline`,{points:`18 15 12 9 6 15`})})}function Rr({size:e=13}){return(0,z.jsxs)(`svg`,{width:e,height:e,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,z.jsx)(`line`,{x1:`12`,y1:`5`,x2:`12`,y2:`19`}),(0,z.jsx)(`polyline`,{points:`19 12 12 19 5 12`})]})}function zr({size:e=13}){return(0,z.jsx)(`svg`,{width:e,height:e,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:3,strokeLinecap:`round`,strokeLinejoin:`round`,children:(0,z.jsx)(`polyline`,{points:`20 6 9 17 4 12`})})}function Br({size:e=14}){return(0,z.jsx)(`svg`,{width:e,height:e,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2.4,strokeLinecap:`round`,strokeLinejoin:`round`,children:(0,z.jsx)(`polyline`,{points:`6 9 12 15 18 9`})})}function Vr({name:e,size:t=18}){let n={width:t,height:t,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`},r={grid:(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(`rect`,{x:`3`,y:`3`,width:`7`,height:`7`,rx:`1.5`}),(0,z.jsx)(`rect`,{x:`14`,y:`3`,width:`7`,height:`7`,rx:`1.5`}),(0,z.jsx)(`rect`,{x:`3`,y:`14`,width:`7`,height:`7`,rx:`1.5`}),(0,z.jsx)(`rect`,{x:`14`,y:`14`,width:`7`,height:`7`,rx:`1.5`})]}),menu:(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(`line`,{x1:`4`,y1:`7`,x2:`20`,y2:`7`}),(0,z.jsx)(`line`,{x1:`4`,y1:`12`,x2:`20`,y2:`12`}),(0,z.jsx)(`line`,{x1:`4`,y1:`17`,x2:`20`,y2:`17`})]}),shield:(0,z.jsx)(`path`,{d:`M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z`}),db:(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(`ellipse`,{cx:`12`,cy:`5`,rx:`8`,ry:`3`}),(0,z.jsx)(`path`,{d:`M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5`}),(0,z.jsx)(`path`,{d:`M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6`})]}),user:(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(`circle`,{cx:`12`,cy:`8`,r:`4`}),(0,z.jsx)(`path`,{d:`M4 21c1.8-4 4.4-6 8-6s6.2 2 8 6`})]}),list:(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(`line`,{x1:`9`,y1:`6`,x2:`20`,y2:`6`}),(0,z.jsx)(`line`,{x1:`9`,y1:`12`,x2:`20`,y2:`12`}),(0,z.jsx)(`line`,{x1:`9`,y1:`18`,x2:`20`,y2:`18`}),(0,z.jsx)(`circle`,{cx:`4`,cy:`6`,r:`1`}),(0,z.jsx)(`circle`,{cx:`4`,cy:`12`,r:`1`}),(0,z.jsx)(`circle`,{cx:`4`,cy:`18`,r:`1`})]}),clock:(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(`circle`,{cx:`12`,cy:`12`,r:`9`}),(0,z.jsx)(`polyline`,{points:`12 7 12 12 16 14`})]}),report:(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(`path`,{d:`M6 3h9l3 3v15H6z`}),(0,z.jsx)(`path`,{d:`M14 3v4h4`}),(0,z.jsx)(`line`,{x1:`9`,y1:`13`,x2:`15`,y2:`13`}),(0,z.jsx)(`line`,{x1:`9`,y1:`17`,x2:`15`,y2:`17`})]}),gear:(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(`circle`,{cx:`12`,cy:`12`,r:`3`}),(0,z.jsx)(`path`,{d:`M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1-2.1 2.1-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V20h-3v-.2a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1-2.1-2.1.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H4v-3h.2a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1 2.1-2.1.1.1a1.6 1.6 0 0 0 1.8.3 1.6 1.6 0 0 0 1-1.5V4h3v.2a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1 2.1 2.1-.1.1a1.6 1.6 0 0 0-.3 1.8 1.6 1.6 0 0 0 1.5 1h.2v3h-.2a1.6 1.6 0 0 0-1.5 1Z`})]}),image:(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(`rect`,{x:`3`,y:`5`,width:`18`,height:`14`,rx:`2`}),(0,z.jsx)(`circle`,{cx:`8`,cy:`10`,r:`2`}),(0,z.jsx)(`path`,{d:`M21 16l-5-5L5 19`})]}),refresh:(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(`polyline`,{points:`20 6 20 12 14 12`}),(0,z.jsx)(`polyline`,{points:`4 18 4 12 10 12`}),(0,z.jsx)(`path`,{d:`M6.5 8a7 7 0 0 1 11.7-2L20 8`}),(0,z.jsx)(`path`,{d:`M17.5 16a7 7 0 0 1-11.7 2L4 16`})]}),x:(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(`line`,{x1:`18`,y1:`6`,x2:`6`,y2:`18`}),(0,z.jsx)(`line`,{x1:`6`,y1:`6`,x2:`18`,y2:`18`})]})};return(0,z.jsx)(`svg`,{...n,children:r[e]})}function Hr({value:e}){return(0,z.jsx)(`span`,{className:`dqc-badge ${tr[e]||`out-closed`}`,children:e})}function Ur({value:e}){return(0,z.jsx)(`span`,{className:`dqc-badge ${nr[e]||`out-open`}`,children:e})}function Wr(e,t){let n=t[e];return e===`Priority`&&n||e===`Severity`&&n?(0,z.jsx)(Hr,{value:lr(n)}):e===`Status`&&n&&nr[lr(n)]?(0,z.jsx)(Ur,{value:lr(n)}):e===`Missing Fields`&&n?(0,z.jsx)(`span`,{style:{display:`flex`,gap:5,flexWrap:`wrap`},children:String(n).split(`; `).map(e=>(0,z.jsx)(`span`,{className:`dqc-badge out-open`,style:{fontSize:10.5},children:e},e))}):lr(n)}function Gr(e,t){let n=lr(t);return e===`Brand`||e===`SKU`||e===`Field`?`dqc-cell-bold`:n.startsWith(`missing:`)?`dqc-cell-missing`:n===`NO missing`?`dqc-cell-ok`:n===`-`?`dqc-cell-muted`:sr.has(e)?`dqc-cell-num`:``}function Kr({label:e,children:t}){return(0,z.jsxs)(`div`,{className:`dqc-stat-card`,children:[(0,z.jsxs)(`div`,{className:`dqc-stat-head`,children:[e,` `,(0,z.jsx)(Mr,{size:13})]}),t]})}function qr(){let{notify:e}=qn(),[t,n]=(0,_.useState)(!1),[r,i]=(0,_.useState)(null),[a,o]=(0,_.useState)(null),s=(0,_.useRef)(null),[c,l]=(0,_.useState)(null),[u,d]=(0,_.useState)(`Overview`),[f,p]=(0,_.useState)({col:`Brand`,dir:`asc`}),[m,h]=(0,_.useState)(1),[g,v]=(0,_.useState)(10),[y,b]=(0,_.useState)(()=>Object.fromEntries(ir.map(e=>[e,ar.includes(e)]))),[x,S]=(0,_.useState)(()=>Object.fromEntries(or.map(e=>[e,!0]))),C=Object.entries(y).filter(([,e])=>e).map(([e])=>e);(0,_.useEffect)(()=>{if(!r||![`pending`,`running`].includes(r.status))return;let t=!1,n=window.setInterval(async()=>{try{let a=await cr(`/api/jobs/${r.id}`);if(t)return;i(a),a.status===`completed`?(window.clearInterval(n),e(`Data QC report ready`,{type:`success`}),w(a.id)):a.status===`failed`&&(window.clearInterval(n),o(a.error??`Job failed`),e(`Data QC job failed`,{type:`error`,message:a.error??void 0}))}catch{window.clearInterval(n)}},1200);return()=>{t=!0,window.clearInterval(n)}},[r?.id,r?.status]);let w=(0,_.useCallback)(async e=>{try{l((await cr(`/api/jobs/${e}/report-data`)).sheets),d(`Overview`),h(1)}catch(e){o(e instanceof Error?e.message:String(e))}},[]);async function ee(t){if(!C.length){o(`Select at least one STATUS before running DQC.`);return}n(!0),o(null),i(null),l(null);try{let n=new FormData;n.append(`file`,t),n.append(`chunk_size`,`5000`),n.append(`max_workers`,String(Math.min(4,navigator.hardwareConcurrency||2))),n.append(`keep_detail_rows`,`true`),n.append(`selected_statuses`,JSON.stringify(C)),e(`Running DQC for ${t.name}`,{type:`info`}),i(await cr(`/api/data-quality-control/jobs`,{method:`POST`,body:n}))}catch(t){let n=t instanceof Error?t.message:String(t);o(n),e(`Failed to start audit`,{type:`error`,message:n})}finally{n(!1),s.current&&(s.current.value=``)}}function T(){r?.id&&window.open(Yn(`/api/jobs/${encodeURIComponent(r.id)}/download`),`_blank`)}let E=dr(u,c),D=(0,_.useMemo)(()=>fr(u,E),[u,E]),te=(0,_.useMemo)(()=>pr(u,E),[u,E]),ne=(0,_.useMemo)(()=>D.filter(e=>{let t=e.Priority||e.Severity||ur(lr(e.Field??e[`Missing Field`]));return!(t&&x[t]===!1)}),[D,x]),re=(0,_.useMemo)(()=>[...ne].sort((e,t)=>{let n=f.col===`Priority`||f.col===`Severity`,r=n?er[lr(e[f.col])]??99:lr(e[f.col]).toLowerCase(),i=n?er[lr(t[f.col])]??99:lr(t[f.col]).toLowerCase(),a=f.dir===`asc`?1:-1;return r<i?-1*a:r>i?1*a:0}),[ne,f]),O=re.length,ie=Math.max(1,Math.ceil(O/g)),ae=Math.min(m,ie),oe=(ae-1)*g,k=re.slice(oe,oe+g);(0,_.useEffect)(()=>{h(1)},[u,g,x,f.col,f.dir,c]),(0,_.useEffect)(()=>{p({col:u===`Action Tracker`?`Priority`:u===`Validation Errors`?`Severity`:`Brand`,dir:`asc`})},[u]);let A=r?.summary??null;function se(e){b(t=>({...t,[e]:!t[e]}))}function ce(e){S(t=>({...t,[e]:!t[e]}))}function j(e){p(t=>({col:e,dir:t.col===e&&t.dir===`asc`?`desc`:`asc`}))}let le=r?.status===`pending`||r?.status===`running`;return(0,_.useEffect)(()=>{let e=()=>s.current?.click();return window.addEventListener(`aio:dqc:open-upload`,e),()=>window.removeEventListener(`aio:dqc:open-upload`,e)},[]),(0,z.jsxs)(`div`,{className:`view tool-view dqc-view`,children:[(0,z.jsxs)(`div`,{className:`view-header`,children:[(0,z.jsx)(`h1`,{children:`Data Quality Control`}),(0,z.jsxs)(`div`,{className:`view-header-actions`,children:[(0,z.jsx)(`button`,{className:`btn btn-secondary`,onClick:()=>s.current?.click(),children:`Upload Master Data`}),(0,z.jsx)(`button`,{className:`btn btn-primary`,onClick:()=>s.current?.click(),disabled:t||le,children:`Run Audit`})]})]}),(0,z.jsx)(`input`,{ref:s,type:`file`,accept:`.xlsx,.xlsm,.csv`,hidden:!0,onChange:e=>{let t=e.target.files?.[0];t&&ee(t)}}),(0,z.jsxs)(`section`,{className:`tool-card dqc-run-panel`,children:[(0,z.jsxs)(`div`,{className:`dqc-run-panel-left`,children:[(0,z.jsx)(`div`,{className:`dqc-section-title`,children:`Data Quality Control`}),(0,z.jsx)(`div`,{className:`dqc-sub`,children:r?`Job ${r.id} | ${r.status}`:`Upload master data and run DQC with the selected STATUS filter.`}),a&&(0,z.jsx)(`div`,{className:`dqc-error`,children:a})]}),(0,z.jsxs)(`button`,{className:`btn btn-primary`,onClick:()=>s.current?.click(),disabled:t||le,children:[(0,z.jsx)(Ar,{size:15}),` `,t||le?`Running...`:`Run DQC Audit`]}),(0,z.jsxs)(`button`,{className:`btn btn-success`,disabled:!r||r.status!==`completed`,onClick:T,children:[(0,z.jsx)(jr,{size:15}),` Download Report`]})]}),(0,z.jsxs)(`div`,{className:`dqc-stat-grid`,children:[(0,z.jsxs)(Kr,{label:`Brands Audited`,children:[(0,z.jsx)(`div`,{className:`dqc-stat-val green`,children:A?String(A.brand_count??0):`-`}),(0,z.jsx)(`div`,{className:`dqc-stat-sub`,children:`from current run`})]}),(0,z.jsxs)(Kr,{label:`Critical Actions`,children:[(0,z.jsx)(`div`,{className:`dqc-stat-val red`,children:A?String(A.critical_actions??0):`-`}),(0,z.jsx)(`div`,{className:`dqc-stat-sub`,children:`priority rows`})]}),(0,z.jsxs)(Kr,{label:`Validation Errors`,children:[(0,z.jsx)(`div`,{className:`dqc-stat-val red`,children:A?String(A.validation_error_count??0):`-`}),(0,z.jsx)(`div`,{className:`dqc-stat-sub`,children:`rule violations`})]}),(0,z.jsxs)(Kr,{label:`Included Rows`,children:[(0,z.jsxs)(`div`,{className:`dqc-stat-date`,children:[(0,z.jsx)(Nr,{size:16}),` `,A?`${A.included_rows}/${A.total_rows}`:`-`]}),(0,z.jsx)(`div`,{className:`dqc-stat-sub`,children:`selected status / total rows`})]})]}),(0,z.jsxs)(`div`,{className:`dqc-grid`,children:[(0,z.jsxs)(`div`,{className:`tool-card dqc-table-card`,children:[(0,z.jsx)(`div`,{className:`dqc-tabs`,children:rr.map(e=>(0,z.jsx)(`button`,{className:`dqc-tab${u===e?` active`:``}`,onClick:()=>d(e),children:e},e))}),(0,z.jsx)(`div`,{style:{overflowX:`auto`},children:(0,z.jsxs)(`table`,{className:`dqc-tbl`,children:[(0,z.jsx)(`thead`,{children:(0,z.jsx)(`tr`,{children:(te.length?te:[`NO DATA`]).map(e=>(0,z.jsx)(`th`,{className:`dqc-sortable`,onClick:()=>te.length>0&&j(e),children:(0,z.jsxs)(`span`,{className:`dqc-th-in`,style:{color:f.col===e?`var(--red, #ef4444)`:void 0},children:[e,te.length>0&&(f.col===e&&f.dir===`asc`?(0,z.jsx)(Lr,{size:13}):(0,z.jsx)(Rr,{size:13}))]})},e))})}),(0,z.jsxs)(`tbody`,{children:[k.map((e,t)=>(0,z.jsx)(`tr`,{children:te.map(t=>(0,z.jsx)(`td`,{className:Gr(t,e[t]),children:Wr(t,e)},t))},t)),k.length===0&&(0,z.jsx)(`tr`,{children:(0,z.jsx)(`td`,{colSpan:Math.max(te.length,1),style:{textAlign:`center`,color:`var(--text-muted)`,padding:40},children:t||le?`Audit is running...`:`No live DQC data loaded. Run an audit to populate this tab.`})})]})]})}),(0,z.jsxs)(`div`,{className:`dqc-pager`,children:[(0,z.jsx)(`div`,{className:`dqc-pager-info`,children:O===0?`No entries`:`Showing ${oe+1} to ${Math.min(oe+g,O)} of ${O} entries`}),(0,z.jsxs)(`div`,{className:`dqc-pg-nums`,children:[(0,z.jsx)(`button`,{className:`dqc-pg dqc-pg-arrow`,disabled:ae===1,onClick:()=>h(e=>Math.max(1,e-1)),children:(0,z.jsx)(Fr,{size:15})}),(0,z.jsx)(`button`,{className:`dqc-pg dqc-pg-active`,children:ae}),(0,z.jsx)(`button`,{className:`dqc-pg dqc-pg-arrow`,disabled:ae===ie,onClick:()=>h(e=>Math.min(ie,e+1)),children:(0,z.jsx)(Ir,{size:15})})]}),(0,z.jsxs)(`div`,{className:`dqc-select-wrap`,children:[(0,z.jsx)(`select`,{value:g,onChange:e=>v(+e.target.value),children:[10,25,50,100].map(e=>(0,z.jsxs)(`option`,{value:e,children:[e,` / page`]},e))}),(0,z.jsx)(`span`,{className:`dqc-chev`,children:(0,z.jsx)(Br,{size:14})})]})]})]}),(0,z.jsxs)(`aside`,{className:`tool-card dqc-filter-panel`,children:[(0,z.jsx)(`div`,{className:`dqc-rules-h`,children:`Run Filters`}),(0,z.jsx)(`div`,{className:`dqc-subhead`,children:`Master Data STATUS`}),ir.map(e=>(0,z.jsxs)(`label`,{className:`dqc-chk${y[e]?` on`:``}`,onClick:()=>se(e),children:[(0,z.jsx)(`span`,{className:`dqc-box`,children:(0,z.jsx)(zr,{size:13})}),e]},e)),(0,z.jsx)(`div`,{className:`dqc-subhead`,children:`Priority Filter`}),or.map(e=>(0,z.jsxs)(`label`,{className:`dqc-chk${x[e]?` on`:``}`,onClick:()=>ce(e),children:[(0,z.jsx)(`span`,{className:`dqc-box`,children:(0,z.jsx)(zr,{size:13})}),e]},e)),(0,z.jsx)(`div`,{className:`dqc-filter-note`,children:`Included statuses are sent to the backend before Excel parsing and missing-data counting.`})]})]}),(0,z.jsxs)(`section`,{className:`tool-card dqc-download-section`,children:[(0,z.jsx)(`div`,{className:`dqc-rules-h`,style:{marginBottom:14},children:`Download Current View`}),(0,z.jsxs)(`div`,{className:`dqc-dl-row`,children:[(0,z.jsx)(`div`,{className:`dqc-file-ico`,children:(0,z.jsx)(Pr,{size:20})}),(0,z.jsxs)(`div`,{style:{flex:1,minWidth:0},children:[(0,z.jsxs)(`div`,{style:{fontWeight:600,fontSize:13.5},children:[u.replace(/ /g,`_`),`_`,O,`_rows.csv`]}),(0,z.jsxs)(`div`,{style:{fontSize:12.5,color:`var(--text-muted)`},children:[O,` filtered entries from the current report sheet`]})]}),(0,z.jsxs)(`button`,{className:`btn btn-success btn-sm`,disabled:!te.length,onClick:()=>{kr(`${u.replace(/ /g,`_`)}_export.csv`,te,re),e(`Exported ${O} rows to CSV`,{type:`success`})},children:[(0,z.jsx)(jr,{size:15}),` Download`]})]})]}),(0,z.jsx)(`style`,{children:`
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
      `})]})}var Jr=[{label:`Custom`,w:0,h:0},{label:`Marketplace Square 800`,w:800,h:800},{label:`Marketplace Square 1000`,w:1e3,h:1e3},{label:`Marketplace Square 1200`,w:1200,h:1200},{label:`Marketplace Square 1500`,w:1500,h:1500},{label:`Amazon Main 2000`,w:2e3,h:2e3},{label:`Shopify 2048`,w:2048,h:2048},{label:`Web Banner 1920x1080`,w:1920,h:1080},{label:`Print A4 2480x3508`,w:2480,h:3508}],Yr=[`1. Read source`,`2. Crop`,`3. AI upscale`,`4. Fit to dimension`,`5. Margin/DPI`,`6. Rename/export`],Xr={ai_expand:`AI Expand uses a generative model and may produce unexpected results on complex backgrounds.`,blur_cover:`Blur cover works best on images with a single dominant subject.`,edge_extend:`Edge extension may create visible artifacts on images with complex borders.`},Zr={ai_canvas_expand:`AI Canvas Expand requires a compatible GPU and may be slow on large batches.`},B={inputFolder:``,outputFolder:``,includeSubfolders:!1,preserveStructure:!1,outputMode:`zip`,preset:`Custom`,width:1e3,height:1e3,lockAspect:!0,fitMode:`contain`,marginMode:`default`,marginUnit:`px`,marginL:0,marginT:0,marginR:0,marginB:0,marginBeforeFit:!1,dpi:72,layoutPreset:`manual`,canvasBg:`white`,autoComposeStyle:`centered`,aiExpandPrompt:``,upscaleMode:`none`,standardUpscale:`pillow_lanczos`,clarityEnhance:`auto`,esrganModel:`realesrgan-x4plus`,esrganScale:4,esrganCpuFallback:!1,removeWhiteSpace:!1,autoProductFill:!1,fillRatio:.85,safePadding:!1,requireWhiteBg:!1,rejectPeopleHands:!1,removeSoftShadow:!1,removeBgRembg:!1,bgRemovalMode:`border_white`,maxWorkers:4,outputFormat:`jpg`,quality:92,maxFileSize:0,namingRule:`keep_original`,customTemplate:`{name}_{index}`},Qr=0;function $r(e,t){return{id:++Qr,timestamp:new Date().toLocaleTimeString(`en-GB`,{hour12:!1}),level:e,message:t}}function ei(e){switch(e){case`SUCCESS`:return`var(--green)`;case`WARN`:return`var(--yellow)`;case`ERROR`:return`var(--red)`;default:return`var(--blue)`}}function ti(e,t){switch(e){case`keep_original`:return`photo_001.jpg`;case`sequential`:return`001.jpg, 002.jpg, ...`;case`ean_prefix`:return`4006381_001.jpg`;case`custom_template`:return t.replace(`{name}`,`photo`).replace(`{index}`,`001`).replace(`{ean}`,`4006381`).replace(`{w}`,`1000`).replace(`{h}`,`1000`)+`.jpg`;default:return``}}function ni(e){return e===`local`?`local_folder`:`zip`}function ri(e,t){switch(e){case`keep_original`:return`{original_stem}`;case`sequential`:return`{index:03d}`;case`ean_prefix`:return`{ean}_{index:03d}`;case`custom_template`:return t||`{name}_{index}`;default:return`{original_stem}`}}function V({label:e,children:t,inline:n}){return(0,z.jsxs)(`label`,{className:`tool-field ${n?`ie-field-inline`:``}`,children:[(0,z.jsx)(`span`,{children:e}),t]})}function ii({value:e,options:t,onChange:n}){return(0,z.jsx)(`div`,{className:`segmented`,children:t.map(t=>(0,z.jsx)(`button`,{className:e===t.value?`active`:``,onClick:()=>n(t.value),children:t.label},t.value))})}function ai({value:e,min:t,max:n,onChange:r}){return(0,z.jsxs)(`div`,{className:`ie-stepper`,children:[(0,z.jsx)(`button`,{className:`btn btn-secondary btn-sm`,onClick:()=>r(Math.max(t,e-1)),disabled:e<=t,children:`-`}),(0,z.jsx)(`span`,{className:`ie-stepper-value`,children:e}),(0,z.jsx)(`button`,{className:`btn btn-secondary btn-sm`,onClick:()=>r(Math.min(n,e+1)),disabled:e>=n,children:`+`})]})}function oi(){let{notify:e}=qn(),[t,n]=(0,_.useState)(B.inputFolder),[r,i]=(0,_.useState)(B.outputFolder),[a,o]=(0,_.useState)([]),[s,c]=(0,_.useState)(B.includeSubfolders),[l,u]=(0,_.useState)(B.preserveStructure),[d,f]=(0,_.useState)(B.outputMode),[p,m]=(0,_.useState)(B.preset),[h,g]=(0,_.useState)(B.width),[v,y]=(0,_.useState)(B.height),[b,x]=(0,_.useState)(B.lockAspect),[S,C]=(0,_.useState)(B.fitMode),[w,ee]=(0,_.useState)(B.marginMode),[T,E]=(0,_.useState)(B.marginUnit),[D,te]=(0,_.useState)(B.marginL),[ne,re]=(0,_.useState)(B.marginT),[O,ie]=(0,_.useState)(B.marginR),[ae,oe]=(0,_.useState)(B.marginB),[k,A]=(0,_.useState)(B.marginBeforeFit),[se,ce]=(0,_.useState)(B.dpi),[j,le]=(0,_.useState)(B.layoutPreset),[M,N]=(0,_.useState)(B.canvasBg),[ue,de]=(0,_.useState)(B.autoComposeStyle),[P,fe]=(0,_.useState)(B.aiExpandPrompt),[F,pe]=(0,_.useState)(B.upscaleMode),[me,he]=(0,_.useState)(B.standardUpscale),[ge,_e]=(0,_.useState)(B.clarityEnhance),[ve,ye]=(0,_.useState)(B.esrganModel),[be,xe]=(0,_.useState)(B.esrganScale),[Se,Ce]=(0,_.useState)(B.esrganCpuFallback),[we,Te]=(0,_.useState)(B.removeWhiteSpace),[Ee,De]=(0,_.useState)(B.autoProductFill),[I,Oe]=(0,_.useState)(B.fillRatio),[ke,Ae]=(0,_.useState)(B.safePadding),[je,Me]=(0,_.useState)(B.requireWhiteBg),[Ne,Pe]=(0,_.useState)(B.rejectPeopleHands),[Fe,Ie]=(0,_.useState)(B.removeSoftShadow),[Le,Re]=(0,_.useState)(B.removeBgRembg),[L,ze]=(0,_.useState)(B.bgRemovalMode),[Be,Ve]=(0,_.useState)(B.maxWorkers),[He,Ue]=(0,_.useState)(B.outputFormat),[We,R]=(0,_.useState)(B.quality),[Ge,Ke]=(0,_.useState)(B.maxFileSize),[qe,Je]=(0,_.useState)(B.namingRule),[Ye,Xe]=(0,_.useState)(B.customTemplate),[Ze,Qe]=(0,_.useState)(!1),[$e,et]=(0,_.useState)(null),[tt,nt]=(0,_.useState)([]),[rt,it]=(0,_.useState)(null),[at,ot]=(0,_.useState)([]),st=(0,_.useRef)(null),ct=(0,_.useRef)(null),lt=$n($e,t=>{ut(t.status===`completed`?`SUCCESS`:`ERROR`,t.status===`completed`?`Processing complete`:`Job failed: ${t.error||`unknown error`}`),e(t.status===`completed`?`Image edit output ready`:`Image edit failed`,{type:t.status===`completed`?`success`:`error`,message:t.error||t.output_path||void 0})}),ut=(0,_.useCallback)((e,t)=>{ot(n=>[...n,$r(e,t)].slice(-500))},[]);(0,_.useEffect)(()=>{st.current&&(st.current.scrollTop=st.current.scrollHeight)},[at]);function dt(e){m(e);let t=Jr.find(t=>t.label===e);t&&t.w>0&&(g(t.w),y(t.h))}function ft(e){g(e),b&&v>0&&y(e),m(`Custom`)}function pt(e){y(e),b&&h>0&&g(e),m(`Custom`)}function mt(e){if(!e)return;let t=Array.from(e);o(e=>[...e,...t]),ut(`INFO`,`Added ${t.length} file(s)`)}function ht(e){nt(t=>t.filter(t=>t.id!==e))}function gt(){let e=w===`custom`?Math.max(D,ne,O,ae):0,t=ke?8:0,n=Math.round(I*100),r=Le||L===`rembg`||L===`sam2`;return{width:h,height:v,fit_mode:S,layout_preset:j,canvas_background_mode:M,auto_compose_style:j===`auto_compose`?ue:`balanced`,ai_canvas_expand_enabled:j===`ai_canvas_expand`||M===`ai_expand`,ai_canvas_expand_provider:`comfyui`,ai_canvas_expand_prompt:j===`ai_canvas_expand`||M===`ai_expand`?P||`clean commercial product photo background, consistent lighting`:``,margin:e,margin_mode:T===`%`?`percent`:`pixels`,dpi:se,upscale_mode:F,standard_upscale_method:me,clarity_enhance:ge,upscale_model:ve,upscale_scale:be,upscale_cpu_fallback:Se,crop_to_content:we,remove_white_space_around_product:we,auto_product_fill:Ee,fill_ratio:Ee?I:.88,safe_padding:t,product_fill_enabled:Ee,product_fill_ratio:n,product_safe_padding:t,normalize_product_size:Ee,product_target_occupancy:Ee?I:.88,require_white_bg:je,require_white_background:je,reject_people_hands:Ne,reject_human_parts:Ne,remove_shadow:Fe,remove_background:r,background_removal_mode:r?L:`border_white`,manual_transform_enabled:j===`canva_manual`,max_workers:Be,output_format:He,output_quality:We,max_file_size_mb:Ge>0?Ge:0,naming_rule:ri(qe,Ye),include_subfolders:s,preserve_folder_structure:l,output_mode:ni(d)}}function _t(){n(B.inputFolder),i(B.outputFolder),o([]),c(B.includeSubfolders),u(B.preserveStructure),f(B.outputMode),m(B.preset),g(B.width),y(B.height),x(B.lockAspect),C(B.fitMode),ee(B.marginMode),E(B.marginUnit),te(B.marginL),re(B.marginT),ie(B.marginR),oe(B.marginB),A(B.marginBeforeFit),ce(B.dpi),le(B.layoutPreset),N(B.canvasBg),de(B.autoComposeStyle),fe(B.aiExpandPrompt),pe(B.upscaleMode),he(B.standardUpscale),_e(B.clarityEnhance),ye(B.esrganModel),xe(B.esrganScale),Ce(B.esrganCpuFallback),Te(B.removeWhiteSpace),De(B.autoProductFill),Oe(B.fillRatio),Ae(B.safePadding),Me(B.requireWhiteBg),Pe(B.rejectPeopleHands),Ie(B.removeSoftShadow),Re(B.removeBgRembg),ze(B.bgRemovalMode),Ve(B.maxWorkers),Ue(B.outputFormat),R(B.quality),Ke(B.maxFileSize),Je(B.namingRule),Xe(B.customTemplate),nt([]),it(null),ut(`INFO`,`All settings reset to defaults`)}async function vt(){let t=a[0];if(!t){e(`Add at least one image to preview`,{type:`warning`});return}ut(`INFO`,`Previewing: ${t.name}`),Qe(!0);try{let e=new FormData;e.append(`file`,t);let n=gt();for(let[t,r]of Object.entries(n))r!==void 0&&e.append(t,String(r));let r=await fetch(Yn(`/api/image-edit/preview`),{method:`POST`,body:e}).then(e=>{if(!e.ok)throw Error(e.statusText);return e.blob()}),i=URL.createObjectURL(r);it(e=>(e&&URL.revokeObjectURL(e),i)),ut(`SUCCESS`,`Preview generated`)}catch(t){ut(`ERROR`,`Preview failed: ${t instanceof Error?t.message:String(t)}`),e(`Preview failed`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{Qe(!1)}}async function yt(){let n=gt();Qe(!0),ut(`INFO`,`Starting processing job...`);try{let i;if(a.length>0){let e=new FormData;a.forEach(t=>e.append(`files`,t));for(let[t,r]of Object.entries(n))r!==void 0&&e.append(t,String(r));i=await Xn(`/api/image-edit/jobs`,{method:`POST`,body:e})}else if(t)i=await Xn(`/api/image-edit/folder-jobs`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({input_folder_path:t,output_folder_path:r||null,output_mode:ni(d),...n})});else throw Error(`Choose files or an input folder first.`);et(i);let o=a.map((e,t)=>({id:`${i.id}-${t}`,file:e,name:e.name,thumbnail:e.type.startsWith(`image/`)?URL.createObjectURL(e):void 0,dimensions:``,progress:0,status:`pending`}));o.length>0&&nt(o),ut(`SUCCESS`,`Job started: ${i.id}`),e(`Image edit job started`,{type:`info`,message:i.id})}catch(t){ut(`ERROR`,`Failed to start: ${t instanceof Error?t.message:String(t)}`),e(`Image edit job failed to start`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{Qe(!1)}}let bt=a.length,xt=a.length>0||t.length>0,St=j===`ai_canvas_expand`||M===`ai_expand`,Ct=Xr[M]||Zr[j]||``;return(0,_.useEffect)(()=>{let e=lt?.summary,t=Array.isArray(e?.items)?e.items:[];!lt||t.length===0||nt(t.map((e,t)=>{let n=e,r=String(n.item_id||`${lt.id}-${t+1}`),i=String(n.status||lt.status),a=Math.max(0,Math.min(100,Number(n.progress_percent??(i===`completed`?100:0)))),o=n.width?Number(n.width):null,s=n.height?Number(n.height):null,c=`${i}-${String(n.finished_at_ms||n.progress_percent||a)}`;return{id:r,name:String(n.output_filename||n.original_filename||n.relative_path||`image-${t+1}`),thumbnail:Yn(`/api/jobs/${encodeURIComponent(lt.id)}/items/${encodeURIComponent(r)}/thumbnail?kind=auto&v=${encodeURIComponent(c)}`),dimensions:o&&s?`${o} x ${s}`:``,progress:a,status:i===`completed`?`completed`:i===`failed`||i===`skipped`?`failed`:i===`running`||lt.status===`running`?`running`:`pending`,elapsed:n.elapsed_seconds?`${Math.round(Number(n.elapsed_seconds))}s`:void 0,eta:n.eta_seconds?`${Math.round(Number(n.eta_seconds))}s`:void 0}}))},[lt?.id,lt?.status,lt?.summary]),(0,z.jsxs)(`div`,{className:`view tool-view ie-root`,children:[(0,z.jsxs)(`div`,{className:`view-header`,children:[(0,z.jsx)(`h1`,{children:`Image Edit`}),(0,z.jsx)(`div`,{className:`view-header-actions`,children:(0,z.jsxs)(`span`,{className:`status-online`,children:[(0,z.jsx)(`span`,{className:`dot`}),Qn(lt)||`Ready`]})})]}),(0,z.jsxs)(`div`,{className:`ie-columns`,children:[(0,z.jsxs)(`section`,{className:`tool-card ie-left`,children:[(0,z.jsx)(`h2`,{children:`Input`}),(0,z.jsx)(V,{label:`Input folder`,children:(0,z.jsxs)(`div`,{className:`path-picker`,children:[(0,z.jsx)(`input`,{value:t,onChange:e=>n(e.target.value),placeholder:`Path to image folder`}),(0,z.jsx)(`button`,{className:`btn btn-secondary btn-sm`,onClick:async()=>n(await Zn(`Select image input folder`,t)),children:`Browse`})]})}),(0,z.jsx)(V,{label:`Output folder`,children:(0,z.jsxs)(`div`,{className:`path-picker`,children:[(0,z.jsx)(`input`,{value:r,onChange:e=>i(e.target.value),placeholder:`Optional output path`}),(0,z.jsx)(`button`,{className:`btn btn-secondary btn-sm`,onClick:async()=>i(await Zn(`Select image output folder`,r)),children:`Browse`})]})}),(0,z.jsx)(`input`,{ref:ct,type:`file`,multiple:!0,accept:`.jpg,.jpeg,.png,.webp,.tif,.tiff,.bmp,.avif,.zip`,style:{display:`none`},onChange:e=>mt(e.target.files)}),(0,z.jsxs)(`button`,{className:`btn btn-secondary ie-add-btn`,onClick:()=>ct.current?.click(),children:[(0,z.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,width:`16`,height:`16`,children:[(0,z.jsx)(`line`,{x1:`12`,y1:`5`,x2:`12`,y2:`19`}),(0,z.jsx)(`line`,{x1:`5`,y1:`12`,x2:`19`,y2:`12`})]}),`Add`]}),(0,z.jsxs)(`div`,{className:`ie-source-card`,children:[(0,z.jsx)(`strong`,{children:`Source`}),(0,z.jsxs)(`span`,{children:[bt,` file`,bt===1?``:`s`,` selected`]}),a.length>0&&(0,z.jsxs)(`div`,{className:`ie-file-list`,children:[a.slice(0,8).map((e,t)=>(0,z.jsxs)(`div`,{className:`ie-file-tag`,children:[(0,z.jsx)(`span`,{title:e.name,children:e.name}),(0,z.jsx)(`button`,{onClick:()=>o(e=>e.filter((e,n)=>n!==t)),children:`x`})]},`${e.name}-${t}`)),a.length>8&&(0,z.jsxs)(`span`,{className:`muted`,children:[`+`,a.length-8,` more`]})]})]}),(0,z.jsxs)(`label`,{className:`check-row`,children:[(0,z.jsx)(`input`,{type:`checkbox`,checked:s,onChange:e=>c(e.target.checked)}),`Include subfolders`]}),(0,z.jsxs)(`label`,{className:`check-row`,children:[(0,z.jsx)(`input`,{type:`checkbox`,checked:l,onChange:e=>u(e.target.checked)}),`Preserve folder structure`]}),(0,z.jsx)(V,{label:`Output mode`,children:(0,z.jsx)(ii,{value:d,options:[{label:`Local`,value:`local`},{label:`ZIP`,value:`zip`}],onChange:f})})]}),(0,z.jsxs)(`section`,{className:`tool-card ie-middle`,children:[(0,z.jsx)(`h2`,{children:`Processing`}),(0,z.jsx)(`div`,{className:`ie-pipeline`,children:Yr.map((e,t)=>(0,z.jsx)(`span`,{className:`ie-pipeline-step`,children:e},t))}),(0,z.jsxs)(`div`,{className:`ie-scroll-area`,children:[(0,z.jsx)(V,{label:`Dimension Preset`,children:(0,z.jsx)(`select`,{value:p,onChange:e=>dt(e.target.value),children:Jr.map(e=>(0,z.jsx)(`option`,{value:e.label,children:e.label},e.label))})}),(0,z.jsxs)(`div`,{className:`ie-dim-row`,children:[(0,z.jsx)(V,{label:`Width`,children:(0,z.jsx)(`input`,{type:`number`,min:1,value:h,onChange:e=>ft(Number(e.target.value))})}),(0,z.jsx)(`button`,{className:`btn btn-sm ie-lock-btn ${b?`active`:``}`,title:b?`Unlock aspect ratio`:`Lock aspect ratio`,onClick:()=>x(!b),children:(0,z.jsx)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,width:`16`,height:`16`,children:b?(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(`rect`,{x:`3`,y:`11`,width:`18`,height:`11`,rx:`2`}),(0,z.jsx)(`path`,{d:`M7 11V7a5 5 0 0110 0v4`})]}):(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(`rect`,{x:`3`,y:`11`,width:`18`,height:`11`,rx:`2`}),(0,z.jsx)(`path`,{d:`M7 11V7a5 5 0 019.9-1`})]})})}),(0,z.jsx)(V,{label:`Height`,children:(0,z.jsx)(`input`,{type:`number`,min:1,value:v,onChange:e=>pt(Number(e.target.value))})})]}),(0,z.jsx)(V,{label:`Fit Mode`,children:(0,z.jsx)(ii,{value:S,options:[{label:`Contain`,value:`contain`},{label:`Cover`,value:`cover`},{label:`Stretch`,value:`stretch`}],onChange:C})}),(0,z.jsx)(`div`,{className:`ie-section-label`,children:`Margins`}),(0,z.jsxs)(`div`,{className:`tool-row`,children:[(0,z.jsx)(V,{label:`Mode`,children:(0,z.jsxs)(`select`,{value:w,onChange:e=>ee(e.target.value),children:[(0,z.jsx)(`option`,{value:`default`,children:`Default`}),(0,z.jsx)(`option`,{value:`custom`,children:`Custom`})]})}),(0,z.jsx)(V,{label:`Unit`,children:(0,z.jsx)(ii,{value:T,options:[{label:`px`,value:`px`},{label:`%`,value:`%`}],onChange:E})})]}),w===`custom`&&(0,z.jsxs)(`div`,{className:`ie-margin-grid`,children:[(0,z.jsx)(V,{label:`L`,children:(0,z.jsx)(`input`,{type:`number`,min:0,value:D,onChange:e=>te(Number(e.target.value))})}),(0,z.jsx)(V,{label:`T`,children:(0,z.jsx)(`input`,{type:`number`,min:0,value:ne,onChange:e=>re(Number(e.target.value))})}),(0,z.jsx)(V,{label:`R`,children:(0,z.jsx)(`input`,{type:`number`,min:0,value:O,onChange:e=>ie(Number(e.target.value))})}),(0,z.jsx)(V,{label:`B`,children:(0,z.jsx)(`input`,{type:`number`,min:0,value:ae,onChange:e=>oe(Number(e.target.value))})})]}),(0,z.jsxs)(`label`,{className:`check-row`,children:[(0,z.jsx)(`input`,{type:`checkbox`,checked:k,onChange:e=>A(e.target.checked)}),`Apply margin before fit`]}),(0,z.jsx)(V,{label:`DPI`,children:(0,z.jsx)(`input`,{type:`number`,min:1,max:1200,value:se,onChange:e=>ce(Number(e.target.value))})}),(0,z.jsx)(V,{label:`Layout Preset`,children:(0,z.jsxs)(`select`,{value:j,onChange:e=>le(e.target.value),children:[(0,z.jsx)(`option`,{value:`manual`,children:`Manual`}),(0,z.jsx)(`option`,{value:`canva_fill`,children:`Canva Fill`}),(0,z.jsx)(`option`,{value:`object_aware_canvas`,children:`Object-aware canvas`}),(0,z.jsx)(`option`,{value:`canva_manual`,children:`Canva Manual`}),(0,z.jsx)(`option`,{value:`auto_compose`,children:`Auto Compose`}),(0,z.jsx)(`option`,{value:`ai_canvas_expand`,children:`AI Canvas Expand`})]})}),(0,z.jsx)(V,{label:`Canvas Background`,children:(0,z.jsxs)(`select`,{value:M,onChange:e=>N(e.target.value),children:[(0,z.jsx)(`option`,{value:`white`,children:`White`}),(0,z.jsx)(`option`,{value:`smart`,children:`Smart Auto`}),(0,z.jsx)(`option`,{value:`edge_extend`,children:`Extend edges`}),(0,z.jsx)(`option`,{value:`blur_cover`,children:`Blur cover`}),(0,z.jsx)(`option`,{value:`ai_expand`,children:`AI Expand`})]})}),Ct&&(0,z.jsx)(`div`,{className:`ie-warning`,children:Ct}),j===`auto_compose`&&(0,z.jsx)(V,{label:`Auto Compose Style`,children:(0,z.jsxs)(`select`,{value:ue,onChange:e=>de(e.target.value),children:[(0,z.jsx)(`option`,{value:`centered`,children:`Centered`}),(0,z.jsx)(`option`,{value:`rule_of_thirds`,children:`Rule of Thirds`}),(0,z.jsx)(`option`,{value:`product_hero`,children:`Product Hero`}),(0,z.jsx)(`option`,{value:`lifestyle`,children:`Lifestyle`})]})}),St&&(0,z.jsx)(V,{label:`AI Expand Prompt`,children:(0,z.jsx)(`input`,{value:P,onChange:e=>fe(e.target.value),placeholder:`Describe desired background...`})}),(0,z.jsx)(`div`,{className:`ie-section-label`,children:`AI Upscale`}),(0,z.jsx)(V,{label:`Upscale Engine`,children:(0,z.jsxs)(`select`,{value:F,onChange:e=>pe(e.target.value),children:[(0,z.jsx)(`option`,{value:`none`,children:`None`}),(0,z.jsx)(`option`,{value:`real_esrgan_ncnn`,children:`Real-ESRGAN (NCNN)`})]})}),F===`none`?(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(V,{label:`Standard Upscale`,children:(0,z.jsxs)(`select`,{value:me,onChange:e=>he(e.target.value),children:[(0,z.jsx)(`option`,{value:`pillow_lanczos`,children:`Pillow Lanczos`}),(0,z.jsx)(`option`,{value:`pillow_bicubic`,children:`Pillow Bicubic`}),(0,z.jsx)(`option`,{value:`opencv_lanczos4`,children:`OpenCV Lanczos4`}),(0,z.jsx)(`option`,{value:`opencv_cubic`,children:`OpenCV Cubic`})]})}),(0,z.jsx)(V,{label:`Clarity Enhance`,children:(0,z.jsxs)(`select`,{value:ge,onChange:e=>_e(e.target.value),children:[(0,z.jsx)(`option`,{value:`auto`,children:`Auto`}),(0,z.jsx)(`option`,{value:`none`,children:`None`}),(0,z.jsx)(`option`,{value:`light`,children:`Light`}),(0,z.jsx)(`option`,{value:`medium`,children:`Medium`}),(0,z.jsx)(`option`,{value:`strong`,children:`Strong`})]})})]}):(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(V,{label:`Model`,children:(0,z.jsxs)(`select`,{value:ve,onChange:e=>ye(e.target.value),children:[(0,z.jsx)(`option`,{value:`realesrgan-x4plus`,children:`realesrgan-x4plus`}),(0,z.jsx)(`option`,{value:`realesrgan-x4plus-anime`,children:`realesrgan-x4plus-anime`}),(0,z.jsx)(`option`,{value:`realesr-animevideov3`,children:`realesr-animevideov3`})]})}),(0,z.jsx)(V,{label:`Scale`,children:(0,z.jsx)(ii,{value:String(be),options:[{label:`2x`,value:`2`},{label:`3x`,value:`3`},{label:`4x`,value:`4`}],onChange:e=>xe(Number(e))})}),(0,z.jsxs)(`label`,{className:`check-row`,children:[(0,z.jsx)(`input`,{type:`checkbox`,checked:Se,onChange:e=>Ce(e.target.checked)}),`CPU Fallback`]})]}),(0,z.jsx)(`div`,{className:`ie-section-label`,children:`Image Filters`}),(0,z.jsxs)(`div`,{className:`ie-filter-grid`,children:[(0,z.jsxs)(`label`,{className:`check-row`,children:[(0,z.jsx)(`input`,{type:`checkbox`,checked:we,onChange:e=>Te(e.target.checked)}),`Remove white space`]}),(0,z.jsxs)(`label`,{className:`check-row`,children:[(0,z.jsx)(`input`,{type:`checkbox`,checked:Ee,onChange:e=>De(e.target.checked)}),`Auto product fill`]}),Ee&&(0,z.jsx)(V,{label:`Fill ratio: ${Math.round(I*100)}%`,children:(0,z.jsx)(`input`,{type:`range`,min:.3,max:1,step:.01,value:I,onChange:e=>Oe(Number(e.target.value)),className:`ie-slider`})}),(0,z.jsxs)(`label`,{className:`check-row`,children:[(0,z.jsx)(`input`,{type:`checkbox`,checked:ke,onChange:e=>Ae(e.target.checked)}),`Safe padding`]}),(0,z.jsxs)(`label`,{className:`check-row`,children:[(0,z.jsx)(`input`,{type:`checkbox`,checked:je,onChange:e=>Me(e.target.checked)}),`Require white background`]}),(0,z.jsxs)(`label`,{className:`check-row`,children:[(0,z.jsx)(`input`,{type:`checkbox`,checked:Ne,onChange:e=>Pe(e.target.checked)}),`Reject people/hands`]}),(0,z.jsxs)(`label`,{className:`check-row`,children:[(0,z.jsx)(`input`,{type:`checkbox`,checked:Fe,onChange:e=>Ie(e.target.checked)}),`Remove soft shadow`]}),(0,z.jsxs)(`label`,{className:`check-row`,children:[(0,z.jsx)(`input`,{type:`checkbox`,checked:Le,onChange:e=>Re(e.target.checked)}),`Remove background (rembg)`]}),Le&&(0,z.jsx)(V,{label:`BG Mode`,children:(0,z.jsxs)(`select`,{value:L,onChange:e=>ze(e.target.value),children:[(0,z.jsx)(`option`,{value:`border_white`,children:`Border white`}),(0,z.jsx)(`option`,{value:`rembg`,children:`rembg`}),(0,z.jsx)(`option`,{value:`sam2`,children:`SAM2`})]})})]}),(0,z.jsx)(V,{label:`Max Workers`,children:(0,z.jsx)(ai,{value:Be,min:1,max:16,onChange:Ve})}),(0,z.jsx)(`div`,{className:`ie-section-label`,children:`Output`}),(0,z.jsxs)(`div`,{className:`tool-row`,children:[(0,z.jsx)(V,{label:`Format`,children:(0,z.jsxs)(`select`,{value:He,onChange:e=>Ue(e.target.value),children:[(0,z.jsx)(`option`,{value:`jpg`,children:`JPG`}),(0,z.jsx)(`option`,{value:`png`,children:`PNG`}),(0,z.jsx)(`option`,{value:`webp`,children:`WEBP`}),(0,z.jsx)(`option`,{value:`tiff`,children:`TIFF`})]})}),(0,z.jsx)(V,{label:`Quality`,children:(0,z.jsx)(`input`,{type:`number`,min:1,max:100,value:We,onChange:e=>R(Number(e.target.value))})})]}),(0,z.jsx)(V,{label:`Max File Size (MB)`,children:(0,z.jsx)(`input`,{type:`number`,min:0,step:.1,value:Ge,onChange:e=>Ke(Number(e.target.value)),placeholder:`0 = no limit`})}),(0,z.jsx)(`div`,{className:`ie-section-label`,children:`Naming`}),(0,z.jsx)(V,{label:`Naming Rule`,children:(0,z.jsxs)(`select`,{value:qe,onChange:e=>Je(e.target.value),children:[(0,z.jsx)(`option`,{value:`keep_original`,children:`Keep original`}),(0,z.jsx)(`option`,{value:`sequential`,children:`Sequential`}),(0,z.jsx)(`option`,{value:`ean_prefix`,children:`EAN prefix`}),(0,z.jsx)(`option`,{value:`custom_template`,children:`Custom template`})]})}),qe===`custom_template`&&(0,z.jsx)(V,{label:`Template`,children:(0,z.jsx)(`input`,{value:Ye,onChange:e=>Xe(e.target.value),placeholder:`{name}_{index}`})}),(0,z.jsxs)(`div`,{className:`ie-naming-preview`,children:[`Preview: `,(0,z.jsx)(`code`,{children:ti(qe,Ye)})]})]}),(0,z.jsxs)(`div`,{className:`ie-footer`,children:[(0,z.jsx)(`button`,{className:`btn btn-secondary`,onClick:_t,children:`Reset`}),(0,z.jsx)(`button`,{className:`btn btn-secondary`,onClick:vt,disabled:Ze||a.length===0,children:`Preview (First 1)`}),(0,z.jsx)(`button`,{className:`btn btn-primary`,onClick:yt,disabled:Ze||!xt,children:`Start Processing`})]})]}),(0,z.jsxs)(`section`,{className:`tool-card ie-right`,children:[(0,z.jsxs)(`div`,{className:`ie-queue-header`,children:[(0,z.jsx)(`h2`,{children:`Job Queue`}),(0,z.jsx)(`span`,{className:`ie-queue-count`,children:tt.length})]}),(0,z.jsxs)(`div`,{className:`ie-queue-list`,children:[tt.length===0&&(0,z.jsx)(`div`,{className:`empty-box`,children:`No jobs queued yet.`}),tt.map((e,t)=>(0,z.jsxs)(`div`,{className:`ie-queue-item ie-q-${e.status}`,children:[(0,z.jsx)(`div`,{className:`ie-q-thumb`,children:e.thumbnail?(0,z.jsx)(`img`,{src:e.thumbnail,alt:``}):(0,z.jsx)(`div`,{className:`ie-q-thumb-placeholder`})}),(0,z.jsxs)(`div`,{className:`ie-q-info`,children:[(0,z.jsxs)(`div`,{className:`ie-q-name`,children:[(0,z.jsx)(`span`,{className:`ie-q-index`,children:t+1}),(0,z.jsx)(`span`,{title:e.name,children:e.name})]}),e.dimensions&&(0,z.jsx)(`span`,{className:`ie-q-dims`,children:e.dimensions}),(0,z.jsx)(`div`,{className:`ie-q-progress-bar`,children:(0,z.jsx)(`div`,{className:`ie-q-progress-fill`,style:{width:`${e.progress}%`}})}),(0,z.jsxs)(`div`,{className:`ie-q-meta`,children:[(0,z.jsxs)(`span`,{children:[e.progress,`%`]}),e.elapsed&&(0,z.jsx)(`span`,{children:e.elapsed}),e.eta&&(0,z.jsxs)(`span`,{children:[`ETA: `,e.eta]})]})]}),(0,z.jsx)(`button`,{className:`ie-q-remove`,title:`Remove`,onClick:()=>ht(e.id),children:`x`})]},e.id))]}),(0,z.jsx)(`div`,{className:`ie-preview-frame`,children:rt?(0,z.jsx)(`img`,{src:rt,alt:`Preview output`}):(0,z.jsx)(`div`,{className:`empty-box`,children:`Output preview will appear here.`})}),lt?.status===`completed`&&(0,z.jsxs)(`a`,{className:`btn btn-primary ie-download-btn`,href:Yn(`/api/jobs/${encodeURIComponent(lt.id)}/download`),target:`_blank`,rel:`noreferrer`,children:[(0,z.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,width:`16`,height:`16`,children:[(0,z.jsx)(`path`,{d:`M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4`}),(0,z.jsx)(`polyline`,{points:`7 10 12 15 17 10`}),(0,z.jsx)(`line`,{x1:`12`,y1:`15`,x2:`12`,y2:`3`})]}),`Download`]})]})]}),(0,z.jsxs)(`div`,{className:`ie-console`,children:[(0,z.jsxs)(`div`,{className:`ie-console-header`,children:[(0,z.jsxs)(`div`,{className:`ie-console-title`,children:[(0,z.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,width:`16`,height:`16`,children:[(0,z.jsx)(`polyline`,{points:`4 17 10 11 4 5`}),(0,z.jsx)(`line`,{x1:`12`,y1:`19`,x2:`20`,y2:`19`})]}),`Console`]}),(0,z.jsx)(`button`,{className:`btn btn-secondary btn-sm`,onClick:()=>ot([]),children:`Clear`})]}),(0,z.jsxs)(`div`,{className:`ie-console-body`,ref:st,children:[at.length===0&&(0,z.jsx)(`div`,{className:`empty-box`,style:{padding:`12px`},children:`No log entries yet.`}),at.map(e=>(0,z.jsxs)(`div`,{className:`ie-log-entry`,children:[(0,z.jsx)(`span`,{className:`ie-log-time`,children:e.timestamp}),(0,z.jsx)(`span`,{className:`ie-log-level`,style:{color:ei(e.level)},children:e.level}),(0,z.jsx)(`span`,{className:`ie-log-msg`,children:e.message})]},e.id))]})]})]})}function si(e,...t){if(!e)return!0;let n=e.toLowerCase();return t.some(e=>(e||``).toLowerCase().includes(n))}function ci(){let{notify:e}=qn(),[t,n]=(0,_.useState)(`sorter`),[r,i]=(0,_.useState)(``),[a,o]=(0,_.useState)(!1),[s,c]=(0,_.useState)(!1),[l,u]=(0,_.useState)(``),[d,f]=(0,_.useState)(null),[p,m]=(0,_.useState)(`Ready`),[h,g]=(0,_.useState)(`Choose a folder to begin.`),[v,y]=(0,_.useState)(!1),[b,x]=(0,_.useState)(null),S=(0,_.useRef)(!1),C=(0,_.useRef)(``),w=(0,_.useCallback)(e=>{S.current=!0,C.current=e},[]),ee=(0,_.useCallback)(()=>{S.current=!1,C.current=``,x(null)},[]);(0,_.useEffect)(()=>{function e(e){if(!S.current||!C.current)return;let t=e.clientX+388>window.innerWidth?e.clientX-388:e.clientX+16,n=e.clientY+388>window.innerHeight?Math.max(0,e.clientY-388):e.clientY+16;x({src:C.current,x:t,y:n})}return document.addEventListener(`mousemove`,e),()=>document.removeEventListener(`mousemove`,e)},[]);async function T(){if(!r){e(`Choose a folder first`,{type:`warning`});return}o(!0),m(`Scanning`),g(`Analyzing folder contents for EAN barcodes.`);try{let t=await Xn(`/api/ean-sorter/scan`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({folder:r})});f(t),i(t.folder||r),m(`Scan complete`),g(`${t.items} item(s), ${t.products} product EAN group(s), ${t.notFound} not found.`),e(`Scan complete`,{type:`success`,message:`${t.products} products, ${t.files} files`})}catch(t){m(`Error`),g(t instanceof Error?t.message:String(t)),e(`Scan failed`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{o(!1)}}async function E(){if(!r){e(`Choose a folder first`,{type:`warning`});return}o(!0),m(`Sorting`),g(`Moving files into product folders and generating report.`);try{let t=await Xn(`/api/ean-sorter/sort`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({folder:r,deleteEmpty:s})});f(t),i(t.folder||r),m(`Sort complete`),g(`${t.moved??0} item(s) moved into ${t.products} EAN folder(s).`),e(`Sort complete`,{type:`success`,message:`${t.moved??0} files moved`})}catch(t){m(`Error`),g(t instanceof Error?t.message:String(t)),e(`Sort failed`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{o(!1)}}async function D(){if(r){o(!0);try{let t=await Xn(`/api/ean-sorter/report`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({folder:r})});f(e=>e?{...e,reportRows:t.reportRows}:t),e(`Report loaded`,{type:`success`})}catch(t){e(`Failed to load report`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{o(!1)}}}async function te(){try{await Xn(`/api/ean-sorter/report/open`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({folder:r})})}catch(t){e(`Failed to open report`,{type:`error`,message:t instanceof Error?t.message:String(t)})}}async function ne(){try{await Xn(`/api/ean-sorter/report/export`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({folder:r})}),e(`Report exported`,{type:`success`})}catch(t){e(`Export failed`,{type:`error`,message:t instanceof Error?t.message:String(t)})}}async function re(){if(r)if(window.__grimoire?.revealInExplorer)window.__grimoire.revealInExplorer(r);else try{await Xn(`/api/local/reveal`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({path:r})})}catch{}}let O=[`Active`,`Upcoming`,`Limited`,`Blanks`,`N/A`,`Unknown`,`Non-ACR`,`Others`],[ie,ae]=(0,_.useState)(new Set),[oe,k]=(0,_.useState)(!1),[A,se]=(0,_.useState)([]),[ce,j]=(0,_.useState)(new Set),[le,M]=(0,_.useState)(``),[N,ue]=(0,_.useState)(!1),[de,P]=(0,_.useState)(!1),fe=(0,_.useRef)(null),[F,pe]=(0,_.useState)(null),[me,he]=(0,_.useState)(!1),[ge,_e]=(0,_.useState)(new Set),[ve,ye]=(0,_.useState)(``),[be,xe]=(0,_.useState)(!1),[Se,Ce]=(0,_.useState)(!1),[we,Te]=(0,_.useState)(!1),[Ee,De]=(0,_.useState)(!1),[I,Oe]=(0,_.useState)(!1),[ke,Ae]=(0,_.useState)(null);async function je(){let t=fe.current?.files?.[0];if(!t){e(`Select a status file`,{type:`warning`});return}he(!0),pe(null),Oe(!1),Ae(null),_e(new Set),Te(!1),De(!1);try{let n=new FormData;n.append(`file`,t);let r=await Xn(`/api/ean-sorter/categorize/read-status-file`,{method:`POST`,body:n});pe(r),e(`Read ${r.total} products for ${r.brand}`,{type:`success`}),r.no_barcode_count>0&&xe(!0),Object.keys(r.duplicates).length>0&&Ce(!0)}catch(t){e(`Failed to read status file`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{he(!1)}}function Me(e){_e(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n})}async function Ne(){let e=await Zn(`Select destination for status folders`);e&&ye(e)}async function Pe(){if(!F||ge.size===0||!ve){e(`Select statuses and a destination folder`,{type:`warning`});return}he(!0);try{let t=await Xn(`/api/ean-sorter/categorize/create-status-folders`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({destination:ve,products:F.products,statuses:[...ge],brand:F.brand,use_name_for_no_barcode:we,per_product_for_duplicates:Ee})});Oe(!0),Ae({count:t.count,skipped_count:t.skipped_count}),e(`Created ${t.count} folder(s)`,{type:`success`,message:t.skipped_count>0?`${t.skipped_count} product(s) skipped (no barcode)`:void 0})}catch(t){e(`Failed to create folders`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{he(!1)}}function Fe(e){ae(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n})}function Ie(){ie.size===O.length?ae(new Set):ae(new Set(O))}async function Le(){if(!(!r||ie.size===0)){P(!0);try{await Xn(`/api/ean-sorter/categorize/create-folders`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({folder:r,categories:[...ie]})}),k(!0),e(`Category folders created`,{type:`success`,message:`${ie.size} folder(s) created`}),await Re()}catch(t){e(`Failed to create folders`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{P(!1)}}}async function Re(){if(r){P(!0);try{se((await Xn(`/api/ean-sorter/categorize/uncategorized`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({folder:r})})).items),j(new Set)}catch(t){e(`Failed to load uncategorized items`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{P(!1)}}}function L(e){j(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n})}function ze(){ce.size===R.length?j(new Set):j(new Set(R.map(e=>e.path)))}function Be(t){if(ce.size===0){e(`Select images to move first`,{type:`warning`});return}M(t),ue(!0)}async function Ve(){if(!(!r||!le||ce.size===0)){ue(!1),P(!0);try{let t=await Xn(`/api/ean-sorter/categorize/move`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({folder:r,category:le,paths:[...ce]})});e(`Moved ${t.moved} item(s) to ${le}`,{type:`success`}),t.errors.length>0&&e(`${t.errors.length} error(s)`,{type:`warning`,message:t.errors.slice(0,3).join(`; `)}),await Re()}catch(t){e(`Move failed`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{P(!1),M(``)}}}let He=(d?.rows??[]).filter(e=>si(l,e.name,e.ean,e.type,e.kind,e.oldFolder)),Ue=(d?.gallery??[]).filter(e=>si(l,e.name,e.ean)),We=(d?.reportRows??[]).filter(e=>si(l,e.numbering,e.ean,e.name,e.type,e.oldFolder,e.newFolder)),R=A.filter(e=>si(l,e.name,e.type,e.oldFolder)),Ge={items:d?.items??0,files:d?.files??0,folders:d?.folders??0,products:d?.products??0,notFound:d?.notFound??0};return(0,z.jsxs)(`div`,{className:`view tool-view sor-shell`,children:[(0,z.jsxs)(`aside`,{className:`sor-sidebar`,children:[(0,z.jsxs)(`div`,{className:`sor-brand`,children:[(0,z.jsx)(`div`,{className:`sor-brand-mark`,children:`E`}),(0,z.jsx)(`span`,{children:`EAN SORTER`})]}),(0,z.jsx)(`nav`,{className:`sor-nav`,children:[{key:`sorter`,label:`Sorter`,icon:`/icons/ean-sorter-sort.png`},{key:`gallery`,label:`Gallery`,icon:`/icons/ean-sorter-gallery.png`},{key:`report`,label:`Report`,icon:`/icons/ean-sorter-report.png`},{key:`categorize`,label:`Categorize`,icon:`/icons/ean-sorter-categorize.png`}].map(e=>(0,z.jsxs)(`button`,{className:`sor-nav-item${t===e.key?` active`:``}`,onClick:()=>{n(e.key),e.key===`categorize`&&r&&A.length===0&&oe&&Re()},children:[(0,z.jsx)(`img`,{src:e.icon,alt:``,className:`sor-nav-icon`}),e.label]},e.key))}),(0,z.jsx)(`div`,{className:`sor-sidebar-spacer`}),(0,z.jsx)(`button`,{className:`sor-guide-btn`,onClick:()=>y(!0),children:`Guide`}),(0,z.jsxs)(`div`,{className:`sor-mini-card`,children:[(0,z.jsx)(`span`,{children:`Selected folder`}),(0,z.jsx)(`strong`,{title:r||`None`,children:r||`None`})]})]}),(0,z.jsxs)(`div`,{className:`sor-content`,children:[(0,z.jsxs)(`header`,{className:`sor-topbar`,children:[(0,z.jsxs)(`div`,{className:`sor-search`,children:[(0,z.jsx)(`span`,{children:`Search`}),(0,z.jsx)(`input`,{type:`text`,placeholder:`Search EAN or image name`,value:l,onChange:e=>u(e.target.value)})]}),(0,z.jsx)(`button`,{className:`sor-btn-compact`,onClick:async()=>{let e=await Zn(`Select folder to scan`,r);e&&i(e)},children:`Choose folder`}),(0,z.jsx)(`button`,{className:`sor-btn-icon`,onClick:re,children:`Open`}),(0,z.jsxs)(`div`,{className:`sor-profile`,children:[(0,z.jsx)(`div`,{className:`sor-avatar`,children:`EAN`}),(0,z.jsx)(`span`,{children:`Local desktop`})]})]}),t===`sorter`&&(0,z.jsxs)(`div`,{className:`sor-view-content`,children:[(0,z.jsxs)(`section`,{className:`sor-hero`,children:[(0,z.jsxs)(`div`,{className:`sor-hero-main`,children:[(0,z.jsx)(`div`,{className:`sor-chips`,children:[`EAN-8`,`EAN-13`,`Excel report`,`Folder sort`].map(e=>(0,z.jsx)(`span`,{className:`sor-chip`,children:e},e))}),(0,z.jsxs)(`div`,{children:[(0,z.jsx)(`p`,{className:`sor-eyebrow`,children:`Product Data Cleaner`}),(0,z.jsx)(`h1`,{className:`sor-headline`,children:`Sort files by product barcode`})]}),(0,z.jsxs)(`div`,{className:`sor-hero-actions`,children:[(0,z.jsx)(`button`,{className:`sor-btn-primary`,onClick:T,disabled:a||!r,children:`Scan`}),(0,z.jsx)(`button`,{className:`sor-btn-secondary`,onClick:E,disabled:a||!r,children:`Sort and report`}),(0,z.jsxs)(`label`,{className:`sor-toggle`,children:[(0,z.jsx)(`input`,{type:`checkbox`,checked:s,onChange:e=>c(e.target.checked)}),(0,z.jsx)(`span`,{}),`Delete empty folders`]})]})]}),(0,z.jsxs)(`aside`,{className:`sor-action-card`,children:[(0,z.jsx)(`span`,{className:`sor-card-label`,children:`Status`}),(0,z.jsx)(`strong`,{children:p}),(0,z.jsx)(`p`,{children:h}),(0,z.jsx)(`button`,{className:`sor-btn-gold`,onClick:()=>n(`report`),children:`Show report`})]})]}),(0,z.jsx)(`section`,{className:`sor-stats`,children:[[`Items`,Ge.items],[`Files`,Ge.files],[`Folders`,Ge.folders],[`Products`,Ge.products],[`Not found`,Ge.notFound]].map(([e,t])=>(0,z.jsxs)(`article`,{className:`sor-stat`,children:[(0,z.jsx)(`span`,{children:e}),(0,z.jsx)(`strong`,{children:t})]},e))}),(0,z.jsxs)(`section`,{className:`sor-workspace`,children:[(0,z.jsxs)(`div`,{className:`sor-panel sor-results-panel`,children:[(0,z.jsxs)(`div`,{className:`sor-panel-head`,children:[(0,z.jsx)(`h2`,{children:`Scan Results`}),(0,z.jsxs)(`span`,{className:`sor-count`,children:[He.length,` rows`]})]}),(0,z.jsx)(`div`,{className:`sor-table-wrap`,children:(0,z.jsxs)(`table`,{className:`sor-tbl`,children:[(0,z.jsx)(`thead`,{children:(0,z.jsxs)(`tr`,{children:[(0,z.jsx)(`th`,{children:`Preview`}),(0,z.jsx)(`th`,{children:`Name`}),(0,z.jsx)(`th`,{children:`EAN`}),(0,z.jsx)(`th`,{children:`Type`}),(0,z.jsx)(`th`,{children:`Old Folder`})]})}),(0,z.jsxs)(`tbody`,{children:[He.map((e,t)=>(0,z.jsxs)(`tr`,{children:[(0,z.jsx)(`td`,{children:e.thumbnail?(0,z.jsx)(`img`,{className:`sor-thumb`,src:e.thumbnail,alt:``,loading:`lazy`,onMouseEnter:()=>w(e.thumbnail),onMouseLeave:ee}):(0,z.jsx)(`div`,{className:`sor-thumb sor-thumb-placeholder`,children:`No image`})}),(0,z.jsx)(`td`,{children:e.name}),(0,z.jsx)(`td`,{children:(0,z.jsx)(`span`,{className:`sor-tag${e.ean===`not found`?` missing`:``}`,children:e.ean})}),(0,z.jsx)(`td`,{children:e.type||e.kind||``}),(0,z.jsx)(`td`,{className:`sor-path-cell`,title:e.oldFolder,children:e.oldFolder||``})]},`${e.path??e.name}-${t}`)),He.length===0&&(0,z.jsx)(`tr`,{children:(0,z.jsx)(`td`,{colSpan:5,className:`sor-empty`,children:a?`Scanning...`:`No scan yet.`})})]})]})})]}),(0,z.jsxs)(`div`,{className:`sor-panel sor-products-panel`,children:[(0,z.jsxs)(`div`,{className:`sor-panel-head`,children:[(0,z.jsx)(`h2`,{children:`Products`}),(0,z.jsx)(`span`,{className:`sor-count`,children:d?.productRows?.length??0})]}),(0,z.jsxs)(`div`,{className:`sor-product-list`,children:[(d?.productRows??[]).map(e=>(0,z.jsxs)(`div`,{className:`sor-product-row`,children:[(0,z.jsx)(`strong`,{children:e.ean}),(0,z.jsxs)(`span`,{children:[e.count,` item`,e.count===1?``:`s`]})]},e.ean)),(!d?.productRows||d.productRows.length===0)&&(0,z.jsx)(`div`,{className:`sor-empty-box`,children:`No EAN groups yet.`})]})]})]})]}),t===`gallery`&&(0,z.jsx)(`div`,{className:`sor-view-content`,children:(0,z.jsxs)(`div`,{className:`sor-panel`,children:[(0,z.jsxs)(`div`,{className:`sor-panel-head`,children:[(0,z.jsx)(`h2`,{children:`Gallery`}),(0,z.jsxs)(`span`,{className:`sor-count`,children:[Ue.length,` images`]})]}),(0,z.jsxs)(`div`,{className:`sor-gallery-grid`,children:[Ue.map((e,t)=>(0,z.jsxs)(`article`,{className:`sor-gallery-card`,children:[(0,z.jsx)(`img`,{src:e.thumbnail,alt:e.name,loading:`lazy`}),(0,z.jsxs)(`div`,{children:[(0,z.jsx)(`strong`,{title:e.name,children:e.name}),(0,z.jsx)(`span`,{children:e.ean})]})]},`${e.ean}-${e.name}-${t}`)),Ue.length===0&&(0,z.jsx)(`div`,{className:`sor-empty-box`,style:{gridColumn:`1 / -1`},children:d?`No matching images.`:`Scan a folder to load images.`})]})]})}),t===`report`&&(0,z.jsx)(`div`,{className:`sor-view-content`,children:(0,z.jsxs)(`div`,{className:`sor-panel sor-report-panel`,children:[(0,z.jsxs)(`div`,{className:`sor-panel-head`,children:[(0,z.jsx)(`h2`,{children:`Report Output`}),(0,z.jsxs)(`div`,{className:`sor-panel-actions`,children:[(0,z.jsx)(`button`,{className:`sor-btn-compact`,onClick:D,disabled:a||!r,children:`Load report`}),(0,z.jsx)(`button`,{className:`sor-btn-compact`,onClick:ne,disabled:!r,children:`Export report`}),(0,z.jsx)(`button`,{className:`sor-btn-compact`,onClick:te,disabled:!r,children:`Open in Excel`})]})]}),(0,z.jsx)(`div`,{className:`sor-table-wrap sor-report-wrap`,children:(0,z.jsxs)(`table`,{className:`sor-tbl`,children:[(0,z.jsx)(`thead`,{children:(0,z.jsxs)(`tr`,{children:[(0,z.jsx)(`th`,{children:`Numbering`}),(0,z.jsx)(`th`,{children:`EAN`}),(0,z.jsx)(`th`,{children:`Name`}),(0,z.jsx)(`th`,{children:`Type`}),(0,z.jsx)(`th`,{children:`Old Folder`}),(0,z.jsx)(`th`,{children:`New Folder`})]})}),(0,z.jsxs)(`tbody`,{children:[We.map((e,t)=>(0,z.jsxs)(`tr`,{children:[(0,z.jsx)(`td`,{children:e.numbering}),(0,z.jsx)(`td`,{children:e.ean}),(0,z.jsx)(`td`,{children:e.name}),(0,z.jsx)(`td`,{children:e.type||``}),(0,z.jsx)(`td`,{className:`sor-path-cell`,title:e.oldFolder,children:e.oldFolder||``}),(0,z.jsx)(`td`,{className:`sor-path-cell`,title:e.newFolder,children:e.newFolder||``})]},`${e.ean}-${e.name}-${t}`)),We.length===0&&(0,z.jsx)(`tr`,{children:(0,z.jsx)(`td`,{colSpan:6,className:`sor-empty`,children:d?.reportRows?`No rows match your search.`:`Run Sort and report, or load an existing report.`})})]})]})})]})}),t===`categorize`&&(0,z.jsx)(`div`,{className:`sor-view-content`,children:oe?(0,z.jsxs)(`div`,{className:`sor-cat-workspace`,children:[(0,z.jsxs)(`div`,{className:`sor-panel`,children:[(0,z.jsxs)(`div`,{className:`sor-panel-head`,children:[(0,z.jsx)(`h2`,{children:`Uncategorized Images`}),(0,z.jsxs)(`div`,{className:`sor-panel-actions`,children:[(0,z.jsxs)(`span`,{className:`sor-count`,children:[ce.size,` of`,` `,R.length,` selected`]}),(0,z.jsx)(`button`,{className:`sor-btn-compact`,onClick:Re,disabled:de||!r,children:`Refresh`}),(0,z.jsx)(`button`,{className:`sor-btn-compact`,onClick:()=>{k(!1),se([]),j(new Set)},children:`Back to setup`})]})]}),(0,z.jsx)(`div`,{className:`sor-table-wrap`,style:{maxHeight:340},children:(0,z.jsxs)(`table`,{className:`sor-tbl`,children:[(0,z.jsx)(`thead`,{children:(0,z.jsxs)(`tr`,{children:[(0,z.jsx)(`th`,{style:{width:40},children:(0,z.jsx)(`input`,{type:`checkbox`,checked:R.length>0&&ce.size===R.length,onChange:ze})}),(0,z.jsx)(`th`,{children:`Preview`}),(0,z.jsx)(`th`,{children:`Name`}),(0,z.jsx)(`th`,{children:`Type`}),(0,z.jsx)(`th`,{children:`Current Folder`})]})}),(0,z.jsxs)(`tbody`,{children:[R.map((e,t)=>(0,z.jsxs)(`tr`,{className:ce.has(e.path)?`sor-row-selected`:``,children:[(0,z.jsx)(`td`,{children:(0,z.jsx)(`input`,{type:`checkbox`,checked:ce.has(e.path),onChange:()=>L(e.path)})}),(0,z.jsx)(`td`,{children:e.thumbnail?(0,z.jsx)(`img`,{className:`sor-thumb`,src:e.thumbnail,alt:``,loading:`lazy`,onMouseEnter:()=>w(e.thumbnail),onMouseLeave:ee}):(0,z.jsx)(`div`,{className:`sor-thumb sor-thumb-placeholder`,children:`No image`})}),(0,z.jsx)(`td`,{children:e.name}),(0,z.jsx)(`td`,{children:e.type}),(0,z.jsx)(`td`,{className:`sor-path-cell`,title:e.oldFolder,children:e.oldFolder})]},`${e.path}-${t}`)),R.length===0&&(0,z.jsx)(`tr`,{children:(0,z.jsx)(`td`,{colSpan:5,className:`sor-empty`,children:de?`Loading...`:A.length===0?`No uncategorized items found.`:`No items match your search.`})})]})]})})]}),(0,z.jsxs)(`div`,{className:`sor-panel sor-cat-move-panel`,children:[(0,z.jsx)(`div`,{className:`sor-panel-head`,children:(0,z.jsx)(`h2`,{children:`Move to Category`})}),(0,z.jsx)(`div`,{className:`sor-cat-move-grid`,children:[...ie].sort().map(e=>(0,z.jsxs)(`button`,{className:`sor-cat-move-btn`,disabled:de||ce.size===0,onClick:()=>Be(e),children:[(0,z.jsx)(`span`,{className:`sor-cat-move-icon`,children:`📁`}),(0,z.jsx)(`span`,{children:e})]},e))})]})]}):(0,z.jsxs)(`div`,{className:`sor-cat-setup`,children:[(0,z.jsxs)(`div`,{className:`sor-panel`,children:[(0,z.jsxs)(`div`,{className:`sor-panel-head`,children:[(0,z.jsx)(`h2`,{children:`Create Category Folders`}),(0,z.jsxs)(`span`,{className:`sor-count`,children:[ie.size,` selected`]})]}),(0,z.jsxs)(`div`,{className:`sor-cat-body`,children:[(0,z.jsx)(`p`,{className:`sor-cat-desc`,children:`Select which category folders to create inside your working directory. These folders will be used to organize uncategorized images (items with no EAN detected).`}),(0,z.jsx)(`div`,{className:`sor-cat-select-all`,children:(0,z.jsxs)(`label`,{className:`sor-cat-check`,children:[(0,z.jsx)(`input`,{type:`checkbox`,checked:ie.size===O.length,onChange:Ie}),(0,z.jsx)(`span`,{children:`Select All`})]})}),(0,z.jsx)(`div`,{className:`sor-cat-grid`,children:O.map(e=>(0,z.jsxs)(`label`,{className:`sor-cat-option${ie.has(e)?` selected`:``}`,children:[(0,z.jsx)(`input`,{type:`checkbox`,checked:ie.has(e),onChange:()=>Fe(e)}),(0,z.jsx)(`span`,{className:`sor-cat-name`,children:e})]},e))}),(0,z.jsx)(`div`,{className:`sor-cat-actions`,children:(0,z.jsx)(`button`,{className:`sor-btn-primary`,onClick:Le,disabled:de||!r||ie.size===0,children:de?`Creating...`:`Create Folders`})})]})]}),(0,z.jsxs)(`div`,{className:`sor-panel`,style:{marginTop:16},children:[(0,z.jsx)(`div`,{className:`sor-panel-head`,children:(0,z.jsx)(`h2`,{children:`Create Folders from Status File`})}),(0,z.jsxs)(`div`,{className:`sor-cat-body`,children:[(0,z.jsxs)(`p`,{className:`sor-cat-desc`,children:[`Upload a `,(0,z.jsx)(`strong`,{children:`[Brand]_Missing_Data_Status.xlsx`}),` file to create product folders organized by status, with EAN barcodes as subfolder names.`]}),(0,z.jsxs)(`div`,{style:{display:`flex`,gap:10,alignItems:`center`,marginBottom:12},children:[(0,z.jsx)(`input`,{ref:fe,type:`file`,accept:`.xlsx,.xls`,className:`sor-input`,style:{flex:1}}),(0,z.jsx)(`button`,{className:`sor-btn-primary`,onClick:je,disabled:me,children:me?`Reading...`:`Read File`})]}),F&&(0,z.jsxs)(z.Fragment,{children:[(0,z.jsxs)(`div`,{className:`sor-cat-desc`,style:{marginBottom:8,padding:`8px 12px`,background:`var(--sor-card-bg, #1e1e2e)`,borderRadius:6},children:[(0,z.jsx)(`strong`,{children:F.brand}),` — `,F.total,` products`,Object.entries(F.statuses).map(([e,t])=>(0,z.jsxs)(`span`,{style:{marginLeft:12,opacity:.8},children:[e,`: `,t]},e))]}),(0,z.jsx)(`p`,{className:`sor-cat-desc`,style:{marginBottom:6},children:`Select which status folders to create:`}),(0,z.jsx)(`div`,{className:`sor-cat-grid`,children:Object.entries(F.statuses).map(([e,t])=>(0,z.jsxs)(`label`,{className:`sor-cat-option${ge.has(e)?` selected`:``}`,children:[(0,z.jsx)(`input`,{type:`checkbox`,checked:ge.has(e),onChange:()=>Me(e)}),(0,z.jsxs)(`span`,{className:`sor-cat-name`,children:[e,` (`,t,`)`]})]},e))}),(0,z.jsxs)(`div`,{style:{display:`flex`,gap:10,alignItems:`center`,marginTop:12},children:[(0,z.jsx)(`button`,{className:`sor-btn-secondary`,onClick:Ne,children:ve?`Change Destination`:`Choose Destination`}),ve&&(0,z.jsx)(`span`,{className:`sor-cat-desc`,style:{fontSize:12},children:ve})]}),(0,z.jsx)(`div`,{className:`sor-cat-actions`,style:{marginTop:12},children:(0,z.jsx)(`button`,{className:`sor-btn-primary`,onClick:Pe,disabled:me||ge.size===0||!ve,children:me?`Creating...`:`Create Status Folders`})}),I&&ke&&(0,z.jsxs)(`div`,{className:`sor-cat-desc`,style:{marginTop:10,padding:`8px 12px`,background:`var(--sor-success-bg, #1a3a2a)`,borderRadius:6,color:`var(--sor-success, #4ade80)`},children:[`Created `,ke.count,` folder(s).`,ke.skipped_count>0&&` Skipped ${ke.skipped_count} product(s) without barcode.`]})]})]})]})]})})]}),N&&(0,z.jsx)(`div`,{className:`sor-modal`,onClick:e=>{e.target===e.currentTarget&&ue(!1)},children:(0,z.jsxs)(`div`,{className:`sor-modal-card`,children:[(0,z.jsxs)(`div`,{className:`sor-panel-head`,children:[(0,z.jsx)(`h2`,{children:`Confirm Move`}),(0,z.jsx)(`button`,{className:`sor-btn-icon`,onClick:()=>ue(!1),children:`Close`})]}),(0,z.jsxs)(`div`,{className:`sor-guide-copy`,children:[(0,z.jsxs)(`p`,{children:[`Move `,(0,z.jsx)(`strong`,{children:ce.size}),` selected item(s) to the `,(0,z.jsx)(`strong`,{children:le}),` folder?`]}),(0,z.jsxs)(`p`,{style:{fontSize:13,opacity:.7},children:[`Files will be moved from their current location into`,` `,(0,z.jsxs)(`strong`,{children:[r,`\\`,le]})]}),(0,z.jsxs)(`div`,{style:{display:`flex`,gap:10,marginTop:12},children:[(0,z.jsx)(`button`,{className:`sor-btn-primary`,onClick:Ve,children:`Move`}),(0,z.jsx)(`button`,{className:`sor-btn-secondary`,onClick:()=>ue(!1),children:`Cancel`})]})]})]})}),be&&F&&(0,z.jsx)(`div`,{className:`sor-modal`,onClick:e=>{e.target===e.currentTarget&&xe(!1)},children:(0,z.jsxs)(`div`,{className:`sor-modal-card`,children:[(0,z.jsxs)(`div`,{className:`sor-panel-head`,children:[(0,z.jsx)(`h2`,{children:`Products Without Barcode`}),(0,z.jsx)(`button`,{className:`sor-btn-icon`,onClick:()=>xe(!1),children:`Close`})]}),(0,z.jsxs)(`div`,{className:`sor-guide-copy`,children:[(0,z.jsxs)(`p`,{children:[(0,z.jsx)(`strong`,{children:F.no_barcode_count}),` product(s) do not have a barcode (EAN):`]}),(0,z.jsx)(`div`,{className:`sor-table-wrap`,style:{maxHeight:200,marginTop:8},children:(0,z.jsxs)(`table`,{className:`sor-tbl`,children:[(0,z.jsx)(`thead`,{children:(0,z.jsxs)(`tr`,{children:[(0,z.jsx)(`th`,{children:`Code`}),(0,z.jsx)(`th`,{children:`Product Name`}),(0,z.jsx)(`th`,{children:`Status`})]})}),(0,z.jsx)(`tbody`,{children:F.no_barcode.map((e,t)=>(0,z.jsxs)(`tr`,{children:[(0,z.jsx)(`td`,{children:e.code}),(0,z.jsx)(`td`,{children:e.name}),(0,z.jsx)(`td`,{children:e.status})]},t))})]})}),(0,z.jsx)(`p`,{style:{marginTop:12},children:`Would you like to use the product name as the folder name instead?`}),(0,z.jsxs)(`p`,{style:{fontSize:12,opacity:.7},children:[`Format: `,(0,z.jsxs)(`strong`,{children:[F.brand,`_Product Name_Status`]})]}),(0,z.jsxs)(`div`,{style:{display:`flex`,gap:10,marginTop:12},children:[(0,z.jsx)(`button`,{className:`sor-btn-primary`,onClick:()=>{Te(!0),xe(!1)},children:`Yes, Use Product Name`}),(0,z.jsx)(`button`,{className:`sor-btn-secondary`,onClick:()=>{Te(!1),xe(!1)},children:`No, Skip These`})]})]})]})}),Se&&F&&(0,z.jsx)(`div`,{className:`sor-modal`,onClick:e=>{e.target===e.currentTarget&&Ce(!1)},children:(0,z.jsxs)(`div`,{className:`sor-modal-card`,children:[(0,z.jsxs)(`div`,{className:`sor-panel-head`,children:[(0,z.jsx)(`h2`,{children:`Duplicate Barcodes Found`}),(0,z.jsx)(`button`,{className:`sor-btn-icon`,onClick:()=>Ce(!1),children:`Close`})]}),(0,z.jsxs)(`div`,{className:`sor-guide-copy`,children:[(0,z.jsx)(`p`,{children:`The following barcodes are shared by multiple products:`}),(0,z.jsx)(`div`,{className:`sor-table-wrap`,style:{maxHeight:200,marginTop:8},children:(0,z.jsxs)(`table`,{className:`sor-tbl`,children:[(0,z.jsx)(`thead`,{children:(0,z.jsxs)(`tr`,{children:[(0,z.jsx)(`th`,{children:`Barcode`}),(0,z.jsx)(`th`,{children:`Count`}),(0,z.jsx)(`th`,{children:`Products`})]})}),(0,z.jsx)(`tbody`,{children:Object.entries(F.duplicates).map(([e,t])=>(0,z.jsxs)(`tr`,{children:[(0,z.jsx)(`td`,{children:e}),(0,z.jsx)(`td`,{children:t}),(0,z.jsx)(`td`,{children:F.duplicate_products.filter(t=>t.barcode===e).map(e=>e.name).join(`; `)})]},e))})]})}),(0,z.jsx)(`p`,{style:{marginTop:12},children:`Do you want to create one subfolder per product for these, or keep one shared folder per barcode?`}),(0,z.jsxs)(`div`,{style:{display:`flex`,gap:10,marginTop:12},children:[(0,z.jsx)(`button`,{className:`sor-btn-primary`,onClick:()=>{De(!0),Ce(!1)},children:`One Folder Per Product`}),(0,z.jsx)(`button`,{className:`sor-btn-secondary`,onClick:()=>{De(!1),Ce(!1)},children:`Keep Shared Folder`})]})]})]})}),b&&(0,z.jsx)(`div`,{className:`sor-img-preview`,style:{left:b.x,top:b.y},children:(0,z.jsx)(`img`,{src:b.src,alt:``})}),v&&(0,z.jsx)(`div`,{className:`sor-modal`,onClick:e=>{e.target===e.currentTarget&&y(!1)},children:(0,z.jsxs)(`div`,{className:`sor-modal-card`,children:[(0,z.jsxs)(`div`,{className:`sor-panel-head`,children:[(0,z.jsx)(`h2`,{children:`Guide`}),(0,z.jsx)(`button`,{className:`sor-btn-icon`,onClick:()=>y(!1),children:`Close`})]}),(0,z.jsxs)(`div`,{className:`sor-guide-copy`,children:[(0,z.jsx)(`p`,{children:`1. Click Choose folder and select the product image folder.`}),(0,z.jsx)(`p`,{children:`2. Click Scan to preview every detected item, EAN group, and image thumbnail.`}),(0,z.jsx)(`p`,{children:`3. Use the search bar to filter by EAN or image name.`}),(0,z.jsx)(`p`,{children:`4. Open Gallery to review all images inside the selected folder.`}),(0,z.jsx)(`p`,{children:`5. Click Sort and report to create one folder per EAN and write EAN_report.xlsx.`}),(0,z.jsx)(`p`,{children:`6. Open Report to preview, export, or open the Excel report on this computer.`})]})]})}),(0,z.jsx)(`style`,{children:`
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
          overflow-y: auto;
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
      `})]})}var li=[{key:`unsorted`,title:`Unsorted`,fixed:!0,imageIds:[]},{key:`packshot`,title:`Packshot`,imageIds:[]},{key:`lifestyle-human`,title:`Lifestyle/Human`,imageIds:[]},{key:`lifestyle-normal`,title:`Lifestyle/Normal`,imageIds:[]},{key:`artwork`,title:`Artwork`,imageIds:[]},{key:`duplicate`,title:`Duplicate`,fixed:!0,imageIds:[]}],ui=[`Packshot`,`Human`,`Normal Lifestyle`,`Artwork`],di=[{key:`packshot`,label:`PACK SHOT`},{key:`human`,label:`HUMAN`},{key:`normal_lifestyle`,label:`NORMAL LIFESTYLE`},{key:`artwork`,label:`ARTWORK`},{key:`video`,label:`VIDEO`}],fi={packshot:[],human:[],normal_lifestyle:[],artwork:[],video:[]},pi={packshot:`PACK SHOT`,human:`HUMAN`,normal_lifestyle:`NORMAL LIFESTYLE`,artwork:`ARTWORK`,video:`VIDEO`};function mi(e){if(!/^\d{13}$/.test(e))return!1;let t=0;for(let n=0;n<12;n++)t+=Number(e[n])*(n%2==0?1:3);return(10-t%10)%10===Number(e[12])}function hi(e){return e<1024?`${e} B`:e<1048576?`${(e/1024).toFixed(1)} KB`:`${(e/1048576).toFixed(2)} MB`}function gi(e,t){return Yn(`/api/ean-renamer/images/${encodeURIComponent(e)}/thumbnail?folderPath=${encodeURIComponent(t)}`)}function _i(e){return e===`lifestyle-human`?`lifestyle_human`:e===`lifestyle-normal`?`lifestyle_normal`:e}function vi(e){return e===`per-category`?`per_category`:e}function yi(e){return e===`in-folder`?`rename`:`copy`}function bi(e){return e.outputPath||e.outputRelativePath||e.newName||``}function xi(){let{notify:e}=qn(),[t,n]=(0,_.useState)(``),[r,i]=(0,_.useState)(``),[a,o]=(0,_.useState)(``),[s,c]=(0,_.useState)(``),[l,u]=(0,_.useState)(!1),[d,f]=(0,_.useState)([]),[p,m]=(0,_.useState)(li.map(e=>({...e,imageIds:[]}))),[h,g]=(0,_.useState)({...fi}),[v,y]=(0,_.useState)({...pi}),[b,x]=(0,_.useState)(new Set),[S,C]=(0,_.useState)({}),[w,ee]=(0,_.useState)({}),[T,E]=(0,_.useState)({}),[D,te]=(0,_.useState)(!1),[ne,re]=(0,_.useState)(!1),[O,ie]=(0,_.useState)(!0),[ae,oe]=(0,_.useState)(220),[k,A]=(0,_.useState)(null),[se,ce]=(0,_.useState)({outputMode:`copy`,namingMode:`per-category`}),[j,le]=(0,_.useState)([]),[M,N]=(0,_.useState)(``),[ue,de]=(0,_.useState)(!1),[P,fe]=(0,_.useState)([]),[F,pe]=(0,_.useState)(null),[me,he]=(0,_.useState)(null),ge=(0,_.useRef)(null),_e=(0,_.useRef)(null),ve=(0,_.useMemo)(()=>{let e=new Map;return d.forEach(t=>e.set(t.id,t)),e},[d]),ye=mi(a.trim()||r),be=d.length,xe=b.size,Se=Object.values(h).reduce((e,t)=>e+t.length,0);async function Ce(){try{let e=await Xn(`/api/ean-renamer/folder/pick`,{method:`POST`});e.folderPath&&await we(e.folderPath)}catch(t){e(`Failed to pick folder`,{type:`error`,message:t instanceof Error?t.message:String(t)})}}async function we(t){try{let r=await Xn(`/api/ean-renamer/folder/open`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({folderPath:t})});n(r.folderPath),i(r.ean||``),f(r.images),x(new Set),le([]),N(``),g({...fi}),ee({}),E({}),m(e=>e.map(e=>e.key===`unsorted`?{...e,imageIds:r.images.map(e=>e.id)}:{...e,imageIds:[]})),e(`Folder loaded`,{type:`success`,message:`${r.images.length} images found`})}catch(t){e(`Failed to load folder`,{type:`error`,message:t instanceof Error?t.message:String(t)})}}async function Te(){t&&await we(t)}function Ee(){t&&window.__grimoire?.revealInExplorer&&window.__grimoire.revealInExplorer(t)}async function De(n){try{let e=await Xn(`/api/ean-renamer/folder/pick-output`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({category:n,initialPath:S[n]||t})});e.folderPath&&C(t=>({...t,[n]:e.folderPath}))}catch(t){e(`Failed to pick output folder`,{type:`error`,message:t instanceof Error?t.message:String(t)})}}function I(e){x(t=>{let n=new Set(t);return n.has(e)?n.delete(e):n.add(e),n})}function Oe(e,t){let n=b.has(t)?Array.from(b):[t];fe(n),A(null),e.dataTransfer.effectAllowed=`move`,e.dataTransfer.setData(`text/plain`,n.join(`,`));let r=document.createElement(`div`);r.className=`ren-drag-ghost`,r.textContent=`${n.length} image${n.length>1?`s`:``}`,document.body.appendChild(r),e.dataTransfer.setDragImage(r,30,16),requestAnimationFrame(()=>r.remove())}function ke(e,t){e.preventDefault(),e.dataTransfer.dropEffect=`move`,pe(t),he(null)}function Ae(){pe(null),he(null)}function je(e,t){e.preventDefault(),pe(null),he(null),t!==`duplicate`&&P.length!==0&&(m(e=>{let n=e.map(e=>({...e,imageIds:e.imageIds.filter(e=>!P.includes(e))})),r=n.find(e=>e.key===t);return r&&r.key!==`duplicate`&&(r.imageIds=[...r.imageIds,...P]),n}),g(e=>{let t={...e};return di.forEach(({key:n})=>{t[n]=e[n].filter(e=>!P.includes(e))}),t}),fe([]))}function Me(e,t){e.preventDefault(),e.stopPropagation(),e.dataTransfer.dropEffect=`move`,pe(`duplicate`),he(t)}function Ne(e,t){e.preventDefault(),e.stopPropagation(),pe(null),he(null),P.length!==0&&(m(e=>e.map(e=>({...e,imageIds:e.imageIds.filter(e=>!P.includes(e))}))),g(e=>{let n={...e};return di.forEach(({key:t})=>{n[t]=e[t].filter(e=>!P.includes(e))}),n[t]=[...n[t],...P],n}),fe([]))}function Pe(){fe([]),pe(null),he(null),A(null)}function Fe(e,t){A({image:t,x:e.clientX,y:e.clientY})}function Ie(){let t=prompt(`Category name:`);if(!t?.trim())return;let n=t.toLowerCase().replace(/\s+/g,`-`).replace(/[^a-z0-9-]/g,``);if(p.some(e=>e.key===n)){e(`Column already exists`,{type:`warning`});return}m(e=>[...e,{key:n,title:t.trim(),imageIds:[]}])}function Le(e){let t=p.find(t=>t.key===e);if(!t||t.fixed)return;let n=prompt(`New name:`,t.title);n?.trim()&&m(t=>t.map(t=>t.key===e?{...t,title:n.trim()}:t))}function Re(e){let t=p.find(t=>t.key===e);!t||t.fixed||m(n=>{let r=t.imageIds;return n.filter(t=>t.key!==e).map(e=>e.key===`unsorted`?{...e,imageIds:[...e.imageIds,...r]}:e)})}function L(e){E(t=>{let n={...t,[e]:!t[e]};return n[e]||ee(t=>{let n={...t};return delete n[e],n}),n})}function ze(e,t){ee(n=>{let r=new Set(n[e]||[]);return r.has(t)?r.delete(t):r.add(t),{...n,[e]:r}})}function Be(e,t){return w[e]?.has(t)??!1}let Ve=(0,_.useCallback)(()=>{let e={},n={},r=[],i=[],o=[],c=[],u={packshot:`packshot`,human:`lifestyle-human`,normal_lifestyle:`lifestyle-normal`,artwork:`artwork`,video:`video`};p.forEach(t=>{if(t.key===`unsorted`||t.key===`duplicate`)return;let n=_i(t.key);e[n]=t.title,i.push(n),t.imageIds.forEach(e=>r.push({id:e,category:n,categoryName:t.title}))}),di.forEach(({key:t})=>{let n=u[t],a=_i(n),o=p.find(e=>e.key===n)?.title||t.replace(/_/g,` `);e[a]||(e[a]=o,i.push(a)),h[t].forEach(e=>r.push({id:e,category:a,categoryName:o}))}),Object.entries(w).forEach(([,e])=>{e.forEach(e=>o.push(e))}),di.forEach(({key:e})=>{T[`dup-${e}`]&&(h[e].length>0&&c.push([...h[e]]),h[e].forEach(e=>{o.includes(e)||o.push(e)}))});let d={Packshot:`packshot`,Human:`lifestyle_human`,"Normal Lifestyle":`lifestyle_normal`,Artwork:`artwork`};return Object.entries(S).forEach(([e,t])=>{n[d[e]||e]=t}),{folderPath:t,outputFolderPaths:n,customEan:a.trim()||void 0,productName:s.trim()||void 0,productNameContinuous:l,namingMode:vi(se.namingMode),outputCategories:e,outputMode:yi(se.outputMode),categoryOrder:i,assignments:r,priorityIds:o.length>0?o:void 0,duplicateFirstGroups:c}},[t,p,h,v,S,a,s,l,se,w,T]);async function He(){if(t){de(!0);try{le((await Xn(`/api/ean-renamer/batch/preview`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(Ve())})).items),re(!0)}catch(t){e(`Preview failed`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{de(!1)}}}async function Ue(){if(t){de(!0);try{let t=await Xn(`/api/ean-renamer/batch/apply`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(Ve())});le(t.items),t.logPath&&N(t.logPath);let n=t.renamed??t.items.length,r=t.skipped??t.skippedCount??0,i=Array.isArray(t.conflicts)?t.conflicts.length:t.conflicts??0;e(`Rename complete`,{type:i>0?`warning`:`success`,message:`${n} processed, ${r} skipped, ${i} conflicts`})}catch(t){e(`Rename failed`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{de(!1)}}}async function We(){if(!(!M||!t)){de(!0);try{await Xn(`/api/ean-renamer/rename/undo`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({folderPath:t,logPath:M})}),e(`Undo complete`,{type:`success`}),N(``),await we(t)}catch(t){e(`Undo failed`,{type:`error`,message:t instanceof Error?t.message:String(t)})}finally{de(!1)}}}function R(e){e.preventDefault();let t=e.clientY,n=ae;function r(e){oe(Math.max(80,Math.min(500,n-(e.clientY-t))))}function i(){document.removeEventListener(`mousemove`,r),document.removeEventListener(`mouseup`,i)}document.addEventListener(`mousemove`,r),document.addEventListener(`mouseup`,i)}(0,_.useEffect)(()=>{if(!D)return;function e(e){_e.current&&!_e.current.contains(e.target)&&te(!1)}return document.addEventListener(`mousedown`,e),()=>document.removeEventListener(`mousedown`,e)},[D]);let Ge=(0,_.useMemo)(()=>{let e=0,t=0,n=0;return j.forEach(r=>{(r.status||`rename`)===`rename`?e++:r.status===`skip`?t++:n++}),{renamed:e,skipped:t,conflicts:n}},[j]);function Ke(e,n){let r=ve.get(e);if(!r)return null;let i=b.has(e),a=P.includes(e),o=n&&T[n],s=n?Be(n,e):!1;return(0,z.jsxs)(`div`,{className:`ren-card ${i?`ren-card-selected`:``} ${a?`ren-card-dragging`:``} ${s?`ren-card-priority`:``}`,draggable:!0,onMouseEnter:e=>Fe(e,r),onMouseMove:e=>Fe(e,r),onMouseLeave:()=>A(null),onDragStart:t=>Oe(t,e),onDragEnd:Pe,children:[(0,z.jsx)(`input`,{type:`checkbox`,className:`ren-card-check`,checked:i,onChange:()=>I(e)}),(0,z.jsx)(`div`,{className:`ren-card-thumb`,children:(0,z.jsx)(`img`,{src:gi(e,t),alt:r.name,loading:`lazy`})}),(0,z.jsxs)(`div`,{className:`ren-card-meta`,children:[(0,z.jsx)(`span`,{className:`ren-card-name`,title:r.name,children:r.name}),(0,z.jsxs)(`span`,{className:`ren-card-info`,children:[r.width,`×`,r.height,` · `,hi(r.sizeBytes)]}),(0,z.jsxs)(`div`,{className:`ren-card-chips`,children:[(0,z.jsx)(`span`,{className:`ren-chip`,children:r.extension.toUpperCase()}),j.some(t=>t.id===e&&(t.status||`rename`)===`rename`)&&(0,z.jsx)(`span`,{className:`ren-chip ren-chip-renamed`,children:`renamed`})]})]}),o&&(0,z.jsx)(`button`,{className:`ren-priority-btn ${s?`ren-priority-active`:``}`,title:s?`Remove first-image priority`:`Label as first image`,onClick:t=>{t.stopPropagation(),n&&ze(n,e)},children:`★`}),(0,z.jsx)(`span`,{className:`ren-card-grip`,title:`Drag`,children:`☰`})]},e)}return(0,z.jsxs)(`div`,{className:`ren-root`,children:[(0,z.jsx)(`style`,{children:Si}),(0,z.jsx)(`div`,{className:`ren-topbar`,children:(0,z.jsxs)(`div`,{className:`ren-topbar-row`,children:[(0,z.jsxs)(`div`,{className:`ren-folder-group`,children:[(0,z.jsx)(`input`,{className:`ren-path-input`,readOnly:!0,value:t,placeholder:`No folder selected`}),(0,z.jsx)(`button`,{className:`btn btn-primary btn-sm`,onClick:Ce,children:`Pick Folder`}),(0,z.jsx)(`button`,{className:`btn btn-secondary btn-sm`,onClick:Ee,disabled:!t,children:`Open`}),(0,z.jsx)(`button`,{className:`btn btn-secondary btn-sm`,onClick:Te,disabled:!t,children:`Refresh`})]}),(0,z.jsxs)(`div`,{className:`ren-stat-group`,children:[(0,z.jsxs)(`label`,{className:`ren-stat`,children:[(0,z.jsx)(`span`,{children:`EAN`}),(0,z.jsx)(`input`,{className:`ren-stat-input`,readOnly:!0,value:r,placeholder:`--`})]}),(0,z.jsx)(`span`,{className:`ren-ean-badge ${ye?`valid`:`warn`}`,children:ye?`✓`:`⚠`}),(0,z.jsxs)(`label`,{className:`ren-stat`,children:[(0,z.jsx)(`span`,{children:`Custom EAN`}),(0,z.jsx)(`input`,{className:`ren-stat-input`,value:a,onChange:e=>o(e.target.value),placeholder:`Override`})]}),(0,z.jsxs)(`div`,{className:`ren-stat ren-product-stat`,children:[(0,z.jsx)(`span`,{children:`Product Name`}),(0,z.jsx)(`input`,{className:`ren-stat-input ren-product-input`,value:s,onChange:e=>c(e.target.value),placeholder:`Output name`}),(0,z.jsxs)(`label`,{className:`ren-product-continuous`,title:`Use EAN_ProductName_1, EAN_ProductName_2 naming`,children:[(0,z.jsx)(`input`,{type:`checkbox`,checked:l,onChange:e=>u(e.target.checked),disabled:!s.trim()}),(0,z.jsx)(`span`,{children:`EAN_ProductName`})]})]}),(0,z.jsxs)(`div`,{className:`ren-stat`,children:[(0,z.jsx)(`span`,{children:`Total`}),(0,z.jsx)(`strong`,{children:be})]}),(0,z.jsxs)(`div`,{className:`ren-stat`,children:[(0,z.jsx)(`span`,{children:`Selected`}),(0,z.jsx)(`strong`,{children:xe})]})]}),(0,z.jsxs)(`div`,{className:`ren-settings-wrap`,ref:_e,children:[(0,z.jsx)(`button`,{className:`btn btn-secondary btn-sm ren-gear`,onClick:()=>te(e=>!e),title:`Settings`,children:`⚙`}),D&&(0,z.jsxs)(`div`,{className:`ren-settings-popover`,children:[(0,z.jsx)(`h4`,{children:`Settings`}),(0,z.jsxs)(`label`,{className:`ren-setting-row`,children:[(0,z.jsx)(`span`,{children:`Action`}),(0,z.jsxs)(`select`,{value:se.outputMode,onChange:e=>ce(t=>({...t,outputMode:e.target.value})),children:[(0,z.jsx)(`option`,{value:`copy`,children:`Copy`}),(0,z.jsx)(`option`,{value:`in-folder`,children:`In-folder rename`})]})]}),(0,z.jsxs)(`label`,{className:`ren-setting-row`,children:[(0,z.jsx)(`span`,{children:`Naming mode`}),(0,z.jsxs)(`select`,{value:se.namingMode,onChange:e=>ce(t=>({...t,namingMode:e.target.value})),children:[(0,z.jsx)(`option`,{value:`per-category`,children:`Per category`}),(0,z.jsx)(`option`,{value:`continuous`,children:`Continuous`}),(0,z.jsx)(`option`,{value:`prefixed`,children:`Prefixed`})]})]}),(0,z.jsxs)(`label`,{className:`ren-setting-row`,children:[(0,z.jsx)(`span`,{children:`Dark mode`}),(0,z.jsx)(`input`,{type:`checkbox`,checked:!0,disabled:!0})]})]})]})]})}),(0,z.jsxs)(`div`,{className:`ren-output-bar`,children:[(0,z.jsxs)(`span`,{className:`ren-output-label`,children:[(0,z.jsxs)(`svg`,{width:`14`,height:`14`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,children:[(0,z.jsx)(`path`,{d:`M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4`}),(0,z.jsx)(`polyline`,{points:`17 8 12 3 7 8`}),(0,z.jsx)(`line`,{x1:`12`,y1:`3`,x2:`12`,y2:`15`})]}),`Output`]}),(0,z.jsx)(`div`,{className:`ren-output-fields`,children:ui.map(e=>(0,z.jsxs)(`div`,{className:`ren-output-field`,onClick:()=>De(e),children:[(0,z.jsx)(`span`,{className:`ren-output-cat`,children:e}),(0,z.jsx)(`span`,{className:`ren-output-path`,children:S[e]||`Set output`}),S[e]&&(0,z.jsx)(`button`,{className:`ren-output-clear`,onClick:t=>{t.stopPropagation(),C(t=>{let n={...t};return delete n[e],n})},children:`×`})]},e))}),(0,z.jsx)(`button`,{className:`btn btn-secondary btn-sm`,onClick:()=>C({}),disabled:Object.keys(S).length===0,children:`Clear all`})]}),(0,z.jsxs)(`div`,{className:`ren-board`,children:[p.map(e=>(0,z.jsxs)(`div`,{className:`ren-column ${F===e.key?`ren-column-drop`:``}`,onDragOver:t=>ke(t,e.key),onDragLeave:Ae,onDrop:t=>je(t,e.key),children:[(0,z.jsxs)(`div`,{className:`ren-col-header`,children:[(0,z.jsx)(`span`,{className:`ren-col-title`,onDoubleClick:()=>!e.fixed&&Le(e.key),title:e.fixed?e.title:`Double-click to rename`,children:e.title}),(0,z.jsx)(`span`,{className:`ren-col-count`,children:e.key===`duplicate`?Se:e.imageIds.length}),!e.fixed&&(0,z.jsxs)(`label`,{className:`ren-priority-toggle`,title:`Select which images get numbered as #1`,children:[(0,z.jsx)(`input`,{type:`checkbox`,checked:!!T[e.key],onChange:()=>L(e.key)}),(0,z.jsx)(`span`,{children:`1st`})]}),!e.fixed&&(0,z.jsx)(`button`,{className:`ren-col-menu`,onClick:()=>Re(e.key),title:`Remove column`,children:`×`})]}),e.key===`duplicate`?(0,z.jsx)(`div`,{className:`ren-col-body ren-duplicate-body`,children:di.map(({key:e,label:t})=>{let n=`dup-${e}`;return(0,z.jsxs)(`div`,{className:`ren-duplicate-section ${me===e?`ren-duplicate-drop`:``}`,onDragOver:t=>Me(t,e),onDragLeave:Ae,onDrop:t=>Ne(t,e),children:[(0,z.jsxs)(`div`,{className:`ren-duplicate-header`,children:[(0,z.jsx)(`input`,{className:`ren-duplicate-type`,value:v[e],placeholder:t,onChange:t=>y(n=>({...n,[e]:t.target.value}))}),(0,z.jsxs)(`label`,{className:`ren-priority-toggle`,title:`Select which images get numbered as #1`,children:[(0,z.jsx)(`input`,{type:`checkbox`,checked:!!T[n],onChange:()=>L(n)}),(0,z.jsx)(`span`,{children:`1st`})]})]}),(0,z.jsxs)(`div`,{className:`ren-duplicate-images`,children:[h[e].map(e=>Ke(e,n)),h[e].length===0&&(0,z.jsx)(`div`,{className:`ren-duplicate-empty`,children:`Drop images here`})]})]},e)})}):(0,z.jsxs)(`div`,{className:`ren-col-body`,children:[e.imageIds.map(t=>Ke(t,e.key)),e.imageIds.length===0&&(0,z.jsx)(`div`,{className:`ren-col-empty`,children:`Drop images here`})]})]},e.key)),(0,z.jsx)(`button`,{className:`ren-add-col`,onClick:Ie,title:`Add category`,children:`+`})]}),k&&(0,z.jsxs)(`div`,{className:`ren-hover-preview`,style:{left:Math.max(12,Math.min(k.x+18,window.innerWidth-340)),top:Math.max(12,Math.min(k.y+18,window.innerHeight-430))},children:[(0,z.jsx)(`div`,{className:`ren-hover-image-wrap`,children:(0,z.jsx)(`img`,{src:gi(k.image.id,t),alt:k.image.name})}),(0,z.jsx)(`div`,{className:`ren-hover-name`,title:k.image.name,children:k.image.name}),(0,z.jsxs)(`div`,{className:`ren-hover-meta`,children:[k.image.width,`×`,k.image.height,` · `,hi(k.image.sizeBytes),` · `,k.image.extension.toUpperCase()]})]}),(0,z.jsxs)(`div`,{className:`ren-footer`,children:[O&&(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(`div`,{className:`ren-resize-handle`,ref:ge,onMouseDown:R}),(0,z.jsxs)(`div`,{className:`ren-preview-panel`,style:{height:ae},children:[(0,z.jsx)(`div`,{className:`ren-preview-table-wrap`,children:(0,z.jsxs)(`table`,{className:`ren-preview-table`,children:[(0,z.jsx)(`thead`,{children:(0,z.jsxs)(`tr`,{children:[(0,z.jsx)(`th`,{children:`Current Name`}),(0,z.jsx)(`th`,{}),(0,z.jsx)(`th`,{children:`Output Path`})]})}),(0,z.jsxs)(`tbody`,{children:[j.slice(0,50).map((e,t)=>(0,z.jsxs)(`tr`,{className:`ren-plan-${e.status||`rename`}`,children:[(0,z.jsx)(`td`,{children:e.oldName}),(0,z.jsx)(`td`,{className:`ren-arrow`,children:`→`}),(0,z.jsx)(`td`,{children:bi(e)})]},t)),j.length===0&&(0,z.jsx)(`tr`,{children:(0,z.jsx)(`td`,{colSpan:3,className:`ren-table-empty`,children:`Click Preview to generate rename plan`})})]})]})}),(0,z.jsxs)(`div`,{className:`ren-summary-card`,children:[(0,z.jsxs)(`div`,{className:`ren-summary-item ren-summary-green`,children:[(0,z.jsx)(`strong`,{children:Ge.renamed}),(0,z.jsx)(`span`,{children:`To rename`})]}),(0,z.jsxs)(`div`,{className:`ren-summary-item`,children:[(0,z.jsx)(`strong`,{children:Ge.skipped}),(0,z.jsx)(`span`,{children:`Skipped`})]}),(0,z.jsxs)(`div`,{className:`ren-summary-item ${Ge.conflicts>0?`ren-summary-amber`:``}`,children:[(0,z.jsx)(`strong`,{children:Ge.conflicts}),(0,z.jsx)(`span`,{children:`Conflicts`})]})]})]})]}),(0,z.jsxs)(`div`,{className:`ren-actions`,children:[(0,z.jsx)(`button`,{className:`btn btn-secondary btn-sm`,onClick:()=>ie(e=>!e),children:O?`Hide Preview`:`Show Preview`}),(0,z.jsxs)(`div`,{className:`ren-actions-right`,children:[(0,z.jsx)(`button`,{className:`btn btn-secondary`,onClick:He,disabled:ue||!t,children:`Preview`}),(0,z.jsx)(`button`,{className:`btn btn-primary`,onClick:Ue,disabled:ue||!t,children:se.outputMode===`copy`?`Copy`:`Rename`}),(0,z.jsx)(`button`,{className:`btn btn-secondary`,onClick:We,disabled:ue||!M,children:`Undo`})]})]})]}),ne&&(0,z.jsx)(`div`,{className:`ren-modal-overlay`,onClick:()=>re(!1),children:(0,z.jsxs)(`div`,{className:`ren-modal`,onClick:e=>e.stopPropagation(),children:[(0,z.jsxs)(`div`,{className:`ren-modal-header`,children:[(0,z.jsx)(`h3`,{children:`Rename Preview`}),(0,z.jsx)(`button`,{className:`ren-modal-close`,onClick:()=>re(!1),children:`×`})]}),(0,z.jsx)(`div`,{className:`ren-modal-body`,children:(0,z.jsxs)(`table`,{className:`ren-preview-table ren-preview-table-full`,children:[(0,z.jsx)(`thead`,{children:(0,z.jsxs)(`tr`,{children:[(0,z.jsx)(`th`,{children:`#`}),(0,z.jsx)(`th`,{children:`Category`}),(0,z.jsx)(`th`,{children:`Current Name`}),(0,z.jsx)(`th`,{}),(0,z.jsx)(`th`,{children:`Output Path`}),(0,z.jsx)(`th`,{children:`Status`})]})}),(0,z.jsx)(`tbody`,{children:j.map((e,t)=>(0,z.jsxs)(`tr`,{className:`ren-plan-${e.status||`rename`}`,children:[(0,z.jsx)(`td`,{children:t+1}),(0,z.jsx)(`td`,{children:e.category}),(0,z.jsx)(`td`,{children:e.oldName}),(0,z.jsx)(`td`,{className:`ren-arrow`,children:`→`}),(0,z.jsx)(`td`,{children:bi(e)}),(0,z.jsx)(`td`,{children:(0,z.jsx)(`span`,{className:`ren-status-badge ren-status-${e.status||`rename`}`,children:e.status||`rename`})})]},t))})]})}),(0,z.jsxs)(`div`,{className:`ren-modal-footer`,children:[(0,z.jsx)(`button`,{className:`btn btn-secondary`,onClick:()=>re(!1),children:`Close`}),(0,z.jsx)(`button`,{className:`btn btn-primary`,onClick:()=>{re(!1),Ue()},children:`Apply`})]})]})})]})}var Si=`
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
`;function Ci(){return(0,z.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,z.jsx)(`rect`,{x:`3`,y:`3`,width:`7`,height:`7`,rx:`1`}),(0,z.jsx)(`rect`,{x:`14`,y:`3`,width:`7`,height:`7`,rx:`1`}),(0,z.jsx)(`rect`,{x:`3`,y:`14`,width:`7`,height:`7`,rx:`1`}),(0,z.jsx)(`rect`,{x:`14`,y:`14`,width:`7`,height:`7`,rx:`1`})]})}function wi(){return(0,z.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,z.jsx)(`path`,{d:`M9 11l3 3L22 4`}),(0,z.jsx)(`path`,{d:`M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11`})]})}function Ti(){return(0,z.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,z.jsx)(`rect`,{x:`3`,y:`3`,width:`18`,height:`18`,rx:`2`}),(0,z.jsx)(`circle`,{cx:`8.5`,cy:`8.5`,r:`1.5`}),(0,z.jsx)(`path`,{d:`M21 15l-5-5L5 21`})]})}function Ei(){return(0,z.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,z.jsx)(`rect`,{x:`2`,y:`4`,width:`2`,height:`16`}),(0,z.jsx)(`rect`,{x:`6`,y:`4`,width:`1.5`,height:`16`}),(0,z.jsx)(`rect`,{x:`10`,y:`4`,width:`2.5`,height:`16`}),(0,z.jsx)(`rect`,{x:`14`,y:`4`,width:`1`,height:`16`}),(0,z.jsx)(`rect`,{x:`17`,y:`4`,width:`2`,height:`16`}),(0,z.jsx)(`rect`,{x:`21`,y:`4`,width:`1`,height:`16`})]})}function Di(){return(0,z.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,z.jsx)(`path`,{d:`M17 3a2.83 2.83 0 114 4L7.5 20.5 2 22l1.5-5.5z`}),(0,z.jsx)(`path`,{d:`M15 5l4 4`})]})}function Oi(){return(0,z.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,z.jsx)(`circle`,{cx:`12`,cy:`12`,r:`3`}),(0,z.jsx)(`path`,{d:`M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z`})]})}function ki(){return(0,z.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,z.jsx)(`circle`,{cx:`11`,cy:`11`,r:`8`}),(0,z.jsx)(`path`,{d:`M21 21l-4.35-4.35`})]})}function Ai(){return(0,z.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,z.jsx)(`path`,{d:`M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9`}),(0,z.jsx)(`path`,{d:`M13.73 21a2 2 0 01-3.46 0`})]})}function H(){return(0,z.jsx)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:(0,z.jsx)(`path`,{d:`M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z`})})}function U(){return(0,z.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,z.jsx)(`path`,{d:`M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4`}),(0,z.jsx)(`polyline`,{points:`17 8 12 3 7 8`}),(0,z.jsx)(`line`,{x1:`12`,y1:`3`,x2:`12`,y2:`15`})]})}function ji(){return(0,z.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,z.jsx)(`line`,{x1:`5`,y1:`12`,x2:`19`,y2:`12`}),(0,z.jsx)(`polyline`,{points:`12 5 19 12 12 19`})]})}function Mi(){return(0,z.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,z.jsx)(`line`,{x1:`3`,y1:`12`,x2:`21`,y2:`12`}),(0,z.jsx)(`line`,{x1:`3`,y1:`6`,x2:`21`,y2:`6`}),(0,z.jsx)(`line`,{x1:`3`,y1:`18`,x2:`21`,y2:`18`})]})}function Ni(){return(0,z.jsx)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:(0,z.jsx)(`polyline`,{points:`9 18 15 12 9 6`})})}function Pi(){return(0,z.jsxs)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,z.jsx)(`circle`,{cx:`12`,cy:`12`,r:`5`}),(0,z.jsx)(`line`,{x1:`12`,y1:`1`,x2:`12`,y2:`3`}),(0,z.jsx)(`line`,{x1:`12`,y1:`21`,x2:`12`,y2:`23`}),(0,z.jsx)(`line`,{x1:`4.22`,y1:`4.22`,x2:`5.64`,y2:`5.64`}),(0,z.jsx)(`line`,{x1:`18.36`,y1:`18.36`,x2:`19.78`,y2:`19.78`}),(0,z.jsx)(`line`,{x1:`1`,y1:`12`,x2:`3`,y2:`12`}),(0,z.jsx)(`line`,{x1:`21`,y1:`12`,x2:`23`,y2:`12`}),(0,z.jsx)(`line`,{x1:`4.22`,y1:`19.78`,x2:`5.64`,y2:`18.36`}),(0,z.jsx)(`line`,{x1:`18.36`,y1:`5.64`,x2:`19.78`,y2:`4.22`})]})}function Fi(){return(0,z.jsx)(`svg`,{viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:(0,z.jsx)(`path`,{d:`M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z`})})}function Ii(){return(0,z.jsx)(`img`,{src:`/icons/logo.png`,alt:`GRIMOIRE`,style:{width:28,height:28,borderRadius:6,objectFit:`contain`}})}var Li={"/":`1`,"/data-qc":`2`,"/image-edit":`3`,"/ean-sorter":`4`,"/ean-renamer":`5`},Ri=[{to:`/`,label:`Dashboard`,icon:Ci,img:null,mono:!1},{to:`/data-qc`,label:`Data QC`,icon:wi,img:`/icons/data-qc.png`,mono:!1},{to:`/image-edit`,label:`Image Edit`,icon:Ti,img:`/icons/image-edit.png`,mono:!1},{to:`/ean-sorter`,label:`EAN Sorter`,icon:Ei,img:`/icons/ean-sorter.png`,mono:!0},{to:`/ean-renamer`,label:`EAN Renamer`,icon:Di,img:`/icons/ean-renamer.png`,mono:!1}];function zi({collapsed:e,onToggle:t,onOpenSettings:n}){return(0,z.jsxs)(`nav`,{className:`sidebar ${e?`collapsed`:``}`,children:[(0,z.jsxs)(`div`,{className:`sidebar-brand`,children:[(0,z.jsx)(Ii,{}),!e&&(0,z.jsx)(`span`,{className:`sidebar-brand-text`,children:`GRIMOIRE`})]}),(0,z.jsxs)(`div`,{className:`sidebar-nav`,children:[!e&&(0,z.jsx)(`div`,{className:`sidebar-section-label`,children:`Main`}),Ri.map(t=>(0,z.jsxs)(Cn,{to:t.to,end:t.to===`/`,className:({isActive:e})=>`sidebar-link ${e?`active`:``}`,title:e?t.label:void 0,children:[t.img?(0,z.jsx)(`img`,{src:t.img,alt:``,className:`sidebar-link-img${t.mono?` icon-mono`:``}`}):(0,z.jsx)(t.icon,{}),!e&&(0,z.jsx)(`span`,{className:`sidebar-link-text`,children:t.label}),!e&&Li[t.to]&&(0,z.jsxs)(`kbd`,{className:`sidebar-kbd`,children:[`Ctrl+`,Li[t.to]]})]},t.to))]}),(0,z.jsxs)(`div`,{className:`sidebar-bottom`,children:[(0,z.jsxs)(`button`,{className:`sidebar-link sidebar-link-btn`,onClick:n,title:e?`Settings`:void 0,children:[(0,z.jsx)(Oi,{}),!e&&(0,z.jsx)(`span`,{className:`sidebar-link-text`,children:`Settings`})]}),(0,z.jsxs)(`button`,{className:`sidebar-link sidebar-link-btn`,onClick:t,title:e?`Expand sidebar`:`Collapse sidebar`,children:[(0,z.jsx)(Mi,{}),!e&&(0,z.jsx)(`span`,{className:`sidebar-link-text`,children:`Collapse`})]})]})]})}var Bi={"/":`Dashboard`,"/data-qc":`Data Quality Control`,"/image-edit":`Image Edit`,"/ean-sorter":`EAN Sorter`,"/ean-renamer":`EAN Renamer`};function Vi(){let e=tt(),t=Bi[e.pathname]??`Page`;return(0,z.jsxs)(`div`,{className:`breadcrumb`,children:[e.pathname!==`/`&&(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(Cn,{to:`/`,className:`breadcrumb-link`,children:`Dashboard`}),(0,z.jsx)(Ni,{})]}),(0,z.jsx)(`span`,{className:`breadcrumb-current`,children:t})]})}function Hi({open:e,onClose:t}){let{notifications:n,markAllRead:r,dismiss:i,clearAll:a}=qn(),o=(0,_.useRef)(null);if((0,_.useEffect)(()=>{if(!e)return;let n=e=>{o.current&&!o.current.contains(e.target)&&t()};return document.addEventListener(`mousedown`,n),()=>document.removeEventListener(`mousedown`,n)},[e,t]),!e)return null;let s=e=>{let t=Math.floor((Date.now()-e)/1e3);return t<60?`just now`:t<3600?`${Math.floor(t/60)}m ago`:t<86400?`${Math.floor(t/3600)}h ago`:`${Math.floor(t/86400)}d ago`};return(0,z.jsxs)(`div`,{className:`notif-panel`,ref:o,children:[(0,z.jsxs)(`div`,{className:`notif-panel-header`,children:[(0,z.jsx)(`h3`,{children:`Notifications`}),(0,z.jsxs)(`div`,{className:`notif-panel-actions`,children:[(0,z.jsx)(`button`,{onClick:r,children:`Mark all read`}),(0,z.jsx)(`button`,{onClick:a,children:`Clear`})]})]}),(0,z.jsx)(`div`,{className:`notif-panel-body`,children:n.length===0?(0,z.jsx)(`div`,{className:`notif-empty`,children:`No notifications yet`}):n.map(e=>(0,z.jsxs)(`div`,{className:`notif-item ${e.read?``:`unread`} notif-${e.type}`,children:[(0,z.jsx)(`div`,{className:`notif-dot`}),(0,z.jsxs)(`div`,{className:`notif-content`,children:[(0,z.jsx)(`div`,{className:`notif-title`,children:e.title}),e.message&&(0,z.jsx)(`div`,{className:`notif-msg`,children:e.message}),(0,z.jsx)(`div`,{className:`notif-time`,children:s(e.timestamp)})]}),(0,z.jsx)(`button`,{className:`notif-dismiss`,onClick:()=>i(e.id),children:`âœ•`})]},e.id))})]})}function Ui({collapsed:e}){let{theme:t,toggle:n}=Un(),{unreadCount:r}=qn(),[i,a]=(0,_.useState)(null),[o,s]=(0,_.useState)(!1);return(0,_.useEffect)(()=>{let e=()=>fetch(Yn(`/health`)).then(e=>e.ok&&a(!0)).catch(()=>a(!1));e();let t=setInterval(e,3e4);return()=>clearInterval(t)},[]),(0,z.jsxs)(`header`,{className:`topbar`,style:{left:e?`var(--sidebar-collapsed)`:`var(--sidebar-width)`},children:[(0,z.jsx)(Vi,{}),(0,z.jsxs)(`div`,{className:`topbar-search`,children:[(0,z.jsx)(ki,{}),(0,z.jsx)(`input`,{type:`text`,placeholder:`Search features, tools...`})]}),(0,z.jsx)(`div`,{className:`topbar-spacer`}),(0,z.jsxs)(`div`,{className:`topbar-actions`,children:[i!==null&&(0,z.jsxs)(`span`,{className:`status-online ${i?``:`offline`}`,children:[(0,z.jsx)(`span`,{className:`dot`}),i?`Online`:`Offline`]}),(0,z.jsx)(`button`,{className:`topbar-btn`,onClick:n,title:`Switch to ${t===`dark`?`light`:`dark`} mode`,children:t===`dark`?(0,z.jsx)(Pi,{}):(0,z.jsx)(Fi,{})}),(0,z.jsxs)(`div`,{style:{position:`relative`},children:[(0,z.jsxs)(`button`,{className:`topbar-btn`,onClick:()=>s(!o),children:[(0,z.jsx)(Ai,{}),r>0&&(0,z.jsx)(`span`,{className:`badge`,children:r>9?`9+`:r})]}),(0,z.jsx)(Hi,{open:o,onClose:()=>s(!1)})]}),(0,z.jsxs)(`div`,{className:`topbar-user`,children:[(0,z.jsx)(`img`,{src:`/icons/tray.png`,alt:``,className:`topbar-avatar-img`}),(0,z.jsx)(`span`,{className:`topbar-username`,children:`GRIMOIRE`})]})]})]})}var Wi=[{to:`/data-qc`,title:`Data Quality Control`,desc:`Audit master data, validate fields, generate quality reports`,icon:wi,img:`/icons/data-qc.png`,mono:!1,gradient:`linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)`},{to:`/image-edit`,title:`Image Edit`,desc:`AI background removal, upscaling, batch canvas editing`,icon:Ti,img:`/icons/image-edit.png`,mono:!1,gradient:`linear-gradient(135deg, #0891b2 0%, #0e7490 100%)`},{to:`/ean-sorter`,title:`EAN Sorter`,desc:`Scan folders for EAN barcodes, sort files into organized structure`,icon:Ei,img:`/icons/ean-sorter.png`,mono:!0,gradient:`linear-gradient(135deg, #059669 0%, #047857 100%)`},{to:`/ean-renamer`,title:`EAN Renamer`,desc:`Batch rename product images by EAN with drag-and-drop`,icon:Di,img:`/icons/ean-renamer.png`,mono:!1,gradient:`linear-gradient(135deg, #d97706 0%, #b45309 100%)`}],Gi=[{to:`/ean-sorter`,title:`Scan Folder`,desc:`Quick-scan a folder for EAN barcodes`,icon:H,bg:`#059669`},{to:`/image-edit`,title:`Batch Process`,desc:`Upload images for bulk editing`,icon:U,bg:`#0891b2`},{to:`/data-qc`,title:`Run Audit`,desc:`Start a data quality check`,icon:wi,bg:`#4f46e5`}],Ki=[{img:`/icons/banner-data-qc.jpg`,to:`/data-qc`,title:`Data Quality Control`,desc:`Audit master data, validate fields, generate missing data reports and quality checks across brands.`,btn:`Open Data QC`},{img:`/icons/banner-image-edit.jpg`,to:`/image-edit`,title:`Image Edit`,desc:`AI-powered background removal, smart upscaling, batch canvas editing for product images.`,btn:`Open Image Edit`},{img:`/icons/banner-ean-sorter.jpg`,to:`/ean-sorter`,title:`EAN Sorter`,desc:`Scan folders for EAN barcodes, sort files into organized structure, and categorize by product status.`,btn:`Open EAN Sorter`},{img:`/icons/banner-ean-renamer.jpg`,to:`/ean-renamer`,title:`EAN Renamer`,desc:`Batch rename product images by EAN with drag-and-drop, multiple naming modes and category support.`,btn:`Open EAN Renamer`}],qi=[{version:`2026.06.16.4`,date:`2026-06-16`,title:`Master Data tab & Status folder creation`,type:`Data QC + EAN Sorter`,changes:[`New Master Data tab: upload DQC report + master data, select brand, generate Missing_Data and Status files.`,`EAN Sorter Categorize: upload status file to create product folders organized by status with EAN subfolders.`,`Prefixed naming now uses full category names (Pack_shot, Human, etc.) with per-category numbering.`]},{version:`2026.06.16.2`,date:`2026-06-16`,title:`EAN Renamer output isolation`,type:`EAN Renamer`,changes:[`Lifestyle/Human and Lifestyle/Normal copy outputs now create an EAN subfolder.`,`Packshot and Artwork continue to output into category/EAN folders.`,`Desktop startup now avoids reusing old backend processes.`]},{version:`2026.06.16.1`,date:`2026-06-16`,title:`Prefixed naming and duplicate first-shot handling`,type:`EAN Renamer`,changes:[`Prefixed mode supports duplicate JPG/PNG variants sharing the same first-shot number.`,`Product Name only uses EAN_ProductName naming when the checkbox is enabled.`,`Custom EAN works with both Prefixed and EAN_ProductName naming flows.`]},{version:`2026.06.16.0`,date:`2026-06-16`,title:`Portability and support scripts`,type:`System`,changes:[`Removed machine-specific path assumptions from desktop and startup scripts.`,`Added setup, repair, and diagnostic scripts for testers on other Windows machines.`,`Added installation, user, and SOP documentation files.`]},{version:`2026.06.15`,date:`2026-06-15`,title:`Unified GRIMOIRE desktop toolkit`,type:`Platform`,changes:[`Integrated Data QC, Image Edit, EAN Sorter, and EAN Renamer into one desktop shell.`,`Added WebView2 desktop wrapper with local backend bridge.`,`Added initial dashboard, navigation, and shared UI structure.`]}];function Ji(){let e=it(),{notify:t}=qn(),[n,r]=(0,_.useState)(()=>Math.floor(Math.random()*Ki.length)),i=(0,_.useRef)(null),a=(0,_.useCallback)(()=>{i.current&&clearInterval(i.current),i.current=setInterval(()=>{r(e=>(e+1)%Ki.length)},6e3)},[]);(0,_.useEffect)(()=>(t(`Welcome to GRIMOIRE`,{type:`info`,message:`All systems operational`,browser:!1}),a(),()=>{i.current&&clearInterval(i.current)}),[]);let o=e=>{r(e),a()},s=Ki[n],c=qi[0];return(0,z.jsxs)(`div`,{className:`view`,children:[(0,z.jsxs)(`div`,{className:`hero changelog-hero`,children:[(0,z.jsxs)(`div`,{className:`hero-visual changelog-visual`,style:{position:`relative`,overflow:`hidden`},children:[Ki.map((e,t)=>(0,z.jsx)(`div`,{style:{position:`absolute`,inset:0,backgroundImage:`url(${e.img})`,backgroundSize:`cover`,backgroundPosition:`center`,opacity:+(t===n),transition:`opacity 0.8s ease`}},e.to)),(0,z.jsx)(`div`,{style:{position:`absolute`,inset:0,background:`linear-gradient(135deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 60%, rgba(0,0,0,0.3) 100%)`}}),(0,z.jsxs)(`div`,{className:`hero-content`,style:{position:`relative`,zIndex:2},children:[(0,z.jsx)(`h1`,{style:{fontSize:`1.7rem`,marginBottom:8,textShadow:`0 2px 8px rgba(0,0,0,0.7), 0 0 2px rgba(0,0,0,0.5)`,color:`#fff`,fontWeight:800},children:s.title}),(0,z.jsx)(`p`,{style:{fontSize:`0.95rem`,maxWidth:420,lineHeight:1.55,textShadow:`0 1px 6px rgba(0,0,0,0.6)`,color:`rgba(255,255,255,0.95)`},children:s.desc}),(0,z.jsxs)(`button`,{className:`hero-btn`,style:{marginTop:14},onClick:()=>e(s.to),children:[s.btn,` `,(0,z.jsx)(ji,{})]}),(0,z.jsx)(`div`,{style:{display:`flex`,gap:8,marginTop:16},children:Ki.map((e,t)=>(0,z.jsx)(`button`,{onClick:()=>o(t),style:{width:t===n?28:10,height:10,borderRadius:5,border:`none`,background:t===n?`#fff`:`rgba(255,255,255,0.4)`,cursor:`pointer`,transition:`all 0.3s ease`,padding:0}},t))})]})]}),(0,z.jsxs)(`div`,{className:`hero-info changelog-summary`,children:[(0,z.jsx)(`h3`,{children:`Latest Update`}),(0,z.jsx)(`span`,{className:`changelog-type`,style:{marginBottom:6,display:`inline-block`},children:c.type}),(0,z.jsx)(`h4`,{style:{margin:`4px 0 8px`,fontSize:`1rem`},children:c.title}),(0,z.jsx)(`ul`,{style:{margin:0,paddingLeft:18,fontSize:`0.85rem`,opacity:.85,lineHeight:1.6},children:c.changes.map(e=>(0,z.jsx)(`li`,{children:e},e))}),(0,z.jsxs)(`div`,{style:{fontSize:`0.78rem`,opacity:.5,marginTop:10},children:[`v`,c.version,` · `,c.date]})]})]}),(0,z.jsx)(`div`,{className:`section-header`,children:(0,z.jsx)(`h2`,{children:`Features`})}),(0,z.jsx)(`div`,{className:`card-grid`,children:Wi.map(e=>(0,z.jsxs)(Cn,{to:e.to,className:`feature-card`,children:[(0,z.jsx)(`div`,{className:`feature-card-cover`,children:(0,z.jsx)(`div`,{className:`feature-card-gradient`,style:{background:e.gradient},children:(0,z.jsx)(`img`,{src:e.img,alt:e.title,className:`feature-card-icon-img${e.mono?` icon-mono`:``}`})})}),(0,z.jsxs)(`div`,{className:`feature-card-body`,children:[(0,z.jsx)(`h3`,{children:e.title}),(0,z.jsx)(`p`,{children:e.desc}),(0,z.jsxs)(`div`,{className:`feature-card-status`,children:[(0,z.jsx)(`span`,{className:`dot`}),`Ready`]})]})]},e.to))}),(0,z.jsx)(`div`,{className:`section-header`,children:(0,z.jsx)(`h2`,{children:`Quick Actions`})}),(0,z.jsx)(`div`,{className:`quick-actions`,children:Gi.map(e=>(0,z.jsxs)(Cn,{to:e.to,className:`quick-action`,children:[(0,z.jsx)(`div`,{className:`quick-action-icon`,style:{background:e.bg},children:(0,z.jsx)(e.icon,{})}),(0,z.jsxs)(`div`,{className:`quick-action-text`,children:[(0,z.jsx)(`h4`,{children:e.title}),(0,z.jsx)(`p`,{children:e.desc})]})]},e.title))}),(0,z.jsx)(`div`,{className:`section-header`,children:(0,z.jsx)(`h2`,{children:`Release Notes`})}),(0,z.jsx)(`div`,{className:`changelog-list`,children:qi.map(e=>(0,z.jsxs)(`article`,{className:`changelog-entry`,children:[(0,z.jsxs)(`div`,{className:`changelog-entry-head`,children:[(0,z.jsxs)(`div`,{children:[(0,z.jsx)(`span`,{className:`changelog-type`,children:e.type}),(0,z.jsx)(`h3`,{children:e.title})]}),(0,z.jsxs)(`div`,{className:`changelog-meta`,children:[(0,z.jsx)(`strong`,{children:e.version}),(0,z.jsx)(`span`,{children:e.date})]})]}),(0,z.jsx)(`ul`,{children:e.changes.map(e=>(0,z.jsx)(`li`,{children:e},e))})]},e.version))})]})}function Yi(){let e=it(),[t,n]=(0,_.useState)(()=>localStorage.getItem(`grimoire-sidebar`)===`collapsed`),[r,i]=(0,_.useState)(!1);return(0,_.useEffect)(()=>{localStorage.setItem(`grimoire-sidebar`,t?`collapsed`:`expanded`)},[t]),(0,_.useEffect)(()=>{let t=t=>{if(t.ctrlKey&&!t.shiftKey&&!t.altKey){let n=[`/`,`/data-qc`,`/image-edit`,`/ean-sorter`,`/ean-renamer`],r=parseInt(t.key)-1;r>=0&&r<n.length&&(t.preventDefault(),e(n[r]))}};return window.addEventListener(`keydown`,t),()=>window.removeEventListener(`keydown`,t)},[e]),(0,z.jsxs)(`div`,{className:`app-layout ${t?`sidebar-collapsed`:``}`,children:[(0,z.jsx)(zi,{collapsed:t,onToggle:()=>n(!t),onOpenSettings:()=>i(!0)}),(0,z.jsx)(Ui,{collapsed:t}),(0,z.jsx)(`main`,{className:`main-content`,children:(0,z.jsxs)(jt,{children:[(0,z.jsx)(kt,{path:`/`,element:(0,z.jsx)(Ji,{})}),(0,z.jsx)(kt,{path:`/data-qc`,element:(0,z.jsx)(Or,{})}),(0,z.jsx)(kt,{path:`/image-edit`,element:(0,z.jsx)(oi,{})}),(0,z.jsx)(kt,{path:`/ean-sorter`,element:(0,z.jsx)(ci,{})}),(0,z.jsx)(kt,{path:`/ean-renamer`,element:(0,z.jsx)(xi,{})})]})}),(0,z.jsx)(Jn,{open:r,onClose:()=>i(!1)})]})}function Xi(){return(0,z.jsx)(Hn,{children:(0,z.jsx)(Kn,{children:(0,z.jsx)(yn,{children:(0,z.jsx)(Yi,{})})})})}(0,v.createRoot)(document.getElementById(`root`)).render((0,z.jsx)(_.StrictMode,{children:(0,z.jsx)(Xi,{})}));