import axios from 'axios';

const createTicket = "http://localhost:8080/ticket/create";
const editTicket = "http://localhost:8080/ticket/";
const findAll = "http://localhost:8080/ticket/all";
const deleteTicket= "http://localhost:8080/ticket/";

const getTicketById = (ticketId) => {
    return axios.get(`http://localhost:8080/ticket/${ticketId}`);
}

export  { createTicket, findAll, editTicket, deleteTicket, getTicketById };