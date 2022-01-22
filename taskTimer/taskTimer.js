const { TaskTimer } = require("tasktimer");

const farmUnitTimer = new TaskTimer(1000);
const farmBuildingTimer = new TaskTimer(1000);

module.exports = { farmUnitTimer, farmBuildingTimer };
