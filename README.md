# Mono Repo Aplikasi CUTI

Adalah mono repo untuk aplikasi sederhana pengelolaan data cuti. Backend menggunakan `nest.js` dan frontend menggunakan `next.js` dengan database `mariadb`.


## Installasi

Clone satu repo ini.

Pertama-tama buat dulu databasenya di Mariadb misalnya `aplikasi_cuti`.

```sql
CREATE DATABASE aplikasi_cuti;
```

Untuk backend

```bash
cd api
cp env_example .env
```

Setup dulu dotenvnya untuk database name, port, dan user.

```bash
npm install
npm run start:dev
```
Lalu jalan Backend, dan ia akan jalan pada port `3030`

Untuk frontend

```bash
cd frontend
cp env_example .env
```

Setup dulu dotenvnya untuk database name, port, dan user.

```bash
npm install
npm run dev
```

Frontend berjalan pada port `3000`