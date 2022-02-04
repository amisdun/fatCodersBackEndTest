import { FarmUnits } from '../models/farmUnits';
import { checkTimeLastFed } from './checkDateLastFed';
import { farmUnitTimer } from '../taskTimer/taskTimer';
import { sequelize } from '../models/index';
import { Transaction } from 'sequelize';

const feedFarmUnit = async (farmUnitId) => {
  await sequelize.transaction(
    { isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE },
    async (t) => {
      const farmUnit = await FarmUnits.findOne({
        where: { id: farmUnitId, status: 'alive' },
        transaction: t,
      });
      if (!farmUnit?.farmBuildingId)
        throw new Error('Please add Farm unit to a farm building');
      const FeedDate = new Date();
      await checkTimeLastFed(FeedDate, farmUnit.dateLastFed);
      const pointRegain = Math.round(farmUnit.lostPointsInLastPastSixtySec / 2);
      const feedPoint = farmUnit.healthPoint + 1 + pointRegain;
      farmUnit.healthPoint = feedPoint;
      farmUnit.remainingHealthPoint =
        farmUnit.remainingHealthPoint + 1 + pointRegain;
      farmUnit.dateLastFed = FeedDate;
      await farmUnit.save();
      farmUnitTimer?.get(farmUnit.jobId)?.reset();
    },
  );
};

export { feedFarmUnit };
