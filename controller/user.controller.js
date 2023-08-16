const db = require('../models');

exports.create = async (username, pass) => {
    const result = await db.user.create({
        id: username,
        password: pass
    });
    return result;
}