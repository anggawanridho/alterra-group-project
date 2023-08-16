const db = require('./models');
const prompt = require('prompt-sync')({sigint: true});
const controller = require('./controller');
const page = require('./pages');

let isRunning = true;

(async () => {
    try {
        await db.sequelize.authenticate().then();
        console.log('Connection has been established successfully.');
        await db.sequelize.sync({ alter: true });
        } catch (error) {
            console.error('Unable to connect to the database:', error);
    };
    
    let isRunning = true;
    let penalty = 0;
    while (isRunning) {
        console.log(`\n\n\nStock List Management`);
        console.log(`Main menu`);
        console.log(`1. Login\n2. Register\n3. Exit\n`);
        let menu = prompt(`Pilihan : `)
        switch (Number(menu)) {
            case 1:
                // login
                break;
            case 2:
                //register
                let isRegister = true;
                while (isRegister) {
                    console.log(`---Register New User---`);
                    let username = prompt(`Enter username: `);
                    let password = prompt.hide(`Enter password: `);
                    if (username && password) {
                        isRegister = !isRegister
                        await controller.user.create(username, password).then('Berhasil Menambahkan User');
                    }
                }
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