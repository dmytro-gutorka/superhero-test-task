import type { CreateSuperheroDto } from "../../../api/types";
import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { SuperheroForm } from "../components/SuperheroForm";
import { useCreateSuperhero } from "../hooks/useCreateSuperhero";
import { uploadImages } from "../../../api/images.api";
import { PendingImagesPicker } from "../components/PendingImagesPicker";
import { useSnackbar } from "../../../ui/Snackbar.tsx";

const FORM_ID = "create-superhero-form";

export function SuperheroCreatePage() {
    const [pendingFiles, setPendingFiles] = useState<File[]>([]);
    const create = useCreateSuperhero();
    const theme = useTheme();
    const navigate = useNavigate();

    const { notify } = useSnackbar();

    const isBusy = create.isPending;

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
                Create superhero
            </Typography>

            <SuperheroForm
                formId={FORM_ID}
                mode="create"
                submitting={isBusy}
                onSubmit={async (dto) => {
                    try {
                        const created = await create.mutateAsync(dto as CreateSuperheroDto);

                        if (pendingFiles.length) {
                            try {
                                await uploadImages(created.id, pendingFiles);
                                notify(
                                    `Created & uploaded ${pendingFiles.length} image(s)`,
                                    "success",
                                );
                            } catch (e: any) {
                                notify(
                                    e?.message ?? "Hero created, but failed to upload images",
                                    "warning",
                                );
                            }
                        } else {
                            notify("Superhero created", "success");
                        }

                        navigate(`/superheroes/${created.id}`);
                    } catch (e: any) {
                        notify(e?.message ?? "Failed to create", "error");
                    }
                }}
            />

            <PendingImagesPicker
                files={pendingFiles}
                setFiles={setPendingFiles}
                disabled={isBusy}
                maxFiles={10}
            />

            <Stack
                flexDirection="row"
                sx={{ mt: 4, display: "flex", justifyContent: "space-between", gap: 1 }}
            >
                <Button
                    type="submit"
                    form={FORM_ID}
                    variant="contained"
                    size="large"
                    disabled={isBusy}
                    sx={{ flexGrow: 0.8 }}
                >
                    Create superhero
                </Button>
                <Button variant="outlined" onClick={() => navigate(-1)} sx={{ flexGrow: 0.15 }}>
                    Cancel
                </Button>
            </Stack>
        </Box>
    );
}
