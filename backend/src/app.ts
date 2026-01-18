import express from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path";

import {env} from "./utils/env";
import {DEFAULT_MAX_REQUEST_BODY_SIZE} from "./constants/default-config.constants";

export const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({limit: DEFAULT_MAX_REQUEST_BODY_SIZE}));

app.use("/static", express.static(path.resolve(env.UPLOAD_DIR)));

app.use("/api/v1", '');
