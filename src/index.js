import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import 'core-js'
import 'regenerator-runtime/runtime'

const getDocId = () => {
  const urlParams = new URLSearchParams(window.location.search)
  const docId = urlParams.get('sharedb_id') || ''

  return docId
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()

function runAceCollab(configArg = null) {
  let config

  if (configArg) {
    config = configArg
  } else {
    const username = window.prompt('username')
    config = {
      anchorDOM: document.querySelector('#editor'),
      mode: 'ace/mode/javascript',
      theme: 'ace/theme/monokai',
      server: {
        docId: getDocId(),
        host: '127.0.0.1',
        port: '3333',
        username,
        ssl: false,
      },
    }
  }

  config = { ...config, server: { ...config.server, docId: getDocId() } }
  ReactDOM.render(<App initialConfig={config} />, document.querySelector('main'))
}

window.runAceCollab = runAceCollab

export default runAceCollab
