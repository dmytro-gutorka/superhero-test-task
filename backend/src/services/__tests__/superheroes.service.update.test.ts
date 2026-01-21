import { describe, expect, it, vi, beforeEach } from "vitest";
import { superheroesService } from "../superheroes.service";

vi.mock("../../repositories/superheroes.repo", () => ({
    superheroesRepo: {
        getById: vi.fn(),
        update: vi.fn(),
    },
}));

vi.mock("../../repositories/images.repo", () => ({
    imagesRepo: {
        findManyByIds: vi.fn(),
    },
}));

vi.mock("../images.service", () => ({
    imagesService: {
        removeImagesByIds: vi.fn(),
    },
}));

import { superheroesRepo } from "../../repositories/superheroes.repo";
import { imagesRepo } from "../../repositories/images.repo";
import { imagesService } from "../images.service";

describe("superheroesService.update", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("throws 403 if trying to remove foreign images", async () => {
        (superheroesRepo.getById as any).mockResolvedValue({ id: "hero-1" });

        (imagesRepo.findManyByIds as any).mockResolvedValue([
            { id: "img-1", superheroId: "hero-2", url: "http://..." },
        ]);

        await expect(
            superheroesService.update("hero-1", { removeImageIds: ["img-1"] } as any),
        ).rejects.toMatchObject({
            errorStatusCode: 403,
        });

        expect(imagesService.removeImagesByIds).not.toHaveBeenCalled();
        expect(superheroesRepo.update).not.toHaveBeenCalled();
    });

    it("removes images if they belong to hero", async () => {
        (superheroesRepo.getById as any).mockResolvedValue({ id: "hero-1" });

        (imagesRepo.findManyByIds as any).mockResolvedValue([
            { id: "img-1", superheroId: "hero-1", url: "http://..." },
            { id: "img-2", superheroId: "hero-1", url: "http://..." },
        ]);

        (superheroesRepo.update as any).mockResolvedValue({});
        (superheroesRepo.getById as any)
            .mockResolvedValueOnce({ id: "hero-1" })
            .mockResolvedValueOnce({
                id: "hero-1",
                nickname: "Batman",
                superpowers: "[]",
                images: [],
            });

        await superheroesService.update("hero-1", {
            removeImageIds: ["img-1", "img-2"],
            nickname: "Batman",
        } as any);

        expect(imagesService.removeImagesByIds).toHaveBeenCalledWith(["img-1", "img-2"]);
        expect(superheroesRepo.update).toHaveBeenCalled();
    });
});
