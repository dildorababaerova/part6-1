# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


#Redux (part-6)

* `npm create vite@latest redux --template react`
*  `npm install redux`

* The third important method that the store has is subscribe, which is used to create callback functions that the store calls whenever an action is dispatched to the store.

```js
store.subscribe(() => {
  const storeNow = store.getState()
  console.log(storeNow)
})
```
* The choice of the field name is not random. The general convention is that actions have exactly two fields, type telling the `type` and `payload` containing the data included with the Action.

* `npm install --save-dev jest @babel/preset-env @babel/preset-react eslint-plugin-jest`
- The whole state of the application is stored in one JavaScript object in the store.
- The state of the store is changed with actions. Actions are `objects`, which have at least a field determining the type of the action. If there is data involved with the action,
- Create `.babelrc` file
```js
{
  "presets": [
    "@babel/preset-env",
    ["@babel/preset-react", { "runtime": "automatic" }]
  ]
}
```
* Let us expand `package.json` with a script for running the tests:

```js
{
  // ...
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",

    "test": "jest"
  },
  // ...
}
```
- And finally, `.eslintrc.cjs` needs to be altered as follows:

```js
module.exports = {
  root: true,
  env: { 
    browser: true,
    es2020: true,

    "jest/globals": true
  },
  // ...
}
```

- We'll also add the library deep-freeze, which can be used to ensure that the reducer has been correctly defined as an immutable function.
* `npm install --save-dev deep-freeze`

Adding a new note creates the state returned from the Array's concat function. Let's take a look at how we can achieve the same by using the JavaScript array spread syntax:

```js
const noteReducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_NOTE':

      return [...state, action.payload]
    case 'TOGGLE_IMPORTANCE':
      // ...
    default:
    return state
  }
}
```
* `...numbers` breaks the array up into individual elements, which can be placed in another array.

```js
[...numbers, 4, 5]
```

and the result is an array [1, 2, 3, 4, 5].

```js
addNote = (event) => {
  event.preventDefault()

  const content = event.target.note.value
  event.target.note.value = ''
  store.dispatch({
    type: 'NEW_NOTE',
    payload: {
      content,
      important: false,
      id: generateId()
    }
  })
}
```


* We can get the content of the new note straight from the form field. Because the field has a name, we can access the content via the event object `event.target.note.value`. 

```js
<form onSubmit={addNote}>

  <input name="note" />
  <button type="submit">add</button>
</form>
```

### Action creators

React components don't need to know the Redux action types and forms. Let's separate creating actions into separate functions:
```js
const createNote = (content) => {
  return {
    type: 'NEW_NOTE',
    payload: {
      content,
      important: false,
      id: generateId()
    }
  }
}

const toggleImportanceOf = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    payload: { id }
  }
}
```
Functions that create actions are called `action creators`.

The App component `does not have to know anything about` the inner representation of the actions anymore, it just `gets the right action` by calling the `creator function`:

```js
const App = () => {
  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''

    store.dispatch(createNote(content))
    
  }
  
  const toggleImportance = (id) => {

    store.dispatch(toggleImportanceOf(id))
  }

  // ...
}
```

### Forwarding Redux Store to various components

`npm install react-redux`

Add to main.jsx:

```js
//..
import { Provider } from 'react-redux'
//..
<Provider store={store}>    
<App />
</Provider>
//..
```

* Defining the action creators has been moved to the file reducers/noteReducer.js where the reducer is defined. That file looks like this:

```js
const noteReducer = (state = [], action) => {
  // ...
}

const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))


export const createNote = (content) => {
  return {
    type: 'NEW_NOTE',
    payload: {
      content,
      important: false,
      id: generateId()
    }
  }
}


export const toggleImportanceOf = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    payload: { id }
  }
}

export default noteReducer
```

* The module now has multiple export commands.
- The `reducer` function is returned with the `export default noteReducer` command and multiple "normal" exports(`exports const createNote` and `export const toggleImportanceOf`)

Now the code dispatched with dispatch function from useDispatch hook.

- The component can access the notes stored in the store with the useSelector- hook. The `useDispatch` hook provides any React components access to the dispatch function of the Redux store difined in main.jsx. This allows all components to make changes to the state of the redux store.
- `useSelector` receives a function as a parameter. The function searches or selects data from the Redux store.
 ```js
 const importantNotes = useSelector(state => state.filter(note => note.important))  
 ```

 ### More components

* The event handler `for changing the state` of the app (which now lives in Redux) has been `moved` away from the App `to a child component`.

