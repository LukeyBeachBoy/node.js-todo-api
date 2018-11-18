//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); //this is also destructuring. GOOD

// var obj = new ObjectID(); //this lets you generate your own unique id
// console.log(obj);

// DESTRUCTURING EXAMPLE, TAKE A PROPERTY OF AN OBJECT AND MAKE IT A 
// STANDALONE VAR
// var user = {name:'andrew', age: 25};
// var {name} = user;

// console.log(name);

var url = 'mongodb://localhost:27017/TodoApp';

MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
    if (err){
        return console.log('Unable to connect to MongDB server'); //return makes us leave this anonymous function, which stops the success code from running
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert todo', err);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });
    // db.collection('Users').insertOne({
    //     name: "Luke Beach",
    //     age: 21,
    //     location: "Canterbury, CT2 7TU"
    // }, (err, result) => {
    //     if (err) return console.log("Unable to insert new users", err);

    //     console.log(result.ops[0]._id.getTimestamp());
    // });
    client.close();
});