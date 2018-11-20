const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// var id = '5bf426ce894f6e265847f6cf';

// if(!ObjectID.isValid(id)) {
//     console.log("Id is not valid");
// }

// Todo.find({
//     _id : id //it will convert string to object id
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id : id
// }).then((todo) => {
//     console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('Id not found');
//     }
//     console.log('Todo By Id', todo);
// }).catch((e) => {
//     console.log(e);
// });












































var userId = '5bf2cb07a0deb61da0148ba0';

User.findById(userId).then((user) => {
    if (!user) {
        return console.log(`No user found with id: ${userId}`);
    }
    /*
    by not using an else{} and returning in the if, we stop execution early
    this is called a guard block. Return ends this method 
    */
    console.log(`User found ${JSON.stringify(user, undefined, 2)}`);
    
}, (e) => {
    console.log(e);
});