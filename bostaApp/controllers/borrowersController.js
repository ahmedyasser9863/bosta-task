const BorrowerModel = require('../models/borrowers');

module.exports = {
  async addBorrower(req, res) {
    try {
      const createdBorrower = await BorrowerModel.create(req.body);
      res.status(201).json(createdBorrower);
    } catch (error) {
      console.error('Error adding borrower:', error);
      res.status(500).send('Error adding borrower');
    }
  },

  async getBorrowers(req, res) {
    try {
      const Borrowers = await BorrowerModel.getAllBorrowers();
      res.status(201).json(Borrowers);
    } catch (error) {
      console.error('Error getting borrowers:', error);
      res.status(500).send('Error getting borrowers');
    }
  },

  async getBorrower(req, res) {
    try {
      const Borrowers = await BorrowerModel.getBorrower(req.body);
      res.status(201).json(Borrowers);
    } catch (error) {
      console.error('Error getting borrower:', error);
      res.status(500).send('Error getting borrower');
    }
  },

  async updateBorrower(req, res) {
    try {
      const updatedBorrower= await BorrowerModel.updateBorrower(req.body);
      res.status(201).json(updatedBorrower);
    } catch (error) {
      console.error('Error updating borrower:', error);
      res.status(500).send('Error updating borrower');
    }
  },

  async deleteBorrower(req, res) {
    try {
      const deletedBorrower= await BorrowerModel.deleteBorrower(req.body);
      res.status(201).json(deletedBorrower);
    } catch (error) {
      console.error('Error deleting borrower:', error);
      res.status(500).send('Error deleting borrower');
    }
  },

};
