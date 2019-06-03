import React, { Fragment } from 'react'
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

const SessionAttendanceInfo = styledSemantic(Comment.Metadata)`
  margin: 0;
  width: 100%;
  text-align: center;
`

const Text = styledSemantic(Comment.Text)`
    ${({ fromMe }) => fromMe && 'text-align: right;'}
`

const ChatMessage = ({
  type,
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
        {type === 'USER_JOINED' || type === 'USER_LEFT' ? (
          <SessionAttendanceInfo>
            {type === 'USER_JOINED' && `${payload} dołączył do sesji.`}
            {type === 'USER_LEFT' && `${payload} opuścił sesję.`}
          </SessionAttendanceInfo>
        ) : (
          <Fragment>
            <Data fromMe={fromMe}>
              <Comment.Author fromMe={fromMe}>{author}</Comment.Author>
              <Metadata fromMe={fromMe}>
                <Moment format="YYYY-MM-DD HH:mm:ss">
                  {time}
                </Moment>
              </Metadata>
            </Data>
            <Text fromMe={fromMe}>{payload}</Text>
          </Fragment>
        )}
      </Comment.Content>
    </Comment>
  )
}

ChatMessage.propTypes = { ...ChatMessageShape }

ChatMessage.defaultProps = {
  fromMe: false,
}

export default ChatMessage
