import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { notify } from "../reducers/notificationReducer";


const NewAnecdote = () => {
    const dispatch = useDispatch();

    const addAnecdote = (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.anecdote.value = "";
        
        dispatch(createAnecdote(content));
        notify(`You created a new anecdote: '${content}'`)
    };  

    return (
        <form onSubmit={addAnecdote}>
            <input name = "anecdote"/>
            <button type="submit">add a new anecdote</button>
        </form>
    )
}
export default NewAnecdote;
        
