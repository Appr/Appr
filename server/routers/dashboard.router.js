const express = require('express');
const getDb = require('../database/bootstrap.database');

const dashboardRouter = express.Router();

dashboardRouter.get('/:userid', (req, res) => {
    const userid = req.params.userid;
    const db = getDb();
    db.find_usergroups_by_userid([ userid ])
        .then( uGroupIds => {
            let userGroups = [];
            let groupProjects = [];
            let userProjects = [];
            let userGroupsReady = false;
            let groupProjectsReady = false;
            let userProjectsReady = false;
            function checkifReady(ready1, ready2, ready3) {
                if (ready1 === true && ready2 === true && ready3 === true) {
                    const dashboardData = {
                        groups: userGroups,
                        projects: [...groupProjects, ...userProjects]
                    };
                    res.send(dashboardData);
                }
            }
            for (var i in uGroupIds) {
                db.find_group_by_id([ uGroupIds[i].group_id ])
                    .then( group => {
                        userGroups.push(group[0]);
                        if (userGroups.length === uGroupIds.length) {
                            userGroupsReady = true;
                        }
                        db.find_groupprojects_by_groupid([ uGroupIds[i].group_id ])
                            .then( gProjectIds => {
                                for (var j in gProjectIds) {
                                    db.find_project_by_id([ gProjectIds[j].project_id ])
                                        .then( gproject => {
                                            groupProjects.push(gproject[0]);
                                            if (groupProjects.length === gProjectIds.length) {
                                                groupProjectsReady = true;
                                                checkifReady(userGroupsReady, groupProjectsReady, userProjectsReady);
                                            }
                                        })
                                        .catch(err => res.status(500).send(err));
                                }
                            })
                            .catch(err => res.status(500).send(err));
                    })
                    .catch(err => res.status(500).send(err));
            }
            db.find_userprojects_by_userid([ userid ])
                .then( uProjectIds => {
                    for (var k in uProjectIds) {
                        db.find_project_by_id([ uProjectIds[k].project_id ])
                            .then( uproject => {
                                userProjects.push(uproject[0]);
                                if (userProjects.length === uProjectIds.length) {
                                    userProjectsReady = true;
                                    checkifReady(userGroupsReady, groupProjectsReady, userProjectsReady);
                                }
                            })
                            .catch(err => res.status(500).send(err));
                    }
                })
                .catch(err => res.status(500).send(err));
        })
        .catch(err => res.status(500).send(err));
});

module.exports = dashboardRouter;
