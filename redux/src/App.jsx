import Anecdotes from './components/Anecdotes'
import React from 'react'
import NewAnecdote from './components/NewAnecdote'
import VisibilityFilter from './components/VisibilityFilter'

const App = () => {

  return (
    <div>
        <h2>Anecdotes</h2>
        <VisibilityFilter />  
        <Anecdotes />
        <NewAnecdote />
    </div>
  )
}

export default App