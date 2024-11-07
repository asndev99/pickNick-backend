const { z } = require('zod');
const passwordSchema = require('../../common/basePasswordSchema');

const signupSchema = z
    .object({
        email: z.string().email({ message: 'Please enter valid email address' }),
        password: passwordSchema,
        confirmPassword: passwordSchema
    })
    .strict()
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords must match',
        path: ['confirmPassword']
    });

module.exports = signupSchema;
