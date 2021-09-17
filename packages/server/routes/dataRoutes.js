const router = require('express').Router();
const { latestData } = require('../controlers/dataController')
const createError = require('http-errors');

router.route('/')
    .get(latestData)



module.exports = router;