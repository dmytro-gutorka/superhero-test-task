import { useState } from "react";
import { Alert, Box, Button, CircularProgress, Stack, Typography, useTheme } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useSuperhero } from "../hooks/useSuperhero";
import { useUpdateSuperhero } from "../hooks/useUpdateSuperhero";
import { useUploadImages } from "../hooks/useUploadImages";
import { SuperheroForm } from "../components/SuperheroForm";
import { ImageUploader } from "../components/ImageUploader";
import { ImagesGallery } from "../components/ImagesGallery";
import { useSnackbar } from "../../../ui/Snackbar.tsx";

const FORM_ID = "edit-superhero-form";

export function SuperheroEditPage() {
    const { id = "" } = useParams<{ id: string }>();
    const { notify } = useSnackbar();
    const navigate = useNavigate();
    const theme = useTheme();

    const heroQuery = useSuperhero(id);
    const update = useUpdateSuperhero(id);
    const upload = useUploadImages(id);

    const [selectedImageIds, setSelectedImageIds] = useState<string[]>([]);

    if (heroQuery.isLoading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (heroQuery.isError || !heroQuery.data) {
        return <Alert severity="error">Failed to load superhero</Alert>;
    }

    const hero = heroQuery.data;

    return (
        <Box
            sx={{
                padding: 4,
                backgroundColor: "white",
                borderRadius: theme.shape.borderRadiusS,
                boxShadow: theme.shadows[5],
                maxWidth: 850,
                margin: "auto",
            }}
        >
            <Typography variant="h4" fontWeight={800} sx={{ mb: 3 }}>
                Edit: {hero.nickname}
            </Typography>

            <SuperheroForm
                formId={FORM_ID}
                mode="edit"
                initial={hero}
                submitting={update.isPending}
                onSubmit={async (dto) => {
                    try {
                        const updated = await update.mutateAsync(dto as any);
                        notify("Saved", "success");
                        navigate(`/superheroes/${updated.id}`);
                    } catch (e: any) {
                        notify(e?.message ?? "Failed to update", "error");
                    }
                }}
            />
            <Stack width="100%" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                <ImageUploader
                    disabled={upload.isPending}
                    onFilesSelected={async (files) => {
                        try {
                            await upload.mutateAsync(files);
                            notify("Images uploaded", "success");
                        } catch (e: any) {
                            notify(e?.message ?? "Failed to upload images", "error");
                        }
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
                        removing={update.isPending}
                        onRemoveSelected={async () => {
                            try {
                                await update.mutateAsync({ removeImageIds: selectedImageIds });
                                notify(`Removed ${selectedImageIds.length} image(s)`, "success");
                                setSelectedImageIds([]);
                            } catch (e: any) {
                                notify(e?.message ?? "Failed to remove selected images", "error");
                            }
                        }}
                    />
                )}
            </Stack>

            <Stack
                flexDirection="row"
                sx={{ mt: 4, display: "flex", justifyContent: "space-between", gap: 1 }}
            >
                <Button
                    form={FORM_ID}
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={update.isPending}
                    sx={{ flexGrow: 0.8 }}
                >
                    Save changes
                </Button>
                <Button variant="outlined" sx={{ flexGrow: 0.15 }} onClick={() => navigate(-1)}>
                    Cancel
                </Button>
            </Stack>
        </Box>
    );
}
