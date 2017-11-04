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
        .then(user => res.status(200).send(user))
        .catch(next);
    })
    .catch(next);
}); 

authRouter.get('/signin', basicHTTP, (req,res,next) => {
  User.findOne({username:req.auth.username})
    .then(user => {
      console.log(user);
      if(!user) res.status(403).send('derp. user does not exist');
      user.comparePassword(req.auth.password)
        .then(res.send.bind(res))
        .catch(next);
    });
});