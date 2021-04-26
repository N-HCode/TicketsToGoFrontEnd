import {axiosForGetRequests, axiosForRequestsOtherThanGet} from "./config/AxiosConfig";

const createTicket = "http://localhost:8080/ticket/create";
const editTicket = "http://localhost:8080/ticket/";
const findAll = "http://localhost:8080/ticket/all";
const deleteTicket= "http://localhost:8080/ticket/";

const getTicketById = (ticketId) => {

   

    return axiosForGetRequests.get(`http://localhost:8080/ticket/${ticketId}`);
    
}

const closeTicket = (ticketId) => {
    return axiosForRequestsOtherThanGet.put(`http://localhost:8080/ticket/close/${ticketId}`);

}

export  { createTicket, findAll, editTicket, deleteTicket, getTicketById, closeTicket };