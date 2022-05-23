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
exports.commentRouter = void 0;
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const database_service_1 = require("../services/database.service");
const validator_1 = __importDefault(require("../utilities/validator"));
const manage_token_1 = require("../firebase/manage.token");
//Schema Joi
const comment_schema_joi_1 = __importDefault(require("../schemas-joi/comment.schema.joi"));
exports.commentRouter = express_1.default.Router();
//Middleare
exports.commentRouter.use(express_1.default.json());
exports.commentRouter.get("/", manage_token_1.decodeToken, (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comments = yield database_service_1.collection.comments.find({}).toArray();
        res.status(200).json(comments);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
exports.commentRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
        const query = { _id: new mongodb_1.ObjectId(id) };
        const comment = yield database_service_1.collection.comments.findOne(query);
        if (comment) {
            res.status(200).json(comment);
        }
        else {
            res.status(500).json({ message: "Comment not found" });
        }
    }
    catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
}));
exports.commentRouter.post("/", validator_1.default.body(comment_schema_joi_1.default), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newComment = req.body;
        const result = yield database_service_1.collection.comments.insertOne(newComment);
        result
            ? res.status(201).json(`Successfully created a new Comment with id ${result.insertedId}`)
            : res.status(500).json({ message: "Failed to create a new Comment." });
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
}));
exports.commentRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const id = (_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.id;
        const updatedComment = req.body;
        const query = { _id: new mongodb_1.ObjectId(id) };
        const result = yield database_service_1.collection.comments.updateOne(query, { $set: updatedComment });
        result
            ? res.status(200).json(`Successfully updated comment with id ${id}`)
            : res.status(304).json({ message: `comment with id: ${id} not updated` });
    }
    catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
}));
exports.commentRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const id = (_c = req === null || req === void 0 ? void 0 : req.params) === null || _c === void 0 ? void 0 : _c.id;
        const query = { _id: new mongodb_1.ObjectId(id) };
        const result = yield database_service_1.collection.comments.deleteOne(query);
        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed comment with id ${id}`);
        }
        else if (!result) {
            res.status(400).json({ message: `Failed to remove comment with id ${id}` });
        }
        else if (!result.deletedCount) {
            res.status(404).json({ message: `Comment with id ${id} does not exist` });
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
}));
//# sourceMappingURL=comments.route.js.map