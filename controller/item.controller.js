const db = require('../models');

exports.create = async (
    idBarang,
    namaBarang,
    kategoriBarang,
    harga,
    jumlahStok,
    tanggalMasuk,
    tanggalKadaluarsa,
    distributor,
    lokasiStok,
    deskripsiBarang) => {
        try {
            const result = await db.barang.create({
                idBarang: idBarang,
                namaBarang: namaBarang,
                kategoriBarang: kategoriBarang,
                harga: harga,
                jumlahStok: jumlahStok,
                tanggalMasuk: tanggalMasuk,
                tanggalKadaluarsa: tanggalKadaluarsa,
                distributor: distributor,
                lokasiStok: lokasiStok,
                deskripsiBarang: deskripsiBarang
            });
            return result;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

exports.showAll = async () => {
    try {
        const result = await db.barang.findAll({
            order: [
                ['tanggalMasuk', 'ASC'],
                ['jumlahStok', 'ASC']
            ]
        });
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.update = async (idBarang,
    namaBarang,
    kategoriBarang,
    harga,
    jumlahStok,
    tanggalMasuk,
    tanggalKadaluarsa,
    distributor,
    lokasiStok,
    deskripsiBarang) => {
        try {
            await db.barang.update({
                namaBarang: namaBarang,
                kategoriBarang: kategoriBarang,
                harga: harga,
                jumlahStok: jumlahStok,
                tanggalMasuk: tanggalMasuk,
                tanggalKadaluarsa: tanggalKadaluarsa,
                distributor: distributor,
                lokasiStok: lokasiStok,
                deskripsiBarang: deskripsiBarang
            }, {
                where: {
                idBarang: idBarang
                }
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
}

exports.delete = async (idBarang) => {
    try {
        await db.barang.destroy({
            where: {
              idBarang: idBarang
            }
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}