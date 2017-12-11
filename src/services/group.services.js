import axios from 'axios';

const baseURL = '/api/group';

function createGroup(body) {
    return axios
        .post(`${baseURL}/create`, body)
        .then(res => res)
        .catch(err => {throw err});
}

function findGroup(groupid) {
    return axios
        .get(`${baseURL}/${groupid}`)
        .then(res => res)
        .catch(err => {throw err});
}

function updateGroup(groupid, body) {
    return axios
        .put(`${baseURL}/update/${groupid}`, body)
        .then(res => res)
        .catch(err => {throw err});
}

function deleteGroup(groupid) {
    return axios
        .delete(`${baseURL}/delete/${groupid}`)
        .then(res => res)
        .catch(err => {throw err});
}

export {
    createGroup,
    findGroup,
    updateGroup,
    deleteGroup
};
