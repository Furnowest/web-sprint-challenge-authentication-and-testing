require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require("express-session")
const { restrict }= require("../auth/authenticate-middleware")
// const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');


const server = express();



server.use(helmet());
server.use(cors());
server.use(express.json());
// server.use(session({
// 	resave: false, 
// 	saveUninitialized: false,
//     secret:"ovy its a secret",
// }))

server.use('/api/auth', authRouter);
server.use('/api/jokes', restrict, jokesRouter);

server.use((err,req,res,next)=>{
    console.log(err)
    res.status(500).json({
        message: "something went wrong"
    })
})

module.exports = server;
