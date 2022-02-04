import { FarmBuilding } from '../models/farmBuilding';
import { FarmUnits } from '../models/farmUnits';
import { assertDataByPk } from './assertData';
import { sequelize } from '../models/index';

const listFarmUnitsLinkedToFarmBuilding = async (id) => {
  const result = await sequelize.transaction(async (t) => {
    await assertDataByPk(FarmBuilding, id);
    const farmBuilding = await FarmBuilding.findByPk(id, {
      include: FarmUnits,
      transaction: t,
    });
    return farmBuilding.toJSON();
  });
  return result;
};

export { listFarmUnitsLinkedToFarmBuilding };
