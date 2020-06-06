// Book Class: represent a book
class Book {
  constructor(title, author, page, status) {
    this.title = title;
    this.author = author;
    this.page = page;
    this.status = status
  }
}

// UI Class: handle UI tasks
class UI {
  static displayBooks() {
    var storedBooks = [
      {
        title: "Mindset",
        author: "Carol S. Dweck",
        page: "320",
        status: true
      },
      {
        title: "One Day",
        author: "David Nicholls",
        page: "437",
        status: false
      }
    ];

    var books = storedBooks;

    books.forEach((book) => {
      UI.addBookToList(book);
    });
  }

  static addBookToList(book) {
    const list = document.querySelector('#book-list');
    const row = document.createElement('tr');
    var readStatus = bookStatus(book.status);

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.page}</td>
      <td><a href="#" class="btn btn-sm" id="readBook">${readStatus}</a></td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;

    list.appendChild(row);

    var statusEffect = document.querySelectorAll("#readBook");
    for (let i in statusEffect) {
      effect(statusEffect[i]);
    }

  }
}

// Store Class: handle storage

// Events: display books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Events: add books
var bookForm = document.querySelector("#book-form");

bookForm.addEventListener('submit', addBook);

//Function add book
function addBook(e) {
  e.preventDefault();

  var title = document.querySelector("#title").value;
  var author = document.querySelector("#author").value;
  var page = document.querySelector("#page").value;
  var status = document.querySelector("#read-status").checked;

  var bookItem = new Book(title, author, page, status);
  UI.addBookToList(bookItem);
}

//Function for read status
function bookStatus(status) {
  if (status === true) {
    return "readed";
  }
  else if (status === false) {
    return "not yet read";
  }
}

// Status Color Effect
function effect(statusEffect) {
  if (statusEffect.textContent === "readed") {
    statusEffect.classList.add("btn-success");
  }
  else if (statusEffect.textContent === "not yet read") {
    statusEffect.classList.add("btn-warning");
  }
}


// Events: remove books
var listItem = document.querySelector("#book-list");
listItem.addEventListener("click", deleteItem);

function deleteItem(e) {
  if (e.target.classList.contains("delete")) {
    if(confirm("Are you sure?")) {
      var li = e.target.parentElement.parentElement;
      li.parentElement.removeChild(li);
    }
  }
}