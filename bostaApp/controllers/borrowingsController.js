const BorrowingsModel = require('../models/borrowings');

module.exports = {

  async addBorrowing(req, res) {
    try {
      const createdBook = await BorrowingsModel.create(req.body);
      res.status(201).json(createdBook);
    } catch (error) {
      console.error('Error adding borrowing:', error);
      res.status(500).send('Error adding borrowing');
    }
  },

  async returnBook(req, res) {
    try {
      const books = await BorrowingsModel.returnbook(req.body);
      res.status(201).json(books);
    } catch (error) {
      console.error('Error returning book:', error);
      res.status(500).send('Error returning book');
    }
  },

  async getBorrowerBorrowerings(req, res) {
    try {
      const books = await BorrowingsModel.getBorrowerBorrowerings(req.body);
      res.status(201).json(books);
    } catch (error) {
      console.error('Error getting borrower borrowerings:', error);
      res.status(500).send('Error getting borrower borrowerings');
    }
  },

  async updateBorrowering(req, res) {
    try {
      const updatedBook = await BorrowingsModel.updateBorrowering(req.body);
      res.status(201).json(updatedBook);
    } catch (error) {
      console.error('Error updating borrowing:', error);
      res.status(500).send('Error updating borrowing');
    }
  },

  async deleteBorrowering(req, res) {
    try {
      const updatedBook = await BorrowingsModel.deleteBorrowering(req.body);
      res.status(201).json(updatedBook);
    } catch (error) {
      console.error('Error deleting book:', error);
      res.status(500).send('Error deleting book');
    }
  },

  async getAllBorrowerings(req, res) {
    try {
      const books = await BorrowingsModel.getAllBorrowerings();
      res.status(201).json(books);
    } catch (error) {
      console.error('Error getting borrowerings:', error);
      res.status(500).send('Error getting borrowerings');
    }
  },

  async getLateBorrowings(req, res) {
    try {
      const books = await BorrowingsModel.getLateBorrowerings();
      res.status(201).json(books);
    } catch (error) {
      console.error('Error getting borrowerings:', error);
      res.status(500).send('Error getting borrowerings');
    }
  },

};
