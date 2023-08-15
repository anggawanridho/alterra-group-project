const db = require('./models');
const prompt = require('prompt-sync')({sigint: true});
const controller = require('./controller');

let isRunning = true;

(async () => {
    try {
        await db.sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await db.sequelize.sync({ alter: true });
        } catch (error) {
            console.error('Unable to connect to the database:', error);
    };
    // db.sequelize.close();
})();