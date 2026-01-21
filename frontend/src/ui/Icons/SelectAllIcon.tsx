import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import { IconButton, useTheme } from "@mui/material";

type SelectAllIconProps = {
    onClick: () => void;
    bgColor?: string;
    strokeColor?: string;
};

export function SelectAllIcon({ onClick }: SelectAllIconProps) {
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
            <LibraryAddOutlinedIcon htmlColor="white" />
        </IconButton>
    );
}
