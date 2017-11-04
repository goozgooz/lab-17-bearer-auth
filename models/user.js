'use strict';

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bluebird').promisifyAll(require('bcrypt'));

const userSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
}); 

userSchema.methods.generateHash = function(password) {
  return bcrypt.hash(password, 10)
    .then(hash => {
      this.password = hash;
      return this;
    });
};

userSchema.methods.generateToken = function() {
  
};

module.exports = mongoose.model('User', userSchema);


