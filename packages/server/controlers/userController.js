const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid');
const createError = require('http-errors')
const userRepository = require('../repositories/userRepository')
const userService = require('../services/userService')({
    userRepository,
})
const { validationResult } = require('express-validator')



const registerUser = async (req, res) => {
    const errors = validationResult(req)
    console.log(errors);
    const {
        email, password, lastName, name,
    } = req.body.user
    await userService.isUserEmailAvailableForRegistration(email)
    const user = {
        email,
        lastName,
        name,
        password: password ? await bcrypt.hash(password, Number(process.env.SALT_ROUNDS)) : '',
        uid: uuidv4(),
    }
    await userService.registerUser(user)
    req.session.user = user
    res.json({
        auth: true
    })
}



const loginUser = async (req, res, next) => {
    const { email } = req.body.user

    const userDetails = await userService.getUserDetailsByEmail(email)

    if (userDetails.length == 0) {
        return next(createError(401, 'Email or password incorrect.'))
    }

    const {
        password, uid,
    } = userDetails[0]

    const passwordMatch = await bcrypt.compare(req.body.user.password, password)

    if (!passwordMatch) {
        throw createError(401, 'Email or password incorrect.')
    }

    const user = {
        email,
        uid
    }

    req.session.user = user

    res.json({
        auth: true
    })
}

const logout = (req, res) => {
    req.session.destroy();
    res.clearCookie('connect.sid')
    res.json({
        success: true
    })
}

const getUserDetails = async (req, res) => {
    console.log(req.session.user);
    const { email } = req.session.user
    const user = await userService.getUserDetailsByEmail(email)
    const { name, lastName } = user[0]
    res.json({
        email, name, lastName
    })
}


module.exports = { registerUser, loginUser, logout, getUserDetails }
