let websocket

const middleware = (store) => (next) => (action) => {
  switch (action.type) {
    case 'WEBSOCKET_CONNECT':
      // Configure the object
      websocket = new WebSocket(action.payload.url)

      // Attach the callbacks
      websocket.onopen = () => store.dispatch({ type: 'WEBSOCKET_OPEN' })
      websocket.onclose = (event) => store.dispatch({ type: 'WEBSOCKET_CLOSE', payload: event })
      websocket.onmessage = (event) => store.dispatch({ type: 'WEBSOCKET_MESSAGE', payload: event })

      break

    // User request to send a message
    case 'WEBSOCKET_SEND':
      websocket.send(JSON.stringify(action.payload))
      break

    // User request to disconnect
    case 'WEBSOCKET_DISCONNECT':
      websocket.close()
      break

    case 'WEBSOCKET_MESSAGE': {
      const data = JSON.parse(action.payload.data)
      const state = store.getState()
      console.log(state)
      const {
        api: {
          config: {
            server: {
              username,
            },
          },
        },
      } = store.getState()
      if (data.type === 'HISTORY') {
        store.dispatch({
          type: 'WEBSOCKET_SEND',
          payload: {
            type: 'USER_JOINED',
            payload: username,
          },
        })
      }
      break
    }

    default:
      break
  }

  return next(action)
}

export default middleware
