import React from 'react'
import { connect } from 'react-redux'
import 'semantic-ui-css/semantic.min.css'
import { Button, Icon, Label, Popup, Segment } from 'semantic-ui-react'
import styled from 'styled-components'

import { getActiveUsers } from 'services/api/selectors'
import styledSemantic from 'utils/styledSemantic'

const StyledSegment = styledSemantic(Segment)`
  display: flex;
  padding: 0;
  width: 100%;

  * {
    flex-grow: 1;
  }
`

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 5px;
`

const LeftLabel = styledSemantic(Label)`
    margin-left: -78.5px !important;
`

let memoizedHistory = []


const ControlPanel = ({ activeUsers, history, on, onChatClick, onPowerClick, onShareClick, onUsersClick, showChat, showUsers }) => {
  const diff = history.length - memoizedHistory.length
  let showNewMessageSign

  if (diff > 0) {
    showNewMessageSign = true
  } else {
    showNewMessageSign = false
  }

  if (showChat) {
    showNewMessageSign = false
    memoizedHistory = [...history]
  }


  return (
    <StyledSegment>
      <Button.Group>
        <Popup
          trigger={(
            <Button icon onClick={onPowerClick} active={on} toggle={on}>
              <IconContainer>
                <Icon name="power off" />
              </IconContainer>
            </Button>
                    )}
                    /* eslint-disable-next-line no-irregular-whitespace */
          content={`${on ? 'Rozłącz' : 'Połącz'} się z sesją kolaboracyjną`}
        />
        <Popup
          trigger={(
            <Button icon onClick={onShareClick} disabled={!on}>
              <IconContainer>
                <Icon name="share alternate" />
              </IconContainer>
            </Button>
                    )}
          content="Udostępnij adres sesji"
        />
        <Popup
          trigger={(
            <Button icon onClick={onChatClick} disabled={!on} active={on && showChat} primary={on && showChat}>
              <IconContainer>
                <Icon name="comment" />
              </IconContainer>
            </Button>
                    )}
          content={`${showChat ? 'Ukryj' : 'Pokaż'} czat`}
        />{on && showNewMessageSign && (
          <LeftLabel color="orange" floating>
              !
          </LeftLabel>
        )}
        <Popup
          trigger={(
            <Button icon onClick={onUsersClick} disabled={!on} active={on && showUsers} primary={on && showUsers}>
              <IconContainer>
                <Icon name="user" />
              </IconContainer>
            </Button>
                    )}
          content={`${showUsers ? 'Ukryj' : 'Pokaż'} status uczestników sesji`}
        />
        {on && (
        <Label color="blue" floating>
          {Object.keys(activeUsers).length}
        </Label>
        )}
      </Button.Group>
    </StyledSegment>
  )
}

const mapStateToProps = (state) => ({
  activeUsers: getActiveUsers(state),
})

export default connect(mapStateToProps)(ControlPanel)
