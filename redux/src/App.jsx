import { useEffect } from 'react'
import Anecdotes from './components/Anecdotes'
import React from 'react'
import NewAnecdote from './components/NewAnecdote'
import VisibilityFilter from './components/VisibilityFilter'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [])


  return (
    <div>
        <h2>Anecdotes</h2>
        <VisibilityFilter />
        <Notification />  
        <Anecdotes />
        <NewAnecdote />
    </div>
  )
}

export default App