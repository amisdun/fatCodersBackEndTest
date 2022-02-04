import express from 'express';
import { farmUnit } from '../controllers/index';
import { farmUnitValidator } from '../validator/farmUnitsValidator';
import { validationChecker } from '../validator/validationHandler';

const farmUnitRouter = express.Router();

farmUnitRouter.post(
  '/farmUnit',
  farmUnitValidator,
  validationChecker,
  farmUnit.createFarmUnits,
);
farmUnitRouter.put(
  '/farmUnit/:farmBuildingId/:farmUnitId',
  farmUnit.addFarmUnitToBuilding,
);
farmUnitRouter.put('/farmUnit/:farmUnitId', farmUnit.feedFarmUnits);

export { farmUnitRouter };
