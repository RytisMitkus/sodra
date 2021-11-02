const router = require('express').Router();
const dataRepository = require('../repositories/dataRepository');
const dataService = require('../services/dataService')({ dataRepository });

const dataController = require('../controllers/dataController')({ dataService })
const asyncHandler = require('express-async-handler')


/**
   * @openapi
   * /api/data/:
   *   get:
   *     summary: Get latest data from all companies
   *     description: Public route to get latest data from all companies
   *     tags: [data] 
   *     responses:
   *       "200":
   *          description: Latest companies data returned
   *       content:
   *         application/json:
   *          schema:
   *           type: array

   */
router.route('/')
    .get(asyncHandler(dataController.latestData))
/**
   * @openapi
   * /api/data/{id}:
   *   get:
   *     summary: Get all data of a single company
   *     description: Public route to get all data of a single company
   *     tags: [data] 
   *     parameters:
   *     responses:
   *       "200":
   *         description: Latest companies data returned
   *       content:
   *        application/json:
   *         schema:
   *         type: object
   *   parameters:
   *    - name: id
   *      in: path
   *      description: Company JAR code
   *      required: true
   *      schema:
   *         type: integer
   *       
   */
router.route('/:id')
    .get(asyncHandler(dataController.oneCompanyData))



module.exports = router;