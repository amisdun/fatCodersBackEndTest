const {
	dateFns: { differenceInSeconds },
} = require("../packages/index");

const checkTimeLastFed = async (dateLastFed, FeedDate) => {
	if (!dateLastFed) return;
	console.log(FeedDate, dateLastFed);
	const exceededFiveSeconds = differenceInSeconds(FeedDate, dateLastFed);
	console.log(exceededFiveSeconds);
	if (Math.abs(exceededFiveSeconds) <= 5)
		throw new Error("You can only feed a farm unit in 5 seconds interval");
	return;
};

module.exports = { checkTimeLastFed };
