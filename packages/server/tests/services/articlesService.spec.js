const { expect } = require('chai');
const sinon = require('sinon');

const articlesService = require('../../services/articlesService')


describe("Article service tests", () => {
    describe("Insert new article", () => {
        it("Inserts new article", async () => {
            const articleResponse = { insertId: 1 };
            const newsArticle = {
                title: "Test title",
                description: "Test description",
                url: "Test url",
                urlToImage: "Test urlToImage",
                publishedAt: "Test publishedAt",
                content: "Test content",
            }

            const articlesRepository = { insertNewsArticle: () => articleResponse }

            const spy = sinon.spy(articlesRepository, 'insertNewsArticle');
            const article = await articlesService({ articlesRepository }).insertNewArticle(newsArticle);

            expect(article).to.be.an('number');
            sinon.assert.calledOnce(spy);
        });

    })

    describe("uploadImage", async () => {
        it("uploads image to google storage", async () => {
            const file = {
                fieldname: 'file',
                originalname: 'Nina hrana-6.jpeg',
                encoding: '7bit',
                mimetype: 'image/jpeg',
                buffer: "ff d8 ff e0 00 10 4a 46 49 46 00 01 01 00 00 48 00 48 00 00 ff e1 03 60 45 78 69 66 00 00 4d 4d 00 2a 00 00 00 08 00 0a 01 06 00 03 00 00 00 01 00 02",
                size: 52904
            }
            const imageUrl = "https://storage.googleapis.com/hrana-images/Nina hrana-6.jpeg"

            const storageRepository = { uploadFileToGoogleCloudStorage: () => imageUrl }

            const spy = sinon.spy(storageRepository, 'uploadFileToGoogleCloudStorage');
            const image = await articlesService({ storageRepository }).uploadImage(file);

            expect(image).to.be.an('string');
            sinon.assert.calledOnceWithExactly(spy, file);
        })
    });
    describe("getNewsArticles", () => {
        it("gets news articles", async () => {
            const articles = []

            const articlesRepository = { getNewsArticles: () => articles }

            const spy = sinon.spy(articlesRepository, 'getNewsArticles');
            const article = await articlesService({ articlesRepository }).getNewsArticles();

            expect(article).to.be.an('array');
            sinon.assert.calledOnce(spy);
        });
    })
    describe("getArticleBySlug", () => {
        it("gets article by slug", async () => {
            const article = {
                title: "Test title",
                description: "Test description",
                url: "Test url",
                urlToImage: "Test urlToImage",
                publishedAt: "Test publishedAt",
                content: "Test content",
            }

            const articlesRepository = { getArticleBySlug: () => article }

            const spy = sinon.spy(articlesRepository, 'getArticleBySlug');
            const articleResponse = await articlesService({ articlesRepository }).getArticleBySlug("test-slug");

            expect(articleResponse).to.be.an('object');
            sinon.assert.calledOnce(spy);
        });
    })

    describe("checkSlug", () => {
        it("checks if slug is taken", async () => {
            const article = {
                title: "Test title",
                description: "Test description",
                url: "Test url",
                urlToImage: "Test urlToImage",
                publishedAt: "Test publishedAt",
                content: "Test content",
            }

            const articlesRepository = { checkIfSlugIsTaken: () => article }

            const spy = sinon.spy(articlesRepository, 'checkIfSlugIsTaken');

            const articleResponse = await articlesService({ articlesRepository }).checkSlug("test-slug");

            expect(articleResponse).to.be.an('object');
            sinon.assert.calledOnce(spy);
        })
    })
})
