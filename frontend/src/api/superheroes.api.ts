import { http } from "./http";
import type {
    CreateSuperheroDto,
    PaginatedSuperheroesDto,
    SuperheroDto,
    UpdateSuperheroDto,
} from "./types";

export async function fetchSuperheroes(page: number, limit = 5) {
    const { data } = await http.get<PaginatedSuperheroesDto>("/superheroes", {
        params: { page, limit },
    });
    return data;
}

export async function fetchSuperhero(id: string) {
    const { data } = await http.get<SuperheroDto>(`/superheroes/${id}`);
    return data;
}

export async function createSuperhero(dto: CreateSuperheroDto) {
    const { data } = await http.post<SuperheroDto>("/superheroes", dto);
    return data;
}

export async function updateSuperhero(id: string, dto: UpdateSuperheroDto) {
    const { data } = await http.patch<SuperheroDto>(`/superheroes/${id}`, dto);
    return data;
}

export async function deleteSuperhero(id: string) {
    await http.delete(`/superheroes/${id}`);
}
