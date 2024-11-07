const { z } = require('zod');
const baseStringSchema = require('../../common/baseStringSchema');

const createProfileSchema = z
    .object({
        firstName: baseStringSchema('firstName'),
        lastName: baseStringSchema('lastName'),
        gender: z.enum(['male', 'female']),
        city: baseStringSchema('city'),
        state: baseStringSchema('state'),
        location: baseStringSchema('location'),
        longitude: z.number(),
        latitude: z.number(),
        dob: z
            .string()
            .min(1, 'Date of birth is required')
            .refine((val) => !isNaN(Date.parse(val)), {
                message: 'Invalid date format for date of birth'
            })
    })
    .strict();

module.exports = createProfileSchema;
