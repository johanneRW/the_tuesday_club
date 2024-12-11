import axios from "axios";

const apiClientWhitCredentials = axios.create({
  baseURL: import.meta.env.VITE_APT_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials:true,
  paramsSerializer: {
    indexes: null, // no brackets at all
  },
});


apiClientWhitCredentials.interceptors.response.use(
  (response) => response, 
  (error) => {
    
    console.error("API Error:", error.response?.data || error.message);
   
    return Promise.reject(error);
  }
);

export default apiClientWhitCredentials;
