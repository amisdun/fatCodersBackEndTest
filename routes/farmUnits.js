const { express } = require("../packages/index");

const farmUnitRouter = express.Router();
const { farmUnit } = require("../controllers/index");
const { farmUnitValidator } = require("../validator/farmUnitsValidator");
const { validationChecker } = require("../validator/validationHandler");

farmUnitRouter.post(
	"/farmUnit",
	farmUnitValidator,
	validationChecker,
	farmUnit.createFarmUnits,
);
farmUnitRouter.put(
	"/farmUnit/:farmBuildingId/:farmUnitId",
	farmUnit.addFarmUnitToBuilding,
);
farmUnitRouter.put("/farmUnit/:farmUnitId", farmUnit.feedFarmUnits);

module.exports = { farmUnitRouter };
