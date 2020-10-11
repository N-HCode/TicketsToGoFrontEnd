const { default: Axios } = require("axios");
import axios from 'axios';

const createTicket = (ticket) => {
    return axios.post("http://localhost:8080/ticket/create", ticket)
    .then(response => response.data)
    .then( data => data);
  }

export  { createTicket};