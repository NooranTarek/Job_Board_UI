import axios from "axios";
const base_url = import.meta.env.VITE_base_url;
const axiosInstance = axios.create({
  baseURL: `${base_url}`,
});

export default axiosInstance;
