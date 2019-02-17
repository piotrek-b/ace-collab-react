import React from 'react'
import PropTypes from 'prop-types'
import { Button, Header, Modal } from 'semantic-ui-react'

const ConfirmationModal = ({
  icon,
  onConfirm,
  confirmLabel,
  text,
  title,
  resolve,
}) => {
  const confirmCallback = async (...args) => {
    const data = await onConfirm(...args)
    resolve(true, data)
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
        <Button onClick={confirmCallback} color="green">
          {confirmLabel}
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

ConfirmationModal.propTypes = {
  icon: PropTypes.string,
  onConfirm: PropTypes.func,
  confirmLabel: PropTypes.string,
  text: PropTypes.string,
  title: PropTypes.string,
  resolve: PropTypes.func.isRequired,
}

ConfirmationModal.defaultProps = {
  icon: '',
  onConfirm: () => ({}),
  confirmLabel: 'OK',
  text: '',
  title: '',
}

export default ConfirmationModal
