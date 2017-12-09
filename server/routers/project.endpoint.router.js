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

<<<<<<< HEAD
=======
projectEndpointRouter.get('/:projectid/endpoint', (req, res) => {
    const projectid = req.params.projectid;
    const db = getDb();
    db.find_project_endpoints([ projectid ])
        .then( projectEndpoints => res.send(projectEndpoints))
        .catch( err => res.send(err));
})

>>>>>>> 2cde6254ee28f2c3147b43d9f7d1618f18f60860
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