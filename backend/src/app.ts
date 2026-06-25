import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { loadEnv } from "./config/env.js";
import type { Db } from "./db/connection.js";
import { migrate } from "./db/migrate.js";
import { authRoutes } from "./api/auth.routes.js";
import { teamsRoutes } from "./api/teams.routes.js";
import { employeesRoutes } from "./api/employees.routes.js";
import { vacationsRoutes } from "./api/vacations.routes.js";
import { dayOffsRoutes } from "./api/dayoffs.routes.js";
import { timelineRoutes } from "./api/timeline.routes.js";
import { conflictsRoutes } from "./api/conflicts.routes.js";
import { errorHandler } from "./api/error-handler.js";

export function createApp(db: Db) {
  migrate(db);

  const app = express();
  const env = loadEnv();

  app.use(cors({ origin: env.frontendOrigin, credentials: true }));
  app.use(express.json());
  app.use(cookieParser());

  app.get("/health", (_req, res) => res.json({ ok: true }));
  app.use(authRoutes(db));
  app.use(teamsRoutes(db));
  app.use(employeesRoutes(db));
  app.use(vacationsRoutes(db));
  app.use(dayOffsRoutes(db));
  app.use(timelineRoutes(db));
  app.use(conflictsRoutes(db));
  app.use(errorHandler);

  return app;
}
