import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import copy from 'copy-to-clipboard'

import { websocketConnect } from 'services/api/actions'
import ControlPanel from './components/ControlPanel'
import Chat from './components/Chat/Chat'

const FixedContainer = styled.div`
  position: fixed;
  width: 250px;
  top: 60px;
  right: 60px;
`

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      on: true,
      showChat: false,
      username: 'Piotr',
    }
  }

  componentDidMount() {
    const {
      connectWebsocket,
    } = this.props

    connectWebsocket()
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
      history,
    } = this.props
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
          messages={history}
          showChat={on && showChat}
          username={username}
        />
      </FixedContainer>
    )
  }
}

Main.propTypes = {
  // from connect
  connectWebsocket: PropTypes.func.isRequired,
  history: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
  history: state.api.history,
})

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  connectWebsocket: websocketConnect,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Main)
