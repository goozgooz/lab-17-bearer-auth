'use strict';

let jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
  try {
    if(!req.headers.authorization) throw new Error('no authorization given');
    let token = req.headers.authorization.split('Basic ')[1];
    req.token = token;
    next();
  }
  catch(e){
    next(e);
  }
};