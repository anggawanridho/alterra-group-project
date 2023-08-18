const db = require('./models');
const prompt = require('prompt-sync')({sigint: true});
const controller = require('./controller');
const page = require('./pages');

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
                    }
                    if (Number(invetoryMenu) === 3) {
                        // update stock
                    }
                    if (Number(invetoryMenu) === 4) {
                        // delete stock
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