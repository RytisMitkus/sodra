const util = require('util');
const mysql = require('mysql2');
const options = {
    host: process.env.PROD_DB_HOST,
    user: process.env.PROD_DB_USER,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_DATABASE
}
function setupMysqlPool(options) {
    const pool = mysql.createPool(options);

    // Check connection to MySql
    pool.getConnection((err, connection) => {
        if (err) {
            const errorMsg = 'DB pool error';
            // logger.log(errorMsg, err);
            console.error(errorMsg, err);
        }
        if (connection) {
            connection.release();
        }
    });

    pool.query = util.promisify(pool.query);

    return pool;
}

const pool = setupMysqlPool(options);

module.exports = pool;