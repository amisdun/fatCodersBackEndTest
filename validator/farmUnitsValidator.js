const { expressValidator } = require("../packages/index");

const farmUnitValidator = [
  expressValidator
    .check("name")
    .notEmpty()
    .withMessage("Name field cannot be empty"),
];

module.exports = { farmUnitValidator };
