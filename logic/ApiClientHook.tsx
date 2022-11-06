import React, { useContext } from "react"
import AxiosRequestConfig from "axios"
import {
  Configuration,
  ConfigurationParameters,
} from "../apiConnection/gen/configuration"
import {
  ApartmentApi,
  AuthApi,
  PoolApi,
  QueryApi,
  SubqueryApi,
  UsersApi,
} from "../apiConnection/gen/api"
import globalAxios, { AxiosResponse, AxiosInstance } from "axios"
import applyCaseMiddleware from "axios-case-converter"
import { ParserApi } from "../apiConnection/parser/apis/parser-api"

class ApiClient {
  apartmentApi: ApartmentApi
  authApi: AuthApi
  poolApi: PoolApi
  queryApi: QueryApi
  subqueryApi: SubqueryApi
  usersApi: UsersApi
  parser: ParserApi

  constructor() {
    let config = new Configuration({
      basePath: "http://37.230.196.151:8080",
      //accessToken: "Bearer " + window.sessionStorage.getItem("user"),
      baseOptions: {
        headers: {
          Authorization:
            "Bearer " +
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Njg4MDY0OTksImlhdCI6MTY2NzU5Njg5OSwianRpIjoiOWRhMGEyNTItYmFlYy00YmQzLTg4MDEtNTI3MzE3ZjdkZWU1Iiwic3ViIjoiOTdmNmJmYzAtY2I2MC00NTI0LTlmN2ItYjhmOTZmZmIxNzQxIiwiZW1haWwiOiJ1c2VyQGV4YW1wbGUuY29tIiwiZmlyc3RfbmFtZSI6InN0cmluZyIsImxhc3RfbmFtZSI6InN0cmluZyIsIm1pZGRsZV9uYW1lIjoic3RyaW5nIn0.XLGRwGZ1KbhBQMQ3_lpv6yD4vtJiEVkpr11R0sBLWP8",
        },
      },
    })

    let parserConfig = new Configuration({
      basePath: "https://parser.lct.mirea.ninja",
      //accessToken: "Bearer " + window.sessionStorage.getItem("user"),
      baseOptions: {
        headers: {
          Authorization:
            "Bearer " +
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Njg4MDY0OTksImlhdCI6MTY2NzU5Njg5OSwianRpIjoiOWRhMGEyNTItYmFlYy00YmQzLTg4MDEtNTI3MzE3ZjdkZWU1Iiwic3ViIjoiOTdmNmJmYzAtY2I2MC00NTI0LTlmN2ItYjhmOTZmZmIxNzQxIiwiZW1haWwiOiJ1c2VyQGV4YW1wbGUuY29tIiwiZmlyc3RfbmFtZSI6InN0cmluZyIsImxhc3RfbmFtZSI6InN0cmluZyIsIm1pZGRsZV9uYW1lIjoic3RyaW5nIn0.XLGRwGZ1KbhBQMQ3_lpv6yD4vtJiEVkpr11R0sBLWP8",
        },
      },
    })

    let http = applyCaseMiddleware(globalAxios)

    this.apartmentApi = new ApartmentApi(config, config.basePath, http)
    this.authApi = new AuthApi(config, config.basePath, http)
    this.poolApi = new PoolApi(config, config.basePath, http)
    this.queryApi = new QueryApi(config, config.basePath, http)
    this.subqueryApi = new SubqueryApi(config, config.basePath, http)
    this.usersApi = new UsersApi(config, config.basePath, http)
    this.parser = new ParserApi(parserConfig, parserConfig.basePath, http)
  }
}

const ApiClientContext = React.createContext<ApiClient>(new ApiClient())

type Props = {
  children: React.ReactNode
}

export const ApiClientContextProvider = ({ children }: Props) => {
  return (
    <ApiClientContext.Provider value={new ApiClient()}>
      {children}
    </ApiClientContext.Provider>
  )
}

export const useApiClient = (): ApiClient => {
  const apiClient = useContext(ApiClientContext)
  return apiClient
}
