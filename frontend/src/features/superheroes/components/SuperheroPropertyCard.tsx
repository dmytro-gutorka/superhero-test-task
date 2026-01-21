import { Stack, Typography, useTheme } from "@mui/material";
import type { SuperheroPropertyCardConfig } from "../types/configs.ts";

export function SuperheroPropertyCard({
    propertyName,
    propertyValue,
    color,
    icon,
}: SuperheroPropertyCardConfig) {
    const theme = useTheme();

    const IconCardColor = theme.palette[`${color}`]["700"];
    const borderColor = theme.palette[`${color}`]["200"];
    const bgCardColor = theme.palette[`${color}`]["gradient"];

    return (
        <Stack
            gap={2}
            p={2.5}
            sx={{
                backgroundImage: bgCardColor,
                border: `1px solid ${borderColor}`,
                borderRadius: theme.shape.borderRadiusS,
            }}
        >
            <Stack direction="row" alignItems="center" gap={1.5}>
                <Stack
                    p={1.5}
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                        backgroundColor: IconCardColor,
                        borderRadius: theme.shape.borderRadiusXS,
                    }}
                >
                    {icon}
                </Stack>
                <Typography fontWeight={800}>{propertyName}</Typography>
            </Stack>
            <Typography>{String(propertyValue)}</Typography>
        </Stack>
    );
}
