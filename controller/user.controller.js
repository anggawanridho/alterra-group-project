const db = require('../models');

exports.create = async (username, pass) => {
    const result = await db.user.create({
        id: username,
        password: pass
    });
    return result;
}
exports.update = async () =>{
    await User.update({
        set: {},
        where:{}
    })
}