import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";

export function AppLayout() {
    return (
        <Container sx={{ py: 3 }}>
            <Outlet />
        </Container>
    );
}
