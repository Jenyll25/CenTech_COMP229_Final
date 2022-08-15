"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { ObjectId } = require('mongodb');
const Schema = mongoose_1.default.Schema;
let AnswerSchema = new Schema({
    surveyId: String,
    answer: Array
}, {
    collection: "answers"
});
const Model = mongoose_1.default.model("Answer", AnswerSchema);
exports.default = Model;
//# sourceMappingURL=answer.js.map