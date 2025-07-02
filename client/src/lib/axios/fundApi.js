import axios from "axios";
import { getEnv } from "../common";

export const fundApi = axios.create({
     baseURL: getEnv("VITE_BASE_URL"),
     headers: {
          "Content-Type": "application/json"
     }
})