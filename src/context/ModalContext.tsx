import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import React from 'react'

type ProviderProps = {
  children: React.ReactNode
}

interface IModal {
  onOpen: () => void
  onClose: () => void
  onModalLoading: (value: boolean) => void
  mountModalHeader: (content: React.JSX.Element) => void
  mountModalContent: (content: React.JSX.Element) => void
  mountModalFooter: (content: React.JSX.Element) => void
}

const Context = React.createContext<IModal>({
  onOpen: () => {},
  onClose: () => {},
  onModalLoading: () => {},
  mountModalHeader: () => {},
  mountModalContent: () => {},
  mountModalFooter: () => {},
})

const ModalContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [modalHeader, setModalHeader] =
    React.useState<React.JSX.Element | null>(null)
  const [modalFooter, setModalFooter] =
    React.useState<React.JSX.Element | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [modalContent, setModalContent] =
    React.useState<React.JSX.Element | null>(null)

  const onOpen = () => {
    setIsOpen(true)
  }
  const onClose = () => {
    setModalHeader(null)
    setModalContent(null)
    setModalFooter(null)
    setIsOpen(false)
  }

  const onModalLoading = (value: boolean) => setIsLoading(value)

  const mountModalHeader = (
    title: React.SetStateAction<React.JSX.Element | null>
  ) => setModalHeader(title)

  const mountModalContent = (
    content: React.SetStateAction<React.JSX.Element | null>
  ) => setModalContent(content)

  const mountModalFooter = (
    title: React.SetStateAction<React.JSX.Element | null>
  ) => setModalFooter(title)

  const values = {
    onOpen,
    onClose,
    mountModalHeader,
    mountModalContent,
    onModalLoading,
    mountModalFooter,
  }

  return (
    <Context.Provider value={values}>
      {children}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={!isLoading ? true : false}
        closeOnEsc={!isLoading ? true : false}
        autoFocus={false}
        isCentered
      >
        <ModalOverlay bg="blackAlpha.500" />
        <ModalContent
          backgroundColor="#fff"
          rounded="xl"
          backdropFilter="auto"
          backdropBlur="2xl"
          maxW="lg"
          shadow="2xl"
        >
          {modalHeader && <ModalHeader>{modalHeader}</ModalHeader>}
          {modalContent}
          {modalFooter && <ModalFooter>{modalFooter}</ModalFooter>}
          <ModalCloseButton
            hidden={isLoading}
            onClick={() => {
              setModalHeader(null)
              setModalContent(null)
              setModalFooter(null)
              setIsOpen(false)
            }}
          />
        </ModalContent>
      </Modal>
    </Context.Provider>
  )
}

export default ModalContextProvider

export const useModal = () => React.useContext(Context)
