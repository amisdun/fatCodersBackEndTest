import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import env from 'dotenv';
import { routers } from './routes/index';

const app = express();

env.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw({ type: '*/*' }));
app.use(bodyParser.text({ type: '*/*' }));
app.use(cors());
app.use('/v1', routers);
app.use('/', (request, response) => {
  response.json({ message: 'hey!!! Fat Cat Coder' });
});

export default app;
