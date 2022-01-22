const { random } = require("../packages/index");
const defaultValue = require("../config/intervalPointConfig.json");

const {
  healthPoint: { max, min },
} = defaultValue;

const getRandomHealthPoint = () => random.int(min, max);

module.exports = { getRandomHealthPoint };
