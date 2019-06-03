import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Button, Comment, Form, Header, Segment } from 'semantic-ui-react'
import styled from 'styled-components'

import { ChatMessageT } from 'types'
import { messageSend } from 'services/api/actions'
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

class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
    }
  }

  componentDidUpdate() {
    this.scrollToBottom()
  }

  onValueChange = (event) => this.setState({ value: event.target.value })

  onKeyDown = (event) => {
    if (event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault()
      this.sendMessage()
    }
  }

  sendMessage = () => {
    const { sendMessage } = this.props
    const { value } = this.state

    if (value) {
      sendMessage(value)
      this.setState({ value: '' })
    }
  }

  scrollToBottom() {
    if (this.messageList) {
      const { clientHeight, scrollHeight } = this.messageList
      const maxScrollTop = scrollHeight - clientHeight
      this.messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0
    }
  }

  render() {
    const { messages, showChat, username } = this.props
    const { value } = this.state
    return showChat ? (
      <CollabChatContainer>
        <Comment.Group>
          <Header as="h3" dividing>
            Czat ({username})
          </Header>
          <StyledDiv ref={(ref) => { this.messageList = ref }}>
            {messages.map((message) => (
              <ChatMessage username={username} {...message} />
            ))}
          </StyledDiv>

          <Form reply>
            <Form.TextArea
              value={value}
              onChange={this.onValueChange}
              onKeyDown={this.onKeyDown}
            />
            <Button
              content="Wyślij"
              disabled={!value}
              labelPosition="left"
              icon="edit"
              onClick={this.sendMessage}
              primary
            />
          </Form>
        </Comment.Group>
      </CollabChatContainer>
    ) : null
  }
}

Chat.propTypes = {
  messages: PropTypes.arrayOf(ChatMessageT),
  showChat: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  sendMessage: PropTypes.func.isRequired,
}

Chat.defaultProps = {
  messages: [],
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  sendMessage: messageSend,
}, dispatch)

export default connect(null, mapDispatchToProps)(Chat)
