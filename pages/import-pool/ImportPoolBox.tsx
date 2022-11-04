import {
  Box,
  Typography,
  TextField,
  Stack,
  Button,
  useTheme,
} from "@mui/material"
import React, { useState } from "react"
import Dropzone from "react-dropzone"
import styles from "../../styles/Dropzone.module.scss"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useApiClient } from "../../logic/ApiClientHook"
import axios from "axios"
import { useStore } from "../../logic/DataStore"
import { QueryGet } from "../../apiConnection/gen/models/query-get"

type Props = {}

export default function ImportPoolBox({}: Props) {
  let isActive = false // Поменять на логику с query в бэк
  let theme = useTheme()
  const [poolName, setPoolName] = useState("")
  const client = useApiClient()

  const [file, setFile] = useState<File | null>(null)
  const [newName, setNewName] = useState<string | null>(null)
  const isLoadedWithFile = file != null

  const store = useStore()
  console.log(store.queryGetData)

  const handleDrop = (acceptedFiles: File[]) => {
    console.log(acceptedFiles)
    setFile(acceptedFiles[0])
  }

  const onButtonClick = () => {
    if (!isLoadedWithFile) {
      return
    }

    mutate({ name: newName ?? "", file: file as Blob })
  }

  const { mutate, isLoading, isError, isSuccess } = useMutation({
    mutationFn: (params: { name: string; file: Blob }) => {
      return client.poolApi.createPoolPostForm(params.file, params.name)
    },
    onSettled(data, error, variables, context) {
      console.log(data)
      console.log(error)
      console.log(variables)
      console.log(context)
    },
    onSuccess(data) {
      console.log("SUCCESS")
      store.updGetQueryData(data.data)
    },
  })

  if (isLoading) return <div>Loading...</div>

  return (
    <Stack
      sx={{
        // flex: 1,
        width: "563px",
        backgroundColor: isActive ? theme.palette.background.paper : null,
      }}
      height="678px"
      padding={3}
      borderRadius={5}
    >
      <Typography
        variant="h4"
        fontWeight="700"
        sx={{
          fontSize: "24px",
          color: theme.text.primary,
        }}
      >
        Новый запрос
      </Typography>
      <Stack marginTop={5} gap={0.5}>
        <TextField
          size="small"
          id="outlined-read-only-input"
          placeholder="Название запроса"
          value={poolName}
          onChange={(ev) => setPoolName(ev.target.value)}
        />
        <Typography variant="body2">
          Можете оставить это поле пустым, тогда в названии автоматически будет
          название загруженного файла
        </Typography>
      </Stack>
      <Box>
        <Dropzone
          onDrop={(accepted, rejected, event) => handleDrop(accepted)}
          minSize={1024}
          maxSize={3072000}
          maxFiles={1}
          accept={{
            ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]:
              [".xlsx", ".xlsb", ".xlsm", ".xls", ".xml", ".csv"],
          }}
        >
          {({
            getRootProps,
            getInputProps,
            isDragActive,
            isDragAccept,
            isDragReject,
          }) => {
            const additionalClass = isDragAccept
              ? styles.accept
              : isDragReject
              ? styles.reject
              : ""

            return (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  minHeight: "150px",
                }}
                {...getRootProps({
                  className: `dropzone ${styles.dropzone} ${additionalClass}`,
                })}
              >
                {isLoadedWithFile ? (
                  <>
                    <Typography
                      sx={{
                        color: theme.text.primary,
                      }}
                    >
                      Загружен файл: <strong>{file.name}</strong>
                    </Typography>
                  </>
                ) : (
                  <Stack gap={1}>
                    <input {...getInputProps()} />
                    <Typography>
                      Перетащите файл сюда <br /> или{" "}
                      <strong>выберите файл для загрузки</strong>
                    </Typography>
                    <Box></Box>
                    <Stack>
                      <Typography paddingTop="84px">
                        Формат XLSX, XLS, CSV
                      </Typography>
                      <Typography>Максимальный размер файла 60 мб</Typography>
                    </Stack>
                  </Stack>
                )}
              </Box>
            )
          }}
        </Dropzone>
      </Box>
      <Box display="flex" justifyContent="center" marginTop="50px">
        <Button
          variant={isLoadedWithFile ? "mainActive" : "mainDisabled"}
          sx={{
            height: "52px",
            width: "329px",
          }}
          onClick={() => {
            onButtonClick()
          }}
        >
          Загрузить пул
        </Button>
      </Box>
    </Stack>
  )
}
