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
    console.log("Connected to MongoDB server");

    db.collection('Users').deleteMany({name: "Luke Beach"}).then((result) => {
        if(JSON.parse(result).n !== 0) {
            var res = JSON.parse(result);
            console.log(`Deleted todos: ${res.n}`);
        } else {
            console.log('Nothing was deleted!');
        }
    },
    (err) => {
        if(err) console.log(err);
    })
    .catch((err) => {
        console.log(err);
    });

    // db.collection('Todos').deleteOne({text: "Eat lunch"}).then((result) => { 
    //     var res = JSON.parse(result);
    //     return console.log(`Deleted todos: ${res.n}`);
    // })
    // .catch((err) => {
    //     console.log(err);
    // });

    db.collection('Users').findOneAndDelete({name: "Charlie Williams"}).then((result) => {
        if (result.value !== null){
        console.log(`Todo deleted: '${JSON.parse(result).value.text}'`);
        } else {
            console.log('Nothing was deleted!');
        }
    }, (err) => {
        console.log(err);
    })
    .catch((err) => {
        console.log(err);
    });
    // client.close();
});

