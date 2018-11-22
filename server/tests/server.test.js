const request = require("supertest");
const expect = require("expect");
const { ObjectID } = require("mongodb");
const Type = require("type-of-is");

const { app } = require("./../server");
const { Todo } = require("./../models/todo");

const todos = [
  {
    _id: new ObjectID(),
    text: "First test todo"
  },
  {
    _id: new ObjectID(),
    text: "Second test todo",
    completed: true,
    completedAt: 333
  }
];

beforeEach(done => {
  Todo.deleteMany({})
    .then(() => {
      return Todo.insertMany(todos);
    })
    .then(() => done());
});

describe("POST /todos", () => {
  it("should create a new todo", done => {
    var text = "Test todo text";

    request(app)
      .post("/todos")
      .send({ text })
      .expect(200)
      .expect(res => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({ text })
          .then(todos => {
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
          })
          .catch(e => done(e));
      });
  });

  it("should not create a new todo with invalid body data", done => {
    request(app)
      .post("/todos")
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find()
          .then(todos => {
            expect(todos.length).toBe(2);
            done();
          })
          .catch(e => done(e));
      });
  });
});

//DONE IS PART OF MOCHA
//END IS PART OF SUPERTEST (REQUIRE)
//Done can either be called as a method which means it was okay
//or passed as a parameter to a function that returns an error as the first arg
//user.save(done) will make done true if no error and false if err

describe("GET /todos", () => {
  it("should get all todos", done => {
    //done means that the test wont be checked until the done () function is called
    request(app)
      .get("/todos")
      .expect(200)
      .expect(res => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done); //done() here would make the test
    //pass no matter what
  });
});

describe("GET /todos:id", () => {
  it("should return todo doc", done => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });
  it("should return 404 if todo not found", done => {
    request(app)
      .get(`/todos/${new ObjectID()}`)
      .expect(404)
      .expect(res => {
        expect(res.body.todo).toBeUndefined();
      })
      .end(done);
  });
  it("should return 400 for non-object ids", done => {
    request(app)
      .get("/todos/123")
      .expect(400)
      .expect(res => {
        expect(res.body.todo).toBeUndefined();
      })
      .end(done);
  });
});

describe("DELETE /todos/:id", () => {
  it("should remove a todo", done => {
    let id = todos[0]._id.toHexString();

    request(app)
      .delete(`/todos/${id}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo._id).toBe(id);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(id)
          .then(todo => {
            expect(todo).toBeNull();
            done();
          })
          .catch(e => done(e));
      });
  });
  it("should return 404 if todo not found", done => {
    request(app)
      .delete(`/todos/${new ObjectID()}`)
      .expect(404)
      .expect(res => {
        expect(res.body.todo).toBeUndefined();
      })
      .end(done);
  });
  it("should return 400 if ObjectID is invalid", done => {
    request(app)
      .delete("/todos/123")
      .expect(400)
      .expect(res => {
        expect(res.body.todo).toBeUndefined();
      })
      .end(done);
  });
});

describe("PATCH /todos/:id", () => {
  it("should update the todo", done => {
    let id = todos[0]._id.toHexString();
    request(app)
      .patch(`/todos/${id}`)
      .send({ text: "This is the new text", completed: true })
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe("This is the new text");
        expect(res.body.todo.completed).toBeTruthy();
        expect(Type(res.body.todo.completedAt, Number)).toBeTruthy();
      })
      .end(e => done(e));
  });
  it("should clear completedAt when todo is not completed", done => {
    let id = todos[1]._id.toHexString();
    request(app)
    .patch(`/todos/${id}`)
    .send({ text: "This is some new text", completed : false})
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe('This is some new text');
      expect(res.body.todo.completed).toBe(false);
      expect(Type(res.body.todo.completedAt, Number)).toBe(false);
    }).end(done);
  });
});
