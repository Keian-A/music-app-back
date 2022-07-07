'use strict';

// Third party imports
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const PORT = process.env.PORT;

// Esoteric imports
const Users = require('./src/schema/Users.js');

// Application configuration
app.use(express.json());
app.use(cors());

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

// Database connection confirmation
db.once('open', () => {
    console.log('Database connected!');
});

// Proof of life
app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.post('/signup', async (req, res) => {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    let result = await Users.create(req.body);
    res.json(result);
});

app.post('/signin', async (req, res) => {
    let userFound = await Users.findOne({ "username": req.body.username });
    if (userFound) {
        let flag = await bcrypt.compare(req.body.password, userFound.password);
        if (flag) {
            // Need to create tokens and send one back here
            res.send('YEP');
        } else {
            res.status(404).send('Incorrect credentials provided.');
        }
    } else {
        res.status(404).send('Incorrect credentials provided.');
    }
});

// Server turner oner
app.listen(PORT, () => {
    console.log(`SERVER UP ON PORT ::: ${PORT}`);
});
