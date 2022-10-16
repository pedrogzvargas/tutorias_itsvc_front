import Service from '../Service'

import store from '../../store'

const resource = 'users'

export default {
  get (studentId) {
    return Service.get(`${resource}/${studentId}/profile/`, {
      headers: {
        Authorization: `token ${store.getters['user/userToken']}`,
      },
    })
  },
  put (studentId, payload) {
    return Service.put(`${resource}/${studentId}/profile/`, payload, {
      headers: {
        Authorization: `token ${store.getters['user/userToken']}`,
      },
    })
  },
}
