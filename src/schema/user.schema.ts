import { object, TypeOf, string, z } from 'zod';

export const createUserSchema = object({
    body: object({
        name: string({ required_error: 'Name is required' }),
        email: string({ required_error: 'Email is required'}).email('Invalid email'),
        phone: string({ required_error: 'Phone is required' }),
        password: string({ required_error: 'Password is required' })
            .min(8)
            .max(100),
        passwordConfirm: string({ required_error: 'Password confirm is required' }),
        // role: string({ required_error: 'Role is required' }),
    }).refine((data) => data.password === data.passwordConfirm, {
        path: ['passwordConfirm'],
        message: 'Passwords do not match'
    }),
})

export const loginUserSchema = object({
    body: object({
        email: string({ required_error: 'Email is required' }).email('Invalid email or password'),
        password: string({ required_error: 'Password is required' }).min(8, 'Invalid email or password'),
    })
})

export type CreateUserInput = z.infer<typeof createUserSchema>['body'];

export type LoginUserInput = z.infer<typeof loginUserSchema>['body'];