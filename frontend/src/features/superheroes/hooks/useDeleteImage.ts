import { useMutation } from "@tanstack/react-query";
import { deleteImage } from "../../../api/images.api";
import { queryClient } from "../../../app/queryClient";

export function useDeleteImage(superheroId: string) {
    return useMutation({
        mutationFn: (imageId: string) => deleteImage(imageId),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["superheroes", "byId", superheroId] });
            await queryClient.invalidateQueries({ queryKey: ["superheroes", "list"] });
        },
    });
}
