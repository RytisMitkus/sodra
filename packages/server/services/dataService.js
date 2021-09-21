const createError = require('http-errors')


module.exports = ({
    dataRepository,
}) => ({
    async getLatestData() {
        const latestData = await dataRepository.getLatestData()
        return latestData
    },
    async getOneCompanyData(jarCode) {
        const companyData = await dataRepository.getOneCompanyData(jarCode)
        return companyData
    }
})