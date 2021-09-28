const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid');
const asyncHandler = require('express-async-handler')
const createError = require('http-errors')
const userRepository = require('../repositories/userRepository')
const userService = require('../services/userService')({
    userRepository,
})

const registerUser = asyncHandler(async (req, res) => {
    const {
        email, password,
    } = req.body
    await userService.isUserEmailAvailableForRegistration(email)
    const user = {
        email,
        password: password ? await bcrypt.hash(password, Number(process.env.SALT_ROUNDS)) : '',
        uid: uuidv4(),
    }
    await userService.registerUser(user)
    req.session.user = user
    res.json({
        auth: true
    })
})



const loginUser = asyncHandler(async (req, res, next) => {
    const { email } = req.body
    const userDetails = await userService.getUserDetailsByEmail(email)
    if (!userDetails) {
        return next(createError(401, 'Email or password incorrect.'))
    }

    const {
        password, uid,
    } = userDetails[0]
    const passwordMatch = await bcrypt.compare(req.body.password, password)

    if (!passwordMatch) {
        throw createError(401, 'Email or password incorrect.')
    }

    const user = {
        auth: true
    }

    req.session.user = user

    res.json({
        auth: true
    })
})

const logout = asyncHandler(async (req, res) => {
    req.session.destroy();
    res.json({
        success: true
    })
})

module.exports = { registerUser, loginUser, logout }
