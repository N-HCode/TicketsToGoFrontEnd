import axios from 'axios';

const loginUser = (username, password) => {
    return axios.get(`http://localhost:8080/user/login?username=${username}&password=${password}`)
}

const signUp = (user) => {
    return axios.post("http://localhost:8080/user/create", user)
}

export  { loginUser, signUp };