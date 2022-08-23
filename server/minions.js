const express = require('express');
const minionsRouter = require('express').Router();

const {
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
} = require('./db');

const morgan = require('morgan');

minionsRouter.use((req, res, next) => {
    morgan('tiny');
    next();
});

//Param

minionsRouter.param('minionId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id);
    if (minion) {
        req.minion = minion;
        next();
    } else {
        res.status(404).send('This minion do not exist!');
    }
});

//GET all

minionsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('minions'));
});

//POST

minionsRouter.post('/', (req, res, next) => {
    const addMinion = addToDatabase('minions', req.body);
    res.status(201).send(addMinion);
});

//GET by ID

minionsRouter.get('/:minionId', (req, res, next) => {
    res.send(req.minion);
});

//UPdate 

minionsRouter.put('/:minionId', (req, res, next) => {
    console.log(req.body);
   res.send(updateInstanceInDatabase('minions', req.body));
});

//Delete

minionsRouter.delete('/:minionId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('minions', req.params.minionId);
    if (deleted) {
        res.status(204).send('Minion deleted!');
    } else {
        res.status(500).send();
    }    
  });

  //Work

  minionsRouter.get('/:minionId/work', (req, res, next) => {
    const work = getAllFromDatabase('work').filter((singleWork) => {
      return singleWork.minionId === req.params.minionId;
    });
    res.send(work);
  });
  
  minionsRouter.post('/:minionId/work', (req, res, next) => {
    const addWork = req.body;
    addWork.minionId = req.params.minionId;
    const createdWork = addToDatabase('work', addWork);
    res.status(201).send(createdWork);
  });
  
  minionsRouter.param('workId', (req, res, next, id) => {
    const work = getFromDatabaseById('work', id);
    if (work) {
      req.work = work;
      next();
    } else {
      res.status(404).send();
    }
  });
  
  minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
    if (req.params.minionId !== req.body.minionId) {
      res.status(400).send();
    } else {
      updatedWork = updateInstanceInDatabase('work', req.body);
      res.send(updatedWork);
    }
  });
  
  minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('work', req.params.workId);
    if (deleted) {
      res.status(204);
    } else {
      res.status(500).send();
    }    
  });

module.exports = minionsRouter;