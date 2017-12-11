const express = require('express');
const getDb = require('../database/bootstrap.database.js');

const projectUserFieldRouter = express.Router();

projectUserFieldRouter.post('/:projectid/create/userfield', (req, res) => {
    const projectid = req.params.projectid;
    const { targetDemoData, skillData, descriptionData } = req.body;
    const db = getDb();
    db.create_project_userfield([ projectid, targetDemoData, skillData, descriptionData ])
        .then(promise => res.send())
        .catch(err => res.status(500).send(err));
});

// get all
projectUserFieldRouter.get('/:projectid/userfields', (req, res) => {
    const projectid = req.params.projectid;
    const db = getDb();
    db.find_project_userfields([ projectid ])
        .then(userfields => res.send(userfields))
        .catch(err => res.status(500).send(err));
});

// get one
projectUserFieldRouter.get('/:projectid/userfield/:userfieldid', (req, res) => {
    const projectid = req.params.projectid;
    const userfieldid = req.params.userfieldid;
    const db = getDb();
    db.find_project_userfield([ projectid, userfieldid ])
        .then(userfield => res.send(userfield))
        .catch(err => res.status(500).send(err));
});

projectUserFieldRouter.put('/:projectid/update/userfield/:userfieldid', (req, res) => {
    const projectid = req.params.projectid;
    const userfieldid = req.params.userfieldid;
    const { targetDemoData, skillData, descriptionData } = req.body;
    const db = getDb();
    db.update_project_userfield([ projectid, userfieldid, targetDemoData, skillData, descriptionData ])
        .then(promise => res.send())
        .catch(err => res.status(500).send(err));
});

projectUserFieldRouter.delete('/:projectid/delete/userfield/:userfieldid', (req, res) => {
    const projectid = req.params.projectid;
    const userfieldid = req.params.userfieldid;
    const db = getDb();
    db.delete_project_userfield([ projectid, userfieldid ])
        .then(promise => res.send())
        .catch(err => res.status(500).send(err));
});

module.exports = projectUserFieldRouter;
