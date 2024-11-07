const { z } = require('zod');

const resendOTPSchema = z
    .object({
        email: z.string().email()
    })
    .strict();

module.exports = resendOTPSchema;
