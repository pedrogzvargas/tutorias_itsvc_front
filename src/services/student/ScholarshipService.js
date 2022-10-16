import Service from '../Service'

import store from '../../store'

const resource = 'students'

export default {
  get (studentId) {
    return Service.get(`${resource}/${studentId}/scholarship/`, {
      headers: {
        Authorization: `token ${store.getters['user/userToken']}`,
      },
    })
  },
  post (studentId, payload) {
    return Service.post(`${resource}/${studentId}/scholarship/`, payload, {
      headers: {
        Authorization: `token ${store.getters['user/userToken']}`,
      },
    })
  },
  put (studentId, payload) {
    return Service.put(`${resource}/${studentId}/scholarship/`, payload, {
      headers: {
        Authorization: `token ${store.getters['user/userToken']}`,
      },
    })
  },
}
