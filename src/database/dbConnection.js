const { sequelize: sequelizeDB, config } = require('../packages/index');

const { Sequelize } = sequelizeDB;
config();
const { POSTGRES_USER, POSTGRES_DB, POSTGRES_PASSWORD, POSTGRES_HOST } =
  process.env;

// PostgresDB connection
const sequelize = new Sequelize(POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, {
  host: POSTGRES_HOST,
  dialect: 'postgres',
});
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established');
  })
  .catch((err) => {
    console.log('unable to connect to db', err);
  });

module.exports = { sequelize };
