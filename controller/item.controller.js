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
    const result = await db.barang.findAll({
        order: [
            ['tanggalMasuk', 'ASC'],
            ['jumlahStok', 'ASC']
        ]
    });
    return result;
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
}

exports.delete = async (idBarang) => {
    await db.barang.destroy({
        where: {
          idBarang: idBarang
        }
    });
}