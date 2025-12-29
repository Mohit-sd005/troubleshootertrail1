import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:8080',
})

// ================= AUTH ==================
export const AuthAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getUser: (id) => api.get(`/users/${id}`),
}

// ================= ADS ==================
export const AdsAPI = {
  create: (data) => api.post('/ads/create', data),
  mine: (clientId) => api.get(`/ads/client/${clientId}`),
  active: () => api.get('/ads/active'),
  get: (id) => api.get(`/ads/${id}`),
  update: (id, data) => api.put(`/ads/update/${id}`, data),
  delete: (id) => api.delete(`/ads/delete/${id}`),
  search: (q, minCost, maxCost) =>
    api.get('/ads/search', { params: { q, minCost, maxCost } }),
}

// ================= ACCEPT ==================
export const AcceptAPI = {
  apply: (adId, developerId) =>
    api.post(`/accept/apply?adId=${adId}&developerId=${developerId}`),
  list: (adId) => api.get(`/accept/list/${adId}`),
  select: (adId, developerId) =>
    api.post(`/accept/select?adId=${adId}&developerId=${developerId}`),
}

export default api
