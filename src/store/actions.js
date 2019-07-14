import firebase from 'firebase'

export default {
  // Global Actions
  // ===== GENERIC HOFs =====
  fetchItem: ({state, commit}, {id, resource}) => {
    console.log(`Fetching ${resource}`)
    return new Promise((resolve, reject) => {
      firebase.database().ref(resource).child(id).once('value')
        .then(snapshot => {
          commit('setItem', { resource, itemId: snapshot.key, item: snapshot.val() })
          resolve(state[resource].items[id])
        })
    })
  },

  fetchItems: ({dispatch}, {ids, resource}) => {
    ids = Array.isArray(ids) ? ids : Object.keys(ids)
    return Promise.all(ids.map(id => dispatch('fetchItem', {id, resource})))
  }
}
