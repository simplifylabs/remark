(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[613],{2589:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/auth/signup",function(){return r(1469)}])},1926:function(e,t,r){"use strict";r.d(t,{Z:function(){return o}});var n=r(2322);r(2784);function o(e){var t=e.type,r=e.text;return(0,n.jsx)(n.Fragment,{children:(0,n.jsx)("div",{className:"w-full mt-3 ".concat("ERROR"==t?"bg-red-200 border-red-300":"bg-green-200 border-green-300"," px-3 py-2 rounded-md border"),children:(0,n.jsx)("p",{className:"".concat("ERROR"==t?"text-red-500":"text-green-600"," text-sm"),children:r})})})}},2686:function(e,t,r){"use strict";r.d(t,{Z:function(){return a}});var n=r(2322),o=r(2784);function a(e){var t=(0,o.useState)(e.initial||""),r=t[0],a=t[1];return(0,o.useEffect)((function(){void 0==e.value&&e.set(r)}),[r]),(0,n.jsxs)("div",{className:"flex flex-col justify-start",children:[(0,n.jsx)("label",{className:"text-gray-500 text-sm",htmlFor:e.name.toUpperCase().replace(" ",""),children:e.name}),(0,n.jsx)("input",{name:e.name.toUpperCase().replace(" ",""),type:e.type,autoComplete:e.autoComplete,value:r,minLength:e.min,maxLength:e.max,required:void 0==e.optional||e.optional,disabled:void 0==e.disabled?void 0:e.disabled,className:"".concat(e.disabled&&"text-gray-500"),onChange:function(t){return e.value?e.set(t.target.value):a(t.target.value)}})]})}},7566:function(e,t,r){"use strict";r.d(t,{Z:function(){return u}});var n=r(2784),o=r(5632),a=r(8724),i=r(6203);function c(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),n.forEach((function(t){c(e,t,r[t])}))}return e}function u(e){var t=void 0===e?{required:!0}:e,r=function(e,r){var n=void 0===r?{}:r;return new Promise((function(r){if(!a.Z.supported)return r({success:!1});if(i.Z.type==i.A.Firefox)window.postMessage(s({type:"REMARK:".concat(e)},n),"*"),c("RE:REMARK:".concat(e),r);else{if(!chrome||!chrome.runtime)return t.required&&u.push(a.Z.url),void r({success:!1});chrome.runtime.sendMessage(a.Z.id,s({type:e},n),(function(e){return r(e)}))}}))},c=function(e,t){window.addEventListener("message",(function r(n){if(n.source!==window||!n.data||!n.data.type||n.data.type!==e)return;t(n.data),window.removeEventListener("message",r)}))},u=(0,o.useRouter)(),l=(0,n.useState)(!1),f=l[0],d=l[1],p=(0,n.useState)(!0),x=p[0],m=p[1];return(0,n.useEffect)((function(){if(!a.Z.isSupported||!a.Z.id)return t.required&&u.push("/"),d(!1),void m(!1);if(i.Z.type==i.A.Firefox){var e=!1;r("PING").then((function(t){t.success?(e=!0,d(!0)):d(!1)})),setTimeout((function(){e||(t.required&&u.push(a.Z.url),d(!1)),m(!1)}),2500)}else r("PING").then((function(e){e&&e.success?d(!0):(t.required&&u.push(a.Z.url),d(!1)),m(!1)}))}),[]),{send:r,on:c,installed:f,loading:x}}},1701:function(e,t,r){"use strict";r.d(t,{Z:function(){return o}});var n=r(2784);function o(e,t){var r=void 0!==t&&t;return(0,n.useEffect)((function(){document.title=r?e:"".concat(e," | Remark")}),[e,r]),null}},1469:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return m}});var n=r(5047),o=r.n(n),a=r(2322),i=r(2784),c=r(5632),s=r(1701),u=r(7566),l=r(9097),f=r(1926),d=r(2686);function p(e,t,r,n,o,a,i){try{var c=e[a](i),s=c.value}catch(u){return void r(u)}c.done?t(s):Promise.resolve(s).then(n,o)}function x(e){return function(){var t=this,r=arguments;return new Promise((function(n,o){var a=e.apply(t,r);function i(e){p(a,n,o,i,c,"next",e)}function c(e){p(a,n,o,i,c,"throw",e)}i(void 0)}))}}function m(){(0,s.Z)("Sign Up");var e=(0,u.Z)().send,t=(0,c.useRouter)(),r=(0,i.useState)(),n=r[0],p=r[1],m=(0,i.useState)(),h=m[0],v=m[1],g=(0,i.useState)(),w=g[0],y=g[1],b=(0,i.useState)(),k=b[0],j=b[1],E=(0,i.useState)(),O=E[0],S=E[1];function C(){return(C=x(o().mark((function r(n){var a;return o().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return n.preventDefault(),r.next=3,e("REGISTER",{username:h,email:w,password:k,confirm:O});case 3:if(!(a=r.sent).error){r.next=6;break}return r.abrupt("return",p(a.error));case 6:if(!a.redirect){r.next=8;break}return r.abrupt("return",t.push(a.redirect));case 8:if(a.success){r.next=10;break}return r.abrupt("return",p("Something unexpected happened"));case 10:e("CLOSE",{url:window.location.href}).then((function(e){return!e.success&&t.push("/")}));case 11:case"end":return r.stop()}}),r)})))).apply(this,arguments)}return(0,a.jsxs)("div",{className:"flex flex-col gap-10 justify-center items-center w-screen min-h-screen",children:[(0,a.jsxs)("div",{className:"flex flex-col gap-3 justify-center items-center",children:[(0,a.jsx)("h1",{className:"text-5xl font-extrabold",children:"Sign Up"}),(0,a.jsxs)("p",{className:"text-lg text-gray-700",children:["Already have an account?"," ",(0,a.jsx)(l.default,{href:"/auth/signin",children:(0,a.jsx)("a",{className:"text-lg",children:"Sign In"})})]})]}),(0,a.jsxs)("form",{onSubmit:function(e){return C.apply(this,arguments)},className:"w-[90vw] sm:w-[22rem] bg-white rounded-xl shadow p-8 flex flex-col gap-2",children:[(0,a.jsx)(d.Z,{type:"text",name:"Username",autoComplete:"nickname",set:v,min:3,max:20}),(0,a.jsx)(d.Z,{type:"email",name:"Email",autoComplete:"email",set:y}),(0,a.jsx)(d.Z,{type:"password",name:"New Password",autoComplete:"new-password",set:j,min:6,max:128}),(0,a.jsx)(d.Z,{type:"password",name:"Confirm Password",autoComplete:"new-password",set:S,min:6,max:128}),n&&(0,a.jsx)(f.Z,{type:"ERROR",text:n}),(0,a.jsx)("input",{className:"mt-2 btn-primary",type:"submit",value:"Submit"})]})]})}},6203:function(e,t,r){"use strict";function n(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var o,a;r.d(t,{A:function(){return o},Z:function(){return i}}),(a=o||(o={}))[a.Firefox=0]="Firefox",a[a.Opera=1]="Opera",a[a.Edge=2]="Edge",a[a.Vivaldi=3]="Vivaldi",a[a.Chrome=4]="Chrome",a[a.Safari=5]="Safari",a[a.Unknowen=6]="Unknowen";var i=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,r,a;return t=e,a=[{key:"type",get:function(){return this.cache&&this.cache!==o.Unknowen||(-1!==navigator.userAgent.indexOf(" Firefox/")||-1!==navigator.userAgent.indexOf(" Gecko/")?this.cache=o.Firefox:window.opr&&window.opr.addons||window.opera||navigator.userAgent.indexOf(" OPR/")>=0?this.cache=o.Opera:-1!==navigator.userAgent.indexOf(" Edg/")?this.cache=o.Edge:-1!==navigator.userAgent.indexOf(" Vivaldi/")?this.cache=o.Vivaldi:window.chrome&&-1!==navigator.userAgent.indexOf(" Chrome/")?this.cache=o.Chrome:-1!==navigator.userAgent.indexOf(" Safari/")?this.cache=o.Safari:this.cache=o.Unknowen),this.cache}},{key:"alias",get:function(){switch(this.type){case o.Firefox:return"Firefox";case o.Opera:return"Opera";case o.Edge:return"Edge";case o.Vivaldi:return"Vivaldi";case o.Chrome:return"Chrome";case o.Safari:return"Safari";default:return"Browser"}}},{key:"isMobile",get:function(){var e,t=!1;return e=navigator.userAgent||navigator.vendor||window.opera,(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(e)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0,4)))&&(t=!0),t}}],(r=null)&&n(t.prototype,r),a&&n(t,a),e}();i.cache=null},8724:function(e,t,r){"use strict";r.d(t,{Z:function(){return a}});var n=r(6203);function o(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var a=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,r,a;return t=e,a=[{key:"isSupported",get:function(){return n.Z.isMobile?n.Z.type==n.A.Firefox:this.supported.includes(n.Z.type)}},{key:"url",get:function(){if(this.isSupported)switch(n.Z.type){case n.A.Firefox:return this.firefoxUrl;case n.A.Opera:return this.operaUrl;case n.A.Edge:return this.edgeUrl;default:return this.chromeUrl}}},{key:"id",get:function(){if(this.isSupported)switch(n.Z.type){case n.A.Firefox:return"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";case n.A.Opera:return"cxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";case n.A.Edge:return"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";default:return"cjjlliaobnbdmclhgceakcfonciokana"}}}],(r=null)&&o(t.prototype,r),a&&o(t,a),e}();a.firefoxUrl="https://addons.mozilla.org/de/firefox/addon/".concat("remark","/"),a.operaUrl="https://addons.opera.com/de/extensions/details/".concat("remark"),a.edgeUrl="https://microsoftedge.microsoft.com/addons/detail/".concat("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"),a.chromeUrl="https://chrome.google.com/webstore/detail/".concat("cjjlliaobnbdmclhgceakcfonciokana"),a.supported=[n.A.Firefox,n.A.Opera,n.A.Edge,n.A.Vivaldi,n.A.Chrome]},162:function(e,t,r){"use strict";function n(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=[],n=!0,o=!1,a=void 0;try{for(var i,c=e[Symbol.iterator]();!(n=(i=c.next()).done)&&(r.push(i.value),!t||r.length!==t);n=!0);}catch(s){o=!0,a=s}finally{try{n||null==c.return||c.return()}finally{if(o)throw a}}return r}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var o=function(e){return e&&"undefined"!==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};t.default=void 0;var a,i=(a=r(2784))&&a.__esModule?a:{default:a},c=r(9918),s=r(3642),u=r(2030);var l={};function f(e,t,r,n){if(e&&c.isLocalURL(t)){e.prefetch(t,r,n).catch((function(e){throw e}));var o=n&&"undefined"!==typeof n.locale?n.locale:e&&e.locale;l[t+"%"+r+(o?"%"+o:"")]=!0}}var d=function(e){var t=function(e){return new Error("Failed prop type: The prop `".concat(e.key,"` expects a ").concat(e.expected," in `<Link>`, but got `").concat(e.actual,"` instead.")+"\nOpen your browser's console to view the Component stack trace.")};Object.keys({href:!0}).forEach((function(r){if("href"===r){if(null==e[r]||"string"!==typeof e[r]&&"object"!==typeof e[r])throw t({key:r,expected:"`string` or `object`",actual:null===e[r]?"null":o(e[r])})}else;})),Object.keys({as:!0,replace:!0,scroll:!0,shallow:!0,passHref:!0,prefetch:!0,locale:!0}).forEach((function(r){var n=o(e[r]);if("as"===r){if(e[r]&&"string"!==n&&"object"!==n)throw t({key:r,expected:"`string` or `object`",actual:n})}else if("locale"===r){if(e[r]&&"string"!==n)throw t({key:r,expected:"`string`",actual:n})}else if("replace"===r||"scroll"===r||"shallow"===r||"passHref"===r||"prefetch"===r){if(null!=e[r]&&"boolean"!==n)throw t({key:r,expected:"`boolean`",actual:n})}else;}));var r=i.default.useRef(!1);e.prefetch&&!r.current&&(r.current=!0,console.warn("Next.js auto-prefetches automatically based on viewport. The prefetch attribute is no longer needed. More: https://nextjs.org/docs/messages/prefetch-true-deprecated"));var a,d=!1!==e.prefetch,p=s.useRouter(),x=i.default.useMemo((function(){var t=n(c.resolveHref(p,e.href,!0),2),r=t[0],o=t[1];return{href:r,as:e.as?c.resolveHref(p,e.as):o||r}}),[p,e.href,e.as]),m=x.href,h=x.as,v=e.children,g=e.replace,w=e.shallow,y=e.scroll,b=e.locale;"string"===typeof v&&(v=i.default.createElement("a",null,v));try{a=i.default.Children.only(v)}catch(Z){throw new Error("Multiple children were passed to <Link> with `href` of `".concat(e.href,"` but only one child is supported https://nextjs.org/docs/messages/link-multiple-children")+" \nOpen your browser's console to view the Component stack trace.")}var k=a&&"object"===typeof a&&a.ref,j=n(u.useIntersection({rootMargin:"200px"}),2),E=j[0],O=j[1],S=i.default.useCallback((function(e){E(e),k&&("function"===typeof k?k(e):"object"===typeof k&&(k.current=e))}),[k,E]);i.default.useEffect((function(){var e=O&&d&&c.isLocalURL(m),t="undefined"!==typeof b?b:p&&p.locale,r=l[m+"%"+h+(t?"%"+t:"")];e&&!r&&f(p,m,h,{locale:t})}),[h,m,O,b,d,p]);var C={ref:S,onClick:function(e){a.props&&"function"===typeof a.props.onClick&&a.props.onClick(e),e.defaultPrevented||function(e,t,r,n,o,a,i,s){("A"!==e.currentTarget.nodeName||!function(e){var t=e.currentTarget.target;return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&c.isLocalURL(r))&&(e.preventDefault(),null==i&&n.indexOf("#")>=0&&(i=!1),t[o?"replace":"push"](r,n,{shallow:a,locale:s,scroll:i}))}(e,p,m,h,g,w,y,b)},onMouseEnter:function(e){c.isLocalURL(m)&&(a.props&&"function"===typeof a.props.onMouseEnter&&a.props.onMouseEnter(e),f(p,m,h,{priority:!0}))}};if(e.passHref||"a"===a.type&&!("href"in a.props)){var A="undefined"!==typeof b?b:p&&p.locale,R=p&&p.isLocaleDomain&&c.getDomainLocale(h,A,p&&p.locales,p&&p.domainLocales);C.href=R||c.addBasePath(c.addLocale(h,A,p&&p.defaultLocale))}return i.default.cloneElement(a,C)};t.default=d},2030:function(e,t,r){"use strict";function n(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=[],n=!0,o=!1,a=void 0;try{for(var i,c=e[Symbol.iterator]();!(n=(i=c.next()).done)&&(r.push(i.value),!t||r.length!==t);n=!0);}catch(s){o=!0,a=s}finally{try{n||null==c.return||c.return()}finally{if(o)throw a}}return r}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}Object.defineProperty(t,"__esModule",{value:!0}),t.useIntersection=function(e){var t=e.rootMargin,r=e.disabled||!i,s=o.useRef(),u=n(o.useState(!1),2),l=u[0],f=u[1],d=o.useCallback((function(e){s.current&&(s.current(),s.current=void 0),r||l||e&&e.tagName&&(s.current=function(e,t,r){var n=function(e){var t=e.rootMargin||"",r=c.get(t);if(r)return r;var n=new Map,o=new IntersectionObserver((function(e){e.forEach((function(e){var t=n.get(e.target),r=e.isIntersecting||e.intersectionRatio>0;t&&r&&t(r)}))}),e);return c.set(t,r={id:t,observer:o,elements:n}),r}(r),o=n.id,a=n.observer,i=n.elements;return i.set(e,t),a.observe(e),function(){i.delete(e),a.unobserve(e),0===i.size&&(a.disconnect(),c.delete(o))}}(e,(function(e){return e&&f(e)}),{rootMargin:t}))}),[r,t,l]);return o.useEffect((function(){if(!i&&!l){var e=a.requestIdleCallback((function(){return f(!0)}));return function(){return a.cancelIdleCallback(e)}}}),[l]),[d,l]};var o=r(2784),a=r(9071),i="undefined"!==typeof IntersectionObserver;var c=new Map},9097:function(e,t,r){e.exports=r(162)}},function(e){e.O(0,[774,888,179],(function(){return t=2589,e(e.s=t);var t}));var t=e.O();_N_E=t}]);