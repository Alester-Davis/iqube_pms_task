import { Sequelize } from 'sequelize';
import { config } from 'dotenv';

config({ path: './config.env' });
console.log(process.env.DATABASE_PASSWORD)
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

export default sequelize;