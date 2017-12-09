const express = require('express');
const getDb = require('../database/bootstrap.database');

const projectIdeaRouter = express.Router();

projectIdeaRouter.post('/:projectid/create/idea', (req, res) => {
    const projectid = req.params.projectid;
    const { ideaData } = req.body;
    const db = getDb();
    db.create_project_idea([ projectid, ideaData ])
        .then( promise => res.send())
        .catch( err => res.send(err));
});

//get all
projectIdeaRouter.get('/:projectid/idea', (req, res) => {
    const projectid = req.params.projectid;
    const db = getDb();
    db.find_project_ideas([ projectid ])
        .then( projectIdeas => res.send(projectIdeas))
        .catch( err => res.send(err));
});

//get one
projectIdeaRouter.get('/:projectid/idea/:ideaid', (req, res) => {
    const projectid = req.params.projectid;
    const ideaid = req.params.ideaid;
    const db = getDb();
    db.find_project_idea([ projectid, ideaid ])
        .then( projectIdea => res.send(projectIdea))
        .catch( err => res.send(err));
});

projectIdeaRouter.put('/:projectid/update/idea/:ideaid', (req, res) => {
    const projectid = req.params.projectid;
    const ideaid = req.params.ideaid;
    const { projectId, ideaData } = req.body;
    const db = getDb();
    db.update_project_idea([ projectid, ideaid, ideaData ])
        .then( promise => res.send())
        .catch( err => res.send(err));
});

projectIdeaRouter.delete('/:projectid/delete/idea/:ideaid', (req, res) => {
    const projectid = req.params.projectid;
    const ideaid = req.params.ideaid;
    const db = getDb();
    db.delete_project_idea([ projectid, ideaid ])
        .then( promise => res.send())
        .catch( err => res.send(err));
});

module.exports = projectIdeaRouter;
