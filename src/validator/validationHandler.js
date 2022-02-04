import expressValidator from 'express-validator';
import { errorResponse } from '../utils/serverResponse';

const { validationResult } = expressValidator;

export const validationChecker = (req, res, next) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) return errorResponse(res, error.array());
    next();
  } catch (error) {
    return errorResponse(res, error);
  }
};
