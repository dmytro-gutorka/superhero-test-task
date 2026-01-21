import "@mui/material/styles";
import type { ThemePaletteColorMap } from "@/shared/types/mui-theme.configs.ts";

export type ThemePaletteColorMap = {
    300: string;
    200: string;
    gradient: string;
};

declare module "@mui/material/styles" {
    interface Palette {
        blue: ThemePaletteColorMap;
        red: ThemePaletteColorMap;
        purple: ThemePaletteColorMap;
        orange: ThemePaletteColorMap;
    }
    interface PaletteOptions {
        blue?: ThemePaletteColorMap;
        red?: ThemePaletteColorMap;
        purple?: ThemePaletteColorMap;
        orange?: ThemePaletteColorMap;
    }
}

declare module "@mui/system/" {
    interface Shape {
        borderRadiusXS: number;
        borderRadiusS: number;
        borderRadiusM: number;
    }
}
