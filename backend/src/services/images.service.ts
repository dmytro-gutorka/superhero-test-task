import { HttpError } from "../errors/HttpError";
import { superheroesRepo } from "../repositories/superheroes.repo";
import { imagesRepo } from "../repositories/images.repo";
import { buildImageUrl, resolveImagePathFromUrl, safeUnlink } from "../utils/fileStorage.utils";

export const imagesService = {
    async uploadForSuperhero(superheroId: string, files: Express.Multer.File[] | undefined) {
        if (!files?.length) throw HttpError.badRequest("No images uploaded");

        const hero = await superheroesRepo.getById(superheroId);

        if (!hero) throw HttpError.notFound("Superhero", superheroId);

        const urls = files.map((file) => buildImageUrl(file.filename));
        await imagesRepo.createManyForSuperhero(superheroId, urls);

        return { uploaded: urls.length, urls };
    },

    async removeImage(imageId: string) {
        const image = await imagesRepo.findById(imageId);

        if (!image) throw HttpError.notFound("Image", imageId);

        await imagesRepo.deleteById(imageId);
        const imagePath = resolveImagePathFromUrl(image.url);

        if (imagePath) await safeUnlink(imagePath);

        return { deleted: true };
    },

    async removeImagesByIds(imageIds: string[]) {
        if (!imageIds.length) return { deleted: 0 };

        const images = await imagesRepo.findManyByIds(imageIds);
        await imagesRepo.deleteManyByIds(imageIds);

        await Promise.all(
            images
                .map((image) => resolveImagePathFromUrl(image.url))
                .filter((path): path is string => Boolean(path))
                .map((path) => safeUnlink(path)),
        );

        return { deleted: images.length };
    },
};
