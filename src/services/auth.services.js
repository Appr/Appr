import axios from 'axios';

const baseURL = '/api/auth';

function register(body) {
    return axios
        .post(`${baseURL}/register`, body)
        .then(res => res)
        .catch(err => {throw err});
}

function login(body) {
    return axios
        .post(`${baseURL}/login`, body)
        .then(res => res)
        .catch(err => {throw err});
}

function logout() {
    return axios
        .post(`${baseURL}/logout`, body)
        .then(res => res)
        .catch(err => {throw err});
}

export {
    register,
    login,
    logout
};
