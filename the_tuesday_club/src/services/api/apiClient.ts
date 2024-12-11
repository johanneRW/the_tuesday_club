import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_APT_URL,
  headers: {
    "Content-Type": "application/json",
  },
  
  paramsSerializer: {
    indexes: null, // no brackets at all
  },
});


apiClient.interceptors.response.use(
  (response) => response, 
  (error) => {
   
    console.error("API Error:", error.response?.data || error.message);
   
    return Promise.reject(error);
  }
);


export default apiClient;
