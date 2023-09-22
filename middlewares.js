const express = require('express');
const middlewares = express.Router();
const db = require('./db.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

middlewares.use(express.json());

middlewares.checkToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) {
        res.status(401).json({message: 'Token não informado'});
    } else {
        jwt.verify(token, process.env.SECRET_KEY,
        (err, decoded) => {
            if(err) {
                res.status(401).json({message: 'Token inválido'});
            } else {
                req.userId = decoded.id;
                req.roles = decoded.roles;
                next();
            }
        });
    }
}

middlewares.isAdmin = (req, res, next) => {
    if (!req.roles.includes('ADMIN'))
      res.status(403).json({message: 'Permissão negada'});
    else
      next();
}

module.exports = middlewares;