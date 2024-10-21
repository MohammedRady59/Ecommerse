import Cookies from "universal-cookie";

const cookies = new Cookies();
class CookieServices {
  //get
  get(name: string) {
    return cookies.get(name);
  }
  //set
  set(
    name: string,
    value: string,
    options?: { path: string; expires: Date; httpOnly?: boolean } | null
  ) {
    return cookies.set(name, value, options || undefined);
  }
  //remove
  remove(name: string) {
    return cookies.remove(name);
  }
}

export default new CookieServices();
