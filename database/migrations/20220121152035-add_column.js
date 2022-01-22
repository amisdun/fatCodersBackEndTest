"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     */
    await Promise.all([
      queryInterface.addColumn("FarmUnits", "createdAt", {
        allowNull: false,
        type: Sequelize.DATE,
      }),
      queryInterface.addColumn("FarmUnits", "updatedAt", {
        allowNull: false,
        type: Sequelize.DATE,
      }),
      queryInterface.addColumn("FarmBuildings", "createdAt", {
        allowNull: false,
        type: Sequelize.DATE,
      }),
      queryInterface.addColumn("FarmBuildings", "updatedAt", {
        allowNull: false,
        type: Sequelize.DATE,
      }),
    ]);
  },

  async down(queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await Promise.all([
      queryInterface.removeColumn("FarmBuildings", "updatedAt"),
      queryInterface.removeColumn("FarmBuildings", "createdAt"),
      queryInterface.removeColumn("FarmUnits", "createdAt"),
      queryInterface.removeColumn("FarmUnits", "updatedAt"),
    ]);
  },
};
