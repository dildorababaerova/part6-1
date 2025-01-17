import { notificationChange } from '../reducers/notificationReducer'

export const notify = (message) => {
    dispatch(notificationChange(message))
    setTimeout(() => {
      dispatch(notificationChange(''))
    }, 5000)
  }