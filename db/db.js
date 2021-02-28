const mongoose = require('mongoose');
const db = mongoose.connection;

const connectToDb = () => {
    mongoose.connect('mongodb://localhost:27017/myApp' , { useNewUrlParser: true , useUnifiedTopology: true});
    db.once(
        'open' , 
        () => {
            console.log('Connected to the Database');
        }
    );
    db.on(
        'error',
        () => {
            console.log('Some error occured please try again some time later');
        }
    );
}

module.exports = { connectToDb };