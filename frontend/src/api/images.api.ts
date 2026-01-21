import { http } from "./http";

export async function uploadImages(superheroId: string, files: File[]) {
    const form = new FormData();
    files.forEach((file) => form.append("images", file));

    const { data } = await http.post<{ uploaded: number; urls: string[] }>(
        `/images/superhero/${superheroId}`,
        form,
        { headers: { "Content-Type": "multipart/form-data" } },
    );

    return data;
}

export async function deleteImage(imageId: string) {
    const { data } = await http.delete<{ deleted: boolean }>(`/images/${imageId}`);
    return data;
}
