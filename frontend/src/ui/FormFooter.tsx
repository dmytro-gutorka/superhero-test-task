import { Button, Stack } from "@mui/material";

type FormFooterProps = {
    formId: string;
    submitText: string;
    isBusy?: boolean;
    onCancel: () => void;
};

export function FormFooter({ formId, submitText, isBusy, onCancel }: FormFooterProps) {
    return (
        <Stack direction="row" sx={{ mt: 4 }} justifyContent="space-between" gap={1}>
            <Button
                type="submit"
                form={formId}
                variant="contained"
                size="large"
                disabled={isBusy}
                sx={{ flexGrow: 0.8 }}
            >
                {submitText}
            </Button>

            <Button variant="outlined" onClick={onCancel} sx={{ flexGrow: 0.15 }}>
                Cancel
            </Button>
        </Stack>
    );
}
