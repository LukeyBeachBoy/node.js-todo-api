require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');
const { authenticate } = require('./middleware/authenticate');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
/*
The bodyParser.json() middleware we are
using stores the posted data, parsed as an object
in the request variable
*/

// TODOS

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then(
    doc => {
      res.send(doc);
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.get('/todos', (req, res) => {
  Todo.find().then(
    todos => {
      res.send({ todos });
    },
    e => {
      res.status(400).send('test');
    }
  );
});

//:id = url param key which is stored in the params object
app.get('/todos/:id', (req, res) => {
  var id = req.params.id; //gives us the value of id
  if (!ObjectID.isValid(id)) {
    return res.status(400).send({ message: "That's not an ObjectID, silly." });
  }

  Todo.findById(id)
    .then(todo => {
      if (!todo) {
        return res.status(404).send({ message: 'No note exists with that id' });
      }
      res.status(200).send({ todo });
    })
    .catch(e => {
      res.status(400).send();
    });
});

app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) return res.status(400).send('Not a valid object id');

  Todo.findByIdAndRemove(id)
    .then(todo => {
      if (!todo) return res.status(404).send('No note found with that id');
      res.status(200).send({ todo });
    })
    .catch(err => {
      res.status(400).send('Something went wrong with your request');
    });
});

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) return res.status(400).send('Not a valid object id');

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, { $set: body }, { new: true })
    .then(todo => {
      if (!todo) {
        return res.status(400).send();
      }
      res.send({ todo });
    })
    .catch(e => {
      res.status(400).send();
    });
});

// USERS

app.post('/users', (req, res) => {
  let body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);
  user
    .save()
    .then(() => {
      return user.generateAuthToken();
    })
    .then(token => {
      res.header('x-auth', token).send(user);
    })
    .catch(error => {
      if (error.errors) {
        if (error.errors.email) {
          let errorMessage = error.errors.email.message.toString();
          res.status(400).send(errorMessage);
        } else if (error.errors.password) {
          let errorMessage = error.errors.password.message.toString();
          res.status(400).send(errorMessage);
        }
      } else {
        res.status(400).send(error);
      }
    });
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

app.get('/users', (req, res) => {
  User.find()
    .then(users => {
      res.send(users);
    })
    .catch(err => {
      console.log(err);
    });
});

app.listen(port, () => {
  console.log(`Started on port: ${port}`);
});

module.exports = { app };
