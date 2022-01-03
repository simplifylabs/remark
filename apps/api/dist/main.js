/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/api/src/controller/auth/forgot.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const validation_1 = __webpack_require__("./apps/api/src/middleware/validation.ts");
const crypto_1 = __webpack_require__("crypto");
const email_1 = __webpack_require__("./apps/api/src/util/email.ts");
const prisma_1 = (0, tslib_1.__importDefault)(__webpack_require__("./apps/api/src/util/prisma.ts"));
const forgotPassword = (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findFirst({
        where: { email: req.body.email },
    });
    if (!user)
        return res.status(403).json({ error: "EMAIL_NOT_FOUND" });
    const token = (0, crypto_1.randomBytes)(32).toString("hex");
    const expires = new Date();
    expires.setHours(expires.getHours() + 1);
    yield prisma_1.default.user.update({
        where: {
            id: user.id,
        },
        data: {
            resetToken: token,
            resetExp: expires,
        },
    });
    res.status(200).json({});
    (0, email_1.sendResetEmail)(user.email, user.username, `${process.env.HOST}/auth/reset?token=${token}`);
});
exports["default"] = [
    (0, validation_1.validate)({
        body: validation_1.Joi.object({
            email: validation_1.prefabs.email.required(),
        }),
    }),
    forgotPassword,
];


/***/ }),

/***/ "./apps/api/src/controller/auth/key.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const auth_1 = __webpack_require__("./apps/api/src/util/auth.ts");
const keyController = (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    res.status(200).json({ publicKey: auth_1.publicKey });
});
exports["default"] = [keyController];


/***/ }),

/***/ "./apps/api/src/controller/auth/login.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const prisma_1 = (0, tslib_1.__importDefault)(__webpack_require__("./apps/api/src/util/prisma.ts"));
const auth_1 = __webpack_require__("./apps/api/src/util/auth.ts");
const hash_1 = __webpack_require__("./apps/api/src/util/hash.ts");
const validation_1 = __webpack_require__("./apps/api/src/middleware/validation.ts");
const loginController = (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findFirst({
        where: {
            email: req.body.email,
        },
    });
    if (!user)
        return res.status(403).json({ error: "WRONG_EMAIL_OR_PASSWORD" });
    const passwordsMatch = yield (0, hash_1.comparePasswords)(user.password, req.body.password);
    if (!passwordsMatch)
        return res.status(403).json({ error: "WRONG_EMAIL_OR_PASSWORD" });
    const accessToken = (0, auth_1.generateAccessToken)(user);
    const refreshToken = (0, auth_1.generateRefreshToken)(user);
    return res.status(200).json({ accessToken, refreshToken });
});
exports["default"] = [
    (0, validation_1.validate)({
        body: validation_1.Joi.object({
            email: validation_1.prefabs.email.required(),
            password: validation_1.prefabs.password.required(),
        }),
    }),
    loginController,
];


/***/ }),

/***/ "./apps/api/src/controller/auth/refresh.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const validation_1 = __webpack_require__("./apps/api/src/middleware/validation.ts");
const auth_1 = __webpack_require__("./apps/api/src/util/auth.ts");
const prisma_1 = (0, tslib_1.__importDefault)(__webpack_require__("./apps/api/src/util/prisma.ts"));
const refreshController = (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const refreshToken = req.body.refreshToken;
    try {
        const verified = yield (0, auth_1.verifyRefreshToken)(refreshToken);
        const user = yield prisma_1.default.user.findFirst({
            where: { id: verified.user.id },
        });
        if (!user)
            return res.status(403).json({ error: "USER_NOT_FOUND" });
        const newAccessToken = (0, auth_1.generateAccessToken)(user);
        const newRefreshToken = (0, auth_1.generateRefreshToken)(user);
        res
            .status(200)
            .json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
    }
    catch (e) {
        res.status(400).json({ error: "INVALID_REFRESH_TOKEN" });
    }
});
exports["default"] = [
    (0, validation_1.validate)({
        body: validation_1.Joi.object({
            refreshToken: validation_1.prefabs.refreshToken.required(),
        }),
    }),
    refreshController,
];


/***/ }),

/***/ "./apps/api/src/controller/auth/register.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const hash_1 = __webpack_require__("./apps/api/src/util/hash.ts");
const auth_1 = __webpack_require__("./apps/api/src/util/auth.ts");
const validation_1 = __webpack_require__("./apps/api/src/middleware/validation.ts");
const sanitize_html_1 = (0, tslib_1.__importDefault)(__webpack_require__("sanitize-html"));
const prisma_1 = (0, tslib_1.__importDefault)(__webpack_require__("./apps/api/src/util/prisma.ts"));
const registerController = (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    try {
        const email = (0, sanitize_html_1.default)(req.body.email);
        const username = (0, sanitize_html_1.default)(req.body.username);
        const existing = yield prisma_1.default.user.findFirst({
            where: {
                OR: [{ email }, { username }],
            },
        });
        if (existing) {
            if (existing.email == email)
                return res.status(403).json({ error: "EMAIL_NOT_AVAILABLE" });
            return res.status(403).json({ error: "USERNAME_NOT_AVAILABLE" });
        }
        const hashedPw = yield (0, hash_1.hash)(req.body.password);
        const user = yield prisma_1.default.user.create({
            data: {
                username,
                email,
                password: hashedPw,
            },
        });
        const accessToken = (0, auth_1.generateAccessToken)(user);
        const refreshToken = (0, auth_1.generateRefreshToken)(user);
        res.status(200).json({ accessToken, refreshToken });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
    }
});
exports["default"] = [
    (0, validation_1.validate)({
        body: validation_1.Joi.object({
            username: validation_1.prefabs.username.required(),
            email: validation_1.prefabs.email.required(),
            password: validation_1.prefabs.password.required(),
        }),
    }),
    registerController,
];


