import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import copy from 'copy-to-clipboard'
import Editor from 'ace-collab/lib'
import { Button, Icon, Popup } from 'semantic-ui-react'
import { SemanticToastContainer, toast } from 'react-semantic-toasts'
import { ErrorTypes } from 'ace-collab/consts'

import { websocketConnect, websocketDisconnect } from 'services/api/actions'
import ControlPanel from './components/ControlPanel'
import Chat from './components/Chat/Chat'
import UserList from './components/UserList/UserList'
import { modalClosed, modalOpen } from '../../services/modal/actions'
import { ModalTypes } from '../../consts'
import { configSet } from '../../services/api/actions'

import styledSemantic from '../../utils/styledSemantic'
import getDocId from '../../getDocId'

const FixedContainer = styled.div`
  position: fixed;
  width: 250px;
  top: 60px;
  right: 60px;
  z-index: 999;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const FixedShowContainer = styled.div`
  position: fixed;
  width: 50px;
  height: 50px;
  top: 0;
  right: 0;
  z-index: 999;
`

const StyledIcon = styledSemantic(Icon)`
    margin: 0 !important;
`

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: true,
      on: false,
      showChat: false,
      showUsers: false,
    }
  }

  componentDidMount() {
    const { initialConfig, setConfig } = this.props

    this.editor = new Editor(initialConfig)

    setConfig(initialConfig)

    if (initialConfig.server.docId) {
      this.onPowerClick(initialConfig)
    }
  }

  onAskForAccess = async (message) => {
    const { openModal } = this.props

    const [resolved] = await openModal(ModalTypes.ASK_FOR_ACCESS_MODAL, {
      username: message.payload,
    })

    return resolved
  }

  onAskForAccessOptions = async () => {
    const { openModal } = this.props

    const data = await openModal(ModalTypes.ACCESS_OPTIONS_MODAL)

    return data[0]
  }

  onPowerClick = async (config) => {
    const {
      connectWebsocket,
      disconnectWebsocket,
      openModal,
      closeModal,
      setConfig,
    } = this.props

    const { server } = config
    const docId = getDocId()

    if (!this.state.on) {
      try {
        let accessOptions = {}
        if (docId) {
          toast({
            type: 'info',
            icon: 'info',
            title: 'Autoryzacja',
            description: 'Poczekaj, aż proces autoryzacji dobiegnie końca...',
          })
        } else {
          accessOptions = await this.onAskForAccessOptions()
        }

        if (accessOptions.resolved === false) {
          return
        }

        const {
          doc,
          token,
          username,
          readOnly,
        } = await this.editor.init({ ...server, docId }, accessOptions, this.onAskForAccess)
        const { host, port, ssl } = server

        if (!docId) {
          const newURL = (
            `${window.location.protocol}//${window.location.host}${window.location.pathname}?sharedb_id=${doc.id}`
          )
          window.history.pushState({ path: newURL }, '', newURL)
        }
        connectWebsocket(host, port, ssl, doc.id, username, token)
        setConfig({ ...config, docId: doc.id })
        closeModal()

        const description = readOnly
          ? 'Sesja Live Code uruchomiona (tylko do odczytu).'
          : 'Sesja Live Code uruchomiona.'

        this.setState({ on: true })
        toast({
          type: 'success',
          icon: 'info',
          title: 'Sukces!',
          description,
        })
      } catch (error) {
        if (`${error}`.includes(ErrorTypes.ACCESS_DENIED)) {
          openModal(ModalTypes.ALERT_MODAL, {
            title: 'Brak dostępu',
            text: 'Nie udzielono dostępu do sesji Live Code.',
          })
        } else if (`${error}`.includes(ErrorTypes.SESSION_NOT_AVAILABLE)) {
          openModal(ModalTypes.ALERT_MODAL, {
            title: 'Sesja niedostępna',
            text: 'Żądana sesja jest niedostępna.',
          })
        } else if (`${error}`.includes(ErrorTypes.CONNECTION_ERROR)) {
          openModal(ModalTypes.ALERT_MODAL, {
            title: 'Problem z połączeniem',
            text: 'Próba połączenia z serwerem zakończyła się niepowodzeniem.',
          })
        }
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
    toast({
      type: 'info',
      icon: 'info',
      title: 'Udostępnij',
      description: 'Link do sesji skopiowano do schowka!',
    })
  }

  render() {
    if (!this.state.visible) {
      return (
        <Popup
          trigger={(
            <FixedShowContainer>
              <Button onClick={() => this.setState({ visible: true })}>
                <StyledIcon name="eye" />
              </Button>
            </FixedShowContainer>
              )}
          content="Pokaż panel"
        />
      )
    }

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
        <Popup
          trigger={(
            <Button onClick={() => this.setState({ visible: false })}>
              <StyledIcon name="hide" />
            </Button>
        )}
          content="Ukryj panel"
        />
        <ControlPanel
          history={history}
          on={on}
          onPowerClick={() => this.onPowerClick(config)}
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

        <SemanticToastContainer position="bottom-right" />
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
  closeModal: PropTypes.func.isRequired,
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
  closeModal: modalClosed,
  setConfig: configSet,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Main)
