import { FarmBuilding } from '../models/farmBuilding';
import { FarmUnits } from '../models/farmUnits';
import { processTimerCallBackForFarmUnit } from '../taskTimer/timerCallbacks';
import { sequelize } from '../models/index';
import { Transaction } from 'sequelize';

const addFarmUnitToFarmBuilding = async (farmData) => {
  const result = await sequelize.transaction(
    { isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE },
    async (t) => {
      const { farmBuildingId, farmUnitId } = farmData;
      const farmBuilding = await FarmBuilding.findByPk(farmBuildingId, {
        transaction: t,
        include: FarmUnits,
      });
      const farmUnit = await FarmUnits.findByPk(farmUnitId, {
        transaction: t,
      });
      await farmBuilding.addFarmUnit(farmUnit);
      const { taskId } = await processTimerCallBackForFarmUnit(farmUnitId);
      farmUnit.jobId = taskId;
      await farmUnit.save();
      return farmBuilding.toJSON();
    },
  );
  return result;
};

export { addFarmUnitToFarmBuilding };
