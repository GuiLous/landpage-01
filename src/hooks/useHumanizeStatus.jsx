const statusMap = {
  online: 'Online',
  offline: 'Offline',
  away: 'Ausente',
  in_game: 'Em jogo',
  teaming: 'Em grupo',
  queued: 'Na fila',
}

const useHumanizeStatus = (status) => statusMap[status]

export default useHumanizeStatus
