import Api from "./Api";

export default {
  base: 'schedule',
  
  opened() {
    return Api().get(`${this.base}/opened`).then((response) => response.data)
  },

  scheduledUser(){
    return Api().get(`${this.base}/scheduled/user`).then((response) => response.data)
  },

  canceledUser(){
    return Api().get(`${this.base}/canceled/user`).then((response) => response.data)
  },

  finishedUser(){
    return Api().get(`${this.base}/finished/user`).then((response) => response.data)
  },

  scheduledAdmin(){
    return Api().get(`${this.base}/admin/scheduled`).then((response) => response.data)
  },

  canceledAdmin(){
    return Api().get(`${this.base}/admin/canceled`).then((response) => response.data)
  },

  finishedAdmin(){
    return Api().get(`${this.base}/admin/finished`).then((response) => response.data)
  },

  toCancel(id){
    return Api().post(`${this.base}/cancel/${id}`).then((response) => response.data)
  },
  
  toSchedule(id) {
    return Api().post(`${this.base}/${id}`).then((response) => response.data)
  },

  createSchedule(schedule){
    const {appointmentHour, appointmentDate, description, price, type, title} = schedule
    return Api().post(this.base, {
      appointmentHour: appointmentHour,
      appointmentDate: appointmentDate,
      description: description,
      price: price,
      type: type,
      title: title,
    }).then((response) => response.data)
  },

  toFinish(id){
    return Api().post(`${this.base}/admin/finish/${id}`).then((response) => response.data)
  },

  remove(id){
    return Api().delete(`${this.base}/${id}`).then((response) => response.data)
  },
}