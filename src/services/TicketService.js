import axios from 'axios';

const createTicket = (ticket) => {
      return axios.post("http://localhost:8080/ticket/create", ticket)
      .then(response => response.data);
  }

const findAll = () => {
    return axios.get("http://localhost:8080/ticket/all")
    .then( response => response.data);
}

const findTicket = (id) => {
  return axios.get(`http://localhost:8080/ticket/${id}`)
  .then( response => response.data )
}

const editTicket = (id, ticket) => {
  return axios.put(`http://localhost:8080/ticket/${id}`, ticket)
  .then( response => response.data)
}

const deleteTicket = (id) => {
  return axios.delete(`http://localhost:8080/ticket/${id}`)
}

export  { createTicket, findAll, findTicket, editTicket, deleteTicket };