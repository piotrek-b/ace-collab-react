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
  componentDidMount() {
    const element = document.getElementById('name')
    element.scrollTop = element.offsetHeight
  }

  render() {
    return (
      <FixedContainer>
        <ControlPanel />
        <Chat messages={messages} />
      </FixedContainer>
    )
  }
}

export default App
