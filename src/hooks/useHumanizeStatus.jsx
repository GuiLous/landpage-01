const statusMap = {
  online: 'Disponível',
  offline: 'Offline',
  away: 'Ausente',
  in_game: 'Em partida',
  teaming: 'Em grupo',
  queued: 'Na fila',
}

const useHumanizeStatus = (status) => statusMap[status]

export default useHumanizeStatus
