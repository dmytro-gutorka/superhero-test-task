import { Stack } from "@mui/material";
import type { SuperheroDto } from "../../../api/types.ts";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import { SuperheroPropertyCard } from "./SuperheroPropertyCard.tsx";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import type { SuperheroPropertyCardConfig } from "../types/configs.ts";

type SuperheroPropertyCardListProps = {
    hero: SuperheroDto;
};

export function SuperheroPropertyCardList({ hero }: SuperheroPropertyCardListProps) {
    const superheroesPropertyConfig: SuperheroPropertyCardConfig[] = [
        {
            propertyName: "Origin story",
            propertyValue: hero.originDescription ?? "-",
            color: "blue",
            icon: <MenuBookOutlinedIcon htmlColor="white" />,
        },
        {
            propertyName: "Superpowers",
            propertyValue: hero.superpowers,
            color: "purple",
            icon: <AutoAwesomeOutlinedIcon htmlColor="white" />,
        },
        {
            propertyName: "Catch Phrase",
            propertyValue: hero.catchPhrase ?? "-",
            color: "orange",
            icon: <RateReviewOutlinedIcon htmlColor="white" />,
        },
    ];

    return (
        <Stack gap={2.5}>
            {superheroesPropertyConfig.map((heroProperty) => (
                <SuperheroPropertyCard
                    propertyName={heroProperty.propertyName}
                    propertyValue={heroProperty.propertyValue}
                    color={heroProperty.color}
                    icon={heroProperty.icon}
                    key={heroProperty.propertyName}
                />
            ))}
        </Stack>
    );
}
