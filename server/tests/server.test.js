const request = require('supertest');
const expect = require('expect');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
    text: 'First test todo'
}, {
    text: 'Second test todo'
}];

beforeEach((done) => {
    Todo.deleteMany({}).then(() => {
        return Todo.insertMany(todos);
    })
    .then(() => done());
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo text';

        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res) => {
            expect(res.body.text).toBe(text);
        })
        .end((err, res) => {
            if (err) {
                return done(err);
            }

            Todo.find({text}).then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e) => done(e));
        });
    });

    it('should not create a new todo with invalid body data', (done) => {
       request(app)
       .post('/todos')
       .send({})
       .expect(400)
       .end((err, res) => {
           if (err) {
               return done(err);
           }

           Todo.find().then((todos) => {
               expect(todos.length).toBe(2);
               done();
           }).catch((e) => done(e));
       });
    });
});

//DONE IS PART OF MOCHA
//END IS PART OF SUPERTEST (REQUIRE)
//Done can either be called as a method which means it was okay
//or passed as a parameter to a function that returns an error as the first arg
//user.save(done) will make done true if no error and false if err

describe('GET /todos', () => {
    it('should get all todos', (done) => { //done means that the test wont be checked until the done () function is called
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done); //done() here would make the test 
                        //pass no matter what
    });
});