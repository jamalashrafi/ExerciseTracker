//import { Mongoose } from "mongoose";

const express = require('express');
const cors = require('cors');//used to cnosume rest api from outside server
const mongoose = require('mongoose');//Returns singleton object of mongoose
const path = require('path');

require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri || 'mongodb://localhost/mern_exercisetracker', { useNewUrlParser: true, userCreateIndex: true,  useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', ()=> {
    console.log("Mongodb connection established successfully");
});

const exercisesRouter = require('./routers/exercise');
const usersRouter = require('./routers/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"));

    // Express serve up index.html file if it doesn't recognize route
  
    app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
});