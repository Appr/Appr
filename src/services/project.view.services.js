import axios from 'axios';

const baseURL = '/api/project';

function createProjectView(projectid, body) {
    return axios
        .post(`${baseURL}/${projectid}/create/view`, body)
        .then(res => res)
        .catch(err => {throw err});
}

function findProjectViews(projectid) {
    return axios
        .get(`${baseURL}/${projectid}/views`)
        .then(res => res)
        .catch(err => {throw err});
}

function findProjectView(projectid, viewid) {
    return axios
        .get(`${baseURL}/${projectid}/view/${viewid}`)
        .then(res => res)
        .catch(err => {throw err});
}

function updateProjectView(projectid, viewid, body) {
    return axios
        .put(`${baseURL}/${projectid}/update/view/${viewid}`, body)
        .then(res => res)
        .catch(err => {throw err});
}

function deleteProjectView(projectid, viewid) {
    return axios   
        .delete(`${baseURL}/${projectid}/delete/view/${viewid}`)
        .then(res => res)
        .catch(err => {throw err});
}

export {
    createProjectView,
    findProjectViews,
    findProjectView,
    updateProjectView,
    deleteProjectView
};