/***/ }),

/***/ "./apps/api/src/controller/auth/reset.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const validation_1 = __webpack_require__("./apps/api/src/middleware/validation.ts");
const auth_1 = __webpack_require__("./apps/api/src/util/auth.ts");
const hash_1 = __webpack_require__("./apps/api/src/util/hash.ts");
const prisma_1 = (0, tslib_1.__importDefault)(__webpack_require__("./apps/api/src/util/prisma.ts"));
function resetPassword(req, res) {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        const user = yield prisma_1.default.user.findFirst({
            where: {
                resetToken: req.body.token,
            },
        });
        if (!user)
            return res.status(403).json({ error: "WRONG_TOKEN" });
        const exp = new Date(Number(user.resetExp)).getTime();
        const now = new Date().getTime();
        if (!user.resetExp || exp < now)
            return res.status(403).json({ error: "TOKEN_EXPIRED" });
        const hashed = yield (0, hash_1.hash)(req.body.password);
        yield prisma_1.default.user.update({
            where: {
                id: user.id,
            },
            data: {
                password: hashed,
                resetExp: null,
                resetToken: null,
            },
        });
        const accessToken = (0, auth_1.generateAccessToken)(user);
        const refreshToken = (0, auth_1.generateRefreshToken)(user);
        res.status(200).json({ accessToken, refreshToken });
    });
}
exports["default"] = [
    (0, validation_1.validate)({
        body: validation_1.Joi.object({
            token: validation_1.Joi.string().required(),
            password: validation_1.prefabs.password.required(),
        }),
    }),
    resetPassword,
];


/***/ }),

/***/ "./apps/api/src/controller/comment/create.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const validation_1 = __webpack_require__("./apps/api/src/middleware/validation.ts");
const url_1 = __webpack_require__("./apps/api/src/util/url.ts");
const access_1 = (0, tslib_1.__importDefault)(__webpack_require__("./apps/api/src/middleware/access.ts"));
const sanitize_html_1 = (0, tslib_1.__importDefault)(__webpack_require__("sanitize-html"));
const prisma_1 = (0, tslib_1.__importStar)(__webpack_require__("./apps/api/src/util/prisma.ts"));
const createComment = (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    try {
        if (req.body.replyTo) {
            const reply = yield prisma_1.default.post.findUnique({
                where: { id: req.body.replyTo },
                select: { id: true, replyId: true },
            });
            if (!reply || reply.replyId)
                return res.status(400).json({ error: "POST_NOT_FOUND" });
        }
        const text = (0, sanitize_html_1.default)(req.body.comment);
        const filtered = (0, url_1.filter)(req.body.url);
        if (filtered.error)
            return res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
        let url = yield prisma_1.default.url.findUnique({
            where: { filtered: filtered.url },
        });
        if (!url)
            url = yield prisma_1.default.url.create({ data: { filtered: filtered.url } });
        const post = yield prisma_1.default.post.create({
            data: {
                authorId: req.user.id,
                originalURL: filtered.original,
                shareURL: filtered.share,
                urlId: url.id,
                replyId: req.body.replyTo || null,
                comment: text,
            },
            select: Object.assign(Object.assign({}, prisma_1.comment), { replies: true, replyId: true, shareURL: true }),
        });
        const shareURL = post.shareURL.replace("%25REMARK_ID%25", post.id);
        yield prisma_1.default.post.update({ where: { id: post.id }, data: { shareURL } });
        res.status(200).json(post);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
    }
});
exports["default"] = [
    (0, access_1.default)(),
    (0, validation_1.validate)({
        body: validation_1.Joi.object({
            comment: validation_1.prefabs.comment.required(),
            url: validation_1.prefabs.url.required(),
            replyTo: validation_1.prefabs.id.optional(),
        }),
    }),
    createComment,
];


/***/ }),

