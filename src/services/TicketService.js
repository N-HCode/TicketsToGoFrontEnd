import axios from 'axios';
import customAxios from "./config/AxiosConfig";

const createTicket = "http://localhost:8080/ticket/create";
const editTicket = "http://localhost:8080/ticket/";
const findAll = "http://localhost:8080/ticket/all";
const deleteTicket= "http://localhost:8080/ticket/";

const getTicketById = (ticketId) => {
    return customAxios.get(`http://localhost:8080/ticket/${ticketId}`);
}

const closeTicket = (ticketId) => {
    return customAxios.put(`http://localhost:8080/ticket/close/${ticketId}`);

}

export  { createTicket, findAll, editTicket, deleteTicket, getTicketById, closeTicket };