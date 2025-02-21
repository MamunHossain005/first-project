import { Model } from 'mongoose';

// Type definitions for TStudent Module
export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TAddress = {
  permanent: string;
  current: string;
};

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TStudent = {
  id: string;
  password: string;
  name: TUserName;
  gender: 'male' | 'female' | 'other';
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  address: TAddress;
  guardian: TGuardian;
  localGuardian?: TLocalGuardian;
  profileImage?: string;
  isActive: 'active' | 'blocked';
  isDeleted: boolean;
};

//for creating static methods
export interface StudentModel extends Model<TStudent> {
  isUserExist(id: string): Promise<TStudent | null>;
}

//for crating instance methods
// export interface StudentMethods {
//   isUserExist(id: string): Promise<TStudent | null>;
// }

// export type StudentModel = Model<TStudent, object, StudentMethods>;
