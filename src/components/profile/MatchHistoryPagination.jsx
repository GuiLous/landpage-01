import { Icon } from '@chakra-ui/react'

import {
  ArrowRightSimpleIcon,
  Container,
  MatchHistoryPaginationItem,
} from '@components'

import style from './MatchHistoryPagination.module.css'

const siblingsCount = 1

const generatePagesArray = (from, to) => {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1
    })
    .filter((page) => page > 0)
}

export default function MatchHistoryPagination({
  totalPages,
  currentPage = 1,
  onPageChange,
}) {
  const lastPage = totalPages

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : []

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage)
        )
      : []

  return (
    <Container gap={12} align="center" justify="center">
      {currentPage > 1 && (
        <Container
          align="center"
          justify="center"
          fitContent
          className={style.icon}
        >
          <Icon
            as={ArrowRightSimpleIcon}
            color="gray.300"
            h="16px"
            w="16px"
            transform="scaleX(-1)"
            data-testid="previous-icon"
            onClick={() => onPageChange(currentPage - 1)}
          />
        </Container>
      )}

      {currentPage > 1 + siblingsCount && (
        <>
          <MatchHistoryPaginationItem onPageChange={onPageChange} content="1" />
          {currentPage > 2 + siblingsCount && (
            <MatchHistoryPaginationItem
              onPageChange={onPageChange}
              content="..."
            />
          )}
        </>
      )}

      {previousPages.length > 0 &&
        previousPages.map((page) => {
          return (
            <MatchHistoryPaginationItem
              onPageChange={onPageChange}
              key={page}
              content={String(page)}
            />
          )
        })}

      <MatchHistoryPaginationItem
        onPageChange={onPageChange}
        content={String(currentPage)}
        isCurrent
      />

      {nextPages.length > 0 &&
        nextPages.map((page) => {
          return (
            <MatchHistoryPaginationItem
              onPageChange={onPageChange}
              key={page}
              content={String(page)}
            />
          )
        })}

      {currentPage + siblingsCount < lastPage && (
        <>
          {currentPage + 1 + siblingsCount < lastPage && (
            <MatchHistoryPaginationItem
              onPageChange={onPageChange}
              content="..."
            />
          )}
          <MatchHistoryPaginationItem
            onPageChange={onPageChange}
            content={String(lastPage)}
          />
        </>
      )}

      {currentPage < lastPage && (
        <Container
          align="center"
          justify="center"
          fitContent
          className={style.icon}
        >
          <Icon
            as={ArrowRightSimpleIcon}
            color="gray.300"
            h="16px"
            w="16px"
            data-testid="next-icon"
            onClick={() => onPageChange(currentPage + 1)}
          />
        </Container>
      )}
    </Container>
  )
}
