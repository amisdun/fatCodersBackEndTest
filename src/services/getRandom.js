import random from 'random';
import defaultValue from '../config/intervalPointConfig.json';

const {
  healthPoint: { max, min },
} = defaultValue;

const getRandomHealthPoint = () => random.int(min, max);

export { getRandomHealthPoint };
