"use strict";
exports.id = 814;
exports.ids = [814];
exports.modules = {

/***/ 2814:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ AddButton)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _web_hooks_useExtension__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7566);
/* harmony import */ var _web_util_browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6203);
/* harmony import */ var _web_util_extension__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8724);






function AddButton(props) {
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const { send , installed  } = (0,_web_hooks_useExtension__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z)({
        required: false
    });
    const { 0: browser , 1: setBrowser  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("Browser");
    const { 0: loading , 1: setLoading  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const { 0: supported , 1: setSupported  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const { 0: authenticated , 1: setAuthenticated  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setBrowser(_web_util_browser__WEBPACK_IMPORTED_MODULE_4__/* ["default"].alias */ .Z.alias);
        setSupported(_web_util_extension__WEBPACK_IMPORTED_MODULE_5__/* ["default"].isSupported */ .Z.isSupported);
        setLoading(false);
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!loading && supported && installed) {
            send("AUTHENTICATED").then((data)=>{
                setAuthenticated(data.isAuthenticated);
            });
        }
    }, [
        loading,
        supported,
        installed
    ]);
    if (true) return null;
    if (!supported || props.dynamic && installed && authenticated) return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
        onClick: ()=>!supported ? router.push("/#download") : router.push("/profile")
        ,
        className: `btn-disabled ${props.className ? props.className : ""}`,
        children: !supported ? "Incompatible Browser" : "Installed"
    }));
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
            onClick: ()=>!installed || !props.dynamic ? window.open(_web_util_extension__WEBPACK_IMPORTED_MODULE_5__/* ["default"].url */ .Z.url) : window.open("/auth/signin")
            ,
            className: `btn-primary whitespace-pre transition-all ${loading ? "opacity-0" : "opacity-1"} ${props.className ? props.className : ""}`,
            children: props.reinstall ? "Reinstall" : !installed || !props.dynamic ? `+  Add to ${browser}` : "Sign In"
        })
    }));
};


/***/ })

};
;