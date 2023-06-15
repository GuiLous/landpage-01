import { createContext, useContext, useState } from 'react'

import { LobbiesAPI } from '@api'
import { StorageService } from '@services'

const InitLobbyContext = createContext({})

export function InitLobbyProvider({ children }) {
  const [fetching, setFetching] = useState(false)

  const initLobby = async (lobbyId) => {
    setFetching(true)
    const userToken = StorageService.get('token')

    const response = await LobbiesAPI.detail(userToken, lobbyId)
    setFetching(false)

    return response
  }

  return (
    <InitLobbyContext.Provider value={{ fetching, initLobby }}>
      {children}
    </InitLobbyContext.Provider>
  )
}

export const useInitLobby = () => useContext(InitLobbyContext)
