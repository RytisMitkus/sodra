const router = require('express').Router();
const { latestData, oneCompanyData } = require('../controlers/dataController')

router.route('/')
    .get(latestData)

router.route('/:id')
    .get(oneCompanyData)



module.exports = router;