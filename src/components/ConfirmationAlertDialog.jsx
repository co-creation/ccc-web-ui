import React from 'react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Flex,
} from '@chakra-ui/react'

export default function ConfirmationAlertDialog( props ) {

  const [isOpen, setIsOpen] = React.useState( false )
  const onClose = () => setIsOpen( false )
  const onOpen = () => setIsOpen( true )
  const cancelRef = React.useRef()

  const onConfirmAction = () => {
    onClose()
    onConfirm()
  }

  const { onConfirm, destructive, triggerText, headerText, bodyText, cancelText, actionText, ...rest } = props 

  return (
    <>
      <Button 
        colorScheme={destructive ? 'danger' : 'primary'} 
        onClick={onOpen}
        borderRadius="full"
        marginTop="10"
        marginBottom="10"
        size="lg"
        {...rest}
      >
        {triggerText}
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {headerText}
            </AlertDialogHeader>

            <AlertDialogBody>
              {bodyText}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Flex direction="row" align="center" justify="center">
                <Button borderRadius="full" colorScheme="danger" ref={cancelRef} onClick={onClose}>
                  {cancelText}
                </Button>
                <Button borderRadius="full" colorScheme={destructive ? 'danger' : 'primary'}  onClick={onConfirmAction} ml={3}>
                  {actionText}
                </Button>
              </Flex>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}