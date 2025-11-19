import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3001/api", // Backend route
});

export default API;
