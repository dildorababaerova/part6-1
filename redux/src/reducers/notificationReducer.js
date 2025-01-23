import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        notificationChange(state, action) {
            return action.payload
        }

        }
    })

export const setNotification = (notification, timeout) => {
    return async dispatch => {
        dispatch(notificationChange(notification))
        setTimeout(() => {
            dispatch(notificationChange(''))
        }, timeout * 1000)
    }
}

export const { notificationChange } = notificationSlice.actions
export default notificationSlice.reducer
