import Service from '../Service'

import store from '../../store'

const resource = 'students'

export default {
  get (studentId) {
    return Service.get(`${resource}/${studentId}/institute/`, {
      headers: {
        Authorization: `token ${store.getters['user/userToken']}`,
      },
    })
  },
  post (studentId, payload) {
    return Service.post(`${resource}/${studentId}/institute/`, payload, {
      headers: {
        Authorization: `token ${store.getters['user/userToken']}`,
      },
    })
  },
  put (studentId, instituteId, payload) {
    return Service.put(`${resource}/${studentId}/institute/${instituteId}/`, payload, {
      headers: {
        Authorization: `token ${store.getters['user/userToken']}`,
      },
    })
  },
  delete (studentId, instituteId) {
    return Service.delete(`${resource}/${studentId}/institute/${instituteId}/`, {
      headers: {
        Authorization: `token ${store.getters['user/userToken']}`,
      },
    })
  },
}
