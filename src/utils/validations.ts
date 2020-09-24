import Joi from 'joi'

export interface UserInput {
    firstName: string
    lastName: string
    email: string
    social: {
        facebook?: string
        twitter?: string
        github?: string
        website?: string
    }
}

const userInputValidator = Joi.object({
    firstName: Joi.string().alter({
        create: schema => schema.required(),
        update: schema => schema.optional(),
    }),
    lastName: Joi.string().alter({
        create: schema => schema.required(),
        update: schema => schema.optional(),
    }),
    email: Joi.string()
        .email()
        .alter({
            create: schema => schema.required(),
            update: schema => schema.optional(),
        }),
    social: Joi.object({
        facebook: Joi.string().optional(),
        twitter: Joi.string().optional(),
        github: Joi.string().optional(),
        website: Joi.string().optional(),
    }).optional(),
})

export const createUserValidator = userInputValidator.tailor('create')
export const updateUserValidator = userInputValidator.tailor('update')
