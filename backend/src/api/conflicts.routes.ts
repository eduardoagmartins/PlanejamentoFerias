import { Router } from "express";
import { z } from "zod";
import type { Db } from "../db/connection.js";
import { ConflictsService } from "../services/conflicts.service.js";
import { parseQuery } from "../validation/request-validation.js";
import { currentManager, requireAuth } from "./auth.middleware.js";

const periodQuery = z.object({
  startDate: z.string().min(10),
  endDate: z.string().min(10)
});

export function conflictsRoutes(db: Db) {
  const router = Router();
  const conflicts = new ConflictsService(db);

  router.use(requireAuth(db));
  router.get("/teams/:teamId/conflicts", (req, res) => {
    const period = parseQuery(periodQuery, req);
    res.json(conflicts.list(currentManager(req).id, req.params.teamId, period.startDate, period.endDate));
  });

  return router;
}
