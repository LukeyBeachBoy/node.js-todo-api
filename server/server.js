const express = require("express");
const bodyParser = require("body-parser");

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
      res.status(400).send(e);
    }
  );
});

//:id = url param key which is stored in the params object
app.get("/todos/:id", (req, res) => {
  var id = req.params.id; //gives us the value of id
  if (!ObjectID.isValid(id)) {
    return res.status(400).send();
  }

  Todo.findById(id)
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }
      res.status(200).send({ todo });
    })
    .catch(e => {
      res.status(400).send({message:"cunt"});
    });
});

app.listen(port, () => {
  console.log(`Started on port: ${port}`);
});

module.exports = { app };
