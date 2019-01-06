import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Button, Icon, Segment } from 'semantic-ui-react'
import styled from 'styled-components'

import styledSemantic from 'utils/styledSemantic'

const StyledSegment = styledSemantic(Segment)`
  display: flex;
  padding: 0;

  * {
    flex-grow: 1;
  }
`

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 5px;
`

const ControlPanel = ({ on, onChatClick, onPowerClick, onShareClick, showChat }) => (
  <StyledSegment>
    <Button.Group>
      <Button icon onClick={onPowerClick} active={on} toggle={on}>
        <IconContainer>
          <Icon name="power off" />
        </IconContainer>
      </Button>
      <Button icon onClick={onShareClick} disabled={!on}>
        <IconContainer>
          <Icon name="share alternate" />
        </IconContainer>
      </Button>
      <Button icon onClick={onChatClick} disabled={!on} active={on && showChat}>
        <IconContainer>
          <Icon name="comment" />
        </IconContainer>
      </Button>
    </Button.Group>
  </StyledSegment>
)

export default ControlPanel
