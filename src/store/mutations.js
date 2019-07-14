import Vue from 'vue'

export default {
  // Mutations - Changes state directly
  // We use Vue.set because it's already imported
  setItem (state, {item, itemId, resource}) {
    item['.key'] = itemId
    Vue.set(state[resource].items, itemId, item)
  }
}
