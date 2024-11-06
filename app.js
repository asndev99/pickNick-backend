const express = require('express');
const rootRouter = require('./routes');
const globalErrorMiddleware = require('./middlewares/globalErrorMiddleware');
const app = express();

app.use(express.json());
app.get('/api/health-check', (req, res, next) => {
    return res.status(200).json({
        success: true,
        data: null,
        message: 'Server is running'
    });
});
app.use('/api/v1', rootRouter);
app.use(globalErrorMiddleware);

module.exports = app;
