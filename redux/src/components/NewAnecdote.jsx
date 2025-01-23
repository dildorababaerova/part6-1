import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";



const NewAnecdote = () => {
    const dispatch = useDispatch();

    const addAnecdote = async (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.anecdote.value = "";
        dispatch(createAnecdote(content));
        const message = `You created a new anecdote: '${content}'`;
        console.log("NewAnecdote",message);
       dispatch(setNotification(message, 5));
    };  

    return (
        <form onSubmit={addAnecdote}>
            <input name = "anecdote"/>
            <button type="submit">add a new anecdote</button>
        </form>
    )
}
export default NewAnecdote;
        
