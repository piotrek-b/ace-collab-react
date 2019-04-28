import React from 'react'
import PropTypes from 'prop-types'
import { Comment, Icon } from 'semantic-ui-react'

import styledSemantic from 'utils/styledSemantic'

const ActiveIcon = styledSemantic(Icon, { omitProps: ['active'] })`
  ${({ active }) => `color: ${active ? 'green' : 'red'}`}
`

const UserStatus = ({
  user,
  isActive,
}) => {
  return (
    <Comment>
      <Comment.Content>
        <ActiveIcon active={isActive} name="circle" />
        {user}
      </Comment.Content>
    </Comment>
  )
}

UserStatus.propTypes = {
  user: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
}

export default UserStatus
