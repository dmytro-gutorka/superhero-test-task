import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { HttpError } from "../errors/HttpError";

export function errorMiddleware(err: any, _req: Request, res: Response, _next: NextFunction) {
    if (err instanceof ZodError) {
        return res.status(400).json({ message: "Validation error", issues: err.issues });
    }

    if (err instanceof HttpError) {
        return res.status(err.errorStatusCode).json({
            error: err.errorName,
            message: err.errorMessage,
            details: err.errorDetails,
        });
    }

    return res.status(500).json({ message: "Internal server error" });
}
