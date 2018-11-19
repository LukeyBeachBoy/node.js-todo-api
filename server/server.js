const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser : true});

var User = mongoose.model('User', {
    email: {
        type : String,
        required : true,
        trim : true,
        minLength : 1
    }
});

var Todo = mongoose.model('Todo', {
    text : {
        type : String,
        required: true,
        minLength: 1,
        trim: true
    },
    completed : {
        type : Boolean,
        default: false
    },
    completedAt: {
        type : Number,
        default : null
    }
});

var todo1 = new Todo({
    text: 'Something to do',
});

todo1.save().then((doc) => {
    console.log(`Saved todo: ${JSON.stringify(doc, undefined, 2)}`);
}, (e) => {
    console.log('Unable to save todo', e);
});

var user = new User({
    email : 'Lukeybeach@gmail.com'
});

user.save()
.then((doc) => {
    console.log('User saved', doc); 
}, (e) => {
    console.log('Unable to save user', e);
});
