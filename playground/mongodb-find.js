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
    if (err) return console.log('Unable to connect to MongDB server'); //return makes us leave this anonymous function, which stops the success code from running
    const db = client.db('TodoApp');

    // db.collection('Todos').find({
    //     _id: new ObjectID("5bf1a166a04b3427846c5574") 
    // }).toArray().then((docs) => {
    //     console.log('Todos: ');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });

    db.collection('Users').find({name: "Luke Beach"}).toArray()
    .then((docs) => {
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch todos', err);
    });

    // client.close();
});
