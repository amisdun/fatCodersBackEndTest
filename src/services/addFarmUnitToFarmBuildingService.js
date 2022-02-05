import { FarmBuilding } from '../models/farmBuilding';
import { FarmUnits } from '../models/farmUnits';
import { processTimerCallBackForFarmUnit } from '../taskTimer/timerCallbacks';
import { sequelize } from '../models/index';

const addFarmUnitToFarmBuilding = async (farmData) => {
  const result = await sequelize.transaction(async (t) => {
    const { farmBuildingId, farmUnitId } = farmData;
    const farmBuilding = await FarmBuilding.findByPk(farmBuildingId, {
      transaction: t,
      lock: t.LOCK.UPDATE,
    });
    const farmUnit = await FarmUnits.findByPk(farmUnitId, {
      transaction: t,
      lock: t.LOCK.UPDATE,
    });
    const { taskId } = await processTimerCallBackForFarmUnit(farmUnitId);
    await FarmUnits.update(
      { farmBuildingId: farmBuilding?.id, jobId: taskId },
      { where: { id: farmUnit?.id }, transaction: t },
    );
    return farmBuilding.toJSON();
  });
  return result;
};

export { addFarmUnitToFarmBuilding };
