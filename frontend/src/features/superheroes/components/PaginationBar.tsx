import { Box, Pagination, Stack, Typography, useTheme } from "@mui/material";

type PaginationBarProps = {
    page: number;
    pages: number;
    total: number;
    onChange: (page: number) => void;
};

export function PaginationBar({ page, pages, total, onChange }: PaginationBarProps) {
    const theme = useTheme();

    return (
        <Box
            sx={{
                justifyContent: "space-between",
                display: "flex",
                placeSelf: "center",
                alignItems: "center",
                gap: 2,
                mt: 10,
            }}
        >
            <Stack spacing={2}>
                <Pagination
                    page={page}
                    count={pages}
                    color="primary"
                    variant="outlined"
                    shape="rounded"
                    onChange={(_, p) => onChange(p)}
                    sx={{
                        "& .MuiPaginationItem-root.Mui-selected": {
                            backgroundColor: theme.palette.blue["700"],
                            color: "white",
                            transform: "scale(1.05)",
                        },
                        "& .MuiPaginationItem-root": {
                            fontWeight: 700,
                            width: 40,
                            height: 40,
                            backgroundColor: "white",
                            borderRadius: theme.shape.borderRadiusXS,
                        },
                    }}
                />
                <Typography variant="body2" textAlign="center" sx={{ flexGrow: 1 }}>
                    Total heroes: {total}
                </Typography>
            </Stack>
        </Box>
    );
}
