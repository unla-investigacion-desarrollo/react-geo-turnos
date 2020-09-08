import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080/reactivar/api/",
  timeout: 10000000,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT, DELETE",
    Accept: "application/json",
  },
});
