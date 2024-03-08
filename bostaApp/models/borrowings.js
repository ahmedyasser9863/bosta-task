const db = require('../db');
const Helper = require('./helpers');
const tableName = 'borrowings'
const errorHandleString = 'Borrowing'

class Borrowing {
  static async create(body) {
    const { book_id, borrower_id, borrow_date,return_date} = body;
    const query = 'insert into borrowings (book_id, borrower_id, borrow_date,return_date) values ($1, $2, $3 , $4) returning *';
    const values = [book_id, borrower_id, borrow_date,return_date];
    const { rows } = await db.query(query, values);
    return 'Borrowing Created Successfuly';
  }

  static async returnbook(body){
    const {return_date, return_fields} = body;

    const keys = Object.keys(return_fields);
    const keyvalues = Object.values(return_fields);


    const addedQueryString = keys.map((key, index) => `${key} = $${index + 2}`);
    const query = `update borrowings set actual_return_date = $1 , returned = true where ${addedQueryString.join(' and ')} returning *`;

    const values = [return_date,...keyvalues];
    const { rows } = await db.query(query, values);
    if (rows.length ===0){
        throw new Error(`${errorHandleString} not found`)
    }else{
        return `${errorHandleString} Returned Successfuly`;
    }
    
  }

  static async getBorrowerBorrowerings(body){
    const { search_fields } = body;

    const keys = Object.keys(search_fields);
    const keyvalues = Object.values(search_fields);

    const addedQueryString = keys.map((key, index) => `${key} = $${index + 1}`);

    const query = `select borrowings.id,books.title,books.isbn,borrowers.name,borrowers.email from borrowings , books, borrowers where books.id=borrowings.book_id and borrowers.id = borrowings.borrower_id and borrowings.returned = false and  ${addedQueryString.join(' and ')}`
    console.log(query)
    const values = [...keyvalues];
    const {rows} = await db.query(query,values)
    if (rows.length ===0){
        throw new Error(`${errorHandleString} not found`)
    }else{
        return rows;
    }
  }

  static async getLateBorrowerings(){

    const query = `select borrowings.id,books.title as book_title,books.isbn as book_isbn,borrowers.name as borrower_name,borrowers.email as borrower_email,return_date,returned from borrowings , books, borrowers where books.id=borrowings.book_id and borrowers.id = borrowings.borrower_id and borrowings.returned = false and return_date < now()`
    console.log(query)
    const {rows} = await db.query(query)
    if (rows.length ===0){
        throw new Error('No Late Borrowings')
    }else{
        return rows;
    }
  }


  static async getLateBorroweringsWithDates(body){
    const { start_date,end_date } = body;

    const query = `select borrowings.id,books.title as book_title,books.isbn as book_isbn,borrowers.name as borrower_name,borrowers.email as borrower_email,return_date,returned from borrowings , books, borrowers where books.id=borrowings.book_id and borrowers.id = borrowings.borrower_id and borrowings.returned = false and return_date < now() and borrow_date between ${start_date} and ${end_date} `
    console.log(query)
    const {rows} = await db.query(query)
    if (rows.length ===0){
        throw new Error('No Late Borrowings')
    }else{
        return rows;
    }
  }

  static async updateBorrowering(body) {
    return Helper.update(tableName,errorHandleString,body)
  }

  static async deleteBorrowering(body){
    return Helper.delete(tableName,errorHandleString,body)
  }

  static async getAllBorrowerings(){
    return Helper.getAll(tableName)
  }

  static async getAllBorroweringsWithDates(body){
    const { start_date,end_date } = body;
    const query = `select * from ${tableName} where borrow_date between ${start_date} and ${end_date}`
    const { rows } = await db.query(query)
    return rows
  }
  
}

module.exports = Borrowing;