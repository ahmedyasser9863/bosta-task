const db = require('../db');
const Helper = require('./helpers');
const tableName = 'borrowers'
const errorHandleString = 'Borrower'

class Borrower {
  static async create(body) {
    const { name, email, registered_date} = body;
    const query = 'insert into borrowers (name, email, registered_date) values ($1, $2, $3) returning *';
    const values = [name, email, registered_date];
    const { rows } = await db.query(query, values);
    return 'Borrower Created Successfuly';
  }

  static async getBorrower(body){
    return Helper.getone(tableName,errorHandleString,body)
  }

  static async updateBorrower(body) {
    return Helper.update(tableName,errorHandleString,body)
  }

  static async deleteBorrower(body){
    return Helper.delete(tableName,errorHandleString,body)
  }

  static async getAllBorrowers(){
    return Helper.getAll(tableName)
  }
  
}

module.exports = Borrower;