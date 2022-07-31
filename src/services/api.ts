import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: `http://api.weatherapi.com/v1/current.json?key=a75a590e8db4480588b15336223007&q=`,
});

export default api;
