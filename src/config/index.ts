import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:1337/api",
});

export const SERVER_URL = "http://localhost:1337";
