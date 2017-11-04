'use strict';

const User = require('../models/user.js');
const jsonParser = require('body-parser').json();
const basicHTTP = require('../lib/basic-http.js');

const authRouter = module.exports = require('express').Router();

authRouter.post('/signup', jsonParser, (req,res,next) => {
  let password = req.body.password;
  delete req.body.password;
  (new User(req.body)).generateHash(password)
    .then(user => {
      user.save()
        .then(res.send.bind.res)
        .catch(next);
    })
    .catch(next);
}); 

authRouter.get('/signin', basicHTTP, (req,res,next) => {

});