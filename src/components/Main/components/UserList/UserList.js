import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Comment, Header, Segment } from 'semantic-ui-react'
import styled from 'styled-components'

import { messageSend } from 'services/api/actions'
import { getActiveUsers } from 'services/api/selectors'
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

  scrollToBottom() {
    if (this.messageList) {
      const { clientHeight, scrollHeight } = this.messageList
      const maxScrollTop = scrollHeight - clientHeight
      this.messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0
    }
  }

  render() {
    const { activeUsers, showUsers, username } = this.props
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
  activeUsers: PropTypes.object,
  showUsers: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
}

UserList.defaultProps = {
  activeUsers: {},
}

const mapStateToProps = (state) => ({
  activeUsers: getActiveUsers(state),
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  sendMessage: messageSend,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(UserList)
