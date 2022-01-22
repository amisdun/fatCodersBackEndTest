const { FarmBuilding } = require("../models/farmBuilding");
const { FarmUnits } = require("../models/farmUnits");
const { assertDataByPk } = require("./assertData");

const listFarmUnitsLinkedToFarmBuilding = async (id) => {
	await assertDataByPk(FarmBuilding, id);
	const farmBuilding = await FarmBuilding.findByPk(id, { include: FarmUnits });
	return farmBuilding.toJSON();
};

module.exports = { listFarmUnitsLinkedToFarmBuilding };
