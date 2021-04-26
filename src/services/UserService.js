import axios from 'axios';
import {axiosForGetRequests, axiosForRequestsOtherThanGet} from "./config/AxiosConfig";

//There is an "auth" parameter for Basic Auth:
//https://github.com/axios/axios

const loginAPI = (username, password) => {

    axiosForRequestsOtherThanGet.defaults.headers.common["X-XSRF-TOKEN"] = document.cookie.match("XSRF-TOKEN").input.replace("XSRF-TOKEN=","");
    
    //For spring security form login or we need to use 'application/x-www-form-urlencoded'
    //axios is smart enough when you use a string it will have the content type.
    return axiosForRequestsOtherThanGet.post(`http://localhost:8080/login`,
    { 
        username: username,
        password: password
    })
    
}


const signUp = (user) => {
    return axiosForRequestsOtherThanGet.post("http://localhost:8080/user/create", user)
}

const addOrganizationToUser = (id, organizationId) => {
    return axiosForRequestsOtherThanGet.post(`http://localhost:8080/user/organization?id=${id}&organizationId=${organizationId}`)
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

export  { loginAPI, signUp, addOrganizationToUser, editUser, checkPassword, checkUsername, deleteUser, verify};