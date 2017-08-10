import db from '../models';

const BooksController = {
    /* Add Book */
    add: (req, res) => {
        // Validate input
        req.checkBody('isbn', 'ISBN required').notEmpty().isInt();
        req.checkBody('title', 'Title required').notEmpty();
        req.checkBody('author', 'Author required').notEmpty();
        req.checkBody('published', 'Published date required').notEmpty();
        req.checkBody('description', 'Description required').notEmpty();
        req.checkBody('qty', 'QTY required').notEmpty().isInt();

        // Validation result
        req.getValidationResult().then((result) => {
            if (!result.isEmpty()) {
                res.status(400)
                    .json({ status: 'Validation error', data: result.array() });
            }

            const newBook = {
                isbn: req.body.isbn,
                title: req.body.title,
                author: req.body.author,
                published: req.body.published,
                description: req.body.description,
                qty: req.body.qty
            };

            db.Book
                .create(newBook)
                .then((book) => {
                    res.status(201).json({
                        status: 'success',
                        data: book
                    });
                })
                .catch((err) => { res.status(400).send(err); });
        });
    },

    /* Update book */
    update: (req, res) => {
        const bookId = req.params.bookId;

        db.Book
            .findById(bookId)
            .then((book) => {
                if (!book) {
                    res.status(404).send({
                        status: 'Not found'
                    });
                }

                const updateBook = {
                    isbn: req.body.isbn || book.isbn,
                    title: req.body.title || book.title,
                    author: req.body.author || book.author,
                    published: req.body.published || book.published,
                    description: req.body.description || book.description,
                    qty: req.body.qty || book.isbn
                };
                return book
                    .update(updateBook)
                    .then(() => {
                        res.status(200).send({ status: 'success' });
                    })
                    .catch(err => res.status(400).send(err));
            });
    },

    /* Retrieve all books */
    retrieveAll: (req, res) => {
        db.Book.all()
            .then((books) => { res.send(books); })
            .catch((err) => { res.send(err); });
    },

    /* Retrieve single book */
    retrieve: (req, res) => {
        const bookId = parseInt(req.params.bookId, 10);
        db.Book
            .findById(bookId)
            .then((book) => {
                if (!book) return res.status(404).send('Not found');
                res.status(200).send(book);
            })
            .catch((err) => { res.status(400).send(err); });
    },

    /* Borrow book */
    borrow: (req, res) => {
        const userId = parseInt(req.params.userId, 10);
        const bookId = req.body.bookId;

        db.Book
            .findById(bookId)
            .then((book) => {
                // TODO: associate
                const bookData = book.title;
                db.Inventory
                    .create({
                        userId,
                        book: bookData
                    })
                    .then((inventory) => {
                        res.status(200).send(inventory);
                    });
            })
            .catch(err => res.status(400).send(err));
    },

    /* Return borrowed books */
    return: (req, res) => {
        const bookId = parseInt(req.body.bookId, 10);
        db.Inventory
            .findOne({ where: { bookId } })
            .then((book) => {
                if (!book) {
                    res.status(404).send({ status: 'Not found' });
                }
                book
                    .update({ return: true })
                    .then(() => {
                        res.status(200).send({ status: 'success' });
                    })
                    .catch(err => res.status(400).send(err));
            });
    },

    /* Get books borrowed by user */
    inventory: (req, res) => {
        if (req.query.returned) {
            return db.Inventory
                .findAll({
                    where: {
                        userId: req.params.userId,
                        return: req.query.returned
                    }
                })
                .then((books) => { res.send(books); })
                .catch((err) => { res.send(err); });
        }
        db.Inventory
            .findAll({ where: { userId: req.params.userId } })
            .then((books) => { res.send(books); })
            .catch((err) => { res.send(err); });
    }
};

export default BooksController;
