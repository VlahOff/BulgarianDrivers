require('dotenv').config();

const express = require('express');
const dbConfig = require('./configs/database');

const tokenParser = require('./middlewares/tokenParser');
const cors = require('./middlewares/cors');
const postController = require('./controllers/postController');
const voteController = require('./controllers/voteController');
const { isCorrectOrigin } = require('./middlewares/guards');

const EXPRESS_PORT = process.env.EXPRESS_PORT;
async function start() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(tokenParser());
  app.use(isCorrectOrigin());

  const connectToDB = dbConfig();

  app.get('/', (req, res) => {
    res.status(200).send('It works!');
  });

  app.use('/api', postController);
  app.use('/api/votes', voteController);

  connectToDB.then(() => {
    app.listen(EXPRESS_PORT, () =>
      console.log('App listening on port: ' + EXPRESS_PORT)
    );
  });
}

start();
