import React, { Component } from 'react'
import 'semantic-ui-css/semantic.min.css'
import styled from 'styled-components'
import copy from 'copy-to-clipboard'

import Chat from 'components/Chat/Chat'
import ControlPanel from 'components/ControlPanel'

const FixedContainer = styled.div`
  position: fixed;
  width: 250px;
  top: 60px;
  right: 60px;
`

const messages = [
  {
    type: 'CHAT_MESSAGE',
    payload: '123',
    metadata: {
      author: 'Piotr',
      date: new Date().toJSON(),
    },
  },
]


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      on: true,
      showChat: false,
      username: 'Piotr',
    }
  }

  onPowerClick = () => {
    this.setState((state) => ({ on: !state.on }))
  }

  onChatClick = () => {
    this.setState((state) => ({ showChat: !state.showChat }))
  }

  onShareClick = () => {
    copy('12345')
  }

  render() {
    const {
      on,
      showChat,
      username,
    } = this.state
    return (
      <FixedContainer>
        <ControlPanel
          on={on}
          onPowerClick={this.onPowerClick}
          onChatClick={this.onChatClick}
          onShareClick={this.onShareClick}
          showChat={showChat}
        />
        <Chat
          messages={messages}
          showChat={on && showChat}
          username={username}
        />
      </FixedContainer>
    )
  }
}

export default App
