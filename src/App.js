import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Provider } from 'react-redux'

import store from 'store/store'
import Main from 'components/Main/Main'


const App = (props) => (
  <Provider store={store}>
    <Main {...props} />
  </Provider>
)

export default App