/***/ "./apps/api/src/controller/comment/list.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const validation_1 = __webpack_require__("./apps/api/src/middleware/validation.ts");
const url_1 = __webpack_require__("./apps/api/src/util/url.ts");
const prisma_1 = (0, tslib_1.__importStar)(__webpack_require__("./apps/api/src/util/prisma.ts"));
const listComments = (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const decoded = decodeURIComponent(String(req.query.url) || "");
    const filtered = (0, url_1.filter)(decoded);
    if (filtered.error)
        return res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
    const result = yield prisma_1.default.$transaction([
        prisma_1.default.post.count({
            where: { url: { filtered: filtered.url } },
        }),
        prisma_1.default.post.count({
            where: { url: { filtered: filtered.url }, replyId: null },
        }),
        prisma_1.default.post.findMany({
            where: { url: { filtered: filtered.url }, replyId: null },
            skip: Number(req.query.page) * 20,
            take: 20,
            orderBy: [
                {
                    upvotes: "desc",
                },
                {
                    downvotes: "asc",
                },
            ],
            select: prisma_1.comment,
        }),
    ]);
    if (result.length != 3 || !result[0] || !result[1] || !result[2])
        return res.status(200).json({ total: 0, list: [] });
    return res
        .status(200)
        .json({ total: result[0], parents: result[1], list: result[2] });
});
exports["default"] = [
    (0, validation_1.validate)({
        query: validation_1.Joi.object({
            page: validation_1.prefabs.page.required(),
            url: validation_1.prefabs.url.required(),
        }),
    }),
    listComments,
];


/***/ }),

/***/ "./apps/api/src/controller/comment/remove.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const validation_1 = __webpack_require__("./apps/api/src/middleware/validation.ts");
const prisma_1 = (0, tslib_1.__importDefault)(__webpack_require__("./apps/api/src/util/prisma.ts"));
const access_1 = (0, tslib_1.__importDefault)(__webpack_require__("./apps/api/src/middleware/access.ts"));
const removeComment = (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const post = yield prisma_1.default.post.findUnique({
        where: { id: req.params.id },
        select: { authorId: true },
    });
    if (!post)
        return res.status(404).json({ error: "POST_NOT_FOUND" });
    if (post.authorId !== req.user.id)
        return res.status(403).json({ error: "ACCESS_FORBIDDEN" });
    try {
        yield prisma_1.default.post.delete({ where: { id: req.params.id } });
        res.status(200).json({});
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
    }
});
exports["default"] = [
    (0, access_1.default)(),
    (0, validation_1.validate)({
        params: validation_1.Joi.object({
            id: validation_1.prefabs.id.required(),
        }),
    }),
    removeComment,
];


/***/ }),

/***/ "./apps/api/src/controller/comment/single.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const validation_1 = __webpack_require__("./apps/api/src/middleware/validation.ts");
const url_1 = __webpack_require__("./apps/api/src/util/url.ts");
const prisma_1 = (0, tslib_1.__importStar)(__webpack_require__("./apps/api/src/util/prisma.ts"));
const singleComments = (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const post = yield prisma_1.default.post.findUnique({
        where: { id: String(req.params.id) },
        select: Object.assign(Object.assign({}, prisma_1.comment), { replies: false, replyId: true, shareURL: true, url: true }),
    });
    if (!post)
        return res.status(404).json({ error: "POST_NOT_FOUND" });
    if (req.query.url && typeof req.query.url == "string") {
        const decoded = decodeURIComponent(String(req.query.url) || "");
        const filtered = (0, url_1.filter)(decoded);
        if (filtered.error)
            return res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
        if (post.url.filtered !== filtered.url)
            return res.status(400).json({ error: "INVALID_URL" });
    }
    if (post.replyId) {
        const parent = yield prisma_1.default.post.findUnique({
            where: { id: post.replyId },
            select: Object.assign(Object.assign({}, prisma_1.comment), { replies: false, replyId: true }),
        });
        if (!parent)
            return res.status(404).json({ error: "POST_NOT_FOUND" });
        parent.replies = [post];
        return res.status(200).json({ comment: parent });
    }
    else {
        post.replies = [];
    }
    delete post.url;
    res.status(200).json({ comment: post });
});
exports["default"] = [
    (0, validation_1.validate)({
        params: validation_1.Joi.object({
            id: validation_1.prefabs.id.required(),
        }),
        query: validation_1.Joi.object({
            url: validation_1.prefabs.url.optional(),
        }),
    }),
    singleComments,
];


/***/ }),

/***/ "./apps/api/src/controller/comment/url.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const validation_1 = __webpack_require__("./apps/api/src/middleware/validation.ts");
const prisma_1 = (0, tslib_1.__importDefault)(__webpack_require__("./apps/api/src/util/prisma.ts"));
const commentUrl = (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const comment = yield prisma_1.default.post.findUnique({
        where: { id: req.params.id },
    });
    if (!comment)
        return res.status(404).json({ error: "POST_NOT_FOUND" });
    return res.status(200).json({ url: comment.shareURL });
});
exports["default"] = [
    (0, validation_1.validate)({
        params: validation_1.Joi.object({
            id: validation_1.prefabs.id.required(),
        }),
    }),
    commentUrl,
];


/***/ }),

