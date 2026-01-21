import axios from "axios";
import { SERVER_BASE_URL } from "../constants/defaultEnv.constants.ts";

export const http = axios.create({
    baseURL: import.meta.env.VITE_SERVER_BASE_URL ?? SERVER_BASE_URL,
});
