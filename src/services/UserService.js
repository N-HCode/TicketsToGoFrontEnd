import axios from 'axios';
import {axiosForGetRequests, axiosForRequestsOtherThanGet} from "./config/AxiosConfig";

//There is an "auth" parameter for Basic Auth:
//https://github.com/axios/axios

const loginAPI = (username, password) => {

    axiosForRequestsOtherThanGet.defaults.headers.common["X-XSRF-TOKEN"] = document.cookie.match("XSRF-TOKEN")?.input.replace("XSRF-TOKEN=","");
    
    //For spring security form login or we need to use 'application/x-www-form-urlencoded'
    //axios is smart enough when you use a string it will have the content type.
    return axiosForRequestsOtherThanGet.post(`http://localhost:8080/login`,
    { 
        username: username,
        password: password
    })
    
}

const getUserById = (id) => {
    return axiosForGetRequests.get(`http://localhost:8080/user/${id}`)
}


const createUser = (user) => {
    return axiosForRequestsOtherThanGet.post("http://localhost:8080/user/create", user)
}


const editUser = (userId, userModel) => {
    return axiosForRequestsOtherThanGet.put(`http://localhost:8080/user/${userId}`, userModel);
}

const checkPassword = (userId, password) => {
    return axiosForGetRequests.get(`http://localhost:8080/user/check/${userId}?password=${password}`);
  
}

const checkUsername = (username) => {
    //get don't support form data.

    return axiosForGetRequests.get(`http://localhost:8080/user/check_username?username=${username}`);
}

const deleteUser = (userId) => {
    return axiosForRequestsOtherThanGet.delete(`http://localhost:8080/user/${userId}`);

}

const verify = () => {
    return axiosForGetRequests.get(`http://localhost:8080/user/verify`);
}

const getTheUser = () => {
    return axiosForGetRequests.get(`http://localhost:8080/user`);
}

export  { loginAPI, createUser, editUser, checkPassword, checkUsername, deleteUser, verify, getTheUser, getUserById};