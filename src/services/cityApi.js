import apiClient from "./apiClient";

export const getServices = () => apiClient.get("/api/services");
export const createService = (payload) => apiClient.post("/api/admin/services", payload);
export const updateService = (id, payload) => apiClient.put(`/api/admin/services/${id}`, payload);
export const deleteService = (id) => apiClient.delete(`/api/admin/services/${id}`);

export const getIssues = () => apiClient.get("/api/issues");
export const createIssue = (payload) => apiClient.post("/api/issues", payload);
export const updateIssueStatus = (id, payload) => apiClient.put(`/api/admin/issues/${id}/status`, payload);
export const deleteIssue = (id) => apiClient.delete(`/api/admin/issues/${id}`);

