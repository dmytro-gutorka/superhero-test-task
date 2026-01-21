import { useQuery } from "@tanstack/react-query";
import { fetchSuperhero } from "../../../api/superheroes.api";

export function useSuperhero(id: string) {
    return useQuery({
        queryKey: ["superheroes", "byId", id],
        queryFn: () => fetchSuperhero(id),
        enabled: Boolean(id),
    });
}
