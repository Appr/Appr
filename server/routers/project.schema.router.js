const express = require('express');
const getDB = require('../database/bootstrap.database');

const projectSchemaRouter = express.Router();

projectSchemaRouter.post('/:projectid/create/schema', (req, res) => {
    const projectid = req.params.projectid;
    const {tableName, columnName, schemaTypeId, sizeData, isPrimaryKey, isForeignKey, isSerial, isNotNull, isUnique} = req.body;
    const db = getDB;
    db.create_project_schema([projectid, tableName, columnName, schemaTyoeId, sizeData, isPrimaryKey, isForeignKey, isSerial, isNotNull, isUnique])
        .then(promise => res.send())
        .catch(err => res.send(err));
})

projectSchemaRouter.get('/:projectid/schema/:schemaid', (req, res) => {
    const projectid = req.params.projectid;
    const schemaid = req.params.schemaid;
    const db = getDB;
    db.find_project_schema([projectid, schemaid])
        .then(schema => res.send(schemaid))
        .catch(err => res.send(err));
})

projectSchemaRouter.put('/:projectid/update/schema/:schemaid', (req, res) => {
    const projectid = req.params.projectid;
    const schemaid = req.params.schemaid;
    const {tableName, columnName, schemaTypeId, sizeData, isPrimaryKey, isForeignKey, isSerial, isNotNull, isUnique} = req.body;
    const db = getDB;
    db.update_project_schema([projectid, schemaid, tableName, columnName, schemaTypeId, sizeData, isPrimaryKey, isForeignKey, isSerial, isNotNull, isUnique])
        .then(promise => res.send())
        .catch(err => res.send(err));
})

projectSchemaRouter.delete('/:projectid/delete/schema/:schemaid', (req, res) => {
    const projectid = req.params.projectid;
    const schemaid = req.params.schemaid;
    const db = getDB;
    db.delete_project_schema([projectid, schemaid])
        .then(promise => res.send())
        .catch(err => res.send(err));
})

module.exports = projectSchemaRouter;