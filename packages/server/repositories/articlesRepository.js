const db = require('../config/db')

async function insertNewsArticle(news) {
    return (await db.query(`INSERT INTO news SET ?`, [news]))
}

async function getNewsArticles() {
    return (await db.query(`SELECT * FROM news`))
}
async function getArticleBySlug(slug) {
    return (await db.query(`SELECT * FROM news WHERE slug = ?`, [slug]))
}
async function checkIfSlugIsTaken(slug) {
    return (await db.query(`SELECT slug FROM news WHERE slug = ?`, [slug]))
}

module.exports = {
    insertNewsArticle,
    getNewsArticles,
    getArticleBySlug,
    checkIfSlugIsTaken
}