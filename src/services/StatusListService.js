import axios from 'axios';

const getAllStatus = (statusListId) => {
    return axios.get(`http://localhost:8080/statuslist/${statusListId}`);
}

const addAStatus = (statusListId, status) => {
    return axios.put(`http://localhost:8080/statuslist/add/${statusListId}`, status);
}

const removeAStatus = (statusListId, status) => {
    return axios.put(`http://localhost:8080/statuslist/remove/${statusListId}`, status);
}


export  { getAllStatus, addAStatus, removeAStatus};