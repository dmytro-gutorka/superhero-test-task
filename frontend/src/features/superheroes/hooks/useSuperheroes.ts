import { useQuery } from "@tanstack/react-query";
import { fetchSuperheroes } from "../../../api/superheroes.api";

export function useSuperheroes(page: number, limit = 5) {
    return useQuery({
        queryKey: ["superheroes", "list", page, limit],
        queryFn: () => fetchSuperheroes(page, limit),
    });
}
