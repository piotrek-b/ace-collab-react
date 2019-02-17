import React from 'react'
import PropTypes from 'prop-types'

import ConfirmationModal from './ConfirmationModal'

const AskForAccessModal = ({ username, ...props }) => (
  <ConfirmationModal
    icon="address card"
    confirmLabel="OK"
    title={`${username} wants to join`}
    text={`Can ${username} join the session?`}
    {...props}
  />
)

AskForAccessModal.propTypes = {
  username: PropTypes.string.isRequired,
}

export default AskForAccessModal
