import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getId = () => (100000 * Math.random()).toFixed(0)
const createNew = async (content) => {
  const newObject = {
    content,
    id: getId(),
    votes: 0
  }
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

const voteService = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  const anecdote = response.data; // data from the server
  const newObject = { ...anecdote, votes: anecdote.votes + 1 }; // actualize votes
  const updatedResponse = await axios.put(`${baseUrl}/${id}`, newObject); // send updated data to the server
  return updatedResponse.data; // return updated data
};


export default { getAll, createNew, voteService }