import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default () => {
  return new Vuex.Store({
    state: {
      title: 'Vue state samples',
      links: [{
          url: 'http://google.com',
          name: ''
        },
        {
          url: 'http://coursetro.com',
          name: ''
        },
        {
          url: 'http://youtube.com',
          name: ''
        }
      ]
    },
    getters: {
      countLinks: state => {
        return state.links.length
      },
      links: state => {
        console.log('get links')
        return state.links
      }
    },
    mutations: {
      doAddLink: (state, link) => {
        state.links.push(link)
      },
      doUpdateLink: (state, {
        link,
        index
      }) => {
        // https://vuejs.org/v2/guide/list.html#Caveats
        state.links.splice(index, 1, link)
      },
      doRemoveLink: (state, link) => {
        state.links.splice(link, 1)
      },
      doRemoveAll: (state) => {
        state.links = []
      }
    },
    actions: {
      asyncDoUpdateLink: (context, link, index) => {
        console.log('async')
        context.commit('doUpdateLink', link, index)
      },
      asyncDoRemoveLink: (context, link) => {
        context.commit('doRemoveLink', link)
      },
      asyncDoRemoveAll({
        commit
      }) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            commit('doRemoveAll')
            resolve()
          }, 1500)
        })
      }
    }
  })
}