const { ZodError } = require('zod');
const { handleError } = require('../responseHandlers');

const formatZodErrors = (error) => {
    return error.issues.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message,
        code: issue.code,
        expected: issue.expected,
        received: issue.received
    }));
};

const validateSchema = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const formattedErrors = formatZodErrors(error);
                handleError(res, 422, null, formattedErrors);
            } else {
                handleError(res, 500, null, error);
            }
        }
    };
};

module.exports = validateSchema;
