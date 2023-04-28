import LibConfig from './LibConfig';
import Session from './Session';

//
const Layout = {
  /**
   *
   * @param key: any
   *
   * @return
   */  
  startProc : async function() : Promise<any>
  {
//console.log("#Layout.startProc");
    let ret = false;
    const parsedUrl = new URL(window.location.href);
    if(!(parsedUrl.pathname === '/login' || parsedUrl.pathname === '/basic_login')) 
    {
//console.log("pathname=", parsedUrl.pathname);
      const key = LibConfig.SESSION_KEY_USER;
      const result = await Session.get(key);
//console.log("#result");
//console.log(result);
      if(result !== "") {
//        console.log("OK, Login");
      } else {
        console.log("NG, Login");
        location.href = '/basic_login';
      }
    }
    return ret;
  }
}
Layout.startProc();

export default Layout;
