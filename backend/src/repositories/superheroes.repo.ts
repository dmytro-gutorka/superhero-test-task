import { prisma } from "./prisma";
import type { Prisma } from "@prisma/client";

export const superheroesRepo = {
    count() {
        return prisma.superhero.count();
    },

    list(skip: number, take: number) {
        return prisma.superhero.findMany({
            skip,
            take,
            orderBy: { createdAt: "desc" },
            include: {
                images: { take: 1, orderBy: { createdAt: "asc" } },
            },
        });
    },

    getById(id: string) {
        return prisma.superhero.findUnique({
            where: { id },
            include: { images: { orderBy: { createdAt: "asc" } } },
        });
    },

    create(data: Prisma.SuperheroCreateInput) {
        return prisma.superhero.create({ data });
    },

    update(id: string, data: Prisma.SuperheroUpdateInput) {
        return prisma.superhero.update({ where: { id }, data });
    },

    remove(id: string) {
        return prisma.superhero.delete({ where: { id } });
    },
};
