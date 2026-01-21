import { Button, Stack, Typography, useTheme } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useRef } from "react";
import {
    defaultAllowedImageExtensions,
    defaultMaxFileSize,
} from "../../../constants/defaultFilesConfigs.constants.ts";
import * as React from "react";

type ImageUploaderProps = {
    onFilesSelected: (files: File[]) => void;
    disabled?: boolean;
    maxFiles?: number;
    children?: React.ReactNode;
};

export function ImageUploader({
    onFilesSelected,
    disabled,
    maxFiles = 10,
    children,
}: ImageUploaderProps) {
    const ref = useRef<HTMLInputElement | null>(null);
    const theme = useTheme();

    return (
        <Stack
            sx={{
                mt: 2.5,
                width: "100%",
                gap: 2,
                border: "2px dashed rgb(209 213 219)",
                p: 3,
                borderRadius: theme.shape.borderRadiusXS,
            }}
        >
            <input
                ref={ref}
                type="file"
                accept={defaultAllowedImageExtensions.join(",")}
                multiple
                hidden
                onChange={(e) => {
                    const files = Array.from(e.target.files ?? []).slice(0, maxFiles);
                    if (files.length) onFilesSelected(files);
                    if (ref.current) ref.current.value = "";
                }}
            />
            <Stack gap={1}>
                <Button
                    variant="contained"
                    startIcon={<FileUploadIcon />}
                    disabled={disabled}
                    onClick={() => ref.current?.click()}
                    sx={{ placeSelf: "center" }}
                >
                    Upload images
                </Button>
                <Typography variant="body2" color="text.secondary" textAlign="center">
                    PNG, JPG, GIF up to {defaultMaxFileSize}
                </Typography>
                {children}
            </Stack>
        </Stack>
    );
}
