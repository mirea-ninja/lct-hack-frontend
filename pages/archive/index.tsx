import React, { useState } from "react";
import Header from "../../components/main/Header";
import { Box, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import AppButton from "../../components/buttons/AppButton";
import FilterIcon from "../../components/icons/FilterIcon";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "../../components/icons/SearchIcon";
import ArchiveList from "../../components/lists/ArchiveList";
import ArchiveFilterMenu from "../../components/menus/ArchiveFilterMenu";
import TagItem from "../../components/items/TagItem";
import NoResultItem from "../../components/items/NoResultItem";
import CircularProgress from "@mui/material/CircularProgress";
import Autocomplete from "@mui/material/Autocomplete";
import { useStore } from "../../logic/DataStore";
import { toJS } from "mobx";
import { useMutation, useQuery } from "@tanstack/react-query";
import { observer } from "mobx-react";
import { useApiClient } from "../../logic/ApiClientHook";
import { QueryGet } from "../../apiConnection/gen/models/query-get";

type Props = {};

export default function ArchivePage({}: Props) {
  const apiClient = useApiClient();
  const [type, setType] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [filtredData, setFiltredData] = useState<QueryGet[]>([]);
  const open = Boolean(anchorEl);

  const { data, isLoading, error } = useQuery({
    queryFn: () =>
      apiClient.queryApi.getAllApiQueryGet(
        "desc",
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        35
      ),
    onSuccess: (data) => {
      setFiltredData(data.data);
    },
  });

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };

  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  return (
    <Box>
      <Header isArchive={true} />

      {/* Индикатор загрузки */}
      {isLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {/* Список архивов */}
      {data && (
        <Box sx={{ padding: "30px" }}>
          <Typography
            variant="h4"
            sx={{
              marginBottom: "50px",
              fontWeight: 700,
              fontSize: "24px",
              lineHeight: "26px",
              color: "var(--text-clr-main)",
            }}
          >
            Архив запросов
          </Typography>
          <Stack sx={{ mb: "30px", gap: "20px" }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack direction="row" sx={{ gap: "20px" }}>
                <AppButton
                  variant="secondary"
                  size="small"
                  startIcon={<FilterIcon />}
                  onClick={handleClick}
                >
                  Фильтр
                </AppButton>
                <ArchiveFilterMenu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                />
                <Select value={type} onChange={handleChange} displayEmpty>
                  <MenuItem value="new">Сначала новые</MenuItem>
                  <MenuItem value="old">Сначала старые</MenuItem>
                </Select>
              </Stack>
              <TextField
                onChange={(e) => {
                  const value = e.target.value;
                  const filtred = data.data.filter((item) => {
                    if (item.name !== undefined) {
                      return item.name
                        .toLowerCase()
                        .includes(value.toLowerCase());
                    }
                    return false;
                  });
                  setFiltredData(filtred);
                }}
                placeholder="Поиск"
                sx={{ width: "330px" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
            <Stack direction="row" sx={{ gap: "20px" }}>
              <TagItem
                label="Запросы с 01.01.2022 по 04.11.2022"
                onDelete={handleDelete}
              />
              <TagItem
                label="Запросы с 01.01.2022 по 04.11.2022"
                onDelete={handleDelete}
              />
            </Stack>
          </Stack>
          {/* Список архивов */}

          {filtredData.length > 0 ? (
            <ArchiveList data={filtredData} />
          ) : (
            <Box>
              <br />
              <NoResultItem />
              <br />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}
