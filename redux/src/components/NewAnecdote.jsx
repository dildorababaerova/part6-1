import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { notify } from "../actions/notify";
import anecdoteService from "../services/anecdotes";


const NewAnecdote = () => {
    const dispatch = useDispatch();

    const addAnecdote = async (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.anecdote.value = "";
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch(createAnecdote(newAnecdote));
        const message = `You created a new anecdote: '${newAnecdote.content}'`;
        console.log("NewAnecdote",message);
        notify(dispatch, message);
    };  

    return (
        <form onSubmit={addAnecdote}>
            <input name = "anecdote"/>
            <button type="submit">add a new anecdote</button>
        </form>
    )
}
export default NewAnecdote;
        
