module.exports = ({ dataService }) => {
    const controller = {}

    controller.latestData = async (req, res) => {
        const data = await dataService.getLatestData()
        res.json(data)
    }

    controller.oneCompanyData = async (req, res) => {
        const data = await dataService.getOneCompanyData(req.params.id)
        res.json(data)

    }
    return controller
}
