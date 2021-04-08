import axios from 'axios'

//We have two different axios because of the Csrf token.
//Csrf token is not needed in a Get request so we just don't add the header.
//However for everything else, there should be a Csrf token.
//Csrf stands for Cross-Site Request Forgery

const axiosForGetRequests = axios.create({
    //create an axios instance that have some preset configurations. Allows the main App.js to be cleaner
    withCredentials: true,
 
})

const axiosForRequestsOtherThanGet = axios.create({
    //create an axios instance that have some preset configurations. Allows the main App.js to be cleaner
    withCredentials: true,
    // headers: {"X-XSRF-TOKEN": document.cookie.match("XSRF-TOKEN").input.replace("XSRF-TOKEN=","")}
    
})


export {axiosForGetRequests, axiosForRequestsOtherThanGet}