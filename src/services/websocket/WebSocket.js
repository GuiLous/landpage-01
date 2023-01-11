import useWebSocket from 'react-use-websocket'
import { useSelector, useDispatch } from 'react-redux'

import { REACT_APP_WS_URL } from '@config'
import { StorageService } from '@services'
import { updateFriend, addFriend } from '@slices/UserSlice'

export const WSS = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)
  const token = StorageService.get('token')

  useWebSocket(
    REACT_APP_WS_URL,
    {
      onMessage: (event) => handleMessageReceived(event),
      share: true,
      shouldReconnect: (closeEvent) => false,
      queryParams: { token: token },
    },
    token && user && user.account && user.account.is_verified
  )

  const handleMessageReceived = (event) => {
    const data = JSON.parse(event.data)

    switch (data.meta.action) {
      case 'ws_userStatusChange':
        dispatch(updateFriend(data.payload))
        break

      case 'ws_friendlistAdd':
        dispatch(addFriend(data.payload))
        break

      default:
        break
    }
  }
}
