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

// Fejlinterceptor for debugging
apiClientWhitCredentials.interceptors.response.use(
  (response) => response, // Send svaret videre, hvis det er succesfuldt
  (error) => {
    // Log hele fejlen for debugging
    console.error("API Error:", error.response?.data || error.message);
    // Videregiv fejlen for at lade usePostData håndtere den
    return Promise.reject(error);
  }
);

console.log("Base URL hentet");
export default apiClientWhitCredentials;
