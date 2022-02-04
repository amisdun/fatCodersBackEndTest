import express from 'express';
import { farmBuilding } from '../controllers/index';
import { farmBuildingValidator } from '../validator/farmBuildingValidator';
import { validationChecker } from '../validator/validationHandler';

const farmBuildingRouter = express.Router();

farmBuildingRouter.post(
  '/farmBuilding',
  farmBuildingValidator,
  validationChecker,
  farmBuilding.createFarmBuilding,
);

farmBuildingRouter.get('/farmBuilding', farmBuilding.listFarmBuilding);
farmBuildingRouter.get(
  '/farmBuilding/:farmBuildingId',
  farmBuilding.listAssociatedFarmBuilding,
);

export { farmBuildingRouter };
