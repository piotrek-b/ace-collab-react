export const USERNAME_SET = 'USERNAME_SET'
export const usernameSet = (userName) => (dispatch) => dispatch({
  type: USERNAME_SET,
  payload: userName,
})

export const websocketConnect = (host, port, ssl, docId, username, token) => ({
  type: 'WEBSOCKET_CONNECT',
  payload: {
    url: `ws${ssl ? 's' : ''}://${host}:${port}/ui/${docId}?username=${username}&token=${token}`,
  },
})

export const websocketDisconnect = () => ({
  type: 'WEBSOCKET_DISCONNECT',
})

export const messageSend = (message) => ({
  type: 'WEBSOCKET_SEND',
  payload: {
    type: 'MESSAGE',
    payload: message,
  },
})
