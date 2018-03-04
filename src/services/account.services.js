import axios from 'axios';

const baseURL = '/api/account';

function findUser(userid) {
    return axios
        .get(`${baseURL}/${userid}`)
        .then(res => res)
        .catch(err => {throw err});
}



function findUsername(body) {
    return axios
        .post(`${baseURL}/username`, body)
        .then(res => res)
        .catch(err => {throw err});
}

function updateUser(userid, body) {
    return axios
        .put(`${baseURL}/update/${userid}`, body)
        .then(res => res)
        .catch(err => {throw err});
}

function deleteUser(userid) {
    return axios
        .put(`${baseURL}/update/${userid}`)
        .then(res => res)
        .catch(err => {throw err});
}

function findUserInfo(userid) {
    return axios
        .get(`${baseURL}/${userid}`)
        .then(res => res)
        .catch(err => {throw err});
}

function updateUserInfo(userid, body) {
    return axios
        .put(`${baseURL}/info/update/${userid}`, body)
        .then(res => res)
        .catch(err => {throw err});
}

function updateUserPassword(userid, body) {
    return axios
        .put(`${baseURL}/info/update/password/${userid}`, body)
        .then(res => res)
        .catch(err => {throw err});
}

function updateUserProfile(userid, body) {
    return axios
        .put(`${baseURL}/info/update/profile/${userid}`, body)
        .then(res => res)
        .catch(err => {throw err});
}

function updateUserEmail(userid, body) {
    return axios
        .put(`${baseURL}/info/update/email/${userid}`, body)
        .then(res => res)
        .catch(err => {throw err});
}

function updateUserEmail(userid, body) {
    return axios
        .put(`${baseURL}/info/update/email/${userid}`, body)
        .then(res => res)
        .catch(err => {throw err});
}

function updateUserAvatar(userid, body) {
    return axios
        .put(`${baseURL}/info/update/avatar/${userid}`, body)
        .then(res => res)
        .catch(err => {throw err});
}

export {
    findUser,
    findUsername,
    updateUser,
    deleteUser,
    findUserInfo,
    updateUserInfo,
    updateUserPassword,
    updateUserProfile,
    updateUserEmail,
    updateUserAvatar
};
