export default {
  bind (el, binding) {
    el.__ScrollHandler__ = event => binding.value(event)
    document.body.addEventListener('mousewheel', el.__ScrollHandler__)
    document.body.addEventListener('touchmove', el.__ScrollHandler__)
  },

  unbind (el) {
    document.body.removeEventListener('mousewheel', el.__ScrollHandler__)
    document.body.removeEventListener('touchmove', el.__ScrollHandler__)
  }
}
