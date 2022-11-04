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
      accessToken: "Bearer " + window.sessionStorage.getItem("user")
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
