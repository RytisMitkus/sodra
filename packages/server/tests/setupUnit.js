// require('chai/register-expect');
require('dotenv').config();

// const chai = require('chai');
// chai.use(require('chai-as-promised'));

global.mockError = (status, message) => {
    const error = new Error(message);
    error.status = status;
    error.message = message;
    error.response = { status, message, data: message };
    return Promise.reject(error);
};