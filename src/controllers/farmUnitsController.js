import { errorResponse, successResponse } from '../utils/serverResponse';
import {
  createFarmUnit,
  feedFarmUnit,
  addFarmUnitToFarmBuilding,
} from '../services/index';

class farmUnitsController {
  async createFarmUnits(request, response) {
    try {
      const data = await createFarmUnit(request.body);
      successResponse(response, data);
    } catch (error) {
      errorResponse(response, error);
    }
  }

  async addFarmUnitToBuilding(request, response) {
    try {
      const { farmBuildingId, farmUnitId } = request.params;
      const data = await addFarmUnitToFarmBuilding({
        farmBuildingId,
        farmUnitId,
      });
      successResponse(response, data);
    } catch (error) {
      errorResponse(response, error);
    }
  }

  async feedFarmUnits(request, response) {
    try {
      const { farmUnitId } = request.params;
      const data = await feedFarmUnit(farmUnitId);
      successResponse(response, data);
    } catch (error) {
      errorResponse(response, error);
    }
  }
}

const farmUnit = new farmUnitsController();

export { farmUnit };
