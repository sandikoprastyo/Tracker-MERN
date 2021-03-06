const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

/* server || port */
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Ok!',
    status: 200,
    users: 'http://localhost:5000/users',
    exercise: 'http://localhost:5000/exercises',
  });
});
/* database */
mongoose.connect(
  process.env.CONNECT_DB,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log('Connect to db success');
  },
);

/* impor router */
const exercisesRouter = require('./routers/exercises');
const usersRouter = require('./routers/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port : http://localhost:${port}`);
});

//build client babe 
if (
  process.env.NODE_ENV === 'production' ||
  process.env.NODE_ENV === 'staging'
) {
  app.use(express.static('./client/build/'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
  });
}
