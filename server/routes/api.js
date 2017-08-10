import express from 'express';

import BooksController from '../controllers/book';
import UsersController from '../controllers/user';
import { isLoggedIn, notLoggedIn } from '../helpers/user_auth';

const router = express.Router();

router.get('/users/logout', isLoggedIn, UsersController.logout);

/* Borrow book */
router.post('/users/:userId/books', isLoggedIn, BooksController.borrow);

/* PUT allow user to return book */
router.put('/users/:userId/books', isLoggedIn, BooksController.return);

/* GET user borrowed book */
router.get('/users/:userId/books', isLoggedIn, BooksController.inventory);

/* POST add book */
router.post('/books', isLoggedIn, BooksController.add);

/* PUT modify book */
router.put('/books/:bookId', isLoggedIn, BooksController.update);

/* GET retrieve all books */
router.get('/books', isLoggedIn, BooksController.retrieveAll);

/* GET retrieve single book */
router.get('/books/:bookId', isLoggedIn, BooksController.retrieve);

/**
 * Access Restriction
 */
router.use('/', notLoggedIn, (req, res, next) => {
    next();
});

/* POST user signup */
router.post('/users/signup', UsersController.signup);

/* POST user signin */
router.post('/users/signin', UsersController.login);

export default router;
