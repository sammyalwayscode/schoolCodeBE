"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const lectureModel = new mongoose_1.default.Schema({
    lecturePerformance: {
        type: Number,
        require: true,
    },
    subjectName: {
        type: String,
        require: true,
    },
    className: {
        type: String,
        require: true,
    },
    subjectTopic: {
        type: String,
        require: true,
    },
    subjectDetails: {
        type: String,
        require: true,
    },
    lectureCode: {
        type: String,
        require: true,
    },
    time: {
        type: String,
        require: true,
    },
    classes: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "classes",
    },
    teacher: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "tests",
    },
    rated: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "ratingLectures",
        },
    ],
    students: [{ type: String }],
    teacherName: {
        type: String,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("lectures", lectureModel);
