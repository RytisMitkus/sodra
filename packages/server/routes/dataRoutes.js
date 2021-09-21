const router = require('express').Router();
const { latestData, oneCompanyData } = require('../controlers/dataController')
const createError = require('http-errors');
const asyncHandler = require('express-async-handler');

router.route('/')
    .get(latestData)
router.route('/:id')
    .get(oneCompanyData)






module.exports = router;