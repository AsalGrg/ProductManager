
import axios from "axios";
const api = axios.create({

  baseURL: "https://productify-wuhv.onrender.com",
  // baseURL: "http://localhost:8000",
  withCredentials: true, // important for cookies
  headers: {
    "Content-Type": "application/json",
  },
});

export default api