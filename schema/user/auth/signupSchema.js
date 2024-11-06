const z = require('zod');
const passwordSchema = require('./basePasswordSchema');

const signupSchema = z
    .object({
        email: z.string().email({ message: 'Please enter valid email address' }),
        password: passwordSchema,
        confirmPassword: passwordSchema
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords must match',
        path: ['confirmPassword']
    });

module.exports = signupSchema;
