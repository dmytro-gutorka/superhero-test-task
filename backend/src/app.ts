import helmet from "helmet";
import cors from "cors";
import express from "express";
import path from "path";

import { defaultMaxRequestBodySize} from "./constants/defaultConfig.constants";
import { router } from "./routes";
import { env } from "./utils/env.utils";
import { errorMiddleware } from "./middleware/errorMiddleware";

export const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: defaultMaxRequestBodySize }));

app.use("/static", express.static(path.resolve(env.UPLOAD_DIR)));
app.use("/api/v1", router);

app.use(errorMiddleware);
