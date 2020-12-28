import axios from 'axios';

const getAllPriorities = (priorityListId) => {
    return axios.get(`http://localhost:8080/prioritylist/${priorityListId}`);
}

const addAPriority = (priorityListId, priority) => {
    return axios.put(`http://localhost:8080/prioritylist/add/${priorityListId}`, priority);
}

const removeAPriority = (priorityListId, priority) => {
    return axios.put(`http://localhost:8080/prioritylist/remove/${priorityListId}`, priority);
}


export  { getAllPriorities, addAPriority, removeAPriority};