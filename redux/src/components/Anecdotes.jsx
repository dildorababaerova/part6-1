import { useDispatch, useSelector } from 'react-redux'
import { voteOf } from '../reducers/anecdoteReducer'
import { notify } from '../actions/notify'
import anecdoteService from '../services/anecdotes'

const Anecdotes = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state =>
      {
        console.log('Filter:', state.filter);
        console.log('Anecdotes:', state.anecdotes);
      if ( state.filter.trim() !=='')
        {
        return state.anecdotes.filter(anecdote =>anecdote.content.toLowerCase().includes(state.filter.toLowerCase()));
        }
        return state.anecdotes;
      });
      console.log("Anecdotes",anecdotes)


    const vote = async (id) => {
      const updetedAnecdoteVote = await anecdoteService.voteService(id);
      dispatch(voteOf(updetedAnecdoteVote.id));
        notify(`You voted for: '${updetedAnecdoteVote.content}'`);
        console.log('vote', id)
      }

    const sortedAnecdotes = anecdotes ?[...anecdotes].sort((a, b) => b.votes - a.votes): [];
    console.log(sortedAnecdotes)

    return (
        <div>
      <h2>Anecdotes</h2>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)} >vote</button>
          </div>
        </div>
      )}
    </div>
    )
}

export default Anecdotes