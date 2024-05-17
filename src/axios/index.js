import axios from "axios";
const base_url = import.meta.env.VITE_base_url;
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

export default axiosInstance;
