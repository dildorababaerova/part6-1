import { notificationChange } from '../reducers/notificationReducer'

export const notify = (dispatch, message) => {
  dispatch(notificationChange(message)); // Устанавливаем сообщение
  setTimeout(() => {
    dispatch(notificationChange('')); // Сбрасываем сообщение через 5 секунд
  }, 5000);
};

