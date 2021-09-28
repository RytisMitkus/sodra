const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const db = require('../mysql/db')

const mysqlstore = new MySQLStore({}, db);

const mysqlSession = session({
    store: mysqlstore,
    secret: process.env.SESSION_SECRET || 'secret',
    saveUninitialized: false,
    resave: false,
    rolling: true,
    unset: 'destroy',
    cookie: {
        httpOnly: true,
        secure: 'auto',
        maxAge: 1000 * 60 * 60 * 24 * 10,
    },
});

module.exports = mysqlSession;