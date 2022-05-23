"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = void 0;
const config_1 = __importDefault(require("./config"));
const decodeToken = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = _req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    try {
        if (token === undefined) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        else {
            const decodeValue = yield config_1.default.admin.auth().verifyIdToken(token);
            if (decodeValue != null || decodeValue != undefined) {
                return next();
            }
            return res.json({ message: "Unauthorized" });
        }
    }
    catch (error) {
        if (error.code === "auth/id-token-expired") {
            return res.json({ message: "Token Expired" }).status(400);
        }
        else if (error.code == "auth/argument-error") {
            return res.json({ message: "Invalid Token" }).status(400);
        }
        else {
            return res.json({ message: "Internal Server Error" }).status(500);
        }
    }
});
exports.decodeToken = decodeToken;
//# sourceMappingURL=manage.token.js.map