/***/ "./apps/api/src/controller/comment/vote.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const validation_1 = __webpack_require__("./apps/api/src/middleware/validation.ts");
const access_1 = (0, tslib_1.__importDefault)(__webpack_require__("./apps/api/src/middleware/access.ts"));
const prisma_1 = (0, tslib_1.__importDefault)(__webpack_require__("./apps/api/src/util/prisma.ts"));
const voteComment = (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    let vote = yield prisma_1.default.vote.findFirst({
        where: { userId: req.user.id, postId: req.params.id },
        select: { id: true, type: true },
    });
    let type = "CREATED";
    if (vote && vote.type == req.body.type)
        type = "DELETED";
    else if (vote)
        type = "TOGGLED";
    let data = {};
    if (type == "CREATED" || !vote) {
        vote = yield prisma_1.default.vote.create({
            data: {
                userId: req.user.id,
                postId: req.params.id,
                type: req.body.type,
            },
        });
        if (req.body.type === "UP")
            data = { upvotes: { increment: 1 } };
        else
            data = { downvotes: { increment: 1 } };
    }
    else if (type == "DELETED") {
        yield prisma_1.default.vote.delete({
            where: { id: vote.id },
        });
        if (req.body.type === "UP")
            data = { upvotes: { decrement: 1 } };
        else
            data = { downvotes: { decrement: 1 } };
    }
    else {
        yield prisma_1.default.vote.update({
            where: { id: vote.id },
            data: {
                type: req.body.type,
            },
        });
        if (req.body.type === "UP")
            data = { upvotes: { increment: 1 }, downvotes: { decrement: 1 } };
        else
            data = { upvotes: { decrement: 1 }, downvotes: { increment: 1 } };
    }
    yield prisma_1.default.post.update({
        where: {
            id: req.params.id,
        },
        data,
    });
    res.status(200).json({ action: type });
});
exports["default"] = [
    (0, access_1.default)(),
    (0, validation_1.validate)({
        params: validation_1.Joi.object({
            id: validation_1.prefabs.id.required(),
        }),
        body: validation_1.Joi.object({
            type: validation_1.Joi.string().valid("UP", "DOWN").required(),
        }),
    }),
    voteComment,
];


/***/ }),

/***/ "./apps/api/src/controller/feedback/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const validation_1 = __webpack_require__("./apps/api/src/middleware/validation.ts");
const prisma_1 = (0, tslib_1.__importDefault)(__webpack_require__("./apps/api/src/util/prisma.ts"));
const meUser = (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    try {
        yield prisma_1.default.feedback.create({
            data: {
                statements: req.body.statements,
                comment: req.body.comment,
            },
        });
        res.status(200).json({});
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
    }
});
exports["default"] = [
    (0, validation_1.validate)({
        body: validation_1.Joi.object({
            statements: validation_1.Joi.array().items(validation_1.Joi.string().max(200)).required(),
            comment: validation_1.Joi.string().max(3000).optional(),
        }),
    }),
    meUser,
];


/***/ }),

/***/ "./apps/api/src/controller/user/list.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const prisma_1 = (0, tslib_1.__importDefault)(__webpack_require__("./apps/api/src/util/prisma.ts"));
const listUsers = (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    if (!req.query.q)
        return res.status(200).json({ list: [] });
    const users = yield prisma_1.default.user.findMany({
        where: {
            username: {
                contains: String(req.query.q),
            },
        },
        select: {
            id: true,
            username: true,
        },
        take: 5,
    });
    res.status(200).json({ list: users });
});
exports["default"] = [listUsers];


/***/ }),

/***/ "./apps/api/src/controller/user/me.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const access_1 = (0, tslib_1.__importDefault)(__webpack_require__("./apps/api/src/middleware/access.ts"));
const prisma_1 = (0, tslib_1.__importDefault)(__webpack_require__("./apps/api/src/util/prisma.ts"));
const meUser = (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUnique({
        where: {
            id: req.user.id,
        },
        select: {
            id: true,
            username: true,
            email: true,
        },
    });
    if (!user)
        return res.status(403).json({ error: "USER_NOT_FOUND" });
    res.status(200).json(user);
});
exports["default"] = [(0, access_1.default)(), meUser];


/***/ }),

/***/ "./apps/api/src/controller/user/update.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const prisma_1 = (0, tslib_1.__importDefault)(__webpack_require__("./apps/api/src/util/prisma.ts"));
const sanitize_html_1 = (0, tslib_1.__importDefault)(__webpack_require__("sanitize-html"));
const access_1 = (0, tslib_1.__importDefault)(__webpack_require__("./apps/api/src/middleware/access.ts"));
const validation_1 = __webpack_require__("./apps/api/src/middleware/validation.ts");
const updateController = (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const email = (0, sanitize_html_1.default)(req.body.email);
    const username = (0, sanitize_html_1.default)(req.body.username);
    const or = [];
    if (email)
        or.push({ email });
    if (username)
        or.push({ username });
    if (or.length < 1)
        return res.status(403).json({ error: "UPDATE_MISSING" });
    const existing = yield prisma_1.default.user.findFirst({
        where: {
            OR: or,
        },
    });
    const me = yield prisma_1.default.user.findUnique({
        where: {
            id: req.user.id,
        },
        select: {
            id: true,
            username: true,
        },
    });
    if (existing) {
        if (email && existing.email == email)
            return res.status(403).json({ error: "EMAIL_NOT_AVAILABLE" });
        if (!me || me.id !== existing.id || me.username == username)
            return res.status(403).json({ error: "USERNAME_NOT_AVAILABLE" });
    }
    const update = {};
    if (username)
        update.username = username;
    if (email)
        update.email = email;
    yield prisma_1.default.user.update({
        where: {
            id: req.user.id,
        },
        data: update,
    });
    res.status(200).json({});
});
exports["default"] = [
    (0, access_1.default)(),
    (0, validation_1.validate)({
        body: validation_1.Joi.object({
            email: validation_1.prefabs.email.optional(),
            username: validation_1.prefabs.username.optional(),
        }),
    }),
    updateController,
];


