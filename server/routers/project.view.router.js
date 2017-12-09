const express = require('express');
const getDB = require('../database/bootstrap.database');

const projectViewRouter = express.Router();

projectViewRouter.post('/:projectid/create/view', (req, res) => {
    const projectId = req.params.projectid;
    const { name, imageUrl } = req.body;
    const db = getDB;
    db.create_project_view([ projectId, name, imageUrl ])
        .then(promise => res.send())
        console.log("works")
        .catch(err => res.send(err));
        console.log("didnt work")
})      

projectViewRouter.get('/:projectid/view/:viewid', (req, res) => {
    const projectid = req.params.projectid;
    const viewid = req.params.viewid;
    const db = getDB;
    db.find_project_view( [projectid, viewid] )
        .then(view => res.send(view))
        .catch(err => res.send(err));
})

projectViewRouter.put('/:projectid/update/view/:viewid', (req, res) => {
    const projectid = req.params.projectid;
    const viewid = req.params.viewid;
    const { name, imageUrl } = req.body;
    const db = getDB;
    db.update_project_view( [projectid, viewid, name, imageUrl])
        .then(promise => res.send())
        .catch(err => res.send(err));
})

projectViewRouter.delete('/:projectid/delete/view/:viewid', (req, res) => {
    const projectid = req.params.projectid;
    const viewid = req.params.viewid;
    const db = getDB;
    db.delete_project_view( [viewid] )
        .then(promise => res.send())
        .catch(err => res.send(err));
})

module.exports = projectViewRouter;