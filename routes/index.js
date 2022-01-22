const { farmBuildingRouter } = require("./farmBuildingRouter");
const { farmUnitRouter } = require("./farmUnits");
const { express } = require("../packages/index");

const routers = express();

routers.use("/api", farmBuildingRouter);
routers.use("/api", farmUnitRouter);

module.exports = { routers };
