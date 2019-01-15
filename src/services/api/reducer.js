const api = (state = {
  editor: null,
  history: [],
}, action) => {
  const { type, payload } = action

  switch (type) {
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
        history: [...history, msgPayload],
      }
    }
    default:
      return state
  }
}

export default api
