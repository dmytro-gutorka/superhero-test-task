import { QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "./ui/Snackbar.tsx";
import { RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { queryClient } from "./app/queryClient.ts";
import { router } from "./app/router.tsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./app/mui-theme";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <SnackbarProvider>
                    <RouterProvider router={router} />
                </SnackbarProvider>
            </ThemeProvider>
        </QueryClientProvider>
    </StrictMode>,
);
