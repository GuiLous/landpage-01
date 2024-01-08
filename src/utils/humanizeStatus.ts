import { Status } from '@/store/userStore'

const statusMap = {
  online: 'Online',
  offline: 'Offline',
  away: 'Ausente',
  in_game: 'Em jogo',
  teaming: 'Em grupo',
  queued: 'Na fila',
}

export const humanizeStatus = (status: Status) => statusMap[status]
