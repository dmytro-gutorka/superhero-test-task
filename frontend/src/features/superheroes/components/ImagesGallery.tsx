import { Card, CardMedia, Checkbox, Grid, Stack } from "@mui/material";
import type { ImageDto } from "../../../api/types";
import { DeleteButtonIcon } from "../../../ui/Icons/DeleteButtonIcon.tsx";
import { SelectAllIcon } from "../../../ui/Icons/SelectAllIcon.tsx";
import { UnselectAllIcon } from "../../../ui/Icons/UnselectAllIcon.tsx";

type ImagesGalleryProps = {
    images: ImageDto[];
    selectedIds: string[];
    setSelectedIds: (ids: string[]) => void;
    onRemoveSelected: () => Promise<void>;
    removing?: boolean;
};

export function ImagesGallery({
    images,
    selectedIds,
    setSelectedIds,
    onRemoveSelected,
    removing,
}: ImagesGalleryProps) {
    const allSelected = images.length > 0 && selectedIds.length === images.length;

    function handleSelectAll() {
        setSelectedIds(allSelected ? [] : images.map((i) => i.id));
    }

    async function handleRemoveFiles() {
        if (!confirm(`Remove ${selectedIds.length} selected image(s)?`)) return;
        await onRemoveSelected();
    }

    return (
        <Stack my={4} width="100%">
            <Stack direction="row" gap={2}>
                <Stack gap={1} alignItems="center">
                    {allSelected ? (
                        <UnselectAllIcon onClick={handleSelectAll} />
                    ) : (
                        <SelectAllIcon onClick={handleSelectAll} />
                    )}
                    <DeleteButtonIcon
                        isDisabled={removing || selectedIds.length === 0}
                        onClick={handleRemoveFiles}
                    />
                </Stack>
                <Grid container spacing={2}>
                    {images.map((img) => {
                        const checked = selectedIds.includes(img.id);
                        return (
                            <Grid key={img.id}>
                                <Card sx={{ position: "relative" }}>
                                    <CardMedia
                                        component="img"
                                        image={img.url}
                                        sx={{ width: 120, height: 120 }}
                                    />
                                    <Checkbox
                                        checked={checked}
                                        onChange={() => {
                                            setSelectedIds(
                                                checked
                                                    ? selectedIds.filter((id) => id !== img.id)
                                                    : [...selectedIds, img.id],
                                            );
                                        }}
                                        sx={{
                                            top: 8,
                                            left: 8,
                                            position: "absolute",
                                            bgcolor: "rgba(255,255,255,0.55)",
                                            borderRadius: 1,
                                            "&:hover": { bgcolor: "rgba(255,255,255,0.95)" },
                                        }}
                                    />
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            </Stack>
        </Stack>
    );
}
