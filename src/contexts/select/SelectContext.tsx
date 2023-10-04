import {
  ReactNode,
  RefObject,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react'

export type Item = {
  value: string
  label: string
  disabled?: boolean
}

interface ProviderProps {
  children?: ReactNode
}

interface SelectContextProps {
  isChecked: boolean
  isFocused: boolean
  itemSelected: Item | null
  setIsChecked: (state: SetStateAction<boolean>) => void
  setIsFocused: (state: SetStateAction<boolean>) => void
  setItemSelected: (state: SetStateAction<Item | null>) => void
  closeSelect: () => void
  optionInputRef: RefObject<HTMLInputElement>
}

const SelectContext = createContext({} as SelectContextProps)

export const Provider = ({ children }: ProviderProps) => {
  const [isChecked, setIsChecked] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [itemSelected, setItemSelected] = useState<Item | null>(null)

  const optionInputRef = useRef<HTMLInputElement>(null)

  const closeSelect = useCallback(() => {
    setIsChecked(false)
    setIsFocused(false)
  }, [setIsChecked, setIsFocused])

  return (
    <SelectContext.Provider
      value={{
        isChecked,
        isFocused,
        itemSelected,
        setIsChecked,
        setIsFocused,
        setItemSelected,
        closeSelect,
        optionInputRef,
      }}
    >
      {children}
    </SelectContext.Provider>
  )
}

export const useSelectContext = () => useContext(SelectContext)
