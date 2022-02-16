import { FarmUnits } from '../models/farmUnits';
import { farmUnitTimer, farmBuildingTimer } from './taskTimer';
import defaultValue from '../config/intervalPointConfig.json';
import { sequelize } from '../models/index';

const processTimerCallBackForFarmUnit = async (id) => {
  const newTask = {
    id: `UNIT-${id}`,
    tickInterval: defaultValue.interval.farmUnitInterval,
    async callback(task) {
      await sequelize.transaction(async (t) => {
        const unitId = task.id?.slice(5);
        const farmUnit = await FarmUnits.findByPk(parseInt(unitId), {
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
        if (farmUnit.status === 'dead') {
          return;
        }
        if (farmUnit.remainingHealthPoint > 0) {
          const newHealthPoint = farmUnit.remainingHealthPoint - 1;
          const newLostJob = farmUnit.lostPointsInLastPastSixtySec + 1;
          const lostPointsInLastPastSixtySec = newLostJob;
          const remainingHealthPoint = newHealthPoint;
          await FarmUnits.update(
            {
              lostPointsInLastPastSixtySec,
              remainingHealthPoint,
            },
            { where: { id: parseInt(unitId) }, transaction: t },
          );
        }
        if (farmUnit.remainingHealthPoint <= 0) {
          const status = 'dead';
          await FarmUnits.update(
            { status },
            { where: { id: parseInt(unitId) }, transaction: t },
          );
        }
      });
    },
  };
  farmUnitTimer.add(newTask).start();

  return { taskId: newTask.id };
};

const processTimerCallBackForFarmBuilding = (id) => {
  const newTask = {
    id: `BUILD-${id}`,
    tickInterval: defaultValue.interval.farmBuildInterval,
    async callback(task) {
      const buildId = task.id?.slice(6);
      await sequelize.transaction(async (t) => {
        await FarmUnits.findOne({
          where: { farmBuildingId: parseInt(buildId), status: 'alive' },
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
        await FarmUnits.update(
          { lostPointsInLastPastSixtySec: 0 },
          {
            where: { farmBuildingId: parseInt(buildId), status: 'alive' },
            transaction: t,
          },
        );
      });
    },
  };
  farmBuildingTimer.add(newTask).start();

  return { taskId: newTask.id };
};

export { processTimerCallBackForFarmUnit, processTimerCallBackForFarmBuilding };
