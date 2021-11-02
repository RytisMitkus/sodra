const { expect } = require('chai');
const sinon = require('sinon');

const postsService = require('../../services/postsService')


describe("Posts service tests", () => {
    describe("insertNewPost", () => {
        it("inserst new post and returns success indicator", async () => {
            const post = {
                "content": "newp1o34st",
                "parentId": 44,
                "jarCode": 304368853
            }

            const postsRepository = { insertNewPost: () => { return { success: true } } };

            const spy = sinon.spy(postsRepository, "insertNewPost");
            const data = await postsService({ postsRepository }).insertNewPost(post);

            expect(data).to.be.an('object');
            sinon.assert.calledOnce(spy);
        });

    })

    describe("getCompanyPostsByJarCode", async () => {
        it("returns exactly one company posts", async () => {
            const jarCode = 123456;

            const postsRepository = { getPostsByJarCode: () => ([]) }

            const spy = sinon.spy(postsRepository, "getPostsByJarCode");

            const data = await postsService({ postsRepository }).getCompanyPostsByJarCode(jarCode);

            expect(data).to.be.an('array');
            sinon.assert.calledOnce(spy);
        })
    });
})
