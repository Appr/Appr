const express = require('express');
const getDb = require('../database/bootstrap.database');

const projectEndpointRouter = express.Router();

projectEndpointRouter.post('/:projectid/create/endpoint', (req, res) => {
    const projectid = req.params.projectid;
    const {urlData, isGet, isPost, isUpdate, isDelete, reqEndpointId, resEndpointId} = req.body;
    const db = getDb();
    db.create_project_endpoint( [projectid, urlData, isGet, isPost, isUpdate, isDelete, reqEndpointId, resEndpointId] )
        .then(promise => res.send())
        .catch(err => res.status(500).send(err));
});

<<<<<<< HEAD
=======
// get all
projectEndpointRouter.get('/:projectid/endpoints', (req, res) => {
    const projectid = req.params.projectid;
    const db = getDb();
    db.find_project_endpoints([ projectid ])
        .then(endpoints => res.send(endpoints))
        .catch(err => res.status(500).send(err));
});

// get one
>>>>>>> 253c30a77110759fdf8281f75b75c97ff6a39c53
projectEndpointRouter.get('/:projectid/endpoint/:endpointid', (req, res) => {
    const projectid = req.params.projectid;
    const endpointid = req.params.endpointid;
    const db = getDb();
    db.find_project_endpoint([projectid, endpointid])
        .then(endpoint => res.send(endpoint))
        .catch(err => res.status(500).send(err));
});

projectEndpointRouter.put('/:projectid/update/endpoint/:endpointid', (req, res) => {
    const projectid = req.params.projectid;
    const endpointid = req.params.endpointid;
    const {urlData, isGet, isPost, isUpdate, isDelete, reqEndpointId, resEndpointId} = req.body;
    const db = getDb();
    db.update_project_endpoint([projectid, endpointid, urlData, isGet, isPost, isUpdate, isDelete, reqEndpointId, resEndpointId])
        .then(promise => res.send())
        .catch(err => res.status(500).send(err));
});

projectEndpointRouter.delete('/:projectid/delete/endpoint/:endpointid', (req, res) => {
    const projectid = req.params.projectid;
    const endpointid = req.params.endpointid;
    const db = getDb();
    db.delete_project_endpoint([projectid, endpointid])
        .then(promise => res.send())
        .catch(err => res.status(500).send(err));
});

module.exports = projectEndpointRouter;
