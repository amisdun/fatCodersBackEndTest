const { errorResponse, successResponse } = require("../utils/serverResponse");
const {
  createFarmBuilding,
  listFarmBuilding,
  listFarmUnitsLinkedToFarmBuilding,
} = require("../services/index");

class farmBuildingController {
  async createFarmBuilding(request, response) {
    try {
      const data = await createFarmBuilding(request.body);
      successResponse(response, data);
    } catch (error) {
      errorResponse(response, error);
    }
  }

  async listFarmBuilding(request, response) {
    try {
      const data = await listFarmBuilding();
      successResponse(response, data);
    } catch (error) {
      errorResponse(response, error);
    }
  }

  async listAssociatedFarmBuilding(request, response) {
    try {
      const { farmBuildingId } = request.params;
      const data = await listFarmUnitsLinkedToFarmBuilding(farmBuildingId);
      successResponse(response, data);
    } catch (error) {
      errorResponse(response, error);
    }
  }
}

const farmBuilding = new farmBuildingController();

module.exports = { farmBuilding };
