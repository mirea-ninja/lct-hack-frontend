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
import styles from "../../../styles/Dropzone.module.scss"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useApiClient } from "../../../logic/ApiClientHook"
import { QueryGet } from "../../../apiConnection/gen"
import axios from "axios"
import HeaderTab from "../../../components/main/HeaderTab"
import StepProgress from "../../../components/step/StepProgress"
import DeleteIcon from "../../../components/icons/DeleteIcon/DeleteIcon"
import NewFileIcon from "../../../components/icons/NewFileIcon/NewFileIcon"

type Props = {}

export default function ImportPoolBox({}: Props) {
  let isActive = true // Поменять на логику с query в бэк
  let theme = useTheme()
  const [poolName, setPoolName] = useState("")
  const client = useApiClient()

  const [file, setFile] = useState<File | null>(null)
  const [newName, setNewName] = useState<string | null>(null)
  const isLoadedWithFile = file != null

  const handleDrop = (acceptedFiles: File[]) => {
    console.log(acceptedFiles)
    setFile(acceptedFiles[0])
  }

  const onButtonClick = () => {
    if (file == null) {
      return
    }

    mutate({ name: newName ?? "123", file: file as Blob })
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
  })

  if (isLoading) return "Loading..."

  return (
    <Stack
      sx={{
        // flex: 1,
        width: "563px",
        minWidth: "470px",
        maxWidth: "470px",
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
        <Typography variant="body2" sx={{color: theme.text.secondary}}>
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
              : isLoadedWithFile
              ? styles.file_loaded
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
                  onClick: (event) => {
                    if (isLoadedWithFile)
                      event.stopPropagation()
                    }
                })}
              >
                {isLoadedWithFile ? (
                  <>
                  <Stack gap={1}>
                    <input {...getInputProps()} />
                    <Typography paddingBottom="20px">
                      Перетащите файл сюда <br/> или {" "}
                      <strong>выберите файл для загрузки</strong>
                    </Typography>
                    <Box>
                      <Stack
                          direction="row"
                          alignItems="center"
                          sx={{
                            padding: "10px",
                            borderRadius: "10px",
                            backgroundColor: theme.palette.accent.light,
                          }}
                        >
                          <NewFileIcon />
                          <Typography noWrap
                            textOverflow="ellipsis"
                            sx={{
                              paddingLeft: "10px",
                              paddingRight: "10px",
                              color: theme.palette.accent.color,
                              width: "330px",
                            }}
                          >
                           {file.name}
                          </Typography>

                          <Button
                            onClick={() => setFile(null)}
                            sx={{
                              padding: "0px",
                              minWidth: "0px",
                              width: "24px",
                              height: "24px",
                            }}
                          >
                            <DeleteIcon />
                          </Button>
                      </Stack>
                    </Box>
                    <Stack>
                      <Typography paddingTop="20px">
                        Формат XLSX, XLS, CSV
                      </Typography>
                      <Typography>Максимальный размер файла 60 мб</Typography>
                    </Stack>
                  </Stack>

                  </>
                ) : (
                  <Stack gap={1}>
                    <input {...getInputProps()} />
                    <Typography paddingBottom="42px">
                      Перетащите файл сюда <br/> или {" "}
                      <strong>выберите файл для загрузки</strong>
                    </Typography>
                    <Box></Box>
                    <Stack>
                      <Typography paddingTop="42px">
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
          variant={isLoadedWithFile ? "mainActive" :"mainDisabled"}
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
