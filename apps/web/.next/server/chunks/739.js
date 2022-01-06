"use strict";
exports.id = 739;
exports.ids = [739];
exports.modules = {

/***/ 4739:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "x": () => (/* binding */ Server),
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Server {
    static get url() {
        return  true ? this.devUrl : 0;
    }
    static get cdn() {
        return  true ? this.devCDN : 0;
    }
}
Server.devUrl = "http://localhost:5050/";
Server.prodUrl = "https://api.getremark.com/";
Server.devCDN = "http://localhost:5000/";
Server.prodCDN = "https://cdn.getremark.com/";
class API {
    static async get(path) {
        if (Array.isArray(path)) path = path.join("/");
        const headers = new Headers();
        headers.append("Accept", "application/json");
        headers.append("Content-Type", "application/json");
        try {
            const res = await fetch(Server.url + path, {
                headers: headers,
                method: "GET",
                credentials: "include"
            });
            return await this.parse(res);
        } catch (e) {
            console.error(e);
            return null;
        }
    }
    static async post(path1, data) {
        if (Array.isArray(path1)) path1 = path1.join("/");
        const headers = new Headers();
        headers.append("Accept", "application/json");
        headers.append("Content-Type", "application/json");
        try {
            const res = await fetch(Server.url + path1, {
                headers: headers,
                method: "POST",
                credentials: "include",
                body: typeof data === "object" ? JSON.stringify(data) : data
            });
            return await this.parse(res);
        } catch (e) {
            console.error(e);
            return null;
        }
    }
    static async parse(raw) {
        const res = await (raw === null || raw === void 0 ? void 0 : raw.json());
        res.status = raw.status;
        res.success = raw.status >= 200 && raw.status < 300;
        return res;
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (API);


/***/ })

};
;