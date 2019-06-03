import React from 'react'
import PropTypes from 'prop-types'

import ConfirmationModal from './ConfirmationModal'

const AskForAccessModal = ({ username, ...props }) => (
  <ConfirmationModal
    icon="address card"
    confirmLabel="OK"
    title={`${username} chce dołączyć do sesji`}
    text={`Czy udzielić zgody na dołączenie do sesji użytkownikowi ${username}?`}
    {...props}
  />
)

AskForAccessModal.propTypes = {
  username: PropTypes.string.isRequired,
}

export default AskForAccessModal
