import {axiosForGetRequests, axiosForRequestsOtherThanGet} from "./config/AxiosConfig";

const getAllStatus = () => {
    return axiosForGetRequests.get(`http://localhost:8080/status_list`);
}


//Need to change the header so that it expects a String for the body and not an entity
const addAStatus = (status) => {
    return axiosForRequestsOtherThanGet.post(`http://localhost:8080/status_list/add`
    , status
    , {

        headers: {"Content-Type": "text/plain"}
    }
    );
}

const removeAStatus = (status) => {
    return axiosForRequestsOtherThanGet.put(`http://localhost:8080/status_list/remove`
    , status
    , {

        headers: {"Content-Type": "text/plain"}
    }
    );
}


export  { getAllStatus, addAStatus, removeAStatus};