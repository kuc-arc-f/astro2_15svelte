import LibCrud from '../../lib/LibCrud';

const CrudIndex = {
  /**
   * search
   * @param
   *
   * @return
   */    
  search : async function() : Promise<any>
  {
    try {   
//console.log("#search");    
      const url = import.meta.env.PUBLIC_API_URL;
      const searchKey = document.querySelector('#searchKey');
      const item = { search_key: searchKey?.value}
      const body = JSON.stringify(item);		
      const res = await fetch(url + "/todos/search", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},      
        body: body
      });
      const json = await res.json()
      if (res.status != 200) {
        throw new Error(await res.text());
      }
//console.log(json);
      return json;
    } catch (e) {
      console.error(e);
    }
  },  
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
      const response = await fetch(url + "/todos/index");
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
//        alert("NG, valid Login");
      }
    } catch (e) {
      console.error(e);
    }    
  } 
}
//
//CrudIndex.startProc();

export default CrudIndex;
