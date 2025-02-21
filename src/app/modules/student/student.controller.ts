import { Request, Response } from 'express';
import { StudentServices } from './student.service';
// import studentValidationSchema from './student.validation';
import studentValidationSchema from './student.zod.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    //data validation using Joi
    // const { error, value } = studentValidationSchema.validate(studentData);

    //data validation using zod
    const zodParsedData = studentValidationSchema.parse(studentData);

    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'Internal Server Error',
    //     error: error.details,
    //   });
    // }

    const result = await StudentServices.createStudentIntoDB(zodParsedData);

    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Internal Server Error',
      error: err,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();

    res.status(200).json({
      success: true,
      message: 'All students are retrieved successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: err,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await StudentServices.getSingleStudentFromDB(id);

    res.status(200).json({
      success: true,
      message: 'Student is retrieved successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Internal Server Error',
      error: err,
    });
  }
};

const deleteSingleStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await StudentServices.deleteSingleStudentFromDB(id);

    res.status(200).json({
      success: true,
      message: 'Student has deleted successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Student has not deleted',
      error: err,
    });
  }
};

export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteSingleStudent,
};
