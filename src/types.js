import PropTypes from 'prop-types'

export const ChatMessageT = PropTypes.shape({
  author: PropTypes.string.isRequired,
  sentAt: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
})
