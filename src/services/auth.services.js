import axios from 'axios';

const baseURL = '/api/auth';

function register(body) {
    return axios
        .post(`${baseURL}/register`, body)
        .then(res => res)
        .catch(err => {throw err});
}

function loginTest(body) {
    return axios
        .post(`${baseURL}/login-test`, body)
        .then(res => res)
        .catch(err => {throw err});
}

function login(body) {
    return axios
        .post(`${baseURL}/login`, body)
        .then(res => res)
        .catch(err => {throw err});
}

function logout(body) {
    return axios
        .get(`${baseURL}/logout`, body)
        .then(res => res)
        .catch(err => {throw err});
}

export {
    register,
    loginTest,
    login,
    logout
};
