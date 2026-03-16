// ------------------------------
// Shelf Care - Beginner Friendly JS
// ------------------------------

// Array to store all books
let userLibrary = [];

// Counter to give each book a unique ID
let bookIdCounter = 1;

// ------------------------------
// Function to create a book object
// ------------------------------
function makeBookObject(title, author, pages) {
  // Create a book object with 4 properties
  let book = {
    title: title,
    author: author,
    pages: pages,
    bookID: bookIdCounter // Assign a unique ID
  };

  // Increase the counter for the next book
  bookIdCounter = bookIdCounter + 1;

  return book;
}

// ------------------------------
// Function to create a new book and add it to the library
// ------------------------------
function createBook() {
  // Get values from the add book form
  let title = document.getElementById('title').value;
  let author = document.getElementById('author').value;
  let pages = document.getElementById('page-count').value;

  // Create a new book object
  let newBook = makeBookObject(title, author, pages);

  // Add the book to the array
  userLibrary.push(newBook);

  // Rebuild the table to show the new book
  rebuildBookTable();

  // Clear the form fields
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('page-count').value = '';
}

// ------------------------------
// Function to rebuild the book table
// ------------------------------
function rebuildBookTable() {
  // Get the table body
  let tableBody = document.getElementById('table-Tbody');

  // Clear the table first
  tableBody.innerHTML = '';

  // Loop through each book and add a row
  for (let i = 0; i < userLibrary.length; i++) {
    let book = userLibrary[i];

    // Create a new table row
    let row = document.createElement('tr');

    // Create cells for title, author, pages, bookID
    let titleCell = document.createElement('td');
    titleCell.innerText = book.title;

    let authorCell = document.createElement('td');
    authorCell.innerText = book.author;

    let pagesCell = document.createElement('td');
    pagesCell.innerText = book.pages;

    let idCell = document.createElement('td');
    idCell.innerText = book.bookID;

    // Create remove button
    let removeCell = document.createElement('td');
    let removeButton = document.createElement('button');
    removeButton.innerText = 'Remove';
    removeButton.className = 'delete-btn';
    removeButton.id = book.bookID;

    removeCell.appendChild(removeButton);

    // Add cells to the row
    row.appendChild(titleCell);
    row.appendChild(authorCell);
    row.appendChild(pagesCell);
    row.appendChild(idCell);
    row.appendChild(removeCell);

    // Add the row to the table
    tableBody.appendChild(row);
  }
}

// ------------------------------
// Function to remove a book from the array
// ------------------------------
function removeBookFromArray(bookID) {
  bookID = Number(bookID);

  for (let i = 0; i < userLibrary.length; i++) {
    if (userLibrary[i].bookID === bookID) {
      // Remove the book from the array
      userLibrary.splice(i, 1);
      break;
    }
  }

  // Rebuild the table
  rebuildBookTable();
}

// ------------------------------
// Function to update a book
// ------------------------------
function updateBook() {
  let bookID = Number(document.getElementById('book-ID').value);
  let newTitle = document.getElementById('new-title').value;
  let newAuthor = document.getElementById('new-author').value;
  let newPages = document.getElementById('new-page-count').value;

  for (let i = 0; i < userLibrary.length; i++) {
    if (userLibrary[i].bookID === bookID) {
      userLibrary[i].title = newTitle;
      userLibrary[i].author = newAuthor;
      userLibrary[i].pages = newPages;
      break;
    }
  }

  // Update the table
  updateTable();

  // Clear update form
  document.getElementById('book-ID').value = '';
  document.getElementById('new-title').value = '';
  document.getElementById('new-author').value = '';
  document.getElementById('new-page-count').value = '';
}

// ------------------------------
// Function to update table after editing
// ------------------------------
function updateTable() {
  rebuildBookTable();
}

// ------------------------------
// Event listener for remove buttons
// ------------------------------
document.addEventListener("click", function (e) {
  if (e.target && e.target.className === "delete-btn") {
    removeBookFromArray(e.target.id);
  }
});