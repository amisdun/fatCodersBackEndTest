import { FarmBuilding } from '../models/farmBuilding';
import { processTimerCallBackForFarmBuilding } from '../taskTimer/timerCallbacks';

const createFarmBuilding = async (farmBuildingData) => {
  const farmBuilding = await FarmBuilding.create(farmBuildingData);
  const { taskId } = processTimerCallBackForFarmBuilding(farmBuilding.id);
  farmBuilding.jobId = taskId;
  farmBuilding.save();
  return farmBuilding.toJSON();
};

export { createFarmBuilding };
