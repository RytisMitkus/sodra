const db = require('../config/db')

async function insertNewsArticle(news) {
    return (await db.query(`INSERT INTO news SET ?`, [news]))
}

async function getNewsArticles() {
    return (await db.query(`SELECT * FROM news`))
}

module.exports = {
    insertNewsArticle,
    getNewsArticles
}