import { Box, Chip, Stack } from "@mui/material";
import { ImageUploader } from "./ImageUploader";

type PendingImagesPickerProps = {
    files: File[];
    setFiles: (files: File[]) => void;
    disabled?: boolean;
    maxFiles?: number;
};

export function PendingImagesPicker({ files, setFiles, disabled, maxFiles = 10 }: PendingImagesPickerProps) {
    return (
        <Box>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ mb: 1 }}
            >
                <ImageUploader
                    disabled={disabled}
                    maxFiles={maxFiles}
                    onFilesSelected={(newFiles) => {
                        const next = [...files, ...newFiles].slice(0, maxFiles);
                        setFiles(next);
                    }}
                />
            </Stack>
            <Stack direction="row" gap={1} flexWrap="wrap">
                {files.map((f, idx) => (
                    <Chip
                        key={`${f.name}-${idx}`}
                        label={f.name}
                        onDelete={
                            disabled ? undefined : () => setFiles(files.filter((_, i) => i !== idx))
                        }
                        sx={{ maxWidth: 260 }}
                    />
                ))}
            </Stack>
        </Box>
    );
}
