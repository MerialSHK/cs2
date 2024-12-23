const API_URL = import.meta.env.PROD 
  ? 'https://api.your-domain.com'  // Produktions-URL
  : 'http://localhost:8000';       // Entwicklungs-URL

export const API_ENDPOINTS = {
  auth: {
    login: `${API_URL}/auth/login/`,
    register: `${API_URL}/auth/register/`,
    profile: `${API_URL}/auth/profile/`,
  },
  investments: {
    list: `${API_URL}/investments/`,
    transactions: `${API_URL}/transactions/`,
  },
  notifications: {
    list: `${API_URL}/notifications/`,
    unread: `${API_URL}/notifications/unread/`,
  },
};