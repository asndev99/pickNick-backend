const z = require('zod');

const z = require('zod');

const passwordSchema = z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .refine((value) => /[0-9]/.test(value), { message: 'Password must contain at least one number' })
    .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), { message: 'Password must contain at least one special character' });

const signupSchema = z
    .object({
        firstName: z.string().min(1, 'First name is required'),
        lastName: z.string().min(1, 'Last name is required'),
        gender: z.enum(['male', 'female']),
        city: z.string().min(1, 'City is required'),
        state: z.string().min(1, 'State is required'),
        dob: z
            .string()
            .min(1, 'Date of birth is required')
            .refine((val) => !isNaN(Date.parse(val)), {
                message: 'Invalid date format for date of birth'
            }),
        password: passwordSchema,
        confirmPassword: z.string().min(1, 'Confirm Password is required')
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords must match',
        path: ['confirmPassword']
    });

module.exports = signupSchema;
