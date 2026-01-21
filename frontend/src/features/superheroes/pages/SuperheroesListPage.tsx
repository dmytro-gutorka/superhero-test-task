import { useMemo, useState } from "react";
import { Alert, Box, Button, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useSuperheroes } from "../hooks/useSuperheroes";
import { SuperheroCard } from "../components/SuperheroCard";
import { PaginationBar } from "../components/PaginationBar";
import { Link as RouterLink } from "react-router";

const LIMIT = 5;
const DEFAULT_STARTING_PAGE = 1;

export function SuperheroesListPage() {
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    const { data, isLoading, isError, error } = useSuperheroes(page, LIMIT);

    const items = useMemo(() => data?.items ?? [], [data]);
    const pages = data?.pages ?? DEFAULT_STARTING_PAGE;
    const total = data?.total ?? 0;

    return (
        <Box>
            <Stack flexDirection="row" justifyContent="space-between" mb={6} alignItems="center">
                <Stack>
                    <Typography variant="h4" sx={{ fontWeight: 700, fontSize: 48 }}>
                        Superhero Database
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: 18 }}>
                        Discover and manage the world's greatest heroes
                    </Typography>
                </Stack>
                <Button variant="contained" component={RouterLink} to="/superheroes/new">
                    + Add Hero
                </Button>
            </Stack>

            {isLoading && (
                <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
                    <CircularProgress />
                </Box>
            )}

            {isError && (
                <Alert severity="error">
                    {error instanceof Error ? error.message : "Failed to load superheroes"}
                </Alert>
            )}

            {!isLoading && !isError && (
                <>
                    {items.length === 0 ? (
                        <Alert severity="info">No superheroes yet.</Alert>
                    ) : (
                        <Grid container spacing={2}>
                            {items.map((hero) => (
                                <Grid key={hero.id}>
                                    <SuperheroCard
                                        hero={hero}
                                        onClick={() => navigate(`/superheroes/${hero.id}`)}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    )}
                    <PaginationBar page={page} pages={pages} total={total} onChange={setPage} />
                </>
            )}
        </Box>
    );
}
