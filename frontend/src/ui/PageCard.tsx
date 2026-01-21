import { Box, type BoxProps } from "@mui/material";

type PageCardProps = BoxProps;

export function PageCard(props: PageCardProps) {
    return (
        <Box
            {...props}
            sx={[
                {
                    padding: 4,
                    backgroundColor: "white",
                    boxShadow: 5,
                    maxWidth: 850,
                    margin: "auto",
                    borderRadius: 2,
                },
                ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
            ]}
        />
    );
}
