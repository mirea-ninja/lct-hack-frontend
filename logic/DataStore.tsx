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
import { makePersistable } from "mobx-persist-store"

enableStaticRendering(typeof window === "undefined")

export const isServer = typeof window === "undefined"

let localStore: Store

export const initializeStore = async (): Promise<Store> => {
  const _store = localStore ?? new Store()

  // For server side rendering always create a new store
  if (typeof window === "undefined") return _store

  // Create the store once in the client
  if (!localStore) localStore = _store

  // const hydrate = create({
  //   storage: localStorage,
  //   jsonify: false,
  // })

  // console.log("STORE LOCAL")
  // await hydrate("some", localStore)

  return _store
}

export class Store {
  queryGetData: QueryGet | null = null
  fileName: string = ""
  isLoadedWithFile: boolean = false

  constructor() {
    makeAutoObservable(this)

    if (typeof window !== "undefined") {
      console.log("Make persistable")
      // makePersistable(this, {
      //   name: "Store",
      //   properties: ["queryGetData", "fileName", "isLoadedWithFile"],
      //   storage: window.localStorage,
      // })
    }
  }

  updGetQueryData = (data: QueryGet) => {
    this.queryGetData = data
  }
}

const StoreContext = React.createContext<Store>(new Store())

type Props = {
  value: Store | null
  children: React.ReactNode
}

export const StoreContextProvider = ({ children, value }: Props) => {
  console.log(value)

  return (
    <StoreContext.Provider value={value ?? new Store()}>
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = (): Store => {
  return useContext(StoreContext)
}
