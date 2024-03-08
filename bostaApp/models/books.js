const db = require('../db');
const Helper = require('./helpers');
const tableName = 'books'
const errorHandleString = 'Book'


class Book {
  static async create(body) {
    const { title, author, isbn, available_quantity, shelf_location } = body;
    const query = 'insert into books (title, author, isbn, available_quantity, shelf_location) values ($1, $2, $3, $4, $5) returning *';
    const values = [title, author, isbn, available_quantity, shelf_location];
    const { rows } = await db.query(query, values);
    return "Book Created Successfuly",rows[0];
  }

  static async getBook(body){
    return Helper.getone(tableName,errorHandleString,body)    
  }

  static async updateBook(body) {
    return Helper.update(tableName,errorHandleString,body)
  }

  static async deletebook(body){
    return Helper.delete(tableName,errorHandleString,body)
  }

  static async getAllBooks(){
    return Helper.getAll(tableName)
  }
  
}

module.exports = Book;
