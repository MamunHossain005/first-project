import { z } from 'zod';

// UserName Schema
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(20, 'First name cannot be more than 20 characters')
    .refine(
      (value) =>
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() === value,
      {
        message: 'First name must be capitalized',
      },
    ),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .regex(/^[a-zA-Z]+$/, { message: 'Last name must contain only alphabets' }),
});

// Address Schema
const addressValidationSchema = z.object({
  permanent: z.string().nonempty('Permanent address is required'),
  current: z.string().nonempty('Current address is required'),
});

// Guardian Schema
const guardianValidationSchema = z.object({
  fatherName: z.string().nonempty('Father name is required'),
  fatherOccupation: z.string().nonempty('Father occupation is required'),
  fatherContactNo: z.string().regex(/^[0-9]{10,15}$/, {
    message: 'Father contact number must be valid and contain 10-15 digits',
  }),
  motherName: z.string().nonempty('Mother name is required'),
  motherOccupation: z.string().nonempty('Mother occupation is required'),
  motherContactNo: z.string().regex(/^[0-9]{10,15}$/, {
    message: 'Mother contact number must be valid and contain 10-15 digits',
  }),
});

// Local Guardian Schema
const localGuardianValidationSchema = z.object({
  name: z.string().nonempty('Local guardian name is required'),
  occupation: z.string().nonempty('Local guardian occupation is required'),
  contactNo: z.string().regex(/^[0-9]{10,15}$/, {
    message:
      'Local guardian contact number must be valid and contain 10-15 digits',
  }),
  address: z.string().nonempty('Local guardian address is required'),
});

// Main Student Schema
const studentValidationSchema = z.object({
  id: z.string().nonempty('Student ID is required'),
  password: z.string().nonempty('Student password is required').min(6).max(30),
  name: userNameValidationSchema,
  gender: z.enum(['male', 'female', 'other'], {
    message: 'Gender must be one of [male, female, other]',
  }),
  dateOfBirth: z.string().nonempty('Date of birth is required'), // Can also be `z.date()` if working with JS Date objects
  email: z
    .string()
    .email('Email must be a valid email address')
    .nonempty('Email is required'),
  contactNo: z.string().regex(/^[0-9]{10,15}$/, {
    message: 'Contact number must be valid and contain 10-15 digits',
  }),
  emergencyContactNo: z.string().regex(/^[0-9]{10,15}$/, {
    message: 'Emergency contact number must be valid and contain 10-15 digits',
  }),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .optional(),
  address: addressValidationSchema,
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImage: z
    .string()
    .url('Profile image must be a valid URL')
    .optional()
    .default('https://example.com/default-profile.png'),
  isActive: z.enum(['active', 'blocked']).optional().default('active'),
  isDeleted: z.boolean().default(false),
});

export default studentValidationSchema;
