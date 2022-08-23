const express = require('express');
const meetingsRouter = express.Router();
const {
    getAllFromDatabase,
    createMeeting,
    addToDatabase,
    deleteAllFromDatabase
   } = require('./db');
const morgan = require('morgan');

meetingsRouter.use((req, res, next) => {
    morgan('tiny')
    next();
});

//Get

meetingsRouter.get('/', (req, res, next) => {
    res.status(200).send(getAllFromDatabase('meetings'));

});

//Post

meetingsRouter.post('/', (req, res, next) => {
  const newMeeting = createMeeting();
  let addedMeeting = addToDatabase('meetings', newMeeting);
  res.status(201).send(newMeeting);
});

//Delete

meetingsRouter.delete('/', (req, res, next) => {
  deleteAllFromDatabase('meetings');
  res.status(204).send('successfull deletion');
});

module.exports = meetingsRouter;