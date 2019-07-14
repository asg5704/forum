import firebase from 'firebase'
import {helpers as vuelidateHelpers} from 'vuelidate/lib/validators'

export const uniqueEmail = (value) => {
  if (!vuelidateHelpers.req(value)) {
    return true
  }
  return new Promise((resolve, reject) => {
    firebase.database().ref('users').orderByChild('email').equalTo(value.toLowerCase())
      .once('value', snapshot => resolve(!snapshot.exists()))
  })
}

export const uniqueUsername = (value) => {
  if (!vuelidateHelpers.req(value)) {
    return true
  }
  return new Promise((resolve, reject) => {
    firebase.database().ref('users').orderByChild('usernameLower').equalTo(value.toLowerCase())
      .once('value', snapshot => resolve(!snapshot.exists()))
  })
}

export const supportedImages = (value) => {
  if (!vuelidateHelpers.req(value)) {
    return true
  }
  const supported = ['jpg', 'gif', 'jpeg', 'png', 'svg']
  const suffix = value.split('.').pop()
  return supported.includes(suffix)
}

export const responseIsValid = (value) => {
  if (!vuelidateHelpers.req(value)) {
    return true
  }
  return new Promise((resolve, reject) => {
    fetch(value)
      .then(response => resolve(response.ok))
      .catch(() => resolve(false))
  })
}
