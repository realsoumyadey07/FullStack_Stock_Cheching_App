import axios from "axios";

const mfApi = axios.create({
  baseURL: "https://api.mfapi.in/mf",
  timeout: 10000, 
});

export default mfApi;