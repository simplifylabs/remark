(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[347],{7015:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/share",function(){return n(1914)}])},2814:function(e,t,n){"use strict";n.d(t,{Z:function(){return l}});var r=n(2322),s=n(2784),a=n(5632),i=n(7566),c=n(6203),u=n(8724);function l(e){var t=(0,a.useRouter)(),n=(0,i.Z)({required:!1}),l=n.send,o=n.installed,d=(0,s.useState)("Browser"),f=d[0],m=d[1],x=(0,s.useState)(!0),p=x[0],h=x[1],w=(0,s.useState)(!0),b=w[0],N=w[1],v=(0,s.useState)(!1),y=v[0],j=v[1];return(0,s.useEffect)((function(){m(c.Z.alias),N(u.Z.isSupported),h(!1)}),[]),(0,s.useEffect)((function(){!p&&b&&o&&l("AUTHENTICATED").then((function(e){j(e.isAuthenticated)}))}),[p,b,o]),!b||e.dynamic&&o&&y?(0,r.jsx)("button",{onClick:function(){return b?t.push("/profile"):t.push("/#download")},className:"btn-disabled ".concat(e.className?e.className:""),children:b?"Installed":"Incompatible Browser"}):(0,r.jsx)(r.Fragment,{children:(0,r.jsx)("button",{onClick:function(){return o&&e.dynamic?window.open("/auth/signin"):window.open(u.Z.url)},className:"btn-primary whitespace-pre transition-all ".concat(p?"opacity-0":"opacity-1"," ").concat(e.className?e.className:""),children:e.reinstall?"Reinstall":o&&e.dynamic?"Sign In":"+  Add to ".concat(f)})})}},8217:function(e,t,n){"use strict";n.d(t,{Z:function(){return s}});var r=n(2322);function s(e){return(0,r.jsxs)("div",{className:"flex flex-col ".concat(e.left?"items-start":"items-center"," ").concat(!e.left&&"px-4 mb-8 text-center"),children:[e.subtitle&&(0,r.jsx)("p",{className:"tracking-widest uppercase font-medium ".concat(e.primary?"text-lg sm:text-xl md:text-2xl text-brand":"text-lg md:text-xl text-secondary"," ").concat(e.subClassName||""),children:e.subtitle}),e.primary?(0,r.jsx)("h1",{id:e.id,className:"text-5xl md:text-6xl font-extrabold ".concat(e.titleClassName||""),children:e.title}):(0,r.jsx)("h2",{id:e.id,className:"text-4xl md:text-5xl font-extrabold ".concat(e.titleClassName||""),children:e.title})]})}},1914:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return w}});var r=n(5047),s=n.n(r),a=n(2322),i=n(2784),c=n(5632),u=n(2614),l=n(7566),o=n(1701),d=n(7624),f=n(8217),m=n(2814),x=n(4739);function p(e,t,n,r,s,a,i){try{var c=e[a](i),u=c.value}catch(l){return void n(l)}c.done?t(u):Promise.resolve(u).then(r,s)}function h(e){return function(){var t=this,n=arguments;return new Promise((function(r,s){var a=e.apply(t,n);function i(e){p(a,r,s,i,c,"next",e)}function c(e){p(a,r,s,i,c,"throw",e)}i(void 0)}))}}function w(){(0,o.Z)("Share");var e=(0,c.useRouter)(),t=(0,l.Z)({required:!1}),n=t.installed,r=t.loading,p=(0,i.useState)(!0),w=p[0],b=p[1];function N(){return(N=h(s().mark((function t(n){var r;return s().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n){t.next=2;break}return t.abrupt("return",e.push("/"));case 2:return n=String(n),t.next=5,x.Z.get(["comment",n,"url"]);case 5:if(!(r=t.sent)||!r.success){t.next=8;break}return t.abrupt("return",window.location.href=r.url);case 8:if(r){t.next=10;break}return t.abrupt("return",e.push("/maintenance"));case 10:u.F.error("Something unexpected happened!"),e.push("/");case 12:case"end":return t.stop()}}),t)})))).apply(this,arguments)}return(0,i.useEffect)((function(){!r&&e.isReady&&(n?function(e){N.apply(this,arguments)}(e.query.id):b(!1))}),[n,r,e]),w?(0,a.jsx)("div",{className:"flex justify-center items-center w-screen h-screen",children:(0,a.jsx)(d.Z,{})}):(0,a.jsx)("div",{className:"flex justify-center items-center w-screen h-screen",children:(0,a.jsxs)("div",{className:"flex flex-col items-center text-center",children:[(0,a.jsx)(f.Z,{title:"Not Installed",subtitle:"Required Extension",primary:!0}),(0,a.jsx)("p",{className:"text-lg max-w-[80vw] sm:max-w-[30em] whitespace-pre-wrap break-words text-gray-700 mb-10",children:"It seems like Remark isn't installed in your browser. Please install the Browser Extension to view the shared comment."}),(0,a.jsx)(m.Z,{className:"md:py-4"})]})})}}},function(e){e.O(0,[24,774,888,179],(function(){return t=7015,e(e.s=t);var t}));var t=e.O();_N_E=t}]);