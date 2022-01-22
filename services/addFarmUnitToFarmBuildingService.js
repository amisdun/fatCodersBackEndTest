const { FarmBuilding } = require("../models/farmBuilding");
const { FarmUnits } = require("../models/farmUnits");
const {
	processTimerCallBackForFarmUnit,
} = require("../taskTimer/timerCallbacks");

const addFarmUnitToFarmBuilding = async (farmData) => {
	const { farmBuildingId, farmUnitId } = farmData;
	const farmBuilding = await FarmBuilding.findByPk(farmBuildingId, {
		include: FarmUnits,
	});
	const farmUnit = await FarmUnits.findByPk(farmUnitId);
	await farmBuilding.addFarmUnit(farmUnit);
	const { taskId } = await processTimerCallBackForFarmUnit(farmUnitId);
	farmUnit.jobId = taskId;
	farmUnit.save();
	return farmBuilding.toJSON();
};

module.exports = { addFarmUnitToFarmBuilding };
