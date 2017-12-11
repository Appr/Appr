const express = require('express');
const getDb = require('../database/bootstrap.database');

const projectIdeaRouter = express.Router();

projectIdeaRouter.post('/:projectid/create/idea', (req, res) => {
    const projectid = req.params.projectid;
    const { ideaData } = req.body;
    const db = getDb();
    db.create_project_idea([ projectid, ideaData ])
        .then(promise => res.send())
        .catch(err => res.status(500).send(err));
});

// get all
projectIdeaRouter.get('/:projectid/ideas', (req, res) => {
    const projectid = req.params.projectid;
    const db = getDb();
    db.find_project_ideas([ projectid ])
        .then(ideas => res.send(ideas))
        .catch(err => res.status(500).send(err));
});

// get one
projectIdeaRouter.get('/:projectid/idea/:ideaid', (req, res) => {
    const projectid = req.params.projectid;
    const ideaid = req.params.ideaid;
    const db = getDb();
    db.find_project_idea([ projectid, ideaid ])
        .then(idea => res.send(idea))
        .catch(err => res.status(500).send(err));
});

projectIdeaRouter.put('/:projectid/update/idea/:ideaid', (req, res) => {
    const projectid = req.params.projectid;
    const ideaid = req.params.ideaid;
    const { projectId, ideaData } = req.body;
    const db = getDb();
    db.update_project_idea([ projectid, ideaid, ideaData ])
        .then(promise => res.send())
        .catch(err => res.status(500).send(err));
});

projectIdeaRouter.delete('/:projectid/delete/idea/:ideaid', (req, res) => {
    const projectid = req.params.projectid;
    const ideaid = req.params.ideaid;
    const db = getDb();
    db.delete_project_idea([ projectid, ideaid ])
        .then(promise => res.send())
        .catch(err => res.status(500).send(err));
});

module.exports = projectIdeaRouter;
