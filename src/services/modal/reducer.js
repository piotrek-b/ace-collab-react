import { MODAL_OPENED, MODAL_CLOSED} from './actions'

const initialState = {
  modalType: null,
  modalProps: {},
}

const modal = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case MODAL_OPENED: {
      const { modalType, modalProps } = payload

      return {
        modalType,
        modalProps,
      }
    }
    case MODAL_CLOSED:
      return initialState
    default:
      return state
  }
}

export default modal
