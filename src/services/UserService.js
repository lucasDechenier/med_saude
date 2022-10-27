import Api from "./Api";

export default {
  base: 'user',
  
  register(user) {
    let {email, password, name, birthDate, cpf} = user
    return Api().post(`${this.base}/register`, {
      email: email,
      password: password,
      name: name,
      birthDate: birthDate,
      cpf: cpf
    }).then((response) => response.data)
  },
  
}
