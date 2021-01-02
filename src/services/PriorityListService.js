import axios from 'axios';

const getAllPriorities = (priorityListId) => {
    return axios.get(`http://localhost:8080/prioritylist/${priorityListId}`);
}

const addAPriority = (priorityListId, priority) => {
    return axios.put(`http://localhost:8080/prioritylist/add/${priorityListId}`
        , priority
        , {

            headers: {"Content-Type": "text/plain"}
        }
    );
}

//Need to change the header so that it expects a String for the body and not an entity
const removeAPriority = (priorityListId, priority) => {
    return axios.put(`http://localhost:8080/prioritylist/remove/${priorityListId}`
        , priority
        , {

            headers: {"Content-Type": "text/plain"}
        }
    
    );
}


export  { getAllPriorities, addAPriority, removeAPriority};