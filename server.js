const db = require('./models');
const prompt = require('prompt-sync')({sigint: true});
const controller = require('./controller');
const { userPage } = require('./pages');

(async () => {
    try {
        await db.sequelize.authenticate().then();
        console.log(`Connection has been established successfully.`);
        await db.sequelize.sync({ alter: true });
        } catch (error) {
            console.error(`Unable to connect to the database:`, error);
    };
    
    let isRunning = true;
    let penalty = 0;
    while (isRunning) {
        console.clear();
        console.log(`\n\n\nStock List Management`);
        console.log(`Main menu`);
        console.log(`1. Login\n2. Register\n3. Exit\n`);
        let menu = prompt(`Pilihan : `)
        switch (Number(menu)) {
            case 1:
                // login
                await userPage.authenticate(controller, prompt);
                break;
            case 2:
                //register
                await userPage.register(controller, prompt);
                break;
            case 3:
                //exit
                console.log(`Exit Program`);
                isRunning = !isRunning;
                db.sequelize.close();
                break;
            default:
                if (menu === ``) {
                    console.log(`Empty value inserted, you will get penalty if you input more than 3 empty value!!`);
                    penalty++
                    console.log(`penalty ${penalty} x 2sec = ${penalty*2} sec`);
                    break;
                } else {
                    console.log(`Invalid input!`);
                    break;
                }
        }
    }
})();