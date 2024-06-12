// import required packages 
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes'); 

// initialize the app with express
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));
app.use(routes); 

// connect to mongoose database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017//social-network', {
    useFindAndModify: false,
    useNewURLParser: true,
    useUnifiedTopology: true
});
// enable mongo query logging 
mongoose.set('debug', true);

app.listen(PORT, ()=> console.log(`Connected on localhost:${PORT}`));