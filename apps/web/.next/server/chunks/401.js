"use strict";
exports.id = 401;
exports.ids = [401];
exports.modules = {

/***/ 7566:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ useExtension)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _web_util_extension__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8724);
/* harmony import */ var _web_util_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6203);




function useExtension(options = {
    required: true
}) {
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)();
    const { 0: installed , 1: setInstalled  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const { 0: loading , 1: setLoading  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        if (!_web_util_extension__WEBPACK_IMPORTED_MODULE_2__/* ["default"].isSupported */ .Z.isSupported || !_web_util_extension__WEBPACK_IMPORTED_MODULE_2__/* ["default"].id */ .Z.id) {
            if (options.required) router.push("/");
            setInstalled(false);
            setLoading(false);
            return;
        }
        if (_web_util_browser__WEBPACK_IMPORTED_MODULE_3__/* ["default"].type */ .Z.type == _web_util_browser__WEBPACK_IMPORTED_MODULE_3__/* .BrowserType.Firefox */ .A.Firefox) {
            let gotPong = false;
            send("PING").then((data)=>{
                if (data.success) {
                    gotPong = true;
                    setInstalled(true);
                } else setInstalled(false);
            });
            setTimeout(()=>{
                if (!gotPong) {
                    if (options.required) router.push(_web_util_extension__WEBPACK_IMPORTED_MODULE_2__/* ["default"].url */ .Z.url);
                    setInstalled(false);
                }
                setLoading(false);
            }, 2500);
        } else {
            send("PING").then((data)=>{
                if (!data || !data.success) {
                    if (options.required) router.push(_web_util_extension__WEBPACK_IMPORTED_MODULE_2__/* ["default"].url */ .Z.url);
                    setInstalled(false);
                } else setInstalled(true);
                setLoading(false);
            });
        }
    }, []);
    function send(type, data1 = {
    }) {
        return new Promise((res)=>{
            if (!_web_util_extension__WEBPACK_IMPORTED_MODULE_2__/* ["default"].supported */ .Z.supported) return res({
                success: false
            });
            if (_web_util_browser__WEBPACK_IMPORTED_MODULE_3__/* ["default"].type */ .Z.type == _web_util_browser__WEBPACK_IMPORTED_MODULE_3__/* .BrowserType.Firefox */ .A.Firefox) {
                window.postMessage({
                    type: `REMARK:${type}`,
                    ...data1
                }, "*");
                on(`RE:REMARK:${type}`, res);
            } else {
                if (!chrome || !chrome.runtime) {
                    if (options.required) router.push(_web_util_extension__WEBPACK_IMPORTED_MODULE_2__/* ["default"].url */ .Z.url);
                    res({
                        success: false
                    });
                    return;
                }
                chrome.runtime.sendMessage(_web_util_extension__WEBPACK_IMPORTED_MODULE_2__/* ["default"].id */ .Z.id, {
                    type,
                    ...data1
                }, (data)=>res(data)
                );
            }
        });
    }
    function on(type, cb) {
        window.addEventListener("message", handler);
        function handler(event) {
            if (event.source !== window || !event.data || !event.data.type || event.data.type !== type) return;
            cb(event.data);
            window.removeEventListener("message", handler);
        }
    }
    return {
        send,
        on,
        installed,
        loading
    };
};


/***/ }),

/***/ 1701:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ useTitle)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function useTitle(title, disableTag = false) {
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        if (disableTag) document.title = title;
        else document.title = `${title} | Remark`;
    }, [
        title,
        disableTag
    ]);
    return null;
};


/***/ }),

/***/ 6203:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "A": () => (/* binding */ BrowserType1),
/* harmony export */   "Z": () => (/* binding */ Browser)
/* harmony export */ });
var BrowserType1;

