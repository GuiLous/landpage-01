import { Status } from '@/store/slices/userSlice'

const statusMap = {
  online: 'Online',
  offline: 'Offline',
  away: 'Ausente',
  in_game: 'Em jogo',
  teaming: 'Em grupo',
  queued: 'Na fila',
}

export const humanizeStatus = (status: Status) => statusMap[status]
