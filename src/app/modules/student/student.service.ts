import { TStudent } from './student.interface';
import Student from './student.model';

const createStudentIntoDB = async (studentData: TStudent) => {
  // const result = await Student.create(studentData); //builtin static method
  const student = new Student(studentData); //create an instance

  if (await student.isUserExist(studentData.id)) {
    throw new Error('User already exists!');
  }
  const result = await student.save(); //builtin instance method
  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find(); //builtin static method
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ _id: id });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};
