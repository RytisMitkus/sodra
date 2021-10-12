const { validationResult } = require('express-validator');

module.exports = {
    checkValidation(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // eslint-disable-next-line no-throw-literal
            throw { status: 422, errors: { errors: errors.array() } };
        }
        next();
    }
}