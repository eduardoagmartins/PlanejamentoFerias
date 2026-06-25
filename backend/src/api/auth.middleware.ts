import type { NextFunction, Request, Response } from "express";
import { ApiError } from "./error-handler.js";
import { AuthService, type PublicManager } from "../services/auth.service.js";
import type { Db } from "../db/connection.js";
import { loadEnv } from "../config/env.js";

declare global {
  namespace Express {
    interface Request {
      manager?: PublicManager;
    }
  }
}

export function requireAuth(db: Db) {
  const auth = new AuthService(db);
  const cookieName = loadEnv().sessionCookieName;

  return (req: Request, _res: Response, next: NextFunction) => {
    const token = req.cookies?.[cookieName] ?? req.header("authorization")?.replace(/^Bearer\s+/i, "");
    const manager = auth.currentManager(token);
    if (!manager) {
      next(new ApiError(401, "Not authenticated"));
      return;
    }

    req.manager = manager;
    next();
  };
}

export function currentManager(req: Request): PublicManager {
  if (!req.manager) throw new ApiError(401, "Not authenticated");
  return req.manager;
}
