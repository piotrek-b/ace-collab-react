export const MODAL_OPENED = 'MODAL_OPENED'
export const modalOpened = (modalType, modalProps) => ({
  type: MODAL_OPENED,
  payload: {
    modalType,
    modalProps,
  },
})

export const MODAL_CLOSED = 'MODAL_CLOSED'
export const modalClosed = () => ({
  type: MODAL_CLOSED,
})

export const modalOpen = (modalType, modalProps = {}) => (dispatch) => (
  new Promise((resolve, reject) => {
    dispatch(modalOpened(modalType, {
      ...modalProps,
      resolve,
      reject,
    }))
  }).then((...data) => {
    dispatch(modalClosed())
    return { ...data }
  })
)
