const dataRepository = require('../repositories/dataRepository')
const dataService = require('../services/dataService')({ dataRepository })


const latestData = async (req, res) => {
    const data = await dataService.getLatestData()
    res.json(data)
}

const oneCompanyData = async (req, res) => {
    const data = await dataService.getOneCompanyData(req.params.id)
    res.json(data)
}

module.exports = {
    latestData,
    oneCompanyData
}