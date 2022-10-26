import axios from 'axios'
import store from '../store'
import Vue from 'vue'

export const PublicAPI = () => {
  let http = axios.create({
    baseURL: window.config.URL,
    withCredentials: true
  });

  http.interceptors.request.use(function (request) {
    request.headers['Accept'] = 'application/json'
    request.headers['Content-Type'] = 'application/json'
    return request
  })
  return http
}

export default () => {
  let http = axios.create({
    baseURL: window.config.URL,
    withCredentials: true
  });

  http.interceptors.request.use(function (request) {
    request.headers['Accept'] = 'application/json'
    request.headers['Content-Type'] = 'application/json'
    request.headers['Authorization'] = store.getters.authToken

    store.commit('setLoading', true);
    return request
  }, () => {
    store.commit('setLoading', false);
  })

  // Add a response interceptor
  http.interceptors.response.use(function (response) {
    // Do something with response data
    setTimeout(() => {
      store.commit('setLoading', false);
    },500)
    return response;
  }, function (error) {

    let status = 500;
    let data;
    let statusText;

    if (error.response){
      status = error.response.status;
      statusText = error.response.statusText;
      data = error.response.data;
    }
    switch(status){
      case 401:
        Vue.swal({
          title: data.message || 'Você não está autorizado',
          type: 'error',
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 3000,
        });
        break;
      default:
        Vue.swal({
          title: data.message || statusText,
          type: 'error',
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 3000,
        });
    }

    store.commit('setLoading', false);

    return Promise.reject(error);
  })

  return http
}