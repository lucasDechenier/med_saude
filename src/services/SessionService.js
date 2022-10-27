import Api from "./Api";

export default {
  base: 'user/login',
  
  login (email, password) {
    return Api().post(this.base, {
      email: email,
      password: password
    }).then((response) => response.data)
  },
}
