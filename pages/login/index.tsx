import { FormControlLabel, TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Link } from "@mui/material";
import { Checkbox } from "@mui/material";
import { Box, Typography, useTheme } from "@mui/material";
import { StackProps } from "@mui/system";
import { BoxProps } from "@mui/system";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import AppButton from "../../components/buttons/AppButton";
import GosuslugiIcon from "../../components/icons/GosuslugiIcon";
import ACMLogoIcon from "../../components/icons/ACMLogoIcon";
import NinjaIcon from "../../components/icons/NinjaIcon";
import AppCheckbox from "../../components/checkboxes/AppCheckbox";
import styles from "../../styles/Login.module.scss";
import { useQuery } from "@tanstack/react-query";
import { useApiClient } from "../../logic/ApiClientHook";
import { UserAuth } from "../../apiConnection/gen/models/user-auth";

type Props = {};

export default function LoginPage({}: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
      }}
    >
      <LeftSide></LeftSide>
      <RightSide></RightSide>
    </Box>
  );
}

function LeftSide(props: BoxProps) {
  let theme = useTheme();

  return (
    <Box
      {...props}
      sx={{
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
        alignItems: "center",
        flex: 1,
        backgroundColor: theme.palette.primary.main,
        padding: "50px",
      }}
    >
      <ACMLogoIcon />
      <Typography
        variant="h3"
        component="h1"
        sx={{
          maxWidth: "500px",
          color: "var(--bg-clr-pure-white)",
          fontWeight: 700,
          fontSize: "55px",
          lineHeight: "60px",
        }}
      >
        Расчет рыночной стоимости жилых объектов в Москве
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" color="white" padding={1} marginTop={6}>
          by ninja
        </Typography>
        <NinjaIcon />
      </Box>
    </Box>
  );
}

function RightSide(props: StackProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const client = useApiClient();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <Box
      {...props}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        padding: "5rem",
        backgroundColor: "var(--bg-clr-pure-white)",
      }}
    >
      <Stack sx={{ maxWidth: "445px", flex: 1, width: "100%" }}>
        <form>
          <Typography
            variant="h4"
            sx={{
              marginBottom: "50px",
              fontWeight: 700,
              fontSize: "55px",
              lineHeight: "60px",
              color: "var(--text-clr-main)",
            }}
          >
            Вход
          </Typography>
          <Stack sx={{ gap: "20px" }}>
            <Stack sx={{ gap: "10px" }}>
              <TextField
                id="outlined-read-only-input"
                onChange={handleEmailChange}
                placeholder="Логин"
                name="login"
              />
              <TextField
                id="outlined-read-only-input"
                onChange={handlePasswordChange}
                placeholder="Пароль"
                name="password"
              />
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack direction="row" alignItems="center">
                <FormControlLabel
                  control={<AppCheckbox defaultChecked />}
                  label={
                    <Typography
                      sx={{
                        fontSize: "16px",
                        lineHeight: "18px",
                        fontWeight: 500,
                      }}
                    >
                      Сохранить данные
                    </Typography>
                  }
                  sx={{
                    fontSize: "16px",
                    lineHeight: "18px",
                    fontWeight: 500,
                    marginLeft: 0,
                    color: "#3E3E41",
                  }}
                />
              </Stack>
              <Link
                href=""
                sx={{
                  fontFamily: "var(--font-primary)",
                  textDecoration: "none",
                  color: "var(--accent-clr)",
                  fontWeight: 700,
                  fontSize: "16px",

                  "&:hover": {
                    color: "var(--accent-clr-hover)",
                  },
                }}
              >
                Восстановить пароль
              </Link>
            </Stack>
          </Stack>

          <Stack sx={{ gap: "30px", marginTop: "40px" }}>
            <AppButton type="submit">Войти</AppButton>
            <Typography
              align="center"
              sx={{
                fontWeight: 500,
                fontSize: "16px",
                color: "#3E3E41",
              }}
            >
              или
            </Typography>
            <Stack sx={{ gap: "20px" }}>
              <AppButton variant="secondary">Войти через SSO</AppButton>
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{
                  gap: "20px",
                }}
              >
                <AppButton
                  sx={{ flex: 1 }}
                  variant="secondary"
                  startIcon={<GosuslugiIcon />}
                >
                  Госуслуги
                </AppButton>
                <AppButton sx={{ flex: 1 }} variant="secondary">
                  Mos.ru
                </AppButton>
              </Stack>
            </Stack>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
}
