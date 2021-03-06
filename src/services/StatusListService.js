import {axiosForGetRequests, axiosForRequestsOtherThanGet} from "./config/AxiosConfig";

const getAllStatus = (statusListId) => {
    return axiosForGetRequests.get(`http://localhost:8080/statuslist/${statusListId}`);
}


//Need to change the header so that it expects a String for the body and not an entity
const addAStatus = (statusListId, status) => {
    return axiosForRequestsOtherThanGet.put(`http://localhost:8080/statuslist/add/${statusListId}`
    , status
    , {

        headers: {"Content-Type": "text/plain"}
    }
    );
}

const removeAStatus = (statusListId, status) => {
    return axiosForRequestsOtherThanGet.put(`http://localhost:8080/statuslist/remove/${statusListId}`
    , status
    , {

        headers: {"Content-Type": "text/plain"}
    }
    );
}


export  { getAllStatus, addAStatus, removeAStatus};