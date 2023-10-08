const {Sequelize} = require('sequelize')

const sequelize  = new Sequelize('iqube_pms_task','postgres',`${process.env.DATABASE_PASSWORD}`,{
    host:'localhost',
    dialect:'postgres'
})

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

module.exports = sequelize;