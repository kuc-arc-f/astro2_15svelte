import LibConfig from '../config';
require('dotenv').config();
//const pg = require("pg");
import LibPg from './LibPg';

const  LibTask = {
  /**
   *
   * @param req : any
   * @return string|null
   *
   * @throws Exception
   */    
  getItems :async function(){
    try {
      //const result = await client.query('SELECT * FROM tasks');
      const text = `
       SELECT * FROM tasks ORDER BY id DESC LIMIT 100
      `;
      const client = LibPg.getClient();
      const res = await client.query(text);
      client.end();
      console.log(res.rows);
      return res.rows;      
    } catch (err) {
      console.error(err);
      throw new Error('Error , getItems:' +err);
    }          
  },
  /**
   *
   * @param req : any
   * @return string|null
   *
   * @throws Exception
   */      
  getItem :async function(id: number){
    try {
      const text = `
      SELECT * FROM tasks where id = ${id}
      `;
      const client = LibPg.getClient();
      const res = await client.query(text);
      client.end();
      const data = res.rows[0];
//      console.log(data);
      return data;      
    } catch (err) {
      console.error(err);
      throw new Error('Error , getItem:' +err);
    }    
  },
  /**
   * addTask
   * @param req : any
   * @return string|null
   *
   * @throws Exception
   */  
  addTask :async function(req: any){
    try {
//console.log(req.body);
      const client = LibPg.getClient();
      const task = req.body;
      const queryText = `
        INSERT INTO tasks (
          user_id,
          title,
          content,
          priority,
          category_id,
          completed,
          tag_1,
          tag_2,
          tag_3,
          tag_4,
          tag_5,
          complete_date,
          created_at,
          updated_at
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11,
          current_timestamp, 
          current_timestamp, current_timestamp
        )
        RETURNING *
      `;
      //, $12, $13, $14
      const values = [
        task.user_id,
        task.title,
        task.content,
        task.priority,
        task.category_id,
        task.completed,
        task.tag_1,
        task.tag_2,
        task.tag_3,
        task.tag_4,
        task.tag_5,
//        task.complete_date,
//        task.created_at,
//        task.updated_at,
      ];
//console.log(text);
      const res = await client.query(queryText, values);
      client.end();
      const result = res.rows[0];
// /console.log(result);
      return {
        ret: LibConfig.OK_CODE, data: result 
      };
    } catch (err) {
      console.error(err);
      throw new Error('Error , addTask: '+ err);
    }    
  },
  /**
   *
   * @param req : any
   * @return string|null
   *
   * @throws Exception
   */    
  update :async function(req: any){
    try {
      const task = req.body;
      const id = task.id;
console.log("id=", id);
      const client = LibPg.getClient();
      await client.query('BEGIN');
      // update task
      const result = await client.query(
        `UPDATE tasks SET user_id = $1, title = $2, content = $3, priority = $4, category_id = $5,
         completed = $6, 
         tag_1 = $7, tag_2 = $8, tag_3 = $9, tag_4 = $10, tag_5 = $11,
         complete_date = $12, updated_at = current_timestamp WHERE id = $13 RETURNING *`,
        [
          task.user_id,
          task.title,
          task.content,
          task.priority,
          task.category_id,
          task.completed,
          task.tag_1,
          task.tag_2,
          task.tag_3,
          task.tag_4,
          task.tag_5,
          task.complete_date,
//          task.updated_at,
          id,
        ],
      );
      //if (result.rowCount === 1) {
     //}
      const rowOne = result.rows[0];
      await client.query('COMMIT');
      client.end();
  //console.log("id=", task.id);
      return {
        ret: LibConfig.OK_CODE, data: rowOne
      };
    } catch (err) {
      console.error(err);
      throw new Error('Error , update: '+ err);
    }    
  },
  /**
   *
   * @param req : any
   * @return string|null
   *
   * @throws Exception
   */    
  delete :async function(req: any){
    try {
//console.log(req.body);
      const task = req.body;
//console.log("id=", task.id);
      const id = task.id;
      const client = LibPg.getClient();
      await client.query('BEGIN');
      const deleteQuery = 'DELETE FROM tasks WHERE id = $1 RETURNING *';
      const res = await client.query(deleteQuery, [id]);
      await client.query('COMMIT');
      client.end();
      console.log(`Task with ID ${id} has been deleted successfully.`);
      const result = res.rows[0];
//console.log(result);
      return {
        ret: LibConfig.OK_CODE, data:result
      };
    } catch (err) {
      console.error(err);
      throw new Error('Error , delete: '+ err);
    }    
  },             
}
export default LibTask;
