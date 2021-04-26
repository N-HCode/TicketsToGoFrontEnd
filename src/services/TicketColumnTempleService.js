import {axiosForGetRequests, axiosForRequestsOtherThanGet} from "./config/AxiosConfig";

const getAllTemplates = () => {

    axiosForRequestsOtherThanGet.defaults.headers.common["X-XSRF-TOKEN"] = document.cookie.match("XSRF-TOKEN").input.replace("XSRF-TOKEN=","");
    
    //For spring security form login or we need to use 'application/x-www-form-urlencoded'
    //axios is smart enough when you use a string it will have the content type.
    return axiosForGetRequests.get(`http://localhost:8080/ticket_templates/all`);
    
}

const createTicketTemplate = (ticketTemplate) => {

    return axiosForRequestsOtherThanGet.post(`http://localhost:8080/ticket_templates/create`, ticketTemplate)
}

const editTicketTemplate = (ticketTemplate) => {

    return axiosForRequestsOtherThanGet.put(`http://localhost:8080/ticket_templates/edit`,ticketTemplate);
}

export {getAllTemplates, createTicketTemplate, editTicketTemplate};