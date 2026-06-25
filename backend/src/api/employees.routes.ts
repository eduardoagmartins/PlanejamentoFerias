import { Router } from "express";
import { z } from "zod";
import type { Db } from "../db/connection.js";
import { EmployeesService } from "../services/employees.service.js";
import { parseBody } from "../validation/request-validation.js";
import { currentManager, requireAuth } from "./auth.middleware.js";

const employeeCreateSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().optional().or(z.literal("")),
  corporateIdentifier: z.string().optional(),
  role: z.string().optional()
});
const employeeUpdateSchema = employeeCreateSchema.partial().extend({ active: z.boolean().optional() });

export function employeesRoutes(db: Db) {
  const router = Router();
  const employees = new EmployeesService(db);

  router.use(requireAuth(db));

  router.get("/teams/:teamId/employees", (req, res) => {
    res.json(employees.list(currentManager(req).id, req.params.teamId));
  });
  router.post("/teams/:teamId/employees", (req, res) => {
    const input = parseBody(employeeCreateSchema, req);
    res.status(201).json(employees.create(currentManager(req).id, req.params.teamId, normalize(input)));
  });
  router.patch("/employees/:employeeId", (req, res) => {
    res.json(employees.update(currentManager(req).id, req.params.employeeId, normalize(parseBody(employeeUpdateSchema, req))));
  });
  router.delete("/employees/:employeeId", (req, res) => {
    employees.remove(currentManager(req).id, req.params.employeeId);
    res.status(204).end();
  });

  return router;
}

function normalize<T extends { email?: string }>(input: T): T {
  return { ...input, email: input.email || undefined };
}
