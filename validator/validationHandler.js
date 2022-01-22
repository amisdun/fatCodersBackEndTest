const { expressValidator } = require("../packages/index");

const { validationResult } = expressValidator;
const { errorResponse } = require("../utils/serverResponse");

const validationChecker = (req, res, next) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) return errorResponse(res, error.array());
    next();
  } catch (error) {
    return errorResponse(res, error);
  }
};

module.exports = { validationChecker };
