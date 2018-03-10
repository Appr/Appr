import axios from 'axios';

const baseURL = '/api/dashboard';

function findDashboardInfo(userid) {
    return axios
        .get(`${baseURL}/${userid}`)
        .then(res => res)
        .catch(err => {throw err});
}

function findPersonalProjects(userid) {
    return axios
        .get(`${baseURL}/personal-projects/${userid}`)
        .then(res => res)
        .catch(err => {throw err});
}

function findRecentProjects(userid) {
    return axios
        .get(`${baseURL}/recent-projects/${userid}`)
        .then(res => res)
        .catch(err => {throw err});
}
export {
    findDashboardInfo,
    findPersonalProjects,
    findRecentProjects
};
