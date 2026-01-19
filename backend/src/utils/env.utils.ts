import dotenv from "dotenv";
import {
    DEFAULT_SERVER_BASE_URL,
    DEFAULT_SERVER_PORT,
    DEFAULT_UPLOAD_DIR,
} from "../constants/defaultEnv.constants";

dotenv.config();

export const env = {
    SERVER_PORT: Number(process.env.SERVER_PORT ?? DEFAULT_SERVER_PORT),
    UPLOAD_DIR: process.env.UPLOAD_DIR ?? DEFAULT_UPLOAD_DIR,
    SERVER_BASE_URL: process.env.SERVER_BASE_URL ?? DEFAULT_SERVER_BASE_URL,
};
