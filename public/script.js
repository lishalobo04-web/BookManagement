
let editId = null;

// Display all books
async function loadBooks() {
    const response = await fetch('/books');
    const books = await response.json();

    const list = document.getElementById('bookList');
    list.innerHTML = '';

    books.forEach(book => {
        list.innerHTML += `
            <tr>
                <td>${book.id}</td>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.price}</td>
                <td>
                    <button onclick="editBook(${book.id})">Edit</button>
                    <button onclick="deleteBook(${book.id})">Delete</button>
                </td>
            </tr>`;
    });
}

// Add or update book
document.getElementById('bookForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const book = {
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        price: Number(document.getElementById('price').value)
    };

    const url = editId ? `/books/${editId}` : '/books';
    const method = editId ? 'PUT' : 'POST';

    const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book)
    });

    const result = await response.json();

    document.getElementById('message').textContent = result.message;

    resetForm();
    loadBooks();
});

// Edit book
async function editBook(id) {
    const response = await fetch(`/books/${id}`);
    const book = await response.json();

    document.getElementById('title').value = book.title;
    document.getElementById('author').value = book.author;
    document.getElementById('price').value = book.price;

    editId = id;
    document.getElementById('submitBtn').textContent = 'Update Book';
    document.getElementById('cancelBtn').hidden = false;
}

// Delete book
async function deleteBook(id) {
    if (confirm("Are you sure you want to delete?")) {
        const response = await fetch(`/books/${id}`, {
            method: 'DELETE'
        });

        const result = await response.json();

        document.getElementById('message').textContent = result.message;

        loadBooks();
    }
}

// Reset form
function resetForm() {
    document.getElementById('bookForm').reset();
    editId = null;
    document.getElementById('submitBtn').textContent = 'Add Book';
    document.getElementById('cancelBtn').hidden = true;
}

// Load books
loadBooks();
