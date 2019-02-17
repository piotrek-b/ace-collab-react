import React from 'react'
import PropTypes from 'prop-types'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

const ConfirmationModal = ({
  icon,
  onConfirm,
  confirmLabel,
  onDismiss,
  dismissLabel,
  text,
  title,
  resolve,
}) => {
  const confirmCallback = async (...args) => {
    const data = await onConfirm(...args)
    resolve(true, data)
  }
  const dismissCallback = async (...args) => {
    const data = await onDismiss(...args)
    resolve(false, data)
  }
  return (
    <Modal open size="small">
      <Header icon={icon} content={title} />
      <Modal.Content>
        <p>
          {text}
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={dismissCallback} basic color="red">
          <Icon name="remove" /> {dismissLabel}
        </Button>
        <Button onClick={confirmCallback} color="green">
          <Icon name="checkmark" /> {confirmLabel}
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

ConfirmationModal.propTypes = {
  icon: PropTypes.string,
  onConfirm: PropTypes.func,
  confirmLabel: PropTypes.string,
  onDismiss: PropTypes.func,
  dismissLabel: PropTypes.string,
  text: PropTypes.string,
  title: PropTypes.string,
  resolve: PropTypes.func.isRequired,
}

ConfirmationModal.defaultProps = {
  icon: '',
  onConfirm: () => ({}),
  confirmLabel: 'OK',
  onDismiss: () => ({}),
  dismissLabel: 'Cancel',
  text: '',
  title: '',
}

export default ConfirmationModal
