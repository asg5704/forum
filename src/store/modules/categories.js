import firebase from 'firebase'

export default {
  namespaced: true,

  state: {
    items: {}
  },

  actions: {
    // ===== CATEGORIES =====
    fetchCategory: ({dispatch}, {id}) => dispatch('fetchItem', {resource: 'categories', id}, {root: true}),
    fetchCategories: ({dispatch}, {ids}) => dispatch('fetchItems', {resource: 'categories', ids}, {root: true}),
    fetchAllCategories: ({state, commit}) => new Promise((resolve, reject) => {
      firebase.database().ref('categories').once('value', snapshot => {
        const categoryObj = snapshot.val()
        Object.keys(categoryObj).forEach(categoryId => {
          const category = categoryObj[categoryId]
          commit('setItem', {resource: 'categories', itemId: categoryId, item: category}, {root: true})
        })
        resolve(Object.values(state.items))
      })
    })
  }
}
