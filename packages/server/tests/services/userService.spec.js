const { expect } = require('chai');
const sinon = require('sinon');

const userService = require('../../services/userService')

describe('User service', () => {
    describe('isUserEmailAvailableForRegistration', () => {
        it('should return true if email is not found', async () => {
            const email = 'test@test.test'
            const userRepository = {
                checkEmailExists: () => { return false }
            }

            const spy = sinon.spy(userRepository, 'checkEmailExists')
            const emailExists = await userService({ userRepository }).isUserEmailAvailableForRegistration(email)

            expect(emailExists).to.be.true
            sinon.assert.calledOnceWithExactly(spy, email)
        })
    })

    describe('registerUser', () => {
        it('should inesert new user into database', async () => {
            const user = {
                email: 'test',
                password: 'test',
                firstName: 'test',
                name: 'test',
                uid: 123
            }
            const userRepository = {
                insertNewUser: () => user
            }

            const spy = sinon.spy(userRepository, 'insertNewUser')

            await userService({ userRepository }).registerUser(user)

            sinon.assert.calledOnceWithExactly(spy, user)

        })
    })

    describe('getUserDetailsByEmail', () => {
        it('should return user by email', async () => {
            const email = 'test@test.test'
            const user = {
                email,
                password: 'test',
                firstName: 'test',
                name: 'test',
                uid: 123
            }
            const userRepository = {
                getUserByEmail: () => { return user }
            }

            const spy = sinon.spy(userRepository, 'getUserByEmail')

            const userByEmail = await userService({ userRepository }).getUserDetailsByEmail(email)

            expect(userByEmail).to.be.deep.equal(user)
            sinon.assert.calledOnceWithExactly(spy, email)
        })
    })
})