/***/ }),

/***/ "./apps/api/src/middleware/access.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const auth_1 = __webpack_require__("./apps/api/src/util/auth.ts");
function access(req, res, next) {
    var _a;
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        const accessToken = (_a = req.header("authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
        if (!accessToken)
            return res.status(403).json({ error: "ACCESS_TOKEN_INVALID" });
        try {
            const verified = yield (0, auth_1.verifyAccessToken)(accessToken);
            req.user = verified.user;
            next();
        }
        catch (e) {
            res.status(403).json({ error: "ACCESS_TOKEN_INVALID" });
        }
    });
}
exports["default"] = () => access;


/***/ }),

/***/ "./apps/api/src/middleware/cors.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const cors_1 = (0, tslib_1.__importDefault)(__webpack_require__("cors"));
exports["default"] = () => (0, cors_1.default)({
    origin: true,
    allowedHeaders: "Authorization, Content-Type",
    credentials: true,
    maxAge: 1000 * 60 * 15,
});


/***/ }),

/***/ "./apps/api/src/middleware/error.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const validation_1 = __webpack_require__("./apps/api/src/middleware/validation.ts");
const express_validation_1 = __webpack_require__("express-validation");
function error(err, req, res, next) {
    if (err instanceof express_validation_1.ValidationError) {
        const message = (0, validation_1.getValidationMessage)(err);
        if (message)
            return res.status(400).json({
                error: "VALIDATION_ERROR",
                message: message,
            });
        return res.status(400).json({ error: "VALIDATION_ERROR" });
    }
    console.error(err);
    res.status(500).json({ error: "INTERNAL_SERVER_ERROR" });
}
exports["default"] = () => error;


/***/ }),

/***/ "./apps/api/src/middleware/ratelimit.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const express_rate_limit_1 = (0, tslib_1.__importDefault)(__webpack_require__("express-rate-limit"));
const rate_limit_redis_1 = (0, tslib_1.__importDefault)(__webpack_require__("rate-limit-redis"));
function RateLimiter(options) {
    return (0, express_rate_limit_1.default)({
        store: new rate_limit_redis_1.default({}),
        max: options.maxRequest,
        windowMs: options.windowMs,
        keyGenerator: (req, res) => {
            if (options.key === "IP") {
                return req.ip;
            }
            else {
                return req.user.id;
            }
        },
        handler: (req, res) => {
            res.status(429).json({
                error: "RATE_LIMIT_EXCEEDED",
                message: options.message || "Max Requests exceeded for your " + options.key,
            });
        },
    });
}
exports["default"] = RateLimiter;


/***/ }),

/***/ "./apps/api/src/middleware/validation.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Joi = exports.prefabs = exports.getValidationMessage = exports.validate = void 0;
const express_validation_1 = __webpack_require__("express-validation");
function validate(validation) {
    return (0, express_validation_1.validate)(validation, {}, {});
}
exports.validate = validate;
function getValidationMessage(err) {
    if (!err)
        return false;
    if (!err.details)
        return false;
    const details = err.details;
    if (!details.body && !details.params && !details.query)
        return false;
    const body = details.body || details.params || details.query;
    if (!Array.isArray(body))
        return false;
    if (body.length < 1)
        return false;
    if (!body[0])
        return false;
    const message = body[0].message;
    if (!message)
        return false;
    return message;
}
exports.getValidationMessage = getValidationMessage;
exports.prefabs = {
    id: express_validation_1.Joi.string().uuid(),
    username: express_validation_1.Joi.string()
        .regex(/^[a-zA-Z0-9_.]*$/)
        .message("Only Letters, Numbers, Dots, and Underscores are allowed in the username!")
        .min(3)
        .max(20),
    email: express_validation_1.Joi.string().email(),
    password: express_validation_1.Joi.string().min(6).max(128),
    comment: express_validation_1.Joi.string().min(1).max(200),
    refreshToken: express_validation_1.Joi.string().min(1).max(2000),
    url: express_validation_1.Joi.string().uri().min(1).max(2000),
    page: express_validation_1.Joi.number().min(0).max(1000),
};
var express_validation_2 = __webpack_require__("express-validation");
Object.defineProperty(exports, "Joi", ({ enumerable: true, get: function () { return express_validation_2.Joi; } }));


/***/ }),

