import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Provider } from 'react-redux'

import store from 'store/store'
import Main from 'components/Main/Main'
import ModalRoot from 'components/ModalRoot'


const App = (props) => (
  <Provider store={store}>
    <Main {...props} />
    <ModalRoot />
  </Provider>
)

export default App
