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
exports.viewTeacherAllTest = exports.viewTeacherTest = exports.viewTopTest = exports.viewTest = exports.createTest = void 0;
const teacherModel_1 = __importDefault(require("../model/teacherModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const testModel_1 = __importDefault(require("../model/testModel"));
const crypto_1 = __importDefault(require("crypto"));
const subjectModel_1 = __importDefault(require("../model/subjectModel"));
const createTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const code = crypto_1.default.randomBytes(3).toString("hex");
        const { subjectTest, time, testDetails, gradeScore } = req.body;
        const getSubject = yield subjectModel_1.default.findById(req.params.subjectID);
        const getTeacher = yield teacherModel_1.default.findById(req.params.id);
        if (getTeacher.name === (getSubject === null || getSubject === void 0 ? void 0 : getSubject.subjectTeacher) || getTeacher) {
            const test = yield testModel_1.default.create({
                testCode: code,
                gradeScore,
                time,
                testDetails,
                teacherName: getTeacher.name,
                subjectTest: getSubject.subjectName,
            });
            getSubject.test.push(new mongoose_1.default.Types.ObjectId(test._id));
            getSubject === null || getSubject === void 0 ? void 0 : getSubject.save();
            getTeacher.test.push(new mongoose_1.default.Types.ObjectId(test === null || test === void 0 ? void 0 : test._id));
            getTeacher === null || getTeacher === void 0 ? void 0 : getTeacher.save();
            return res.status(201).json({
                message: "tested created",
                data: test,
            });
        }
        else {
            return res.status(404).json({ message: "School can't be found" });
        }
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.createTest = createTest;
const viewTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const test = yield subjectModel_1.default.findById(req.params.id).populate({
            path: "test",
            options: {
                sort: { createdAt: -1 },
            },
        });
        return res.status(200).json({
            message: "viewing test",
            data: test,
        });
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.viewTest = viewTest;
const viewTopTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const test = yield subjectModel_1.default.findById(req.params.id).populate({
            path: "test",
            options: {
                sort: { createdAt: -1 },
                limit: 1,
            },
        });
        return res.status(200).json({
            message: "viewing test",
            data: test,
        });
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.viewTopTest = viewTopTest;
const viewTeacherTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const test = yield teacherModel_1.default.findById(req.params.id).populate({
            path: "test",
            options: {
                sort: { createdAt: -1 },
                limit: 1,
            },
        });
        return res.status(200).json({
            message: "viewing test",
            data: test,
        });
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.viewTeacherTest = viewTeacherTest;
const viewTeacherAllTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const test = yield teacherModel_1.default.findById(req.params.id).populate({
            path: "test",
            options: {
                sort: { createdAt: -1 },
            },
        });
        return res.status(200).json({
            message: "viewing test",
            data: test,
        });
    }
    catch (error) {
        return res.status(404).json({ message: `Error: ${error}` });
    }
});
exports.viewTeacherAllTest = viewTeacherAllTest;
