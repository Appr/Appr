const express = require('express');
const getDb = require('../database/bootstrap.database');

const projectRouter = express.Router();

projectRouter.post('/create', (req, res) => {
    const { authorId } = req.body;
    const db = getDb();
    db.create_project([ authorId ])
        .then( promise => res.send())
        .catch( err => res.send(err));
});

projectRouter.get('/:projectid', (req, res) => {
    const projectId = req.params.projectid;
    const db = getDb();
    db.find_project_by_id([ projectId ])
        .then( project => res.send())
        .catch( err => res.send(err));
});

projectRouter.put('/update/:projectid', (req, res) => {
    const projectId = req.params.projectid;
    const {  } = req.body;
    const db = getDb();
    db.update_project([ projectId ])
        .then( promise => res.send())
        .catch( err => res.send(err));
});

projectRouter.delete('/delete/:projectid', (req, res) => {
    const projectId = req.params.projectid;
    const db = getDb();
    db.delete_project([ projectId ])
        .then( promise => res.send())
        .catch( err => res.send(err));
});

module.exports = projectRouter;
