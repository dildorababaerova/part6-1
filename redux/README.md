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

### Finishing the filter Selected

