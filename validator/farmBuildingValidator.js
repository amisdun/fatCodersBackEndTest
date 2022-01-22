const { expressValidator } = require("../packages/index");

const farmBuildingValidator = [
  expressValidator
    .check("buildingName")
    .notEmpty()
    .withMessage("Building Name is required"),
  expressValidator
    .check("farmUnitType")
    .notEmpty()
    .withMessage("farm unity type is required"),
];

module.exports = { farmBuildingValidator };
