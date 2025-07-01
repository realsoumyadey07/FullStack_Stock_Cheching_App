import axios from "axios";
import { getEnv } from "../common";

export const fundApi = axios.create({
     baseURL: getEnv("VITE_BASE_URL"),
     // withCredentials: true,
     headers: {
          "Content-Type": "application/json"
     }
})