"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[506],{2814:function(e,t,r){r.d(t,{Z:function(){return u}});var n=r(2322),a=r(2784),i=r(5632),o=r(7566),c=r(6203),s=r(8724);function u(e){var t=(0,i.useRouter)(),r=(0,o.Z)({required:!1}),u=r.send,l=r.installed,x=(0,a.useState)("Browser"),d=x[0],f=x[1],p=(0,a.useState)(!0),m=p[0],h=p[1],g=(0,a.useState)(!0),v=g[0],w=g[1],b=(0,a.useState)(!1),y=b[0],k=b[1];return(0,a.useEffect)((function(){f(c.Z.alias),w(s.Z.isSupported),h(!1)}),[]),(0,a.useEffect)((function(){!m&&v&&l&&u("AUTHENTICATED").then((function(e){k(e.isAuthenticated)}))}),[m,v,l]),!v||e.dynamic&&l&&y?(0,n.jsx)("button",{onClick:function(){return v?t.push("/profile"):t.push("/#download")},className:"btn-disabled ".concat(e.className?e.className:""),children:v?"Installed":"Incompatible Browser"}):(0,n.jsx)(n.Fragment,{children:(0,n.jsx)("button",{onClick:function(){return l&&e.dynamic?window.open("/auth/signin"):window.open(s.Z.url)},className:"btn-primary whitespace-pre transition-all ".concat(m?"opacity-0":"opacity-1"," ").concat(e.className?e.className:""),children:e.reinstall?"Reinstall":l&&e.dynamic?"Sign In":"+  Add to ".concat(d)})})}},9436:function(e,t,r){r.d(t,{Z:function(){return s}});var n=r(2322),a=r(2784),i=r(5536),o=r(3365);function c(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=[],n=!0,a=!1,i=void 0;try{for(var o,c=e[Symbol.iterator]();!(n=(o=c.next()).done)&&(r.push(o.value),!t||r.length!==t);n=!0);}catch(s){a=!0,i=s}finally{try{n||null==c.return||c.return()}finally{if(a)throw i}}return r}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function s(e){var t=e.opacityOnly,r=e.children,s=(0,i._)(),u=(0,a.createRef)(),l=function(e,t){var r=void 0===t?"0px":t,n=(0,a.useState)(!1),i=n[0],o=n[1];return(0,a.useEffect)((function(){var t=null,n=new IntersectionObserver((function(e){var t=c(e,1)[0];o(t.isIntersecting)}),{rootMargin:r});return e.current?(t=e.current,n.observe(t)):o(!0),function(){t?n.unobserve(t):o(!0)}}),[e,r]),i}(u);return(0,a.useEffect)((function(){l&&s.start({y:0,opacity:1,transition:{duration:.5,ease:"easeOut"}})}),[l,s]),(0,n.jsx)(o.E.div,{className:"lazy-div",ref:u,initial:t?{opacity:0}:{opacity:0,y:20},animate:s,children:r})}},8395:function(e,t,r){r.d(t,{Z:function(){return l}});var n=r(2322),a=r(2814),i=r(9436),o=r(6577);function c(e){return(0,n.jsxs)("div",{onClick:function(){return e.router.push("/#")},className:"flex flex-row items-center cursor-pointer group ".concat(e.centered&&"absolute left-1/2 transform -translate-x-1/2"," "),children:[(0,n.jsx)(o.default,{src:"/images/logo/black.svg",alt:"Remark Logo",className:"transition-all group-hover:opacity-80",height:25,width:25}),(0,n.jsx)("a",{className:"ml-3 text-2xl text-black group-hover:opacity-80 font-pacifico",children:"Remark"})]})}var s=r(9097),u=r(5632);function l(e){var t=(0,u.useRouter)();return(0,n.jsx)(i.Z,{opacityOnly:!0,children:(0,n.jsx)("header",{className:"absolute top-0 left-0 z-[100]",children:(0,n.jsx)("div",{className:"relative w-screen h-auto lg:h-[5rem] bg-background/70 flex flex-col lg:flex-row justify-between items-center lg:px-[3rem] gap-4 lg:gap-0 py-5 lg:py-0",children:e.uninstall?(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("div",{}),(0,n.jsx)(c,{centered:!0,router:t}),(0,n.jsx)(a.Z,{reinstall:!0,dynamic:!0,className:"hidden lg:block"})]}):(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(c,{router:t}),(0,n.jsxs)("ul",{className:"flex justify-evenly items-center w-full lg:absolute lg:left-1/2 lg:gap-16 lg:justify-center lg:w-auto lg:transform lg:-translate-x-1/2",children:[(0,n.jsx)("li",{children:(0,n.jsx)(s.default,{passHref:!0,href:"/#features",children:(0,n.jsx)("a",{className:"text-gray-800 sm:text-lg hover:text-gray-600 text-md",children:"Features"})})}),(0,n.jsx)("li",{children:(0,n.jsx)(s.default,{passHref:!0,href:"/#download",children:(0,n.jsx)("a",{className:"text-gray-800 sm:text-lg hover:text-gray-600 text-md",children:"Download"})})}),(0,n.jsx)("li",{children:(0,n.jsx)("a",{href:"https://github.com/simplifylabs/remark",target:"_blank",rel:"noreferrer",className:"text-gray-800 sm:text-lg hover:text-gray-600 text-md",children:"Github"})})]}),(0,n.jsx)(a.Z,{dynamic:!0,className:"hidden lg:block"})]})})})})}},7566:function(e,t,r){r.d(t,{Z:function(){return u}});var n=r(2784),a=r(5632),i=r(8724),o=r(6203);function c(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),n.forEach((function(t){c(e,t,r[t])}))}return e}function u(e){var t=void 0===e?{required:!0}:e,r=function(e,r){var n=void 0===r?{}:r;return new Promise((function(r){if(!i.Z.supported)return r({success:!1});if(o.Z.type==o.A.Firefox)window.postMessage(s({type:"REMARK:".concat(e)},n),"*"),c("RE:REMARK:".concat(e),r);else{if(!chrome||!chrome.runtime)return t.required&&u.push(i.Z.url),void r({success:!1});chrome.runtime.sendMessage(i.Z.id,s({type:e},n),(function(e){return r(e)}))}}))},c=function(e,t){window.addEventListener("message",(function r(n){if(n.source!==window||!n.data||!n.data.type||n.data.type!==e)return;t(n.data),window.removeEventListener("message",r)}))},u=(0,a.useRouter)(),l=(0,n.useState)(!1),x=l[0],d=l[1],f=(0,n.useState)(!0),p=f[0],m=f[1];return(0,n.useEffect)((function(){if(!i.Z.isSupported||!i.Z.id)return t.required&&u.push("/"),d(!1),void m(!1);if(o.Z.type==o.A.Firefox){var e=!1;r("PING").then((function(t){t.success?(e=!0,d(!0)):d(!1)})),setTimeout((function(){e||(t.required&&u.push(i.Z.url),d(!1)),m(!1)}),2500)}else r("PING").then((function(e){e&&e.success?d(!0):(t.required&&u.push(i.Z.url),d(!1)),m(!1)}))}),[]),{send:r,on:c,installed:x,loading:p}}},1701:function(e,t,r){r.d(t,{Z:function(){return a}});var n=r(2784);function a(e,t){var r=void 0!==t&&t;return(0,n.useEffect)((function(){document.title=r?e:"".concat(e," | Remark")}),[e,r]),null}},6203:function(e,t,r){function n(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var a,i;r.d(t,{A:function(){return a},Z:function(){return o}}),(i=a||(a={}))[i.Firefox=0]="Firefox",i[i.Opera=1]="Opera",i[i.Edge=2]="Edge",i[i.Vivaldi=3]="Vivaldi",i[i.Chrome=4]="Chrome",i[i.Safari=5]="Safari",i[i.Unknowen=6]="Unknowen";var o=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,r,i;return t=e,i=[{key:"type",get:function(){return this.cache&&this.cache!==a.Unknowen||(-1!==navigator.userAgent.indexOf(" Firefox/")||-1!==navigator.userAgent.indexOf(" Gecko/")?this.cache=a.Firefox:window.opr&&window.opr.addons||window.opera||navigator.userAgent.indexOf(" OPR/")>=0?this.cache=a.Opera:-1!==navigator.userAgent.indexOf(" Edg/")?this.cache=a.Edge:-1!==navigator.userAgent.indexOf(" Vivaldi/")?this.cache=a.Vivaldi:window.chrome&&-1!==navigator.userAgent.indexOf(" Chrome/")?this.cache=a.Chrome:-1!==navigator.userAgent.indexOf(" Safari/")?this.cache=a.Safari:this.cache=a.Unknowen),this.cache}},{key:"alias",get:function(){switch(this.type){case a.Firefox:return"Firefox";case a.Opera:return"Opera";case a.Edge:return"Edge";case a.Vivaldi:return"Vivaldi";case a.Chrome:return"Chrome";case a.Safari:return"Safari";default:return"Browser"}}},{key:"isMobile",get:function(){var e,t=!1;return e=navigator.userAgent||navigator.vendor||window.opera,(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(e)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0,4)))&&(t=!0),t}}],(r=null)&&n(t.prototype,r),i&&n(t,i),e}();o.cache=null},8724:function(e,t,r){r.d(t,{Z:function(){return i}});var n=r(6203);function a(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var i=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,r,i;return t=e,i=[{key:"isSupported",get:function(){return n.Z.isMobile?n.Z.type==n.A.Firefox:this.supported.includes(n.Z.type)}},{key:"url",get:function(){if(this.isSupported)switch(n.Z.type){case n.A.Firefox:return this.firefoxUrl;case n.A.Opera:return this.operaUrl;case n.A.Edge:return this.edgeUrl;default:return this.chromeUrl}}},{key:"id",get:function(){if(this.isSupported)switch(n.Z.type){case n.A.Firefox:return"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";case n.A.Opera:return"cxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";case n.A.Edge:return"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";default:return"cjjlliaobnbdmclhgceakcfonciokana"}}}],(r=null)&&a(t.prototype,r),i&&a(t,i),e}();i.firefoxUrl="https://addons.mozilla.org/de/firefox/addon/".concat("remark","/"),i.operaUrl="https://addons.opera.com/de/extensions/details/".concat("remark"),i.edgeUrl="https://microsoftedge.microsoft.com/addons/detail/".concat("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"),i.chromeUrl="https://chrome.google.com/webstore/detail/".concat("cjjlliaobnbdmclhgceakcfonciokana"),i.supported=[n.A.Firefox,n.A.Opera,n.A.Edge,n.A.Vivaldi,n.A.Chrome]}}]);