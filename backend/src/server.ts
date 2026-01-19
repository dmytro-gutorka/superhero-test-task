import { app } from "./app";
import { env } from "./utils/env.utils";

app.listen(env.SERVER_PORT, () => {
    console.log(`Server is working on ${env.SERVER_BASE_URL}`);
});
