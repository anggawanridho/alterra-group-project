module.exports = (sequelize, DataTypes) => {
    const Barang = sequelize.define('item',
    {
        idBarang: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
        namaBarang: { type: DataTypes.STRING, allowNull: false },
        kategoriBarang: { type: DataTypes.STRING, defaultValue: 'Belum diisi' },
        harga: { type: DataTypes.DECIMAL(10, 2), defaultValue: 1000 },
        jumlahStok: { type: DataTypes.INTEGER, defaultValue: 0 },
        tanggalMasuk: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
        tanggalKadaluarsa: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
        distributor: { type: DataTypes.STRING, defaultValue: 'Belum diisi' },
        lokasiStok: { type: DataTypes.STRING, defaultValue: 'Belum diisi' },
        deskripsiBarang: { type: DataTypes.TEXT, defaultValue: 'Deskripsi default' },
        createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    },
    {
        timestamps: false
    });
    return Barang;
}