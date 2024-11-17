import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_APT_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
console.log('base-url hentet')
export default apiClient;
