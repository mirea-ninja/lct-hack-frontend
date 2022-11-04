import React from "react";

import {useTheme} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import styles from "./EditorModal.module.scss";

const CloseIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M13.6585 0.928636C14.049 0.538116 14.6822 0.538106 15.0727 0.928636C15.4632 1.31916 15.4632 1.95233 15.0727 2.34285L9.4158 7.99976L15.0727 13.6566C15.4632 14.0471 15.4632 14.6803 15.0727 15.0708C14.6822 15.4613 14.049 15.4613 13.6585 15.0708L8.0016 9.41396L2.34481 15.0708C2.3387 15.0769 2.33254 15.0829 2.32632 15.0888C1.93455 15.4612 1.31501 15.4552 0.930593 15.0708C0.637703 14.7779 0.564473 14.3485 0.710923 13.9874C0.759733 13.867 0.832963 13.7542 0.930593 13.6566L6.5874 7.99976L0.930593 2.3429C0.540063 1.95238 0.540063 1.31921 0.930593 0.928686C1.32111 0.538156 1.95428 0.538156 2.3448 0.928686L8.0016 6.58546L13.6585 0.928636Z"
            fill="black"/>
    </svg>
);

type Props = {
    open: boolean,
    setOpen: (open: boolean) => void,
}

export default function EditorModal({open, setOpen}: Props) {
    const theme = useTheme();

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                className={styles.modal}
                sx={{
                    background: theme.palette.background.paper,
                }}>

                {/* header */}
                <Box className={styles.header}>
                    <Box sx={{display: "flex", alignItems: "center", gap: "20px"}}>
                        <Typography
                            fontSize={24}
                            lineHeight={"26px"}
                            color={theme.palette.text.primary}
                            fontWeight={700}
                        >
                            Редактирование аналога (1-комн.)
                        </Typography>
                        <Typography
                            fontSize={18}
                            lineHeight={"20px"}
                            color={theme.palette.accent.color}
                            fontWeight={500}
                        >
                            Объявление
                        </Typography>
                    </Box>
                    <IconButton onClick={() => setOpen(false)}>
                        <CloseIcon/>
                    </IconButton>
                </Box>

                {/* body */}
                <Box sx={{width: "100%", marginTop: "30px"}}>
                    <Box className={styles.input_row}>
                        <TextField
                            variant="outlined"
                            placeholder="Адрес"
                            value={"Шарикоподшипниковская, 123"}
                            sx={{
                                minWidth: "350px",
                                paddingRight: "20px",
                            }}
                        />
                        <TextField
                            variant="outlined"
                            placeholder="Этаж"
                            value={"3"}
                            sx={{
                                minWidth: "108px",
                                paddingRight: "5px"
                            }}
                        />
                        <Typography fontSize={18} lineHeight={"20px"} color={theme.palette.secondary.dark}
                                    fontWeight={500} sx={{paddingRight: "5px"}}>
                            из
                        </Typography>
                        <TextField
                            variant="outlined"
                            placeholder="Этаж"
                            value={"24"}
                            sx={{minWidth: "64px", paddingRight: "20px"}}
                        />
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel>Ремонт</InputLabel>
                            <Select>
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>

                                <MenuItem value={10}>Один</MenuItem>
                                <MenuItem value={20}>Два</MenuItem>
                                <MenuItem value={30}>Три</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box className={styles.input_row}>
                        <TextField
                            variant="outlined"
                            placeholder="S общая"
                            value={"45"}
                            sx={{
                                minWidth: "183px",
                                paddingRight: "5px"
                            }}
                        />
                        <Typography fontSize={18} lineHeight={"20px"} color={theme.palette.secondary.dark}
                                    fontWeight={500} sx={{paddingRight: "20px"}}>
                            м²
                        </Typography>
                        <TextField
                            variant="outlined"
                            placeholder="S кухни"
                            value={"163"}
                            sx={{minWidth: "163px", paddingRight: "5px"}}
                        />
                        <Typography fontSize={18} lineHeight={"20px"} color={theme.palette.secondary.dark}
                                    fontWeight={500} sx={{paddingRight: "20px"}}>
                            м²
                        </Typography>
                        <FormControl variant="outlined" sx={{minWidth: "190px", paddingRight: "20px"}}>
                            <InputLabel>Балкон</InputLabel>
                            <Select>
                                <MenuItem value={true}>Да</MenuItem>
                                <MenuItem value={false}>Нет</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            variant="outlined"
                            placeholder="до метро пешком"
                            value={"163"}
                            sx={{minWidth: "205px", paddingRight: "5px"}}
                        />
                        <Typography fontSize={18} lineHeight={"20px"} color={theme.palette.secondary.dark}
                                    fontWeight={500}>
                            мин
                        </Typography>
                    </Box>
                    <Box className={styles.input_row} sx={{justifyContent: "space-between"}}>
                        <Box sx={{display: "flex", alignItems: "center", gap: "20px"}}>
                            <Typography fontSize={18} lineHeight={"20px"} fontWeight={700}
                                        color={theme.palette.secondary.dark}>
                                Цена общая
                            </Typography>
                            <TextField
                                variant="outlined"
                                placeholder="Цена"
                                value={"163"}
                                sx={{minWidth: "165px"}}
                            />
                        </Box>
                        <Button variant={"mainActive"} sx={{width: "300px", height: "60px"}}>
                            Сохранить изменения
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
}
