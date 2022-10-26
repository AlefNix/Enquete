const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose
.connect('mongodb+srv://aleffrade:asdf1234@cluster0.jar5wun.mongodb.net/?retryWrites=true&w=majority' )
.then(()=> console.log('sucesso'))
.catch(err => console.log(err));
