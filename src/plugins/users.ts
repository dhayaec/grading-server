import Hapi from '@hapi/hapi'
import Joi from 'joi'
import { failAction } from '../utils/utils'
import {
    createUserHandler,
    deleteUserHandler,
    getUserById,
    updateUserHandler,
} from '../handlers/userHandlers'
import { createUserValidator, updateUserValidator } from '../utils/validations'

const usersPlugin: Hapi.Plugin<null> = {
    name: 'app/users',
    dependencies: ['prisma'],
    register: async function (server: Hapi.Server) {
        server.route({
            method: 'POST',
            path: '/users',
            handler: createUserHandler,
            options: {
                validate: {
                    payload: createUserValidator,
                    failAction
                }
            }
        })

        server.route({
            method: 'GET',
            path: '/users/{userId}',
            handler: getUserById,
            options: {
                validate: {
                    params: Joi.object({
                        userId: Joi.number().integer()
                    })
                }
            }
        })

        server.route([
            {
                method: 'DELETE',
                path: '/users/{userId}',
                handler: deleteUserHandler,
                options: {
                    validate: {
                        params: Joi.object({
                            userId: Joi.number().integer(),
                        }),
                    },
                },
            },
        ])

        server.route({
            method: 'PUT',
            path: '/users/{userId}',
            handler: updateUserHandler,
            options: {
                validate: {
                    params: Joi.object({
                        userId: Joi.number().integer(),
                    }),
                    payload: updateUserValidator,
                },
            },
        })
    },
}

export default usersPlugin