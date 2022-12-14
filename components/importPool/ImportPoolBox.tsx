import {
  Box,
  Typography,
  TextField,
  Stack,
  Button,
  useTheme,
  CircularProgress,
} from "@mui/material"
import React, { useState } from "react"
import Dropzone from "react-dropzone"
import styles from "../../styles/Dropzone.module.scss"
import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { observer } from "mobx-react"
import NewFileIcon from "../icons/NewFileIcon/NewFileIcon"
import DeleteIcon from "../icons/DeleteIcon/DeleteIcon"
import { useApiClient } from "../../logic/ApiClientHook"
import { useStore } from "../../logic/DataStore"

type Props = {}

export const ImportPoolBox = observer(({}: Props) => {
  let theme = useTheme()
  const [poolName, setPoolName] = useState("")
  const client = useApiClient()
  const store = useStore()

  const isLoadedWithFile = store.file != null
  const isActive = store.queryGetData == null

  const handleDrop = (acceptedFiles: File[]) => {
    console.log(acceptedFiles)
    store.file = acceptedFiles[0]
  }

  const discardFile = () => {
    store.queryGetData = null
    store.file = null
  }

  const { mutate, isLoading, isError, isSuccess } = useMutation({
    mutationFn: (params: { name: string; file: Blob }) => {
      return client.poolApi.createApiPoolPostForm(params.file, params.name)
    },
    onSettled(data, error, variables, context) {},
    onSuccess(data) {
      console.log("MUTATED")
      console.log(data.data)
      store.queryGetData = data.data
    },
  })

  const onButtonClick = () => {
    if (!isLoadedWithFile) {
      return
    }
    mutate({ name: store.poolName ? store.poolName : store.file!.name, file: store.file as Blob })
  }



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
        ?????????? ????????????
      </Typography>
      <Stack marginTop={5} gap={0.5}>
        <TextField
          size="small"
          id="outlined-read-only-input"
          placeholder="???????????????? ??????????????"
          value={poolName}
          onChange={
            (e) => {
              setPoolName(e.target.value)
              store.poolName = e.target.value
            }}
        />
        <Typography variant="body2" sx={{ color: theme.text.secondary }}>
          ???????????? ???????????????? ?????? ???????? ????????????, ?????????? ?? ???????????????? ?????????????????????????? ??????????
          ???????????????? ???????????????????????? ??????????
        </Typography>
      </Stack>
      <Box>
        {isLoading ? (
          <CircularProgress />
        ) : (
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
                      if (isLoadedWithFile) event.stopPropagation()
                    },
                  })}
                >
                  {isLoadedWithFile ? (
                    <>
                      <Stack gap={1}>
                        <input {...getInputProps()} />
                        <Typography paddingBottom="20px">
                          ???????????????????? ???????? ???????? <br /> ??????{" "}
                          <strong>???????????????? ???????? ?????? ????????????????</strong>
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
                            <Typography
                              noWrap
                              textOverflow="ellipsis"
                              sx={{
                                paddingLeft: "10px",
                                paddingRight: "10px",
                                color: theme.palette.accent.color,
                                width: "330px",
                              }}
                            >
                              {store.file!.name}
                            </Typography>

                            <Button
                              onClick={() => discardFile()}
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
                            ???????????? XLSX, XLS, CSV
                          </Typography>
                          <Typography>
                            ???????????????????????? ???????????? ?????????? 60 ????
                          </Typography>
                        </Stack>
                      </Stack>
                    </>
                  ) : (
                    <Stack gap={1}>
                      <input {...getInputProps()} />
                      <Typography paddingBottom="42px">
                        ???????????????????? ???????? ???????? <br /> ??????{" "}
                        <strong>???????????????? ???????? ?????? ????????????????</strong>
                      </Typography>
                      <Box></Box>
                      <Stack>
                        <Typography paddingTop="42px">
                          ???????????? XLSX, XLS, CSV
                        </Typography>
                        <Typography>???????????????????????? ???????????? ?????????? 60 ????</Typography>
                      </Stack>
                    </Stack>
                  )}
                </Box>
              )
            }}
          </Dropzone>
        )}
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
          ?????????????????? ??????
        </Button>
      </Box>
    </Stack>
  )
})

export default ImportPoolBox
