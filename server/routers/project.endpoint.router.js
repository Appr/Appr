const express = require('express');
const getDb = require('../database/bootstrap.database');

const projectEndpointRouter = express.Router();

projectEndpointRouter.post('/:projectid/create/endpoint', (req, res) => {
    const projectid = req.params.projectid;
    const {urlData, isGet, isPost, isUpdate, isDelete, reqEndpointId, resEndpointId} = req.body;
    const db = getDb();
    db.create_project_endpoint( [projectid, urlData, isGet, isPost, isUpdate, isDelete, reqEndpointId, resEndpointId] )
        .then(promise => res.send())
        .catch(err => res.send(err));
})

projectEndpointRouter.get('/:projectid/endpoint/:endpointid', (req, res) => {
    const projectid = req.params.projectid;
    const endpointid = req.params.endpointid;
    const db = getDb();
    db.find_project_endpoint([projectid, endpointid])
        .then(projectEndpoint => res.send(projectEndpoint))
        .catch(err => res.send(err));
})

projectEndpointRouter.put('/:projectid/update/endpoint/:endpointid', (req, res) => {
    const projectid = req.params.projectid;
    const endpointid = req.params.endpointid;
    const {urlData, isGet, isPost, isUpdate, isDelete, reqEndpointId, resEndpointId} = req.body;
    const db = getDb();
    db.update_project_endpoint([projectid, endpointid, urlData, isGet, isPost, isUpdate, isDelete, reqEndpointId, resEndpointId])
        .then(promise => res.send())
        .catch(err => res.send(err));
})

projectEndpointRouter.delete('/:projectid/delete/endpoint/:endpointid', (req, res) => {
    const projectid = req.params.projectid;
    const endpointid = req.params.endpointid;
    const db = getDb();
    db.delete_project_endpoint([projectid, endpointid])
        .then(promise => res.send())
        .catch(err => res.send(err));
})

module.exports = projectEndpointRouter;