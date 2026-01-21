import { IconButton, useTheme } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

type DeleteButtonIconProps = {
    onClick: () => void;
    isDisabled: boolean;
    bgColor?: string;
    strokeColor?: string;
};

export function DeleteButtonIcon({ onClick, isDisabled }: DeleteButtonIconProps) {
    const theme = useTheme();

    return (
        <IconButton
            disabled={isDisabled}
            onClick={onClick}
            sx={{
                background: theme.palette.red["700"],
                borderRadius: theme.shape.borderRadiusXS,
                "&:hover": {
                    transform: "scale(1.05)",
                    backgroundColor: theme.palette.red[700],
                    transition: "0.3s ease-out",
                },
            }}
        >
            <DeleteOutlineOutlinedIcon htmlColor="white" />
        </IconButton>
    );
}
