/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/crx-hotreload/hot-reload.js":
/*!**************************************************!*\
  !*** ./node_modules/crx-hotreload/hot-reload.js ***!
  \**************************************************/
/***/ (() => {

const filesInDirectory = dir => new Promise (resolve =>
    dir.createReader ().readEntries (entries =>
        Promise.all (entries.filter (e => e.name[0] !== '.').map (e =>
            e.isDirectory
                ? filesInDirectory (e)
                : new Promise (resolve => e.file (resolve))
        ))
        .then (files => [].concat (...files))
        .then (resolve)
    )
)

const timestampForFilesInDirectory = dir =>
        filesInDirectory (dir).then (files =>
            files.map (f => f.name + f.lastModifiedDate).join ())

const watchChanges = (dir, lastTimestamp) => {
    timestampForFilesInDirectory (dir).then (timestamp => {
        if (!lastTimestamp || (lastTimestamp === timestamp)) {
            setTimeout (() => watchChanges (dir, timestamp), 1000) // retry after 1s
        } else {
            chrome.runtime.reload ()
        }
    })
}

chrome.management.getSelf (self => {
    if (self.installType === 'development') {
        chrome.runtime.getPackageDirectoryEntry (dir => watchChanges (dir))
        chrome.tabs.query ({ active: true, lastFocusedWindow: true }, tabs => { // NB: see https://github.com/xpl/crx-hotreload/issues/5
            if (tabs[0]) {
                chrome.tabs.reload (tabs[0].id)
            }
        })
    }
})


/***/ }),

/***/ "./apps/browser/src/state/actions/dialog.ts":
/*!**************************************************!*\
  !*** ./apps/browser/src/state/actions/dialog.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SHOW_MODAL": () => (/* binding */ SHOW_MODAL),
/* harmony export */   "SHOW_SNACKBAR": () => (/* binding */ SHOW_SNACKBAR),
/* harmony export */   "HIDE_SNACKBAR": () => (/* binding */ HIDE_SNACKBAR),
/* harmony export */   "REMOVE_MODAL": () => (/* binding */ REMOVE_MODAL),
/* harmony export */   "REMOVE_SNACKBAR": () => (/* binding */ REMOVE_SNACKBAR),
/* harmony export */   "showModal": () => (/* binding */ showModal),
/* harmony export */   "showSnackbar": () => (/* binding */ showSnackbar),
/* harmony export */   "hideSnackbar": () => (/* binding */ hideSnackbar),
/* harmony export */   "removeModal": () => (/* binding */ removeModal)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

const SHOW_MODAL = "SHOW_MODAL";
const SHOW_SNACKBAR = "SHOW_SNACKBAR";
const HIDE_SNACKBAR = "HIDE_SNACKBAR";
const REMOVE_MODAL = "REMOVE_MODAL";
const REMOVE_SNACKBAR = "REMOVE_SNACKBAR";
const showModal = (data) => (dispatch) => (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(void 0, void 0, void 0, function* () {
    dispatch({
        type: SHOW_MODAL,
        data: data,
    });
});
const showSnackbar = (data) => (dispatch) => (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(void 0, void 0, void 0, function* () {
    dispatch({
        type: SHOW_SNACKBAR,
        data: Object.assign(Object.assign({}, data), { showen: true }),
    });
    if (data.type == "TOAST") {
        setTimeout(() => {
            dispatch(hideSnackbar(data.id));
        }, 2000);
    }
});
const hideSnackbar = (id) => (dispatch) => (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(void 0, void 0, void 0, function* () {
    dispatch({
        type: HIDE_SNACKBAR,
        id,
    });
    setTimeout(() => {
        dispatch({
            type: REMOVE_SNACKBAR,
            id,
        });
    }, 250);
});
const removeModal = (id) => (dispatch) => (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(void 0, void 0, void 0, function* () {
    dispatch({
        type: REMOVE_MODAL,
        id,
    });
});


/***/ }),

/***/ "./apps/browser/src/state/registry.ts":
/*!********************************************!*\
  !*** ./apps/browser/src/state/registry.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Registry)
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

/***/ "./apps/browser/src/util/api.ts":
/*!**************************************!*\
  !*** ./apps/browser/src/util/api.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Server": () => (/* binding */ Server),
/* harmony export */   "Error": () => (/* binding */ Error),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _browser_util_dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @browser/util/dialog */ "./apps/browser/src/util/dialog.ts");
/* harmony import */ var _browser_util_tab__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @browser/util/tab */ "./apps/browser/src/util/tab.ts");
/* harmony import */ var _browser_util_user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @browser/util/user */ "./apps/browser/src/util/user.ts");




class Server {
    static notifyOnline() {
        this.isOnline = true;
        _browser_util_tab__WEBPACK_IMPORTED_MODULE_1__["default"].sendAll("server:online");
    }
    static notifyOffline() {
        this.isOnline = false;
        _browser_util_tab__WEBPACK_IMPORTED_MODULE_1__["default"].sendAll("server:offline");
    }
    static get url() {
        return  true ? this.devUrl : 0;
    }
    static get cdn() {
        return  true ? this.devCDN : 0;
    }
}
Server.isOnline = true;
Server.devUrl = "http://localhost:5050/";
Server.prodUrl = "https://api.getremark.com/";
Server.devCDN = "http://localhost:5000/";
Server.prodCDN = "https://cdn.getremark.com/";
class API {
    static get(path, resent = false) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
            return new Promise((resolve) => (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
                const isCdn = Array.isArray(path) && path[0] === "CDN";
                if (isCdn)
                    path.shift();
                if (Array.isArray(path))
                    path = path.join("/");
                const headers = new Headers();
                headers.append("Accept", "application/json");
                headers.append("Content-Type", "application/json");
                const accessToken = yield _browser_util_user__WEBPACK_IMPORTED_MODULE_2__["default"].accessToken();
                if (accessToken)
                    headers.append("authorization", `Bearer ${accessToken}`);
                try {
                    const res = yield fetch(`${isCdn ? Server.cdn : Server.url}${path}`, {
                        headers: headers,
                        method: "GET",
                        credentials: "include",
                    });
                    const parsed = yield this.parse(res, resent, () => this.get(path, true));
                    resolve(parsed);
                }
                catch (e) {
                    const parsed = yield this.parse(null, resent, () => this.get(path, true));
                    resolve(parsed);
                }
            }));
        });
    }
    static delete(path, resent = false) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
            return new Promise((resolve) => (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
                const isCdn = Array.isArray(path) && path[0] === "CDN";
                if (isCdn)
                    path.shift();
                if (Array.isArray(path))
                    path = path.join("/");
                const headers = new Headers();
                headers.append("Accept", "application/json");
                headers.append("Content-Type", "application/json");
                const accessToken = yield _browser_util_user__WEBPACK_IMPORTED_MODULE_2__["default"].accessToken();
                if (accessToken)
                    headers.append("authorization", `Bearer ${accessToken}`);
                try {
                    const res = yield fetch(`${isCdn ? Server.cdn : Server.url}${path}`, {
                        headers: headers,
                        method: "DELETE",
                        credentials: "include",
                    });
                    const parsed = yield this.parse(res, resent, () => this.delete(path, true));
                    resolve(parsed);
                }
                catch (e) {
                    const parsed = yield this.parse(null, resent, () => this.delete(path, true));
                    resolve(parsed);
                }
            }));
        });
    }
    static post(path, data, resent = false) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
            return new Promise((resolve) => (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
                const isCdn = Array.isArray(path) && path[0] === "CDN";
                if (isCdn)
                    path.shift();
                if (Array.isArray(path))
                    path = path.join("/");
                const headers = new Headers();
                headers.append("Accept", "application/json");
                headers.append("Content-Type", "application/json");
                const accessToken = yield _browser_util_user__WEBPACK_IMPORTED_MODULE_2__["default"].accessToken();
                if (accessToken)
                    headers.append("authorization", `Bearer ${accessToken}`);
                try {
                    const res = yield fetch(`${isCdn ? Server.cdn : Server.url}${path}`, {
                        headers: headers,
                        method: "POST",
                        credentials: "include",
                        body: typeof data === "object" ? JSON.stringify(data) : data,
                    });
                    const parsed = yield this.parse(res, resent, () => this.post(path, data, true));
                    resolve(parsed);
                }
                catch (e) {
                    const parsed = yield this.parse(null, resent, () => this.post(path, data, true));
                    resolve(parsed);
                }
            }));
        });
    }
    static file(path, form, resent = false) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
            return new Promise((resolve) => (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
                const isCdn = Array.isArray(path) && path[0] === "CDN";
                if (isCdn)
                    path.shift();
                if (Array.isArray(path))
                    path = path.join("/");
                const headers = new Headers();
                headers.append("Accept", "application/json");
                const accessToken = yield _browser_util_user__WEBPACK_IMPORTED_MODULE_2__["default"].accessToken();
                if (accessToken)
                    headers.append("authorization", `Bearer ${accessToken}`);
                try {
                    const res = yield fetch(`${isCdn ? Server.cdn : Server.url}${path}`, {
                        headers: headers,
                        method: "POST",
                        credentials: "include",
                        body: form,
                    });
                    const parsed = yield this.parse(res, resent, () => this.file(path, form, true));
                    resolve(parsed);
                }
                catch (e) {
                    const parsed = yield this.parse(null, resent, () => this.file(path, form, true));
                    resolve(parsed);
                }
            }));
        });
    }
    static parse(raw, resent, resend) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
            if (raw === null)
                return yield Error.parse(null);
            const res = {};
            res.body = yield raw.json();
            res.resent = resent;
            res.resend = resend;
            res.status = raw.status;
            res.success = raw.status >= 200 && raw.status < 300;
            return yield Error.parse(res);
        });
    }
}
class Error {
    static handle(res) {
        if (res.error)
            return _browser_util_dialog__WEBPACK_IMPORTED_MODULE_0__.Toast.error(res.error);
        _browser_util_dialog__WEBPACK_IMPORTED_MODULE_0__.Toast.error("Something unexpected happened!");
    }
    static parse(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
            if (res === null) {
                if (Server.isOnline)
                    Server.notifyOffline();
                return this.maintenance();
            }
            if (!Server.isOnline)
                Server.notifyOnline();
            if (res.success)
                return res;
            switch (res.body.error) {
                case "VALIDATION_ERROR":
                    return this.error(res.body.message || "Validation Error");
                case "EMAIL_NOT_AVAILABLE":
                    return this.error("This email is already in use");
                case "USERNAME_NOT_AVAILABLE":
                    return this.error("This username is already in use");
                case "WRONG_EMAIL_OR_PASSWORD":
                    return this.error("Wrong email or password");
                case "EMAIL_NOT_FOUND":
                    return this.error("This email doesn't exist");
                case "WRONG_TOKEN":
                    return this.error("This link is invalid");
                case "TOKEN_EXPIRED":
                    return this.error("This link is already expired");
                case "RATE_LIMIT_EXCEEDED":
                    return this.error("Calm Down! Rate Limit exceeded");
                case "POST_NOT_FOUND":
                    return this.error("Post not found");
                case "ACCESS_FORBIDDEN":
                    return this.error("Access forbidden");
                case "NO_FILE_SPECIFIED":
                    return this.error("No file specified");
                case "PROCESS_IMAGE_ERROR":
                    return this.error("Error processing Image");
                case "UPDATE_MISSING":
                    return this.error("No Update specified");
                case "USER_NOT_FOUND":
                    return _browser_util_user__WEBPACK_IMPORTED_MODULE_2__["default"].logout();
                case "INVALID_REFRESH_TOKEN":
                    return _browser_util_user__WEBPACK_IMPORTED_MODULE_2__["default"].logout();
                case "ACCESS_TOKEN_INVALID":
                    if (res.resent)
                        return _browser_util_user__WEBPACK_IMPORTED_MODULE_2__["default"].logout();
                    const refresh = yield _browser_util_user__WEBPACK_IMPORTED_MODULE_2__["default"].refresh();
                    if (!refresh.success)
                        return res;
                    const resent = yield this.parse(yield res.resend());
                    return resent;
                default:
                    return this.error("Something unexpected happened");
            }
        });
    }
    static success() {
        return { success: true };
    }
    static error(message) {
        return { success: false, error: message };
    }
    static maintenance() {
        return { success: false, redirect: "/maintenance", offline: true };
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (API);


/***/ }),

