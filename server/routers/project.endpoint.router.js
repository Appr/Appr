
const express = require('express');
const getDb = require('../database/bootstrap.database');

const projectEndpointRouter = express.Router();


//I'm having issues with this one - Landon
projectEndpointRouter.post('/:projectid/create/endpoint', (req, res) => {
    const projectid = req.params.projectid;
    const { endpointName, httpVerb, urlData, responseData, requestData } = req.body;
    const db = getDb();
    db.create_project_endpoint([ projectid, endpointName, httpVerb, urlData, responseData, requestData ])
        .then(endpoint => res.send(endpoint))
        .catch(err => res.status(500).send(err));
});

// get all
//Works
projectEndpointRouter.get('/:projectid/endpoints', (req, res) => {
    const projectid = req.params.projectid;
    const db = getDb();
    db.find_project_endpoints([ projectid ])
        .then(endpoints => res.send(endpoints))
        .catch(err => res.status(500).send(err));
});

// get one
projectEndpointRouter.get('/:projectid/endpoint/:endpointid', (req, res) => {
    const projectid = req.params.projectid;
    const endpointid = req.params.endpointid;
    const db = getDb();
    db.find_project_endpoint([projectid, endpointid])
        .then(endpoint => res.send(endpoint))
        .catch(err => res.status(500).send(err));
});

//I'm having issues with this one
projectEndpointRouter.put('/:projectid/update/endpoint/:endpointid', (req, res) => {
    const projectid = req.params.projectid;
    const endpointid = req.params.endpointid;
    const { endpointName, httpVerb, urlData, responseData, requestData } = req.body;
    const db = getDb();
    db.update_project_endpoint([projectid, endpointid, endpointName, httpVerb, urlData, responseData, requestData])
        .then(promise => res.send(promise))
        .catch(err => res.status(500).send(err));
});

//Works
projectEndpointRouter.delete('/:projectid/delete/endpoint/:endpointid', (req, res) => {
    console.log(req.user[0]);
    const projectid = req.params.projectid;
    const endpointid = req.params.endpointid;
    const db = getDb();
    db.delete_project_endpoint([projectid, endpointid])
        .then(promise => res.send())
        .catch(err => res.status(500).send(err));
});

module.exports = projectEndpointRouter;
