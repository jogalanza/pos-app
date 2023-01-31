import { createStore } from 'vuex'
import user from './module/user'
import options from './module/options'

const store = createStore({
  modules: {
    user: user,
    options: options
  },
  state: {
    boardTitle: "",
    Months: [
      { label: 'January', value: 1 },
      { label: 'February', value: 2 },
      { label: 'March', value: 3 },
      { label: 'April', value: 4 },
      { label: 'May', value: 5 },
      { label: 'June', value: 6 },
      { label: 'July', value: 7 },
      { label: 'August', value: 8 },
      { label: 'September', value: 9 },
      { label: 'October', value: 10 },
      { label: 'November', value: 11 },
      { label: 'December', value: 12 }
    ],
    darkMode: 0
  },
  getters: {
    getAppName() {
      if (window.invapp.appName !== undefined) return window.invapp.appName
      return 'Payroll System'
    },
    Years() {
      var currentYear = new Date().getFullYear(), years = [];
      var startYear = 2020;
      while (startYear <= currentYear) {
        years.push(startYear++);
      }
      return years.reverse();
    },
    DarkMode(state){
      return state.darkMode == 1
    }
  },
  mutations: {
    updateBoardTitle(state, payload) {
      state.boardTitle = payload
    },
    updateDarkMode(state, payload){
      console.warn('updatedarkmode', payload)
      state.darkMode = payload
      window.localStorage.setItem('darkMode', payload)
    }
  },
  actions: {
    UpdateBoardTitle({ commit }, payload) {
      commit('updateBoardTitle', payload)
    },
    UpdateDarkMode({commit}, payload){
      commit('updateDarkMode', payload)
    }
  }
})

export default store