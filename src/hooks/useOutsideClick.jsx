import { useOutsideClick as ChakraUseOutsideClick } from '@chakra-ui/react'

const hasClass = (element, className) =>
  element &&
  (element.correspondingElement
    ? element.correspondingElement
    : element
  ).classList.contains(className)

const isInIgnoredElement = (element, ignoredClass) => {
  if (!element) {
    return false
  }

  if (hasClass(element, ignoredClass)) {
    return true
  }

  return isInIgnoredElement(element.parentElement, ignoredClass)
}

const useOutsideClick = (fwdRef, fwdHandler, ignoredClass) =>
  ChakraUseOutsideClick({
    ref: fwdRef,
    handler: (event) => {
      if (ignoredClass && isInIgnoredElement(event.target, ignoredClass)) return
      fwdHandler(event)
    },
  })

export default useOutsideClick
