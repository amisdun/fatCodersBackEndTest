import { FarmUnits } from '../models/farmUnits';
import { getRandomHealthPoint } from './getRandom';

const createFarmUnit = async (farmUnitData) => {
  const healthPoint = getRandomHealthPoint();
  farmUnitData.healthPoint = healthPoint;
  farmUnitData.remainingHealthPoint = healthPoint;
  farmUnitData.status = 'alive';
  farmUnitData.lostPointsInLastPastSixtySec = 0;
  const data = await FarmUnits.create(farmUnitData);
  return data.toJSON();
};

export { createFarmUnit };
