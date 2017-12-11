const express = require('express');
const getDb = require('../database/bootstrap.database');

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

// get all
projectViewRouter.get('/:projectid/views', (req, res) => {
    const projectid = req.params.projectid;
    const db = getDb();
    db.find_project_views([ projectid ])
        .then(views => res.send(views))
        .catch(err => res.status(500).send(err));
});

// get one
projectViewRouter.get('/:projectid/view/:viewid', (req, res) => {
    const projectid = req.params.projectid;
    const viewid = req.params.viewid;
    const db = getDb();
    db.find_project_view([ projectid, viewid ])
        .then(view => res.send(view))
        .catch(err => res.status(500).send(err));
});

projectViewRouter.put('/:projectid/update/view/:viewid', (req, res) => {
    const projectid = req.params.projectid;
    const viewid = req.params.viewid;
    const { name, imageUrl } = req.body;
    const db = getDb();
    db.update_project_view([ projectid, viewid, name, imageUrl ])
        .then(promise => res.send())
        .catch(err => res.status(500).send(err));
});

projectViewRouter.delete('/:projectid/delete/view/:viewid', (req, res) => {
    const projectid = req.params.projectid;
    const viewid = req.params.viewid;
    const db = getDb();
    db.delete_project_view([ projectid, viewid ])
        .then(promise => res.send())
        .catch(err => res.status(500).send(err));
});

module.exports = projectViewRouter;
