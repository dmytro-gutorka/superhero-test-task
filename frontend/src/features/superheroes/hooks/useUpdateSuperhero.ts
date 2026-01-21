import { useMutation } from "@tanstack/react-query";
import { updateSuperhero } from "../../../api/superheroes.api";
import { queryClient } from "../../../app/queryClient";

export function useUpdateSuperhero(id: string) {
    return useMutation({
        mutationFn: (dto: any) => updateSuperhero(id, dto),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["superheroes", "list"] });
            await queryClient.invalidateQueries({ queryKey: ["superheroes", "byId", id] });
        },
    });
}
