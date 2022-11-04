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
      basePath: "http://localhost:8080",
      accessToken:
        "Bearer " +
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Njg3MTI0ODQsImlhdCI6MTY2NzUwMjg4NCwianRpIjoiYjBkNGMyOTMtMjYxMS00N2VmLTllNjAtN2QzZWVkNjQzMmQzIiwic3ViIjoiMDNkODcwNmYtNmU5OS00ODA1LThkMTItY2FhNzI1MjlhNjU3IiwiZW1haWwiOiJ1c2VyQGV4YW1wbGUuY29tIiwiZmlyc3RfbmFtZSI6InN0cmluZyIsImxhc3RfbmFtZSI6InN0cmluZyIsIm1pZGRsZV9uYW1lIjoic3RyaW5nIn0.8YTD7mycUOJV4gpSFHLlQV7qsDd1B2_H96iU1-DmLJ4",
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
