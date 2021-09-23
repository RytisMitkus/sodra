// require('dotenv').config()

// const companies = require('./companiesCodes')
// const monthly2020 = require('../monthly2020')
// const monthly2018 = require('../monthly-2018')
// const monthly2019 = require('../monthly2019')
// const monthly2021 = require('../monthly2021')

// const util = require('util');
// const mysql = require('mysql2');
// const options = {
//     host: '45.93.136.135',
//     user: 'sodra_user',
//     password: 'sodra123',
//     database: 'sodra'
// }
// function setupMysqlPool(options) {
//     const pool = mysql.createPool(options);
    // Check connection to MySql
//     pool.getConnection((err, connection) => {
//         if (err) {
//             const errorMsg = 'DB pool error';
//             // logger.log(errorMsg, err);
//             console.error(errorMsg, err);
//         }
//         if (connection) {
//             connection.release();
//         }
//     });

//     pool.query = util.promisify(pool.query);

//     return pool;
// }

// const pool = setupMysqlPool(options);

// const ins = () => {

    // Object.values(companies).forEach(com => {
        // console.log(com);
        // pool.query(`UPDATE companies SET jobs = ? WHERE jarCode = ?`, [com.careers, com.jarCode])
        //         monthly2018.forEach(company => {
        //             if (company.jarCode == com.jarCode) {
        //                 const row = pool.query(`INSERT INTO 2018_monthly SET ?`, company, (err, results) => {
        //                     if (err) {
        //                         console.log(err)
        //                     }
        //                 });

        //             }
        //         })
        //         // monthly2019.forEach(company => {
        //         //     if (company.jarCode == com.jarCode) {
        //         //         const row = pool.query(`INSERT INTO 2019_monthly SET ?`, company, (err, results) => {
        //         //             if (err) {
        //         //                 console.log(err)
        //         //             }
        //         //         });

        //         //     }
        //         // })
        //         // monthly2021.forEach(company => {
        //         //     if (company.jarCode == com.jarCode) {
        //         //         const row = pool.query(`INSERT INTO 2021_monthly SET ?`, company, (err, results) => {
        //         //             if (err) {
        //         //                 console.log(err)
        //         //             }
        //         //         });

        //         //     }
        //         // })
//     })

// }

// ins()