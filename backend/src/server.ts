import { loadEnv } from "./config/env.js";
import { createApp } from "./app.js";
import { openDatabase } from "./db/connection.js";

const env = loadEnv();
const db = openDatabase(env.sqlitePath);
const app = createApp(db);

app.listen(env.port, () => {
  console.log(`Planejamento de Ferias API listening on http://localhost:${env.port}`);
});
