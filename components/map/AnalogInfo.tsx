import React from "react";
import {Collapse, useTheme} from "@mui/material";
import {
    Box,
    Typography,
    IconButton,
    ToggleButtonGroup,
    ToggleButton,
    Grid,
} from "@mui/material";

import ArrowLeft from "@mui/icons-material/ChevronLeft";
import EditorModal from "./EditorModal";
import {PenIcon} from "../icons/PenIcon";
import {ClosedEyeIcon} from "../icons/ClosedEyeIcon";


interface InfoCardProps {
    title: string;
    description: string;
    isPositive: boolean | null;
}

const InfoCard = ({title, description, isPositive}: InfoCardProps) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "5px",
                gap: "2px",

                minWidth: "90px",

                backgroundColor: "#F3F7FA",
                borderRadius: "10px",
            }}
        >
            <Typography
                fontSize={14}
                fontWeight={500}
                color={theme.palette.secondary.dark}
            >
                {title}
            </Typography>
            <Typography
                fontSize={14}
                fontWeight={500}
                color={
                    isPositive === null
                        ? theme.palette.secondary.dark
                        : isPositive
                            ? "#76BF5C"
                            : "#F69681"
                }
            >
                {description}
            </Typography>
        </Box>
    );
};

export default function AnalogInfo() {
    const theme = useTheme();

    const [editorOpen, setEditorOpen] = React.useState(false);

    return (
        <><EditorModal open={editorOpen} setOpen={setEditorOpen}/><Box>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    paddingTop: "10px",
                    paddingBottom: "15px",
                }}
            >
                <Typography
                    fontSize={20}
                    color={theme.palette.text.primary}
                    fontWeight={700}
                    lineHeight={"22px"}
                    marginRight={"20px"}
                >
                    Ватунина, 24
                </Typography>
                <IconButton onClick={() => setEditorOpen(true)}>
                    <PenIcon/>
                </IconButton>
                <IconButton>
                    <ClosedEyeIcon/>
                </IconButton>
            </Box>
            <Box display={"flex"} alignItems={"center"} marginBottom={"5px"}>
                <Typography
                    fontSize={18}
                    lineHeight={"20px"}
                    color={theme.palette.text.primary}
                    fontWeight={500}
                    sx={{marginRight: "5px"}}
                >
                    244 054 ₽
                </Typography>
                <Typography
                    fontSize={16}
                    lineHeight={"18px"}
                    color={theme.palette.text.primary}
                    fontWeight={500}
                >
                    м²
                </Typography>
            </Box>
            <Box display={"flex"} alignItems={"center"}>
                <Typography
                    fontSize={16}
                    lineHeight={"18px"}
                    color={theme.palette.secondary.dark}
                    fontWeight={500}
                    sx={{marginRight: "10px"}}
                >
                    249 800 ₽ м²
                </Typography>
                <Typography
                    fontSize={16}
                    lineHeight={"18px"}
                    color={"#F79681"}
                    fontWeight={500}
                    sx={{marginRight: "5px"}}
                >
                    -2,3%
                </Typography>
                <Typography
                    fontSize={16}
                    lineHeight={"18px"}
                    color={theme.palette.secondary.dark}
                    fontWeight={500}
                >
                    итог
                </Typography>
            </Box>
            <Box>
                <Typography
                    fontSize={16}
                    lineHeight={"18px"}
                    color={theme.palette.secondary.dark}
                    fontWeight={500}
                    sx={{marginTop: "15px", marginBottom: "20px"}}
                >
                    Современное жилье, 22 этажа, панель
                </Typography>

                <Box sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "10px",
                    }}>
                    <InfoCard title={"торг"} description={"-4,5%"} isPositive={false}/>


                    <InfoCard title={"этаж 4"} description={"0"} isPositive={null}/>


                    <InfoCard
                        title={"S 45 м²"}
                        description={"+1,5%"}
                        isPositive={true}/>


                    <InfoCard
                        title={"S кухня 45 м²"}
                        description={"+1,5%"}
                        isPositive={true}/>


                    <InfoCard
                        title={"нет балкона"}
                        description={"0"}
                        isPositive={null}/>


                    <InfoCard
                        title={"до метро 10 мин."}
                        description={"0"}
                        isPositive={null}/>


                    <InfoCard
                        title={"без отделки"}
                        description={"-10 300 ₽"}
                        isPositive={false}/>
                </Box>
            </Box>
        </Box>
        </>
    )
        ;
};