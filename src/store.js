import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title: 'Vue state samples',
    links: [
      'http://google.com',
      'http://coursetro.com',
      'http://youtube.com'
    ]
  },
  getters: {
    countLinks: state => {
      return state.links.length
    }
  },
  mutations: {
    doAddLink: (state, link) => {
      state.links.push(link)
    },
    doRemoveLink: (state, link) => {
      state.links.splice(link, 1)
    },
    doRemoveAll: (state) => {
      state.links = []
    }
  },
  actions: {
    asyncDoRemoveLink: (context, link) => {
      context.commit('doRemoveLink', link)
    },
    asyncDoRemoveAll ({commit}) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit('doRemoveAll')
          resolve()
        }, 1500)
      })
    }
  }
})
