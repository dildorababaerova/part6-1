import { notificationChange } from '../reducers/notificationReducer';

export const notify = (dispatch, message, duration = 5000) => {
  dispatch(notificationChange(message)); // setting message
  setTimeout(() => {
    dispatch(notificationChange('')); // clearing message
  }, duration);
};
