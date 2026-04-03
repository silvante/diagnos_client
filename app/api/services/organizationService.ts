import api from "../api.config";
import apiEndpoints from "../api.endpoint";
import {
  createData,
  updateData,
  updatePincodeData,
  validateData,
} from "./utils/organizationTypes";

const organizationService = {
  getAll: async () => {
    try {
      return await api.get(apiEndpoints.getUsersOrganizations);
    } catch (error) {
      throw error;
    }
  },

  getByUniqueName: async (unique_name: string) => {
    try {
      return await api.get(apiEndpoints.getOrganizationByUniqueName(unique_name));
    } catch (error) {
      throw error;
    }
  },

  create: async (data: createData) => {
    try {
      return await api.post(apiEndpoints.createOrganization, data);
    } catch (error) {
      throw error;
    }
  },

  validate: async (unique_name: string, data: validateData) => {
    try {
      return await api.post(
        apiEndpoints.validateOrganization(unique_name),
        data
      );
    } catch (error) {
      throw error;
    }
  },

  update: async (unique_name: string, data: updateData) => {
    try {
      return await api.put(apiEndpoints.updateOrganization(unique_name), data);
    } catch (error) {
      throw error;
    }
  },

  updatePincode: async (unique_name: string, data: updatePincodeData) => {
    try {
      return await api.put(
        apiEndpoints.updateOrganizationPincode(unique_name),
        data
      );
    } catch (error) {
      throw error;
    }
  },

  setAsDefault: async (unique_name: string) => {
    try {
      return await api.post(apiEndpoints.setOrganizationAsDefault(unique_name));
    } catch (error) {
      throw error;
    }
  },

  findOrganizations: async (unique_name: string) => {
    try {
      return await api.get(apiEndpoints.findOrganizations(unique_name));
    } catch (error) {
      throw error;
    }
  },

  joinOrganizationRequest: async (unique_name: string, role: "receptionist" | "doctor") => {
    try {
      return await api.post(
        apiEndpoints.joinOrganizationsRequest(unique_name),
        {role}
      );
    } catch (error) {
      throw error;
    }
  }
};

export default organizationService;
