const db = require('./models');
const prompt = require('prompt-sync')({sigint: true});
const controller = require('./controller');

(async () => {
    try {
        await db.sequelize.authenticate().then();
        console.log(`Connection has been established successfully.`);
        await db.sequelize.sync({ alter: true });
        } catch (error) {
            console.error(`Unable to connect to the database:`, error);
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
                console.log(`\n\n---Login Page---`);
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
                            console.log(`ID Barang dan Nama Barang Tidak Boleh Kosong!!`);
                        }
                    }
                    if (Number(invetoryMenu) === 2) {
                        // list stock
                        let listBarang = await controller.item.showAll();
                        console.log(`\n`);
                        console.log(`|  No.  |   ID Barang   |       Nama Barang       |  Kategori  |     Harga    | Jumlah Stok |    Masuk   |   Kadaluarsa  |  Distributor | Lokasi Stok |         Deskripsi         |`);
                        console.log(`-`.repeat(179)); // baris pembatas

                        listBarang.forEach((barang, index) => {
                            const formattedIndex = index + 1;
                            const { idBarang, namaBarang, kategoriBarang, harga, jumlahStok, tanggalMasuk, tanggalKadaluarsa, distributor, lokasiStok, deskripsiBarang } = barang.dataValues;
                            
                            console.log(`|  ${formattedIndex.toString().padEnd(4)} | ${idBarang.padEnd(13)} | ${namaBarang.padEnd(24)} | ${kategoriBarang.padEnd(10)} | ${harga.toString().padEnd(12)} | ${jumlahStok.toString().padEnd(11)} | ${tanggalMasuk.toString().padEnd(9)} | ${tanggalKadaluarsa.toString().padEnd(13)} | ${distributor.padEnd(12)} | ${lokasiStok.padEnd(11)} | ${deskripsiBarang.padEnd(20)} |`);
                        });
                        
                        console.log(`\n`);
                    }
                    if (Number(invetoryMenu) === 3) {
                        // update stock
                        console.clear();
                        console.log(`\n\nHanya ID Barang, Nama Barang, Tanggal Masuk, dan Tanggal Kadaluarsa yang wajib diisi`);
                        
                        
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
                            await controller.item.update(updatedData);
                        } else {
                            console.log(`ID Barang dan Nama Barang Tidak Boleh Kosong!!`);
                        }
                    }
                    if (Number(invetoryMenu) === 4) {
                        // delete stock
                        let idBarang = prompt(`Masukkan id barang yang akan dihapus `);
                        if (idBarang) {
                            await controller.item.delete(idBarang).then(console.log(`berhasil dihapus`));
                        }
                    }
                    if (Number(invetoryMenu) === 5) {
                        // exit
                        isAuth = !isAuth;
                    }
                }
                break;
            case 2:
                //register
                let isRegister = true;
                while (isRegister) {
                    console.log(`\n\n---Register New User---`);
                    let username = prompt(`Enter username: `);
                    let password = prompt.hide(`Enter password: `);
                    if (username && password) {
                        isRegister = !isRegister
                        await controller.user.create(username, password).then(console.log(`Berhasil Menambahkan User`));
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