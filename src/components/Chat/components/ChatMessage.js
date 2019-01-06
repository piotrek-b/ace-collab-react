import React from 'react'
import PropTypes from 'prop-types'
import { Comment } from 'semantic-ui-react'
import styled from 'styled-components'
import Moment from 'react-moment'

import styledSemantic from 'utils/styledSemantic'

const Data = styled.div`
    display: flex;
    flex-direction: ${({ fromMe }) => (fromMe ? 'row-reverse' : 'row')};
`

const Metadata = styledSemantic(Comment.Metadata)`
    ${({ fromMe }) => fromMe && `
        margin-right: .5em;
        margin-left: 0;
    `}
`

const Text = styledSemantic(Comment.Text)`
    ${({ fromMe }) => fromMe && 'text-align: right;'}
`

const ChatMessage = ({
  author,
  sentAt,
  text,
  fromMe,
}) => (
  <Comment>
    <Comment.Content>
      <Data fromMe={fromMe}>
        <Comment.Author fromMe={fromMe}>{author}</Comment.Author>
        <Metadata fromMe={fromMe}>
          <Moment format="YYYY-MM-DD HH:mm:ss">
            {sentAt}
          </Moment>
        </Metadata>
      </Data>
      <Text fromMe={fromMe}>{text}</Text>
    </Comment.Content>
  </Comment>
)

ChatMessage.propTypes = {
  author: PropTypes.string.isRequired,
  sentAt: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  fromMe: PropTypes.bool,
}

ChatMessage.defaultProps = {
  fromMe: false,
}

export default ChatMessage
