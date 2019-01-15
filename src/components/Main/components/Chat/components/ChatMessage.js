import React from 'react'
import { Comment } from 'semantic-ui-react'
import styled from 'styled-components'
import Moment from 'react-moment'

import styledSemantic from 'utils/styledSemantic'
import { ChatMessageShape } from 'types'

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
  payload,
  metadata,
  username,
}) => {
  const {
    author,
    time,
  } = metadata

  const fromMe = author === username

  return (
    <Comment>
      <Comment.Content>
        <Data fromMe={fromMe}>
          <Comment.Author fromMe={fromMe}>{author}</Comment.Author>
          <Metadata fromMe={fromMe}>
            <Moment format="YYYY-MM-DD HH:mm:ss">
              {time}
            </Moment>
          </Metadata>
        </Data>
        <Text fromMe={false}>{payload}</Text>
      </Comment.Content>
    </Comment>
  )
}

ChatMessage.propTypes = { ...ChatMessageShape }

ChatMessage.defaultProps = {
  fromMe: false,
}

export default ChatMessage
