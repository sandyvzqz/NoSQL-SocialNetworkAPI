// import required packages 
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes'); 

// initialize the app with express
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));
app.use(routes); 

app.listen(PORT, ()=> console.log(`Connected on localhost:${PORT}`));