import PropTypes from 'prop-types'

const TypeMetadataShape = {
  type: PropTypes.string.isRequired,
  metadata: PropTypes.shape({
    author: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
  }),
}

const ChatTextMessageT = PropTypes.shape({
  ...TypeMetadataShape,
  payload: PropTypes.string.isRequired,
})

const ChatMessagePayloadT = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.arrayOf(ChatTextMessageT),
])

export const ChatMessageShape = {
  ...TypeMetadataShape,
  payload: ChatMessagePayloadT.isRequired,
}

export const ChatMessageT = PropTypes.shape(ChatMessageShape)
