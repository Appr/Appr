const express = require('express');
const getDB = require('../database/bootstrap.database.js');

const projectUserFieldRouter = express.Router();

projectUserFieldRouter.post('/:projectid/create/userfield', (req, res) => {
    const projectid = req.params.projectid;
    const { targetDemoData, skillData, descriptionData } = req.body;
    const db = getDB();
    db.create_project_userfield( [projectid, targetDemoData, skillData, descriptionData] )
        .then( promise => res.send())
        .catch( err => res.send(err));
})

projectUserFieldRouter.get('/:projectid/userfield/:userfieldid', (req, res) => {
    const projectid = req.params.projectid;
    const userfieldid = req.params.userfieldid;
    const db = getDB();
    db.find_project_userfield( [projectid, userfieldid] )
        .then( userfield => res.send(userfield) )
        .catch( err => res.send(err) );
})

projectUserFieldRouter.put('/:projectid/update/userfield/:userfieldid', (req, res) => {
    const projectid = req.params.projectid;
    const userfieldid = req.params.userfieldid;
    const { targetDemoData, skillData, descriptionData } = req.body;
    const db = getDB();
    db.update_project_userfield( [projectid, userfieldid, targetDemoData, skillData, descriptionData] )
        .then( promise => res.send())
        .catch( err => res.send(err) );
})

projectUserFieldRouter.delete('/:projectid/delete/userfield/:userfieldid', (req, res) => {
    const projectid = req.params.projectid;
    const userfieldid = req.params.userfieldid;
    const db = getDB();
    db.delete_project_userfield( [projectid, userfieldid] )
        .then( promise => res.send())
        .catch( err => res.send(err));
})

module.exports = projectUserFieldRouter;