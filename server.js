const app = require('./app');
const { PORT } = require('./config/config');
const connectDB = require('./config/db.config');

(async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running at PORT ${PORT}`);
        });
    } catch (error) {
        console.error('Error in connection with MongoDB', error);
        process.exit(1);
    }
})();
