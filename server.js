const http = require('http'); // Pastikan ini valid
const { nanoid } = require('nanoid');

const PORT = 9000;
let books = [];

// Middleware untuk parsing JSON
const parseJson = (req) => {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(err);
      }
    });
  });
};

const server = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200);
    res.end(JSON.stringify({ message: 'Welcome to the Bookshelf API!' }));
  } else if (req.method === 'POST' && req.url === '/books') {
    try {
      const book = await parseJson(req);
      if (!book.name) {
        res.writeHead(400);
        return res.end(JSON.stringify({
          status: 'fail',
          message: 'Gagal menambahkan buku. Mohon isi nama buku'
        }));
      }
      if (book.readPage > book.pageCount) {
        res.writeHead(400);
        return res.end(JSON.stringify({
          status: 'fail',
          message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        }));
      }

      const id = nanoid();
      const finished = book.pageCount === book.readPage;
      const insertedAt = new Date().toISOString();
      const updatedAt = insertedAt;

      const newBook = {
        id,
        ...book,
        finished,
        insertedAt,
        updatedAt
      };

      books.push(newBook);
      res.writeHead(201);
      res.end(JSON.stringify({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: id
        }
      }));
    } catch (err) {
      console.error(err); // Log the error for debugging
      res.writeHead(400);
      res.end(JSON.stringify({
        status: 'fail',
        message: 'Gagal menambahkan buku. Bad Request'
      }));
    }
  } else if (req.method === 'GET' && req.url === '/books') {
    res.writeHead(200);
    res.end(JSON.stringify({
      status: 'success',
      data: {
        books: books.map(({ id, name, publisher }) => ({ id, name, publisher }))
      }
    }));
  } else if (req.method === 'GET' && req.url.startsWith('/books/')) {
    const bookId = req.url.split('/')[ 2 ];
    const book = books.find(b => b.id === bookId);
    if (book) {
      res.writeHead(200);
      res.end(JSON.stringify({
        status: 'success',
        data: { book }
      }));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({
        status: 'fail',
        message: 'Buku tidak ditemukan'
      }));
    }
  } else if (req.method === 'PUT' && req.url.startsWith('/books/')) {
    const bookId = req.url.split('/')[ 2 ];
    const bookIndex = books.findIndex(b => b.id === bookId);
    if (bookIndex === -1) {
      res.writeHead(404);
      return res.end(JSON.stringify({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan'
      }));
    }

    try {
      const book = await parseJson(req);
      if (!book.name) {
        res.writeHead(400);
        return res.end(JSON.stringify({
          status: 'fail',
          message: 'Gagal memperbarui buku. Mohon isi nama buku'
        }));
      }
      if (book.readPage > book.pageCount) {
        res.writeHead(400);
        return res.end(JSON.stringify({
          status: 'fail',
          message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
        }));
      }

      const updatedBook = {
        ...books[ bookIndex ],
        ...book,
        finished: book.pageCount === book.readPage,
        updatedAt: new Date().toISOString()
      };

      books[ bookIndex ] = updatedBook;
      res.writeHead(200);
      res.end(JSON.stringify({
        status: 'success',
        message: 'Buku berhasil diperbarui'
      }));
    } catch (err) {
      console.error(err); // Log the error for debugging
      res.writeHead(400);
      res.end(JSON.stringify({
        status: 'fail',
        message: 'Gagal memperbarui buku. Bad Request'
      }));
    }
  } else if (req.method === 'DELETE' && req.url.startsWith('/books/')) {
    const bookId = req.url.split('/')[ 2 ];
    const bookIndex = books.findIndex(b => b.id === bookId);
    if (bookIndex === -1) {
      res.writeHead(404);
      return res.end(JSON.stringify({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan'
      }));
    }

    books.splice(bookIndex, 1);
    res.writeHead(200);
    res.end(JSON.stringify({
      status: 'success',
      message: 'Buku berhasil dihapus'
    }));
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({
      status: 'fail',
      message: 'Endpoint tidak ditemukan'
    }));
  }
});

// Mendengarkan di port 9000
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});