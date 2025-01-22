import { createSlice} from '@reduxjs/toolkit' 
import anecdoteService from '../services/anecdotes'

// const anecdotesAtStart = [
//     'If it hurts, do it more often',
//     'Adding manpower to a late software project makes it later!',
//     'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//     'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//     'Premature optimization is the root of all evil.',
//     'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
//   ]
  
  
//   const initialState = anecdotesAtStart.map(anecdote => ({
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }));
  

  const noteSlice = createSlice({
    name: 'anecdotes',
    initialState : [],
    reducers: {
      // voteOf(state, action) {
      //   const id = action.payload;
      //   return state.map(anecdote =>
      //     anecdote.id === id
      //       ? { ...anecdote, votes: anecdote.votes + 1 }
      //       : anecdote
      //   );
      // },
      appendAnecdote(state, action) {
        state.push(action.payload)
      },
      
      updateAnecdoteVote(state, action) {
        const updatedAnecdote = action.payload;
        return state.map(anecdote =>
          anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
        );
      },
      setAnecdotes(state, action)
      {
        return action.payload;
      }
    }
  })

  export const {appendAnecdote, setAnecdotes,  updateAnecdoteVote} = noteSlice.actions;
  
  export const initializeAnecdotes = () => {
    return async dispatch => {
      const anecdotes = await anecdoteService.getAll()
      dispatch(setAnecdotes(anecdotes))
    }
  }

  export const createAnecdote = (content) => {
    return async dispatch => {
      const newAnecdote = await anecdoteService.createNew(content)
      dispatch(appendAnecdote(newAnecdote));
    }
  }
  export const voteOf = (id) => {
    return async (dispatch) => {
      const updatedAnecdoteVote = await anecdoteService.voteService(id); // update vote in the server
      dispatch(updateAnecdoteVote(updatedAnecdoteVote)); // update vote in the store
    };
  };
  

  
  export default noteSlice.reducer;