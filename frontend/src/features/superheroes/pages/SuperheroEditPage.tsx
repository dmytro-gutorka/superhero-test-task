import { Alert, Box, CircularProgress, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useSuperhero } from "../hooks/useSuperhero";
import { useUpdateSuperhero } from "../hooks/useUpdateSuperhero";
import { useUploadImages } from "../hooks/useUploadImages";
import { SuperheroForm } from "../components/SuperheroForm";
import { PageCard } from "../../../ui/PageCard.tsx";
import { FormFooter } from "../../../ui/FormFooter.tsx";
import { useNotifyAsync } from "../../../app/hooks/useNotifyAsync.ts";
import { SuperheroImagesSection } from "../components/SuperheroImagesSection.tsx";
import type { CreateSuperheroDto, UpdateSuperheroDto } from "../../../api/types.ts";

const FORM_ID = "edit-superhero-form";

export function SuperheroEditPage() {
    const { id = "" } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const run = useNotifyAsync();

    const heroQuery = useSuperhero(id);
    const update = useUpdateSuperhero(id);
    const upload = useUploadImages(id);

    async function handleUpload(files: File[]) {
        await run(() => upload.mutateAsync(files), {
            success: "Images uploaded",
            error: "Failed to upload images",
        });
    }

    async function handleRemoveSelected(ids: string[]) {
        if (!ids.length) return;
        await run(() => update.mutateAsync({ removeImageIds: ids }), {
            success: `Removed ${ids.length} image(s)`,
            error: "Failed to remove selected images",
        });
    }

    async function handleSubmit(dto: CreateSuperheroDto | UpdateSuperheroDto) {
        const updated = await run(() => update.mutateAsync(dto as any), {
            success: "Saved",
            error: "Failed to update",
        });
        if (!updated) return;
        navigate(`/superheroes/${updated.id}`);
    }

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
        <PageCard>
            <Typography variant="h4" fontWeight={800} sx={{ mb: 3 }}>
                Edit: {hero.nickname}
            </Typography>

            <SuperheroForm
                formId={FORM_ID}
                mode="edit"
                initial={hero}
                submitting={update.isPending}
                onSubmit={handleSubmit}
            />

            <SuperheroImagesSection
                hero={hero}
                isUploading={upload.isPending}
                isRemoving={update.isPending}
                onUpload={handleUpload}
                onRemoveSelected={handleRemoveSelected}
            />

            <FormFooter
                formId={FORM_ID}
                submitText="Save changes"
                isBusy={update.isPending}
                onCancel={() => navigate(-1)}
            />
        </PageCard>
    );
}
