import { useMutation } from "@tanstack/react-query";
import { createSuperhero } from "../../../api/superheroes.api";
import { queryClient } from "../../../app/queryClient";

export function useCreateSuperhero() {
    return useMutation({
        mutationFn: createSuperhero,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["superheroes", "list"] });
        },
    });
}
