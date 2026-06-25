import "dotenv/config";
import path from "node:path";
import { fileURLToPath } from "node:url";

const backendRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");

export type AppEnv = {
  port: number;
  sqlitePath: string;
  sessionCookieName: string;
  frontendOrigin: string;
};

export function loadEnv(): AppEnv {
  return {
    port: Number(process.env.PORT ?? 3000),
    sqlitePath: process.env.SQLITE_PATH ?? path.join(backendRoot, "data", "app.db"),
    sessionCookieName: process.env.SESSION_COOKIE_NAME ?? "session",
    frontendOrigin: process.env.FRONTEND_ORIGIN ?? "http://localhost:5173"
  };
}
