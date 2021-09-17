const asyncHandler = require('express-async-handler')
const dataRepository = require('../repositories/dataRepository')
const dataService = require('../services/dataService')({ dataRepository })


const latestData = asyncHandler(async (req, res) => {
    const data = await dataService.getLatestData()
    res.json(data)
})

module.exports = {
    latestData
}