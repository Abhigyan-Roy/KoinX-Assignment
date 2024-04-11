const mongoose = require('mongoose');

//connect to the database
mongoose.connect('mongodb+srv://Abhigyan:25052002@cluster0.ekfswbx.mongodb.net/KoinX_db?retryWrites=true&w=majority');

//acquire the connection(to check if it's successful)
const db = mongoose.connection;

db.on('error', function(err) { console.log(err.message); });

db.once('open', function() {
    console.log("Successfully connected to the database");
});