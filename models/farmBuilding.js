const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../database/dbConnection');
const { FarmUnits } = require("./farmUnits");

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
  { sequelize, modelName: "FarmBuilding", timestamps: true }
);

FarmBuilding.hasMany(FarmUnits, { foreignKey: "farmBuildingId" });

module.exports = { FarmBuilding };
