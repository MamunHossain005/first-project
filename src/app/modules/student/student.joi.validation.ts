import Joi from 'joi';

// Helper for capitalized string validation
const capitalizedString = Joi.string()
  .regex(/^[A-Z][a-z]*$/, 'Capitalized format')
  .max(20)
  .required();

// UserName Schema
const userNameValidationSchema = Joi.object({
  firstName: capitalizedString.messages({
    'string.pattern.name':
      '"{#label}" must start with a capital letter and be properly formatted',
  }),
  middleName: Joi.string().max(20).allow(''), // Optional
  lastName: Joi.string()
    .regex(/^[a-zA-Z]+$/)
    .required()
    .messages({
      'string.pattern.base': '"{#label}" must only contain alphabets',
    }),
});

// Address Schema
const addressValidationSchema = Joi.object({
  permanent: Joi.string().required().messages({
    'string.empty': '"Permanent address" is required',
  }),
  current: Joi.string().required().messages({
    'string.empty': '"Current address" is required',
  }),
});

// Guardian Schema
const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required().messages({
    'string.empty': '"Father name" is required',
  }),
  fatherOccupation: Joi.string().required(),
  fatherContactNo: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .required()
    .messages({
      'string.pattern.base':
        '"Father contact number" must be valid and contain 10-15 digits',
    }),
  motherName: Joi.string().required(),
  motherOccupation: Joi.string().required(),
  motherContactNo: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .required()
    .messages({
      'string.pattern.base':
        '"Mother contact number" must be valid and contain 10-15 digits',
    }),
});

// Local Guardian Schema
const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required(),
  occupation: Joi.string().required(),
  contactNo: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .required()
    .messages({
      'string.pattern.base':
        '"Local guardian contact number" must be valid and contain 10-15 digits',
    }),
  address: Joi.string().required(),
});

// Main Student Schema
const studentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    'string.empty': '"Student ID" is required',
  }),
  name: userNameValidationSchema.required(),
  gender: Joi.string().valid('male', 'female', 'other').required().messages({
    'any.only': '"{#label}" must be one of [male, female, other]',
  }),
  dateOfBirth: Joi.date().required().messages({
    'date.base': '"Date of Birth" must be a valid date',
  }),
  email: Joi.string().email().required().messages({
    'string.email': '"{#label}" must be a valid email address',
  }),
  contactNo: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .required()
    .messages({
      'string.pattern.base':
        '"Contact number" must be valid and contain 10-15 digits',
    }),
  emergencyContactNo: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .required(),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .messages({
      'any.only': '"Blood group" must be a valid blood type',
    }),
  address: addressValidationSchema.required(),
  guardian: guardianValidationSchema.required(),
  localGuardian: localGuardianValidationSchema.required(),
  profileImage: Joi.string()
    .uri()
    .default('https://example.com/default-profile.png'),
  isActive: Joi.string().valid('active', 'blocked').default('active').messages({
    'any.only': '"Status" must be either "active" or "blocked"',
  }),
});

export default studentValidationSchema;
