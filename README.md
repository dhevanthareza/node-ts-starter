# HR Information System for RSI Sultan Agung Semarang

## Instalasi

1. Install Yarn
2. Jalankan `yarn install`
3. Copy `.env.example` ke `.env`

    Ubah settingan database.

4. Buat `config/config.json.example` ke `config/config.json`.

    Ubah settingan database, khusunya yang `development` untuk keperluan development.

5. Jalankan `yarn start`

## Setup Development Environment

1. Gunakan `Visual Studio Code`
2. Install package `TSLint (deprecated)`, iya yang deprecated

## Migrasi dan Seeding Data

1. Jalankan `yarn db:setup`
2. Untuk mengubah data awal, tambah file di folder `seeders`
