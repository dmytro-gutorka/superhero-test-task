import type { Request, Response } from "express";
import { imagesService } from "../services/images.service";
import { getStringParam } from "../utils/http";

class ImagesController {
    uploadForSuperhero = async (req: Request, res: Response) => {
        const files = req.files as Express.Multer.File[] | undefined;
        const superheroId = getStringParam(req.params.superheroId, "superheroId");

        const result = await imagesService.uploadForSuperhero(superheroId, files);

        res.status(201).json(result);
    };

    remove = async (req: Request, res: Response) => {
        const id = getStringParam(req.params.id);

        await imagesService.removeImage(id);

        res.status(204).send();
    };
}

export const imagesController = new ImagesController();
