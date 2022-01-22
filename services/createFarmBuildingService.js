const { FarmBuilding } = require("../models/farmBuilding");
const {
  processTimerCallBackForFarmBuilding,
} = require("../taskTimer/timerCallbacks");

const createFarmBuilding = async (farmBuildingData) => {
  const farmBuilding = await FarmBuilding.create(farmBuildingData);
  const { taskId } = processTimerCallBackForFarmBuilding(farmBuilding.id);
  farmBuilding.jobId = taskId;
  farmBuilding.save();
  return farmBuilding.toJSON();
};

module.exports = { createFarmBuilding };
