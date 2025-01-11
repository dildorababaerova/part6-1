import { createRoot } from 'react-dom/client'
import counterReducer from './reducers/counterReducer.js'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

const store = createStore(counterReducer)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
