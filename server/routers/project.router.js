const express = require('express');
const getDb = require('../database/bootstrap.database');

const projectRouter = express.Router();

projectRouter.post('/create', (req, res) => {
    const { name, authorId } = req.body;
    const db = getDb();
    db.create_project([ name, authorId ])
        .then(promise => res.send())
        .catch(err => res.status(500).send(err));
});

projectRouter.get('/:projectid', (req, res) => {
    const projectId = req.params.projectid;
    const db = getDb();
    db.find_project_by_id([ projectId ])
        .then( project => res.send(project))
        .catch(err => res.status(500).send(err));
});

projectRouter.put('/update/:projectid', (req, res) => {
    const projectId = req.params.projectid;
    const { name } = req.body;
    const db = getDb();
    db.update_project([ projectId, name ])
        .then(promise => res.send())
        .catch(err => res.status(500).send(err));
});

projectRouter.delete('/delete/:projectid', (req, res) => {
    const projectId = req.params.projectid;
    const db = getDb();
    db.delete_project([ projectId ])
        .then(promise => res.send())
        .catch(err => res.status(500).send(err));
});

module.exports = projectRouter;
