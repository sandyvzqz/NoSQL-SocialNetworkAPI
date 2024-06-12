//import mongoose
const mongoose = require('mongoose');

// connect to mongoose database
mongoose.connect('mongodb://localhost:27017//social-network', {
    useNewURLParser: true,
    useUnifiedTopology: true
});

// handle connection events 
mongoose.connection.on('connected', ()=> {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err)=> {
    console.log('Error connecting to MongoDB', err);
});

mongoose.connection.on('disconnected', ()=> {
    console.log('Disconnected from MongoDB');
});

// close mongoose connection when user hits Control+C 
process.on('SIGINT', ()=>{
    mongoose.connection.close(()=>{
        console.log('MongoDB connection terminated by user');
        process.exit(0);
    });
});

// enable mongo query logging 
mongoose.set('debug', true);

// export the connection
module.exports = mongoose.connection; 