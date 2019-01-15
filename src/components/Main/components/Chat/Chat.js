import React from 'react'
import PropTypes from 'prop-types'
import { Button, Comment, Form, Header, Segment } from 'semantic-ui-react'
import styled from 'styled-components'

import { ChatMessageT } from 'types'
import styledSemantic from 'utils/styledSemantic'
import ChatMessage from './components/ChatMessage'

const CollabChatContainer = styledSemantic(Segment)`
  height: 90%;
`

const StyledDiv = styled.div`
  height: 200px;
  padding-right: 25px;
  overflow-y: scroll;
`

const Chat = ({ messages, showChat, username }) => (
  showChat ? (
    <CollabChatContainer>
      <Comment.Group>
        <Header as="h3" dividing>
          Chat
        </Header>
        <StyledDiv id="name">
          {messages.map((message) => (
            <ChatMessage username={username} {...message} />
          ))}
        </StyledDiv>

        <Form reply>
          <Form.TextArea />
          <Button
            content="Add Reply"
            labelPosition="left"
            icon="edit"
            primary
          />
        </Form>
      </Comment.Group>
    </CollabChatContainer>
  ) : null
)

Chat.propTypes = {
  messages: PropTypes.arrayOf(ChatMessageT),
  showChat: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
}

Chat.defaultProps = {
  messages: [],
}

export default Chat
