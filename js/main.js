// Create class for booklist
class AwesomeBookAppllication {
  constructor() {
    this.books = JSON.parse(localStorage.getItem('books')) || [];
    this.bookShelves = document.getElementById('bookShelves');
    this.titleEntry = document.getElementById('title');
    this.authorEntry = document.getElementById('author');
    this.submitBtn = document.getElementById('submitBtn');

    // Add an event listner to submit button
    this.submitBtn.addEventListener('click', this.handleOnClickAddBook.bind(this));

    const listLink = document.getElementById('list');
    const addNewLink = document.getElementById('addNew');
    const contactLink = document.getElementById('contact');

    listLink.addEventListener('click', () => this.showSection('listSection'));
    addNewLink.addEventListener('click', () => this.showSection('addSection'));
    contactLink.addEventListener('click', () => this.showSection('contactSection'));

    this.showSection('listSection');
    this.renderBooks();
  }

  handleOnClickAddBook(event) {
    event.preventDefault();
    this.addBook();
    this.renderBooks();
    this.titleEntry.value = '';
    this.authorEntry.value = '';
  }

  // create variables within addbook function
  // Declared trim method to remove whitespace
  addBook() {
    const title = this.titleEntry.value.trim();
    const author = this.authorEntry.value.trim();
    if (title !== '' && author !== '') {
      const book = { title, author };
      this.books.push(book);
      this.saveBooks();
    }
  }

  removeBook(index) {
    this.books.splice(index, 1);
    this.saveBooks();
  }

  saveBooks() {
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  renderBooks() {
    this.bookShelves.innerHTML = '';
    this.books.forEach((book, index) => {
      const bookDiv = document.createElement('div');
      bookDiv.classList.add('book');
      bookDiv.textContent = `${book.title} written by ${book.author}`;
      // Create const variable and functionalities for remove
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.style.backgroundColor = '#800000';
      removeButton.style.marginTop = '5px';
      removeButton.style.marginLeft = '100px';
      removeButton.classList.add('remove-button');
      // eslint-disable-next-line no-use-before-define
      removeButton.addEventListener('click', () => {
        this.removeBook(index);
        this.renderBooks();
      });
      // Append User Interface for li remove
      bookDiv.appendChild(removeButton);
      this.bookShelves.appendChild(bookDiv);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  showSection(sectionId) {
    const sections = ['homePage', 'listSection', 'addSection', 'contactSection'];

    sections.forEach((id) => {
      const section = document.getElementById(id);
      if (id === sectionId) {
        section.style.display = 'block';
      } else {
        section.style.display = 'none';
      }
    });
  }
}

function initializeApp() {
  // eslint-disable-next-line no-unused-vars
  const app = new AwesomeBookAppllication();
}

document.addEventListener('DOMContentLoaded', initializeApp);
