// Object stuff
function Library() {
    this.books = [];
};

function Book(title, author, pages, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Library.prototype.addBookToLibrary = function(book) {
    this.books.push(book);
}

Library.prototype.removeBookFromLibrary = function(index) {
    this.books.splice(index, 1);
}

const library = new Library();

// DOM Manipulation
const showButton = document.querySelector('#new-book');
const bookDialog = document.querySelector('#book-dialog');
const closeButton= bookDialog.querySelector('#close-dialog');
const createButton = bookDialog.querySelector('#create-book');
const bookTitle = bookDialog.querySelector('#title');
const bookAuthor = bookDialog.querySelector('#author');
const bookPages = bookDialog.querySelector('#pages');
const bookRead = bookDialog.querySelector('#read');
const contentArea = document.querySelector(".content");

function removeBookCard(e) {
    index = e.target.dataset.id;
    library.removeBookFromLibrary(index);
    renderBooks();
}

function changeReadState(e) {
    index = e.target.dataset.id;
    library.books[index].read = !library.books[index].read;
    renderBooks();
}

function createBookCard(index, book) {
    const card = document.createElement('div');
    const title = document.createElement('p');
    const author = document.createElement('p')
    const pages = document.createElement('p');
    const readButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    card.classList.add('card');
    title.classList.add('title')
    author.classList.add('author');
    pages.classList.add('pages');

    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = `No. pages: ${book.pages}`;

    deleteButton.dataset.id = index;
    readButton.dataset.id = index;

    deleteButton.addEventListener('click', removeBookCard);
    readButton.addEventListener('click', changeReadState);

    deleteButton.textContent = 'Remove from Library';
    
    if (book.read) {
        readButton.textContent = 'Read';
        readButton.classList.add('read');
    } else {
        readButton.textContent = 'Not read';
        readButton.classList.add('not-read');
    }

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(readButton);
    card.appendChild(deleteButton);

    contentArea.appendChild(card);
}

function renderBooks() {
    contentArea.textContent = '';

    for (let i = 0; i < library.books.length; i++) {
        createBookCard(i, library.books[i]);
    }
}

function clearForm() {
    bookTitle.value = '';
    bookAuthor.value = '';
    bookPages.value = '';
    bookRead.checked = false;
}

showButton.addEventListener('click', () => {
    bookDialog.showModal();
})

closeButton.addEventListener('click', (e) => {
    e.preventDefault();
    bookDialog.close('');
})

bookDialog.addEventListener('close', () => {
    if (bookDialog.returnValue) {
        const book = new Book(
            bookTitle.value,
            bookAuthor.value,
            bookPages.value,
            bookRead.checked
        )

        library.addBookToLibrary(book);
        clearForm();
        renderBooks();
    }
})
