{
    'use strict';

    const select = {
        templateOf: {
            book: "#template-book",
        },
        containerOf: {
            books: '.books-list',
            filters: '.filters',
        },
        book: {
            image: '.book__image',
        }
    }

    const templates = {
        book: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
    }

    class Book {
        constructor(data) {
            const thisBook = this;
            thisBook.data = data;

            thisBook.renderInMenu();
            thisBook.getElements();
        }

        getElements() {
            const thisBook = this;

            thisBook.dom = {};
            thisBook.dom.image = thisBook.element.querySelector(select.book.image);
        }

        renderInMenu() {
            const thisBook = this;

            const generatedHTML = templates.book(thisBook.data);
            thisBook.element = utils.createDOMFromHTML(generatedHTML);
            const booksContainer = document.querySelector(select.containerOf.books);
            booksContainer.appendChild(thisBook.element);
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

    const app = {
        books: [],
        favoriteBooks: [],
        filters: [],
        initBooks: function () {
            const thisApp = this;
            for (let bookIndex in thisApp.data.books) {
                thisApp.books.push(new Book(thisApp.data.books[bookIndex]));
            }
        },
        initData: function () {
            const thisApp = this;
            thisApp.data = dataSource;
        },
        initFavoriteAction: function () {
            const thisApp = this;

            const booksContainer = document.querySelector(select.containerOf.books);
            booksContainer.addEventListener('dblclick', function (event) {
                event.preventDefault();
                const clickedGrandpa = event.target.parentElement.parentElement;
                if (clickedGrandpa.classList.contains('book__image')) {
                    const bookId = clickedGrandpa.getAttribute('data-id');

                    if (!thisApp.favoriteBooks.includes(bookId)) {
                        clickedGrandpa.classList.add('favorite');
                        thisApp.favoriteBooks.push(bookId);
                    } else {
                        clickedGrandpa.classList.remove('favorite');
                        thisApp.favoriteBooks.splice(
                            thisApp.favoriteBooks.indexOf(bookId), 1);
                    }
                }
            });
        },
        initFiltersAction: function () {
            const thisApp = this;

            const filtersContainer = document.querySelector(select.containerOf.filters);
            filtersContainer.addEventListener('click', function (event) {
                if (event.target.getAttribute('name') == 'filter' &&
                    event.target.getAttribute('type') == 'checkbox') {
                    if (event.target.checked) {
                        thisApp.filters.push(event.target.value);
                    } else {
                        thisApp.filters.splice(
                            thisApp.filters.indexOf(event.target.value), 1);
                    }
                    for (book of thisApp.books) {
                        book.hideIfFiltered(thisApp.filters);
                    }
                }
            });
        },
        init: function () {
            const thisApp = this;
            console.log('*** App starting ***');
            thisApp.initData();
            thisApp.initBooks();
            thisApp.initFavoriteAction();
            thisApp.initFiltersAction();
        },
    }

    app.init();
}