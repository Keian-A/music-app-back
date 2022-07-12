'use strict';

const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    token: { type: String, required: true }
});

const userModel = model('Users', userSchema);

module.exports = userModel;
