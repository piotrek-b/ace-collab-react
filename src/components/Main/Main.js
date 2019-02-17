import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import copy from 'copy-to-clipboard'
import Editor from 'ace-collab/lib'

import { websocketConnect, websocketDisconnect, usernameSet } from 'services/api/actions'
import ControlPanel from './components/ControlPanel'
import Chat from './components/Chat/Chat'
import { modalOpen } from '../../services/modal/actions'
import { ModalTypes } from '../../consts'

const FixedContainer = styled.div`
  position: fixed;
  width: 250px;
  top: 60px;
  right: 60px;
  z-index: 999;
`

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      on: false,
      showChat: false,
      username: 'Piotr',
    }
  }

  onAskForAccess = (message) => {
    const { openModal } = this.props
    return openModal(ModalTypes.ASK_FOR_ACCESS_MODAL, {
      username: message.payload,
    })
  }

  onPowerClick = async () => {
    const {
      connectWebsocket,
      disconnectWebsocket,
      config,
    } = this.props
    this.setState((state) => ({ on: !state.on }))

    const { server, ...rest } = config

    if (!this.state.on) {
      const editor = new Editor(rest)

      const { doc, token, username } = await editor.init(server, this.onAskForAccess)
      const { docId, host, port, ssl } = server

      if (!docId) {
        const newURL = (
          `${window.location.protocol}//${window.location.host}${window.location.pathname}?sharedb_id=${doc.id}`
        )
        window.history.pushState({ path: newURL }, '', newURL)
      }
      connectWebsocket(host, port, ssl, doc.id, username, token)
    } else {
      disconnectWebsocket()
    }
  }

  onChatClick = () => {
    this.setState((state) => ({ showChat: !state.showChat }))
  }

  onShareClick = () => {
    copy(window.location.href)
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
  config: PropTypes.object.isRequired,
  // from connect
  connectWebsocket: PropTypes.func.isRequired,
  disconnectWebsocket: PropTypes.func.isRequired,
  history: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  history: state.api.history,
})

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  connectWebsocket: websocketConnect,
  disconnectWebsocket: websocketDisconnect,
  setUsername: usernameSet,
  openModal: modalOpen,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Main)
