// import required packages 
const express = require('express');
const routes = require('./routes'); 
const dataBase = require('./config/connection')

// initialize the app with express
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(routes); 


dataBase.once('open', ()=> {
    app.listen(PORT, ()=> {
        console.log(`Connected on localhost:${PORT}`);
    })
});