/***/ "./apps/api/src/router/auth.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const forgot_1 = (0, tslib_1.__importDefault)(__webpack_require__("./apps/api/src/controller/auth/forgot.ts"));
const key_1 = (0, tslib_1.__importDefault)(__webpack_require__("./apps/api/src/controller/auth/key.ts"));
const login_1 = (0, tslib_1.__importDefault)(__webpack_require__("./apps/api/src/controller/auth/login.ts"));
const refresh_1 = (0, tslib_1.__importDefault)(__webpack_require__("./apps/api/src/controller/auth/refresh.ts"));
const register_1 = (0, tslib_1.__importDefault)(__webpack_require__("./apps/api/src/controller/auth/register.ts"));
const reset_1 = (0, tslib_1.__importDefault)(__webpack_require__("./apps/api/src/controller/auth/reset.ts"));
const ratelimit_1 = (0, tslib_1.__importDefault)(__webpack_require__("./apps/api/src/middleware/ratelimit.ts"));
const express_1 = __webpack_require__("express");
const router = (0, express_1.Router)();
router.use((0, ratelimit_1.default)({
    maxRequest: 300,
    key: "IP",
    windowMs: 60 * 1000,
}));
router.post("/login", login_1.default);
router.post("/register", register_1.default);
router.post("/forgot", forgot_1.default);
router.post("/reset", reset_1.default);
router.post("/refresh", refresh_1.default);
router.get("/key", key_1.default);
exports["default"] = router;


/***/ }),

/***/ "./apps/api/src/router/comment.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const create_1 = (0, tslib_1.__importDefault)(__webpack_require__("./apps/api/src/controller/comment/create.ts"));
const list_1 = (0, tslib_1.__importDefault)(__webpack_require__("./apps/api/src/controller/comment/list.ts"));
const remove_1 = (0, tslib_1.__importDefault)(__webpack_require__("./apps/api/src/controller/comment/remove.ts"));
const single_1 = (0, tslib_1.__importDefault)(__webpack_require__("./apps/api/src/controller/comment/single.ts"));
const url_1 = (0, tslib_1.__importDefault)(__webpack_require__("./apps/api/src/controller/comment/url.ts"));
const vote_1 = (0, tslib_1.__importDefault)(__webpack_require__("./apps/api/src/controller/comment/vote.ts"));
const ratelimit_1 = (0, tslib_1.__importDefault)(__webpack_require__("./apps/api/src/middleware/ratelimit.ts"));
const express_1 = __webpack_require__("express");
const router = (0, express_1.Router)();
router.use((0, ratelimit_1.default)({
    maxRequest: 300,
    key: "IP",
    windowMs: 60 * 1000,
}));
router.get("/list", list_1.default);
router.post("/", create_1.default);
router.get("/:id/url", url_1.default);
router.get("/:id/", single_1.default);
router.post("/:id/vote", vote_1.default);
router.delete("/:id", remove_1.default);
exports["default"] = router;


/***/ }),

/***/ "./apps/api/src/router/feedback.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const feedback_1 = (0, tslib_1.__importDefault)(__webpack_require__("./apps/api/src/controller/feedback/index.ts"));
const ratelimit_1 = (0, tslib_1.__importDefault)(__webpack_require__("./apps/api/src/middleware/ratelimit.ts"));
const express_1 = __webpack_require__("express");
const router = (0, express_1.Router)();
router.use((0, ratelimit_1.default)({
    maxRequest: 5,
    key: "IP",
    windowMs: 60 * 1000,
}));
router.post("/", feedback_1.default);
exports["default"] = router;


/***/ }),

/***/ "./apps/api/src/router/user.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const list_1 = (0, tslib_1.__importDefault)(__webpack_require__("./apps/api/src/controller/user/list.ts"));
const me_1 = (0, tslib_1.__importDefault)(__webpack_require__("./apps/api/src/controller/user/me.ts"));
const update_1 = (0, tslib_1.__importDefault)(__webpack_require__("./apps/api/src/controller/user/update.ts"));
const ratelimit_1 = (0, tslib_1.__importDefault)(__webpack_require__("./apps/api/src/middleware/ratelimit.ts"));
const express_1 = __webpack_require__("express");
const router = (0, express_1.Router)();
router.use((0, ratelimit_1.default)({
    maxRequest: 300,
    key: "IP",
    windowMs: 60 * 1000,
}));
router.get("/list", list_1.default);
router.get("/me", me_1.default);
router.post("/update", update_1.default);
exports["default"] = router;


/***/ }),

