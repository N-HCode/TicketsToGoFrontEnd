import axios from 'axios';

const createTicket = (ticket) => {
    return axios.post("http://localhost:8080/ticket/create", ticket)
    .then(response => response.data)
  }

const findAll = () => {
  return axios.get("http://localhost:8080/ticket/all")
  .then( response => response.data)
}

export  { createTicket, findAll };