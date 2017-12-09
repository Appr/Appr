const express = require('express');
const getDB = require('../database/bootstrap.database.js');

const projectControllerRouter = express.Router();

projectControllerRouter.post('/:projectid/create/controller', (req, res) => {
    const projectid = req.params.projectid;
    const { whenData, doData, requireData } = req.body;
    const db = getDB();
    db.create_project_controller( [projectid, whenData, doData, requireData] )
        .then( promise => res.send() )
        .catch( err = res.send(err) );
})

projectControllerRouter.get('/:projectid/controller/:controllerid', (req, res) => {
    const projectid = req.params.projectid;
    const controller = req.params.controllerid;
    const db = getDB();
    db.find_project_controller( [projectid, controllerid] )
        .then( controller => res.send(controller) )
        .catch( err => res.send(err) );
})

projectControllerRouter.put('/:projectid/update/controller/:controllerid', (req, res) => {
    const projectid = req.params.projectid;
    const controller = req.params.controllerid;
    const { whenData, doData, requireData } = req.body;
    const db = getDB;
    db.update_project_controller( [projectid, controllerid, whenData, doData, requireData] )
        .then( promise => res.send() )
        .catch( err => res.send(err) );
})

projectControllerRouter.delete('/:projectid/delete/controller/:controllerid', (req. res) => {
    const projectid = req.params.projectid;
    const controller = req.params.controllerid;
    const db = getDB;
    db.delete_project_controller( [projectid, controllerid] )
        .then( promise => res.send() )
        .catch( err => res.send(err) );
})

module.exports = projectControllerRouter;