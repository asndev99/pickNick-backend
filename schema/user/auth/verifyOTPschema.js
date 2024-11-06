const z = require('zod');
const passwordSchema = require('./basePasswordSchema');

const verifyOTPSchema = z.object({
    otp: z
        .string()
        .length(4, 'OTP must be exactly 4 digits')
        .regex(/^\d{4}$/, 'OTP must contain only numbers'),
    email: z.string().email({ message: 'Please enter valid email address' }),
    password: passwordSchema,
    confirmPassword: passwordSchema
});

module.exports = verifyOTPSchema;
