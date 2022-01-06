"use strict";
exports.id = 342;
exports.ids = [342];
exports.modules = {

/***/ 1434:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__) => {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ LazyShow)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7685);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6865);
/* harmony import */ var _web_hooks_useOnScreen__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2442);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([framer_motion__WEBPACK_IMPORTED_MODULE_4__, framer_motion__WEBPACK_IMPORTED_MODULE_3__]);
([framer_motion__WEBPACK_IMPORTED_MODULE_4__, framer_motion__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? await __webpack_async_dependencies__ : __webpack_async_dependencies__);




function LazyShow({ opacityOnly , children  }) {
    const controls = (0,framer_motion__WEBPACK_IMPORTED_MODULE_3__/* .useAnimation */ ._)();
    const rootRef = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createRef)();
    const onScreen = (0,_web_hooks_useOnScreen__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)(rootRef);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (!onScreen) return;
        controls.start({
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        });
    }, [
        onScreen,
        controls
    ]);
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(framer_motion__WEBPACK_IMPORTED_MODULE_4__/* .motion.div */ .E.div, {
        className: "lazy-div",
        ref: rootRef,
        initial: opacityOnly ? {
            opacity: 0
        } : {
            opacity: 0,
            y: 20
        },
        animate: controls,
        children: children
    }));
};

});

/***/ }),

/***/ 6278:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Logo)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6577);


function Logo(props) {
    return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        onClick: ()=>props.router.push("/#")
        ,
        className: `flex flex-row items-center cursor-pointer group ${props.centered && "absolute left-1/2 transform -translate-x-1/2"} `,
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_image__WEBPACK_IMPORTED_MODULE_1__["default"], {
                src: "/images/logo/black.svg",
                alt: "Remark Logo",
                className: "transition-all group-hover:opacity-80",
                height: 25,
                width: 25
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                className: "ml-3 text-2xl text-black group-hover:opacity-80 font-pacifico",
                children: "Remark"
            })
        ]
    }));
};


/***/ }),

/***/ 342:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__) => {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Navigation)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _web_components_AddButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2814);
/* harmony import */ var _web_components_LazyShow__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1434);
/* harmony import */ var _web_components_Logo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6278);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9097);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_5__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_web_components_LazyShow__WEBPACK_IMPORTED_MODULE_2__]);
_web_components_LazyShow__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? await __webpack_async_dependencies__ : __webpack_async_dependencies__)[0];






function Navigation(props) {
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_5__.useRouter)();
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_web_components_LazyShow__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
        opacityOnly: true,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("header", {
            className: "absolute top-0 left-0 z-[100]",
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "relative w-screen h-auto lg:h-[5rem] bg-background/70 flex flex-col lg:flex-row justify-between items-center lg:px-[3rem] gap-4 lg:gap-0 py-5 lg:py-0",
                children: props.uninstall ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_web_components_Logo__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                            centered: true,
                            router: router
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_web_components_AddButton__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, {
                            reinstall: true,
                            dynamic: true,
                            className: "hidden lg:block"
                        })
                    ]
                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_web_components_Logo__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                            router: router
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ul", {
                            className: "flex justify-evenly items-center w-full lg:absolute lg:left-1/2 lg:gap-16 lg:justify-center lg:w-auto lg:transform lg:-translate-x-1/2",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_link__WEBPACK_IMPORTED_MODULE_4__["default"], {
                                        passHref: true,
                                        href: "/#features",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                            className: "text-gray-800 sm:text-lg hover:text-gray-600 text-md",
                                            children: "Features"
                                        })
                                    })
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_link__WEBPACK_IMPORTED_MODULE_4__["default"], {
                                        passHref: true,
                                        href: "/#download",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                            className: "text-gray-800 sm:text-lg hover:text-gray-600 text-md",
                                            children: "Download"
                                        })
                                    })
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                        href: "https://github.com/simplifylabs/remark",
                                        target: "_blank",
                                        rel: "noreferrer",
                                        className: "text-gray-800 sm:text-lg hover:text-gray-600 text-md",
                                        children: "Github"
                                    })
                                })
                            ]
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_web_components_AddButton__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, {
                            dynamic: true,
                            className: "hidden lg:block"
                        })
                    ]
                })
            })
        })
    }));
};

});

/***/ }),

/***/ 2442:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ useOnScreen)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function useOnScreen(ref, rootMargin = "0px") {
    const { 0: isIntersecting , 1: setIntersecting  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        let currentRef = null;
        const observer = new IntersectionObserver(([entry])=>{
            setIntersecting(entry.isIntersecting);
        }, {
            rootMargin
        });
        if (ref.current) {
            currentRef = ref.current;
            observer.observe(currentRef);
        } else {
            setIntersecting(true);
        }
        return ()=>{
            if (currentRef) observer.unobserve(currentRef);
            else setIntersecting(true);
        };
    }, [
        ref,
        rootMargin
    ]);
    return isIntersecting;
};


/***/ })

};
;