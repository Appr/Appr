import axios from 'axios';

const baseURL = '/api/mail';

function reportBug(body) {
    return axios
        .post(`${baseURL}/reportbug`, body)
        .then(res => res)
        .catch(err => {throw err});
}

function suggestFeature(body) {
    return axios
        .post(`${baseURL}/suggest-feature`, body)
        .then(res => res)
        .catch(err => {throw err});
}

export {
    reportBug,
    suggestFeature
}
