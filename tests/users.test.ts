import { createServer } from '../src/server'
import Hapi from '@hapi/hapi'
import { User } from '@prisma/client'

const userPayload = {
    firstName: 'test-first-name',
    lastName: 'test-last-name',
    email: `test-${Date.now()}@prisma.io`,
    social: {
        facebook: 'test-social',
        twitter: 'test-social',
        github: 'test-social',
        website: 'test-social',
    }
}

let userId: any;

describe('users test', () => {
    let server: Hapi.Server

    beforeAll(async () => {
        server = await createServer()
    })

    afterAll(async () => {
        await server.stop()
    })

    test('create user', async () => {
        const response = await server.inject({
            method: 'POST',
            url: '/users',
            payload: userPayload
        })

        expect(response.statusCode).toEqual(201)
        const res: Partial<User> = JSON.parse(response.payload)
        expect(res.email).toEqual(userPayload.email)
        userId = res.id;
    })

    test('get user returns 404 for non existing user', async () => {
        const response = await server.inject({
            method: 'GET',
            url: '/users/9999',
        })

        expect(response.statusCode).toEqual(404)
    })

    test('get user returns user', async () => {
        const response = await server.inject({
            method: 'GET',
            url: `/users/${userId}`,
        })
        expect(response.statusCode).toEqual(200)
        const user = JSON.parse(response.payload)

        expect(user.id).toBe(userId)
    })

    test('update user fails with invalid userId parameter', async () => {
        const response = await server.inject({
            method: 'PUT',
            url: `/users/aa22`,
        })
        expect(response.statusCode).toEqual(400)
    })

    test('update user', async () => {
        const updatedFirstName = 'test-first-name-UPDATED'
        const updatedLastName = 'test-last-name-UPDATED'

        const response = await server.inject({
            method: 'PUT',
            url: `/users/${userId}`,
            payload: {
                firstName: updatedFirstName,
                lastName: updatedLastName,
            },
        })

        expect(response.statusCode).toEqual(200)
        const user = JSON.parse(response.payload)
        expect(user.firstName).toEqual(updatedFirstName)
        expect(user.lastName).toEqual(updatedLastName)
    })

    test('delete user fails with invalid userId parameter', async () => {
        const response = await server.inject({
            method: 'DELETE',
            url: `/users/aa22`,
        })
        expect(response.statusCode).toEqual(400)
    })

    test('delete user', async () => {
        const response = await server.inject({
            method: 'DELETE',
            url: `/users/${userId}`,
        })
        expect(response.statusCode).toEqual(204)
    })
})