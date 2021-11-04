const createError = require('http-errors')

module.exports = ({
    userRepository,
}) => ({
    async isUserEmailAvailableForRegistration(email) {
        const emailExists = await userRepository.checkEmailExists(email)

        if (emailExists) {
            throw createError(409, 'Oops! Email has already been taken.')
        }

        return true
    },

    async registerUser(user) {
        return await userRepository.insertNewUser(user)
    },

    async getUserDetailsByEmail(email) {
        return await userRepository.getUserByEmail(email)
    }
})