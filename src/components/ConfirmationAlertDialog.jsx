import React from 'react'
import PropTypes from 'prop-types'
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
  const {
    onConfirm,
    destructive,
    triggerText,
    headerText,
    bodyText,
    cancelText,
    actionText,
    ...rest
  } = props

  const [isOpen, setIsOpen] = React.useState( false )
  const onClose = () => setIsOpen( false )
  const onOpen = () => setIsOpen( true )
  const cancelRef = React.useRef()

  const onConfirmAction = () => {
    onClose()
    onConfirm()
  }

  return (
    <>
      <Button
        colorScheme={destructive ? 'danger' : 'primary'}
        onClick={onOpen}
        borderRadius="full"
        mt="32px"
        mb="32px"
        size="lg"
        color="base.900"
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
                <Button
                  borderRadius="full"
                  colorScheme="danger"
                  color="white"
                  ref={cancelRef}
                  onClick={onClose}
                >
                  {cancelText}
                </Button>
                <Button
                  borderRadius="full"
                  colorScheme={destructive ? 'danger' : 'primary'}
                  color="base.900"
                  onClick={onConfirmAction}
                  ml={3}
                >
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

ConfirmationAlertDialog.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  headerText: PropTypes.string.isRequired,
  cancelText: PropTypes.string.isRequired,
  actionText: PropTypes.string.isRequired,
  triggerText: PropTypes.string,
  bodyText: PropTypes.string,
  destructive: PropTypes.bool,
}

ConfirmationAlertDialog.defaultProps = {
  destructive: false,
  triggerText: '',
  bodyText: '',
}
