const page = {};

// Memasukkan halaman ke dalam indeks halaman agar dapat dipanggil di program utama
page.userPage = require('./userPage');
page.inventoryPage = require('./inventoryPage');


module.exports = page;