const {ObjectID} = require('mongodb');

const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');

// Todo.remove({}).then((result) => {
//     console.log(result);
    
// });

Todo.findByIdAndRemove({_id: '5bf5cd67b472542220e34b00'}).then((todo) => {
    console.log(`Removed: ${todo}`);
});

Todo.findOneAndRemove('5bf5cd67b472542220e34b00').then((tood) => {
    
});