/***/ "./apps/api/src/util/auth.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.verifyRefreshToken = exports.verifyAccessToken = exports.generateRefreshToken = exports.generateAccessToken = exports.publicKey = void 0;
const tslib_1 = __webpack_require__("tslib");
const fs_1 = (0, tslib_1.__importDefault)(__webpack_require__("fs"));
const path_1 = (0, tslib_1.__importDefault)(__webpack_require__("path"));
const jsonwebtoken_1 = __webpack_require__("jsonwebtoken");
const rootPath = path_1.default.join(__dirname, "..", "..", "..");
const publicPath = path_1.default.join(rootPath, ".certs", "public.pem");
const privatePath = path_1.default.join(rootPath, ".certs", "private.pem");
if (!fs_1.default.existsSync(privatePath)) {
    console.error("Private key not set. Make sure .certs/private.pem exists!");
    process.exit();
}
if (!fs_1.default.existsSync(publicPath)) {
    console.error("Public key not set. Make sure .certs/public.pem exists!");
    process.exit();
}
const privateKey = fs_1.default.readFileSync(privatePath, "utf-8");
exports.publicKey = fs_1.default.readFileSync(publicPath, "utf-8");
function generateAccessToken(user) {
    return (0, jsonwebtoken_1.sign)({
        user: { id: user.id },
        typ: "Bearer",
    }, privateKey, {
        expiresIn: "15m",
        issuer: "Remark",
        subject: user.id.toString(),
        audience: process.env.HOST,
        algorithm: "RS256",
    });
}
exports.generateAccessToken = generateAccessToken;
function generateRefreshToken(user) {
    return (0, jsonwebtoken_1.sign)({ user: { id: user.id }, typ: "RT" }, privateKey, {
        expiresIn: "10y",
        issuer: "Remark",
        subject: user.id.toString(),
        audience: process.env.HOST,
        algorithm: "RS256",
    });
}
exports.generateRefreshToken = generateRefreshToken;
function verifyAccessToken(accessToken) {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        const verified = (0, jsonwebtoken_1.verify)(accessToken, exports.publicKey, {
            issuer: "Remark",
            audience: process.env.HOST,
        });
        return verified;
    });
}
exports.verifyAccessToken = verifyAccessToken;
function verifyRefreshToken(refreshToken) {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        const verified = (0, jsonwebtoken_1.verify)(refreshToken, exports.publicKey);
        return verified;
    });
}
exports.verifyRefreshToken = verifyRefreshToken;


/***/ }),

/***/ "./apps/api/src/util/dotenv.ts":
/***/ ((module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const dotenv_1 = (0, tslib_1.__importDefault)(__webpack_require__("dotenv"));
const fs_1 = (0, tslib_1.__importDefault)(__webpack_require__("fs"));
function loadEnv() {
    if (exists() && validate())
        dotenv_1.default.config();
}
exports["default"] = loadEnv;
function exists() {
    if (!fs_1.default.existsSync(".env")) {
        console.error(".env doesn't exist! Use .env.template to create it.");
        process.exit(1);
    }
    return true;
}
function validate() {
    const parsed = dotenv_1.default.parse(fs_1.default.readFileSync(".env"));
    const template = dotenv_1.default.parse(fs_1.default.readFileSync(".env.template"));
    const missing = [];
    Object.keys(template).forEach((key) => {
        if (!Object.keys(parsed).includes(key))
            missing.push(key);
    });
    if (missing.length === 0)
        return true;
    console.error(`.env is missing the following keys: ${missing.join(", ")}`);
    console.error("Use .env.template for creating a valid .env file.");
    process.exit(1);
}
module.exports = loadEnv;


/***/ }),

