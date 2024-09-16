
import express, { json } from 'express';
import sequelize from './db.mjs';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import authRoute from './routes/authRoute.mjs';
import adminRoute from './routes/adminRoute.mjs';
import userRoute from './routes/userRoute.mjs'
config({ path: './config.env' });

const app = express();
app.use(cookieParser());
app.use(json());
app.use('/', authRoute);
app.use('/api/v1/admin',adminRoute)
app.use('/api/v1/user',userRoute)

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

export default app;

