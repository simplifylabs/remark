"use strict";
exports.id = 217;
exports.ids = [217];
exports.modules = {

/***/ 8217:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Title)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

function Title(props) {
    return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: `flex flex-col ${props.left ? "items-start" : "items-center"} ${!props.left && "px-4 mb-8 text-center"}`,
        children: [
            props.subtitle && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                className: `tracking-widest uppercase font-medium ${props.primary ? "text-lg sm:text-xl md:text-2xl text-brand" : "text-lg md:text-xl text-secondary"} ${props.subClassName || ""}`,
                children: props.subtitle
            }),
            props.primary ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                id: props.id,
                className: `text-5xl md:text-6xl font-extrabold ${props.titleClassName || ""}`,
                children: props.title
            }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                id: props.id,
                className: `text-4xl md:text-5xl font-extrabold ${props.titleClassName || ""}`,
                children: props.title
            })
        ]
    }));
};


/***/ })

};
;