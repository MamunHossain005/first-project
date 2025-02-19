import { Schema, model } from 'mongoose';
import {
  StudentMethods,
  StudentModel,
  TAddress,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student.interface';
import validator from 'validator';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [20, 'First name can not be more than 20 characters'],
    validate: {
      validator: function (value: string) {
        const capitalized =
          value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        return capitalized === value;
      },
      message: '{VALUE} is not a capitalize format',
    },
  },
  middleName: { type: String },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last name is required'],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid',
    },
  },
});

const addressSchema = new Schema<TAddress>({
  permanent: {
    type: String,
    trim: true,
    required: [true, 'Permanent address is required'],
  },
  current: {
    type: String,
    trim: true,
    required: [true, 'Current address is required'],
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    trim: true,
    required: [true, 'Father name is required'],
  },
  fatherOccupation: {
    type: String,
    trim: true,
    required: [true, 'Father occupation is required'],
  },
  fatherContactNo: {
    type: String,
    trim: true,
    required: [true, 'Father contact no is required'],
  },
  motherName: {
    type: String,
    trim: true,
    required: [true, 'Mother name is required'],
  },
  motherOccupation: {
    type: String,
    trim: true,
    required: [true, 'Mother occupation is required'],
  },
  motherContactNo: {
    type: String,
    trim: true,
    required: [true, 'Mother contact no is required'],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    trim: true,
    required: [true, 'local guardian name is required'],
  },
  occupation: {
    type: String,
    trim: true,
    required: [true, 'local guardian occupation is required'],
  },
  contactNo: {
    type: String,
    trim: true,
    required: [true, 'local guardian contact no is required'],
  },
  address: {
    type: String,
    trim: true,
    required: [true, 'local guardian address is required'],
  },
});

const studentSchema = new Schema<TStudent, StudentModel, StudentMethods>({
  id: {
    type: String,
    trim: true,
    required: [true, 'student id is required'],
    unique: true,
  },
  name: {
    type: userNameSchema,
    required: [true, 'student name is required'],
  },
  gender: {
    type: String,
    trim: true,
    enum: {
      values: ['male', 'female', 'other'],
      message: '{VALUE} is invalid',
    },
    required: true,
  },
  dateOfBirth: { type: String, trim: true },
  email: {
    type: String,
    trim: true,
    required: [true, 'student date email is required'],
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not valid email address',
    },
  },
  contactNo: {
    type: String,
    trim: true,
    required: [true, 'student contact no is required'],
  },
  emergencyContactNo: {
    type: String,
    trim: true,
    required: [true, 'student emergency contact no is required'],
  },
  bloodGroup: {
    type: String,
    trim: true,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      message: '{VALUE} is invalid',
    },
  },
  address: {
    type: addressSchema,
    required: [true, 'student address is required'],
  },
  guardian: {
    type: guardianSchema,
    required: [true, 'student guardian is required'],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'student local guardian is required'],
  },
  profileImage: { type: String, trim: true },
  isActive: {
    type: String,
    trim: true,
    enum: {
      values: ['active', 'blocked'],
      message: '{VALUE} is invalid',
    },
    default: 'active',
  },
});

studentSchema.method('isUserExist', async function (id: string) {
  const existingUser = await Student.findOne({ id: id });

  return existingUser;
});

const Student = model<TStudent, StudentModel>('Student', studentSchema);
export default Student;
