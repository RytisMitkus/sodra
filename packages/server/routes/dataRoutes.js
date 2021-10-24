const router = require('express').Router();
const { latestData, oneCompanyData } = require('../controlers/dataController')
const asyncHandler = require('express-async-handler')

router.route('/')
    .get(asyncHandler(latestData))

router.route('/:id')
    .get(asyncHandler(oneCompanyData))



module.exports = router;