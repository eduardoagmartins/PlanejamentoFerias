import { Router } from "express";
import { z } from "zod";
import type { Db } from "../db/connection.js";
import { TimelineService } from "../services/timeline.service.js";
import { parseQuery } from "../validation/request-validation.js";
import { currentManager, requireAuth } from "./auth.middleware.js";

const periodQuery = z.object({
  startDate: z.string().min(10),
  endDate: z.string().min(10)
});

export function timelineRoutes(db: Db) {
  const router = Router();
  const timeline = new TimelineService(db);

  router.use(requireAuth(db));
  router.get("/teams/:teamId/timeline", (req, res) => {
    const period = parseQuery(periodQuery, req);
    res.json(timeline.getTimeline(currentManager(req).id, req.params.teamId, period.startDate, period.endDate));
  });

  return router;
}
