import axios from 'axios';

const baseURL = '/api/dashboard';

function findDashboardInfo(userid) {
    return axios
        .get(`${baseURL}/${userid}`)
        .then(res => res)
        .catch(err => {throw err});
}

export {
    findDashboardInfo
};
