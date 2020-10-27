import axios from 'axios';

const createTicket = (id, ticket) => {
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
      return axios.post(`http://localhost:8080/ticket/create?userId=${id}`, ticket, { cancelToken: source.token })
      .then(response => response.data)
      .then( source.cancel());
  }

const findAll = () => {
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
    return axios.get("http://localhost:8080/ticket/all", { cancelToken: source.token })
    .then( response => response.data)
    .then( source.cancel());
}

const findTicket = (id) => {
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  return axios.get(`http://localhost:8080/ticket/${id}`, { cancelToken: source.token })
  .then( response => response.data )
  .then( source.cancel());
}

const editTicket = (id, ticket) => {
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  return axios.put(`http://localhost:8080/ticket/${id}`, ticket, { cancelToken: source.token })
  .then( response => response.data)
  .then( source.cancel());
}

const deleteTicket = (id) => {
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  return axios.delete(`http://localhost:8080/ticket/${id}`, { cancelToken: source.token })
  .then( source.cancel())
}

export  { createTicket, findAll, findTicket, editTicket, deleteTicket };