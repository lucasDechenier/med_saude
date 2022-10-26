import Api from "./Api";

export default {
  base: 'v1/session',
  
  login (email, password) {
    return Api().post(this.base, {
      email: email,
      password: password
    }).then((response) => response.data)
  },
}