/***/ "./apps/browser/src/util/app.ts":
/*!**************************************!*\
  !*** ./apps/browser/src/util/app.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ App)
/* harmony export */ });
var DeviceType;
(function (DeviceType) {
    DeviceType[DeviceType["FirefoxExtension"] = 0] = "FirefoxExtension";
    DeviceType[DeviceType["OperaExtension"] = 1] = "OperaExtension";
    DeviceType[DeviceType["EdgeExtension"] = 2] = "EdgeExtension";
    DeviceType[DeviceType["VivaldiExtension"] = 3] = "VivaldiExtension";
    DeviceType[DeviceType["ChromeExtension"] = 4] = "ChromeExtension";
    DeviceType[DeviceType["SafariExtension"] = 5] = "SafariExtension";
})(DeviceType || (DeviceType = {}));
class App {
    static isDev() {
        return "development" === "development";
    }
    static get webUrl() {
        if (this.isDev())
            return "http://localhost:3000/";
        return "https://www.getremark.com/";
    }
    static get webHost() {
        if (this.isDev())
            return "*://localhost:/*";
        return "*://*.getremark.com/*";
    }
    static isInjected() {
        return chrome.tabs === undefined && document.body !== undefined;
    }
    static isPopup() {
        return chrome.tabs !== undefined && document.body !== undefined;
    }
    static getDevice() {
        if (this.deviceCache)
            return this.deviceCache;
        if (navigator.userAgent.indexOf(" Firefox/") !== -1 ||
            navigator.userAgent.indexOf(" Gecko/") !== -1) {
            this.deviceCache = DeviceType.FirefoxExtension;
        }
        else if (!!window.opr ||
            !!window.opera ||
            navigator.userAgent.indexOf(" OPR/") >= 0) {
            this.deviceCache = DeviceType.OperaExtension;
        }
        else if (navigator.userAgent.indexOf(" Edg/") !== -1) {
            this.deviceCache = DeviceType.EdgeExtension;
        }
        else if (navigator.userAgent.indexOf(" Vivaldi/") !== -1) {
            this.deviceCache = DeviceType.VivaldiExtension;
        }
        else if (window.chrome &&
            navigator.userAgent.indexOf(" Chrome/") !== -1) {
            this.deviceCache = DeviceType.ChromeExtension;
        }
        else if (navigator.userAgent.indexOf(" Safari/") !== -1) {
            this.deviceCache = DeviceType.SafariExtension;
        }
        return this.deviceCache;
    }
    static isFirefox() {
        return this.getDevice() === DeviceType.FirefoxExtension;
    }
    static isChrome() {
        return this.getDevice() === DeviceType.ChromeExtension;
    }
    static isEdge() {
        return this.getDevice() === DeviceType.EdgeExtension;
    }
    static isOpera() {
        return this.getDevice() === DeviceType.OperaExtension;
    }
    static isVivaldi() {
        return this.getDevice() === DeviceType.VivaldiExtension;
    }
    static isSafari() {
        return this.getDevice() === DeviceType.SafariExtension;
    }
}
App.deviceCache = null;


/***/ }),

/***/ "./apps/browser/src/util/dialog.ts":
/*!*****************************************!*\
  !*** ./apps/browser/src/util/dialog.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Snackbar": () => (/* binding */ Snackbar),
/* harmony export */   "Toast": () => (/* binding */ Toast),
/* harmony export */   "Modal": () => (/* binding */ Modal)
/* harmony export */ });
/* harmony import */ var _browser_actions_dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @browser/actions/dialog */ "./apps/browser/src/state/actions/dialog.ts");
/* harmony import */ var _browser_state_registry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @browser/state/registry */ "./apps/browser/src/state/registry.ts");


class ID {
    static generate() {
        return Math.random().toString(16);
    }
}
class Snackbar {
    static success(text) {
        const id = ID.generate();
        _browser_state_registry__WEBPACK_IMPORTED_MODULE_1__["default"].store.dispatch((0,_browser_actions_dialog__WEBPACK_IMPORTED_MODULE_0__.showSnackbar)({
            id,
            text: text,
            type: "SNACKBAR",
            level: "SUCCESS",
        }));
        return id;
    }
    static error(text) {
        const id = ID.generate();
        _browser_state_registry__WEBPACK_IMPORTED_MODULE_1__["default"].store.dispatch((0,_browser_actions_dialog__WEBPACK_IMPORTED_MODULE_0__.showSnackbar)({
            id,
            text: text,
            type: "SNACKBAR",
            level: "ERROR",
        }));
        return id;
    }
    static hide(id) {
        _browser_state_registry__WEBPACK_IMPORTED_MODULE_1__["default"].store.dispatch((0,_browser_actions_dialog__WEBPACK_IMPORTED_MODULE_0__.hideSnackbar)(id));
    }
}
class Toast {
    static success(text) {
        const id = ID.generate();
        _browser_state_registry__WEBPACK_IMPORTED_MODULE_1__["default"].store.dispatch((0,_browser_actions_dialog__WEBPACK_IMPORTED_MODULE_0__.showSnackbar)({
            id,
            text: text,
            type: "TOAST",
            level: "SUCCESS",
        }));
        return id;
    }
    static error(text) {
        const id = ID.generate();
        _browser_state_registry__WEBPACK_IMPORTED_MODULE_1__["default"].store.dispatch((0,_browser_actions_dialog__WEBPACK_IMPORTED_MODULE_0__.showSnackbar)({
            id,
            text: text,
            type: "TOAST",
            level: "ERROR",
        }));
        return id;
    }
    static hide(id) {
        _browser_state_registry__WEBPACK_IMPORTED_MODULE_1__["default"].store.dispatch((0,_browser_actions_dialog__WEBPACK_IMPORTED_MODULE_0__.hideSnackbar)(id));
    }
}
class Modal {
    static show(title, text, buttons) {
        const id = ID.generate();
        _browser_state_registry__WEBPACK_IMPORTED_MODULE_1__["default"].store.dispatch((0,_browser_actions_dialog__WEBPACK_IMPORTED_MODULE_0__.showModal)({
            id,
            title: title,
            text: text,
            buttons: buttons,
        }));
        return id;
    }
    static remove(id) {
        _browser_state_registry__WEBPACK_IMPORTED_MODULE_1__["default"].store.dispatch((0,_browser_actions_dialog__WEBPACK_IMPORTED_MODULE_0__.removeModal)(id));
    }
}


/***/ }),

/***/ "./apps/browser/src/util/storage.ts":
/*!******************************************!*\
  !*** ./apps/browser/src/util/storage.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Storage)
/* harmony export */ });
class Storage {
    static toObject(key, value) {
        const obj = {};
        obj[key] = value;
        return obj;
    }
    static set(key, value) {
        return new Promise((res) => {
            chrome.storage.local.set(this.toObject(key, value), () => res());
        });
    }
    static get(key) {
        return new Promise((res) => {
            chrome.storage.local.get(key, (data) => {
                if (!data || !data[key])
                    res(undefined);
                res(data[key]);
            });
        });
    }
    static setSynced(key, value) {
        return new Promise((res) => {
            chrome.storage.sync.set(this.toObject(key, value), () => res());
        });
    }
    static getSync(key) {
        return new Promise((res) => {
            chrome.storage.sync.get(key, (data) => {
                if (!data || !data[key])
                    res(undefined);
                res(data[key]);
            });
        });
    }
}


/***/ }),

/***/ "./apps/browser/src/util/tab.ts":
/*!**************************************!*\
  !*** ./apps/browser/src/util/tab.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Tab)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _browser_util_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @browser/util/app */ "./apps/browser/src/util/app.ts");


class Tab {
    static listen(listener) {
        this.events.push(listener);
    }
    static call(data) {
        this.events.forEach((func) => {
            func(data);
        });
    }
    static count() {
        return new Promise((res) => {
            chrome.tabs.query({ windowType: "normal" }, (tabs) => {
                res(tabs.length);
            });
        });
    }
    static getCurrent() {
        return new Promise((res) => {
            chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
                res(tabs[0]);
            });
        });
    }
    static getAll() {
        return new Promise((res) => {
            chrome.tabs.query({}, (tabs) => {
                res(tabs);
            });
        });
    }
    static find(url) {
        return new Promise((res) => {
            chrome.tabs.query({ url: url }, (tabs) => {
                res(tabs[0]);
            });
        });
    }
    static reload() {
        return new Promise((res) => (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__awaiter)(this, void 0, void 0, function* () {
            const tab = yield this.getCurrent();
            chrome.tabs.reload(tab.id);
            res();
        }));
    }
    static close(url) {
        return new Promise((res) => (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__awaiter)(this, void 0, void 0, function* () {
            const count = yield this.count();
            if (count <= 1)
                return res(null);
            const tab = yield this.find(url);
            chrome.tabs.remove(tab.id);
            res();
        }));
    }
    static send(type, data = {}) {
        return new Promise((res) => (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__awaiter)(this, void 0, void 0, function* () {
            if (_browser_util_app__WEBPACK_IMPORTED_MODULE_0__["default"].isInjected())
                return this.call(Object.assign(Object.assign({}, data), { type: type }));
            const tab = yield Tab.getCurrent();
            chrome.tabs.sendMessage(tab.id, Object.assign(Object.assign({}, data), { type: type }));
            res();
        }));
    }
    static sendAll(type, data = {}) {
        return new Promise((res) => (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__awaiter)(this, void 0, void 0, function* () {
            if (_browser_util_app__WEBPACK_IMPORTED_MODULE_0__["default"].isInjected())
                return this.call(Object.assign(Object.assign({}, data), { type: type }));
            const tabs = yield Tab.getAll();
            tabs.forEach((tab) => {
                chrome.tabs.sendMessage(tab.id, Object.assign(Object.assign({}, data), { type: type }));
            });
            res();
        }));
    }
    static open(url) {
        return new Promise((res) => (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__awaiter)(this, void 0, void 0, function* () {
            chrome.tabs.create({ url: url });
            res();
        }));
    }
}
Tab.events = [];


/***/ }),

/***/ "./apps/browser/src/util/user.ts":
/*!***************************************!*\
  !*** ./apps/browser/src/util/user.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ User)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _browser_util_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @browser/util/api */ "./apps/browser/src/util/api.ts");
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storage */ "./apps/browser/src/util/storage.ts");
/* harmony import */ var _tab__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tab */ "./apps/browser/src/util/tab.ts");




class User {
    static accessToken() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
            if (this.accessTokenCache)
                return this.accessTokenCache;
            this.accessTokenCache = yield _storage__WEBPACK_IMPORTED_MODULE_1__["default"].get("access_token");
            return this.accessTokenCache;
        });
    }
    static refreshToken() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
            if (this.refreshTokenCache)
                return this.refreshTokenCache;
            this.refreshTokenCache = yield _storage__WEBPACK_IMPORTED_MODULE_1__["default"].get("refresh_token");
            return this.refreshTokenCache;
        });
    }
    static setTokens(res) {
        this.accessTokenCache = res.accessToken;
        this.refreshTokenCache = res.refreshToken;
        _storage__WEBPACK_IMPORTED_MODULE_1__["default"].set("access_token", this.accessTokenCache);
        _storage__WEBPACK_IMPORTED_MODULE_1__["default"].set("refresh_token", this.refreshTokenCache);
    }
    static isAuthenticated() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
            const accessToken = yield this.accessToken();
            const isAuthenticated = accessToken !== "" && accessToken !== null && accessToken !== undefined;
            return { isAuthenticated: isAuthenticated };
        });
    }
    static refresh() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
            const refreshToken = yield this.refreshToken();
            const res = yield _browser_util_api__WEBPACK_IMPORTED_MODULE_0__["default"].post(["auth", "refresh"], {
                refreshToken: refreshToken,
            });
            if (!res.success)
                return res;
            this.setTokens(res.body);
            return res;
        });
    }
    static me(fetchAvatar = false) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
            const res = yield _browser_util_api__WEBPACK_IMPORTED_MODULE_0__["default"].get(["user", "me"]);
            if (!res.success || !fetchAvatar)
                return res;
            const avatar = yield this.hasAvatar(res.body.id);
            return Object.assign(Object.assign({}, res), { body: Object.assign(Object.assign({}, res.body), { avatar: avatar }) });
        });
    }
    static hasAvatar(id) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
            const res = yield _browser_util_api__WEBPACK_IMPORTED_MODULE_0__["default"].get([
                "CDN",
                "exists",
                "avatar",
                "50x50",
                `${id}.jpg`,
            ]);
            if (!res.success)
                return false;
            return res.body.exists;
        });
    }
    static logout(manual = false, background = false) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
            this.refreshTokenCache = "";
            this.accessTokenCache = "";
            if (background)
                return;
            yield _storage__WEBPACK_IMPORTED_MODULE_1__["default"].set("access_token", "");
            yield _storage__WEBPACK_IMPORTED_MODULE_1__["default"].set("refresh_token", "");
            if (manual)
                _tab__WEBPACK_IMPORTED_MODULE_2__["default"].send("toast:success", { text: "Signed Out!" });
            _tab__WEBPACK_IMPORTED_MODULE_2__["default"].sendAll("auth:update");
            if (chrome.runtime)
                chrome.runtime.sendMessage("LOGOUT");
            return { success: false, logout: true };
        });
    }
    static forgot(data) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
            const res = yield _browser_util_api__WEBPACK_IMPORTED_MODULE_0__["default"].post(["auth", "forgot"], {
                email: data.email,
            });
            return res;
        });
    }
    static reset(data) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
            if (data.password !== data.confirm)
                return _browser_util_api__WEBPACK_IMPORTED_MODULE_0__.Error.error("Passwords do not match");
            const res = yield _browser_util_api__WEBPACK_IMPORTED_MODULE_0__["default"].post(["auth", "reset"], {
                token: data.token,
                password: data.password,
            });
            if (!res.success)
                return res;
            _tab__WEBPACK_IMPORTED_MODULE_2__["default"].send("toast:success", { text: "Authenticated!" });
            _tab__WEBPACK_IMPORTED_MODULE_2__["default"].sendAll("auth:update");
            this.setTokens(res.body);
            return res;
        });
    }
    static update(data) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
            const res = [];
            if (data.changed.includes("AVATAR")) {
                const avatar = yield this.upload(data.avatar);
                res.push(avatar);
            }
            const changes = {};
            if (data.changed.includes("USERNAME"))
                changes.username = data.username;
            if (data.changed.includes("EMAIL"))
                changes.email = data.email;
            if (Object.keys(changes).length > 0) {
                const update = yield _browser_util_api__WEBPACK_IMPORTED_MODULE_0__["default"].post(["user", "update"], changes);
                res.push(update);
            }
            const error = res.find((r) => !r.success);
            if (error)
                return error;
            return res[0];
        });
    }
    static upload(avatar) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
            const arr = avatar.split(",");
            const mime = arr[0].match(/:(.*?);/)[1];
            const bstr = atob(arr[1]);
            let n = bstr.length;
            const u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            const file = new File([u8arr], "image.jpg", { type: mime });
            const form = new FormData();
            form.append("image", file);
            const res = yield _browser_util_api__WEBPACK_IMPORTED_MODULE_0__["default"].file(["CDN", "upload", "avatar"], form);
            return res;
        });
    }
    static login(data) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
            const res = yield _browser_util_api__WEBPACK_IMPORTED_MODULE_0__["default"].post(["auth", "login"], {
                email: data.email,
                password: data.password,
            });
            if (!res.success)
                return res;
            _tab__WEBPACK_IMPORTED_MODULE_2__["default"].send("toast:success", { text: "Authenticated!" });
            _tab__WEBPACK_IMPORTED_MODULE_2__["default"].sendAll("auth:update");
            this.setTokens(res.body);
            return res;
        });
    }
    static register(data) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
            if (data.password !== data.confirm)
                return _browser_util_api__WEBPACK_IMPORTED_MODULE_0__.Error.error("Passwords do not match");
            const res = yield _browser_util_api__WEBPACK_IMPORTED_MODULE_0__["default"].post(["auth", "register"], {
                username: data.username,
                email: data.email,
                password: data.password,
            });
            if (!res.success)
                return res;
            _tab__WEBPACK_IMPORTED_MODULE_2__["default"].send("toast:success", { text: "Authenticated!" });
            _tab__WEBPACK_IMPORTED_MODULE_2__["default"].send("auth:update");
            this.setTokens(res.body);
            return res;
        });
    }
}
User.accessTokenCache = "";
User.refreshTokenCache = "";


