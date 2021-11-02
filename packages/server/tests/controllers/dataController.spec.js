const { expect } = require('chai');
const sinon = require('sinon');

const dataController = require('../../controllers/dataController');


describe('dataController', () => {
    describe('latestData', () => {
        it('should return latest compenies data', async () => {
            const req = {

            };
            const res = {
                json: sinon.spy(),
            };

            const data = {
                data: [
                    {
                        id: 1,
                        name: 'test',
                        description: 'test',
                        createdAt: '2019-01-01',
                        updatedAt: '2019-01-01',
                    },
                ],
                count: 1,
            };
            const dataService = {
                getLatestData: sinon.stub().returns(data),
            };

            await dataController({ dataService }).latestData(req, res);

            sinon.assert.calledOnce(dataService.getLatestData);

        });
    });
});

