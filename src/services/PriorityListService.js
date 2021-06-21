import {axiosForGetRequests, axiosForRequestsOtherThanGet} from "./config/AxiosConfig";

const getAllPriorities = () => {
    return axiosForGetRequests.get(`http://localhost:8080/priority_list`);
}

const addAPriority = (priority) => {
    return axiosForRequestsOtherThanGet.post(`http://localhost:8080/priority_list/add`
        , priority
        , {

            headers: {"Content-Type": "text/plain"}
        }
    );
}

//Need to change the header so that it expects a String for the body and not an entity
const removeAPriority = (priority) => {
    return axiosForRequestsOtherThanGet.put(`http://localhost:8080/priority_list/remove`
        , priority
        , {

            headers: {"Content-Type": "text/plain"}
        }
    
    );
}


export  { getAllPriorities, addAPriority, removeAPriority};