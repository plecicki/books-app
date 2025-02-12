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
            thisBook.initFavoriteAction();
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

        initFavoriteAction() {
            const thisBook = this;

            thisBook.dom.image.addEventListener('dblclick', function(event){
                event.preventDefault();
                thisBook.dom.image.classList.add('favorite');
                app.favoriteBooks.push(thisBook.data.id);
                console.log(app.favoriteBooks);
            })
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
        init: function () {
            const thisApp = this;
            console.log('*** App starting ***');
            console.log('thisApp:', thisApp);
            console.log('templates:', templates);
            thisApp.initData();
            thisApp.initBooks();
        },
    }

    app.init();
}