'use strict';

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const logger = require('morgan');
const SuperLogin = require('superlogin');
const port = process.env.PORT || 3000;

const config = {
  dbServer: {
    protocol: 'http://',
    host: 'localhost:5984',
    user: '',
    password: '',
    userDB: 'sl-users',
    couchAuthDB: '_users'
  },
  mailer: {
    fromEmail: 'gmail.user@gmail.com',
    options: {
      service: 'Gmail',
        auth: {
          user: 'gmail.user@gmail.com',
          pass: 'userpass'
        }
    }
  },
  userDBs: {
    defaultDBs: {
      private: ['supertest']
    }
  }
}

const superlogin = new SuperLogin(config);

let app = express();
app.set('port', port);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/auth', superlogin.router);

http.createServer(app).listen(app.get('port'));
console.log(`Superlogin running on port:${port}`)
