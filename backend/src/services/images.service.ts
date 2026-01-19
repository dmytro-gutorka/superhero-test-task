import { HttpError } from "../errors/HttpError";
import { superheroesRepo } from "../repositories/superheroes.repo";
import { imagesRepo } from "../repositories/images.repo";
import { buildImageUrl, resolveImagePathFromUrl, safeUnlink } from "../utils/fileStorage.utils";

export const imagesService = {
    async uploadForSuperhero(superheroId: string, files: Express.Multer.File[] | undefined) {
        if (!files?.length) throw HttpError.badRequest("No images uploaded");

        const hero = await superheroesRepo.getById(superheroId);

        if (!hero) throw HttpError.notFound("Superhero", superheroId);

        const urls = files.map((f) => buildImageUrl(f.filename));
        await imagesRepo.createManyForSuperhero(superheroId, urls);

        return { uploaded: urls.length, urls };
    },

    async removeImage(imageId: string) {
        const image = await imagesRepo.findById(imageId);

        if (!image) throw HttpError.notFound("Image", imageId);

        await imagesRepo.deleteById(imageId);
        const fp = resolveImagePathFromUrl(image.url);

        if (fp) await safeUnlink(fp);

        return { deleted: true };
    },

    async removeImagesByIds(imageIds: string[]) {
        if (!imageIds.length) return { deleted: 0 };

        const images = await imagesRepo.findManyByIds(imageIds);
        await imagesRepo.deleteManyByIds(imageIds);

        await Promise.all(
            images
                .map((img) => resolveImagePathFromUrl(img.url))
                .filter((p): p is string => Boolean(p))
                .map((p) => safeUnlink(p)),
        );

        return { deleted: images.length };
    },
};
