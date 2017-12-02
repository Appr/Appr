const express = require('expresss');
const getDb = require('../database/bootstrap.database');

const projectIdeaRouter = express.Router();

projectIdeaRouter.post('project/create/idea', (req, res) => {
    const { projectId, ideaData } = req.body;
    const db = getDb();
    db.read_project_idea([ ideaData ])
        .then( projectIdea => res.send(projectIdea))
        .catch( err => res.send(err));
});

projectIdeaRouter.get('project/idea/:ideaid', (req, res) => {
    const ideaid = req.params.ideaid;
    const db = getDb();
    db.read_project_idea([ ideaid ])
        .then( projectIdea => res.send(projectIdea))
        .catch( err => res.send(err));
});

projectIdeaRouter.put('project/update/idea/:ideaid', (req, res) => {
    const ideaid = req.params.ideaid;
    const { projectId, ideaData } = req.body;
    const db = getDb();
    db.update_project_idea([ ideaData ])
        .then( promise => res.send())
        .catch( err => res.send(err));
});

projectIdeaRouter.delete('project/delete/idea/:ideaid', (req, res) => {
    const ideaid = req.params.ideaid;
    const db = getDb();
    db.delete_project_idea([ ideaid ])
        .then( promise => res.send())
        .catch( err => res.send(err));
});

module.exports = projectIdeaRouter;

