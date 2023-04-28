//import ServerSession from '../../lib/server/ServerSession'
import Session from '../../lib/Session'
import LibCookie from '../../lib/LibCookie'
//
const Test = {
  /**
  * startProc
  * @param
  *
  * @return
  */   
  startProc :async function (): Promise<void> 
  {
    try{
      const KeyTest = "test1";
      //btn
      const button: any = document.querySelector('#btn_save');
      button.addEventListener('click', async () => {
console.log("#btn_save");
        const obj = {id: 0}
        LibCookie.set_cookie("test1", "1");
        const result = await Session.put(KeyTest, obj);
console.log(result);
      });
      //btn_get
      const btn_get: any = document.querySelector('#btn_get');
      btn_get.addEventListener('click', async () => {
console.log("#btn_get");
//      LibCookie.set_cookie("test1", "1");
        const result = await Session.get(KeyTest);
console.log("#result");
console.log(result);
      });
      //btn_delete
      const btn_delete: any = document.querySelector('#btn_delete');
      btn_delete.addEventListener('click', async () => {
console.log("#btn_delete");
        const result = await Session.delete(KeyTest);
console.log(result);
      });

    } catch (e) {
      console.error(e);
    }    
  } 

}
Test.startProc();

export default Test;
