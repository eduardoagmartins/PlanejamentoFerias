import { Router } from "express";
import { z } from "zod";
import type { Db } from "../db/connection.js";
import { AuthService } from "../services/auth.service.js";
import { asyncHandler } from "./error-handler.js";
import { currentManager, requireAuth } from "./auth.middleware.js";
import { parseBody } from "../validation/request-validation.js";
import { loadEnv } from "../config/env.js";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

export function authRoutes(db: Db) {
  const router = Router();
  const auth = new AuthService(db);
  const env = loadEnv();

  router.post(
    "/auth/login",
    asyncHandler(async (req, res) => {
      const input = parseBody(loginSchema, req);
      const session = await auth.login(input.email, input.password);
      res.cookie(env.sessionCookieName, session.token, {
        httpOnly: true,
        sameSite: "lax",
        secure: false
      });
      res.json({ manager: session.manager });
    })
  );

  router.post("/auth/logout", requireAuth(db), (req, res) => {
    auth.logout(req.cookies?.[env.sessionCookieName]);
    res.clearCookie(env.sessionCookieName);
    res.status(204).end();
  });

  router.get("/me", requireAuth(db), (req, res) => {
    res.json(currentManager(req));
  });

  return router;
}
