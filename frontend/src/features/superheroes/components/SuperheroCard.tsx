import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Chip,
    Typography,
    useTheme,
} from "@mui/material";
import type { SuperheroListItemDto } from "../../../api/types";
import { defaultNoImageHeroPath } from "../../../constants/defaultPaths.constants.ts";

type SuperheroCardProps = {
    hero: SuperheroListItemDto;
    onClick?: () => void;
};

export function SuperheroCard({ hero, onClick }: SuperheroCardProps) {
    const imageUrl = hero.image?.url ?? defaultNoImageHeroPath;
    const theme = useTheme();

    return (
        <Card
            sx={{
                display: "flex",
                borderRadius: 2,
                overflow: "hidden",
                height: 380,
                width: 290,
            }}
        >
            <CardActionArea
                onClick={onClick}
                sx={{
                    position: "relative",
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    "&:hover .heroTitle": { color: theme.palette.blue["700"] },
                    "&:hover .heroChip": { opacity: 1, transform: "translateY(0)" },
                    "&:hover .heroImage": { transform: "scale(1.06)" },
                    "&:hover .heroShade": { opacity: 1 },
                }}
            >
                <Box sx={{ position: "relative", height: 320, overflow: "hidden", width: "100%" }}>
                    <CardMedia
                        component="img"
                        image={imageUrl}
                        alt={hero.nickname}
                        className="heroImage"
                        sx={{
                            height: "100%",
                            width: "100%",
                            objectFit: "cover",
                            transform: "scale(1)",
                            transition: "transform 220ms ease",
                        }}
                    />

                    <Box
                        className="heroShade"
                        sx={{
                            position: "absolute",
                            left: 0,
                            right: 0,
                            bottom: 0,
                            height: "30%",
                            opacity: 0,
                            transition: "opacity 220ms ease",
                            background: "linear-gradient(to top, rgba(0,0,0,0.45), rgba(0,0,0,0))",
                            pointerEvents: "none",
                        }}
                    />

                    <Chip
                        className="heroChip"
                        label="View Details"
                        size="medium"
                        sx={{
                            position: "absolute",
                            right: 12,
                            top: 12,
                            opacity: 0,
                            transform: "translateY(6px)",
                            transition: "opacity 220ms ease, transform 220ms ease",
                            bgcolor: "rgba(255,255,255)",
                            fontWeight: 600,

                            boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
                        }}
                    />
                </Box>
                <CardContent
                    sx={{
                        py: 1.5,
                        pl: 3,
                        width: "100%",
                        flexGrow: 1,
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Typography
                        className="heroTitle"
                        textTransform="capitalize"
                        fontWeight={700}
                        variant="h6"
                        sx={{
                            transition: "color 0.3s ease",
                        }}
                    >
                        {hero.nickname}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
