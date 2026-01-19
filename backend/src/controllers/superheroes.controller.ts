import type { Request, Response } from "express";
import { superheroesService } from "../services/superheroes.service";
import { superheroCreateSchema, superheroUpdateSchema } from "../validation/superhero.schemas";
import { getStringParam } from "../utils/http";

class SuperheroesController {
    list = async (req: Request, res: Response) => {
        const page = Number(req.query.page ?? 1);
        const limit = Number(req.query.limit ?? 5);

        const superHeroes = await superheroesService.list(page, limit);

        res.json(superHeroes);
    };

    getById = async (req: Request, res: Response) => {
        const id = getStringParam(req.params.id);

        const superhero = await superheroesService.getById(id);

        res.json(superhero);
    };

    create = async (req: Request, res: Response) => {
        const dto = superheroCreateSchema.parse(req.body);
        const createdSuperhero = await superheroesService.create(dto);

        res.status(201).json(createdSuperhero);
    };

    update = async (req: Request, res: Response) => {
        const id = getStringParam(req.params.id);
        const dto = superheroUpdateSchema.parse(req.body);

        const updatedSuperhero = await superheroesService.update(id, dto);

        res.json(updatedSuperhero);
    };

    remove = async (req: Request, res: Response) => {
        const id = getStringParam(req.params.id);

        await superheroesService.remove(id);

        res.status(204).send();
    };
}

export const superheroesController = new SuperheroesController();
