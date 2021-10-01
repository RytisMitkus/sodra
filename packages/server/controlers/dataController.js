const asyncHandler = require('express-async-handler')
const dataRepository = require('../repositories/dataRepository')
const dataService = require('../services/dataService')({ dataRepository })
const createError = require('http-errors')

const latestData = asyncHandler(async (req, res) => {
    const data = await dataService.getLatestData()
    res.json(data)
})

const oneCompanyData = asyncHandler(async (req, res) => {
    const data = await dataService.getOneCompanyData(req.params.id)
    res.json(data)
})

module.exports = {
    latestData,
    oneCompanyData
}