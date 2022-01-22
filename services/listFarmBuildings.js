const { FarmBuilding } = require("../models/farmBuilding");

const listFarmBuilding = async () => {
  const farmBUildings = await FarmBuilding.findAll();
  const data = await Promise.all(
    farmBUildings.map(async (val) => ({
      buildingName: val.buildingName,
      farmUnitType: val.farmUnitType,
      countFarmUnits: await val.countFarmUnits,
    })),
  );
  return data;
};

module.exports = { listFarmBuilding };
