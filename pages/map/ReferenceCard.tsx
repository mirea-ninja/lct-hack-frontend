import React from "react";
import {Collapse, useTheme} from "@mui/material";
import {
    Button,
    Box,
    Typography,
    IconButton,
    ToggleButtonGroup,
    ToggleButton,
    Grid,
    GridWrap,
} from "@mui/material";

import ArrowLeft from "@mui/icons-material/ChevronLeft";

const Tag = (text: string) => {
    const theme = useTheme();
    return (
        <Box
            sx={{
                padding: "5px",
                borderRadius: "10px",
                background: "#DFE1E3",

                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Typography
                fontSize={14}
                lineHeight={"16px"}
                color={theme.palette.text.primary}
                fontWeight={400}
            >
                {text}
            </Typography>
        </Box>
    );
}


export const ReferenceCard = ({}) => {
    const theme = useTheme();

    const [isCollapsed, setIsCollapsed] = React.useState(false);

    return (
        <Box
            sx={{
                zIndex: 1000,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "20px",
                gap: "20px",

                position: "absolute",
                width: "360px",
                minHeight: "135px",
                right: "30px",
                top: "73px",

                backgroundColor: "#FFFFFF",

                boxShadow: "0px 0px 23px rgba(5, 4, 39, 0.05)",
                borderRadius: "10px",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",

                    width: "100%",

                }}
            >
                <Typography
                    fontSize={20}
                    color={theme.palette.text.primary}
                    fontWeight={700}
                    lineHeight={"22px"}
                    marginRight={"20px"}
                >
                    Эталон
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    {isCollapsed ? (
                        <ArrowLeft sx={{transform: "rotate(90deg)"}}/>
                    ) : (
                        <ArrowLeft sx={{transform: "rotate(-90deg)"}}/>
                    )}
                </IconButton>
            </Box>
            <Collapse in={isCollapsed}>
                <Box>
                    <Typography fontSize={16} lineHeight={"18px"} color={theme.palette.text.primary} pb={"10px"}>
                        ул. Ватутина, 11
                    </Typography>
                    <Typography fontSize={18} lineHeight={"20px"} color={theme.palette.text.primary} pb={"20px"}>
                        351 100 ₽ м²
                    </Typography>
                    <Typography fontSize={16} lineHeight={"18px"} color={theme.palette.secondary.dark} pb={"10px"}>
                        Современное жилье, 22 этажа, панель
                    </Typography>
                    <Grid container sx={{width: "100%"}} spacing={1}>

                        <Grid item xs={4}>
                            {Tag("2 этаж")}
                        </Grid>
                        <Grid item xs={4}>
                            {Tag("S 40 м²")}
                        </Grid>
                        <Grid item xs={4}>
                            {Tag("S кухня 9 м²")}
                        </Grid>
                        <Grid item xs={6}>
                            {Tag("нет балкона")}
                        </Grid>
                        <Grid item xs={6}>
                            {Tag("11 мин. до метро")}
                        </Grid>
                        <Grid item xs={12}>
                            {Tag("муниципальный ремонт")}
                        </Grid>
                    </Grid>
                </Box>
            </Collapse>
            <Button variant={"mainActive"} sx={{width: "100%", height: "50px"}}>
                Рассчитать пул
            </Button>
        </Box>
    )

};

