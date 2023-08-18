const controller = require('.');
const db = require('../models');

exports.delete = async (id) => {
    const result = await db.barang.destroy({
        where: {
           idbarang: id
        }
    });
    return result;
}