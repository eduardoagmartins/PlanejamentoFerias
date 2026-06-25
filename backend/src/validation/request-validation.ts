import type { Request } from "express";
import type { z } from "zod";

export function parseBody<T extends z.ZodTypeAny>(schema: T, req: Request): z.infer<T> {
  return schema.parse(req.body);
}

export function parseQuery<T extends z.ZodTypeAny>(schema: T, req: Request): z.infer<T> {
  return schema.parse(req.query);
}
