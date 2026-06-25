import { Router } from "express";
import { z } from "zod";
import type { Db } from "../db/connection.js";
import { vacationStatuses } from "../domain/vacation-status.js";
import { AbsencesService } from "../services/absences.service.js";
import { parseBody } from "../validation/request-validation.js";
import { requireAuth } from "./auth.middleware.js";

const vacationCreateSchema = z.object({
  employeeId: z.string().min(1),
  startDate: z.string().min(10),
  endDate: z.string().min(10),
  status: z.enum(vacationStatuses),
  notes: z.string().optional()
});
const vacationUpdateSchema = vacationCreateSchema.partial();

export function vacationsRoutes(db: Db) {
  const router = Router();
  const absences = new AbsencesService(db);

  router.use(requireAuth(db));
  router.post("/vacations", (req, res) => {
    res.status(201).json(absences.createVacation(parseBody(vacationCreateSchema, req)));
  });
  router.patch("/vacations/:vacationId", (req, res) => {
    res.json(absences.updateVacation(req.params.vacationId, parseBody(vacationUpdateSchema, req)));
  });
  router.delete("/vacations/:vacationId", (req, res) => {
    absences.deleteVacation(req.params.vacationId);
    res.status(204).end();
  });

  return router;
}
