import axios from 'axios';

const baseURL = '/api/project';

function createProjectController(projectid, body) {
    return axios
        .post(`${baseURL}/${projectid}/create/controller`, body)
        .then(res => res)
        .catch(err => {throw err});
}

function findProjectControllers(projectid) {
    return axios
        .get(`${baseURL}/${projectid}/controller`)
        .then(res => res)
        .catch(err => {throw err});
}

function findProjectController(projectid, controllerid) {
    return axios
        .get(`${baseURL}/${projectid}/controller/:${controllerid}`)
        .then(res => res)
        .catch(err => {throw err});
}

function updateProjectController(projectid, controllerid, body) {
    return axios
        .put(`${baseURL}/${projectid}/update/controller/:${controllerid}`, body)
        .then(res => res)
        .catch(err => {throw err});
}

function deleteProjectController(projectid, controllerid) {
    return axios
        .delete(`${baseURL}/${projectid}/delete/controller/:${controllerid}`)
        .then(res => res)
        .catch(err => {throw err});
}

export {
    createProjectController,
    findProjectControllers,
    findProjectController,
    updateProjectController,
    deleteProjectController
};
