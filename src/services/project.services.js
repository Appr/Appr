import axios from 'axios';

const baseURL = '/api/project';

function createProject(projectid, body) {
    return axios
        .post(`${baseURL}/${projectid}/create`, body)
        .then(res => res)
        .catch(err => res.status(500).send(err));
}

function findProject(projectid) {
    return axios
        .get(`${baseURL}/${projectid}`)
        .then(res => res)
        .catch(err => res.status(500).send(err));
}

function updateProject(projectid, body) {
    return axios
        .put(`${baseURL}/update/${projectid}`, body)
        .then(res => res)
        .catch(err => res.status(500).send(err));
}

function deleteProject(projectid) {
    return axios
        .delete(`${baseURL}/delete/${projectid}`)
        .then(res => res)
        .catch(err => res.status(500).send(err));
}

export {
    createProject,
    findProject,
    updateProject,
    deleteProject
};
