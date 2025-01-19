import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const getId = () => (100000 * Math.random()).toFixed(0)
  const newObject = {
    content,
    id: getId(),
    votes: 0
  }
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

const voteService = async (id) => {
  const anecdote = await axios.get(`${baseUrl}/${id}`)
  const newObject = { ...anecdote, votes: anecdote.votes + 1 }
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

export default { getAll, createNew, voteService }