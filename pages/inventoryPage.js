exports.addStock = async (controller, prompt) => {
    console.clear();
    console.log(`Hanya ID Barang dan Nama Barang yang wajib diisi`);
    let idBarang = prompt(`Enter ID Barang: `);
    let namaBarang = prompt(`Enter Nama Barang: `);

    
    // melanjutkan program hanya bila idBarang dan namaBarang tidak kosong
    if (idBarang && namaBarang) {
        // prompt untuk data opsional
        let kategoriBarang = prompt(`Enter Kategori Barang: `);
        let harga = prompt(`Enter Harga Barang: `);
        let jumlahStok = prompt(`Enter Jumlah Stok: `);
        let tanggalMasuk = prompt(`Enter Tanggal Masuk (yyyy-mm-dd): `);
        let tanggalKadaluarsa = prompt(`Enter Tanggal Kadaluarsa (yyyy-mm-dd): `);
        let distributor = prompt(`Enter Distributor: `);
        let lokasiStok = prompt(`Enter Lokasi Stok: `);
        let deskripsiBarang = prompt(`Enter Deskripsi: `);

        // membuat objek untuk parameter yang memiliki nilai
        const createdData = {
            idBarang,
            namaBarang
        };

        // menambahkan parameter lainnya jika terdapat nilai
        if (kategoriBarang) {
            createdData.kategoriBarang = kategoriBarang;
        }
        if (harga) {
            createdData.harga = harga;
        }
        if (jumlahStok) {
            createdData.jumlahStok = jumlahStok;
        }
        if (tanggalMasuk) {
            createdData.tanggalMasuk = tanggalMasuk;
        }
        if (tanggalKadaluarsa) {
            createdData.tanggalKadaluarsa = tanggalKadaluarsa;
        }
        if (distributor) {
            createdData.distributor = distributor;
        }
        if (lokasiStok) {
            createdData.lokasiStok = lokasiStok;
        }
        if (deskripsiBarang) {
            createdData.deskripsiBarang = deskripsiBarang;
        }
        await controller.item.create(
            createdData.idBarang,
            createdData.namaBarang,
            createdData.kategoriBarang,
            createdData.harga,
            createdData.jumlahStok,
            createdData.tanggalMasuk,
            createdData.tanggalKadaluarsa,
            createdData.distributor,
            createdData.lokasiStok,
            createdData.deskripsiBarang
        );
    } else {
        console.clear();
        console.log(`ID Barang dan Nama Barang Tidak Boleh Kosong!!`);
    }
}

exports.listStock = async (controller) => {
    console.clear();
    let listBarang = await controller.item.showAll();
    console.log(`\n`);
    console.log(`|  No.  |   ID Barang   |       Nama Barang        |  Kategori  |     Harga    | Jumlah Stok |    Masuk   |   Kadaluarsa  |  Distributor | Lokasi Stok |         Deskripsi         |`);
    console.log(`-`.repeat(179)); // baris pembatas

    listBarang.forEach((barang, index) => {
        const formattedIndex = index + 1;
        const { idBarang, namaBarang, kategoriBarang, harga, jumlahStok, tanggalMasuk, tanggalKadaluarsa, distributor, lokasiStok, deskripsiBarang } = barang.dataValues;
        
        console.log(`|  ${formattedIndex.toString().padEnd(4)} | ${idBarang.padEnd(13)} | ${namaBarang.padEnd(24)} | ${kategoriBarang.padEnd(10)} | ${harga.toString().padEnd(12)} | ${jumlahStok.toString().padEnd(11)} | ${tanggalMasuk.toString().padEnd(9)} | ${tanggalKadaluarsa.toString().padEnd(13)} | ${distributor.padEnd(12)} | ${lokasiStok.padEnd(11)} | ${deskripsiBarang.padEnd(20)} |`);
    });
    
    console.log(`\n`);
}

exports.updateStock = async (controller, prompt) => {
    console.log(`\n\nHanya ID Barang, Nama Barang yang wajib diisi`);   
    
    let idBarang = prompt(`Enter ID Barang Yang Akan diubah: `);
    let namaBarang = prompt(`Enter Nama Barang: `);

    
    // melanjutkan program hanya bila idBarang dan namaBarang tidak kosong
    if (idBarang && namaBarang) {
        // prompt untuk data opsional
        let kategoriBarang = prompt(`Enter Kategori Barang: `);
        let harga = prompt(`Enter Harga Barang: `);
        let jumlahStok = prompt(`Enter Jumlah Stok: `);
        let tanggalMasuk = prompt(`Enter Tanggal Masuk (yyyy-mm-dd): `);
        let tanggalKadaluarsa = prompt(`Enter Tanggal Kadaluarsa (yyyy-mm-dd): `);
        let distributor = prompt(`Enter Distributor: `);
        let lokasiStok = prompt(`Enter Lokasi Stok: `);
        let deskripsiBarang = prompt(`Enter Deskripsi: `);

        // membuat objek untuk parameter yang memiliki nilai
        const updatedData = {
            idBarang,
            namaBarang
        };

        // menambahkan parameter lainnya jika terdapat nilai
        if (kategoriBarang) {
            updatedData.kategoriBarang = kategoriBarang;
        }
        if (harga) {
            updatedData.harga = harga;
        }
        if (jumlahStok) {
            updatedData.jumlahStok = jumlahStok;
        }
        if (tanggalMasuk) {
            updatedData.tanggalMasuk = tanggalMasuk;
        }
        if (tanggalKadaluarsa) {
            updatedData.tanggalKadaluarsa = tanggalKadaluarsa;
        }
        if (distributor) {
            updatedData.distributor = distributor;
        }
        if (lokasiStok) {
            updatedData.lokasiStok = lokasiStok;
        }
        if (deskripsiBarang) {
            updatedData.deskripsiBarang = deskripsiBarang;
        }
        await controller.item.update(
            updatedData.idBarang,
            updatedData.namaBarang,
            updatedData.kategoriBarang,
            updatedData.harga,
            updatedData.jumlahStok,
            updatedData.tanggalMasuk,
            updatedData.tanggalKadaluarsa,
            updatedData.distributor,
            updatedData.lokasiStok,
            updatedData.deskripsiBarang
        );
    } else {
        console.log(`ID Barang dan Nama Barang Tidak Boleh Kosong!!`);
    }
}

exports.deleteStock = async (controller, prompt) => {
    let idBarang = prompt(`Masukkan id barang yang akan dihapus `);
    if (idBarang) {
        await controller.item.delete(idBarang).then(console.log(`berhasil dihapus`));
    } else {
        console.log('TIDAK ADA YANG TERHAPUS!');
    }
}