/***/ "./apps/api/src/util/email.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sendResetEmail = void 0;
const tslib_1 = __webpack_require__("tslib");
const fs_1 = (0, tslib_1.__importDefault)(__webpack_require__("fs"));
const path_1 = (0, tslib_1.__importDefault)(__webpack_require__("path"));
const nodemailer_1 = (0, tslib_1.__importDefault)(__webpack_require__("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
const resetEmail = fs_1.default.readFileSync(path_1.default.join(__dirname, "email", "reset.html"), "utf-8");
function sendResetEmail(email, username, link) {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        const info = yield transporter.sendMail({
            from: `Remark <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Remark - Reset your password.",
            html: resetEmail.replace(/%LINK%/g, link).replace(/%USERNAME%/g, username),
        });
        console.info(`Sent email ${info.messageId}`);
    });
}
exports.sendResetEmail = sendResetEmail;


/***/ }),

/***/ "./apps/api/src/util/hash.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.comparePasswords = exports.hash = void 0;
const tslib_1 = __webpack_require__("tslib");
const bcrypt_1 = (0, tslib_1.__importDefault)(__webpack_require__("bcrypt"));
const SALT_ROUNDS = 10;
function hash(password) {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        try {
            const result = yield bcrypt_1.default.hash(password, SALT_ROUNDS);
            return result;
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    });
}
exports.hash = hash;
function comparePasswords(hashedPassword, plainPassword) {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        try {
            const match = yield bcrypt_1.default.compare(plainPassword, hashedPassword);
            return match;
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    });
}
exports.comparePasswords = comparePasswords;


/***/ }),

/***/ "./apps/api/src/util/logger.ts":
/***/ ((module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.warn = exports.error = exports.info = exports.log = void 0;
const tslib_1 = __webpack_require__("tslib");
const chalk_1 = (0, tslib_1.__importDefault)(__webpack_require__("chalk"));
function getConsole() {
    const old = Object.assign({}, console);
    console.log = (...args) => log(old, ...args);
    console.info = (...args) => info(old, ...args);
    console.warn = (...args) => warn(old, ...args);
    console.error = (...args) => error(old, ...args);
    return console;
}
exports["default"] = getConsole;
function log(con, ...args) {
    con.log(chalk_1.default.cyan("[LOG]"), ...args);
}
exports.log = log;
function info(con, ...args) {
    con.info(chalk_1.default.blue("[INFO]"), ...args);
}
exports.info = info;
function error(con, ...args) {
    con.error(chalk_1.default.red("[ERROR]"), ...args);
}
exports.error = error;
function warn(con, ...args) {
    con.warn(chalk_1.default.yellow("[WARN]"), ...args);
}
exports.warn = warn;
module.exports = getConsole;


/***/ }),

/***/ "./apps/api/src/util/prisma.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.comment = void 0;
const client_1 = __webpack_require__("@prisma/client");
const prisma = new client_1.PrismaClient();
exports["default"] = prisma;
exports.comment = {
    id: true,
    comment: true,
    author: {
        select: {
            id: true,
            username: true,
        },
    },
    upvotes: true,
    downvotes: true,
    createdAt: true,
    replies: {
        orderBy: [
            {
                upvotes: "desc",
            },
            {
                downvotes: "asc",
            },
        ],
        select: {
            id: true,
            comment: true,
            author: {
                select: {
                    id: true,
                    username: true,
                },
            },
            upvotes: true,
            downvotes: true,
            createdAt: true,
            replyId: true,
            replies: false,
        },
    },
};


/***/ }),

/***/ "./apps/api/src/util/url.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.filter = void 0;
const allowQueries = ["q", "query", "search", "s"];
function filter(str) {
    try {
        const url = new URL(str);
        let domain = url.hostname;
        domain = domain.replace("www.", "");
        let filteredSearch = "";
        let shareSearch = "";
        if (url.search) {
            const search = filterSearch(url.searchParams);
            const searchStr = search.toString();
            if (searchStr)
                filteredSearch = `?${str}`;
            search.append("remark", "%REMARK_ID%");
            shareSearch = `?${search.toString()}`;
        }
        else {
            shareSearch = "?remark=%25REMARK_ID%25";
        }
        const filtered = `${domain}${url.pathname}${filteredSearch}`;
        const share = `${url.toString().split("?")[0]}${shareSearch}`;
        return { error: false, original: str, url: filtered, share: share };
    }
    catch (e) {
        return {
            error: true,
            original: undefined,
            url: undefined,
            share: undefined,
        };
    }
}
exports.filter = filter;
function filterSearch(input) {
    const result = new URLSearchParams();
    input.forEach((value, key) => {
        if (allowQueries.includes(key))
            result.append(key, value);
    });
    return result;
}


/***/ }),

/***/ "@prisma/client":
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "bcrypt":
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "chalk":
/***/ ((module) => {

module.exports = require("chalk");

/***/ }),

/***/ "cookie-parser":
/***/ ((module) => {

module.exports = require("cookie-parser");

/***/ }),

/***/ "cors":
/***/ ((module) => {

module.exports = require("cors");

/***/ }),

/***/ "dotenv":
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "express-rate-limit":
/***/ ((module) => {

module.exports = require("express-rate-limit");

/***/ }),

/***/ "express-validation":
/***/ ((module) => {

module.exports = require("express-validation");

/***/ }),

/***/ "jsonwebtoken":
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "module-alias/register":
/***/ ((module) => {

module.exports = require("module-alias/register");

/***/ }),

/***/ "nodemailer":
/***/ ((module) => {

module.exports = require("nodemailer");

/***/ }),

/***/ "rate-limit-redis":
/***/ ((module) => {

module.exports = require("rate-limit-redis");

/***/ }),

/***/ "sanitize-html":
/***/ ((module) => {

module.exports = require("sanitize-html");

/***/ }),

/***/ "tslib":
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),

/***/ "crypto":
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "fs":
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "path":
/***/ ((module) => {

module.exports = require("path");

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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
__webpack_require__("module-alias/register");
__webpack_require__("./apps/api/src/util/logger.ts")();
__webpack_require__("./apps/api/src/util/dotenv.ts")();
const express_1 = (0, tslib_1.__importDefault)(__webpack_require__("express"));
const cookie_parser_1 = (0, tslib_1.__importDefault)(__webpack_require__("cookie-parser"));
const cors_1 = (0, tslib_1.__importDefault)(__webpack_require__("./apps/api/src/middleware/cors.ts"));
const error_1 = (0, tslib_1.__importDefault)(__webpack_require__("./apps/api/src/middleware/error.ts"));
const auth_1 = (0, tslib_1.__importDefault)(__webpack_require__("./apps/api/src/router/auth.ts"));
const comment_1 = (0, tslib_1.__importDefault)(__webpack_require__("./apps/api/src/router/comment.ts"));
const user_1 = (0, tslib_1.__importDefault)(__webpack_require__("./apps/api/src/router/user.ts"));
const feedback_1 = (0, tslib_1.__importDefault)(__webpack_require__("./apps/api/src/router/feedback.ts"));
(() => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    // Global Middleware
    app.use(express_1.default.json());
    app.use((0, cookie_parser_1.default)());
    app.use((0, cors_1.default)());
    // Routers
    app.use('/auth', auth_1.default);
    app.use('/comment', comment_1.default);
    app.use('/user', user_1.default);
    app.use('/feedback', feedback_1.default);
    // Error Handler
    app.use((0, error_1.default)());
    // 404 Not Found
    app.use((_, res) => {
        res.status(404).json({
            error: 'NOT_FOUND',
            message: 'The requested ressource was not found',
        });
    });
    // Start the server
    app.listen(process.env.PORT, () => {
        console.info(`Remark API is listening on port ${process.env.PORT}`);
    });
    return 0;
}))();

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map