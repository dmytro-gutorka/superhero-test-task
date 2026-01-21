import type { ReactNode } from "react";

export type SuperheroPropertyCardConfig = {
    propertyName: string;
    propertyValue: string | string[];
    color: "blue" | "purple" | "orange";
    icon: ReactNode;
};
