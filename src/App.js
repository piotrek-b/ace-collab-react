import React, { Component } from 'react'
import 'semantic-ui-css/semantic.min.css'
import styled from 'styled-components'

import Chat from 'components/Chat/Chat'
import ControlPanel from 'components/ControlPanel'

const FixedContainer = styled.div`
  position: fixed;
  width: 250px;
  top: 50px;
  right: 50px;
`

const messages = [
  {
    author: 'Piotr',
    sentAt: Date.now(),
    text: 'Hello World!',
  },
]


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      on: false,
      showChat: false,
    }
  }

  onPowerClick = () => {
    this.setState((state) => ({ on: !state.on }))
  }

  onChatClick = () => {
    this.setState((state) => ({ showChat: !state.showChat }))
  }

  onShareClick = () => {

  }

  render() {
    const {
      on,
      showChat,
    } = this.state
    return (
      <FixedContainer>
        <ControlPanel
          on={on}
          onPowerClick={this.onPowerClick}
          onChatClick={this.onChatClick}
          onShareClick={this.onShareClick}
        />
        <Chat messages={messages} showChat={on && showChat} />
      </FixedContainer>
    )
  }
}

export default App
