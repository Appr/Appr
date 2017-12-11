const express = require('express');
const getDb = require('../database/bootstrap.database');

const projectSchemaRouter = express.Router();

projectSchemaRouter.post('/:projectid/create/schema', (req, res) => {
    const projectid = req.params.projectid;
    const {tableNameId, columnName, schemaTypeId, sizeData, isPrimaryKey, isForeignKey, isSerial, isNotNull, isUnique} = req.body;
    const db = getDb();
    db.create_project_schema([ projectid, tableNameId, columnName, schemaTypeId, sizeData, isPrimaryKey, isForeignKey, isSerial, isNotNull, isUnique ])
        .then(promise => res.send())
        .catch(err => res.status(500).send(err));
});

// get all
projectSchemaRouter.get('/:projectid/schemas', (req, res) => {
    const projectid = req.params.projectid;
    const db = getDb();
    db.find_project_schemas([ projectid ])
        .then(schemas => res.send(schemas))
        .catch(err => res.status(500).send(err));
});

// get one
projectSchemaRouter.get('/:projectid/schema/:schemaid', (req, res) => {
    const projectid = req.params.projectid;
    const schemaid = req.params.schemaid;
    const db = getDb();
    db.find_project_schema([ projectid, schemaid ])
        .then(schema => res.send(schema))
        .catch(err => res.status(500).send(err));
});

projectSchemaRouter.put('/:projectid/update/schema/:schemaid', (req, res) => {
    const projectid = req.params.projectid;
    const schemaid = req.params.schemaid;
    const {tableName, columnName, schemaTypeId, sizeData, isPrimaryKey, isForeignKey, isSerial, isNotNull, isUnique} = req.body;
    const db = getDb();
    db.update_project_schema([ projectid, schemaid, tableName, columnName, schemaTypeId, sizeData, isPrimaryKey, isForeignKey, isSerial, isNotNull, isUnique ])
        .then(promise => res.send())
        .catch(err => res.status(500).send(err));
});

projectSchemaRouter.delete('/:projectid/delete/schema/:schemaid', (req, res) => {
    const projectid = req.params.projectid;
    const schemaid = req.params.schemaid;
    const db = getDb();
    db.delete_project_schema([ projectid, schemaid ])
        .then(promise => res.send())
        .catch(err => res.status(500).send(err));
});

module.exports = projectSchemaRouter;
