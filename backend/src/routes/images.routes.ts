import { Router } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import { imagesController } from "../controllers/image.controller";
import { uploadImages } from "../middleware/upload";
import { maxImagesCount } from "../constants/images.constants";

export const imagesRouter = Router();

imagesRouter.post(
    "/superhero/:superheroId",
    uploadImages.array("images", maxImagesCount),
    asyncHandler(imagesController.uploadForSuperhero),
);

imagesRouter.delete("/:imageId", asyncHandler(imagesController.remove));
