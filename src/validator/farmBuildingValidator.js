import expressValidator from 'express-validator';

export const farmBuildingValidator = [
  expressValidator
    .check('buildingName')
    .notEmpty()
    .withMessage('Building Name is required'),
  expressValidator
    .check('farmUnitType')
    .notEmpty()
    .withMessage('farm unity type is required'),
];
