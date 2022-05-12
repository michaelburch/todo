import { v4 as uuid } from "uuid";
import { DI } from '@microsoft/fast-foundation';

  
class CookieImpl implements Cookie {
    constructor() {}
    private getCookie() {
        var name = location.hostname + "=";
        var ca = document.cookie.split(";");
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == " ") {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }
      getUniqueId(): string {
        //Read current cookie value
        let cookieVal: string = this.getCookie();
        if (cookieVal == "") {
          // if blank, generate new id
          cookieVal = uuid();
        }
        // Set or renew cookie for 1 year
        var d = new Date();
        d.setTime(d.getTime() + 365 * 24 * 60 * 60 * 1000);
        var expires = "expires=" + d.toUTCString();
        document.cookie =
          location.hostname +
          "=" +
          cookieVal +
          ";" +
          expires +
          ";sameSite=strict;path=/";
         return cookieVal;
      } 
}
export const Cookie = DI.createInterface<Cookie>(x => x.singleton(CookieImpl));

export interface Cookie {
    getUniqueId(): string;
  }