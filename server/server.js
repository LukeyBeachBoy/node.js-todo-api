const express = require("express");
const bodyParser = require("body-parser");
const _ = require('lodash');

const { ObjectID } = require("mongodb");

const { mongoose } = require("./db/mongoose");
const { Todo } = require("./models/todo");
const { User } = require("./models/user");

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
/* 
The bodyParser.json() middleware we are 
using stores the posted data, parsed as an object
in the request variable
*/
app.post("/todos", (req, res) => {
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

app.post("/users", (req, res) => {
  var user = new User({
    email: req.body.email
  });

  user.save().then(
    doc => {
      res.send(doc);
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.get("/todos", (req, res) => {
  Todo.find().then(
    todos => {
      res.send({ todos });
    },
    e => {
      res.status(400).send("test");
    }
  );
});

//:id = url param key which is stored in the params object
app.get("/todos/:id", (req, res) => {
  var id = req.params.id; //gives us the value of id
  if (!ObjectID.isValid(id)) {
    return res.status(400).send({ message: "That's not an ObjectID, silly." });
  }

  Todo.findById(id)
    .then(todo => {
      if (!todo) {
        return res.status(404).send({ message: "No note exists with that id" });
      }
      res.status(200).send({ todo });
    })
    .catch(e => {
      res.status(400).send();
    });
});

app.delete("/todos/:id", (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id))
      return res.status(400).send("Not a valid object id");

    Todo.findByIdAndRemove(id)
    .then(todo => {
      if (!todo) return res.status(404).send("No note found with that id");
      res.status(200).send({todo});
    }).catch(err => {
      res.status(400).send("Something went wrong with your request");
    });
  });

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);
  
  if (!ObjectID.isValid(id))
    return res.status(400).send('Not a valid object id');

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set : body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(400).send();
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.listen(port, () => {
  console.log(`Started on port: ${port}`);
});

module.exports = { app };
