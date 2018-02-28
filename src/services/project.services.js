import axios from 'axios';

const baseURL = '/api/project';

function createProject( body) {
    return axios
        .post(`${baseURL}/create`, body)
        .then(res => res)
        .catch(err => {throw err});
}

function findProject(projectid) {
    return axios
        .get(`${baseURL}/${projectid}`)
        .then(res => res)
        .catch(err => {throw err});
}

function updateProject(projectid, body) {
    return axios
        .put(`${baseURL}/update/${projectid}`, body)
        .then(res => res)
        .catch(err => {throw err});
}

function deleteProject(projectid) {
    return axios
        .delete(`${baseURL}/delete/${projectid}`)
        .then(res => res)
        .catch(err => {throw err});
}

export {
    createProject,
    findProject,
    updateProject,
    deleteProject,
};
