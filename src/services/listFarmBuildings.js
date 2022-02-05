import { FarmBuilding } from '../models/farmBuilding';
import { sequelize } from '../models/index';

const listFarmBuilding = async () => {
  const result = await sequelize.transaction(async (t) => {
    const farmBUildings = await FarmBuilding.findAll({
      transaction: t,
      skipLocked: true,
    });
    return farmBUildings;
  });

  const data = await Promise.all(
    result.map(async (val) => ({
      buildingName: val.buildingName,
      farmUnitType: val.farmUnitType,
      countFarmUnits: await val.countFarmUnits,
    })),
  );
  return data;
};

export { listFarmBuilding };