```js
import { useDispatch, useSelector } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'

const Note = ({ note, handleClick }) => {
  return(
    <li onClick={handleClick}>
      {note.content} 
      <strong> {note.important ? 'important' : ''}</strong>
    </li>
  )
}

const Notes = () => {

  const dispatch = useDispatch()
  const notes = useSelector(state => state)

  return(
    <ul>
      {notes.map(note =>
        <Note
          key={note.id}
          note={note}
          handleClick={() => 
            dispatch(toggleImportanceOf(note.id))
          }
        />
      )}
    </ul>
  )
}

export default Notes
```


### Store with complex state

```js
import NewNote from './components/NewNote'
import Notes from './components/Notes'

const App = () => {

  const filterSelected = (value) => {
    console.log(value)
  }

  return (
    <div>
      <NewNote />

      <div>
        all          <input type="radio" name="filter"
          onChange={() => filterSelected('ALL')} />
        important    <input type="radio" name="filter"
          onChange={() => filterSelected('IMPORTANT')} />
        nonimportant <input type="radio" name="filter"
          onChange={() => filterSelected('NONIMPORTANT')} />
      </div>
      <Notes />
    </div>
  )
}
```
Since the name attribute of all the radio button is the same (`name="filter"`), they form a button group where only onw option can be selected.
in a new implementation, the state object has two properties, notes that contains the array of notes and filter that contains a string indicating which notes sould be displayed to the user.4

### Combined reducers

```js
const filterReducer = (state = 'ALL', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.payload
    default:
      return state
  }
}
export const filterChange = filter => {
  return {
    type: 'SET_FILTER',
    payload: filter,
  }
}

export default filterReducer
```
We can create the actual reducer for our application by combining the two existing reducers with the combineReducers function.

Let's define the combined reducer in the main.jsx file:

```js
//..
import { createStore, combineReducers } from 'redux'
//..
import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({  
  notes: noteReducer,  
  filter: filterReducer
  })
const store = createStore(reducer)
//..
```
The state of the store defined by the reducer above is an object with `two properties`: `notes` and `filter`. The value 
of the notes property is defined by the noteReducer, which `does not have to deal` with the `other properties` of the state. 
Likewise, the `filter property` is `managed` by the `filterReducer`.
The combine reducer works in such a way that every action get handled in every part of the combined reducer. 
Typically only one reducer is interested in any given action but there are situations where multiple reducers 
change their respective parts of the state based on the same action.

### Finishing the filter 

We start by changing the rendering of the application and hooking up the store to the application in the main.jsx file:
```js
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
```

Because the notes are in the stores field notes, we only have to make a little change to the selector function:

```js
  const notes = useSelector(state => state.notes)
```

- Lets extract the visibility filter into its own src/components/VisibilityFilter.jsx component:

```js
import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const VisibilityFilter = (props) => {
  const dispatch = useDispatch()

  return (
    <div>
      all    
      <input 
        type="radio" 
        name="filter" 
        onChange={() => dispatch(filterChange('ALL'))}
      />
      important   
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch(filterChange('IMPORTANT'))}
      />
      nonimportant 
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch(filterChange('NONIMPORTANT'))}
      />
    </div>
  )
}

export default VisibilityFilter
```

Let's change the Notes component to incorporate the filter:

```js
const Notes = () => {
  const dispatch = useDispatch()

  const notes = useSelector(state => {
    if ( state.filter === 'ALL' ) {
      return state.notes
    }
    return state.filter  === 'IMPORTANT' 
      ? state.notes.filter(note => note.important)
      : state.notes.filter(note => !note.important)
  })

  return(
    <ul>
      {notes.map(note =>
        <Note
          key={note.id}
          note={note}
          handleClick={() => 
            dispatch(toggleImportanceOf(note.id))
          }
        />
      )}
    </ul>
  )
}
```

We only make changes to the selector function, which used to be:
```js
useSelector(state => state.notes)
```
Let's simplify the selector by destructuring the fields from the state it receives as a parameter:

```js
const notes = useSelector(({ filter, notes }) => {
  if ( filter === 'ALL' ) {
    return notes
  }
  return filter  === 'IMPORTANT' 
    ? notes.filter(note => note.important)
    : notes.filter(note => !note.important)
})
```
-Attention! state selector destructured. `state = { filter, notes }`



### Redux Toolkit

`npm install @reduxjs/toolkit`
Instead of Redux's createStore function, let's create the store using Redux Toolkit's `configureStore` function:

```js
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import { configureStore } from '@reduxjs/toolkit'
import App from './App'

import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'


const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer
  }
})

console.log(store.getState())

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
```

We can use the createSlice function to refactor the reducer and action creators in the reducers/noteReducer.js file in the following manner:

