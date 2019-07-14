import firebase from 'firebase'

export default {
  namespaced: true,

  state: {
    authId: null,
    unsubscribeAuthObserver: null
  },

  getters: {
    authorizedUser (state, getters, rootState) {
      return state.authId ? rootState.users.items[state.authId] : null
    }
  },

  actions: {
    fetchAuthUser ({dispatch, commit}) {
      const userId = firebase.auth().currentUser.uid
      // check if user exsits first in db
      return new Promise((resolve, reject) => {
        firebase.database().ref('users').child(userId).once('value', snapshot => {
          if (snapshot.exists()) {
            return dispatch('users/fetchUser', {id: userId}, {root: true})
              .then(user => {
                commit('setAuthId', userId)
                resolve(user)
              })
          } else {
            resolve(null)
          }
        })
      })
    },
    registerUserWithEmailAndPassword ({dispatch}, {email, name, username, password, avatar = null}) {
      return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(user => {
          return dispatch('users/createUser', {id: user.user.uid, email, name, username, password, avatar}, {root: true})
        })
        .then(() => dispatch('fetchAuthUser'))
    },

    signInWithEmailAndPassword (context, {email, password}) {
      return firebase.auth().signInWithEmailAndPassword(email, password)
    },

    signOut ({commit}) {
      return firebase.auth().signOut()
        .then(() => {
          commit('setAuthId', null)
        })
    },

    signInWithGoogle ({dispatch}) {
      const provider = new firebase.auth.GoogleAuthProvider()
      return firebase.auth().signInWithPopup(provider)
        .then(data => {
          const user = data.user
          firebase.database().ref('users').child(user.uid).once('value', snapshot => {
            if (!snapshot.exists()) {
              return dispatch('users/createUser', { id: user.uid, name: user.displayName, email: user.email, username: user.email, avatar: user.photoURL }, {root: true})
                .then(() => dispatch('fetchAuthUser'))
            }
          })
        })
    },

    initAuthentication ({dispatch, commit, state}) {
      // unsubscribe observer if already listening
      if (state.unsubscribeAuthObserver) {
        state.unsubscribeAuthObserver()
      }
      return new Promise((resolve, reject) => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
          if (user) {
            dispatch('fetchAuthUser')
              .then(dbUser => resolve(dbUser))
          } else {
            resolve(null)
          }
        })
        commit('setUnsubscribeAuthObserver', unsubscribe)
      })
    }
  },

  mutations: {
    setAuthId (state, id) {
      state.authId = id
    },

    setUnsubscribeAuthObserver (state, unsubscribe) {
      state.unsubscribeAuthObserver = unsubscribe
    }
  }
}
