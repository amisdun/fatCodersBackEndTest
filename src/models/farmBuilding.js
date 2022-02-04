import { Model, DataTypes } from 'sequelize';
import { sequelize } from './index';
import { FarmUnits } from './farmUnits';

class FarmBuilding extends Model {}

FarmBuilding.init(
  {
    buildingName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    farmUnitType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jobId: {
      type: DataTypes.STRING,
    },
    countFarmUnits: {
      type: DataTypes.VIRTUAL,
      async get() {
        const farmUnits = await this.getFarmUnits();
        return farmUnits.length;
      },
    },
  },
  { sequelize, modelName: 'FarmBuilding', timestamps: true },
);

FarmBuilding.hasMany(FarmUnits, { foreignKey: 'farmBuildingId' });

export { FarmBuilding };
