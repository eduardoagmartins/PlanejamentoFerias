import type { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public details?: Record<string, unknown>
  ) {
    super(message);
  }
}

export function notFound(message = "Resource not found"): ApiError {
  return new ApiError(404, message);
}

export function validationError(message: string, details?: Record<string, unknown>): ApiError {
  return new ApiError(400, message, details);
}

export function asyncHandler(handler: (req: Request, res: Response, next: NextFunction) => Promise<unknown>) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
}

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof ZodError) {
    res.status(400).json({ message: "Invalid request", details: error.flatten() });
    return;
  }

  if (error instanceof ApiError) {
    res.status(error.statusCode).json({ message: error.message, details: error.details });
    return;
  }

  res.status(500).json({ message: "Internal server error" });
};
