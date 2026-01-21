import { describe, expect, it, vi } from "vitest";

vi.mock("../../repositories/superheroes.repo", () => ({
    superheroesRepo: {
        list: vi.fn(),
        count: vi.fn(),
    },
}));

import { superheroesRepo } from "../../repositories/superheroes.repo";
import { superheroesService } from "../superheroes.service";

describe("superheroesService.list", () => {
    it("returns page meta and items with first image only", async () => {
        (superheroesRepo.count as any).mockResolvedValue(6);
        (superheroesRepo.list as any).mockResolvedValue([
            { id: "1", nickname: "A", images: [{ id: "img1" }, { id: "img2" }] },
            { id: "2", nickname: "B", images: [] },
        ]);

        const res = await superheroesService.list(1, 5);

        expect(res.page).toBe(1);
        expect(res.limit).toBe(5);
        expect(res.total).toBe(6);
        expect(res.pages).toBe(2);

        expect(res.items).toEqual([
            { id: "1", nickname: "A", image: { id: "img1" } },
            { id: "2", nickname: "B", image: null },
        ]);
    });

    it("clamps page and limit", async () => {
        (superheroesRepo.count as any).mockResolvedValue(0);
        (superheroesRepo.list as any).mockResolvedValue([]);

        const res = await superheroesService.list(-10 as any, 999 as any);
        expect(res.page).toBe(1);
        expect(res.limit).toBe(20);
    });
});
