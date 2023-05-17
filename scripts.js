// API endpoint
const url = "https://6298beb2f2decf5bb74a9edb.mockapi.io/books";

// DOM variables
const bookNameInput = document.getElementById("bookName-input");
const bookAuthorInput = document.getElementById("bookAuthor-input");
const bookReadInput = document.getElementById("status");
const addBookButton = document.getElementById("submit");
// display variables for dom
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
          <h3 id="book-title">Title: ${book.bookName}</h3>
          <h4>Author: ${book.bookAuthor}</h4>
          <h4>Read Status: ${book.readStatus}</h4>
      </div>
    `;
  });

  wantDisplay.innerHTML = ""; // Clear the innerHTML of the div b/c we are going to add new content
  currentDisplay.innerHTML = ""; // Clear the innerHTML of the div b/c we are going to add new content
  readDisplay.innerHTML = ""; // Clear the innerHTML of the div b/c we are going to add new content

  //iterate through the books array and display the books in the DOM based on their read status
  for (let book of books) {
    if (book.includes("want-to-read")) {
      wantDisplay.innerHTML += book; // Add the book to the DOM
    } else if (book.includes("currently-reading")) {
      currentDisplay.innerHTML += book; // Add the book to the DOM
    } else if (book.includes("read")) {
      readDisplay.innerHTML += book; // Add the book to the DOM
    } else {
      console.log("Uncategorized", book);
    }
  }
}

// Function to clear the form inputs
function clearFormInputs() {
    bookNameInput.value = "";
    bookAuthorInput.value = "";
    bookReadInput.value = "read"; // Set the default value for the select input
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
    clearFormInputs();
  } catch (error) {
    console.log(error);
  }
}

addBookButton.addEventListener("click", postBook);
