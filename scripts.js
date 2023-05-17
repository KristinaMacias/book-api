// API endpoint
const url = "https://6298beb2f2decf5bb74a9edb.mockapi.io/books";

// DOM variables
const bookNameInput = document.getElementById("bookName-input");
const bookAuthorInput = document.getElementById("bookAuthor-input");
const bookReadInput = document.getElementById("status");
const addBookButton = document.getElementById("submit");

const wantDisplay = document.getElementById("want-display");
const currentDisplay = document.getElementById("current-display");
const readDisplay = document.getElementById("read-display");

// Store books from API
let bookList = [];

// Function to get books from the API
async function getBooks() {
  try {
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    let data = await response.json();
    console.table(data);

    bookList = data;
    console.table(bookList);

    displayBooks();
  } catch (error) {
    console.log(error);
  }
}

getBooks();

// Function to display books in the DOM
function displayBooks() {
  let books = bookList.map((book) => {
    return `
      <div class="book">
          <h3>Title: ${book.bookName}</h3>
          <h4>Author: ${book.bookAuthor}</h4>
          <h4>Read Status: ${book.readStatus}</h4>
      </div>
    `;
  });

  wantDisplay.innerHTML = "";
  currentDisplay.innerHTML = "";
  readDisplay.innerHTML = "";

  for (let book of books) {
    if (book.includes("want-to-read")) {
      wantDisplay.innerHTML += book;
    } else if (book.includes("currently-reading")) {
      currentDisplay.innerHTML += book;
    } else if (book.includes("read")) {
      readDisplay.innerHTML += book;
    } else {
      console.log("Uncategorized", book);
    }
  }
}

// Function to post books to the API
async function postBook() {
  console.log("Inside postBook");
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        bookName: bookNameInput.value,
        bookAuthor: bookAuthorInput.value,
        readStatus: bookReadInput.value,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    console.log(response);

    getBooks();
  } catch (error) {
    console.log(error);
  }
}

addBookButton.addEventListener("click", postBook);
