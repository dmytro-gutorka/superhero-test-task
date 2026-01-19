import { asyncHandler } from "../middleware/asyncHandler";
import { Router } from "express";
import { superheroesController } from "../controllers/superheroes.controller";

export const superheroesRouter = Router();

superheroesRouter.get("/", asyncHandler(superheroesController.list));
superheroesRouter.get("/:id", asyncHandler(superheroesController.getById));

superheroesRouter.post("/", asyncHandler(superheroesController.create));
superheroesRouter.patch("/:id", asyncHandler(superheroesController.update));
superheroesRouter.delete("/:id", asyncHandler(superheroesController.remove));
