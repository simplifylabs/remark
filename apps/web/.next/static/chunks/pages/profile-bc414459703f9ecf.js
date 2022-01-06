(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[277],{6010:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/profile",function(){return n(1972)}])},1926:function(e,t,n){"use strict";n.d(t,{Z:function(){return a}});var r=n(2322);n(2784);function a(e){var t=e.type,n=e.text;return(0,r.jsx)(r.Fragment,{children:(0,r.jsx)("div",{className:"w-full mt-3 ".concat("ERROR"==t?"bg-red-200 border-red-300":"bg-green-200 border-green-300"," px-3 py-2 rounded-md border"),children:(0,r.jsx)("p",{className:"".concat("ERROR"==t?"text-red-500":"text-green-600"," text-sm"),children:n})})})}},2686:function(e,t,n){"use strict";n.d(t,{Z:function(){return i}});var r=n(2322),a=n(2784);function i(e){var t=(0,a.useState)(e.initial||""),n=t[0],i=t[1];return(0,a.useEffect)((function(){void 0==e.value&&e.set(n)}),[n]),(0,r.jsxs)("div",{className:"flex flex-col justify-start",children:[(0,r.jsx)("label",{className:"text-gray-500 text-sm",htmlFor:e.name.toUpperCase().replace(" ",""),children:e.name}),(0,r.jsx)("input",{name:e.name.toUpperCase().replace(" ",""),type:e.type,autoComplete:e.autoComplete,value:n,minLength:e.min,maxLength:e.max,required:void 0==e.optional||e.optional,disabled:void 0==e.disabled?void 0:e.disabled,className:"".concat(e.disabled&&"text-gray-500"),onChange:function(t){return e.value?e.set(t.target.value):i(t.target.value)}})]})}},1972:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return b}});var r=n(5047),a=n.n(r),i=n(2322),s=n(2784),o=n(5632),u=n(7134),c=n(7962),l=n(4739),d=n(7566),f=n(1701),p=n(1926),m=n(2686),v=n(7624);function x(e,t,n,r,a,i,s){try{var o=e[i](s),u=o.value}catch(c){return void n(c)}o.done?t(u):Promise.resolve(u).then(r,a)}function h(e){return function(){var t=this,n=arguments;return new Promise((function(r,a){var i=e.apply(t,n);function s(e){x(i,r,a,s,o,"next",e)}function o(e){x(i,r,a,s,o,"throw",e)}s(void 0)}))}}function y(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],r=!0,a=!1,i=void 0;try{for(var s,o=e[Symbol.iterator]();!(r=(s=o.next()).done)&&(n.push(s.value),!t||n.length!==t);r=!0);}catch(u){a=!0,i=u}finally{try{r||null==o.return||o.return()}finally{if(a)throw i}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function g(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function b(){var e=function(e){return e.error?A(e.error):e.redirect?N.push(e.redirect):void A("Something unexpected happened")},t=function(e,t,n){var r=g(Z);if(t&&F&&F[t]==n)r=r.filter((function(t){return t!==e}));else{if(r.includes(e))return;r.push(e)}O(r)};(0,f.Z)("Profile");var n=(0,d.Z)().send,r=y((0,u.s)({accept:[".png",".jpg",".jpeg"],multiple:!1,limitFilesConfig:{max:1},maxFileSize:5,readAs:"DataURL"}),2),x=r[0],b=r[1],j=b.plainFiles,w=b.filesContent,N=(0,o.useRouter)(),S=(0,s.useState)(),E=S[0],A=S[1],C=(0,s.useState)(),R=C[0],_=C[1],k=(0,s.useState)([]),Z=k[0],O=k[1],P=(0,s.useState)(!0),U=P[0],T=P[1],D=(0,s.useState)(),F=D[0],I=D[1],L=(0,s.useState)(""),M=L[0],V=L[1],X=(0,s.useState)(),q=X[0],z=X[1],Y=(0,s.useState)(""),B=Y[0],G=Y[1],H=(0,s.useState)(""),J=H[0],K=H[1];function Q(){return(Q=h(a().mark((function t(){var r;return a().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return _(void 0),A(void 0),t.next=4,n("UPDATE",{changed:Z,avatar:q,email:B,username:J});case 4:if(!(r=t.sent)||!r.success){t.next=9;break}return I({id:M,avatar:(null===F||void 0===F?void 0:F.avatar)||Z.includes("AVATAR"),username:J,email:B}),O([]),t.abrupt("return",_("Successfully updated!"));case 9:e(r);case 10:case"end":return t.stop()}}),t)})))).apply(this,arguments)}return(0,s.useEffect)((function(){h(a().mark((function t(){var r;return a().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n("ME",{});case 2:if(!(r=t.sent).success){t.next=11;break}return I(r.body),V(r.body.id),G(r.body.email),K(r.body.username),O([]),T(!1),t.abrupt("return");case 11:e(r);case 12:case"end":return t.stop()}}),t)})))()}),[]),(0,s.useEffect)((function(){j&&w&&w.length>0?(z(w[0].content),t("AVATAR")):z(void 0)}),[w,j]),U?(0,i.jsx)("div",{className:"flex justify-center items-center w-screen h-screen",children:(0,i.jsx)(v.Z,{})}):(0,i.jsxs)("div",{className:"flex flex-col gap-10 justify-center items-center w-screen min-h-screen",children:[(0,i.jsxs)("div",{className:"flex flex-col gap-1 justify-center items-center",children:[(0,i.jsx)("h1",{className:"text-5xl font-extrabold",children:"Profile"}),(0,i.jsx)("p",{className:"text-lg text-gray-700",children:"Update your Profile"})]}),(0,i.jsxs)("form",{onSubmit:function(e){e.preventDefault(),Z.length>0&&function(){Q.apply(this,arguments)}()},className:"w-[90vw] sm:w-[22rem] bg-white rounded-xl shadow p-8 flex flex-col gap-2",children:[(0,i.jsx)("div",{className:"flex justify-center mb-4 w-full",children:(0,i.jsxs)("button",{onClick:function(e){e.preventDefault(),x()},style:{backgroundImage:q?'url("'.concat(q,'")'):(null===F||void 0===F?void 0:F.avatar)?'url("'.concat(l.x.cdn,"avatar/100x100/").concat(M,'.jpg")'):void 0},className:"flex justify-center items-center w-24 h-24 bg-center bg-no-repeat bg-cover rounded-full border border-gray-300 shadow-sm group",children:[!q&&!(null===F||void 0===F?void 0:F.avatar)&&(0,i.jsx)(c.pOD,{className:"w-5 h-5 text-gray-500"}),(q||(null===F||void 0===F?void 0:F.avatar))&&(0,i.jsx)(c.vdY,{className:"w-5 h-5 text-white opacity-0 transition-opacity group-hover:opacity-100 drop-shadow-md"})]})}),(0,i.jsx)(m.Z,{type:"text",name:"Username",initial:J,autoComplete:"off",set:function(e){t("USERNAME","username",e),K(e)}}),(0,i.jsx)(m.Z,{type:"email",name:"Email",initial:B,autoComplete:"off",set:function(e){t("EMAIL","email",e),G(e)}}),E&&(0,i.jsx)(p.Z,{type:"ERROR",text:E}),R&&(0,i.jsx)(p.Z,{type:"SUCCESS",text:R}),(0,i.jsx)("input",{className:"mt-2 ".concat(Z.length>0?"btn-primary":"btn-disabled"),type:"submit",value:"Save"})]})]})}}},function(e){e.O(0,[962,134,24,774,888,179],(function(){return t=6010,e(e.s=t);var t}));var t=e.O();_N_E=t}]);