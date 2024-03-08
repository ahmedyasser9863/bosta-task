const BookModel = require('../models/books');

module.exports = {
  async addBook(req, res) {
    try {
      var _,createdBook = await BookModel.create(req.body);
      res.status(201).json(createdBook);
    } catch (error) {
      console.error('Error adding book:', error);
      res.status(500).send('Error adding book');
    }
  },

  async getBooks(req, res) {
    try {
      const books = await BookModel.getAllBooks();
      res.status(201).json(books);
    } catch (error) {
      console.error('Error getting books:', error);
      res.status(500).send('Error getting books');
    }
  },

  async getBook(req, res) {
    try {
      const books = await BookModel.getBook(req.body);
      res.status(201).json(books);
    } catch (error) {
      console.error('Error getting book:', error);
      res.status(500).send('Error getting book');
    }
  },

  async updateBook(req, res) {
    try {
      const updatedBook = await BookModel.updateBook(req.body);
      res.status(201).json(updatedBook);
    } catch (error) {
      console.error('Error updating book:', error);
      res.status(500).send('Error updating book');
    }
  },

  async deleteBook(req, res) {
    try {
      const updatedBook = await BookModel.deletebook(req.body);
      res.status(201).json(updatedBook);
    } catch (error) {
      console.error('Error deleting book:', error);
      res.status(500).send('Error deleting book');
    }
  },

};
