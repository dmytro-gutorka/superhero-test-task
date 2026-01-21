import { useMutation } from "@tanstack/react-query";
import { uploadImages } from "../../../api/images.api";
import { queryClient } from "../../../app/queryClient";

export function useUploadImages(superheroId: string) {
    return useMutation({
        mutationFn: (files: File[]) => uploadImages(superheroId, files),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["superheroes", "byId", superheroId] });
            await queryClient.invalidateQueries({ queryKey: ["superheroes", "list"] });
        },
    });
}
