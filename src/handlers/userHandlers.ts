import Hapi from '@hapi/hapi'
import { User, UserUpdateInput } from '@prisma/client'
import Boom from '@hapi/boom'
import { UserInput } from '../utils/validations'

export async function createUserHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    const { prisma } = request.server.app
    const { payload } = request

    const { firstName, lastName, email, social } = payload as UserInput

    try {
        const createdUser: Partial<User> = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                social: JSON.stringify(social)
            },
            select: {
                id: true,
                email: true
            }
        })
        return h.response(createdUser).code(201)
    } catch (error) {
        console.log(error)
    }
}

export async function getUserById(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    const { prisma } = request.server.app
    const userId = parseInt(request.params.userId, 10)
    try {
        const user = await prisma.user.findOne({
            where: {
                id: userId
            }
        })

        if (!user) {
            return h.response().code(404)
        }

        return h.response(user).code(200)
    } catch (error) {
        console.log(error)
        return Boom.badImplementation()
    }
}

export async function deleteUserHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    const { prisma } = request.server.app
    const userId = parseInt(request.params.userId, 10)
    try {
        await prisma.user.delete({
            where: {
                id: userId
            }
        })
        return h.response().code(204)
    } catch (error) {
        console.log(error)
        return h.response().code(500)
    }
}

export async function updateUserHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    const { prisma } = request.server.app
    const { payload } = request
    const userId = parseInt(request.params.userId, 10)

    try {
        const user = await prisma.user.update({
            where: {
                id: userId
            },
            data: payload as UserUpdateInput
        })
        return h.response(user).code(200)
    } catch (error) {
        console.log(error)
        return h.response().code(500)
    }
}