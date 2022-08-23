const express = require('express');
const ideasRouter = express.Router();
const checkMillionDollarIdea = require('./checkMillionDollarIdea');
const {
    getAllFromDatabase,
    addToDatabase, 
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
   } = require('./db');

//Param

ideasRouter.param('ideaId', (req, res, next, id) => {
    let idea = getFromDatabaseById('ideas', id);
    if (idea) {
        req.idea = idea;
        next();
    } else {
        res.status(404).send();
    }
});

//Get

ideasRouter.get('/', (req, res, next) => {
    res.status(200).send(getAllFromDatabase('ideas'))
});

//Post

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const newIdea = addToDatabase('ideas', req.body)
    res.status(201).send(newIdea);
});

//Get Id

ideasRouter.get('/:ideaId', (req, res, next) => {
    res.status(200).send(req.idea);
});

//Put Id

ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req, res, next) => {
    res.status(201).send(updateInstanceInDatabase('ideas', req.body));
});

//Delete

ideasRouter.delete('/:ideaId', (req, res, next) => {
    deleteFromDatabasebyId('ideas', req.idea.id);
    res.status(204).send();
});

module.exports = ideasRouter;