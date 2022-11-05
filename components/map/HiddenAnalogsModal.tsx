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
import styles from "./HiddenAnalogsModal.module.scss";
import {CloseIcon} from "../icons/CloseIcon";

type Props = {
    open: boolean,
    setOpen: (open: boolean) => void,
}

export default function HiddenAnalogsModal({open, setOpen}: Props) {
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
                            Скрытые аналоги
                        </Typography>
                    </Box>
                    <IconButton onClick={() => setOpen(false)}>
                        <CloseIcon/>
                    </IconButton>
                </Box>

                {/* body */}
                <Box sx={{width: "100%", marginTop: "30px"}}>

                </Box>
            </Box>
        </Modal>
    );
}
