const { FarmUnits } = require("../models/farmUnits");
const { checkTimeLastFed } = require("./checkDateLastFed");
const { farmUnitTimer } = require("../taskTimer/taskTimer");

const feedFarmUnit = async (farmUnitId) => {
	const farmUnit = await FarmUnits.findOne({
		where: { id: farmUnitId, status: "alive" },
	});
	if (!farmUnit?.farmBuildingId)
		throw new Error("Please add Farm unit to a farm building");
	const FeedDate = new Date();
	await checkTimeLastFed(FeedDate, farmUnit.dateLastFed);
	const pointRegain = Math.round(farmUnit.lostPointsInLastPastSixtySec / 2);
	const feedPoint = farmUnit.healthPoint + 1 + pointRegain;
	farmUnit.healthPoint = feedPoint;
	farmUnit.remainingHealthPoint =
		farmUnit.remainingHealthPoint + 1 + pointRegain;
	farmUnit.dateLastFed = FeedDate;
	await farmUnit.save();
	farmUnitTimer.get(farmUnit.jobId)?.reset();
};

module.exports = { feedFarmUnit };
