import api from "../api.config";
import apiEndpoints from "../api.endpoint";
import { JoinRequest } from "@/app/types/User";
import { HireWorkerData, UpdateWorkerData } from "./utils/workerTypes";

const workerService = {
  hire: async (org_id: number, vacancy_id: number, data: HireWorkerData) => {
    try {
      return await api.post(apiEndpoints.hireWorker(org_id, vacancy_id), data);
    } catch (error) {
      throw error;
    }
  },

  getJoinRequests: async (org_id: number): Promise<JoinRequest[]> => {
    try {
      return (await api.get(apiEndpoints.getJoinRequests(org_id))) as JoinRequest[];
    } catch (error) {
      throw error;
    }
  },

  getJoinRequest: async (org_id: number, req_id: number) => {
    try {
      return await api.get(apiEndpoints.getJoinRequest(org_id, req_id));
    } catch (error) {
      throw error;
    }
  },

  rejectJoinRequest: async (org_id: number, req_id: number) => {
    try {
      return await api.put(apiEndpoints.rejectJoinRequest(org_id, req_id));
    } catch (error) {
      throw error;
    }
  },

  getById: async (org_id: number, id: number) => {
    try {
      return await api.get(apiEndpoints.getWorkerById(org_id, id));
    } catch (error) {
      throw error;
    }
  },

  getAll: async (org_id: number) => {
    try {
      return await api.get(apiEndpoints.getAllWorkers(org_id));
    } catch (error) {
      throw error;
    }
  },

  delete: async (org_id: number, id: number) => {
    try {
      return await api.delete(apiEndpoints.deleteWorker(org_id, id));
    } catch (error) {
      throw error;
    }
  },

  update: async (org_id: number, id: number, data: UpdateWorkerData) => {
    try {
      return await api.put(apiEndpoints.updateWorker(org_id, id), data);
    } catch (error) {
      throw error;
    }
  },
};

export default workerService;
