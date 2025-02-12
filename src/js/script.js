{
    'use strict';

    const select = {
        templateOf: {
            book: "#template-book",
        },
        containerOf: {
            books: '.books-list',
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
            console.log('booksContainer', booksContainer);
            booksContainer.appendChild(thisBook.element);
        }
    }

    const app = {
        favoriteBooks: [],
        initBooks: function () {
            const thisApp = this;
            for (let bookIndex in thisApp.data.books) {
                new Book(thisApp.data.books[bookIndex]);
            }
        },
        initData: function () {
            const thisApp = this;
            thisApp.data = dataSource;
        },
        initFavoriteAction: function() {
            const thisApp = this;

            const booksContainer = document.querySelector(select.containerOf.books);
            booksContainer.addEventListener('dblclick', function(event) {
                event.preventDefault();
                const clickedGrandpa = event.target.parentElement.parentElement;
                if(clickedGrandpa.classList.contains('book__image')) {
                    const bookId = clickedGrandpa.getAttribute('data-id');

                    if (!app.favoriteBooks.includes(bookId)) {
                        clickedGrandpa.classList.add('favorite');
                        app.favoriteBooks.push(bookId);
                    } else {
                        clickedGrandpa.classList.remove('favorite');
                        app.favoriteBooks.splice(
                            app.favoriteBooks.indexOf(bookId),1);
                    }
                }
            });
        },
        init: function () {
            const thisApp = this;
            console.log('*** App starting ***');
            console.log('thisApp:', thisApp);
            console.log('templates:', templates);
            thisApp.initData();
            thisApp.initBooks();
            thisApp.initFavoriteAction();
        },
    }

    app.init();
}