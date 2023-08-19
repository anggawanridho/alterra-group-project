const inventoryPage = require("./inventoryPage");

exports.register = async (controller, prompt) => {
    let isRegister = true;
    // while (isRegister) {
        console.clear();
        console.log(`---Register New User---`);
        let username = prompt(`Enter username: `);
        let password = prompt.hide(`Enter password: `)
        if (username && password) {
            isRegister = !isRegister
            await controller.user.create(username, password).then(console.log(`Berhasil menambahkan user!`));
        }
    // }
}

exports.authenticate = async (controller, prompt) => {
    console.clear();
    console.log(`---Login Page---`);
    let username = prompt(`Enter username: `);
    let password = prompt.hide(`Enter password: `);
    let isAuth = await controller.user.auth(username, password);
    while (isAuth) {
        console.log(`Logged as ${username}\n`);
        console.log(`Inventory Management Menu`);
        console.log(`1. Add Stock\n2. List Stock\n3. Update Stock\n4. Delete Stock\n5. Exit`);
        let invetoryMenu = prompt(`Pilihan : `);
        if (Number(invetoryMenu) === 1) {
            // add stock
            await inventoryPage.addStock(controller, prompt);
        }
        if (Number(invetoryMenu) === 2) {
            // list stock
            await inventoryPage.listStock(controller);
        }
        if (Number(invetoryMenu) === 3) {
            // update stock
            await inventoryPage.listStock(controller);
            await inventoryPage.updateStock(controller, prompt);
        }
        if (Number(invetoryMenu) === 4) {
            // delete stock
            await inventoryPage.deleteStock(controller, prompt);
        }
        if (Number(invetoryMenu) === 5) {
            // exit
            isAuth = !isAuth;
        }
        if (invetoryMenu === '') {
            console.clear();
        }
    }
}