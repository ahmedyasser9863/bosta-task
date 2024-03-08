const express = require('express');
const router = express.Router();
const booksController = require('./controllers/booksController');
const BorrowerController = require('./controllers/borrowersController');
const BorrowingsController = require('./controllers/borrowingsController');
const ReportsController = require('./controllers/reportsController');
const rateLimitMiddleware = require('./middlewares/rateLimitMiddleware');
const basicAuthMiddleware = require('./middlewares/authMiddleware');


// Books routes
router.post('/addbook',rateLimitMiddleware,basicAuthMiddleware, booksController.addBook);
router.get('/getbooks',rateLimitMiddleware,basicAuthMiddleware, booksController.getBooks);
router.get('/getbook',rateLimitMiddleware,basicAuthMiddleware, booksController.getBook);
router.post('/updatebook',rateLimitMiddleware,basicAuthMiddleware, booksController.updateBook);
router.post('/deletebook',rateLimitMiddleware,basicAuthMiddleware, booksController.deleteBook);

// Borower routes
router.post('/addborrower',rateLimitMiddleware,basicAuthMiddleware, BorrowerController.addBorrower);
router.get('/getborrowers',rateLimitMiddleware,basicAuthMiddleware, BorrowerController.getBorrowers);
router.get('/getborrower',rateLimitMiddleware,basicAuthMiddleware, BorrowerController.getBorrower);
router.post('/updateborrower',rateLimitMiddleware,basicAuthMiddleware, BorrowerController.updateBorrower);
router.post('/deleteborrower',rateLimitMiddleware,basicAuthMiddleware, BorrowerController.deleteBorrower);

// Borrowings routes
router.post('/addborrowing',rateLimitMiddleware,basicAuthMiddleware, BorrowingsController.addBorrowing);
router.get('/getallborrowings',rateLimitMiddleware,basicAuthMiddleware, BorrowingsController.getAllBorrowerings);
router.get('/getborrowerborrowings',rateLimitMiddleware,basicAuthMiddleware, BorrowingsController.getBorrowerBorrowerings);
router.get('/getlateborrowings',rateLimitMiddleware,basicAuthMiddleware, BorrowingsController.getLateBorrowings);
router.post('/deleteborrowing',rateLimitMiddleware,basicAuthMiddleware, BorrowingsController.deleteBorrowering);
router.post('/closeborrowing',rateLimitMiddleware,basicAuthMiddleware, BorrowingsController.returnBook);
router.post('/updateborrowing',rateLimitMiddleware,basicAuthMiddleware, BorrowingsController.updateBorrowering);

// Reports routes
router.get('/getreportslateborrowerings',rateLimitMiddleware,basicAuthMiddleware, ReportsController.getLateBorrowings);
router.get('/getreportsallborrowerings',rateLimitMiddleware,basicAuthMiddleware, ReportsController.getAllBorrowings);

module.exports = router;
