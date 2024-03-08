const db = require('../db');

class Helper {

  static async getone(tableName,errorHandleString,body){
    const { search_fields } = body;

    const keys = Object.keys(search_fields);
    const keyvalues = Object.values(search_fields);

    const addedQueryString = keys.map((key, index) => `${key} = $${index + 1}`);

    const query = `select * from ${tableName} where ${addedQueryString.join(' and ')}`
    console.log(query)
    const values = [...keyvalues];
    const {rows} = await db.query(query,values)
    if (rows.length ===0){
        throw new Error(`${errorHandleString} not found`)
    }else{
        return rows[0];
    }
  }

  static async update(tableName,errorHandleString,body) {
    const {id, change_fields} = body;

    const keys = Object.keys(change_fields);
    const keyvalues = Object.values(change_fields);


    const addedQueryString = keys.map((key, index) => `${key} = $${index + 2}`);
    const query = `update ${tableName} set ${addedQueryString} where id = $1 returning *`;

    const values = [id,...keyvalues];
    const { rows } = await db.query(query, values);
    if (rows.length ===0){
        throw new Error(`${errorHandleString} not found`)
    }else{
        return `${errorHandleString} Got Updated Successfuly`;
    }
  }

  static async delete(tableName,errorHandleString,body){
    const { id } = body;
    const query = `delete from ${tableName} where id = $1`
    const values = [id]
    const {rowCount} = await db.query(query,values)
    if (rowCount === 0) {
        throw new Error(`${errorHandleString} not found`)
    }else{
        return `${errorHandleString} Deleted Successfuly`
    }
  }

  static async getAll(tableName){
    const query = `select * from ${tableName}`
    const { rows } = await db.query(query)
    return rows
  }
  
}

module.exports = Helper;
