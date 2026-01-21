import type { CreateSuperheroDto, UpdateSuperheroDto } from "../../../api/types";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { SuperheroForm } from "../components/SuperheroForm";
import { useCreateSuperhero } from "../hooks/useCreateSuperhero";
import { uploadImages } from "../../../api/images.api";
import { PendingImagesPicker } from "../components/PendingImagesPicker";
import { PageCard } from "../../../ui/PageCard.tsx";
import { FormFooter } from "../../../ui/FormFooter.tsx";
import { useNotifyAsync } from "../../../app/hooks/useNotifyAsync.ts";

const FORM_ID = "create-superhero-form";

export function SuperheroCreatePage() {
    const [pendingFiles, setPendingFiles] = useState<File[]>([]);
    const create = useCreateSuperhero();
    const navigate = useNavigate();
    const run = useNotifyAsync();

    const isBusy = create.isPending;

    async function handleSubmit(dto: CreateSuperheroDto | UpdateSuperheroDto) {
        const created = await run(() => create.mutateAsync(dto as CreateSuperheroDto), {
            success: "Superhero created",
            error: "Failed to create",
        });

        if (!created) return;

        if (pendingFiles.length) {
            await run(() => uploadImages(created.id, pendingFiles), {
                success: `Uploaded ${pendingFiles.length} image(s)`,
                error: "Hero created, but failed to upload images",
                severityOnError: "warning",
            });
        }
        navigate(`/superheroes/${created.id}`);
    }

    return (
        <PageCard>
            <Typography variant="h4" fontWeight={800} sx={{ mb: 3 }}>
                Create superhero
            </Typography>

            <SuperheroForm
                formId={FORM_ID}
                mode="create"
                submitting={isBusy}
                onSubmit={handleSubmit}
            />
            <PendingImagesPicker
                files={pendingFiles}
                setFiles={setPendingFiles}
                disabled={isBusy}
                maxFiles={10}
            />
            <FormFooter
                formId={FORM_ID}
                onCancel={() => navigate(-1)}
                isBusy={isBusy}
                submitText={"Create superhero"}
            />
        </PageCard>
    );
}
