//Book Constructor
function Book (title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

//UI Constructor
function UI() {}

UI.prototype.addBookToList = function(book) {
    const list = document.getElementById('book-list');

    const row =  `
    <tr>
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
    </tr>
    `
    list.innerHTML += row;
}

UI.prototype.clearFields = function() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

UI.prototype.showAlert = function(message, className) {

    const div = document.createElement('div');

    div.className = `alert ${className}`;

    div.appendChild(document.createTextNode(message));

    const container = document.querySelector('.container');

    const form = document.querySelector('#book-form');

    container.insertBefore(div, form);

    setTimeout(function() {
        document.querySelector('.alert').remove();
    }, 3000)
}

//Delete Book
UI.prototype.deleteBook = function(target) {
    if(target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}

//Event Listeners
document.getElementById('book-form').addEventListener('submit', 
function(e) {
    //Get Form Values
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value

    // Instantiate book      
    const book = new Book(title, author, isbn);

    const ui = new UI();

    if(title == '' || author === '' || isbn === '') {
        ui.showAlert('Please fill in all the fields', 'error')
    }

    else {
        ui.addBookToList(book);

        ui.showAlert('Book Added!', 'success')

        ui.clearFields();
    }

      

    e.preventDefault();
})


//Event Listeners for delete
document.getElementById('book-list').addEventListener('click', function(e) {

    const ui = new UI();

    ui.deleteBook(e.target);

    //Show message
    ui.showAlert('Book Removed!', 'success');

    e.preventDefault();

})