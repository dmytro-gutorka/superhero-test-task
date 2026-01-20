import type { Prisma } from "@prisma/client";
import { HttpError } from "../errors/HttpError";
import { encodeStringArray } from "../utils/jsonArray";
import { superheroesRepo } from "../repositories/superheroes.repo";
import { imagesRepo } from "../repositories/images.repo";
import { superheroToDto } from "../mappers/superhero.mapper";
import { imagesService } from "./images.service";
import { SuperheroCreateDto, SuperheroUpdateDto } from "../validation/superhero.schemas";
import {
    defaultLimit,
    defaultMaxLimit,
    defaultMinLimit,
    defaultMinPage,
    defaultPage,
} from "../constants/defaultQueryParams.constants";

async function _ensureHeroExists(id: string) {
    const hero = await superheroesRepo.getById(id);

    if (!hero) throw HttpError.notFound("Superhero", id);

    return hero;
}

async function _validateAndRemoveImages(heroId: string, removeImageIds?: string[]) {
    if (!removeImageIds?.length) return;

    const images = await imagesRepo.findManyByIds(removeImageIds);
    const foreign = images.some((image) => image.superheroId !== heroId);

    if (foreign) throw HttpError.forbidden("Some images do not belong to this superhero");

    await imagesService.removeImagesByIds(removeImageIds);
}

function _buildUpdateData(dto: SuperheroUpdateDto): Prisma.SuperheroUpdateInput {
    const data: Prisma.SuperheroUpdateInput = {};

    if (dto.nickname !== undefined) data.nickname = dto.nickname;
    if (dto.realName !== undefined) data.realName = dto.realName;
    if (dto.originDescription !== undefined) {
        data.originDescription = dto.originDescription;
    }
    if (dto.catchPhrase !== undefined) data.catchPhrase = dto.catchPhrase;

    if (dto.superpowers !== undefined) {
        data.superpowers = encodeStringArray(dto.superpowers);
    }

    return data;
}

export const superheroesService = {
    async list(clientPage: number, clientLimit: number) {
        const safeLimit = Math.min(
            Math.max(clientLimit || defaultLimit, defaultMinLimit),
            defaultMaxLimit,
        );
        const safePage = Math.max(clientPage || defaultPage, defaultMinPage);
        const skip = (safePage - 1) * safeLimit;

        const [items, total] = await Promise.all([
            superheroesRepo.list(skip, safeLimit),
            superheroesRepo.count(),
        ]);

        return {
            page: safePage,
            limit: safeLimit,
            total,
            pages: Math.ceil(total / safeLimit),
            items: items.map((hero) => ({
                id: hero.id,
                nickname: hero.nickname,
                image: hero.images[0] ?? null,
            })),
        };
    },

    async getById(id: string) {
        const hero = await _ensureHeroExists(id);

        return superheroToDto(hero);
    },

    async create(dto: SuperheroCreateDto) {
        const data: Prisma.SuperheroCreateInput = {
            nickname: dto.nickname,
            realName: dto.realName,
            originDescription: dto.originDescription,
            catchPhrase: dto.catchPhrase,
            superpowers: encodeStringArray(dto.superpowers),
        };

        const created = await superheroesRepo.create(data);

        return {
            ...created,
            superpowers: dto.superpowers ?? [],
            images: [],
        };
    },

    async update(id: string, dto: SuperheroUpdateDto) {
        await _ensureHeroExists(id);
        await _validateAndRemoveImages(id, dto.removeImageIds);

        const data: Prisma.SuperheroUpdateInput = _buildUpdateData(dto);
        await superheroesRepo.update(id, data);

        const updated = await superheroesRepo.getById(id);

        if (!updated) throw HttpError.notFound(`Superhero with ${id} is not found`);

        return superheroToDto(updated);
    },

    async remove(id: string) {
        const hero = await _ensureHeroExists(id);

        await imagesService.removeImagesByIds(hero.images.map((image) => image.id));
        await superheroesRepo.remove(id);

        return { deleted: true };
    },
};
