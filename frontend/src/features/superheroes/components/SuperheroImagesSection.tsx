import { Alert, Stack } from "@mui/material";
import { useState } from "react";

import { ImageUploader } from "./ImageUploader";
import { ImagesGallery } from "./ImagesGallery";
import type { SuperheroDto } from "../../../api/types.ts";

type SuperheroImagesSectionProps = {
    hero: SuperheroDto;
    isUploading?: boolean;
    isRemoving?: boolean;
    onUpload: (files: File[]) => Promise<void>;
    onRemoveSelected: (ids: string[]) => Promise<void>;
};

export function SuperheroImagesSection({
    hero,
    isUploading,
    isRemoving,
    onUpload,
    onRemoveSelected,
}: SuperheroImagesSectionProps) {
    const [selectedImageIds, setSelectedImageIds] = useState<string[]>([]);

    return (
        <Stack width="100%" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <ImageUploader
                disabled={isUploading}
                onFilesSelected={async (files) => {
                    await onUpload(files);
                }}
            />

            {hero.images.length === 0 ? (
                <Alert sx={{ my: 2 }} severity="info">
                    This hero does not have any images yet.
                </Alert>
            ) : (
                <ImagesGallery
                    images={hero.images}
                    selectedIds={selectedImageIds}
                    setSelectedIds={setSelectedImageIds}
                    removing={isRemoving}
                    onRemoveSelected={async () => {
                        await onRemoveSelected(selectedImageIds);
                        setSelectedImageIds([]);
                    }}
                />
            )}
        </Stack>
    );
}
