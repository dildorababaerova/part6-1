import Anecdotes from './components/Anecdotes'
import React from 'react'
import NewAnecdote from './components/NewAnecdote'
import VisibilityFilter from './components/VisibilityFilter'
import Notification from './components/Notification'

const App = () => {

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