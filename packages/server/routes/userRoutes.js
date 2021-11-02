const router = require('express').Router();
const userRepository = require('../repositories/userRepository')
const userService = require('../services/userService')({
    userRepository,
})
const userController = require('../controllers/userController')({ userService })
const { body } = require('express-validator')
const { checkValidation } = require('../utils/validations')
const asyncHandler = require('express-async-handler')



router.route('/')
    .post(
        body('user.name').trim().isLength({ min: 3 }).toLowerCase(),
        body('user.email').isEmail(),
        body('user.password').isLength({ min: 6 }),
        body('user.lastName').trim().isLength({ min: 3 }).toLowerCase(),
        checkValidation
        , asyncHandler(userController.registerUser))

router.route('/login')
    .post(
        body('user.email').isEmail(),
        body('user.password').isLength({ min: 6 }),
        checkValidation
        , asyncHandler(userController.loginUser))

router.route('/logout')
    .post(userController.logout)

router.route('/profile')
    .get(asyncHandler(userController.getUserDetails))

module.exports = router;
