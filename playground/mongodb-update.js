//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); //this is also destructuring. GOOD
var url = 'mongodb://localhost:27017/TodoApp';

MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
    if (err) return console.log('Unable to connect to MongDB server'); //return makes us leave this anonymous function, which stops the success code from running
    const db = client.db('TodoApp');
    console.log("Connected to MongoDB server");

    // db.collection('Todos').findOneAndUpdate({
    //     _id : new ObjectID("5bf1a9e5e50e38034abf2a16")
    // }, {
    //     $set : {
    //         completed : true
    //     }
    // }, {returnOriginal : false}
    // ).then((result) => {
    //     console.log(result);
    // });

    //update from Users db where name = "Will Amor", name - luke age ++
    db.collection('Users').findOneAndUpdate({
        name: "Will Amor"
    }, {
        $set : {name : "Luke Beach"},
        $inc : {age : 10}
    }, {returnOriginal : false}
    ).then((result) => {
        if(result.value)
        console.log(result.value.name);
    }, (err) => {
        console.log(err);
    }).catch((err) => {
        console.log(err);
    });
    
    // client.close();
});
