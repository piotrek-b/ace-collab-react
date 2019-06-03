import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Comment, Header, Segment } from 'semantic-ui-react'
import styled from 'styled-components'

import { ChatMessageT } from 'types'
import { messageSend } from 'services/api/actions'
import styledSemantic from 'utils/styledSemantic'
import UserStatus from './components/UserStatus'

const UserListContainer = styledSemantic(Segment)`
  height: 90%;
`

const StyledDiv = styled.div`
  height: 200px;
  padding-right: 25px;
  overflow-y: scroll;
`

class UserList extends Component {
  componentDidUpdate() {
    this.scrollToBottom()
  }

  getActiveUsers() {
    const { messages } = this.props
    const activeUsers = {}

    messages.forEach((message) => {
      if (message.type === 'USER_JOINED') {
        activeUsers[message.payload] = true
      } else if (message.type === 'USER_LEFT') {
        activeUsers[message.payload] = false
      }
    })

    return activeUsers
  }

  scrollToBottom() {
    if (this.messageList) {
      const { clientHeight, scrollHeight } = this.messageList
      const maxScrollTop = scrollHeight - clientHeight
      this.messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0
    }
  }

  render() {
    const { showUsers, username } = this.props
    const activeUsers = this.getActiveUsers()
    return showUsers ? (
      <UserListContainer>
        <Comment.Group>
          <Header as="h3" dividing>
            Uczestnicy
          </Header>
          <StyledDiv ref={(ref) => { this.messageList = ref }}>
            {Object.keys(activeUsers).map((key) => (
              <UserStatus username={username} user={key} isActive={activeUsers[key]} />
            ))}
          </StyledDiv>
        </Comment.Group>
      </UserListContainer>
    ) : null
  }
}

UserList.propTypes = {
  messages: PropTypes.arrayOf(ChatMessageT),
  showUsers: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
}

UserList.defaultProps = {
  messages: [],
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  sendMessage: messageSend,
}, dispatch)

export default connect(null, mapDispatchToProps)(UserList)
