import LibConfig from '../config';
require('dotenv').config();
import LibPg from './LibPg';

const  LibTodo = {
  /**
   *
   * @param req : any
   * @return string|null
   *
   * @throws Exception
   */    
  getItems :async function(){
    try {
      const text = `
       SELECT * FROM todos ORDER BY id DESC LIMIT 100
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
  search :async function(search_key: string): Promise<any>
  {
    try {
      const text = `
       SELECT * FROM todos
       WHERE title like '%${search_key}%'
      ORDER BY id DESC LIMIT 100
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
      SELECT * FROM todos where id = ${id}
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
   *
   * @param req : any
   * @return string|null
   *
   * @throws Exception
   */  
  create :async function(req: any){
    try {
//console.log(req.body);
      const client = LibPg.getClient();
      const task = req.body;
      const queryText = `
        INSERT INTO todos (
          user_id,
          title,
          content,
          completed,
          created_at,
          updated_at
        )
        VALUES ($1, $2, $3, $4,
          current_timestamp, current_timestamp
        )
        RETURNING *
      `;
      const values = [
        task.user_id,
        task.title,
        task.content,
        task.completed,
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
      throw new Error('Error , : '+ err);
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
        `UPDATE todos SET user_id = $1, title = $2, content = $3,
         completed = $4, 
         updated_at = current_timestamp WHERE id = $5 RETURNING *`,
        [
          task.user_id,
          task.title,
          task.content,
          task.completed,
          id,
        ],
      );
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
      const deleteQuery = 'DELETE FROM todos WHERE id = $1 RETURNING *';
      const res = await client.query(deleteQuery, [id]);
      await client.query('COMMIT');
      client.end();
      console.log(`with ID ${id} has been deleted successfully.`);
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
export default LibTodo;
