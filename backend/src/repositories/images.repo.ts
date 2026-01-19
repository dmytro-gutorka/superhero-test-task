import { prisma } from "./prisma";

export const imagesRepo = {
    createManyForSuperhero(superheroId: string, urls: string[]) {
        return prisma.image.createMany({
            data: urls.map((url) => ({ superheroId, url })),
        });
    },

    findById(imageId: string) {
        return prisma.image.findUnique({ where: { id: imageId } });
    },

    findManyByIds(ids: string[]) {
        return prisma.image.findMany({ where: { id: { in: ids } } });
    },

    deleteById(imageId: string) {
        return prisma.image.delete({ where: { id: imageId } });
    },

    deleteManyByIds(ids: string[]) {
        return prisma.image.deleteMany({ where: { id: { in: ids } } });
    },
};