/***/ }),

/***/ "./node_modules/tslib/tslib.es6.js":
/*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__extends": () => (/* binding */ __extends),
/* harmony export */   "__assign": () => (/* binding */ __assign),
/* harmony export */   "__rest": () => (/* binding */ __rest),
/* harmony export */   "__decorate": () => (/* binding */ __decorate),
/* harmony export */   "__param": () => (/* binding */ __param),
/* harmony export */   "__metadata": () => (/* binding */ __metadata),
/* harmony export */   "__awaiter": () => (/* binding */ __awaiter),
/* harmony export */   "__generator": () => (/* binding */ __generator),
/* harmony export */   "__createBinding": () => (/* binding */ __createBinding),
/* harmony export */   "__exportStar": () => (/* binding */ __exportStar),
/* harmony export */   "__values": () => (/* binding */ __values),
/* harmony export */   "__read": () => (/* binding */ __read),
/* harmony export */   "__spread": () => (/* binding */ __spread),
/* harmony export */   "__spreadArrays": () => (/* binding */ __spreadArrays),
/* harmony export */   "__spreadArray": () => (/* binding */ __spreadArray),
/* harmony export */   "__await": () => (/* binding */ __await),
/* harmony export */   "__asyncGenerator": () => (/* binding */ __asyncGenerator),
/* harmony export */   "__asyncDelegator": () => (/* binding */ __asyncDelegator),
/* harmony export */   "__asyncValues": () => (/* binding */ __asyncValues),
/* harmony export */   "__makeTemplateObject": () => (/* binding */ __makeTemplateObject),
/* harmony export */   "__importStar": () => (/* binding */ __importStar),
/* harmony export */   "__importDefault": () => (/* binding */ __importDefault),
/* harmony export */   "__classPrivateFieldGet": () => (/* binding */ __classPrivateFieldGet),
/* harmony export */   "__classPrivateFieldSet": () => (/* binding */ __classPrivateFieldSet)
/* harmony export */ });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});

function __exportStar(m, o) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

/** @deprecated */
function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

/** @deprecated */
function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!************************************************!*\
  !*** ./apps/browser/src/scripts/background.ts ***!
  \************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _browser_util_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @browser/util/app */ "./apps/browser/src/util/app.ts");
/* harmony import */ var _browser_util_tab__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @browser/util/tab */ "./apps/browser/src/util/tab.ts");
/* harmony import */ var _browser_util_user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @browser/util/user */ "./apps/browser/src/util/user.ts");




if (_browser_util_app__WEBPACK_IMPORTED_MODULE_0__["default"].isDev())
    __webpack_require__(/*! crx-hotreload */ "./node_modules/crx-hotreload/hot-reload.js");
