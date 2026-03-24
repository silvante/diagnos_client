import api from "../api.config";
import apiEndpoints from "../api.endpoint";
import { CreateClientType, UpdateClientType } from "./utils/clientTypes";

const clientService = {
  getTodaysClients: async (org_id: number) => {
    try {
      return await api.get(apiEndpoints.getTodaysClients(org_id));
    } catch (error) {
      throw error;
    }
  },

  createClient: async (org_id: number, data: CreateClientType) => {
    try {
      return await api.post(apiEndpoints.createClient(org_id), data);
    } catch (error) {
      throw error;
    }
  },

  checkClient: async (
    org_id: number,
    client_id: number,
    diagnosis_id: number,
    report: string,
  ) => {
    try {
      return await api.put(
        apiEndpoints.checkClient(org_id, client_id, diagnosis_id),
        {
          report,
        },
      );
    } catch (error) {
      throw error;
    }
  },

  updateClient: async (
    org_id: number,
    client_id: number,
    data: UpdateClientType,
  ) => {
    try {
      return await api.put(apiEndpoints.updateClient(org_id, client_id), data);
    } catch (error) {
      throw error;
    }
  },

  deleteClient: async (org_id: number, client_id: number) => {
    try {
      return await api.delete(apiEndpoints.deleteClient(org_id, client_id));
    } catch (error) {
      throw error;
    }
  },

  search: async (
    org_id: number,
    page: number,
    limit: number,
    name: string = "",
    surname: string = "",
    born_in?: number,
    type_id?: number,
  ) => {
    try {
      return await api.get(
        apiEndpoints.searchClients(
          org_id,
          page,
          limit,
          name,
          surname,
          born_in,
          type_id,
        ),
      );
    } catch (error) {
      throw error;
    }
  },

  getByDate: async (
    org_id: number,
    date: string,
    page: number = 1,
    limit: number = 10,
  ) => {
    try {
      return await api.get(
        apiEndpoints.getClientsByDate(org_id, date, page, limit),
      );
    } catch (error) {
      throw error;
    }
  },
};

export default clientService;
