module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     */
    await queryInterface.createTable('FarmUnits', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      healthPoint: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      dateLastFed: {
        type: Sequelize.DATE,
      },
      remainingHealthPoint: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lostPointsInLastPastSixtySec: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      jobId: {
        type: Sequelize.STRING,
      },
      farmBuildingId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'FarmBuildings',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    });
  },

  async down(queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     */
    await queryInterface.dropTable('FarmUnits');
  },
};
