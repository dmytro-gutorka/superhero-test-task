import { superheroesRouter } from "./superheroes.routes";
import { imagesRouter } from "./images.routes";
import { Router } from "express";

export const router = Router();

router.use("/superheroes", superheroesRouter);
router.use("/images", imagesRouter);
