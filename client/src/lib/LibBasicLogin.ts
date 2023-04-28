import LibConfig from './LibConfig';
import LibCookie from './LibCookie';
import Session from './Session'
//
const PUBLIC_BASIC_AUTH_USER = import.meta.env.PUBLIC_BASIC_AUTH_USER;
const PUBLIC_BASIC_AUTH_PASSWORD = import.meta.env.PUBLIC_BASIC_AUTH_PASSWORD;

const LibBasicLogin = {
  /**
  * login
  * @param
  *
  * @return
  */ 
  login : async function () {
    try {
//console.log("PUBLIC_BASIC_AUTH_USER=", PUBLIC_BASIC_AUTH_USER);
      const password = document.querySelector<HTMLInputElement>('#password');
      const user_name = document.querySelector<HTMLInputElement>('#user_name');
console.log(user_name?.value);
console.log(password?.value);
      if(
          PUBLIC_BASIC_AUTH_USER === user_name?.value && 
          PUBLIC_BASIC_AUTH_PASSWORD === password?.value
      ) 
      {
          const key = LibConfig.SESSION_KEY_USER;
          const obj = {id: 0};
          const result = await Session.put(key, obj);
console.log(result)
          window.location.href = '/';
      } else {
          alert("Error, Login");
      }
    } catch (error) {
        console.error(error);
    }     
  } 
}

export default LibBasicLogin;
