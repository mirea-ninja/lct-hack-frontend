import React from "react";

import { useTheme } from "@mui/material";
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
import { CloseIcon } from "../icons/CloseIcon";

export enum EditorModalType {
  CREATE,
  EDIT,
}

type Props = {
  type: EditorModalType;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export function EditorModal({ type, open, setOpen }: Props) {
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
        }}
      >
        {/* header */}
        <Box className={styles.header}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <Typography
              fontSize={24}
              lineHeight={"26px"}
              color={theme.palette.text.primary}
              fontWeight={700}
            >
              {type === EditorModalType.CREATE
                ? "Добавление аналога (1 комн.)"
                : "Редактирование аналога"}
            </Typography>

            {type === EditorModalType.EDIT && (
              <Typography
                fontSize={18}
                lineHeight={"20px"}
                color={theme.palette.accent.color}
                fontWeight={500}
              >
                Объявление
              </Typography>
            )}
          </Box>
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* body */}
        <Box sx={{ width: "100%", marginTop: "30px" }}>
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
                paddingRight: "5px",
              }}
            />
            <Typography
              fontSize={18}
              lineHeight={"20px"}
              color={theme.palette.secondary.dark}
              fontWeight={500}
              sx={{ paddingRight: "5px" }}
            >
              из
            </Typography>
            <TextField
              variant="outlined"
              placeholder="Этаж"
              value={"24"}
              sx={{ minWidth: "64px", paddingRight: "20px" }}
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
                paddingRight: "5px",
              }}
            />
            <Typography
              fontSize={18}
              lineHeight={"20px"}
              color={theme.palette.secondary.dark}
              fontWeight={500}
              sx={{ paddingRight: "20px" }}
            >
              м²
            </Typography>
            <TextField
              variant="outlined"
              placeholder="S кухни"
              value={"163"}
              sx={{ minWidth: "163px", paddingRight: "5px" }}
            />
            <Typography
              fontSize={18}
              lineHeight={"20px"}
              color={theme.palette.secondary.dark}
              fontWeight={500}
              sx={{ paddingRight: "20px" }}
            >
              м²
            </Typography>
            <FormControl
              variant="outlined"
              sx={{ minWidth: "190px", paddingRight: "20px" }}
            >
              <InputLabel>Балкон</InputLabel>
              <Select>
                <MenuItem value={"Да"}>Да</MenuItem>
                <MenuItem value={"Нет"}>Нет</MenuItem>
              </Select>
            </FormControl>
            <TextField
              variant="outlined"
              placeholder="до метро пешком"
              value={"163"}
              sx={{ minWidth: "205px", paddingRight: "5px" }}
            />
            <Typography
              fontSize={18}
              lineHeight={"20px"}
              color={theme.palette.secondary.dark}
              fontWeight={500}
            >
              мин
            </Typography>
          </Box>
          <Box
            className={styles.input_row}
            sx={{ justifyContent: "space-between" }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <Typography
                fontSize={18}
                lineHeight={"20px"}
                fontWeight={700}
                color={theme.palette.secondary.dark}
              >
                Цена общая
              </Typography>
              <TextField
                variant="outlined"
                placeholder="Цена"
                value={"163"}
                sx={{ minWidth: "165px" }}
              />
            </Box>
            <Button
              variant={"mainActive"}
              sx={{ width: "300px", height: "60px" }}
            >
              {type === EditorModalType.CREATE
                ? "Добавить"
                : "Сохранить изменения"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
