import LibConfig from '../config';
require('dotenv').config();
import LibPg from './LibPg';

const  LibSession = {
  /**
   * getItem
   * レコード無い場合、空白を返す。
   * 
   * @param req : any
   * @return string|null
   *
   * @throws Exception
   */      
  getItem :async function(req: any){
    try {
      //let ret =  {ret: LibConfig.NG_CODE, data: "" };      
      const client = LibPg.getClient();
      const queryText = `
      SELECT * FROM public."Session" 
      where 
      "sessionId" = $1 AND key = $2
      LIMIT 1
      `;
      const item = req.body;
      const values = [
        item.sessionId,
        item.key,
      ];
      const res = await client.query(queryText, values);
      client.end(); 
      if(res.rows.length < 1) {
        return {ret: LibConfig.OK_CODE, data: "" };
      }    
      const data = res.rows[0];
//console.log(data);
      const value = JSON.parse(data.value || '[]');
//console.log(value);
      return {
        ret: LibConfig.OK_CODE, data: value 
      };
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
      const resDelete = await this.delete(req);
console.log(resDelete);
      if(resDelete.ret !== LibConfig.OK_CODE) {
        console.error("Error, create.delete NG ");
        throw new Error('Error , delete NG');
      }
//console.log(req.body);
      const client = LibPg.getClient();
      const item = req.body;
      const queryText = `
        INSERT INTO public."Session" (
          "sessionId",
          key,
          value,
          "createdAt",
          "updatedAt"
        )
        VALUES ($1, $2, $3,
          current_timestamp, current_timestamp
        )
        RETURNING *
      `;
      let valueJson = JSON.stringify(item.value);
      const values = [
        item.sessionId,
        item.key,
        valueJson,
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
  delete :async function(req: any){
    try {
//console.log(req.body);
      const item = req.body;
      const client = LibPg.getClient();
      await client.query('BEGIN');
      const deleteQuery = `
      DELETE FROM public."Session"
       WHERE "sessionId" = $1 AND key = $2
      RETURNING *
      `;
      const values = [
        item.sessionId,
        item.key,
      ];      
      const res = await client.query(deleteQuery, values);
      await client.query('COMMIT');
      client.end();
      console.log(`with Key= ${item.key} has been deleted successfully.`);
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
export default LibSession;
