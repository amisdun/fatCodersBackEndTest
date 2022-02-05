import { FarmUnits } from '../models/farmUnits';
import { checkTimeLastFed } from './checkDateLastFed';
import { farmUnitTimer } from '../taskTimer/taskTimer';
import { sequelize } from '../models/index';

const feedFarmUnit = async (farmUnitId) => {
  await sequelize.transaction(async (t) => {
    const farmUnit = await FarmUnits.findOne({
      where: { id: farmUnitId, status: 'alive' },
      transaction: t,
      lock: t.LOCK.UPDATE,
    });
    if (!farmUnit?.farmBuildingId)
      throw new Error('Please add Farm unit to a farm building');
    const FeedDate = new Date();
    await checkTimeLastFed(FeedDate, farmUnit.dateLastFed);
    const pointRegain = Math.round(farmUnit.lostPointsInLastPastSixtySec / 2);
    const feedPoint = farmUnit.healthPoint + 1 + pointRegain;
    farmUnit.healthPoint = feedPoint;
    const remainingHealthPoint =
      farmUnit.remainingHealthPoint + 1 + pointRegain;
    const dateLastFed = FeedDate;
    await FarmUnits.update(
      {
        healthPoint: feedPoint,
        remainingHealthPoint,
        dateLastFed,
      },
      { where: { id: farmUnitId, status: 'alive' }, transaction: t },
    );
    farmUnitTimer?.get(farmUnit.jobId)?.reset();
  });
};

export { feedFarmUnit };
