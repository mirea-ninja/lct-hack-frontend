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

class ApiClient {
  apartmentApi: ApartmentApi
  authApi: AuthApi
  poolApi: PoolApi
  queryApi: QueryApi
  subqueryApi: SubqueryApi
  usersApi: UsersApi

  constructor() {
    let config = new Configuration({
      basePath: process.env.NEXT_APP_API_URL,
      //accessToken: "Bearer " + window.sessionStorage.getItem("user"),
      baseOptions: {
        headers: {
          Authorization:
            "Bearer " +
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Njg4MDY0OTksImlhdCI6MTY2NzU5Njg5OSwianRpIjoiOWRhMGEyNTItYmFlYy00YmQzLTg4MDEtNTI3MzE3ZjdkZWU1Iiwic3ViIjoiOTdmNmJmYzAtY2I2MC00NTI0LTlmN2ItYjhmOTZmZmIxNzQxIiwiZW1haWwiOiJ1c2VyQGV4YW1wbGUuY29tIiwiZmlyc3RfbmFtZSI6InN0cmluZyIsImxhc3RfbmFtZSI6InN0cmluZyIsIm1pZGRsZV9uYW1lIjoic3RyaW5nIn0.XLGRwGZ1KbhBQMQ3_lpv6yD4vtJiEVkpr11R0sBLWP8",
        },
      },
    })

    this.apartmentApi = new ApartmentApi(config)
    this.authApi = new AuthApi(config)
    this.poolApi = new PoolApi(config)
    this.queryApi = new QueryApi(config)
    this.subqueryApi = new SubqueryApi(config)
    this.usersApi = new UsersApi(config)
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
