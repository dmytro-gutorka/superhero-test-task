import { createContext, type ReactNode, useContext, useMemo, useState } from "react";
import { Alert, Snackbar } from "@mui/material";

type Snack = {
    open: boolean;
    message: string;
    severity: "success" | "info" | "warning" | "error";
};

type SnackbarCtx = {
    notify: (message: string, severity?: Snack["severity"]) => void;
};

const Ctx = createContext<SnackbarCtx | null>(null);

export function SnackbarProvider({ children }: { children: ReactNode }) {
    const [snack, setSnack] = useState<Snack>({
        open: false,
        message: "",
        severity: "info",
    });

    const api = useMemo<SnackbarCtx>(
        () => ({
            notify: (message, severity = "info") => setSnack({ open: true, message, severity }),
        }),
        [],
    );

    return (
        <Ctx.Provider value={api}>
            {children}
            <Snackbar
                open={snack.open}
                autoHideDuration={3500}
                onClose={() => setSnack((s) => ({ ...s, open: false }))}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    severity={snack.severity}
                    onClose={() => setSnack((s) => ({ ...s, open: false }))}
                    sx={{ width: "100%" }}
                >
                    {snack.message}
                </Alert>
            </Snackbar>
        </Ctx.Provider>
    );
}

export function useSnackbar() {
    const ctx = useContext(Ctx);

    if (!ctx) throw new Error("useSnackbar must be used within SnackbarProvider");

    return ctx;
}
