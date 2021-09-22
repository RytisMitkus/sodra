const createError = require('http-errors')


module.exports = ({
    dataRepository,
}) => ({
    async getLatestData() {
        const latestData = await dataRepository.getLatestData()
        return latestData
    },
    async getOneCompanyData(jarCode) {
        jarCode == undefined ? createError(400, 'jarCode is required') : null
        const companyData = await dataRepository.getOneCompanyData(jarCode)
        return companyData
    }
})