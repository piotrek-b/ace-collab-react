import { createSelector } from 'reselect'

const historySelector = (state) => state.api.history

export const getActiveUsers = createSelector(
  historySelector,
  (history) => {
    const activeUsers = {}

    history.forEach((message) => {
      if (message.type === 'USER_JOINED') {
        activeUsers[message.payload] = true
      } else if (message.type === 'USER_LEFT') {
        activeUsers[message.payload] = false
      }
    })

    return activeUsers
  }
)
