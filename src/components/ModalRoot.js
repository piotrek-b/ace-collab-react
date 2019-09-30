import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { ModalTypes } from 'consts'
import AskForAccessModal from './Modal/AskForAccessModal'
import AccessOptionsModal from './Modal/AccessOptionsModal'
import ConfirmationModal from './Modal/ConfirmationModal'
import AlertModal from './Modal/AlertModal'

const MODAL_COMPONENTS = {
  [ModalTypes.ALERT_MODAL]: AlertModal,
  [ModalTypes.ASK_FOR_ACCESS_MODAL]: AskForAccessModal,
  [ModalTypes.ACCESS_OPTIONS_MODAL]: AccessOptionsModal,
  [ModalTypes.CONFIRMATION_MODAL]: ConfirmationModal,
}

const ModalRoot = ({ modalType, modalProps }) => {
  if (!modalType) {
    return null
  }

  const SpecificModal = MODAL_COMPONENTS[modalType]
  return <SpecificModal {...modalProps} />
}

ModalRoot.propTypes = {
  modalType: PropTypes.string,
  modalProps: PropTypes.object,
}

ModalRoot.defaultProps = {
  modalType: '',
  modalProps: {},
}

export default connect(
  (state) => state.modal
)(ModalRoot)
