const { FarmUnits } = require("../models/farmUnits");
const { farmUnitTimer, farmBuildingTimer } = require("./taskTimer");
const defaultValue = require("../config/intervalPointConfig.json");

const processTimerCallBackForFarmUnit = async (id) => {
	const newTask = {
		id: `UNIT-${id}`,
		tickInterval: defaultValue.interval.farmUnitInterval,
		async callback(task) {
			const unitId = task.id?.slice(5);
			const farmUnit = await FarmUnits.findByPk(parseInt(unitId));
			if (farmUnit.status === "dead") {
				return;
			}
			if (farmUnit.remainingHealthPoint > 0) {
				const newHealthPoint = farmUnit.remainingHealthPoint - 1;
				const newLostJob = farmUnit.lostPointsInLastPastSixtySec + 1;
				farmUnit.lostPointsInLastPastSixtySec = newLostJob;
				farmUnit.remainingHealthPoint = newHealthPoint;
				farmUnit.save();
			}
			if (farmUnit.remainingHealthPoint <= 0) {
				farmUnit.status = "dead";
				farmUnit.save();
			}
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
			await FarmUnits.update(
				{ lostPointsInLastPastSixtySec: 0 },
				{ where: { farmBuildingId: parseInt(buildId), status: "alive" } },
			);
		},
	};
	farmBuildingTimer.add(newTask).start();

	return { taskId: newTask.id };
};

module.exports = {
	processTimerCallBackForFarmUnit,
	processTimerCallBackForFarmBuilding,
};
