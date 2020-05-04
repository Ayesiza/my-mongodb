const jwt = require("jsonwebtoken");
const db = require("../config/connect");
const User = require("../models/Users");
const dotenv = require ('dotenv');

dotenv.config();

module.exports = {
   getToken (req, res, next){
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader === 'undefined') return res.status(403).send({ status_code: 403, error: 'provide a token' });
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();

   },

   verifyUserToken(req, res, next){
    jwt.verify(req.token, process.env.SECRETE_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: 403, message: err.message });
        req.userName = user
        next();
      });
   }
}