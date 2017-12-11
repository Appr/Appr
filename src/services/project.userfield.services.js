import axios from 'axios';

const baseURL = '/api/project';

function createProjectUserField(projectid, body) {
    return axios
        .post(`${baseURL}/${projectid}/create/userfield`, body)
        .then(res => res)
        .catch(err => {throw err});
}

function findProjectUserFields(projectid) {
    return axios
        .get(`${baseURL}/${projectid}/userfields`)
        .then(res => res)
        .catch(err => {throw err});
}

function findProjectUserField(projectid, userfieldid) {
    return axios
        .get(`${baseURL}/${projectid}/userfield/${userfieldid}`)
        .then(res => res)
        .catch(err => {throw err});
}

function updateProjectUserField(projectid, userfieldid, body) {
    return axios    
        .put(`${baseURL}/${projectid}/update/userfield/${userfieldid}`, body)
        .then(res => res)
        .catch(err => {throw err});
}

function deleteProjectUserField(projectid, userfieldid) {
    return axios    
        .delete(`${baseURL}/${projectid}/delete/userfield/${userfieldid}`)
        .then(res => res)
        .catch(err => {throw err});
}

export {
    createProjectUserField,
    findProjectUserFields,
    findProjectUserField,
    updateProjectUserField,
    deleteProjectUserField
};
