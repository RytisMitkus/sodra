const createError = require('http-errors')


module.exports = ({
    dataRepository,
}) => ({
    async getLatestData() {
        let latestData = await dataRepository.getLatestData()
        latestData.map(data => {
            data.taxes = Number(data.taxes)
            return data
        })
        return latestData
    },
    async getOneCompanyData(jarCode) {
        jarCode == undefined ? createError(400, 'jarCode is required') : null
        const companyData = await dataRepository.getOneCompanyData(jarCode)
        const companyName = await dataRepository.getCompanyName(jarCode)
        const data = { companyData, companyName }
        return data
    }
})