import { Model, DataTypes } from 'sequelize';
import { sequelize } from './index';

class FarmUnits extends Model {}

FarmUnits.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    healthPoint: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dateLastFed: {
      type: DataTypes.DATE,
    },
    remainingHealthPoint: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lostPointsInLastPastSixtySec: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    jobId: {
      type: DataTypes.STRING,
    },
  },
  { sequelize, modelName: 'FarmUnits', timestamps: true },
);

export { FarmUnits };
