import type { Image, Superhero } from "@prisma/client";
import { decodeStringArray } from "../utils/jsonArray";

export type SuperheroWithImages = Superhero & { images: Image[] };

export function superheroToDto(hero: SuperheroWithImages) {
    return {
        ...hero,
        superpowers: decodeStringArray(hero.superpowers),
    };
}
