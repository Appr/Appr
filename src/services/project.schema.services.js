import axios from 'axios';

const baseURL = '/api/project';

function createProjectSchema(projectid, body) {
    return axios
        .post( `${baseURL}/${projectid}/create/schema`, body)
        .then(res => res)
        .catch(err => {throw err});
}

function findProjectSchemas(projectid) {
    return axios
        .get(`${baseURL}/${projectid}/schemas`)
        .then(res => res)
        .catch(err => {throw err});
}

function findProjectSchema(projectid, schemaid) {
    return axios
        .get(`${baseURL}/${projectid}/schema/${schemaid}`)
        .then(res => res)
        .catch(err => {throw err});
}

function updateProjectSchema(projectid, schemaid, body) {
    return axios
        .put(`${baseURL}/${projectid}/update/schema/${schemaid}`, body)
        .then(res => res)
        .catch(err => {throw err});
}

function deleteProjectSchema(projectid, schemaid) {
    return axios
        .delete(`${baseURL}/${projectid}/delete/schema/${schemaid}`)
        .then(res => res)
        .catch(err => {throw err});
}

export {
    createProjectSchema,
    findProjectSchemas,
    findProjectSchema,
    updateProjectSchema,
    deleteProjectSchema
};
