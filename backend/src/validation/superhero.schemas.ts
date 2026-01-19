import { z } from "zod";

export const superheroCreateSchema = z.object({
    nickname: z.string().min(1),
    realName: z.string().optional(),
    originDescription: z.string().optional(),
    superpowers: z.array(z.string().min(1)).default([]),
    catchPhrase: z.string().optional(),
});

export const superheroUpdateSchema = z.object({
    nickname: z.string().min(1).optional(),
    realName: z.string().optional(),
    originDescription: z.string().optional(),
    superpowers: z.array(z.string().min(1)).optional(),
    catchPhrase: z.string().optional(),
    removeImageIds: z.array(z.string()).optional(),
});

export type SuperheroCreateDto = z.infer<typeof superheroCreateSchema>;
export type SuperheroUpdateDto = z.infer<typeof superheroUpdateSchema>;