chrome.runtime.setUninstallURL(`${_browser_util_app__WEBPACK_IMPORTED_MODULE_0__["default"].webUrl}uninstall`);
chrome.runtime.onInstalled.addListener((details) => {
    if (_browser_util_app__WEBPACK_IMPORTED_MODULE_0__["default"].isDev())
        return;
    if (details.reason == "install")
        chrome.tabs.create({ url: `${_browser_util_app__WEBPACK_IMPORTED_MODULE_0__["default"].webUrl}auth/signup` });
});
chrome.runtime.onUpdateAvailable.addListener(() => {
    chrome.runtime.reload();
});
chrome.runtime.onMessage.addListener((req, _, res) => {
    if (req.passed)
        handleExternalRequest(req, res);
    else
        handleInternalRequest(req, res);
    return true;
});
chrome.runtime.onMessageExternal.addListener((req, _, res) => {
    handleExternalRequest(req, res);
    return true;
});
function handleExternalRequest(req, res) {
    return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
        if (!req.type)
            res({ success: false });
        switch (req.type) {
            case "PING":
                res({ success: true });
                break;
            case "AUTHENTICATED":
                res(yield _browser_util_user__WEBPACK_IMPORTED_MODULE_2__["default"].isAuthenticated());
                break;
            case "REGISTER":
                res(yield _browser_util_user__WEBPACK_IMPORTED_MODULE_2__["default"].register(req));
                break;
            case "LOGIN":
                res(yield _browser_util_user__WEBPACK_IMPORTED_MODULE_2__["default"].login(req));
                break;
            case "FORGOT":
                res(yield _browser_util_user__WEBPACK_IMPORTED_MODULE_2__["default"].forgot(req));
                break;
            case "RESET":
                res(yield _browser_util_user__WEBPACK_IMPORTED_MODULE_2__["default"].reset(req));
                break;
            case "UPDATE":
                res(yield _browser_util_user__WEBPACK_IMPORTED_MODULE_2__["default"].update(req));
                break;
            case "ME":
                res(yield _browser_util_user__WEBPACK_IMPORTED_MODULE_2__["default"].me(true));
                break;
            case "CLOSE":
                const result = yield _browser_util_tab__WEBPACK_IMPORTED_MODULE_1__["default"].close(req.url);
                setTimeout(() => _browser_util_tab__WEBPACK_IMPORTED_MODULE_1__["default"].reload(), 1000);
                res({ success: result !== null });
                break;
            default:
                res({ success: false });
        }
    });
}
function handleInternalRequest(req, res) {
    return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
        switch (req) {
            case "LOGOUT":
                res(yield _browser_util_user__WEBPACK_IMPORTED_MODULE_2__["default"].logout(false, true));
                break;
            default:
                res({ success: false });
        }
    });
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNwQyxNQUFNO1lBQ1I7Z0JBQ0UsR0FBRyxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7U0FDM0I7SUFDSCxDQUFDO0NBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yZW1hcmsvLi9ub2RlX21vZHVsZXMvY3J4LWhvdHJlbG9hZC9ob3QtcmVsb2FkLmpzIiwid2VicGFjazovL3JlbWFyay8uL2FwcHMvYnJvd3Nlci9zcmMvc3RhdGUvYWN0aW9ucy9kaWFsb2cudHMiLCJ3ZWJwYWNrOi8vcmVtYXJrLy4vYXBwcy9icm93c2VyL3NyYy9zdGF0ZS9yZWdpc3RyeS50cyIsIndlYnBhY2s6Ly9yZW1hcmsvLi9hcHBzL2Jyb3dzZXIvc3JjL3V0aWwvYXBpLnRzIiwid2VicGFjazovL3JlbWFyay8uL2FwcHMvYnJvd3Nlci9zcmMvdXRpbC9hcHAudHMiLCJ3ZWJwYWNrOi8vcmVtYXJrLy4vYXBwcy9icm93c2VyL3NyYy91dGlsL2RpYWxvZy50cyIsIndlYnBhY2s6Ly9yZW1hcmsvLi9hcHBzL2Jyb3dzZXIvc3JjL3V0aWwvc3RvcmFnZS50cyIsIndlYnBhY2s6Ly9yZW1hcmsvLi9hcHBzL2Jyb3dzZXIvc3JjL3V0aWwvdGFiLnRzIiwid2VicGFjazovL3JlbWFyay8uL2FwcHMvYnJvd3Nlci9zcmMvdXRpbC91c2VyLnRzIiwid2VicGFjazovL3JlbWFyay8uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCJ3ZWJwYWNrOi8vcmVtYXJrL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3JlbWFyay93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcmVtYXJrL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcmVtYXJrL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcmVtYXJrLy4vYXBwcy9icm93c2VyL3NyYy9zY3JpcHRzL2JhY2tncm91bmQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZmlsZXNJbkRpcmVjdG9yeSA9IGRpciA9PiBuZXcgUHJvbWlzZSAocmVzb2x2ZSA9PlxuICAgIGRpci5jcmVhdGVSZWFkZXIgKCkucmVhZEVudHJpZXMgKGVudHJpZXMgPT5cbiAgICAgICAgUHJvbWlzZS5hbGwgKGVudHJpZXMuZmlsdGVyIChlID0+IGUubmFtZVswXSAhPT0gJy4nKS5tYXAgKGUgPT5cbiAgICAgICAgICAgIGUuaXNEaXJlY3RvcnlcbiAgICAgICAgICAgICAgICA/IGZpbGVzSW5EaXJlY3RvcnkgKGUpXG4gICAgICAgICAgICAgICAgOiBuZXcgUHJvbWlzZSAocmVzb2x2ZSA9PiBlLmZpbGUgKHJlc29sdmUpKVxuICAgICAgICApKVxuICAgICAgICAudGhlbiAoZmlsZXMgPT4gW10uY29uY2F0ICguLi5maWxlcykpXG4gICAgICAgIC50aGVuIChyZXNvbHZlKVxuICAgIClcbilcblxuY29uc3QgdGltZXN0YW1wRm9yRmlsZXNJbkRpcmVjdG9yeSA9IGRpciA9PlxuICAgICAgICBmaWxlc0luRGlyZWN0b3J5IChkaXIpLnRoZW4gKGZpbGVzID0+XG4gICAgICAgICAgICBmaWxlcy5tYXAgKGYgPT4gZi5uYW1lICsgZi5sYXN0TW9kaWZpZWREYXRlKS5qb2luICgpKVxuXG5jb25zdCB3YXRjaENoYW5nZXMgPSAoZGlyLCBsYXN0VGltZXN0YW1wKSA9PiB7XG4gICAgdGltZXN0YW1wRm9yRmlsZXNJbkRpcmVjdG9yeSAoZGlyKS50aGVuICh0aW1lc3RhbXAgPT4ge1xuICAgICAgICBpZiAoIWxhc3RUaW1lc3RhbXAgfHwgKGxhc3RUaW1lc3RhbXAgPT09IHRpbWVzdGFtcCkpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQgKCgpID0+IHdhdGNoQ2hhbmdlcyAoZGlyLCB0aW1lc3RhbXApLCAxMDAwKSAvLyByZXRyeSBhZnRlciAxc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2hyb21lLnJ1bnRpbWUucmVsb2FkICgpXG4gICAgICAgIH1cbiAgICB9KVxufVxuXG5jaHJvbWUubWFuYWdlbWVudC5nZXRTZWxmIChzZWxmID0+IHtcbiAgICBpZiAoc2VsZi5pbnN0YWxsVHlwZSA9PT0gJ2RldmVsb3BtZW50Jykge1xuICAgICAgICBjaHJvbWUucnVudGltZS5nZXRQYWNrYWdlRGlyZWN0b3J5RW50cnkgKGRpciA9PiB3YXRjaENoYW5nZXMgKGRpcikpXG4gICAgICAgIGNocm9tZS50YWJzLnF1ZXJ5ICh7IGFjdGl2ZTogdHJ1ZSwgbGFzdEZvY3VzZWRXaW5kb3c6IHRydWUgfSwgdGFicyA9PiB7IC8vIE5COiBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3hwbC9jcngtaG90cmVsb2FkL2lzc3Vlcy81XG4gICAgICAgICAgICBpZiAodGFic1swXSkge1xuICAgICAgICAgICAgICAgIGNocm9tZS50YWJzLnJlbG9hZCAodGFic1swXS5pZClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG59KVxuIiwiaW1wb3J0IHsgRGlzcGF0Y2ggfSBmcm9tIFwicmVkdXhcIjtcbmltcG9ydCB7IGxldmVsIH0gZnJvbSBcIkBicm93c2VyL3V0aWwvZGlhbG9nXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVNuYWNrYmFyRGF0YSB7XG4gIGlkOiBzdHJpbmc7XG4gIHR5cGU6IFwiU05BQ0tCQVJcIiB8IFwiVE9BU1RcIjtcbiAgbGV2ZWw6IGxldmVsO1xuICB0ZXh0OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVNuYWNrYmFyIGV4dGVuZHMgSVNuYWNrYmFyRGF0YSB7XG4gIHNob3dlbjogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJTW9kYWwge1xuICBpZDogc3RyaW5nO1xuICB0aXRsZTogc3RyaW5nO1xuICB0ZXh0OiBzdHJpbmc7XG4gIGJ1dHRvbnM6IElCdXR0b25bXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJQnV0dG9uIHtcbiAgdHlwZTogXCJQUklNQVJZXCIgfCBcIkxJTktcIjtcbiAgdGV4dDogc3RyaW5nO1xuICBvbkNsaWNrPzogKCkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGNvbnN0IFNIT1dfTU9EQUwgPSBcIlNIT1dfTU9EQUxcIjtcbmV4cG9ydCBjb25zdCBTSE9XX1NOQUNLQkFSID0gXCJTSE9XX1NOQUNLQkFSXCI7XG5leHBvcnQgY29uc3QgSElERV9TTkFDS0JBUiA9IFwiSElERV9TTkFDS0JBUlwiO1xuZXhwb3J0IGNvbnN0IFJFTU9WRV9NT0RBTCA9IFwiUkVNT1ZFX01PREFMXCI7XG5leHBvcnQgY29uc3QgUkVNT1ZFX1NOQUNLQkFSID0gXCJSRU1PVkVfU05BQ0tCQVJcIjtcblxuZXhwb3J0IGNvbnN0IHNob3dNb2RhbCA9IChkYXRhOiBJTW9kYWwpID0+IGFzeW5jIChkaXNwYXRjaDogRGlzcGF0Y2gpID0+IHtcbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFNIT1dfTU9EQUwsXG4gICAgZGF0YTogZGF0YSBhcyBJTW9kYWwsXG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHNob3dTbmFja2JhciA9XG4gIChkYXRhOiBJU25hY2tiYXJEYXRhKSA9PiBhc3luYyAoZGlzcGF0Y2g6IERpc3BhdGNoKSA9PiB7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogU0hPV19TTkFDS0JBUixcbiAgICAgIGRhdGE6IHsgLi4uZGF0YSwgc2hvd2VuOiB0cnVlIH0gYXMgSVNuYWNrYmFyLFxuICAgIH0pO1xuXG4gICAgaWYgKGRhdGEudHlwZSA9PSBcIlRPQVNUXCIpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBkaXNwYXRjaChoaWRlU25hY2tiYXIoZGF0YS5pZCkgYXMgYW55KTtcbiAgICAgIH0sIDIwMDApO1xuICAgIH1cbiAgfTtcblxuZXhwb3J0IGNvbnN0IGhpZGVTbmFja2JhciA9IChpZDogc3RyaW5nKSA9PiBhc3luYyAoZGlzcGF0Y2g6IERpc3BhdGNoKSA9PiB7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBISURFX1NOQUNLQkFSLFxuICAgIGlkLFxuICB9KTtcblxuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBSRU1PVkVfU05BQ0tCQVIsXG4gICAgICBpZCxcbiAgICB9KTtcbiAgfSwgMjUwKTtcbn07XG5cbmV4cG9ydCBjb25zdCByZW1vdmVNb2RhbCA9IChpZDogc3RyaW5nKSA9PiBhc3luYyAoZGlzcGF0Y2g6IERpc3BhdGNoKSA9PiB7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiBSRU1PVkVfTU9EQUwsXG4gICAgaWQsXG4gIH0pO1xufTtcbiIsImltcG9ydCB7IFN0b3JlIH0gZnJvbSBcInJlZHV4XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlZ2lzdHJ5IHtcbiAgc3RhdGljIHN0b3JlOiBTdG9yZTtcblxuICBzdGF0aWMgZ2V0U3RvcmUoKTogU3RvcmUge1xuICAgIHJldHVybiB0aGlzLnN0b3JlO1xuICB9XG5cbiAgc3RhdGljIHNldChzdG9yZTogU3RvcmUpIHtcbiAgICB0aGlzLnN0b3JlID0gc3RvcmU7XG4gIH1cbn1cbiIsImltcG9ydCB7IFRvYXN0IH0gZnJvbSBcIkBicm93c2VyL3V0aWwvZGlhbG9nXCI7XG5pbXBvcnQgVGFiIGZyb20gXCJAYnJvd3Nlci91dGlsL3RhYlwiO1xuaW1wb3J0IFVzZXIgZnJvbSBcIkBicm93c2VyL3V0aWwvdXNlclwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJlcyB7XG4gIHN0YXR1czogbnVtYmVyO1xuICBzdWNjZXNzOiBib29sZWFuO1xuICByZXNlbnQ6IGJvb2xlYW47XG4gIG9mZmxpbmU/OiBib29sZWFuO1xuICByZXNlbmQ6ICgpID0+IFByb21pc2U8UmVzPjtcbiAgYm9keToge1xuICAgIFtrZXk6IHN0cmluZ106IGFueTtcbiAgfTtcbiAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgY2xhc3MgU2VydmVyIHtcbiAgc3RhdGljIGlzT25saW5lID0gdHJ1ZTtcblxuICBzdGF0aWMgZGV2VXJsID0gXCJodHRwOi8vbG9jYWxob3N0OjUwNTAvXCI7XG4gIHN0YXRpYyBwcm9kVXJsID0gXCJodHRwczovL2FwaS5nZXRyZW1hcmsuY29tL1wiO1xuXG4gIHN0YXRpYyBkZXZDRE4gPSBcImh0dHA6Ly9sb2NhbGhvc3Q6NTAwMC9cIjtcbiAgc3RhdGljIHByb2RDRE4gPSBcImh0dHBzOi8vY2RuLmdldHJlbWFyay5jb20vXCI7XG5cbiAgc3RhdGljIG5vdGlmeU9ubGluZSgpIHtcbiAgICB0aGlzLmlzT25saW5lID0gdHJ1ZTtcbiAgICBUYWIuc2VuZEFsbChcInNlcnZlcjpvbmxpbmVcIik7XG4gIH1cblxuICBzdGF0aWMgbm90aWZ5T2ZmbGluZSgpIHtcbiAgICB0aGlzLmlzT25saW5lID0gZmFsc2U7XG4gICAgVGFiLnNlbmRBbGwoXCJzZXJ2ZXI6b2ZmbGluZVwiKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgdXJsKCkge1xuICAgIHJldHVybiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJkZXZlbG9wbWVudFwiID8gdGhpcy5kZXZVcmwgOiB0aGlzLnByb2RVcmw7XG4gIH1cblxuICBzdGF0aWMgZ2V0IGNkbigpIHtcbiAgICByZXR1cm4gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwiZGV2ZWxvcG1lbnRcIiA/IHRoaXMuZGV2Q0ROIDogdGhpcy5wcm9kQ0ROO1xuICB9XG59XG5cbmNsYXNzIEFQSSB7XG4gIHN0YXRpYyBhc3luYyBnZXQoXG4gICAgcGF0aDogc3RyaW5nIHwgc3RyaW5nW10sXG4gICAgcmVzZW50OiBib29sZWFuID0gZmFsc2VcbiAgKTogUHJvbWlzZTxSZXMgfCBudWxsPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIHJlc29sdmUgPT4ge1xuICAgICAgY29uc3QgaXNDZG4gPSBBcnJheS5pc0FycmF5KHBhdGgpICYmIHBhdGhbMF0gPT09IFwiQ0ROXCI7XG4gICAgICBpZiAoaXNDZG4pIChwYXRoIGFzIHN0cmluZ1tdKS5zaGlmdCgpO1xuXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShwYXRoKSkgcGF0aCA9IHBhdGguam9pbihcIi9cIik7XG5cbiAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xuICAgICAgaGVhZGVycy5hcHBlbmQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xuICAgICAgaGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xuXG4gICAgICBjb25zdCBhY2Nlc3NUb2tlbiA9IGF3YWl0IFVzZXIuYWNjZXNzVG9rZW4oKTtcbiAgICAgIGlmIChhY2Nlc3NUb2tlbikgaGVhZGVycy5hcHBlbmQoXCJhdXRob3JpemF0aW9uXCIsIGBCZWFyZXIgJHthY2Nlc3NUb2tlbn1gKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goYCR7aXNDZG4gPyBTZXJ2ZXIuY2RuIDogU2VydmVyLnVybH0ke3BhdGh9YCwge1xuICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnMsXG4gICAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgICAgIGNyZWRlbnRpYWxzOiBcImluY2x1ZGVcIixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgcGFyc2VkID0gYXdhaXQgdGhpcy5wYXJzZShyZXMsIHJlc2VudCwgKCkgPT5cbiAgICAgICAgICB0aGlzLmdldChwYXRoLCB0cnVlKVxuICAgICAgICApO1xuXG4gICAgICAgIHJlc29sdmUocGFyc2VkKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc3QgcGFyc2VkID0gYXdhaXQgdGhpcy5wYXJzZShudWxsLCByZXNlbnQsICgpID0+XG4gICAgICAgICAgdGhpcy5nZXQocGF0aCwgdHJ1ZSlcbiAgICAgICAgKTtcbiAgICAgICAgcmVzb2x2ZShwYXJzZWQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGFzeW5jIGRlbGV0ZShcbiAgICBwYXRoOiBzdHJpbmcgfCBzdHJpbmdbXSxcbiAgICByZXNlbnQ6IGJvb2xlYW4gPSBmYWxzZVxuICApOiBQcm9taXNlPFJlcyB8IG51bGw+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgcmVzb2x2ZSA9PiB7XG4gICAgICBjb25zdCBpc0NkbiA9IEFycmF5LmlzQXJyYXkocGF0aCkgJiYgcGF0aFswXSA9PT0gXCJDRE5cIjtcbiAgICAgIGlmIChpc0NkbikgKHBhdGggYXMgc3RyaW5nW10pLnNoaWZ0KCk7XG5cbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHBhdGgpKSBwYXRoID0gcGF0aC5qb2luKFwiL1wiKTtcblxuICAgICAgY29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XG4gICAgICBoZWFkZXJzLmFwcGVuZChcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XG4gICAgICBoZWFkZXJzLmFwcGVuZChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XG5cbiAgICAgIGNvbnN0IGFjY2Vzc1Rva2VuID0gYXdhaXQgVXNlci5hY2Nlc3NUb2tlbigpO1xuICAgICAgaWYgKGFjY2Vzc1Rva2VuKSBoZWFkZXJzLmFwcGVuZChcImF1dGhvcml6YXRpb25cIiwgYEJlYXJlciAke2FjY2Vzc1Rva2VufWApO1xuXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChgJHtpc0NkbiA/IFNlcnZlci5jZG4gOiBTZXJ2ZXIudXJsfSR7cGF0aH1gLCB7XG4gICAgICAgICAgaGVhZGVyczogaGVhZGVycyxcbiAgICAgICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXG4gICAgICAgICAgY3JlZGVudGlhbHM6IFwiaW5jbHVkZVwiLFxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBwYXJzZWQgPSBhd2FpdCB0aGlzLnBhcnNlKHJlcywgcmVzZW50LCAoKSA9PlxuICAgICAgICAgIHRoaXMuZGVsZXRlKHBhdGgsIHRydWUpXG4gICAgICAgICk7XG5cbiAgICAgICAgcmVzb2x2ZShwYXJzZWQpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zdCBwYXJzZWQgPSBhd2FpdCB0aGlzLnBhcnNlKG51bGwsIHJlc2VudCwgKCkgPT5cbiAgICAgICAgICB0aGlzLmRlbGV0ZShwYXRoLCB0cnVlKVxuICAgICAgICApO1xuICAgICAgICByZXNvbHZlKHBhcnNlZCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgcG9zdChcbiAgICBwYXRoOiBzdHJpbmcgfCBzdHJpbmdbXSxcbiAgICBkYXRhOiBhbnksXG4gICAgcmVzZW50OiBib29sZWFuID0gZmFsc2VcbiAgKTogUHJvbWlzZTxSZXMgfCBudWxsPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIHJlc29sdmUgPT4ge1xuICAgICAgY29uc3QgaXNDZG4gPSBBcnJheS5pc0FycmF5KHBhdGgpICYmIHBhdGhbMF0gPT09IFwiQ0ROXCI7XG4gICAgICBpZiAoaXNDZG4pIChwYXRoIGFzIHN0cmluZ1tdKS5zaGlmdCgpO1xuXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShwYXRoKSkgcGF0aCA9IHBhdGguam9pbihcIi9cIik7XG5cbiAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xuICAgICAgaGVhZGVycy5hcHBlbmQoXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xuICAgICAgaGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xuXG4gICAgICBjb25zdCBhY2Nlc3NUb2tlbiA9IGF3YWl0IFVzZXIuYWNjZXNzVG9rZW4oKTtcbiAgICAgIGlmIChhY2Nlc3NUb2tlbikgaGVhZGVycy5hcHBlbmQoXCJhdXRob3JpemF0aW9uXCIsIGBCZWFyZXIgJHthY2Nlc3NUb2tlbn1gKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goYCR7aXNDZG4gPyBTZXJ2ZXIuY2RuIDogU2VydmVyLnVybH0ke3BhdGh9YCwge1xuICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnMsXG4gICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICBjcmVkZW50aWFsczogXCJpbmNsdWRlXCIsXG4gICAgICAgICAgYm9keTogdHlwZW9mIGRhdGEgPT09IFwib2JqZWN0XCIgPyBKU09OLnN0cmluZ2lmeShkYXRhKSA6IGRhdGEsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHBhcnNlZCA9IGF3YWl0IHRoaXMucGFyc2UocmVzLCByZXNlbnQsICgpID0+XG4gICAgICAgICAgdGhpcy5wb3N0KHBhdGgsIGRhdGEsIHRydWUpXG4gICAgICAgICk7XG5cbiAgICAgICAgcmVzb2x2ZShwYXJzZWQpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zdCBwYXJzZWQgPSBhd2FpdCB0aGlzLnBhcnNlKG51bGwsIHJlc2VudCwgKCkgPT5cbiAgICAgICAgICB0aGlzLnBvc3QocGF0aCwgZGF0YSwgdHJ1ZSlcbiAgICAgICAgKTtcbiAgICAgICAgcmVzb2x2ZShwYXJzZWQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGFzeW5jIGZpbGUoXG4gICAgcGF0aDogc3RyaW5nIHwgc3RyaW5nW10sXG4gICAgZm9ybTogYW55LFxuICAgIHJlc2VudDogYm9vbGVhbiA9IGZhbHNlXG4gICk6IFByb21pc2U8UmVzIHwgbnVsbD4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyByZXNvbHZlID0+IHtcbiAgICAgIGNvbnN0IGlzQ2RuID0gQXJyYXkuaXNBcnJheShwYXRoKSAmJiBwYXRoWzBdID09PSBcIkNETlwiO1xuICAgICAgaWYgKGlzQ2RuKSAocGF0aCBhcyBzdHJpbmdbXSkuc2hpZnQoKTtcblxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkocGF0aCkpIHBhdGggPSBwYXRoLmpvaW4oXCIvXCIpO1xuXG4gICAgICBjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcbiAgICAgIGhlYWRlcnMuYXBwZW5kKFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcblxuICAgICAgY29uc3QgYWNjZXNzVG9rZW4gPSBhd2FpdCBVc2VyLmFjY2Vzc1Rva2VuKCk7XG4gICAgICBpZiAoYWNjZXNzVG9rZW4pIGhlYWRlcnMuYXBwZW5kKFwiYXV0aG9yaXphdGlvblwiLCBgQmVhcmVyICR7YWNjZXNzVG9rZW59YCk7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGAke2lzQ2RuID8gU2VydmVyLmNkbiA6IFNlcnZlci51cmx9JHtwYXRofWAsIHtcbiAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzLFxuICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgY3JlZGVudGlhbHM6IFwiaW5jbHVkZVwiLFxuICAgICAgICAgIGJvZHk6IGZvcm0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHBhcnNlZCA9IGF3YWl0IHRoaXMucGFyc2UocmVzLCByZXNlbnQsICgpID0+XG4gICAgICAgICAgdGhpcy5maWxlKHBhdGgsIGZvcm0sIHRydWUpXG4gICAgICAgICk7XG5cbiAgICAgICAgcmVzb2x2ZShwYXJzZWQpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zdCBwYXJzZWQgPSBhd2FpdCB0aGlzLnBhcnNlKG51bGwsIHJlc2VudCwgKCkgPT5cbiAgICAgICAgICB0aGlzLmZpbGUocGF0aCwgZm9ybSwgdHJ1ZSlcbiAgICAgICAgKTtcbiAgICAgICAgcmVzb2x2ZShwYXJzZWQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGFzeW5jIHBhcnNlKFxuICAgIHJhdzogUmVzcG9uc2UsXG4gICAgcmVzZW50OiBib29sZWFuLFxuICAgIHJlc2VuZDogKCkgPT4gUHJvbWlzZTxSZXM+XG4gICk6IFByb21pc2U8YW55PiB7XG4gICAgaWYgKHJhdyA9PT0gbnVsbCkgcmV0dXJuIGF3YWl0IEVycm9yLnBhcnNlKG51bGwpO1xuICAgIGNvbnN0IHJlczogYW55ID0ge307XG5cbiAgICByZXMuYm9keSA9IGF3YWl0IHJhdy5qc29uKCk7XG4gICAgcmVzLnJlc2VudCA9IHJlc2VudDtcbiAgICByZXMucmVzZW5kID0gcmVzZW5kO1xuICAgIHJlcy5zdGF0dXMgPSByYXcuc3RhdHVzO1xuICAgIHJlcy5zdWNjZXNzID0gcmF3LnN0YXR1cyA+PSAyMDAgJiYgcmF3LnN0YXR1cyA8IDMwMDtcblxuICAgIHJldHVybiBhd2FpdCBFcnJvci5wYXJzZShyZXMgYXMgUmVzKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgRXJyb3Ige1xuICBzdGF0aWMgaGFuZGxlKHJlczogUmVzKSB7XG4gICAgaWYgKHJlcy5lcnJvcikgcmV0dXJuIFRvYXN0LmVycm9yKHJlcy5lcnJvcik7XG4gICAgVG9hc3QuZXJyb3IoXCJTb21ldGhpbmcgdW5leHBlY3RlZCBoYXBwZW5lZCFcIik7XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgcGFyc2UocmVzOiBSZXMpIHtcbiAgICBpZiAocmVzID09PSBudWxsKSB7XG4gICAgICBpZiAoU2VydmVyLmlzT25saW5lKSBTZXJ2ZXIubm90aWZ5T2ZmbGluZSgpO1xuICAgICAgcmV0dXJuIHRoaXMubWFpbnRlbmFuY2UoKTtcbiAgICB9XG5cbiAgICBpZiAoIVNlcnZlci5pc09ubGluZSkgU2VydmVyLm5vdGlmeU9ubGluZSgpO1xuICAgIGlmIChyZXMuc3VjY2VzcykgcmV0dXJuIHJlcztcbiAgICBzd2l0Y2ggKHJlcy5ib2R5LmVycm9yKSB7XG4gICAgICBjYXNlIFwiVkFMSURBVElPTl9FUlJPUlwiOlxuICAgICAgICByZXR1cm4gdGhpcy5lcnJvcihyZXMuYm9keS5tZXNzYWdlIHx8IFwiVmFsaWRhdGlvbiBFcnJvclwiKTtcbiAgICAgIGNhc2UgXCJFTUFJTF9OT1RfQVZBSUxBQkxFXCI6XG4gICAgICAgIHJldHVybiB0aGlzLmVycm9yKFwiVGhpcyBlbWFpbCBpcyBhbHJlYWR5IGluIHVzZVwiKTtcbiAgICAgIGNhc2UgXCJVU0VSTkFNRV9OT1RfQVZBSUxBQkxFXCI6XG4gICAgICAgIHJldHVybiB0aGlzLmVycm9yKFwiVGhpcyB1c2VybmFtZSBpcyBhbHJlYWR5IGluIHVzZVwiKTtcbiAgICAgIGNhc2UgXCJXUk9OR19FTUFJTF9PUl9QQVNTV09SRFwiOlxuICAgICAgICByZXR1cm4gdGhpcy5lcnJvcihcIldyb25nIGVtYWlsIG9yIHBhc3N3b3JkXCIpO1xuICAgICAgY2FzZSBcIkVNQUlMX05PVF9GT1VORFwiOlxuICAgICAgICByZXR1cm4gdGhpcy5lcnJvcihcIlRoaXMgZW1haWwgZG9lc24ndCBleGlzdFwiKTtcbiAgICAgIGNhc2UgXCJXUk9OR19UT0tFTlwiOlxuICAgICAgICByZXR1cm4gdGhpcy5lcnJvcihcIlRoaXMgbGluayBpcyBpbnZhbGlkXCIpO1xuICAgICAgY2FzZSBcIlRPS0VOX0VYUElSRURcIjpcbiAgICAgICAgcmV0dXJuIHRoaXMuZXJyb3IoXCJUaGlzIGxpbmsgaXMgYWxyZWFkeSBleHBpcmVkXCIpO1xuICAgICAgY2FzZSBcIlJBVEVfTElNSVRfRVhDRUVERURcIjpcbiAgICAgICAgcmV0dXJuIHRoaXMuZXJyb3IoXCJDYWxtIERvd24hIFJhdGUgTGltaXQgZXhjZWVkZWRcIik7XG4gICAgICBjYXNlIFwiUE9TVF9OT1RfRk9VTkRcIjpcbiAgICAgICAgcmV0dXJuIHRoaXMuZXJyb3IoXCJQb3N0IG5vdCBmb3VuZFwiKTtcbiAgICAgIGNhc2UgXCJBQ0NFU1NfRk9SQklEREVOXCI6XG4gICAgICAgIHJldHVybiB0aGlzLmVycm9yKFwiQWNjZXNzIGZvcmJpZGRlblwiKTtcbiAgICAgIGNhc2UgXCJOT19GSUxFX1NQRUNJRklFRFwiOlxuICAgICAgICByZXR1cm4gdGhpcy5lcnJvcihcIk5vIGZpbGUgc3BlY2lmaWVkXCIpO1xuICAgICAgY2FzZSBcIlBST0NFU1NfSU1BR0VfRVJST1JcIjpcbiAgICAgICAgcmV0dXJuIHRoaXMuZXJyb3IoXCJFcnJvciBwcm9jZXNzaW5nIEltYWdlXCIpO1xuICAgICAgY2FzZSBcIlVQREFURV9NSVNTSU5HXCI6XG4gICAgICAgIHJldHVybiB0aGlzLmVycm9yKFwiTm8gVXBkYXRlIHNwZWNpZmllZFwiKTtcbiAgICAgIGNhc2UgXCJVU0VSX05PVF9GT1VORFwiOlxuICAgICAgICByZXR1cm4gVXNlci5sb2dvdXQoKTtcbiAgICAgIGNhc2UgXCJJTlZBTElEX1JFRlJFU0hfVE9LRU5cIjpcbiAgICAgICAgcmV0dXJuIFVzZXIubG9nb3V0KCk7XG4gICAgICBjYXNlIFwiQUNDRVNTX1RPS0VOX0lOVkFMSURcIjpcbiAgICAgICAgaWYgKHJlcy5yZXNlbnQpIHJldHVybiBVc2VyLmxvZ291dCgpO1xuICAgICAgICBjb25zdCByZWZyZXNoID0gYXdhaXQgVXNlci5yZWZyZXNoKCk7XG4gICAgICAgIGlmICghcmVmcmVzaC5zdWNjZXNzKSByZXR1cm4gcmVzO1xuICAgICAgICBjb25zdCByZXNlbnQgPSBhd2FpdCB0aGlzLnBhcnNlKGF3YWl0IHJlcy5yZXNlbmQoKSk7XG4gICAgICAgIHJldHVybiByZXNlbnQ7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gdGhpcy5lcnJvcihcIlNvbWV0aGluZyB1bmV4cGVjdGVkIGhhcHBlbmVkXCIpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBzdWNjZXNzKCkge1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfTtcbiAgfVxuXG4gIHN0YXRpYyBlcnJvcihtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IG1lc3NhZ2UgfTtcbiAgfVxuXG4gIHN0YXRpYyBtYWludGVuYW5jZSgpIHtcbiAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgcmVkaXJlY3Q6IFwiL21haW50ZW5hbmNlXCIsIG9mZmxpbmU6IHRydWUgfTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBUEk7XG4iLCJlbnVtIERldmljZVR5cGUge1xuICBGaXJlZm94RXh0ZW5zaW9uLFxuICBPcGVyYUV4dGVuc2lvbixcbiAgRWRnZUV4dGVuc2lvbixcbiAgVml2YWxkaUV4dGVuc2lvbixcbiAgQ2hyb21lRXh0ZW5zaW9uLFxuICBTYWZhcmlFeHRlbnNpb24sXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcCB7XG4gIHN0YXRpYyBkZXZpY2VDYWNoZTogRGV2aWNlVHlwZSA9IG51bGw7XG5cbiAgc3RhdGljIGlzRGV2KCkge1xuICAgIHJldHVybiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJkZXZlbG9wbWVudFwiO1xuICB9XG5cbiAgc3RhdGljIGdldCB3ZWJVcmwoKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5pc0RldigpKSByZXR1cm4gXCJodHRwOi8vbG9jYWxob3N0OjMwMDAvXCI7XG4gICAgcmV0dXJuIFwiaHR0cHM6Ly93d3cuZ2V0cmVtYXJrLmNvbS9cIjtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgd2ViSG9zdCgpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLmlzRGV2KCkpIHJldHVybiBcIio6Ly9sb2NhbGhvc3Q6LypcIjtcbiAgICByZXR1cm4gXCIqOi8vKi5nZXRyZW1hcmsuY29tLypcIjtcbiAgfVxuXG4gIHN0YXRpYyBpc0luamVjdGVkKCkge1xuICAgIHJldHVybiBjaHJvbWUudGFicyA9PT0gdW5kZWZpbmVkICYmIGRvY3VtZW50LmJvZHkgIT09IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHN0YXRpYyBpc1BvcHVwKCkge1xuICAgIHJldHVybiBjaHJvbWUudGFicyAhPT0gdW5kZWZpbmVkICYmIGRvY3VtZW50LmJvZHkgIT09IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHN0YXRpYyBnZXREZXZpY2UoKTogRGV2aWNlVHlwZSB7XG4gICAgaWYgKHRoaXMuZGV2aWNlQ2FjaGUpIHJldHVybiB0aGlzLmRldmljZUNhY2hlO1xuXG4gICAgaWYgKFxuICAgICAgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiIEZpcmVmb3gvXCIpICE9PSAtMSB8fFxuICAgICAgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiIEdlY2tvL1wiKSAhPT0gLTFcbiAgICApIHtcbiAgICAgIHRoaXMuZGV2aWNlQ2FjaGUgPSBEZXZpY2VUeXBlLkZpcmVmb3hFeHRlbnNpb247XG4gICAgfSBlbHNlIGlmIChcbiAgICAgICEhKHdpbmRvdyBhcyBhbnkpLm9wciB8fFxuICAgICAgISEod2luZG93IGFzIGFueSkub3BlcmEgfHxcbiAgICAgIG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIiBPUFIvXCIpID49IDBcbiAgICApIHtcbiAgICAgIHRoaXMuZGV2aWNlQ2FjaGUgPSBEZXZpY2VUeXBlLk9wZXJhRXh0ZW5zaW9uO1xuICAgIH0gZWxzZSBpZiAobmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiIEVkZy9cIikgIT09IC0xKSB7XG4gICAgICB0aGlzLmRldmljZUNhY2hlID0gRGV2aWNlVHlwZS5FZGdlRXh0ZW5zaW9uO1xuICAgIH0gZWxzZSBpZiAobmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiIFZpdmFsZGkvXCIpICE9PSAtMSkge1xuICAgICAgdGhpcy5kZXZpY2VDYWNoZSA9IERldmljZVR5cGUuVml2YWxkaUV4dGVuc2lvbjtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgKHdpbmRvdyBhcyBhbnkpLmNocm9tZSAmJlxuICAgICAgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiIENocm9tZS9cIikgIT09IC0xXG4gICAgKSB7XG4gICAgICB0aGlzLmRldmljZUNhY2hlID0gRGV2aWNlVHlwZS5DaHJvbWVFeHRlbnNpb247XG4gICAgfSBlbHNlIGlmIChuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCIgU2FmYXJpL1wiKSAhPT0gLTEpIHtcbiAgICAgIHRoaXMuZGV2aWNlQ2FjaGUgPSBEZXZpY2VUeXBlLlNhZmFyaUV4dGVuc2lvbjtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5kZXZpY2VDYWNoZTtcbiAgfVxuXG4gIHN0YXRpYyBpc0ZpcmVmb3goKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0RGV2aWNlKCkgPT09IERldmljZVR5cGUuRmlyZWZveEV4dGVuc2lvbjtcbiAgfVxuXG4gIHN0YXRpYyBpc0Nocm9tZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5nZXREZXZpY2UoKSA9PT0gRGV2aWNlVHlwZS5DaHJvbWVFeHRlbnNpb247XG4gIH1cblxuICBzdGF0aWMgaXNFZGdlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmdldERldmljZSgpID09PSBEZXZpY2VUeXBlLkVkZ2VFeHRlbnNpb247XG4gIH1cblxuICBzdGF0aWMgaXNPcGVyYSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5nZXREZXZpY2UoKSA9PT0gRGV2aWNlVHlwZS5PcGVyYUV4dGVuc2lvbjtcbiAgfVxuXG4gIHN0YXRpYyBpc1ZpdmFsZGkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0RGV2aWNlKCkgPT09IERldmljZVR5cGUuVml2YWxkaUV4dGVuc2lvbjtcbiAgfVxuXG4gIHN0YXRpYyBpc1NhZmFyaSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5nZXREZXZpY2UoKSA9PT0gRGV2aWNlVHlwZS5TYWZhcmlFeHRlbnNpb247XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIGhpZGVTbmFja2JhcixcbiAgSUJ1dHRvbixcbiAgcmVtb3ZlTW9kYWwsXG4gIHNob3dNb2RhbCxcbiAgc2hvd1NuYWNrYmFyLFxufSBmcm9tIFwiQGJyb3dzZXIvYWN0aW9ucy9kaWFsb2dcIjtcblxuaW1wb3J0IFJlZ2lzdHJ5IGZyb20gXCJAYnJvd3Nlci9zdGF0ZS9yZWdpc3RyeVwiO1xuXG5leHBvcnQgdHlwZSBsZXZlbCA9IFwiU1VDQ0VTU1wiIHwgXCJFUlJPUlwiO1xuXG5jbGFzcyBJRCB7XG4gIHN0YXRpYyBnZW5lcmF0ZSgpIHtcbiAgICByZXR1cm4gTWF0aC5yYW5kb20oKS50b1N0cmluZygxNik7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFNuYWNrYmFyIHtcbiAgc3RhdGljIHN1Y2Nlc3ModGV4dDogc3RyaW5nKSB7XG4gICAgY29uc3QgaWQgPSBJRC5nZW5lcmF0ZSgpO1xuICAgIFJlZ2lzdHJ5LnN0b3JlLmRpc3BhdGNoKFxuICAgICAgc2hvd1NuYWNrYmFyKHtcbiAgICAgICAgaWQsXG4gICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgIHR5cGU6IFwiU05BQ0tCQVJcIixcbiAgICAgICAgbGV2ZWw6IFwiU1VDQ0VTU1wiLFxuICAgICAgfSkgYXMgYW55XG4gICAgKTtcbiAgICByZXR1cm4gaWQ7XG4gIH1cblxuICBzdGF0aWMgZXJyb3IodGV4dDogc3RyaW5nKSB7XG4gICAgY29uc3QgaWQgPSBJRC5nZW5lcmF0ZSgpO1xuICAgIFJlZ2lzdHJ5LnN0b3JlLmRpc3BhdGNoKFxuICAgICAgc2hvd1NuYWNrYmFyKHtcbiAgICAgICAgaWQsXG4gICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgIHR5cGU6IFwiU05BQ0tCQVJcIixcbiAgICAgICAgbGV2ZWw6IFwiRVJST1JcIixcbiAgICAgIH0pIGFzIGFueVxuICAgICk7XG4gICAgcmV0dXJuIGlkO1xuICB9XG5cbiAgc3RhdGljIGhpZGUoaWQ6IHN0cmluZykge1xuICAgIFJlZ2lzdHJ5LnN0b3JlLmRpc3BhdGNoKGhpZGVTbmFja2JhcihpZCkgYXMgYW55KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgVG9hc3Qge1xuICBzdGF0aWMgc3VjY2Vzcyh0ZXh0OiBzdHJpbmcpIHtcbiAgICBjb25zdCBpZCA9IElELmdlbmVyYXRlKCk7XG4gICAgUmVnaXN0cnkuc3RvcmUuZGlzcGF0Y2goXG4gICAgICBzaG93U25hY2tiYXIoe1xuICAgICAgICBpZCxcbiAgICAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgdHlwZTogXCJUT0FTVFwiLFxuICAgICAgICBsZXZlbDogXCJTVUNDRVNTXCIsXG4gICAgICB9KSBhcyBhbnlcbiAgICApO1xuICAgIHJldHVybiBpZDtcbiAgfVxuXG4gIHN0YXRpYyBlcnJvcih0ZXh0OiBzdHJpbmcpIHtcbiAgICBjb25zdCBpZCA9IElELmdlbmVyYXRlKCk7XG4gICAgUmVnaXN0cnkuc3RvcmUuZGlzcGF0Y2goXG4gICAgICBzaG93U25hY2tiYXIoe1xuICAgICAgICBpZCxcbiAgICAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgdHlwZTogXCJUT0FTVFwiLFxuICAgICAgICBsZXZlbDogXCJFUlJPUlwiLFxuICAgICAgfSkgYXMgYW55XG4gICAgKTtcbiAgICByZXR1cm4gaWQ7XG4gIH1cblxuICBzdGF0aWMgaGlkZShpZDogc3RyaW5nKSB7XG4gICAgUmVnaXN0cnkuc3RvcmUuZGlzcGF0Y2goaGlkZVNuYWNrYmFyKGlkKSBhcyBhbnkpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBNb2RhbCB7XG4gIHN0YXRpYyBzaG93KHRpdGxlOiBzdHJpbmcsIHRleHQ6IHN0cmluZywgYnV0dG9uczogSUJ1dHRvbltdKSB7XG4gICAgY29uc3QgaWQgPSBJRC5nZW5lcmF0ZSgpO1xuICAgIFJlZ2lzdHJ5LnN0b3JlLmRpc3BhdGNoKFxuICAgICAgc2hvd01vZGFsKHtcbiAgICAgICAgaWQsXG4gICAgICAgIHRpdGxlOiB0aXRsZSxcbiAgICAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgYnV0dG9uczogYnV0dG9ucyxcbiAgICAgIH0pIGFzIGFueVxuICAgICk7XG4gICAgcmV0dXJuIGlkO1xuICB9XG5cbiAgc3RhdGljIHJlbW92ZShpZDogc3RyaW5nKSB7XG4gICAgUmVnaXN0cnkuc3RvcmUuZGlzcGF0Y2gocmVtb3ZlTW9kYWwoaWQpIGFzIGFueSk7XG4gIH1cbn1cbiIsImludGVyZmFjZSBJU3RvcmFnZU9iamVjdCB7XG4gIFtrZXk6IHN0cmluZ106IHN0cmluZztcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RvcmFnZSB7XG4gIHN0YXRpYyB0b09iamVjdChrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IElTdG9yYWdlT2JqZWN0IHtcbiAgICBjb25zdCBvYmogPSB7fTtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICBzdGF0aWMgc2V0KGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMpID0+IHtcbiAgICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh0aGlzLnRvT2JqZWN0KGtleSwgdmFsdWUpLCAoKSA9PiByZXMoKSk7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgZ2V0KGtleTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmcgfCB1bmRlZmluZWQ+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcykgPT4ge1xuICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KGtleSwgKGRhdGE6IElTdG9yYWdlT2JqZWN0KSA9PiB7XG4gICAgICAgIGlmICghZGF0YSB8fCAhZGF0YVtrZXldKSByZXModW5kZWZpbmVkKTtcbiAgICAgICAgcmVzKGRhdGFba2V5XSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBzZXRTeW5jZWQoa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcykgPT4ge1xuICAgICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5zZXQodGhpcy50b09iamVjdChrZXksIHZhbHVlKSwgKCkgPT4gcmVzKCkpO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGdldFN5bmMoa2V5OiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxzdHJpbmc+KChyZXMpID0+IHtcbiAgICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KGtleSwgKGRhdGE6IElTdG9yYWdlT2JqZWN0KSA9PiB7XG4gICAgICAgIGlmICghZGF0YSB8fCAhZGF0YVtrZXldKSByZXModW5kZWZpbmVkKTtcbiAgICAgICAgcmVzKGRhdGFba2V5XSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IEFwcCBmcm9tIFwiQGJyb3dzZXIvdXRpbC9hcHBcIjtcbmltcG9ydCB7IEV2ZW50TGlzdGVuZXIgfSBmcm9tIFwiQGJyb3dzZXIvdXRpbC9ldmVudHNcIjtcbnR5cGUgSVRhYiA9IGNocm9tZS50YWJzLlRhYjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFiIHtcbiAgc3RhdGljIGV2ZW50czogRXZlbnRMaXN0ZW5lcltdID0gW107XG5cbiAgc3RhdGljIGxpc3RlbihsaXN0ZW5lcjogRXZlbnRMaXN0ZW5lcikge1xuICAgIHRoaXMuZXZlbnRzLnB1c2gobGlzdGVuZXIpO1xuICB9XG5cbiAgc3RhdGljIGNhbGwoZGF0YTogYW55KSB7XG4gICAgdGhpcy5ldmVudHMuZm9yRWFjaCgoZnVuYykgPT4ge1xuICAgICAgZnVuYyhkYXRhKTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBjb3VudCgpOiBQcm9taXNlPG51bWJlcj4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzKSA9PiB7XG4gICAgICBjaHJvbWUudGFicy5xdWVyeSh7IHdpbmRvd1R5cGU6IFwibm9ybWFsXCIgfSwgKHRhYnMpID0+IHtcbiAgICAgICAgcmVzKHRhYnMubGVuZ3RoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGdldEN1cnJlbnQoKTogUHJvbWlzZTxJVGFiPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMpID0+IHtcbiAgICAgIGNocm9tZS50YWJzLnF1ZXJ5KHsgY3VycmVudFdpbmRvdzogdHJ1ZSwgYWN0aXZlOiB0cnVlIH0sICh0YWJzKSA9PiB7XG4gICAgICAgIHJlcyh0YWJzWzBdKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGdldEFsbCgpOiBQcm9taXNlPElUYWJbXT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzKSA9PiB7XG4gICAgICBjaHJvbWUudGFicy5xdWVyeSh7fSwgKHRhYnMpID0+IHtcbiAgICAgICAgcmVzKHRhYnMpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgZmluZCh1cmw6IHN0cmluZyk6IFByb21pc2U8SVRhYj4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzKSA9PiB7XG4gICAgICBjaHJvbWUudGFicy5xdWVyeSh7IHVybDogdXJsIH0sICh0YWJzKSA9PiB7XG4gICAgICAgIHJlcyh0YWJzWzBdKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIHJlbG9hZCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlcykgPT4ge1xuICAgICAgY29uc3QgdGFiID0gYXdhaXQgdGhpcy5nZXRDdXJyZW50KCk7XG4gICAgICBjaHJvbWUudGFicy5yZWxvYWQodGFiLmlkKTtcbiAgICAgIHJlcygpO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGNsb3NlKHVybDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXMpID0+IHtcbiAgICAgIGNvbnN0IGNvdW50ID0gYXdhaXQgdGhpcy5jb3VudCgpO1xuICAgICAgaWYgKGNvdW50IDw9IDEpIHJldHVybiByZXMobnVsbCk7XG4gICAgICBjb25zdCB0YWIgPSBhd2FpdCB0aGlzLmZpbmQodXJsKTtcbiAgICAgIGNocm9tZS50YWJzLnJlbW92ZSh0YWIuaWQpO1xuICAgICAgcmVzKCk7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgc2VuZCh0eXBlOiBzdHJpbmcsIGRhdGE6IGFueSA9IHt9KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXMpID0+IHtcbiAgICAgIGlmIChBcHAuaXNJbmplY3RlZCgpKSByZXR1cm4gdGhpcy5jYWxsKHsgLi4uZGF0YSwgdHlwZTogdHlwZSB9KTtcblxuICAgICAgY29uc3QgdGFiID0gYXdhaXQgVGFiLmdldEN1cnJlbnQoKTtcbiAgICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKHRhYi5pZCwgeyAuLi5kYXRhLCB0eXBlOiB0eXBlIH0pO1xuICAgICAgcmVzKCk7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgc2VuZEFsbCh0eXBlOiBzdHJpbmcsIGRhdGE6IGFueSA9IHt9KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXMpID0+IHtcbiAgICAgIGlmIChBcHAuaXNJbmplY3RlZCgpKSByZXR1cm4gdGhpcy5jYWxsKHsgLi4uZGF0YSwgdHlwZTogdHlwZSB9KTtcblxuICAgICAgY29uc3QgdGFicyA9IGF3YWl0IFRhYi5nZXRBbGwoKTtcbiAgICAgIHRhYnMuZm9yRWFjaCgodGFiKSA9PiB7XG4gICAgICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKHRhYi5pZCwgeyAuLi5kYXRhLCB0eXBlOiB0eXBlIH0pO1xuICAgICAgfSk7XG4gICAgICByZXMoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBvcGVuKHVybDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXMpID0+IHtcbiAgICAgIGNocm9tZS50YWJzLmNyZWF0ZSh7IHVybDogdXJsIH0pO1xuICAgICAgcmVzKCk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBBUEksIHsgRXJyb3IsIFJlcyB9IGZyb20gXCJAYnJvd3Nlci91dGlsL2FwaVwiO1xuaW1wb3J0IFN0b3JhZ2UgZnJvbSBcIi4vc3RvcmFnZVwiO1xuaW1wb3J0IFRhYiBmcm9tIFwiLi90YWJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlciB7XG4gIHN0YXRpYyBhY2Nlc3NUb2tlbkNhY2hlID0gXCJcIjtcbiAgc3RhdGljIHJlZnJlc2hUb2tlbkNhY2hlID0gXCJcIjtcblxuICBzdGF0aWMgYXN5bmMgYWNjZXNzVG9rZW4oKSB7XG4gICAgaWYgKHRoaXMuYWNjZXNzVG9rZW5DYWNoZSkgcmV0dXJuIHRoaXMuYWNjZXNzVG9rZW5DYWNoZTtcblxuICAgIHRoaXMuYWNjZXNzVG9rZW5DYWNoZSA9IGF3YWl0IFN0b3JhZ2UuZ2V0KFwiYWNjZXNzX3Rva2VuXCIpO1xuICAgIHJldHVybiB0aGlzLmFjY2Vzc1Rva2VuQ2FjaGU7XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgcmVmcmVzaFRva2VuKCkge1xuICAgIGlmICh0aGlzLnJlZnJlc2hUb2tlbkNhY2hlKSByZXR1cm4gdGhpcy5yZWZyZXNoVG9rZW5DYWNoZTtcblxuICAgIHRoaXMucmVmcmVzaFRva2VuQ2FjaGUgPSBhd2FpdCBTdG9yYWdlLmdldChcInJlZnJlc2hfdG9rZW5cIik7XG4gICAgcmV0dXJuIHRoaXMucmVmcmVzaFRva2VuQ2FjaGU7XG4gIH1cblxuICBzdGF0aWMgc2V0VG9rZW5zKHJlczogYW55KSB7XG4gICAgdGhpcy5hY2Nlc3NUb2tlbkNhY2hlID0gcmVzLmFjY2Vzc1Rva2VuO1xuICAgIHRoaXMucmVmcmVzaFRva2VuQ2FjaGUgPSByZXMucmVmcmVzaFRva2VuO1xuXG4gICAgU3RvcmFnZS5zZXQoXCJhY2Nlc3NfdG9rZW5cIiwgdGhpcy5hY2Nlc3NUb2tlbkNhY2hlKTtcbiAgICBTdG9yYWdlLnNldChcInJlZnJlc2hfdG9rZW5cIiwgdGhpcy5yZWZyZXNoVG9rZW5DYWNoZSk7XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgaXNBdXRoZW50aWNhdGVkKCkge1xuICAgIGNvbnN0IGFjY2Vzc1Rva2VuID0gYXdhaXQgdGhpcy5hY2Nlc3NUb2tlbigpO1xuICAgIGNvbnN0IGlzQXV0aGVudGljYXRlZCA9XG4gICAgICBhY2Nlc3NUb2tlbiAhPT0gXCJcIiAmJiBhY2Nlc3NUb2tlbiAhPT0gbnVsbCAmJiBhY2Nlc3NUb2tlbiAhPT0gdW5kZWZpbmVkO1xuXG4gICAgcmV0dXJuIHsgaXNBdXRoZW50aWNhdGVkOiBpc0F1dGhlbnRpY2F0ZWQgfTtcbiAgfVxuXG4gIHN0YXRpYyBhc3luYyByZWZyZXNoKCkge1xuICAgIGNvbnN0IHJlZnJlc2hUb2tlbiA9IGF3YWl0IHRoaXMucmVmcmVzaFRva2VuKCk7XG5cbiAgICBjb25zdCByZXMgPSBhd2FpdCBBUEkucG9zdChbXCJhdXRoXCIsIFwicmVmcmVzaFwiXSwge1xuICAgICAgcmVmcmVzaFRva2VuOiByZWZyZXNoVG9rZW4sXG4gICAgfSk7XG4gICAgaWYgKCFyZXMuc3VjY2VzcykgcmV0dXJuIHJlcztcblxuICAgIHRoaXMuc2V0VG9rZW5zKHJlcy5ib2R5KTtcbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgc3RhdGljIGFzeW5jIG1lKGZldGNoQXZhdGFyOiBib29sZWFuID0gZmFsc2UpOiBQcm9taXNlPFJlcz4ge1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IEFQSS5nZXQoW1widXNlclwiLCBcIm1lXCJdKTtcbiAgICBpZiAoIXJlcy5zdWNjZXNzIHx8ICFmZXRjaEF2YXRhcikgcmV0dXJuIHJlcztcblxuICAgIGNvbnN0IGF2YXRhciA9IGF3YWl0IHRoaXMuaGFzQXZhdGFyKHJlcy5ib2R5LmlkKTtcbiAgICByZXR1cm4geyAuLi5yZXMsIGJvZHk6IHsgLi4ucmVzLmJvZHksIGF2YXRhcjogYXZhdGFyIH0gfTtcbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBoYXNBdmF0YXIoaWQ6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IEFQSS5nZXQoW1xuICAgICAgXCJDRE5cIixcbiAgICAgIFwiZXhpc3RzXCIsXG4gICAgICBcImF2YXRhclwiLFxuICAgICAgXCI1MHg1MFwiLFxuICAgICAgYCR7aWR9LmpwZ2AsXG4gICAgXSk7XG5cbiAgICBpZiAoIXJlcy5zdWNjZXNzKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIHJlcy5ib2R5LmV4aXN0cztcbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBsb2dvdXQobWFudWFsOiBib29sZWFuID0gZmFsc2UsIGJhY2tncm91bmQ6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIHRoaXMucmVmcmVzaFRva2VuQ2FjaGUgPSBcIlwiO1xuICAgIHRoaXMuYWNjZXNzVG9rZW5DYWNoZSA9IFwiXCI7XG4gICAgaWYgKGJhY2tncm91bmQpIHJldHVybjtcblxuICAgIGF3YWl0IFN0b3JhZ2Uuc2V0KFwiYWNjZXNzX3Rva2VuXCIsIFwiXCIpO1xuICAgIGF3YWl0IFN0b3JhZ2Uuc2V0KFwicmVmcmVzaF90b2tlblwiLCBcIlwiKTtcblxuICAgIGlmIChtYW51YWwpIFRhYi5zZW5kKFwidG9hc3Q6c3VjY2Vzc1wiLCB7IHRleHQ6IFwiU2lnbmVkIE91dCFcIiB9KTtcbiAgICBUYWIuc2VuZEFsbChcImF1dGg6dXBkYXRlXCIpO1xuXG4gICAgaWYgKGNocm9tZS5ydW50aW1lKSBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZShcIkxPR09VVFwiKTtcblxuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBsb2dvdXQ6IHRydWUgfTtcbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBmb3Jnb3QoZGF0YTogYW55KSB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgQVBJLnBvc3QoW1wiYXV0aFwiLCBcImZvcmdvdFwiXSwge1xuICAgICAgZW1haWw6IGRhdGEuZW1haWwsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgc3RhdGljIGFzeW5jIHJlc2V0KGRhdGE6IGFueSkge1xuICAgIGlmIChkYXRhLnBhc3N3b3JkICE9PSBkYXRhLmNvbmZpcm0pXG4gICAgICByZXR1cm4gRXJyb3IuZXJyb3IoXCJQYXNzd29yZHMgZG8gbm90IG1hdGNoXCIpO1xuXG4gICAgY29uc3QgcmVzID0gYXdhaXQgQVBJLnBvc3QoW1wiYXV0aFwiLCBcInJlc2V0XCJdLCB7XG4gICAgICB0b2tlbjogZGF0YS50b2tlbixcbiAgICAgIHBhc3N3b3JkOiBkYXRhLnBhc3N3b3JkLFxuICAgIH0pO1xuXG4gICAgaWYgKCFyZXMuc3VjY2VzcykgcmV0dXJuIHJlcztcblxuICAgIFRhYi5zZW5kKFwidG9hc3Q6c3VjY2Vzc1wiLCB7IHRleHQ6IFwiQXV0aGVudGljYXRlZCFcIiB9KTtcbiAgICBUYWIuc2VuZEFsbChcImF1dGg6dXBkYXRlXCIpO1xuXG4gICAgdGhpcy5zZXRUb2tlbnMocmVzLmJvZHkpO1xuICAgIHJldHVybiByZXM7XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgdXBkYXRlKGRhdGE6IGFueSkge1xuICAgIGNvbnN0IHJlczogUmVzW10gPSBbXTtcblxuICAgIGlmIChkYXRhLmNoYW5nZWQuaW5jbHVkZXMoXCJBVkFUQVJcIikpIHtcbiAgICAgIGNvbnN0IGF2YXRhciA9IGF3YWl0IHRoaXMudXBsb2FkKGRhdGEuYXZhdGFyKTtcbiAgICAgIHJlcy5wdXNoKGF2YXRhcik7XG4gICAgfVxuXG4gICAgY29uc3QgY2hhbmdlczogYW55ID0ge307XG4gICAgaWYgKGRhdGEuY2hhbmdlZC5pbmNsdWRlcyhcIlVTRVJOQU1FXCIpKSBjaGFuZ2VzLnVzZXJuYW1lID0gZGF0YS51c2VybmFtZTtcbiAgICBpZiAoZGF0YS5jaGFuZ2VkLmluY2x1ZGVzKFwiRU1BSUxcIikpIGNoYW5nZXMuZW1haWwgPSBkYXRhLmVtYWlsO1xuXG4gICAgaWYgKE9iamVjdC5rZXlzKGNoYW5nZXMpLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IHVwZGF0ZSA9IGF3YWl0IEFQSS5wb3N0KFtcInVzZXJcIiwgXCJ1cGRhdGVcIl0sIGNoYW5nZXMpO1xuICAgICAgcmVzLnB1c2godXBkYXRlKTtcbiAgICB9XG5cbiAgICBjb25zdCBlcnJvciA9IHJlcy5maW5kKChyKSA9PiAhci5zdWNjZXNzKTtcbiAgICBpZiAoZXJyb3IpIHJldHVybiBlcnJvcjtcbiAgICByZXR1cm4gcmVzWzBdO1xuICB9XG5cbiAgc3RhdGljIGFzeW5jIHVwbG9hZChhdmF0YXI6IGFueSkge1xuICAgIGNvbnN0IGFyciA9IGF2YXRhci5zcGxpdChcIixcIik7XG4gICAgY29uc3QgbWltZSA9IGFyclswXS5tYXRjaCgvOiguKj8pOy8pWzFdO1xuICAgIGNvbnN0IGJzdHIgPSBhdG9iKGFyclsxXSk7XG4gICAgbGV0IG4gPSBic3RyLmxlbmd0aDtcbiAgICBjb25zdCB1OGFyciA9IG5ldyBVaW50OEFycmF5KG4pO1xuXG4gICAgd2hpbGUgKG4tLSkge1xuICAgICAgdThhcnJbbl0gPSBic3RyLmNoYXJDb2RlQXQobik7XG4gICAgfVxuXG4gICAgY29uc3QgZmlsZSA9IG5ldyBGaWxlKFt1OGFycl0sIFwiaW1hZ2UuanBnXCIsIHsgdHlwZTogbWltZSB9KTtcblxuICAgIGNvbnN0IGZvcm0gPSBuZXcgRm9ybURhdGEoKTtcbiAgICBmb3JtLmFwcGVuZChcImltYWdlXCIsIGZpbGUpO1xuXG4gICAgY29uc3QgcmVzID0gYXdhaXQgQVBJLmZpbGUoW1wiQ0ROXCIsIFwidXBsb2FkXCIsIFwiYXZhdGFyXCJdLCBmb3JtKTtcbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgc3RhdGljIGFzeW5jIGxvZ2luKGRhdGE6IGFueSkge1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IEFQSS5wb3N0KFtcImF1dGhcIiwgXCJsb2dpblwiXSwge1xuICAgICAgZW1haWw6IGRhdGEuZW1haWwsXG4gICAgICBwYXNzd29yZDogZGF0YS5wYXNzd29yZCxcbiAgICB9KTtcblxuICAgIGlmICghcmVzLnN1Y2Nlc3MpIHJldHVybiByZXM7XG5cbiAgICBUYWIuc2VuZChcInRvYXN0OnN1Y2Nlc3NcIiwgeyB0ZXh0OiBcIkF1dGhlbnRpY2F0ZWQhXCIgfSk7XG4gICAgVGFiLnNlbmRBbGwoXCJhdXRoOnVwZGF0ZVwiKTtcblxuICAgIHRoaXMuc2V0VG9rZW5zKHJlcy5ib2R5KTtcbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgc3RhdGljIGFzeW5jIHJlZ2lzdGVyKGRhdGE6IGFueSkge1xuICAgIGlmIChkYXRhLnBhc3N3b3JkICE9PSBkYXRhLmNvbmZpcm0pXG4gICAgICByZXR1cm4gRXJyb3IuZXJyb3IoXCJQYXNzd29yZHMgZG8gbm90IG1hdGNoXCIpO1xuXG4gICAgY29uc3QgcmVzID0gYXdhaXQgQVBJLnBvc3QoW1wiYXV0aFwiLCBcInJlZ2lzdGVyXCJdLCB7XG4gICAgICB1c2VybmFtZTogZGF0YS51c2VybmFtZSxcbiAgICAgIGVtYWlsOiBkYXRhLmVtYWlsLFxuICAgICAgcGFzc3dvcmQ6IGRhdGEucGFzc3dvcmQsXG4gICAgfSk7XG5cbiAgICBpZiAoIXJlcy5zdWNjZXNzKSByZXR1cm4gcmVzO1xuXG4gICAgVGFiLnNlbmQoXCJ0b2FzdDpzdWNjZXNzXCIsIHsgdGV4dDogXCJBdXRoZW50aWNhdGVkIVwiIH0pO1xuICAgIFRhYi5zZW5kKFwiYXV0aDp1cGRhdGVcIik7XG5cbiAgICB0aGlzLnNldFRva2VucyhyZXMuYm9keSk7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxufVxuIiwiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcclxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19jcmVhdGVCaW5kaW5nID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9KTtcclxufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBvW2syXSA9IG1ba107XHJcbn0pO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBvKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIHApKSBfX2NyZWF0ZUJpbmRpbmcobywgbSwgcCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheXMoKSB7XHJcbiAgICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcclxuICAgIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcclxuICAgICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcclxuICAgICAgICAgICAgcltrXSA9IGFbal07XHJcbiAgICByZXR1cm4gcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXkodG8sIGZyb20sIHBhY2spIHtcclxuICAgIGlmIChwYWNrIHx8IGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIGZvciAodmFyIGkgPSAwLCBsID0gZnJvbS5sZW5ndGgsIGFyOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGFyIHx8ICEoaSBpbiBmcm9tKSkge1xyXG4gICAgICAgICAgICBpZiAoIWFyKSBhciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20sIDAsIGkpO1xyXG4gICAgICAgICAgICBhcltpXSA9IGZyb21baV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRvLmNvbmNhdChhciB8fCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tKSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcclxufSkgOiBmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcclxuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHN0YXRlLCBraW5kLCBmKSB7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBnZXR0ZXJcIik7XHJcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCByZWFkIHByaXZhdGUgbWVtYmVyIGZyb20gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcclxuICAgIHJldHVybiBraW5kID09PSBcIm1cIiA/IGYgOiBraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlcikgOiBmID8gZi52YWx1ZSA6IHN0YXRlLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBzdGF0ZSwgdmFsdWUsIGtpbmQsIGYpIHtcclxuICAgIGlmIChraW5kID09PSBcIm1cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgbWV0aG9kIGlzIG5vdCB3cml0YWJsZVwiKTtcclxuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIHNldHRlclwiKTtcclxuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHdyaXRlIHByaXZhdGUgbWVtYmVyIHRvIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XHJcbiAgICByZXR1cm4gKGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyLCB2YWx1ZSkgOiBmID8gZi52YWx1ZSA9IHZhbHVlIDogc3RhdGUuc2V0KHJlY2VpdmVyLCB2YWx1ZSkpLCB2YWx1ZTtcclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBBcHAgZnJvbSBcIkBicm93c2VyL3V0aWwvYXBwXCI7XG5pbXBvcnQgVGFiIGZyb20gXCJAYnJvd3Nlci91dGlsL3RhYlwiO1xuaW1wb3J0IFVzZXIgZnJvbSBcIkBicm93c2VyL3V0aWwvdXNlclwiO1xuXG5pZiAoQXBwLmlzRGV2KCkpIHJlcXVpcmUoXCJjcngtaG90cmVsb2FkXCIpO1xuXG5jaHJvbWUucnVudGltZS5zZXRVbmluc3RhbGxVUkwoYCR7QXBwLndlYlVybH11bmluc3RhbGxgKTtcblxuY2hyb21lLnJ1bnRpbWUub25JbnN0YWxsZWQuYWRkTGlzdGVuZXIoKGRldGFpbHMpID0+IHtcbiAgaWYgKEFwcC5pc0RldigpKSByZXR1cm47XG5cbiAgaWYgKGRldGFpbHMucmVhc29uID09IFwiaW5zdGFsbFwiKVxuICAgIGNocm9tZS50YWJzLmNyZWF0ZSh7IHVybDogYCR7QXBwLndlYlVybH1hdXRoL3NpZ251cGAgfSk7XG59KTtcblxuY2hyb21lLnJ1bnRpbWUub25VcGRhdGVBdmFpbGFibGUuYWRkTGlzdGVuZXIoKCkgPT4ge1xuICBjaHJvbWUucnVudGltZS5yZWxvYWQoKTtcbn0pO1xuXG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKHJlcSwgXywgcmVzKSA9PiB7XG4gIGlmIChyZXEucGFzc2VkKSBoYW5kbGVFeHRlcm5hbFJlcXVlc3QocmVxLCByZXMpO1xuICBlbHNlIGhhbmRsZUludGVybmFsUmVxdWVzdChyZXEsIHJlcyk7XG4gIHJldHVybiB0cnVlO1xufSk7XG5cbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZUV4dGVybmFsLmFkZExpc3RlbmVyKChyZXEsIF8sIHJlcykgPT4ge1xuICBoYW5kbGVFeHRlcm5hbFJlcXVlc3QocmVxLCByZXMpO1xuICByZXR1cm4gdHJ1ZTtcbn0pO1xuXG5hc3luYyBmdW5jdGlvbiBoYW5kbGVFeHRlcm5hbFJlcXVlc3QocmVxOiBhbnksIHJlczogKGRhdGE6IGFueSkgPT4gdm9pZCkge1xuICBpZiAoIXJlcS50eXBlKSByZXMoeyBzdWNjZXNzOiBmYWxzZSB9KTtcbiAgc3dpdGNoIChyZXEudHlwZSkge1xuICAgIGNhc2UgXCJQSU5HXCI6XG4gICAgICByZXMoeyBzdWNjZXNzOiB0cnVlIH0pO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIkFVVEhFTlRJQ0FURURcIjpcbiAgICAgIHJlcyhhd2FpdCBVc2VyLmlzQXV0aGVudGljYXRlZCgpKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJSRUdJU1RFUlwiOlxuICAgICAgcmVzKGF3YWl0IFVzZXIucmVnaXN0ZXIocmVxKSk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiTE9HSU5cIjpcbiAgICAgIHJlcyhhd2FpdCBVc2VyLmxvZ2luKHJlcSkpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIkZPUkdPVFwiOlxuICAgICAgcmVzKGF3YWl0IFVzZXIuZm9yZ290KHJlcSkpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIlJFU0VUXCI6XG4gICAgICByZXMoYXdhaXQgVXNlci5yZXNldChyZXEpKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJVUERBVEVcIjpcbiAgICAgIHJlcyhhd2FpdCBVc2VyLnVwZGF0ZShyZXEpKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJNRVwiOlxuICAgICAgcmVzKGF3YWl0IFVzZXIubWUodHJ1ZSkpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIkNMT1NFXCI6XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBUYWIuY2xvc2UocmVxLnVybCk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IFRhYi5yZWxvYWQoKSwgMTAwMCk7XG4gICAgICByZXMoeyBzdWNjZXNzOiByZXN1bHQgIT09IG51bGwgfSk7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgcmVzKHsgc3VjY2VzczogZmFsc2UgfSk7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gaGFuZGxlSW50ZXJuYWxSZXF1ZXN0KHJlcTogYW55LCByZXM6IChkYXRhOiBhbnkpID0+IHZvaWQpIHtcbiAgc3dpdGNoIChyZXEpIHtcbiAgICBjYXNlIFwiTE9HT1VUXCI6XG4gICAgICByZXMoYXdhaXQgVXNlci5sb2dvdXQoZmFsc2UsIHRydWUpKTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXMoeyBzdWNjZXNzOiBmYWxzZSB9KTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9