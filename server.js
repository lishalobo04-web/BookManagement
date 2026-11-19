
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('Public'));

// Book details
let books = [
    { id: 1, title: "Java Programming", author: "James", price: 450 },
    { id: 2, title: "Python Basics", author: "John", price: 350 }
];

let nextId = 3;

// GET - Retrieve all books
app.get('/books', (req, res) => {
    res.json(books);
});

// GET - Retrieve book by ID
app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === Number(req.params.id));

    if (!book)
        return res.status(404).json({ message: "Book not found" });

    res.json(book);
});

// POST - Add a new book
app.post('/books', (req, res) => {
    const { title, author, price } = req.body;

    if (!title || !author || price === undefined || Number(price) <= 0) {
        return res.status(400).json({ message: "Invalid book details" });
    }

    const book = {
        id: nextId++,
        title,
        author,
        price: Number(price)
    };

    books.push(book);
    res.status(201).json({
        message: "Book added successfully",
        book
    });
});

// PUT - Update book
app.put('/books/:id', (req, res) => {
    const book = books.find(b => b.id === Number(req.params.id));

    if (!book)
        return res.status(404).json({ message: "Book not found" });

    const { title, author, price } = req.body;

    if (!title || !author || price === undefined || Number(price) <= 0) {
        return res.status(400).json({ message: "Invalid book details" });
    }

    book.title = title;
    book.author = author;
    book.price = Number(price);

    res.json({ message: "Book updated successfully", book });
});

// DELETE - Delete book
app.delete('/books/:id', (req, res) => {
    const index = books.findIndex(b => b.id === Number(req.params.id));

    if (index === -1)
        return res.status(404).json({ message: "Book not found" });

    books.splice(index, 1);

    res.json({ message: "Book deleted successfully" });
});

// Start server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
