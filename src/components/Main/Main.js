import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import copy from 'copy-to-clipboard'
import Editor from 'ace-collab/lib'

import { websocketConnect, websocketDisconnect } from 'services/api/actions'
import ControlPanel from './components/ControlPanel'
import Chat from './components/Chat/Chat'
import UserList from './components/UserList/UserList'
import { modalOpen } from '../../services/modal/actions'
import { ModalTypes } from '../../consts'
import { configSet } from '../../services/api/actions'

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
      showUsers: false,
    }
  }

  componentDidMount() {
    const { initialConfig, setConfig } = this.props

    setConfig(initialConfig)
  }

  onAskForAccess = async (message) => {
    const { openModal } = this.props

    const [resolved] = await openModal(ModalTypes.ASK_FOR_ACCESS_MODAL, {
      username: message.payload,
    })

    return resolved
  }

  onPowerClick = async () => {
    const {
      connectWebsocket,
      disconnectWebsocket,
      config,
      openModal,
    } = this.props
    this.setState((state) => ({ on: !state.on }))

    const { server, ...rest } = config

    if (!this.state.on) {
      try {
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
        this.setState({ on: true })
      } catch (error) {
        openModal(ModalTypes.ALERT_MODAL, {
          title: 'No access',
          text: 'You were not provided with the access to the session',
        })
      }
    } else {
      disconnectWebsocket()
      this.setState({ on: false })
    }
  }

  onChatClick = () => {
    this.setState((state) => ({
      showChat: !state.showChat,
      showUsers: false,
    }))
  }


  onUsersClick = () => {
    this.setState((state) => ({
      showChat: false,
      showUsers: !state.showUsers,
    }))
  }

  onShareClick = () => {
    copy(window.location.href)
  }

  render() {
    const {
      config,
      history,
    } = this.props
    const {
      on,
      showChat,
      showUsers,
    } = this.state
    const {
      server: {
        username,
      },
    } = config
    return (
      <FixedContainer>
        <ControlPanel
          on={on}
          onPowerClick={this.onPowerClick}
          onChatClick={this.onChatClick}
          onShareClick={this.onShareClick}
          onUsersClick={this.onUsersClick}
          showChat={showChat}
          showUsers={showUsers}
        />
        <Chat
          messages={history}
          showChat={on && showChat}
          username={username}
        />
        <UserList
          messages={history}
          showUsers={on && showUsers}
          username={username}
        />
      </FixedContainer>
    )
  }
}

Main.propTypes = {
  initialConfig: PropTypes.object.isRequired,
  // from connect
  config: PropTypes.object.isRequired,
  connectWebsocket: PropTypes.func.isRequired,
  disconnectWebsocket: PropTypes.func.isRequired,
  history: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
  setConfig: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  config: state.api.config,
  history: state.api.history,
})

export const mapDispatchToProps = (dispatch) => bindActionCreators({
  connectWebsocket: websocketConnect,
  disconnectWebsocket: websocketDisconnect,
  openModal: modalOpen,
  setConfig: configSet,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Main)
