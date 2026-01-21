import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import { IconButton, useTheme } from "@mui/material";

type UnselectAllIconProps = {
    onClick: () => void;
    bgColor?: string;
    strokeColor?: string;
};

export function UnselectAllIcon({ onClick }: UnselectAllIconProps) {
    const theme = useTheme();

    return (
        <IconButton
            onClick={onClick}
            sx={{
                background: theme.palette.blue["700"],
                borderRadius: theme.shape.borderRadiusXS,
                "&:hover": {
                    transform: "scale(1.05)",
                    backgroundColor: theme.palette.blue[700],
                    transition: "0.3s ease-out",
                },
            }}
        >
            <IndeterminateCheckBoxOutlinedIcon htmlColor="white" />
        </IconButton>
    );
}
