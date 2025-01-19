import { useEffect } from 'react'
import Anecdotes from './components/Anecdotes'
import React from 'react'
import NewAnecdote from './components/NewAnecdote'
import VisibilityFilter from './components/VisibilityFilter'
import Notification from './components/Notification'
import anecdoteService from './services/anecdotes'
import { setAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecdoteService
    .getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)))
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