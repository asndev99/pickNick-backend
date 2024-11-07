const { z } = require('zod');
const baseStringSchema = require('../../common/baseStringSchema');

const loginSchema = z.object({
    email: z.string().email(),
    password: baseStringSchema('password')
});

module.exports = loginSchema;
