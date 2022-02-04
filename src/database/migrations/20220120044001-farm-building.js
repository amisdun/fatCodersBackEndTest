module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     */
    await queryInterface.createTable('FarmBuildings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      buildingName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      jobId: {
        type: Sequelize.STRING,
      },
    });
  },

  async down(queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     */
    await queryInterface.dropTable('FarmBuildings');
  },
};