(function(BrowserType) {
    BrowserType[BrowserType["Firefox"] = 0] = "Firefox";
    BrowserType[BrowserType["Opera"] = 1] = "Opera";
    BrowserType[BrowserType["Edge"] = 2] = "Edge";
    BrowserType[BrowserType["Vivaldi"] = 3] = "Vivaldi";
    BrowserType[BrowserType["Chrome"] = 4] = "Chrome";
    BrowserType[BrowserType["Safari"] = 5] = "Safari";
    BrowserType[BrowserType["Unknowen"] = 6] = "Unknowen";
})(BrowserType1 || (BrowserType1 = {
}));
class Browser {
    static get type() {
        if (this.cache && this.cache !== BrowserType1.Unknowen) return this.cache;
        if (true) this.cache = BrowserType1.Unknowen;
        else {}
        return this.cache;
    }
    static get alias() {
        const browser = this.type;
        switch(browser){
            case BrowserType1.Firefox:
                return "Firefox";
            case BrowserType1.Opera:
                return "Opera";
            case BrowserType1.Edge:
                return "Edge";
            case BrowserType1.Vivaldi:
                return "Vivaldi";
            case BrowserType1.Chrome:
                return "Chrome";
            case BrowserType1.Safari:
                return "Safari";
            default:
                return "Browser";
        }
    }
    static get isMobile() {
        if (true) return false;
        let check = false;
        /* eslint-disable no-useless-escape */ (function(a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
        /* eslint-enable no-useless-escape */ /* @ts-ignore */ })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    }
}
Browser.cache = null;



/***/ }),

/***/ 8724:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Extension)
/* harmony export */ });
/* harmony import */ var _web_util_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6203);

class Extension {
    static get isSupported() {
        if (!_web_util_browser__WEBPACK_IMPORTED_MODULE_0__/* ["default"].isMobile */ .Z.isMobile) return this.supported.includes(_web_util_browser__WEBPACK_IMPORTED_MODULE_0__/* ["default"].type */ .Z.type);
        // Only allow firefox on mobile
        return _web_util_browser__WEBPACK_IMPORTED_MODULE_0__/* ["default"].type */ .Z.type == _web_util_browser__WEBPACK_IMPORTED_MODULE_0__/* .BrowserType.Firefox */ .A.Firefox;
    }
    static get url() {
        if (!this.isSupported) return;
        const browser = _web_util_browser__WEBPACK_IMPORTED_MODULE_0__/* ["default"].type */ .Z.type;
        switch(browser){
            case _web_util_browser__WEBPACK_IMPORTED_MODULE_0__/* .BrowserType.Firefox */ .A.Firefox:
                return this.firefoxUrl;
            case _web_util_browser__WEBPACK_IMPORTED_MODULE_0__/* .BrowserType.Opera */ .A.Opera:
                return this.operaUrl;
            case _web_util_browser__WEBPACK_IMPORTED_MODULE_0__/* .BrowserType.Edge */ .A.Edge:
                return this.edgeUrl;
            default:
                return this.chromeUrl;
        }
    }
    static get id() {
        if (!this.isSupported) return undefined;
        const browser = _web_util_browser__WEBPACK_IMPORTED_MODULE_0__/* ["default"].type */ .Z.type;
        switch(browser){
            case _web_util_browser__WEBPACK_IMPORTED_MODULE_0__/* .BrowserType.Firefox */ .A.Firefox:
                return "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
            case _web_util_browser__WEBPACK_IMPORTED_MODULE_0__/* .BrowserType.Opera */ .A.Opera:
                return "cxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
            case _web_util_browser__WEBPACK_IMPORTED_MODULE_0__/* .BrowserType.Edge */ .A.Edge:
                return "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
            default:
                return "cjjlliaobnbdmclhgceakcfonciokana";
        }
    }
}
Extension.firefoxUrl = `https://addons.mozilla.org/de/firefox/addon/${"remark"}/`;
Extension.operaUrl = `https://addons.opera.com/de/extensions/details/${"remark"}`;
Extension.edgeUrl = `https://microsoftedge.microsoft.com/addons/detail/${"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"}`;
Extension.chromeUrl = `https://chrome.google.com/webstore/detail/${"cjjlliaobnbdmclhgceakcfonciokana"}`;
Extension.supported = [
    _web_util_browser__WEBPACK_IMPORTED_MODULE_0__/* .BrowserType.Firefox */ .A.Firefox,
    _web_util_browser__WEBPACK_IMPORTED_MODULE_0__/* .BrowserType.Opera */ .A.Opera,
    _web_util_browser__WEBPACK_IMPORTED_MODULE_0__/* .BrowserType.Edge */ .A.Edge,
    _web_util_browser__WEBPACK_IMPORTED_MODULE_0__/* .BrowserType.Vivaldi */ .A.Vivaldi,
    _web_util_browser__WEBPACK_IMPORTED_MODULE_0__/* .BrowserType.Chrome */ .A.Chrome, 
];



/***/ })

};
;