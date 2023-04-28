import LibCrud from '../../lib/LibCrud';

const CrudIndex = {
  /**
  * getList
  * @param
  *
  * @return
  */
  getList :async function (): Promise<any>
  {
    try{
      const url = import.meta.env.PUBLIC_API_URL;
//console.log("#startProc");
      let items: any[] = [];
      const response = await fetch(url + "/tasks/index");
      const json = await response.json();
      items = json;
//      console.log(items);
      return items;
    } catch (e) {
      console.error(e);
    } 
  }  ,  
  /**
  * startProc
  * @param
  *
  * @return
  */   
  startProc :async function (): Promise<void> 
  {
    try{
      console.log("#startProc");
      const valid = await LibCrud.validLogin();
//console.log("valid=", valid);
      if(valid === false) {
        alert("NG, valid Login");
      }
    } catch (e) {
      console.error(e);
    }    
  } 
}
//
//CrudIndex.startProc();

export default CrudIndex;
