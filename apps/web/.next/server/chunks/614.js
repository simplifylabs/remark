"use strict";
exports.id = 614;
exports.ids = [614];
exports.modules = {

/***/ 3404:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "p9": () => (/* binding */ SHOW_SNACKBAR),
/* harmony export */   "Xw": () => (/* binding */ HIDE_SNACKBAR),
/* harmony export */   "Fh": () => (/* binding */ REMOVE_SNACKBAR),
/* harmony export */   "OV": () => (/* binding */ showSnackbar),
/* harmony export */   "p2": () => (/* binding */ hideSnackbar)
/* harmony export */ });

const SHOW_SNACKBAR = "SHOW_SNACKBAR";
const HIDE_SNACKBAR = "HIDE_SNACKBAR";
const REMOVE_SNACKBAR = "REMOVE_SNACKBAR";
const showSnackbar = (data)=>async (dispatch)=>{
        const id = Math.random().toString(16);
        dispatch({
            type: SHOW_SNACKBAR,
            data: {
                ...data,
                showen: true,
                id
            }
        });
        if (data.type == "TOAST") {
            setTimeout(()=>{
                // eslint-disable-next-line
                dispatch(hideSnackbar(id));
            }, 2000);
        }
    }
;
const hideSnackbar = (id)=>async (dispatch)=>{
        dispatch({
            type: HIDE_SNACKBAR,
            id
        });
        setTimeout(()=>{
            dispatch({
                type: REMOVE_SNACKBAR,
                id
            });
        }, 250);
    }
;


/***/ }),

/***/ 4753:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Registry)
/* harmony export */ });
class Registry {
    static getStore() {
        return this.store;
    }
    static set(store) {
        this.store = store;
    }
}



/***/ }),

/***/ 2614:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "A": () => (/* binding */ Snackbar),
/* harmony export */   "F": () => (/* binding */ Toast)
/* harmony export */ });
/* harmony import */ var _web_actions_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3404);
/* harmony import */ var _web_registry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4753);


class Snackbar {
    static success(text) {
        _web_registry__WEBPACK_IMPORTED_MODULE_0__/* ["default"].store.dispatch */ .Z.store.dispatch((0,_web_actions_dialog__WEBPACK_IMPORTED_MODULE_1__/* .showSnackbar */ .OV)({
            text: text,
            type: "SNACKBAR",
            level: "SUCCESS"
        }));
    }
    static error(text1) {
        _web_registry__WEBPACK_IMPORTED_MODULE_0__/* ["default"].store.dispatch */ .Z.store.dispatch((0,_web_actions_dialog__WEBPACK_IMPORTED_MODULE_1__/* .showSnackbar */ .OV)({
            text: text1,
            type: "SNACKBAR",
            level: "ERROR"
        }));
    }
    static hide(id) {
        _web_registry__WEBPACK_IMPORTED_MODULE_0__/* ["default"].store.dispatch */ .Z.store.dispatch((0,_web_actions_dialog__WEBPACK_IMPORTED_MODULE_1__/* .hideSnackbar */ .p2)(id));
    }
}
class Toast {
    static success(text2) {
        _web_registry__WEBPACK_IMPORTED_MODULE_0__/* ["default"].store.dispatch */ .Z.store.dispatch((0,_web_actions_dialog__WEBPACK_IMPORTED_MODULE_1__/* .showSnackbar */ .OV)({
            text: text2,
            type: "TOAST",
            level: "SUCCESS"
        }));
    }
    static error(text3) {
        _web_registry__WEBPACK_IMPORTED_MODULE_0__/* ["default"].store.dispatch */ .Z.store.dispatch((0,_web_actions_dialog__WEBPACK_IMPORTED_MODULE_1__/* .showSnackbar */ .OV)({
            text: text3,
            type: "TOAST",
            level: "ERROR"
        }));
    }
    static hide(id1) {
        _web_registry__WEBPACK_IMPORTED_MODULE_0__/* ["default"].store.dispatch */ .Z.store.dispatch((0,_web_actions_dialog__WEBPACK_IMPORTED_MODULE_1__/* .hideSnackbar */ .p2)(id1));
    }
}


/***/ })

};
;