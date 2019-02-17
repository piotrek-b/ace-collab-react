import { combineReducers } from 'redux'

import api from 'services/api/reducer'
import modal from 'services/modal/reducer'

export default combineReducers({
  api,
  modal,
})
