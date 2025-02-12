{
    'use strict';

    const select = {
        templateOf: {
            book: "#template-book",
        },
        containerOf: {
            books: '.books-list',
        },
    }

    const templates = {
        book: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
    }

    class Book {
        constructor(data) {
            const thisBook = this;
            thisBook.data = data;

            thisBook.renderInMenu();
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