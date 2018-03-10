const express = require('express');
const getDb = require('../database/bootstrap.database');

const projectRouter = express.Router();

projectRouter.post('/create', (req, res) => {
    const { name, authorId } = req.body;
    const userid = req.user[0].id;
    console.log(userid)
    const db = getDb();
    db.create_project([ name, userid ])
        .then(project => {
            const projectid = project[0].id;
            res.send(project);
            db.create_userproject_relation([ userid, projectid, 1 ])
                .then(promise => res.send())
                .catch(err => res.status(500).send(err));
        })
        .catch(err => res.status(500).send(err));
});

projectRouter.get('/:projectid', (req, res) => {
    const userid = req.user[0].id;
    const projectId = req.params.projectid;
    const db = getDb();
    console.log('find project roles for ' + userid + ' ' + projectId);
    db.find_userprojects_roles_by_userid([userid, projectId])
        .then(roles => {
            const roleid = roles[0].roles_id;
            console.log('I found the roles ' + roleid);

            db.find_project_by_id([ projectId ])
            .then( project => res.send(project))
            .catch(err => res.status(500).send(err));

        })
         .catch(err => res.status(500).send(err));
});



projectRouter.put('/update/:projectid', (req, res) => {
    const userid = req.user[0].id;
    const projectId = req.params.projectid;
    const { name, background } = req.body;
    const db = getDb();
    console.log('find project roles for ' + userid + ' ' + projectId);
    db.find_userprojects_roles_by_userid([userid, projectId])
        .then(roles => {
            const roleid = roles[0].roles_id;
            console.log('I found the role ' + roleid);
            if (roleid == 1 || roleid==2)
            {
                db.update_project([ projectId, name, background ])
                    .then(promise => res.send())
                    .catch(err => res.status(500).send(err));
            }
            else
                res.send({message: 'not authorized'});
        })
        .catch(err => res.status(500).send(err));
});

projectRouter.put('/update/:projectid', (req, res) => {
    const userid = req.user[0].id;
    const projectId = req.params.projectid;
    const { name, background } = req.body;
    const db = getDb();
    console.log('find project roles for ' + userid + ' ' + projectId);
    db.find_userprojects_roles_by_userid([userid, projectId])
        .then(roles => {
            const roleid = roles[0].roles_id;
            console.log('I found the role ' + roleid);
            if (roleid == 1 || roleid==2)
            {
                db.update_project([ projectId, name, background ])
                    .then(promise => res.send())
                    .catch(err => res.status(500).send(err));
            }
            else
                res.send({message: 'not authorized'});
        })
        .catch(err => res.status(500).send(err));
});

projectRouter.put('/update/:projectid/lastopened', (req, res ) => {
    const userid = req.user[0].id;
    const projectId = req.params.projectid;
    const { time } = req.body;
    console.log(time)
    const db = getDb();
    db.update_last_opened_project([projectId, time])
        .then(promise => res.send())
        .catch(err => res.status(500).send(err))
})


projectRouter.delete('/delete/:projectid', (req, res) => {
    const projectId = req.params.projectid;
    const userid = req.user[0].id;
    const db = getDb();
    db.find_userprojects_roles_by_userid([userid, projectId])
    .then(roles => {
        const roleid = roles[0].roles_id;
        console.log('I found the role ' + roleid);
        if (roleid == 1)
        {
            db.delete_project([ projectId ])
                .then(promise => res.send())
                .catch(err => res.status(500).send(err));
        }
        else
            res.send({message: 'not authorized'});
    })

});



module.exports = projectRouter;
