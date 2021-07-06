import {axiosForGetRequests, axiosForRequestsOtherThanGet} from "./config/AxiosConfig";

const createTicket = (ticket) => {

    return axiosForRequestsOtherThanGet.post("http://localhost:8080/ticket/create", ticket);

} 

const editTicket = (id, ticket) => {
    return axiosForRequestsOtherThanGet.put(`http://localhost:8080/ticket/${id}`, ticket);
} 

const findAll = "http://localhost:8080/ticket/all";
const deleteTicket= "http://localhost:8080/ticket/";

const getTicketByStatus = (status) => {
    return axiosForGetRequests.get(`http://localhost:8080/ticket/search/0/100?status=${status}`)
}

const getTicketById = (ticketId) => {


    return axiosForGetRequests.get(`http://localhost:8080/ticket/${ticketId}`);
    
}

const closeTicket = (ticketId) => {
    return axiosForRequestsOtherThanGet.put(`http://localhost:8080/ticket/close/${ticketId}`);

}

export  { createTicket, findAll, editTicket, deleteTicket, getTicketById, closeTicket, getTicketByStatus };