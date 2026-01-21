export type ImageDto = {
    id: string;
    url: string;
    superheroId: string;
    createdAt: string;
};

export type SuperheroDto = {
    id: string;
    nickname: string;
    realName?: string | null;
    originDescription?: string | null;
    superpowers: string[];
    catchPhrase?: string | null;
    images: ImageDto[];
    createdAt: string;
    updatedAt: string;
};

export type SuperheroListItemDto = {
    id: string;
    nickname: string;
    image: ImageDto | null;
};

export type PaginatedSuperheroesDto = {
    page: number;
    limit: number;
    total: number;
    pages: number;
    items: SuperheroListItemDto[];
};

export type CreateSuperheroDto = {
    nickname: string;
    realName?: string;
    originDescription?: string;
    superpowers?: string[];
    catchPhrase?: string;
};

export type UpdateSuperheroDto = Partial<CreateSuperheroDto> & {
    removeImageIds?: string[];
};
