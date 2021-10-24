const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid');
const createError = require('http-errors')
const userRepository = require('../repositories/userRepository')
const userService = require('../services/userService')({
    userRepository,
})

const registerUser = async (req, res) => {
    const {
        email, password, lastName, name,
    } = req.body.user

    await userService.isUserEmailAvailableForRegistration(email)

    const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS))

    const user = {
        email,
        lastName,
        name,
        password: hashedPassword,
        uid: uuidv4(),
    }

    await userService.registerUser(user)

    const sessionUser = {
        email,
        uid: user.uid
    }

    req.session.user = sessionUser
    res.json({
        auth: true,
        user: {
            email,
            name,
            lastName,
        }
    })
}

const loginUser = async (req, res, next) => {

    const { email } = req.body.user

    const userDetails = await userService.getUserDetailsByEmail(email)

    const {
        password, uid, name, lastName,
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
        user: {
            email,
            name,
            lastName,
        },
        auth: true
    })
}

const logout = (req, res) => {
    req.session.destroy();
    res.clearCookie('connect.sid')
    res.json({
        logout: true
    })
}

const getUserDetails = async (req, res) => {
    const { email } = req.session.user
    const user = await userService.getUserDetailsByEmail(email)
    const { name, lastName } = user[0]
    res.json({
        email, name, lastName
    })
}


module.exports = { registerUser, loginUser, logout, getUserDetails }
