import { useMutation } from "@tanstack/react-query";
import { deleteSuperhero } from "../../../api/superheroes.api";
import { queryClient } from "../../../app/queryClient";

export function useDeleteSuperhero() {
    return useMutation({
        mutationFn: deleteSuperhero,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["superheroes", "list"] });
        },
    });
}
