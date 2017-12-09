const express = require('express');
const authRouter = require('./auth.router');
const accountRouter = require('./account.router');
const dashboardRouter = require('./dashboard.router');
const groupRouter = require('./group.router');
const projectRouter = require('./project.router');
const projectIdeaRouter = require('./project.idea.router');
const projectUserfieldRouter = require('./project.userfield.router');
const projectFeatureRouter = require('./project.feature.router');
const projectViewRouter = require('./project.view.router');
<<<<<<< HEAD
=======
const projectControllerRouter = require('./project.controller.router');
const projectEndpointRouter = require('./project.endpoint.router');
const projectSchemaRouter = require('./project.schema.router');
>>>>>>> 2cde6254ee28f2c3147b43d9f7d1618f18f60860

function delegateRoutesFor(app) {
    app.use('/api/auth', authRouter);
    app.use('/api/account', accountRouter);
    app.use('/api/dashboard', dashboardRouter);
    app.use('/api/group', groupRouter);
<<<<<<< HEAD
    app.use('/api/project', projectRouter, projectFeatureRouter, projectViewRouter);
  
=======

    app.use('/api/project', 
        projectRouter,
        projectIdeaRouter,
        projectUserfieldRouter,
        projectFeatureRouter,
        projectViewRouter,
        projectControllerRouter,
        projectEndpointRouter,
        projectSchemaRouter
    );
>>>>>>> 2cde6254ee28f2c3147b43d9f7d1618f18f60860

    app.all('*', (req, res) => {
        res.status(404).send({message: 'Cannot access any resource at ' + req.originalUrl});
    });
    
    return app;
}

module.exports = delegateRoutesFor;
