
/*  
 *  create by Mas F
 *  support dari chatGPT :v
 *  kalau ada kendala atau tanya tannya 
 *  chat no di bawah ini
 *  wa.me/6289692509996
 */

const infonya = "INFO:\nIni adalah Script Configurasi PM2 dibuat untuk mempermudah dev/owner bot wa/tele menggunakan panel atau hosting untuk menjalankan bot, karena banyaknya  panel dan beberapa platform yang tidak mendukung edit run command contohnya pada startup panel yang tidak ada pilihan command run dan hanya menggunakan node sebagai awalan, susah pastinya saat bot tiba tiba off karena ada erorr apalagi platform ny gk disediain ontime 24/7 atau auto restart, makanya saya membuat script configurasi pm2 agar saat node menjalankan file utama seperti index.js di rubah dan menjalankan file configurasi ini terlebih dahulu dan configurasi pm2 akan menjalankan file utama index.js nya, jadi aman to, ontime 24/7 dan no stuck, selebihnya ya begitulah kira kira\n\n*Kode konfigurasi ini di buat berdasarkan source yang ada jadi murni dan aman.\n\nRegard Mas F ehe...XD"


//Minimal lu udah install kedua package ini

const pm2 = require('pm2'); //kalau belum di install lu tinggal taro kode ini "pm2": "^5.3.0" ke file package.json
const chalk = require('chalk')//kalau yang ini pasti adalah gk mungkin gk ada

// Definisikan konfigurasi PM2
const pm2Config = {
  apps: [
  {
    name: 'index', //nama aplikasi
    script: 'index.js', // script yang ingin di jalankan
    instances: 1,
    exec_mode: 'fork',
      output: '/home/container/.pm2/logs/index-out.log', // Arahkan log ke file
       error: '/home/container/.pm2/logs/index-error.log', // Arahkan log error ke file
       log_date_format: 'YYYY-MM-DD HH:mm:ss',
       merge_logs: true
     }
     ]
};

// Hubungkan ke PM2
pm2.connect((err) => {
  if (err) {
    console.error(err);
    process.exit(2);
  }

  // Mulai aplikasi berdasarkan konfigurasi di atas tadi
  pm2.start(pm2Config, (err) => {
    if (err) {
      console.error(err);
      pm2.disconnect();
      process.exit(2);
    }
    console.log('Aplikasi berhasil dijalankan menggunakan PM2');
    console.log('Hai Owner Fjr.Y Rebot sudah ON silahkan coba mengirim pesan bot atau tes')
    console.log(infonya)

    //Tampilkan log aplikasi secara real-time di terminal
    //Biar pesan nya keliatan di terminal
    pm2.launchBus((err, bus) => {
      if (err) {
        console.error(err);
      } else {
        bus.on('log:out', (packet) => {
          if (packet.process.name === 'index') {
            console.log(chalk.green('[OUT]'), chalk.green(packet.data)); //buat menampilkan log yang masuk atau out (no error)(gw kasih warna hijau biar mudah dibaca)
          }
        });

        bus.on('log:err', (packet) => {
          if (packet.process.name === 'index') {
            console.error(chalk.red('[ERR]'), chalk.red(packet.data)); //buat menampilkan log yang erorr (gw kasih warna red biar mudah dibaca)
          }
        });
      }
    });

    
      //Abaikan saja kode di bawah ini kalau lu masih programmer pemula

      //Disconnect dari PM2 setelah selesai
      //Function ini buat disconnect, simpel nya buat ngestopin
      //gw saranin di komen aja karena kalau lu idupin nanti pas udh on malah stop lagi proses nya :v ntar di kira erorr gk bisa jalan

      //pm2.disconnect(); 
  });
});