import { Button } from '@chakra-ui/react'

export default function MatchHistoryPaginationItem({
  isCurrent = false,
  number,
  onPageChange,
}) {
  if (isCurrent) {
    return (
      <Button variant="pagination" isDisabled>
        {number}
      </Button>
    )
  }

  return (
    <Button variant="pagination" onClick={() => onPageChange(number)}>
      {number}
    </Button>
  )
}
