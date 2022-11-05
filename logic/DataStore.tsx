import React, { useContext } from "react"
import AxiosRequestConfig from "axios"
import { makeAutoObservable } from "mobx"
import { QueryGet } from "../apiConnection/gen/models/query-get"
import {
  Configuration,
  ConfigurationParameters,
} from "../apiConnection/gen/configuration"

class Store {
  queryGetData: QueryGet | null = null

  constructor() {
    makeAutoObservable(this)
  }

  updGetQueryData = (data: QueryGet) => {
    this.queryGetData = data
  }
}

const StoreContext = React.createContext<Store>(new Store())

type Props = {
  children: React.ReactNode
}

export const StoreContextProvider = ({ children }: Props) => {
  return (
    <StoreContext.Provider value={new Store()}>
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = (): Store => {
  const store = useContext(StoreContext)
  return store
}
