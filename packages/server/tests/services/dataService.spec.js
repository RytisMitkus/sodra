const { expect } = require('chai');
const sinon = require('sinon');

const dataService = require('../../services/dataService')


describe("Data service tests", () => {
    describe("getLatestData", () => {
        it("Should return latest companies data", async () => {

            const dataRepository = { getLatestData: () => [] }

            const spy = sinon.spy(dataRepository, 'getLatestData');
            const data = await dataService({ dataRepository }).getLatestData();

            expect(data).to.be.an('array');
            sinon.assert.calledOnce(spy);
        });

    })

    describe("getOneCompanyData", async () => {
        it("Should return one company data", async () => {
            const jarCode = 123456;

            const dataRepository = { getOneCompanyData: () => ([]), getCompanyName: () => ('company name') }

            sinon.spy(dataRepository, 'getOneCompanyData');
            sinon.spy(dataRepository, 'getCompanyName');
            const data = await dataService({ dataRepository }).getOneCompanyData(jarCode);

            expect(data).to.be.an('object');
            sinon.assert.calledOnceWithExactly(dataRepository.getOneCompanyData, jarCode);
            sinon.assert.calledOnceWithExactly(dataRepository.getCompanyName, jarCode);
        })
    });
})
