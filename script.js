//Global Variable
var filterBook;
var filterBookDup;
var bookRead;
var listCounter;

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

    // Change Read Book Status
    bookRead = document.querySelectorAll("#readBook");

    bookRead.forEach((read) => {read.addEventListener("click", readBook)});
  }

  static addBookToList(book) {
    let list = document.querySelector('#book-list');
    let row = document.createElement('tr');
    row.classList = "bookContent";
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
    filterBook = document.querySelectorAll('.bookContent');

    //Hide Form
    tableBoxDefault();
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
  bookRead = document.querySelectorAll("#readBook");
  bookRead.forEach((read) => {read.addEventListener("click", readBook)});
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

// Function: Changing Read Book Status
function readBook(e) {
  if (e.target.innerHTML === "readed") {
    e.target.innerHTML = "not yet read";
    e.target.classList = "btn btn-sm btn-warning";
  }
  else if (e.target.innerHTML === "not yet read") {
    e.target.innerHTML = "readed";
    e.target.classList = "btn btn-sm btn-success";
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
      if(li.innerHTML === filterBook[2].innerHTML) {
        filterBook[2]
      }
    }
  }
}

// Adding Some Css
let box = document.querySelector("#check");
box.addEventListener("click", tableBox);

function tableBoxDefault() {
  let tableTop = document.querySelector("#book-table");
  bookForm.style.top = "-100vh";
  tableTop.style.padding = "0px";
  tableTop.style.transition = "all .5s";
}

function tableBox(e) {
  let tableTop = document.querySelector("#book-table");
  if (e.target.checked === true) {
    bookForm.style.top = "70px";
    tableTop.style.padding = "370px 0px 0px 0px";
    tableTop.style.transition = "all .5s";
  }
  else {
    bookForm.style.top = "-100vh";
    tableTop.style.padding = "0px";
    tableTop.style.transition = "all .5s";
  }
}

// Filter BookList
let bookFilter = document.querySelector("#filter-book");
bookFilter.addEventListener("change", filterBook);

function filterBook(e) {
  if (e.target.value === "readed") {
    filterBookDup = [...filterBook];
    listItem.innerHTML = "";
    filterBookDup.filter((book) => filterCase(book) === "readed").forEach((book) => addFilterBook(book));

    tableBoxDefault();
    box.removeEventListener("click", tableBox);
  }
  else if (e.target.value === "not yet read") {
    filterBookDup = [...filterBook];
    listItem.innerHTML = "";
    filterBookDup.filter((book) => filterCase(book) === "not yet read").forEach((book) => addFilterBook(book));

    tableBoxDefault();
    box.removeEventListener("click", tableBox);
  }
  else if (e.target.value === "all") {
    filterBookDup = [...filterBook];
    listItem.innerHTML = "";
    filterBookDup.forEach((book) => addFilterBook(book));

    tableBoxDefault();
    box.addEventListener("click", tableBox);
  }
}

// Function for filter Book
function filterCase(item) {
  return item.children[3].children[0].innerHTML;
};

function addFilterBook(book) {
  let row = document.createElement('tr');
  row.classList = "bookContent";
  row.innerHTML = book.innerHTML;
  listItem.append(row);
}