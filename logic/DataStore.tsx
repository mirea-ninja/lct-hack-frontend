import React, { useContext } from "react"
import AxiosRequestConfig from "axios"
import { makeAutoObservable } from "mobx"
import { QueryGet } from "../apiConnection/gen/models/query-get"
import {
  Configuration,
  ConfigurationParameters,
} from "../apiConnection/gen/configuration"
import { create, persist } from "mobx-persist"
import { enableStaticRendering } from "mobx-react"

enableStaticRendering(typeof window === "undefined")

export const isServer = typeof window === "undefined"

let store: Store

export const initializeStore = (): Store => {
  const _store = store ?? new Store()

  // For server side rendering always create a new store
  if (typeof window === "undefined") return _store

  // Create the store once in the client
  if (!store) store = _store

  const hydrate = create({
    storage: localStorage,
    jsonify: true,
  })

  hydrate("store", _store)

  return _store
}

class Store {
  @persist queryGetData: QueryGet | null = null
  @persist fileName: string = ""
  @persist isLoadedWithFile: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  updGetQueryData = (data: QueryGet) => {
    this.queryGetData = data
  }
}

const StoreContext = React.createContext<Store>(new Store())

type Props = {
  value: Store
  children: React.ReactNode
}

export const StoreContextProvider = ({ children, value }: Props) => {
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export const useStore = (): Store => {
  return useContext(StoreContext)
}
