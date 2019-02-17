const initialState = {
  config: {
    anchorDOM: null,
    mode: '',
    theme: '',
    server: {
      docId: '',
      host: '',
      port: '',
      username: '',
      ssl: false,
    },
  },
  editor: null,
  history: [],
}

const api = (state = {
  editor: null,
  history: [],
  username: '',
}, action) => {
  const { type, payload } = action

  switch (type) {
    case 'USERNAME_SET': {
      return {
        ...state,
        username: payload,
      }
    }
    case 'WEBSOCKET_MESSAGE': {
      const { data } = payload
      const msgData = JSON.parse(data)

      const { type: msgType, payload: msgPayload } = msgData

      if (msgType === 'HISTORY') {
        return {
          ...state,
          history: [...msgPayload],
        }
      }

      const { history } = state
      return {
        ...state,
        history: [...history, msgData],
      }
    }
    default:
      return state
  }
}

export default api
