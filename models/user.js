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

userSchema.methods.comparePassword = function(password) {
  console.log('comparing');
  return bcrypt.compare(password,this.password)
    .then(res => {
      if(res) {
        console.log('correct password');
        return this;
      }
      console.log('wrong password');
      throw new Error('incorrect password');
    });
};

// userSchema.methods.generateToken = function() {
  
// };

// preSave generate hash, generate token 

module.exports = mongoose.model('User', userSchema);


