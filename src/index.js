import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

const getDocId = () => {
  const urlParams = new URLSearchParams(window.location.search)
  const docId = urlParams.get('sharedb_id') || ''

  return docId
}

const username = window.prompt('username')

const sampleConfig = {
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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()

const runAceCollab = (config = sampleConfig) => {
  ReactDOM.render(<App initialConfig={config} />, document.querySelector('main'))
}

export default runAceCollab
