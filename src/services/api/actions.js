export const USERNAME_SET = 'USERNAME_SET'
export const usernameSet = (userName) => (dispatch) => dispatch({
  type: USERNAME_SET,
  payload: userName,
})

export const websocketConnect = () => ({
  type: 'WEBSOCKET_CONNECT',
  payload: {
    url: 'ws://localhost:3000/ui',
  },
})
