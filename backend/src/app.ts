import helmet from "helmet";
import cors from "cors";
import express from "express";
import path from "path";

import { defaultMaxRequestBodySize } from "./constants/defaultConfig.constants";
import { router } from "./routes";
import { env } from "./utils/env.utils";
import { errorMiddleware } from "./middleware/errorMiddleware";

export const app = express();

app.use(cors({ origin: env.CLIENT_BASE_URL }));
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(express.json({ limit: defaultMaxRequestBodySize }));

app.use("/static", express.static(path.resolve(env.UPLOAD_DIR)));
app.use("/api/v1", router);

app.use(errorMiddleware);
