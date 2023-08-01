import { Button } from '@chakra-ui/react'

export default function MatchHistoryPaginationItem({
  isCurrent = false,
  content,
  onPageChange,
}) {
  if (isCurrent) {
    return (
      <Button variant="pagination" isDisabled>
        {content}
      </Button>
    )
  }

  return content === '...' ? (
    <Button
      variant="pagination"
      cursor="initial"
      letterSpacing="2px"
      ps="2px"
      _hover={{
        bgColor: 'gray.700',
        color: 'gray.300',
      }}
    >
      {content}
    </Button>
  ) : (
    <Button variant="pagination" onClick={() => onPageChange(Number(content))}>
      {content}
    </Button>
  )
}
