import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Button, Icon, Popup, Segment } from 'semantic-ui-react'
import styled from 'styled-components'

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

const ControlPanel = ({ on, onChatClick, onPowerClick, onShareClick, onUsersClick, showChat, showUsers }) => (
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
      />
      <Popup
        trigger={(
          <Button icon onClick={onUsersClick} disabled={!on} active={on && showUsers} primary={on && showUsers}>
            <IconContainer>
              <Icon name="user" />
            </IconContainer>
          </Button>
        )}
        content={`${showUsers ? 'Ukryj' : 'Pokaż'} status uczestników`}
      />
    </Button.Group>
  </StyledSegment>
)

export default ControlPanel
