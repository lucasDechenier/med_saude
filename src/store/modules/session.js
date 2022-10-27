import SessionService from "../../services/SessionService";

const storage = {
  getItem(key) {
    return localStorage.getItem(key)
  },

  setItem(key, value) {
    localStorage.setItem(key, value)
  },

  removeItem(key) {
    localStorage.removeItem(key)
  }
}
export const state = {
  userLogged: JSON.parse(storage.getItem('userLogged')),
  authToken: storage.getItem('authToken'),
  loadingApp: false,
  countLoading: 0
};

export const getters = {
  isLogged: state => {
    return !!(state.userLogged && state.authToken);
  },
  userLogged: state => {
    return state.userLogged
  },
  isAdmin: (state, getters) => {
    const adm = getters.isLogged && state.userLogged.admin;
    return adm
  },
  loadingApp: state => {
    return state.loadingApp
  },
  countLoading: state => {
    return state.countLoading
  },
  authToken: state => {
    return state.authToken;
  },
};

export const actions = {
  login({commit}, value) {
    return SessionService.login(value.email, value.password).then(data => {
      const user = Object.assign(data.user, {isWatson: data.is_watson})

      commit('userLogged', user);
      commit('setAuthToken', data.authorizationToken);
    })
  },
  logout({commit}) {
    commit('userLogged', null);
    commit('setAuthToken', null);
    return Promise.resolve()
  },
};

export const mutations = {
  userLogged(state, user) {
    storage.removeItem('userLogged');
    state.userLogged = user;
    if (!user) return
  
    storage.setItem('userLogged', JSON.stringify(user))
  },

  setAuthToken(state, token) {
    state.authToken = token;

    if(token){
      storage.setItem('authToken', token);
    } else {
      storage.removeItem('authToken');
    }
  },

  setLoading(state, isLoading){
    if (isLoading) {
      state.countLoading += 1;
      state.loadingApp = true;
    } else if (state.countLoading > 0) {
      state.countLoading -= 1;
    }
    if(state.countLoading === 0) state.loadingApp = false;
  },
};

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
}
