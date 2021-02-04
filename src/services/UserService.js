import axios from 'axios';
import customAxios from "./config/AxiosConfig"

//There is an "auth" parameter for Basic Auth:
//https://github.com/axios/axios

const loginAPI = (username, passsword) => {
    
    //For spring security form login or we need to use 'application/x-www-form-urlencoded'
    //axios is smart enough when you use a string it will have the content type.
    return axios.post(`http://localhost:8080/login`, `username=${username}&password=${passsword}`,
        {
            //This with Credentials will allow us to get the cookie and session ID and use it for our request
            withCredentials: true,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    )
    
}

const loginUser = (username, password) => {
    return axios.get(`http://localhost:8080/user/login?username=${username}&password=${password}`,{},
        {

            auth: {
                username: username,
                password: password
            }
        }
    )
}

const signUp = (user) => {
    return axios.post("http://localhost:8080/user/create", user)
}

const addOrganizationToUser = (id, organizationId) => {
    return axios.post(`http://localhost:8080/user/organization?id=${id}&organizationId=${organizationId}`)
}


const editUser = (userId, userModel) => {
    return axios.put(`http://localhost:8080/user/${userId}`, userModel);
}

const checkPassword = (userId, password) => {
    return axios.get(`http://localhost:8080/user/check/${userId}?password=${password}`);
  
}

const checkUsername = (username) => {
    return axios.get(`http://localhost:8080/user/checkusername?username=${username}`);
}

const deleteUser = (userId) => {
    return axios.delete(`http://localhost:8080/user/${userId}`);

}

export  { loginAPI, loginUser, signUp, addOrganizationToUser, editUser, checkPassword, checkUsername, deleteUser};