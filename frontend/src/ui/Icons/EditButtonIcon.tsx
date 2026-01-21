import { IconButton, useTheme } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

type EditButtonIconProps = {
    onClick?: () => void;
    isDisabled: boolean;
    bgColor?: string;
    strokeColor?: string;
};

export function EditButtonIcon({ onClick, isDisabled }: EditButtonIconProps) {
    const theme = useTheme();

    return (
        <IconButton
            disabled={isDisabled}
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
            <EditOutlinedIcon onClick={onClick} htmlColor="white" />
        </IconButton>
    );
}
