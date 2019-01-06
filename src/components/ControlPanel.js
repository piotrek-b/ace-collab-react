import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Icon, Segment } from 'semantic-ui-react'
import styled from 'styled-components'

import styledSemantic from 'utils/styledSemantic'

const StyledSegment = styledSemantic(Segment)`
  display: flex;

  * {
    flex-grow: 1;
  }
`

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 5px;
`

const ControlPanel = () => (
  <StyledSegment>
    <IconContainer>
      <Icon name="power off" />
    </IconContainer>
    <IconContainer>
      <Icon name="share alternate" />
    </IconContainer>
    <IconContainer>
      <Icon name="comment" />
    </IconContainer>
  </StyledSegment>
)

export default ControlPanel
