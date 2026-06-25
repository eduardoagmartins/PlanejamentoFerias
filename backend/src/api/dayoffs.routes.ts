import { Router } from "express";
import { z } from "zod";
import type { Db } from "../db/connection.js";
import { AbsencesService } from "../services/absences.service.js";
import { parseBody } from "../validation/request-validation.js";
import { requireAuth } from "./auth.middleware.js";

const dayOffCreateSchema = z.object({
  employeeId: z.string().min(1),
  startDate: z.string().min(10),
  endDate: z.string().min(10),
  reason: z.string().min(1)
});
const dayOffUpdateSchema = dayOffCreateSchema.partial();

export function dayOffsRoutes(db: Db) {
  const router = Router();
  const absences = new AbsencesService(db);

  router.use(requireAuth(db));
  router.post("/day-offs", (req, res) => {
    res.status(201).json(absences.createDayOff(parseBody(dayOffCreateSchema, req)));
  });
  router.patch("/day-offs/:dayOffId", (req, res) => {
    res.json(absences.updateDayOff(req.params.dayOffId, parseBody(dayOffUpdateSchema, req)));
  });
  router.delete("/day-offs/:dayOffId", (req, res) => {
    absences.deleteDayOff(req.params.dayOffId);
    res.status(204).end();
  });

  return router;
}
