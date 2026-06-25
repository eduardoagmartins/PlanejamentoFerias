import { Router } from "express";
import { z } from "zod";
import type { Db } from "../db/connection.js";
import { TeamsService } from "../services/teams.service.js";
import { parseBody } from "../validation/request-validation.js";
import { asyncHandler } from "./error-handler.js";
import { currentManager, requireAuth } from "./auth.middleware.js";

const teamCreateSchema = z.object({ name: z.string().min(1) });
const teamUpdateSchema = z.object({ name: z.string().min(1) });

export function teamsRoutes(db: Db) {
  const router = Router();
  const teams = new TeamsService(db);

  router.use(requireAuth(db));

  router.get("/teams", (req, res) => res.json(teams.list(currentManager(req).id)));
  router.post(
    "/teams",
    asyncHandler(async (req, res) => {
      const team = teams.create(currentManager(req).id, parseBody(teamCreateSchema, req).name);
      res.status(201).json(team);
    })
  );
  router.patch("/teams/:teamId", (req, res) => {
    const team = teams.update(currentManager(req).id, req.params.teamId, parseBody(teamUpdateSchema, req).name);
    res.json(team);
  });
  router.delete("/teams/:teamId", (req, res) => {
    teams.remove(currentManager(req).id, req.params.teamId);
    res.status(204).end();
  });

  return router;
}
