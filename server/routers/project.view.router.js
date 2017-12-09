const express = require('express');
const getDb = require('../database/bootstrap.database');

const projectViewRouter = express.Router();

projectViewRouter.post('/:projectid/create/view', (req, res) => {
<<<<<<< HEAD
    const projectId = req.params.projectid;
=======
    const projectid = req.params.projectid;
>>>>>>> 2cde6254ee28f2c3147b43d9f7d1618f18f60860
    const { name, imageUrl } = req.body;
<<<<<<< HEAD
    const db = getDB;
    db.create_project_view([ projectId, name, imageUrl ])
=======
    const db = getDb();
    db.create_project_view([projectid, name, imageUrl])
>>>>>>> 7b170e0356f38791e8d9247a69dd6b6b7c5d1ff2
        .then(promise => res.send())
        console.log("works")
        .catch(err => res.send(err));
        console.log("didnt work")
})      

projectViewRouter.get('/:projectid/views', (req, res) => {
    const projectid = req.params.projectid;
    const db = getDb();
    db.find_project_views([ projectid ])
        .then( projectViews => res.send(projectViews))
        .catch( err => res.send(err));
});

projectViewRouter.get('/:projectid/view/:viewid', (req, res) => {
    const projectid = req.params.projectid;
    const viewid = req.params.viewid;
    const db = getDb();
    db.find_project_view( [projectid, viewid] )
        .then(view => res.send(view))
        .catch(err => res.send(err));
})

projectViewRouter.put('/:projectid/update/view/:viewid', (req, res) => {
    const projectid = req.params.projectid;
    const viewid = req.params.viewid;
    const { name, imageUrl } = req.body;
    const db = getDb();
    db.update_project_view( [projectid, viewid, name, imageUrl])
        .then(promise => res.send())
        .catch(err => res.send(err));
})

projectViewRouter.delete('/:projectid/delete/view/:viewid', (req, res) => {
    const projectid = req.params.projectid;
    const viewid = req.params.viewid;
    const db = getDb();
    db.delete_project_view( [projectid, viewid] )
        .then(promise => res.send())
        .catch(err => res.send(err));
})

module.exports = projectViewRouter;