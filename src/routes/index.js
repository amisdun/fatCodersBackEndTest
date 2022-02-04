import express from 'express';
import { farmBuildingRouter } from './farmBuildingRouter';
import { farmUnitRouter } from './farmUnits';

const routers = express();

routers.use('/api', farmBuildingRouter);
routers.use('/api', farmUnitRouter);

export { routers };
