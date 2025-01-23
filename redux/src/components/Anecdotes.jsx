import { useDispatch, useSelector } from 'react-redux'
import { voteOf } from '../reducers/anecdoteReducer'
import{setNotification} from '../reducers/notificationReducer'

const Anecdotes = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state =>
      {
      if ( state.filter.trim() !=='')
        {
        return state.anecdotes.filter(anecdote =>anecdote.content.toLowerCase().includes(state.filter.toLowerCase()));
        }
        return state.anecdotes;
      });
      console.log("Anecdotes",anecdotes)


    const vote = async (id) => {
      // const updetedAnecdoteVote = await anecdoteService.voteService(id);
      dispatch(voteOf(id));
      const content = anecdotes.find(anecdote => anecdote.id === id).content;
      const message = `You voted for: '${content}'`;
      dispatch(setNotification(message, 5));
      }
      
    const sortedAnecdotes = anecdotes ?[...anecdotes].sort((a, b) => b.votes - a.votes): [];
    console.log("SOrted",sortedAnecdotes)

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