import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_APT_URL,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: {
    indexes: null, // no brackets at all
  }
});
console.log('base-url hentet')
export default apiClient;
