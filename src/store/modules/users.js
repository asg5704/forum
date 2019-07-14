import firebase from 'firebase'
import Vue from 'vue'
import {makeAppendChildToParentMutation} from '../assetHelpers'
import {countObjectProps, removeEmptyProperties} from '@/utils'

export default {
  namespaced: true,

  state: {
    items: {}
  },

  getters: {
    userPostsCount (state) {
      return function (id) {
        return countObjectProps(state.items[id].posts)
      }
    },

    userPosts: (state, getters, rootState) => id => {
      const user = state.items[id]
      if (user.posts) {
        return Object.values(rootState.posts.items)
          .filter(post => post.userId === id)
      }
      return []
    },

    userThreadsCount: state => id => countObjectProps(state.items[id].threads)
  },

  actions: {
    createUser ({state, commit}, {id, email, name, username, avatar = null}) {
      return new Promise((resolve, reject) => {
        const registeredAt = Math.floor(Date.now() / 1000)
        const usernameLower = username.toLowerCase()
        email = email.toLowerCase()
        const user = {avatar, email, name, username, usernameLower, registeredAt}
        firebase.database().ref('users').child(id).set(user)
          .then(() => {
            commit('setItem', {resource: 'users', itemId: id, item: user}, {root: true})
            resolve(state.items[id])
          })
      })
    },
    updateUser ({commit}, user) {
      const userProfileUpdates = {
        avatar: user.avatar,
        username: user.username,
        name: user.name,
        bio: user.bio,
        website: user.website,
        email: user.email,
        location: user.location
      }
      return new Promise((resolve, reject) => {
        firebase.database().ref('users').child(user['.key']).update(removeEmptyProperties(userProfileUpdates))
          .then(() => {
            commit('setUser', {userId: user['.key'], user})
            resolve(user)
          })
      })
    },
    // ===== USERS =====
    fetchUser: ({dispatch}, {id}) => dispatch('fetchItem', {resource: 'users', id}, {root: true}),
    fetchUsers: ({dispatch}, {ids}) => dispatch('fetchItems', {resource: 'users', ids}, {root: true})
  },

  mutations: {
    setUser (state, {user, userId}) {
      Vue.set(state.items, userId, user)
    },

    appendPostToUser: makeAppendChildToParentMutation({parent: 'users', child: 'posts'}),

    appendThreadToUser: makeAppendChildToParentMutation({parent: 'users', child: 'threads'})
  }
}
