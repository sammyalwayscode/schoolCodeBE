import classModel from "../model/classModel";
import teacherModel from "../model/teacherModel";
import mongoose from "mongoose";
import { Request, Response } from "express";
import testModel from "../model/testModel";
import crypto from "crypto";
import subjectModel from "../model/subjectModel";

export const createTest = async (req: Request, res: Response) => {
  try {
    const code = crypto.randomBytes(3).toString("hex");
    const { subjectTest, time, testDetails, gradeScore } = req.body;

    const getSubject = await subjectModel.findById(req.params.subjectID);

    const getTeacher = await teacherModel.findById(req.params.id);

    if (getTeacher!.name === getSubject?.subjectTeacher || getTeacher) {
      const test = await testModel.create({
        testCode: code,
        gradeScore,
        time,
        testDetails,
        teacherName: getTeacher!.name,
        subjectTest: getSubject!.subjectName,
      });

      getSubject!.test!.push(new mongoose.Types.ObjectId(test._id));
      getSubject?.save();

      getTeacher!.test!.push(new mongoose.Types.ObjectId(test?._id));
      getTeacher?.save();

      return res.status(201).json({
        message: "tested created",
        data: test,
      });
    } else {
      return res.status(404).json({ message: "School can't be found" });
    }
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const viewTest = async (req: Request, res: Response) => {
  try {
    const test = await subjectModel.findById(req.params.id).populate({
      path: "test",
      options: {
        sort: { createdAt: -1 },
      },
    });

    return res.status(200).json({
      message: "viewing test",
      data: test,
    });
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const viewTopTest = async (req: Request, res: Response) => {
  try {
    const test = await subjectModel.findById(req.params.id).populate({
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
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const viewTeacherTest = async (req: Request, res: Response) => {
  try {
    const test = await teacherModel.findById(req.params.id).populate({
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
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};

export const viewTeacherAllTest = async (req: Request, res: Response) => {
  try {
    const test = await teacherModel.findById(req.params.id).populate({
      path: "test",
      options: {
        sort: { createdAt: -1 },
      },
    });

    return res.status(200).json({
      message: "viewing test",
      data: test,
    });
  } catch (error) {
    return res.status(404).json({ message: `Error: ${error}` });
  }
};