```js
import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  {
    content: 'reducer defines how redux store works',
    important: true,
    id: 1,
  },
  {
    content: 'state of store can contain any data',
    important: false,
    id: 2,
  },
]

const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))


const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    createNote(state, action) {
      const content = action.payload
      state.push({
        content,
        important: false,
        id: generateId(),
      })
    },
    toggleImportanceOf(state, action) {
      const id = action.payload
      const noteToChange = state.find(n => n.id === id)
      const changedNote = { 
        ...noteToChange, 
        important: !noteToChange.important 
      }
      return state.map(note =>
        note.id !== id ? note : changedNote 
      )     
    }
  },
})
```

The createSlice function's name parameter defines the prefix which is used in the action's type values. For example, the createNote action defined later will have the type value of notes/createNote.

Note that the action.payload in the function contains the argument provided by calling the action creator:

```js
dispatch(createNote('Redux Toolkit is awesome!'))
```
This dispatch call is equivalent to dispatching the following object:

```js
dispatch({ type: 'notes/createNote', payload: 'Redux Toolkit is awesome!' })
```

### Redux DevTools

Redux DevTools is a Chrome addon that offers useful development tools for Redux.


# Communicating with server in a Redux application

We'll install json-server for the project:

`npm install json-server --save-dev`

and add the following line to the scripts part of the file package.json

```js
"scripts": {
  "server": "json-server -p3001 --watch db.json",
  // ...
}
```

### Getting data from the backend

```js
import axios from 'axios'

const baseUrl = 'http://localhost:3001/notes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { getAll }
```

We'll add axios to the project

`npm install axios`

```js
const baseUrl = 'http://localhost:3001/notes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}


const createNew = async (content) => {
  const object = { content, important: false }
  const response = await axios.post(baseUrl, object)
  return response.data
}

export default {
  getAll,

  createNew,
}
```

The method addNote of the component NewNote changes slightly:

```js
import { useDispatch } from 'react-redux'
import { createNote } from '../reducers/noteReducer'

import noteService from '../services/notes'

const NewNote = (props) => {
  const dispatch = useDispatch()
  

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''

    const newNote = await noteService.createNew(content)
    dispatch(createNote(newNote))
  }

  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">add</button>
    </form>
  )
}

export default NewNote
```
Because the backend generates ids for the notes, we'll change the action creator createNote in the file noteReducer.js accordingly(Attention! in reducers: createNote(...) does not exist id creator ):

```js
const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    createNote(state, action) {

      state.push(action.payload)
    },
    // ..
  },
})
```

### Asynchronous actions and Redux Thunk

With Redux Thunk it is possible to implement `action creators` which `return a function instead of an object`. The function receives Redux store's `dispatch` and `getState` methods `as parameters`. This allows for example implementations of `asynchronous action creators`, which first wait for the completion of a certain asynchronous operation and after that dispatch some action, which changes the store's state.

```js
// ...

import noteService from '../services/notes'

const noteSlice = createSlice(/* ... */)

export const { createNote, toggleImportanceOf, setNotes, appendNote } = noteSlice.actions


export const initializeNotes = () => {
  return async dispatch => {
    const notes = await noteService.getAll()
    dispatch(setNotes(notes))
  }
}

export default noteSlice.reducer
```

The component App can now be defined as follows:
```js
// ...

import { initializeNotes } from './reducers/noteReducer'

const App = () => {
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(initializeNotes()) 
  }, []) 

  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}
```

Next, let's replace the createNote action creator created by the createSlice function with an asynchronous action creator:

```js
// ...
import noteService from '../services/notes'

const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    toggleImportanceOf(state, action) {
      const id = action.payload

      const noteToChange = state.find(n => n.id === id)

      const changedNote = { 
        ...noteToChange, 
        important: !noteToChange.important 
      }

      return state.map(note =>
        note.id !== id ? note : changedNote 
      )     
    },
    appendNote(state, action) {
      state.push(action.payload)
    },
    setNotes(state, action) {
      return action.payload
    }
    // createNote definition removed from here!
  },
})


export const { toggleImportanceOf, appendNote, setNotes } = noteSlice.actions

export const initializeNotes = () => {
  return async dispatch => {
    const notes = await noteService.getAll()
    dispatch(setNotes(notes))
  }
}


export const createNote = content => {
  return async dispatch => {
    const newNote = await noteService.createNew(content)
    dispatch(appendNote(newNote))
  }
}

export default noteSlice.reducer
```
The component NewNote changes as follows:

```js
// ...

import { createNote } from '../reducers/noteReducer'

const NewNote = () => {
  const dispatch = useDispatch()
  
  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''

    dispatch(createNote(content))
  }

  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">add</button>
    </form>
  )
}
```