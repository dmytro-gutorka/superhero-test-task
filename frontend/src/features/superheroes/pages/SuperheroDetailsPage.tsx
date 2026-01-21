import { Alert, Box, CircularProgress, Stack, Typography, useTheme } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSuperhero } from "../hooks/useSuperhero";
import { useDeleteSuperhero } from "../hooks/useDeleteSuperhero";
import { useSnackbar } from "../../../ui/Snackbar.tsx";
import { ImageGalleryMain } from "../components/ImageGalleryMain.tsx";
import { EditButtonIcon } from "../../../ui/Icons/EditButtonIcon.tsx";
import { DeleteButtonIcon } from "../../../ui/Icons/DeleteButtonIcon.tsx";
import { SuperheroPropertyCardList } from "../components/SuperheroPropertyCardList.tsx";

export function SuperheroDetailsPage() {
    const { id = "" } = useParams<{ id: string }>();
    const { notify } = useSnackbar();
    const navigate = useNavigate();
    const theme = useTheme();
    const heroQuery = useSuperhero(id);
    const delHero = useDeleteSuperhero();

    async function handleDelete() {
        if (!confirm("Delete this superhero?")) return;
        try {
            await delHero.mutateAsync(hero.id);
            notify("Superhero deleted", "success");
            navigate("/");
        } catch (e: any) {
            notify(e?.message ?? "Failed to delete superhero", "error");
        }
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
        <Stack>
            <Stack flexDirection="row" alignItems="center" gap={1} my={2.5}>
                <ArrowBackIcon />
                <Typography onClick={() => navigate(`/`)} sx={{ cursor: "pointer" }}>
                    Back to Heroes
                </Typography>
            </Stack>

            <Stack
                borderRadius={theme.shape.borderRadiusS}
                direction="row"
                bgcolor="white"
                p={6}
                spacing={10}
            >
                <ImageGalleryMain images={hero.images} heroName={hero.nickname} />
                <Stack sx={{ width: "100%" }}>
                    <Stack
                        direction="row"
                        alignItems="flex-start"
                        justifyContent="space-between"
                        sx={{ mb: 2, width: "100%" }}
                    >
                        <Stack>
                            <Typography variant="h4" fontWeight={700}>
                                {hero.nickname}
                            </Typography>
                            <Typography>{hero.realName || "—"}</Typography>
                        </Stack>

                        <Stack direction="row" spacing={1} alignItems="flex-start">
                            <EditButtonIcon
                                onClick={() => navigate(`/superheroes/${hero.id}/edit`)}
                                isDisabled={delHero.isPending}
                            />
                            <DeleteButtonIcon
                                isDisabled={delHero.isPending}
                                onClick={async () => await handleDelete()}
                            />
                        </Stack>
                    </Stack>
                    <SuperheroPropertyCardList hero={hero} />
                </Stack>
            </Stack>
        </Stack>
    );
}
