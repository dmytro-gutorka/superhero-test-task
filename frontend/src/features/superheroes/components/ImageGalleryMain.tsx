import { Box, Card, CardMedia, Grid, useTheme } from "@mui/material";
import type { ImageDto } from "../../../api/types";
import { useEffect, useState } from "react";
import { defaultNoImageHeroPath } from "../../../constants/defaultPaths.constants.ts";

type Props = {
    images: ImageDto[];
    heroName: string;
};

export function ImageGalleryMain({ images, heroName }: Props) {
    const hasImages = images.length > 0;
    const theme = useTheme();

    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        setSelectedIndex(0);
    }, [images]);

    const mainImageUrl = hasImages ? images[selectedIndex]?.url : defaultNoImageHeroPath;

    return (
        <Box sx={{ placeSelf: "center" }}>
            <Card
                sx={{
                    mb: 2,
                    borderRadius: theme.shape.borderRadiusS,
                    overflow: "hidden",
                }}
            >
                <CardMedia
                    component="img"
                    image={mainImageUrl}
                    alt={heroName}
                    sx={{
                        width: { xs: 260, sm: 360, md: 450 },
                        height: { xs: 260, sm: 360, md: 420 },
                        objectFit: "cover",
                    }}
                />
            </Card>

            {hasImages && (
                <Grid container spacing={1}>
                    {images.map((img, idx) => {
                        const isActive = idx === selectedIndex;

                        return (
                            <Grid key={img.id}>
                                <Box
                                    onClick={() => setSelectedIndex(idx)}
                                    sx={{
                                        cursor: "pointer",
                                        borderRadius: 1.5,
                                        overflow: "hidden",
                                        outline: isActive ? "2px solid" : "1px solid",
                                        outlineColor: isActive ? "primary.main" : "divider",
                                        transform: isActive ? "scale(1.02)" : "scale(1)",
                                        transition:
                                            "transform 140ms ease, outline-color 140ms ease",
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={img.url}
                                        alt={heroName}
                                        style={{
                                            display: "block",
                                            height: 75,
                                            width: 75,
                                            objectFit: "cover",
                                        }}
                                    />
                                </Box>
                            </Grid>
                        );
                    })}
                </Grid>
            )}
        </Box>
    );
}
