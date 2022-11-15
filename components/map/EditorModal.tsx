import React from "react";

import { Link, useTheme } from "@mui/material";
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
import { SubQueryGet } from "../../apiConnection/gen/models/sub-query-get";
import { useStore } from "../../logic/DataStore";
import { useApiClient } from "../../logic/ApiClientHook";
import { ApartmentGet } from "../../apiConnection/gen/models/apartment-get";
import { ApartmentCreate } from "../../apiConnection/gen";

export enum EditorModalType {
  CREATE,
  EDIT,
}

type Props = {
  type: EditorModalType;
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedSubQueryGuid: string;
  analog: ApartmentGet | undefined;
};

export function EditorModal({
  type,
  open,
  setOpen,
  selectedSubQueryGuid,
  analog,
}: Props) {
  const theme = useTheme();

  const store = useStore();
  const apiClient = useApiClient();

  const link = analog?.link ?? "https://www.example.com";
  const [address, setAddress] = React.useState(analog ? analog.address : "");
  const [floor, setFloor] = React.useState(analog ? analog.floor : 1);
  const [floors, setFloors] = React.useState(analog ? analog.floors : 5);
  const [quality, setQuality] = React.useState(
    analog ? analog.quality : "без отделки"
  );
  const [apartmentArea, setApartmentArea] = React.useState(
    analog ? analog.apartmentArea : 50
  );
  const [kitchenArea, setKitchenArea] = React.useState(
    analog ? analog.kitchenArea : 10
  );
  const [hasBalcony, setHasBalcony] = React.useState(
    analog ? analog.hasBalcony : false
  );
  const [distanceToMetro, setDistanceToMetro] = React.useState(
    analog ? analog.distanceToMetro : 0
  );
  const [price, setPrice] = React.useState(analog ? analog.price : 0);

  const onEditComplete = () => {
    if (store.queryGetData === null) return;

    const selectedSubQueryIndex = store.queryGetData.subQueries.findIndex(
      (subQuery) => subQuery.guid === selectedSubQueryGuid
    );

    if (selectedSubQueryIndex === -1) return;

    const analogs =
      store.queryGetData.subQueries[selectedSubQueryIndex].analogs!;

    if (type === EditorModalType.EDIT) {
      const analogIndex = analogs.findIndex((a) => a.guid === analog?.guid);

      if (analogIndex === -1) return;

      store.queryGetData.subQueries[selectedSubQueryIndex].analogs![
        analogIndex
      ] = {
        ...analogs[analogIndex],
        address,
        floor,
        floors,
        quality,
        apartmentArea,
        kitchenArea,
        hasBalcony,
        distanceToMetro,
        price,
        link,
      };

      apiClient.apartmentApi.updateApiQueryIdSubquerySubidApartmentAidPut(
        { ...analogs[analogIndex] },
        store.queryGetData.guid,
        selectedSubQueryGuid,
        analogs[analogIndex].guid
      );
    } else if (type === EditorModalType.CREATE) {
      const standartObject =
        store.queryGetData.subQueries[selectedSubQueryIndex].standartObject;

      if (standartObject === undefined) return;

      const segment = standartObject.segment;
      const walls = standartObject.walls;
      const rooms = standartObject.rooms;

      const newAnalog: ApartmentCreate = {
        address,
        floor,
        floors,
        quality,
        apartmentArea,
        kitchenArea,
        hasBalcony,
        distanceToMetro,
        segment: segment.toLowerCase(),
        walls: walls!.toLowerCase(),
        rooms,
        price,
      };

      apiClient.apartmentApi
        .createApiQueryIdSubquerySubidApartmentPost(
          { ...newAnalog },
          store.queryGetData.guid,
          selectedSubQueryGuid
        )
        .then((response) => {
          store.queryGetData!.subQueries[selectedSubQueryIndex].analogs!.push({
            ...newAnalog,
            guid: response.data.guid,
          });

          // Устанавливаем новый аналог в качестве выбранного аналога в локальном состоянии
          store.queryGetData!.subQueries[
            selectedSubQueryIndex
          ].selectedAnalogs = [
            ...store.queryGetData!.subQueries[selectedSubQueryIndex]
              .selectedAnalogs,
            {
              ...newAnalog,
              guid: response.data.guid,
            },
          ];

          // Заново устанавливаем аналоги, чтобы обновить список
          apiClient.subqueryApi
            .createAnalogsApiQueryIdSubquerySubidAnalogsPost(
              analogs,
              store.queryGetData!.guid,
              selectedSubQueryGuid
            )
            .then(() => {
              // Заново выбираем аналоги
              apiClient.subqueryApi.setAnalogsApiQueryIdSubquerySubidUserAnalogsPost(
                store.queryGetData!.guid,
                selectedSubQueryGuid,
                { guids: analogs.map((a) => a.guid) }
              );
            });
        });
    }
  };

  const handleClick = () => {
    onEditComplete();
    setOpen(false);
  };

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

            {type === EditorModalType.EDIT &&
              link !== "https://www.example.com" && (
                <Link
                  href={link !== "https://www.example.com" ? link : "#"}
                  target={
                    link !== "https://www.example.com" ? "_blank" : "_self"
                  }
                  sx={{ textDecoration: "none" }}
                >
                  <Typography
                    fontSize={18}
                    lineHeight={"20px"}
                    color={theme.palette.accent.color}
                    fontWeight={500}
                  >
                    Объявление
                  </Typography>
                </Link>
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
              value={address}
              sx={{
                minWidth: "350px",
                paddingRight: "20px",
              }}
              onChange={(e) => setAddress(e.target.value)}
            />
            <TextField
              variant="outlined"
              placeholder="Этаж"
              value={floor}
              sx={{
                minWidth: "108px",
                paddingRight: "5px",
              }}
              onChange={(e) => setFloor(parseInt(e.target.value))}
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
              value={floors}
              sx={{ minWidth: "64px", paddingRight: "20px" }}
              onChange={(e) => setFloors(parseInt(e.target.value))}
            />
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Отделка</InputLabel>
              <Select
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
              >
                <MenuItem value={"без отделки"}>Без отделки</MenuItem>
                <MenuItem value={"муниципальный ремонт"}>
                  Муниципальный ремонт
                </MenuItem>
                <MenuItem value={"современная отделка"}>
                  Современная отделка
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box className={styles.input_row}>
            <TextField
              variant="outlined"
              placeholder="S общая"
              value={apartmentArea}
              sx={{
                minWidth: "183px",
                paddingRight: "5px",
              }}
              onChange={(e) => setApartmentArea(parseInt(e.target.value))}
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
              value={kitchenArea}
              sx={{ minWidth: "163px", paddingRight: "5px" }}
              onChange={(e) => setKitchenArea(parseInt(e.target.value))}
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

              <Select
                value={hasBalcony ? "есть" : "нет"}
                onChange={(value) => {
                  setHasBalcony(value.target.value === "есть");
                }}
              >
                <MenuItem value={"есть"}>Есть</MenuItem>
                <MenuItem value={"нет"}>Нет</MenuItem>
              </Select>
            </FormControl>
            <TextField
              variant="outlined"
              placeholder="до метро пешком"
              value={distanceToMetro}
              sx={{ minWidth: "205px", paddingRight: "5px" }}
              onChange={(e) => setDistanceToMetro(parseInt(e.target.value))}
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
                color={theme.palette.text.primary}
              >
                Цена общая
              </Typography>
              <TextField
                variant="outlined"
                placeholder="Цена"
                value={price}
                sx={{ minWidth: "165px" }}
                onChange={(e) => setPrice(parseInt(e.target.value))}
              />
            </Box>
            <Button
              variant={"mainActive"}
              sx={{ width: "300px", height: "60px" }}
              onClick={handleClick}
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
