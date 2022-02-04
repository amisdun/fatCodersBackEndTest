import expressValidator from 'express-validator';

export const farmUnitValidator = [
  expressValidator
    .check('name')
    .notEmpty()
    .withMessage('Name field cannot be empty'),
];
