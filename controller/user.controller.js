const db = require('../models');
const bcrypt = require('bcrypt');

exports.create = async (username, pass) => {
    try {
        const result = await db.user.create({
            userId: username,
            password: pass
        });
        return result;
    } catch (error) {
        if (error.errors && error.errors[0].message === `PRIMARY must be unique`) {
            return console.log(`\n\nUSER SUDAH ADA!!\n\n`);
        }
        throw error;
    }
}

exports.auth = async (username, password) => {
    const user = await db.user.findOne ({
        where: {
            userId: username
        }
    });

    if (!user) {
        console.clear();
        return console.log(`\n\nUser not found!`);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
        console.clear();
        console.log(`\n\nAuthenticated`); // true
        return user;
    } else {
        console.clear();
        console.log(`\n\nAuthentication failed`);
        return false;
    }
}