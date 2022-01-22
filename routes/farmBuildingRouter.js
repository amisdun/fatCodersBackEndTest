const { express } = require("../packages/index");

const farmBuildingRouter = express.Router();
const { farmBuilding } = require("../controllers/index");
const { farmBuildingValidator } = require("../validator/farmBuildingValidator");
const { validationChecker } = require("../validator/validationHandler");

farmBuildingRouter.post(
  "/farmBuilding",
  farmBuildingValidator,
  validationChecker,
  farmBuilding.createFarmBuilding
);

farmBuildingRouter.get("/farmBuilding", farmBuilding.listFarmBuilding);
farmBuildingRouter.get(
  "/farmBuilding/:farmBuildingId",
  farmBuilding.listAssociatedFarmBuilding
);

module.exports = { farmBuildingRouter };
