{
  'use strict';

  const select = {
    templateOf: {
      book: '#template-book',
    },
    containerOf: {
      books: '.books-list',
      filters: '.filters',
    },
    book: {
      image: '.book__image',
      rating: '.book__rating__fill',
    }
  };

  const templates = {
    book: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };

  class Book {
    constructor(data) {
      const thisBook = this;
      thisBook.data = data;

      thisBook.renderInMenu();
      thisBook.getElements();
      thisBook.setRatingColor();
    }

    getElements() {
      const thisBook = this;

      thisBook.dom = {};
      thisBook.dom.image = thisBook.element.querySelector(select.book.image);
      thisBook.dom.rating = thisBook.element.querySelector(select.book.rating);
    }

    renderInMenu() {
      const thisBook = this;

      const generatedHTML = templates.book(thisBook.data);
      thisBook.element = utils.createDOMFromHTML(generatedHTML);
      const booksContainer = document.querySelector(select.containerOf.books);
      booksContainer.appendChild(thisBook.element);
    }

    setRatingColor() {
      const thisBook = this;
      const rating = thisBook.data.rating;
      const width = thisBook.data.rating * 10;

      if (rating < 6) {
        thisBook.dom.rating.setAttribute('style',
          'background: linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);' +
                    'width: ' + width + '%;');
      } else if (rating <= 8) {
        thisBook.dom.rating.setAttribute('style',
          'background: linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);' +
                    'width: ' + width + '%;');
      } else if (rating <= 9) {
        thisBook.dom.rating.setAttribute('style',
          'background: linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);' +
                    'width: ' + width + '%;');
      } else {
        thisBook.dom.rating.setAttribute('style',
          'background: linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);' +
                    'width: ' + width + '%;');
      }
    }

    hideIfFiltered(filters) {
      const thisBook = this;
      if (filters.includes('adults') && thisBook.data.details.adults) {
        thisBook.dom.image.classList.add('hidden');
      } else {
        thisBook.dom.image.classList.remove('hidden');
      }

      if (!thisBook.dom.image.classList.contains('hidden')) {
        if (filters.includes('nonFiction') && thisBook.data.details.nonFiction) {
          thisBook.dom.image.classList.add('hidden');
        } else {
          thisBook.dom.image.classList.remove('hidden');
        }
      }
    }
  }

  class BooksList {

    constructor(booksList) {
      const thisBooksList = this;

      thisBooksList.books = [];
      thisBooksList.favoriteBooks = [];
      thisBooksList.filters = [];

      thisBooksList.initBooks(booksList);
      thisBooksList.initFavoriteAction();
      thisBooksList.initFiltersAction();
    }

    initBooks(booksList) {
      const thisBooksList = this;
      for (let bookIndex in booksList) {
        thisBooksList.books.push(new Book(booksList[bookIndex]));
      }
    }

    initFavoriteAction() {
      const thisBooksList = this;

      const booksContainer = document.querySelector(select.containerOf.books);
      booksContainer.addEventListener('dblclick', function (event) {
        event.preventDefault();
        const clickedGrandpa = event.target.parentElement.parentElement;
        if (clickedGrandpa.classList.contains('book__image')) {
          const bookId = clickedGrandpa.getAttribute('data-id');

          if (!thisBooksList.favoriteBooks.includes(bookId)) {
            clickedGrandpa.classList.add('favorite');
            thisBooksList.favoriteBooks.push(bookId);
          } else {
            clickedGrandpa.classList.remove('favorite');
            thisBooksList.favoriteBooks.splice(
              thisBooksList.favoriteBooks.indexOf(bookId), 1);
          }
        }
      });
    }

    initFiltersAction() {
      const thisBooksList = this;

      const filtersContainer = document.querySelector(select.containerOf.filters);
      filtersContainer.addEventListener('click', function (event) {
        if (event.target.getAttribute('name') === 'filter' &&
            event.target.getAttribute('type') === 'checkbox') {
          if (event.target.checked) {
            thisBooksList.filters.push(event.target.value);
          } else {
            thisBooksList.filters.splice(
              thisBooksList.filters.indexOf(event.target.value), 1);
          }
          for (let book of thisBooksList.books) {
            book.hideIfFiltered(thisBooksList.filters);
          }
        }
      });
    }
  }

  const app = {
    initData: function () {
      const thisApp = this;
      thisApp.data = dataSource;
    },
    initBooksList: function () {
      const thisApp = this;
      new BooksList(thisApp.data.books);
    },
    init: function () {
      const thisApp = this;
      console.log('*** App starting ***');
      thisApp.initData();
      thisApp.initBooksList();
    },
  };

  app.init();
}