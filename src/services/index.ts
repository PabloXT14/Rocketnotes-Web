import axios from "axios";

export const api = axios.create({
  baseURL: "https://rocketnotes-api-epnx.onrender.com",
  // baseURL: "http://localhost:3333"
});