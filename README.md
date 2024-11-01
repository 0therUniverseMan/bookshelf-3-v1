# API Buku

API Buku adalah aplikasi RESTful API yang menyediakan layanan untuk mengelola data buku. Pengguna dapat menambahkan, memperbarui, menghapus, dan mengambil informasi tentang buku.

## Fitur

- Menambahkan buku baru
- Mengubah data buku
- Menghapus buku
- Mengambil daftar semua buku
- Mengambil detail buku berdasarkan ID

## Teknologi

- Node.js
- Express
- nanoid (untuk pembuatan ID unik)

## Cara Instalasi

1. **Clone repository:**

   ```bash
   git clone https://github.com/username/repo-name.git
   ```

## Masuk ke direktori proyek:

```
cd repo-name
```

## Instal dependensi:

```
npm install
```

## Jalankan aplikasi:

```
npm run start
```

Server akan berjalan pada http://localhost:9000.

# Endpoint

## 1. Menambahkan Buku

Method: POST

URL: /books

Body Request

```
{
    "name": "string",
    "year": number,
    "author": "string",
    "summary": "string",
    "publisher": "string",
    "pageCount": number,
    "readPage": number,
    "reading": boolean
}
```

### Response Berhasil:

```
{
    "name": "string",
    "year": number,
    "author": "string",
    "summary": "string",
    "publisher": "string",
    "pageCount": number,
    "readPage": number,
    "reading": boolean
}
```

# 2. Mengambil Daftar Semua Buku

Method: GET

URL: /books

Response:

```
{
    "status": "success",
    "data": {
        "books": [
            {
                "id": "id_buku",
                "name": "nama_buku",
                "publisher": "penerbit"
            },
            ...
        ]
    }
}
```

# 3. Mengambil Detail Buku Berdasarkan ID

Method: GET

URL: /books/{bookId}

Response Berhasil:

```
{
    "status": "success",
    "data": {
        "book": {
            "id": "id_buku",
            "name": "nama_buku",
            "year": number,
            "author": "string",
            "summary": "string",
            "publisher": "string",
            "pageCount": number,
            "readPage": number,
            "finished": boolean,
            "reading": boolean,
            "insertedAt": "tanggal",
            "updatedAt": "tanggal"
        }
    }
}
```

# 4. Mengubah Data Buku

Method: PUT

URL: /books/{bookId}

Body Request:

```
{
    "name": "string",
    "year": number,
    "author": "string",
    "summary": "string",
    "publisher": "string",
    "pageCount": number,
    "readPage": number,
    "reading": boolean
}
```

## Response Berhasil:

```
{
    "status": "success",
    "message": "Buku berhasil diperbarui"
}
```

# 5. Menghapus Buku

Method: DELETE

URL: /books/{bookId}

```
{
    "status": "success",
    "message": "Buku berhasil dihapus"
}
```

### Validasi dan Respons Kesalahan

400 Bad Request: Jika name tidak disertakan saat menambahkan atau memperbarui buku.

```
{
    "status": "fail",
    "message": "Gagal menambahkan buku. Mohon isi nama buku"
}
```

## 404 Not Found: Jika ID buku tidak ditemukan saat memperbarui atau menghapus buku.

```
{
    "status": "fail",
    "message": "Buku gagal dihapus. Id tidak ditemukan"
}
```

## Kontribusi

Jika Anda ingin berkontribusi dalam proyek ini, silakan buka pull request atau buka issue untuk diskusi.

## Lisensi

Proyek ini dilisensikan di bawah MIT License.

### Penjelasan Struktur Dokumen:

- **Nama Proyek**: Sebagai pengantar, menjelaskan apa itu API Buku.
- **Fitur**: Menjelaskan apa saja yang bisa dilakukan dengan API.
- **Teknologi**: Menyebutkan teknologi yang digunakan.
- **Cara Instalasi**: Petunjuk langkah demi langkah untuk menginstal dan menjalankan aplikasi.
- **Endpoint**: Deskripsi setiap endpoint, termasuk metode HTTP, URL, format body request, dan contoh response.
- **Validasi dan Respons Kesalahan**: Menjelaskan validasi yang dilakukan dan respons kesalahan yang mungkin diterima.
- **Kontribusi**: Informasi bagi mereka yang ingin berkontribusi.
- **Lisensi**: Menyebutkan lisensi proyek.

Anda dapat menyesuaikan konten di atas sesuai dengan kebutuhan dan informasi tambahan yang relevan untuk proyek Anda. Jika ada pertanyaan lebih jauh, jangan ragu untuk bertanya!
