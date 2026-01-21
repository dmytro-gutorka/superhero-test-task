import { createTheme } from "@mui/material";

export const baseTheme = createTheme({
    shape: {
        borderRadiusXS: 2,
        borderRadiusS: 4,
        borderRadiusM: 8,
    },
    typography: {
        fontFamily: "Noto Sans",
    },
    palette: {
        blue: {
            700: "rgb(37 99 235)",
            200: "rgb(191 219 254)",

            gradient: "linear-gradient(to bottom right, #eff6ff , #dbeafe)",
        },
        red: {
            700: "rgb(220 38 38)",

            gradient: "linear-gradient(to bottom right, #fff, #fff)",
        },
        purple: {
            700: "rgb(147 51 234)",
            200: "rgb(233 213 255)",

            gradient: "linear-gradient(to bottom right, #faf5ff , #f3e8ff)",
        },
        orange: {
            700: "rgb(217 119 6)",
            200: "rgb(253 230 138)",

            gradient: "linear-gradient(to bottom right, #fffbeb , #fef3c7)",
        },
    },
});

export const theme = createTheme(baseTheme, {
    components: {
        MuiButton: {
            variants: [
                {
                    props: { variant: "contained" },
                    style: {
                        fontWeight: 700,
                        backgroundColor: baseTheme.palette.blue["700"],
                        textTransform: "capitalize",
                        fontSize: baseTheme.spacing(2),
                        borderRadius: baseTheme.shape.borderRadiusM,
                        paddingBlock: baseTheme.spacing(1),
                        paddingInline: baseTheme.spacing(2.5),
                    },
                },
                {
                    props: { variant: "outlined" },
                    style: {
                        fontWeight: 700,
                        textTransform: "capitalize",
                        fontSize: baseTheme.spacing(2),
                        borderRadius: baseTheme.shape.borderRadiusM,
                        paddingBlock: baseTheme.spacing(1),
                        paddingInline: baseTheme.spacing(2.5),
                        "&:hover": {
                            borderColor: baseTheme.palette.blue["700"],
                            backgroundColor: baseTheme.palette.blue["300"],
                        },
                    },
                },
            ],
        },
    },
});
